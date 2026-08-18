#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }

log_warn "⏪ ROLLBACK en cours..."

# Option 1: Restaurer le dernier backup
LATEST_BACKUP=$(ls -t backups/db_*.sql.gz 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  log_warn "Aucun backup trouvé, rollback vers commit précédent uniquement"
  
  # Rollback Git
  git checkout HEAD~1
else
  log_info "📦 Restauration du backup: $LATEST_BACKUP"
  
  # Demander confirmation
  read -p "⚠️  Confirmer la restauration ? (yes/no) " -n 3 -r
  echo
  if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    # Drop + Recreate DB
    docker compose exec -T db psql -U rezidet_user -c "DROP DATABASE rezidet_prod;"
    docker compose exec -T db psql -U rezidet_user -c "CREATE DATABASE rezidet_prod;"
    
    # Restore
    gunzip -c "$LATEST_BACKUP" | docker compose exec -T db psql -U rezidet_user rezidet_prod
    log_info "✅ Base restaurée"
  fi
fi

# Redémarrer
log_info "🔄 Redémarrage des services..."
docker compose up -d --build

log_info "✅ Rollback terminé"
