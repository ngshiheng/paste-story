import { missing, ThrowableRouter, withParams } from 'itty-router-extras'
import apollo from './handlers/apollo'
import index from './handlers/index'
import paste from './handlers/paste'
import playground from './handlers/playground'

const router = ThrowableRouter()

router.get('/', index)

router.all('/graphql', playground)

router.all('/__graphql', apollo)

router.get('/:uuid', withParams, paste)

router.all('*', () => missing('Not found'))

addEventListener('fetch', (event) => {
    event.respondWith(router.handle(event.request))
})
