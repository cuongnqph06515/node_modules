/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var navigation_action_enum_1 = require("../models/navigation-action.enum");
var selection_range_interface_1 = require("../models/selection-range.interface");
var util_1 = require("../../util");
var EMPTY_DATA = [[]];
var CELLS_LENGTH = 7;
var ROWS_LENGTH = 6;
var ACTIONS = (_a = {},
    _a[navigation_action_enum_1.Action.Left] = function (date) { return kendo_date_math_1.addDays(date, -1); },
    _a[navigation_action_enum_1.Action.Up] = function (date) { return kendo_date_math_1.addWeeks(date, -1); },
    _a[navigation_action_enum_1.Action.Right] = function (date) { return kendo_date_math_1.addDays(date, 1); },
    _a[navigation_action_enum_1.Action.Down] = function (date) { return kendo_date_math_1.addWeeks(date, 1); },
    _a[navigation_action_enum_1.Action.PrevView] = function (date) { return kendo_date_math_1.addMonths(date, -1); },
    _a[navigation_action_enum_1.Action.NextView] = function (date) { return kendo_date_math_1.addMonths(date, 1); },
    _a[navigation_action_enum_1.Action.FirstInView] = function (date) { return kendo_date_math_1.firstDayOfMonth(date); },
    _a[navigation_action_enum_1.Action.LastInView] = function (date) { return kendo_date_math_1.lastDayOfMonth(date); },
    _a);
/**
 * @hidden
 */
var MonthViewService = /** @class */ (function () {
    function MonthViewService(_intlService) {
        this._intlService = _intlService;
    }
    MonthViewService.prototype.addToDate = function (min, skip) {
        return kendo_date_math_1.addMonths(min, skip);
    };
    MonthViewService.prototype.datesList = function (start, count) {
        return util_1.range(0, count).map(function (i) { return kendo_date_math_1.addMonths(start, i); });
    };
    MonthViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? selection_range_interface_1.EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate, _b = options.isDateDisabled, isDateDisabled = _b === void 0 ? function () { return false; } : _b;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var firstMonthDate = kendo_date_math_1.firstDayOfMonth(viewDate);
        var firstMonthDay = kendo_date_math_1.getDate(firstMonthDate);
        var lastMonthDate = kendo_date_math_1.lastDayOfMonth(viewDate);
        var lastMonthDay = kendo_date_math_1.getDate(lastMonthDate);
        var backward = -1;
        var isSelectedDateInRange = util_1.isInRange(selectedDate, min, max);
        var date = kendo_date_math_1.dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        var cells = util_1.range(0, CELLS_LENGTH);
        var today = util_1.getToday();
        return util_1.range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = kendo_date_math_1.addDays(date, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(kendo_date_math_1.addDays(baseDate, cellOffset), min, max);
                var cellDay = kendo_date_math_1.getDate(cellDate);
                var otherMonth = cellDay < firstMonthDay || cellDay > lastMonthDay;
                var outOfRange = cellDate < min || cellDate > max;
                if (otherMonth || outOfRange) {
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
        return kendo_date_math_1.getDate(candidate).getTime() === kendo_date_math_1.getDate(expected).getTime();
    };
    MonthViewService.prototype.isInArray = function (date, dates) {
        if (dates.length === 0) {
            return false;
        }
        var lowerBound = this.beginningOfPeriod(dates[0]);
        var upperBound = this.beginningOfPeriod(kendo_date_math_1.addMonths(dates[dates.length - 1], 1));
        return lowerBound <= date && date < upperBound;
    };
    MonthViewService.prototype.isInRange = function (candidate, min, max) {
        var value = kendo_date_math_1.getDate(candidate);
        var aboveMin = !min || kendo_date_math_1.getDate(min) <= value;
        var belowMax = !max || value <= kendo_date_math_1.getDate(max);
        return aboveMin && belowMax;
    };
    MonthViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        return kendo_date_math_1.createDate(date.getFullYear(), date.getMonth(), 1);
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
        return kendo_date_math_1.durationInMonths(min, value);
    };
    MonthViewService.prototype.total = function (min, max) {
        return kendo_date_math_1.durationInMonths(min, max) + 1;
    };
    MonthViewService.prototype.value = function (current) {
        return current ? current.getDate().toString() : "";
    };
    MonthViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var monthsToSubtract = viewsCount - viewsInRange;
            return kendo_date_math_1.addMonths(date, -1 * monthsToSubtract);
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
            return kendo_date_math_1.cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return kendo_date_math_1.cloneDate(max);
        }
        return cellDate;
    };
    MonthViewService.prototype.wideMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'wide', type: 'months' });
    };
    MonthViewService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MonthViewService.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return MonthViewService;
}());
exports.MonthViewService = MonthViewService;
