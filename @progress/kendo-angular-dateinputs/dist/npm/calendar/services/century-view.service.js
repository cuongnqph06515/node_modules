/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var navigation_action_enum_1 = require("../models/navigation-action.enum");
var selection_range_interface_1 = require("../models/selection-range.interface");
var util_1 = require("../../util");
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 5;
var ROWS_LENGTH = 2;
var ACTIONS = (_a = {},
    _a[navigation_action_enum_1.Action.Left] = function (date) { return kendo_date_math_1.addDecades(date, -1); },
    _a[navigation_action_enum_1.Action.Up] = function (date) { return kendo_date_math_1.addDecades(date, -5); },
    _a[navigation_action_enum_1.Action.Right] = function (date) { return kendo_date_math_1.addDecades(date, 1); },
    _a[navigation_action_enum_1.Action.Down] = function (date) { return kendo_date_math_1.addDecades(date, 5); },
    _a[navigation_action_enum_1.Action.PrevView] = function (date) { return kendo_date_math_1.addCenturies(date, -1); },
    _a[navigation_action_enum_1.Action.NextView] = function (date) { return kendo_date_math_1.addCenturies(date, 1); },
    _a[navigation_action_enum_1.Action.FirstInView] = function (date) { return kendo_date_math_1.firstDecadeOfCentury(date); },
    _a[navigation_action_enum_1.Action.LastInView] = function (date) { return kendo_date_math_1.lastDecadeOfCentury(date); },
    _a);
/**
 * @hidden
 */
var CenturyViewService = /** @class */ (function () {
    function CenturyViewService() {
    }
    CenturyViewService.prototype.addToDate = function (min, skip) {
        return kendo_date_math_1.addCenturies(min, skip);
    };
    CenturyViewService.prototype.datesList = function (start, count) {
        return util_1.range(0, count).map(function (i) { return kendo_date_math_1.addCenturies(start, i); });
    };
    CenturyViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? selection_range_interface_1.EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var cells = util_1.range(0, CELLS_LENGTH);
        var firstDate = kendo_date_math_1.firstDecadeOfCentury(viewDate);
        var lastDate = kendo_date_math_1.lastDecadeOfCentury(viewDate);
        var isSelectedDateInRange = util_1.isInRange(selectedDate, min, max);
        var today = util_1.getToday();
        return util_1.range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = kendo_date_math_1.addDecades(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(kendo_date_math_1.addDecades(baseDate, cellOffset), min, max);
                if (!_this.isInRange(cellDate, min, max)) {
                    return null;
                }
                var isRangeStart = _this.isEqual(cellDate, selectionRange.start);
                var isRangeEnd = _this.isEqual(cellDate, selectionRange.end);
                var isInMiddle = !isRangeStart && !isRangeEnd;
                var isRangeMid = isInMiddle && util_1.isInSelectionRange(cellDate, selectionRange);
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
        return kendo_date_math_1.firstYearOfDecade(candidate).getFullYear() === kendo_date_math_1.firstYearOfDecade(expected).getFullYear();
    };
    CenturyViewService.prototype.isInArray = function (date, dates) {
        if (!dates.length) {
            return false;
        }
        var year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 99);
    };
    CenturyViewService.prototype.isInRange = function (candidate, min, max) {
        var year = kendo_date_math_1.firstYearOfDecade(candidate).getFullYear();
        var aboveMin = !min || kendo_date_math_1.firstYearOfDecade(min).getFullYear() <= year;
        var belowMax = !max || year <= kendo_date_math_1.firstYearOfDecade(max).getFullYear();
        return aboveMin && belowMax;
    };
    CenturyViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        var firstYear = kendo_date_math_1.firstYearOfDecade(kendo_date_math_1.firstDecadeOfCentury(date));
        return kendo_date_math_1.createDate(firstYear.getFullYear(), 0, 1);
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
        return kendo_date_math_1.firstYearOfDecade(value).getFullYear().toString();
    };
    CenturyViewService.prototype.navigationTitle = function (value) {
        return value ? kendo_date_math_1.firstDecadeOfCentury(value).getFullYear().toString() : '';
    };
    CenturyViewService.prototype.title = function (value) {
        if (!value) {
            return '';
        }
        return kendo_date_math_1.firstDecadeOfCentury(value).getFullYear() + " - " + kendo_date_math_1.lastDecadeOfCentury(value).getFullYear();
    };
    CenturyViewService.prototype.rowLength = function (_) {
        return CELLS_LENGTH;
    };
    CenturyViewService.prototype.skip = function (value, min) {
        return kendo_date_math_1.durationInCenturies(min, value);
    };
    CenturyViewService.prototype.total = function (min, max) {
        return kendo_date_math_1.durationInCenturies(min, max) + 1;
    };
    CenturyViewService.prototype.value = function (current) {
        return current ? kendo_date_math_1.firstYearOfDecade(current).getFullYear().toString() : '';
    };
    CenturyViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var centuriesToSubtract = viewsCount - viewsInRange;
            return kendo_date_math_1.addCenturies(date, -1 * centuriesToSubtract);
        }
        return date;
    };
    CenturyViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return kendo_date_math_1.cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return kendo_date_math_1.cloneDate(max);
        }
        return cellDate;
    };
    CenturyViewService.decorators = [
        { type: core_1.Injectable },
    ];
    return CenturyViewService;
}());
exports.CenturyViewService = CenturyViewService;
