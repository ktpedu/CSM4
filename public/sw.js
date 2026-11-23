// ====================================================================
// CSM4 Progressive Web App (PWA) Service Worker
// Version: 5.6
// School: Wangnamyenwittayakom School
// ====================================================================

const CACHE_NAME = 'csm4-pwa-v5.6';
const RUNTIME_CACHE = 'csm4-runtime-v5.6';

// Core App Shell Assets for Offline Access
const CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './img/LOGOprofile.gif',
  './img/teacher_panittha.jpg',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/icon-maskable-192.png',
  './img/icon-maskable-512.png',
  './img/apple-touch-icon.png',
  './unit1.html',
  './unit2.html',
  './ebook.html',
  './flowgorithm-guide.html',
  './vendor/fontawesome/css/all.min.css',
  './vendor/supabase/supabase.js'
];

// Install Event: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Use individual caching so failure of a single asset doesn't break installation
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn(`[PWA SW] Precache warning for ${asset}:`, err.message);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!currentCaches.includes(name)) {
            console.log('[PWA SW] Deleting obsolete cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Intelligent offline caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip chrome-extension schemes and unsupported protocols
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // 1. Navigation requests (HTML pages) -> Network-First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Fallback to cached index.html if specific page isn't cached
          const indexFallback = await caches.match('./index.html');
          if (indexFallback) return indexFallback;

          return new Response(
            `<!DOCTYPE html>
            <html lang="th">
            <head><meta charset="UTF-8"><title>CS-M4 ออฟไลน์</title></head>
            <body style="font-family:sans-serif;text-align:center;padding:40px;background:#0f172a;color:#f8fafc;">
              <h2>⚠️ คุณกำลังอยู่ในโหมดออฟไลน์</h2>
              <p>กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตเพื่อโหลดหน้านี้ หรือกลับไปยัง <a href="./index.html" style="color:#00b400;">หน้าแรก</a></p>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 2. Static Assets (CSS, JS, Fonts, Images) -> Stale-While-Revalidate
  const isStatic = (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.includes('/vendor/') ||
    url.pathname.includes('/fonts/') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  );

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse); // On network error, fall back gracefully to cache

        // Return cached version immediately if exists, while refreshing in background
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. API & Cloud requests (Supabase REST, etc.) -> Network-First with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedApiResponse = await caches.match(request);
        if (cachedApiResponse) return cachedApiResponse;
        throw new Error('Network offline and no cache available');
      })
  );
});

// Message Event: Skip waiting when instructed
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
