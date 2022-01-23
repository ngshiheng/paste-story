import { MAX_KEYS } from '../utils/constants'
import { generateUniqueUrlKey } from '../utils/keyGenerator'

/*
Pre-generate a list of unique `urlKey`s.

Ensures that pre-generated `urlKey` list always has `MAX_KEYS` number of keys.
*/
const handleRequest = async () => {
    /* eslint-disable no-undef */
    const urlKeys = await KEY_DB.list()

    let keysToGenerate = MAX_KEYS - urlKeys.keys.length
    console.log(`The # of keys to generate: ${keysToGenerate}.`)

    while (keysToGenerate != 0) {
        const newKey = await generateUniqueUrlKey()

        await KEY_DB.put(newKey, '')

        keysToGenerate--
    }
}

addEventListener('scheduled', (event) => {
    event.waitUntil(handleRequest(event))
})
