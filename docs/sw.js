const version = "0.1.14";
const cacheName = `grodno-${version}`;
const content = [
    `/`,
    `/index.html`,
    // `/index.js`,
    `/lib/mapbox-gl.js`,
    `/css/mapbox-gl.css`,
    `/css/app.css`,
    `/css/spectre.min.css`,
    `/css/spectre-exp.min.css`,
    `/css/spectre-icons.min.css`,
    `/assets/olxrd.png`,
    `/assets/view.png`,
]
self.addEventListener('install', event => {
    event.waitUntil(caches.open(cacheName)
        .then(cache => cache.addAll(content))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => response || fetch(event.request))
    );
});