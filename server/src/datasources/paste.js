const { ApolloError } = require('apollo-server-cloudflare')
class PasteAPI {
    /*
    Get a paste by its UUID (urlKey) from `PASTE_DB`.

    Throws an error if paste is not found.
    */
    async getPaste(uuid) {
        const paste = await PASTE_DB.get(uuid)
        if (!paste) {
            throw new ApolloError('Paste not found')
        }

        return {
            uuid,
            content: paste,
            url: `https://paste.jerrynsh.com/${uuid}`,
        }
    }

    /*
    Create a new paste in `PASTE_DB`.
    
    Fetch a new UUID (urlKey) from `KEY_DB`.

    UUID is then removed from `KEY_DB` to avoid duplicates.
    */
    async createPaste(content) {
        try {
            const uuid = await KEY_DB.list({ limit: 1 })

            await KEY_DB.delete(uuid)
            await PASTE_DB.put(uuid, content, { expirationTtl: 60 * 60 }) // TODO: make expirationTtl based on user input.

            return {
                uuid,
                content,
                url: `https://paste.jerrynsh.com/${uuid}`,
            }
        } catch (error) {
            throw new ApolloError('Failed to create paste')
        }
    }
}

module.exports = PasteAPI
