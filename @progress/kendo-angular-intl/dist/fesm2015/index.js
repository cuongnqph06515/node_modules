/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, LOCALE_ID, defineInjectable, inject, Inject, Pipe, NgModule } from '@angular/core';
import { dateFormatNames, dateFieldName, firstDay, format, formatDate, formatNumber, load, numberSymbols, parseDate, parseNumber, splitDateFormat, toString, weekendRange, setData, localeInfo } from '@telerik/kendo-intl';

const DOCS_URL = 'http://www.telerik.com/kendo-angular-ui/components/internationalization/troubleshooting/';
/**
 * @hidden
 */
const errorSolutions = {
    'NoCurrency': `Solution: ${DOCS_URL}#toc-no-currency`,
    'NoCurrencyDisplay': `Solution: ${DOCS_URL}#toc-no-currency-display`,
    'NoCurrencyRegion': `Solution: ${DOCS_URL}#toc-no-currency-region`,
    'NoDateFieldNames': `Solution: ${DOCS_URL}#toc-no-date-filed-names`,
    'NoFirstDay': `Solution: ${DOCS_URL}#toc-no-first-day`,
    'NoGMTInfo': `Solution: ${DOCS_URL}#toc-no-gmt-info`,
    'NoLocale': `Solution: ${DOCS_URL}#toc-no-locale`,
    'NoValidCurrency': `Solution: ${DOCS_URL}#toc-no-valid-currency`,
    'NoWeekData': `Solution: ${DOCS_URL}#toc-no-week-data`
};

