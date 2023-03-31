// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open('first-app')
//         .then(function(cache) {
//           cache.addAll([
//             '/',
//             '/index.html',
//             '/blog.html',
//             '/contact.html',
//             '/about.html',
//             '/portfolio-example01.html',
//             '/style.css',
//             '/images/logo.png',
//             '/images/example-work01.jpg',
//             '/images/example-work07.jpg',
//             '/images/example-work02.jpg',
//             '/images/example-work03.jpg',
//             '/images/example-work04.jpg',
//             '/images/example-work05.jpg',
//             '/images/example-work06.jpg',
//             '/images/example-work08.jpg',
//             '/images/example-work09.jpg'
//           ])
//         })
//     );
//     return self.clients.claim();
//   });


self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  self.skipWaiting(); //PENTING bila ada versi baru!!
  event.waitUntil(
    caches.open('static')
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
            '/',
            '/index.html',
            '/blog.html',
            '/contact.html',
            '/about.html',
            '/portfolio-example01.html',
            '/style.css',
            '/images/logo.png',
            '/images/example-work01.jpg',
            '/images/example-work07.jpg',
            '/images/example-work02.jpg',
            '/images/example-work03.jpg',
            '/images/example-work04.jpg',
            '/images/example-work05.jpg',
            '/images/example-work06.jpg',
            '/images/example-work08.jpg',
            '/images/example-work09.jpg'
        ]);
      })
  )
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_DYNAMIC_NAME)
      .then(function(cache) {
        return fetch(event.request)
          .then(function(res) {
            cache.put(event.request, res.clone());
            return res;
          });
      })
  );
});
