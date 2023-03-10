/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_drawing_1 = require("@progress/kendo-drawing");
var utils_1 = require("../../common/utils");
/**
 * @hidden
 *
 * Returns the hex or rgba string representation of the color.
 */
exports.parseColor = function (value, format, safe) {
    if (safe === void 0) { safe = true; }
    var allowedFormats = ['hex', 'rgba', 'name'];
    if (allowedFormats.indexOf(format) === -1) {
        throw new Error("Unsupported color output format '" + format + "'. The available options are 'hex', 'rgba' or 'name'.");
    }
    if (!utils_1.isPresent(value)) {
        return;
    }
    if (format === 'name') {
        return nameFormat(value, safe);
    }
    var parsedColor = kendo_drawing_1.parseColor(value.trim(), safe);
    if (!utils_1.isPresent(parsedColor)) {
        return;
    }
    return format === 'hex' ? parsedColor.toCss() : parsedColor.toCssRgba();
};
/**
 * @hidden
 *
 * Returns an HSV object representation of the color string.
 */
exports.getHSV = function (value, safe) {
    if (safe === void 0) { safe = true; }
    var parsed = kendo_drawing_1.parseColor(value, safe);
    if (!utils_1.isPresent(parsed)) {
        return {};
    }
    return parsed.toHSV();
};
/**
 * @hidden
 *
 * Returns an RGBA object representation of the color string.
 */
exports.getRGBA = function (value, safe) {
    if (safe === void 0) { safe = true; }
    var parsed = kendo_drawing_1.parseColor(value, safe);
    if (!utils_1.isPresent(parsed)) {
        return {};
    }
    return parsed.toBytes();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
exports.getColorFromHSV = function (hsva) {
    var hue = utils_1.fitIntoBounds(hsva.h, 0, 359.9);
    var saturation = utils_1.fitIntoBounds(hsva.s, 0, 1);
    var value = utils_1.fitIntoBounds(hsva.v, 0, 1);
    var alpha = utils_1.fitIntoBounds(hsva.a, 0, 1);
    return kendo_drawing_1.Color.fromHSV(hue, saturation, value, alpha).toCssRgba();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color based on the `hue`, assuming the `value`, `saturation` and `alpha` have value of `1`.
 */
exports.getColorFromHue = function (hue) {
    return exports.getColorFromHSV({ h: hue, s: 1, v: 1, a: 1 });
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
exports.getColorFromRGBA = function (rgba) {
    var red = utils_1.fitIntoBounds(rgba.r, 0, 255);
    var green = utils_1.fitIntoBounds(rgba.g, 0, 255);
    var blue = utils_1.fitIntoBounds(rgba.b, 0, 255);
    var alpha = utils_1.fitIntoBounds(rgba.a, 0, 1);
    return kendo_drawing_1.Color.fromBytes(red, green, blue, alpha).toCssRgba();
};
/**
 *
 * @hidden
 */
function nameFormat(value, safe) {
    value = value.toLowerCase().trim();
    if (utils_1.isPresent(kendo_drawing_1.namedColors[value])) {
        return value;
    }
    if (kendo_drawing_1.parseColor(value, safe)) {
        value = kendo_drawing_1.parseColor(value, safe).toHex();
    }
    var key = Object.keys(kendo_drawing_1.namedColors).find(function (key) { return kendo_drawing_1.namedColors[key] === value; });
    if (!key && !safe) {
        throw new Error("The provided color " + value + " is not supported for 'format=\"name\"' property.To display " + value + " color, the component 'format' property shoud be set to 'hex' or 'rgba' ");
    }
    return key;
}
exports.nameFormat = nameFormat;
