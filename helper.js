/**
 * Fur color helper.
 * @module fur-colors/helper
 */

"use strict";

var onecolor = require('onecolor');

/** @lends fur-colors/helper */
var h = {
    /**
     * Is valid color or not.
     * @param {string} value - Color value.
     * @returns {boolean} - valid or not.
     */
    isColor: function (value) {
        return onecolor(value) !== false;
    },
    /**
     * Convert to hex color string.
     * @param {string} value - Color value to convert.
     * @returns {string} - Hex color string.
     */
    hex: function (value) {
        return onecolor(value).hex();
    },
    /**
     * Is dark color or not.
     * @param {string} value - Color value.
     * @returns {boolean} - Dark or not.
     */
    isDark: function (value) {
        var color = onecolor(value),
            red = color.red() * 255,
            green = color.green() * 255,
            blue = color.blue() * 255;
        return red * 0.299 + green * 0.587 + blue * 0.114 < 186;
    },
    /**
     * Background for a color.
     * @param {string} value - Color value.
     * @returns {string} - Background color value.
     */
    background: function (value) {
        var background = h.isDark(value) ? '#FFFFFF' : onecolor(value).lightness(0.1);
        return h.hex(background);
    },
    /**
     * Generate fur color scheme.
     * @param {string} base - Base color string.
     * @returns {string[]} - Color values.
     */
    scheme: function (base) {
        return [
            base,
            h.background(base)
        ].map(h.hex);
    }
};

module.exports = h;
