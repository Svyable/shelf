#!/bin/sh
# Pull shared reader/ + desk/ from a sibling Bookself source checkout.
set -e
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SRC=${1:-"$ROOT/../bookself"}
if [ ! -x "$SRC/scripts/sync-ui.sh" ]; then
  echo "bookself not found at $SRC" >&2
  exit 1
fi
exec "$SRC/scripts/sync-ui.sh" "$ROOT"
