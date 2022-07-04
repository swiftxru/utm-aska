/**
 * Get cookie value by name
 * @param name
 * @returns {any}
 */
import Cookies from 'js-cookie'
export default function getCookieByName(name) {
    return JSON.parse(Cookies.get(name))
}