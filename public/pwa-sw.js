const fnUseSW = function (url) {
  if (global.navigator && 'serviceWorker' in global.navigator) {
    global.navigator.serviceWorker
      .register(`/sw.js?basePath=${url}`)
      .then(registration =>
        console.log('service worker is registered for:', registration.scope),
      )
      .catch(error => {
        console.log(`registration failed: ${error}`)
      })
  }
}

export { fnUseSW }
