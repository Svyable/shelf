# Candidate integrity audit — The Unobserved World

**Audited:** September 7, 2026  
**Desk source:** `a20593217ad7d87adc757f078b9d29eb43b6dfaf`  
**Scope:** candidate-specific repository integrity only; this does not substitute for the full local `scripts/check-desk.py` command.

## Result

**Candidate-specific Desk integration is coherent on the audited source.** No title-specific catalog, route, discovery, source-schema, or hosted-workflow defect was found for *The Unobserved World*.

The remaining publication gate is therefore narrow and objective: the frozen source still needs the repository's literal full-book length result and full Desk integrity command result. This audit does not fabricate either command execution.

## Checks performed against the current repository contract

- `catalog.json` contains `the-unobserved-world` in the canonical book manifest.
- The root `README.md` dashboard contains the canonical `books/the-unobserved-world/` row and matching direct Reader slug.
- `.github/ISSUE_TEMPLATE/chapter-feedback.yml` contains `the-unobserved-world` in the Book dropdown.
- `llms.txt` contains the canonical book README route.
- `sitemap.xml` contains the canonical book README route.
- `research/source-ledger.csv` uses the exact current Desk schema: `id,year,author_or_institution,title,source_type,book_use,url`.
- The repository has no `.github/workflows` directory on the audited source, preserving Desk's zero-Actions invariant.
- The canonical book README remains `Complete draft`, 20 of 20 numbered chapters, with front matter, back matter, research, and rights links intact.

## Mechanical state carried forward

The existing release review records the exact checker regex and the September 7 bounded remediation. It identifies the only five chapters that were below the 3,000-word floor before that pass and records their post-remediation counts as 3,144 / 3,067 / 3,078 / 3,081 / 3,066. It also records a projected 66,717-word numbered-chapter corpus after the append-only remediation.

Those facts are strong evidence but are intentionally not promoted into a literal checker pass. `scripts/check-book-length.py` now supports a `--counts` mode for frozen sources reviewed without a checkout, but that mode requires a complete exact path-to-count map for all numbered chapters. The canonical repository does not currently store that complete map, so no synthetic counts file is being invented.

## Remaining publication conditions

1. Freeze the intended Desk source.
2. Obtain a literal successful `python3 scripts/check-book-length.py the-unobserved-world` result, or the repository-equivalent `--counts` result built from a complete exact count map for that same frozen source.
3. Obtain a literal successful `python3 scripts/check-desk.py` result on that frozen source under the current repository convention.
4. If both pass and no newer manuscript/research/rights change introduces a blocker, proceed directly to the matched Desk/Shelf publication transaction. No additional factual or human-review gate is created by this audit.
