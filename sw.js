const CACHE = 'list-timer-v1';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'icons/icon-192.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(res=>res || fetch(e.request))
  );
});
