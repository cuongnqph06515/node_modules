import { EventEmitter, Injectable } from "@angular/core";
import { parseRule, serializeRule } from '@progress/kendo-recurrence';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { capitalize, isNullOrEmptyString } from '../../common/util';
import { isPresent } from '../../common/util';
import { toLocalDate, ZonedDate } from '@progress/kendo-date-math';
const offsetPositions = ['first', 'second', 'third', 'fourth', 'last'];
const frequencies = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * @hidden
 */
export const dayRule = [
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
export const weekdayRule = [
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 }
];
/**
 * @hidden
 */
export const weekendRule = [
    { day: 0, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 *
 * The internal service for handling changes in the RecurrenceEditor component.
 */
export class RecurrenceService {
    constructor(intl, localization) {
        this.intl = intl;
        this.localization = localization;
        this.change = new EventEmitter();
        this.endRuleChange = new EventEmitter();
        this.frequencyChange = new EventEmitter();
        this.repeatOnRuleChange = new EventEmitter();
    }
    init(rrule = "", start, timezone) {
        this.rrule = parseRule({
            recurrenceRule: rrule,
            weekStart: this.intl.firstDay()
        });
        this.start = start;
        this.timezone = timezone;
    }
    get frequencies() {
        return frequencies.map((freq) => ({
            value: freq,
            text: this.localization.get('frequencies' + capitalize(freq))
        }));
    }
    get frequency() {
        if (isPresent(this.rrule) && !isNullOrEmptyString(this.rrule.freq)) {
            return this.rrule.freq;
        }
        return 'never';
    }
    setFrequency(freq) {
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
    }
    set interval(newInterval) {
        this.rrule.interval = newInterval;
        this.onChange();
    }
    set count(newCount) {
        this.rrule.count = newCount;
        this.onChange();
    }
    set until(newUntil) {
        this.rrule.until = ZonedDate.fromLocalDate(newUntil, this.timezone);
        this.onChange();
    }
    get until() {
        if (isPresent(this.rrule.until)) {
            return toLocalDate(this.rrule.until);
        }
    }
    setWeekDays(newWeekDays) {
        this.rrule.byWeekDay = newWeekDays;
        this.onChange();
    }
    set monthDays(newMonthDays) {
        this.rrule.byMonthDay = newMonthDays;
        this.onChange();
    }
    set positions(newPositions) {
        this.rrule.bySetPosition = newPositions;
        this.onChange();
    }
    setMonths(newMonths) {
        this.rrule.byMonth = newMonths;
        this.onChange();
    }
    get months() {
        return this.intl.dateFormatNames({
            type: 'months',
            nameType: 'wide'
        }).map((month, idx) => ({
            text: month,
            value: idx + 1
        }));
    }
    /*
        ToDo Refactor weekDays and extendedWeekDays getters into a single method
    */
    get weekDays() {
        const firstDay = this.intl.firstDay();
        const abbrNames = this.intl.dateFormatNames({
            type: 'days',
            nameType: 'abbreviated'
        }).map((day, idx) => ({
            text: day,
            value: idx
        }));
        /* Sorting according to first week day */
        return (abbrNames.slice(firstDay)).concat(abbrNames.slice(0, firstDay));
    }
    get extendedWeekDays() {
        const firstDay = this.intl.firstDay();
        let wideNames = this.intl.dateFormatNames({
            type: 'days',
            nameType: 'wide'
        }).map((day, idx) => ({
            text: day,
            value: idx
        }));
        const sortedWideNames = (wideNames.slice(firstDay)).concat(wideNames.slice(0, firstDay));
        const specialRules = [
            { text: this.localization.get('weekdaysDay'), value: 'day' },
            { text: this.localization.get('weekdaysWeekday'), value: 'weekday' },
            { text: this.localization.get('weekdaysWeekendday'), value: 'weekend' }
        ];
        return specialRules.concat(sortedWideNames);
    }
    get offsetPositions() {
        const values = [1, 2, 3, 4, -1];
        return offsetPositions.map((offset, idx) => ({
            text: this.localization.get('offsetPositions' + capitalize(offset)),
            value: values[idx]
        }));
    }
    get endRule() {
        if (isPresent(this.rrule.count)) {
            return 'count';
        }
        else if (isPresent(this.rrule.until)) {
            return 'until';
        }
        else {
            return 'never';
        }
    }
    set endRule(endRule) {
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
    }
    get repeatOnRule() {
        if (isPresent(this.rrule.byWeekDay)) {
            return 'weekday';
        }
        else if (isPresent(this.rrule.byMonthDay)) {
            return 'monthday';
        }
        return null;
    }
    set repeatOnRule(repeatOnRule) {
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
    }
    onChange() {
        if (this.frequency === 'never') {
            this.change.emit(null);
        }
        else {
            this.change.emit(serializeRule(this.rrule, this.timezone));
        }
    }
}
RecurrenceService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RecurrenceService.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService }
];
