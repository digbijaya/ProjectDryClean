module.exports = {
  globDirectory: "build/",
  globPatterns: [
    "**/*.{json,ico,html,js,css,woff2,woff}"
    // "static/{js,css}/**/!(*map*)"
  ],
  swSrc: "./src/myservice-worker.js",
  swDest: "./build/myservice-worker.js",
  globIgnores: ["../workbox-cli-config.js", "asset-manifest.json"]
};
