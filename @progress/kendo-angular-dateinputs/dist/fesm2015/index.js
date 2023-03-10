/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter, Injector, InjectionToken, Component, Inject, ElementRef, Renderer2, NgZone, Input, Output, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, Directive, TemplateRef, isDevMode, forwardRef, Optional, ContentChild, ViewContainerRef, HostListener, ViewChildren, ContentChildren, IterableDiffers, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { LocalizationService, L10N_PREFIX, RTL, ComponentMessages } from '@progress/kendo-angular-l10n';
import { getDate, isEqual, cloneDate, addDays, addDecades, addCenturies, firstDecadeOfCentury, lastDecadeOfCentury, firstYearOfDecade, createDate, durationInCenturies, addYears, lastYearOfDecade, durationInDecades, addWeeks, addMonths, firstDayOfMonth, lastDayOfMonth, dayOfWeek, durationInMonths, firstMonthOfYear, lastMonthOfYear, durationInYears, weekInYear } from '@progress/kendo-date-math';
import { isDocumentAvailable, KendoInput, guid, hasObservers, Keys, EventsModule, ResizeSensorModule } from '@progress/kendo-angular-common';
import { IntlService, IntlModule } from '@progress/kendo-angular-intl';
import { ReplaySubject, Observable, Subject, combineLatest, of, interval, animationFrameScheduler, fromEvent, EMPTY, from, Subscription, BehaviorSubject, merge } from 'rxjs';
import { map, scan, takeWhile, tap, filter, debounceTime } from 'rxjs/operators';
import { PopupService, PopupModule } from '@progress/kendo-angular-popup';
import { CommonModule } from '@angular/common';
import { touchEnabled } from '@progress/kendo-common';

/**
 * @hidden
 */
var Action;
(function (Action) {
    Action[Action["Left"] = 0] = "Left";
    Action[Action["Right"] = 1] = "Right";
    Action[Action["Up"] = 2] = "Up";
    Action[Action["Down"] = 3] = "Down";
    Action[Action["PrevView"] = 4] = "PrevView";
    Action[Action["NextView"] = 5] = "NextView";
    Action[Action["FirstInView"] = 6] = "FirstInView";
    Action[Action["LastInView"] = 7] = "LastInView";
    Action[Action["LowerView"] = 8] = "LowerView";
    Action[Action["UpperView"] = 9] = "UpperView";
})(Action || (Action = {}));

/**
 * @hidden
 */
const EMPTY_SELECTIONRANGE = { start: null, end: null };

/**
 * @hidden
 */
const MIDNIGHT_DATE = new Date(1980, 0, 1);
/**
 * @hidden
 */
const MIN_DATE = new Date(1900, 0, 1);
/**
 * @hidden
 */
const MAX_DATE = new Date(2099, 11, 31);
/**
 * @hidden
 */
const MIN_TIME = new Date(1980, 0, 1);
/**
 * @hidden
 */
const MAX_TIME = new Date(1980, 0, 1, 23, 59, 59);

/* tslint:disable:no-bitwise max-line-length */
const isSet = (value) => value !== null && value !== undefined;
const setter = (method) => (date, value) => {
    const clone = cloneDate(date);
    clone[method](value);
    return clone;
};
/**
 * @hidden
 */
const setTime = (origin, candidate) => {
    const date = cloneDate(origin);
    date.setHours(candidate.getHours(), candidate.getMinutes(), candidate.getSeconds(), candidate.getMilliseconds());
    return date;
};
const normalizeTimes = (candidate, min, max) => ({
    candidateValue: setTime(MIDNIGHT_DATE, candidate),
    maxValue: addDays(setTime(MIDNIGHT_DATE, max), min.getHours() < max.getHours() ||
        (min.getHours() === max.getHours() && min.getMinutes() < max.getMinutes()) ? 0 : 1),
    minValue: setTime(MIDNIGHT_DATE, min)
});
/**
 * @hidden
 */
const setHours = setter('setHours');
/**
 * @hidden
 */
const setMinutes = setter('setMinutes');
/**
 * @hidden
 */
const setSeconds = setter('setSeconds');
/**
 * @hidden
 */
const range = (start, end, step = 1) => {
    const result = [];
    for (let i = start; i < end; i = i + step) {
        result.push(i);
    }
    return result;
};
/**
 * @hidden
 */
const isInRange = (candidate, min, max) => (!candidate || !((min && min > candidate) || (max && max < candidate)));
/**
 * @hidden
 */
const isInTimeRange = (candidate, min, max) => {
    if (!candidate || !min || !max) {
        return true;
    }
    const { candidateValue, minValue, maxValue } = normalizeTimes(candidate, min, max);
    return minValue <= candidateValue && candidateValue <= maxValue;
};
/**
 * @hidden
 */
const isValidRange = (min, max) => (!isSet(min) || !isSet(max) || min <= max);
/**
 * @hidden
 */
const dateInRange = (candidate, min, max) => {
    if (!candidate) {
        return candidate;
    }
    if (min && candidate < min) {
        return cloneDate(min);
    }
    if (max && candidate > max) {
        return cloneDate(max);
    }
    return candidate;
};
/**
 * @hidden
 */
const timeInRange = (candidate, min, max) => {
    if (!candidate || !min || !max) {
        return candidate;
    }
    const { candidateValue, minValue, maxValue } = normalizeTimes(candidate, min, max);
    if (candidateValue < minValue) {
        return setTime(candidate, min);
    }
    if (candidateValue > maxValue) {
        return setTime(candidate, max);
    }
    return candidate;
};
/**
 * @hidden
 */
const getNow = () => new Date();
/**
 * @hidden
 */
const getToday = () => getDate(new Date());
/**
 * @hidden
 */
