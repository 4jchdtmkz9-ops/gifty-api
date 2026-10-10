#!/bin/bash
set -euo pipefail

PROJECT_DIR="/Users/arturboiko/gifty/apps/api"
BACKUP_SCRIPT="$PROJECT_DIR/scripts/backup-render-db.sh"
AGENT_DIR="/Users/arturboiko/Library/LaunchAgents"
AGENT_FILE="$AGENT_DIR/com.orbit.gifty-db-backup.plist"
AGENT_LABEL="com.orbit.gifty-db-backup"
KEYCHAIN_SERVICE="com.orbit.gifty.render-database"

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "pg_dump is not installed. Install PostgreSQL client tools, then run this again."
  read -r -p "Press Enter to close..."
  exit 1
fi

if ! /usr/bin/security find-generic-password -a "$(/usr/bin/id -un)" -s "$KEYCHAIN_SERVICE" -w >/dev/null 2>&1; then
  echo "Paste the External Database URL from Render > gifty_db_8wiz > Connect."
  echo "The URL will be hidden and saved only in your macOS Keychain."
  read -r -s -p "External Database URL: " DATABASE_URL
  echo
  if [[ "$DATABASE_URL" != postgres://* && "$DATABASE_URL" != postgresql://* ]]; then
    echo "That does not look like a PostgreSQL URL. Nothing was saved."
    read -r -p "Press Enter to close..."
    exit 1
  fi

  /usr/bin/security add-generic-password -U -a "$(/usr/bin/id -un)" -s "$KEYCHAIN_SERVICE" -w "$DATABASE_URL" >/dev/null
  unset DATABASE_URL
  if ! /usr/bin/security find-generic-password -a "$(/usr/bin/id -un)" -s "$KEYCHAIN_SERVICE" -w >/dev/null 2>&1; then
    echo "Could not verify the database URL in Keychain. Nothing was scheduled."
    read -r -p "Press Enter to close..."
    exit 1
  fi
else
  echo "Using the database URL already saved in your macOS Keychain."
fi

/bin/mkdir -p "$AGENT_DIR"
/bin/chmod +x "$BACKUP_SCRIPT"

cat > "$AGENT_FILE" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$AGENT_LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/env</string>
    <string>-i</string>
    <string>HOME=/Users/arturboiko</string>
    <string>PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    <string>/bin/bash</string>
    <string>$BACKUP_SCRIPT</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
  <key>StandardOutPath</key><string>/Users/arturboiko/Library/Logs/gifty-db-backup.log</string>
  <key>StandardErrorPath</key><string>/Users/arturboiko/Library/Logs/gifty-db-backup-error.log</string>
</dict>
</plist>
PLIST

/bin/mkdir -p "/Users/arturboiko/Library/Logs"
/bin/chmod 600 "$AGENT_FILE"
/usr/bin/plutil -lint "$AGENT_FILE"
/bin/launchctl bootout "gui/$(/usr/bin/id -u)" "$AGENT_FILE" >/dev/null 2>&1 || true
/bin/launchctl bootstrap "gui/$(/usr/bin/id -u)" "$AGENT_FILE"

echo "Starting the first backup now..."
 /usr/bin/env -i HOME="/Users/arturboiko" PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" /bin/bash "$BACKUP_SCRIPT"
echo "Daily backups are scheduled for 09:00. Files are stored in:"
echo "/Users/arturboiko/Documents/GIFTY Database Backups"
echo "To copy them to Google Drive, use Drive for desktop to sync that folder."
if [[ -t 0 ]]; then
  read -r -p "Press Enter to close..."
fi
