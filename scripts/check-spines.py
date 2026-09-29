#!/usr/bin/env python3
"""Check that spines.json mirrors the per-book Spine rows and the catalog."""

from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC = importlib.util.spec_from_file_location(
    "generate_spines", Path(__file__).resolve().parent / "generate-spines.py"
)
assert SPEC and SPEC.loader
gen = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(gen)

SCHEMA = gen.SCHEMA
HEIGHTS = gen.HEIGHTS
THICKNESSES = gen.THICKNESSES
FOILS = set(gen.FOILS)
COLORS = dict(gen.PALETTE)
SPINE_RE = gen.SPINE_RE
KEYVAL_RE = gen.KEYVAL_RE
MIRRORED_KEYS = ("binding", "height", "thickness", "foil")


def check(root: Path) -> list[str]:
    """Return a list of problems; an empty list means the spines are consistent."""
    errors: list[str] = []

    def fail(message: str) -> None:
        errors.append(message)

    try:
        catalog = [str(s) for s in json.loads(
            (root / "catalog.json").read_text(encoding="utf-8")
        )["books"]]
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        return [f"cannot read catalog.json: {exc}"]

    try:
        spines = json.loads((root / "spines.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"cannot read spines.json: {exc}"]

    if spines.get("version") != SCHEMA:
        fail(f"spines.json must be version {SCHEMA}")
    palette = spines.get("palette")
    if not isinstance(palette, dict):
        fail("spines.json palette must be an object keyed by binding")
    elif palette != COLORS:
        fail("spines.json palette does not match scripts/generate-spines.py (regenerate spines.json)")
    books = spines.get("books")
    if not isinstance(books, dict):
        return errors + ["spines.json books must be an object keyed by slug"]

    catalog_set = set(catalog)
    for slug in sorted(catalog_set - set(books)):
        fail(f"catalog book has no spine: {slug}")
    for slug in sorted(set(books) - catalog_set):
        fail(f"spines.json has non-catalog book: {slug}")

    for slug in sorted(catalog_set & set(books)):
        entry = books[slug]
        if not isinstance(entry, dict):
            fail(f"{slug}: spine entry must be an object")
            continue

        binding = entry.get("binding")
        if binding not in COLORS:
            fail(f"{slug}: binding {binding!r} is not in the palette")
        elif entry.get("color") != COLORS[binding]:
            fail(
                f"{slug}: color {entry.get('color')!r} does not match binding "
                f"{binding!r} ({COLORS[binding]}) (regenerate spines.json)"
            )

        height = entry.get("height")
        if height not in HEIGHTS:
            fail(f"{slug}: invalid height {height!r}")
        elif entry.get("height_px") != HEIGHTS[height]:
            fail(
                f"{slug}: height_px {entry.get('height_px')!r} does not match "
                f"height {height!r} (expected {HEIGHTS[height]})"
            )

        thickness = entry.get("thickness")
        if thickness not in THICKNESSES:
            fail(f"{slug}: invalid thickness {thickness!r}")
        elif entry.get("thickness_px") != THICKNESSES[thickness]:
            fail(
                f"{slug}: thickness_px {entry.get('thickness_px')!r} does not match "
                f"thickness {thickness!r} (expected {THICKNESSES[thickness]})"
            )

        if entry.get("foil") not in FOILS:
            fail(f"{slug}: invalid foil {entry.get('foil')!r}")

        for numeric in ("chapters", "words"):
            value = entry.get(numeric)
            if not isinstance(value, int) or isinstance(value, bool) or value < 1:
                fail(f"{slug}: {numeric} must be a positive integer, got {value!r}")

        # spines.json must mirror the README Spine row
        readme = root / "books" / slug / "README.md"
        if not readme.is_file():
            fail(f"{slug}: missing README.md")
            continue
        m = SPINE_RE.search(readme.read_text(encoding="utf-8"))
        if not m:
            fail(f"{slug}: README.md has no Spine row")
            continue
        parsed = dict(KEYVAL_RE.findall(m.group(1)))
        for key in MIRRORED_KEYS:
            if parsed.get(key) != entry.get(key):
                fail(
                    f"{slug}: README Spine {key}={parsed.get(key)!r} does not match "
                    f"spines.json {entry.get(key)!r} (regenerate spines.json)"
                )

    return errors


def main() -> int:
    errors = check(ROOT)
    if errors:
        for message in errors:
            print(f"spines check: {message}")
        print(f"spines check failed: {len(errors)} problem(s)")
        return 1

    count = len(json.loads((ROOT / "spines.json").read_text(encoding="utf-8"))["books"])
    print(f"spines OK: {count} books; spines.json matches the README Spine rows")
    return 0


if __name__ == "__main__":
    sys.exit(main())