const noop = (_) => { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
const isWindowAvailable = () => {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
const stringifyClassObject = (classes) => {
    const pushToAcc = (acc, cls) => classes[cls] ? acc.concat(cls) : acc;
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
const shiftWeekNames = (names, offset) => (names.slice(offset).concat(names.slice(0, offset)));
/**
 * @hidden
 */
const approximateStringMatching = (oldTextOrigin, oldFormat, newTextOrigin, caret) => {
    // Remove the right part of the cursor.
    //oldFormat = oldFormat.substring(0, caret + oldText.length - newText.length);
    const oldIndex = caret + oldTextOrigin.length - newTextOrigin.length;
    const oldTextSeparator = oldTextOrigin[oldIndex];
    const oldText = oldTextOrigin.substring(0, caret + oldTextOrigin.length - newTextOrigin.length);
    const newText = newTextOrigin.substring(0, caret);
    const diff = [];
    // Handle typing a single character over the same selection.
    if (oldText === newText && caret > 0) {
        diff.push([oldFormat[caret - 1], newText[caret - 1]]);
        return diff;
    }
    if (oldText.indexOf(newText) === 0 && (newText.length === 0 || oldFormat[newText.length - 1] !== oldFormat[newText.length])) {
        // Handle Delete/Backspace.
        let deletedSymbol = "";
        //XXX:
        // Whole text is replaced with a same char
        // Nasty patch required to keep the selection in the first segment
        if (newText.length === 1) {
            diff.push([oldFormat[0], newText[0]]);
        }
        for (let i = newText.length; i < oldText.length; i++) {
            if (oldFormat[i] !== deletedSymbol && oldFormat[i] !== "_") {
                deletedSymbol = oldFormat[i];
                diff.push([deletedSymbol, ""]);
            }
        }
        return diff;
    }
    // Handle inserting text (the new text is longer than the previous one).
    // Handle typing over a literal as well.
    if (newText.indexOf(oldText) === 0 || oldFormat[caret - 1] === "_") {
        let symbol = oldFormat[0];
        for (let i = Math.max(0, oldText.length - 1); i < oldFormat.length; i++) {
            if (oldFormat[i] !== "_") {
                symbol = oldFormat[i];
                break;
            }
        }
        return [[symbol, newText[caret - 1]]];
    }
    // Handle entering a space or a separator, for navigation to the next item.
    if (newText[newText.length - 1] === " " || (newText[newText.length - 1] === oldTextSeparator && oldFormat[oldIndex] === '_')) {
        return [[oldFormat[caret - 1], "_"]];
    }
    // Handle typing over a correctly selected part.
    return [[oldFormat[caret - 1], newText[caret - 1]]];
};
/**
 * @hidden
 */
const domContainerFactory = (type) => (children, classes = "", styles = {}) => {
    const container = document.createElement(type);
    container.className = classes;
    Object.keys(styles).map(key => container.style[key] = styles[key]);
    if (typeof children === 'string') {
        container.innerHTML = children || '';
    }
    else {
        (children || []).forEach(child => child && container.appendChild(child));
    }
    return container;
};
/**
 * @hidden
 */
const hasChange = (changes, field) => changes[field] !== undefined;
/**
 * @hidden
 */
const hasExistingValue = (changes, field) => changes[field] && changes[field].currentValue !== undefined && changes[field].currentValue !== null;
/**
 * @hidden
 */
const isInSelectionRange = (value, selectionRange) => {
    const { start, end } = selectionRange || EMPTY_SELECTIONRANGE;
    if (!start || !end) {
        return false;
    }
    return start < value && value < end;
};
/**
 * @hidden
 */
const either = (value1, value2) => value1 || value2;
/**
 * @hidden
 */
const clampRange = (value) => ({ start: value, end: value });
/**
 * @hidden
 */
const isEqualRange = (initial, updated) => {
    const { start: initialStart, end: initialEnd } = initial || EMPTY_SELECTIONRANGE;
    const { start: updatedStart, end: updatedEnd } = updated || EMPTY_SELECTIONRANGE;
    return isEqual(initialStart, updatedStart) && isEqual(initialEnd, updatedEnd);
};
/**
 * @hidden
 *
 * Creates a new date based on the date information from the specified date portion
 * and the time information from the time portion.
 * If a parameter is not provided, returns `null`.
 */
const mergeDateAndTime = (date, time) => {
    if (!(date && time)) {
        return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};
/**
 * @hidden
 */
const lastMillisecondOfDate = (date) => {
    if (!date) {
        return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
};
/**
 * @hidden
 *
 * Returns an array with dates ranging between and including the specified start and
 * end dates that are evaluated as disabled.
 */
const disabledDatesInRange = (start, end, isDateDisabled) => {
    if (!(start && end && isDateDisabled) || (start > end)) {
        return [];
    }
    const dates = [];
    let current = start;
    while (current <= end) {
        if (isDateDisabled(current)) {
            dates.push(current);
        }
        current = addDays(current, 1);
    }
    return dates;
};

/* tslint:disable:object-literal-sort-keys */
const EMPTY_DATA = [[]];
const CELLS_LENGTH = 5;
const ROWS_LENGTH = 2;
const ACTIONS = {
    [Action.Left]: (date) => addDecades(date, -1),
    [Action.Up]: (date) => addDecades(date, -5),
    [Action.Right]: (date) => addDecades(date, 1),
    [Action.Down]: (date) => addDecades(date, 5),
    [Action.PrevView]: (date) => addCenturies(date, -1),
    [Action.NextView]: (date) => addCenturies(date, 1),
    [Action.FirstInView]: (date) => firstDecadeOfCentury(date),
    [Action.LastInView]: (date) => lastDecadeOfCentury(date)
};
/**
 * @hidden
 */
class CenturyViewService {
    addToDate(min, skip) {
        return addCenturies(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addCenturies(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        const cells = range(0, CELLS_LENGTH);
        const firstDate = firstDecadeOfCentury(viewDate);
        const lastDate = lastDecadeOfCentury(viewDate);
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const today = getToday();
        return range(0, ROWS_LENGTH).map(rowOffset => {
            const baseDate = addDecades(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addDecades(baseDate, cellOffset), min, max);
                if (!this.isInRange(cellDate, min, max)) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: this.value(cellDate),
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return firstYearOfDecade(candidate).getFullYear() === firstYearOfDecade(expected).getFullYear();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 99);
    }
    isInRange(candidate, min, max) {
        const year = firstYearOfDecade(candidate).getFullYear();
        const aboveMin = !min || firstYearOfDecade(min).getFullYear() <= year;
        const belowMax = !max || year <= firstYearOfDecade(max).getFullYear();
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        const firstYear = firstYearOfDecade(firstDecadeOfCentury(date));
        return createDate(firstYear.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 1000 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return firstYearOfDecade(value).getFullYear().toString();
    }
    navigationTitle(value) {
        return value ? firstDecadeOfCentury(value).getFullYear().toString() : '';
    }
    title(value) {
        if (!value) {
            return '';
        }
        return `${firstDecadeOfCentury(value).getFullYear()} - ${lastDecadeOfCentury(value).getFullYear()}`;
    }
    rowLength(_) {
        return CELLS_LENGTH;
    }
    skip(value, min) {
        return durationInCenturies(min, value);
    }
    total(min, max) {
        return durationInCenturies(min, max) + 1;
    }
    value(current) {
        return current ? firstYearOfDecade(current).getFullYear().toString() : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const centuriesToSubtract = viewsCount - viewsInRange;
            return addCenturies(date, -1 * centuriesToSubtract);
        }
        return date;
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
}
CenturyViewService.decorators = [
    { type: Injectable },
];

/* tslint:disable:object-literal-sort-keys */
const EMPTY_DATA$1 = [[]];
const CELLS_LENGTH$1 = 5;
const ROWS_LENGTH$1 = 2;
const ACTIONS$1 = {
    [Action.Left]: (date) => addYears(date, -1),
    [Action.Up]: (date) => addYears(date, -5),
    [Action.Right]: (date) => addYears(date, 1),
    [Action.Down]: (date) => addYears(date, 5),
    [Action.PrevView]: (date) => addDecades(date, -1),
    [Action.NextView]: (date) => addDecades(date, 1),
    [Action.FirstInView]: (date) => firstYearOfDecade(date),
    [Action.LastInView]: (date) => lastYearOfDecade(date)
};
/**
 * @hidden
 */
class DecadeViewService {
    addToDate(min, skip) {
        return addDecades(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addDecades(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA$1;
        }
        const cells = range(0, CELLS_LENGTH$1);
        const firstDate = firstYearOfDecade(viewDate);
        const lastDate = lastYearOfDecade(viewDate);
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const today = getToday();
        return range(0, ROWS_LENGTH$1).map(rowOffset => {
            const baseDate = addYears(firstDate, rowOffset * CELLS_LENGTH$1);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addYears(baseDate, cellOffset), min, max);
                if (!this.isInRange(cellDate, min, max)) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: this.value(cellDate),
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 9);
    }
    isInRange(candidate, min, max) {
        const year = candidate.getFullYear();
        const aboveMin = !min || min.getFullYear() <= year;
        const belowMax = !max || year <= max.getFullYear();
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        const firstYear = firstYearOfDecade(date);
        return createDate(firstYear.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 100 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS$1[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return value.getFullYear().toString();
    }
    navigationTitle(value) {
        return value ? firstYearOfDecade(value).getFullYear().toString() : '';
    }
    title(value) {
        if (!value) {
            return '';
        }
        return `${firstYearOfDecade(value).getFullYear()} - ${lastYearOfDecade(value).getFullYear()}`;
    }
    rowLength(_) {
        return CELLS_LENGTH$1;
    }
    skip(value, min) {
        return durationInDecades(min, value);
    }
    total(min, max) {
        return durationInDecades(min, max) + 1;
    }
    value(current) {
        return current ? current.getFullYear().toString() : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const decadesToSubtract = viewsCount - viewsInRange;
            return addDecades(date, -1 * decadesToSubtract);
        }
        return date;
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
}
DecadeViewService.decorators = [
    { type: Injectable },
];

/* tslint:disable:object-literal-sort-keys */
const EMPTY_DATA$2 = [[]];
const CELLS_LENGTH$2 = 7;
const ROWS_LENGTH$2 = 6;
const ACTIONS$2 = {
    [Action.Left]: (date) => addDays(date, -1),
    [Action.Up]: (date) => addWeeks(date, -1),
    [Action.Right]: (date) => addDays(date, 1),
    [Action.Down]: (date) => addWeeks(date, 1),
    [Action.PrevView]: (date) => addMonths(date, -1),
    [Action.NextView]: (date) => addMonths(date, 1),
    [Action.FirstInView]: (date) => firstDayOfMonth(date),
    [Action.LastInView]: (date) => lastDayOfMonth(date)
};
/**
 * @hidden
 */
class MonthViewService {
    constructor(_intlService) {
        this._intlService = _intlService;
    }
    addToDate(min, skip) {
        return addMonths(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addMonths(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate, isDateDisabled = () => false } = options;
        if (!viewDate) {
            return EMPTY_DATA$2;
        }
        const firstMonthDate = firstDayOfMonth(viewDate);
        const firstMonthDay = getDate(firstMonthDate);
        const lastMonthDate = lastDayOfMonth(viewDate);
        const lastMonthDay = getDate(lastMonthDate);
        const backward = -1;
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const date = dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        const cells = range(0, CELLS_LENGTH$2);
        const today = getToday();
        return range(0, ROWS_LENGTH$2).map(rowOffset => {
            const baseDate = addDays(date, rowOffset * CELLS_LENGTH$2);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addDays(baseDate, cellOffset), min, max);
                const cellDay = getDate(cellDate);
                const otherMonth = cellDay < firstMonthDay || cellDay > lastMonthDay;
                const outOfRange = cellDate < min || cellDate > max;
                if (otherMonth || outOfRange) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: this.value(cellDate),
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: this.isWeekend(cellDate),
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstMonthDate),
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastMonthDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate,
                    isDisabled: isDateDisabled(cellDate)
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return getDate(candidate).getTime() === getDate(expected).getTime();
    }
    isInArray(date, dates) {
        if (dates.length === 0) {
            return false;
        }
        const lowerBound = this.beginningOfPeriod(dates[0]);
        const upperBound = this.beginningOfPeriod(addMonths(dates[dates.length - 1], 1));
        return lowerBound <= date && date < upperBound;
    }
    isInRange(candidate, min, max) {
        const value = getDate(candidate);
        const aboveMin = !min || getDate(min) <= value;
        const belowMax = !max || value <= getDate(max);
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        return createDate(date.getFullYear(), date.getMonth(), 1);
    }
    isRangeStart(value) {
        return !value.getMonth();
    }
    move(value, action) {
        const modifier = ACTIONS$2[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return this._intlService.formatDate(value, 'D');
    }
    navigationTitle(value) {
        if (!value) {
            return '';
        }
        return this.isRangeStart(value) ? value.getFullYear().toString() : this.abbrMonthNames()[value.getMonth()];
    }
    title(current) {
        return `${this.wideMonthNames()[current.getMonth()]} ${current.getFullYear()}`;
    }
    rowLength(prependCell) {
        return CELLS_LENGTH$2 + (prependCell ? 1 : 0);
    }
    skip(value, min) {
        return durationInMonths(min, value);
    }
    total(min, max) {
        return durationInMonths(min, max) + 1;
    }
    value(current) {
        return current ? current.getDate().toString() : "";
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const monthsToSubtract = viewsCount - viewsInRange;
            return addMonths(date, -1 * monthsToSubtract);
        }
        return date;
    }
    isWeekend(date) {
        const { start, end } = this._intlService.weekendRange();
        const day = date.getDay();
        if (end < start) {
            return day <= end || start <= day;
        }
        return start <= day && day <= end;
    }
    abbrMonthNames() {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
    wideMonthNames() {
        return this._intlService.dateFormatNames({ nameType: 'wide', type: 'months' });
    }
}
MonthViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MonthViewService.ctorParameters = () => [
    { type: IntlService }
];

/* tslint:disable:object-literal-sort-keys */
const EMPTY_DATA$3 = [[]];
const CELLS_LENGTH$3 = 5;
const ROWS_LENGTH$3 = 3;
const upStep = (month) => {
    if (month > 4) {
        return -5;
    }
    if (month < 2) {
        return -2;
    }
    return -7;
};
const downStep = (month) => {
    if (month < 7) {
        return 5;
    }
    if (month < 10) {
        return 7;
    }
    return 2;
};
const ACTIONS$3 = {
    [Action.Left]: (date) => addMonths(date, -1),
    [Action.Up]: (date) => addMonths(date, upStep(date.getMonth())),
    [Action.Right]: (date) => addMonths(date, 1),
    [Action.Down]: (date) => addMonths(date, downStep(date.getMonth())),
    [Action.PrevView]: (date) => addYears(date, -1),
    [Action.NextView]: (date) => addYears(date, 1),
    [Action.FirstInView]: (date) => firstMonthOfYear(date),
    [Action.LastInView]: (date) => lastMonthOfYear(date)
};
/**
 * @hidden
 */
class YearViewService {
    constructor(_intlService) {
        this._intlService = _intlService;
    }
    addToDate(min, skip) {
        return addYears(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addYears(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA$3;
        }
        const months = this.abbrMonthNames();
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const firstDate = firstMonthOfYear(viewDate);
        const lastDate = lastMonthOfYear(viewDate);
        const currentYear = firstDate.getFullYear();
        const cells = range(0, CELLS_LENGTH$3);
        const today = getToday();
        return range(0, ROWS_LENGTH$3).map(rowOffset => {
            const baseDate = addMonths(firstDate, rowOffset * CELLS_LENGTH$3);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addMonths(baseDate, cellOffset), min, max);
                const changedYear = currentYear < cellDate.getFullYear();
                if (!this.isInRange(cellDate, min, max) || changedYear) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: months[cellDate.getMonth()],
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear() &&
            candidate.getMonth() === expected.getMonth();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= dates[dates.length - 1].getFullYear();
    }
    isInRange(candidate, min, max) {
        const candidateValue = createDate(candidate.getFullYear(), candidate.getMonth(), 1);
        const aboveMin = !min || createDate(min.getFullYear(), min.getMonth(), 1) <= candidateValue;
        const belowMax = !max || candidateValue <= createDate(max.getFullYear(), max.getMonth(), 1);
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        return createDate(date.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 10 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS$3[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return `${value.getFullYear()} ${this.value(value)}`;
    }
    navigationTitle(value) {
        return this.title(value);
    }
    title(current) {
        return current ? current.getFullYear().toString() : '';
    }
    rowLength(_) {
        return CELLS_LENGTH$3;
    }
    skip(value, min) {
        return durationInYears(min, value);
    }
    total(min, max) {
        return durationInYears(min, max) + 1;
    }
    value(current) {
        return current ? this.abbrMonthNames()[current.getMonth()] : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const yearsToSubtract = viewsCount - viewsInRange;
            return addYears(date, -1 * yearsToSubtract);
        }
        return date;
    }
    abbrMonthNames() {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
}
YearViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
YearViewService.ctorParameters = () => [
    { type: IntlService }
];

/**
 * @hidden
 *
 * The Enum which defines all possible Calendar view types.
 */
var CalendarViewEnum;
(function (CalendarViewEnum) {
    CalendarViewEnum[CalendarViewEnum["month"] = 0] = "month";
    CalendarViewEnum[CalendarViewEnum["year"] = 1] = "year";
    CalendarViewEnum[CalendarViewEnum["decade"] = 2] = "decade";
    CalendarViewEnum[CalendarViewEnum["century"] = 3] = "century";
})(CalendarViewEnum || (CalendarViewEnum = {}));

const services = {
    [CalendarViewEnum.month]: MonthViewService,
    [CalendarViewEnum.year]: YearViewService,
    [CalendarViewEnum.decade]: DecadeViewService,
    [CalendarViewEnum.century]: CenturyViewService
};
const viewOffset = (view, offset) => {
    const candidate = CalendarViewEnum[CalendarViewEnum[view + offset]];
    return candidate !== undefined ? candidate : view;
};
/**
 * @hidden
 */
class BusViewService {
    constructor(injector) {
        this.injector = injector;
        this.viewChanged = new EventEmitter();
        this.bottom = CalendarViewEnum.month;
        this.top = CalendarViewEnum.century;
    }
    configure(bottom, top) {
        this.bottom = bottom;
        this.top = top;
    }
    service(view) {
        const serviceType = services[view];
        return serviceType ? this.injector.get(serviceType) : null;
    }
    moveDown(view) {
        this.move(view, -1);
    }
    moveUp(view) {
        this.move(view, 1);
    }
    moveToBottom(activeView) {
        if (activeView === this.bottom) {
            return;
        }
        this.viewChanged.emit({ view: this.bottom });
    }
    canMoveDown(view) {
        return this.bottom < view;
    }
    canMoveUp(view) {
        return view < this.top;
    }
    clamp(view) {
        if (view < this.bottom) {
            return this.bottom;
        }
        if (view > this.top) {
            return this.top;
        }
        return view;
    }
    move(view, offset) {
        const candidate = this.clamp(viewOffset(view, offset));
        if (candidate === view) {
            return;
        }
        this.viewChanged.emit({ view: candidate });
    }
}
BusViewService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BusViewService.ctorParameters = () => [
    { type: Injector }
];

/**
 * @hidden
 */
const requiresZoneOnBlur = (ngControl) => ngControl &&
    (!ngControl.touched || (ngControl.control && ngControl.control.updateOn === 'blur'));
/**
 * @hidden
 */
const preventDefault = (args) => args.preventDefault();
/**
 * @hidden
 */
const currentFocusTarget = (blurArgs) => blurArgs.relatedTarget || document.activeElement;
/**
 * @hidden
 */
const isPresent = (value) => value !== undefined && value !== null;
/**
 * @hidden
 *
 * If the provided parameter is an array with at least one item
 * and all items in the array are numbers, returns `true.
 */
const isNumberArray = (value) => Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'number');
/**
 * @hidden
 *
 * If the provided parameter is an array with at least one item
 * and all items in the array are dates, returns `true`.
 */
const isDateArray = (value) => Array.isArray(value) && value.length > 0 && value.every(item => item instanceof Date);

const div = domContainerFactory('div');
const ul = domContainerFactory('ul');
const li = domContainerFactory('li');
const td = domContainerFactory('td');
const th = domContainerFactory('th');
const tr = domContainerFactory('tr');
const tbody = domContainerFactory('tbody');
const thead = domContainerFactory('thead');
const table = domContainerFactory('table');
const monthHeader = () => (div(`
            <span class="k-button k-bare k-title">March 2017</span>
            <span class="k-today">TODAY</span>
        `, 'k-calendar-header'));
const monthWeekHeader = () => (table([
    thead([
        tr([th('MO')])
    ])
], 'k-calendar-weekdays'));
const repeat = (count, mapper) => new Array(count).fill('1').map(mapper);
const content = (rows, cells = 1) => (table([
    tbody([tr([th('1')])].concat(repeat(rows, () => tr(repeat(cells, c => td(`<span class="k-link">${c}</span>`))))))
]));
const scrollable = (children) => div(children, 'k-content k-scrollable');
const view = (contentElement, className, renderWeekHeader) => (div([
    monthHeader(),
    renderWeekHeader ? monthWeekHeader() : null,
    scrollable([contentElement, contentElement])
], className, { left: '-10000px', position: 'absolute' }));
const ɵ6 = () => {
    let navElement;
    return () => {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!navElement) {
            navElement = div([scrollable([ul([li('<span>FEB</span>')])])], 'k-calendar-navigation', { left: '0px', position: 'absolute' });
        }
        return navElement;
    };
};
const navigationList = (ɵ6)();
const viewFactory = ({ cells, rows }, className, renderWeekHeader) => {
    let viewElement;
    return () => {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!viewElement) {
            viewElement = view(content(rows, cells), className, renderWeekHeader);
        }
        return viewElement;
    };
};
const getScrollable = (element) => element.querySelector('.k-scrollable');
const horizontal = element => {
    const scrollableElement = getScrollable(element);
    scrollableElement.classList.add('k-scrollable-horizontal');
    return element;
};
const monthView = viewFactory({ cells: 7, rows: 6 }, 'k-calendar-view k-calendar-monthview', true);
const yearView = viewFactory({ cells: 5, rows: 3 }, 'k-calendar-view k-calendar-yearview', false);
const decadeView = viewFactory({ cells: 5, rows: 2 }, 'k-calendar-view k-calendar-decadeview', false);
const horzMonthView = () => horizontal(monthView());
const horzYearView = () => horizontal(yearView());
const horzDecadeView = () => horizontal(decadeView());
const height = (element) => (parseFloat(window.getComputedStyle(element).height) || element.offsetHeight);
const width = (element) => {
    const styles = window.getComputedStyle(element);
    const computed = parseFloat(styles.width)
        + parseFloat(styles.paddingLeft)
        + parseFloat(styles.paddingRight);
    return computed || element.offsetWidth;
};
const getBody = (element) => element.querySelector('tbody');
/**
 * @hidden
 */
class CalendarDOMService {
    ensureHeights() {
        if (this.calendarHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    }
    calculateHeights(container) {
        if (!isDocumentAvailable()) {
            return;
        }
        this.hostContainer = container;
        this.batch(monthView(), (contentElement) => {
            const viewElement = getBody(contentElement);
            this.calendarHeight = height(contentElement);
            this.monthViewHeight = height(viewElement);
            this.headerHeight = height(viewElement.children[0]);
            this.scrollableContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzMonthView(), (contentElement) => {
            const viewElement = getBody(contentElement);
            this.calendarWidth = width(contentElement);
            this.monthViewWidth = width(viewElement);
            this.scrollableContentWidth = width(getScrollable(contentElement));
        });
        this.batch(yearView(), (contentElement) => {
            this.yearViewHeight = height(getBody(contentElement));
            this.scrollableYearContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzYearView(), (contentElement) => {
            this.yearViewWidth = width(getBody(contentElement));
        });
        this.batch(decadeView(), (contentElement) => {
            this.decadeViewHeight = height(getBody(contentElement));
            this.centuryViewHeight = this.decadeViewHeight;
        });
        this.batch(horzDecadeView(), (contentElement) => {
            this.decadeViewWidth = width(getBody(contentElement));
            this.centuryViewWidth = this.decadeViewWidth;
        });
        this.batch(navigationList(), (contentElement) => {
            this.navigationItemHeight = height(contentElement.querySelector('li'));
        });
    }
    viewHeight(viewType) {
        return this.viewDimension(viewType, 'height');
    }
    viewWidth(viewType) {
        return this.viewDimension(viewType, 'width');
    }
    viewDimension(viewType, dimension) {
        const viewProp = dimension === 'height' ? 'ViewHeight' : 'ViewWidth';
        switch (viewType) {
            case CalendarViewEnum.month:
                return this[`month${viewProp}`];
            case CalendarViewEnum.year:
                return this[`year${viewProp}`];
            case CalendarViewEnum.decade:
                return this[`decade${viewProp}`];
            case CalendarViewEnum.century:
                return this[`century${viewProp}`];
            default:
                return 1;
        }
    }
    batch(contentElement, action) {
        if (!isPresent(this.hostContainer)) {
            return;
        }
        const hostClone = this.hostContainer.cloneNode();
        document.body.appendChild(hostClone);
        try {
            const appendedContent = hostClone.appendChild(contentElement);
            action(appendedContent);
        }
        catch (error) {
            throw error;
        }
        finally {
            document.body.removeChild(hostClone);
        }
    }
}
CalendarDOMService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
const update = (arr, idx, value) => ([
    ...arr.slice(0, idx + 1),
    ...(arr.slice(idx + 1).map(x => x + value))
]);
/**
 * @hidden
 */
class RowHeightService {
    constructor(total = 0, rowHeight, detailRowHeight) {
        this.total = total;
        this.rowHeight = rowHeight;
        this.detailRowHeight = detailRowHeight;
        this.offsets = [];
        this.heights = [];
        let agg = 0;
        for (let idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    height(rowIndex) {
        return this.heights[rowIndex];
    }
    expandDetail(rowIndex) {
        if (this.height(rowIndex) === this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight);
        }
    }
    collapseDetail(rowIndex) {
        if (this.height(rowIndex) > this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight * -1);
        }
    }
    index(position) {
        if (position < 0) {
            return undefined;
        }
        const result = this.offsets.reduce((prev, current, idx) => {
            if (prev !== undefined) {
                return prev;
            }
            else if (current === position) {
                return idx;
            }
            else if (current > position) {
                return idx - 1;
            }
            return undefined;
        }, undefined); // tslint:disable-line:align
        return result === undefined ? this.total - 1 : result;
    }
    offset(rowIndex) {
        return this.offsets[rowIndex];
    }
    totalHeight() {
        return this.heights.reduce((prev, curr) => prev + curr, 0);
    }
    updateRowHeight(rowIndex, value) {
        this.heights[rowIndex] += value;
        this.offsets = update(this.offsets, rowIndex, value);
    }
}

const normalize = x => Math.max(x, 0);
/**
 * @hidden
 */
class ScrollAction {
    constructor(offset) {
        this.offset = offset;
    }
}
/**
 * @hidden
 */
class PageAction {
    constructor(skip) {
        this.skip = skip;
    }
}
/**
 * @hidden
 */
class ScrollerService {
    constructor(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
        this.bottomOffset = 0;
        this.topOffset = 0;
    }
    create(rowHeightService, skip, take, total, topOffset = 0, bottomOffset = 0, direction = 'vertical') {
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take;
        this.take = take;
        this.total = total;
        this.lastScroll = 0;
        this.topOffset = topOffset;
        this.bottomOffset = bottomOffset;
        this.direction = direction;
        const subject = new ReplaySubject(2);
        const offsetBufferRows = this.rowsForHeight(topOffset);
        const skipWithOffset = normalize(skip - offsetBufferRows);
        subject.next(new ScrollAction(this.rowOffset(skipWithOffset)));
        if (offsetBufferRows) {
            subject.next(new PageAction(skipWithOffset));
        }
        this.subscription = Observable.create(observer => {
            this.unsubscribe();
            this.scrollSubscription = this.scrollObservable.subscribe(x => this.onScroll(x, observer));
        }).subscribe(x => subject.next(x));
        return subject;
    }
    destroy() {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    onScroll({ scrollLeft, scrollTop, offsetHeight, offsetWidth }, observer) {
        const scrollPosition = this.direction === 'vertical' ? scrollTop : scrollLeft;
        const offsetSize = this.direction === 'vertical' ? offsetHeight : offsetWidth;
        if (this.lastScroll === scrollPosition) {
            return;
        }
        const up = this.lastScroll >= scrollPosition;
        this.lastScroll = scrollPosition;
        const firstItemIndex = this.rowHeightService.index(normalize(scrollPosition - this.topOffset));
        const lastItemIndex = this.rowHeightService.index(normalize(scrollPosition + offsetSize - this.bottomOffset));
        if (!up && lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
            this.firstLoaded = firstItemIndex;
            observer.next(new ScrollAction(this.rowOffset(firstItemIndex)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
        if (up && firstItemIndex <= this.firstLoaded) {
            const nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = normalize(firstItemIndex - nonVisibleBuffer);
            observer.next(new ScrollAction(this.rowOffset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
    }
    rowOffset(index) {
        return this.rowHeightService.offset(index) + this.topOffset;
    }
    rowsForHeight(height) {
        return Math.ceil(height / this.rowHeightService.height(0));
    }
    unsubscribe() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = null;
        }
    }
}

/* tslint:disable:component-selector-name  component-selector-type */
/**
 * @hidden
 */
const SCROLLER_FACTORY_TOKEN = new InjectionToken('dateinputs-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
/**
 * @hidden
 */
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Backward"] = 0] = "Backward";
    ScrollDirection[ScrollDirection["Forward"] = 1] = "Forward";
})(ScrollDirection || (ScrollDirection = {}));
const FRAME_DURATION = 17;
const scrollModifiers = {
    [ScrollDirection.Forward]: (step) => value => value + step,
    [ScrollDirection.Backward]: (step) => value => value - step
};
const scrollNormalizers = {
    [ScrollDirection.Forward]: (end) => value => Math.min(value, end),
    [ScrollDirection.Backward]: (end) => value => Math.max(value, end)
};
const scrollValidators = {
    [ScrollDirection.Forward]: end => start => start < end,
    [ScrollDirection.Backward]: end => start => start > end
};
const differenceToScroll = (scrollTop, staticOffset, maxScrollDifference) => {
    return Math.min(Math.abs(staticOffset - scrollTop), maxScrollDifference);
};
/**
 * @hidden
 */
class VirtualizationComponent {
    constructor(scrollerFactory, container, renderer, zone) {
        this.container = container;
        this.renderer = renderer;
        this.zone = zone;
        this.direction = 'vertical';
        this.itemHeight = 1;
        this.itemWidth = 1;
        this.topOffset = 0;
        this.bottomOffset = 0;
        this.maxScrollDifference = 100;
        this.scrollOffsetSize = 0;
        this.scrollDuration = 150;
        this.activeIndexChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.scrollChange = new EventEmitter();
        this.resolvedPromise = Promise.resolve(null);
        this.dispatcher = new Subject();
        this.scroller = scrollerFactory(this.dispatcher);
    }
    get totalVertexLength() {
        const value = `${this.totalSize}px`;
        return this.direction === 'vertical' ? { height: value } : { width: value };
    }
    get containerOffsetSize() {
        return this.getContainerProperty(this.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth');
    }
    get containerScrollSize() {
        return this.getContainerProperty(this.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth');
    }
    get containerScrollPosition() {
        return this.getContainerProperty(this.direction === 'vertical' ? 'scrollTop' : 'scrollLeft');
    }
    get wrapperClasses() {
        return true;
    }
    get horizontalClass() {
        return this.direction === 'horizontal';
    }
    ngOnChanges(changes) {
        if (changes.direction || changes.take || changes.total) {
            this.initServices();
            this.totalSize = this.rowHeightService.totalHeight() + this.bottomOffset;
        }
    }
    ngOnInit() {
        if (!this.rowHeightService) {
            this.rowHeightService = this.createRowHeightService();
        }
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.containerScrollSubscription = this.scroll$()
                .pipe(map((event) => event.target))
                .subscribe(t => {
                this.dispatcher.next(t);
                this.emitActiveIndex();
            });
        });
    }
    ngOnDestroy() {
        if (this.containerScrollSubscription) {
            this.containerScrollSubscription.unsubscribe();
        }
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
    }
    getContainerProperty(propertyName) {
        return this.container.nativeElement[propertyName];
    }
    activeIndex() {
        return this.itemIndex(Math.ceil(this.containerScrollPosition)); //handle subpixeling
    }
    itemIndex(offset) {
        return this.rowHeightService.index(offset);
    }
    itemOffset(index) {
        return this.rowHeightService.offset(index);
    }
    isIndexVisible(index) {
        if (!this.rowHeightService) {
            return false;
        }
        const containerTop = this.containerScrollPosition;
        const containerBottom = containerTop + this.containerOffsetSize;
        const top = this.rowHeightService.offset(index);
        const bottom = top + this.rowHeightService.height(index);
        return top >= containerTop && bottom <= containerBottom;
    }
    isListScrolled(index) {
        return this.containerScrollPosition !== this.rowHeightService.offset(index);
    }
    scrollTo(value) {
        const scrollProperty = this.direction === "vertical" ? 'scrollTop' : 'scrollLeft';
        this.renderer.setProperty(this.container.nativeElement, scrollProperty, value);
    }
    scrollToIndex(index) {
        //XXX: scrolling with tick is required to prevent list jump in Chrome.
        //Original issue: focus first day in the month and press LEFT arrow.
        //Notice how the view jumps on every day change.
        //
        this.zone.runOutsideAngular(() => {
            this.resolvedPromise.then(() => {
                this.scrollTo(this.rowHeightService.offset(index));
            });
        });
    }
    scrollToBottom() {
        this.scrollTo(this.totalSize);
    }
    animateToIndex(index) {
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
        const indexOffset = this.rowHeightService.offset(index);
        const direction = this.getContainerScrollDirection(indexOffset);
        const { start, end } = this.scrollRange(indexOffset, direction);
        if (start === end) {
            return;
        }
        const step = this.scrollStep(start, end);
        const modifyScroll = scrollModifiers[direction](step);
        const normalizeScroll = scrollNormalizers[direction](end);
        const isScrollValid = scrollValidators[direction](modifyScroll(end));
        this.zone.runOutsideAngular(() => {
            this.animationSubscription =
                combineLatest(of(start), interval(0, animationFrameScheduler)).pipe(map(stream => stream[0]), scan(modifyScroll), takeWhile(isScrollValid), map(normalizeScroll)).subscribe((x) => this.scrollTo(x));
        });
    }
    scrollRange(indexOffset, direction) {
        const containerScroll = this.containerScrollPosition;
        if (parseInt(indexOffset, 10) === parseInt(containerScroll, 10)) {
            return { start: indexOffset, end: indexOffset };
        }
        const maxScroll = this.containerMaxScroll();
        const sign = direction === ScrollDirection.Backward ? 1 : -1;
        const difference = differenceToScroll(containerScroll, indexOffset, this.maxScrollDifference);
        const end = Math.min(indexOffset, maxScroll);
        const start = Math.min(Math.max(end + (sign * difference), 0), maxScroll);
        return { start, end };
    }
    scrollStep(start, end) {
        return Math.abs(end - start) / (this.scrollDuration / FRAME_DURATION);
    }
    scroll$() {
        return isDocumentAvailable() ? fromEvent(this.container.nativeElement, 'scroll') : EMPTY;
    }
    initServices() {
        this.rowHeightService = this.createRowHeightService();
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        this.scrollSubscription = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total, this.topOffset, this.scrollOffsetSize, this.direction)
            .subscribe((x) => {
            if (x instanceof PageAction) {
                this.pageChange.emit(x);
            }
            else {
                this.scrollChange.emit(x);
            }
        });
    }
    createRowHeightService() {
        const dimension = this.direction === 'vertical' ? this.itemHeight : this.itemWidth;
        return new RowHeightService(this.total, dimension, 0);
    }
    emitActiveIndex() {
        const index = this.rowHeightService.index(this.containerScrollPosition - this.topOffset);
        if (this.lastActiveIndex !== index) {
            this.lastActiveIndex = index;
            this.activeIndexChange.emit(index);
        }
    }
    containerMaxScroll() {
        return this.containerScrollSize - this.containerOffsetSize;
    }
    getContainerScrollDirection(indexOffset) {
        return indexOffset < this.containerScrollPosition ? ScrollDirection.Backward : ScrollDirection.Forward;
    }
}
VirtualizationComponent.decorators = [
    { type: Component, args: [{
                providers: [{
                        provide: SCROLLER_FACTORY_TOKEN,
                        useValue: DEFAULT_SCROLLER_FACTORY
                    }],
                selector: 'kendo-virtualization',
                template: `
    <ng-content></ng-content>
    <div
        class="k-scrollable-placeholder"
        [class.k-scrollable-horizontal-placeholder]="direction === 'horizontal'"
        [ngStyle]="totalVertexLength"
    ></div>
  `
            },] },
];
/** @nocollapse */
VirtualizationComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
VirtualizationComponent.propDecorators = {
    direction: [{ type: Input }],
    itemHeight: [{ type: Input }],
    itemWidth: [{ type: Input }],
    topOffset: [{ type: Input }],
    bottomOffset: [{ type: Input }],
    maxScrollDifference: [{ type: Input }],
    scrollOffsetSize: [{ type: Input }],
    scrollDuration: [{ type: Input }],
    skip: [{ type: Input }],
    take: [{ type: Input }],
    total: [{ type: Input }],
    activeIndexChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    scrollChange: [{ type: Output }],
    wrapperClasses: [{ type: HostBinding, args: ['class.k-content',] }, { type: HostBinding, args: ['class.k-scrollable',] }],
    horizontalClass: [{ type: HostBinding, args: ['class.k-scrollable-horizontal',] }]
};

/**
 * @hidden
 */
const closestInScope = (node, predicate, scope) => {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

/* tslint:disable:component-selector-name  component-selector-type */
const ITEMS_COUNT = 30;
/**
 * @hidden
 */
class NavigationComponent {
    constructor(bus, dom, intl, cdr, renderer) {
        this.bus = bus;
        this.dom = dom;
        this.intl = intl;
        this.cdr = cdr;
        this.renderer = renderer;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.focusedDate = new Date();
        this.valueChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.dates = [];
        this.take = ITEMS_COUNT;
        this.indexToScroll = -1;
    }
    get getComponentClass() {
        return true;
    }
    ngOnInit() {
        this.dom.ensureHeights();
        const calendarHeight = this.dom.calendarHeight;
        this.itemHeight = this.dom.navigationItemHeight;
        this.maxViewHeight = this.dom.monthViewHeight;
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        const viewDate = dateInRange(this.focusedDate, this.min, this.max);
        const total = this.service.total(this.min, this.max);
        const totalChanged = this.total && this.total !== total;
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        if (totalChanged || !this.service.isInArray(viewDate, this.dates)) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = this.service.skip(this.focusedDate, this.min);
        }
    }
    ngOnDestroy() {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    }
    ngAfterViewInit() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    }
    ngAfterViewChecked() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    }
    onPageChange({ skip }) {
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    }
    scrollChange({ offset }) {
        const el = this.list.nativeElement;
        const translate = `translateY(${offset}px)`;
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    }
    handleDateChange(args) {
        const item = closestInScope(args.target, node => node.hasAttribute('data-date-index'), this.list.nativeElement);
        if (item) {
            const index = parseInt(item.getAttribute('data-date-index'), 10);
            const candidate = this.dates[index];
            this.valueChange.emit(cloneDate(candidate));
        }
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.take);
    }
    intlChange() {
        if (this.activeView === CalendarViewEnum.month) {
            this.cdr.markForCheck();
        }
    }
}
NavigationComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-navigation',
                template: `
    <span class="k-calendar-navigation-highlight"></span>
    <kendo-virtualization
        [skip]="skip"
        [take]="take"
        [total]="total"
        [itemHeight]="itemHeight"
        [topOffset]="topOffset"
        [bottomOffset]="bottomOffset"
        [maxScrollDifference]="maxViewHeight"
        (pageChange)="onPageChange($event)"
        (scrollChange)="scrollChange($event)"
    >
        <ul #list class="k-reset" [kendoEventsOutsideAngular]="{ click: handleDateChange }" [scope]="this">
            <li *kFor="let date of dates; let index=index" [attr.data-date-index]="index">
                <span [class.k-calendar-navigation-marker]="service.isRangeStart(date)">
                    <ng-template [ngIf]="!templateRef">{{service.navigationTitle(date)}}</ng-template>
                    <ng-template
                        [ngIf]="templateRef"
                        [ngTemplateOutlet]="templateRef"
                        [ngTemplateOutletContext]="{ $implicit: service.navigationTitle(date), activeView: activeViewValue, date: date }"
                    ></ng-template>
                </span>
            </li>
        </ul>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
NavigationComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: CalendarDOMService },
    { type: IntlService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
NavigationComponent.propDecorators = {
    activeView: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    focusedDate: [{ type: Input }],
    templateRef: [{ type: Input }],
    valueChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    virtualization: [{ type: ViewChild, args: [VirtualizationComponent,] }],
    list: [{ type: ViewChild, args: ['list', { static: true },] }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-navigation",] }]
};

const VIEWS_COUNT = 5;
const isEqualMonthYear = (date1, date2) => (date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth());
/**
 * @hidden
 */
class ViewListComponent {
    constructor(bus, cdr, intl, dom, renderer) {
        this.bus = bus;
        this.cdr = cdr;
        this.intl = intl;
        this.dom = dom;
        this.renderer = renderer;
        this.isActive = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.activeDateChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.dates = [];
        this.cols = [];
        this.weekNames = [];
        this.take = VIEWS_COUNT;
        this.animateToIndex = true;
        this.indexToScroll = -1;
        this.minViewsToRender = 1;
    }
    get weekNumber() {
        return this.showWeekNumbers && this.isMonthView();
    }
    set weekNumber(showWeekNumbers) {
        this.showWeekNumbers = showWeekNumbers;
    }
    get getComponentClass() {
        return true;
    }
    get getComponentMonthClass() {
        return this.activeView === CalendarViewEnum.month;
    }
    get getComponentYearClass() {
        return this.activeView === CalendarViewEnum.year;
    }
    get getComponentDecadeClass() {
        return this.activeView === CalendarViewEnum.decade;
    }
    get getComponentCenturyClass() {
        return this.activeView === CalendarViewEnum.century;
    }
    ngOnInit() {
        this.weekNames = this.getWeekNames();
        this.bottomOffset = this.getBottomOffset();
        this.viewOffset = -1 * this.dom.headerHeight;
        this.viewHeight = this.dom.viewHeight(this.activeView);
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.cols = new Array(this.service.rowLength(this.weekNumber)).fill('');
        this.colWidth = Math.round(100 / this.cols.length);
        this.weekNames = hasChange(changes, 'weekNumber') && this.weekNumber ? this.getWeekNames() : this.weekNames;
        const activeViewChanged = hasChange(changes, 'activeView');
        const focusedDate = this.focusedDate;
        const viewDate = dateInRange(this.service.viewDate(focusedDate, this.max, this.minViewsToRender), this.min, this.max);
        const total = this.service.total(this.min, this.max);
        const totalChanged = this.total && this.total !== total;
        const generateDates = totalChanged || !this.service.isInArray(focusedDate, this.dates);
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        this.animateToIndex = !activeViewChanged;
        this.bottomOffset = this.getBottomOffset();
        this.viewHeight = this.dom.viewHeight(this.activeView);
        if (generateDates) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!isEqualMonthYear(this.activeDate, focusedDate)) {
            this.activeDate = cloneDate(focusedDate);
        }
        const updateIndex = hasChange(changes, 'focusedDate') || activeViewChanged;
        if (generateDates || updateIndex || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = this.service.skip(focusedDate, this.min);
        }
    }
    ngOnDestroy() {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    }
    ngAfterViewInit() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    }
    ngAfterViewChecked() {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization[this.animateToIndex ? 'animateToIndex' : 'scrollToIndex'](this.indexToScroll);
        this.animateToIndex = true;
        this.indexToScroll = -1;
    }
    onPageChange({ skip }) {
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    }
    scrollChange({ offset }) {
        const el = this.list.nativeElement;
        const translate = `translateY(${offset}px)`;
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    }
    setActiveDate(index) {
        const candidate = this.service.addToDate(this.min, index);
        if (isEqual(this.activeDate, candidate)) {
            return;
        }
        this.activeDate = candidate;
        this.activeDateChange.emit(candidate);
        this.cdr.detectChanges();
    }
    handleDateChange(candidate) {
        this.valueChange.emit(candidate);
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    isScrolled() {
        return this.virtualization.isListScrolled(this.service.skip(this.focusedDate, this.min));
    }
    getBottomOffset() {
        return this.getScrollableHeight() - this.dom.viewHeight(this.activeView);
    }
    getScrollableHeight() {
        return this.activeView === CalendarViewEnum.month ?
            this.dom.scrollableContentHeight :
            this.dom.scrollableYearContentHeight;
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.take);
    }
    getWeekNames() {
        const weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return this.weekNumber ? [''].concat(weekNames) : weekNames;
    }
    intlChange() {
        this.weekNames = this.getWeekNames();
        if (this.isMonthView()) {
            this.cdr.markForCheck();
        }
    }
}
ViewListComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-viewlist',
                template: `
    <kendo-calendar-header
        [currentDate]="activeDate"
        [min]="min"
        [max]="max"
        [activeView]="activeView"
        [templateRef]="headerTitleTemplateRef"
        (today)="handleDateChange($event)"
    >
    </kendo-calendar-header>
    <table class="k-calendar-weekdays" style="table-layout: auto;" *ngIf="isMonthView()">
        <thead>
            <tr>
                <th *ngFor="let name of weekNames" [style.width.%]="colWidth">{{name}}</th>
            </tr>
        </thead>
    </table>
    <kendo-virtualization
        [tabindex]="-1"
        [skip]="skip"
        [take]="take"
        [total]="total"
        [itemHeight]="viewHeight"
        [topOffset]="viewOffset"
        [bottomOffset]="bottomOffset"
        [scrollOffsetSize]="viewOffset"
        [maxScrollDifference]="viewHeight"
        (pageChange)="onPageChange($event)"
        (scrollChange)="scrollChange($event)"
        (activeIndexChange)="setActiveDate($event)"
        >
        <table #list>
            <colgroup><col *ngFor="let _ of cols" /></colgroup>

            <tbody *kFor="let date of dates"
                   kendoCalendarView
                   role="rowgroup"
                   [activeView]="activeView"
                   [isActive]="isActive"
                   [min]="min" [max]="max"
                   [cellUID]="cellUID"
                   [focusedDate]="focusedDate"
                   [selectedDate]="value"
                   [weekNumber]="weekNumber"
                   [templateRef]="cellTemplateRef"
                   [weekNumberTemplateRef]="weekNumberTemplateRef"
                   [viewDate]="date"
                   (change)="handleDateChange($event)"
            ></tbody>
        </table>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
ViewListComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef },
    { type: IntlService },
    { type: CalendarDOMService },
    { type: Renderer2 }
];
ViewListComponent.propDecorators = {
    cellTemplateRef: [{ type: Input }],
    weekNumberTemplateRef: [{ type: Input }],
    headerTitleTemplateRef: [{ type: Input }],
    activeView: [{ type: Input }],
    cellUID: [{ type: Input }],
    focusedDate: [{ type: Input }],
    isActive: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    value: [{ type: Input }],
    weekNumber: [{ type: Input }],
    activeDateChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    virtualization: [{ type: ViewChild, args: [VirtualizationComponent,] }],
    list: [{ type: ViewChild, args: ['list', { static: true },] }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-view",] }],
    getComponentMonthClass: [{ type: HostBinding, args: ["class.k-calendar-monthview",] }],
    getComponentYearClass: [{ type: HostBinding, args: ["class.k-calendar-yearview",] }],
    getComponentDecadeClass: [{ type: HostBinding, args: ["class.k-calendar-decadeview",] }],
    getComponentCenturyClass: [{ type: HostBinding, args: ["class.k-calendar-centuryview",] }]
};

const KEY_TO_ACTION = {
    '33': Action.PrevView,
    '34': Action.NextView,
    '35': Action.LastInView,
    '36': Action.FirstInView,
    '37': Action.Left,
    '38': Action.Up,
    '39': Action.Right,
    '40': Action.Down,
    'meta+38': Action.UpperView,
    'meta+40': Action.LowerView
};
/**
 * @hidden
 */
class NavigationService {
    constructor(bus) {
        this.bus = bus;
    }
    action(event) {
        const action = `${event.ctrlKey || event.metaKey ? 'meta+' : ''}${event.keyCode}`;
        return KEY_TO_ACTION[action];
    }
    move(value, action, activeView) {
        const service = this.bus.service(activeView);
        if (!service) {
            return value;
        }
        if (action === Action.UpperView && this.bus.canMoveUp(activeView)) {
            this.bus.moveUp(activeView);
            return value;
        }
        if (action === Action.LowerView && this.bus.canMoveDown(activeView)) {
            this.bus.moveDown(activeView);
            return value;
        }
        return service.move(value, action);
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: BusViewService }
];

const divideByMagnitude = (magnitude) => x => Math.floor(x / magnitude);
const powerByMagnitude = (magnitude) => x => x * magnitude;
/**
 * @hidden
 */
class ScrollSyncService {
    constructor(dom, zone) {
        this.dom = dom;
        this.zone = zone;
    }
    configure(activeView) {
        const magnitude = Math.max(this.dom.viewHeight(activeView) / this.dom.navigationItemHeight, 1);
        this.divideByMagnitude = divideByMagnitude(magnitude);
        this.powerByMagnitude = powerByMagnitude(magnitude);
    }
    sync(navigator, view) {
        this.unsubscribe();
        if (!navigator || !view) {
            return;
        }
        this.navigator = navigator;
        this.view = view;
        this.zone.runOutsideAngular(() => {
            let navScrolled, monthScrolled;
            this.navSubscription = navigator.scroll$()
                .subscribe((e) => {
                if (monthScrolled) {
                    monthScrolled = false;
                    return;
                }
                navScrolled = true;
                this.scrollSiblingOf(e.target);
            });
            this.viewSubscription = view.scroll$()
                .subscribe((e) => {
                if (navScrolled) {
                    navScrolled = false;
                    return;
                }
                monthScrolled = true;
                this.scrollSiblingOf(e.target);
            });
        });
    }
    scrollSiblingOf(scrolledElement) {
        const component = this.siblingComponent(scrolledElement);
        const scrollTop = this.calculateScroll(component, scrolledElement.scrollTop);
        component.scrollTo(scrollTop);
    }
    siblingComponent(scrollableElement) {
        return this.navigator.container.nativeElement === scrollableElement ? this.view : this.navigator;
    }
    calculateScroll(component, scrollTop) {
        const modifier = component === this.navigator ? this.divideByMagnitude : this.powerByMagnitude;
        return modifier(scrollTop);
    }
    destroy() {
        this.unsubscribe();
    }
    unsubscribe() {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }
    }
}
ScrollSyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = () => [
    { type: CalendarDOMService },
    { type: NgZone }
];

/**
 * Used for rendering the cell content of the Calendar. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoCalendarCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details
 * about the current cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * > `kendoCalendarCellTemplate` is equivalent to
 * > [`kendoCalendarMonthCellTemplate`]({% slug api_dateinputs_monthcelltemplatedirective %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarCellTemplate let-date>
 *      <span class="custom">{{date.getDate()}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class CellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarCellTemplate]'
            },] },
];
/** @nocollapse */
CellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the month cell content of the Calendar. To define the month cell template, nest an `<ng-template>` tag
 * with the `kendoCalendarMonthCellTemplate` directive inside the component tag. The template context is set to the current
 * component. To get a reference to the current date, use the `let-date` directive. To provide more details about the current
 * month cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarMonthCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class MonthCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MonthCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarMonthCellTemplate]'
            },] },
];
/** @nocollapse */
MonthCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the year cell content of the Calendar. To define the year cell template, nest an
 * `<ng-template>` tag with the `kendoCalendarYearCellTemplate` directive inside the component tag.
 * The template context is set to the current component. To get a reference to the current date, use
 * the `let-date` directive. To provide more details about the current year cell, get a reference to the
 * current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [activeView]="activeView">
 *    <ng-template kendoCalendarYearCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent {
 *  public activeView: CalendarView = 'year';
 * }
 * ```
 */
class YearCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
YearCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarYearCellTemplate]'
            },] },
];
/** @nocollapse */
YearCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the decade cell content of the Calendar. To define the decade cell template, nest an `<ng-template>`
 * tag with the `kendoCalendarDecadeCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details about
 * the current decade cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [activeView]="activeView">
 *    <ng-template kendoCalendarDecadeCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent {
 *  public activeView: CalendarView = 'decade';
 * }
 * ```
 */
class DecadeCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DecadeCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarDecadeCellTemplate]'
            },] },
];
/** @nocollapse */
DecadeCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the century cell content of the Calendar. To define the century cell template, nest an `<ng-template>`
 * tag with the `kendoCalendarCenturyCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details about
 * the current century cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [activeView]="activeView">
 *    <ng-template kendoCalendarCenturyCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent {
 *  public activeView: CalendarView = 'century';
 * }
 * ```
 */
class CenturyCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CenturyCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarCenturyCellTemplate]'
            },] },
];
/** @nocollapse */
CenturyCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the week number cell content in the month view of the Calendar. To define the month week number cell template,
 * nest an `<ng-template>` tag with the `kendoCalendarWeekNumberCellTemplate` directive inside the component tag. The template
 * context is set to the current component. To get a reference to the current date, use the `let-date` directive. To provide more
 * details about the current week number cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [weekNumber]="true">
 *    <ng-template kendoCalendarWeekNumberCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class WeekNumberCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
WeekNumberCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarWeekNumberCellTemplate]'
            },] },
];
/** @nocollapse */
WeekNumberCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the header title of the Calendar. To define the header title template, nest an `<ng-template>` tag
 * with the `kendoCalendarHeaderTitleTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current title, use the `let-title` directive. To provide more details about
 * the current title, get a reference to the current `date` by using the `let-date` directive or get a reference to the
 * current active view  by using the `let-activeView` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarHeaderTitleTemplate let-title>
 *      <span class="custom">{{title}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class HeaderTitleTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
HeaderTitleTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarHeaderTitleTemplate]'
            },] },
];
/** @nocollapse */
HeaderTitleTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Used for rendering the navigation item of the Calendar. To define the navigation item template, nest an `<ng-template>`
 * tag with the `kendoCalendarNavigationItemTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current item value, use the `let-title` directive. To provide more details
 * about the current title, get a reference to the current `date` by using the `let-date='date'` directive or get a reference
 * to the current active view by using the `let-activeView='activeView'` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarNavigationItemTemplate let-title>
 *      <span class="custom">{{title}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class NavigationItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NavigationItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCalendarNavigationItemTemplate]'
            },] },
];
/** @nocollapse */
NavigationItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @hidden
 */
class PickerService {
    constructor() {
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.sameDateSelected = new EventEmitter();
        this.dateCompletenessChange = new EventEmitter();
    }
}

/**
 * @hidden
 */
const minValidator = (minValue) => {
    return (control) => {
        const err = {
            minError: {
                minValue: minValue,
                value: control.value
            }
        };
        if (!minValue || !control.value) {
            return null;
        }
        return control.value < minValue ? err : null;
    };
};

/**
 * @hidden
 */
const maxValidator = (maxValue) => {
    return (control) => {
        const err = {
            maxError: {
                maxValue: maxValue,
                value: control.value
            }
        };
        if (!maxValue || !control.value) {
            return null;
        }
        return control.value > maxValue ? err : null;
    };
};

const noop$1 = () => false;
const DISABLED_DATES_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/disabled-dates/';
/**
 * @hidden
 */
class DisabledDatesService {
    constructor() {
        /**
         * Emits every time the `isDateDisabled` method changes.
         */
        this.changes = new Subject();
        /**
         * Based on the user-defined `disabledDates` input evaluates if the date is disabled.
         * If not set, returns `false`.
         */
        this.isDateDisabled = noop$1;
    }
    /**
     * Configures the `isDateDisabled` function.
     *
     * * If a function is provided, uses it as-is and passes each date to it for evaluation.
     * The time part is set to `midnight`.
     * * If a `Date[]` is provided, creates a function that checks the targeted date against
     * the listed dates and, if the targeted date is listed, marks it as disabled.
     * * If a `Day[]` is provided, creates a function that evaluates the provided days of the
     * week as disabled.
     */
    initialize(disabledDates) {
        if (typeof disabledDates === 'function') {
            this.isDateDisabled = (date) => disabledDates(getDate(date));
        }
        else if (isNumberArray(disabledDates)) {
            const disabledWeekDays = new Set(disabledDates);
            this.isDateDisabled = (date) => disabledWeekDays.has(date.getDay());
        }
        else if (isDateArray(disabledDates)) {
            const normalizedDisabledDates = new Set(disabledDates.map(date => getDate(date).getTime()));
            this.isDateDisabled = (date) => normalizedDisabledDates.has(getDate(date).getTime());
        }
        else {
            this.isDateDisabled = noop$1;
            this.notifyInvalidInput(disabledDates);
        }
        this.notifyServiceChange();
    }
    notifyInvalidInput(disabledDates) {
        if (isPresent(disabledDates) && isDevMode()) {
            throw new Error(`The 'disabledDates' value should be a function, a Day array or a Date array. Check ${DISABLED_DATES_DOC_LINK} for more information.`);
        }
    }
    notifyServiceChange() {
        this.changes.next();
    }
}
DisabledDatesService.decorators = [
    { type: Injectable },
];

/* tslint:disable:no-forward-ref */
const BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
const TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
const MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
const MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
const VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
const virtualizationProp = x => x ? x.virtualization : null;
/**
 * @hidden
 */
const CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
const CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
const KENDO_INPUT_PROVIDER = {
    provide: KendoInput,
    useExisting: forwardRef(() => CalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * Represents the [Kendo UI Calendar component for Angular]({% slug overview_calendar %}#toc-basic-usage).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-calendar></kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class CalendarComponent {
    constructor(bus, dom, element, navigator, renderer, cdr, ngZone, injector, scrollSyncService, disabledDatesService, pickerService) {
        this.bus = bus;
        this.dom = dom;
        this.element = element;
        this.navigator = navigator;
        this.renderer = renderer;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.injector = injector;
        this.scrollSyncService = scrollSyncService;
        this.disabledDatesService = disabledDatesService;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.id = guid();
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = false;
        /**
         * Sets or gets the `disabled` property of the Calendar and
         * determines whether the component is active
         * ([see example]({% slug disabled_calendar %})).
         */
        this.disabled = false;
        /**
         * Sets or gets the `tabindex` property of the Calendar. Based on the
         * [HTML `tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         */
        this.tabindex = 0;
        /**
         * Sets or gets the `navigation` property of the Calendar
         * and determines whether the navigation side-bar will be displayed
         * ([see example]({% slug sidebar_calendar %})).
         */
        this.navigation = true;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_calendar %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost view to which the user can navigate
         * ([see example]({% slug dates_calendar %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost view to which the user can navigate
         * ([see example]({% slug sidebar_calendar %}#toc-partial-dates)).
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Determines whether to display a week number column in the `month` view
         * ([see example]({% slug weeknumcolumn_calendar %})).
         */
        this.weekNumber = false;
        /**
         * Fires when the active view is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Fires when the active view date is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.activeViewDateChange = new EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_calendar %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        this.isActive = false;
        this.cellUID = guid();
        this._min = new Date(MIN_DATE);
        this._max = new Date(MAX_DATE);
        this._focusedDate = getToday();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.syncNavigation = true;
        this.domEvents = [];
        this.resolvedPromise = Promise.resolve(null);
        this.destroyed = false;
        this.setClasses(element.nativeElement);
        if (this.pickerService) {
            this.pickerService.calendar = this;
        }
    }
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_calendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    set focusedDate(focusedDate) {
        this._focusedDate = focusedDate || getToday();
        this.setAriaActivedescendant();
    }
    get focusedDate() {
        return this._focusedDate;
    }
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
     * By default, the `min` value is `1900-1-1`.
     */
    set min(min) {
        this._min = min || new Date(MIN_DATE);
    }
    get min() {
        return this._min;
    }
    /**
     * Sets or gets the `max` property of the Calendar and
     * defines the maximum allowed date value
     * ([see example]({% slug dateranges_calendar %})).
     * By default, the `max` value is `2099-12-31`.
     */
    set max(max) {
        this._max = max || new Date(MAX_DATE);
    }
    get max() {
        return this._max;
    }
    /**
     * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    get value() {
        return this._value;
    }
    set value(candidate) {
        this.verifyValue(candidate);
        this._value = cloneDate(candidate);
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the dates of the Calendar that will be disabled
     * ([see example]({% slug disabled_dates_calendar %})).
     */
    set disabledDates(value) {
        this.disabledDatesService.initialize(value);
    }
    /**
     * @hidden
     */
    set cellTemplateRef(template) {
        this.cellTemplate = template;
    }
    /**
     * @hidden
     */
    set monthCellTemplateRef(template) {
        this.monthCellTemplate = template;
    }
    /**
     * @hidden
     */
    set yearCellTemplateRef(template) {
        this.yearCellTemplate = template;
    }
    /**
     * @hidden
     */
    set decadeCellTemplateRef(template) {
        this.decadeCellTemplate = template;
    }
    /**
     * @hidden
     */
    set centuryCellTemplateRef(template) {
        this.centuryCellTemplate = template;
    }
    /**
     * @hidden
     */
    set weekNumberTemplateRef(template) {
        this.weekNumberTemplate = template;
    }
    /**
     * @hidden
     */
    set headerTitleTemplateRef(template) {
        this.headerTitleTemplate = template;
    }
    /**
     * @hidden
     */
    set navigationItemTemplateRef(template) {
        this.navigationItemTemplate = template;
    }
    get activeViewEnum() {
        const activeView = CalendarViewEnum[this.activeView];
        return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
    }
    get bottomViewEnum() {
        return CalendarViewEnum[this.bottomView];
    }
    get topViewEnum() {
        return CalendarViewEnum[this.topView];
    }
    get widgetId() {
        return this.id;
    }
    get widgetRole() {
        return 'grid';
    }
    get calendarTabIndex() {
        return this.disabled ? undefined : this.tabIndex;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    ngOnInit() {
        this.dom.calculateHeights(this.element.nativeElement);
        this.scrollSyncService.configure(this.activeViewEnum);
        this.viewChangeSubscription = this.bus.viewChanged.subscribe(({ view }) => {
            this.activeView = CalendarViewEnum[view];
            this.emitEvent(this.activeViewChange, this.activeView);
            this.scrollSyncService.configure(view);
            this.detectChanges(); // requires zone if templates
        });
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.ngZone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnChanges(changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        this.scrollSyncService.configure(this.activeViewEnum);
        const useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        const focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max || changes.rangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.onValidatorChange();
        }
    }
    ngAfterViewInit() {
        this.setAriaActivedescendant();
    }
    ngAfterViewChecked() {
        if (!this.syncNavigation) {
            return;
        }
        this.syncNavigation = false;
        this.scrollSyncService.sync(virtualizationProp(this.navigationView), virtualizationProp(this.monthView));
    }
    ngOnDestroy() {
        this.scrollSyncService.destroy();
        this.viewChangeSubscription.unsubscribe();
        this.domEvents.forEach(unbindCallback => unbindCallback());
        if (this.pickerService) {
            this.pickerService.calendar = null;
        }
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
        this.destroyed = true;
    }
    /**
     * @hidden
     */
    onResize() {
        this.focusedDate = new Date(this.focusedDate);
        this.cdr.detectChanges();
    }
    /**
     * Focuses the host element of the Calendar.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="calendar.focus()">Focus calendar</button>
     *  <kendo-calendar #calendar></kendo-calendar>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    }
    /**
     * Blurs the Calendar component.
     */
    blur() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    }
    /**
     * @hidden
     */
    containsElement(element) {
        return Boolean(closest(element, node => node === this.element.nativeElement));
    }
    /**
     * @hidden
     */
    handleNavigation(candidate) {
        if (this.disabled) {
            return;
        }
        const focusTarget = candidate ? new Date(cloneDate(candidate).setDate(1)) : this.focusedDate;
        this.focusedDate = dateInRange(focusTarget, this.min, this.max);
        this.detectChanges();
    }
    /**
     * @hidden
     */
    onPageChange() {
        if (!NgZone.isInAngularZone()) {
            if (this.pageChangeSubscription) {
                this.pageChangeSubscription.unsubscribe();
            }
            this.pageChangeSubscription = from(this.resolvedPromise)
                .subscribe(() => {
                this.detectChanges(); // requires zone if templates
            });
        }
    }
    /**
     * @hidden
     */
    handleDateChange(candidate) {
        const canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        const isSameDate = !canNavigateDown && isEqual(candidate, this.value);
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
        if (this.disabled) {
            return;
        }
        if (isSameDate) {
            this.emitSameDate();
            return;
        }
        if (canNavigateDown) {
            this.bus.moveDown(this.activeViewEnum);
            return;
        }
        if (!this.disabledDatesService.isDateDisabled(candidate)) {
            this.ngZone.run(() => {
                this.value = cloneDate(candidate);
                this.onControlChange(cloneDate(candidate));
                this.valueChange.emit(cloneDate(candidate));
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    writeValue(candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * @hidden
     */
    activeCellTemplate() {
        switch (this.activeViewEnum) {
            case CalendarViewEnum.month:
                return this.monthCellTemplate || this.cellTemplate;
            case CalendarViewEnum.year:
                return this.yearCellTemplate;
            case CalendarViewEnum.decade:
                return this.decadeCellTemplate;
            case CalendarViewEnum.century:
                return this.centuryCellTemplate;
            default:
                return null;
        }
    }
    /**
     * @hidden
     */
    emitEvent(emitter, args) {
        if (hasObservers(emitter)) {
            this.ngZone.run(() => {
                emitter.emit(args);
            });
        }
    }
    setClasses(element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
    }
    verifyChanges() {
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK} and ${MAX_DOC_LINK}.`);
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error(`The topView should be greater than bottomView. See ${BOTTOM_VIEW_DOC_LINK} and ${TOP_VIEW_DOC_LINK}.`);
        }
    }
    verifyValue(candidate) {
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK} for possible resolution.`);
        }
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'blur', this.handleBlur.bind(this)), this.renderer.listen(element, 'focus', this.handleFocus.bind(this)), this.renderer.listen(element, 'mousedown', preventDefault), this.renderer.listen(element, 'click', this.handleClick.bind(this)), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
    }
    emitBlur(args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    }
    emitFocus() {
        if (this.pickerService) {
            this.pickerService.onFocus.emit();
        }
    }
    handleBlur(args) {
        this.isActive = false;
        // the injector can get the NgControl instance of the parent component (for example, the DateTimePicker)
        // and enters the zone for no reason because the parent component is still untouched
        if (!this.pickerService && requiresZoneOnBlur(this.control)) {
            this.ngZone.run(() => {
                this.onControlTouched();
                this.emitBlur(args);
                this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
            this.detectChanges();
        }
    }
    handleFocus() {
        this.isActive = true;
        if (!NgZone.isInAngularZone()) {
            this.detectChanges();
        }
        this.emitFocus();
    }
    handleClick() {
        if (!this.isActive) {
            if (this.monthView.isScrolled()) {
                this.focusedDate = cloneDate(this.focusedDate); //XXX: forces change detect
                this.detectChanges();
            }
            this.focus();
        }
    }
    handleKeydown(args) {
        // reserve the alt + arrow key commands for the picker
        const arrowKeyPressed = [Keys.ArrowUp, Keys.ArrowRight, Keys.ArrowDown, Keys.ArrowLeft].indexOf(args.keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && args.altKey) {
            return;
        }
        const candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(args), this.activeViewEnum), this.min, this.max);
        if (!isEqual(this.focusedDate, candidate)) {
            this.focusedDate = candidate;
            this.detectChanges();
            args.preventDefault();
        }
        if (args.keyCode === Keys.Enter) {
            this.handleDateChange(this.focusedDate);
        }
    }
    detectChanges() {
        if (!this.destroyed) {
            this.cdr.detectChanges();
        }
    }
    emitSameDate() {
        if (this.pickerService) {
            this.pickerService.sameDateSelected.emit();
        }
    }
    setAriaActivedescendant() {
        if (!isPresent(this.element)) {
            return;
        }
        const focusedCellId = this.cellUID + this.focusedDate.getTime();
        this.renderer.setAttribute(this.element.nativeElement, 'aria-activedescendant', focusedCellId);
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-calendar',
                providers: [
                    BusViewService,
                    CALENDAR_VALUE_ACCESSOR,
                    CALENDAR_RANGE_VALIDATORS,
                    KENDO_INPUT_PROVIDER,
                    LocalizationService,
                    DisabledDatesService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.calendar'
                    },
                    NavigationService,
                    ScrollSyncService
                ],
                selector: 'kendo-calendar',
                template: `
    <ng-container kendoCalendarLocalizedMessages
        i18n-today="kendo.calendar.today|The label for the today button in the calendar header"
        today="TODAY"
    >
    </ng-container>
    <kendo-calendar-navigation
        *ngIf="navigation"
        [activeView]="activeViewEnum"
        [focusedDate]="focusedDate"
        [min]="min"
        [max]="max"
        [templateRef]="navigationItemTemplate?.templateRef"
        (valueChange)="handleNavigation($event)"
        (pageChange)="onPageChange()"
    >
    </kendo-calendar-navigation>
    <kendo-calendar-viewlist
        [activeView]="activeViewEnum"
        [isActive]="isActive"
        [cellTemplateRef]="activeCellTemplate()?.templateRef"
        [headerTitleTemplateRef]="headerTitleTemplate?.templateRef"
        [weekNumberTemplateRef]="weekNumberTemplate?.templateRef"
        [cellUID]="cellUID"
        [min]="min"
        [max]="max"
        [focusedDate]="focusedDate"
        [weekNumber]="weekNumber"
        [value]="value"
        (valueChange)="handleDateChange($event)"
        (activeDateChange)="emitEvent(activeViewDateChange, $event)"
        (pageChange)="onPageChange()"
    >
    </kendo-calendar-viewlist>
    <kendo-resize-sensor (resize)="onResize()"></kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: CalendarDOMService },
    { type: ElementRef },
    { type: NavigationService },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: Injector },
    { type: ScrollSyncService },
    { type: DisabledDatesService },
    { type: PickerService, decorators: [{ type: Optional }] }
];
CalendarComponent.propDecorators = {
    id: [{ type: Input }],
    focusedDate: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabledDates: [{ type: Input }],
    navigation: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    weekNumber: [{ type: Input }, { type: HostBinding, args: ['class.k-week-number',] }],
    activeViewChange: [{ type: Output }],
    activeViewDateChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective, { static: true },] }],
    cellTemplateRef: [{ type: Input, args: ['cellTemplate',] }],
    monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective, { static: true },] }],
    monthCellTemplateRef: [{ type: Input, args: ['monthCellTemplate',] }],
    yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective, { static: true },] }],
    yearCellTemplateRef: [{ type: Input, args: ['yearCellTemplate',] }],
    decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective, { static: true },] }],
    decadeCellTemplateRef: [{ type: Input, args: ['decadeCellTemplate',] }],
    centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective, { static: true },] }],
    centuryCellTemplateRef: [{ type: Input, args: ['centuryCellTemplate',] }],
    weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective, { static: true },] }],
    weekNumberTemplateRef: [{ type: Input, args: ['weekNumberTemplate',] }],
    headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective, { static: true },] }],
    headerTitleTemplateRef: [{ type: Input, args: ['headerTitleTemplate',] }],
    navigationItemTemplate: [{ type: ContentChild, args: [NavigationItemTemplateDirective, { static: true },] }],
    navigationItemTemplateRef: [{ type: Input, args: ['navigationItemTemplate',] }],
    navigationView: [{ type: ViewChild, args: [NavigationComponent,] }],
    monthView: [{ type: ViewChild, args: [ViewListComponent,] }],
    widgetId: [{ type: HostBinding, args: ['attr.id',] }],
    widgetRole: [{ type: HostBinding, args: ['attr.role',] }],
    calendarTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }]
};

/**
 * @hidden
 */
const incompleteDateValidator = () => {
    return (control, incomplete) => {
        if (!isPresent(control.value) && incomplete) {
            return { incompleteDate: true };
        }
        else {
            return null;
        }
    };
};

/**
 * @hidden
 */
var Arrow;
(function (Arrow) {
    Arrow[Arrow["Up"] = 0] = "Up";
    Arrow[Arrow["Down"] = 1] = "Down";
    Arrow[Arrow["None"] = 2] = "None";
})(Arrow || (Arrow = {}));

/* tslint:disable:max-line-length */
const MIN_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-min';
const MAX_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-max';
const VALUE_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/dateinput/#toc-using-with-json';
const DATE_PART_REGEXP = /year|month|<day>/;
const TIME_PART_REGEXP = /hour|minute|second|millisecond/;
const SHORT_PATTERN_LENGTH_REGEXP = /d|M|H|h|m|s/;
const padZero = (length) => new Array(Math.max(length, 0)).fill('0').join('');
const unpadZero = (value) => value.replace(/^0*/, '');
class Mask {
    constructor() {
        this.symbols = "";
    }
}
class KendoDate {
    constructor(intl, formatPlaceholder, format, value) {
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
            const sampleFormat = this.dateFormatString(this.value, this.format).symbols;
            for (let i = 0; i < sampleFormat.length; i++) {
                this.setExisting(sampleFormat[i], false);
            }
        }
        else {
            this.value = cloneDate(value);
        }
    }
    hasValue() {
        const pred = (a, p) => a || p.type !== 'literal' && p.type !== 'dayperiod' && this.getExisting(p.pattern[0]);
        return this.intl.splitDateFormat(this.format).reduce(pred, false);
    }
    getDateObject() {
        for (let i = 0; i < this.knownParts.length; i++) {
            if (!this.getExisting(this.knownParts[i])) {
                return null;
            }
        }
        return cloneDate(this.value);
    }
    getTextAndFormat() {
        return this.merge(this.intl.formatDate(this.value, this.format), this.dateFormatString(this.value, this.format));
    }
    getExisting(symbol) {
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
    }
    setExisting(symbol, value) {
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
    }
    modifyPart(symbol, offset) {
        let newValue = cloneDate(this.value);
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
    }
    parsePart(symbol, currentChar, resetSegmentValue) {
        if (!currentChar) {
            this.resetLeadingZero();
            this.setExisting(symbol, false);
            return { value: null, switchToNext: false };
        }
        let baseDate = this.intl.formatDate(this.value, this.format);
        let dateParts = this.dateFormatString(this.value, this.format);
        let baseFormat = dateParts.symbols;
        let replaced = false;
        let prefix = "";
        let current = "";
        let suffix = "";
        for (let i = 0; i < baseDate.length; i++) {
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
        let currentMaxLength = current.length - 3;
        let parsedDate = null;
        const month = this.matchMonth(currentChar);
        const dayPeriod = this.matchDayPeriod(currentChar, symbol);
        const isZeroCurrentChar = currentChar === '0';
        const leadingZero = (this.leadingZero || {})[symbol] || 0;
        if (isZeroCurrentChar) {
            let valueNumber = parseInt(resetSegmentValue ? currentChar : current + currentChar, 10);
            if (valueNumber === 0 && !this.isAbbrMonth(dateParts.partMap, symbol)) {
                this.incrementLeadingZero(symbol);
            }
        }
        else {
            this.resetLeadingZero();
        }
        for (let i = Math.max(0, currentMaxLength); i <= current.length; i++) {
            let middle = resetSegmentValue ? currentChar : (current.substring(i) + currentChar);
            let middleNumber = parseInt(middle, 10);
            parsedDate = this.intl.parseDate(prefix + middle + suffix, this.format);
            if (!parsedDate && !isNaN(middleNumber) && !isNaN(parseInt(currentChar, 10))) {
                if (symbol === 'M' && !month) {
                    const monthNumber = middleNumber - 1;
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
                const patternValue = this.partPattern(dateParts.partMap, symbol).pattern;
                const peekDate = this.intl.parseDate(`${prefix}${this.peek(middle, patternValue)}${suffix}`, this.format);
                const patternLength = this.patternLength(patternValue) || patternValue.length;
                const patternSatisfied = (leadingZero + (unpadZero(middle) || currentChar).length) >= patternLength;
                const switchToNext = peekDate === null || patternSatisfied;
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
    }
    resetLeadingZero() {
        const hasLeadingZero = this.leadingZero !== null;
        this.setLeadingZero(null);
        return hasLeadingZero;
    }
    setLeadingZero(leadingZero) {
        this.leadingZero = leadingZero;
    }
    incrementLeadingZero(symbol) {
        const leadingZero = this.leadingZero || {};
        leadingZero[symbol] = (leadingZero[symbol] || 0) + 1;
        this.leadingZero = leadingZero;
    }
    isAbbrMonth(parts, symbol) {
        const pattern = this.partPattern(parts, symbol);
        return pattern.type === 'month' && pattern.names;
    }
    partPattern(parts, symbol) {
        return parts.filter((part) => part.pattern.indexOf(symbol) !== -1)[0];
    }
    peek(value, pattern) {
        const peekValue = unpadZero(value) + '0';
        return padZero(pattern.length - peekValue.length) + peekValue;
    }
    matchMonth(typedChar) {
        this.typedMonthPart += typedChar.toLowerCase();
        if (!this.monthNames) {
            return "";
        }
        while (this.typedMonthPart.length > 0) {
            for (let i = 0; i < this.monthNames.length; i++) {
                if (this.monthNames[i].toLowerCase().indexOf(this.typedMonthPart) === 0) {
                    return this.monthNames[i];
                }
            }
            const monthAsNum = parseInt(this.typedMonthPart, 10);
            if (monthAsNum >= 1 && monthAsNum <= 12 && monthAsNum.toString() === this.typedMonthPart /*ensure they exact match*/) {
                return this.monthNames[monthAsNum - 1];
            }
            this.typedMonthPart = this.typedMonthPart.substring(1, this.typedMonthPart.length);
        }
        return "";
    }
    matchDayPeriod(typedChar, symbol) {
        const lowerChart = String(typedChar).toLowerCase();
        if (symbol === 'a' && this.dayPeriods) {
            if (this.dayPeriods.am.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.am;
            }
            else if (this.dayPeriods.pm.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.pm;
            }
        }
        return '';
    }
    allFormatedMonths() {
        const dateFormatParts = this.intl.splitDateFormat(this.format);
        for (let i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "month" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    }
    allDayPeriods() {
        const dateFormatParts = this.intl.splitDateFormat(this.format);
        for (let i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "dayperiod" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    }
    patternLength(pattern) {
        if (pattern[0] === 'y') {
            return 4;
        }
        if (SHORT_PATTERN_LENGTH_REGEXP.test(pattern)) {
            return 2;
        }
        return 0;
    }
    //TODO: REMOVE!
    dateFormatString(date, format) {
        const dateFormatParts = this.intl.splitDateFormat(format);
        const parts = [];
        const partMap = [];
        for (let i = 0; i < dateFormatParts.length; i++) {
            let partLength = this.intl.formatDate(date, { pattern: dateFormatParts[i].pattern }).length;
            while (partLength > 0) {
                parts.push(this.symbols[dateFormatParts[i].pattern[0]] || "_");
                partMap.push(dateFormatParts[i]);
                partLength--;
            }
        }
        const returnValue = new Mask();
        returnValue.symbols = parts.join("");
        returnValue.partMap = partMap;
        return returnValue;
    }
    merge(text, mask) {
        // Important: right to left.
        let resultText = "";
        let resultFormat = "";
        let format = mask.symbols;
        for (let r = format.length - 1; r >= 0; r--) {
            if (this.knownParts.indexOf(format[r]) === -1 || this.getExisting(format[r])) {
                resultText = text[r] + resultText;
                resultFormat = format[r] + resultFormat;
            }
            else {
                const currentSymbol = format[r];
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
    }
    dateFieldName(part) {
        const formatPlaceholder = this.formatPlaceholder || 'wide';
        if (formatPlaceholder[part.type]) {
            return formatPlaceholder[part.type];
        }
        if (formatPlaceholder === 'formatPattern') {
            return part.pattern;
        }
        return this.intl.dateFieldName(Object.assign(part, { nameType: formatPlaceholder }));
    }
}
/**
 * Represents the [Kendo UI DateInput component for Angular]({% slug overview_dateinput %}#toc-basic-usage).
 */
class DateInputComponent {
    constructor(cdr, intl, renderer, element, ngZone, injector, localization, pickerService) {
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
        this.focusableId = `k-${guid()}`;
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
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Specifies the value of the DateInput component.
     *
     * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    set value(value) {
        this.verifyValue(value);
        if (this.autoCorrect && !isInRange(value, this.min, this.max)) {
            return;
        }
        this._value = cloneDate(value);
        this.valueUpdate.emit(cloneDate(value));
    }
    get value() {
        return this._value;
    }
    get wrapperClass() {
        return true;
    }
    get disabledClass() {
        return this.disabled;
    }
    get inputElement() {
        return this.dateInput ? this.dateInput.nativeElement : null;
    }
    get inputValue() {
        return (this.inputElement || {}).value || '';
    }
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if (!this.wrap) {
            return;
        }
        if (!isPresent(this.pickerService)) {
            const element = this.wrap.nativeElement;
            if (value) {
                this.renderer.addClass(element, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(element, 'k-state-focused');
            }
        }
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty() {
        return !this.currentValue || !String(this.currentValue).trim();
    }
    /**
     * @hidden
     */
    containsElement(element) {
        return Boolean(closest(element, node => node === this.element.nativeElement));
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
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
        const isEqualToKendoDate = this.kendoDate && isEqual(this.value, this.kendoDate.getDateObject());
        if (changes.format || !isEqualToKendoDate || changes.placeholder) {
            this.kendoDate = this.getKendoDate(this.value);
            this.updateElementValue(this.isActive);
        }
    }
    ngOnDestroy() {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.input = null;
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidator(control) || this.maxValidator(control) || this.incompleteValidator(control, this.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue();
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.ngControl = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.ngZone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    //ngModel binding
    /**
     * @hidden
     */
    writeValue(value) {
        this.verifyValue(value);
        this.kendoDate = this.getKendoDate(value);
        this.value = cloneDate(value);
        this.updateElementValue(this.isActive);
    }
    /**
     * @hidden
     */
    triggerChange() {
        const value = this.kendoDate.getDateObject();
        if (+value !== +this.value) {
            this.value = cloneDate(value);
            this.notify();
        }
    }
    /**
     * @hidden
     */
    notify() {
        this.ngZone.run(() => {
            this.onControlChange(cloneDate(this.value));
            this.valueChange.emit(cloneDate(this.value));
        });
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
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
    focus() {
        const input = this.inputElement;
        if (input) {
            input.focus();
            this.selectDateSegment(this.currentFormat[0]);
        }
    }
    /**
     * Blurs the DateInput component.
     */
    blur() {
        const input = this.inputElement;
        if (input) {
            input.blur();
        }
    }
    /**
     * @hidden
     */
    handleButtonClick(offset) {
        this.arrowDirection = Arrow.None;
        this.modifyDateSegmentValue(offset);
    }
    /**
     * @hidden
     */
    modifyDateSegmentValue(offset) {
        const caret = this.caret();
        const symbol = this.currentFormat[caret[0]];
        const step = (this.steps || {})[this.symbolsMap[symbol]] || 1;
        this.kendoDate.modifyPart(symbol, offset * step);
        this.putDateInRange();
        this.updateElementValue(this.isActive);
        this.triggerChange();
        this.selectDateSegment(symbol);
        this.updateIncompleteValidationStatus();
    }
    /**
     * @hidden
     */
    switchDateSegment(offset) {
        const caret = this.caret();
        if (this.kendoDate.resetLeadingZero()) {
            this.updateElementValue(this.isActive);
        }
        if (caret[0] < caret[1] && this.currentFormat[caret[0]] !== this.currentFormat[caret[1] - 1]) {
            this.selectNearestSegment(offset > 0 ? caret[0] : caret[1] - 1);
            this.resetSegmentValue = true;
            return true;
        }
        const previousFormatSymbol = this.currentFormat[caret[0]];
        let a = caret[0] + offset;
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
        let b = a;
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
    }
    /**
     * @hidden
     */
    selectDateSegment(symbol) {
        let begin = -1;
        let end = 0;
        for (let i = 0; i < this.currentFormat.length; i++) {
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
    }
    /**
     * @hidden
     */
    handleClick() {
        this.hasMousedown = false;
        if (this.isActive) {
            const selectionPresent = this.inputElement.selectionStart !== this.inputElement.selectionEnd;
            const placeholderToggled = isPresent(this.placeholder) && !this.kendoDate.hasValue() && !this.focusedPriorToMousedown;
            // focus first segment if the user hasn't selected something during mousedown and if the placeholder was just toggled
            const selectFirstSegment = !selectionPresent && placeholderToggled;
            const index = selectFirstSegment ? 0 : this.caret()[0];
            this.selectNearestSegment(index);
        }
    }
    /**
     * @hidden
     */
    handleDragAndDrop(args) {
        args.preventDefault();
    }
    /**
     * @hidden
     */
    handleMousedown() {
        this.hasMousedown = true;
        this.focusedPriorToMousedown = this.isActive;
    }
    /**
     * @hidden
     */
    handleFocus(args) {
        this.isActive = true;
        this.updateElementValue();
        if (!this.hasMousedown) {
            this.caret(0, this.inputValue.length);
        }
        this.hasMousedown = false;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(() => {
                this.emitFocus(args);
            });
        }
        else {
            this.emitFocus(args);
        }
    }
    /**
     * @hidden
     */
    handleBlur(args) {
        this.isActive = false;
        this.resetSegmentValue = true;
        this.kendoDate.resetLeadingZero();
        this.updateElementValue();
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.ngControl)) {
            this.ngZone.run(() => {
                this.onControlTouched();
                this.emitBlur(args);
                this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
        }
    }
    getKendoDate(value) {
        const { leadingZero } = (this.kendoDate || {}) || null;
        const kendoDate = new KendoDate(this.intl, this.formatPlaceholder, this.format, value);
        kendoDate.setLeadingZero(this.isActive ? leadingZero : null);
        return kendoDate;
    }
    dateSymbolMap() {
        const reducer = (map$$1, part) => {
            map$$1[part.pattern[0]] = part.type;
            return map$$1;
        };
        return this.intl.splitDateFormat(this.format).reduce(reducer, {});
    }
    updateElementValue(isActive) {
        const start = this.caret()[0]; //XXX: get caret position before input is updated
        const texts = this.kendoDate.getTextAndFormat();
        const showPlaceholder = !this.isActive && isPresent(this.placeholder) && !this.kendoDate.hasValue();
        const input = this.inputElement;
        this.currentFormat = texts[1];
        this.currentValue = !showPlaceholder ? texts[0] : '';
        this.renderer.setProperty(input, "value", this.currentValue);
        if (input.placeholder !== this.placeholder) {
            this.renderer.setProperty(input, "placeholder", this.placeholder);
        }
        if (isActive) {
            this.selectNearestSegment(start);
        }
    }
    caret(start, end = start) {
        const isPosition = start !== undefined;
        let returnValue = [start, start];
        const element = this.inputElement;
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
    }
    selectNearestSegment(index) {
        // Finds the nearest (in both directions) known part.
        for (let i = index, j = index - 1; i < this.currentFormat.length || j >= 0; i++, j--) {
            if (i < this.currentFormat.length && this.currentFormat[i] !== "_") {
                this.selectDateSegment(this.currentFormat[i]);
                return;
            }
            if (j >= 0 && this.currentFormat[j] !== "_") {
                this.selectDateSegment(this.currentFormat[j]);
                return;
            }
        }
    }
    verifyRange() {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK$1} and ${MAX_DOC_LINK$1}.`);
        }
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK$1} for possible resolution.`);
        }
    }
    putDateInRange() {
        const currentDate = this.kendoDate.getDateObject();
        const candidate = dateInRange(currentDate, this.min, this.max);
        if (this.autoCorrect && !isEqual(currentDate, candidate)) {
            this.kendoDate = this.getKendoDate(candidate);
        }
    }
    updateFormatSections() {
        this.formatSections = this.intl.splitDateFormat(this.format)
            .reduce(({ date, time }, p) => {
            return {
                date: date || DATE_PART_REGEXP.test(p.type),
                time: time || TIME_PART_REGEXP.test(p.type)
            };
        }, { date: false, time: false });
    }
    intlChange() {
        this.updateFormatSections();
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue(this.isActive);
    }
    updateOnPaste() {
        const value = this.intl.parseDate(this.inputValue, this.format) || this.value;
        const notify = +value !== +this.value;
        this.writeValue(value);
        if (notify) {
            this.notify();
        }
    }
    bindEvents() {
        const element = this.element.nativeElement;
        const mousewheelHandler = this.handleMouseWheel.bind(this);
        this.domEvents.push(this.renderer.listen(element, 'DOMMouseScroll', mousewheelHandler), this.renderer.listen(element, 'mousewheel', mousewheelHandler), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)), this.renderer.listen(element, 'paste', this.handlePaste.bind(this)), this.renderer.listen(element, 'input', this.handleInput.bind(this)));
    }
    handleMouseWheel(event) {
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
    }
    handlePaste() {
        this.paste = true;
    }
    handleKeydown(event) {
        if (this.disabled || this.readonly || event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }
        if (event.keyCode === Keys.Tab) {
            const moved = this.switchDateSegment(event.shiftKey ? -1 : 1);
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
    }
    handleInput() {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.paste) {
            this.updateOnPaste();
            this.paste = false;
            return;
        }
        const diff = approximateStringMatching(this.currentValue, this.currentFormat, this.inputValue, this.caret()[0]);
        const navigationOnly = (diff.length === 1 && diff[0][1] === "_");
        let switchPart = false;
        if (!navigationOnly) {
            let parsedPart;
            for (let i = 0; i < diff.length; i++) {
                parsedPart = this.kendoDate.parsePart(diff[i][0], diff[i][1], this.resetSegmentValue);
                switchPart = parsedPart.switchToNext;
            }
            const candidate = this.kendoDate.getDateObject();
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
    }
    emitFocus(args) {
        this.onFocus.emit();
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    }
    emitBlur(args) {
        this.onBlur.emit();
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    }
    updateIncompleteValidationStatus() {
        const previousValue = this.isDateIncomplete;
        this.isDateIncomplete = this.kendoDate.hasValue() && this.value === null;
        if (previousValue === this.isDateIncomplete || !this.incompleteDateValidation) {
            return;
        }
        if (isPresent(this.ngControl) && !isPresent(this.pickerService)) {
            this.cdr.markForCheck();
            this.ngZone.run(() => this.onValidatorChange());
        }
        else if (isPresent(this.pickerService)) {
            this.pickerService.dateCompletenessChange.emit();
        }
    }
}
DateInputComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-dateinput',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateInputComponent), multi: true },
                    { provide: L10N_PREFIX, useValue: 'kendo.dateinput' },
                    { provide: KendoInput, useExisting: forwardRef(() => DateInputComponent) },
                    LocalizationService
                ],
                selector: 'kendo-dateinput',
                template: `
    <ng-container kendoDateInputLocalizedMessages
        i18n-increment="kendo.dateinput.increment|The label for the **Increment** button in the DateInput"
        increment="Increase value"

        i18n-decrement="kendo.dateinput.decrement|The label for the **Decrement** button in the DateInput"
        decrement="Decrease value"
    >
    </ng-container>
    <span class="k-dateinput-wrap" #wrap>
        <input
            #dateInput
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="k-input"
            [attr.role]="role"
            [attr.aria-readonly]="ariaReadOnly"
            [id]="focusableId"
            [title]="title"
            [tabindex]="tabindex"
            [disabled]="disabled"
            [readonly]="readonly"
            [placeholder]="placeholder"
            [attr.aria-expanded]="isPopupOpen"
            [attr.aria-haspopup]="hasPopup"
            [kendoEventsOutsideAngular]="{
                click: handleClick,
                focus: handleFocus,
                mousedown: handleMousedown,
                touchstart: handleMousedown,
                dragstart: handleDragAndDrop,
                drop: handleDragAndDrop,
                blur: handleBlur
            }"
            [scope]="this"
            />
        <span *ngIf="spinners" class="k-select" (mousedown)="$event.preventDefault()">
            <span
                class="k-link k-link-increase"
                [class.k-state-active]="arrowDirection === arrow.Up"
                (mousedown)="arrowDirection = arrow.Up"
                (mouseleave)="arrowDirection = arrow.None"
                (click)="handleButtonClick(1)"
                [title]="localization.get('increment')"
                [attr.aria-label]="localization.get('increment')">
                <span class="k-icon k-i-arrow-n"></span>
            </span>
            <span
                class="k-link k-link-decrease"
                (click)="handleButtonClick(-1)"
                [class.k-state-active]="arrowDirection === arrow.Down"
                (mousedown)="arrowDirection = arrow.Down"
                (mouseleave)="arrowDirection = arrow.None"
                [title]="localization.get('decrement')"
                [attr.aria-label]="localization.get('decrement')">
                <span class="k-icon k-i-arrow-s"></span>
            </span>
        </span>
    </span>
  `
            },] },
];
/** @nocollapse */
DateInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: IntlService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: Injector },
    { type: LocalizationService },
    { type: PickerService, decorators: [{ type: Optional }] }
];
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

/**
 * A preventable event instance which is triggered by the `open` and `close` events.
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * @hidden
 */
const TOUCH_ENABLED = new InjectionToken('dateinputs-touch-enabled');

/**
 * @hidden
 */
const disabledDatesValidator = (isDateDisabled) => {
    return (control) => {
        if (!isDateDisabled || !control.value) {
            return null;
        }
        const error = {
            disabledDate: true
        };
        return isDateDisabled(control.value) ? error : null;
    };
};

/* tslint:disable:max-line-length */
const MIN_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
const MAX_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
const VALUE_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/#toc-using-with-json';
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
class DatePickerComponent {
    constructor(zone, localization, cdr, popupService, element, renderer, injector, pickerService, disabledDatesService, touchEnabled$$1) {
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.disabledDatesService = disabledDatesService;
        this.touchEnabled = touchEnabled$$1;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_datepicker %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost Calendar view to which the user can navigate
         * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Sets or gets the `disabled` property of the DatePicker and determines whether the component is active
         * ([see example]({% slug disabled_datepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the DatePicker
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-datepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the DatePicker input field
         * ([see example]({% slug readonly_datepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_datepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Sets or gets the `navigation` property of the Calendar
         * and determines whether the navigation side-bar is displayed.
         * ([see example]({% slug sidebar_datepicker %})).
         */
        this.navigation = true;
        /**
         * Specifies the smallest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         */
        this.min = cloneDate(MIN_DATE);
        /**
         * Specifies the biggest valid date
         * ([see example]({% slug dateranges_datepicker %})).
         */
        this.max = cloneDate(MAX_DATE);
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Specifies the focused date of the Calendar component
         * ([see example]({% slug dates_datepicker %})).
         */
        this.focusedDate = null;
        /**
         * Specifies the date format that is used to display the input value
         * ([see example]({% slug formats_datepicker %})).
         */
        this.format = "d";
        /**
         * Specifies the hint the DatePicker displays when its value is `null`.
         * ([more information and exaples]({% slug placeholders_datepicker %})).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker placeholder="Enter birth date..."></kendo-datepicker>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Sets or gets the `tabindex` property of the DatePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the DatePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = true;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_datepicker %}#toc-validation)).
         */
        this.disabledDatesValidation = true;
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar
         * ([see example]({% slug weeknumcolumn_datepicker %})).
         */
        this.weekNumber = false;
        /**
         * Fires each time the user selects a new value
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the input element
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (focus)="handleFocus()"></kendo-datepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the input element gets blurred
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-datepicker (blur)="handleBlur()"></kendo-datepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open
         * ([more information and example]({% slug overview_datepicker %}#toc-events)).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = guid();
        this._popupSettings = { animate: true };
        this._show = false;
        this._value = null;
        this._active = false;
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesValidateFn = noop;
        this.incompleteValidator = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.domEvents = [];
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleSameSelection.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * @hidden
     */
    set cellTemplateRef(template) {
        this.cellTemplate = template;
    }
    /**
     * @hidden
     */
    set monthCellTemplateRef(template) {
        this.monthCellTemplate = template;
    }
    /**
     * @hidden
     */
    set yearCellTemplateRef(template) {
        this.yearCellTemplate = template;
    }
    /**
     * @hidden
     */
    set decadeCellTemplateRef(template) {
        this.decadeCellTemplate = template;
    }
    /**
     * @hidden
     */
    set centuryCellTemplateRef(template) {
        this.centuryCellTemplate = template;
    }
    /**
     * @hidden
     */
    set weekNumberTemplateRef(template) {
        this.weekNumberTemplate = template;
    }
    /**
     * @hidden
     */
    set headerTitleTemplateRef(template) {
        this.headerTitleTemplate = template;
    }
    /**
     * @hidden
     */
    set navigationItemTemplateRef(template) {
        this.navigationItemTemplate = template;
    }
    /**
     * Configures the popup options of the DatePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, { animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Specifies the value of the DatePicker component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
    }
    get value() {
        return this._value;
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the dates of the DatePicker that will be disabled
     * ([see example]({% slug disabled_dates_datepicker %})).
     */
    set disabledDates(value) {
        this._disabledDates = value;
        this.disabledDatesService.initialize(value);
    }
    get disabledDates() {
        return this._disabledDates;
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    /**
     * @hidden
     */
    get inputRole() {
        return this.readOnlyInput ? 'listbox' : 'spinbutton';
    }
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if (!this.wrapper) {
            return;
        }
        const element = this.wrapper.nativeElement;
        if (value) {
            this.renderer.addClass(element, 'k-state-focused');
        }
        else {
            this.renderer.removeClass(element, 'k-state-focused');
        }
    }
    get show() {
        return this._show;
    }
    set show(show) {
        if (show && (this.disabled || this.readonly)) {
            return;
        }
        const skipZone = !show && (!this._show || !hasObservers(this.close));
        if (!skipZone) {
            this.zone.run(() => {
                this.togglePopup(show);
            });
        }
        else {
            this.togglePopup(show);
        }
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(() => this.cdr.markForCheck());
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        this.verifySettings();
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
        this.pickerSubscriptions.unsubscribe();
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * Focuses the DatePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="datepicker.focus()">Focus date picker</button>
     *  <kendo-datepicker #datepicker></kendo-datepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the DatePicker component.
     */
    blur() {
        (this.calendar || this.input)['blur'](); //tslint:disable-line:no-string-literal
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicitly call the handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    handleMousedown(args) {
        args.preventDefault();
    }
    /**
     * @hidden
     */
    handleChange(value) {
        this.cdr.markForCheck();
        this.focusInput();
        this.value = value;
        this.show = false;
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        this.handleChange(this.input.formatSections.time ? value : this.mergeTime(value));
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-calendar-container',
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
    }
    /**
     * @hidden
     */
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    get input() {
        return this.pickerService.input;
    }
    get calendar() {
        return this.pickerService.calendar;
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(value, this.value) : value;
    }
    /**
     * @hidden
     */
    handleKeydown(e) {
        const { altKey, keyCode } = e;
        if (keyCode === Keys.Escape) {
            this.show = false;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowDown && !this.show) {
                this.show = true;
            }
            if (keyCode === Keys.ArrowUp) {
                this.show = false;
            }
        }
        if (keyCode === Keys.Tab && this.show && this.calendar.isActive) {
            this.input.focus();
            this.show = false;
        }
    }
    togglePopup(show) {
        const event = new PreventableEvent();
        if (!this._show && show) {
            this.open.emit(event);
        }
        else if (this._show && !show) {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
        this.toggleFocus();
    }
    _toggle(show) {
        if (show === this._show) {
            return;
        }
        this._show = show;
        if (show) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                animate: this.popupSettings.animate,
                appendTo: this.appendTo,
                content: this.popupTemplate,
                popupAlign: { vertical: 'top', horizontal: direction },
                popupClass: this.popupClasses,
                positionMode: 'absolute'
            });
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.subscription = this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.subscription.unsubscribe();
        }
    }
    focusInput() {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    }
    toggleFocus() {
        if (!this.isActive) {
            return;
        }
        if (this.show) {
            if (!this.calendar) {
                this.cdr.detectChanges();
            }
            if (this.calendar) {
                this.calendar.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    verifySettings() {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK$2} and ${MAX_DOC_LINK$2}.`);
        }
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK$2} for possible resolution.`);
        }
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    }
    handleFocus() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    }
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.calendar && this.calendar.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.blurComponent();
                this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    }
    blurComponent() {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.cdr.detectChanges();
        this.onControlTouched();
        this.onBlur.emit();
    }
    handleSameSelection() {
        if (this.show) {
            this.focusInput();
            this.show = false;
        }
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.zone.run(() => this.onValidatorChange());
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-datepicker',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true },
                    { provide: KendoInput, useExisting: forwardRef(() => DatePickerComponent) },
                    LocalizationService,
                    PickerService,
                    DisabledDatesService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.datepicker'
                    }
                ],
                selector: 'kendo-datepicker',
                template: `
        <ng-container kendoDatePickerLocalizedMessages
            i18n-today="kendo.datepicker.today|The label for the today button in the calendar header"
            today="TODAY"

            i18n-toggle="kendo.datepicker.toggle|The label for the toggle button in the datepicker component"
            toggle="Toggle calendar"
        >
        </ng-container>
        <span #wrapper
            class="k-picker-wrap"
            [class.k-state-disabled]="disabled"
        >
            <kendo-dateinput
                #input
                [role]="inputRole"
                [focusableId]="focusableId"
                [hasPopup]="true"
                [isPopupOpen]="show"
                [disabled]="disabled"
                [readonly]="readonly || readOnlyInput"
                [ariaReadOnly]="readonly"
                [tabindex]="tabindex"
                [title]="title"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [min]="min"
                [max]="max"
                [incompleteDateValidation]="incompleteDateValidation"
                [value]="value"
                (valueChange)="handleInputChange($event)"
            ></kendo-dateinput>
            <span class="k-select"
                role="button"
                [attr.title]="localization.get('toggle')"
                [attr.aria-label]="localization.get('toggle')"
                [kendoEventsOutsideAngular]="{
                    click: handleIconClick,
                    mousedown: handleMousedown
                }"
                [scope]="this"
            >
                <span class="k-icon k-i-calendar"></span>
            </span>
        </span>
        <ng-container #container></ng-container>
        <ng-template #popupTemplate>
            <kendo-calendar
                #calendar
                [min]="min"
                [max]="max"
                [navigation]="navigation"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
                [cellTemplate]="cellTemplate"
                [monthCellTemplate]="monthCellTemplate"
                [yearCellTemplate]="yearCellTemplate"
                [decadeCellTemplate]="decadeCellTemplate"
                [centuryCellTemplate]="centuryCellTemplate"
                [weekNumberTemplate]="weekNumberTemplate"
                [headerTitleTemplate]="headerTitleTemplate"
                [navigationItemTemplate]="navigationItemTemplate"
                [focusedDate]="focusedDate"
                [value]="value"
                (valueChange)="handleChange(mergeTime($event))"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeydown
                }"
                [scope]="this"
                [disabledDates]="disabledDates"
            >
                <kendo-calendar-messages [today]="localization.get('today')">
                </kendo-calendar-messages>
            </kendo-calendar>
        <ng-template>
    `
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PopupService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: PickerService },
    { type: DisabledDatesService },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
DatePickerComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    cellTemplateRef: [{ type: Input, args: ['cellTemplate',] }],
    monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective,] }],
    monthCellTemplateRef: [{ type: Input, args: ['monthCellTemplate',] }],
    yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective,] }],
    yearCellTemplateRef: [{ type: Input, args: ['yearCellTemplate',] }],
    decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective,] }],
    decadeCellTemplateRef: [{ type: Input, args: ['decadeCellTemplate',] }],
    centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective,] }],
    centuryCellTemplateRef: [{ type: Input, args: ['centuryCellTemplate',] }],
    weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective,] }],
    weekNumberTemplateRef: [{ type: Input, args: ['weekNumberTemplate',] }],
    headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective,] }],
    headerTitleTemplateRef: [{ type: Input, args: ['headerTitleTemplate',] }],
    navigationItemTemplate: [{ type: ContentChild, args: [NavigationItemTemplateDirective,] }],
    navigationItemTemplateRef: [{ type: Input, args: ['navigationItemTemplate',] }],
    focusableId: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    readOnlyInput: [{ type: Input }],
    popupSettings: [{ type: Input }],
    navigation: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    incompleteDateValidation: [{ type: Input }],
    focusedDate: [{ type: Input }],
    value: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabledDates: [{ type: Input }],
    title: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    disabledDatesValidation: [{ type: Input }],
    weekNumber: [{ type: Input }],
    valueChange: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    wrapperClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-datepicker',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
};

/**
 * @hidden
 */
const TIME_PART = {
    dayperiod: 'dayperiod',
    hour: 'hour',
    millisecond: 'millisecond',
    minute: 'minute',
    second: 'second'
};

/**
 * @hidden
 */
const timeRangeValidator = (min, max) => {
    return (control) => {
        if (!min || !max || !control.value) {
            return null;
        }
        const err = {
            timeRangeError: {
                maxValue: max,
                minValue: min,
                value: control.value
            }
        };
        return isInTimeRange(control.value, min, max) ? null : err;
    };
};

const VALUE_DOC_LINK$3 = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/#toc-integration-with-json';
const INTL_DATE_FORMAT = 'https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md';
const formatRegExp = new RegExp(`${TIME_PART.hour}|${TIME_PART.minute}|${TIME_PART.second}|${TIME_PART.dayperiod}|literal`);
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
class TimePickerComponent {
    constructor(zone, localization, cdr, popupService, element, renderer, injector, pickerService, intl, touchEnabled$$1) {
        this.zone = zone;
        this.localization = localization;
        this.cdr = cdr;
        this.popupService = popupService;
        this.element = element;
        this.renderer = renderer;
        this.injector = injector;
        this.pickerService = pickerService;
        this.intl = intl;
        this.touchEnabled = touchEnabled$$1;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Sets or gets the `disabled` property of the TimePicker and
         * determines whether the component is active
         * ([see example]({% slug disabled_timepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the TimePicker
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-timepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the TimePicker input field
         * ([see example]({% slug readonly_timepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_timepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Specifies the time format that is used to display the input value
         * ([see example]({% slug formats_timepicker %})).
         */
        this.format = 't';
        /**
         * Specifies the hint the TimePicker displays when its value is `null`.
         * For more information, refer to the article on
         * [placeholders]({% slug placeholders_timepicker %}).
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker placeholder="Enter start..."></kendo-timepicker>
         * `
         * })
         * export class AppComponent { }
         * ```
         */
        this.placeholder = null;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `tabindex` property of the TimePicker.
         */
        this.tabindex = 0;
        /**
         * Sets the title of the input element of the TimePicker.
         */
        this.title = "";
        /**
         * Determines whether the built-in min or max validators are enforced when a form is being validated.
         */
        this.rangeValidation = true;
        /**
         * Fires each time the user selects a new value.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the input element.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker (focus)="handleFocus()"></kendo-timepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the input element gets blurred.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timepicker (blur)="handleBlur()"></kendo-timepicker>
         * `
         * })
         * export class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_timepicker %}#toc-events).
         */
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.wrapperClasses = true;
        this.popupUID = guid();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.resolvedPromise = Promise.resolve(null);
        this.timeRangeValidateFn = noop;
        this.incompleteValidator = noop;
        this._min = cloneDate(MIN_TIME);
        this._max = cloneDate(MAX_TIME);
        this._popupSettings = { animate: true };
        this._show = false;
        this._steps = {};
        this._value = null;
        this._active = false;
        this.domEvents = [];
        this.pickerSubscriptions = this.pickerService.onFocus.subscribe(this.handleFocus.bind(this));
        this.pickerSubscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.pickerSubscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
    }
    /**
     * Specifies the smallest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set min(min) {
        this._min = cloneDate(min || MIN_TIME);
    }
    get min() {
        return this._min;
    }
    /**
     * Specifies the biggest valid time value
     * ([see example]({% slug timeranges_timepicker %})).
     */
    set max(max) {
        this._max = cloneDate(max || MAX_TIME);
    }
    get max() {
        return this._max;
    }
    /**
     * Configures the incremental steps of the TimePicker.
     * For more information, refer to the article on
     * [incremental steps]({% slug incrementalsteps_timepicker %}).
     *
     * > If the incremental step is greater than `1`, the **Now** button will be hidden.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timepicker format="HH:mm:ss" [steps]="steps"></kendo-timepicker>
     * `
     * })
     * export class AppComponent {
     *   public steps = { hour: 2, minute: 15, second: 15 };
     * }
     * ```
     *
     */
    set steps(steps) {
        this._steps = steps || {};
    }
    get steps() {
        return this._steps;
    }
    /**
     * Configures the popup of the TimePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, { animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Specifies the value of the TimePicker component.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
    }
    get value() {
        return this._value;
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    /**
     * @hidden
     */
    get inputRole() {
        return this.readOnlyInput ? 'listbox' : 'spinbutton';
    }
    get isActive() {
        return this._active;
    }
    set isActive(value) {
        this._active = value;
        if (!this.wrapper) {
            return;
        }
        const element = this.wrapper.nativeElement;
        if (value) {
            this.renderer.addClass(element, 'k-state-focused');
        }
        else {
            this.renderer.removeClass(element, 'k-state-focused');
        }
    }
    get show() {
        return this._show;
    }
    set show(show) {
        if (show && (this.disabled || this.readonly)) {
            return;
        }
        const skipZone = !show && (!this._show || !hasObservers(this.close));
        if (!skipZone) {
            this.zone.run(() => {
                this.togglePopup(show);
            });
        }
        else {
            this.togglePopup(show);
        }
    }
    get input() {
        return this.pickerService.input;
    }
    get timeSelector() {
        return this.pickerService.timeSelector;
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty() {
        return !this.value && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.cdr.markForCheck());
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.timeRangeValidateFn = this.rangeValidation ? timeRangeValidator(this.min, this.max) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.verifyFormat();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
        this.pickerSubscriptions.unsubscribe();
    }
    /**
     * @hidden
     */
    handleKeydown(event) {
        const { altKey, keyCode } = event;
        if (keyCode === Keys.Escape) {
            this.show = false;
            return;
        }
        if (altKey) {
            if (keyCode === Keys.ArrowUp) {
                this.show = false;
            }
            if (keyCode === Keys.ArrowDown && !this.show) {
                this.show = true;
            }
        }
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.timeRangeValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * Focuses the TimePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timepicker.focus()">Focus time picker</button>
     *  <kendo-timepicker #timepicker></kendo-timepicker>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        this.input.focus();
    }
    /**
     * Blurs the TimePicker component.
     */
    blur() {
        (this.timeSelector || this.input)['blur'](); //tslint:disable-line:no-string-literal
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.show;
    }
    /**
     * @hidden
     */
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    /**
     * @hidden
     */
    handleChange(value) {
        if (isEqual(this.value, value)) {
            this.focusInput();
            this.show = false;
            return;
        }
        this.value = cloneDate(value);
        this.zone.run(() => {
            this.focusInput();
            this.show = false;
            this.onControlChange(cloneDate(value));
            this.valueChange.emit(cloneDate(value));
        });
    }
    /**
     * @hidden
     */
    handleReject() {
        this.show = false;
    }
    /**
     * @hidden
     */
    handleInputChange(value) {
        const val = this.input.formatSections.date ? value : this.mergeTime(value);
        this.handleChange(val);
    }
    /**
     * @hidden
     */
    handleMousedown(args) {
        args.preventDefault();
    }
    /**
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicit call handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
    }
    /**
     * @hidden
     */
    get popupClasses() {
        return [
            'k-group',
            'k-reset'
        ].concat(this.popupSettings.popupClass || []);
    }
    /**
     * @hidden
     */
    normalizeTime(date) {
        return setTime(MIDNIGHT_DATE, date);
    }
    /**
     * @hidden
     */
    mergeTime(value) {
        return this.value && value ? setTime(this.value, value) : value;
    }
    togglePopup(show) {
        const event = new PreventableEvent();
        if (!this._show && show) {
            this.open.emit(event);
        }
        else if (this._show && !show) {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
        this.toggleFocus();
    }
    _toggle(show) {
        if (show === this.isOpen) {
            return;
        }
        this._show = show;
        this.cdr.markForCheck();
        if (show) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.wrapper,
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                animate: this.popupSettings.animate,
                appendTo: this.appendTo,
                content: this.popupTemplate,
                popupAlign: { vertical: 'top', horizontal: direction },
                popupClass: this.popupClasses,
                positionMode: 'absolute'
            });
            this.popupRef.popupElement.setAttribute('id', this.popupUID);
            this.popupRef.popupAnchorViewportLeave.subscribe(() => this.show = false);
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    focusInput() {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    }
    toggleFocus() {
        if (!this.isActive) {
            return;
        }
        if (this.show) {
            if (!this.timeSelector) {
                this.cdr.detectChanges();
            }
            if (this.isActive) {
                this.timeSelector.focus();
            }
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK$3} for possible resolution.`);
        }
    }
    verifyFormat() {
        if (!isDevMode()) {
            return;
        }
        const formatContainsDateParts = this.intl.splitDateFormat(this.format).some(part => !formatRegExp.test(part.type));
        if (formatContainsDateParts) {
            throw new Error(`Provided format is not supported. Supported specifiers are T|t|H|h|m|s|a. See ${INTL_DATE_FORMAT}`);
        }
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    }
    handleWindowBlur() {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    }
    handleFocus() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    handleBlur(args) {
        const currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.timeSelector && this.timeSelector.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.blurComponent();
                this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    }
    blurComponent() {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.onControlTouched();
        this.onBlur.emit();
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.zone.run(() => this.onValidatorChange());
    }
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-timepicker',
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimePickerComponent), multi: true },
                    { provide: KendoInput, useExisting: forwardRef(() => TimePickerComponent) },
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.timepicker'
                    },
                    PickerService
                ],
                selector: 'kendo-timepicker',
                template: `
        <ng-container kendoTimePickerLocalizedMessages
            i18n-accept="kendo.timepicker.accept|The Accept button text in the timepicker component"
            accept="Set"

            i18n-acceptLabel="kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timepicker.cancel|The Cancel button text in the timepicker component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timepicker.now|The Now button text in the timepicker component"
            now="Now"

            i18n-nowLabel="kendo.timepicker.nowLabel|The label for the Now button in the timepicker component"
            nowLabel="Select now"

            i18n-toggle="kendo.timepicker.toggle|The label for the toggle button in the timepicker component"
            toggle="Toggle time list"
        >
        </ng-container>
        <span #wrapper
            class="k-picker-wrap"
            [class.k-state-disabled]="disabled"
        >
            <kendo-dateinput
                #input
                [focusableId]="focusableId"
                [hasPopup]="true"
                [isPopupOpen]="show"
                [disabled]="disabled"
                [readonly]="readonly || readOnlyInput"
                [role]="inputRole"
                [ariaReadOnly]="readonly"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [min]="normalizeTime(min)"
                [max]="normalizeTime(max)"
                [incompleteDateValidation]="incompleteDateValidation"
                [steps]="steps"
                [tabindex]="!show ? tabindex : -1"
                [title]="title"
                [value]="value"
                (valueChange)="handleInputChange($event)"
            ></kendo-dateinput>
            <span class="k-select"
                role="button"
                [attr.title]="localization.get('toggle')"
                [attr.aria-label]="localization.get('toggle')"
                [kendoEventsOutsideAngular]="{
                    click: handleIconClick,
                    mousedown: handleMousedown
                }"
                [scope]="this"
            >
                <span class="k-icon k-i-clock"></span>
            </span>
            <ng-template #popupTemplate>
                <kendo-timeselector
                    #timeSelector
                    [cancelButton]="cancelButton"
                    [nowButton]="nowButton"
                    [format]="format"
                    [min]="min"
                    [max]="max"
                    [steps]="steps"
                    [value]="value"
                    [kendoEventsOutsideAngular]="{
                        keydown: handleKeydown,
                        mousedown: handleMousedown
                    }"
                    [scope]="this"
                    (valueChange)="handleChange($event)"
                    (valueReject)="handleReject()"
                >
                    <kendo-timeselector-messages
                        [acceptLabel]="localization.get('acceptLabel')"
                        [accept]="localization.get('accept')"
                        [cancelLabel]="localization.get('cancelLabel')"
                        [cancel]="localization.get('cancel')"
                        [nowLabel]="localization.get('nowLabel')"
                        [now]="localization.get('now')"
                    >
                    </kendo-timeselector-messages>
                </kendo-timeselector>
            </ng-template>
        </span>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PopupService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: PickerService },
    { type: IntlService },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
TimePickerComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    focusableId: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    readOnlyInput: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    incompleteDateValidation: [{ type: Input }],
    cancelButton: [{ type: Input }],
    nowButton: [{ type: Input }],
    steps: [{ type: Input }],
    popupSettings: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    title: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    wrapperClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-timepicker',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
};

const timeFormatRegExp = new RegExp(`${TIME_PART.hour}|${TIME_PART.minute}|${TIME_PART.second}|${TIME_PART.dayperiod}|literal`);
const VALUE_DOC_LINK$4 = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/integration-with-json/';
const MIN_MAX_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/date-time-limits/';
const DEFAULT_ACTIVE_TAB = 'date';
const DEFAULT_DATEINPUT_FORMAT = 'g';
const DEFAULT_TIMESELECTOR_FORMAT = 't';
/**
 * Represents the [Kendo UI DateTimePicker component for Angular]({% slug overview_datetimepicker %}).
 */
class DateTimePickerComponent {
    constructor(popupService, intl, cdr, pickerService, ngZone, host, touchEnabled$$1, localization, disabledDatesService, renderer) {
        this.popupService = popupService;
        this.intl = intl;
        this.cdr = cdr;
        this.pickerService = pickerService;
        this.ngZone = ngZone;
        this.host = host;
        this.touchEnabled = touchEnabled$$1;
        this.localization = localization;
        this.disabledDatesService = disabledDatesService;
        this.renderer = renderer;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Sets the title of the input element of the DateTimePicker.
         */
        this.title = '';
        /**
         * Sets or gets the `disabled` property of the DateTimePicker and determines whether the component is active
         * ([see example]({% slug disabled_datetimepicker %})).
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the DateTimePicker
         * ([see example]({% slug readonly_datetimepicker %}#toc-read-only-datetimepicker)).
         */
        this.readonly = false;
        /**
         * Sets the read-only state of the DateTimePicker input field
         * ([see example]({% slug readonly_datetimepicker %}#toc-read-only-input)).
         *
         * > Note that if you set the [`readonly`]({% slug api_dateinputs_datetimepickercomponent %}#toc-readonly) property value to `true`,
         * the input will be rendered in a read-only state regardless of the `readOnlyInput` value.
         */
        this.readOnlyInput = false;
        /**
         * Determines whether to display the **Cancel** button in the popup
         * ([see example]({% slug datetimepicker_popup_options %}#toc-toggling-the-cancel-button)).
         */
        this.cancelButton = true;
        /**
         * Determines whether to display a week number column in the `month` view of the popup Calendar
         * ([see example]({% slug datetimepicker_calendar_options %}#toc-week-number-column)).
         */
        this.weekNumber = false;
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form
         * ([see example]({% slug dateranges_datetimepicker %}#toc-prevent-invalid-input)).
         */
        this.rangeValidation = true;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_datetimepicker %}#toc-validation)).
         */
        this.disabledDatesValidation = true;
        /**
         * Determines whether the built-in validation for incomplete dates is to be enforced when a form is being validated.
         */
        this.incompleteDateValidation = false;
        /**
         * Fires each time the user selects a new value.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event by setting `event.preventDefault()`, the popup will remain closed.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event by setting `event.preventDefault()`, the popup will remain open.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the component.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the user blurs the component.
         * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         *
         * Controls whether the Calendar or the TimeSelector will be displayed.
         */
        this.activeTab = DEFAULT_ACTIVE_TAB;
        /**
         * @hidden
         *
         * Specifies the stripped time-related format that is used in the TimeSelector.
         * Updates each time the `format` property value changes.
         */
        this.timeSelectorFormat = DEFAULT_TIMESELECTOR_FORMAT;
        /**
         * @hidden
         */
        this.timeSelectorMin = cloneDate(MIN_TIME);
        /**
         * @hidden
         */
        this.timeSelectorMax = cloneDate(MAX_TIME);
        /**
         * @hidden
         */
        this.calendarValue = null;
        /**
         * @hidden
         */
        this.calendarMin = cloneDate(MIN_DATE);
        /**
         * @hidden
         */
        this.calendarMax = lastMillisecondOfDate(MAX_DATE);
        this._popupSettings = { animate: true };
        this._value = null;
        this._format = DEFAULT_DATEINPUT_FORMAT;
        this._tabindex = 0;
        this._defaultTab = DEFAULT_ACTIVE_TAB;
        this._min = mergeDateAndTime(MIN_DATE, MIN_TIME);
        this._max = mergeDateAndTime(MAX_DATE, MAX_TIME);
        this._isActive = false;
        this.onControlTouched = noop;
        this.onControlChange = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesValidateFn = noop;
        this.incompleteValidator = noop;
        this.subscriptions = new Subscription();
    }
    /**
     * @hidden
     */
    get input() {
        return this.pickerService.input;
    }
    /**
     * @hidden
     */
    get calendar() {
        return this.pickerService.calendar;
    }
    /**
     * @hidden
     */
    get timeSelector() {
        return this.pickerService.timeSelector;
    }
    /**
     * Specifies the value of the DateTimePicker component.
     *
     * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    set value(value) {
        this.verifyValue(value);
        this._value = cloneDate(value);
        this.setCalendarValue(value);
        this.cdr.markForCheck();
    }
    get value() {
        return this._value;
    }
    /**
     * Specifies the date format for displaying the input value
     * ([see example]({% slug formats_datetimepicker %})).
     */
    set format(value) {
        this._format = value;
        this.timeSelectorFormat = this.getTimeSelectorFormat(value);
    }
    get format() {
        return this._format;
    }
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the DateTimePicker.
     */
    set tabindex(value) {
        const tabindex = Number(value);
        const defaultValue = 0;
        this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
    }
    get tabindex() {
        return this.disabled ? -1 : this._tabindex;
    }
    /**
     * Sets the dates of the DateTimePicker that will be disabled
     * ([see example]({% slug disabled_dates_datetimepicker %})).
     */
    set disabledDates(value) {
        this._disabledDates = value;
        this.disabledDatesService.initialize(value);
    }
    get disabledDates() {
        return this._disabledDates;
    }
    /**
     * Configures the popup settings of the DateTimePicker
     * ([see example]({% slug datetimepicker_popup_options %}#toc-customizing-the-popup)).
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, { animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Specifies the smallest valid date.
     * The Calendar will not display dates before this value.
     * If the `min` value of the Calendar is selected, the TimePicker will not display
     * time entries before the specified time portion of this value
     * ([see example]({% slug dateranges_datetimepicker %})).
     */
    set min(value) {
        if (!isPresent(value)) {
            return;
        }
        this._min = cloneDate(value);
        this.calendarMin = getDate(value);
    }
    get min() {
        return this._min;
    }
    /**
     * Specifies the biggest valid date.
     * The Calendar will not display dates after this value.
     * If the `max` value of the Calendar is selected, the TimePicker will not display
     * time entries after the specified time portion of this value
     * ([see example]({% slug dateranges_datetimepicker %})).
     */
    set max(value) {
        if (!isPresent(value)) {
            return;
        }
        this._max = cloneDate(value);
        this.calendarMax = lastMillisecondOfDate(value);
    }
    get max() {
        return this._max;
    }
    /**
     * Indicates whether the component is currently open.
     */
    get isOpen() {
        return isPresent(this.popupRef);
    }
    /**
     * Indicates whether the component or its popup content is focused.
     */
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        if (value) {
            this.renderer.addClass(this.wrapper.nativeElement, 'k-state-focused');
        }
        else {
            this.renderer.removeClass(this.wrapper.nativeElement, 'k-state-focused');
        }
        this._isActive = value;
    }
    /**
     * Sets the active tab on opening the popup
     * ([see example]({% slug datetimepicker_popup_options %}#toc-setting-the-default-tab)).
     */
    set defaultTab(tab) {
        this._defaultTab = tab || DEFAULT_ACTIVE_TAB;
        this.activeTab = this.defaultTab;
    }
    get defaultTab() {
        return this._defaultTab;
    }
    /**
     * @hidden
     */
    get tabSwitchTransition() {
        /*
         When the popup is opening, disables the set transition in the themes. When `defaultTab` is set to `time`,
         the popup opens with an active **Time** tab and the animation of the initial transition is undesired.
         Setting the inline transition style to `none` overrides the set animation in the themes.
         Setting the inline transition style to `null` does not apply any inline styles or override the themes CSS.
        */
        return this.isOpen ? null : 'none';
    }
    /**
     * @hidden
     *
     * Indicates whether the Calendar will be disabled.
     * The inactive tab component gets disabled and becomes inaccessible on tab click.
     */
    get disableCalendar() {
        return this.activeTab !== 'date' && !this.calendar.isActive;
    }
    /**
     * @hidden
     */
    get inputRole() {
        return this.readOnlyInput ? 'listbox' : 'spinbutton';
    }
    /**
     * @hidden
     *
     * Indicates whether the TimeSelector will be disabled.
     * The inactive tab component gets disabled and becomes inaccessible on tab click.
     */
    get disableTimeSelector() {
        return this.activeTab !== 'time' && !this.timeSelector.isActive;
    }
    get activeTabComponent() {
        if (!this.isOpen) {
            return;
        }
        if (!(isPresent(this.calendar) || isPresent(this.timeSelector))) {
            this.cdr.detectChanges();
        }
        return this.activeTab === 'date' ? this.calendar : this.timeSelector;
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!isPresent(appendTo) || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    ngOnInit() {
        this.subscriptions.add(this.pickerService.onFocus
            // detect popup changes to disable the inactive view mark-up when the popup is open
            .pipe(tap(this.detectPopupChanges.bind(this)))
            .subscribe(this.handleFocus.bind(this)));
        this.subscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.subscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleCalendarValueChange.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(() => this.cdr.markForCheck()));
        this.subscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
        if (isWindowAvailable()) {
            this.subscriptions.add(this.ngZone.runOutsideAngular(() => fromEvent(window, 'blur').subscribe(this.handleCancel.bind(this))));
        }
    }
    ngOnChanges(changes) {
        if (isPresent(changes.min) || isPresent(changes.max)) {
            this.verifyMinMaxRange();
        }
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
    }
    ngOnDestroy() {
        if (this.isOpen) {
            this.closePopup();
        }
        this.subscriptions.unsubscribe();
    }
    /**
     * * If the popup is closed, focuses the DateTimePicker input.
     * * If the popup is open, the focus is moved to its content.
     */
    focus() {
        if (this.disabled) {
            return;
        }
        if (this.isOpen) {
            this.activeTabComponent.focus();
        }
        else {
            this.input.focus();
        }
    }
    /**
     * Blurs the DateTimePicker.
     */
    blur() {
        if (this.isOpen && this.activeTabComponent.isActive) {
            this.activeTabComponent.blur();
        }
        else {
            this.input.blur();
        }
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
     *
     * @param show - The state of the popup.
     */
    toggle(show) {
        if (this.disabled || this.readonly || show === this.isOpen) {
            return;
        }
        const shouldOpen = isPresent(show) ? show : !this.isOpen;
        if (shouldOpen) {
            this.openPopup();
        }
        else {
            this.closePopup();
            // Changes the tab and the calendar or clock icon to the designated default.
            if (this.activeTab !== this.defaultTab) {
                this.activeTab = this.defaultTab;
                this.cdr.detectChanges();
            }
        }
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(disabled) {
        this.disabled = disabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * @hidden
     *
     * Used by the TextBoxContainer to determine if the floating label will render in the input.
     */
    isEmpty() {
        return !isPresent(this.value) && this.input.isEmpty();
    }
    /**
     * @hidden
     */
    handleIconClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        // prevents the event default to evade focusing the DateInput input when placed inside a label (FF/IE/Edge)
        event.preventDefault();
        const runInZone = !this.isOpen || hasObservers(this.close);
        this.run(runInZone, () => {
            const shouldOpen = !this.isOpen;
            // handle focus first to maintain correct event order `focus` => `open`
            this.handleFocus();
            this.togglePopup(shouldOpen);
            this.switchFocus();
        });
    }
    /**
     * @hidden
     */
    handleFocus() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(() => this.onFocus.emit());
        }
    }
    /**
     * @hidden
     */
    handleBlur(event) {
        if (!this.isActive || this.focusTargetInComponent(event)) {
            return;
        }
        this.isActive = false;
        const isNgControlUntouched = this.host.nativeElement.classList.contains('ng-untouched');
        const runInZone = isNgControlUntouched || hasObservers(this.onBlur) || (this.isOpen && hasObservers(this.close));
        this.run(runInZone, () => {
            this.onBlur.emit();
            this.onControlTouched();
            this.togglePopup(false);
            this.cdr.markForCheck();
        });
    }
    /**
     * @hidden
     */
    changeActiveTab(tab) {
        if (!this.isOpen || this.activeTab === tab) {
            return;
        }
        // persists the Tcurrent value of the TimeSelector when switching between tabs
        if (!isEqual(this.timeSelector.value, this.timeSelector.current)) {
            this.timeSelector.handleAccept();
        }
        this.activeTab = tab;
        this.cdr.detectChanges();
        this.detectPopupChanges();
    }
    /**
     * @hidden
     */
    handleTabChangeTransitionEnd(dateTimeSelector, event) {
        // handle only the .k-datetime-selector element transition, ignore any child element transitions
        if (event.target !== dateTimeSelector) {
            return;
        }
        this.activeTabComponent.focus();
    }
    /**
     * @hidden
     */
    handleAccept() {
        if (!this.isOpen) {
            return;
        }
        const candidate = mergeDateAndTime(this.calendar.value, this.timeSelector.current);
        const valueChangePresent = !isEqual(this.value, candidate);
        const runInZone = valueChangePresent || hasObservers(this.close);
        this.run(runInZone, () => {
            this.handleValueChange(candidate);
            this.togglePopup(false);
        });
    }
    /**
     * @hidden
     */
    handleCancel() {
        if (!this.isOpen) {
            return;
        }
        const runInZone = hasObservers(this.close);
        this.run(runInZone, () => this.togglePopup(false));
    }
    /**
     * @hidden
     */
    handleInputValueChange(value) {
        this.handleValueChange(value);
        if (this.isOpen) {
            this.togglePopup(false);
        }
    }
    /**
     * @hidden
     */
    handleCalendarValueChange() {
        this.setTimeSelectorMinMax(this.calendar.value);
        this.changeActiveTab('time');
    }
    /**
     * @hidden
     */
    handleKeyDown(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        const { keyCode, altKey } = event;
        switch (keyCode) {
            case altKey && Keys.ArrowUp:
            case Keys.Escape:
                this.handleCancel();
                break;
            case !this.isOpen && altKey && Keys.ArrowDown:
                this.ngZone.run(() => this.togglePopup(true));
                break;
            case altKey && Keys.ArrowRight:
                this.changeActiveTab('time');
                break;
            case altKey && Keys.ArrowLeft:
                this.changeActiveTab('date');
                break;
            case this.isOpen && this.timeSelector.isActive && isPresent(this.calendarValue) && Keys.Enter:
                this.handleAccept();
                break;
            default: return;
        }
        event.preventDefault();
    }
    /**
     * @hidden
     */
    handleTabOut(event) {
        const { keyCode, shiftKey, target } = event;
        // if no focusable next sibling elements exist in the controls sections, the user is tabbing out of the popup
        const focusableSiblingAvailable = isPresent(target.nextElementSibling) && !target.nextElementSibling.disabled;
        if (keyCode === Keys.Tab && !shiftKey && !focusableSiblingAvailable) {
            this.input.focus();
            this.handleCancel();
        }
    }
    /**
     * @hidden
     */
    handleBackTabOut(event) {
        const { keyCode, shiftKey } = event;
        if (keyCode === Keys.Tab && shiftKey) {
            this.input.focus();
        }
    }
    /**
     * @hidden
     *
     * Prevents the diversion of the focus from the currently active element in the component.
     */
    preventMouseDown(event) {
        event.preventDefault();
    }
    verifyValue(value) {
        if (!isDevMode()) {
            return;
        }
        if (isPresent(value) && !(value instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK$4} for possible resolution.`);
        }
    }
    verifyMinMaxRange() {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_MAX_DOC_LINK}.`);
        }
    }
    /**
     * Extracts the time slots and the literals that are not preceded by date parts
     * and concatenates the resulting parts into a string.
     * If the provided format value does not contain any time parts,
     * returns the designated format of the default popup component of the TimePicker.
     */
    getTimeSelectorFormat(format) {
        const timeSelectorFormat = this.intl
            .splitDateFormat(format)
            .filter(this.timeFormatPartFilter)
            .reduce((format, part) => format += part.pattern, '');
        return timeSelectorFormat || DEFAULT_TIMESELECTOR_FORMAT;
    }
    /**
     * The filter expression that filters out all format parts
     * except for `hour`, `minute`, `second`, `dayperiod`, and specific literals.
     * Literals will be left only if they are not preceded by date parts.
     */
    timeFormatPartFilter(part, index, parts) {
        const previousPart = index >= 1 && parts[index - 1];
        if (previousPart && part.type === 'literal') {
            return timeFormatRegExp.test(previousPart.type);
        }
        return timeFormatRegExp.test(part.type);
    }
    togglePopup(open) {
        if (open === this.isOpen) {
            return;
        }
        const event = new PreventableEvent();
        open ? this.open.emit(event) : this.close.emit(event);
        if (event.isDefaultPrevented()) {
            return;
        }
        this.toggle(open);
        this.switchFocus();
    }
    switchFocus() {
        if (!this.isActive) {
            return;
        }
        if (this.isOpen) {
            this.activeTabComponent.focus();
        }
        else if (!this.touchEnabled) {
            this.input.focus();
        }
        else if (!this.input.isActive) {
            this.handleBlur();
        }
    }
    openPopup() {
        this.setCalendarValue(this.value);
        this.setTimeSelectorMinMax(this.value);
        const direction = this.localization.rtl ? 'right' : 'left';
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            content: this.popupTemplate,
            positionMode: 'absolute',
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            popupClass: `k-datetime-container ${this.popupSettings.popupClass || ''}`,
            anchorAlign: { vertical: 'bottom', horizontal: direction },
            popupAlign: { vertical: 'top', horizontal: direction }
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.handleCancel());
    }
    closePopup() {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
    }
    handleValueChange(value) {
        if (isEqual(this.value, value)) {
            return;
        }
        this.value = cloneDate(value);
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    }
    /**
     * Indicates whether the focus target is part of this component,
     * that is, whether the focus target is inside the component wrapper or in the popup.
     */
    focusTargetInComponent(event) {
        if (!isPresent(event)) {
            return false;
        }
        const relatedTarget = event.relatedTarget || document.activeElement;
        const focusInPopup = isPresent(this.popupRef) && this.popupRef.popupElement.contains(relatedTarget);
        const focusInWrapper = this.wrapper.nativeElement.contains(relatedTarget);
        return focusInPopup || focusInWrapper;
    }
    setTimeSelectorMinMax(selectedDate) {
        const minDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.min));
        this.timeSelectorMin = cloneDate(minDateSelected ? this.min : MIN_TIME);
        const maxDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.max));
        this.timeSelectorMax = cloneDate(maxDateSelected ? this.max : MAX_TIME);
    }
    setCalendarValue(value) {
        const isInCalendarRange = isPresent(value) && isInRange(value, this.calendarMin, this.calendarMax);
        this.calendarValue = isInCalendarRange ? getDate(value) : null;
    }
    /**
     * If the popup is available, runs a popup change detection.
     */
    detectPopupChanges() {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.popup.changeDetectorRef.detectChanges();
    }
    /**
     * Depending on the predicate `runInZone` value that is passed,
     * runs the provided function either in the Angular or in the current zone.
     */
    run(runInZone, fn) {
        if (runInZone) {
            this.ngZone.run(() => fn());
        }
        else {
            fn();
        }
    }
    handleDateCompletenessChange() {
        this.cdr.markForCheck();
        this.ngZone.run(() => this.onValidatorChange());
    }
}
DateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-datetimepicker',
                exportAs: 'kendo-datetimepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    PickerService,
                    LocalizationService,
                    DisabledDatesService,
                    { provide: L10N_PREFIX, useValue: 'kendo.datetimepicker' },
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateTimePickerComponent), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateTimePickerComponent), multi: true },
                    { provide: KendoInput, useExisting: forwardRef(() => DateTimePickerComponent) }
                ],
                template: `
        <ng-container
            kendoDateTimePickerLocalizedMessages

            i18n-dateTab="kendo.datetimepicker.dateTab|The Date tab text in the datetimepicker popup header"
            dateTab="Date"

            i18n-dateTabLabel="kendo.datetimepicker.dateTabLabel|The label for the Date tab in the datetimepicker popup header"
            dateTabLabel="Date tab"

            i18n-timeTab="kendo.datetimepicker.timeTab|The Time tab text in the datetimepicker popup header"
            timeTab="Time"

            i18n-timeTabLabel="kendo.datetimepicker.timeTabLabel|The label for the Time tab in the datetimepicker popup header"
            timeTabLabel="Time tab"

            i18n-toggle="kendo.datetimepicker.toggle|The label for the toggle button in the datetimepicker component"
            toggle="Toggle popup"

            i18n-accept="kendo.datetimepicker.accept|The Accept button text in the datetimepicker component"
            accept="Set"

            i18n-acceptLabel="kendo.datetimepicker.acceptLabel|The label for the Accept button in the datetimepicker component"
            acceptLabel="Set"

            i18n-cancel="kendo.datetimepicker.cancel|The Cancel button text in the datetimepicker component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.datetimepicker.cancelLabel|The label for the Cancel button in the datetimepicker component"
            cancelLabel="Cancel"

            i18n-now="kendo.datetimepicker.now|The Now button text in the timepicker component"
            now="NOW"

            i18n-nowLabel="kendo.datetimepicker.nowLabel|The label for the Now button in the timepicker component"
            nowLabel="Select now"

            i18n-today="kendo.datetimepicker.today|The label for the today button in the calendar header"
            today="TODAY"
        >
        </ng-container>

        <span
            #wrapper
            class="k-picker-wrap"
            [class.k-state-disabled]="disabled"
        >
            <kendo-dateinput
                [value]="value"
                [format]="format"
                [min]="min"
                [max]="max"
                [incompleteDateValidation]="incompleteDateValidation"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly || readOnlyInput"
                [role]="inputRole"
                [ariaReadOnly]="readonly"
                [steps]="steps"
                [tabindex]="tabindex"
                [title]="title"
                [focusableId]="focusableId"
                [hasPopup]="true"
                [isPopupOpen]="isOpen"
                (valueChange)="handleInputValueChange($event)"
                [kendoEventsOutsideAngular]="{
                    keydown: handleKeyDown
                }"
                [scope]="this"
            >
            </kendo-dateinput>
            <span class="k-select"
                [attr.title]="localization.get('toggle')"
                [attr.aria-label]="localization.get('toggle')"
                [kendoEventsOutsideAngular]="{
                    mousedown: preventMouseDown,
                    click: handleIconClick
                }"
                [scope]="this"
            >
                <span class="k-link k-link-date">
                    <span
                        class="k-icon"
                        [class.k-i-calendar]="activeTab === 'date'"
                        [class.k-i-clock]="activeTab === 'time'"
                    >
                    </span>
                </span>
            </span>
        </span>

        <ng-container #container></ng-container>

        <ng-template #popupTemplate>
            <div
                class="k-datetime-wrap k-{{activeTab}}-tab"
                [kendoEventsOutsideAngular]="{
                    mousedown: preventMouseDown,
                    keydown: handleKeyDown
                }"
                [scope]="this"
            >
                <div class="k-datetime-buttongroup"
                    [kendoEventsOutsideAngular]="{
                        focusin: handleFocus,
                        focusout: handleBlur
                    }"
                    [scope]="this"
                >
                    <div class="k-button-group k-button-group-stretched">
                        <button
                            type="button"
                            class="k-button k-date-tab"
                            [class.k-state-active]="activeTab === 'date'"
                            [attr.title]="localization.get('dateTabLabel')"
                            [attr.aria-label]="localization.get('dateTabLabel')"
                            [kendoEventsOutsideAngular]="{
                                click: changeActiveTab.bind(this, 'date'),
                                keydown: handleBackTabOut
                            }"
                            [scope]="this"
                        >
                            {{localization.get('dateTab')}}
                        </button>
                        <button
                            type="button"
                            class="k-button k-time-tab"
                            [class.k-state-active]="activeTab === 'time'"
                            [attr.title]="localization.get('timeTabLabel')"
                            [attr.aria-label]="localization.get('timeTabLabel')"
                            [kendoEventsOutsideAngular]="{
                                click: changeActiveTab.bind(this, 'time')
                            }"
                        >
                            {{localization.get('timeTab')}}
                        </button>
                    </div>
                </div>
                <div
                    #dateTimeSelector
                    class="k-datetime-selector"
                    [style.transition]="tabSwitchTransition"
                    [kendoEventsOutsideAngular]="{
                        transitionend: handleTabChangeTransitionEnd.bind(this, dateTimeSelector)
                    }"
                >
                    <div class="k-datetime-calendar-wrap">
                        <kendo-calendar
                            [(value)]="calendarValue"
                            [min]="calendarMin"
                            [max]="calendarMax"
                            [focusedDate]="focusedDate"
                            [weekNumber]="weekNumber"
                            [navigation]="false"
                            [cellTemplate]="cellTemplate"
                            [monthCellTemplate]="monthCellTemplate"
                            [yearCellTemplate]="yearCellTemplate"
                            [decadeCellTemplate]="decadeCellTemplate"
                            [centuryCellTemplate]="centuryCellTemplate"
                            [weekNumberTemplate]="weekNumberTemplate"
                            [headerTitleTemplate]="headerTitleTemplate"
                            [disabled]="disableCalendar"
                            [disabledDates]="disabledDates"
                            (valueChange)="handleCalendarValueChange()"
                        >
                            <kendo-calendar-messages
                                [today]="localization.get('today')"
                            >
                            </kendo-calendar-messages>
                        </kendo-calendar>
                    </div>
                    <div class="k-datetime-time-wrap">
                        <kendo-timeselector
                            [value]="value"
                            [format]="timeSelectorFormat"
                            [min]="timeSelectorMin"
                            [max]="timeSelectorMax"
                            [setButton]="false"
                            [cancelButton]="false"
                            [steps]="steps"
                            [disabled]="disableTimeSelector"
                        >
                            <kendo-timeselector-messages
                                [now]="localization.get('now')"
                                [nowLabel]="localization.get('nowLabel')"
                            >
                            </kendo-timeselector-messages>
                        </kendo-timeselector>
                    </div>
                </div>
                <div
                    class="k-datetime-footer k-action-buttons"
                    [kendoEventsOutsideAngular]="{
                        keydown: handleTabOut,
                        focusin: handleFocus,
                        focusout: handleBlur
                    }"
                    [scope]="this"
                >
                    <button
                        *ngIf="cancelButton"
                        type="button"
                        class="k-button k-time-cancel"
                        [attr.title]="localization.get('cancelLabel')"
                        [attr.aria-label]="localization.get('cancelLabel')"
                        [kendoEventsOutsideAngular]="{
                            click: handleCancel
                        }"
                        [scope]="this"
                    >
                        {{localization.get('cancel')}}
                    </button>
                    <button
                        type="button"
                        class="k-time-accept k-button k-primary"
                        [attr.title]="localization.get('acceptLabel')"
                        [attr.aria-label]="localization.get('acceptLabel')"
                        [disabled]="!calendarValue"
                        [kendoEventsOutsideAngular]="{
                            click: handleAccept
                        }"
                        [scope]="this"
                    >
                        {{localization.get('accept')}}
                    </button>
                </div>
            </div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
DateTimePickerComponent.ctorParameters = () => [
    { type: PopupService },
    { type: IntlService },
    { type: ChangeDetectorRef },
    { type: PickerService },
    { type: NgZone },
    { type: ElementRef },
    { type: Boolean, decorators: [{ type: Inject, args: [TOUCH_ENABLED,] }] },
    { type: LocalizationService },
    { type: DisabledDatesService },
    { type: Renderer2 }
];
DateTimePickerComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-datetimepicker',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    value: [{ type: Input }],
    format: [{ type: Input }],
    tabindex: [{ type: Input }],
    disabledDates: [{ type: Input }],
    popupSettings: [{ type: Input }],
    focusableId: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    readOnlyInput: [{ type: Input }],
    cancelButton: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    steps: [{ type: Input }],
    focusedDate: [{ type: Input }],
    weekNumber: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    disabledDatesValidation: [{ type: Input }],
    incompleteDateValidation: [{ type: Input }],
    valueChange: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    defaultTab: [{ type: Input }],
    cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective,] }],
    yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective,] }],
    decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective,] }],
    centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective,] }],
    weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective,] }],
    headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective,] }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { read: TemplateRef },] }]
};

/* tslint:disable:component-selector-name  component-selector-type */
const DEFAULT_VIEWS_LENGTH = 2;
/**
 * @hidden
 */
class HorizontalViewListComponent {
    constructor(bus, cdr) {
        this.bus = bus;
        this.cdr = cdr;
        this.activeView = CalendarViewEnum.month;
        this.isActive = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.views = DEFAULT_VIEWS_LENGTH;
        this.valueChange = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.dates = [];
    }
    get weekNumber() {
        return this.showWeekNumbers && this.isMonthView();
    }
    set weekNumber(showWeekNumbers) {
        this.showWeekNumbers = showWeekNumbers;
    }
    get getComponentClass() {
        return true;
    }
    get getComponentMonthClass() {
        return this.activeView === CalendarViewEnum.month;
    }
    get getComponentYearClass() {
        return this.activeView === CalendarViewEnum.year;
    }
    get getComponentDecadeClass() {
        return this.activeView === CalendarViewEnum.decade;
    }
    get getComponentCenturyClass() {
        return this.activeView === CalendarViewEnum.century;
    }
    ngOnChanges(changes) {
        this.initService();
        if (!this.service) {
            return;
        }
        this.views = this.views || DEFAULT_VIEWS_LENGTH;
        const focusedDate = this.focusedDate;
        const viewDate = this.clampDate(this.service.viewDate(focusedDate, this.max, this.views));
        this.skip = this.service.skip(viewDate, this.min);
        this.total = this.service.total(this.min, this.max);
        const activeViewChanged = hasChange(changes, 'activeView');
        const viewsHasChanged = this.views > 0 && hasChange(changes, 'views');
        if (activeViewChanged || !this.isInDates(focusedDate) || viewsHasChanged || !this.activeDate) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
            this.activeDate = cloneDate(this.dates[0]);
        }
    }
    initService() {
        this.service = this.bus.service(this.activeView);
    }
    handleDateChange(candidate) {
        this.valueChange.emit(candidate);
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    navigate(action) {
        const candidate = this.move(action);
        const list = this.service.datesList(candidate, this.getTake(this.skip));
        if (this.isListInRange(list)) {
            this.dates = list;
        }
        this.activeDate = cloneDate(this.dates[0]);
        this.focusedDate = cloneDate(candidate);
        this.cdr.markForCheck();
        return cloneDate(candidate);
    }
    canNavigate(action) {
        if (!this.service) {
            return false;
        }
        return this.isListInRange(this.service.datesList(this.move(action), this.getTake(this.skip)));
    }
    clampDate(value) {
        return dateInRange(value, this.min, this.max);
    }
    move(action) {
        return this.service.move(this.dates[0] || this.focusedDate, action);
    }
    isListInRange(list) {
        const lowerBound = this.service.beginningOfPeriod(this.min);
        const upperBound = this.service.beginningOfPeriod(this.service.addToDate(this.max, 1));
        return lowerBound <= list[0] && list[list.length - 1] < upperBound;
    }
    isInDates(value) {
        return this.service.isInArray(value, this.dates);
    }
    getTake(skip) {
        return Math.min(this.total - skip, this.views);
    }
}
HorizontalViewListComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-calendar-horizontal',
                template: `
    <kendo-calendar-header
        [activeView]="activeView"
        [currentDate]="activeDate"
        [min]="min"
        [max]="max"
        [rangeLength]="views"
        [templateRef]="headerTitleTemplateRef"
        (today)="handleDateChange($event)"
    >
    </kendo-calendar-header>
    <table class="k-content">
        <tbody *kFor="let date of dates"
               kendoCalendarView
               role="rowgroup"
               direction="horizontal"
               [activeView]="activeView"
               [isActive]="isActive"
               [min]="min" [max]="max"
               [cellUID]="cellUID"
               [focusedDate]="focusedDate"
               [selectedDate]="value"
               [selectionRange]="selectionRange"
               [activeRangeEnd]="activeRangeEnd"
               [weekNumber]="weekNumber"
               [templateRef]="cellTemplateRef"
               [weekNumberTemplateRef]="weekNumberTemplateRef"
               [viewDate]="date"
               (change)="handleDateChange($event)"
               (cellEnter)="cellEnter.emit($event)"
               (cellLeave)="cellLeave.emit($event)"
        ></tbody>
    </table>
  `
            },] },
];
/** @nocollapse */
HorizontalViewListComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef }
];
HorizontalViewListComponent.propDecorators = {
    cellTemplateRef: [{ type: Input }],
    weekNumberTemplateRef: [{ type: Input }],
    headerTitleTemplateRef: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    activeView: [{ type: Input }],
    cellUID: [{ type: Input }],
    focusedDate: [{ type: Input }],
    isActive: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    selectionRange: [{ type: Input }],
    value: [{ type: Input }],
    views: [{ type: Input }],
    weekNumber: [{ type: Input }],
    valueChange: [{ type: Output }],
    cellEnter: [{ type: Output }],
    cellLeave: [{ type: Output }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-view",] }],
    getComponentMonthClass: [{ type: HostBinding, args: ["class.k-calendar-monthview",] }],
    getComponentYearClass: [{ type: HostBinding, args: ["class.k-calendar-yearview",] }],
    getComponentDecadeClass: [{ type: HostBinding, args: ["class.k-calendar-decadeview",] }],
    getComponentCenturyClass: [{ type: HostBinding, args: ["class.k-calendar-centuryview",] }]
};

const noop$2 = () => null;
/**
 * @hidden
 */
const disabledDatesRangeValidator = (isDateDisabled) => {
    if (!isPresent(isDateDisabled)) {
        return noop$2;
    }
    return (selectedRange) => {
        const isRangeComplete = isPresent(selectedRange) && isPresent(selectedRange.start) && isPresent(selectedRange.end);
        if (!isRangeComplete || selectedRange.start > selectedRange.end) {
            return null;
        }
        const disabledDates = disabledDatesInRange(selectedRange.start, selectedRange.end, isDateDisabled);
        const error = {
            disabledDatesInRange: disabledDates
        };
        return disabledDates.length ? error : null;
    };
};

/* tslint:disable:no-forward-ref */
const BOTTOM_VIEW_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
const TOP_VIEW_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
const MIN_DOC_LINK$3 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
const MAX_DOC_LINK$3 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
const VALUE_DOC_LINK$5 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
/**
 * @hidden
 */
const RANGE_CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiViewCalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
const RANGE_CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MultiViewCalendarComponent) //tslint:disable-line:no-use-before-declare
};
/**
 * Represents the Kendo UI MultiViewCalendar component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiviewcalendar></kendo-multiviewcalendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
class MultiViewCalendarComponent {
    constructor(bus, element, localization, navigator, renderer, cdr, zone, disabledDatesService) {
        this.bus = bus;
        this.element = element;
        this.localization = localization;
        this.navigator = navigator;
        this.renderer = renderer;
        this.cdr = cdr;
        this.zone = zone;
        this.disabledDatesService = disabledDatesService;
        /**
         * @hidden
         */
        this.id = guid();
        /**
         * Determines whether the built-in min or max validators are enforced when validating a form.
         */
        this.rangeValidation = false;
        /**
         * Determines whether the built-in validator for disabled
         * date ranges is enforced when validating a form
         * ([see example]({% slug disabled_dates_multiviewcalendar %}#toc-validation)).
         */
        this.disabledDatesRangeValidation = false;
        /**
         * Sets or gets the `disabled` property of the Calendar and
         * determines whether the component is active
         * ([see example]({% slug disabled_multiviewcalendar %})).
         */
        this.disabled = false;
        /**
         * Sets or gets the `tabindex` property of the Calendar. Based on the
         * [HTML `tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) behavior,
         * it determines whether the component is focusable.
         */
        this.tabindex = 0;
        /**
         * Defines the active view that the Calendar initially renders
         * ([see example]({% slug activeview_multiviewcalendar %})).
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the bottommost view, to which the user can navigate
         * ([see example]({% slug dates_multiviewcalendar %}#toc-partial-dates)).
         */
        this.bottomView = CalendarViewEnum[CalendarViewEnum.month];
        /**
         * Defines the topmost view, to which the user can navigate.
         */
        this.topView = CalendarViewEnum[CalendarViewEnum.century];
        /**
         * Determines whether to display a week number column in the `month` view
         * ([see example]({% slug weeknumcolumn_multiviewcalendar %})).
         */
        this.weekNumber = false;
        /**
         * Sets or gets the `views` property of the Calendar and
         * defines the number of rendered months.
         */
        this.views = 2;
        /**
         * Fires when the active view is changed
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Fires when a view cell is entered
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellEnter = new EventEmitter();
        /**
         * Fires when a view cell is leaved
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.cellLeave = new EventEmitter();
        /**
         * Fires when the value is changed
         * ([more information and example]({% slug overview_multiviewcalendar %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        this.cellUID = guid();
        this.isActive = false;
        this.isHovered = false;
        this.isPrevDisabled = true;
        this.isNextDisabled = true;
        this.prevView = Action.PrevView;
        this.nextView = Action.NextView;
        this._min = new Date(MIN_DATE);
        this._max = new Date(MAX_DATE);
        this._focusedDate = getToday();
        this.resolvedPromise = Promise.resolve();
        this.onControlChange = noop;
        this.onControlTouched = noop;
        this.onValidatorChange = noop;
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this.disabledDatesRangeValidateFn = noop;
        this.subscriptions = new Subscription(() => { });
        this.setClasses(element.nativeElement);
    }
    /**
     * Sets or gets the `focusedDate` property of the Calendar and
     * defines the focused date of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-focused-dates)).
     *
     * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
     */
    set focusedDate(focusedDate) {
        this._focusedDate = focusedDate || getToday();
    }
    get focusedDate() {
        return this._focusedDate;
    }
    /**
     * Sets or gets the `min` property of the Calendar and
     * defines the minimum allowed date value.
     * By default, the `min` value is `1900-1-1`.
     */
    set min(min) {
        this._min = min || new Date(MIN_DATE);
    }
    get min() {
        return this._min;
    }
    /**
     * Sets or gets the `max` property of the Calendar and
     * defines the maximum allowed date value.
     * By default, the `max` value is `2099-12-31`.
     */
    set max(max) {
        this._max = max || new Date(MAX_DATE);
    }
    get max() {
        return this._max;
    }
    /**
     * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    get value() {
        return this._value;
    }
    set value(candidate) {
        this.verifyValue(candidate);
        this._value = cloneDate(candidate);
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the dates of the MultiViewCalendar that will be disabled
     * ([see example]({% slug disabled_dates_multiviewcalendar %})).
     */
    set disabledDates(value) {
        this.disabledDatesService.initialize(value);
    }
    /**
     * Sets or gets the `selectionRange` property of the Calendar and
     * defines the selection range of the component
     * ([see example]({% slug dates_multiviewcalendar %}#toc-selection-range)).
     */
    set selectionRange(range$$1) {
        this._selectionRange = range$$1;
        if (this.disabledDatesRangeValidation) {
            this.onValidatorChange();
        }
    }
    get selectionRange() {
        return this._selectionRange;
    }
    /**
     * @hidden
     */
    set cellTemplateRef(template) {
        this.cellTemplate = template;
    }
    /**
     * @hidden
     */
    set monthCellTemplateRef(template) {
        this.monthCellTemplate = template;
    }
    /**
     * @hidden
     */
    set yearCellTemplateRef(template) {
        this.yearCellTemplate = template;
    }
    /**
     * @hidden
     */
    set decadeCellTemplateRef(template) {
        this.decadeCellTemplate = template;
    }
    /**
     * @hidden
     */
    set centuryCellTemplateRef(template) {
        this.centuryCellTemplate = template;
    }
    /**
     * @hidden
     */
    set weekNumberTemplateRef(template) {
        this.weekNumberTemplate = template;
    }
    /**
     * @hidden
     */
    set headerTitleTemplateRef(template) {
        this.headerTitleTemplate = template;
    }
    get activeViewEnum() {
        const activeView = CalendarViewEnum[this.activeView];
        return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
    }
    get bottomViewEnum() {
        return CalendarViewEnum[this.bottomView];
    }
    get topViewEnum() {
        return CalendarViewEnum[this.topView];
    }
    get widgetId() {
        return this.id;
    }
    get widgetRole() {
        return 'grid';
    }
    get calendarTabIndex() {
        return this.disabled ? undefined : this.tabIndex;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get ariaActivedescendant() {
        return this.cellUID + this.focusedDate.getTime();
    }
    /**
     * @hidden
     */
    handleBlur() {
        this.onControlTouched();
        this.isActive = false;
        this.isHovered = false; //ensure that hovered is also not active
    }
    /**
     * @hidden
     */
    handleFocus() {
        this.isActive = true;
    }
    /**
     * @hidden
     */
    handleMouseEnter() {
        this.isHovered = true;
    }
    /**
     * @hidden
     */
    handleMouseLeave() {
        this.isHovered = false;
    }
    /**
     * @hidden
     */
    handleMousedown(event) {
        event.preventDefault();
    }
    /**
     * @hidden
     */
    handleClick() {
        if (this.isActive) {
            return;
        }
        this.focus();
    }
    /**
     * @hidden
     */
    keydown(event) {
        const candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event), this.activeViewEnum), this.min, this.max);
        if (isEqual(this.focusedDate, candidate)) {
            return;
        }
        this.focusedDate = candidate;
        event.preventDefault();
    }
    /**
     * @hidden
     */
    enter() {
        this.handleDateChange(this.focusedDate);
    }
    ngOnInit() {
        this.setMessages();
        this.subscriptions.add(this.localization.changes.subscribe(() => this.setMessages()));
        this.subscriptions.add(this.bus.viewChanged.subscribe(({ view }) => {
            this.activeView = CalendarViewEnum[view];
            this.activeViewChange.emit(this.activeView);
            this.cdr.detectChanges();
            this.updateButtonState();
        }));
    }
    ngOnChanges(changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        const useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        const focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDates || changes.disabledDatesRangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesRangeValidateFn = this.disabledDatesRangeValidation ? disabledDatesRangeValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.onValidatorChange();
        }
        if (changes.min || changes.max || changes.focusedDate || changes.activeView) {
            this.updateButtonState();
        }
    }
    ngOnDestroy() {
        clearTimeout(this.messagesTimeout);
        this.subscriptions.unsubscribe();
    }
    ngAfterViewInit() {
        this.updateButtonState();
    }
    /**
     * Focuses the host element of the Calendar.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="multiviewcalendar.focus()">Focus calendar</button>
     *  <kendo-multiviewcalendar #multiviewcalendar></kendo-multiviewcalendar>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    }
    /**
     * Blurs the Calendar component.
     */
    blur() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    }
    /**
     * @hidden
     */
    handleDateChange(candidate) {
        const canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        const isSameDate = !canNavigateDown && isEqual(candidate, this.value);
        this.focusedDate = cloneDate(candidate) || this.focusedDate;
        if (this.disabled || isSameDate) {
            return;
        }
        if (canNavigateDown) {
            this.bus.moveDown(this.activeViewEnum);
            return;
        }
        if (!this.disabledDatesService.isDateDisabled(candidate)) {
            this.value = cloneDate(candidate);
            this.onControlChange(cloneDate(candidate));
            this.valueChange.emit(cloneDate(candidate));
        }
    }
    /**
     * @hidden
     */
    writeValue(candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onControlChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onControlTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    validate(control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesRangeValidateFn(this.selectionRange);
    }
    /**
     * @hidden
     */
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
    /**
     * @hidden
     */
    activeCellTemplate() {
        switch (this.activeViewEnum) {
            case CalendarViewEnum.month:
                return this.monthCellTemplate || this.cellTemplate;
            case CalendarViewEnum.year:
                return this.yearCellTemplate;
            case CalendarViewEnum.decade:
                return this.decadeCellTemplate;
            case CalendarViewEnum.century:
                return this.centuryCellTemplate;
            default:
                return null;
        }
    }
    /**
     * @hidden
     */
    navigate(action) {
        this.focusedDate = this.viewList.navigate(action);
        this.updateButtonState();
    }
    /**
     * @hidden
     */
    emitCellEvent(emitter, args) {
        if (hasObservers(emitter)) {
            this.zone.run(() => {
                emitter.emit(args);
            });
        }
    }
    setClasses(element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
        this.renderer.addClass(element, 'k-calendar-range');
    }
    setMessages() {
        this.zone.runOutsideAngular(() => {
            clearTimeout(this.messagesTimeout);
            this.messagesTimeout = setTimeout(() => {
                this.prevButtonTitle = this.localization.get('prevButtonTitle');
                this.nextButtonTitle = this.localization.get('nextButtonTitle');
                this.cdr.detectChanges();
            });
        });
    }
    verifyChanges() {
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error(`The max value should be bigger than the min. See ${MIN_DOC_LINK$3} and ${MAX_DOC_LINK$3}.`);
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error(`The topView should be greater than bottomView. See ${BOTTOM_VIEW_DOC_LINK$1} and ${TOP_VIEW_DOC_LINK$1}.`);
        }
    }
    verifyValue(candidate) {
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error(`The 'value' should be a valid JavaScript Date instance. Check ${VALUE_DOC_LINK$5} for possible resolution.`);
        }
    }
    updateButtonState() {
        this.resolvedPromise.then(() => {
            this.isPrevDisabled = !this.viewList.canNavigate(this.prevView);
            this.isNextDisabled = !this.viewList.canNavigate(this.nextView);
            this.cdr.markForCheck();
        });
    }
}
MultiViewCalendarComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-multiviewcalendar',
                providers: [
                    BusViewService,
                    RANGE_CALENDAR_VALUE_ACCESSOR,
                    RANGE_CALENDAR_RANGE_VALIDATORS,
                    LocalizationService,
                    DisabledDatesService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.multiviewcalendar'
                    },
                    NavigationService
                ],
                selector: 'kendo-multiviewcalendar',
                template: `
    <ng-container kendoMultiViewCalendarLocalizedMessages
        i18n-today="kendo.multiviewcalendar.today|The label for the today button in the calendar header"
        today="TODAY"

        i18n-prevButtonTitle="kendo.multiviewcalendar.prevButtonTitle|The label for the previous button in the Multiview calendar"
        prevButtonTitle="Navigate to previous view"

        i18n-nextButtonTitle="kendo.multiviewcalendar.nextButtonTitle|The label for the next button in the Multiview calendar"
        nextButtonTitle="Navigate to next view"
    >
    </ng-container>
    <button
        class="k-button k-prev-view" type="button"
        [attr.aria-disabled]="isPrevDisabled"
        [disabled]="isPrevDisabled"
        [title]="prevButtonTitle"
        (click)="navigate(prevView)"
    >
        <span class="k-icon k-i-arrow-chevron-left"></span>
    </button>
    <kendo-calendar-horizontal
        [activeView]="activeViewEnum"
        [isActive]="isActive || isHovered"
        [cellTemplateRef]="activeCellTemplate()?.templateRef"
        [headerTitleTemplateRef]="headerTitleTemplate?.templateRef"
        [weekNumberTemplateRef]="weekNumberTemplate?.templateRef"
        [cellUID]="cellUID"
        [views]="views"
        [min]="min"
        [max]="max"
        [focusedDate]="focusedDate"
        [weekNumber]="weekNumber"
        [activeRangeEnd]="activeRangeEnd"
        [selectionRange]="selectionRange"
        [value]="value"
        (valueChange)="handleDateChange($event)"
        (cellEnter)="emitCellEvent(cellEnter, $event)"
        (cellLeave)="emitCellEvent(cellLeave, $event)"
    >
    </kendo-calendar-horizontal>
    <button
        class="k-button k-next-view" type="button"
        [attr.aria-disabled]="isNextDisabled"
        [disabled]="isNextDisabled"
        [title]="nextButtonTitle"
        (click)="navigate(nextView)"
    >
        <span class="k-icon k-i-arrow-chevron-right"></span>
    </button>
  `
            },] },
];
/** @nocollapse */
MultiViewCalendarComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ElementRef },
    { type: LocalizationService },
    { type: NavigationService },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: DisabledDatesService }
];
MultiViewCalendarComponent.propDecorators = {
    id: [{ type: Input }],
    focusedDate: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    rangeValidation: [{ type: Input }],
    disabledDatesRangeValidation: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    disabledDates: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    weekNumber: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    selectionRange: [{ type: Input }],
    views: [{ type: Input }],
    activeViewChange: [{ type: Output }],
    cellEnter: [{ type: Output }],
    cellLeave: [{ type: Output }],
    valueChange: [{ type: Output }],
    cellTemplate: [{ type: ContentChild, args: [CellTemplateDirective, { static: true },] }],
    cellTemplateRef: [{ type: Input, args: ['cellTemplate',] }],
    monthCellTemplate: [{ type: ContentChild, args: [MonthCellTemplateDirective, { static: true },] }],
    monthCellTemplateRef: [{ type: Input, args: ['monthCellTemplate',] }],
    yearCellTemplate: [{ type: ContentChild, args: [YearCellTemplateDirective, { static: true },] }],
    yearCellTemplateRef: [{ type: Input, args: ['yearCellTemplate',] }],
    decadeCellTemplate: [{ type: ContentChild, args: [DecadeCellTemplateDirective, { static: true },] }],
    decadeCellTemplateRef: [{ type: Input, args: ['decadeCellTemplate',] }],
    centuryCellTemplate: [{ type: ContentChild, args: [CenturyCellTemplateDirective, { static: true },] }],
    centuryCellTemplateRef: [{ type: Input, args: ['centuryCellTemplate',] }],
    weekNumberTemplate: [{ type: ContentChild, args: [WeekNumberCellTemplateDirective, { static: true },] }],
    weekNumberTemplateRef: [{ type: Input, args: ['weekNumberTemplate',] }],
    headerTitleTemplate: [{ type: ContentChild, args: [HeaderTitleTemplateDirective, { static: true },] }],
    headerTitleTemplateRef: [{ type: Input, args: ['headerTitleTemplate',] }],
    viewList: [{ type: ViewChild, args: [HorizontalViewListComponent,] }],
    widgetId: [{ type: HostBinding, args: ['attr.id',] }],
    widgetRole: [{ type: HostBinding, args: ['attr.role',] }],
    calendarTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }],
    ariaActivedescendant: [{ type: HostBinding, args: ['attr.aria-activedescendant',] }],
    handleBlur: [{ type: HostListener, args: ["blur",] }],
    handleFocus: [{ type: HostListener, args: ["focus",] }],
    handleMouseEnter: [{ type: HostListener, args: ["mouseenter",] }],
    handleMouseLeave: [{ type: HostListener, args: ["mouseleave",] }],
    handleMousedown: [{ type: HostListener, args: ["mousedown", ['$event'],] }],
    handleClick: [{ type: HostListener, args: ["click",] }],
    keydown: [{ type: HostListener, args: ["keydown", ["$event"],] }],
    enter: [{ type: HostListener, args: ["keydown.enter",] }]
};

