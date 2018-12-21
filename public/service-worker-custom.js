this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('neighborhood-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '../utils/Places.js',
        '../src/icons/search.svg',
        '../src/App.js',
        '../src/Map.js',
        '../src/SideNavBar.js',
        '../src/App.css',
        '../src/Map.css'
      ]);
    }).catch(err => console.log('ERROR', err))
  );
});

// Event that when fired deletes the cache
this.addEventListener('activate', function (event) {
  let cacheName = ['neighborhood-cache'];
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    }).catch(err => console.log('ERROR', err))
  );
});

// Event that intercept any resource controlled by the service worker
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      // Clone the request
      let cloneRequest = event.request.clone();

      return fetch(cloneRequest, { mode: "no-cors" }).then(
        function (response) {
          // Checks if the received response is a valid one
          if (!response || response.status != 200 || response.type !== 'basic') {
            return response;
          }

          let responseToCache = response.clone();

          caches.open('neighborhood-cache').then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      )
    })
  );
});
