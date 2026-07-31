const CACHE_NAME = 'cafm-v1';
const RUNTIME_CACHE = 'cafm-runtime-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/sounds/ding.mp3',
  '/sounds/alert.mp3',
  '/sounds/success.mp3'
];

// Installation : cache des assets statiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoyer anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Stratégie : Network First, fallback Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorer les API calls (toujours réseau)
  if (request.url.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    fetch(request)
      .then(response => {
        // Mettre en cache les réponses réussies
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Push notifications (préparation)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'CAFM', {
      body: data.body || '',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: data.url,
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
