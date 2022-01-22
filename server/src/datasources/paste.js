const { ApolloError } = require('apollo-server-cloudflare')
class PasteAPI {
    async getPaste(uuid) {
        const paste = await PASTE_DB.get(uuid)
        if (!paste) {
            throw new ApolloError('Paste not found')
        }

        return {
            uuid,
            content,
            url: `https://paste.jerrynsh.com/${uuid}`,
        }
    }

    async createPaste(content) {
        return {
            uuid,
            content: 'Hello world',
            url: 'https://example.com',
        }
    }
}

module.exports = PasteAPI
