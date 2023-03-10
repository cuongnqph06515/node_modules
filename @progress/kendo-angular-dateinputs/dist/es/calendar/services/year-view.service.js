/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { addMonths, addYears, cloneDate, createDate, durationInYears, firstMonthOfYear, lastMonthOfYear } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 5;
var ROWS_LENGTH = 3;
var upStep = function (month) {
    if (month > 4) {
        return -5;
    }
    if (month < 2) {
        return -2;
    }
    return -7;
};
var ɵ0 = upStep;
var downStep = function (month) {
    if (month < 7) {
        return 5;
    }
    if (month < 10) {
        return 7;
    }
    return 2;
};
var ɵ1 = downStep;
var ACTIONS = (_a = {},
    _a[Action.Left] = function (date) { return addMonths(date, -1); },
    _a[Action.Up] = function (date) { return addMonths(date, upStep(date.getMonth())); },
    _a[Action.Right] = function (date) { return addMonths(date, 1); },
    _a[Action.Down] = function (date) { return addMonths(date, downStep(date.getMonth())); },
    _a[Action.PrevView] = function (date) { return addYears(date, -1); },
    _a[Action.NextView] = function (date) { return addYears(date, 1); },
    _a[Action.FirstInView] = function (date) { return firstMonthOfYear(date); },
    _a[Action.LastInView] = function (date) { return lastMonthOfYear(date); },
    _a);
/**
 * @hidden
 */
var YearViewService = /** @class */ (function () {
    function YearViewService(_intlService) {
        this._intlService = _intlService;
    }
    YearViewService.prototype.addToDate = function (min, skip) {
        return addYears(min, skip);
    };
    YearViewService.prototype.datesList = function (start, count) {
        return range(0, count).map(function (i) { return addYears(start, i); });
    };
    YearViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var months = this.abbrMonthNames();
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var firstDate = firstMonthOfYear(viewDate);
        var lastDate = lastMonthOfYear(viewDate);
        var currentYear = firstDate.getFullYear();
        var cells = range(0, CELLS_LENGTH);
        var today = getToday();
        return range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = addMonths(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(addMonths(baseDate, cellOffset), min, max);
                var changedYear = currentYear < cellDate.getFullYear();
                if (!_this.isInRange(cellDate, min, max) || changedYear) {
                    return null;
                }
                var isRangeStart = _this.isEqual(cellDate, selectionRange.start);
                var isRangeEnd = _this.isEqual(cellDate, selectionRange.end);
                var isInMiddle = !isRangeStart && !isRangeEnd;
                var isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: months[cellDate.getMonth()],
                    id: "" + cellUID + cellDate.getTime(),
                    isFocused: _this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && _this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && _this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && _this.isEqual(cellDate, firstDate),
                    isToday: _this.isEqual(cellDate, today),
                    title: _this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    };
    YearViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear() &&
            candidate.getMonth() === expected.getMonth();
    };
    YearViewService.prototype.isInArray = function (date, dates) {
        if (!dates.length) {
            return false;
        }
        var year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= dates[dates.length - 1].getFullYear();
    };
    YearViewService.prototype.isInRange = function (candidate, min, max) {
        var candidateValue = createDate(candidate.getFullYear(), candidate.getMonth(), 1);
        var aboveMin = !min || createDate(min.getFullYear(), min.getMonth(), 1) <= candidateValue;
        var belowMax = !max || candidateValue <= createDate(max.getFullYear(), max.getMonth(), 1);
        return aboveMin && belowMax;
    };
    YearViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        return createDate(date.getFullYear(), 0, 1);
    };
    YearViewService.prototype.isRangeStart = function (value) {
        return value.getFullYear() % 10 === 0;
    };
    YearViewService.prototype.move = function (value, action) {
        var modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    };
    YearViewService.prototype.cellTitle = function (value) {
        return value.getFullYear() + " " + this.value(value);
    };
    YearViewService.prototype.navigationTitle = function (value) {
        return this.title(value);
    };
    YearViewService.prototype.title = function (current) {
        return current ? current.getFullYear().toString() : '';
    };
    YearViewService.prototype.rowLength = function (_) {
        return CELLS_LENGTH;
    };
    YearViewService.prototype.skip = function (value, min) {
        return durationInYears(min, value);
    };
    YearViewService.prototype.total = function (min, max) {
        return durationInYears(min, max) + 1;
    };
    YearViewService.prototype.value = function (current) {
        return current ? this.abbrMonthNames()[current.getMonth()] : '';
    };
    YearViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var yearsToSubtract = viewsCount - viewsInRange;
            return addYears(date, -1 * yearsToSubtract);
        }
        return date;
    };
    YearViewService.prototype.abbrMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    };
    YearViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    };
    YearViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    YearViewService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return YearViewService;
}());
export { YearViewService };
export { ɵ0, ɵ1 };
