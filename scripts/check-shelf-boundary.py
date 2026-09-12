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

REMOTE_BOOKSELF_RUNTIME = re.compile(
    r"(?:import\s*\(|importScripts\s*\(|\bfrom\s+)[^\n]{0,240}"
    r"https://svyable\.github\.io/bookself/",
    re.I,
)


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

    if (ROOT / "desk").exists():
        fail("Shelf must not contain a copied Bookself/Desk application tree")

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
        fail("production Reader adapter must not reference the Bookself Pages deployment")
    if "canonicalAppUrl" in app:
        fail("legacy remote canonical-app bridge returned")
    if not (ROOT / "reader" / "js" / "app-core.js").is_file():
        fail("local Reader core is missing")

    for path in (ROOT / "reader").rglob("*.js"):
        text = path.read_text(encoding="utf-8", errors="replace")
        if REMOTE_BOOKSELF_RUNTIME.search(text):
            fail(
                "Reader JavaScript dynamically depends on the Bookself Pages deployment: "
                f"{path.relative_to(ROOT)}"
            )

    sync = (ROOT / "scripts" / "sync-ui.sh").read_text(encoding="utf-8")
    if "--shelf-safe" not in sync:
        fail("Bookself UI sync must require --shelf-safe")

    workflow_dir = ROOT / ".github" / "workflows"
    if workflow_dir.is_dir():
        for path in sorted(workflow_dir.glob("*.y*ml")):
            text = path.read_text(encoding="utf-8")
            if re.search(r"^\s*contents:\s*write\s*$", text, flags=re.M | re.I):
                fail(f"custom workflow may not have contents: write: {path.relative_to(ROOT)}")
            if re.search(r"^\s*permissions:\s*write-all\s*$", text, flags=re.M | re.I):
                fail(f"custom workflow may not use permissions: write-all: {path.relative_to(ROOT)}")

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    released = set(re.findall(r"\]\(books/([a-z0-9][a-z0-9-]*)/\)", readme, flags=re.I))
    for slug in released:
        if not (ROOT / "books" / slug / "README.md").is_file():
            fail(f"released README entry has no publication directory: {slug}")

    print(
        f"Shelf boundary OK: {len(books)} catalog entries; "
        f"{len(released)} README-linked releases; local Reader runtime; "
        "read-only custom CI."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
