# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Installer les dépendances système pour Prisma
RUN apk add --no-cache openssl

# Copier package files
COPY package*.json ./
COPY prisma ./prisma/

# Installer dépendances
RUN npm ci --only=production

# Générer Prisma Client
RUN npx prisma generate

# Copier le code source
COPY . .

# Étape 2 : Production
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Installer dumb-init pour gestion des signaux
RUN apk add --no-cache dumb-init openssl

# Créer user non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copier depuis builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Démarrer avec dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]
