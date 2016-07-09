/**
 * Convert index to theme name.
 * @function _themeName
 * @param {number} n - Index to convert.
 * @private
 */

'use strict'

const CHAR_CODE_START = 97;
const CHAR_CODE_RANGE = 26;

/** @lends _themeName */
function _themeName (n) {
  let result = ''
  if (n >= CHAR_CODE_RANGE) {
    result = _themeName(parseInt(n / CHAR_CODE_RANGE) - 1)
  }
  result += String.fromCharCode(CHAR_CODE_START + n % CHAR_CODE_RANGE)
  return result
}

module.exports = _themeName
