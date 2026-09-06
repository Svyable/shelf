#!/usr/bin/env python3
"""Keep every cataloged publication README linked to its live Reader surface."""
from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

START = "<!-- bookself-reader-links:start -->"
END = "<!-- bookself-reader-links:end -->"
DESK_READER_BASE = "https://svyable.github.io/desk/reader/#/b/"
SHELF_READER_BASE = "https://svyable.github.io/shelf/reader/#/b/"
DEFAULT_SHELF_CATALOG = "https://raw.githubusercontent.com/Svyable/shelf/main/catalog.json"
MANAGED_RE = re.compile(
    rf"{re.escape(START)}\n.*?\n{re.escape(END)}\n*",
    re.DOTALL,
)
LEGACY_READ_RE = re.compile(
    r"^\*\*(?:Read|Reader|Reader links):\*\*[^\n]*(?:svyable\.github\.io/(?:desk|shelf)/reader/)[^\n]*\n*",
    re.MULTILINE | re.IGNORECASE,
)
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def fail(message: str):
    raise SystemExit(f"sync-reader-links: {message}")


def read_json(path: Path) -> dict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"could not read {path}: {exc}")
    if not isinstance(data, dict):
        fail(f"expected a JSON object in {path}")
    return data


def catalog_slugs(data: dict, label: str) -> list[str]:
    books = data.get("books")
    if data.get("version") != 1 or not isinstance(books, list):
        fail(f"{label} must be version 1 with a books array")
    result: list[str] = []
    seen: set[str] = set()
    for raw in books:
        if not isinstance(raw, str):
            fail(f"{label} contains a non-string publication slug")
        slug = raw.strip()
        if not SLUG_RE.fullmatch(slug) or slug == "_TEMPLATE":
            fail(f"{label} contains invalid publication slug {raw!r}")
        if slug in seen:
            fail(f"{label} repeats publication slug {slug!r}")
        seen.add(slug)
        result.append(slug)
    return result


def load_shelf_catalog(root: Path) -> set[str]:
    sibling = root.parent / "shelf" / "catalog.json"
    source = os.environ.get("BOOKSELF_SHELF_CATALOG", "").strip()
    if not source and sibling.is_file():
        return set(catalog_slugs(read_json(sibling), str(sibling)))
    source = source or DEFAULT_SHELF_CATALOG
    parsed = urlparse(source)
    if parsed.scheme in {"http", "https"}:
        request = Request(source, headers={"User-Agent": "Bookself-reader-link-sync/1"})
        try:
            with urlopen(request, timeout=20) as response:
                data = json.load(response)
        except Exception as exc:
            fail(f"could not load Shelf catalog from {source}: {exc}")
        if not isinstance(data, dict):
            fail(f"Shelf catalog from {source} is not a JSON object")
        return set(catalog_slugs(data, source))
    path = Path(source).expanduser()
    return set(catalog_slugs(read_json(path), str(path)))


def reader_block(role: str, slug: str, published: bool) -> str:
    if role == "shelf":
        links = f"[Published edition · Shelf Reader]({SHELF_READER_BASE}{slug}/)"
    else:
        links = f"[Working edition · Desk Reader]({DESK_READER_BASE}{slug}/)"
        if published:
            links += f" · [Published edition · Shelf Reader]({SHELF_READER_BASE}{slug}/)"
    return f"{START}\n**Reader links:** {links}\n{END}\n\n"


def insertion_offset(markdown: str) -> int:
    lines = markdown.splitlines(keepends=True)
    heading = next((i for i, line in enumerate(lines) if re.match(r"^#\s+\S", line)), None)
    if heading is None:
        fail("publication README has no level-1 title")
    index = heading + 1
    while index < len(lines) and not lines[index].strip():
        index += 1
    if index < len(lines):
        stripped = lines[index].strip()
        italic_subtitle = (
            len(stripped) >= 2
            and not stripped.startswith("**")
            and ((stripped.startswith("*") and stripped.endswith("*"))
                 or (stripped.startswith("_") and stripped.endswith("_")))
        )
        if italic_subtitle:
            index += 1
    while index < len(lines) and not lines[index].strip():
        index += 1
    return sum(len(line) for line in lines[:index])


def normalized(markdown: str, role: str, slug: str, published: bool) -> str:
    clean = MANAGED_RE.sub("", markdown)
    clean = LEGACY_READ_RE.sub("", clean)
    offset = insertion_offset(clean)
    before = clean[:offset]
    after = clean[offset:]
    if before and not before.endswith("\n\n"):
        before = before.rstrip("\n") + "\n\n"
    return before + reader_block(role, slug, published) + after.lstrip("\n")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="report stale README links without writing")
    args = parser.parse_args()

    root = Path(__file__).resolve().parent.parent
    role = str(read_json(root / "imprint.json").get("role") or "").strip().lower()
    if role not in {"desk", "shelf"}:
        fail(f"imprint role must be desk or shelf, got {role!r}")

    slugs = catalog_slugs(read_json(root / "catalog.json"), str(root / "catalog.json"))
    published = set(slugs) if role == "shelf" else load_shelf_catalog(root)
    stale: list[str] = []

    for slug in slugs:
        readme = root / "books" / slug / "README.md"
        if not readme.is_file():
            fail(f"cataloged publication has no README: {readme.relative_to(root)}")
        current = readme.read_text(encoding="utf-8")
        wanted = normalized(current, role, slug, slug in published)
        if wanted == current:
            continue
        stale.append(readme.relative_to(root).as_posix())
        if not args.check:
            readme.write_text(wanted, encoding="utf-8")

    if stale:
        verb = "need" if args.check else "updated"
        print(f"{len(stale)} publication READMEs {verb} reader-link normalization")
        for path in stale:
            print(f"  {path}")
        return 1 if args.check else 0

    print(f"All {len(slugs)} cataloged {role} publication READMEs have canonical reader links")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
