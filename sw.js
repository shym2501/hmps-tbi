// cache nam
const CACHE_NAME = 'tbi-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/guide.html',
  '/structure.html',
  '/css/color.css',
  '/css/component.css',
  '/css/inline.css',
  '/css/style.css',
  '/css/utility.css',
  '/js/main.js',
  '/js/app.js',
  '/img/bph2020.jpg',
  '/img/croupier.png',
  '/img/desabinaan.png',
  '/img/iain.png',
  '/img/tbi.png',
  '/img/tbimedia.png',
  '/img/tbishop.png',
  '/img/2020.jpg',
  '/fontawesome/css/all.css',
  '/fontawesome/js/all.js',
  '/fontawesome/metadata/icons.json'
]

self.addEventListener('install', function(event){
  // Perform install step
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('In install serviceworker... cache opened!')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != CACHE_NAME
        }).map(function(cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})