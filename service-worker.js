/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'barcelonista v.1.4';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/match.html',
  '/player.html',
  '/pages/matches.html',
  '/pages/players.html',
  '/pages/saved-matches.html',
  '/pages/saved-players.html',
  '/pages/team.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/manifest.json',
  '/js/nav.js',
  '/js/api.js',
  '/js/idb.js',
  '/js/db.js',
  '/service-worker.js',
  '/push.js',
  '/logo_fnl.png',
  'images/match-card-img.jpg',
  'images/player-card-img.jpg',
  'images/profile-image.png',
  'images/logo/Logo.png',
  'images/logo/Logo96.png',
  'images/logo/Logo128.png',
  'images/logo/Logo144.png',
  'images/logo/Logo192.png',
  'images/logo/Logo256.png',
  'images/logo/Logo384.png',
  'images/logo/Logo512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const baseUrl = 'https://api.football-data.org/v2/teams/81/';
  const matchUrl = 'https://api.football-data.org/v2/matches/';
  const playerUrl = 'https://api.football-data.org/v2/players/';

  if (event.request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else if (event.request.url.indexOf(matchUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else if (event.request.url.indexOf(playerUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line consistent-return
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // eslint-disable-next-line no-console
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  const title = 'Notif sederhana melalui service worker dan push';
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push Message no payload';
  }

  const option = {
    body,
    icon: '/images/logo/Logo.png',
    badge: '/images/logo/Logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(self.registration.showNotification(title, option));
});
