#!/bin/sh
# Pull reader/ from the sibling Open Book Binder repo (source of truth).
set -e
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SRC=${1:-"$ROOT/../openbookbinder"}
if [ ! -x "$SRC/scripts/sync-reader.sh" ]; then
  echo "openbookbinder not found at $SRC" >&2
  exit 1
fi
exec "$SRC/scripts/sync-reader.sh" "$ROOT"
