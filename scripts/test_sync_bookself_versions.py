#!/usr/bin/env python3

import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("sync-bookself-versions.py")
SPEC = importlib.util.spec_from_file_location("sync_bookself_versions", MODULE_PATH)
sync_versions = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(sync_versions)


class ReaderVersionSyncTests(unittest.TestCase):
    def test_mirrors_common_asset_versions_and_preserves_shelf_only_assets(self):
        upstream = """
<link rel="stylesheet" href="css/style.css?v=r12">
<script type="module" src="js/app.js?v=r7"></script>
<script type="module" src="js/gui.js?v=r2"></script>
"""
        shelf = """
<link rel="stylesheet" href="css/style.css?v=r11">
<link rel="stylesheet" href="css/shelf-only.css?v=s3">
<script type="module" src="js/app.js?v=r5"></script>
<script type="module" src="js/gui.js?v=r1"></script>
"""
        result = sync_versions.mirror_index_versions(upstream, shelf)
        self.assertIn('css/style.css?v=r12', result)
        self.assertIn('js/app.js?v=r7', result)
        self.assertIn('js/gui.js?v=r2', result)
        self.assertIn('css/shelf-only.css?v=s3', result)

    def test_mirrors_upstream_cache_generation_without_replacing_shelf_worker(self):
        upstream = "const CACHE = 'bookself-reader-shell-v115';\n"
        shelf = (
            "const CACHE = 'sven-shelf-reader-v114';\n"
            "const SHELF_ONLY = true;\n"
        )
        result = sync_versions.mirror_cache_generation(upstream, shelf)
        self.assertIn("const CACHE = 'sven-shelf-reader-bookself-v115';", result)
        self.assertIn("const SHELF_ONLY = true;", result)

    def test_sync_versions_updates_only_shelf_index_and_worker(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            bookself = root / "bookself"
            shelf = root / "shelf"
            (bookself / "reader").mkdir(parents=True)
            (shelf / "reader").mkdir(parents=True)
            (bookself / "reader" / "index.html").write_text(
                '<script src="js/app.js?v=r9"></script>\n', encoding="utf-8"
            )
            (bookself / "reader" / "sw.js").write_text(
                "const CACHE = 'bookself-reader-shell-v120';\n", encoding="utf-8"
            )
            (shelf / "reader" / "index.html").write_text(
                '<script src="js/app.js?v=r4"></script>\n', encoding="utf-8"
            )
            (shelf / "reader" / "sw.js").write_text(
                "const CACHE = 'sven-shelf-reader-v90';\n"
                "const OWNED = 'shelf';\n",
                encoding="utf-8",
            )

            sync_versions.sync_versions(bookself, shelf)

            self.assertIn(
                'js/app.js?v=r9',
                (shelf / "reader" / "index.html").read_text(encoding="utf-8"),
            )
            worker = (shelf / "reader" / "sw.js").read_text(encoding="utf-8")
            self.assertIn("sven-shelf-reader-bookself-v120", worker)
            self.assertIn("const OWNED = 'shelf';", worker)


if __name__ == "__main__":
    unittest.main()
