/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { POINT } from './constants';
/**
 * @hidden
 */
export const numericRegex = (options) => {
    const { autoCorrect, decimals, min } = options;
    let separator = options.separator;
    if (separator === POINT) {
        separator = '\\' + separator;
    }
    const signPattern = autoCorrect && min !== null && min >= 0 ? '' : '-?';
    let numberPattern;
    if (decimals === 0) {
        numberPattern = '\\d*';
    }
    else {
        numberPattern = `(?:(?:\\d+(${separator}\\d*)?)|(?:${separator}\\d*))?`;
    }
    return new RegExp(`^${signPattern}${numberPattern}$`);
};
/**
 * @hidden
 */
export const decimalPart = (value) => {
    return value >= 0 ? Math.floor(value) : Math.ceil(value);
};
/**
 * @hidden
 */
export const noop = (_) => { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
export const defined = (value) => {
    return typeof value !== 'undefined';
};
/**
 * @hidden
 */
export const isNumber = (value) => {
    return !isNaN(value) && value !== null;
};
/**
 * @hidden
 */
export function pad(value, digits) {
    const count = digits - String(value).length;
    let result = value;
    if (count > 0) {
        const padString = new Array(count + 1).join("0");
        result = parseFloat(value + padString);
    }
    return result;
}
/**
 * @hidden
 */
export const getDeltaFromMouseWheel = (e) => {
    let delta = 0;
    if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
    }
    else if (e.detail) {
        delta = Math.round(-e.detail / 3);
    }
    return delta;
};
/**
 * @hidden
 */
export const getCaretPosition = (element) => element.selectionStart;
/**
 * @hidden
 */
export const extractSignificantNumericChars = (formattedString, separator) => {
    const significantCharacters = `${separator}0123456789-`;
    return formattedString.split('').reduce((acc, curr) => significantCharacters.includes(curr) ? ++acc : acc, 0);
};
