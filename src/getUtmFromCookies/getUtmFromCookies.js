import { defaultUtmKeys as defaultImportedKeys } from "../defaultUtmKeys"
import Cookies from 'js-cookie'

/**
 * Get utm tags from cookies
 * @param utmKeysMap
 * @returns {{}}
 */
export default function getUtmFromCookies(utmKeysMap = []) {
    let utmKeys = [...defaultImportedKeys, ...utmKeysMap]

    const allCookies = Cookies.get()
    const utmCookies = {}
    Object.keys(allCookies).forEach(cookie => {
        if (utmKeys.includes(cookie)) {
            utmCookies[cookie] = allCookies[cookie]
        }
    })
    return utmCookies
}