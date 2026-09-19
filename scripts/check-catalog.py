#!/usr/bin/env python3
"""Check that visible Shelf publications match the root catalog."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

SAFE_SLUG = re.compile(r"^[a-z0-9][a-z0-9-]*$")
BOOK_LINK = re.compile(r"\]\((?:\./)?books/([a-z0-9][a-z0-9-]*)/?\)", re.I)
INFO_CELL = r"\|\s*\*\*{label}\*\*\s*\|\s*([^|\n]+)\|"


def extract_section(markdown: str, heading: str) -> str:
    match = re.search(rf"^##\s+{re.escape(heading)}\s*$", markdown, re.I | re.M)
    if not match:
        return ""
    rest = markdown[match.end():]
    next_heading = re.search(r"^##\s+", rest, re.M)
    return (rest[: next_heading.start()] if next_heading else rest).strip()


def portal_slugs(markdown: str) -> set[str]:
    section = extract_section(markdown, "The books")
    return {slug.lower() for slug in BOOK_LINK.findall(section)}


def manifest_slugs(path: Path) -> set[str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if data.get("version") != 1 or not isinstance(data.get("books"), list):
        raise ValueError("catalog.json must be version 1 with a books array")
    result: set[str] = set()
    for raw in data["books"]:
        if not isinstance(raw, str):
            raise ValueError("catalog.json books entries must be strings")
        slug = raw.strip()
        if slug == "_TEMPLATE" or not SAFE_SLUG.fullmatch(slug):
            raise ValueError(f"catalog.json has invalid book slug: {raw!r}")
        if slug in result:
            raise ValueError(f"catalog.json repeats book slug: {slug}")
        result.add(slug)
    return result


def catalog_slugs(root: Path) -> tuple[set[str], str]:
    manifest = root / "catalog.json"
    if manifest.is_file():
        return manifest_slugs(manifest), "catalog.json"
    readme = root / "README.md"
    return portal_slugs(readme.read_text(encoding="utf-8")), "root ## The books catalog"


def info_cell(markdown: str, label: str) -> str:
    match = re.search(INFO_CELL.format(label=re.escape(label)), markdown, re.I)
    return match.group(1).strip() if match else ""


def publication_metadata(root: Path) -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    books = root / "books"
    if not books.is_dir():
        return result
    for path in sorted(books.iterdir()):
        if not path.is_dir() or path.name.startswith("_") or not SAFE_SLUG.fullmatch(path.name):
            continue
        hub = path / "README.md"
        if not hub.is_file():
            continue
        markdown = hub.read_text(encoding="utf-8")
        result[path.name] = {
            "status": info_cell(markdown, "Status"),
            "tags": info_cell(markdown, "Tags"),
        }
    return result


def check(root: Path) -> list[str]:
    root = root.resolve()
    imprint = json.loads((root / "imprint.json").read_text(encoding="utf-8"))
    role = str(imprint.get("role", "")).strip().lower()
    catalog, catalog_label = catalog_slugs(root)
    publications = publication_metadata(root)
    errors: list[str] = []

    for slug in sorted(catalog):
        if slug not in publications:
            errors.append(f"{slug}: catalog entry has no readable books/{slug}/README.md")

    if role == "shelf":
        for slug in sorted(catalog):
            status = publications.get(slug, {}).get("status")
            if status is not None and status != "Published":
                errors.append(
                    f"{slug}: Shelf catalog entry is not Published "
                    f"(Status: {status or 'missing'})"
                )

    if role in {"platform", "shelf"}:
        for slug, meta in sorted(publications.items()):
            status = meta.get("status", "")
            tags = {tag.strip().lower() for tag in meta.get("tags", "").split(",") if tag.strip()}
            if status == "Published" and slug not in catalog and "style gallery" not in tags:
                errors.append(f"{slug}: Published publication is missing from {catalog_label}")

    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Check Shelf publication/catalog consistency.")
    parser.add_argument("--root", default=".", help="Repository root (default: current directory).")
    args = parser.parse_args(argv)
    root = Path(args.root)
    try:
        errors = check(root)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"catalog check failed: {exc}")
        return 1
    if errors:
        for error in errors:
            print(f"✗ {error}")
        return 1
    print("✓ Publication catalog is consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
