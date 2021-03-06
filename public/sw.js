const cacheName = 'v6';

const cacheAssets = [
    '/',
    '/dist/custom-d41d8cd98f.css',
    '/dist/uikit-8167ee319a.css',
    '/dist/uikit-e1e797e571.js'
];

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        caches
        .match(e.request)
        .then(response => {
            if(response){
                return response
            }
            return fetch(e.request)
            .catch(()=> caches.match('/offline'))
        })
    )
        // fetch(e.request)
        // .catch(() => caches.match(e.request)));
});
