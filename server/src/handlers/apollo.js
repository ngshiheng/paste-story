const { ApolloServer } = require('apollo-server-cloudflare')
const {
    graphqlCloudflare,
} = require('apollo-server-cloudflare/dist/cloudflareApollo')

const resolvers = require('../resolvers')
const typeDefs = require('../schema')

const createServer = (graphQLOptions) =>
    new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        graphQLOptions,
    })

const handler = async (request, graphQLOptions) => {
    const server = createServer(graphQLOptions)
    await server.start()
    return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
        request,
    )
}

module.exports = handler
