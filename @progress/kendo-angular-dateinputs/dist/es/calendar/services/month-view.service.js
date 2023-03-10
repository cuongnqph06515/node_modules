/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { addDays, addWeeks, addMonths, cloneDate, dayOfWeek, durationInMonths, getDate, firstDayOfMonth, lastDayOfMonth, createDate } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 7;
var ROWS_LENGTH = 6;
var ACTIONS = (_a = {},
    _a[Action.Left] = function (date) { return addDays(date, -1); },
    _a[Action.Up] = function (date) { return addWeeks(date, -1); },
    _a[Action.Right] = function (date) { return addDays(date, 1); },
    _a[Action.Down] = function (date) { return addWeeks(date, 1); },
    _a[Action.PrevView] = function (date) { return addMonths(date, -1); },
    _a[Action.NextView] = function (date) { return addMonths(date, 1); },
    _a[Action.FirstInView] = function (date) { return firstDayOfMonth(date); },
    _a[Action.LastInView] = function (date) { return lastDayOfMonth(date); },
    _a);
/**
 * @hidden
 */
var MonthViewService = /** @class */ (function () {
    function MonthViewService(_intlService) {
        this._intlService = _intlService;
    }
    MonthViewService.prototype.addToDate = function (min, skip) {
        return addMonths(min, skip);
    };
    MonthViewService.prototype.datesList = function (start, count) {
        return range(0, count).map(function (i) { return addMonths(start, i); });
    };
    MonthViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate, _b = options.isDateDisabled, isDateDisabled = _b === void 0 ? function () { return false; } : _b;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var firstMonthDate = firstDayOfMonth(viewDate);
        var firstMonthDay = getDate(firstMonthDate);
        var lastMonthDate = lastDayOfMonth(viewDate);
        var lastMonthDay = getDate(lastMonthDate);
        var backward = -1;
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var date = dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        var cells = range(0, CELLS_LENGTH);
        var today = getToday();
        return range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = addDays(date, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(addDays(baseDate, cellOffset), min, max);
                var cellDay = getDate(cellDate);
                var otherMonth = cellDay < firstMonthDay || cellDay > lastMonthDay;
                var outOfRange = cellDate < min || cellDate > max;
                if (otherMonth || outOfRange) {
                    return null;
                }
                var isRangeStart = _this.isEqual(cellDate, selectionRange.start);
                var isRangeEnd = _this.isEqual(cellDate, selectionRange.end);
                var isInMiddle = !isRangeStart && !isRangeEnd;
                var isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: _this.value(cellDate),
                    id: "" + cellUID + cellDate.getTime(),
                    isFocused: _this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && _this.isEqual(cellDate, selectedDate),
                    isWeekend: _this.isWeekend(cellDate),
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitStart: isRangeMid && _this.isEqual(cellDate, firstMonthDate),
                    isRangeSplitEnd: isRangeMid && _this.isEqual(cellDate, lastMonthDate),
                    isToday: _this.isEqual(cellDate, today),
                    title: _this.cellTitle(cellDate),
                    value: cellDate,
                    isDisabled: isDateDisabled(cellDate)
                };
            });
        });
    };
    MonthViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return getDate(candidate).getTime() === getDate(expected).getTime();
    };
    MonthViewService.prototype.isInArray = function (date, dates) {
        if (dates.length === 0) {
            return false;
        }
        var lowerBound = this.beginningOfPeriod(dates[0]);
        var upperBound = this.beginningOfPeriod(addMonths(dates[dates.length - 1], 1));
        return lowerBound <= date && date < upperBound;
    };
    MonthViewService.prototype.isInRange = function (candidate, min, max) {
        var value = getDate(candidate);
        var aboveMin = !min || getDate(min) <= value;
        var belowMax = !max || value <= getDate(max);
        return aboveMin && belowMax;
    };
    MonthViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        return createDate(date.getFullYear(), date.getMonth(), 1);
    };
    MonthViewService.prototype.isRangeStart = function (value) {
        return !value.getMonth();
    };
    MonthViewService.prototype.move = function (value, action) {
        var modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    };
    MonthViewService.prototype.cellTitle = function (value) {
        return this._intlService.formatDate(value, 'D');
    };
    MonthViewService.prototype.navigationTitle = function (value) {
        if (!value) {
            return '';
        }
        return this.isRangeStart(value) ? value.getFullYear().toString() : this.abbrMonthNames()[value.getMonth()];
    };
    MonthViewService.prototype.title = function (current) {
        return this.wideMonthNames()[current.getMonth()] + " " + current.getFullYear();
    };
    MonthViewService.prototype.rowLength = function (prependCell) {
        return CELLS_LENGTH + (prependCell ? 1 : 0);
    };
    MonthViewService.prototype.skip = function (value, min) {
        return durationInMonths(min, value);
    };
    MonthViewService.prototype.total = function (min, max) {
        return durationInMonths(min, max) + 1;
    };
    MonthViewService.prototype.value = function (current) {
        return current ? current.getDate().toString() : "";
    };
    MonthViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var monthsToSubtract = viewsCount - viewsInRange;
            return addMonths(date, -1 * monthsToSubtract);
        }
        return date;
    };
    MonthViewService.prototype.isWeekend = function (date) {
        var _a = this._intlService.weekendRange(), start = _a.start, end = _a.end;
        var day = date.getDay();
        if (end < start) {
            return day <= end || start <= day;
        }
        return start <= day && day <= end;
    };
    MonthViewService.prototype.abbrMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    };
    MonthViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    };
    MonthViewService.prototype.wideMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'wide', type: 'months' });
    };
    MonthViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MonthViewService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return MonthViewService;
}());
export { MonthViewService };
