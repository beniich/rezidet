#!/bin/bash
set -e

# ============== CONFIGURATION ==============
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ============== VÉRIFICATIONS ==============
log_info "🔍 Vérifications préalables..."

if ! command -v docker &> /dev/null; then
  log_error "Docker non installé"
  exit 1
fi

if ! command -v docker compose &> /dev/null && ! docker compose version &> /dev/null; then
  log_error "Docker Compose non installé"
  exit 1
fi

if [ ! -f "backend/.env.production" ]; then
  log_error "backend/.env.production manquant"
  exit 1
fi

if [ ! -f ".env" ]; then
  log_warn ".env racine manquant (variables Docker)"
fi

# ============== BACKUP DB ==============
log_info "📦 Backup de la base de données..."
if docker ps | grep -q rezidet-db; then
  bash scripts/backup-db.sh || log_warn "Backup échoué (continuons)"
else
  log_info "Pas de DB existante, pas de backup nécessaire"
fi

# ============== BUILD & DEPLOY ==============
log_info "🏗️  Build des images Docker..."
docker compose build --no-cache

log_info "🚀 Démarrage des services..."
docker compose up -d --remove-orphans

# ============== ATTENDRE LA DB ==============
log_info "⏳ Attente de la base de données..."
for i in {1..30}; do
  if docker compose exec -T db pg_isready -U rezidet_user &> /dev/null; then
    log_info "✅ DB prête"
    break
  fi
  if [ $i -eq 30 ]; then
    log_error "DB pas prête après 30s"
    exit 1
  fi
  sleep 1
done

# ============== MIGRATIONS ==============
log_info "🗃️  Application des migrations Prisma..."
docker compose exec -T api npx prisma migrate deploy || log_warn "Migrations échouées (peut être normal au premier démarrage)"

# ============== SEED (optionnel, première fois) ==============
if [ "$1" == "--seed" ]; then
  log_info "🌱 Seed de la base de données..."
  docker compose exec -T api node prisma/seed.js
fi

# ============== NETTOYAGE ==============
log_info "🧹 Nettoyage des anciennes images..."
docker image prune -f

# ============== HEALTH CHECK ==============
log_info "🏥 Vérification de santé..."
sleep 10

HEALTH_API=$(docker compose exec -T api wget -qO- http://localhost:8081/api/health 2>/dev/null || echo "FAILED")
HEALTH_UI=$(docker compose exec -T ui wget -qO- http://localhost/health 2>/dev/null || echo "FAILED")

if echo "$HEALTH_API" | grep -q "OK"; then
  log_info "✅ API health: OK"
else
  log_error "❌ API health: $HEALTH_API"
  log_error "Logs de l'API:"
  docker compose logs --tail=20 api
  exit 1
fi

if [ "$HEALTH_UI" = "ok" ]; then
  log_info "✅ UI health: OK"
else
  log_error "❌ UI health: $HEALTH_UI"
fi

# ============== STATUS FINAL ==============
echo ""
log_info "🎉 Déploiement réussi !"
echo ""
log_info "📊 Services actifs:"
docker compose ps
echo ""
log_info "🌐 URLs:"
echo "  - Frontend: http://localhost"
echo "  - API:      http://localhost/api"
echo "  - Health:   http://localhost/api/health"
echo ""
log_info "📝 Commandes utiles:"
echo "  - Logs:      docker compose logs -f"
echo "  - Restart:   docker compose restart"
echo "  - Stop:      docker compose down"
echo "  - Backup:    bash scripts/backup-db.sh"
echo ""

# ============== NOTIFICATION (optionnel) ==============
if [ -n "$SLACK_WEBHOOK_URL" ]; then
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"✅ Rezidet déployé avec succès sur $(hostname)\"}" \
    "$SLACK_WEBHOOK_URL" 2>/dev/null || true
fi
