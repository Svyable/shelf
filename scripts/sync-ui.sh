#!/bin/sh
# Sync reusable Bookself Reader engine files without replacing Shelf-owned state.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SRC=${1:-"$ROOT/../bookself"}
SYNC="$SRC/scripts/sync-ui.py"

if [ ! -f "$SYNC" ]; then
  echo "bookself sync tool not found at $SYNC" >&2
  exit 1
fi

# --shelf-safe is deliberately required. Older Bookself checkouts that only know
# the legacy whole-tree sync will fail here instead of overwriting Shelf's shell,
# service worker, adapter, identity styles, or copying Bookself's Desk into Shelf.
exec python3 "$SYNC" --shelf-safe "$ROOT"
