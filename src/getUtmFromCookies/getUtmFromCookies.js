import { defaultUtmKeys as defaultImportedKeys } from "../defaultUtmKeys"
import Cookies from 'js-cookie'

/**
 * Get utm tags from cookies
 * @param utmKeysMap
 * @returns {{}}
 */
export default function getUtmFromCookies(utmKeysMap = []) {
    let defaultUtmKeys = [...defaultImportedKeys, ...utmKeysMap]

    const allCookies = Cookies.get()
    const utmCookies = {}
    Object.keys(allCookies).forEach(cookie => {
        if (defaultUtmKeys.includes(cookie)) {
            utmCookies[cookie] = allCookies[cookie]
        }
    })
    return utmCookies
}