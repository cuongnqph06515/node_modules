/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Pipe } from '@angular/core';
import { IntlService } from './intl.service';
const isNumeric = (value) => !isNaN(value - parseFloat(value));
const ɵ0 = isNumeric;
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
export class DatePipe {
    /**
     * @hidden
     */
    constructor(intlService) {
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
    transform(value, format = "", localeId) {
        value = this.normalize(value);
        if (value) {
            return this.intlService.formatDate(value, format, localeId);
        }
        return value;
    }
    normalize(value) {
        if (value && typeof value === 'string') {
            value = this.intlService.parseDate(value);
        }
        else if (value && isNumeric(value)) {
            value = new Date(parseFloat(value));
        }
        return value;
    }
}
DatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'kendoDate'
            },] },
];
/** @nocollapse */
DatePipe.ctorParameters = () => [
    { type: IntlService }
];
export { ɵ0 };
