/**
 * Get cookie value by name
 * @param name
 * @returns {any}
 */
export default function getCookieByName(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2)
        return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()))
}