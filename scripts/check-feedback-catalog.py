#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOKS = ROOT / "books"
FEEDBACK_FORM = ROOT / ".github" / "ISSUE_TEMPLATE" / "chapter-feedback.yml"
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def publication_slugs() -> list[str]:
    if not BOOKS.is_dir():
        raise RuntimeError(f"missing books directory: {BOOKS}")
    return sorted(
        path.name
        for path in BOOKS.iterdir()
        if path.is_dir()
        and not path.name.startswith(("_", "style-", "."))
        and SLUG_RE.fullmatch(path.name)
    )


def feedback_slugs() -> list[str]:
    if not FEEDBACK_FORM.is_file():
        raise RuntimeError(f"missing feedback form: {FEEDBACK_FORM}")

    lines = FEEDBACK_FORM.read_text(encoding="utf-8").splitlines()
    book_index = next(
        (index for index, line in enumerate(lines) if line.strip() == "id: book"),
        None,
    )
    if book_index is None:
        raise RuntimeError("chapter-feedback.yml has no `id: book` field")

    options_index = None
    for index in range(book_index + 1, len(lines)):
        stripped = lines[index].strip()
        if stripped == "options:":
            options_index = index
            break
        if stripped.startswith("- type:"):
            break
    if options_index is None:
        raise RuntimeError("chapter-feedback.yml book field has no `options:` list")

    options_indent = len(lines[options_index]) - len(lines[options_index].lstrip())
    slugs: list[str] = []
    for line in lines[options_index + 1 :]:
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip())
        if indent <= options_indent:
            break
        match = re.fullmatch(r"\s*-\s+([a-z0-9][a-z0-9-]*)\s*", line)
        if not match:
            raise RuntimeError(
                "chapter-feedback.yml book options must be unquoted publication slugs; "
                f"could not parse: {line.strip()}"
            )
        slugs.append(match.group(1))

    if not slugs:
        raise RuntimeError("chapter-feedback.yml book options list is empty")
    return slugs


def main() -> int:
    try:
        expected = publication_slugs()
        actual = feedback_slugs()
    except RuntimeError as exc:
        print(f"feedback-catalog: {exc}", file=sys.stderr)
        return 1

    counts = Counter(actual)
    duplicates = sorted(slug for slug, count in counts.items() if count > 1)
    missing = sorted(set(expected) - set(actual))
    stale = sorted(set(actual) - set(expected))
    unsorted = actual != sorted(actual)

    problems: list[str] = []
    if missing:
        problems.append("missing feedback options: " + ", ".join(missing))
    if stale:
        problems.append("feedback options without a publication: " + ", ".join(stale))
    if duplicates:
        problems.append("duplicate feedback options: " + ", ".join(duplicates))
    if unsorted:
        problems.append("feedback options are not sorted by slug")

    if problems:
        for problem in problems:
            print(f"feedback-catalog: {problem}", file=sys.stderr)
        print(
            "Keep .github/ISSUE_TEMPLATE/chapter-feedback.yml in sync with "
            "author publication folders under books/.",
            file=sys.stderr,
        )
        return 1

    print(f"feedback-catalog: {len(expected)} publication slugs covered")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
