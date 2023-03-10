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
var util_1 = require("../../util");
var selection_range_interface_1 = require("../models/selection-range.interface");
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
exports.ɵ0 = ɵ0;
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
exports.ɵ1 = ɵ1;
var ACTIONS = (_a = {},
    _a[navigation_action_enum_1.Action.Left] = function (date) { return kendo_date_math_1.addMonths(date, -1); },
    _a[navigation_action_enum_1.Action.Up] = function (date) { return kendo_date_math_1.addMonths(date, upStep(date.getMonth())); },
    _a[navigation_action_enum_1.Action.Right] = function (date) { return kendo_date_math_1.addMonths(date, 1); },
    _a[navigation_action_enum_1.Action.Down] = function (date) { return kendo_date_math_1.addMonths(date, downStep(date.getMonth())); },
    _a[navigation_action_enum_1.Action.PrevView] = function (date) { return kendo_date_math_1.addYears(date, -1); },
    _a[navigation_action_enum_1.Action.NextView] = function (date) { return kendo_date_math_1.addYears(date, 1); },
    _a[navigation_action_enum_1.Action.FirstInView] = function (date) { return kendo_date_math_1.firstMonthOfYear(date); },
    _a[navigation_action_enum_1.Action.LastInView] = function (date) { return kendo_date_math_1.lastMonthOfYear(date); },
    _a);
/**
 * @hidden
 */
var YearViewService = /** @class */ (function () {
    function YearViewService(_intlService) {
        this._intlService = _intlService;
    }
    YearViewService.prototype.addToDate = function (min, skip) {
        return kendo_date_math_1.addYears(min, skip);
    };
    YearViewService.prototype.datesList = function (start, count) {
        return util_1.range(0, count).map(function (i) { return kendo_date_math_1.addYears(start, i); });
    };
    YearViewService.prototype.data = function (options) {
        var _this = this;
        var cellUID = options.cellUID, focusedDate = options.focusedDate, isActiveView = options.isActiveView, max = options.max, min = options.min, selectedDate = options.selectedDate, _a = options.selectionRange, selectionRange = _a === void 0 ? selection_range_interface_1.EMPTY_SELECTIONRANGE : _a, viewDate = options.viewDate;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        var months = this.abbrMonthNames();
        var isSelectedDateInRange = util_1.isInRange(selectedDate, min, max);
        var firstDate = kendo_date_math_1.firstMonthOfYear(viewDate);
        var lastDate = kendo_date_math_1.lastMonthOfYear(viewDate);
        var currentYear = firstDate.getFullYear();
        var cells = util_1.range(0, CELLS_LENGTH);
        var today = util_1.getToday();
        return util_1.range(0, ROWS_LENGTH).map(function (rowOffset) {
            var baseDate = kendo_date_math_1.addMonths(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(function (cellOffset) {
                var cellDate = _this.normalize(kendo_date_math_1.addMonths(baseDate, cellOffset), min, max);
                var changedYear = currentYear < cellDate.getFullYear();
                if (!_this.isInRange(cellDate, min, max) || changedYear) {
                    return null;
                }
                var isRangeStart = _this.isEqual(cellDate, selectionRange.start);
                var isRangeEnd = _this.isEqual(cellDate, selectionRange.end);
                var isInMiddle = !isRangeStart && !isRangeEnd;
                var isRangeMid = isInMiddle && util_1.isInSelectionRange(cellDate, selectionRange);
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
        var candidateValue = kendo_date_math_1.createDate(candidate.getFullYear(), candidate.getMonth(), 1);
        var aboveMin = !min || kendo_date_math_1.createDate(min.getFullYear(), min.getMonth(), 1) <= candidateValue;
        var belowMax = !max || candidateValue <= kendo_date_math_1.createDate(max.getFullYear(), max.getMonth(), 1);
        return aboveMin && belowMax;
    };
    YearViewService.prototype.beginningOfPeriod = function (date) {
        if (!date) {
            return date;
        }
        return kendo_date_math_1.createDate(date.getFullYear(), 0, 1);
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
        return kendo_date_math_1.durationInYears(min, value);
    };
    YearViewService.prototype.total = function (min, max) {
        return kendo_date_math_1.durationInYears(min, max) + 1;
    };
    YearViewService.prototype.value = function (current) {
        return current ? this.abbrMonthNames()[current.getMonth()] : '';
    };
    YearViewService.prototype.viewDate = function (date, max, viewsCount) {
        if (viewsCount === void 0) { viewsCount = 1; }
        var viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            var yearsToSubtract = viewsCount - viewsInRange;
            return kendo_date_math_1.addYears(date, -1 * yearsToSubtract);
        }
        return date;
    };
    YearViewService.prototype.abbrMonthNames = function () {
        return this._intlService.dateFormatNames({ nameType: 'abbreviated', type: 'months' });
    };
    YearViewService.prototype.normalize = function (cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return kendo_date_math_1.cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return kendo_date_math_1.cloneDate(max);
        }
        return cellDate;
    };
    YearViewService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    YearViewService.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return YearViewService;
}());
exports.YearViewService = YearViewService;
