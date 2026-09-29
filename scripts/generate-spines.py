#!/usr/bin/env python3
"""Derive hardcover-style spine presentation for released Shelf publications.

Two modes:
  * default      read each books/<slug>/README.md "Spine" row and emit spines.json
  * --update     recompute extent from the manuscript, derive spine values, and
                 write/refresh the "Spine" row in each README, then emit spines.json

The "Spine" row is publication presentation metadata (provenance-exempt), so this
is a Shelf-owned concern. In --update mode the derived values overwrite any hand
curation; the default mode never touches the READMEs and simply mirrors them.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCHEMA = 1

SPINE_RE = re.compile(r"\|\s*\*\*Spine\*\*\s*\|\s*([^|\n]+)\|")
KEYVAL_RE = re.compile(r"([a-z]+)\s*:\s*([a-z0-9-]+)")

# Deep binding tones that sit well in the near-black + gold Reading Room.
PALETTE: list[tuple[str, str]] = [
    ("oxblood", "#4b1f26"),
    ("forest", "#1f3a30"),
    ("navy", "#1b2b46"),
    ("aubergine", "#35203c"),
    ("slate", "#29323f"),
    ("moss", "#2e3a20"),
    ("brass", "#55431f"),
    ("merlot", "#3f1b2a"),
    ("charcoal", "#26262a"),
    ("bronze", "#4a3320"),
    ("indigo", "#212a4c"),
    ("plum", "#3a1f2e"),
]

HEIGHTS = {"short": 214, "medium": 244, "tall": 276}
THICKNESSES = {"slim": 56, "medium": 66, "thick": 77, "heavy": 90}
FOILS = ("blind", "gold")


def read_catalog() -> list[str]:
    data = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
    return [str(s) for s in data["books"]]


def readme_order() -> list[str]:
    """Slugs in the same order the landing renders them (root README table)."""
    text = (ROOT / "README.md").read_text(encoding="utf-8")
    start = text.find("## The books")
    if start < 0:
        return read_catalog()
    tail = text[start + len("## The books"):]
    nxt = re.search(r"^##\s+", tail, re.M)
    section = tail[: nxt.start()] if nxt else tail
    slugs = []
    for line in section.splitlines():
        m = re.search(r"\]\(books/([a-z0-9][a-z0-9-]*)/?\)", line)
        if m:
            slugs.append(m.group(1))
    return slugs


def extent(slug: str) -> tuple[int, int]:
    book = ROOT / "books" / slug
    chapters = len(list((book / "manuscript").glob("ch*.md")))
    words = 0
    for path in book.rglob("*.md"):
        if path.name in {"README.md", "RIGHTS.md"}:
            continue
        words += len(path.read_text(encoding="utf-8", errors="ignore").split())
    return chapters, words


def _quantile_boundaries(values: list[int], cuts: int) -> list[int]:
    ordered = sorted(values)
    return [ordered[min(len(ordered) - 1, int(len(ordered) * (i + 1) / (cuts + 1)))] for i in range(cuts)]


def _classify(value: int, boundaries: list[int], names: list[str]) -> str:
    for boundary, name in zip(boundaries, names):
        if value <= boundary:
            return name
    return names[-1]


def stable_pick(slug: str, salt: str, n: int) -> int:
    digest = hashlib.sha256(f"shelf-spine:{salt}:{slug}".encode()).hexdigest()
    return int(digest, 16) % n


def derive(order: list[str]) -> dict[str, dict]:
    data = {slug: extent(slug) for slug in order}
    chapters = [c for c, _ in data.values()]
    words = [w for _, w in data.values()]
    height_bounds = _quantile_boundaries(chapters, 2)          # short / medium / tall
    thickness_bounds = _quantile_boundaries(words, 3)          # slim / medium / thick / heavy

    result: dict[str, dict] = {}
    prev_binding = None
    for slug in order:
        c, w = data[slug]

        height = _classify(c, height_bounds, ["short", "medium", "tall"])
        thickness = _classify(w, thickness_bounds, ["slim", "medium", "thick", "heavy"])

        # stable per-slug binding, nudged so render-order neighbours differ
        idx = stable_pick(slug, "binding", len(PALETTE))
        if prev_binding is not None and PALETTE[idx][0] == prev_binding:
            idx = (idx + 1 + stable_pick(slug, "nudge", len(PALETTE) - 1)) % len(PALETTE)
        binding, color = PALETTE[idx]
        prev_binding = binding

        foil = "blind" if stable_pick(slug, "foil", 7) == 0 else "gold"

        result[slug] = {
            "binding": binding,
            "color": color,
            "height": height,
            "height_px": HEIGHTS[height],
            "thickness": thickness,
            "thickness_px": THICKNESSES[thickness],
            "foil": foil,
            "chapters": c,
            "words": w,
        }
    return result


def parse_spine(readme: str) -> dict[str, str] | None:
    m = SPINE_RE.search(readme)
    if not m:
        return None
    return {k: v for k, v in KEYVAL_RE.findall(m.group(1))}


def format_spine(spine: dict) -> str:
    return (
        f"| **Spine** | binding: {spine['binding']} · height: {spine['height']} · "
        f"thickness: {spine['thickness']} · foil: {spine['foil']} |"
    )


def write_spine_row(path: Path, spine: dict) -> None:
    text = path.read_text(encoding="utf-8")
    row = format_spine(spine)
    if SPINE_RE.search(text):
        text = SPINE_RE.sub(lambda _m: row, text, count=1)
    else:
        # insert right after the first info-table row block (after the header separator)
        lines = text.splitlines(keepends=True)
        for i, line in enumerate(lines):
            if re.match(r"^\|\s*\*\*", line):
                lines.insert(i, row + "\n")
                text = "".join(lines)
                break
        else:
            raise SystemExit(f"could not find info table in {path}")
    path.write_text(text, encoding="utf-8")


def build_from_readmes(order: list[str]) -> dict:
    books: dict[str, dict] = {}
    for slug in order:
        readme = ROOT / "books" / slug / "README.md"
        parsed = parse_spine(readme.read_text(encoding="utf-8"))
        if not parsed:
            raise SystemExit(f"books/{slug}/README.md has no parseable Spine row (run with --update)")
        binding = parsed.get("binding", "charcoal")
        color = dict(PALETTE).get(binding, PALETTE[8][1])
        height = parsed.get("height", "medium")
        thickness = parsed.get("thickness", "medium")
        # Extent is a fact about the manuscript, not a curated value, so it is
        # always recomputed rather than mirrored from the README row.
        chapters, words = extent(slug)
        books[slug] = {
            "binding": binding,
            "color": color,
            "height": height,
            "height_px": HEIGHTS.get(height, HEIGHTS["medium"]),
            "thickness": thickness,
            "thickness_px": THICKNESSES.get(thickness, THICKNESSES["medium"]),
            "foil": parsed.get("foil", "gold"),
            "chapters": chapters,
            "words": words,
        }
    return books


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--update",
        action="store_true",
        help="recompute extent, derive spine values, and write/refresh README Spine rows",
    )
    args = parser.parse_args()

    order = [s for s in readme_order() if s in set(read_catalog())]
    order += [s for s in read_catalog() if s not in set(order)]

    if args.update:
        derived = derive(order)
        for slug, spine in derived.items():
            write_spine_row(ROOT / "books" / slug / "README.md", spine)
        books = build_from_readmes(order)
    else:
        books = build_from_readmes(order)

    payload = {
        "version": SCHEMA,
        "palette": {name: color for name, color in PALETTE},
        "books": books,
    }
    (ROOT / "spines.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"wrote spines.json: {len(books)} book spine(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
