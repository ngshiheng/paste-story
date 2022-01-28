const { ApolloError } = require('apollo-server-cloudflare')

class PasteAPI {
    /*
    Get a paste by its UUID (urlKey) from `PASTE_DB`.

    Throws an error if paste is not found.
    */
    async getPaste(uuid) {
        /* eslint-disable no-undef */
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
        /* eslint-disable no-undef */
        try {
            if (!content || /^\s*$/.test(content)) {
                throw new ApolloError('Paste content is empty')
            }

            const ONE_DAY_FROM_NOW = 86400 // seconds
            const { keys } = await KEY_DB.list({ limit: 1 })
            if (!keys.length) {
                throw new ApolloError('Daily limit exceeded')
            }

            const { name: uuid } = keys[0]

            await KEY_DB.delete(uuid)
            await PASTE_DB.put(uuid, content, {
                expirationTtl: ONE_DAY_FROM_NOW,
            })

            return {
                uuid,
                content,
                url: `https://paste.jerrynsh.com/${uuid}`,
            }
        } catch (error) {
            throw new ApolloError(`Failed to create paste. ${error.message}`)
        }
    }
}

module.exports = PasteAPI
