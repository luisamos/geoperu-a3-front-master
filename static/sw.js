importScripts('/reporte/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/reporte/_nuxt/18.979e280.js",
    "revision": "f42b66a94288a985bb55ef4a280a15be"
  },
  {
    "url": "/reporte/_nuxt/app.dc327d2.js",
    "revision": "c8b9ebf13ef3c3b2722529639db65066"
  },
  {
    "url": "/reporte/_nuxt/commons/cem.id~presupuesto.id.577d1a5.js",
    "revision": "fe0153dfa90441b3ed0091c79e029174"
  },
  {
    "url": "/reporte/_nuxt/layouts/default.4a9563c.js",
    "revision": "499d6af22953a08dce5614a8e59a4caf"
  },
  {
    "url": "/reporte/_nuxt/layouts/reporte.0e3adf6.js",
    "revision": "1727063cb47fd8b3612facd529b02aff"
  },
  {
    "url": "/reporte/_nuxt/pages/_id.439f107.js",
    "revision": "103d8cb627da9ba2608ba7d071bd6480"
  },
  {
    "url": "/reporte/_nuxt/pages/cem/_id.c2cb82b.js",
    "revision": "a7034643590e0e1db192f3b8dd7fc588"
  },
  {
    "url": "/reporte/_nuxt/pages/cem/index.e09b1ac.js",
    "revision": "ab55acaa08badc782e942d0d564c5c93"
  },
  {
    "url": "/reporte/_nuxt/pages/covid19/index.3682652.js",
    "revision": "5cb46f2afe3e37deb2c1ea7126d50987"
  },
  {
    "url": "/reporte/_nuxt/pages/index.6bf4eda.js",
    "revision": "fbcb640aedb1052e80075d6266aa0dee"
  },
  {
    "url": "/reporte/_nuxt/pages/presupuesto/_id.5fb2ead.js",
    "revision": "f6550d045d5278c5c33e84b1983bf301"
  },
  {
    "url": "/reporte/_nuxt/pages/presupuesto/index.5f9f453.js",
    "revision": "4456f6c6dbbbc71b74f38e89d28f7765"
  },
  {
    "url": "/reporte/_nuxt/pages/reporte/_id.e2f6801.js",
    "revision": "82816896db3d5633389d008590d163c2"
  },
  {
    "url": "/reporte/_nuxt/pages/reporte/index.78eafce.js",
    "revision": "a7a0a468822e840e8e5a43812ab726f0"
  },
  {
    "url": "/reporte/_nuxt/runtime.08ae2d2.js",
    "revision": "1b8911a01b5f189411e83dcf2d0b8914"
  }
], {
  "cacheId": "nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/reporte/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/reporte/.*'), workbox.strategies.networkFirst({}), 'GET')
