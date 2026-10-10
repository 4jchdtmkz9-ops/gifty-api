#!/bin/bash
set -euo pipefail

if [[ "${GIFTY_BACKUP_CLEAN_ENV:-}" != "1" ]]; then
  exec /usr/bin/env -i GIFTY_BACKUP_CLEAN_ENV=1 HOME="/Users/arturboiko" PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" /bin/bash "$0"
fi

KEYCHAIN_SERVICE="com.orbit.gifty.render-database"
BACKUP_DIR="/Users/arturboiko/Documents/GIFTY Database Backups"
TIMESTAMP="$(/bin/date '+%Y-%m-%d_%H-%M-%S')"
BACKUP_FILE="$BACKUP_DIR/gifty-render-$TIMESTAMP.dump"
TEMP_FILE="$BACKUP_FILE.partial"
PG_DUMP_BIN="/opt/homebrew/opt/libpq/bin/pg_dump"
PSQL_BIN="/opt/homebrew/opt/libpq/bin/psql"

cleanup() {
  if [[ -f "$TEMP_FILE" ]]; then
    /bin/rm -f "$TEMP_FILE"
  fi
}
trap cleanup EXIT

if [[ ! -x "$PG_DUMP_BIN" || ! -x "$PSQL_BIN" ]]; then
  echo "PostgreSQL 18 client tools are missing. Install Homebrew libpq first." >&2
  exit 1
fi

DATABASE_URL="$(/usr/bin/security find-generic-password -a "$(/usr/bin/id -un)" -s "$KEYCHAIN_SERVICE" -w)"
if [[ -z "$DATABASE_URL" ]]; then
  echo "The Render database URL is missing from Keychain." >&2
  exit 1
fi

/bin/mkdir -p "$BACKUP_DIR"
/bin/chmod 700 "$BACKUP_DIR"
umask 077

SERVER_VERSION_NUM="$(PGCONNECT_TIMEOUT=20 "$PSQL_BIN" "$DATABASE_URL" --no-psqlrc --tuples-only --no-align -c 'SHOW server_version_num;')"
SERVER_MAJOR="$((SERVER_VERSION_NUM / 10000))"
DUMP_VERSION="$("$PG_DUMP_BIN" --version | /usr/bin/awk '{ print $NF }')"
DUMP_MAJOR="${DUMP_VERSION%%.*}"
if (( DUMP_MAJOR < SERVER_MAJOR )); then
  echo "pg_dump $DUMP_VERSION is older than server version $SERVER_MAJOR. Install a matching PostgreSQL client." >&2
  exit 1
fi

echo "Creating a private database backup..."
PGCONNECT_TIMEOUT=20 "$PG_DUMP_BIN" --no-owner --no-acl --format=custom --file="$TEMP_FILE" "$DATABASE_URL"
[[ -s "$TEMP_FILE" ]]
/bin/mv "$TEMP_FILE" "$BACKUP_FILE"
/bin/chmod 600 "$BACKUP_FILE"
trap - EXIT
echo "Backup saved: $BACKUP_FILE"
