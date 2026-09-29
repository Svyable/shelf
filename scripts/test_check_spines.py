#!/usr/bin/env python3

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("check-spines.py")
SPEC = importlib.util.spec_from_file_location("check_spines", MODULE_PATH)
assert SPEC and SPEC.loader
check_spines = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(check_spines)

BINDING = "oxblood"
COLOR = check_spines.COLORS[BINDING]


def spine_row(
    binding=BINDING, height="medium", thickness="thick", foil="gold",
    font="wonk", bands="gilt-double",
) -> str:
    return (
        "| **Spine** | binding: "
        f"{binding} · height: {height} · thickness: {thickness} · foil: {foil} · "
        f"font: {font} · bands: {bands} |"
    )


def fixture(root: Path, *, catalog=("demo",), spines=True) -> None:
    (root / "books" / "demo").mkdir(parents=True, exist_ok=True)
    (root / "catalog.json").write_text(
        json.dumps({"version": 1, "books": list(catalog)}), encoding="utf-8"
    )
    (root / "books" / "demo" / "README.md").write_text(
        f"# Demo\n\n| | |\n|---|---|\n{spine_row()}\n", encoding="utf-8"
    )
    if spines:
        (root / "spines.json").write_text(
            json.dumps(
                {
                    "version": 1,
                    "palette": check_spines.COLORS,
                    "fonts": check_spines.FONT_SPECS,
                    "bands": check_spines.BANDS,
                    "books": {
                        "demo": {
                            "binding": BINDING,
                            "color": COLOR,
                            "height": "medium",
                            "height_px": check_spines.HEIGHTS["medium"],
                            "thickness": "thick",
                            "thickness_px": check_spines.THICKNESSES["thick"],
                            "foil": "gold",
                            "font": "wonk",
                            "bands": "gilt-double",
                            "chapters": 9,
                            "words": 31000,
                        }
                    },
                }
            ),
            encoding="utf-8",
        )


def tamper(root: Path, slug: str, key: str, value) -> None:
    data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
    data["books"][slug][key] = value
    (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")


class SpineCheckTests(unittest.TestCase):
    def test_consistent_spines_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            self.assertEqual(check_spines.check(root), [])

    def test_color_must_match_binding(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "color", "#000000")
            self.assertIn(
                "does not match binding", "\n".join(check_spines.check(root))
            )

    def test_height_px_must_match_height_class(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "height_px", 999)
            self.assertIn("height_px", "\n".join(check_spines.check(root)))

    def test_thickness_px_must_match_thickness_class(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "thickness_px", 999)
            self.assertIn("thickness_px", "\n".join(check_spines.check(root)))

    def test_json_must_mirror_the_readme_row(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            (root / "books" / "demo" / "README.md").write_text(
                f"# Demo\n\n| | |\n|---|---|\n{spine_row(height='tall')}\n",
                encoding="utf-8",
            )
            self.assertIn(
                "README Spine height", "\n".join(check_spines.check(root))
            )

    def test_catalog_book_without_a_spine_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, catalog=("demo", "other"))
            self.assertIn(
                "catalog book has no spine: other", "\n".join(check_spines.check(root))
            )

    def test_non_catalog_spine_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
            data["books"]["ghost"] = dict(data["books"]["demo"])
            (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")
            self.assertIn(
                "non-catalog book: ghost", "\n".join(check_spines.check(root))
            )

    def test_missing_readme_spine_row_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            (root / "books" / "demo" / "README.md").write_text(
                "# Demo\n\n| | |\n|---|---|\n| **Status** | Published |\n",
                encoding="utf-8",
            )
            self.assertIn("has no Spine row", "\n".join(check_spines.check(root)))

    def test_palette_must_match_generator(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
            data["palette"] = {BINDING: "#123456"}
            (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")
            self.assertIn("palette does not match", "\n".join(check_spines.check(root)))

    def test_missing_spines_file_fails_cleanly(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root, spines=False)
            self.assertIn("cannot read spines.json", "\n".join(check_spines.check(root)))

    def test_extent_must_be_a_positive_integer(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "chapters", 0)
            self.assertIn("chapters must be a positive integer", "\n".join(check_spines.check(root)))

    def test_extent_must_not_be_a_boolean(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "words", True)
            self.assertIn("words must be a positive integer", "\n".join(check_spines.check(root)))

    def test_unknown_font_token_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "font", "papyrus")
            self.assertIn("invalid font 'papyrus'", "\n".join(check_spines.check(root)))

    def test_unknown_band_token_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            tamper(root, "demo", "bands", "rainbow")
            self.assertIn("invalid bands 'rainbow'", "\n".join(check_spines.check(root)))

    def test_font_must_mirror_the_readme_row(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            (root / "books" / "demo" / "README.md").write_text(
                f"# Demo\n\n| | |\n|---|---|\n{spine_row(font='didone')}\n", encoding="utf-8"
            )
            self.assertIn("README Spine font='didone' does not match", "\n".join(check_spines.check(root)))

    def test_fonts_block_must_match_generator(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
            data["fonts"] = {"wonk": {"family": "Papyrus", "stack": "serif", "size": 1, "weight": 400, "tracking": 0.05, "variable": ""}}
            (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")
            self.assertIn("fonts do not match", "\n".join(check_spines.check(root)))

    def test_bands_block_must_match_generator(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
            data["bands"] = {"gilt-double": {"head": "gilt", "tail": "none"}}
            (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")
            self.assertIn("bands do not match", "\n".join(check_spines.check(root)))

    def test_font_optical_size_must_be_positive(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            data = json.loads((root / "spines.json").read_text(encoding="utf-8"))
            data["fonts"] = {k: dict(v) for k, v in check_spines.FONT_SPECS.items()}
            data["fonts"]["wonk"]["size"] = 0
            (root / "spines.json").write_text(json.dumps(data), encoding="utf-8")
            errors = "\n".join(check_spines.check(root))
            self.assertIn("fonts do not match", errors)

    def test_update_mode_preserves_curated_font_and_bands(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            fixture(root)
            gen = check_spines.gen
            parsed = gen.parse_spine(
                (root / "books" / "demo" / "README.md").read_text(encoding="utf-8")
            )
            self.assertEqual(parsed["font"], "wonk")
            self.assertEqual(parsed["bands"], "gilt-double")
            # --update derives everything else but must not clobber a curated face
            gen.write_spine_row(root / "books" / "demo" / "README.md", {
                "binding": "navy", "height": "tall", "thickness": "slim",
                "foil": "blind", "font": "didone", "bands": "blind-head",
            })
            again = gen.parse_spine(
                (root / "books" / "demo" / "README.md").read_text(encoding="utf-8")
            )
            self.assertEqual(again["font"], "didone")
            self.assertEqual(again["bands"], "blind-head")
            self.assertEqual(again["binding"], "navy")


if __name__ == "__main__":
    unittest.main()
