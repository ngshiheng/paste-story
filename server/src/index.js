const { ThrowableRouter, missing } = require('itty-router-extras')

const apollo = require('./handlers/apollo')
const playground = require('./handlers/playground')

const router = ThrowableRouter()

router.all('/', apollo)

router.all('/graphql', playground)

router.all('*', () => missing('Not found'))

addEventListener('fetch', (event) => {
    event.respondWith(router.handle(event.request))
})
