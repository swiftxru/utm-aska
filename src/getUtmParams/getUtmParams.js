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

    let utmKeys = [...defaultImportedKeys, ...utmKeysMap]
    utmKeys = [...new Set(utmKeys)]

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