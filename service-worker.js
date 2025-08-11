
const CACHE_NAME = 'cave-vin-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-64.png','./icon-128.png','./icon-192.png','./icon-256.png','./icon-512.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e)=>{
  const {request} = e;
  if(request.method !== 'GET') return;
  e.respondWith(
    caches.match(request).then(res=> res || fetch(request).then(resp=>{
      // runtime cache (optional)
      return resp;
    }).catch(()=> caches.match('./index.html')))
  );
});
