/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { parseColor as parse, Color, namedColors as colors } from '@progress/kendo-drawing';
import { isPresent, fitIntoBounds } from '../../common/utils';
/**
 * @hidden
 *
 * Returns the hex or rgba string representation of the color.
 */
export const parseColor = (value, format, safe = true) => {
    const allowedFormats = ['hex', 'rgba', 'name'];
    if (allowedFormats.indexOf(format) === -1) {
        throw new Error(`Unsupported color output format '${format}'. The available options are 'hex', 'rgba' or 'name'.`);
    }
    if (!isPresent(value)) {
        return;
    }
    if (format === 'name') {
        return nameFormat(value, safe);
    }
    const parsedColor = parse(value.trim(), safe);
    if (!isPresent(parsedColor)) {
        return;
    }
    return format === 'hex' ? parsedColor.toCss() : parsedColor.toCssRgba();
};
/**
 * @hidden
 *
 * Returns an HSV object representation of the color string.
 */
export const getHSV = (value, safe = true) => {
    const parsed = parse(value, safe);
    if (!isPresent(parsed)) {
        return {};
    }
    return parsed.toHSV();
};
/**
 * @hidden
 *
 * Returns an RGBA object representation of the color string.
 */
export const getRGBA = (value, safe = true) => {
    const parsed = parse(value, safe);
    if (!isPresent(parsed)) {
        return {};
    }
    return parsed.toBytes();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
export const getColorFromHSV = (hsva) => {
    const hue = fitIntoBounds(hsva.h, 0, 359.9);
    const saturation = fitIntoBounds(hsva.s, 0, 1);
    const value = fitIntoBounds(hsva.v, 0, 1);
    const alpha = fitIntoBounds(hsva.a, 0, 1);
    return Color.fromHSV(hue, saturation, value, alpha).toCssRgba();
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color based on the `hue`, assuming the `value`, `saturation` and `alpha` have value of `1`.
 */
export const getColorFromHue = (hue) => {
    return getColorFromHSV({ h: hue, s: 1, v: 1, a: 1 });
};
/**
 * @hidden
 *
 * Returns the RGBA string representation of the color.
 */
export const getColorFromRGBA = (rgba) => {
    const red = fitIntoBounds(rgba.r, 0, 255);
    const green = fitIntoBounds(rgba.g, 0, 255);
    const blue = fitIntoBounds(rgba.b, 0, 255);
    const alpha = fitIntoBounds(rgba.a, 0, 1);
    return Color.fromBytes(red, green, blue, alpha).toCssRgba();
};
/**
 *
 * @hidden
 */
export function nameFormat(value, safe) {
    value = value.toLowerCase().trim();
    if (isPresent(colors[value])) {
        return value;
    }
    if (parse(value, safe)) {
        value = parse(value, safe).toHex();
    }
    const key = Object.keys(colors).find(key => colors[key] === value);
    if (!key && !safe) {
        throw new Error(`The provided color ${value} is not supported for 'format="name"' property.To display ${value} color, the component 'format' property shoud be set to 'hex' or 'rgba' `);
    }
    return key;
}
