module.exports = {
    Query: {
        getPaste: async (_source, { uuid }, { dataSources }) => {
            return dataSources.pasteAPI.getPaste(uuid)
        },
    },
    Mutation: {
        createPaste: async (_source, { content }, { dataSources }) => {
            return dataSources.pasteAPI.createPaste(content)
        },
    },
}