/**
 * A directive which renders the content of the DateRange Popup. To define the cell template, nest an
 * `<ng-template>` tag with the `kendoRangePopupTemplate` directive inside the component tag.
 */
class DateRangePopupTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DateRangePopupTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangePopupTemplate]'
            },] },
];
/** @nocollapse */
DateRangePopupTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

const isActive = (cmp) => (cmp && cmp.isActive) || false;
const hasActiveContent = (popup) => popup && popup.hasActiveContent();
/**
 * A service that handles the communication between the components that are placed inside the DateRangeComponent.
 * For example, the start and end `DateInput` and `DateRangePopup` components.
 */
class DateRangeService {
    constructor() {
        /**
         * An Observable instance that notifies when the `activeRangeEnd` state is changed.
         */
        this.activeRangeEnd$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the `focusedDate` is changed.
         */
        this.focusedDate$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the end `DateInput` component is changed.
         * For example, when a new end `DateInput` is attached or when the old one is detached.
         */
        this.endInput$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the start `DateInput` component is changed.
         * For example, when a new start `DateInput` is attached or the old one is detached.
         */
        this.startInput$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the `DateRangePopup` component is changed.
         */
        this.dateRangePopup$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the state of the selection range is changed.
         */
        this.range$ = new BehaviorSubject(EMPTY_SELECTIONRANGE);
    }
    /**
     * Gets the current `activeRangeEnd` value.
     */
    get activeRangeEnd() {
        return this.activeRangeEnd$.value;
    }
    /**
     * Gets the current `focusedDate` value.
     */
    get focusedDate() {
        return this.focusedDate$.value;
    }
    /**
     * Gets the `min` range value.
     * The `min` value is extracted from the `start` DateInput value or the `min` value of the Calendar.
     */
    get min() {
        return (this.startInput$.value || {}).min || null;
    }
    /**
     * Gets the `max` range value.
     * The `max` value is extracted from the `end` DateInput value or the `max` value of the Calendar.
     */
    get max() {
        return (this.endInput$.value || {}).max || null;
    }
    /**
     * Gets the current `selectionRange` value.
     */
    get selectionRange() {
        return this.range$.value;
    }
    /**
     * Activates the registered `DateRangePopup` component.
     * The method opens the popup and focuses the calendar.
     */
    activatePopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!dateRangePopup) {
            return;
        }
        dateRangePopup.activate();
    }
    /**
     * Deactivates the registered `DateRangePopup` component.
     * The method closes the popup.
     */
    deactivatePopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.show = false;
    }
    /**
     * @hidden
     *
     * Deactivates the registered `DateRangePopup` component and fires the `cancel` event.
     * The method closes the popup.
     */
    cancelPopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.cancelPopup();
    }
    /**
     * Completes all observables to mitigate possible memory leaks.
     * Calls the method when a component that uses it is destroyed.
     */
    destroy() {
        this.activeRangeEnd$.complete();
        this.dateRangePopup$.complete();
        this.focusedDate$.complete();
        this.endInput$.complete();
        this.startInput$.complete();
        this.range$.complete();
    }
    /**
     * Returns `true` when an active component that is placed inside the `DateRangeComponent` is detected.
     * For example, the opened popup or the focused DateInput.
     *
     * @returns `true` if an active component is present.
     */
    hasActiveComponent() {
        const popup = this.dateRangePopup$.value;
        const isPopup = isActive(popup);
        const isStart = isActive(this.startInput$.value);
        const isEnd = isActive(this.endInput$.value);
        return isPopup || isStart || isEnd || hasActiveContent(popup) || false;
    }
    /**
     * Registers a new start `DateInput` component. Notifies all `startInput$` listeners.
     */
    registerStartInput(startInput) {
        this.startInput$.next(startInput);
    }
    /**
     * Registers a new end `DateInput` component. Notifies all `endInput$` listeners.
     */
    registerEndInput(endInput) {
        this.endInput$.next(endInput);
    }
    /**
     * Registers a new `DateRangePopup` component. Notifies all `dateRangePopup$` listeners.
     */
    registerPopup(dateRangePopup) {
        this.dateRangePopup$.next(dateRangePopup);
    }
    /**
     * Updates the `activeRangeEnd` value. Notifies all `activeRangeEnd$` listeners.
     */
    setActiveRangeEnd(activeRange) {
        if (!activeRange || this.activeRangeEnd === activeRange) {
            return;
        }
        this.activeRangeEnd$.next(activeRange);
    }
    /**
     * Updates the focused date. Notifies all `focusedDate$` listeners.
     */
    setFocusedDate(value) {
        if (isEqual(this.focusedDate$.value, value)) {
            return;
        }
        this.focusedDate$.next(value);
    }
    /**
     * Updates the selection range. Notifies all `range$` listeners.
     */
    setRange(range = EMPTY_SELECTIONRANGE) {
        this.range$.next(range);
    }
}
DateRangeService.decorators = [
    { type: Injectable },
];

