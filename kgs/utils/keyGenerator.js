import { customAlphabet } from 'nanoid'
import { ALPHABET } from './constants'

/*
Generate a unique `urlKey` using `nanoid` package.

Keep retrying until a unique `urlKey` which does not exist in both KV (`PASTE_DB` and `KEY_DB`) is generated.

KGS guarantees that the pre-generated keys are always unique.
*/
export const generateUniqueUrlKey = async () => {
    /* eslint-disable no-undef */
    const nanoId = customAlphabet(ALPHABET, 8)

    let urlKey = nanoId()

    while (
        (await KEY_DB.get(urlKey)) !== null &&
        (await PASTE_DB.get(urlKey)) !== null
    ) {
        urlKey = nanoId()
    }

    return urlKey
}
