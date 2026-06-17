const CACHE_NAME = 'llm-chat-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event: cache all required files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch event: serve cached files if available, else fetch from network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