/**
 * Represents the Kendo UI DateRangePopup component for Angular.
 *
 * @example
 * ```ts
 * import { DateInputsModule, DateRangeService } from '@progress/kendo-angular-dateinputs';
 *
 * _@Component({
 * providers: [DateRangeService],
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="popup.toggle()">Toggle</button>
 *  <kendo-daterange-popup [anchor]="anchor" #popup></kendo-daterange-popup>
 * `
 * })
 * export class AppComponent {
 * }
 * ```
 */
class DateRangePopupComponent {
    constructor(popupService, dateRangeService, zone, rtl) {
        this.popupService = popupService;
        this.dateRangeService = dateRangeService;
        this.zone = zone;
        this.rtl = rtl;
        /**
         * Controls the popup animation.
         * By default, the opening and closing animations are enabled.
         * For more information about controlling the popup animations,
         * refer to the article on [animations]({% slug animations_popup %}).
         */
        this.animate = true;
        /**
         * Configures the collision behavior of the popup.
         * For more information, refer to the article on
         * [viewport boundary detection]({% slug viewportboundarydetection_popup %}).
         */
        this.collision = { horizontal: 'fit', vertical: 'flip' };
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         * For more information, refer to the section on
         * [events]({% slug overview_datepicker %}#toc-events).
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         * For more information, refer to the section on
         * [events]({% slug overview_datepicker %}#toc-events).
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the calendar element is blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the calendar element is focused.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is closed either on `ESC` keypress or on leaving the viewport.
         */
        this.cancel = new EventEmitter();
        /**
         * @hidden
         */
        this.popupUID = guid();
        this.calendarSubscriptions = new Subscription(() => { });
        this.popupSubscriptions = new Subscription(() => { });
        this.resolvedPromise = Promise.resolve();
    }
    /**
     * The active calendar that is visible in the popup.
     *
     * > When the popup is closed, the property returns `null`.
     */
    get calendar() {
        return this._calendar;
    }
    set calendar(calendar) {
        this._calendar = calendar;
        this.subscribeFocusBlur(calendar);
    }
    /**
     * Gets the active state of the component.
     * When the opened calendar is active, returns `true`.
     */
    get isActive() {
        return this.calendar && this.calendar.isActive;
    }
    /**
     * Gets or sets the visibility state of the component.
     */
    set show(show) {
        if (this._show === show) {
            return;
        }
        const event = new PreventableEvent();
        if (show) {
            this.open.emit(event);
        }
        else {
            this.close.emit(event);
        }
        if (event.isDefaultPrevented()) {
            return;
        }
        this._toggle(show);
    }
    get show() {
        return this._show;
    }
    ngOnInit() {
        this.dateRangeService.registerPopup(this);
    }
    ngAfterViewInit() {
        this.calendarSubscriptions.add(this.contentCalendar.changes.subscribe((changes) => this.calendar = changes.first));
        this.calendarSubscriptions.add(this.viewCalendar.changes.subscribe((changes) => this.calendar = changes.first));
        if (isWindowAvailable()) {
            this.zone.runOutsideAngular(() => this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this)));
        }
    }
    ngOnDestroy() {
        this.destroyPopup();
        this.calendarSubscriptions.unsubscribe();
        if (this.activateSubscription) {
            this.activateSubscription.unsubscribe();
        }
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
            this.focusSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
    }
    /**
     *  Opens the popup component and focuses the calendar.
     */
    activate() {
        if (this.show === true) {
            return;
        }
        if (this.activateSubscription) {
            this.activateSubscription.unsubscribe();
        }
        this.show = true;
        this.zone.runOutsideAngular(() => {
            this.activateSubscription = merge(this.contentCalendar.changes, this.viewCalendar.changes)
                .pipe(filter(changes => changes && changes.first), map(changes => changes.first))
                .subscribe((calendar) => setTimeout(() => calendar.focus()));
        });
    }
    /**
     *  Focuses the calendar (if available).
     */
    focus() {
        if (this.calendar) {
            this.calendar.focus();
        }
    }
    /**
     * Checks if a focused element ids placed inside the popup.
     *
     * @return boolean;
     */
    hasActiveContent() {
        if (!isDocumentAvailable() || !this.popupRef) {
            return false;
        }
        return this.popupRef.popupElement.contains(document.activeElement);
    }
    /**
     * Toggles the visibility of the popup.
     * If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show The state of the popup.
     */
    toggle(show) {
        this.resolvedPromise.then(() => {
            this._toggle((show === undefined) ? !this.show : show);
        });
    }
    /**
     * @hidden
     *
     * Closes the popup and triggers the `cancel` event.
     */
    cancelPopup() {
        this.show = false;
        this.cancel.emit();
    }
    handleWindowBlur() {
        if (!this.show) {
            return;
        }
        if (hasObservers(this.close)) {
            this.zone.run(() => this.show = false);
        }
        else {
            this.show = false;
        }
    }
    handleMouseLeave() {
        this.dateRangeService.setRange(this.dateRangeService.selectionRange);
    }
    handleKeydown(event) {
        const { altKey, keyCode } = event;
        if (keyCode === Keys.Escape || (altKey && keyCode === Keys.ArrowUp)) {
            this.zone.run(() => this.cancelPopup());
        }
    }
    subscribeFocusBlur(calendar) {
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
            this.focusSubscription.unsubscribe();
        }
        if (!calendar) {
            return;
        }
        const nativeElement = calendar.element.nativeElement;
        this.blurSubscription = fromEvent(nativeElement, 'blur').subscribe(() => this.onBlur.emit());
        this.focusSubscription = fromEvent(nativeElement, 'focus').subscribe(() => this.onFocus.emit());
    }
    addPopupSubscriptions(...subscriptions) {
        if (!isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions = new Subscription();
        }
        subscriptions.map(s => this.popupSubscriptions.add(s));
    }
    get _appendTo() {
        const appendTo = this.appendTo;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    _toggle(show) {
        this._show = show;
        if (this.popupRef) {
            this.destroyPopup();
        }
        if (this._show) {
            const direction = this.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: this.anchor,
                anchorAlign: this.anchorAlign || { vertical: 'bottom', horizontal: direction },
                animate: this.animate,
                appendTo: this._appendTo,
                collision: this.collision,
                content: (this.contentTemplate || {}).templateRef || this.defaultTemplate,
                margin: this.margin,
                popupAlign: this.popupAlign || { vertical: 'top', horizontal: direction },
                positionMode: 'absolute'
            });
            const { popupElement, popupAnchorViewportLeave } = this.popupRef;
            popupElement.setAttribute('id', this.popupUID);
            this.addPopupSubscriptions(this.zone.runOutsideAngular(() => fromEvent(popupElement, 'keydown').subscribe(this.handleKeydown.bind(this))), fromEvent(popupElement, 'mouseleave').subscribe(this.handleMouseLeave.bind(this)), popupAnchorViewportLeave.subscribe(() => this.cancelPopup()));
        }
    }
    destroyPopup() {
        if (isPresent(this.popupRef)) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions.unsubscribe();
        }
    }
}
DateRangePopupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendo-daterange-popup',
                selector: 'kendo-daterange-popup',
                template: `
        <ng-container #container></ng-container>
        <ng-template #defaultTemplate>
            <kendo-multiviewcalendar kendoDateRangeSelection></kendo-multiviewcalendar>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
DateRangePopupComponent.ctorParameters = () => [
    { type: PopupService },
    { type: DateRangeService },
    { type: NgZone },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
DateRangePopupComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    defaultTemplate: [{ type: ViewChild, args: ['defaultTemplate',] }],
    contentTemplate: [{ type: ContentChild, args: [DateRangePopupTemplateDirective,] }],
    viewCalendar: [{ type: ViewChildren, args: [MultiViewCalendarComponent,] }],
    contentCalendar: [{ type: ContentChildren, args: [MultiViewCalendarComponent,] }],
    animate: [{ type: Input }],
    anchor: [{ type: Input }],
    anchorAlign: [{ type: Input }],
    appendTo: [{ type: Input }],
    collision: [{ type: Input }],
    popupAlign: [{ type: Input }],
    margin: [{ type: Input }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onBlur: [{ type: Output, args: ['blur',] }],
    onFocus: [{ type: Output, args: ['focus',] }],
    cancel: [{ type: Output }]
};

/**
 * Represents the Kendo UI DateRange component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-daterange>
 *      <kendo-dateinput kendoDateRangeStartInput [(value)]="dateRange.start"></kendo-dateinput>
 *      <kendo-dateinput kendoDateRangeEndInput [(value)]="dateRange.end"></kendo-dateinput>
 *  </kendo-daterange>
 * `
 * })
 * export class AppComponent {
 *   public dateRange: any = { start: null, end: null };
 * }
 * ```
 */
class DateRangeComponent {
    constructor() {
        /**
         * @hidden
         */
        this.showDefault = false;
    }
    get hasContentPopup() {
        return this.contentPopup.length > 0;
    }
    ngAfterContentInit() {
        this.showDefault = !this.hasContentPopup;
        this.subscription = this.contentPopup.changes.subscribe(() => {
            this.showDefault = !this.hasContentPopup;
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
DateRangeComponent.decorators = [
    { type: Component, args: [{
                providers: [DateRangeService],
                selector: 'kendo-daterange',
                template: `
        <ng-content></ng-content>
        <kendo-daterange-popup *ngIf="showDefault"></kendo-daterange-popup>
    `
            },] },
];
DateRangeComponent.propDecorators = {
    contentPopup: [{ type: ContentChildren, args: [DateRangePopupComponent,] }]
};

/**
 * @hidden
 */
class DateRangeInput {
    constructor(activeRangeEnd, dateRangeService, input, element, renderer, zone) {
        this.activeRangeEnd = activeRangeEnd;
        this.dateRangeService = dateRangeService;
        this.input = input;
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.navigateCalendarOnFocus = false;
        this.popupSubscriptions = new Subscription(() => { });
        this.subscriptions = new Subscription(() => { });
    }
    get isActiveEnd() {
        return this.dateRangeService.activeRangeEnd === this.activeRangeEnd;
    }
    get popupCalendarActivated() {
        const popup = this.dateRangeService.dateRangePopup$.value;
        return isPresent(popup) && isPresent(popup.calendar);
    }
    init() {
        if (this.input.value) {
            this.dateRangeService.setRange(this.getRange(this.input.value));
        }
        [
            this.input.onBlur.subscribe(() => this.deactivate()),
            this.input.onFocus.pipe(filter(() => !this.popupCalendarActivated)).subscribe(() => this.activate()),
            this.input.valueUpdate.subscribe(value => this.updateRange(value, 'change')),
            this.dateRangeService.activeRangeEnd$.subscribe(() => {
                if (this.navigateCalendarOnFocus) {
                    this.focusActiveDate();
                }
                this.toggleActiveClass(this.isActiveEnd);
            }),
            this.dateRangeService.dateRangePopup$.subscribe(popup => this.initPopup(popup)),
            this.dateRangeService.range$.subscribe(range => this.updateInputValue(range)),
            fromEvent(this.element.nativeElement, 'click').subscribe(() => this.activate()),
            fromEvent(this.element.nativeElement, 'keydown').subscribe((event) => this.togglePopup(event || {}))
        ].map(s => this.subscriptions.add(s));
    }
    destroy() {
        this.subscriptions.unsubscribe();
        this.unsubscribePopup();
    }
    initPopup(popup) {
        if (!popup) {
            this.unsubscribePopup();
            return;
        }
        if (!popup.anchor) {
            popup.anchor = this.element.nativeElement;
        }
        [
            popup.cancel.subscribe(() => this.isActiveEnd && this.input.focus()),
            popup.onFocus.subscribe(() => this.toggleActiveClass(this.isActiveEnd)),
            popup.onBlur.subscribe(() => this.deactivate())
        ].map(s => this.popupSubscriptions.add(s));
    }
    unsubscribePopup() {
        this.popupSubscriptions.unsubscribe();
        this.popupSubscriptions = new Subscription(() => { });
    }
    activate() {
        this.dateRangeService.setActiveRangeEnd(this.activeRangeEnd);
        this.dateRangeService.activatePopup();
    }
    deactivate() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.updateRange(this.input.value, 'blur');
                if (this.dateRangeService.hasActiveComponent()) {
                    return;
                }
                this.toggleActiveClass(false);
                this.zone.run(() => this.dateRangeService.deactivatePopup());
            });
        });
    }
    updateRange(value, correctOn) {
        const range = this.getRange(value, correctOn);
        if (range) {
            this.focusActiveDate();
            this.dateRangeService.setRange(range);
        }
    }
    togglePopup({ altKey, keyCode }) {
        if (keyCode === Keys.Escape) {
            this.dateRangeService.cancelPopup();
        }
        else if (altKey && keyCode === Keys.ArrowDown) {
            this.dateRangeService.activatePopup();
        }
    }
    focusActiveDate() {
        if (this.input.value && this.isActiveEnd) {
            this.dateRangeService.setFocusedDate(cloneDate(this.input.value));
        }
    }
    toggleActiveClass(show) {
        const action = show ? 'addClass' : 'removeClass';
        const nativeElement = this.element.nativeElement;
        if (nativeElement && nativeElement.querySelector) {
            this.renderer[action](nativeElement.querySelector('.k-dateinput-wrap'), 'k-state-focused');
        }
    }
}

/**
 * A directive which manages the end range selection.
 *
 * > You can use the DateRangeEndInputDirective only with a DateInput component.
 */
class DateRangeEndInputDirective extends DateRangeInput {
    constructor(rangeService, dateInput, element, renderer, zone) {
        super('end', rangeService, dateInput, element, renderer, zone);
        this.rangeService = rangeService;
        this.dateInput = dateInput;
        /**
         * Specifies the navigation behavior of the calendar when the active end is changed on input focus. When enabled,
         * the calendar navigates to the value of the focused input. Otherwise, the calendar displays the last picked date.
         *
         * By default, the automatic navigation behavior on input focus is disabled.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <h5>Toggle input focus to see the calendar navigating between range ends.</h5>
         *  <kendo-daterange>
         *      <kendo-dateinput kendoDateRangeStartInput [navigateCalendarOnFocus]="true" [(value)]="start"></kendo-dateinput>
         *      <kendo-dateinput kendoDateRangeEndInput [navigateCalendarOnFocus]="true" [(value)]="end"></kendo-dateinput>
         *  </kendo-daterange>
         * `
         * })
         * export class AppComponent {
         *   public start: Date = new Date(2018, 3, 10);
         *   public end: Date = new Date(2018, 10, 20);
         * }
         * ```
         */
        this.navigateCalendarOnFocus = false;
    }
    ngOnInit() {
        this.rangeService.registerEndInput(this.dateInput);
        super.init();
    }
    ngOnDestroy() {
        super.destroy();
    }
    getRange(value, correctOn) {
        const { min, max } = this.dateInput;
        if (!isInRange(value, min, max)) {
            return null;
        }
        const { start } = this.rangeService.selectionRange || EMPTY_SELECTIONRANGE;
        const shouldClamp = this.autoCorrectOn === correctOn && isPresent(value) && value < start;
        return shouldClamp ? clampRange(value) : { start, end: cloneDate(value) };
    }
    updateInputValue(range$$1) {
        const { end } = range$$1 || EMPTY_SELECTIONRANGE;
        const { min, max } = this.dateInput;
        if (isEqual(this.dateInput.value, end) || !isInRange(end, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(end));
        this.dateInput.notify();
    }
}
DateRangeEndInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangeEndInput]'
            },] },
];
/** @nocollapse */
DateRangeEndInputDirective.ctorParameters = () => [
    { type: DateRangeService },
    { type: DateInputComponent },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
DateRangeEndInputDirective.propDecorators = {
    autoCorrectOn: [{ type: Input }],
    navigateCalendarOnFocus: [{ type: Input }]
};

/**
 * A directive which manages the start selection range.
 *
 * > You can use the DateRangeStartInputDirective only with a DateInput component.
 */
class DateRangeStartInputDirective extends DateRangeInput {
    constructor(rangeService, dateInput, element, renderer, zone) {
        super('start', rangeService, dateInput, element, renderer, zone);
        this.rangeService = rangeService;
        this.dateInput = dateInput;
        /**
         * Specifies the navigation behavior of the calendar when the active end is changed on input focus.
         * When enabled, the calendar navigates to the value of the focused input. Otherwise, the calendar
         * displays the last picked date.
         *
         * By default, the automatic navigation behavior on input focus is disabled.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <h5>Toggle input focus to see the calendar navigating between range ends.</h5>
         *  <kendo-daterange>
         *      <kendo-dateinput kendoDateRangeStartInput [navigateCalendarOnFocus]="true" [(value)]="start"></kendo-dateinput>
         *      <kendo-dateinput kendoDateRangeEndInput [navigateCalendarOnFocus]="true" [(value)]="end"></kendo-dateinput>
         *  </kendo-daterange>
         * `
         * })
         * export class AppComponent {
         *   public start: Date = new Date(2018, 3, 10);
         *   public end: Date = new Date(2018, 10, 20);
         * }
         * ```
         */
        this.navigateCalendarOnFocus = false;
    }
    ngOnInit() {
        this.rangeService.registerStartInput(this.dateInput);
        super.init();
    }
    ngOnDestroy() {
        super.destroy();
    }
    getRange(value, correctOn) {
        const { min, max } = this.dateInput;
        if (!isInRange(value, min, max)) {
            return null;
        }
        const { end } = this.rangeService.selectionRange || EMPTY_SELECTIONRANGE;
        const shouldClamp = this.autoCorrectOn === correctOn && end && value > end;
        return shouldClamp ? clampRange(value) : { start: cloneDate(value), end };
    }
    updateInputValue(range$$1) {
        const { start } = range$$1 || EMPTY_SELECTIONRANGE;
        const { min, max } = this.dateInput;
        if (isEqual(this.dateInput.value, start) || !isInRange(start, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(start));
        this.dateInput.notify();
    }
}
DateRangeStartInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangeStartInput]'
            },] },
];
/** @nocollapse */
DateRangeStartInputDirective.ctorParameters = () => [
    { type: DateRangeService },
    { type: DateInputComponent },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
DateRangeStartInputDirective.propDecorators = {
    autoCorrectOn: [{ type: Input }],
    navigateCalendarOnFocus: [{ type: Input }]
};

/**
 * A directive which manages the MultiViewCalendar range selection.
 */
class DateRangeSelectionDirective {
    constructor(calendar, cdr, element, renderer, dateRangeService) {
        this.calendar = calendar;
        this.cdr = cdr;
        this.element = element;
        this.dateRangeService = dateRangeService;
        /**
         * Specifies the auto-correction behavior. If the start date is greater than the end date,
         * the directive fixes the date range to a single date either on input change or on blur
         * ([see example]({% slug autocorrect_daterange %}#toc-configuring-the-calendar-selection-directive)).
         *
         * By default, the auto-correction is triggered on change.
         * To disable this behavior, set the `autoCorrectOn` property to `none`.
         */
        this.autoCorrectOn = 'change';
        /**
         * Fires when the active range end is changed. For more information, refer to
         * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
         */
        this.activeRangeEndChange = new EventEmitter();
        /**
         * Fires when the selection range is changed. For more information, refer to
         * the section on [events]({% slug overview_multiviewcalendar %}#toc-events).
         */
        this.selectionRangeChange = new EventEmitter();
        this.calendarSubscriptions = new Subscription(() => { });
        this.dateRangeService = this.dateRangeService || new DateRangeService();
        renderer.setAttribute(element.nativeElement, 'aria-multiselectable', 'true');
    }
    /**
     * Gets or sets the selection range of the calendar. When a new range is set,
     * the connected DateRangeService notifies all related parties.
     */
    get selectionRange() {
        return this.calendar ? this.calendar.selectionRange : null;
    }
    set selectionRange(range$$1) {
        if (!this.isEqualCalendarRange(range$$1)) {
            this.setSelectionRange(range$$1);
        }
        if (!isEqualRange(this.dateRangeService.selectionRange, range$$1)) {
            this.dateRangeService.setRange(range$$1);
        }
        this.updateFocusedDate(range$$1);
    }
    /**
     * Gets or sets the active end of the selection range. This option determines which range end will be updated on
     * user interaction. When a new active end is set, the connected DateRangeService notifies all related parties.
     */
    /**
     * Specifies which end of the selection range will be marked as active. The active end gets modified upon user
     * interaction. When a new active end is set, the wired DateRangeService notifies all related components. For
     * example, the start and end DateInput components.
     *
     * > If the selection range is undefined, the value is ignored.
     */
    get activeRangeEnd() {
        return this.calendar.activeRangeEnd;
    }
    set activeRangeEnd(activeRange) {
        if (this.dateRangeService.activeRangeEnd === activeRange) {
            return;
        }
        this.calendar.activeRangeEnd = activeRange;
        this.dateRangeService.setActiveRangeEnd(activeRange);
    }
    get calendarRange() {
        return this.selectionRange || EMPTY_SELECTIONRANGE;
    }
    ngOnInit() {
        const calendar = this.calendar;
        const dateRangeService = this.dateRangeService;
        calendar.min = either(dateRangeService.min, calendar.min);
        calendar.max = either(dateRangeService.max, calendar.max);
        this.addSubscriptions(calendar.cellEnter.subscribe((value) => this.handleHover(value)), calendar.valueChange.subscribe((value) => this.handleChange(value)), dateRangeService.focusedDate$.subscribe(focusedDate => {
            if (!isEqual(calendar.focusedDate, focusedDate)) {
                calendar.focusedDate = focusedDate;
            }
        }), dateRangeService.activeRangeEnd$.subscribe(rangeEnd => {
            if (calendar.activeRangeEnd === rangeEnd) {
                return;
            }
            calendar.activeRangeEnd = rangeEnd;
            this.activeRangeEndChange.emit(rangeEnd);
            this.cdr.markForCheck();
        }), dateRangeService.range$.subscribe(range$$1 => {
            if (!this.isEqualCalendarRange(range$$1)) {
                this.acceptAndEmit(range$$1);
            }
            this.updateFocusedDate(range$$1);
        }), fromEvent(this.element.nativeElement, 'blur').subscribe(() => this.handleBlur()));
    }
    ngOnDestroy() {
        this.calendarSubscriptions.unsubscribe();
    }
    addSubscriptions(...subscriptions) {
        subscriptions.map(s => this.calendarSubscriptions.add(s));
    }
    isEqualCalendarRange(range$$1) {
        return isEqualRange(this.calendar.selectionRange, range$$1);
    }
    handleBlur() {
        const { start, end } = this.calendarRange;
        const autoCorrect = this.autoCorrectOn === 'blur' && start !== null && end !== null && end < start;
        if (autoCorrect) {
            this.dateRangeService.setRange(clampRange(start));
        }
    }
    handleChange(value) {
        const service = this.dateRangeService;
        const autoCorrect = this.autoCorrectOn === 'change' && this.shouldAutoCorrect(value);
        const activeEnd = this.calendar.activeRangeEnd !== 'end' ? 'end' : (autoCorrect ? 'end' : 'start');
        const range$$1 = autoCorrect ? clampRange(value) : this.updateRange(value);
        if (!isEqualRange(service.selectionRange, range$$1)) {
            this.acceptAndEmit(range$$1);
            service.setActiveRangeEnd(activeEnd);
            service.setRange(range$$1);
        }
    }
    handleHover(value) {
        if (this.hasCompleteRange()) {
            return;
        }
        const { start, end } = this.calendarRange;
        const activeRangeEnd = this.calendar.activeRangeEnd;
        const updateRange = (start && activeRangeEnd === 'end') || (end && activeRangeEnd === 'start');
        if (updateRange) {
            this.setSelectionRange(this.updateRange(value));
        }
    }
    hasCompleteRange() {
        const { start, end } = this.dateRangeService.selectionRange || EMPTY_SELECTIONRANGE;
        return Boolean(start) && Boolean(end);
    }
    shouldAutoCorrect(value) {
        const { end, start } = this.calendarRange;
        if (this.calendar.activeRangeEnd !== 'end') {
            return end !== null && value > end;
        }
        else {
            return start !== null && value < start;
        }
    }
    updateFocusedDate(range$$1) {
        if (!range$$1 || this.dateRangeService.focusedDate) {
            return;
        }
        this.dateRangeService.setFocusedDate(range$$1.start || range$$1.end);
    }
    updateRange(value) {
        const { end, start } = this.calendarRange;
        return this.calendar.activeRangeEnd !== 'end' ? ({ start: value, end }) : ({ start, end: value });
    }
    setSelectionRange(range$$1) {
        this.calendar.selectionRange = range$$1;
        this.calendar.writeValue(null);
    }
    acceptAndEmit(range$$1) {
        this.setSelectionRange(range$$1);
        this.selectionRangeChange.emit(range$$1);
    }
}
DateRangeSelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangeSelection]'
            },] },
];
/** @nocollapse */
DateRangeSelectionDirective.ctorParameters = () => [
    { type: MultiViewCalendarComponent },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DateRangeService, decorators: [{ type: Optional }] }
];
DateRangeSelectionDirective.propDecorators = {
    autoCorrectOn: [{ type: Input }],
    selectionRange: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    activeRangeEndChange: [{ type: Output }],
    selectionRangeChange: [{ type: Output }]
};

/* tslint:disable:directive-class-suffix directive-selector */
/**
 * @hidden
 */
class KForOfContext {
    constructor($implicit, kForOf, index, count) {
        this.$implicit = $implicit;
        this.kForOf = kForOf;
        this.index = index;
        this.count = count;
    }
    get first() { return this.index === 0; }
    get last() { return this.index === this.count - 1; }
    get even() { return this.index % 2 === 0; }
    get odd() { return !this.even; }
}
/**
 * @hidden
 */
class KForOf {
    constructor(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    set kForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    ngOnChanges(changes) {
        if ('kForOf' in changes) {
            const value = changes.kForOf.currentValue;
            if (this._differ || !value) {
                return;
            }
            try {
                this._differ = this._differs.find(value).create(this.kForTrackBy);
            }
            catch (e) {
                throw new Error(`Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'.`);
            }
        }
    }
    ngDoCheck() {
        if (this._differ) {
            const changes = this._differ.diff(this.kForOf);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    }
    _applyChanges(changes) {
        if (!isDocumentAvailable()) {
            return;
        }
        const viewContainerLength = this._viewContainer.length;
        const dataLength = this.kForOf.length;
        const tuples = {};
        changes.forEachOperation((record, _, currentIndex) => {
            if (currentIndex !== null) {
                tuples[currentIndex] = record.item;
            }
        });
        for (let i = viewContainerLength; i < dataLength; i++) {
            this._viewContainer.createEmbeddedView(this._template, new KForOfContext(null, this.kForOf, -1, -1), i);
        }
        for (let i = this._viewContainer.length; i > dataLength; i--) {
            this._viewContainer.remove(i - 1);
        }
        for (let i = 0; i < this._viewContainer.length; i++) {
            const view = this._viewContainer.get(i);
            view.context.index = i;
            view.context.count = length;
            view.context.$implicit = tuples[i] || null;
        }
    }
}
KForOf.decorators = [
    { type: Directive, args: [{ selector: '[kFor][kForOf]' },] },
];
/** @nocollapse */
KForOf.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: IterableDiffers }
];
KForOf.propDecorators = {
    kForOf: [{ type: Input }],
    kForTrackBy: [{ type: Input }],
    kForTemplate: [{ type: Input }]
};
/**
 * @hidden
 */
