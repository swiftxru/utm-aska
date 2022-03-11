import { defaultUtmKeys as defaultImportedKeys } from "../defaultUtmKeys"

/**
 * Get utm tags from cookies
 * @param utmKeysMap
 * @returns {{}}
 */
export default function getUtmFromCookies(utmKeysMap = []) {
    let defaultUtmKeys = [...defaultImportedKeys, ...utmKeysMap]

    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, val] = cookie.split('=').map((c) => c.trim())
        if (defaultUtmKeys.includes(name)) {
            cookies[name] = val
        }
        return cookies
    }, {})
}