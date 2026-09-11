#!/usr/bin/env python3
"""Fail when Shelf crosses its publication/framework ownership boundary."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BOOKSELF_DEMO_SLUGS = {
    "bookself-101",
    "bookself-daily",
    "bookself-dispatch",
    "bookself-format-gallery",
    "bookself-review",
    "how-to-bookself",
    "open-scholarship-notes",
    "the-example-paper",
    "style-after-midnight",
    "style-clear-margin",
    "style-common-book",
    "style-easy-reading",
    "style-field-notes",
    "style-lamplight-room",
    "style-poems-at-window",
    "style-quiet-study",
}


def fail(message: str) -> None:
    raise SystemExit(f"Shelf boundary violation: {message}")


def main() -> int:
    imprint = json.loads((ROOT / "imprint.json").read_text(encoding="utf-8"))
    if str(imprint.get("role") or "").lower() != "shelf":
        fail("imprint.json must keep role=shelf")
    if imprint.get("name") != "Sven Hardy Benson’s Shelf":
        fail("public imprint name changed away from Sven Hardy Benson’s Shelf")
    github = imprint.get("github") or {}
    if github.get("owner") != "Svyable" or github.get("repo") != "shelf":
        fail("imprint GitHub identity must remain Svyable/shelf")

    catalog = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
    books = catalog.get("books")
    if not isinstance(books, list) or not books:
        fail("catalog.json must contain Shelf publication entries")
    overlap = sorted(set(map(str, books)) & BOOKSELF_DEMO_SLUGS)
    if overlap:
        fail(f"Bookself demo catalog leaked into Shelf: {', '.join(overlap)}")
    for slug in books:
        if not (ROOT / "books" / str(slug) / "README.md").is_file():
            fail(f"catalog entry has no publication README: {slug}")

    app = (ROOT / "reader" / "js" / "app.js").read_text(encoding="utf-8")
    if "svyable.github.io/bookself" in app.lower():
        fail("production Reader must not import the Bookself GitHub Pages deployment")
    if "canonicalAppUrl" in app:
        fail("legacy remote canonical-app bridge returned")
    if not (ROOT / "reader" / "js" / "app-core.js").is_file():
        fail("local Reader core is missing")

    sync = (ROOT / "scripts" / "sync-ui.sh").read_text(encoding="utf-8")
    if "--shelf-safe" not in sync:
        fail("Bookself UI sync must require --shelf-safe")

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    released = set(re.findall(r"\]\(books/([a-z0-9][a-z0-9-]*)/\)", readme, flags=re.I))
    for slug in released:
        if not (ROOT / "books" / slug / "README.md").is_file():
            fail(f"released README entry has no publication directory: {slug}")

    print(
        f"Shelf boundary OK: {len(books)} catalog entries; "
        f"{len(released)} README-linked releases; local Reader runtime."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
