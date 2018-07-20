// importScripts("workbox-sw.prod.v2.1.2.js");
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js"
);
// const myworkbox = new WorkboxSW({
//   skipWaiting: true,
//   clientsClaim: true
// });
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  /.*(?:googleapis|bootstrapcdn)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "bootcache"
  })
);

workbox.routing.registerRoute(
  new RegExp(".*.js"),
  workbox.strategies.cacheFirst({
    cacheName: "pagecache"
  })
);

// workbox.routing.registerRoute(
//   "/initial",
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "pagecache"
//   })
// );

// workbox.routing.registerRoute(
//   "/orderreceive",
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "pagecache"
//   })
// );

// following array will be filled with filenames
// from `build/` folder when `generate-sw` script runs
workbox.precaching.precacheAndRoute([]);

// cache index.html when service worker gets installed
self.addEventListener("install", updateIndexCache);

// the listener catches all http requests coming from
// the browser at my website
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  // I want to let event through without modifying if
  // any of the following conditions are met
  if (
    // if it's a request for a precached file
    // isPrecached(url) ||
    // if it's a request for a static file (not index.html)
    isStaticFile(url) ||
    // if it's an external request to another domain
    isExternal(url) ||
    // if it's a GET request to /api/* url
    isGetApi(event, url)
  ) {
    console.log("RETURNED");
    return;
  }

  // when an API action happens, for example,
  // "DELETE /api/session" that logs user out,
  // I let the request through and update index.html
  // cache after it's done
  if (event.request.method !== "GET") {
    return event.respondWith(
      fetch(event.request).then(response => {
        console.log("GET METH", event.request);
        updateIndexCache();
        return response;
      })
    );
  }

  // I serve index.html network-first on any request that
  // reached this line
  // event.respondWith(
  //   fetch(indexRequest())
  //     .then(response => {
  //       updateIndexCache();
  //       return response;
  //     })
  //     .catch(() => caches.match(indexRequest()))
  // );
});

function isPrecached({ href }) {
  return workbox._revisionedCacheManager._parsedCacheUrls.includes(href);
}

function isStaticFile({ pathname }) {
  return pathname.includes(".") && pathname !== "/index.html";
}

function isExternal({ origin }) {
  return origin !== location.origin;
}

// if your api has a different prefix, e.g., /api/v1/,
// just update RegExp accordingly
function isGetApi({ request }, { pathname }) {
  return request.method === "GET" && /^\/api\/.+/.test(pathname);
}

async function updateIndexCache() {
  console.log("UPDATEINDEXCACHE DEACTIVATED");
  // const cache = await caches.open("dynamic-v1");
  // cache.add(indexRequest());
}

function indexRequest() {
  return new Request("index.html", { credentials: "same-origin" });
}
