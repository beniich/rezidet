#!/bin/bash
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/backups"
mkdir -p "$BACKUP_DIR"

BACKUP_FILE="$BACKUP_DIR/db_${TIMESTAMP}.sql.gz"

# Vérifier que le conteneur DB existe
if ! docker ps | grep -q rezidet-db; then
  echo "❌ Conteneur rezidet-db non démarré"
  exit 1
fi

echo "📦 Backup en cours vers $BACKUP_FILE..."

docker compose exec -T db pg_dump -U rezidet_user rezidet_prod | gzip > "$BACKUP_FILE"

SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "✅ Backup créé: $BACKUP_FILE ($SIZE)"

# Garder les 30 derniers backups
echo "🧹 Nettoyage des anciens backups (garder 30)..."
ls -t "$BACKUP_DIR"/db_*.sql.gz 2>/dev/null | tail -n +31 | xargs -r rm

COUNT=$(ls "$BACKUP_DIR"/db_*.sql.gz 2>/dev/null | wc -l)
echo "📊 Backups conservés: $COUNT"
