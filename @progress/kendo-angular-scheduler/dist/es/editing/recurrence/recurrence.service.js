import { EventEmitter, Injectable } from "@angular/core";
import { parseRule, serializeRule } from '@progress/kendo-recurrence';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { capitalize, isNullOrEmptyString } from '../../common/util';
import { isPresent } from '../../common/util';
import { toLocalDate, ZonedDate } from '@progress/kendo-date-math';
var offsetPositions = ['first', 'second', 'third', 'fourth', 'last'];
var frequencies = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * @hidden
 */
export var dayRule = [
    { day: 0, offset: 0 },
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 */
export var weekdayRule = [
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 }
];
/**
 * @hidden
 */
export var weekendRule = [
    { day: 0, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 *
 * The internal service for handling changes in the RecurrenceEditor component.
 */
var RecurrenceService = /** @class */ (function () {
    function RecurrenceService(intl, localization) {
        this.intl = intl;
        this.localization = localization;
        this.change = new EventEmitter();
        this.endRuleChange = new EventEmitter();
        this.frequencyChange = new EventEmitter();
        this.repeatOnRuleChange = new EventEmitter();
    }
    RecurrenceService.prototype.init = function (rrule, start, timezone) {
        if (rrule === void 0) { rrule = ""; }
        this.rrule = parseRule({
            recurrenceRule: rrule,
            weekStart: this.intl.firstDay()
        });
        this.start = start;
        this.timezone = timezone;
    };
    Object.defineProperty(RecurrenceService.prototype, "frequencies", {
        get: function () {
            var _this = this;
            return frequencies.map(function (freq) { return ({
                value: freq,
                text: _this.localization.get('frequencies' + capitalize(freq))
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "frequency", {
        get: function () {
            if (isPresent(this.rrule) && !isNullOrEmptyString(this.rrule.freq)) {
                return this.rrule.freq;
            }
            return 'never';
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setFrequency = function (freq) {
        this.rrule = {};
        this.rrule.freq = freq;
        this.rrule.interval = 1;
        if (freq === 'weekly') {
            this.rrule.byWeekDay = [{
                    day: this.start.getDay(),
                    offset: 0
                }];
        }
        if (freq === 'monthly' || freq === 'yearly') {
            this.rrule.byMonthDay = [this.start.getDate()];
        }
        if (freq === 'yearly') {
            this.rrule.byMonth = [this.start.getMonth() + 1];
        }
        this.frequencyChange.emit();
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "interval", {
        set: function (newInterval) {
            this.rrule.interval = newInterval;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "count", {
        set: function (newCount) {
            this.rrule.count = newCount;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "until", {
        get: function () {
            if (isPresent(this.rrule.until)) {
                return toLocalDate(this.rrule.until);
            }
        },
        set: function (newUntil) {
            this.rrule.until = ZonedDate.fromLocalDate(newUntil, this.timezone);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setWeekDays = function (newWeekDays) {
        this.rrule.byWeekDay = newWeekDays;
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "monthDays", {
        set: function (newMonthDays) {
            this.rrule.byMonthDay = newMonthDays;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "positions", {
        set: function (newPositions) {
            this.rrule.bySetPosition = newPositions;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setMonths = function (newMonths) {
        this.rrule.byMonth = newMonths;
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "months", {
        get: function () {
            return this.intl.dateFormatNames({
                type: 'months',
                nameType: 'wide'
            }).map(function (month, idx) { return ({
                text: month,
                value: idx + 1
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "weekDays", {
        /*
            ToDo Refactor weekDays and extendedWeekDays getters into a single method
        */
        get: function () {
            var firstDay = this.intl.firstDay();
            var abbrNames = this.intl.dateFormatNames({
                type: 'days',
                nameType: 'abbreviated'
            }).map(function (day, idx) { return ({
                text: day,
                value: idx
            }); });
            /* Sorting according to first week day */
            return (abbrNames.slice(firstDay)).concat(abbrNames.slice(0, firstDay));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "extendedWeekDays", {
        get: function () {
            var firstDay = this.intl.firstDay();
            var wideNames = this.intl.dateFormatNames({
                type: 'days',
                nameType: 'wide'
            }).map(function (day, idx) { return ({
                text: day,
                value: idx
            }); });
            var sortedWideNames = (wideNames.slice(firstDay)).concat(wideNames.slice(0, firstDay));
            var specialRules = [
                { text: this.localization.get('weekdaysDay'), value: 'day' },
                { text: this.localization.get('weekdaysWeekday'), value: 'weekday' },
                { text: this.localization.get('weekdaysWeekendday'), value: 'weekend' }
            ];
            return specialRules.concat(sortedWideNames);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "offsetPositions", {
        get: function () {
            var _this = this;
            var values = [1, 2, 3, 4, -1];
            return offsetPositions.map(function (offset, idx) { return ({
                text: _this.localization.get('offsetPositions' + capitalize(offset)),
                value: values[idx]
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "endRule", {
        get: function () {
            if (isPresent(this.rrule.count)) {
                return 'count';
            }
            else if (isPresent(this.rrule.until)) {
                return 'until';
            }
            else {
                return 'never';
            }
        },
        set: function (endRule) {
            if (endRule === 'count') {
                this.rrule.until = null;
            }
            else if (endRule === 'until') {
                this.rrule.count = null;
            }
            else {
                /* never */
                this.rrule.count = null;
                this.rrule.until = null;
            }
            this.endRuleChange.emit(endRule);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "repeatOnRule", {
        get: function () {
            if (isPresent(this.rrule.byWeekDay)) {
                return 'weekday';
            }
            else if (isPresent(this.rrule.byMonthDay)) {
                return 'monthday';
            }
            return null;
        },
        set: function (repeatOnRule) {
            if (repeatOnRule === 'monthday') {
                this.rrule.byWeekDay = null;
                this.rrule.bySetPosition = null;
            }
            else {
                /* weekDays */
                this.rrule.byMonthDay = null;
            }
            this.repeatOnRuleChange.emit(repeatOnRule);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.onChange = function () {
        if (this.frequency === 'never') {
            this.change.emit(null);
        }
        else {
            this.change.emit(serializeRule(this.rrule, this.timezone));
        }
    };
    RecurrenceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RecurrenceService.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService }
    ]; };
    return RecurrenceService;
}());
export { RecurrenceService };
