# AIPayGen pay-per-crawl: Shelf pilot (not deployed)

Status: **proposal / deployment preflight only**. Nothing in this directory
registers a gateway, changes DNS, deploys a Worker, modifies publication rights,
or charges a crawler. This preserves the existing GitHub Pages Reader.

## Why this needs an edge

Shelf is a no-build GitHub Pages project at
https://svyable.github.io/shelf/. A static HTML/JavaScript change cannot
intercept the original HTTP request or return an HTTP 402 before a crawler
downloads the book. [AIPayGen](https://aipaygen.com/pay-per-crawl) describes
a Cloudflare Worker installed **in front of** the website. Cloudflare cannot
install a route on GitHub's `svyable.github.io` hostname.

A viable pilot therefore needs an owner-controlled hostname served through
Cloudflare, an AIPayGen gateway route registered for that hostname, and a
Worker on the hostname's edge route. The GitHub Pages source can remain the
publishing workflow. Do not change Shelf's Pages source or add a `CNAME`
until the owner chooses the public domain and explicitly authorizes that
migration. GitHub's custom-domain setup is documented at
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site.

**This is a measurement experiment, not DRM.** Shelf's manuscript Markdown
is in a public GitHub repository. Git clone, raw.githubusercontent.com,
other mirrors, GitHub Pages' default domain, previously indexed copies, and
reader-side downloads can bypass a charge on the new domain. Switching the
main canonical site is a separate, deliberate publication/discovery decision.
Do not report a complete paywall or guaranteed crawler revenue.

## Guardrails

1. **Start report-only.** Use AIPayGen's no-wallet/no-charge monitoring mode.
   Reconcile actual hits, report completeness, and bot identity before
   allowing charge mode. Major AI crawlers do not currently reliably make
   x402 payments; hypothetical gross receipts are not realized earnings.
2. **Keep human reading free.** Preserve the Reader, mobile pages, images,
   assets, Markdown chapter links, `robots.txt`, `sitemap.xml`, and
   `llms.txt`. Confirm that Googlebot and Bingbot can still fetch content.
   Evaluate whether to keep AI search/user-request crawlers free to retain
   discoverability and citations.
3. **Rights stay reserved.** `RIGHTS.md` and each publication's rights
   metadata remain authoritative. Payment for a page is not, by itself, a
   license for training, derivative works, retrieval corpora, or reuse.
   Inspect AIPayGen's generated `/.well-known/ai-terms` / RSL terms
   before publishing them; do not enable an automatic training license or
   alter `RIGHTS.md` as part of this pilot. The vendor's AI Terms 0.1 is
   a draft: https://aipaygen.com/ai-terms.
4. **Protect secrets.** The AIPayGen API key, `gateway_secret`, and future
   wallet credentials go in Cloudflare secrets / the owner's account, never
   in GitHub, HTML, this repo, CI logs, query strings, or browser JavaScript.
   Payments, if authorized later, use an owner-confirmed wallet on Base.
5. **Fail without blocking readers.** Monitor vendor availability, latency,
   errors, and Worker quotas. Never proxy visitor cookies or authorization
   headers to the gateway. Avoid cached 402 responses for humans. Keep a
   rollback path to remove the Worker route.
6. **Review third-party disclosures.** Determine what path, user-agent, IP
   or aggregate traffic information the monitoring implementation sends to
   AIPayGen and whether the site's privacy disclosures need updating.

## Deployment sequence (requires an owner-selected domain/account)

- [ ] Choose and verify the hostname and its ownership; decide whether to
      retain the `/shelf/` path or move to the hostname root. Decide how
      `svyable.github.io/shelf/` canonical URLs, absolute links, redirects,
      social previews, Reader state, and search indexing will be handled.
- [ ] Configure the hostname's DNS with Cloudflare and GitHub Pages (or
      deliberate Cloudflare Pages migration). Do not put a Worker on the
      existing `github.io` address, which is not ours to manage.
- [ ] Register a *report-only* route at
      https://aipaygen.com/pay-per-crawl for this hostname; keep the ID and
      gateway secret off-repo. Review AIPayGen's generated Cloudflare Worker
      integration against the vendor's latest instructions before deploying;
      do not copy a stale generic snippet from this repository.
- [ ] Install the generated Worker on the Cloudflare hostname/route,
      configure its secret using Cloudflare's secret store, and verify its
      origin path resolves all Shelf book and Reader URLs. Enable no-cost
      report mode, not `charge`. Confirm requests with and without payment
      headers cannot bypass classification in ways that harm ordinary users.
- [ ] Check `/.well-known/ai-terms` and its **exact** licensing language
      against `RIGHTS.md`; do not publish an accidental license.
- [ ] Run `python3 scripts/check-pay-per-crawl.py --url
      https://YOUR-HOSTNAME/ --mode monitor` and repeat for a representative
      chapter URL. Verify site navigation and a complete Reader session
      manually. See whether real crawler hits appear in the vendor's report.
- [ ] After an observation window (suggest 7-14 days), compare bot counts,
      valid vs spoofed identity, indexed pages, search referrals, and vendor
      costs. Any decision to charge requires separate owner approval,
      rights/terms review, wallet verification and a controlled smoke test.
- [ ] For a charge-mode test on a deliberately priced URL, run
      `python3 scripts/check-pay-per-crawl.py --url
      https://YOUR-HOSTNAME/PRICED-PAGE --mode charge`.
      A 402 does not prove that a real payment settled; test that separately
      with an authorized low-value payment if the owner elects to go live.
- [ ] Roll back by removing the Worker route or restoring the known-good
      DNS/Pages settings. Confirm the old Reader remains reachable.

## Scope

This pilot is intentionally separate from manuscripts, Reader source,
`catalog.json`, `llms.txt`, `RIGHTS.md`, and the release pipeline.
No publishing content or license is changed to accommodate this product.

The smoke-test script makes **no payments**, uses no credentials, and
does not modify the target site. In charge mode it tests only the 402
challenge, not successful settlement.
