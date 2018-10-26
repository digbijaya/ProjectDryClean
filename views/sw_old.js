// importScripts('/js/idb.js');

var deferredPrompt;
var CACHE_STATIC_NAME =
  "static-v3" + new Date().getUTCHours() + "." + new Date().getUTCMinutes();
var CACHE_DYNAMIC_NAME = "dynamic-v2";
var PRO_STORE = "pro-store";

self.addEventListener("install", function(event) {
  // console.log("[service worker] installing service worker..", event);
  /*if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
  		reurn;
  	}*/
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function(cache) {
      console.log("[Service worker install] Precaching app shell");
      cache.addAll([
        "/",
        "/offline",
        "/orderreceive",
        "/orderdeliver",
        "/js/idb.js",
        "/js/collect.js",
        "/js/application.js",
        "/js/collection.js",
        "/js/fetch.js",
        "/js/promise.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
      ]);
    })
  );
});

/*var dbPromise=idb.open(PRO_STORE, 1, function(db){
	if(!db.objectStoreNames.contains('users')){
		db.createObjectStore('users');		
	}
	
});*/

self.addEventListener("activate", function(event) {
  // console.log("[service worker] activating service worker..", event);
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service worker] Remvoving old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

//cache first then network fallbak strategy
self.addEventListener("fetch", function(event) {
  // console.log("[service worker] fetching asset service worker..", event);
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }
  /*  	var url='/orderdeliver';
  	if(event.request.url.indexOf(url) > -1 && event.request.method.includes('POST')){
  		event.respondWith(
  			fetch(event.request)
  				.then(function(res){
  					var resjson=res.clone();
  					resjson.json()
  						.then(function(data){
  							console.log("3", data);
  						}).catch(function(err){
  							console.log("3", err);
  						});
  					var restext=res.clone();
  					restext.text()
  						.then(function(data){
  							console.log("4", data);
  						}).catch(function(err){
  							console.log("4", err);
  						});
					return res;
  				}).catch(function(err){
  					console.log("PRIM", err);
  				})
  		);
  	}else{*/
  // event.respondWith(fetch(event.request));
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        console.log("[Service worker fetch] fetching dynamic content");
        console.log(event.request);
        return fetch(event.request)
          .then(function(res) {
            console.log(res.clone());
            return caches.open(CACHE_DYNAMIC_NAME).then(function(cache) {
              // trimCache(CACHE_DYNAMIC_NAME, 3);
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function(err) {
            console.log(err);
            return caches.open(CACHE_STATIC_NAME).then(function(cache) {
              return cache.match("/offline");
            });
          });
      }
    })
  );
  // }
});

//network first then caches strategy
/*self.addEventListener('fetch', function(event){
	event.respondWith(
		fetch(event.request)
			.then(function(res){
				return caches.open(CACHE_DYNAMIC_NAME)
					.then(function(cache){
						cache.put(event.request.url, res.clone());
						return res;
					})
			})
			.catch(function(err){
				return caches.match(event.request);
			})
			);
});*/

//netwrok then save in cache if a target url
//else find in cache then fall back to network if not found
/*self.addEventListener('fetch',function(event){
	// console.log("[service worker] fetching asset service worker..", event);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
  		return;
  	}
  	var url='/orderreceive';
  	if(event.request.url.indexOf(url)>-1){
  		// event.respondWith(fetch(event.request));
		event.respondWith(
			caches.open(CACHE_DYNAMIC_NAME)
				.then(function(cache){
					return fetch(event.request)
						.then(function(res){
							cache.put(event.request.url, res.clone());
							return res;
					})
			})
		);
  	}else{
  		event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response){
				return response;
			}else{
				console.log('[Service worker fetch] fetching dynamic content');
				console.log(event.request);
				return fetch(event.request)
				.then(function(res){
					console.log(res.clone());
					return caches.open(CACHE_DYNAMIC_NAME)
						.then(function(cache){
							cache.put(event.request.url, res.clone());
							return res;
						})
				}).catch(function(err){
					console.log(err);
					return caches.open(CACHE_STATIC_NAME)
						.then(function(cache){
							if(event.request.headers.get('accept').includes('text/html')){
								return cache.match('/offline');
							}							
						})
				});
			} 
		})
	);
  	}		
});*/

//trim the caches by size and old cache content
/*function trimCache(cacheName, maxItems){
	caches.open(cacheName)
		.then(function(cache){
			return cache.keys();
		})
		.then(function(keys){
			if(keys.length > maxItems){
				cache.delete(keys[0])
					.then(trimCache(cacheName, maxItems));
			}
		});
}*/
