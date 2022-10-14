/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0;
    return width;
}
/**
 * @hidden
 */
export var serializeDOMAttrs = function (el) {
    return Array.from(el.attributes)
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign({}, acc, (_a = {}, _a[curr.name] = curr.value, _a));
    }, {});
};
/**
 * @hidden
 */
export var removeEntries = function (obj, predicate) {
    return Object.keys(obj)
        .filter(function (key) { return predicate(key); })
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign(acc, (_a = {}, _a[curr] = obj[curr], _a));
    }, {});
};
/**
 * @hidden
 */
export var removeEmptyEntries = function (obj) {
    var predicate = function (key) { return obj[key] !== null && obj[key] !== undefined && obj[key] !== ''; };
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
export var isEmpty = function (obj) { return Object.keys(obj).length === 0; };
/**
 * @hidden
 */
export var isNullOrUndefined = function (value) { return value === undefined || value === null; };
/**
 * @hidden
 */
export var isPresent = function (value) { return !isNullOrUndefined(value); };
/**
 * @hidden
 */
export var detectIE = function () {
    if (!isDocumentAvailable()) {
        return false;
    }
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};
/**
 * @hidden
 */
export var safeString = function (value) { return (isNullOrUndefined(value) ? '' : value.toString()); };
/**
 * @hidden
 */
export var first = function (arr) { return arr[0]; };
/**
 * @hidden
 */
export var last = function (arr) { return arr[arr.length - 1]; };
/**
 * @hidden
 */
export var unique = function (arr) { return Array.from(new Set(arr)); };
/**
 * @hidden
 */
export var split = function (splitter) { return function (value) { return value.split(splitter); }; };
/**
 * @hidden
 */
export var trim = function (value) { return value.trim(); };
/**
 * @hidden
 */
export var filter = function (predicate) { return function (arr) { return arr.filter(predicate); }; };
/**
 * @hidden
 */
export var toArray = function (x) { return (x instanceof Array ? x : [x]); };
/**
 * @hidden
 */
export var getUniqueStyleValues = function (style, cssStyle) {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    var uniqueMarkValues = style.marks
        .filter(function (m) { return m.type.name === 'style'; })
        .map(function (m) { return m.attrs.style; })
        .map(safeString)
        .map(split(';'))
        .map(filter(function (m) { return m.includes(cssStyle); }))
        // guards against empty array
        .map(function (cssStyleValues) { return (cssStyleValues.length !== 0 ? cssStyleValues : [cssStyle + ": INVALID"]); })
        .map(first)
        .map(split(':'))
        .map(last)
        .map(trim)
        .reduce(function (acc, curr) { return (acc.indexOf(curr) > -1 ? acc : acc.concat([curr])); }, []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
export var conditionallyExecute = function (fn) { return function (condition) { return function (param) { return (condition ? fn(param) : param); }; }; };
/**
 * @hidden
 */
export var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) { return fns.reduce(function (y, f) { return f(y); }, x); };
};
