#!/usr/bin/env python3

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("check-catalog.py")
SPEC = importlib.util.spec_from_file_location("check_catalog", MODULE_PATH)
check_catalog = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(check_catalog)


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def fixture(
    root: Path,
    *,
    status: str = "Published",
    catalog: bool = True,
    tags: str = "",
) -> None:
    write(root / "imprint.json", json.dumps({"role": "shelf"}))
    row = "- [Demo](books/demo/)" if catalog else "Nothing listed."
    write(root / "README.md", f"# Test\n\n## The books\n\n{row}\n")
    books = ["demo"] if catalog else []
    write(root / "catalog.json", json.dumps({"version": 1, "books": books}))
    write(
        root / "books" / "demo" / "README.md",
        "# Demo\n\n| | |\n|---|---|\n"
        f"| **Status** | {status} |\n"
        f"| **Tags** | {tags} |\n",
    )


class CatalogCheckTests(unittest.TestCase):
    def test_shelf_catalog_entry_must_be_published(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, status="Drafting", catalog=True)
            self.assertIn("not Published", "\n".join(check_catalog.check(root)))

    def test_published_book_must_be_cataloged(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, status="Published", catalog=False)
            self.assertIn("missing from catalog.json", "\n".join(check_catalog.check(root)))

    def test_style_gallery_specimen_may_be_uncataloged(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, status="Published", catalog=False, tags="style gallery, specimen")
            self.assertEqual(check_catalog.check(root), [])

    def test_draft_may_be_uncataloged(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, status="Drafting", catalog=False)
            self.assertEqual(check_catalog.check(root), [])

    def test_catalog_entry_must_have_publication_hub(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            (root / "books" / "demo" / "README.md").unlink()
            self.assertIn("no readable", "\n".join(check_catalog.check(root)))


if __name__ == "__main__":
    unittest.main()
