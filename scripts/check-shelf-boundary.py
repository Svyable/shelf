#!/usr/bin/env python3
"""Fail when Shelf crosses its publication/framework ownership boundary."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BOOKSELF_DEMO_SLUGS = {
    "bookself-101", "bookself-daily", "bookself-dispatch", "bookself-format-gallery",
    "bookself-review", "how-to-bookself", "open-scholarship-notes", "the-example-paper",
    "style-after-midnight", "style-clear-margin", "style-common-book", "style-easy-reading",
    "style-field-notes", "style-lamplight-room", "style-poems-at-window", "style-quiet-study",
}

REMOTE_BOOKSELF_RUNTIME = re.compile(
    r"(?:import\s*\(|importScripts\s*\(|\bfrom\s+)[^\n]{0,240}"
    r"https://svyable\.github\.io/bookself/", re.I,
)
SYNC_WRITER = Path(".github/workflows/sync-bookself-reader.yml")

CORE_RE = re.compile(r"const\s+CORE\s*=\s*\[([\s\S]*?)\];")
STATIC_IMPORT_RE = re.compile(
    r"""(?ms)^\s*(?:import|export)\s+"""
    r"""(?:(?:\{[\s\S]*?\}|\*\s+as\s+\w+|[A-Za-z_$][\w$]*(?:\s*,\s*\{[\s\S]*?\})?)\s+from\s+)?"""
    r"""['"](?P<path>\.[^'"]+\.js)['"]"""
)


def reader_core_entries(worker_source: str) -> set[str]:
    match = CORE_RE.search(worker_source)
    if not match:
        fail("Reader service-worker CORE is missing or unreadable")
    return set(re.findall(r"""['"](\./[^'"]+)['"]""", match.group(1)))


def static_reader_imports(entry: str) -> set[str]:
    relative = entry.removeprefix("./")
    source_path = ROOT / "reader" / relative
    if not source_path.is_file() or source_path.suffix != ".js":
        return set()
    source = source_path.read_text(encoding="utf-8")
    imports: set[str] = set()
    for match in STATIC_IMPORT_RE.finditer(source):
        target = (source_path.parent / match.group("path")).resolve()
        try:
            reader_relative = target.relative_to((ROOT / "reader").resolve())
        except ValueError:
            continue
        imports.add(f"./{reader_relative.as_posix()}")
    return imports


def verify_reader_core_closure() -> None:
    worker = (ROOT / "reader" / "sw.js").read_text(encoding="utf-8")
    core = reader_core_entries(worker)
    missing_files: list[str] = []
    missing_imports: list[str] = []
    for entry in sorted(core):
        relative = entry.removeprefix("./")
        target = ROOT / "reader" if not relative else ROOT / "reader" / relative
        if not target.exists():
            missing_files.append(entry)
            continue
        for dependency in sorted(static_reader_imports(entry)):
            if dependency not in core:
                missing_imports.append(f"{entry} -> {dependency}")
    if missing_files:
        fail("Reader service-worker CORE references missing files: " + ", ".join(missing_files))
    if missing_imports:
        fail(
            "Reader service-worker CORE is missing static JavaScript dependencies: "
            + ", ".join(missing_imports)
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

    if "url.search = new URL(import.meta.url).search;" not in app:
        fail("Shelf Reader adapter must carry its version token into app-core.js")

    index_html = (ROOT / "reader" / "index.html").read_text(encoding="utf-8")
    if not re.search(r'js/app\.js\?v=[^"\s]+', index_html):
        fail("Shelf Reader adapter must have an explicit freshness token")

    worker_source = (ROOT / "reader" / "sw.js").read_text(encoding="utf-8")
    if not re.search(r"""const\s+CACHE\s*=\s*['"]sven-shelf-reader-bookself-v[0-9]+['"]""", worker_source):
        fail("Shelf Reader cache must track the synchronized Bookself generation")

    verify_reader_core_closure()

    for path in (ROOT / "reader").rglob("*.js"):
        text = path.read_text(encoding="utf-8", errors="replace")
        if REMOTE_BOOKSELF_RUNTIME.search(text):
            fail("Reader JavaScript dynamically depends on the Bookself Pages deployment: " + str(path.relative_to(ROOT)))

    sync = (ROOT / "scripts" / "sync-ui.sh").read_text(encoding="utf-8")
    sync_lines = {line.strip() for line in sync.splitlines()}
    required_sync_lines = {
        'python3 "$SYNC" --shelf-safe "$ROOT"',
        'python3 "$ROOT/scripts/sync-bookself-versions.py" "$SRC" "$ROOT"',
    }
    missing_sync_lines = sorted(required_sync_lines - sync_lines)
    if missing_sync_lines:
        fail(
            "Bookself UI sync wrapper is missing required command lines: "
            + ", ".join(missing_sync_lines)
        )

    workflow_dir = ROOT / ".github" / "workflows"
    if workflow_dir.is_dir():
        for path in sorted(workflow_dir.glob("*.y*ml")):
            text = path.read_text(encoding="utf-8")
            relative = path.relative_to(ROOT)
            writable = bool(re.search(r"^\s*contents:\s*write\s*$", text, flags=re.M | re.I))
            if writable and relative != SYNC_WRITER:
                fail(f"custom workflow may not have contents: write: {relative}")
            if writable:
                required = [
                    "sh scripts/sync-ui.sh ../bookself",
                    "python3 scripts/check-shelf-boundary.py",
                    "git diff --quiet -- reader",
                    "git add reader",
                    "git pull --rebase origin main",
                    "git push origin HEAD:main",
                ]
                missing = [needle for needle in required if needle not in text]
                if missing:
                    fail(f"Reader sync writer escaped its guarded contract: {', '.join(missing)}")
            if re.search(r"^\s*permissions:\s*write-all\s*$", text, flags=re.M | re.I):
                fail(f"custom workflow may not use permissions: write-all: {relative}")

    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    released = set(re.findall(r"\]\(books/([a-z0-9][a-z0-9-]*)/\)", readme, flags=re.I))
    for slug in released:
        if not (ROOT / "books" / slug / "README.md").is_file():
            fail(f"released README entry has no publication directory: {slug}")

    print(
        f"Shelf boundary OK: {len(books)} catalog entries; {len(released)} README-linked releases; "
        "local Reader runtime; guarded Reader sync writer."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
