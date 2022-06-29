import getUtmFromUrl from "../getUtmFromUrl";
import getCookieByName from "../getCookieByName";
import getUtmFromCookies from "../getUtmFromCookies";
import { defaultUtmKeys as defaultImportedKeys } from "../defaultUtmKeys"

/**
 * Get all utm keys from url or cookies
 * @param utmKeysMap
 * @returns {{}}
 */
export default function getUtmParams(utmKeysMap = []) {

    if (window.location.hash === 'debug') {
        console.log('getUtmParams - utmKeysMap', utmKeysMap)
    }

    let utmKeys = [...defaultImportedKeys, ...utmKeysMap]

    if (window.location.hash === 'debug') {
        console.log('getUtmParams - utmKeys', utmKeys)
    }

    let utmParamsObject

    utmParamsObject = getUtmFromUrl(window.location.href, utmKeys)
    if (utmParamsObject && Object.keys(utmParamsObject).length === 0) {
        utmParamsObject = getUtmFromCookies(utmKeys)
        if (Object.keys(utmParamsObject).length === 0) {
            utmParamsObject = getCookieByName('utm')
        }
    }

    return utmParamsObject
}