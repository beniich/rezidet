# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Arguments de build
ARG VITE_API_URL=/api
ARG VITE_WS_URL=ws://localhost
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_STRIPE_PUBLIC_KEY
ARG VITE_VAPID_PUBLIC_KEY
ARG VITE_APP_NAME=Rezidet
ARG VITE_ENV=production

# Convertir en variables d'env pour Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_URL=$VITE_WS_URL
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY
ENV VITE_VAPID_PUBLIC_KEY=$VITE_VAPID_PUBLIC_KEY
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_ENV=$VITE_ENV

# Installer dépendances
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build:prod

# Stage 2: Nginx
FROM nginx:1.25-alpine AS production

# Copier les assets buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