function getTypeNameForDebugging(type) {
    return type.name || typeof type;
}

/**
 * @hidden
 */
class HeaderComponent {
    constructor(bus, cdr, localization, intl, disabledDatesService) {
        this.bus = bus;
        this.cdr = cdr;
        this.localization = localization;
        this.intl = intl;
        this.disabledDatesService = disabledDatesService;
        this.navigate = true;
        this.todayAvailable = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.rangeLength = 1;
        this.today = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    get getComponentClass() {
        return true;
    }
    ngOnInit() {
        this.subscriptions
            .add(this.intl.changes.subscribe(this.intlChange.bind(this)))
            .add(this.localization.changes.subscribe(this.l10nChange.bind(this)))
            .add(this.disabledDatesService.changes.subscribe(this.setTodayAvailability.bind(this)));
    }
    ngOnChanges(_) {
        const service = this.bus.service(this.activeView);
        if (!service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        this.todayMessage = this.localization.get('today');
        this.setTodayAvailability();
        this.navigate = this.bus.canMoveUp(this.activeView);
        this.title = this.getTitle();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    handleTodayClick() {
        if (!this.todayAvailable) {
            return;
        }
        this.bus.moveToBottom(this.activeView);
        this.today.emit(dateInRange(getToday(), this.min, this.max));
    }
    handleNavigation() {
        if (!this.navigate) {
            return;
        }
        this.bus.moveUp(this.activeView);
    }
    intlChange() {
        if (this.currentDate && this.bus.service(this.activeView)) {
            this.title = this.getTitle();
            this.cdr.markForCheck();
        }
    }
    l10nChange() {
        this.todayMessage = this.localization.get('today');
        this.cdr.markForCheck();
    }
    getTitle() {
        if (!this.currentDate) {
            return '';
        }
        const service = this.bus.service(this.activeView);
        const take = this.rangeLength - 1;
        const title = service.title(this.currentDate);
        const nextDate = service.addToDate(this.currentDate, take);
        if (take < 1 || !service.isInRange(nextDate, this.min, this.max)) {
            return title;
        }
        return `${title} - ${service.title(nextDate)}`;
    }
    setTodayAvailability() {
        const today = getToday();
        const isTodayInRange = isInRange(today, getDate(this.min), getDate(this.max));
        const isDisabled = this.disabledDatesService.isDateDisabled(today);
        this.todayAvailable = isTodayInRange && !isDisabled;
        this.cdr.markForCheck();
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-calendar-header',
                template: `
    <span class="k-button k-bare k-title" [class.k-state-disabled]="!navigate"
        [kendoEventsOutsideAngular]="{
            click: handleNavigation
        }"
        [scope]="this">
        <ng-template [ngIf]="!templateRef">{{title}}</ng-template>
        <ng-template
            [ngIf]="templateRef"
            [ngTemplateOutlet]="templateRef"
            [ngTemplateOutletContext]="{ $implicit: title, activeView: activeViewValue, date: currentDate }"
        ></ng-template>
    </span>
    <span class="k-today" [class.k-state-disabled]="!todayAvailable"
        [kendoEventsOutsideAngular]="{
            click: handleTodayClick
        }"
        [scope]="this">
        {{todayMessage}}
    </span>
  `
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef },
    { type: LocalizationService },
    { type: IntlService },
    { type: DisabledDatesService }
];
HeaderComponent.propDecorators = {
    activeView: [{ type: Input }],
    currentDate: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    rangeLength: [{ type: Input }],
    templateRef: [{ type: Input }],
    today: [{ type: Output }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-header",] }]
};

/**
 * @hidden
 */
class WeekNamesService {
    constructor(intl) {
        this.intl = intl;
    }
    getWeekNames(includeWeekNumber = false) {
        const weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return includeWeekNumber ? [''].concat(weekNames) : weekNames;
    }
}
WeekNamesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WeekNamesService.ctorParameters = () => [
    { type: IntlService }
];

/**
 * @hidden
 */
class ViewComponent {
    constructor(bus, intl, cdr, weekService, element, zone, renderer, disabledDatesService) {
        this.bus = bus;
        this.intl = intl;
        this.cdr = cdr;
        this.weekService = weekService;
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.disabledDatesService = disabledDatesService;
        this.direction = 'vertical';
        this.isActive = true;
        this.change = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.weekNames = [];
        this.colSpan = 0;
        this.subscriptions = new Subscription();
        this.domEvents = [];
        this.subscriptions
            .add(this.intl.changes.subscribe(this.intlChange.bind(this)))
            .add(this.disabledDatesService.changes.subscribe(this.disabledDatesChange.bind(this)));
    }
    get weekNumber() {
        return this.showWeekNumbers && this.activeView === CalendarViewEnum.month;
    }
    set weekNumber(showWeekNumbers) {
        this.showWeekNumbers = showWeekNumbers;
    }
    ngOnInit() {
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        const generateWeekNames = this.isHorizontal() && this.weekNames.length === 0;
        if (generateWeekNames && (changes.weekNumber || changes.direction)) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.colSpan = this.service.rowLength(this.weekNumber);
        this.title = this.service.title(this.viewDate);
        this.updateData();
        if (changes.activeView) {
            this.currentCellIndex = null;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.domEvents.forEach(unsubscribeCallback => unsubscribeCallback());
    }
    isHorizontal() {
        return this.direction === 'horizontal';
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    firstDate(rowCtx) {
        const ctx = this.firstWeekDateContext(rowCtx);
        return ctx ? ctx.value : null;
    }
    getWeekNumber(date) {
        if (!this.weekNumber) {
            return null;
        }
        return weekInYear(date, this.intl.firstDay());
    }
    getWeekNumberContext(rowCtx) {
        const ctx = this.firstWeekDateContext(rowCtx);
        if (!this.weekNumber || !ctx) {
            return null;
        }
        const weekNumber = weekInYear(ctx.value, this.intl.firstDay()).toString();
        return {
            formattedValue: weekNumber,
            id: null,
            isFocused: false,
            isSelected: false,
            isWeekend: false,
            title: weekNumber,
            value: cloneDate(ctx.value)
        };
    }
    getStyles(context) {
        const { isRangeEnd, isRangeStart } = context;
        const isEndActive = this.activeRangeEnd === 'end' && isRangeEnd;
        const isStartActive = this.activeRangeEnd === 'start' && isRangeStart;
        return stringifyClassObject({
            'k-range-end': isRangeEnd,
            'k-range-mid': context.isRangeMid,
            'k-range-split-end': context.isRangeSplitEnd,
            'k-range-split-start': context.isRangeSplitStart,
            'k-range-start': isRangeStart,
            'k-state-active': isStartActive || isEndActive,
            'k-state-focused': this.isActive && context.isFocused,
            'k-state-selected': context.isSelected || isRangeStart || isRangeEnd,
            'k-today': context.isToday,
            'k-weekend': context.isWeekend,
            'k-state-disabled': context.isDisabled
        });
    }
    tableCellIndex(rowIndex, cellIndex) {
        return `${rowIndex}:${cellIndex}`;
    }
    firstWeekDateContext(rowCtx) {
        if (!this.weekNumber) {
            return null;
        }
        let idx = 0;
        let ctx = rowCtx[idx];
        while (!ctx && idx < rowCtx.length) {
            ctx = rowCtx[++idx];
        }
        return ctx;
    }
    updateData() {
        const time = this.selectedDate || getToday();
        const viewDate = setTime(this.viewDate, time);
        this.data = this.service.data({
            cellUID: this.cellUID,
            focusedDate: this.focusedDate,
            isActiveView: !this.bus.canMoveDown(this.activeView),
            max: this.max,
            min: this.min,
            selectedDate: this.selectedDate,
            selectionRange: this.selectionRange,
            viewDate: viewDate,
            isDateDisabled: this.disabledDatesService.isDateDisabled
        });
    }
    intlChange() {
        this.updateData();
        if (this.isHorizontal()) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.cdr.markForCheck();
    }
    disabledDatesChange() {
        this.updateData();
        this.cdr.markForCheck();
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', this.cellMouseoverHandler.bind(this)), this.renderer.listen(element, 'mouseleave', this.mouseLeaveHandler.bind(this)), this.renderer.listen(element, 'click', this.clickHandler.bind(this)));
    }
    clickHandler(args) {
        const cell = this.closestCell(args);
        if (cell) {
            const index = cell.getAttribute('data-cell-index');
            const cellContext = this.cellByIndex(index);
            if (!cellContext.isDisabled) {
                this.change.emit(cellContext.value);
            }
        }
    }
    mouseLeaveHandler() {
        if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    }
    cellMouseoverHandler(args) {
        const cell = this.closestCell(args);
        if (cell) {
            const index = cell.getAttribute('data-cell-index');
            if (this.currentCellIndex && this.currentCellIndex !== index) {
                this.emitCellLeave();
            }
            const value = this.cellByIndex(index).value;
            this.cellEnter.emit(value);
            this.currentCellIndex = index;
        }
        else if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    }
    closestCell(eventArgs) {
        return closestInScope(eventArgs.target, node => node.hasAttribute('data-cell-index'), this.element.nativeElement);
    }
    emitCellLeave() {
        const item = this.cellByIndex(this.currentCellIndex);
        if (item) {
            this.cellLeave.emit(item.value);
        }
        this.currentCellIndex = null;
    }
    cellByIndex(index) {
        const [rowIndex, cellIndex] = index.split(':');
        return this.data[rowIndex][cellIndex];
    }
}
ViewComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoCalendarView]',
                template: `
    <ng-template #emptyCell><td class="k-empty">&nbsp;</td></ng-template>
    <tr *ngIf="!isHorizontal()" role="row"><th scope="col" [colSpan]="colSpan">{{title}}</th></tr>
    <tr role="row" *ngIf="isMonthView() && isHorizontal()">
        <th *ngFor="let name of weekNames">{{name}}</th>
    </tr>
    <tr *kFor="let row of data; let rowIndex = index" role="row">
        <ng-template [ngIf]="weekNumber">
            <td class="k-alt" *ngIf="firstDate(row); else emptyCell">
                <ng-template [ngIf]="!weekNumberTemplateRef">
                    {{getWeekNumber(firstDate(row))}}
                </ng-template>
                <ng-template
                    [ngIf]="weekNumberTemplateRef"
                    [ngTemplateOutlet]="weekNumberTemplateRef"
                    [ngTemplateOutletContext]="{
                        $implicit: firstDate(row),
                        cellContext: getWeekNumberContext(row)
                    }"
                ></ng-template>
            </td>
        </ng-template>
        <ng-container *kFor="let cell of row; let cellIndex = index">
            <td
                *ngIf="cell; else emptyCell"
                role="gridcell"
                [attr.id]="cell.id"
                [attr.data-cell-index]="tableCellIndex(rowIndex, cellIndex)"
                [attr.aria-selected]="cell.isSelected || cell.isRangeStart || cell.isRangeMid || cell.isRangeEnd"
                [attr.aria-disabled]="cell.isDisabled"
                [ngClass]="getStyles(cell)"
                [title]="cell.title"
            >
                <span class="k-link">
                    <ng-template [ngIf]="!templateRef">{{cell.formattedValue}}</ng-template>
                    <ng-template
                        *ngIf="templateRef"
                        [ngTemplateOutlet]="templateRef"
                        [ngTemplateOutletContext]="{ $implicit: cell.value, cellContext: cell }"
                    ></ng-template>
                </span>
            </td>
        </ng-container>
    </tr>
  `
            },] },
];
/** @nocollapse */
ViewComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: IntlService },
    { type: ChangeDetectorRef },
    { type: WeekNamesService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: DisabledDatesService }
];
ViewComponent.propDecorators = {
    direction: [{ type: Input }],
    isActive: [{ type: Input }],
    activeView: [{ type: Input }],
    cellUID: [{ type: Input }],
    focusedDate: [{ type: Input }],
    selectedDate: [{ type: Input }],
    viewDate: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    selectionRange: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    weekNumber: [{ type: Input }],
    viewIndex: [{ type: Input }],
    templateRef: [{ type: Input }],
    weekNumberTemplateRef: [{ type: Input }],
    change: [{ type: Output }],
    cellEnter: [{ type: Output }],
    cellLeave: [{ type: Output }]
};

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `HeaderComponent`&mdash;The component that renders the UI for vertical navigation.
 * - `ViewComponent`&mdash;The component that renders the active Calendar view.
 */
