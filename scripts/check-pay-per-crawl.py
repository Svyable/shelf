#!/usr/bin/env python3
"""Read-only smoke test for a separately deployed pay-per-crawl edge.

No credentials, payments, mutations, or crawling beyond three HTTP GETs.
"""
import argparse
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

AGENTS = (
    ("human", "Mozilla/5.0 (compatible; ShelfSmokeTest/1.0)", 200),
    ("search", "Googlebot/2.1 (+http://www.google.com/bot.html)", 200),
    ("AI", "GPTBot/1.0", None),
)


def probe(url: str, agent: str):
    request = Request(url, headers={"User-Agent": agent, "Accept": "text/html"})
    try:
        with urlopen(request, timeout=15) as response:
            return response.status, response.headers, response.url
    except HTTPError as response:
        return response.code, response.headers, response.url


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True, help="Full URL including trailing slash when needed")
    parser.add_argument("--mode", required=True, choices=("monitor", "charge"))
    args = parser.parse_args()

    if not args.url.startswith("https://"):
        parser.error("Specify an HTTPS page URL")
    failed = False
    for name, agent, expected in AGENTS:
        expected = (200 if args.mode == "monitor" else 402) if name == "AI" else expected
        try:
            actual, headers, final = probe(args.url, agent)
            ok = actual == expected
            if name == "AI" and args.mode == "charge":
                ok = ok and bool(headers.get("payment-required"))
            if final != args.url:
                print(f"  {name}: redirected to {final}; inspect canonical route and bypass")
            print(f"{'PASS' if ok else 'FAIL'} {name}: HTTP {actual}, expected {expected}"
                  + (", Payment-Required header expected" if name == "AI" and args.mode == "charge" else ""))
            failed |= not ok
        except (URLError, TimeoutError, OSError) as exc:
            print(f"FAIL {name}: {exc}")
            failed = True
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