function formatMessage(error) {
    const message = error.message;
    const errorSolution = errorSolutions[Object.keys(errorSolutions).filter(key => message.indexOf(key) === 0)[0]];
    return errorSolution ? `${message} ${errorSolution}` : message;
}
function intlMethod(fn) {
    return function (...values) {
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
const dateFormatNames$1 = intlMethod(dateFormatNames);
/**
 * @hidden
 */
const dateFieldName$1 = intlMethod(dateFieldName);
/**
 * @hidden
 */
const firstDay$1 = intlMethod(firstDay);
/**
 * @hidden
 */
const format$1 = intlMethod(format);
/**
 * @hidden
 */
const formatDate$1 = intlMethod(formatDate);
/**
 * @hidden
 */
const formatNumber$1 = intlMethod(formatNumber);
/**
 * @hidden
 */
const load$1 = intlMethod(load);
/**
 * @hidden
 */
const numberSymbols$1 = intlMethod(numberSymbols);
/**
 * @hidden
 */
const parseDate$1 = intlMethod(parseDate);
/**
 * @hidden
 */
const parseNumber$1 = intlMethod(parseNumber);
/**
 * @hidden
 */
const splitDateFormat$1 = intlMethod(splitDateFormat);
/**
 * @hidden
 */
const toString$1 = intlMethod(toString);
/**
 * @hidden
 */
const weekendRange$1 = intlMethod(weekendRange);
/**
 * Sets a pre-built locale.
 *
 * @params data - The pre-built locale data.
 */
const setData$1 = (data) => setData(data);
/**
 * Retrieves the locale data for the specified locale.
 *
 * @params locale - The locale id.
 * @returns data - The locale data.
 */
const localeData = (locale) => {
    try {
        return localeInfo(locale);
    }
    catch (error) {
        error.message = formatMessage(error);
        throw error;
    }
};

const LOCALE_REGEX = /_/g;
/**
 * @hidden
 */
function cldrServiceFactory(localeId) {
    return new CldrIntlService(localeId);
}
/**
 * An abstract base class that implements
 * the Internationalization service methods
 * for the current locale.
 */
class IntlService {
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
IntlService.ngInjectableDef = defineInjectable({ factory: function IntlService_Factory() { return cldrServiceFactory(inject(LOCALE_ID)); }, token: IntlService, providedIn: "root" });
/**
 * The Internationalization service implemented by using
 * the CLDR Database via the `@telerik/kendo-intl` package.
 */
class CldrIntlService extends IntlService {
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
    format(format$$1, ...values) {
        return format$1(format$$1, values, this.localeId);
    }
    /**
     * Converts an object into a string based on the specified format.
     *
     * @param value - The value to format.
     * @param format - The format to use.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The formatted object.
     */
    toString(value, format$$1, localeId) {
        return toString$1(value, format$$1, localeId || this.localeId);
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
    formatDate(value, format$$1, localeId) {
        return formatDate$1(value, format$$1, localeId || this.localeId);
    }
    /**
     * Converts a string into a `Date` object based on the specified format.
     *
     * @param value - The string to convert.
     * @param format - The format strings or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The parsed date.
     */
    parseDate(value, format$$1, localeId) {
        return parseDate$1(value, format$$1, localeId || this.localeId);
    }
    /**
     * Converts a string into a `Number`.
     *
     * @param value - The string to convert.
     * @param format - The format string or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The parsed number.
     */
    parseNumber(value, format$$1, localeId) {
        return parseNumber$1(value, localeId || this.localeId, format$$1);
    }
    /**
     * Converts a `Number` into a string based on the specified format.
     *
     * @param value - The number to format.
     * @param format - The format string or options.
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return The formatted number.
     */
    formatNumber(value, format$$1, localeId) {
        return formatNumber$1(value, format$$1, localeId || this.localeId);
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
        return dateFieldName$1(options, localeId || this.localeId);
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
        return dateFormatNames$1(localeId || this.localeId, options);
    }
    /**
     * Splits the date format into objects containing information about each part of the pattern.
     *
     * @param format The format string or options.
     * @param localeId The optional locale id. If not specified, the `"en"` locale id is used.
     * @returns The date format parts.
     */
    splitDateFormat(format$$1, localeId) {
        return splitDateFormat$1(format$$1, localeId || this.localeId);
    }
    /**
     * Returns the number symbols from the current locale based on the option.
     *
     * @param localeId - The locale ID to use in place of the default one. Optional.
     * @return - The number symbols from the current locale.
     */
    numberSymbols(localeId) {
        return numberSymbols$1(localeId || this.localeId);
    }
    /**
     * Returns the first day index starting from Sunday.
     *
     * @param localeId - The locale ID. Defaults to the current locale ID.
     * @return - The index of the first day of the week (0 == Sunday).
     */
    firstDay(localeId) {
        return firstDay$1(localeId || this.localeId);
    }
    /**
     * Returns the start and end index of the locale weekend starting from Sunday.
     *
     * @param localeId - The locale ID. Defaults to the current locale ID.
     * @return - The the start and end index of the locale weekend (0 == Sunday).
     */
    weekendRange(localeId) {
        return weekendRange$1(localeId || this.localeId);
    }
}
CldrIntlService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CldrIntlService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

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
class DatePipe {
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
    transform(value, format$$1 = "", localeId) {
        value = this.normalize(value);
        if (value) {
            return this.intlService.formatDate(value, format$$1, localeId);
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

/**
 * Formats a number value to a string based on the requested format.
 * This pipe uses the [`IntlService`]({% slug api_intl_intlservice %}).
 *
 * @example
 * ```ng-template-no-run
 *   <ul>
 *     <li>{{decimal | kendoNumber:'c' }}</li>
 *     <li>{{stringNumber | kendoNumber:'p' }}</li>
 *     <li>{{int | kendoNumber:'##.00' }}</li>
 *  </ul>
 * ```
 */
class NumberPipe {
    /**
     * @hidden
     */
    constructor(intlService) {
        this.intlService = intlService;
    }
    /**
     * Converts a `Number` object into a string based on the specified format.
     * If no format is provided, the value is formatted as decimal number using the
     * [`"n"`](https://github.com/telerik/kendo-intl/blob/master/docs/num-formatting/index.md#standard) format.
     *
     * @param value - The numer that will be formatted.
     * @param format - The format string or options.
     * @param localeId - (Optional) The locale ID that will be used in place of the default one.
     * @return - The formatted number.
     */
    transform(value, format$$1, localeId) {
        if (typeof value === 'string') {
            value = this.intlService.parseNumber(value);
        }
        if (value !== null && value !== undefined) {
            return this.intlService.formatNumber(value, format$$1, localeId);
        }
        return value;
    }
}
NumberPipe.decorators = [
    { type: Pipe, args: [{
                name: 'kendoNumber'
            },] },
];
/** @nocollapse */
NumberPipe.ctorParameters = () => [
    { type: IntlService }
];

const pipes = [
    DatePipe,
    NumberPipe
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}docs/ts/latest/guide/ngmodule.html)
 * definition for the Intl services.
 */
class IntlModule {
}
IntlModule.decorators = [
    { type: NgModule, args: [{
                declarations: [pipes],
                exports: [pipes]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { cldrServiceFactory, IntlService, CldrIntlService, DatePipe, ɵ0, NumberPipe, IntlModule, dateFormatNames$1 as dateFormatNames, dateFieldName$1 as dateFieldName, firstDay$1 as firstDay, format$1 as format, formatDate$1 as formatDate, formatNumber$1 as formatNumber, load$1 as load, numberSymbols$1 as numberSymbols, parseDate$1 as parseDate, parseNumber$1 as parseNumber, splitDateFormat$1 as splitDateFormat, toString$1 as toString, weekendRange$1 as weekendRange, setData$1 as setData, localeData };
