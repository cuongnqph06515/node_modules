/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, ViewChild, EventEmitter, ElementRef, HostBinding, isDevMode, Renderer2, forwardRef, NgZone, Optional, Injector } from '@angular/core';
import { minValidator } from '../validators/min.validator';
import { maxValidator } from '../validators/max.validator';
import { incompleteDateValidator } from '../validators/incomplete-date.validator';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { addMonths, cloneDate, createDate, getDate, isEqual, lastDayOfMonth } from '@progress/kendo-date-math';
import { isDocumentAvailable, hasObservers, KendoInput, Keys, guid } from '@progress/kendo-angular-common';
import { Arrow } from './arrow.enum';
import { approximateStringMatching, noop, isInRange, dateInRange, isValidRange, setTime } from '../util';
import { PickerService } from '../common/picker.service';
import { closest } from '../common/dom-queries';
import { requiresZoneOnBlur, isPresent } from '../common/utils';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/dateinput/#toc-using-with-json';
var DATE_PART_REGEXP = /year|month|<day>/;
var TIME_PART_REGEXP = /hour|minute|second|millisecond/;
var SHORT_PATTERN_LENGTH_REGEXP = /d|M|H|h|m|s/;
var padZero = function (length) { return new Array(Math.max(length, 0)).fill('0').join(''); };
var ɵ0 = padZero;
var unpadZero = function (value) { return value.replace(/^0*/, ''); };
var ɵ1 = unpadZero;
var Mask = /** @class */ (function () {
    function Mask() {
        this.symbols = "";
    }
    return Mask;
}());
var KendoDate = /** @class */ (function () {
    function KendoDate(intl, formatPlaceholder, format, value) {
        this.intl = intl;
        this.formatPlaceholder = formatPlaceholder;
        this.format = format;
        this.year = true;
        this.month = true;
        this.date = true;
        this.hours = true;
        this.minutes = true;
        this.seconds = true;
        this.milliseconds = true;
        this.leadingZero = null;
        this.monthNames = null;
        this.typedMonthPart = "";
        this.value = getDate(new Date());
        this.knownParts = "adHhmMsEy";
        this.symbols = {
            "E": "E",
            "H": "H",
            "M": "M",
            "a": "a",
            "d": "d",
            "h": "h",
            "m": "m",
            "s": "s",
            "y": "y"
        };
        this.monthNames = this.allFormatedMonths();
        this.dayPeriods = this.allDayPeriods();
        if (!value) {
            this.value = getDate(new Date());
            var sampleFormat = this.dateFormatString(this.value, this.format).symbols;
            for (var i = 0; i < sampleFormat.length; i++) {
                this.setExisting(sampleFormat[i], false);
            }
        }
        else {
            this.value = cloneDate(value);
        }
    }
    KendoDate.prototype.hasValue = function () {
        var _this = this;
        var pred = function (a, p) { return a || p.type !== 'literal' && p.type !== 'dayperiod' && _this.getExisting(p.pattern[0]); };
        return this.intl.splitDateFormat(this.format).reduce(pred, false);
    };
    KendoDate.prototype.getDateObject = function () {
        for (var i = 0; i < this.knownParts.length; i++) {
            if (!this.getExisting(this.knownParts[i])) {
                return null;
            }
        }
        return cloneDate(this.value);
    };
    KendoDate.prototype.getTextAndFormat = function () {
        return this.merge(this.intl.formatDate(this.value, this.format), this.dateFormatString(this.value, this.format));
    };
    KendoDate.prototype.getExisting = function (symbol) {
        switch (symbol) {
            case "y": return this.year;
            case "M":
            case "L": return this.month;
            case "d": return this.date;
            case "E": return this.date && this.month && this.year;
            case "h":
            case "H": return this.hours;
            case "m": return this.minutes;
            case "s": return this.seconds;
            default: return true;
        }
    };
    KendoDate.prototype.setExisting = function (symbol, value) {
        switch (symbol) {
            case "y":
                this.year = value;
                if (value === false) {
                    this.value.setFullYear(2000);
                }
                break; //allow 2/29 dates
            case "M":
                this.month = value;
                if (value === false) {
                    this.value.setMonth(0);
                }
                break; //make sure you can type 31 at day part
            case "d":
                this.date = value;
                break;
            case "h":
            case "H":
                this.hours = value;
                break;
            case "m":
                this.minutes = value;
                break;
            case "s":
                this.seconds = value;
                break;
            default: return;
        }
    };
    KendoDate.prototype.modifyPart = function (symbol, offset) {
        var newValue = cloneDate(this.value);
        switch (symbol) {
            case "y":
                newValue.setFullYear(newValue.getFullYear() + offset);
                break;
            case "M":
                newValue = addMonths(this.value, offset);
                break;
            case "d":
            case "E":
                newValue.setDate(newValue.getDate() + offset);
                break;
            case "h":
            case "H":
                newValue.setHours(newValue.getHours() + offset);
                break;
            case "m":
                newValue.setMinutes(newValue.getMinutes() + offset);
                break;
            case "s":
                newValue.setSeconds(newValue.getSeconds() + offset);
                break;
            case "a":
                newValue.setHours(newValue.getHours() + (12 * offset));
                break;
            default: break;
        }
        if (newValue.getFullYear() > 0) {
            this.setExisting(symbol, true);
            this.value = newValue;
        }
    };
    KendoDate.prototype.parsePart = function (symbol, currentChar, resetSegmentValue) {
        if (!currentChar) {
            this.resetLeadingZero();
            this.setExisting(symbol, false);
            return { value: null, switchToNext: false };
        }
        var baseDate = this.intl.formatDate(this.value, this.format);
        var dateParts = this.dateFormatString(this.value, this.format);
        var baseFormat = dateParts.symbols;
        var replaced = false;
        var prefix = "";
        var current = "";
        var suffix = "";
        for (var i = 0; i < baseDate.length; i++) {
            if (baseFormat[i] === symbol) {
                current += this.getExisting(symbol) ? baseDate[i] : "0";
                replaced = true;
            }
            else if (!replaced) {
                prefix += baseDate[i];
            }
            else {
                suffix += baseDate[i];
            }
        }
        var currentMaxLength = current.length - 3;
        var parsedDate = null;
        var month = this.matchMonth(currentChar);
        var dayPeriod = this.matchDayPeriod(currentChar, symbol);
        var isZeroCurrentChar = currentChar === '0';
        var leadingZero = (this.leadingZero || {})[symbol] || 0;
        if (isZeroCurrentChar) {
            var valueNumber = parseInt(resetSegmentValue ? currentChar : current + currentChar, 10);
            if (valueNumber === 0 && !this.isAbbrMonth(dateParts.partMap, symbol)) {
                this.incrementLeadingZero(symbol);
            }
        }
        else {
            this.resetLeadingZero();
        }
        for (var i = Math.max(0, currentMaxLength); i <= current.length; i++) {
            var middle = resetSegmentValue ? currentChar : (current.substring(i) + currentChar);
            var middleNumber = parseInt(middle, 10);
            parsedDate = this.intl.parseDate(prefix + middle + suffix, this.format);
            if (!parsedDate && !isNaN(middleNumber) && !isNaN(parseInt(currentChar, 10))) {
                if (symbol === 'M' && !month) {
                    var monthNumber = middleNumber - 1;
                    if (monthNumber > -1 && monthNumber < 12) {
                        parsedDate = cloneDate(this.value);
                        parsedDate.setMonth(monthNumber);
                        if (parsedDate.getMonth() !== monthNumber) {
                            parsedDate = lastDayOfMonth(addMonths(parsedDate, -1));
                        }
                    }
                }
                if (symbol === 'y') {
                    parsedDate = createDate(parseInt(middle, 10), this.month ? this.value.getMonth() : 0, this.date ? this.value.getDate() : 1, this.hours ? this.value.getHours() : 0, this.minutes ? this.value.getMinutes() : 0, this.seconds ? this.value.getSeconds() : 0, this.milliseconds ? this.value.getMilliseconds() : 0);
                    if (this.date && parsedDate.getDate() !== this.value.getDate()) {
                        parsedDate = lastDayOfMonth(addMonths(parsedDate, -1));
                    }
                }
            }
            if (parsedDate) {
                //move to next segment if the part will overflow with next char
                //when start from empty date (01, then 010), padded zeros should be trimmed
                var patternValue = this.partPattern(dateParts.partMap, symbol).pattern;
                var peekDate = this.intl.parseDate("" + prefix + this.peek(middle, patternValue) + suffix, this.format);
                var patternLength = this.patternLength(patternValue) || patternValue.length;
                var patternSatisfied = (leadingZero + (unpadZero(middle) || currentChar).length) >= patternLength;
                var switchToNext = peekDate === null || patternSatisfied;
                this.value = parsedDate;
                this.setExisting(symbol, true);
                return { value: this.value, switchToNext: switchToNext };
            }
        }
        if (month) {
            parsedDate = this.intl.parseDate(prefix + month + suffix, this.format);
            if (parsedDate) {
                this.value = parsedDate;
                this.setExisting(symbol, true);
                return { value: this.value, switchToNext: false };
            }
        }
        if (dayPeriod) {
            parsedDate = this.intl.parseDate(prefix + dayPeriod + suffix, this.format);
            if (parsedDate) {
                this.value = parsedDate;
                return { value: this.value, switchToNext: true };
            }
        }
        if (isZeroCurrentChar) {
            this.setExisting(symbol, false);
        }
        return { value: null, switchToNext: false };
    };
    KendoDate.prototype.resetLeadingZero = function () {
        var hasLeadingZero = this.leadingZero !== null;
        this.setLeadingZero(null);
        return hasLeadingZero;
    };
    KendoDate.prototype.setLeadingZero = function (leadingZero) {
        this.leadingZero = leadingZero;
    };
    KendoDate.prototype.incrementLeadingZero = function (symbol) {
        var leadingZero = this.leadingZero || {};
        leadingZero[symbol] = (leadingZero[symbol] || 0) + 1;
        this.leadingZero = leadingZero;
    };
    KendoDate.prototype.isAbbrMonth = function (parts, symbol) {
        var pattern = this.partPattern(parts, symbol);
        return pattern.type === 'month' && pattern.names;
    };
    KendoDate.prototype.partPattern = function (parts, symbol) {
        return parts.filter(function (part) { return part.pattern.indexOf(symbol) !== -1; })[0];
    };
    KendoDate.prototype.peek = function (value, pattern) {
        var peekValue = unpadZero(value) + '0';
        return padZero(pattern.length - peekValue.length) + peekValue;
    };
    KendoDate.prototype.matchMonth = function (typedChar) {
        this.typedMonthPart += typedChar.toLowerCase();
        if (!this.monthNames) {
            return "";
        }
        while (this.typedMonthPart.length > 0) {
            for (var i = 0; i < this.monthNames.length; i++) {
                if (this.monthNames[i].toLowerCase().indexOf(this.typedMonthPart) === 0) {
                    return this.monthNames[i];
                }
            }
            var monthAsNum = parseInt(this.typedMonthPart, 10);
            if (monthAsNum >= 1 && monthAsNum <= 12 && monthAsNum.toString() === this.typedMonthPart /*ensure they exact match*/) {
                return this.monthNames[monthAsNum - 1];
            }
            this.typedMonthPart = this.typedMonthPart.substring(1, this.typedMonthPart.length);
        }
        return "";
    };
    KendoDate.prototype.matchDayPeriod = function (typedChar, symbol) {
        var lowerChart = String(typedChar).toLowerCase();
        if (symbol === 'a' && this.dayPeriods) {
            if (this.dayPeriods.am.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.am;
            }
            else if (this.dayPeriods.pm.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.pm;
            }
        }
        return '';
    };
    KendoDate.prototype.allFormatedMonths = function () {
        var dateFormatParts = this.intl.splitDateFormat(this.format);
        for (var i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "month" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    };
    KendoDate.prototype.allDayPeriods = function () {
        var dateFormatParts = this.intl.splitDateFormat(this.format);
        for (var i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "dayperiod" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    };
    KendoDate.prototype.patternLength = function (pattern) {
        if (pattern[0] === 'y') {
            return 4;
        }
        if (SHORT_PATTERN_LENGTH_REGEXP.test(pattern)) {
            return 2;
        }
        return 0;
    };
    //TODO: REMOVE!
    KendoDate.prototype.dateFormatString = function (date, format) {
        var dateFormatParts = this.intl.splitDateFormat(format);
        var parts = [];
        var partMap = [];
        for (var i = 0; i < dateFormatParts.length; i++) {
            var partLength = this.intl.formatDate(date, { pattern: dateFormatParts[i].pattern }).length;
            while (partLength > 0) {
                parts.push(this.symbols[dateFormatParts[i].pattern[0]] || "_");
                partMap.push(dateFormatParts[i]);
                partLength--;
            }
        }
        var returnValue = new Mask();
        returnValue.symbols = parts.join("");
        returnValue.partMap = partMap;
        return returnValue;
    };
    KendoDate.prototype.merge = function (text, mask) {
        // Important: right to left.
        var resultText = "";
        var resultFormat = "";
        var format = mask.symbols;
        for (var r = format.length - 1; r >= 0; r--) {
            if (this.knownParts.indexOf(format[r]) === -1 || this.getExisting(format[r])) {
                resultText = text[r] + resultText;
                resultFormat = format[r] + resultFormat;
            }
            else {
                var currentSymbol = format[r];
                while (r >= 0 && currentSymbol === format[r]) {
                    r--;
                }
                r++;
                if (this.leadingZero && this.leadingZero[currentSymbol]) {
                    resultText = '0' + resultText;
                }
                else {
                    resultText = this.dateFieldName(mask.partMap[r]) + resultText;
                }
                while (resultFormat.length < resultText.length) {
                    resultFormat = format[r] + resultFormat;
                }
            }
        }
        return [resultText, resultFormat];
    };
    KendoDate.prototype.dateFieldName = function (part) {
        var formatPlaceholder = this.formatPlaceholder || 'wide';
        if (formatPlaceholder[part.type]) {
            return formatPlaceholder[part.type];
        }
        if (formatPlaceholder === 'formatPattern') {
            return part.pattern;
        }
        return this.intl.dateFieldName(Object.assign(part, { nameType: formatPlaceholder }));
    };
    return KendoDate;
}());
/**
 * Represents the [Kendo UI DateInput component for Angular]({% slug overview_dateinput %}#toc-basic-usage).
 */
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent(cdr, intl, renderer, element, ngZone, injector, localization, pickerService) {
        this.cdr = cdr;
        this.intl = intl;
        this.renderer = renderer;
        this.element = element;
        this.ngZone = ngZone;
        this.injector = injector;
        this.localization = localization;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Sets or gets the `disabled` property of the DateInput and
         * determines whether the component is active
         * ([see example]({% slug disabled_dateinput %})).
         */
        this.disabled = false;
        /**
         * Sets or gets the read-only state of the DateInput
         * ([see example]({% slug readonly_dateinput %})).
         */
        this.readonly = false;
        /**
         * Sets the title of the input element of the DateInput.
         */
        this.title = "";
        /**
         * Sets or gets the `tabIndex` property of the DateInput.
         * .
         */
        this.tabindex = 0;
        /**
         * @hidden
         */
        this.role = 'spinbutton';
        /**
         * @hidden
         */
        this.ariaReadOnly = false;
        /**
         * Specifies the date format that is used to display the input value
         * ([see example]({% slug formats_dateinput %})).
         */
        this.format = "d";
        /**
         * Specifies the hint the DateInput displays when its value is `null`.
         * For more information, refer to the article on
         * [placeholders]({% slug placeholders_dateinput %}).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-dateinput placeholder="Enter birth date..."></kendo-dateinput>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Determines whether the built-in min or max validators are to be enforced when a form is being validated.
         */
        this.rangeValidation = true;
        /**
         * @hidden
         * Based on the min and max values, specifies whether the value will be auto-corrected while typing.
         */
        this.autoCorrect = false;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * For more information, refer to the article on
         * [spinner buttons]({% slug spinbuttons_dateinput %}).
         */
        this.spinners = false;
        /**
         * @hidden
         */
        this.isPopupOpen = false;
        /**
         * @hidden
         */
        this.hasPopup = false;
        /**
         * Fires each time the user selects a new value.
         * For more information, refer to the section on
         * [events]({% slug overview_dateinput %}#toc-events).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user selects a new value.
         * For more information, refer to the section on
         * [events]({% slug overview_dateinput %}#toc-events).
         */
        this.valueUpdate = new EventEmitter();
        /**
         * Fires each time the user focuses the input element.
         * For more information, refer to the section on
         * [events]({% slug overview_dateinput %}#toc-events).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-dateinput (focus)="handleFocus()"></kendo-dateinput>
         * `
         * })
         * export class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         *
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the input element gets blurred.
         * For more information, refer to the section on
         * [events]({% slug overview_dateinput %}#toc-events).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-dateinput (blur)="handleBlur()"></kendo-dateinput>
         * `
         * })
         * export class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         *
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        this.arrow = Arrow;
        this.arrowDirection = Arrow.None;
        this.formatSections = { date: false, time: false };
        this.hasMousedown = false;
        this.focusedPriorToMousedown = false;
        /**
         * @hidden
         */
        this.isDateIncomplete = false;
        this.currentValue = "";
        this.currentFormat = "";
        this.backspace = false;
        this.resetSegmentValue = true;
        this.minValidator = noop;
        this.maxValidator = noop;
        this.incompleteValidator = noop;
        this._value = null;
        this._active = false;
        this.kendoDate = null;
        this.paste = false;
        this.domEvents = [];
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.symbolsMap = this.dateSymbolMap();
        this.updateFormatSections();
        if (this.pickerService) {
            this.pickerService.input = this;
        }
    }
    Object.defineProperty(DateInputComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DateInput component.
         *
         * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            if (this.autoCorrect && !isInRange(value, this.min, this.max)) {
                return;
            }
            this._value = cloneDate(value);
            this.valueUpdate.emit(cloneDate(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "wrapperClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "inputElement", {
        get: function () {
            return this.dateInput ? this.dateInput.nativeElement : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "inputValue", {
        get: function () {
            return (this.inputElement || {}).value || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (!this.wrap) {
                return;
            }
            if (!isPresent(this.pickerService)) {
                var element = this.wrap.nativeElement;
                if (value) {
                    this.renderer.addClass(element, 'k-state-focused');
                }
                else {
                    this.renderer.removeClass(element, 'k-state-focused');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    DateInputComponent.prototype.isEmpty = function () {
        return !this.currentValue || !String(this.currentValue).trim();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.ngOnChanges = function (changes) {
        this.verifyRange();
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.minValidator = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidator = this.rangeValidation ? maxValidator(this.max) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.symbolsMap = this.dateSymbolMap();
            this.updateFormatSections();
        }
        var isEqualToKendoDate = this.kendoDate && isEqual(this.value, this.kendoDate.getDateObject());
        if (changes.format || !isEqualToKendoDate || changes.placeholder) {
            this.kendoDate = this.getKendoDate(this.value);
            this.updateElementValue(this.isActive);
        }
    };
    DateInputComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.input = null;
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.validate = function (control) {
        return this.minValidator(control) || this.maxValidator(control) || this.incompleteValidator(control, this.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue();
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.ngControl = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.ngZone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    //ngModel binding
    /**
     * @hidden
     */
    DateInputComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        this.kendoDate = this.getKendoDate(value);
        this.value = cloneDate(value);
        this.updateElementValue(this.isActive);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.triggerChange = function () {
        var value = this.kendoDate.getDateObject();
        if (+value !== +this.value) {
            this.value = cloneDate(value);
            this.notify();
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.notify = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.onControlChange(cloneDate(_this.value));
            _this.valueChange.emit(cloneDate(_this.value));
        });
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * Focuses the DateInput component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="dateinput.focus()">Focus date input</button>
     *  <kendo-dateinput #dateinput></kendo-dateinput>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    DateInputComponent.prototype.focus = function () {
        var input = this.inputElement;
        if (input) {
            input.focus();
            this.selectDateSegment(this.currentFormat[0]);
        }
    };
    /**
     * Blurs the DateInput component.
     */
    DateInputComponent.prototype.blur = function () {
        var input = this.inputElement;
        if (input) {
            input.blur();
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleButtonClick = function (offset) {
        this.arrowDirection = Arrow.None;
        this.modifyDateSegmentValue(offset);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.modifyDateSegmentValue = function (offset) {
        var caret = this.caret();
        var symbol = this.currentFormat[caret[0]];
        var step = (this.steps || {})[this.symbolsMap[symbol]] || 1;
        this.kendoDate.modifyPart(symbol, offset * step);
        this.putDateInRange();
        this.updateElementValue(this.isActive);
        this.triggerChange();
        this.selectDateSegment(symbol);
        this.updateIncompleteValidationStatus();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.switchDateSegment = function (offset) {
        var caret = this.caret();
        if (this.kendoDate.resetLeadingZero()) {
            this.updateElementValue(this.isActive);
        }
        if (caret[0] < caret[1] && this.currentFormat[caret[0]] !== this.currentFormat[caret[1] - 1]) {
            this.selectNearestSegment(offset > 0 ? caret[0] : caret[1] - 1);
            this.resetSegmentValue = true;
            return true;
        }
        var previousFormatSymbol = this.currentFormat[caret[0]];
        var a = caret[0] + offset;
        while (a > 0 && a < this.currentFormat.length) {
            if (this.currentFormat[a] !== previousFormatSymbol &&
                this.currentFormat[a] !== "_") {
                break;
            }
            a += offset;
        }
        if (this.currentFormat[a] === "_") {
            //there is not known symbol found
            return false;
        }
        var b = a;
        while (b >= 0 && b < this.currentFormat.length) {
            if (this.currentFormat[b] !== this.currentFormat[a]) {
                break;
            }
            b += offset;
        }
        if (a > b && (b + 1 !== caret[0] || a + 1 !== caret[1])) {
            this.caret(b + 1, a + 1);
            this.resetSegmentValue = true;
            return true;
        }
        else if (a < b && (a !== caret[0] || b !== caret[1])) {
            this.caret(a, b);
            this.resetSegmentValue = true;
            return true;
        }
        return false;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.selectDateSegment = function (symbol) {
        var begin = -1;
        var end = 0;
        for (var i = 0; i < this.currentFormat.length; i++) {
            if (this.currentFormat[i] === symbol) {
                end = i + 1;
                if (begin === -1) {
                    begin = i;
                }
            }
        }
        if (begin < 0) {
            begin = 0;
        }
        this.caret(0, 0);
        this.caret(begin, end);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleClick = function () {
        this.hasMousedown = false;
        if (this.isActive) {
            var selectionPresent = this.inputElement.selectionStart !== this.inputElement.selectionEnd;
            var placeholderToggled = isPresent(this.placeholder) && !this.kendoDate.hasValue() && !this.focusedPriorToMousedown;
            // focus first segment if the user hasn't selected something during mousedown and if the placeholder was just toggled
            var selectFirstSegment = !selectionPresent && placeholderToggled;
            var index = selectFirstSegment ? 0 : this.caret()[0];
            this.selectNearestSegment(index);
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleDragAndDrop = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleMousedown = function () {
        this.hasMousedown = true;
        this.focusedPriorToMousedown = this.isActive;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleFocus = function (args) {
        var _this = this;
        this.isActive = true;
        this.updateElementValue();
        if (!this.hasMousedown) {
            this.caret(0, this.inputValue.length);
        }
        this.hasMousedown = false;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(function () {
                _this.emitFocus(args);
            });
        }
        else {
            this.emitFocus(args);
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleBlur = function (args) {
        var _this = this;
        this.isActive = false;
        this.resetSegmentValue = true;
        this.kendoDate.resetLeadingZero();
        this.updateElementValue();
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.ngControl)) {
            this.ngZone.run(function () {
                _this.onControlTouched();
                _this.emitBlur(args);
                _this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
        }
    };
    DateInputComponent.prototype.getKendoDate = function (value) {
        var leadingZero = ((this.kendoDate || {}) || null).leadingZero;
        var kendoDate = new KendoDate(this.intl, this.formatPlaceholder, this.format, value);
        kendoDate.setLeadingZero(this.isActive ? leadingZero : null);
        return kendoDate;
    };
    DateInputComponent.prototype.dateSymbolMap = function () {
        var reducer = function (map, part) {
            map[part.pattern[0]] = part.type;
            return map;
        };
        return this.intl.splitDateFormat(this.format).reduce(reducer, {});
    };
    DateInputComponent.prototype.updateElementValue = function (isActive) {
        var start = this.caret()[0]; //XXX: get caret position before input is updated
        var texts = this.kendoDate.getTextAndFormat();
        var showPlaceholder = !this.isActive && isPresent(this.placeholder) && !this.kendoDate.hasValue();
        var input = this.inputElement;
        this.currentFormat = texts[1];
        this.currentValue = !showPlaceholder ? texts[0] : '';
        this.renderer.setProperty(input, "value", this.currentValue);
        if (input.placeholder !== this.placeholder) {
            this.renderer.setProperty(input, "placeholder", this.placeholder);
        }
        if (isActive) {
            this.selectNearestSegment(start);
        }
    };
    DateInputComponent.prototype.caret = function (start, end) {
        if (end === void 0) { end = start; }
        var isPosition = start !== undefined;
        var returnValue = [start, start];
        var element = this.inputElement;
        if (isPosition && (this.disabled || this.readonly)) {
            return undefined;
        }
        try {
            if (element.selectionStart !== undefined) {
                if (isPosition) {
                    if (isDocumentAvailable() && document.activeElement !== element) {
                        element.focus();
                    }
                    element.setSelectionRange(start, end);
                }
                returnValue = [element.selectionStart, element.selectionEnd];
            }
        }
        catch (e) {
            returnValue = [];
        }
        return returnValue;
    };
    DateInputComponent.prototype.selectNearestSegment = function (index) {
        // Finds the nearest (in both directions) known part.
        for (var i = index, j = index - 1; i < this.currentFormat.length || j >= 0; i++, j--) {
            if (i < this.currentFormat.length && this.currentFormat[i] !== "_") {
                this.selectDateSegment(this.currentFormat[i]);
                return;
            }
            if (j >= 0 && this.currentFormat[j] !== "_") {
                this.selectDateSegment(this.currentFormat[j]);
                return;
            }
        }
    };
    DateInputComponent.prototype.verifyRange = function () {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    DateInputComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    DateInputComponent.prototype.putDateInRange = function () {
        var currentDate = this.kendoDate.getDateObject();
        var candidate = dateInRange(currentDate, this.min, this.max);
        if (this.autoCorrect && !isEqual(currentDate, candidate)) {
            this.kendoDate = this.getKendoDate(candidate);
        }
    };
    DateInputComponent.prototype.updateFormatSections = function () {
        this.formatSections = this.intl.splitDateFormat(this.format)
            .reduce(function (_a, p) {
            var date = _a.date, time = _a.time;
            return {
                date: date || DATE_PART_REGEXP.test(p.type),
                time: time || TIME_PART_REGEXP.test(p.type)
            };
        }, { date: false, time: false });
    };
    DateInputComponent.prototype.intlChange = function () {
        this.updateFormatSections();
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue(this.isActive);
    };
    DateInputComponent.prototype.updateOnPaste = function () {
        var value = this.intl.parseDate(this.inputValue, this.format) || this.value;
        var notify = +value !== +this.value;
        this.writeValue(value);
        if (notify) {
            this.notify();
        }
    };
    DateInputComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        var mousewheelHandler = this.handleMouseWheel.bind(this);
        this.domEvents.push(this.renderer.listen(element, 'DOMMouseScroll', mousewheelHandler), this.renderer.listen(element, 'mousewheel', mousewheelHandler), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)), this.renderer.listen(element, 'paste', this.handlePaste.bind(this)), this.renderer.listen(element, 'input', this.handleInput.bind(this)));
    };
    DateInputComponent.prototype.handleMouseWheel = function (event) {
        if (this.disabled || this.readonly || !this.isActive) {
            return;
        }
        event = window.event || event;
        if (event.shiftKey) {
            this.switchDateSegment((event.wheelDelta || -event.detail) > 0 ? -1 : 1);
        }
        else {
            this.modifyDateSegmentValue((event.wheelDelta || -event.detail) > 0 ? 1 : -1);
        }
        event.returnValue = false;
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    };
    DateInputComponent.prototype.handlePaste = function () {
        this.paste = true;
    };
    DateInputComponent.prototype.handleKeydown = function (event) {
        if (this.disabled || this.readonly || event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }
        if (event.keyCode === Keys.Tab) {
            var moved = this.switchDateSegment(event.shiftKey ? -1 : 1);
            if (moved) {
                event.preventDefault();
            }
            return;
        }
        if (event.keyCode === Keys.Backspace) {
            this.backspace = true;
            return;
        }
        switch (event.keyCode) {
            case Keys.ArrowDown:
                this.modifyDateSegmentValue(-1);
                break;
            case Keys.ArrowUp:
                this.modifyDateSegmentValue(1);
                break;
            case Keys.ArrowRight:
                this.switchDateSegment(1);
                break;
            case Keys.ArrowLeft:
                this.switchDateSegment(-1);
                break;
            case Keys.Home:
                this.selectNearestSegment(0);
                break;
            case Keys.End:
                this.selectNearestSegment(this.inputValue.length);
                break;
            default:
                return; //skip the preventDefault if we didn't handled the keyCode
        }
        event.preventDefault();
    };
    DateInputComponent.prototype.handleInput = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.paste) {
            this.updateOnPaste();
            this.paste = false;
            return;
        }
        var diff = approximateStringMatching(this.currentValue, this.currentFormat, this.inputValue, this.caret()[0]);
        var navigationOnly = (diff.length === 1 && diff[0][1] === "_");
        var switchPart = false;
        if (!navigationOnly) {
            var parsedPart = void 0;
            for (var i = 0; i < diff.length; i++) {
                parsedPart = this.kendoDate.parsePart(diff[i][0], diff[i][1], this.resetSegmentValue);
                switchPart = parsedPart.switchToNext;
            }
            var candidate = this.kendoDate.getDateObject();
            if (this.value && candidate && !this.formatSections.date) {
                this.kendoDate = this.getKendoDate(setTime(this.value, candidate));
            }
        }
        this.resetSegmentValue = false;
        this.putDateInRange();
        this.updateElementValue(this.isActive);
        this.triggerChange();
        this.updateIncompleteValidationStatus();
        if (diff.length && diff[0][0] !== "_") {
            this.selectDateSegment(diff[0][0]);
        }
        if (switchPart || navigationOnly) {
            this.switchDateSegment(1);
        }
        if (this.backspace) {
            this.switchDateSegment(-1);
        }
        this.backspace = false;
    };
    DateInputComponent.prototype.emitFocus = function (args) {
        this.onFocus.emit();
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    };
    DateInputComponent.prototype.emitBlur = function (args) {
        this.onBlur.emit();
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    DateInputComponent.prototype.updateIncompleteValidationStatus = function () {
        var _this = this;
        var previousValue = this.isDateIncomplete;
        this.isDateIncomplete = this.kendoDate.hasValue() && this.value === null;
        if (previousValue === this.isDateIncomplete || !this.incompleteDateValidation) {
            return;
        }
        if (isPresent(this.ngControl) && !isPresent(this.pickerService)) {
            this.cdr.markForCheck();
            this.ngZone.run(function () { return _this.onValidatorChange(); });
        }
        else if (isPresent(this.pickerService)) {
            this.pickerService.dateCompletenessChange.emit();
        }
    };
    DateInputComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-dateinput',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DateInputComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DateInputComponent; }), multi: true },
                        { provide: L10N_PREFIX, useValue: 'kendo.dateinput' },
                        { provide: KendoInput, useExisting: forwardRef(function () { return DateInputComponent; }) },
                        LocalizationService
                    ],
                    selector: 'kendo-dateinput',
                    template: "\n    <ng-container kendoDateInputLocalizedMessages\n        i18n-increment=\"kendo.dateinput.increment|The label for the **Increment** button in the DateInput\"\n        increment=\"Increase value\"\n\n        i18n-decrement=\"kendo.dateinput.decrement|The label for the **Decrement** button in the DateInput\"\n        decrement=\"Decrease value\"\n    >\n    </ng-container>\n    <span class=\"k-dateinput-wrap\" #wrap>\n        <input\n            #dateInput\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            autocapitalize=\"off\"\n            spellcheck=\"false\"\n            class=\"k-input\"\n            [attr.role]=\"role\"\n            [attr.aria-readonly]=\"ariaReadOnly\"\n            [id]=\"focusableId\"\n            [title]=\"title\"\n            [tabindex]=\"tabindex\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [placeholder]=\"placeholder\"\n            [attr.aria-expanded]=\"isPopupOpen\"\n            [attr.aria-haspopup]=\"hasPopup\"\n            [kendoEventsOutsideAngular]=\"{\n                click: handleClick,\n                focus: handleFocus,\n                mousedown: handleMousedown,\n                touchstart: handleMousedown,\n                dragstart: handleDragAndDrop,\n                drop: handleDragAndDrop,\n                blur: handleBlur\n            }\"\n            [scope]=\"this\"\n            />\n        <span *ngIf=\"spinners\" class=\"k-select\" (mousedown)=\"$event.preventDefault()\">\n            <span\n                class=\"k-link k-link-increase\"\n                [class.k-state-active]=\"arrowDirection === arrow.Up\"\n                (mousedown)=\"arrowDirection = arrow.Up\"\n                (mouseleave)=\"arrowDirection = arrow.None\"\n                (click)=\"handleButtonClick(1)\"\n                [title]=\"localization.get('increment')\"\n                [attr.aria-label]=\"localization.get('increment')\">\n                <span class=\"k-icon k-i-arrow-n\"></span>\n            </span>\n            <span\n                class=\"k-link k-link-decrease\"\n                (click)=\"handleButtonClick(-1)\"\n                [class.k-state-active]=\"arrowDirection === arrow.Down\"\n                (mousedown)=\"arrowDirection = arrow.Down\"\n                (mouseleave)=\"arrowDirection = arrow.None\"\n                [title]=\"localization.get('decrement')\"\n                [attr.aria-label]=\"localization.get('decrement')\">\n                <span class=\"k-icon k-i-arrow-s\"></span>\n            </span>\n        </span>\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    DateInputComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: Injector },
        { type: LocalizationService },
        { type: PickerService, decorators: [{ type: Optional }] }
    ]; };
    DateInputComponent.propDecorators = {
        focusableId: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        title: [{ type: Input }],
        tabindex: [{ type: Input }],
        role: [{ type: Input }],
        ariaReadOnly: [{ type: Input }],
        tabIndex: [{ type: Input }],
        format: [{ type: Input }],
        formatPlaceholder: [{ type: Input }],
        placeholder: [{ type: Input }],
        steps: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        autoCorrect: [{ type: Input }],
        incompleteDateValidation: [{ type: Input }],
        value: [{ type: Input }],
        spinners: [{ type: Input }],
        isPopupOpen: [{ type: Input }],
        hasPopup: [{ type: Input }],
        valueChange: [{ type: Output }],
        valueUpdate: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        dateInput: [{ type: ViewChild, args: ['dateInput', { static: true },] }],
        wrap: [{ type: ViewChild, args: ['wrap',] }],
        wrapperClass: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-dateinput',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
    };
    return DateInputComponent;
}());
export { DateInputComponent };
export { ɵ0, ɵ1 };
