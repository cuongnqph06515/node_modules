/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { formatDate, parseDate, dateFieldName, dateFormatNames, firstDay, splitDateFormat, weekendRange, format as intlFormat, toString, parseNumber, formatNumber, numberSymbols } from './intl-members';
import * as i0 from "@angular/core";
const LOCALE_REGEX = /_/g;
/**
 * @hidden
 */
export function cldrServiceFactory(localeId) {
    return new CldrIntlService(localeId);
}
/**
 * An abstract base class that implements
 * the Internationalization service methods
 * for the current locale.
 */
export class IntlService {
    constructor() {
        /**
         * @hidden
         */
        this.changes = new EventEmitter();
    }
    /**
     * Notifies that the service was changed.
     */
    notify() {
        this.changes.emit();
    }
}
IntlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: cldrServiceFactory,
                deps: [LOCALE_ID]
            },] },
];
IntlService.ngInjectableDef = i0.defineInjectable({ factory: function IntlService_Factory() { return cldrServiceFactory(i0.inject(i0.LOCALE_ID)); }, token: IntlService, providedIn: "root" });
/**
 * The Internationalization service implemented by using
 * the CLDR Database via the `@telerik/kendo-intl` package.
 */
export class CldrIntlService extends IntlService {
    /**
     * Creates a new instance of the service with the ID of the specified locale.
     *
     * Note that the parts of the locale ID can be separated by either `_` (underscore)
     * or `-` (dash).
     *
     * @param localeId - The default locale ID.
     */
    constructor(localeId) {
        super();
        this.localeId = localeId;
    }
    /**
     * Gets or sets the current locale ID.
     */
    get localeId() {
        return this.locale;
    }
    set localeId(value) {
        // Angular locales use underscore, for example, en_US
        // while IETF BCP-47 specifies a dash.
        // https://tools.ietf.org/html/bcp47
        const locale = value.replace(LOCALE_REGEX, '-');
        if (locale !== this.locale) {
            this.locale = locale;
            this.notify();
        }
    }
    /**
     * Formats a string with placeholders such as
     * `Total amount {0:c}`.
     *
     * @param format - The format string.
     * @param values - One or more values to output in the format string placeholders.
     * @return - The formatted string.
     */
    format(format, ...values) {
        return intlFormat(format, values, this.localeId);
    }
    /**
     * Converts an object into a string based on the specified format.
     *
     * @param value - The value to format.
     * @param format - The format to use.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The formatted object.
     */
    toString(value, format, localeId) {
        return toString(value, format, localeId || this.localeId);
    }
    /**
     * Converts a `Date` object into a string based on the specified format.
     * If no format is provided, the default short date format is used.
     *
     * @param value - The date to format.
     * @param format - The format string or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The formatted date.
     */
    formatDate(value, format, localeId) {
        return formatDate(value, format, localeId || this.localeId);
    }
    /**
     * Converts a string into a `Date` object based on the specified format.
     *
     * @param value - The string to convert.
     * @param format - The format strings or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The parsed date.
     */
    parseDate(value, format, localeId) {
        return parseDate(value, format, localeId || this.localeId);
    }
    /**
     * Converts a string into a `Number`.
     *
     * @param value - The string to convert.
     * @param format - The format string or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The parsed number.
     */
    parseNumber(value, format, localeId) {
        return parseNumber(value, localeId || this.localeId, format);
    }
    /**
     * Converts a `Number` into a string based on the specified format.
     *
     * @param value - The number to format.
     * @param format - The format string or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The formatted number.
     */
    formatNumber(value, format, localeId) {
        return formatNumber(value, format, localeId || this.localeId);
    }
    /**
     * Returns the date names from the current locale based on the option.
     *
     * The available `type` values are:
     * - `era`
     * - `year`
     * - `quarter`
     * - `month`
     * - `week`
     * - `day`
     * - `dayperiod`
     * - `hour`
     * - `minute`
     * - `second`
     * - `zone`
     *
     * The available `nameType` values are:
     * - `wide`
     * - `narrow`
     * - `short`
     *
     * @param options - Detailed configuration for the desired date field name.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return - The day names from the current locale based on the option.
     * @returns The localized date field name from the current locale based on the option.
     *
     * @example
     * ```
     * dateFieldName({ type: 'day' });                      //returns 'day';
     * dateFieldName({ type: 'day', nameType: 'wide' });    //returns 'day';
     * dateFieldName({ type: 'month', nameType: 'short' }); //returns 'mo.';
     * dateFieldName({ type: 'month', nameType: 'wide' });  //returns 'month';
     * ```
     */
    dateFieldName(options, localeId) {
        return dateFieldName(options, localeId || this.localeId);
    }
    /**
     * Returns a localized date field name based on specific dateFieldName options.
     *
     * The available type values are:
     * - `day`
     * - `dayperiod`
     * - `months`
     * - `quarters`
     * - `eras`
     *
     * @param options - Detailed configuration for the desired date format.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return - The day names from the current locale based on the option.
     */
    dateFormatNames(options, localeId) {
        return dateFormatNames(localeId || this.localeId, options);
    }
    /**
     * Splits the date format into objects containing information about each part of the pattern.
     *
     * @param format The format string or options.
     * @param localeId The optional locale id. If not specified, the `"en"` locale id is used.
     * @returns The date format parts.
     */
    splitDateFormat(format, localeId) {
        return splitDateFormat(format, localeId || this.localeId);
    }
    /**
     * Returns the number symbols from the current locale based on the option.
     *
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return - The number symbols from the current locale.
     */
    numberSymbols(localeId) {
        return numberSymbols(localeId || this.localeId);
    }
    /**
     * Returns the first day index starting from Sunday.
     *
     * @param localeId - The locale ID. Defaults to the current locale ID.
     * @return - The index of the first day of the week (0 == Sunday).
     */
    firstDay(localeId) {
        return firstDay(localeId || this.localeId);
    }
    /**
     * Returns the start and end index of the locale weekend starting from Sunday.
     *
     * @param localeId - The locale ID. Defaults to the current locale ID.
     * @return - The the start and end index of the locale weekend (0 == Sunday).
     */
    weekendRange(localeId) {
        return weekendRange(localeId || this.localeId);
    }
}
CldrIntlService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CldrIntlService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
