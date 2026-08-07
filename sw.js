const CACHE = 'kincskereso-v4';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // cache:'reload' → kerüli a böngésző HTTP-gyorsítótárát, tényleg friss fájlt tölt
      .then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== 'kincskereso-tiles').map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Térképcsempék: cache-first, offline is megmaradnak
  if (url.hostname.indexOf('tile.openstreetmap.org') >= 0) {
    e.respondWith(caches.open('kincskereso-tiles').then(c =>
      c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit))
    ));
    return;
  }

  const isDoc = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').indexOf('text/html') >= 0;

  // A lap maga: HÁLÓZAT ELŐSZÖR, hogy a frissítés azonnal látszódjon. Cache csak offline tartalék.
  if (isDoc) {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return r;
      }).catch(() => caches.match('./index.html').then(hit => hit || caches.match('./')))
    );
    return;
  }

  // Minden más (ikonok, manifest): cache-first
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (url.origin === location.origin && r.ok) {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return r;
  })));
});
