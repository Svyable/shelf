#!/bin/sh
# Compatibility alias. Bookself now synchronizes shared reader/ + desk/ UI.
set -e
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
exec "$ROOT/scripts/sync-ui.sh" "$@"
