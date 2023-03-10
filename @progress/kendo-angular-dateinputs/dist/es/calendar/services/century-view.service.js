/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { addDecades, addCenturies, cloneDate, durationInCenturies, firstYearOfDecade, firstDecadeOfCentury, lastDecadeOfCentury, createDate } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 5;
var ROWS_LENGTH = 2;
var ACTIONS = (_a = {},
    _a[Action.Left] = function (date) { return addDecades(date, -1); },
    _a[Action.Up] = function (date) { return addDecades(date, -5); },
    _a[Action.Right] = function (date) { return addDecades(date, 1); },
    _a[Action.Down] = function (date) { return addDecades(date, 5); },
    _a[Action.PrevView] = function (date) { return addCenturies(date, -1); },
    _a[Action.NextView] = function (date) { return addCenturies(date, 1); },
    _a[Action.FirstInView] = function (date) { return firstDecadeOfCentury(date); },
    _a[Action.LastInView] = function (date) { return lastDecadeOfCentury(date); },
    _a);
/**
 * @hidden
 */
var CenturyViewService = /** @class */ (function () {
    function CenturyViewService() {
    }
    CenturyViewService.prototype.addToDate = function (min, skip) {
        return addCenturies(min, skip);
    };
    CenturyViewService.prototype.datesList = function (start, count) {
        return range(0, count).map(function (i) { return addCenturies(start, i); });
    };
    CenturyViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var cells = range(0, CELLS_LENGTH);
        var firstDate = firstDecadeOfCentury(viewDate);
        var lastDate = lastDecadeOfCentury(viewDate);
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var today = getToday();
        return range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = addDecades(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(addDecades(baseDate, cellOffset), min, max);
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
    CenturyViewService.prototype.isEqual = function (candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return firstYearOfDecade(candidate).getFullYear() === firstYearOfDecade(expected).getFullYear();
    };
    CenturyViewService.prototype.isInArray = function (date, dates) {
        if (!dates.length) {
            return false;
        }
        var year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 99);
    };
    CenturyViewService.prototype.isInRange = function (candidate, min, max) {
        var year = firstYearOfDecade(candidate).getFullYear();
        var aboveMin = !min || firstYearOfDecade(min).getFullYear() <= year;
        var belowMax = !max || year <= firstYearOfDecade(max).getFullYear();
        return aboveMin && belowMax;
    };
    CenturyViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        var firstYear = firstYearOfDecade(firstDecadeOfCentury(date));
        return createDate(firstYear.getFullYear(), 0, 1);
    };
    CenturyViewService.prototype.isRangeStart = function (value) {
        return value.getFullYear() % 1000 === 0;
    };
    CenturyViewService.prototype.move = function (value, action) {
        var modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    };
    CenturyViewService.prototype.cellTitle = function (value) {
        return firstYearOfDecade(value).getFullYear().toString();
    };
    CenturyViewService.prototype.navigationTitle = function (value) {
        return value ? firstDecadeOfCentury(value).getFullYear().toString() : '';
    };
    CenturyViewService.prototype.title = function (value) {
        if (!value) {
            return '';
        }
        return firstDecadeOfCentury(value).getFullYear() + " - " + lastDecadeOfCentury(value).getFullYear();
    };
    CenturyViewService.prototype.rowLength = function (_) {
        return CELLS_LENGTH;
    };
    CenturyViewService.prototype.skip = function (value, min) {
        return durationInCenturies(min, value);
    };
    CenturyViewService.prototype.total = function (min, max) {
        return durationInCenturies(min, max) + 1;
    };
    CenturyViewService.prototype.value = function (current) {
        return current ? firstYearOfDecade(current).getFullYear().toString() : '';
    };
    CenturyViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var centuriesToSubtract = viewsCount - viewsInRange;
            return addCenturies(date, -1 * centuriesToSubtract);
        }
        return date;
    };
    CenturyViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    };
    CenturyViewService.decorators = [
        { type: Injectable },
    ];
    return CenturyViewService;
}());
export { CenturyViewService };
