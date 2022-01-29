import { customAlphabet } from 'nanoid'
import { ALPHABET } from './constants'

/*
Generate a `uuid` using `nanoid` package.

Keep retrying until a `uuid` that does not exist in both KV (`PASTE_DB` and `KEY_DB`) is generated.

KGS guarantees that the pre-generated keys are always unique.
*/
export const generateUUIDKey = async () => {
    /* eslint-disable no-undef */
    const nanoId = customAlphabet(ALPHABET, 8)

    let uuid = nanoId()

    while (
        (await KEY_DB.get(uuid)) !== null &&
        (await PASTE_DB.get(uuid)) !== null
    ) {
        uuid = nanoId()
    }

    return uuid
}
