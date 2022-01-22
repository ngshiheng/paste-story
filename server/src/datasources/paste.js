class PasteAPI {
    async getPaste(uuid) {
        return {
            uuid,
            content: 'Hello world',
            url: 'https://example.com',
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
