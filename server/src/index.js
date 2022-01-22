const apollo = require('./handlers/apollo')
const playground = require('./handlers/playground')
const setCors = require('./utils/setCors')

const graphQLOptions = {
    baseEndpoint: '/',
    playgroundEndpoint: '/graphql',
    forwardUnmatchedRequestsToOrigin: false,
    debug: false,
    cors: true,

    // NOTE: KV caching is only available for external REST data source requests
    kvCache: false,
}

const handleRequest = async (request) => {
    const url = new URL(request.url)
    try {
        if (url.pathname === graphQLOptions.baseEndpoint) {
            const response =
                request.method === 'OPTIONS'
                    ? new Response('', { status: 204 })
                    : await apollo(request, graphQLOptions)

            if (graphQLOptions.cors) {
                setCors(response, graphQLOptions.cors)
            }
            return response
        }

        if (
            graphQLOptions.playgroundEndpoint &&
            url.pathname === graphQLOptions.playgroundEndpoint
        ) {
            return playground(request, graphQLOptions)
        }

        if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
            return fetch(request)
        }

        return new Response('Not found', { status: 404 })
    } catch (err) {
        return new Response(
            graphQLOptions.debug ? err : 'Something went wrong',
            { status: 500 },
        )
    }
}

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})