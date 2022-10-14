/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export function outerWidth(element) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0;
    return width;
}
/**
 * @hidden
 */
export const serializeDOMAttrs = (el) => Array.from(el.attributes)
    .reduce((acc, curr) => Object.assign({}, acc, { [curr.name]: curr.value }), {});
/**
 * @hidden
 */
export const removeEntries = (obj, predicate) => Object.keys(obj)
    .filter(key => predicate(key))
    .reduce((acc, curr) => Object.assign(acc, { [curr]: obj[curr] }), {});
/**
 * @hidden
 */
export const removeEmptyEntries = (obj) => {
    const predicate = key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '';
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
export const isEmpty = (obj) => Object.keys(obj).length === 0;
/**
 * @hidden
 */
export const isNullOrUndefined = (value) => value === undefined || value === null;
/**
 * @hidden
 */
export const isPresent = (value) => !isNullOrUndefined(value);
/**
 * @hidden
 */
export const detectIE = () => {
    if (!isDocumentAvailable()) {
        return false;
    }
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};
/**
 * @hidden
 */
export const safeString = (value) => (isNullOrUndefined(value) ? '' : value.toString());
/**
 * @hidden
 */
export const first = (arr) => arr[0];
/**
 * @hidden
 */
export const last = (arr) => arr[arr.length - 1];
/**
 * @hidden
 */
export const unique = (arr) => Array.from(new Set(arr));
/**
 * @hidden
 */
export const split = (splitter) => (value) => value.split(splitter);
/**
 * @hidden
 */
export const trim = (value) => value.trim();
/**
 * @hidden
 */
export const filter = (predicate) => (arr) => arr.filter(predicate);
/**
 * @hidden
 */
export const toArray = (x) => (x instanceof Array ? x : [x]);
/**
 * @hidden
 */
export const getUniqueStyleValues = (style, cssStyle) => {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    const uniqueMarkValues = style.marks
        .filter(m => m.type.name === 'style')
        .map(m => m.attrs.style)
        .map(safeString)
        .map(split(';'))
        .map(filter((m) => m.includes(cssStyle)))
        // guards against empty array
        .map((cssStyleValues) => (cssStyleValues.length !== 0 ? cssStyleValues : [`${cssStyle}: INVALID`]))
        .map(first)
        .map(split(':'))
        .map(last)
        .map(trim)
        .reduce((acc, curr) => (acc.indexOf(curr) > -1 ? acc : [...acc, curr]), []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
export const conditionallyExecute = (fn) => (condition) => (param) => (condition ? fn(param) : param);
/**
 * @hidden
 */
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
