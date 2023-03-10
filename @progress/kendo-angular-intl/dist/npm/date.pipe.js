/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var intl_service_1 = require("./intl.service");
var isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
var ɵ0 = isNumeric;
exports.ɵ0 = ɵ0;
/**
 * Formats a date value to a string based on the requested format.
 * This pipe uses the [IntlService]({% slug api_intl_intlservice %}).
 *
 * @example
 * ```ng-template-no-run
 * <ul>
 *    <li>{{date | kendoDate }}</li>
 *    <li>{{milliseconds | kendoDate: 'M/dd/yyy' }}</li>
 *    <li>{{stringDate | kendoDate: 'G' }}</li>
 * </ul>
 * ```
 */
var DatePipe = /** @class */ (function () {
    /**
     * @hidden
     */
    function DatePipe(intlService) {
        this.intlService = intlService;
    }
    /**
     * Converts a `Date` object into a string based on the specified format.
     * If no format is provided, the default short date format is used.
     *
     * @param value - The date to format.
     * @param format - The format string or options.
     * @param localeId - (Optional) The ID of the locale which will be used instead of the default one.
     * @return - The formatted date.
     */
    DatePipe.prototype.transform = function (value, format, localeId) {
        if (format === void 0) { format = ""; }
        value = this.normalize(value);
        if (value) {
            return this.intlService.formatDate(value, format, localeId);
        }
        return value;
    };
    DatePipe.prototype.normalize = function (value) {
        if (value && typeof value === 'string') {
            value = this.intlService.parseDate(value);
        }
        else if (value && isNumeric(value)) {
            value = new Date(parseFloat(value));
        }
        return value;
    };
    DatePipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'kendoDate'
                },] },
    ];
    /** @nocollapse */
    DatePipe.ctorParameters = function () { return [
        { type: intl_service_1.IntlService }
    ]; };
    return DatePipe;
}());
exports.DatePipe = DatePipe;
