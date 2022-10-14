/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0;
    return width;
}
exports.outerWidth = outerWidth;
/**
 * @hidden
 */
exports.serializeDOMAttrs = function (el) {
    return Array.from(el.attributes)
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign({}, acc, (_a = {}, _a[curr.name] = curr.value, _a));
    }, {});
};
/**
 * @hidden
 */
exports.removeEntries = function (obj, predicate) {
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
exports.removeEmptyEntries = function (obj) {
    var predicate = function (key) { return obj[key] !== null && obj[key] !== undefined && obj[key] !== ''; };
    return exports.removeEntries(obj, predicate);
};
/**
 * @hidden
 */
exports.isEmpty = function (obj) { return Object.keys(obj).length === 0; };
/**
 * @hidden
 */
exports.isNullOrUndefined = function (value) { return value === undefined || value === null; };
/**
 * @hidden
 */
exports.isPresent = function (value) { return !exports.isNullOrUndefined(value); };
/**
 * @hidden
 */
exports.detectIE = function () {
    if (!kendo_angular_common_1.isDocumentAvailable()) {
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
exports.safeString = function (value) { return (exports.isNullOrUndefined(value) ? '' : value.toString()); };
/**
 * @hidden
 */
exports.first = function (arr) { return arr[0]; };
/**
 * @hidden
 */
exports.last = function (arr) { return arr[arr.length - 1]; };
/**
 * @hidden
 */
exports.unique = function (arr) { return Array.from(new Set(arr)); };
/**
 * @hidden
 */
exports.split = function (splitter) { return function (value) { return value.split(splitter); }; };
/**
 * @hidden
 */
exports.trim = function (value) { return value.trim(); };
/**
 * @hidden
 */
exports.filter = function (predicate) { return function (arr) { return arr.filter(predicate); }; };
/**
 * @hidden
 */
exports.toArray = function (x) { return (x instanceof Array ? x : [x]); };
/**
 * @hidden
 */
exports.getUniqueStyleValues = function (style, cssStyle) {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    var uniqueMarkValues = style.marks
        .filter(function (m) { return m.type.name === 'style'; })
        .map(function (m) { return m.attrs.style; })
        .map(exports.safeString)
        .map(exports.split(';'))
        .map(exports.filter(function (m) { return m.includes(cssStyle); }))
        // guards against empty array
        .map(function (cssStyleValues) { return (cssStyleValues.length !== 0 ? cssStyleValues : [cssStyle + ": INVALID"]); })
        .map(exports.first)
        .map(exports.split(':'))
        .map(exports.last)
        .map(exports.trim)
        .reduce(function (acc, curr) { return (acc.indexOf(curr) > -1 ? acc : acc.concat([curr])); }, []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
exports.conditionallyExecute = function (fn) { return function (condition) { return function (param) { return (condition ? fn(param) : param); }; }; };
/**
 * @hidden
 */
exports.pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) { return fns.reduce(function (y, f) { return f(y); }, x); };
};
