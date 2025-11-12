/**
 * Service Worker for MyPadiCare PWA
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'mypadicare-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/style.css',
  '/static/css/camera-modal.css',
  '/static/css/error-notifications.css',
  '/static/css/mobile-app.css',
  '/static/js/config.js',
  '/static/js/app_xampp.js',
  '/static/js/gemini.js',
  '/static/manifest.json',
  '/static/libs/tf.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

