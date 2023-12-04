self.addEventListener('install', event => {
  console.log('sw was installed')
  const cdnUrl = new URL(decodeURIComponent(location.href)).searchParams.get(
    'basePath',
  )
  const cacheItems = ['/icons/favicon.png']
  const cdnItems = [
    `${cdnUrl}/cdn/fonts/unicons/css/line.css`,
    `${cdnUrl}/cdn/fonts/iranYekanX/Farsi_numerals/Webfonts/fontiran.css`,
    `${cdnUrl}/cdn/fonts/unicons/fonts/line/unicons-6.woff2`,
    `${cdnUrl}/cdn/fonts/iranYekanX/Farsi_numerals/Webfonts/woff/IRANYekanXFaNum-Regular.woff`,
    `${cdnUrl}/cdn/fonts/iranYekanX/Farsi_numerals/Webfonts/woff/IRANYekanXFaNum-Light.woff`,
  ]

  if (cdnUrl) cacheItems.push(...cdnItems)

  event.waitUntil(
    caches.open('static').then(cache => {
      cache.addAll(cacheItems)
    }),
  )
})

self.addEventListener('activate', () => {
  console.log('sw activated')
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      return fetch(event.request)
    }),
  )
})
