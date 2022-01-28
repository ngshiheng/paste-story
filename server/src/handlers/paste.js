const { missing } = require('itty-router-extras')

const handler = async ({ params }) => {
    /* eslint-disable no-undef */
    const { key } = decodeURIComponent(params.text)

    const content = await PASTE_DB.get(key)

    if (content) {
        return new Response(html('/__apollo'), {
            headers: { 'Content-Type': 'text/html' },
        })
    }

    return missing('Invalid link')
}

module.exports = handler
