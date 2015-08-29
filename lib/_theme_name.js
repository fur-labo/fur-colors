/**
 * Convert index to theme name.
 * @memberof module:fur-colors/lib
 * @function _themeName
 * @param {number} n - Index to convert.
 * @private
 */

"use strict";

var CHAR_CODE_START = 97,
    CHAR_CODE_RANGE = 26;

/** @lends _themeName */
function _themeName(n) {
    var result = '';
    if (n >= CHAR_CODE_RANGE) {
        result = _themeName(parseInt(n / CHAR_CODE_RANGE) - 1);
    }
    result += String.fromCharCode(CHAR_CODE_START + n % CHAR_CODE_RANGE);
    return result;
}

module.exports = _themeName;
