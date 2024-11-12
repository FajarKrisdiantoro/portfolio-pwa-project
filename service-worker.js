const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.svg',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/about-banner.png',
  '/assets/images/bootstrap.png',
  '/assets/images/command.png',
  '/assets/images/coreldraw.png',
  '/assets/images/css3.png',
  '/assets/images/espresso.png',
  '/assets/images/git.png',
  '/assets/images/hero-banner-md.png',
  '/assets/images/hero-banner-sm.png',
  '/assets/images/hero-banner.png',
  '/assets/images/html5.png',
  '/assets/images/java.png',
  '/assets/images/javascript.png',
  '/assets/images/laravel.png',
  '/assets/images/latte-art.png',
  '/assets/images/mokapot.png',
  '/assets/images/mysql.png',
  '/assets/images/powerpoint.png',
  '/assets/images/printer.png',
  '/assets/images/project-1.png',
  '/assets/images/project-2.png',
  '/assets/images/project-3.png',
  '/assets/images/project-4.png',
  '/assets/images/project-5.png',
  '/assets/images/project-6.png',
  '/assets/images/project-7.png',
  '/assets/images/react.png',
  '/assets/images/stats-card_icon-1.png',
  '/assets/images/stats-card_icon-2.png',
  '/assets/images/stats-card_icon-3.png',
  '/assets/images/trello.png',
  '/assets/images/v60.png',
  '/assets/images/vs-code.png',
  '/assets/images/word.png',
  '/assets/images/excel.png',

];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Fungsi untuk mengambil semua data langganan dari IndexedDB
function getAllSubscriptions() {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open('pushSubscriptionDB', 1);

      request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('subscriptions', 'readonly');
          const store = transaction.objectStore('subscriptions');

          const data = [];
          const cursorRequest = store.openCursor();

          cursorRequest.onsuccess = (event) => {
              const cursor = event.target.result;
              if (cursor) {
                  data.push(cursor.value);
                  cursor.continue();
              } else {
                  resolve(data);
              }
          };

          cursorRequest.onerror = (event) => {
              reject(event.target.error);
          };
      };

      request.onerror = (event) => {
          reject(event.target.error);
      };
  });
}

// Contoh penggunaan di service worker
self.addEventListener('push', async (event) => {
  const subscriptions = await getAllSubscriptions();
  console.log('Data langganan:', subscriptions);

  const title = 'Notifikasi Baru!';
  const options = {
      body: 'Anda menerima push notifikasi.',
      icon: '/icon.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
