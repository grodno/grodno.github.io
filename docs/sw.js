const version = "0.1.9";
const cacheName = `grodno-${version}`;
const IMG_STUB = 'data:image/jpeg;base64,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'
const content = [
    `/`,
    `/index.html`,
    `/index.js`,
    `/css/app.css`,
    `/css/spectre.min.css`,
    `/css/spectre-exp.min.css`,
    `/css/spectre-icons.min.css`,
    `/assets/grodno.svg`,
    `/assets/logo.jpg`
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
            .then(response => response || fetch(event.request).then((r) => {
                if (!r.status || r.status >= 400) {
                    const url = event.request.referrer + 'assets/logo.jpg'
                    // console.log('sw fetch', url);
                    return fetch(event.request)
                }
                return r;
            }))

    );
});