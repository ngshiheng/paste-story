const { status } = require('itty-router-extras')

const { ApolloServer } = require('apollo-server-cloudflare')
const {
    graphqlCloudflare,
} = require('apollo-server-cloudflare/dist/cloudflareApollo')

const PasteAPI = require('../datasources/paste')
const setCors = require('../utils/setCors')

const typeDefs = require('../schema')
const resolvers = require('../resolvers')

const dataSources = () => ({
    pasteAPI: new PasteAPI(),
})

const graphQLOptions = {
    baseEndpoint: '/',
    playgroundEndpoint: '/graphql',
    forwardUnmatchedRequestsToOrigin: false,
    debug: false,
    cors: true,
    kvCache: false,
}

const createServer = (options) =>
    new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        dataSources,
        ...options,
    })

const startServer = async (request, options) => {
    const server = createServer(options)
    await server.start()

    return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
        request,
    )
}

/*
Create and start Apollo GraphQL server.

Handle all requests to the GraphQL endpoint.
*/
const handler = async (request) => {
    const response =
        request.method === 'OPTIONS'
            ? status(204)
            : await startServer(request, graphQLOptions)

    if (graphQLOptions.cors) {
        setCors(response, graphQLOptions.cors)
    }

    return response
}

module.exports = handler
