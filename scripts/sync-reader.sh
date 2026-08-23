#!/bin/sh
# Pull reader/ from the sibling Bookself repo (source of truth) into this shelf.
set -e
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SRC=${1:-"$ROOT/../bookself"}
if [ ! -x "$SRC/scripts/sync-reader.sh" ]; then
  echo "bookself not found at $SRC" >&2
  exit 1
fi
exec "$SRC/scripts/sync-reader.sh" "$ROOT"