class CalendarCommonModule {
}
CalendarCommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    KForOf,
                    HeaderComponent,
                    ViewComponent
                ],
                exports: [
                    KForOf,
                    HeaderComponent,
                    ViewComponent
                ],
                imports: [CommonModule, EventsModule]
            },] },
];

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 * - `NavigationItemTemplateDirective`&mdash;The navigation item template directive.
 */
class TemplatesModule {
}
TemplatesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CellTemplateDirective,
                    MonthCellTemplateDirective,
                    YearCellTemplateDirective,
                    DecadeCellTemplateDirective,
                    CenturyCellTemplateDirective,
                    WeekNumberCellTemplateDirective,
                    HeaderTitleTemplateDirective,
                    NavigationItemTemplateDirective
                ],
                exports: [
                    CellTemplateDirective,
                    MonthCellTemplateDirective,
                    YearCellTemplateDirective,
                    DecadeCellTemplateDirective,
                    CenturyCellTemplateDirective,
                    WeekNumberCellTemplateDirective,
                    HeaderTitleTemplateDirective,
                    NavigationItemTemplateDirective
                ]
            },] },
];

/**
 * @hidden
 */
class CalendarMessages extends ComponentMessages {
}
CalendarMessages.propDecorators = {
    today: [{ type: Input }]
};

/**
 * @hidden
 */
class CalendarLocalizedMessagesDirective extends CalendarMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
CalendarLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: CalendarMessages,
                        useExisting: forwardRef(() => CalendarLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoCalendarLocalizedMessages]'
            },] },
];
/** @nocollapse */
CalendarLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class CalendarCustomMessagesComponent extends CalendarMessages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CalendarCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: CalendarMessages,
                        useExisting: forwardRef(() => CalendarCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-calendar-messages',
                template: ``
            },] },
];
/** @nocollapse */
CalendarCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const COMPONENT_DIRECTIVES = [
    VirtualizationComponent
];
/**
 * @hidden
 *
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Virtualization component.
 */
class VirtualizationModule {
}
VirtualizationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES],
                imports: [CommonModule]
            },] },
];

/**
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 * - `NavigationItemTemplateDirective`&mdash;The navigation item template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendar module
 * import { CalendarModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, CalendarModule], // import Calendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class CalendarModule {
}
CalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CalendarComponent,
                    NavigationComponent,
                    CalendarCustomMessagesComponent,
                    CalendarLocalizedMessagesDirective,
                    ViewListComponent
                ],
                exports: [
                    CalendarComponent,
                    NavigationComponent,
                    CalendarCustomMessagesComponent,
                    CalendarLocalizedMessagesDirective,
                    ViewListComponent,
                    CalendarCommonModule,
                    TemplatesModule
                ],
                imports: [
                    CommonModule,
                    CalendarCommonModule,
                    IntlModule,
                    TemplatesModule,
                    VirtualizationModule,
                    EventsModule,
                    ResizeSensorModule
                ],
                providers: [
                    CalendarDOMService,
                    CenturyViewService,
                    DecadeViewService,
                    MonthViewService,
                    YearViewService,
                    WeekNamesService
                ]
            },] },
];

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    today: [{ type: Input }],
    prevButtonTitle: [{ type: Input }],
    nextButtonTitle: [{ type: Input }]
};

/**
 * @hidden
 */
class MultiViewCalendarLocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
MultiViewCalendarLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => MultiViewCalendarLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoMultiViewCalendarLocalizedMessages]'
            },] },
];
/** @nocollapse */
MultiViewCalendarLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class MultiViewCalendarCustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
MultiViewCalendarCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => MultiViewCalendarCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-multiviewcalendar-messages',
                template: ``
            },] },
];
/** @nocollapse */
MultiViewCalendarCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the MultiViewCalendar module
 * import { MultiViewCalendarModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, MultiViewCalendarModule], // import MultiViewCalendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 */
class MultiViewCalendarModule {
}
MultiViewCalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HorizontalViewListComponent,
                    MultiViewCalendarLocalizedMessagesDirective,
                    MultiViewCalendarCustomMessagesComponent,
                    MultiViewCalendarComponent
                ],
                exports: [
                    HorizontalViewListComponent,
                    MultiViewCalendarLocalizedMessagesDirective,
                    MultiViewCalendarCustomMessagesComponent,
                    MultiViewCalendarComponent,
                    CalendarCommonModule,
                    TemplatesModule
                ],
                imports: [CommonModule, CalendarCommonModule, IntlModule, TemplatesModule, PopupModule],
                providers: [
                    NavigationService,
                    CenturyViewService,
                    DecadeViewService,
                    MonthViewService,
                    YearViewService,
                    WeekNamesService
                ]
            },] },
];

/**
 * The exported package module.
 *
 * The package exports:
 * - `CalendarModule`&mdash;The calendar module.
 * - `MultiViewCalendarModule`&mdash;The multi-view calendar module.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendars module
 * import { CalendarsModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, CalendarsModule], // import the Calendars module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class CalendarsModule {
}
CalendarsModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    CalendarModule,
                    MultiViewCalendarModule
                ],
                imports: [
                    CalendarModule,
                    MultiViewCalendarModule
                ]
            },] },
];

/**
 * @hidden
 */
class DateInputMessages extends ComponentMessages {
}
DateInputMessages.propDecorators = {
    decrement: [{ type: Input }],
    increment: [{ type: Input }]
};

/**
 * @hidden
 */
class DateInputLocalizedMessagesDirective extends DateInputMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
DateInputLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: DateInputMessages,
                        useExisting: forwardRef(() => DateInputLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoDateInputLocalizedMessages]'
            },] },
];
/** @nocollapse */
DateInputLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class DateInputCustomMessagesComponent extends DateInputMessages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
DateInputCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: DateInputMessages,
                        useExisting: forwardRef(() => DateInputCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-dateinput-messages',
                template: ``
            },] },
];
/** @nocollapse */
DateInputCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateInput component.
 */
class DateInputModule {
}
DateInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DateInputComponent,
                    DateInputCustomMessagesComponent,
                    DateInputLocalizedMessagesDirective
                ],
                exports: [
                    DateInputComponent,
                    DateInputCustomMessagesComponent,
                    DateInputLocalizedMessagesDirective
                ],
                imports: [CommonModule, IntlModule, EventsModule]
            },] },
];

/**
 * @hidden
 */
class DatePickerMessages extends ComponentMessages {
}
DatePickerMessages.propDecorators = {
    today: [{ type: Input }],
    toggle: [{ type: Input }]
};

/**
 * @hidden
 */
class DatePickerLocalizedMessagesDirective extends DatePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
DatePickerLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: DatePickerMessages,
                        useExisting: forwardRef(() => DatePickerLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoDatePickerLocalizedMessages]'
            },] },
];
/** @nocollapse */
DatePickerLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class DatePickerCustomMessagesComponent extends DatePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
DatePickerCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: DatePickerMessages,
                        useExisting: forwardRef(() => DatePickerCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-datepicker-messages',
                template: ``
            },] },
];
/** @nocollapse */
DatePickerCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const ɵ0$e = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DatePicker component.
 */
class DatePickerModule {
}
DatePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DatePickerComponent,
                    DatePickerCustomMessagesComponent,
                    DatePickerLocalizedMessagesDirective
                ],
                exports: [
                    DatePickerComponent,
                    DatePickerCustomMessagesComponent,
                    DatePickerLocalizedMessagesDirective,
                    TemplatesModule
                ],
                imports: [
                    CommonModule,
                    DateInputModule,
                    CalendarModule,
                    IntlModule,
                    PopupModule,
                    TemplatesModule,
                    EventsModule
                ],
                providers: [{ provide: TOUCH_ENABLED, useValue: ɵ0$e }]
            },] },
];

const COMPONENT_DIRECTIVES$1 = [
    DateRangeComponent,
    DateRangePopupComponent,
    DateRangePopupTemplateDirective,
    DateRangeSelectionDirective,
    DateRangeStartInputDirective,
    DateRangeEndInputDirective
];
const COMPONENT_MODULES = [
    MultiViewCalendarModule,
    DateInputModule,
    PopupModule,
    EventsModule
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `DateRangeComponent`&mdash;The DateRange component class.
 * - `DateRangePopupComponent`&mdash;The DateRangePopup component class.
 * - `DateRangeSelectionDirective`&mdash;The MultiviewCalendar date range selection directive.
 * - `DateRangeEndInputDirective`&mdash;The end DateInput date range selection directive.
 * - `DateRangeStartInputDirective`&mdash;The start DateInput date range selection directive.
 * - `DateRangePopupTemplateDirective`&mdash;The DateRangePopup content template directive.
 * - `MultiViewCalendarModule`&mdash;The MultiViewCalendar module.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the DateRange module
 * import { DateRangeModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, DateRangeModule], // import DateRange module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class DateRangeModule {
}
DateRangeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES$1],
                exports: [COMPONENT_DIRECTIVES$1],
                imports: [CommonModule, COMPONENT_MODULES]
            },] },
];

const div$1 = domContainerFactory('div');
const ul$1 = domContainerFactory('ul');
const li$1 = domContainerFactory('li');
const listItem = () => li$1('<span>02</span>', 'k-item');
const list = () => ul$1([listItem()], 'k-reset');
const scrollable$1 = () => (div$1([list()], 'k-time-container k-content k-scrollable'));
const timeListWrapper = () => {
    if (!isDocumentAvailable()) {
        return null;
    }
    return div$1([div$1([scrollable$1()], 'k-time-list')], 'k-time-list-wrapper', { left: '-10000px', position: 'absolute' });
};
const TIMELIST_WRAPPER = timeListWrapper();
/**
 * @hidden
 */
class TimePickerDOMService {
    ensureHeights() {
        if (this.timeListHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    }
    calculateHeights(container) {
        if (!isDocumentAvailable()) {
            return;
        }
        const listContainer = container && container.querySelector('.k-time-list-container');
        const hostContainer = listContainer || document.body;
        const wrapper = hostContainer.appendChild(TIMELIST_WRAPPER);
        this.timeListHeight = wrapper.querySelector('.k-scrollable').getBoundingClientRect().height;
        this.itemHeight = wrapper.querySelector('li').getBoundingClientRect().height;
        hostContainer.removeChild(wrapper);
    }
    isActive(element) {
        if (!isDocumentAvailable() || !element) {
            return false;
        }
        return (element.nativeElement || element) === document.activeElement;
    }
}
TimePickerDOMService.decorators = [
    { type: Injectable },
];

const HOURS_IN_DAY = 24;
const clampToRange = (rangeValue) => (value) => value % rangeValue;
const clamp = clampToRange(HOURS_IN_DAY);
const stepper = (start, step) => (idx) => clamp(start + (idx * step));
const distanceFromMin = (value, min) => clamp(HOURS_IN_DAY + value - min);
const limit = (borderValue) => (barrier, value) => {
    const useBarrier = !value || getDate(barrier).getTime() === getDate(value).getTime();
    return useBarrier ? barrier : setHours(barrier, borderValue);
};
const limitDown = limit(0);
const limitUp = limit(HOURS_IN_DAY - 1);
/**
 * @hidden
 */
class HoursService {
    constructor(intl) {
        this.intl = intl;
        this.boundRange = false;
        this.insertUndividedMax = false;
    }
    apply(value, candidate) {
        return setHours(value, candidate.getHours());
    }
    configure(settings) {
        const { boundRange = this.boundRange, insertUndividedMax = this.insertUndividedMax, min = this.min, max = this.max, part, step = this.step } = settings;
        this.boundRange = boundRange;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = (hour) => {
            const date = setHours(MIDNIGHT_DATE, hour);
            return {
                text: this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    }
    data(selectedValue) {
        const [min] = this.range(selectedValue);
        const getHour = stepper(min, this.step);
        const convertToItem = (idx) => (this.toListItem(getHour(idx)));
        const data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    }
    isRangeChanged(min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    }
    limitRange(min, max, value) {
        return this.boundRange ? [limitDown(min, value), limitUp(max, value)] : [min, max];
    }
    total(value) {
        const last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        const missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    }
    selectedIndex(value) {
        return Math.ceil(this.divideByStep(value));
    }
    valueInList(value) {
        if (!value) {
            return true;
        }
        const matchMax = this.insertUndividedMax && this.lastHour(value) === value.getHours();
        return matchMax || !this.isMissing(value);
    }
    addLast(data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastHour(value)));
        }
        return data;
    }
    addMissing(data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        const missingItem = this.toListItem(value.getHours());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    }
    countFromMin(value) {
        const [min, max] = this.range(value);
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    }
    isMissing(value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    }
    isLastMissing(value) {
        return this.isMissing(setHours(this.max, this.lastHour(value)));
    }
    divideByStep(value) {
        return distanceFromMin(value.getHours(), this.min.getHours()) / this.step;
    }
    lastHour(value) {
        return this.range(value)[1];
    }
    range(value) {
        const [min, max] = this.limitRange(this.min, this.max, value);
        return [min.getHours(), max.getHours()];
    }
}
HoursService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HoursService.ctorParameters = () => [
    { type: IntlService }
];

const MINUTES_IN_HOUR = 60;
const clampToRange$1 = (rangeValue) => (value) => value % rangeValue;
const clamp$1 = clampToRange$1(MINUTES_IN_HOUR);
const stepper$1 = (start, step) => (idx) => clamp$1(start + (idx * step));
const distanceFromMin$1 = (value, min) => clamp$1(MINUTES_IN_HOUR + value - min);
const limit$1 = (borderValue) => (barrier, value) => {
    const useBarrier = !value || barrier.getHours() === value.getHours();
    return useBarrier ? barrier : setMinutes(barrier, borderValue);
};
const limitDown$1 = limit$1(0);
const limitUp$1 = limit$1(MINUTES_IN_HOUR - 1);
/**
 * @hidden
 */
class MinutesService {
    constructor(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    apply(value, candidate) {
        return setMinutes(value, candidate.getMinutes());
    }
    configure(settings) {
        const { insertUndividedMax = this.insertUndividedMax, min = this.min, max = this.max, part, step = this.step } = settings;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = (minute) => {
            const date = setMinutes(MIDNIGHT_DATE, minute);
            return {
                text: this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    }
    data(selectedValue) {
        const [min] = this.range(selectedValue);
        const getMinute = stepper$1(min, this.step);
        const convertToItem = (idx) => (this.toListItem(getMinute(idx)));
        const data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    }
    isRangeChanged(min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    }
    limitRange(min, max, value) {
        return [limitDown$1(min, value), limitUp$1(max, value)];
    }
    total(value) {
        const last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        const missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    }
    selectedIndex(value) {
        return Math.ceil(this.divideByStep(value));
    }
    valueInList(value) {
        if (!value) {
            return true;
        }
        const matchMax = this.insertUndividedMax && this.lastMinute(value) === value.getMinutes();
        return matchMax || !this.isMissing(value);
    }
    addLast(data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastMinute(value)));
        }
        return data;
    }
    addMissing(data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        const missingItem = this.toListItem(value.getMinutes());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    }
    countFromMin(value) {
        const [min, max] = this.range(value);
        return Math.floor(distanceFromMin$1(max, min) / this.step) + 1; /* include min */
    }
    isMissing(value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    }
    isLastMissing(value) {
        return this.isMissing(setMinutes(this.max, this.lastMinute(value)));
    }
    divideByStep(value) {
        return distanceFromMin$1(value.getMinutes(), this.min.getMinutes()) / this.step;
    }
    lastMinute(value) {
        return this.range(value)[1];
    }
    range(value) {
        const [min, max] = this.limitRange(this.min, this.max, value);
        return [min.getMinutes(), max.getMinutes()];
    }
}
MinutesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MinutesService.ctorParameters = () => [
    { type: IntlService }
];

const SECONDS_IN_HOUR = 60;
const clampToRange$2 = (rangeValue) => (value) => value % rangeValue;
const clamp$2 = clampToRange$2(SECONDS_IN_HOUR);
const stepper$2 = (start, step) => (idx) => clamp$2(start + (idx * step));
const distanceFromMin$2 = (value, min) => clamp$2(SECONDS_IN_HOUR + value - min);
const limit$2 = (borderValue) => (barrier, value) => {
    const useBarrier = !value || barrier.getHours() === value.getHours() && barrier.getMinutes() === value.getMinutes();
    return useBarrier ? barrier : setSeconds(barrier, borderValue);
};
const limitDown$2 = limit$2(0);
const limitUp$2 = limit$2(SECONDS_IN_HOUR - 1);
/**
 * @hidden
 */
