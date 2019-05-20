if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('sw.js')
        .then(reg => console.log("yeah super het werkt"))
        .catch(err => console.log(`service worker error: ${err}`))
    })
}