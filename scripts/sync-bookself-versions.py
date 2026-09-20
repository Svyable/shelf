#!/usr/bin/env python3
"""Mirror Bookself Reader freshness tokens without replacing Shelf-owned shell files."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ASSET_RE = re.compile(
    r'(?P<prefix>\b(?:href|src)=")'
    r'(?P<path>(?:css|js)/[^"?]+)'
    r'(?:\?v=(?P<version>[^"]+))?'
    r'(?P<suffix>")'
)
BOOKSELF_CACHE_RE = re.compile(
    r"""const\s+CACHE\s*=\s*['"]bookself-reader-shell-(?P<generation>v[0-9]+)['"]\s*;"""
)
SHELF_CACHE_RE = re.compile(
    r"""const\s+CACHE\s*=\s*['"]sven-shelf-reader-[^'"]+['"]\s*;"""
)


def asset_versions(html: str) -> dict[str, str]:
    versions: dict[str, str] = {}
    for match in ASSET_RE.finditer(html):
        version = match.group("version")
        if version:
            versions[match.group("path")] = version
    return versions


def mirror_index_versions(bookself_html: str, shelf_html: str) -> str:
    versions = asset_versions(bookself_html)

    def replace(match: re.Match[str]) -> str:
        path = match.group("path")
        version = versions.get(path)
        if not version:
            return match.group(0)
        return f'{match.group("prefix")}{path}?v={version}{match.group("suffix")}'

    return ASSET_RE.sub(replace, shelf_html)


def mirror_cache_generation(bookself_worker: str, shelf_worker: str) -> str:
    upstream = BOOKSELF_CACHE_RE.search(bookself_worker)
    if not upstream:
        raise ValueError("Bookself Reader cache generation is missing or unreadable")
    if not SHELF_CACHE_RE.search(shelf_worker):
        raise ValueError("Shelf Reader cache generation is missing or unreadable")
    generation = upstream.group("generation")
    return SHELF_CACHE_RE.sub(
        f"const CACHE = 'sven-shelf-reader-bookself-{generation}';",
        shelf_worker,
        count=1,
    )


def sync_versions(bookself_root: Path, shelf_root: Path) -> None:
    bookself_index = bookself_root / "reader" / "index.html"
    bookself_worker = bookself_root / "reader" / "sw.js"
    shelf_index = shelf_root / "reader" / "index.html"
    shelf_worker = shelf_root / "reader" / "sw.js"

    upstream_html = bookself_index.read_text(encoding="utf-8")
    upstream_worker = bookself_worker.read_text(encoding="utf-8")
    local_html = shelf_index.read_text(encoding="utf-8")
    local_worker = shelf_worker.read_text(encoding="utf-8")

    shelf_index.write_text(
        mirror_index_versions(upstream_html, local_html),
        encoding="utf-8",
    )
    shelf_worker.write_text(
        mirror_cache_generation(upstream_worker, local_worker),
        encoding="utf-8",
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Mirror Bookself Reader asset/cache freshness tokens into Shelf."
    )
    parser.add_argument("bookself_root", help="Path to the checked-out Bookself repository.")
    parser.add_argument(
        "shelf_root",
        nargs="?",
        default=str(Path(__file__).resolve().parent.parent),
        help="Path to the Shelf repository (default: this repository).",
    )
    args = parser.parse_args(argv)
    sync_versions(Path(args.bookself_root).resolve(), Path(args.shelf_root).resolve())
    print("Mirrored Bookself Reader freshness tokens into Shelf.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
