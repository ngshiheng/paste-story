const { ApolloError } = require('apollo-server-cloudflare')
const moment = require('moment')

const ONE_DAY_FROM_NOW = 86400 // seconds
class PasteAPI {
    /*
    Get a paste by its `uuid` key from `PASTE_DB`.

    Throws an error if paste is not found.
    */
    async getPaste(uuid) {
        /* eslint-disable no-undef */
        const { value: content, metadata } = await PASTE_DB.getWithMetadata(
            uuid,
        )
        if (!content) {
            throw new ApolloError('Paste not found')
        }

        return {
            uuid,
            content,
            createdOn: metadata.createdOn,
            expireAt: metadata.expireAt,
        }
    }

    /*
    Create a new paste in `PASTE_DB`.
    
    Fetch a new `uuid` key from `KEY_DB`.

    UUID is then removed from `KEY_DB` to avoid duplicates.
    */
    async createPaste(content) {
        /* eslint-disable no-undef */
        try {
            const { keys } = await KEY_DB.list({ limit: 1 })
            if (!keys.length) {
                throw new ApolloError('Ran out of keys')
            }
            const { name: uuid } = keys[0]

            const createdOn = moment().format()
            const expireAt = moment().add(ONE_DAY_FROM_NOW, 'seconds').format()

            await KEY_DB.delete(uuid) // Remove key from KGS
            await PASTE_DB.put(uuid, content, {
                metadata: { createdOn, expireAt },
                expirationTtl: ONE_DAY_FROM_NOW,
            })

            return {
                uuid,
                content,
                createdOn,
                expireAt,
            }
        } catch (error) {
            throw new ApolloError(`Failed to create paste. ${error.message}`)
        }
    }
}

module.exports = PasteAPI
