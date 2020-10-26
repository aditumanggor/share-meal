const CACHE_NAME = "shareMealPWAv35";

let urlToCache = [
  "/",
  "index.html",
  "manifest.json",
  "nav.html",
  "pages/about.html",
  "pages/contact.html",
  "pages/donate.html",
  "pages/support.html",
  "css/materialize.min.css",
  "css/forAll.css",
  "js/materialize.min.js",
  "js/nav.js",
  "js/sw-regis.js",
  "images/belajar.jpg",
  "images/poor1.jpg",
  "images/what.jpg",
  "images/belajar2.jpg",
  "maskable_icon2.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"

];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(urlToCache);
    })
  )
})

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches
      .match(event.request, {cacheName: CACHE_NAME})
      .then(function(response){
        if(response){
          return response;
        }
        return fetch(event.request);
      })
    )
})

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})