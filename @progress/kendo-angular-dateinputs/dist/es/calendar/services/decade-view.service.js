/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { addDecades, addYears, cloneDate, durationInDecades, firstYearOfDecade, lastYearOfDecade, createDate } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 5;
var ROWS_LENGTH = 2;
var ACTIONS = (_a = {},
    _a[Action.Left] = function (date) { return addYears(date, -1); },
    _a[Action.Up] = function (date) { return addYears(date, -5); },
    _a[Action.Right] = function (date) { return addYears(date, 1); },
    _a[Action.Down] = function (date) { return addYears(date, 5); },
    _a[Action.PrevView] = function (date) { return addDecades(date, -1); },
    _a[Action.NextView] = function (date) { return addDecades(date, 1); },
    _a[Action.FirstInView] = function (date) { return firstYearOfDecade(date); },
    _a[Action.LastInView] = function (date) { return lastYearOfDecade(date); },
    _a);
/**
 * @hidden
 */
var DecadeViewService = /** @class */ (function () {
    function DecadeViewService() {
    }
    DecadeViewService.prototype.addToDate = function (min, skip) {
        return addDecades(min, skip);
    };
    DecadeViewService.prototype.datesList = function (start, count) {
        return range(0, count).map(function (i) { return addDecades(start, i); });
    };
    DecadeViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var cells = range(0, CELLS_LENGTH);
        var firstDate = firstYearOfDecade(viewDate);
        var lastDate = lastYearOfDecade(viewDate);
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var today = getToday();
        return range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = addYears(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(addYears(baseDate, cellOffset), min, max);
                if (!_this.isInRange(cellDate, min, max)) {
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
    DecadeViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear();
    };
    DecadeViewService.prototype.isInArray = function (date, dates) {
        if (!dates.length) {
            return false;
        }
        var year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 9);
    };
    DecadeViewService.prototype.isInRange = function (candidate, min, max) {
        var year = candidate.getFullYear();
        var aboveMin = !min || min.getFullYear() <= year;
        var belowMax = !max || year <= max.getFullYear();
        return aboveMin && belowMax;
    };
    DecadeViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        var firstYear = firstYearOfDecade(date);
        return createDate(firstYear.getFullYear(), 0, 1);
    };
    DecadeViewService.prototype.isRangeStart = function (value) {
        return value.getFullYear() % 100 === 0;
    };
    DecadeViewService.prototype.move = function (value, action) {
        var modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    };
    DecadeViewService.prototype.cellTitle = function (value) {
        return value.getFullYear().toString();
    };
    DecadeViewService.prototype.navigationTitle = function (value) {
        return value ? firstYearOfDecade(value).getFullYear().toString() : '';
    };
    DecadeViewService.prototype.title = function (value) {
        if (!value) {
            return '';
        }
        return firstYearOfDecade(value).getFullYear() + " - " + lastYearOfDecade(value).getFullYear();
    };
    DecadeViewService.prototype.rowLength = function (_) {
        return CELLS_LENGTH;
    };
    DecadeViewService.prototype.skip = function (value, min) {
        return durationInDecades(min, value);
    };
    DecadeViewService.prototype.total = function (min, max) {
        return durationInDecades(min, max) + 1;
    };
    DecadeViewService.prototype.value = function (current) {
        return current ? current.getFullYear().toString() : '';
    };
    DecadeViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var decadesToSubtract = viewsCount - viewsInRange;
            return addDecades(date, -1 * decadesToSubtract);
        }
        return date;
    };
    DecadeViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    };
    DecadeViewService.decorators = [
        { type: Injectable },
    ];
    return DecadeViewService;
}());
export { DecadeViewService };
