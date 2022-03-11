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

    let defaultUtmKeys = [...defaultImportedKeys, ...utmKeysMap]

    let utmParamsObject

    utmParamsObject = getUtmFromUrl(window.location.href, defaultUtmKeys)
    if (utmParamsObject && Object.keys(utmParamsObject).length === 0) {
        utmParamsObject = getUtmFromCookies(defaultUtmKeys)
        if (Object.keys(utmParamsObject).length === 0) {
            utmParamsObject = getCookieByName('utm')
        }
    }

    return utmParamsObject
}