/**
 * cookies
 */
import Cookies from 'js-cookie'
/**
 * @param {string} path
 * @returns {Boolean}
 */

/**
 * @param {string} name cookies name
 * @param {string} value cookies value
 * @param {number} expires 失效时间
 * @returns {undefined}
 */
export function setCookies(name, value, expires = 1) {
  Cookies.set(name, value, { expires })
}

/**
 * @param {string} name cookies name
 * @returns {string} value
 */
export function getCookies(name) {
  return Cookies.get(name)
}

/**
 * @param {string} name cookies name
 * @returns {undefined}
 */
export function removeCookies(name) {
  return Cookies.remove(name)
}

