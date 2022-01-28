const { missing, ThrowableRouter, withParams } = require('itty-router-extras')
const apollo = require('./handlers/apollo')
const index = require('./handlers/index')
const paste = require('./handlers/paste')
const playground = require('./handlers/playground')

const router = ThrowableRouter()

router.get('/', index)

router.all('/graphql', playground)

router.all('/__graphql', apollo)

router.get('/:uuid', withParams, paste)

router.all('*', () => missing('Not found'))

addEventListener('fetch', (event) => {
    event.respondWith(router.handle(event.request))
})
