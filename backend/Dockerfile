# Stage 1: Builder (avec devDeps pour Prisma)
FROM node:20-alpine AS builder
WORKDIR /app

# Dépendances système pour Prisma
RUN apk add --no-cache openssl

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer TOUTES les dépendances (dev + prod) pour la génération
RUN npm ci

# Générer Prisma Client
RUN npx prisma generate

# Copier le code source
COPY . .

# Stage 2: Production (uniquement prodDeps)
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8081

# Installer uniquement les dépendances de production
RUN apk add --no-cache openssl dumb-init

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production && npm cache clean --force

# Copier Prisma Client généré
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copier le code source
COPY --from=builder /app/src ./src

# Créer un user non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    mkdir -p /app/uploads && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 8081

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8081/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"

# Utiliser dumb-init pour gérer les signaux
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]
