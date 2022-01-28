const { ApolloError } = require('apollo-server-cloudflare')

module.exports = {
    Query: {
        getPaste: async (_source, { uuid }, { dataSources }) => {
            return dataSources.pasteAPI.getPaste(uuid)
        },
    },
    Mutation: {
        createPaste: async (_source, { content }, { dataSources }) => {
            if (!content || /^\s*$/.test(content)) {
                throw new ApolloError('Paste content is empty')
            }

            return dataSources.pasteAPI.createPaste(content)
        },
    },
}