class SecondsService {
    constructor(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    apply(value, candidate) {
        return setSeconds(value, candidate.getSeconds());
    }
    configure(settings) {
        const { insertUndividedMax = this.insertUndividedMax, min = this.min, max = this.max, part, step = this.step } = settings;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = (minute) => {
            const date = setSeconds(MIDNIGHT_DATE, minute);
            return {
                text: this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    }
    data(selectedValue) {
        const [min] = this.range(selectedValue);
        const getSecond = stepper$2(min, this.step);
        const convertToItem = (idx) => (this.toListItem(getSecond(idx)));
        const data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    }
    isRangeChanged(min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    }
    limitRange(min, max, value) {
        return [limitDown$2(min, value), limitUp$2(max, value)];
    }
    total(value) {
        const last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        const missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    }
    selectedIndex(value) {
        return Math.ceil(this.divideByStep(value));
    }
    valueInList(value) {
        if (!value) {
            return true;
        }
        const matchMax = this.insertUndividedMax && this.lastSecond(value) === value.getSeconds();
        return matchMax || !this.isMissing(value);
    }
    divideByStep(value) {
        return distanceFromMin$2(value.getSeconds(), this.min.getSeconds()) / this.step;
    }
    addLast(data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastSecond(value)));
        }
        return data;
    }
    addMissing(data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        const missingItem = this.toListItem(value.getSeconds());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    }
    countFromMin(value) {
        const [min, max] = this.range(value);
        return Math.floor(distanceFromMin$2(max, min) / this.step) + 1; /* include min */
    }
    isMissing(value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    }
    isLastMissing(value) {
        return this.isMissing(setSeconds(this.max, this.lastSecond(value)));
    }
    lastSecond(value) {
        return this.range(value)[1];
    }
    range(value) {
        const [min, max] = this.limitRange(this.min, this.max, value);
        return [min.getSeconds(), max.getSeconds()];
    }
}
SecondsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SecondsService.ctorParameters = () => [
    { type: IntlService }
];

const setHours$1 = (date, hours) => {
    const clone = cloneDate(date);
    clone.setHours(hours);
    return clone;
};
const isAM = (value) => value !== null && value < 12;
const isPM = (value) => value !== null && (!value || value > 11);
const inRange = (value, min, max) => ((!min && !max) || (value >= min && value <= max));
const inReverseRange = (value, min, max) => ((!min && !max) || value >= min || value <= max);
/**
 * @hidden
 */
class DayPeriodService {
    constructor(intl) {
        this.intl = intl;
    }
    /**
     * @hidden
     */
    apply(value, candidate) {
        const hour = value.getHours();
        const hourAM = isAM(hour);
        const candidateAM = isAM(candidate.getHours());
        if ((hourAM && candidateAM) || (!hourAM && !candidateAM)) {
            return value;
        }
        const [min, max = 24] = this.normalizedRange();
        const result = hour + (candidateAM ? -12 : 12);
        return setHours$1(value, Math.min(Math.max(min, result), (max || 24)));
    }
    /**
     * @hidden
     */
    configure(settings) {
        const { min = this.min, max = this.max, part = this.part } = settings;
        this.min = min;
        this.max = max;
        this.part = part;
    }
    /**
     * @hidden
     */
    data(_) {
        const names = this.part.names;
        if (!names) {
            return [];
        }
        const data = [];
        const [min, max] = this.normalizedRange();
        const dayPeriod = this.intl.dateFormatNames(names);
        if (isAM(min)) {
            data.push({ text: dayPeriod.am, value: setHours$1(this.min, min) });
        }
        if (isPM(max)) {
            data.push({ text: dayPeriod.pm, value: setHours$1(this.min, Math.max(12, max)) });
        }
        return this.min.getHours() !== min ? data.reverse() : data;
    }
    /**
     * @hidden
     */
    isRangeChanged(_, __) {
        return false;
    }
    /**
     * @hidden
     */
    limitRange(min, max, _) {
        return [min, max];
    }
    /**
     * @hidden
     */
    total() {
        const [min, max] = this.normalizedRange();
        if (!min && !max) {
            return 2;
        }
        if (min > 11 || max < 12) {
            return 1;
        }
        return 2;
    }
    /**
     * @hidden
     */
    selectedIndex(value) {
        if (!this.valueInList(value)) {
            return -1;
        }
        const index = Math.floor(value.getHours() / 12);
        return this.min.getHours() === this.normalizedRange()[0] ? index : (index === 0 ? 1 : 0);
    }
    /**
     * @hidden
     */
    valueInList(value) {
        const reverse = this.min.getHours() !== this.normalizedRange()[0];
        const isInRange = reverse ? inReverseRange : inRange;
        return isInRange(value.getHours(), this.min.getHours(), this.max.getHours());
    }
    normalizedRange() {
        const minHour = this.min.getHours();
        const maxHour = this.max.getHours();
        return [
            Math.min(minHour, maxHour),
            Math.max(minHour, maxHour)
        ];
    }
}
DayPeriodService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DayPeriodService.ctorParameters = () => [
    { type: IntlService }
];

/* tslint:disable:component-selector-name  component-selector-type */
const SNAP_THRESHOLD = 0.05; //% of the item height
const SCROLL_THRESHOLD = 2; //< 2px threshold
const nil = () => (null);
const getters = {
    35: (data, _) => data[data.length - 1],
    36: (data, _) => data[0],
    38: (data, index) => data[index - 1],
    40: (data, index) => data[index + 1]
};
const services$1 = {
    [TIME_PART.dayperiod]: DayPeriodService,
    [TIME_PART.hour]: HoursService,
    [TIME_PART.minute]: MinutesService,
    [TIME_PART.second]: SecondsService
};
/**
 * @hidden
 */
class TimeListComponent {
    constructor(element, injector, dom, renderer, zone) {
        this.element = element;
        this.injector = injector;
        this.dom = dom;
        this.renderer = renderer;
        this.zone = zone;
        this.min = cloneDate(MIDNIGHT_DATE);
        this.max = cloneDate(MAX_TIME);
        this.step = 1;
        this.disabled = false;
        this.valueChange = new EventEmitter();
        this.componentClass = true;
        this.animateToIndex = true;
        this.isActive = false;
        this.skip = 0;
        this.total = 60;
        this.data = [];
        this.indexToScroll = -1;
        this.domEvents = [];
    }
    get tabIndex() {
        return this.disabled ? undefined : 0;
    }
    ngOnChanges(changes) {
        if (changes.part) {
            this.service = this.injector.get(services$1[this.part.type]);
            this.service.configure(this.serviceSettings());
        }
        const value = this.value;
        const valueChanges = changes.value || {};
        const [min, max] = this.service.limitRange(this.min, this.max, value);
        if (this.service.isRangeChanged(min, max) || changes.min || changes.max || changes.step) {
            this.data = [];
            this.service.configure(this.serviceSettings({ min, max }));
        }
        // Skip the rendering of the list whenever possible
        if (!this.data.length || this.hasMissingValue(valueChanges)) {
            this.animateToIndex = false;
            this.data = this.service.data(value);
        }
        this.animateToIndex = this.animateToIndex && this.textHasChanged(valueChanges);
        this.total = this.service.total(value);
        this.indexToScroll = this.selectedIndex(value);
    }
    ngOnInit() {
        this.animateToIndex = true;
        this.dom.ensureHeights();
        this.itemHeight = this.dom.itemHeight;
        this.listHeight = this.dom.timeListHeight;
        this.topOffset = (this.listHeight - this.itemHeight) / 2;
        this.bottomOffset = this.listHeight - this.itemHeight;
        this.topThreshold = this.itemHeight * SNAP_THRESHOLD;
        this.bottomThreshold = this.itemHeight * (1 - SNAP_THRESHOLD);
        const translate = `translateY(${this.topOffset}px)`;
        this.style = { transform: translate, '-ms-transform': translate };
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
        this.domEvents.forEach(unbindCallback => unbindCallback());
    }
    ngAfterViewInit() {
        this.scrollOnce((index) => this.virtualization.scrollToIndex(index));
    }
    ngAfterViewChecked() {
        this.scrollOnce((index) => {
            const action = this.animateToIndex ? 'animateToIndex' : 'scrollToIndex';
            this.virtualization[action](index);
            this.animateToIndex = true;
        });
    }
    handleChange(dataItem) {
        const candidate = this.service.apply(this.value, dataItem.value);
        if (this.value.getTime() === candidate.getTime()) {
            return;
        }
        this.indexToScroll = this.data.indexOf(dataItem);
        this.value = candidate;
        this.valueChange.emit(candidate);
    }
    handleItemClick(args) {
        const item = closestInScope(args.target, node => node.hasAttribute('data-timelist-item-index'), this.element.nativeElement);
        if (item) {
            const index = item.getAttribute('data-timelist-item-index');
            this.handleChange(this.data[index]);
        }
    }
    /**
     * Focuses the host element of the TimeList.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timelist.focus()">Focus TimeList</button>
     *  <kendo-timelist #timelist></kendo-timelist>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    }
    /**
     * Blurs the TimeList component.
     */
    blur() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    }
    itemOffset(scrollTop) {
        const valueIndex = this.selectedIndex(this.value);
        const activeIndex = this.virtualization.activeIndex();
        const offset = this.virtualization.itemOffset(activeIndex);
        const distance = Math.abs(Math.ceil(scrollTop) - offset);
        if (valueIndex === activeIndex && distance < SCROLL_THRESHOLD) {
            return offset;
        }
        const scrollUp = valueIndex > activeIndex;
        const moveToNext = scrollUp && distance >= this.bottomThreshold || !scrollUp && distance > this.topThreshold;
        return moveToNext ? this.virtualization.itemOffset(activeIndex + 1) : offset;
    }
    hasMissingValue({ previousValue, currentValue }) {
        const isPreviousMissing = previousValue && !this.service.valueInList(previousValue);
        const isCurrentMissing = currentValue && !this.service.valueInList(currentValue);
        return isPreviousMissing || isCurrentMissing;
    }
    scrollOnce(action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    }
    serviceSettings(settings) {
        const defaults = {
            boundRange: false,
            insertUndividedMax: false,
            max: this.max,
            min: this.min,
            part: this.part,
            step: this.step
        };
        const result = Object.assign({}, defaults, settings);
        result.boundRange = result.part.type !== 'hour';
        return result;
    }
    selectedIndex(value) {
        if (!value) {
            return -1;
        }
        return this.service.selectedIndex(value);
    }
    textHasChanged({ previousValue, currentValue }) {
        if (!previousValue || !currentValue) {
            return false;
        }
        const oldData = this.data[this.selectedIndex(previousValue)];
        const newData = this.data[this.selectedIndex(currentValue)];
        return oldData && newData && oldData.text !== newData.text;
    }
    handleKeyDown(e) {
        const getter = getters[e.keyCode] || nil;
        const dataItem = getter(this.data, this.service.selectedIndex(this.value));
        if (dataItem) {
            this.handleChange(dataItem);
            e.preventDefault();
        }
    }
    bindEvents() {
        this.scrollSubscription = this.virtualization
            .scroll$()
            .pipe(debounceTime(100), map((e) => e.target.scrollTop), map((top) => this.itemOffset(top)), map((itemOffset) => this.virtualization.itemIndex(itemOffset)))
            .subscribe(index => {
            this.virtualization.scrollToIndex(index);
            this.handleChange(this.data[index]);
        });
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', () => !this.isActive && this.focus()), this.renderer.listen(element, 'click', () => this.focus()), this.renderer.listen(element, 'blur', () => this.isActive = false), this.renderer.listen(element, 'focus', () => this.isActive = true), this.renderer.listen(element, 'keydown', this.handleKeyDown.bind(this)));
    }
}
TimeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-timelist',
                template: `
    <kendo-virtualization
        [skip]="skip"
        [take]="total"
        [total]="total"
        [itemHeight]="itemHeight"
        [maxScrollDifference]="listHeight"
        [topOffset]="topOffset"
        [bottomOffset]="bottomOffset"
        class="k-time-container"
        role="presentation"
        tabindex="-1"
    >
        <ul [ngStyle]="style" class="k-reset"
            [kendoEventsOutsideAngular]="{
                click: handleItemClick
            }"
            [scope]="this"
        >
            <li *ngFor="let item of data; let index = index;" class="k-item"
                [attr.data-timelist-item-index]="index">
                <span>{{item.text}}</span>
            </li>
        </ul>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
TimeListComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: TimePickerDOMService },
    { type: Renderer2 },
    { type: NgZone }
];
TimeListComponent.propDecorators = {
    min: [{ type: Input }],
    max: [{ type: Input }],
    part: [{ type: Input }],
    step: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    virtualization: [{ type: ViewChild, args: [VirtualizationComponent, { static: true },] }],
    tabIndex: [{ type: HostBinding, args: ["attr.tabindex",] }],
    componentClass: [{ type: HostBinding, args: ["class.k-time-list",] }]
};

const isEqualTillMinute = (value, min) => value.getHours() === min.getHours() && value.getMinutes() === min.getMinutes();
const isEqualTillSecond = (value, min) => isEqualTillMinute(value, min) && value.getSeconds() === min.getSeconds();
const isEqualTillMillisecond = (value, min) => isEqualTillSecond(value, min) && value.getMilliseconds() === min.getMilliseconds();
const ɵ3$6 = (value) => value.getHours(), ɵ4$2 = (_, min) => min.getHours(), ɵ5$1 = (value) => value.getMinutes(), ɵ6$1 = (value, min) => isEqualTillMinute(value, min) ? min.getMinutes() : 0, ɵ7$1 = (value) => value.getSeconds(), ɵ8$1 = (value, min) => isEqualTillSecond(value, min) ? min.getSeconds() : 0, ɵ9$1 = (value) => value.getMilliseconds(), ɵ10$1 = (value, min) => isEqualTillMillisecond(value, min) ? min.getMilliseconds() : 0;
const defaultGetters = [
    {
        type: TIME_PART.hour,
        getter: ɵ3$6,
        minGetter: ɵ4$2
    }, {
        type: TIME_PART.minute,
        getter: ɵ5$1,
        minGetter: ɵ6$1
    }, {
        type: TIME_PART.second,
        getter: ɵ7$1,
        minGetter: ɵ8$1
    }, {
        type: TIME_PART.millisecond,
        getter: ɵ9$1,
        minGetter: ɵ10$1
    }
];
const left = getter => (origin, _) => getter(origin);
const right = getter => (_, candidate) => getter(candidate);
const convertToObject = (parts) => parts.reduce((obj, p) => { obj[p.type] = p.type; return obj; }, {});
const getterByPart = parts => g => parts[g.type] ? right(g.getter) : left(g.getter);
const gettersFactory = getters => parts => (getters.map(getterByPart(convertToObject(parts))));
const snapValue = (getter, minGetter, step) => (date, min) => {
    const value = getter(date);
    const minValue = minGetter(date, min);
    const rest = value - minValue;
    if (rest < 0) {
        return minValue;
    }
    const mod = rest % step;
    return value - mod + (mod > step / 2 ? step : 0);
};
const snappersFactory = (getters) => steps => (getters.map(g => {
    const step = steps[g.type];
    return step ? snapValue(g.getter, g.minGetter, step) : g.getter;
}));
/**
 * @hidden
 */
const generateGetters = gettersFactory(defaultGetters);
/**
 * @hidden
 */
const generateSnappers = snappersFactory(defaultGetters);
/**
 * @hidden
 */
const valueMerger = getters => (origin, candidate) => {
    origin.setHours(...getters.map(g => g(origin, candidate)));
    return origin;
};
/**
 * @hidden
 */
const snapTime = snappers => (candidate, min) => {
    const date = cloneDate(candidate);
    date.setHours(...snappers.map(s => s(date, min)));
    return date;
};

const listReducer = (state, list, idx, all) => {
    if (state.length || !list.isActive) {
        return state;
    }
    return [{
            next: all[idx + 1] || list,
            prev: all[idx - 1] || list
        }];
};
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
})(Direction || (Direction = {}));
/**
 * @hidden
 *
 * Represents the Kendo UI TimeSelector component for Angular.
 */
class TimeSelectorComponent {
    constructor(localization, cdr, element, intl, dom, zone, renderer, pickerService) {
        this.localization = localization;
        this.cdr = cdr;
        this.element = element;
        this.intl = intl;
        this.dom = dom;
        this.zone = zone;
        this.renderer = renderer;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.componentClass = true;
        /**
         * Specifies the time format used to display the time list columns.
         */
        this.format = 't';
        /**
         * Specifies the smallest valid time value.
         */
        this.min = cloneDate(MIN_TIME);
        /**
         * Specifies the biggest valid time value.
         */
        this.max = cloneDate(MAX_TIME);
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Set** button in the popup.
         */
        this.setButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `disabled` property of the TimeSelector and determines whether the component is active.
         */
        this.disabled = false;
        /**
         * Specifies the value of the TimeSelector component.
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user cancels the selected value.
         */
        this.valueReject = new EventEmitter();
        this.isActive = false;
        this.showNowButton = true;
        this._activeListIndex = -1;
        this._steps = {};
        this.domEvents = [];
        if (this.pickerService) {
            this.pickerService.timeSelector = this;
        }
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    /**
     * Configures the incremental steps of the TimeSelector.
     *
     * The available options are:
     * - `hour: Number`&mdash;Controls the incremental step of the hour value.
     * - `minute: Number`&mdash;Controls the incremental step of the minute value.
     * - `second: Number`&mdash;Controls the incremental step of the second value.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timeselector format="HH:mm:ss" [steps]="steps"></kendo-timeselector>
     * `
     * })
     * export class AppComponent {
     *   public steps = { hour: 2, minute: 15, second: 15 };
     * }
     * ```
     *
     * > If the incremental step is greater than `1`, the **Now** button will be hidden.
     */
    set steps(steps) {
        this._steps = steps || {};
    }
    get steps() {
        return this._steps;
    }
    set current(value) {
        this._current = timeInRange(this.snapTime(cloneDate(value || MIDNIGHT_DATE), this.min), this.min, this.max);
        if (!NgZone.isInAngularZone()) {
            this.cdr.detectChanges();
        }
    }
    get current() {
        return this._current;
    }
    get activeListIndex() {
        return this._activeListIndex;
    }
    set activeListIndex(value) {
        this._activeListIndex = value;
        if (!this.timeListWrappers || !this.timeListWrappers.length) {
            return;
        }
        this.timeListWrappers.forEach(listWrapper => {
            this.renderer.removeClass(listWrapper.nativeElement, 'k-state-focused');
        });
        if (value >= 0) {
            const listIndex = this.listIndex(value);
            const focusedWrapper = this.timeListWrappers.toArray()[listIndex];
            if (focusedWrapper) {
                this.renderer.addClass(focusedWrapper.nativeElement, 'k-state-focused');
            }
        }
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        if (this.localization) {
            this.subscriptions.add(this.localization
                .changes
                .subscribe(() => this.cdr.markForCheck()));
        }
        this.dom.calculateHeights(this.element.nativeElement);
        this.init();
        this.bindEvents();
    }
    /**
     * @hidden
     */
    ngOnChanges(_) {
        this.init();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.timeSelector = null;
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
    }
    /**
     * Focuses the TimeSelector component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timeselector.focus()">Focus time picker</button>
     *  <kendo-timeselector #timeselector></kendo-timeselector>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        const list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.focus();
    }
    /**
     * Blurs the TimeSelector component.
     */
    blur() {
        const list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.blur();
    }
    /**
     * @hidden
     */
    handleAccept() {
        this.handleChange(this.mergeValue(cloneDate(this.value || getDate(getNow())), this.current));
    }
    /**
     * @hidden
     */
    handleNow() {
        this.current = getNow();
        this.handleChange(this.current);
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    handleReject() {
        this.current = this.value;
        this.valueReject.emit();
    }
    /**
     * @hidden
     */
    handleFocus(args) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.emitFocus(args);
    }
    /**
     * @hidden
     */
    handleListFocus(args) {
        const index = parseInt(args.target.getAttribute('data-timelist-index'), 10);
        this.activeListIndex = index;
        this.handleFocus(args);
    }
    /**
     * @hidden
     */
    handleBlur(args) {
        const currentTarget = currentFocusTarget(args);
        if (currentTarget && this.containsElement(currentTarget)) {
            return;
        }
        this.activeListIndex = -1;
        this.isActive = false;
        this.emitBlur(args);
    }
    /**
     * @hidden
     */
    containsElement(element) {
        return Boolean(closest(element, node => node === this.element.nativeElement));
    }
    partStep(part) {
        return this.steps[part.type] || 1;
    }
    init(changes) {
        if (!changes || hasChange(changes, 'format')) {
            this.dateFormatParts = this.intl.splitDateFormat(this.format);
            this.mergeValue = valueMerger(generateGetters(this.dateFormatParts));
        }
        if (!changes || hasChange(changes, 'steps')) {
            this.snapTime = snapTime(generateSnappers(this.steps));
        }
        if (!changes || hasChange(changes, 'value')) {
            this.current = this.value;
        }
        this.showNowButton = !this.hasSteps() && this.nowButton && isInTimeRange(getNow(), this.min, this.max);
    }
    focusList(dir) {
        if (!this.timeLists.length) {
            return;
        }
        this.timeLists.reduce(listReducer, [])
            .map(state => dir === Direction.Right ? state.next : state.prev)
            .map(list => list && list.focus());
    }
    handleChange(value) {
        this.value = value;
        this.valueChange.emit(cloneDate(value));
    }
    hasActiveButton() {
        if (!this.accept) {
            return false;
        }
        return [this.accept, this.cancel, this.now].reduce((isActive, el) => isActive || this.dom.isActive(el), false);
    }
    hasSteps() {
        const keys = Object.keys(this.steps);
        return keys.length !== keys.reduce((acc, k) => acc + this.steps[k], 0);
    }
    intlChange() {
        this.dateFormatParts = this.intl.splitDateFormat(this.format);
        this.mergeValue = valueMerger(generateGetters(this.dateFormatParts));
        this.cdr.markForCheck();
    }
    bindEvents() {
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.domEvents.push(this.renderer.listen(this.element.nativeElement, 'keydown', this.handleKeydown.bind(this)));
            });
        }
    }
    handleKeydown(args) {
        const { keyCode, altKey } = args;
        // reserve the alt + arrow key commands for the picker
        const arrowKeyPressed = [Keys.ArrowLeft, Keys.ArrowRight].indexOf(keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && altKey) {
            return;
        }
        if (keyCode === Keys.Enter && !this.hasActiveButton()) {
            this.handleAccept();
        }
        else if (keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight) {
            this.focusList(keyCode === Keys.ArrowLeft ? Direction.Left : Direction.Right);
        }
    }
    emitBlur(args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    }
    emitFocus(args) {
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    }
    listIndex(partIndex) {
        let listIdx = 0;
        let partIdx = 0;
        while (partIdx < partIndex) {
            if (this.dateFormatParts[partIdx].type !== 'literal') {
                listIdx++;
            }
            partIdx++;
        }
        return listIdx;
    }
}
TimeSelectorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-timeselector',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.timeselector'
                    }
                ],
                selector: 'kendo-timeselector',
                template: `
        <ng-container kendoTimeSelectorLocalizedMessages
            i18n-accept="kendo.timeselector.accept|The Accept button text in the timeselector component"
            accept="Set"

            i18n-acceptLabel="kendo.timeselector.acceptLabel|The label for the Accept button in the timeselector component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timeselector.cancel|The Cancel button text in the timeselector component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timeselector.cancelLabel|The label for the Cancel button in the timeselector component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timeselector.now|The Now button text in the timeselector component"
            now="Now"

            i18n-nowLabel="kendo.timeselector.nowLabel|The label for the Now button in the timeselector component"
            nowLabel="Select now"
        >
        </ng-container>
        <div class="k-time-header">
            <span class="k-title">
                {{ intl.formatDate(current, format) }}
            </span>
            <button
                #now
                *ngIf="showNowButton"
                class="k-button k-bare k-time-now" type="button"
                [attr.title]="localization.get('nowLabel')"
                [attr.aria-label]="localization.get('nowLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleNow,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('now')}}</button>
        </div>
        <div class="k-time-list-container">
            <span class="k-time-highlight"></span>
            <ng-template ngFor [ngForOf]="dateFormatParts" let-part let-idx="index">
                <div
                    #listWrapper
                    class="k-time-list-wrapper"
                    role="presentation" tabindex="-1"
                    *ngIf="part.type !== 'literal'"
                >
                    <span class="k-title">{{intl.dateFieldName(part)}}</span>
                    <kendo-timelist
                        [min]="min"
                        [max]="max"
                        [part]="part"
                        [step]="partStep(part)"
                        [disabled]="disabled"
                        [(value)]="current"
                        [kendoEventsOutsideAngular]="{
                            focus: handleListFocus,
                            blur: handleBlur
                        }"
                        [scope]="this"
                        [attr.data-timelist-index]="idx"
                    ></kendo-timelist>
                </div>
                <div class="k-time-separator" *ngIf="part.type === 'literal'">
                    {{part.pattern}}
                </div>
            </ng-template>
        </div>
        <div class="k-time-footer k-action-buttons" *ngIf="setButton || cancelButton">
            <button
                #cancel
                *ngIf="cancelButton"
                class="k-button k-time-cancel" type="button"
                [attr.title]="localization.get('cancelLabel')"
                [attr.aria-label]="localization.get('cancelLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleReject,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('cancel')}}</button>
            <button
                #accept
                *ngIf="setButton"
                type="button"
                class="k-time-accept k-button k-primary"
                [attr.title]="localization.get('acceptLabel')"
                [attr.aria-label]="localization.get('acceptLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleAccept,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('accept')}}</button>
        </div>
    `
            },] },
];
/** @nocollapse */
TimeSelectorComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: IntlService },
    { type: TimePickerDOMService },
    { type: NgZone },
    { type: Renderer2 },
    { type: PickerService, decorators: [{ type: Optional }] }
];
TimeSelectorComponent.propDecorators = {
    accept: [{ type: ViewChild, args: ['accept',] }],
    cancel: [{ type: ViewChild, args: ['cancel',] }],
    now: [{ type: ViewChild, args: ['now',] }],
    timeLists: [{ type: ViewChildren, args: [TimeListComponent,] }],
    timeListWrappers: [{ type: ViewChildren, args: ['listWrapper',] }],
    componentClass: [{ type: HostBinding, args: ['class.k-timeselector',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    cancelButton: [{ type: Input }],
    setButton: [{ type: Input }],
    nowButton: [{ type: Input }],
    disabled: [{ type: Input }],
    steps: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    valueReject: [{ type: Output }]
};

/**
 * @hidden
 */
class TimePickerMessages extends ComponentMessages {
}
TimePickerMessages.propDecorators = {
    accept: [{ type: Input }],
    acceptLabel: [{ type: Input }],
    cancel: [{ type: Input }],
    cancelLabel: [{ type: Input }],
    now: [{ type: Input }],
    nowLabel: [{ type: Input }],
    toggle: [{ type: Input }]
};

/**
 * @hidden
 */
class TimePickerLocalizedMessagesDirective extends TimePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
TimePickerLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: TimePickerMessages,
                        useExisting: forwardRef(() => TimePickerLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoTimePickerLocalizedMessages]'
            },] },
];
/** @nocollapse */
TimePickerLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class TimePickerCustomMessagesComponent extends TimePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
TimePickerCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: TimePickerMessages,
                        useExisting: forwardRef(() => TimePickerCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-timepicker-messages',
                template: ``
            },] },
];
/** @nocollapse */
TimePickerCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class TimeSelectorLocalizedMessagesDirective extends TimePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
TimeSelectorLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: TimePickerMessages,
                        useExisting: forwardRef(() => TimeSelectorLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoTimeSelectorLocalizedMessages]'
            },] },
];
/** @nocollapse */
TimeSelectorLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 *
 * Custom component messages override default component messages.
 */
class TimeSelectorCustomMessagesComponent extends TimePickerMessages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
TimeSelectorCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: TimePickerMessages,
                        useExisting: forwardRef(() => TimeSelectorCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-timeselector-messages',
                template: ``
            },] },
];
/** @nocollapse */
TimeSelectorCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const COMPONENT_DIRECTIVES$2 = [
    TimePickerLocalizedMessagesDirective,
    TimeListComponent,
    TimePickerCustomMessagesComponent,
    TimePickerComponent,
    TimeSelectorLocalizedMessagesDirective,
    TimeSelectorCustomMessagesComponent,
    TimeSelectorComponent
];
const COMPONENT_MODULES$1 = [
    DateInputModule,
    IntlModule,
    PopupModule,
    VirtualizationModule,
    EventsModule
];
const ɵ0$n = touchEnabled;
const providers = [
    TimePickerDOMService,
    HoursService,
    MinutesService,
    SecondsService,
    DayPeriodService,
    {
        provide: TOUCH_ENABLED,
        useValue: ɵ0$n
    }
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TimePicker component.
 */
class TimePickerModule {
}
TimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES$2],
                exports: [COMPONENT_DIRECTIVES$2],
                imports: [CommonModule, ...COMPONENT_MODULES$1],
                providers: providers
            },] },
];

/**
 * @hidden
 */
class Messages$1 extends ComponentMessages {
}
Messages$1.propDecorators = {
    toggle: [{ type: Input }],
    dateTab: [{ type: Input }],
    dateTabLabel: [{ type: Input }],
    timeTab: [{ type: Input }],
    timeTabLabel: [{ type: Input }],
    accept: [{ type: Input }],
    acceptLabel: [{ type: Input }],
    cancel: [{ type: Input }],
    cancelLabel: [{ type: Input }],
    today: [{ type: Input }],
    now: [{ type: Input }],
    nowLabel: [{ type: Input }]
};

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
class DateTimePickerCustomMessagesComponent extends Messages$1 {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
DateTimePickerCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages$1,
                        useExisting: forwardRef(() => DateTimePickerCustomMessagesComponent)
                    }
                ],
                selector: 'kendo-datetimepicker-messages',
                template: ``
            },] },
];
/** @nocollapse */
DateTimePickerCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages$1 {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages$1,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoDateTimePickerLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

const COMPONENT_DIRECTIVES$3 = [
    DateTimePickerComponent,
    DateTimePickerCustomMessagesComponent,
    LocalizedMessagesDirective
];
const ɵ0$o = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateTimePicker component.
 */
class DateTimePickerModule {
}
DateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ...COMPONENT_DIRECTIVES$3
                ],
                exports: [
                    ...COMPONENT_DIRECTIVES$3,
                    TemplatesModule
                ],
                imports: [
                    CommonModule,
                    IntlModule,
                    DateInputModule,
                    CalendarModule,
                    TimePickerModule,
                    PopupModule,
                    EventsModule,
                    TemplatesModule
                ],
                providers: [
                    { provide: TOUCH_ENABLED, useValue: ɵ0$o }
                ]
            },] },
];

const COMPONENT_MODULES$2 = [
    CalendarsModule,
    DateInputModule,
    DatePickerModule,
    TimePickerModule,
    DateRangeModule,
    DateTimePickerModule
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Date Inputs components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Date Inputs module
 * import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, DateInputsModule], // import the Date Inputs module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class DateInputsModule {
}
DateInputsModule.decorators = [
    { type: NgModule, args: [{
                exports: COMPONENT_MODULES$2,
                imports: COMPONENT_MODULES$2
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarCommonModule, CALENDAR_RANGE_VALIDATORS, CALENDAR_VALUE_ACCESSOR, KENDO_INPUT_PROVIDER, KForOf, KForOfContext, HeaderComponent, HorizontalViewListComponent, CalendarMessages, MultiViewCalendarCustomMessagesComponent, Messages, RANGE_CALENDAR_RANGE_VALIDATORS, RANGE_CALENDAR_VALUE_ACCESSOR, NavigationComponent, BusViewService, CenturyViewService, DecadeViewService, DisabledDatesService, CalendarDOMService, MonthViewService, NavigationService, ScrollSyncService, WeekNamesService, YearViewService, TemplatesModule, CellTemplateDirective, CenturyCellTemplateDirective, DecadeCellTemplateDirective, HeaderTitleTemplateDirective, MonthCellTemplateDirective, NavigationItemTemplateDirective, WeekNumberCellTemplateDirective, YearCellTemplateDirective, ViewListComponent, ViewComponent, PickerService, DateInputMessages, DatePickerMessages, DateRangeInput, DateRangePopupTemplateDirective, DateTimePickerCustomMessagesComponent, LocalizedMessagesDirective, Messages$1, TimePickerMessages, TimePickerCustomMessagesComponent, TimeSelectorCustomMessagesComponent, DayPeriodService, TimePickerDOMService, HoursService, MinutesService, SecondsService, TimeListComponent, TimeSelectorComponent, TOUCH_ENABLED, ScrollerService, DEFAULT_SCROLLER_FACTORY, SCROLLER_FACTORY_TOKEN, VirtualizationComponent, VirtualizationModule, CalendarComponent, DateInputComponent, DatePickerComponent, TimePickerComponent, DateTimePickerComponent, MultiViewCalendarComponent, DateRangeComponent, DateRangePopupComponent, DateRangeEndInputDirective, DateRangeStartInputDirective, DateRangeSelectionDirective, CalendarModule, CalendarsModule, DateInputModule, DatePickerModule, DateInputsModule, TimePickerModule, DateTimePickerModule, MultiViewCalendarModule, DateRangeModule, DateRangeService, CalendarCustomMessagesComponent, DateInputCustomMessagesComponent, DatePickerCustomMessagesComponent, PreventableEvent, CalendarLocalizedMessagesDirective, MultiViewCalendarLocalizedMessagesDirective, DateInputLocalizedMessagesDirective, DatePickerLocalizedMessagesDirective, TimePickerLocalizedMessagesDirective, TimeSelectorLocalizedMessagesDirective };
