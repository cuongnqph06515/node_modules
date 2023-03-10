/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intl = require("@telerik/kendo-intl");
var error_solutions_1 = require("./error-solutions");
function formatMessage(error) {
    var message = error.message;
    var errorSolution = error_solutions_1.errorSolutions[Object.keys(error_solutions_1.errorSolutions).filter(function (key) { return message.indexOf(key) === 0; })[0]];
    return errorSolution ? message + " " + errorSolution : message;
}
function intlMethod(fn) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        try {
            return fn.apply(null, values);
        }
        catch (error) {
            error.message = formatMessage(error);
            throw error;
        }
    };
}
/**
 * @hidden
 */
exports.dateFormatNames = intlMethod(intl.dateFormatNames);
/**
 * @hidden
 */
exports.dateFieldName = intlMethod(intl.dateFieldName);
/**
 * @hidden
 */
exports.firstDay = intlMethod(intl.firstDay);
/**
 * @hidden
 */
exports.format = intlMethod(intl.format);
/**
 * @hidden
 */
exports.formatDate = intlMethod(intl.formatDate);
/**
 * @hidden
 */
exports.formatNumber = intlMethod(intl.formatNumber);
/**
 * @hidden
 */
exports.load = intlMethod(intl.load);
/**
 * @hidden
 */
exports.numberSymbols = intlMethod(intl.numberSymbols);
/**
 * @hidden
 */
exports.parseDate = intlMethod(intl.parseDate);
/**
 * @hidden
 */
exports.parseNumber = intlMethod(intl.parseNumber);
/**
 * @hidden
 */
exports.splitDateFormat = intlMethod(intl.splitDateFormat);
/**
 * @hidden
 */
exports.toString = intlMethod(intl.toString);
/**
 * @hidden
 */
exports.weekendRange = intlMethod(intl.weekendRange);
/**
 * Sets a pre-built locale.
 *
 * @params data - The pre-built locale data.
 */
exports.setData = function (data) { return intl.setData(data); };
/**
 * Retrieves the locale data for the specified locale.
 *
 * @params locale - The locale id.
 * @returns data - The locale data.
 */
exports.localeData = function (locale) {
    try {
        return intl.localeInfo(locale);
    }
    catch (error) {
        error.message = formatMessage(error);
        throw error;
    }
};
