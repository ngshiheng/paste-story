import { MAX_KEYS } from '../utils/constants'
import { generateUUIDKey } from '../utils/keyGenerator'

/*
Pre-generate a list of unique `uuid`s.

Ensures that pre-generated `uuid` KV list always has `MAX_KEYS` number of keys.
*/
const handleRequest = async () => {
    /* eslint-disable no-undef */
    const existingUUIDs = await KEY_DB.list()

    let keysToGenerate = MAX_KEYS - existingUUIDs.keys.length

    console.log(`Existing # of keys: ${existingUUIDs.keys.length}.`)
    console.log(`Generating # of keys: ${keysToGenerate}.`)

    while (keysToGenerate != 0) {
        const newKey = await generateUUIDKey()

        await KEY_DB.put(newKey, '')
        console.log(`Generated new key in KEY_DB: ${newKey}.`)

        keysToGenerate--
    }

    const currentUUIDs = await KEY_DB.list()
    console.log(`Current # of keys: ${currentUUIDs.keys.length}.`)
}

addEventListener('scheduled', (event) => {
    event.waitUntil(handleRequest(event))
})
