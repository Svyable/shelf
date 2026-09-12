#!/usr/bin/env python3
"""Validate Shelf release provenance and require it for new/substantive releases."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCHEMA = "svyable-release-v1"
ALGORITHM = "sha256-tree-v1"
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")


def fail(message: str) -> None:
    raise SystemExit(f"release provenance violation: {message}")


def run_git(*args: str, check: bool = True) -> str:
    proc = subprocess.run(
        ["git", "-C", str(ROOT), *args],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if check and proc.returncode:
        detail = proc.stderr.strip() or proc.stdout.strip() or "git command failed"
        fail(detail)
    return proc.stdout


def catalog_slugs(text: str, label: str) -> set[str]:
    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        fail(f"could not parse {label}: {exc}")
    books = data.get("books") if isinstance(data, dict) else None
    if data.get("version") != 1 or not isinstance(books, list):
        fail(f"{label} must be version 1 with a books array")
    result: set[str] = set()
    for raw in books:
        slug = str(raw).strip()
        if not SLUG_RE.fullmatch(slug) or slug == "_TEMPLATE":
            fail(f"{label} contains invalid slug {raw!r}")
        if slug in result:
            fail(f"{label} repeats slug {slug!r}")
        result.add(slug)
    return result


def current_catalog() -> set[str]:
    return catalog_slugs((ROOT / "catalog.json").read_text(encoding="utf-8"), "catalog.json")


def catalog_at(ref: str) -> set[str]:
    proc = subprocess.run(
        ["git", "-C", str(ROOT), "show", f"{ref}:catalog.json"],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if proc.returncode:
        return set()
    return catalog_slugs(proc.stdout, f"catalog.json at {ref}")


def payload_manifest(book: Path) -> dict[str, str]:
    manifest: dict[str, str] = {}
    for path in sorted(p for p in book.rglob("*") if p.is_file()):
        rel = path.relative_to(book).as_posix()
        if rel in {".DS_Store", "README.md", "release.json"}:
            continue
        manifest[rel] = hashlib.sha256(path.read_bytes()).hexdigest()
    return manifest


def payload_digest(manifest: dict[str, str]) -> str:
    canonical = json.dumps(
        manifest,
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=False,
    ).encode("utf-8")
    return hashlib.sha256(canonical).hexdigest()


def validate_release(slug: str) -> bool:
    path = ROOT / "books" / slug / "release.json"
    if not path.is_file():
        return False
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"books/{slug}/release.json is invalid JSON: {exc}")
    if not isinstance(data, dict) or data.get("schema") != SCHEMA:
        fail(f"books/{slug}/release.json must use schema {SCHEMA}")

    source = data.get("source") or {}
    if source.get("owner") != "Svyable" or source.get("repo") != "desk":
        fail(f"books/{slug}/release.json source must be Svyable/desk")
    if not SHA_RE.fullmatch(str(source.get("commit") or "")):
        fail(f"books/{slug}/release.json must contain a full Desk commit SHA")
    if source.get("path") != f"books/{slug}":
        fail(f"books/{slug}/release.json has the wrong Desk source path")

    destination = data.get("destination") or {}
    if destination.get("owner") != "Svyable" or destination.get("repo") != "shelf":
        fail(f"books/{slug}/release.json destination must be Svyable/shelf")
    if destination.get("path") != f"books/{slug}":
        fail(f"books/{slug}/release.json has the wrong Shelf destination path")

    payload = data.get("payload") or {}
    if payload.get("algorithm") != ALGORITHM:
        fail(f"books/{slug}/release.json must use payload algorithm {ALGORITHM}")
    files = payload_manifest(ROOT / "books" / slug)
    expected_digest = payload_digest(files)
    if payload.get("digest") != expected_digest:
        fail(f"books/{slug} payload bytes no longer match release.json")
    if payload.get("files") != len(files):
        fail(f"books/{slug}/release.json payload file count is stale")
    return True


def changed_substantive_slugs(ref: str) -> set[str]:
    if not ref or set(ref) == {"0"}:
        return set()
    names = run_git("diff", "--name-only", ref, "HEAD", "--", "books", "catalog.json")
    slugs: set[str] = set()
    for raw in names.splitlines():
        path = Path(raw.strip())
        parts = path.parts
        if len(parts) < 3 or parts[0] != "books":
            continue
        slug = parts[1]
        if not SLUG_RE.fullmatch(slug) or slug == "_TEMPLATE":
            continue
        relative = Path(*parts[2:]).as_posix()
        # README is publication presentation metadata. Substantive authored payload
        # changes are everything else except the provenance record itself.
        if relative not in {"README.md", "release.json"}:
            slugs.add(slug)
    return slugs


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--changed-from",
        default="",
        help="Git commit to compare against; new/substantively changed releases must carry provenance",
    )
    args = parser.parse_args()

    current = current_catalog()
    manifested = 0
    for slug in sorted(current):
        if validate_release(slug):
            manifested += 1

    required: set[str] = set()
    if args.changed_from and set(args.changed_from) != {"0"}:
        before = catalog_at(args.changed_from)
        required.update(current - before)
        required.update(changed_substantive_slugs(args.changed_from) & current)

    missing = sorted(slug for slug in required if not (ROOT / "books" / slug / "release.json").is_file())
    if missing:
        fail(
            "new or substantively changed releases require books/<slug>/release.json: "
            + ", ".join(missing)
        )

    print(
        f"Release provenance OK: {manifested} manifested release(s); "
        f"{len(required)} release(s) required provenance in this change."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
