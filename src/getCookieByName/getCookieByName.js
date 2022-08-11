/**
 * Get cookie value by name
 * @param name
 * @returns {any}
 */
import Cookies from 'js-cookie'
export default function getCookieByName(name) {
    if (Cookies.get(name)) {
        return JSON.parse(Cookies.get(name))
    }
    return null
}