/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, Injector, EventEmitter, InjectionToken, Component, Inject, ElementRef, Renderer2, NgZone, Input, Output, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, Directive, TemplateRef, isDevMode, forwardRef, Optional, ContentChild, ViewContainerRef, HostListener, ViewChildren, ContentChildren, IterableDiffers, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { LocalizationService, L10N_PREFIX, RTL, ComponentMessages } from '@progress/kendo-angular-l10n';
import { getDate, isEqual, cloneDate, addDays, addDecades, addCenturies, firstDecadeOfCentury, lastDecadeOfCentury, firstYearOfDecade, createDate, durationInCenturies, addYears, lastYearOfDecade, durationInDecades, addWeeks, addMonths, firstDayOfMonth, lastDayOfMonth, dayOfWeek, durationInMonths, firstMonthOfYear, lastMonthOfYear, durationInYears, weekInYear } from '@progress/kendo-date-math';
import { isDocumentAvailable, KendoInput, hasObservers, Keys, guid, EventsModule, ResizeSensorModule } from '@progress/kendo-angular-common';
import { IntlService, IntlModule } from '@progress/kendo-angular-intl';
import { ReplaySubject, Observable, combineLatest, of, interval, animationFrameScheduler, fromEvent, EMPTY, Subject, from, Subscription, BehaviorSubject, merge } from 'rxjs';
import { map, scan, takeWhile, tap, filter, debounceTime } from 'rxjs/operators';
import { PopupService, PopupModule } from '@progress/kendo-angular-popup';
import { __extends } from 'tslib';
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
var EMPTY_SELECTIONRANGE = { start: null, end: null };

/**
 * @hidden
 */
var MIDNIGHT_DATE = new Date(1980, 0, 1);
/**
 * @hidden
 */
var MIN_DATE = new Date(1900, 0, 1);
/**
 * @hidden
 */
var MAX_DATE = new Date(2099, 11, 31);
/**
 * @hidden
 */
var MIN_TIME = new Date(1980, 0, 1);
/**
 * @hidden
 */
var MAX_TIME = new Date(1980, 0, 1, 23, 59, 59);

/* tslint:disable:no-bitwise max-line-length */
var isSet = function (value) { return value !== null && value !== undefined; };
var setter = function (method) { return function (date, value) {
    var clone = cloneDate(date);
    clone[method](value);
    return clone;
}; };
/**
 * @hidden
 */
var setTime = function (origin, candidate) {
    var date = cloneDate(origin);
    date.setHours(candidate.getHours(), candidate.getMinutes(), candidate.getSeconds(), candidate.getMilliseconds());
    return date;
};
var normalizeTimes = function (candidate, min, max) { return ({
    candidateValue: setTime(MIDNIGHT_DATE, candidate),
    maxValue: addDays(setTime(MIDNIGHT_DATE, max), min.getHours() < max.getHours() ||
        (min.getHours() === max.getHours() && min.getMinutes() < max.getMinutes()) ? 0 : 1),
    minValue: setTime(MIDNIGHT_DATE, min)
}); };
/**
 * @hidden
 */
var setHours = setter('setHours');
/**
 * @hidden
 */
var setMinutes = setter('setMinutes');
/**
 * @hidden
 */
var setSeconds = setter('setSeconds');
/**
 * @hidden
 */
var range = function (start, end, step) {
    if (step === void 0) { step = 1; }
    var result = [];
    for (var i = start; i < end; i = i + step) {
        result.push(i);
    }
    return result;
};
/**
 * @hidden
 */
var isInRange = function (candidate, min, max) { return (!candidate || !((min && min > candidate) || (max && max < candidate))); };
/**
 * @hidden
 */
var isInTimeRange = function (candidate, min, max) {
    if (!candidate || !min || !max) {
        return true;
    }
    var _a = normalizeTimes(candidate, min, max), candidateValue = _a.candidateValue, minValue = _a.minValue, maxValue = _a.maxValue;
    return minValue <= candidateValue && candidateValue <= maxValue;
};
/**
 * @hidden
 */
var isValidRange = function (min, max) { return (!isSet(min) || !isSet(max) || min <= max); };
/**
 * @hidden
 */
var dateInRange = function (candidate, min, max) {
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
var timeInRange = function (candidate, min, max) {
    if (!candidate || !min || !max) {
        return candidate;
    }
    var _a = normalizeTimes(candidate, min, max), candidateValue = _a.candidateValue, minValue = _a.minValue, maxValue = _a.maxValue;
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
var getNow = function () { return new Date(); };
/**
 * @hidden
 */
var getToday = function () { return getDate(new Date()); };
/**
 * @hidden
 */
var noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
var isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
var stringifyClassObject = function (classes) {
    var pushToAcc = function (acc, cls) { return classes[cls] ? acc.concat(cls) : acc; };
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
var shiftWeekNames = function (names, offset) { return (names.slice(offset).concat(names.slice(0, offset))); };
/**
 * @hidden
 */
var approximateStringMatching = function (oldTextOrigin, oldFormat, newTextOrigin, caret) {
    // Remove the right part of the cursor.
    //oldFormat = oldFormat.substring(0, caret + oldText.length - newText.length);
    var oldIndex = caret + oldTextOrigin.length - newTextOrigin.length;
    var oldTextSeparator = oldTextOrigin[oldIndex];
    var oldText = oldTextOrigin.substring(0, caret + oldTextOrigin.length - newTextOrigin.length);
    var newText = newTextOrigin.substring(0, caret);
    var diff = [];
    // Handle typing a single character over the same selection.
    if (oldText === newText && caret > 0) {
        diff.push([oldFormat[caret - 1], newText[caret - 1]]);
        return diff;
    }
    if (oldText.indexOf(newText) === 0 && (newText.length === 0 || oldFormat[newText.length - 1] !== oldFormat[newText.length])) {
        // Handle Delete/Backspace.
        var deletedSymbol = "";
        //XXX:
        // Whole text is replaced with a same char
        // Nasty patch required to keep the selection in the first segment
        if (newText.length === 1) {
            diff.push([oldFormat[0], newText[0]]);
        }
        for (var i = newText.length; i < oldText.length; i++) {
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
        var symbol = oldFormat[0];
        for (var i = Math.max(0, oldText.length - 1); i < oldFormat.length; i++) {
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
var domContainerFactory = function (type) { return function (children, classes, styles) {
    if (classes === void 0) { classes = ""; }
    if (styles === void 0) { styles = {}; }
    var container = document.createElement(type);
    container.className = classes;
    Object.keys(styles).map(function (key) { return container.style[key] = styles[key]; });
    if (typeof children === 'string') {
        container.innerHTML = children || '';
    }
    else {
        (children || []).forEach(function (child) { return child && container.appendChild(child); });
    }
    return container;
}; };
/**
 * @hidden
 */
var hasChange = function (changes, field) { return changes[field] !== undefined; };
/**
 * @hidden
 */
var hasExistingValue = function (changes, field) { return changes[field] && changes[field].currentValue !== undefined && changes[field].currentValue !== null; };
/**
 * @hidden
 */
var isInSelectionRange = function (value, selectionRange) {
    var _a = selectionRange || EMPTY_SELECTIONRANGE, start = _a.start, end = _a.end;
    if (!start || !end) {
        return false;
    }
    return start < value && value < end;
};
/**
 * @hidden
 */
var either = function (value1, value2) { return value1 || value2; };
/**
 * @hidden
 */
var clampRange = function (value) { return ({ start: value, end: value }); };
/**
 * @hidden
 */
var isEqualRange = function (initial, updated) {
    var _a = initial || EMPTY_SELECTIONRANGE, initialStart = _a.start, initialEnd = _a.end;
    var _b = updated || EMPTY_SELECTIONRANGE, updatedStart = _b.start, updatedEnd = _b.end;
    return isEqual(initialStart, updatedStart) && isEqual(initialEnd, updatedEnd);
};
/**
 * @hidden
 *
 * Creates a new date based on the date information from the specified date portion
 * and the time information from the time portion.
 * If a parameter is not provided, returns `null`.
 */
var mergeDateAndTime = function (date, time) {
    if (!(date && time)) {
        return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};
/**
 * @hidden
 */
var lastMillisecondOfDate = function (date) {
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
var disabledDatesInRange = function (start, end, isDateDisabled) {
    if (!(start && end && isDateDisabled) || (start > end)) {
        return [];
    }
    var dates = [];
    var current = start;
    while (current <= end) {
        if (isDateDisabled(current)) {
            dates.push(current);
        }
        current = addDays(current, 1);
    }
    return dates;
};

var _a;
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

var _a$1;
var EMPTY_DATA$1 = [[]];
var CELLS_LENGTH$1 = 5;
var ROWS_LENGTH$1 = 2;
var ACTIONS$1 = (_a$1 = {},
    _a$1[Action.Left] = function (date) { return addYears(date, -1); },
    _a$1[Action.Up] = function (date) { return addYears(date, -5); },
    _a$1[Action.Right] = function (date) { return addYears(date, 1); },
    _a$1[Action.Down] = function (date) { return addYears(date, 5); },
    _a$1[Action.PrevView] = function (date) { return addDecades(date, -1); },
    _a$1[Action.NextView] = function (date) { return addDecades(date, 1); },
    _a$1[Action.FirstInView] = function (date) { return firstYearOfDecade(date); },
    _a$1[Action.LastInView] = function (date) { return lastYearOfDecade(date); },
    _a$1);
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
            return EMPTY_DATA$1;
        }
        var cells = range(0, CELLS_LENGTH$1);
        var firstDate = firstYearOfDecade(viewDate);
        var lastDate = lastYearOfDecade(viewDate);
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var today = getToday();
        return range(0, ROWS_LENGTH$1).map(function (rowOffset) {
            var baseDate = addYears(firstDate, rowOffset * CELLS_LENGTH$1);
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
        var modifier = ACTIONS$1[action];
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
        return CELLS_LENGTH$1;
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

var _a$2;
var EMPTY_DATA$2 = [[]];
var CELLS_LENGTH$2 = 7;
var ROWS_LENGTH$2 = 6;
var ACTIONS$2 = (_a$2 = {},
    _a$2[Action.Left] = function (date) { return addDays(date, -1); },
    _a$2[Action.Up] = function (date) { return addWeeks(date, -1); },
    _a$2[Action.Right] = function (date) { return addDays(date, 1); },
    _a$2[Action.Down] = function (date) { return addWeeks(date, 1); },
    _a$2[Action.PrevView] = function (date) { return addMonths(date, -1); },
    _a$2[Action.NextView] = function (date) { return addMonths(date, 1); },
    _a$2[Action.FirstInView] = function (date) { return firstDayOfMonth(date); },
    _a$2[Action.LastInView] = function (date) { return lastDayOfMonth(date); },
    _a$2);
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
            return EMPTY_DATA$2;
        }
        var firstMonthDate = firstDayOfMonth(viewDate);
        var firstMonthDay = getDate(firstMonthDate);
        var lastMonthDate = lastDayOfMonth(viewDate);
        var lastMonthDay = getDate(lastMonthDate);
        var backward = -1;
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var date = dayOfWeek(firstMonthDate, this._intlService.firstDay(), backward);
        var cells = range(0, CELLS_LENGTH$2);
        var today = getToday();
        return range(0, ROWS_LENGTH$2).map(function (rowOffset) {
            var baseDate = addDays(date, rowOffset * CELLS_LENGTH$2);
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
        var modifier = ACTIONS$2[action];
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
        return CELLS_LENGTH$2 + (prependCell ? 1 : 0);
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

var _a$3;
var EMPTY_DATA$3 = [[]];
var CELLS_LENGTH$3 = 5;
var ROWS_LENGTH$3 = 3;
var upStep = function (month) {
    if (month > 4) {
        return -5;
    }
    if (month < 2) {
        return -2;
    }
    return -7;
};
var downStep = function (month) {
    if (month < 7) {
        return 5;
    }
    if (month < 10) {
        return 7;
    }
    return 2;
};
var ACTIONS$3 = (_a$3 = {},
    _a$3[Action.Left] = function (date) { return addMonths(date, -1); },
    _a$3[Action.Up] = function (date) { return addMonths(date, upStep(date.getMonth())); },
    _a$3[Action.Right] = function (date) { return addMonths(date, 1); },
    _a$3[Action.Down] = function (date) { return addMonths(date, downStep(date.getMonth())); },
    _a$3[Action.PrevView] = function (date) { return addYears(date, -1); },
    _a$3[Action.NextView] = function (date) { return addYears(date, 1); },
    _a$3[Action.FirstInView] = function (date) { return firstMonthOfYear(date); },
    _a$3[Action.LastInView] = function (date) { return lastMonthOfYear(date); },
    _a$3);
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
            return EMPTY_DATA$3;
        }
        var months = this.abbrMonthNames();
        var isSelectedDateInRange = isInRange(selectedDate, min, max);
        var firstDate = firstMonthOfYear(viewDate);
        var lastDate = lastMonthOfYear(viewDate);
        var currentYear = firstDate.getFullYear();
        var cells = range(0, CELLS_LENGTH$3);
        var today = getToday();
        return range(0, ROWS_LENGTH$3).map(function (rowOffset) {
            var baseDate = addMonths(firstDate, rowOffset * CELLS_LENGTH$3);
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
        var modifier = ACTIONS$3[action];
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
        return CELLS_LENGTH$3;
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

var _a$4;
var services = (_a$4 = {},
    _a$4[CalendarViewEnum.month] = MonthViewService,
    _a$4[CalendarViewEnum.year] = YearViewService,
    _a$4[CalendarViewEnum.decade] = DecadeViewService,
    _a$4[CalendarViewEnum.century] = CenturyViewService,
    _a$4);
var viewOffset = function (view, offset) {
    var candidate = CalendarViewEnum[CalendarViewEnum[view + offset]];
    return candidate !== undefined ? candidate : view;
};
/**
 * @hidden
 */
var BusViewService = /** @class */ (function () {
    function BusViewService(injector) {
        this.injector = injector;
        this.viewChanged = new EventEmitter();
        this.bottom = CalendarViewEnum.month;
        this.top = CalendarViewEnum.century;
    }
    BusViewService.prototype.configure = function (bottom, top) {
        this.bottom = bottom;
        this.top = top;
    };
    BusViewService.prototype.service = function (view) {
        var serviceType = services[view];
        return serviceType ? this.injector.get(serviceType) : null;
    };
    BusViewService.prototype.moveDown = function (view) {
        this.move(view, -1);
    };
    BusViewService.prototype.moveUp = function (view) {
        this.move(view, 1);
    };
    BusViewService.prototype.moveToBottom = function (activeView) {
        if (activeView === this.bottom) {
            return;
        }
        this.viewChanged.emit({ view: this.bottom });
    };
    BusViewService.prototype.canMoveDown = function (view) {
        return this.bottom < view;
    };
    BusViewService.prototype.canMoveUp = function (view) {
        return view < this.top;
    };
    BusViewService.prototype.clamp = function (view) {
        if (view < this.bottom) {
            return this.bottom;
        }
        if (view > this.top) {
            return this.top;
        }
        return view;
    };
    BusViewService.prototype.move = function (view, offset) {
        var candidate = this.clamp(viewOffset(view, offset));
        if (candidate === view) {
            return;
        }
        this.viewChanged.emit({ view: candidate });
    };
    BusViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BusViewService.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return BusViewService;
}());

/**
 * @hidden
 */
var requiresZoneOnBlur = function (ngControl) { return ngControl &&
    (!ngControl.touched || (ngControl.control && ngControl.control.updateOn === 'blur')); };
/**
 * @hidden
 */
var preventDefault = function (args) { return args.preventDefault(); };
/**
 * @hidden
 */
var currentFocusTarget = function (blurArgs) { return blurArgs.relatedTarget || document.activeElement; };
/**
 * @hidden
 */
var isPresent = function (value) { return value !== undefined && value !== null; };
/**
 * @hidden
 *
 * If the provided parameter is an array with at least one item
 * and all items in the array are numbers, returns `true.
 */
var isNumberArray = function (value) { return Array.isArray(value) && value.length > 0 && value.every(function (item) { return typeof item === 'number'; }); };
/**
 * @hidden
 *
 * If the provided parameter is an array with at least one item
 * and all items in the array are dates, returns `true`.
 */
var isDateArray = function (value) { return Array.isArray(value) && value.length > 0 && value.every(function (item) { return item instanceof Date; }); };

var div = domContainerFactory('div');
var ul = domContainerFactory('ul');
var li = domContainerFactory('li');
var td = domContainerFactory('td');
var th = domContainerFactory('th');
var tr = domContainerFactory('tr');
var tbody = domContainerFactory('tbody');
var thead = domContainerFactory('thead');
var table = domContainerFactory('table');
var monthHeader = function () { return (div("\n            <span class=\"k-button k-bare k-title\">March 2017</span>\n            <span class=\"k-today\">TODAY</span>\n        ", 'k-calendar-header')); };
var monthWeekHeader = function () { return (table([
    thead([
        tr([th('MO')])
    ])
], 'k-calendar-weekdays')); };
var repeat = function (count, mapper) { return new Array(count).fill('1').map(mapper); };
var content = function (rows, cells) {
    if (cells === void 0) { cells = 1; }
    return (table([
        tbody([tr([th('1')])].concat(repeat(rows, function () { return tr(repeat(cells, function (c) { return td("<span class=\"k-link\">" + c + "</span>"); })); })))
    ]));
};
var scrollable = function (children) { return div(children, 'k-content k-scrollable'); };
var view = function (contentElement, className, renderWeekHeader) { return (div([
    monthHeader(),
    renderWeekHeader ? monthWeekHeader() : null,
    scrollable([contentElement, contentElement])
], className, { left: '-10000px', position: 'absolute' })); };
var ɵ6 = function () {
    var navElement;
    return function () {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!navElement) {
            navElement = div([scrollable([ul([li('<span>FEB</span>')])])], 'k-calendar-navigation', { left: '0px', position: 'absolute' });
        }
        return navElement;
    };
};
var navigationList = (ɵ6)();
var viewFactory = function (_a, className, renderWeekHeader) {
    var cells = _a.cells, rows = _a.rows;
    var viewElement;
    return function () {
        if (!isDocumentAvailable) {
            return null;
        }
        if (!viewElement) {
            viewElement = view(content(rows, cells), className, renderWeekHeader);
        }
        return viewElement;
    };
};
var getScrollable = function (element) { return element.querySelector('.k-scrollable'); };
var horizontal = function (element) {
    var scrollableElement = getScrollable(element);
    scrollableElement.classList.add('k-scrollable-horizontal');
    return element;
};
var monthView = viewFactory({ cells: 7, rows: 6 }, 'k-calendar-view k-calendar-monthview', true);
var yearView = viewFactory({ cells: 5, rows: 3 }, 'k-calendar-view k-calendar-yearview', false);
var decadeView = viewFactory({ cells: 5, rows: 2 }, 'k-calendar-view k-calendar-decadeview', false);
var horzMonthView = function () { return horizontal(monthView()); };
var horzYearView = function () { return horizontal(yearView()); };
var horzDecadeView = function () { return horizontal(decadeView()); };
var height = function (element) { return (parseFloat(window.getComputedStyle(element).height) || element.offsetHeight); };
var width = function (element) {
    var styles = window.getComputedStyle(element);
    var computed = parseFloat(styles.width)
        + parseFloat(styles.paddingLeft)
        + parseFloat(styles.paddingRight);
    return computed || element.offsetWidth;
};
var getBody = function (element) { return element.querySelector('tbody'); };
/**
 * @hidden
 */
var CalendarDOMService = /** @class */ (function () {
    function CalendarDOMService() {
    }
    CalendarDOMService.prototype.ensureHeights = function () {
        if (this.calendarHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    };
    CalendarDOMService.prototype.calculateHeights = function (container) {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.hostContainer = container;
        this.batch(monthView(), function (contentElement) {
            var viewElement = getBody(contentElement);
            _this.calendarHeight = height(contentElement);
            _this.monthViewHeight = height(viewElement);
            _this.headerHeight = height(viewElement.children[0]);
            _this.scrollableContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzMonthView(), function (contentElement) {
            var viewElement = getBody(contentElement);
            _this.calendarWidth = width(contentElement);
            _this.monthViewWidth = width(viewElement);
            _this.scrollableContentWidth = width(getScrollable(contentElement));
        });
        this.batch(yearView(), function (contentElement) {
            _this.yearViewHeight = height(getBody(contentElement));
            _this.scrollableYearContentHeight = height(getScrollable(contentElement));
        });
        this.batch(horzYearView(), function (contentElement) {
            _this.yearViewWidth = width(getBody(contentElement));
        });
        this.batch(decadeView(), function (contentElement) {
            _this.decadeViewHeight = height(getBody(contentElement));
            _this.centuryViewHeight = _this.decadeViewHeight;
        });
        this.batch(horzDecadeView(), function (contentElement) {
            _this.decadeViewWidth = width(getBody(contentElement));
            _this.centuryViewWidth = _this.decadeViewWidth;
        });
        this.batch(navigationList(), function (contentElement) {
            _this.navigationItemHeight = height(contentElement.querySelector('li'));
        });
    };
    CalendarDOMService.prototype.viewHeight = function (viewType) {
        return this.viewDimension(viewType, 'height');
    };
    CalendarDOMService.prototype.viewWidth = function (viewType) {
        return this.viewDimension(viewType, 'width');
    };
    CalendarDOMService.prototype.viewDimension = function (viewType, dimension) {
        var viewProp = dimension === 'height' ? 'ViewHeight' : 'ViewWidth';
        switch (viewType) {
            case CalendarViewEnum.month:
                return this["month" + viewProp];
            case CalendarViewEnum.year:
                return this["year" + viewProp];
            case CalendarViewEnum.decade:
                return this["decade" + viewProp];
            case CalendarViewEnum.century:
                return this["century" + viewProp];
            default:
                return 1;
        }
    };
    CalendarDOMService.prototype.batch = function (contentElement, action) {
        if (!isPresent(this.hostContainer)) {
            return;
        }
        var hostClone = this.hostContainer.cloneNode();
        document.body.appendChild(hostClone);
        try {
            var appendedContent = hostClone.appendChild(contentElement);
            action(appendedContent);
        }
        catch (error) {
            throw error;
        }
        finally {
            document.body.removeChild(hostClone);
        }
    };
    CalendarDOMService.decorators = [
        { type: Injectable },
    ];
    return CalendarDOMService;
}());

/**
 * @hidden
 */
var update = function (arr, idx, value) { return (arr.slice(0, idx + 1).concat((arr.slice(idx + 1).map(function (x) { return x + value; })))); };
/**
 * @hidden
 */
var RowHeightService = /** @class */ (function () {
    function RowHeightService(total, rowHeight, detailRowHeight) {
        if (total === void 0) { total = 0; }
        this.total = total;
        this.rowHeight = rowHeight;
        this.detailRowHeight = detailRowHeight;
        this.offsets = [];
        this.heights = [];
        var agg = 0;
        for (var idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    RowHeightService.prototype.height = function (rowIndex) {
        return this.heights[rowIndex];
    };
    RowHeightService.prototype.expandDetail = function (rowIndex) {
        if (this.height(rowIndex) === this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight);
        }
    };
    RowHeightService.prototype.collapseDetail = function (rowIndex) {
        if (this.height(rowIndex) > this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight * -1);
        }
    };
    RowHeightService.prototype.index = function (position) {
        if (position < 0) {
            return undefined;
        }
        var result = this.offsets.reduce(function (prev, current, idx) {
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
    };
    RowHeightService.prototype.offset = function (rowIndex) {
        return this.offsets[rowIndex];
    };
    RowHeightService.prototype.totalHeight = function () {
        return this.heights.reduce(function (prev, curr) { return prev + curr; }, 0);
    };
    RowHeightService.prototype.updateRowHeight = function (rowIndex, value) {
        this.heights[rowIndex] += value;
        this.offsets = update(this.offsets, rowIndex, value);
    };
    return RowHeightService;
}());

var normalize = function (x) { return Math.max(x, 0); };
/**
 * @hidden
 */
var ScrollAction = /** @class */ (function () {
    function ScrollAction(offset) {
        this.offset = offset;
    }
    return ScrollAction;
}());
/**
 * @hidden
 */
var PageAction = /** @class */ (function () {
    function PageAction(skip) {
        this.skip = skip;
    }
    return PageAction;
}());
/**
 * @hidden
 */
var ScrollerService = /** @class */ (function () {
    function ScrollerService(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
        this.bottomOffset = 0;
        this.topOffset = 0;
    }
    ScrollerService.prototype.create = function (rowHeightService, skip, take, total, topOffset, bottomOffset, direction) {
        var _this = this;
        if (topOffset === void 0) { topOffset = 0; }
        if (bottomOffset === void 0) { bottomOffset = 0; }
        if (direction === void 0) { direction = 'vertical'; }
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take;
        this.take = take;
        this.total = total;
        this.lastScroll = 0;
        this.topOffset = topOffset;
        this.bottomOffset = bottomOffset;
        this.direction = direction;
        var subject = new ReplaySubject(2);
        var offsetBufferRows = this.rowsForHeight(topOffset);
        var skipWithOffset = normalize(skip - offsetBufferRows);
        subject.next(new ScrollAction(this.rowOffset(skipWithOffset)));
        if (offsetBufferRows) {
            subject.next(new PageAction(skipWithOffset));
        }
        this.subscription = Observable.create(function (observer) {
            _this.unsubscribe();
            _this.scrollSubscription = _this.scrollObservable.subscribe(function (x) { return _this.onScroll(x, observer); });
        }).subscribe(function (x) { return subject.next(x); });
        return subject;
    };
    ScrollerService.prototype.destroy = function () {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ScrollerService.prototype.onScroll = function (_a, observer) {
        var scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
        var scrollPosition = this.direction === 'vertical' ? scrollTop : scrollLeft;
        var offsetSize = this.direction === 'vertical' ? offsetHeight : offsetWidth;
        if (this.lastScroll === scrollPosition) {
            return;
        }
        var up = this.lastScroll >= scrollPosition;
        this.lastScroll = scrollPosition;
        var firstItemIndex = this.rowHeightService.index(normalize(scrollPosition - this.topOffset));
        var lastItemIndex = this.rowHeightService.index(normalize(scrollPosition + offsetSize - this.bottomOffset));
        if (!up && lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
            this.firstLoaded = firstItemIndex;
            observer.next(new ScrollAction(this.rowOffset(firstItemIndex)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
        if (up && firstItemIndex <= this.firstLoaded) {
            var nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = normalize(firstItemIndex - nonVisibleBuffer);
            observer.next(new ScrollAction(this.rowOffset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
    };
    ScrollerService.prototype.rowOffset = function (index) {
        return this.rowHeightService.offset(index) + this.topOffset;
    };
    ScrollerService.prototype.rowsForHeight = function (height) {
        return Math.ceil(height / this.rowHeightService.height(0));
    };
    ScrollerService.prototype.unsubscribe = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = null;
        }
    };
    return ScrollerService;
}());

var _a$5, _b, _c;
/**
 * @hidden
 */
var SCROLLER_FACTORY_TOKEN = new InjectionToken('dateinputs-scroll-service-factory');
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
var FRAME_DURATION = 17;
var scrollModifiers = (_a$5 = {},
    _a$5[ScrollDirection.Forward] = function (step) { return function (value) { return value + step; }; },
    _a$5[ScrollDirection.Backward] = function (step) { return function (value) { return value - step; }; },
    _a$5);
var scrollNormalizers = (_b = {},
    _b[ScrollDirection.Forward] = function (end) { return function (value) { return Math.min(value, end); }; },
    _b[ScrollDirection.Backward] = function (end) { return function (value) { return Math.max(value, end); }; },
    _b);
var scrollValidators = (_c = {},
    _c[ScrollDirection.Forward] = function (end) { return function (start) { return start < end; }; },
    _c[ScrollDirection.Backward] = function (end) { return function (start) { return start > end; }; },
    _c);
var differenceToScroll = function (scrollTop, staticOffset, maxScrollDifference) {
    return Math.min(Math.abs(staticOffset - scrollTop), maxScrollDifference);
};
/**
 * @hidden
 */
var VirtualizationComponent = /** @class */ (function () {
    function VirtualizationComponent(scrollerFactory, container, renderer, zone) {
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
    Object.defineProperty(VirtualizationComponent.prototype, "totalVertexLength", {
        get: function () {
            var value = this.totalSize + "px";
            return this.direction === 'vertical' ? { height: value } : { width: value };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerOffsetSize", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerScrollSize", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerScrollPosition", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'scrollTop' : 'scrollLeft');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "wrapperClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "horizontalClass", {
        get: function () {
            return this.direction === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    VirtualizationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.direction || changes.take || changes.total) {
            this.initServices();
            this.totalSize = this.rowHeightService.totalHeight() + this.bottomOffset;
        }
    };
    VirtualizationComponent.prototype.ngOnInit = function () {
        if (!this.rowHeightService) {
            this.rowHeightService = this.createRowHeightService();
        }
    };
    VirtualizationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.containerScrollSubscription = _this.scroll$()
                .pipe(map(function (event) { return event.target; }))
                .subscribe(function (t) {
                _this.dispatcher.next(t);
                _this.emitActiveIndex();
            });
        });
    };
    VirtualizationComponent.prototype.ngOnDestroy = function () {
        if (this.containerScrollSubscription) {
            this.containerScrollSubscription.unsubscribe();
        }
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
    };
    VirtualizationComponent.prototype.getContainerProperty = function (propertyName) {
        return this.container.nativeElement[propertyName];
    };
    VirtualizationComponent.prototype.activeIndex = function () {
        return this.itemIndex(Math.ceil(this.containerScrollPosition)); //handle subpixeling
    };
    VirtualizationComponent.prototype.itemIndex = function (offset) {
        return this.rowHeightService.index(offset);
    };
    VirtualizationComponent.prototype.itemOffset = function (index) {
        return this.rowHeightService.offset(index);
    };
    VirtualizationComponent.prototype.isIndexVisible = function (index) {
        if (!this.rowHeightService) {
            return false;
        }
        var containerTop = this.containerScrollPosition;
        var containerBottom = containerTop + this.containerOffsetSize;
        var top = this.rowHeightService.offset(index);
        var bottom = top + this.rowHeightService.height(index);
        return top >= containerTop && bottom <= containerBottom;
    };
    VirtualizationComponent.prototype.isListScrolled = function (index) {
        return this.containerScrollPosition !== this.rowHeightService.offset(index);
    };
    VirtualizationComponent.prototype.scrollTo = function (value) {
        var scrollProperty = this.direction === "vertical" ? 'scrollTop' : 'scrollLeft';
        this.renderer.setProperty(this.container.nativeElement, scrollProperty, value);
    };
    VirtualizationComponent.prototype.scrollToIndex = function (index) {
        //XXX: scrolling with tick is required to prevent list jump in Chrome.
        //Original issue: focus first day in the month and press LEFT arrow.
        //Notice how the view jumps on every day change.
        //
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.resolvedPromise.then(function () {
                _this.scrollTo(_this.rowHeightService.offset(index));
            });
        });
    };
    VirtualizationComponent.prototype.scrollToBottom = function () {
        this.scrollTo(this.totalSize);
    };
    VirtualizationComponent.prototype.animateToIndex = function (index) {
        var _this = this;
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
        var indexOffset = this.rowHeightService.offset(index);
        var direction = this.getContainerScrollDirection(indexOffset);
        var _a = this.scrollRange(indexOffset, direction), start = _a.start, end = _a.end;
        if (start === end) {
            return;
        }
        var step = this.scrollStep(start, end);
        var modifyScroll = scrollModifiers[direction](step);
        var normalizeScroll = scrollNormalizers[direction](end);
        var isScrollValid = scrollValidators[direction](modifyScroll(end));
        this.zone.runOutsideAngular(function () {
            _this.animationSubscription =
                combineLatest(of(start), interval(0, animationFrameScheduler)).pipe(map(function (stream) { return stream[0]; }), scan(modifyScroll), takeWhile(isScrollValid), map(normalizeScroll)).subscribe(function (x) { return _this.scrollTo(x); });
        });
    };
    VirtualizationComponent.prototype.scrollRange = function (indexOffset, direction) {
        var containerScroll = this.containerScrollPosition;
        if (parseInt(indexOffset, 10) === parseInt(containerScroll, 10)) {
            return { start: indexOffset, end: indexOffset };
        }
        var maxScroll = this.containerMaxScroll();
        var sign = direction === ScrollDirection.Backward ? 1 : -1;
        var difference = differenceToScroll(containerScroll, indexOffset, this.maxScrollDifference);
        var end = Math.min(indexOffset, maxScroll);
        var start = Math.min(Math.max(end + (sign * difference), 0), maxScroll);
        return { start: start, end: end };
    };
    VirtualizationComponent.prototype.scrollStep = function (start, end) {
        return Math.abs(end - start) / (this.scrollDuration / FRAME_DURATION);
    };
    VirtualizationComponent.prototype.scroll$ = function () {
        return isDocumentAvailable() ? fromEvent(this.container.nativeElement, 'scroll') : EMPTY;
    };
    VirtualizationComponent.prototype.initServices = function () {
        var _this = this;
        this.rowHeightService = this.createRowHeightService();
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        this.scrollSubscription = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total, this.topOffset, this.scrollOffsetSize, this.direction)
            .subscribe(function (x) {
            if (x instanceof PageAction) {
                _this.pageChange.emit(x);
            }
            else {
                _this.scrollChange.emit(x);
            }
        });
    };
    VirtualizationComponent.prototype.createRowHeightService = function () {
        var dimension = this.direction === 'vertical' ? this.itemHeight : this.itemWidth;
        return new RowHeightService(this.total, dimension, 0);
    };
    VirtualizationComponent.prototype.emitActiveIndex = function () {
        var index = this.rowHeightService.index(this.containerScrollPosition - this.topOffset);
        if (this.lastActiveIndex !== index) {
            this.lastActiveIndex = index;
            this.activeIndexChange.emit(index);
        }
    };
    VirtualizationComponent.prototype.containerMaxScroll = function () {
        return this.containerScrollSize - this.containerOffsetSize;
    };
    VirtualizationComponent.prototype.getContainerScrollDirection = function (indexOffset) {
        return indexOffset < this.containerScrollPosition ? ScrollDirection.Backward : ScrollDirection.Forward;
    };
    VirtualizationComponent.decorators = [
        { type: Component, args: [{
                    providers: [{
                            provide: SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }],
                    selector: 'kendo-virtualization',
                    template: "\n    <ng-content></ng-content>\n    <div\n        class=\"k-scrollable-placeholder\"\n        [class.k-scrollable-horizontal-placeholder]=\"direction === 'horizontal'\"\n        [ngStyle]=\"totalVertexLength\"\n    ></div>\n  "
                },] },
    ];
    /** @nocollapse */
    VirtualizationComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return VirtualizationComponent;
}());

/**
 * @hidden
 */
var closestInScope = function (node, predicate, scope) {
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
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

/* tslint:disable:component-selector-name  component-selector-type */
var ITEMS_COUNT = 30;
/**
 * @hidden
 */
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(bus, dom, intl, cdr, renderer) {
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
    Object.defineProperty(NavigationComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NavigationComponent.prototype.ngOnInit = function () {
        this.dom.ensureHeights();
        var calendarHeight = this.dom.calendarHeight;
        this.itemHeight = this.dom.navigationItemHeight;
        this.maxViewHeight = this.dom.monthViewHeight;
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    };
    NavigationComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        var viewDate = dateInRange(this.focusedDate, this.min, this.max);
        var total = this.service.total(this.min, this.max);
        var totalChanged = this.total && this.total !== total;
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        if (totalChanged || !this.service.isInArray(viewDate, this.dates)) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = this.service.skip(this.focusedDate, this.min);
        }
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    };
    NavigationComponent.prototype.ngAfterViewInit = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.ngAfterViewChecked = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.onPageChange = function (_a) {
        var skip = _a.skip;
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    };
    NavigationComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        var el = this.list.nativeElement;
        var translate = "translateY(" + offset + "px)";
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    };
    NavigationComponent.prototype.handleDateChange = function (args) {
        var item = closestInScope(args.target, function (node) { return node.hasAttribute('data-date-index'); }, this.list.nativeElement);
        if (item) {
            var index = parseInt(item.getAttribute('data-date-index'), 10);
            var candidate = this.dates[index];
            this.valueChange.emit(cloneDate(candidate));
        }
    };
    NavigationComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    NavigationComponent.prototype.intlChange = function () {
        if (this.activeView === CalendarViewEnum.month) {
            this.cdr.markForCheck();
        }
    };
    NavigationComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-navigation',
                    template: "\n    <span class=\"k-calendar-navigation-highlight\"></span>\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [maxScrollDifference]=\"maxViewHeight\"\n        (pageChange)=\"onPageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n    >\n        <ul #list class=\"k-reset\" [kendoEventsOutsideAngular]=\"{ click: handleDateChange }\" [scope]=\"this\">\n            <li *kFor=\"let date of dates; let index=index\" [attr.data-date-index]=\"index\">\n                <span [class.k-calendar-navigation-marker]=\"service.isRangeStart(date)\">\n                    <ng-template [ngIf]=\"!templateRef\">{{service.navigationTitle(date)}}</ng-template>\n                    <ng-template\n                        [ngIf]=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngTemplateOutletContext]=\"{ $implicit: service.navigationTitle(date), activeView: activeViewValue, date: date }\"\n                    ></ng-template>\n                </span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    NavigationComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: CalendarDOMService },
        { type: IntlService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return NavigationComponent;
}());

var VIEWS_COUNT = 5;
var isEqualMonthYear = function (date1, date2) { return (date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()); };
/**
 * @hidden
 */
var ViewListComponent = /** @class */ (function () {
    function ViewListComponent(bus, cdr, intl, dom, renderer) {
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
    Object.defineProperty(ViewListComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.isMonthView();
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentMonthClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentYearClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentDecadeClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.decade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewListComponent.prototype, "getComponentCenturyClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.century;
        },
        enumerable: true,
        configurable: true
    });
    ViewListComponent.prototype.ngOnInit = function () {
        this.weekNames = this.getWeekNames();
        this.bottomOffset = this.getBottomOffset();
        this.viewOffset = -1 * this.dom.headerHeight;
        this.viewHeight = this.dom.viewHeight(this.activeView);
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    };
    ViewListComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.cols = new Array(this.service.rowLength(this.weekNumber)).fill('');
        this.colWidth = Math.round(100 / this.cols.length);
        this.weekNames = hasChange(changes, 'weekNumber') && this.weekNumber ? this.getWeekNames() : this.weekNames;
        var activeViewChanged = hasChange(changes, 'activeView');
        var focusedDate = this.focusedDate;
        var viewDate = dateInRange(this.service.viewDate(focusedDate, this.max, this.minViewsToRender), this.min, this.max);
        var total = this.service.total(this.min, this.max);
        var totalChanged = this.total && this.total !== total;
        var generateDates = totalChanged || !this.service.isInArray(focusedDate, this.dates);
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
        var updateIndex = hasChange(changes, 'focusedDate') || activeViewChanged;
        if (generateDates || updateIndex || this.virtualization.isIndexVisible(this.skip)) {
            this.indexToScroll = this.service.skip(focusedDate, this.min);
        }
    };
    ViewListComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    };
    ViewListComponent.prototype.ngAfterViewInit = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    ViewListComponent.prototype.ngAfterViewChecked = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization[this.animateToIndex ? 'animateToIndex' : 'scrollToIndex'](this.indexToScroll);
        this.animateToIndex = true;
        this.indexToScroll = -1;
    };
    ViewListComponent.prototype.onPageChange = function (_a) {
        var skip = _a.skip;
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    };
    ViewListComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        var el = this.list.nativeElement;
        var translate = "translateY(" + offset + "px)";
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    };
    ViewListComponent.prototype.setActiveDate = function (index) {
        var candidate = this.service.addToDate(this.min, index);
        if (isEqual(this.activeDate, candidate)) {
            return;
        }
        this.activeDate = candidate;
        this.activeDateChange.emit(candidate);
        this.cdr.detectChanges();
    };
    ViewListComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(candidate);
    };
    ViewListComponent.prototype.isMonthView = function () {
        return this.activeView === CalendarViewEnum.month;
    };
    ViewListComponent.prototype.isScrolled = function () {
        return this.virtualization.isListScrolled(this.service.skip(this.focusedDate, this.min));
    };
    ViewListComponent.prototype.getBottomOffset = function () {
        return this.getScrollableHeight() - this.dom.viewHeight(this.activeView);
    };
    ViewListComponent.prototype.getScrollableHeight = function () {
        return this.activeView === CalendarViewEnum.month ?
            this.dom.scrollableContentHeight :
            this.dom.scrollableYearContentHeight;
    };
    ViewListComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    ViewListComponent.prototype.getWeekNames = function () {
        var weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return this.weekNumber ? [''].concat(weekNames) : weekNames;
    };
    ViewListComponent.prototype.intlChange = function () {
        this.weekNames = this.getWeekNames();
        if (this.isMonthView()) {
            this.cdr.markForCheck();
        }
    };
    ViewListComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-viewlist',
                    template: "\n    <kendo-calendar-header\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [activeView]=\"activeView\"\n        [templateRef]=\"headerTitleTemplateRef\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-calendar-weekdays\" style=\"table-layout: auto;\" *ngIf=\"isMonthView()\">\n        <thead>\n            <tr>\n                <th *ngFor=\"let name of weekNames\" [style.width.%]=\"colWidth\">{{name}}</th>\n            </tr>\n        </thead>\n    </table>\n    <kendo-virtualization\n        [tabindex]=\"-1\"\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"viewHeight\"\n        [topOffset]=\"viewOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [scrollOffsetSize]=\"viewOffset\"\n        [maxScrollDifference]=\"viewHeight\"\n        (pageChange)=\"onPageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n        (activeIndexChange)=\"setActiveDate($event)\"\n        >\n        <table #list>\n            <colgroup><col *ngFor=\"let _ of cols\" /></colgroup>\n\n            <tbody *kFor=\"let date of dates\"\n                   kendoCalendarView\n                   role=\"rowgroup\"\n                   [activeView]=\"activeView\"\n                   [isActive]=\"isActive\"\n                   [min]=\"min\" [max]=\"max\"\n                   [cellUID]=\"cellUID\"\n                   [focusedDate]=\"focusedDate\"\n                   [selectedDate]=\"value\"\n                   [weekNumber]=\"weekNumber\"\n                   [templateRef]=\"cellTemplateRef\"\n                   [weekNumberTemplateRef]=\"weekNumberTemplateRef\"\n                   [viewDate]=\"date\"\n                   (change)=\"handleDateChange($event)\"\n            ></tbody>\n        </table>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    ViewListComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: CalendarDOMService },
        { type: Renderer2 }
    ]; };
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
    return ViewListComponent;
}());

var KEY_TO_ACTION = {
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
var NavigationService = /** @class */ (function () {
    function NavigationService(bus) {
        this.bus = bus;
    }
    NavigationService.prototype.action = function (event) {
        var action = "" + (event.ctrlKey || event.metaKey ? 'meta+' : '') + event.keyCode;
        return KEY_TO_ACTION[action];
    };
    NavigationService.prototype.move = function (value, action, activeView) {
        var service = this.bus.service(activeView);
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
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: BusViewService }
    ]; };
    return NavigationService;
}());

var divideByMagnitude = function (magnitude) { return function (x) { return Math.floor(x / magnitude); }; };
var powerByMagnitude = function (magnitude) { return function (x) { return x * magnitude; }; };
/**
 * @hidden
 */
var ScrollSyncService = /** @class */ (function () {
    function ScrollSyncService(dom, zone) {
        this.dom = dom;
        this.zone = zone;
    }
    ScrollSyncService.prototype.configure = function (activeView) {
        var magnitude = Math.max(this.dom.viewHeight(activeView) / this.dom.navigationItemHeight, 1);
        this.divideByMagnitude = divideByMagnitude(magnitude);
        this.powerByMagnitude = powerByMagnitude(magnitude);
    };
    ScrollSyncService.prototype.sync = function (navigator, view) {
        var _this = this;
        this.unsubscribe();
        if (!navigator || !view) {
            return;
        }
        this.navigator = navigator;
        this.view = view;
        this.zone.runOutsideAngular(function () {
            var navScrolled, monthScrolled;
            _this.navSubscription = navigator.scroll$()
                .subscribe(function (e) {
                if (monthScrolled) {
                    monthScrolled = false;
                    return;
                }
                navScrolled = true;
                _this.scrollSiblingOf(e.target);
            });
            _this.viewSubscription = view.scroll$()
                .subscribe(function (e) {
                if (navScrolled) {
                    navScrolled = false;
                    return;
                }
                monthScrolled = true;
                _this.scrollSiblingOf(e.target);
            });
        });
    };
    ScrollSyncService.prototype.scrollSiblingOf = function (scrolledElement) {
        var component = this.siblingComponent(scrolledElement);
        var scrollTop = this.calculateScroll(component, scrolledElement.scrollTop);
        component.scrollTo(scrollTop);
    };
    ScrollSyncService.prototype.siblingComponent = function (scrollableElement) {
        return this.navigator.container.nativeElement === scrollableElement ? this.view : this.navigator;
    };
    ScrollSyncService.prototype.calculateScroll = function (component, scrollTop) {
        var modifier = component === this.navigator ? this.divideByMagnitude : this.powerByMagnitude;
        return modifier(scrollTop);
    };
    ScrollSyncService.prototype.destroy = function () {
        this.unsubscribe();
    };
    ScrollSyncService.prototype.unsubscribe = function () {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }
    };
    ScrollSyncService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollSyncService.ctorParameters = function () { return [
        { type: CalendarDOMService },
        { type: NgZone }
    ]; };
    return ScrollSyncService;
}());

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
var CellTemplateDirective = /** @class */ (function () {
    function CellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return CellTemplateDirective;
}());

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
var MonthCellTemplateDirective = /** @class */ (function () {
    function MonthCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MonthCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarMonthCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    MonthCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return MonthCellTemplateDirective;
}());

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
var YearCellTemplateDirective = /** @class */ (function () {
    function YearCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    YearCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarYearCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    YearCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return YearCellTemplateDirective;
}());

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
var DecadeCellTemplateDirective = /** @class */ (function () {
    function DecadeCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DecadeCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarDecadeCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    DecadeCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return DecadeCellTemplateDirective;
}());

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
var CenturyCellTemplateDirective = /** @class */ (function () {
    function CenturyCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CenturyCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarCenturyCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CenturyCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return CenturyCellTemplateDirective;
}());

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
var WeekNumberCellTemplateDirective = /** @class */ (function () {
    function WeekNumberCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    WeekNumberCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarWeekNumberCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    WeekNumberCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return WeekNumberCellTemplateDirective;
}());

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
var HeaderTitleTemplateDirective = /** @class */ (function () {
    function HeaderTitleTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    HeaderTitleTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarHeaderTitleTemplate]'
                },] },
    ];
    /** @nocollapse */
    HeaderTitleTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return HeaderTitleTemplateDirective;
}());

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
var NavigationItemTemplateDirective = /** @class */ (function () {
    function NavigationItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NavigationItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarNavigationItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    NavigationItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NavigationItemTemplateDirective;
}());

/**
 * @hidden
 */
var PickerService = /** @class */ (function () {
    function PickerService() {
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.sameDateSelected = new EventEmitter();
        this.dateCompletenessChange = new EventEmitter();
    }
    return PickerService;
}());

/**
 * @hidden
 */
var minValidator = function (minValue) {
    return function (control) {
        var err = {
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
var maxValidator = function (maxValue) {
    return function (control) {
        var err = {
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

var noop$1 = function () { return false; };
var DISABLED_DATES_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/disabled-dates/';
/**
 * @hidden
 */
var DisabledDatesService = /** @class */ (function () {
    function DisabledDatesService() {
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
    DisabledDatesService.prototype.initialize = function (disabledDates) {
        if (typeof disabledDates === 'function') {
            this.isDateDisabled = function (date) { return disabledDates(getDate(date)); };
        }
        else if (isNumberArray(disabledDates)) {
            var disabledWeekDays_1 = new Set(disabledDates);
            this.isDateDisabled = function (date) { return disabledWeekDays_1.has(date.getDay()); };
        }
        else if (isDateArray(disabledDates)) {
            var normalizedDisabledDates_1 = new Set(disabledDates.map(function (date) { return getDate(date).getTime(); }));
            this.isDateDisabled = function (date) { return normalizedDisabledDates_1.has(getDate(date).getTime()); };
        }
        else {
            this.isDateDisabled = noop$1;
            this.notifyInvalidInput(disabledDates);
        }
        this.notifyServiceChange();
    };
    DisabledDatesService.prototype.notifyInvalidInput = function (disabledDates) {
        if (isPresent(disabledDates) && isDevMode()) {
            throw new Error("The 'disabledDates' value should be a function, a Day array or a Date array. Check " + DISABLED_DATES_DOC_LINK + " for more information.");
        }
    };
    DisabledDatesService.prototype.notifyServiceChange = function () {
        this.changes.next();
    };
    DisabledDatesService.decorators = [
        { type: Injectable },
    ];
    return DisabledDatesService;
}());

/* tslint:disable:no-forward-ref */
var BOTTOM_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
var virtualizationProp = function (x) { return x ? x.virtualization : null; };
/**
 * @hidden
 */
var CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
var CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
var KENDO_INPUT_PROVIDER = {
    provide: KendoInput,
    useExisting: forwardRef(function () { return CalendarComponent; }) //tslint:disable-line:no-use-before-declare
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
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(bus, dom, element, navigator, renderer, cdr, ngZone, injector, scrollSyncService, disabledDatesService, pickerService) {
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
    Object.defineProperty(CalendarComponent.prototype, "focusedDate", {
        get: function () {
            return this._focusedDate;
        },
        /**
         * Sets or gets the `focusedDate` property of the Calendar and
         * defines the focused date of the component
         * ([see example]({% slug dates_calendar %}#toc-focused-dates)).
         *
         * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
         */
        set: function (focusedDate) {
            this._focusedDate = focusedDate || getToday();
            this.setAriaActivedescendant();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Sets or gets the `min` property of the Calendar and
         * defines the minimum allowed date value
         * ([see example]({% slug dateranges_calendar %})).
         * By default, the `min` value is `1900-1-1`.
         */
        set: function (min) {
            this._min = min || new Date(MIN_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Sets or gets the `max` property of the Calendar and
         * defines the maximum allowed date value
         * ([see example]({% slug dateranges_calendar %})).
         * By default, the `max` value is `2099-12-31`.
         */
        set: function (max) {
            this._max = max || new Date(MAX_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "value", {
        /**
         * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
         *
         * > The `value` has to be a valid
         * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        get: function () {
            return this._value;
        },
        set: function (candidate) {
            this.verifyValue(candidate);
            this._value = cloneDate(candidate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "disabledDates", {
        /**
         * Sets the dates of the Calendar that will be disabled
         * ([see example]({% slug disabled_dates_calendar %})).
         */
        set: function (value) {
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "navigationItemTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.navigationItemTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "activeViewEnum", {
        get: function () {
            var activeView = CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return CalendarViewEnum[this.topView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "widgetRole", {
        get: function () {
            return 'grid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "calendarTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dom.calculateHeights(this.element.nativeElement);
        this.scrollSyncService.configure(this.activeViewEnum);
        this.viewChangeSubscription = this.bus.viewChanged.subscribe(function (_a) {
            var view = _a.view;
            _this.activeView = CalendarViewEnum[view];
            _this.emitEvent(_this.activeViewChange, _this.activeView);
            _this.scrollSyncService.configure(view);
            _this.detectChanges(); // requires zone if templates
        });
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.ngZone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        this.scrollSyncService.configure(this.activeViewEnum);
        var useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        var focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
        this.focusedDate = !isEqual(this.focusedDate, focusedDate) ? focusedDate : this.focusedDate;
        if (changes.navigation) {
            this.syncNavigation = true;
        }
        if (changes.min || changes.max || changes.rangeValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.onValidatorChange();
        }
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        this.setAriaActivedescendant();
    };
    CalendarComponent.prototype.ngAfterViewChecked = function () {
        if (!this.syncNavigation) {
            return;
        }
        this.syncNavigation = false;
        this.scrollSyncService.sync(virtualizationProp(this.navigationView), virtualizationProp(this.monthView));
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.scrollSyncService.destroy();
        this.viewChangeSubscription.unsubscribe();
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
        if (this.pickerService) {
            this.pickerService.calendar = null;
        }
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
        this.destroyed = true;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.onResize = function () {
        this.focusedDate = new Date(this.focusedDate);
        this.cdr.detectChanges();
    };
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
    CalendarComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the Calendar component.
     */
    CalendarComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleNavigation = function (candidate) {
        if (this.disabled) {
            return;
        }
        var focusTarget = candidate ? new Date(cloneDate(candidate).setDate(1)) : this.focusedDate;
        this.focusedDate = dateInRange(focusTarget, this.min, this.max);
        this.detectChanges();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.onPageChange = function () {
        var _this = this;
        if (!NgZone.isInAngularZone()) {
            if (this.pageChangeSubscription) {
                this.pageChangeSubscription.unsubscribe();
            }
            this.pageChangeSubscription = from(this.resolvedPromise)
                .subscribe(function () {
                _this.detectChanges(); // requires zone if templates
            });
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.handleDateChange = function (candidate) {
        var _this = this;
        var canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        var isSameDate = !canNavigateDown && isEqual(candidate, this.value);
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
            this.ngZone.run(function () {
                _this.value = cloneDate(candidate);
                _this.onControlChange(cloneDate(candidate));
                _this.valueChange.emit(cloneDate(candidate));
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.activeCellTemplate = function () {
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
    };
    /**
     * @hidden
     */
    CalendarComponent.prototype.emitEvent = function (emitter, args) {
        if (hasObservers(emitter)) {
            this.ngZone.run(function () {
                emitter.emit(args);
            });
        }
    };
    CalendarComponent.prototype.setClasses = function (element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
    };
    CalendarComponent.prototype.verifyChanges = function () {
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error("The topView should be greater than bottomView. See " + BOTTOM_VIEW_DOC_LINK + " and " + TOP_VIEW_DOC_LINK + ".");
        }
    };
    CalendarComponent.prototype.verifyValue = function (candidate) {
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK + " for possible resolution.");
        }
    };
    CalendarComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'blur', this.handleBlur.bind(this)), this.renderer.listen(element, 'focus', this.handleFocus.bind(this)), this.renderer.listen(element, 'mousedown', preventDefault), this.renderer.listen(element, 'click', this.handleClick.bind(this)), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
    };
    CalendarComponent.prototype.emitBlur = function (args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    CalendarComponent.prototype.emitFocus = function () {
        if (this.pickerService) {
            this.pickerService.onFocus.emit();
        }
    };
    CalendarComponent.prototype.handleBlur = function (args) {
        var _this = this;
        this.isActive = false;
        // the injector can get the NgControl instance of the parent component (for example, the DateTimePicker)
        // and enters the zone for no reason because the parent component is still untouched
        if (!this.pickerService && requiresZoneOnBlur(this.control)) {
            this.ngZone.run(function () {
                _this.onControlTouched();
                _this.emitBlur(args);
                _this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
            this.detectChanges();
        }
    };
    CalendarComponent.prototype.handleFocus = function () {
        this.isActive = true;
        if (!NgZone.isInAngularZone()) {
            this.detectChanges();
        }
        this.emitFocus();
    };
    CalendarComponent.prototype.handleClick = function () {
        if (!this.isActive) {
            if (this.monthView.isScrolled()) {
                this.focusedDate = cloneDate(this.focusedDate); //XXX: forces change detect
                this.detectChanges();
            }
            this.focus();
        }
    };
    CalendarComponent.prototype.handleKeydown = function (args) {
        // reserve the alt + arrow key commands for the picker
        var arrowKeyPressed = [Keys.ArrowUp, Keys.ArrowRight, Keys.ArrowDown, Keys.ArrowLeft].indexOf(args.keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && args.altKey) {
            return;
        }
        var candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(args), this.activeViewEnum), this.min, this.max);
        if (!isEqual(this.focusedDate, candidate)) {
            this.focusedDate = candidate;
            this.detectChanges();
            args.preventDefault();
        }
        if (args.keyCode === Keys.Enter) {
            this.handleDateChange(this.focusedDate);
        }
    };
    CalendarComponent.prototype.detectChanges = function () {
        if (!this.destroyed) {
            this.cdr.detectChanges();
        }
    };
    CalendarComponent.prototype.emitSameDate = function () {
        if (this.pickerService) {
            this.pickerService.sameDateSelected.emit();
        }
    };
    CalendarComponent.prototype.setAriaActivedescendant = function () {
        if (!isPresent(this.element)) {
            return;
        }
        var focusedCellId = this.cellUID + this.focusedDate.getTime();
        this.renderer.setAttribute(this.element.nativeElement, 'aria-activedescendant', focusedCellId);
    };
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
                    template: "\n    <ng-container kendoCalendarLocalizedMessages\n        i18n-today=\"kendo.calendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n    >\n    </ng-container>\n    <kendo-calendar-navigation\n        *ngIf=\"navigation\"\n        [activeView]=\"activeViewEnum\"\n        [focusedDate]=\"focusedDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [templateRef]=\"navigationItemTemplate?.templateRef\"\n        (valueChange)=\"handleNavigation($event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-navigation>\n    <kendo-calendar-viewlist\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (activeDateChange)=\"emitEvent(activeViewDateChange, $event)\"\n        (pageChange)=\"onPageChange()\"\n    >\n    </kendo-calendar-viewlist>\n    <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
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
    ]; };
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
    return CalendarComponent;
}());

/**
 * @hidden
 */
var incompleteDateValidator = function () {
    return function (control, incomplete) {
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
var MIN_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-min';
var MAX_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DateInputComponent/#toc-max';
var VALUE_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/dateinput/#toc-using-with-json';
var DATE_PART_REGEXP = /year|month|<day>/;
var TIME_PART_REGEXP = /hour|minute|second|millisecond/;
var SHORT_PATTERN_LENGTH_REGEXP = /d|M|H|h|m|s/;
var padZero = function (length) { return new Array(Math.max(length, 0)).fill('0').join(''); };
var unpadZero = function (value) { return value.replace(/^0*/, ''); };
var Mask = /** @class */ (function () {
    function Mask() {
        this.symbols = "";
    }
    return Mask;
}());
var KendoDate = /** @class */ (function () {
    function KendoDate(intl, formatPlaceholder, format, value) {
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
            var sampleFormat = this.dateFormatString(this.value, this.format).symbols;
            for (var i = 0; i < sampleFormat.length; i++) {
                this.setExisting(sampleFormat[i], false);
            }
        }
        else {
            this.value = cloneDate(value);
        }
    }
    KendoDate.prototype.hasValue = function () {
        var _this = this;
        var pred = function (a, p) { return a || p.type !== 'literal' && p.type !== 'dayperiod' && _this.getExisting(p.pattern[0]); };
        return this.intl.splitDateFormat(this.format).reduce(pred, false);
    };
    KendoDate.prototype.getDateObject = function () {
        for (var i = 0; i < this.knownParts.length; i++) {
            if (!this.getExisting(this.knownParts[i])) {
                return null;
            }
        }
        return cloneDate(this.value);
    };
    KendoDate.prototype.getTextAndFormat = function () {
        return this.merge(this.intl.formatDate(this.value, this.format), this.dateFormatString(this.value, this.format));
    };
    KendoDate.prototype.getExisting = function (symbol) {
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
    };
    KendoDate.prototype.setExisting = function (symbol, value) {
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
    };
    KendoDate.prototype.modifyPart = function (symbol, offset) {
        var newValue = cloneDate(this.value);
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
    };
    KendoDate.prototype.parsePart = function (symbol, currentChar, resetSegmentValue) {
        if (!currentChar) {
            this.resetLeadingZero();
            this.setExisting(symbol, false);
            return { value: null, switchToNext: false };
        }
        var baseDate = this.intl.formatDate(this.value, this.format);
        var dateParts = this.dateFormatString(this.value, this.format);
        var baseFormat = dateParts.symbols;
        var replaced = false;
        var prefix = "";
        var current = "";
        var suffix = "";
        for (var i = 0; i < baseDate.length; i++) {
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
        var currentMaxLength = current.length - 3;
        var parsedDate = null;
        var month = this.matchMonth(currentChar);
        var dayPeriod = this.matchDayPeriod(currentChar, symbol);
        var isZeroCurrentChar = currentChar === '0';
        var leadingZero = (this.leadingZero || {})[symbol] || 0;
        if (isZeroCurrentChar) {
            var valueNumber = parseInt(resetSegmentValue ? currentChar : current + currentChar, 10);
            if (valueNumber === 0 && !this.isAbbrMonth(dateParts.partMap, symbol)) {
                this.incrementLeadingZero(symbol);
            }
        }
        else {
            this.resetLeadingZero();
        }
        for (var i = Math.max(0, currentMaxLength); i <= current.length; i++) {
            var middle = resetSegmentValue ? currentChar : (current.substring(i) + currentChar);
            var middleNumber = parseInt(middle, 10);
            parsedDate = this.intl.parseDate(prefix + middle + suffix, this.format);
            if (!parsedDate && !isNaN(middleNumber) && !isNaN(parseInt(currentChar, 10))) {
                if (symbol === 'M' && !month) {
                    var monthNumber = middleNumber - 1;
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
                var patternValue = this.partPattern(dateParts.partMap, symbol).pattern;
                var peekDate = this.intl.parseDate("" + prefix + this.peek(middle, patternValue) + suffix, this.format);
                var patternLength = this.patternLength(patternValue) || patternValue.length;
                var patternSatisfied = (leadingZero + (unpadZero(middle) || currentChar).length) >= patternLength;
                var switchToNext = peekDate === null || patternSatisfied;
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
    };
    KendoDate.prototype.resetLeadingZero = function () {
        var hasLeadingZero = this.leadingZero !== null;
        this.setLeadingZero(null);
        return hasLeadingZero;
    };
    KendoDate.prototype.setLeadingZero = function (leadingZero) {
        this.leadingZero = leadingZero;
    };
    KendoDate.prototype.incrementLeadingZero = function (symbol) {
        var leadingZero = this.leadingZero || {};
        leadingZero[symbol] = (leadingZero[symbol] || 0) + 1;
        this.leadingZero = leadingZero;
    };
    KendoDate.prototype.isAbbrMonth = function (parts, symbol) {
        var pattern = this.partPattern(parts, symbol);
        return pattern.type === 'month' && pattern.names;
    };
    KendoDate.prototype.partPattern = function (parts, symbol) {
        return parts.filter(function (part) { return part.pattern.indexOf(symbol) !== -1; })[0];
    };
    KendoDate.prototype.peek = function (value, pattern) {
        var peekValue = unpadZero(value) + '0';
        return padZero(pattern.length - peekValue.length) + peekValue;
    };
    KendoDate.prototype.matchMonth = function (typedChar) {
        this.typedMonthPart += typedChar.toLowerCase();
        if (!this.monthNames) {
            return "";
        }
        while (this.typedMonthPart.length > 0) {
            for (var i = 0; i < this.monthNames.length; i++) {
                if (this.monthNames[i].toLowerCase().indexOf(this.typedMonthPart) === 0) {
                    return this.monthNames[i];
                }
            }
            var monthAsNum = parseInt(this.typedMonthPart, 10);
            if (monthAsNum >= 1 && monthAsNum <= 12 && monthAsNum.toString() === this.typedMonthPart /*ensure they exact match*/) {
                return this.monthNames[monthAsNum - 1];
            }
            this.typedMonthPart = this.typedMonthPart.substring(1, this.typedMonthPart.length);
        }
        return "";
    };
    KendoDate.prototype.matchDayPeriod = function (typedChar, symbol) {
        var lowerChart = String(typedChar).toLowerCase();
        if (symbol === 'a' && this.dayPeriods) {
            if (this.dayPeriods.am.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.am;
            }
            else if (this.dayPeriods.pm.toLowerCase().startsWith(lowerChart)) {
                return this.dayPeriods.pm;
            }
        }
        return '';
    };
    KendoDate.prototype.allFormatedMonths = function () {
        var dateFormatParts = this.intl.splitDateFormat(this.format);
        for (var i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "month" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    };
    KendoDate.prototype.allDayPeriods = function () {
        var dateFormatParts = this.intl.splitDateFormat(this.format);
        for (var i = 0; i < dateFormatParts.length; i++) {
            if (dateFormatParts[i].type === "dayperiod" && dateFormatParts[i].names) {
                return this.intl.dateFormatNames(dateFormatParts[i].names);
            }
        }
        return null;
    };
    KendoDate.prototype.patternLength = function (pattern) {
        if (pattern[0] === 'y') {
            return 4;
        }
        if (SHORT_PATTERN_LENGTH_REGEXP.test(pattern)) {
            return 2;
        }
        return 0;
    };
    //TODO: REMOVE!
    KendoDate.prototype.dateFormatString = function (date, format) {
        var dateFormatParts = this.intl.splitDateFormat(format);
        var parts = [];
        var partMap = [];
        for (var i = 0; i < dateFormatParts.length; i++) {
            var partLength = this.intl.formatDate(date, { pattern: dateFormatParts[i].pattern }).length;
            while (partLength > 0) {
                parts.push(this.symbols[dateFormatParts[i].pattern[0]] || "_");
                partMap.push(dateFormatParts[i]);
                partLength--;
            }
        }
        var returnValue = new Mask();
        returnValue.symbols = parts.join("");
        returnValue.partMap = partMap;
        return returnValue;
    };
    KendoDate.prototype.merge = function (text, mask) {
        // Important: right to left.
        var resultText = "";
        var resultFormat = "";
        var format = mask.symbols;
        for (var r = format.length - 1; r >= 0; r--) {
            if (this.knownParts.indexOf(format[r]) === -1 || this.getExisting(format[r])) {
                resultText = text[r] + resultText;
                resultFormat = format[r] + resultFormat;
            }
            else {
                var currentSymbol = format[r];
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
    };
    KendoDate.prototype.dateFieldName = function (part) {
        var formatPlaceholder = this.formatPlaceholder || 'wide';
        if (formatPlaceholder[part.type]) {
            return formatPlaceholder[part.type];
        }
        if (formatPlaceholder === 'formatPattern') {
            return part.pattern;
        }
        return this.intl.dateFieldName(Object.assign(part, { nameType: formatPlaceholder }));
    };
    return KendoDate;
}());
/**
 * Represents the [Kendo UI DateInput component for Angular]({% slug overview_dateinput %}#toc-basic-usage).
 */
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent(cdr, intl, renderer, element, ngZone, injector, localization, pickerService) {
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
        this.focusableId = "k-" + guid();
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
    Object.defineProperty(DateInputComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DateInput component.
         *
         * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            if (this.autoCorrect && !isInRange(value, this.min, this.max)) {
                return;
            }
            this._value = cloneDate(value);
            this.valueUpdate.emit(cloneDate(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "wrapperClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "inputElement", {
        get: function () {
            return this.dateInput ? this.dateInput.nativeElement : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "inputValue", {
        get: function () {
            return (this.inputElement || {}).value || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateInputComponent.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (!this.wrap) {
                return;
            }
            if (!isPresent(this.pickerService)) {
                var element = this.wrap.nativeElement;
                if (value) {
                    this.renderer.addClass(element, 'k-state-focused');
                }
                else {
                    this.renderer.removeClass(element, 'k-state-focused');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    DateInputComponent.prototype.isEmpty = function () {
        return !this.currentValue || !String(this.currentValue).trim();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.ngOnChanges = function (changes) {
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
        var isEqualToKendoDate = this.kendoDate && isEqual(this.value, this.kendoDate.getDateObject());
        if (changes.format || !isEqualToKendoDate || changes.placeholder) {
            this.kendoDate = this.getKendoDate(this.value);
            this.updateElementValue(this.isActive);
        }
    };
    DateInputComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.input = null;
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.validate = function (control) {
        return this.minValidator(control) || this.maxValidator(control) || this.incompleteValidator(control, this.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue();
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.ngControl = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.ngZone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    //ngModel binding
    /**
     * @hidden
     */
    DateInputComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        this.kendoDate = this.getKendoDate(value);
        this.value = cloneDate(value);
        this.updateElementValue(this.isActive);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.triggerChange = function () {
        var value = this.kendoDate.getDateObject();
        if (+value !== +this.value) {
            this.value = cloneDate(value);
            this.notify();
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.notify = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.onControlChange(cloneDate(_this.value));
            _this.valueChange.emit(cloneDate(_this.value));
        });
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
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
    DateInputComponent.prototype.focus = function () {
        var input = this.inputElement;
        if (input) {
            input.focus();
            this.selectDateSegment(this.currentFormat[0]);
        }
    };
    /**
     * Blurs the DateInput component.
     */
    DateInputComponent.prototype.blur = function () {
        var input = this.inputElement;
        if (input) {
            input.blur();
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleButtonClick = function (offset) {
        this.arrowDirection = Arrow.None;
        this.modifyDateSegmentValue(offset);
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.modifyDateSegmentValue = function (offset) {
        var caret = this.caret();
        var symbol = this.currentFormat[caret[0]];
        var step = (this.steps || {})[this.symbolsMap[symbol]] || 1;
        this.kendoDate.modifyPart(symbol, offset * step);
        this.putDateInRange();
        this.updateElementValue(this.isActive);
        this.triggerChange();
        this.selectDateSegment(symbol);
        this.updateIncompleteValidationStatus();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.switchDateSegment = function (offset) {
        var caret = this.caret();
        if (this.kendoDate.resetLeadingZero()) {
            this.updateElementValue(this.isActive);
        }
        if (caret[0] < caret[1] && this.currentFormat[caret[0]] !== this.currentFormat[caret[1] - 1]) {
            this.selectNearestSegment(offset > 0 ? caret[0] : caret[1] - 1);
            this.resetSegmentValue = true;
            return true;
        }
        var previousFormatSymbol = this.currentFormat[caret[0]];
        var a = caret[0] + offset;
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
        var b = a;
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
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.selectDateSegment = function (symbol) {
        var begin = -1;
        var end = 0;
        for (var i = 0; i < this.currentFormat.length; i++) {
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
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleClick = function () {
        this.hasMousedown = false;
        if (this.isActive) {
            var selectionPresent = this.inputElement.selectionStart !== this.inputElement.selectionEnd;
            var placeholderToggled = isPresent(this.placeholder) && !this.kendoDate.hasValue() && !this.focusedPriorToMousedown;
            // focus first segment if the user hasn't selected something during mousedown and if the placeholder was just toggled
            var selectFirstSegment = !selectionPresent && placeholderToggled;
            var index = selectFirstSegment ? 0 : this.caret()[0];
            this.selectNearestSegment(index);
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleDragAndDrop = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleMousedown = function () {
        this.hasMousedown = true;
        this.focusedPriorToMousedown = this.isActive;
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleFocus = function (args) {
        var _this = this;
        this.isActive = true;
        this.updateElementValue();
        if (!this.hasMousedown) {
            this.caret(0, this.inputValue.length);
        }
        this.hasMousedown = false;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(function () {
                _this.emitFocus(args);
            });
        }
        else {
            this.emitFocus(args);
        }
    };
    /**
     * @hidden
     */
    DateInputComponent.prototype.handleBlur = function (args) {
        var _this = this;
        this.isActive = false;
        this.resetSegmentValue = true;
        this.kendoDate.resetLeadingZero();
        this.updateElementValue();
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.ngControl)) {
            this.ngZone.run(function () {
                _this.onControlTouched();
                _this.emitBlur(args);
                _this.cdr.markForCheck();
            });
        }
        else {
            this.emitBlur(args);
        }
    };
    DateInputComponent.prototype.getKendoDate = function (value) {
        var leadingZero = ((this.kendoDate || {}) || null).leadingZero;
        var kendoDate = new KendoDate(this.intl, this.formatPlaceholder, this.format, value);
        kendoDate.setLeadingZero(this.isActive ? leadingZero : null);
        return kendoDate;
    };
    DateInputComponent.prototype.dateSymbolMap = function () {
        var reducer = function (map$$1, part) {
            map$$1[part.pattern[0]] = part.type;
            return map$$1;
        };
        return this.intl.splitDateFormat(this.format).reduce(reducer, {});
    };
    DateInputComponent.prototype.updateElementValue = function (isActive) {
        var start = this.caret()[0]; //XXX: get caret position before input is updated
        var texts = this.kendoDate.getTextAndFormat();
        var showPlaceholder = !this.isActive && isPresent(this.placeholder) && !this.kendoDate.hasValue();
        var input = this.inputElement;
        this.currentFormat = texts[1];
        this.currentValue = !showPlaceholder ? texts[0] : '';
        this.renderer.setProperty(input, "value", this.currentValue);
        if (input.placeholder !== this.placeholder) {
            this.renderer.setProperty(input, "placeholder", this.placeholder);
        }
        if (isActive) {
            this.selectNearestSegment(start);
        }
    };
    DateInputComponent.prototype.caret = function (start, end) {
        if (end === void 0) { end = start; }
        var isPosition = start !== undefined;
        var returnValue = [start, start];
        var element = this.inputElement;
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
    };
    DateInputComponent.prototype.selectNearestSegment = function (index) {
        // Finds the nearest (in both directions) known part.
        for (var i = index, j = index - 1; i < this.currentFormat.length || j >= 0; i++, j--) {
            if (i < this.currentFormat.length && this.currentFormat[i] !== "_") {
                this.selectDateSegment(this.currentFormat[i]);
                return;
            }
            if (j >= 0 && this.currentFormat[j] !== "_") {
                this.selectDateSegment(this.currentFormat[j]);
                return;
            }
        }
    };
    DateInputComponent.prototype.verifyRange = function () {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK$1 + " and " + MAX_DOC_LINK$1 + ".");
        }
    };
    DateInputComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK$1 + " for possible resolution.");
        }
    };
    DateInputComponent.prototype.putDateInRange = function () {
        var currentDate = this.kendoDate.getDateObject();
        var candidate = dateInRange(currentDate, this.min, this.max);
        if (this.autoCorrect && !isEqual(currentDate, candidate)) {
            this.kendoDate = this.getKendoDate(candidate);
        }
    };
    DateInputComponent.prototype.updateFormatSections = function () {
        this.formatSections = this.intl.splitDateFormat(this.format)
            .reduce(function (_a, p) {
            var date = _a.date, time = _a.time;
            return {
                date: date || DATE_PART_REGEXP.test(p.type),
                time: time || TIME_PART_REGEXP.test(p.type)
            };
        }, { date: false, time: false });
    };
    DateInputComponent.prototype.intlChange = function () {
        this.updateFormatSections();
        this.kendoDate = this.getKendoDate(this.value);
        this.updateElementValue(this.isActive);
    };
    DateInputComponent.prototype.updateOnPaste = function () {
        var value = this.intl.parseDate(this.inputValue, this.format) || this.value;
        var notify = +value !== +this.value;
        this.writeValue(value);
        if (notify) {
            this.notify();
        }
    };
    DateInputComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        var mousewheelHandler = this.handleMouseWheel.bind(this);
        this.domEvents.push(this.renderer.listen(element, 'DOMMouseScroll', mousewheelHandler), this.renderer.listen(element, 'mousewheel', mousewheelHandler), this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)), this.renderer.listen(element, 'paste', this.handlePaste.bind(this)), this.renderer.listen(element, 'input', this.handleInput.bind(this)));
    };
    DateInputComponent.prototype.handleMouseWheel = function (event) {
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
    };
    DateInputComponent.prototype.handlePaste = function () {
        this.paste = true;
    };
    DateInputComponent.prototype.handleKeydown = function (event) {
        if (this.disabled || this.readonly || event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }
        if (event.keyCode === Keys.Tab) {
            var moved = this.switchDateSegment(event.shiftKey ? -1 : 1);
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
    };
    DateInputComponent.prototype.handleInput = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.paste) {
            this.updateOnPaste();
            this.paste = false;
            return;
        }
        var diff = approximateStringMatching(this.currentValue, this.currentFormat, this.inputValue, this.caret()[0]);
        var navigationOnly = (diff.length === 1 && diff[0][1] === "_");
        var switchPart = false;
        if (!navigationOnly) {
            var parsedPart = void 0;
            for (var i = 0; i < diff.length; i++) {
                parsedPart = this.kendoDate.parsePart(diff[i][0], diff[i][1], this.resetSegmentValue);
                switchPart = parsedPart.switchToNext;
            }
            var candidate = this.kendoDate.getDateObject();
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
    };
    DateInputComponent.prototype.emitFocus = function (args) {
        this.onFocus.emit();
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    };
    DateInputComponent.prototype.emitBlur = function (args) {
        this.onBlur.emit();
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    DateInputComponent.prototype.updateIncompleteValidationStatus = function () {
        var _this = this;
        var previousValue = this.isDateIncomplete;
        this.isDateIncomplete = this.kendoDate.hasValue() && this.value === null;
        if (previousValue === this.isDateIncomplete || !this.incompleteDateValidation) {
            return;
        }
        if (isPresent(this.ngControl) && !isPresent(this.pickerService)) {
            this.cdr.markForCheck();
            this.ngZone.run(function () { return _this.onValidatorChange(); });
        }
        else if (isPresent(this.pickerService)) {
            this.pickerService.dateCompletenessChange.emit();
        }
    };
    DateInputComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-dateinput',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DateInputComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DateInputComponent; }), multi: true },
                        { provide: L10N_PREFIX, useValue: 'kendo.dateinput' },
                        { provide: KendoInput, useExisting: forwardRef(function () { return DateInputComponent; }) },
                        LocalizationService
                    ],
                    selector: 'kendo-dateinput',
                    template: "\n    <ng-container kendoDateInputLocalizedMessages\n        i18n-increment=\"kendo.dateinput.increment|The label for the **Increment** button in the DateInput\"\n        increment=\"Increase value\"\n\n        i18n-decrement=\"kendo.dateinput.decrement|The label for the **Decrement** button in the DateInput\"\n        decrement=\"Decrease value\"\n    >\n    </ng-container>\n    <span class=\"k-dateinput-wrap\" #wrap>\n        <input\n            #dateInput\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            autocapitalize=\"off\"\n            spellcheck=\"false\"\n            class=\"k-input\"\n            [attr.role]=\"role\"\n            [attr.aria-readonly]=\"ariaReadOnly\"\n            [id]=\"focusableId\"\n            [title]=\"title\"\n            [tabindex]=\"tabindex\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [placeholder]=\"placeholder\"\n            [attr.aria-expanded]=\"isPopupOpen\"\n            [attr.aria-haspopup]=\"hasPopup\"\n            [kendoEventsOutsideAngular]=\"{\n                click: handleClick,\n                focus: handleFocus,\n                mousedown: handleMousedown,\n                touchstart: handleMousedown,\n                dragstart: handleDragAndDrop,\n                drop: handleDragAndDrop,\n                blur: handleBlur\n            }\"\n            [scope]=\"this\"\n            />\n        <span *ngIf=\"spinners\" class=\"k-select\" (mousedown)=\"$event.preventDefault()\">\n            <span\n                class=\"k-link k-link-increase\"\n                [class.k-state-active]=\"arrowDirection === arrow.Up\"\n                (mousedown)=\"arrowDirection = arrow.Up\"\n                (mouseleave)=\"arrowDirection = arrow.None\"\n                (click)=\"handleButtonClick(1)\"\n                [title]=\"localization.get('increment')\"\n                [attr.aria-label]=\"localization.get('increment')\">\n                <span class=\"k-icon k-i-arrow-n\"></span>\n            </span>\n            <span\n                class=\"k-link k-link-decrease\"\n                (click)=\"handleButtonClick(-1)\"\n                [class.k-state-active]=\"arrowDirection === arrow.Down\"\n                (mousedown)=\"arrowDirection = arrow.Down\"\n                (mouseleave)=\"arrowDirection = arrow.None\"\n                [title]=\"localization.get('decrement')\"\n                [attr.aria-label]=\"localization.get('decrement')\">\n                <span class=\"k-icon k-i-arrow-s\"></span>\n            </span>\n        </span>\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    DateInputComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: Injector },
        { type: LocalizationService },
        { type: PickerService, decorators: [{ type: Optional }] }
    ]; };
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
    return DateInputComponent;
}());

/**
 * A preventable event instance which is triggered by the `open` and `close` events.
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * @hidden
 */
var TOUCH_ENABLED = new InjectionToken('dateinputs-touch-enabled');

/**
 * @hidden
 */
var disabledDatesValidator = function (isDateDisabled) {
    return function (control) {
        if (!isDateDisabled || !control.value) {
            return null;
        }
        var error = {
            disabledDate: true
        };
        return isDateDisabled(control.value) ? error : null;
    };
};

/* tslint:disable:max-line-length */
var MIN_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-min';
var MAX_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/DatePickerComponent/#toc-max';
var VALUE_DOC_LINK$2 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/#toc-using-with-json';
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent(zone, localization, cdr, popupService, element, renderer, injector, pickerService, disabledDatesService, touchEnabled$$1) {
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
        this.focusableId = "k-" + guid();
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
    Object.defineProperty(DatePickerComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "navigationItemTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.navigationItemTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup options of the DatePicker.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, { animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DatePicker component.
         *
         * > The `value` has to be a valid
         * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = cloneDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        /**
         * Sets the dates of the DatePicker that will be disabled
         * ([see example]({% slug disabled_dates_datepicker %})).
         */
        set: function (value) {
            this._disabledDates = value;
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (!this.wrapper) {
                return;
            }
            var element = this.wrapper.nativeElement;
            if (value) {
                this.renderer.addClass(element, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(element, 'k-state-focused');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (show) {
            var _this = this;
            if (show && (this.disabled || this.readonly)) {
                return;
            }
            var skipZone = !show && (!this._show || !hasObservers(this.close));
            if (!skipZone) {
                this.zone.run(function () {
                    _this.togglePopup(show);
                });
            }
            else {
                this.togglePopup(show);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    DatePickerComponent.prototype.isEmpty = function () {
        return !this.value && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(function () { return _this.cdr.markForCheck(); });
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        this.verifySettings();
        if (changes.min || changes.max || changes.rangeValidation || changes.disabledDatesValidation || changes.disabledDates || changes.incompleteDateValidation) {
            this.minValidateFn = this.rangeValidation ? minValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? maxValidator(this.max) : noop;
            this.disabledDatesValidateFn = this.disabledDatesValidation ? disabledDatesValidator(this.disabledDatesService.isDateDisabled) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
        this.pickerSubscriptions.unsubscribe();
    };
    Object.defineProperty(DatePickerComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
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
    DatePickerComponent.prototype.focus = function () {
        this.input.focus();
    };
    /**
     * Blurs the DatePicker component.
     */
    DatePickerComponent.prototype.blur = function () {
        (this.calendar || this.input)['blur'](); //tslint:disable-line:no-string-literal
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    DatePickerComponent.prototype.toggle = function (show) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleIconClick = function (event) {
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
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleMousedown = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleChange = function (value) {
        this.cdr.markForCheck();
        this.focusInput();
        this.value = value;
        this.show = false;
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleInputChange = function (value) {
        this.handleChange(this.input.formatSections.time ? value : this.mergeTime(value));
    };
    Object.defineProperty(DatePickerComponent.prototype, "popupClasses", {
        /**
         * @hidden
         */
        get: function () {
            return [
                'k-calendar-container',
                'k-group',
                'k-reset'
            ].concat(this.popupSettings.popupClass || []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "appendTo", {
        /**
         * @hidden
         */
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "input", {
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "calendar", {
        get: function () {
            return this.pickerService.calendar;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DatePickerComponent.prototype.mergeTime = function (value) {
        return this.value && value ? setTime(value, this.value) : value;
    };
    /**
     * @hidden
     */
    DatePickerComponent.prototype.handleKeydown = function (e) {
        var altKey = e.altKey, keyCode = e.keyCode;
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
    };
    DatePickerComponent.prototype.togglePopup = function (show) {
        var event = new PreventableEvent();
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
    };
    DatePickerComponent.prototype._toggle = function (show) {
        var _this = this;
        if (show === this._show) {
            return;
        }
        this._show = show;
        if (show) {
            var direction = this.localization.rtl ? 'right' : 'left';
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
            this.subscription = this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.show = false; });
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
            this.subscription.unsubscribe();
        }
    };
    DatePickerComponent.prototype.focusInput = function () {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    };
    DatePickerComponent.prototype.toggleFocus = function () {
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
    };
    DatePickerComponent.prototype.verifySettings = function () {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK$2 + " and " + MAX_DOC_LINK$2 + ".");
        }
    };
    DatePickerComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK$2 + " for possible resolution.");
        }
    };
    DatePickerComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    };
    DatePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(function () {
                _this.onFocus.emit();
            });
        }
    };
    DatePickerComponent.prototype.handleWindowBlur = function () {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    };
    DatePickerComponent.prototype.handleBlur = function (args) {
        var _this = this;
        var currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.calendar && this.calendar.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(function () {
                _this.blurComponent();
                _this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    };
    DatePickerComponent.prototype.blurComponent = function () {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.cdr.detectChanges();
        this.onControlTouched();
        this.onBlur.emit();
    };
    DatePickerComponent.prototype.handleSameSelection = function () {
        if (this.show) {
            this.focusInput();
            this.show = false;
        }
    };
    DatePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.zone.run(function () { return _this.onValidatorChange(); });
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-datepicker',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DatePickerComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DatePickerComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return DatePickerComponent; }) },
                        LocalizationService,
                        PickerService,
                        DisabledDatesService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.datepicker'
                        }
                    ],
                    selector: 'kendo-datepicker',
                    template: "\n        <ng-container kendoDatePickerLocalizedMessages\n            i18n-today=\"kendo.datepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n\n            i18n-toggle=\"kendo.datepicker.toggle|The label for the toggle button in the datepicker component\"\n            toggle=\"Toggle calendar\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                #input\n                [role]=\"inputRole\"\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [ariaReadOnly]=\"readonly\"\n                [tabindex]=\"tabindex\"\n                [title]=\"title\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [value]=\"value\"\n                (valueChange)=\"handleInputChange($event)\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleIconClick,\n                    mousedown: handleMousedown\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-icon k-i-calendar\"></span>\n            </span>\n        </span>\n        <ng-container #container></ng-container>\n        <ng-template #popupTemplate>\n            <kendo-calendar\n                #calendar\n                [min]=\"min\"\n                [max]=\"max\"\n                [navigation]=\"navigation\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [weekNumber]=\"weekNumber\"\n                [cellTemplate]=\"cellTemplate\"\n                [monthCellTemplate]=\"monthCellTemplate\"\n                [yearCellTemplate]=\"yearCellTemplate\"\n                [decadeCellTemplate]=\"decadeCellTemplate\"\n                [centuryCellTemplate]=\"centuryCellTemplate\"\n                [weekNumberTemplate]=\"weekNumberTemplate\"\n                [headerTitleTemplate]=\"headerTitleTemplate\"\n                [navigationItemTemplate]=\"navigationItemTemplate\"\n                [focusedDate]=\"focusedDate\"\n                [value]=\"value\"\n                (valueChange)=\"handleChange(mergeTime($event))\"\n                [kendoEventsOutsideAngular]=\"{\n                    keydown: handleKeydown\n                }\"\n                [scope]=\"this\"\n                [disabledDates]=\"disabledDates\"\n            >\n                <kendo-calendar-messages [today]=\"localization.get('today')\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        <ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
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
    ]; };
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
    return DatePickerComponent;
}());

/**
 * @hidden
 */
var TIME_PART = {
    dayperiod: 'dayperiod',
    hour: 'hour',
    millisecond: 'millisecond',
    minute: 'minute',
    second: 'second'
};

/**
 * @hidden
 */
var timeRangeValidator = function (min, max) {
    return function (control) {
        if (!min || !max || !control.value) {
            return null;
        }
        var err = {
            timeRangeError: {
                maxValue: max,
                minValue: min,
                value: control.value
            }
        };
        return isInTimeRange(control.value, min, max) ? null : err;
    };
};

var VALUE_DOC_LINK$3 = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/#toc-integration-with-json';
var INTL_DATE_FORMAT = 'https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md';
var formatRegExp = new RegExp(TIME_PART.hour + "|" + TIME_PART.minute + "|" + TIME_PART.second + "|" + TIME_PART.dayperiod + "|literal");
/**
 * Represents the [Kendo UI TimePicker component for Angular]({% slug overview_timepicker %}#toc-basic-usage).
 */
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent(zone, localization, cdr, popupService, element, renderer, injector, pickerService, intl, touchEnabled$$1) {
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
        this.focusableId = "k-" + guid();
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
    Object.defineProperty(TimePickerComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Specifies the smallest valid time value
         * ([see example]({% slug timeranges_timepicker %})).
         */
        set: function (min) {
            this._min = cloneDate(min || MIN_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Specifies the biggest valid time value
         * ([see example]({% slug timeranges_timepicker %})).
         */
        set: function (max) {
            this._max = cloneDate(max || MAX_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
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
        set: function (steps) {
            this._steps = steps || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the TimePicker.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, { animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the TimePicker component.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = cloneDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "isActive", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (!this.wrapper) {
                return;
            }
            var element = this.wrapper.nativeElement;
            if (value) {
                this.renderer.addClass(element, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(element, 'k-state-focused');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (show) {
            var _this = this;
            if (show && (this.disabled || this.readonly)) {
                return;
            }
            var skipZone = !show && (!this._show || !hasObservers(this.close));
            if (!skipZone) {
                this.zone.run(function () {
                    _this.togglePopup(show);
                });
            }
            else {
                this.togglePopup(show);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "input", {
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "timeSelector", {
        get: function () {
            return this.pickerService.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    TimePickerComponent.prototype.isEmpty = function () {
        return !this.value && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function () { return _this.cdr.markForCheck(); });
        this.control = this.injector.get(NgControl, null);
        if (this.element) {
            this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.min || changes.max || changes.rangeValidation || changes.incompleteDateValidation) {
            this.timeRangeValidateFn = this.rangeValidation ? timeRangeValidator(this.min, this.max) : noop;
            this.incompleteValidator = this.incompleteDateValidation ? incompleteDateValidator() : noop;
            this.onValidatorChange();
        }
        if (changes.format) {
            this.verifyFormat();
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.ngOnDestroy = function () {
        this.isActive = false;
        this.show = false;
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.windowBlurSubscription) {
            this.windowBlurSubscription.unsubscribe();
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
        this.pickerSubscriptions.unsubscribe();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleKeydown = function (event) {
        var altKey = event.altKey, keyCode = event.keyCode;
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
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        this.value = cloneDate(value);
        this.cdr.markForCheck();
        if (!value && this.input) {
            this.input.placeholder = this.placeholder;
            this.input.writeValue(value);
        }
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.validate = function (control) {
        return this.timeRangeValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
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
    TimePickerComponent.prototype.focus = function () {
        this.input.focus();
    };
    /**
     * Blurs the TimePicker component.
     */
    TimePickerComponent.prototype.blur = function () {
        (this.timeSelector || this.input)['blur'](); //tslint:disable-line:no-string-literal
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    TimePickerComponent.prototype.toggle = function (show) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.resolvedPromise.then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    Object.defineProperty(TimePickerComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "appendTo", {
        /**
         * @hidden
         */
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleChange = function (value) {
        var _this = this;
        if (isEqual(this.value, value)) {
            this.focusInput();
            this.show = false;
            return;
        }
        this.value = cloneDate(value);
        this.zone.run(function () {
            _this.focusInput();
            _this.show = false;
            _this.onControlChange(cloneDate(value));
            _this.valueChange.emit(cloneDate(value));
        });
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleReject = function () {
        this.show = false;
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleInputChange = function (value) {
        var val = this.input.formatSections.date ? value : this.mergeTime(value);
        this.handleChange(val);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleMousedown = function (args) {
        args.preventDefault();
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.handleIconClick = function (event) {
        if (this.disabled || this.readonly) {
            return;
        }
        event.preventDefault();
        this.focusInput();
        //XXX: explicit call handleFocus handler here
        //due to async IE focus event
        this.handleFocus();
        this.show = !this.show;
    };
    Object.defineProperty(TimePickerComponent.prototype, "popupClasses", {
        /**
         * @hidden
         */
        get: function () {
            return [
                'k-group',
                'k-reset'
            ].concat(this.popupSettings.popupClass || []);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TimePickerComponent.prototype.normalizeTime = function (date) {
        return setTime(MIDNIGHT_DATE, date);
    };
    /**
     * @hidden
     */
    TimePickerComponent.prototype.mergeTime = function (value) {
        return this.value && value ? setTime(this.value, value) : value;
    };
    TimePickerComponent.prototype.togglePopup = function (show) {
        var event = new PreventableEvent();
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
    };
    TimePickerComponent.prototype._toggle = function (show) {
        var _this = this;
        if (show === this.isOpen) {
            return;
        }
        this._show = show;
        this.cdr.markForCheck();
        if (show) {
            var direction = this.localization.rtl ? 'right' : 'left';
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
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.show = false; });
        }
        else {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    TimePickerComponent.prototype.focusInput = function () {
        if (this.touchEnabled) {
            return;
        }
        this.input.focus();
    };
    TimePickerComponent.prototype.toggleFocus = function () {
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
    };
    TimePickerComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (value && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK$3 + " for possible resolution.");
        }
    };
    TimePickerComponent.prototype.verifyFormat = function () {
        if (!isDevMode()) {
            return;
        }
        var formatContainsDateParts = this.intl.splitDateFormat(this.format).some(function (part) { return !formatRegExp.test(part.type); });
        if (formatContainsDateParts) {
            throw new Error("Provided format is not supported. Supported specifiers are T|t|H|h|m|s|a. See " + INTL_DATE_FORMAT);
        }
    };
    TimePickerComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'keydown', this.handleKeydown.bind(this)));
        if (isWindowAvailable()) {
            this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(this.handleWindowBlur.bind(this));
        }
    };
    TimePickerComponent.prototype.handleWindowBlur = function () {
        if (!this.isOpen) {
            return;
        }
        this.show = false;
    };
    TimePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.zone.run(function () {
                _this.onFocus.emit();
            });
        }
    };
    TimePickerComponent.prototype.handleBlur = function (args) {
        var _this = this;
        var currentTarget = args && currentFocusTarget(args);
        if (currentTarget && (this.input.containsElement(currentTarget) ||
            (this.timeSelector && this.timeSelector.containsElement(currentTarget)))) {
            return;
        }
        if (hasObservers(this.onBlur) || (this.show && hasObservers(this.close)) || requiresZoneOnBlur(this.control)) {
            this.zone.run(function () {
                _this.blurComponent();
                _this.cdr.markForCheck();
            });
        }
        else {
            this.blurComponent();
        }
    };
    TimePickerComponent.prototype.blurComponent = function () {
        this.isActive = false; // order is important ¯\_(ツ)_/¯
        this.show = false;
        this.onControlTouched();
        this.onBlur.emit();
    };
    TimePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.zone.run(function () { return _this.onValidatorChange(); });
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-timepicker',
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return TimePickerComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return TimePickerComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return TimePickerComponent; }) },
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.timepicker'
                        },
                        PickerService
                    ],
                    selector: 'kendo-timepicker',
                    template: "\n        <ng-container kendoTimePickerLocalizedMessages\n            i18n-accept=\"kendo.timepicker.accept|The Accept button text in the timepicker component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.timepicker.acceptLabel|The label for the Accept button in the timepicker component\"\n            acceptLabel=\"Set time\"\n\n            i18n-cancel=\"kendo.timepicker.cancel|The Cancel button text in the timepicker component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.timepicker.cancelLabel|The label for the Cancel button in the timepicker component\"\n            cancelLabel=\"Cancel changes\"\n\n            i18n-now=\"kendo.timepicker.now|The Now button text in the timepicker component\"\n            now=\"Now\"\n\n            i18n-nowLabel=\"kendo.timepicker.nowLabel|The label for the Now button in the timepicker component\"\n            nowLabel=\"Select now\"\n\n            i18n-toggle=\"kendo.timepicker.toggle|The label for the toggle button in the timepicker component\"\n            toggle=\"Toggle time list\"\n        >\n        </ng-container>\n        <span #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                #input\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"show\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [role]=\"inputRole\"\n                [ariaReadOnly]=\"readonly\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [min]=\"normalizeTime(min)\"\n                [max]=\"normalizeTime(max)\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [steps]=\"steps\"\n                [tabindex]=\"!show ? tabindex : -1\"\n                [title]=\"title\"\n                [value]=\"value\"\n                (valueChange)=\"handleInputChange($event)\"\n            ></kendo-dateinput>\n            <span class=\"k-select\"\n                role=\"button\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleIconClick,\n                    mousedown: handleMousedown\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-icon k-i-clock\"></span>\n            </span>\n            <ng-template #popupTemplate>\n                <kendo-timeselector\n                    #timeSelector\n                    [cancelButton]=\"cancelButton\"\n                    [nowButton]=\"nowButton\"\n                    [format]=\"format\"\n                    [min]=\"min\"\n                    [max]=\"max\"\n                    [steps]=\"steps\"\n                    [value]=\"value\"\n                    [kendoEventsOutsideAngular]=\"{\n                        keydown: handleKeydown,\n                        mousedown: handleMousedown\n                    }\"\n                    [scope]=\"this\"\n                    (valueChange)=\"handleChange($event)\"\n                    (valueReject)=\"handleReject()\"\n                >\n                    <kendo-timeselector-messages\n                        [acceptLabel]=\"localization.get('acceptLabel')\"\n                        [accept]=\"localization.get('accept')\"\n                        [cancelLabel]=\"localization.get('cancelLabel')\"\n                        [cancel]=\"localization.get('cancel')\"\n                        [nowLabel]=\"localization.get('nowLabel')\"\n                        [now]=\"localization.get('now')\"\n                    >\n                    </kendo-timeselector-messages>\n                </kendo-timeselector>\n            </ng-template>\n        </span>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return [
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
    ]; };
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
    return TimePickerComponent;
}());

var timeFormatRegExp = new RegExp(TIME_PART.hour + "|" + TIME_PART.minute + "|" + TIME_PART.second + "|" + TIME_PART.dayperiod + "|literal");
var VALUE_DOC_LINK$4 = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/integration-with-json/';
var MIN_MAX_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/dateinputs/datetimepicker/date-time-limits/';
var DEFAULT_ACTIVE_TAB = 'date';
var DEFAULT_DATEINPUT_FORMAT = 'g';
var DEFAULT_TIMESELECTOR_FORMAT = 't';
/**
 * Represents the [Kendo UI DateTimePicker component for Angular]({% slug overview_datetimepicker %}).
 */
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(popupService, intl, cdr, pickerService, ngZone, host, touchEnabled$$1, localization, disabledDatesService, renderer) {
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
        this.focusableId = "k-" + guid();
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
    Object.defineProperty(DateTimePickerComponent.prototype, "input", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "calendar", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.calendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timeSelector", {
        /**
         * @hidden
         */
        get: function () {
            return this.pickerService.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the DateTimePicker component.
         *
         * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        set: function (value) {
            this.verifyValue(value);
            this._value = cloneDate(value);
            this.setCalendarValue(value);
            this.cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "format", {
        get: function () {
            return this._format;
        },
        /**
         * Specifies the date format for displaying the input value
         * ([see example]({% slug formats_datetimepicker %})).
         */
        set: function (value) {
            this._format = value;
            this.timeSelectorFormat = this.getTimeSelectorFormat(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "tabindex", {
        get: function () {
            return this.disabled ? -1 : this._tabindex;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the DateTimePicker.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        /**
         * Sets the dates of the DateTimePicker that will be disabled
         * ([see example]({% slug disabled_dates_datetimepicker %})).
         */
        set: function (value) {
            this._disabledDates = value;
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup settings of the DateTimePicker
         * ([see example]({% slug datetimepicker_popup_options %}#toc-customizing-the-popup)).
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `appendTo: 'root' | 'component' | ViewContainerRef`&mdash;Controls the popup container. By default, the popup will be appended to the root component.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({}, { animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Specifies the smallest valid date.
         * The Calendar will not display dates before this value.
         * If the `min` value of the Calendar is selected, the TimePicker will not display
         * time entries before the specified time portion of this value
         * ([see example]({% slug dateranges_datetimepicker %})).
         */
        set: function (value) {
            if (!isPresent(value)) {
                return;
            }
            this._min = cloneDate(value);
            this.calendarMin = getDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Specifies the biggest valid date.
         * The Calendar will not display dates after this value.
         * If the `max` value of the Calendar is selected, the TimePicker will not display
         * time entries after the specified time portion of this value
         * ([see example]({% slug dateranges_datetimepicker %})).
         */
        set: function (value) {
            if (!isPresent(value)) {
                return;
            }
            this._max = cloneDate(value);
            this.calendarMax = lastMillisecondOfDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "isOpen", {
        /**
         * Indicates whether the component is currently open.
         */
        get: function () {
            return isPresent(this.popupRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "isActive", {
        /**
         * Indicates whether the component or its popup content is focused.
         */
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            if (value) {
                this.renderer.addClass(this.wrapper.nativeElement, 'k-state-focused');
            }
            else {
                this.renderer.removeClass(this.wrapper.nativeElement, 'k-state-focused');
            }
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "defaultTab", {
        get: function () {
            return this._defaultTab;
        },
        /**
         * Sets the active tab on opening the popup
         * ([see example]({% slug datetimepicker_popup_options %}#toc-setting-the-default-tab)).
         */
        set: function (tab) {
            this._defaultTab = tab || DEFAULT_ACTIVE_TAB;
            this.activeTab = this.defaultTab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "tabSwitchTransition", {
        /**
         * @hidden
         */
        get: function () {
            /*
             When the popup is opening, disables the set transition in the themes. When `defaultTab` is set to `time`,
             the popup opens with an active **Time** tab and the animation of the initial transition is undesired.
             Setting the inline transition style to `none` overrides the set animation in the themes.
             Setting the inline transition style to `null` does not apply any inline styles or override the themes CSS.
            */
            return this.isOpen ? null : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disableCalendar", {
        /**
         * @hidden
         *
         * Indicates whether the Calendar will be disabled.
         * The inactive tab component gets disabled and becomes inaccessible on tab click.
         */
        get: function () {
            return this.activeTab !== 'date' && !this.calendar.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "inputRole", {
        /**
         * @hidden
         */
        get: function () {
            return this.readOnlyInput ? 'listbox' : 'spinbutton';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "disableTimeSelector", {
        /**
         * @hidden
         *
         * Indicates whether the TimeSelector will be disabled.
         * The inactive tab component gets disabled and becomes inaccessible on tab click.
         */
        get: function () {
            return this.activeTab !== 'time' && !this.timeSelector.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "activeTabComponent", {
        get: function () {
            if (!this.isOpen) {
                return;
            }
            if (!(isPresent(this.calendar) || isPresent(this.timeSelector))) {
                this.cdr.detectChanges();
            }
            return this.activeTab === 'date' ? this.calendar : this.timeSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!isPresent(appendTo) || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.pickerService.onFocus
            // detect popup changes to disable the inactive view mark-up when the popup is open
            .pipe(tap(this.detectPopupChanges.bind(this)))
            .subscribe(this.handleFocus.bind(this)));
        this.subscriptions.add(this.pickerService.onBlur.subscribe(this.handleBlur.bind(this)));
        this.subscriptions.add(this.pickerService.sameDateSelected.subscribe(this.handleCalendarValueChange.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.cdr.markForCheck(); }));
        this.subscriptions.add(this.pickerService.dateCompletenessChange.subscribe(this.handleDateCompletenessChange.bind(this)));
        if (isWindowAvailable()) {
            this.subscriptions.add(this.ngZone.runOutsideAngular(function () { return fromEvent(window, 'blur').subscribe(_this.handleCancel.bind(_this)); }));
        }
    };
    DateTimePickerComponent.prototype.ngOnChanges = function (changes) {
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
    };
    DateTimePickerComponent.prototype.ngOnDestroy = function () {
        if (this.isOpen) {
            this.closePopup();
        }
        this.subscriptions.unsubscribe();
    };
    /**
     * * If the popup is closed, focuses the DateTimePicker input.
     * * If the popup is open, the focus is moved to its content.
     */
    DateTimePickerComponent.prototype.focus = function () {
        if (this.disabled) {
            return;
        }
        if (this.isOpen) {
            this.activeTabComponent.focus();
        }
        else {
            this.input.focus();
        }
    };
    /**
     * Blurs the DateTimePicker.
     */
    DateTimePickerComponent.prototype.blur = function () {
        if (this.isOpen && this.activeTabComponent.isActive) {
            this.activeTabComponent.blur();
        }
        else {
            this.input.blur();
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     * ([more information and example]({% slug overview_datetimepicker %}#toc-methods-and-events)).
     *
     * @param show - The state of the popup.
     */
    DateTimePickerComponent.prototype.toggle = function (show) {
        if (this.disabled || this.readonly || show === this.isOpen) {
            return;
        }
        var shouldOpen = isPresent(show) ? show : !this.isOpen;
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
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesValidateFn(control) || this.incompleteValidator(control, this.input && this.input.isDateIncomplete);
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     *
     * Used by the TextBoxContainer to determine if the floating label will render in the input.
     */
    DateTimePickerComponent.prototype.isEmpty = function () {
        return !isPresent(this.value) && this.input.isEmpty();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleIconClick = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        // prevents the event default to evade focusing the DateInput input when placed inside a label (FF/IE/Edge)
        event.preventDefault();
        var runInZone = !this.isOpen || hasObservers(this.close);
        this.run(runInZone, function () {
            var shouldOpen = !_this.isOpen;
            // handle focus first to maintain correct event order `focus` => `open`
            _this.handleFocus();
            _this.togglePopup(shouldOpen);
            _this.switchFocus();
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleFocus = function () {
        var _this = this;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (hasObservers(this.onFocus)) {
            this.ngZone.run(function () { return _this.onFocus.emit(); });
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleBlur = function (event) {
        var _this = this;
        if (!this.isActive || this.focusTargetInComponent(event)) {
            return;
        }
        this.isActive = false;
        var isNgControlUntouched = this.host.nativeElement.classList.contains('ng-untouched');
        var runInZone = isNgControlUntouched || hasObservers(this.onBlur) || (this.isOpen && hasObservers(this.close));
        this.run(runInZone, function () {
            _this.onBlur.emit();
            _this.onControlTouched();
            _this.togglePopup(false);
            _this.cdr.markForCheck();
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.changeActiveTab = function (tab) {
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
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleTabChangeTransitionEnd = function (dateTimeSelector, event) {
        // handle only the .k-datetime-selector element transition, ignore any child element transitions
        if (event.target !== dateTimeSelector) {
            return;
        }
        this.activeTabComponent.focus();
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleAccept = function () {
        var _this = this;
        if (!this.isOpen) {
            return;
        }
        var candidate = mergeDateAndTime(this.calendar.value, this.timeSelector.current);
        var valueChangePresent = !isEqual(this.value, candidate);
        var runInZone = valueChangePresent || hasObservers(this.close);
        this.run(runInZone, function () {
            _this.handleValueChange(candidate);
            _this.togglePopup(false);
        });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleCancel = function () {
        var _this = this;
        if (!this.isOpen) {
            return;
        }
        var runInZone = hasObservers(this.close);
        this.run(runInZone, function () { return _this.togglePopup(false); });
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleInputValueChange = function (value) {
        this.handleValueChange(value);
        if (this.isOpen) {
            this.togglePopup(false);
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleCalendarValueChange = function () {
        this.setTimeSelectorMinMax(this.calendar.value);
        this.changeActiveTab('time');
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleKeyDown = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        var _a = event, keyCode = _a.keyCode, altKey = _a.altKey;
        switch (keyCode) {
            case altKey && Keys.ArrowUp:
            case Keys.Escape:
                this.handleCancel();
                break;
            case !this.isOpen && altKey && Keys.ArrowDown:
                this.ngZone.run(function () { return _this.togglePopup(true); });
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
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleTabOut = function (event) {
        var _a = event, keyCode = _a.keyCode, shiftKey = _a.shiftKey, target = _a.target;
        // if no focusable next sibling elements exist in the controls sections, the user is tabbing out of the popup
        var focusableSiblingAvailable = isPresent(target.nextElementSibling) && !target.nextElementSibling.disabled;
        if (keyCode === Keys.Tab && !shiftKey && !focusableSiblingAvailable) {
            this.input.focus();
            this.handleCancel();
        }
    };
    /**
     * @hidden
     */
    DateTimePickerComponent.prototype.handleBackTabOut = function (event) {
        var _a = event, keyCode = _a.keyCode, shiftKey = _a.shiftKey;
        if (keyCode === Keys.Tab && shiftKey) {
            this.input.focus();
        }
    };
    /**
     * @hidden
     *
     * Prevents the diversion of the focus from the currently active element in the component.
     */
    DateTimePickerComponent.prototype.preventMouseDown = function (event) {
        event.preventDefault();
    };
    DateTimePickerComponent.prototype.verifyValue = function (value) {
        if (!isDevMode()) {
            return;
        }
        if (isPresent(value) && !(value instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK$4 + " for possible resolution.");
        }
    };
    DateTimePickerComponent.prototype.verifyMinMaxRange = function () {
        if (!isDevMode()) {
            return;
        }
        if (!isValidRange(this.min, this.max)) {
            throw new Error("The max value should be bigger than the min. See " + MIN_MAX_DOC_LINK + ".");
        }
    };
    /**
     * Extracts the time slots and the literals that are not preceded by date parts
     * and concatenates the resulting parts into a string.
     * If the provided format value does not contain any time parts,
     * returns the designated format of the default popup component of the TimePicker.
     */
    DateTimePickerComponent.prototype.getTimeSelectorFormat = function (format) {
        var timeSelectorFormat = this.intl
            .splitDateFormat(format)
            .filter(this.timeFormatPartFilter)
            .reduce(function (format, part) { return format += part.pattern; }, '');
        return timeSelectorFormat || DEFAULT_TIMESELECTOR_FORMAT;
    };
    /**
     * The filter expression that filters out all format parts
     * except for `hour`, `minute`, `second`, `dayperiod`, and specific literals.
     * Literals will be left only if they are not preceded by date parts.
     */
    DateTimePickerComponent.prototype.timeFormatPartFilter = function (part, index, parts) {
        var previousPart = index >= 1 && parts[index - 1];
        if (previousPart && part.type === 'literal') {
            return timeFormatRegExp.test(previousPart.type);
        }
        return timeFormatRegExp.test(part.type);
    };
    DateTimePickerComponent.prototype.togglePopup = function (open) {
        if (open === this.isOpen) {
            return;
        }
        var event = new PreventableEvent();
        open ? this.open.emit(event) : this.close.emit(event);
        if (event.isDefaultPrevented()) {
            return;
        }
        this.toggle(open);
        this.switchFocus();
    };
    DateTimePickerComponent.prototype.switchFocus = function () {
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
    };
    DateTimePickerComponent.prototype.openPopup = function () {
        var _this = this;
        this.setCalendarValue(this.value);
        this.setTimeSelectorMinMax(this.value);
        var direction = this.localization.rtl ? 'right' : 'left';
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            content: this.popupTemplate,
            positionMode: 'absolute',
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            popupClass: "k-datetime-container " + (this.popupSettings.popupClass || ''),
            anchorAlign: { vertical: 'bottom', horizontal: direction },
            popupAlign: { vertical: 'top', horizontal: direction }
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.handleCancel(); });
    };
    DateTimePickerComponent.prototype.closePopup = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
    };
    DateTimePickerComponent.prototype.handleValueChange = function (value) {
        if (isEqual(this.value, value)) {
            return;
        }
        this.value = cloneDate(value);
        this.onControlChange(cloneDate(value));
        this.valueChange.emit(cloneDate(value));
    };
    /**
     * Indicates whether the focus target is part of this component,
     * that is, whether the focus target is inside the component wrapper or in the popup.
     */
    DateTimePickerComponent.prototype.focusTargetInComponent = function (event) {
        if (!isPresent(event)) {
            return false;
        }
        var relatedTarget = event.relatedTarget || document.activeElement;
        var focusInPopup = isPresent(this.popupRef) && this.popupRef.popupElement.contains(relatedTarget);
        var focusInWrapper = this.wrapper.nativeElement.contains(relatedTarget);
        return focusInPopup || focusInWrapper;
    };
    DateTimePickerComponent.prototype.setTimeSelectorMinMax = function (selectedDate) {
        var minDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.min));
        this.timeSelectorMin = cloneDate(minDateSelected ? this.min : MIN_TIME);
        var maxDateSelected = isPresent(selectedDate) && isEqual(getDate(selectedDate), getDate(this.max));
        this.timeSelectorMax = cloneDate(maxDateSelected ? this.max : MAX_TIME);
    };
    DateTimePickerComponent.prototype.setCalendarValue = function (value) {
        var isInCalendarRange = isPresent(value) && isInRange(value, this.calendarMin, this.calendarMax);
        this.calendarValue = isInCalendarRange ? getDate(value) : null;
    };
    /**
     * If the popup is available, runs a popup change detection.
     */
    DateTimePickerComponent.prototype.detectPopupChanges = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.popup.changeDetectorRef.detectChanges();
    };
    /**
     * Depending on the predicate `runInZone` value that is passed,
     * runs the provided function either in the Angular or in the current zone.
     */
    DateTimePickerComponent.prototype.run = function (runInZone, fn) {
        if (runInZone) {
            this.ngZone.run(function () { return fn(); });
        }
        else {
            fn();
        }
    };
    DateTimePickerComponent.prototype.handleDateCompletenessChange = function () {
        var _this = this;
        this.cdr.markForCheck();
        this.ngZone.run(function () { return _this.onValidatorChange(); });
    };
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
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return DateTimePickerComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DateTimePickerComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return DateTimePickerComponent; }) }
                    ],
                    template: "\n        <ng-container\n            kendoDateTimePickerLocalizedMessages\n\n            i18n-dateTab=\"kendo.datetimepicker.dateTab|The Date tab text in the datetimepicker popup header\"\n            dateTab=\"Date\"\n\n            i18n-dateTabLabel=\"kendo.datetimepicker.dateTabLabel|The label for the Date tab in the datetimepicker popup header\"\n            dateTabLabel=\"Date tab\"\n\n            i18n-timeTab=\"kendo.datetimepicker.timeTab|The Time tab text in the datetimepicker popup header\"\n            timeTab=\"Time\"\n\n            i18n-timeTabLabel=\"kendo.datetimepicker.timeTabLabel|The label for the Time tab in the datetimepicker popup header\"\n            timeTabLabel=\"Time tab\"\n\n            i18n-toggle=\"kendo.datetimepicker.toggle|The label for the toggle button in the datetimepicker component\"\n            toggle=\"Toggle popup\"\n\n            i18n-accept=\"kendo.datetimepicker.accept|The Accept button text in the datetimepicker component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.datetimepicker.acceptLabel|The label for the Accept button in the datetimepicker component\"\n            acceptLabel=\"Set\"\n\n            i18n-cancel=\"kendo.datetimepicker.cancel|The Cancel button text in the datetimepicker component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.datetimepicker.cancelLabel|The label for the Cancel button in the datetimepicker component\"\n            cancelLabel=\"Cancel\"\n\n            i18n-now=\"kendo.datetimepicker.now|The Now button text in the timepicker component\"\n            now=\"NOW\"\n\n            i18n-nowLabel=\"kendo.datetimepicker.nowLabel|The label for the Now button in the timepicker component\"\n            nowLabel=\"Select now\"\n\n            i18n-today=\"kendo.datetimepicker.today|The label for the today button in the calendar header\"\n            today=\"TODAY\"\n        >\n        </ng-container>\n\n        <span\n            #wrapper\n            class=\"k-picker-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n        >\n            <kendo-dateinput\n                [value]=\"value\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [incompleteDateValidation]=\"incompleteDateValidation\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly || readOnlyInput\"\n                [role]=\"inputRole\"\n                [ariaReadOnly]=\"readonly\"\n                [steps]=\"steps\"\n                [tabindex]=\"tabindex\"\n                [title]=\"title\"\n                [focusableId]=\"focusableId\"\n                [hasPopup]=\"true\"\n                [isPopupOpen]=\"isOpen\"\n                (valueChange)=\"handleInputValueChange($event)\"\n                [kendoEventsOutsideAngular]=\"{\n                    keydown: handleKeyDown\n                }\"\n                [scope]=\"this\"\n            >\n            </kendo-dateinput>\n            <span class=\"k-select\"\n                [attr.title]=\"localization.get('toggle')\"\n                [attr.aria-label]=\"localization.get('toggle')\"\n                [kendoEventsOutsideAngular]=\"{\n                    mousedown: preventMouseDown,\n                    click: handleIconClick\n                }\"\n                [scope]=\"this\"\n            >\n                <span class=\"k-link k-link-date\">\n                    <span\n                        class=\"k-icon\"\n                        [class.k-i-calendar]=\"activeTab === 'date'\"\n                        [class.k-i-clock]=\"activeTab === 'time'\"\n                    >\n                    </span>\n                </span>\n            </span>\n        </span>\n\n        <ng-container #container></ng-container>\n\n        <ng-template #popupTemplate>\n            <div\n                class=\"k-datetime-wrap k-{{activeTab}}-tab\"\n                [kendoEventsOutsideAngular]=\"{\n                    mousedown: preventMouseDown,\n                    keydown: handleKeyDown\n                }\"\n                [scope]=\"this\"\n            >\n                <div class=\"k-datetime-buttongroup\"\n                    [kendoEventsOutsideAngular]=\"{\n                        focusin: handleFocus,\n                        focusout: handleBlur\n                    }\"\n                    [scope]=\"this\"\n                >\n                    <div class=\"k-button-group k-button-group-stretched\">\n                        <button\n                            type=\"button\"\n                            class=\"k-button k-date-tab\"\n                            [class.k-state-active]=\"activeTab === 'date'\"\n                            [attr.title]=\"localization.get('dateTabLabel')\"\n                            [attr.aria-label]=\"localization.get('dateTabLabel')\"\n                            [kendoEventsOutsideAngular]=\"{\n                                click: changeActiveTab.bind(this, 'date'),\n                                keydown: handleBackTabOut\n                            }\"\n                            [scope]=\"this\"\n                        >\n                            {{localization.get('dateTab')}}\n                        </button>\n                        <button\n                            type=\"button\"\n                            class=\"k-button k-time-tab\"\n                            [class.k-state-active]=\"activeTab === 'time'\"\n                            [attr.title]=\"localization.get('timeTabLabel')\"\n                            [attr.aria-label]=\"localization.get('timeTabLabel')\"\n                            [kendoEventsOutsideAngular]=\"{\n                                click: changeActiveTab.bind(this, 'time')\n                            }\"\n                        >\n                            {{localization.get('timeTab')}}\n                        </button>\n                    </div>\n                </div>\n                <div\n                    #dateTimeSelector\n                    class=\"k-datetime-selector\"\n                    [style.transition]=\"tabSwitchTransition\"\n                    [kendoEventsOutsideAngular]=\"{\n                        transitionend: handleTabChangeTransitionEnd.bind(this, dateTimeSelector)\n                    }\"\n                >\n                    <div class=\"k-datetime-calendar-wrap\">\n                        <kendo-calendar\n                            [(value)]=\"calendarValue\"\n                            [min]=\"calendarMin\"\n                            [max]=\"calendarMax\"\n                            [focusedDate]=\"focusedDate\"\n                            [weekNumber]=\"weekNumber\"\n                            [navigation]=\"false\"\n                            [cellTemplate]=\"cellTemplate\"\n                            [monthCellTemplate]=\"monthCellTemplate\"\n                            [yearCellTemplate]=\"yearCellTemplate\"\n                            [decadeCellTemplate]=\"decadeCellTemplate\"\n                            [centuryCellTemplate]=\"centuryCellTemplate\"\n                            [weekNumberTemplate]=\"weekNumberTemplate\"\n                            [headerTitleTemplate]=\"headerTitleTemplate\"\n                            [disabled]=\"disableCalendar\"\n                            [disabledDates]=\"disabledDates\"\n                            (valueChange)=\"handleCalendarValueChange()\"\n                        >\n                            <kendo-calendar-messages\n                                [today]=\"localization.get('today')\"\n                            >\n                            </kendo-calendar-messages>\n                        </kendo-calendar>\n                    </div>\n                    <div class=\"k-datetime-time-wrap\">\n                        <kendo-timeselector\n                            [value]=\"value\"\n                            [format]=\"timeSelectorFormat\"\n                            [min]=\"timeSelectorMin\"\n                            [max]=\"timeSelectorMax\"\n                            [setButton]=\"false\"\n                            [cancelButton]=\"false\"\n                            [steps]=\"steps\"\n                            [disabled]=\"disableTimeSelector\"\n                        >\n                            <kendo-timeselector-messages\n                                [now]=\"localization.get('now')\"\n                                [nowLabel]=\"localization.get('nowLabel')\"\n                            >\n                            </kendo-timeselector-messages>\n                        </kendo-timeselector>\n                    </div>\n                </div>\n                <div\n                    class=\"k-datetime-footer k-action-buttons\"\n                    [kendoEventsOutsideAngular]=\"{\n                        keydown: handleTabOut,\n                        focusin: handleFocus,\n                        focusout: handleBlur\n                    }\"\n                    [scope]=\"this\"\n                >\n                    <button\n                        *ngIf=\"cancelButton\"\n                        type=\"button\"\n                        class=\"k-button k-time-cancel\"\n                        [attr.title]=\"localization.get('cancelLabel')\"\n                        [attr.aria-label]=\"localization.get('cancelLabel')\"\n                        [kendoEventsOutsideAngular]=\"{\n                            click: handleCancel\n                        }\"\n                        [scope]=\"this\"\n                    >\n                        {{localization.get('cancel')}}\n                    </button>\n                    <button\n                        type=\"button\"\n                        class=\"k-time-accept k-button k-primary\"\n                        [attr.title]=\"localization.get('acceptLabel')\"\n                        [attr.aria-label]=\"localization.get('acceptLabel')\"\n                        [disabled]=\"!calendarValue\"\n                        [kendoEventsOutsideAngular]=\"{\n                            click: handleAccept\n                        }\"\n                        [scope]=\"this\"\n                    >\n                        {{localization.get('accept')}}\n                    </button>\n                </div>\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return [
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
    ]; };
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
    return DateTimePickerComponent;
}());

/* tslint:disable:component-selector-name  component-selector-type */
var DEFAULT_VIEWS_LENGTH = 2;
/**
 * @hidden
 */
var HorizontalViewListComponent = /** @class */ (function () {
    function HorizontalViewListComponent(bus, cdr) {
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
    Object.defineProperty(HorizontalViewListComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.isMonthView();
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentMonthClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentYearClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentDecadeClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.decade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalViewListComponent.prototype, "getComponentCenturyClass", {
        get: function () {
            return this.activeView === CalendarViewEnum.century;
        },
        enumerable: true,
        configurable: true
    });
    HorizontalViewListComponent.prototype.ngOnChanges = function (changes) {
        this.initService();
        if (!this.service) {
            return;
        }
        this.views = this.views || DEFAULT_VIEWS_LENGTH;
        var focusedDate = this.focusedDate;
        var viewDate = this.clampDate(this.service.viewDate(focusedDate, this.max, this.views));
        this.skip = this.service.skip(viewDate, this.min);
        this.total = this.service.total(this.min, this.max);
        var activeViewChanged = hasChange(changes, 'activeView');
        var viewsHasChanged = this.views > 0 && hasChange(changes, 'views');
        if (activeViewChanged || !this.isInDates(focusedDate) || viewsHasChanged || !this.activeDate) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
            this.activeDate = cloneDate(this.dates[0]);
        }
    };
    HorizontalViewListComponent.prototype.initService = function () {
        this.service = this.bus.service(this.activeView);
    };
    HorizontalViewListComponent.prototype.handleDateChange = function (candidate) {
        this.valueChange.emit(candidate);
    };
    HorizontalViewListComponent.prototype.isMonthView = function () {
        return this.activeView === CalendarViewEnum.month;
    };
    HorizontalViewListComponent.prototype.navigate = function (action) {
        var candidate = this.move(action);
        var list = this.service.datesList(candidate, this.getTake(this.skip));
        if (this.isListInRange(list)) {
            this.dates = list;
        }
        this.activeDate = cloneDate(this.dates[0]);
        this.focusedDate = cloneDate(candidate);
        this.cdr.markForCheck();
        return cloneDate(candidate);
    };
    HorizontalViewListComponent.prototype.canNavigate = function (action) {
        if (!this.service) {
            return false;
        }
        return this.isListInRange(this.service.datesList(this.move(action), this.getTake(this.skip)));
    };
    HorizontalViewListComponent.prototype.clampDate = function (value) {
        return dateInRange(value, this.min, this.max);
    };
    HorizontalViewListComponent.prototype.move = function (action) {
        return this.service.move(this.dates[0] || this.focusedDate, action);
    };
    HorizontalViewListComponent.prototype.isListInRange = function (list) {
        var lowerBound = this.service.beginningOfPeriod(this.min);
        var upperBound = this.service.beginningOfPeriod(this.service.addToDate(this.max, 1));
        return lowerBound <= list[0] && list[list.length - 1] < upperBound;
    };
    HorizontalViewListComponent.prototype.isInDates = function (value) {
        return this.service.isInArray(value, this.dates);
    };
    HorizontalViewListComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.views);
    };
    HorizontalViewListComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-horizontal',
                    template: "\n    <kendo-calendar-header\n        [activeView]=\"activeView\"\n        [currentDate]=\"activeDate\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [rangeLength]=\"views\"\n        [templateRef]=\"headerTitleTemplateRef\"\n        (today)=\"handleDateChange($event)\"\n    >\n    </kendo-calendar-header>\n    <table class=\"k-content\">\n        <tbody *kFor=\"let date of dates\"\n               kendoCalendarView\n               role=\"rowgroup\"\n               direction=\"horizontal\"\n               [activeView]=\"activeView\"\n               [isActive]=\"isActive\"\n               [min]=\"min\" [max]=\"max\"\n               [cellUID]=\"cellUID\"\n               [focusedDate]=\"focusedDate\"\n               [selectedDate]=\"value\"\n               [selectionRange]=\"selectionRange\"\n               [activeRangeEnd]=\"activeRangeEnd\"\n               [weekNumber]=\"weekNumber\"\n               [templateRef]=\"cellTemplateRef\"\n               [weekNumberTemplateRef]=\"weekNumberTemplateRef\"\n               [viewDate]=\"date\"\n               (change)=\"handleDateChange($event)\"\n               (cellEnter)=\"cellEnter.emit($event)\"\n               (cellLeave)=\"cellLeave.emit($event)\"\n        ></tbody>\n    </table>\n  "
                },] },
    ];
    /** @nocollapse */
    HorizontalViewListComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef }
    ]; };
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
    return HorizontalViewListComponent;
}());

var noop$2 = function () { return null; };
/**
 * @hidden
 */
var disabledDatesRangeValidator = function (isDateDisabled) {
    if (!isPresent(isDateDisabled)) {
        return noop$2;
    }
    return function (selectedRange) {
        var isRangeComplete = isPresent(selectedRange) && isPresent(selectedRange.start) && isPresent(selectedRange.end);
        if (!isRangeComplete || selectedRange.start > selectedRange.end) {
            return null;
        }
        var disabledDates = disabledDatesInRange(selectedRange.start, selectedRange.end, isDateDisabled);
        var error = {
            disabledDatesInRange: disabledDates
        };
        return disabledDates.length ? error : null;
    };
};

/* tslint:disable:no-forward-ref */
var BOTTOM_VIEW_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-bottomview';
var TOP_VIEW_DOC_LINK$1 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-topview';
var MIN_DOC_LINK$3 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-min';
var MAX_DOC_LINK$3 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/api/CalendarComponent/#toc-max';
var VALUE_DOC_LINK$5 = 'http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/#toc-using-with-json';
/**
 * @hidden
 */
var RANGE_CALENDAR_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
};
/**
 * @hidden
 */
var RANGE_CALENDAR_RANGE_VALIDATORS = {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MultiViewCalendarComponent; }) //tslint:disable-line:no-use-before-declare
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
var MultiViewCalendarComponent = /** @class */ (function () {
    function MultiViewCalendarComponent(bus, element, localization, navigator, renderer, cdr, zone, disabledDatesService) {
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
        this.subscriptions = new Subscription(function () { });
        this.setClasses(element.nativeElement);
    }
    Object.defineProperty(MultiViewCalendarComponent.prototype, "focusedDate", {
        get: function () {
            return this._focusedDate;
        },
        /**
         * Sets or gets the `focusedDate` property of the Calendar and
         * defines the focused date of the component
         * ([see example]({% slug dates_multiviewcalendar %}#toc-focused-dates)).
         *
         * > If the Calendar is out of the min or max range, it normalizes the defined `focusedDate`.
         */
        set: function (focusedDate) {
            this._focusedDate = focusedDate || getToday();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        /**
         * Sets or gets the `min` property of the Calendar and
         * defines the minimum allowed date value.
         * By default, the `min` value is `1900-1-1`.
         */
        set: function (min) {
            this._min = min || new Date(MIN_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        /**
         * Sets or gets the `max` property of the Calendar and
         * defines the maximum allowed date value.
         * By default, the `max` value is `2099-12-31`.
         */
        set: function (max) {
            this._max = max || new Date(MAX_DATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "value", {
        /**
         * Sets or gets the `value` property of the Calendar and defines the selected value of the component.
         *
         * > The `value` has to be a valid
         * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
         */
        get: function () {
            return this._value;
        },
        set: function (candidate) {
            this.verifyValue(candidate);
            this._value = cloneDate(candidate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "disabledDates", {
        /**
         * Sets the dates of the MultiViewCalendar that will be disabled
         * ([see example]({% slug disabled_dates_multiviewcalendar %})).
         */
        set: function (value) {
            this.disabledDatesService.initialize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "selectionRange", {
        get: function () {
            return this._selectionRange;
        },
        /**
         * Sets or gets the `selectionRange` property of the Calendar and
         * defines the selection range of the component
         * ([see example]({% slug dates_multiviewcalendar %}#toc-selection-range)).
         */
        set: function (range$$1) {
            this._selectionRange = range$$1;
            if (this.disabledDatesRangeValidation) {
                this.onValidatorChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "cellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.cellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "monthCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.monthCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "yearCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.yearCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "decadeCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.decadeCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "centuryCellTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.centuryCellTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "weekNumberTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.weekNumberTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "headerTitleTemplateRef", {
        /**
         * @hidden
         */
        set: function (template) {
            this.headerTitleTemplate = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "activeViewEnum", {
        get: function () {
            var activeView = CalendarViewEnum[this.activeView];
            return activeView < this.bottomViewEnum ? this.bottomViewEnum : activeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "bottomViewEnum", {
        get: function () {
            return CalendarViewEnum[this.bottomView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "topViewEnum", {
        get: function () {
            return CalendarViewEnum[this.topView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "widgetId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "widgetRole", {
        get: function () {
            return 'grid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "calendarTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiViewCalendarComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.cellUID + this.focusedDate.getTime();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleBlur = function () {
        this.onControlTouched();
        this.isActive = false;
        this.isHovered = false; //ensure that hovered is also not active
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleFocus = function () {
        this.isActive = true;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMouseEnter = function () {
        this.isHovered = true;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMouseLeave = function () {
        this.isHovered = false;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleMousedown = function (event) {
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleClick = function () {
        if (this.isActive) {
            return;
        }
        this.focus();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.keydown = function (event) {
        var candidate = dateInRange(this.navigator.move(this.focusedDate, this.navigator.action(event), this.activeViewEnum), this.min, this.max);
        if (isEqual(this.focusedDate, candidate)) {
            return;
        }
        this.focusedDate = candidate;
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.enter = function () {
        this.handleDateChange(this.focusedDate);
    };
    MultiViewCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setMessages();
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.setMessages(); }));
        this.subscriptions.add(this.bus.viewChanged.subscribe(function (_a) {
            var view = _a.view;
            _this.activeView = CalendarViewEnum[view];
            _this.activeViewChange.emit(_this.activeView);
            _this.cdr.detectChanges();
            _this.updateButtonState();
        }));
    };
    MultiViewCalendarComponent.prototype.ngOnChanges = function (changes) {
        this.verifyChanges();
        this.bus.configure(this.bottomViewEnum, this.topViewEnum);
        var useValue = hasExistingValue(changes, 'value') && !hasExistingValue(changes, 'focusedDate');
        var focusedDate = dateInRange(cloneDate(useValue ? this.value : this.focusedDate), this.min, this.max);
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
    };
    MultiViewCalendarComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.messagesTimeout);
        this.subscriptions.unsubscribe();
    };
    MultiViewCalendarComponent.prototype.ngAfterViewInit = function () {
        this.updateButtonState();
    };
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
    MultiViewCalendarComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the Calendar component.
     */
    MultiViewCalendarComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.handleDateChange = function (candidate) {
        var canNavigateDown = this.bus.canMoveDown(this.activeViewEnum);
        var isSameDate = !canNavigateDown && isEqual(candidate, this.value);
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
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.writeValue = function (candidate) {
        this.verifyValue(candidate);
        this.focusedDate = dateInRange(cloneDate(candidate) || this.focusedDate, this.min, this.max);
        this.value = cloneDate(candidate);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onControlChange = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnTouched = function (fn) {
        this.onControlTouched = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control) || this.disabledDatesRangeValidateFn(this.selectionRange);
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.activeCellTemplate = function () {
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
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.navigate = function (action) {
        this.focusedDate = this.viewList.navigate(action);
        this.updateButtonState();
    };
    /**
     * @hidden
     */
    MultiViewCalendarComponent.prototype.emitCellEvent = function (emitter, args) {
        if (hasObservers(emitter)) {
            this.zone.run(function () {
                emitter.emit(args);
            });
        }
    };
    MultiViewCalendarComponent.prototype.setClasses = function (element) {
        this.renderer.addClass(element, 'k-widget');
        this.renderer.addClass(element, 'k-calendar');
        this.renderer.addClass(element, 'k-calendar-infinite');
        this.renderer.addClass(element, 'k-calendar-range');
    };
    MultiViewCalendarComponent.prototype.setMessages = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.prevButtonTitle = _this.localization.get('prevButtonTitle');
                _this.nextButtonTitle = _this.localization.get('nextButtonTitle');
                _this.cdr.detectChanges();
            });
        });
    };
    MultiViewCalendarComponent.prototype.verifyChanges = function () {
        if (!isDevMode()) {
            return;
        }
        if (this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK$3 + " and " + MAX_DOC_LINK$3 + ".");
        }
        if (this.bottomViewEnum > this.topViewEnum) {
            throw new Error("The topView should be greater than bottomView. See " + BOTTOM_VIEW_DOC_LINK$1 + " and " + TOP_VIEW_DOC_LINK$1 + ".");
        }
    };
    MultiViewCalendarComponent.prototype.verifyValue = function (candidate) {
        if (!isDevMode()) {
            return;
        }
        if (candidate && !(candidate instanceof Date)) {
            throw new Error("The 'value' should be a valid JavaScript Date instance. Check " + VALUE_DOC_LINK$5 + " for possible resolution.");
        }
    };
    MultiViewCalendarComponent.prototype.updateButtonState = function () {
        var _this = this;
        this.resolvedPromise.then(function () {
            _this.isPrevDisabled = !_this.viewList.canNavigate(_this.prevView);
            _this.isNextDisabled = !_this.viewList.canNavigate(_this.nextView);
            _this.cdr.markForCheck();
        });
    };
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
                    template: "\n    <ng-container kendoMultiViewCalendarLocalizedMessages\n        i18n-today=\"kendo.multiviewcalendar.today|The label for the today button in the calendar header\"\n        today=\"TODAY\"\n\n        i18n-prevButtonTitle=\"kendo.multiviewcalendar.prevButtonTitle|The label for the previous button in the Multiview calendar\"\n        prevButtonTitle=\"Navigate to previous view\"\n\n        i18n-nextButtonTitle=\"kendo.multiviewcalendar.nextButtonTitle|The label for the next button in the Multiview calendar\"\n        nextButtonTitle=\"Navigate to next view\"\n    >\n    </ng-container>\n    <button\n        class=\"k-button k-prev-view\" type=\"button\"\n        [attr.aria-disabled]=\"isPrevDisabled\"\n        [disabled]=\"isPrevDisabled\"\n        [title]=\"prevButtonTitle\"\n        (click)=\"navigate(prevView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-left\"></span>\n    </button>\n    <kendo-calendar-horizontal\n        [activeView]=\"activeViewEnum\"\n        [isActive]=\"isActive || isHovered\"\n        [cellTemplateRef]=\"activeCellTemplate()?.templateRef\"\n        [headerTitleTemplateRef]=\"headerTitleTemplate?.templateRef\"\n        [weekNumberTemplateRef]=\"weekNumberTemplate?.templateRef\"\n        [cellUID]=\"cellUID\"\n        [views]=\"views\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [focusedDate]=\"focusedDate\"\n        [weekNumber]=\"weekNumber\"\n        [activeRangeEnd]=\"activeRangeEnd\"\n        [selectionRange]=\"selectionRange\"\n        [value]=\"value\"\n        (valueChange)=\"handleDateChange($event)\"\n        (cellEnter)=\"emitCellEvent(cellEnter, $event)\"\n        (cellLeave)=\"emitCellEvent(cellLeave, $event)\"\n    >\n    </kendo-calendar-horizontal>\n    <button\n        class=\"k-button k-next-view\" type=\"button\"\n        [attr.aria-disabled]=\"isNextDisabled\"\n        [disabled]=\"isNextDisabled\"\n        [title]=\"nextButtonTitle\"\n        (click)=\"navigate(nextView)\"\n    >\n        <span class=\"k-icon k-i-arrow-chevron-right\"></span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ElementRef },
        { type: LocalizationService },
        { type: NavigationService },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: DisabledDatesService }
    ]; };
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
    return MultiViewCalendarComponent;
}());

/**
 * A directive which renders the content of the DateRange Popup. To define the cell template, nest an
 * `<ng-template>` tag with the `kendoRangePopupTemplate` directive inside the component tag.
 */
var DateRangePopupTemplateDirective = /** @class */ (function () {
    function DateRangePopupTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DateRangePopupTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDateRangePopupTemplate]'
                },] },
    ];
    /** @nocollapse */
    DateRangePopupTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return DateRangePopupTemplateDirective;
}());

var isActive = function (cmp) { return (cmp && cmp.isActive) || false; };
var hasActiveContent = function (popup) { return popup && popup.hasActiveContent(); };
/**
 * A service that handles the communication between the components that are placed inside the DateRangeComponent.
 * For example, the start and end `DateInput` and `DateRangePopup` components.
 */
var DateRangeService = /** @class */ (function () {
    function DateRangeService() {
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
    Object.defineProperty(DateRangeService.prototype, "activeRangeEnd", {
        /**
         * Gets the current `activeRangeEnd` value.
         */
        get: function () {
            return this.activeRangeEnd$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeService.prototype, "focusedDate", {
        /**
         * Gets the current `focusedDate` value.
         */
        get: function () {
            return this.focusedDate$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeService.prototype, "min", {
        /**
         * Gets the `min` range value.
         * The `min` value is extracted from the `start` DateInput value or the `min` value of the Calendar.
         */
        get: function () {
            return (this.startInput$.value || {}).min || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeService.prototype, "max", {
        /**
         * Gets the `max` range value.
         * The `max` value is extracted from the `end` DateInput value or the `max` value of the Calendar.
         */
        get: function () {
            return (this.endInput$.value || {}).max || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeService.prototype, "selectionRange", {
        /**
         * Gets the current `selectionRange` value.
         */
        get: function () {
            return this.range$.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activates the registered `DateRangePopup` component.
     * The method opens the popup and focuses the calendar.
     */
    DateRangeService.prototype.activatePopup = function () {
        var dateRangePopup = this.dateRangePopup$.value;
        if (!dateRangePopup) {
            return;
        }
        dateRangePopup.activate();
    };
    /**
     * Deactivates the registered `DateRangePopup` component.
     * The method closes the popup.
     */
    DateRangeService.prototype.deactivatePopup = function () {
        var dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.show = false;
    };
    /**
     * @hidden
     *
     * Deactivates the registered `DateRangePopup` component and fires the `cancel` event.
     * The method closes the popup.
     */
    DateRangeService.prototype.cancelPopup = function () {
        var dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.cancelPopup();
    };
    /**
     * Completes all observables to mitigate possible memory leaks.
     * Calls the method when a component that uses it is destroyed.
     */
    DateRangeService.prototype.destroy = function () {
        this.activeRangeEnd$.complete();
        this.dateRangePopup$.complete();
        this.focusedDate$.complete();
        this.endInput$.complete();
        this.startInput$.complete();
        this.range$.complete();
    };
    /**
     * Returns `true` when an active component that is placed inside the `DateRangeComponent` is detected.
     * For example, the opened popup or the focused DateInput.
     *
     * @returns `true` if an active component is present.
     */
    DateRangeService.prototype.hasActiveComponent = function () {
        var popup = this.dateRangePopup$.value;
        var isPopup = isActive(popup);
        var isStart = isActive(this.startInput$.value);
        var isEnd = isActive(this.endInput$.value);
        return isPopup || isStart || isEnd || hasActiveContent(popup) || false;
    };
    /**
     * Registers a new start `DateInput` component. Notifies all `startInput$` listeners.
     */
    DateRangeService.prototype.registerStartInput = function (startInput) {
        this.startInput$.next(startInput);
    };
    /**
     * Registers a new end `DateInput` component. Notifies all `endInput$` listeners.
     */
    DateRangeService.prototype.registerEndInput = function (endInput) {
        this.endInput$.next(endInput);
    };
    /**
     * Registers a new `DateRangePopup` component. Notifies all `dateRangePopup$` listeners.
     */
    DateRangeService.prototype.registerPopup = function (dateRangePopup) {
        this.dateRangePopup$.next(dateRangePopup);
    };
    /**
     * Updates the `activeRangeEnd` value. Notifies all `activeRangeEnd$` listeners.
     */
    DateRangeService.prototype.setActiveRangeEnd = function (activeRange) {
        if (!activeRange || this.activeRangeEnd === activeRange) {
            return;
        }
        this.activeRangeEnd$.next(activeRange);
    };
    /**
     * Updates the focused date. Notifies all `focusedDate$` listeners.
     */
    DateRangeService.prototype.setFocusedDate = function (value) {
        if (isEqual(this.focusedDate$.value, value)) {
            return;
        }
        this.focusedDate$.next(value);
    };
    /**
     * Updates the selection range. Notifies all `range$` listeners.
     */
    DateRangeService.prototype.setRange = function (range) {
        if (range === void 0) { range = EMPTY_SELECTIONRANGE; }
        this.range$.next(range);
    };
    DateRangeService.decorators = [
        { type: Injectable },
    ];
    return DateRangeService;
}());

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
var DateRangePopupComponent = /** @class */ (function () {
    function DateRangePopupComponent(popupService, dateRangeService, zone, rtl) {
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
        this.calendarSubscriptions = new Subscription(function () { });
        this.popupSubscriptions = new Subscription(function () { });
        this.resolvedPromise = Promise.resolve();
    }
    Object.defineProperty(DateRangePopupComponent.prototype, "calendar", {
        /**
         * The active calendar that is visible in the popup.
         *
         * > When the popup is closed, the property returns `null`.
         */
        get: function () {
            return this._calendar;
        },
        set: function (calendar) {
            this._calendar = calendar;
            this.subscribeFocusBlur(calendar);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePopupComponent.prototype, "isActive", {
        /**
         * Gets the active state of the component.
         * When the opened calendar is active, returns `true`.
         */
        get: function () {
            return this.calendar && this.calendar.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePopupComponent.prototype, "show", {
        get: function () {
            return this._show;
        },
        /**
         * Gets or sets the visibility state of the component.
         */
        set: function (show) {
            if (this._show === show) {
                return;
            }
            var event = new PreventableEvent();
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
        },
        enumerable: true,
        configurable: true
    });
    DateRangePopupComponent.prototype.ngOnInit = function () {
        this.dateRangeService.registerPopup(this);
    };
    DateRangePopupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.calendarSubscriptions.add(this.contentCalendar.changes.subscribe(function (changes) { return _this.calendar = changes.first; }));
        this.calendarSubscriptions.add(this.viewCalendar.changes.subscribe(function (changes) { return _this.calendar = changes.first; }));
        if (isWindowAvailable()) {
            this.zone.runOutsideAngular(function () {
                return _this.windowBlurSubscription = fromEvent(window, 'blur').subscribe(_this.handleWindowBlur.bind(_this));
            });
        }
    };
    DateRangePopupComponent.prototype.ngOnDestroy = function () {
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
    };
    /**
     *  Opens the popup component and focuses the calendar.
     */
    DateRangePopupComponent.prototype.activate = function () {
        var _this = this;
        if (this.show === true) {
            return;
        }
        if (this.activateSubscription) {
            this.activateSubscription.unsubscribe();
        }
        this.show = true;
        this.zone.runOutsideAngular(function () {
            _this.activateSubscription = merge(_this.contentCalendar.changes, _this.viewCalendar.changes)
                .pipe(filter(function (changes) { return changes && changes.first; }), map(function (changes) { return changes.first; }))
                .subscribe(function (calendar) { return setTimeout(function () { return calendar.focus(); }); });
        });
    };
    /**
     *  Focuses the calendar (if available).
     */
    DateRangePopupComponent.prototype.focus = function () {
        if (this.calendar) {
            this.calendar.focus();
        }
    };
    /**
     * Checks if a focused element ids placed inside the popup.
     *
     * @return boolean;
     */
    DateRangePopupComponent.prototype.hasActiveContent = function () {
        if (!isDocumentAvailable() || !this.popupRef) {
            return false;
        }
        return this.popupRef.popupElement.contains(document.activeElement);
    };
    /**
     * Toggles the visibility of the popup.
     * If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show The state of the popup.
     */
    DateRangePopupComponent.prototype.toggle = function (show) {
        var _this = this;
        this.resolvedPromise.then(function () {
            _this._toggle((show === undefined) ? !_this.show : show);
        });
    };
    /**
     * @hidden
     *
     * Closes the popup and triggers the `cancel` event.
     */
    DateRangePopupComponent.prototype.cancelPopup = function () {
        this.show = false;
        this.cancel.emit();
    };
    DateRangePopupComponent.prototype.handleWindowBlur = function () {
        var _this = this;
        if (!this.show) {
            return;
        }
        if (hasObservers(this.close)) {
            this.zone.run(function () { return _this.show = false; });
        }
        else {
            this.show = false;
        }
    };
    DateRangePopupComponent.prototype.handleMouseLeave = function () {
        this.dateRangeService.setRange(this.dateRangeService.selectionRange);
    };
    DateRangePopupComponent.prototype.handleKeydown = function (event) {
        var _this = this;
        var altKey = event.altKey, keyCode = event.keyCode;
        if (keyCode === Keys.Escape || (altKey && keyCode === Keys.ArrowUp)) {
            this.zone.run(function () { return _this.cancelPopup(); });
        }
    };
    DateRangePopupComponent.prototype.subscribeFocusBlur = function (calendar) {
        var _this = this;
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
            this.focusSubscription.unsubscribe();
        }
        if (!calendar) {
            return;
        }
        var nativeElement = calendar.element.nativeElement;
        this.blurSubscription = fromEvent(nativeElement, 'blur').subscribe(function () { return _this.onBlur.emit(); });
        this.focusSubscription = fromEvent(nativeElement, 'focus').subscribe(function () { return _this.onFocus.emit(); });
    };
    DateRangePopupComponent.prototype.addPopupSubscriptions = function () {
        var _this = this;
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        if (!isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions = new Subscription();
        }
        subscriptions.map(function (s) { return _this.popupSubscriptions.add(s); });
    };
    Object.defineProperty(DateRangePopupComponent.prototype, "_appendTo", {
        get: function () {
            var appendTo = this.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    DateRangePopupComponent.prototype._toggle = function (show) {
        var _this = this;
        this._show = show;
        if (this.popupRef) {
            this.destroyPopup();
        }
        if (this._show) {
            var direction = this.rtl ? 'right' : 'left';
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
            var _a = this.popupRef, popupElement_1 = _a.popupElement, popupAnchorViewportLeave = _a.popupAnchorViewportLeave;
            popupElement_1.setAttribute('id', this.popupUID);
            this.addPopupSubscriptions(this.zone.runOutsideAngular(function () { return fromEvent(popupElement_1, 'keydown').subscribe(_this.handleKeydown.bind(_this)); }), fromEvent(popupElement_1, 'mouseleave').subscribe(this.handleMouseLeave.bind(this)), popupAnchorViewportLeave.subscribe(function () { return _this.cancelPopup(); }));
        }
    };
    DateRangePopupComponent.prototype.destroyPopup = function () {
        if (isPresent(this.popupRef)) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (isPresent(this.popupSubscriptions)) {
            this.popupSubscriptions.unsubscribe();
        }
    };
    DateRangePopupComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendo-daterange-popup',
                    selector: 'kendo-daterange-popup',
                    template: "\n        <ng-container #container></ng-container>\n        <ng-template #defaultTemplate>\n            <kendo-multiviewcalendar kendoDateRangeSelection></kendo-multiviewcalendar>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DateRangePopupComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: DateRangeService },
        { type: NgZone },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
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
    return DateRangePopupComponent;
}());

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
var DateRangeComponent = /** @class */ (function () {
    function DateRangeComponent() {
        /**
         * @hidden
         */
        this.showDefault = false;
    }
    Object.defineProperty(DateRangeComponent.prototype, "hasContentPopup", {
        get: function () {
            return this.contentPopup.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    DateRangeComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.showDefault = !this.hasContentPopup;
        this.subscription = this.contentPopup.changes.subscribe(function () {
            _this.showDefault = !_this.hasContentPopup;
        });
    };
    DateRangeComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DateRangeComponent.decorators = [
        { type: Component, args: [{
                    providers: [DateRangeService],
                    selector: 'kendo-daterange',
                    template: "\n        <ng-content></ng-content>\n        <kendo-daterange-popup *ngIf=\"showDefault\"></kendo-daterange-popup>\n    "
                },] },
    ];
    DateRangeComponent.propDecorators = {
        contentPopup: [{ type: ContentChildren, args: [DateRangePopupComponent,] }]
    };
    return DateRangeComponent;
}());

/**
 * @hidden
 */
var DateRangeInput = /** @class */ (function () {
    function DateRangeInput(activeRangeEnd, dateRangeService, input, element, renderer, zone) {
        this.activeRangeEnd = activeRangeEnd;
        this.dateRangeService = dateRangeService;
        this.input = input;
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.navigateCalendarOnFocus = false;
        this.popupSubscriptions = new Subscription(function () { });
        this.subscriptions = new Subscription(function () { });
    }
    Object.defineProperty(DateRangeInput.prototype, "isActiveEnd", {
        get: function () {
            return this.dateRangeService.activeRangeEnd === this.activeRangeEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeInput.prototype, "popupCalendarActivated", {
        get: function () {
            var popup = this.dateRangeService.dateRangePopup$.value;
            return isPresent(popup) && isPresent(popup.calendar);
        },
        enumerable: true,
        configurable: true
    });
    DateRangeInput.prototype.init = function () {
        var _this = this;
        if (this.input.value) {
            this.dateRangeService.setRange(this.getRange(this.input.value));
        }
        [
            this.input.onBlur.subscribe(function () { return _this.deactivate(); }),
            this.input.onFocus.pipe(filter(function () { return !_this.popupCalendarActivated; })).subscribe(function () { return _this.activate(); }),
            this.input.valueUpdate.subscribe(function (value) { return _this.updateRange(value, 'change'); }),
            this.dateRangeService.activeRangeEnd$.subscribe(function () {
                if (_this.navigateCalendarOnFocus) {
                    _this.focusActiveDate();
                }
                _this.toggleActiveClass(_this.isActiveEnd);
            }),
            this.dateRangeService.dateRangePopup$.subscribe(function (popup) { return _this.initPopup(popup); }),
            this.dateRangeService.range$.subscribe(function (range) { return _this.updateInputValue(range); }),
            fromEvent(this.element.nativeElement, 'click').subscribe(function () { return _this.activate(); }),
            fromEvent(this.element.nativeElement, 'keydown').subscribe(function (event) { return _this.togglePopup(event || {}); })
        ].map(function (s) { return _this.subscriptions.add(s); });
    };
    DateRangeInput.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
        this.unsubscribePopup();
    };
    DateRangeInput.prototype.initPopup = function (popup) {
        var _this = this;
        if (!popup) {
            this.unsubscribePopup();
            return;
        }
        if (!popup.anchor) {
            popup.anchor = this.element.nativeElement;
        }
        [
            popup.cancel.subscribe(function () { return _this.isActiveEnd && _this.input.focus(); }),
            popup.onFocus.subscribe(function () { return _this.toggleActiveClass(_this.isActiveEnd); }),
            popup.onBlur.subscribe(function () { return _this.deactivate(); })
        ].map(function (s) { return _this.popupSubscriptions.add(s); });
    };
    DateRangeInput.prototype.unsubscribePopup = function () {
        this.popupSubscriptions.unsubscribe();
        this.popupSubscriptions = new Subscription(function () { });
    };
    DateRangeInput.prototype.activate = function () {
        this.dateRangeService.setActiveRangeEnd(this.activeRangeEnd);
        this.dateRangeService.activatePopup();
    };
    DateRangeInput.prototype.deactivate = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.updateRange(_this.input.value, 'blur');
                if (_this.dateRangeService.hasActiveComponent()) {
                    return;
                }
                _this.toggleActiveClass(false);
                _this.zone.run(function () { return _this.dateRangeService.deactivatePopup(); });
            });
        });
    };
    DateRangeInput.prototype.updateRange = function (value, correctOn) {
        var range = this.getRange(value, correctOn);
        if (range) {
            this.focusActiveDate();
            this.dateRangeService.setRange(range);
        }
    };
    DateRangeInput.prototype.togglePopup = function (_a) {
        var altKey = _a.altKey, keyCode = _a.keyCode;
        if (keyCode === Keys.Escape) {
            this.dateRangeService.cancelPopup();
        }
        else if (altKey && keyCode === Keys.ArrowDown) {
            this.dateRangeService.activatePopup();
        }
    };
    DateRangeInput.prototype.focusActiveDate = function () {
        if (this.input.value && this.isActiveEnd) {
            this.dateRangeService.setFocusedDate(cloneDate(this.input.value));
        }
    };
    DateRangeInput.prototype.toggleActiveClass = function (show) {
        var action = show ? 'addClass' : 'removeClass';
        var nativeElement = this.element.nativeElement;
        if (nativeElement && nativeElement.querySelector) {
            this.renderer[action](nativeElement.querySelector('.k-dateinput-wrap'), 'k-state-focused');
        }
    };
    return DateRangeInput;
}());

/**
 * A directive which manages the end range selection.
 *
 * > You can use the DateRangeEndInputDirective only with a DateInput component.
 */
var DateRangeEndInputDirective = /** @class */ (function (_super) {
    __extends(DateRangeEndInputDirective, _super);
    function DateRangeEndInputDirective(rangeService, dateInput, element, renderer, zone) {
        var _this = _super.call(this, 'end', rangeService, dateInput, element, renderer, zone) || this;
        _this.rangeService = rangeService;
        _this.dateInput = dateInput;
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
        _this.navigateCalendarOnFocus = false;
        return _this;
    }
    DateRangeEndInputDirective.prototype.ngOnInit = function () {
        this.rangeService.registerEndInput(this.dateInput);
        _super.prototype.init.call(this);
    };
    DateRangeEndInputDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    DateRangeEndInputDirective.prototype.getRange = function (value, correctOn) {
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (!isInRange(value, min, max)) {
            return null;
        }
        var start = (this.rangeService.selectionRange || EMPTY_SELECTIONRANGE).start;
        var shouldClamp = this.autoCorrectOn === correctOn && isPresent(value) && value < start;
        return shouldClamp ? clampRange(value) : { start: start, end: cloneDate(value) };
    };
    DateRangeEndInputDirective.prototype.updateInputValue = function (range$$1) {
        var end = (range$$1 || EMPTY_SELECTIONRANGE).end;
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (isEqual(this.dateInput.value, end) || !isInRange(end, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(end));
        this.dateInput.notify();
    };
    DateRangeEndInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDateRangeEndInput]'
                },] },
    ];
    /** @nocollapse */
    DateRangeEndInputDirective.ctorParameters = function () { return [
        { type: DateRangeService },
        { type: DateInputComponent },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    DateRangeEndInputDirective.propDecorators = {
        autoCorrectOn: [{ type: Input }],
        navigateCalendarOnFocus: [{ type: Input }]
    };
    return DateRangeEndInputDirective;
}(DateRangeInput));

/**
 * A directive which manages the start selection range.
 *
 * > You can use the DateRangeStartInputDirective only with a DateInput component.
 */
var DateRangeStartInputDirective = /** @class */ (function (_super) {
    __extends(DateRangeStartInputDirective, _super);
    function DateRangeStartInputDirective(rangeService, dateInput, element, renderer, zone) {
        var _this = _super.call(this, 'start', rangeService, dateInput, element, renderer, zone) || this;
        _this.rangeService = rangeService;
        _this.dateInput = dateInput;
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
        _this.navigateCalendarOnFocus = false;
        return _this;
    }
    DateRangeStartInputDirective.prototype.ngOnInit = function () {
        this.rangeService.registerStartInput(this.dateInput);
        _super.prototype.init.call(this);
    };
    DateRangeStartInputDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    DateRangeStartInputDirective.prototype.getRange = function (value, correctOn) {
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (!isInRange(value, min, max)) {
            return null;
        }
        var end = (this.rangeService.selectionRange || EMPTY_SELECTIONRANGE).end;
        var shouldClamp = this.autoCorrectOn === correctOn && end && value > end;
        return shouldClamp ? clampRange(value) : { start: cloneDate(value), end: end };
    };
    DateRangeStartInputDirective.prototype.updateInputValue = function (range$$1) {
        var start = (range$$1 || EMPTY_SELECTIONRANGE).start;
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (isEqual(this.dateInput.value, start) || !isInRange(start, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(start));
        this.dateInput.notify();
    };
    DateRangeStartInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDateRangeStartInput]'
                },] },
    ];
    /** @nocollapse */
    DateRangeStartInputDirective.ctorParameters = function () { return [
        { type: DateRangeService },
        { type: DateInputComponent },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    DateRangeStartInputDirective.propDecorators = {
        autoCorrectOn: [{ type: Input }],
        navigateCalendarOnFocus: [{ type: Input }]
    };
    return DateRangeStartInputDirective;
}(DateRangeInput));

/**
 * A directive which manages the MultiViewCalendar range selection.
 */
var DateRangeSelectionDirective = /** @class */ (function () {
    function DateRangeSelectionDirective(calendar, cdr, element, renderer, dateRangeService) {
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
        this.calendarSubscriptions = new Subscription(function () { });
        this.dateRangeService = this.dateRangeService || new DateRangeService();
        renderer.setAttribute(element.nativeElement, 'aria-multiselectable', 'true');
    }
    Object.defineProperty(DateRangeSelectionDirective.prototype, "selectionRange", {
        /**
         * Gets or sets the selection range of the calendar. When a new range is set,
         * the connected DateRangeService notifies all related parties.
         */
        get: function () {
            return this.calendar ? this.calendar.selectionRange : null;
        },
        set: function (range$$1) {
            if (!this.isEqualCalendarRange(range$$1)) {
                this.setSelectionRange(range$$1);
            }
            if (!isEqualRange(this.dateRangeService.selectionRange, range$$1)) {
                this.dateRangeService.setRange(range$$1);
            }
            this.updateFocusedDate(range$$1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeSelectionDirective.prototype, "activeRangeEnd", {
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
        get: function () {
            return this.calendar.activeRangeEnd;
        },
        set: function (activeRange) {
            if (this.dateRangeService.activeRangeEnd === activeRange) {
                return;
            }
            this.calendar.activeRangeEnd = activeRange;
            this.dateRangeService.setActiveRangeEnd(activeRange);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeSelectionDirective.prototype, "calendarRange", {
        get: function () {
            return this.selectionRange || EMPTY_SELECTIONRANGE;
        },
        enumerable: true,
        configurable: true
    });
    DateRangeSelectionDirective.prototype.ngOnInit = function () {
        var _this = this;
        var calendar = this.calendar;
        var dateRangeService = this.dateRangeService;
        calendar.min = either(dateRangeService.min, calendar.min);
        calendar.max = either(dateRangeService.max, calendar.max);
        this.addSubscriptions(calendar.cellEnter.subscribe(function (value) { return _this.handleHover(value); }), calendar.valueChange.subscribe(function (value) { return _this.handleChange(value); }), dateRangeService.focusedDate$.subscribe(function (focusedDate) {
            if (!isEqual(calendar.focusedDate, focusedDate)) {
                calendar.focusedDate = focusedDate;
            }
        }), dateRangeService.activeRangeEnd$.subscribe(function (rangeEnd) {
            if (calendar.activeRangeEnd === rangeEnd) {
                return;
            }
            calendar.activeRangeEnd = rangeEnd;
            _this.activeRangeEndChange.emit(rangeEnd);
            _this.cdr.markForCheck();
        }), dateRangeService.range$.subscribe(function (range$$1) {
            if (!_this.isEqualCalendarRange(range$$1)) {
                _this.acceptAndEmit(range$$1);
            }
            _this.updateFocusedDate(range$$1);
        }), fromEvent(this.element.nativeElement, 'blur').subscribe(function () { return _this.handleBlur(); }));
    };
    DateRangeSelectionDirective.prototype.ngOnDestroy = function () {
        this.calendarSubscriptions.unsubscribe();
    };
    DateRangeSelectionDirective.prototype.addSubscriptions = function () {
        var _this = this;
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        subscriptions.map(function (s) { return _this.calendarSubscriptions.add(s); });
    };
    DateRangeSelectionDirective.prototype.isEqualCalendarRange = function (range$$1) {
        return isEqualRange(this.calendar.selectionRange, range$$1);
    };
    DateRangeSelectionDirective.prototype.handleBlur = function () {
        var _a = this.calendarRange, start = _a.start, end = _a.end;
        var autoCorrect = this.autoCorrectOn === 'blur' && start !== null && end !== null && end < start;
        if (autoCorrect) {
            this.dateRangeService.setRange(clampRange(start));
        }
    };
    DateRangeSelectionDirective.prototype.handleChange = function (value) {
        var service = this.dateRangeService;
        var autoCorrect = this.autoCorrectOn === 'change' && this.shouldAutoCorrect(value);
        var activeEnd = this.calendar.activeRangeEnd !== 'end' ? 'end' : (autoCorrect ? 'end' : 'start');
        var range$$1 = autoCorrect ? clampRange(value) : this.updateRange(value);
        if (!isEqualRange(service.selectionRange, range$$1)) {
            this.acceptAndEmit(range$$1);
            service.setActiveRangeEnd(activeEnd);
            service.setRange(range$$1);
        }
    };
    DateRangeSelectionDirective.prototype.handleHover = function (value) {
        if (this.hasCompleteRange()) {
            return;
        }
        var _a = this.calendarRange, start = _a.start, end = _a.end;
        var activeRangeEnd = this.calendar.activeRangeEnd;
        var updateRange = (start && activeRangeEnd === 'end') || (end && activeRangeEnd === 'start');
        if (updateRange) {
            this.setSelectionRange(this.updateRange(value));
        }
    };
    DateRangeSelectionDirective.prototype.hasCompleteRange = function () {
        var _a = this.dateRangeService.selectionRange || EMPTY_SELECTIONRANGE, start = _a.start, end = _a.end;
        return Boolean(start) && Boolean(end);
    };
    DateRangeSelectionDirective.prototype.shouldAutoCorrect = function (value) {
        var _a = this.calendarRange, end = _a.end, start = _a.start;
        if (this.calendar.activeRangeEnd !== 'end') {
            return end !== null && value > end;
        }
        else {
            return start !== null && value < start;
        }
    };
    DateRangeSelectionDirective.prototype.updateFocusedDate = function (range$$1) {
        if (!range$$1 || this.dateRangeService.focusedDate) {
            return;
        }
        this.dateRangeService.setFocusedDate(range$$1.start || range$$1.end);
    };
    DateRangeSelectionDirective.prototype.updateRange = function (value) {
        var _a = this.calendarRange, end = _a.end, start = _a.start;
        return this.calendar.activeRangeEnd !== 'end' ? ({ start: value, end: end }) : ({ start: start, end: value });
    };
    DateRangeSelectionDirective.prototype.setSelectionRange = function (range$$1) {
        this.calendar.selectionRange = range$$1;
        this.calendar.writeValue(null);
    };
    DateRangeSelectionDirective.prototype.acceptAndEmit = function (range$$1) {
        this.setSelectionRange(range$$1);
        this.selectionRangeChange.emit(range$$1);
    };
    DateRangeSelectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDateRangeSelection]'
                },] },
    ];
    /** @nocollapse */
    DateRangeSelectionDirective.ctorParameters = function () { return [
        { type: MultiViewCalendarComponent },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: Renderer2 },
        { type: DateRangeService, decorators: [{ type: Optional }] }
    ]; };
    DateRangeSelectionDirective.propDecorators = {
        autoCorrectOn: [{ type: Input }],
        selectionRange: [{ type: Input }],
        activeRangeEnd: [{ type: Input }],
        activeRangeEndChange: [{ type: Output }],
        selectionRangeChange: [{ type: Output }]
    };
    return DateRangeSelectionDirective;
}());

/* tslint:disable:directive-class-suffix directive-selector */
/**
 * @hidden
 */
var KForOfContext = /** @class */ (function () {
    function KForOfContext($implicit, kForOf, index, count) {
        this.$implicit = $implicit;
        this.kForOf = kForOf;
        this.index = index;
        this.count = count;
    }
    Object.defineProperty(KForOfContext.prototype, "first", {
        get: function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "last", {
        get: function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "even", {
        get: function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KForOfContext.prototype, "odd", {
        get: function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return KForOfContext;
}());
/**
 * @hidden
 */
var KForOf = /** @class */ (function () {
    function KForOf(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    Object.defineProperty(KForOf.prototype, "kForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    KForOf.prototype.ngOnChanges = function (changes) {
        if ('kForOf' in changes) {
            var value = changes.kForOf.currentValue;
            if (this._differ || !value) {
                return;
            }
            try {
                this._differ = this._differs.find(value).create(this.kForTrackBy);
            }
            catch (e) {
                throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'.");
            }
        }
    };
    KForOf.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this.kForOf);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    };
    KForOf.prototype._applyChanges = function (changes) {
        if (!isDocumentAvailable()) {
            return;
        }
        var viewContainerLength = this._viewContainer.length;
        var dataLength = this.kForOf.length;
        var tuples = {};
        changes.forEachOperation(function (record, _, currentIndex) {
            if (currentIndex !== null) {
                tuples[currentIndex] = record.item;
            }
        });
        for (var i = viewContainerLength; i < dataLength; i++) {
            this._viewContainer.createEmbeddedView(this._template, new KForOfContext(null, this.kForOf, -1, -1), i);
        }
        for (var i = this._viewContainer.length; i > dataLength; i--) {
            this._viewContainer.remove(i - 1);
        }
        for (var i = 0; i < this._viewContainer.length; i++) {
            var view = this._viewContainer.get(i);
            view.context.index = i;
            view.context.count = length;
            view.context.$implicit = tuples[i] || null;
        }
    };
    KForOf.decorators = [
        { type: Directive, args: [{ selector: '[kFor][kForOf]' },] },
    ];
    /** @nocollapse */
    KForOf.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TemplateRef },
        { type: IterableDiffers }
    ]; };
    KForOf.propDecorators = {
        kForOf: [{ type: Input }],
        kForTrackBy: [{ type: Input }],
        kForTemplate: [{ type: Input }]
    };
    return KForOf;
}());
/**
 * @hidden
 */
function getTypeNameForDebugging(type) {
    return type.name || typeof type;
}

/**
 * @hidden
 */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(bus, cdr, localization, intl, disabledDatesService) {
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
    Object.defineProperty(HeaderComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.ngOnInit = function () {
        this.subscriptions
            .add(this.intl.changes.subscribe(this.intlChange.bind(this)))
            .add(this.localization.changes.subscribe(this.l10nChange.bind(this)))
            .add(this.disabledDatesService.changes.subscribe(this.setTodayAvailability.bind(this)));
    };
    HeaderComponent.prototype.ngOnChanges = function (_) {
        var service = this.bus.service(this.activeView);
        if (!service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        this.todayMessage = this.localization.get('today');
        this.setTodayAvailability();
        this.navigate = this.bus.canMoveUp(this.activeView);
        this.title = this.getTitle();
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    HeaderComponent.prototype.handleTodayClick = function () {
        if (!this.todayAvailable) {
            return;
        }
        this.bus.moveToBottom(this.activeView);
        this.today.emit(dateInRange(getToday(), this.min, this.max));
    };
    HeaderComponent.prototype.handleNavigation = function () {
        if (!this.navigate) {
            return;
        }
        this.bus.moveUp(this.activeView);
    };
    HeaderComponent.prototype.intlChange = function () {
        if (this.currentDate && this.bus.service(this.activeView)) {
            this.title = this.getTitle();
            this.cdr.markForCheck();
        }
    };
    HeaderComponent.prototype.l10nChange = function () {
        this.todayMessage = this.localization.get('today');
        this.cdr.markForCheck();
    };
    HeaderComponent.prototype.getTitle = function () {
        if (!this.currentDate) {
            return '';
        }
        var service = this.bus.service(this.activeView);
        var take = this.rangeLength - 1;
        var title = service.title(this.currentDate);
        var nextDate = service.addToDate(this.currentDate, take);
        if (take < 1 || !service.isInRange(nextDate, this.min, this.max)) {
            return title;
        }
        return title + " - " + service.title(nextDate);
    };
    HeaderComponent.prototype.setTodayAvailability = function () {
        var today = getToday();
        var isTodayInRange = isInRange(today, getDate(this.min), getDate(this.max));
        var isDisabled = this.disabledDatesService.isDateDisabled(today);
        this.todayAvailable = isTodayInRange && !isDisabled;
        this.cdr.markForCheck();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-calendar-header',
                    template: "\n    <span class=\"k-button k-bare k-title\" [class.k-state-disabled]=\"!navigate\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleNavigation\n        }\"\n        [scope]=\"this\">\n        <ng-template [ngIf]=\"!templateRef\">{{title}}</ng-template>\n        <ng-template\n            [ngIf]=\"templateRef\"\n            [ngTemplateOutlet]=\"templateRef\"\n            [ngTemplateOutletContext]=\"{ $implicit: title, activeView: activeViewValue, date: currentDate }\"\n        ></ng-template>\n    </span>\n    <span class=\"k-today\" [class.k-state-disabled]=\"!todayAvailable\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleTodayClick\n        }\"\n        [scope]=\"this\">\n        {{todayMessage}}\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef },
        { type: LocalizationService },
        { type: IntlService },
        { type: DisabledDatesService }
    ]; };
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
    return HeaderComponent;
}());

/**
 * @hidden
 */
var WeekNamesService = /** @class */ (function () {
    function WeekNamesService(intl) {
        this.intl = intl;
    }
    WeekNamesService.prototype.getWeekNames = function (includeWeekNumber) {
        if (includeWeekNumber === void 0) { includeWeekNumber = false; }
        var weekNames = shiftWeekNames(this.intl.dateFormatNames({ nameType: 'short', type: 'days' }), this.intl.firstDay());
        return includeWeekNumber ? [''].concat(weekNames) : weekNames;
    };
    WeekNamesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WeekNamesService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return WeekNamesService;
}());

/**
 * @hidden
 */
var ViewComponent = /** @class */ (function () {
    function ViewComponent(bus, intl, cdr, weekService, element, zone, renderer, disabledDatesService) {
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
    Object.defineProperty(ViewComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.activeView === CalendarViewEnum.month;
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    ViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    ViewComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        var generateWeekNames = this.isHorizontal() && this.weekNames.length === 0;
        if (generateWeekNames && (changes.weekNumber || changes.direction)) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.colSpan = this.service.rowLength(this.weekNumber);
        this.title = this.service.title(this.viewDate);
        this.updateData();
        if (changes.activeView) {
            this.currentCellIndex = null;
        }
    };
    ViewComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        this.domEvents.forEach(function (unsubscribeCallback) { return unsubscribeCallback(); });
    };
    ViewComponent.prototype.isHorizontal = function () {
        return this.direction === 'horizontal';
    };
    ViewComponent.prototype.isMonthView = function () {
        return this.activeView === CalendarViewEnum.month;
    };
    ViewComponent.prototype.firstDate = function (rowCtx) {
        var ctx = this.firstWeekDateContext(rowCtx);
        return ctx ? ctx.value : null;
    };
    ViewComponent.prototype.getWeekNumber = function (date) {
        if (!this.weekNumber) {
            return null;
        }
        return weekInYear(date, this.intl.firstDay());
    };
    ViewComponent.prototype.getWeekNumberContext = function (rowCtx) {
        var ctx = this.firstWeekDateContext(rowCtx);
        if (!this.weekNumber || !ctx) {
            return null;
        }
        var weekNumber = weekInYear(ctx.value, this.intl.firstDay()).toString();
        return {
            formattedValue: weekNumber,
            id: null,
            isFocused: false,
            isSelected: false,
            isWeekend: false,
            title: weekNumber,
            value: cloneDate(ctx.value)
        };
    };
    ViewComponent.prototype.getStyles = function (context) {
        var isRangeEnd = context.isRangeEnd, isRangeStart = context.isRangeStart;
        var isEndActive = this.activeRangeEnd === 'end' && isRangeEnd;
        var isStartActive = this.activeRangeEnd === 'start' && isRangeStart;
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
    };
    ViewComponent.prototype.tableCellIndex = function (rowIndex, cellIndex) {
        return rowIndex + ":" + cellIndex;
    };
    ViewComponent.prototype.firstWeekDateContext = function (rowCtx) {
        if (!this.weekNumber) {
            return null;
        }
        var idx = 0;
        var ctx = rowCtx[idx];
        while (!ctx && idx < rowCtx.length) {
            ctx = rowCtx[++idx];
        }
        return ctx;
    };
    ViewComponent.prototype.updateData = function () {
        var time = this.selectedDate || getToday();
        var viewDate = setTime(this.viewDate, time);
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
    };
    ViewComponent.prototype.intlChange = function () {
        this.updateData();
        if (this.isHorizontal()) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.cdr.markForCheck();
    };
    ViewComponent.prototype.disabledDatesChange = function () {
        this.updateData();
        this.cdr.markForCheck();
    };
    ViewComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', this.cellMouseoverHandler.bind(this)), this.renderer.listen(element, 'mouseleave', this.mouseLeaveHandler.bind(this)), this.renderer.listen(element, 'click', this.clickHandler.bind(this)));
    };
    ViewComponent.prototype.clickHandler = function (args) {
        var cell = this.closestCell(args);
        if (cell) {
            var index = cell.getAttribute('data-cell-index');
            var cellContext = this.cellByIndex(index);
            if (!cellContext.isDisabled) {
                this.change.emit(cellContext.value);
            }
        }
    };
    ViewComponent.prototype.mouseLeaveHandler = function () {
        if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    };
    ViewComponent.prototype.cellMouseoverHandler = function (args) {
        var cell = this.closestCell(args);
        if (cell) {
            var index = cell.getAttribute('data-cell-index');
            if (this.currentCellIndex && this.currentCellIndex !== index) {
                this.emitCellLeave();
            }
            var value = this.cellByIndex(index).value;
            this.cellEnter.emit(value);
            this.currentCellIndex = index;
        }
        else if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    };
    ViewComponent.prototype.closestCell = function (eventArgs) {
        return closestInScope(eventArgs.target, function (node) { return node.hasAttribute('data-cell-index'); }, this.element.nativeElement);
    };
    ViewComponent.prototype.emitCellLeave = function () {
        var item = this.cellByIndex(this.currentCellIndex);
        if (item) {
            this.cellLeave.emit(item.value);
        }
        this.currentCellIndex = null;
    };
    ViewComponent.prototype.cellByIndex = function (index) {
        var _a = index.split(':'), rowIndex = _a[0], cellIndex = _a[1];
        return this.data[rowIndex][cellIndex];
    };
    ViewComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoCalendarView]',
                    template: "\n    <ng-template #emptyCell><td class=\"k-empty\">&nbsp;</td></ng-template>\n    <tr *ngIf=\"!isHorizontal()\" role=\"row\"><th scope=\"col\" [colSpan]=\"colSpan\">{{title}}</th></tr>\n    <tr role=\"row\" *ngIf=\"isMonthView() && isHorizontal()\">\n        <th *ngFor=\"let name of weekNames\">{{name}}</th>\n    </tr>\n    <tr *kFor=\"let row of data; let rowIndex = index\" role=\"row\">\n        <ng-template [ngIf]=\"weekNumber\">\n            <td class=\"k-alt\" *ngIf=\"firstDate(row); else emptyCell\">\n                <ng-template [ngIf]=\"!weekNumberTemplateRef\">\n                    {{getWeekNumber(firstDate(row))}}\n                </ng-template>\n                <ng-template\n                    [ngIf]=\"weekNumberTemplateRef\"\n                    [ngTemplateOutlet]=\"weekNumberTemplateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: firstDate(row),\n                        cellContext: getWeekNumberContext(row)\n                    }\"\n                ></ng-template>\n            </td>\n        </ng-template>\n        <ng-container *kFor=\"let cell of row; let cellIndex = index\">\n            <td\n                *ngIf=\"cell; else emptyCell\"\n                role=\"gridcell\"\n                [attr.id]=\"cell.id\"\n                [attr.data-cell-index]=\"tableCellIndex(rowIndex, cellIndex)\"\n                [attr.aria-selected]=\"cell.isSelected || cell.isRangeStart || cell.isRangeMid || cell.isRangeEnd\"\n                [attr.aria-disabled]=\"cell.isDisabled\"\n                [ngClass]=\"getStyles(cell)\"\n                [title]=\"cell.title\"\n            >\n                <span class=\"k-link\">\n                    <ng-template [ngIf]=\"!templateRef\">{{cell.formattedValue}}</ng-template>\n                    <ng-template\n                        *ngIf=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngTemplateOutletContext]=\"{ $implicit: cell.value, cellContext: cell }\"\n                    ></ng-template>\n                </span>\n            </td>\n        </ng-container>\n    </tr>\n  "
                },] },
    ];
    /** @nocollapse */
    ViewComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: IntlService },
        { type: ChangeDetectorRef },
        { type: WeekNamesService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: DisabledDatesService }
    ]; };
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
    return ViewComponent;
}());

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `HeaderComponent`&mdash;The component that renders the UI for vertical navigation.
 * - `ViewComponent`&mdash;The component that renders the active Calendar view.
 */
var CalendarCommonModule = /** @class */ (function () {
    function CalendarCommonModule() {
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
    return CalendarCommonModule;
}());

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
var TemplatesModule = /** @class */ (function () {
    function TemplatesModule() {
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
    return TemplatesModule;
}());

/**
 * @hidden
 */
var CalendarMessages = /** @class */ (function (_super) {
    __extends(CalendarMessages, _super);
    function CalendarMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarMessages.propDecorators = {
        today: [{ type: Input }]
    };
    return CalendarMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var CalendarLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(CalendarLocalizedMessagesDirective, _super);
    function CalendarLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    CalendarLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: CalendarMessages,
                            useExisting: forwardRef(function () { return CalendarLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoCalendarLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    CalendarLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CalendarLocalizedMessagesDirective;
}(CalendarMessages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var CalendarCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CalendarCustomMessagesComponent, _super);
    function CalendarCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CalendarCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CalendarCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: CalendarMessages,
                            useExisting: forwardRef(function () { return CalendarCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-calendar-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CalendarCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CalendarCustomMessagesComponent;
}(CalendarMessages));

var COMPONENT_DIRECTIVES = [
    VirtualizationComponent
];
/**
 * @hidden
 *
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Virtualization component.
 */
var VirtualizationModule = /** @class */ (function () {
    function VirtualizationModule() {
    }
    VirtualizationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [CommonModule]
                },] },
    ];
    return VirtualizationModule;
}());

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
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
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
    return CalendarModule;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        today: [{ type: Input }],
        prevButtonTitle: [{ type: Input }],
        nextButtonTitle: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var MultiViewCalendarLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(MultiViewCalendarLocalizedMessagesDirective, _super);
    function MultiViewCalendarLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    MultiViewCalendarLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return MultiViewCalendarLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoMultiViewCalendarLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return MultiViewCalendarLocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var MultiViewCalendarCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(MultiViewCalendarCustomMessagesComponent, _super);
    function MultiViewCalendarCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(MultiViewCalendarCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MultiViewCalendarCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return MultiViewCalendarCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-multiviewcalendar-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    MultiViewCalendarCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return MultiViewCalendarCustomMessagesComponent;
}(Messages));

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
var MultiViewCalendarModule = /** @class */ (function () {
    function MultiViewCalendarModule() {
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
    return MultiViewCalendarModule;
}());

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
var CalendarsModule = /** @class */ (function () {
    function CalendarsModule() {
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
    return CalendarsModule;
}());

/**
 * @hidden
 */
var DateInputMessages = /** @class */ (function (_super) {
    __extends(DateInputMessages, _super);
    function DateInputMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateInputMessages.propDecorators = {
        decrement: [{ type: Input }],
        increment: [{ type: Input }]
    };
    return DateInputMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var DateInputLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(DateInputLocalizedMessagesDirective, _super);
    function DateInputLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    DateInputLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: DateInputMessages,
                            useExisting: forwardRef(function () { return DateInputLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoDateInputLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    DateInputLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DateInputLocalizedMessagesDirective;
}(DateInputMessages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var DateInputCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(DateInputCustomMessagesComponent, _super);
    function DateInputCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(DateInputCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DateInputCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: DateInputMessages,
                            useExisting: forwardRef(function () { return DateInputCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-dateinput-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    DateInputCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DateInputCustomMessagesComponent;
}(DateInputMessages));

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateInput component.
 */
var DateInputModule = /** @class */ (function () {
    function DateInputModule() {
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
    return DateInputModule;
}());

/**
 * @hidden
 */
var DatePickerMessages = /** @class */ (function (_super) {
    __extends(DatePickerMessages, _super);
    function DatePickerMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerMessages.propDecorators = {
        today: [{ type: Input }],
        toggle: [{ type: Input }]
    };
    return DatePickerMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var DatePickerLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(DatePickerLocalizedMessagesDirective, _super);
    function DatePickerLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    DatePickerLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: DatePickerMessages,
                            useExisting: forwardRef(function () { return DatePickerLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoDatePickerLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    DatePickerLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DatePickerLocalizedMessagesDirective;
}(DatePickerMessages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var DatePickerCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(DatePickerCustomMessagesComponent, _super);
    function DatePickerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(DatePickerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: DatePickerMessages,
                            useExisting: forwardRef(function () { return DatePickerCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-datepicker-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    DatePickerCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DatePickerCustomMessagesComponent;
}(DatePickerMessages));

var ɵ0$e = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DatePicker component.
 */
var DatePickerModule = /** @class */ (function () {
    function DatePickerModule() {
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
    return DatePickerModule;
}());

var COMPONENT_DIRECTIVES$1 = [
    DateRangeComponent,
    DateRangePopupComponent,
    DateRangePopupTemplateDirective,
    DateRangeSelectionDirective,
    DateRangeStartInputDirective,
    DateRangeEndInputDirective
];
var COMPONENT_MODULES = [
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
var DateRangeModule = /** @class */ (function () {
    function DateRangeModule() {
    }
    DateRangeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES$1],
                    exports: [COMPONENT_DIRECTIVES$1],
                    imports: [CommonModule, COMPONENT_MODULES]
                },] },
    ];
    return DateRangeModule;
}());

var div$1 = domContainerFactory('div');
var ul$1 = domContainerFactory('ul');
var li$1 = domContainerFactory('li');
var listItem = function () { return li$1('<span>02</span>', 'k-item'); };
var list = function () { return ul$1([listItem()], 'k-reset'); };
var scrollable$1 = function () { return (div$1([list()], 'k-time-container k-content k-scrollable')); };
var timeListWrapper = function () {
    if (!isDocumentAvailable()) {
        return null;
    }
    return div$1([div$1([scrollable$1()], 'k-time-list')], 'k-time-list-wrapper', { left: '-10000px', position: 'absolute' });
};
var TIMELIST_WRAPPER = timeListWrapper();
/**
 * @hidden
 */
var TimePickerDOMService = /** @class */ (function () {
    function TimePickerDOMService() {
    }
    TimePickerDOMService.prototype.ensureHeights = function () {
        if (this.timeListHeight !== undefined) {
            return;
        }
        this.calculateHeights();
    };
    TimePickerDOMService.prototype.calculateHeights = function (container) {
        if (!isDocumentAvailable()) {
            return;
        }
        var listContainer = container && container.querySelector('.k-time-list-container');
        var hostContainer = listContainer || document.body;
        var wrapper = hostContainer.appendChild(TIMELIST_WRAPPER);
        this.timeListHeight = wrapper.querySelector('.k-scrollable').getBoundingClientRect().height;
        this.itemHeight = wrapper.querySelector('li').getBoundingClientRect().height;
        hostContainer.removeChild(wrapper);
    };
    TimePickerDOMService.prototype.isActive = function (element) {
        if (!isDocumentAvailable() || !element) {
            return false;
        }
        return (element.nativeElement || element) === document.activeElement;
    };
    TimePickerDOMService.decorators = [
        { type: Injectable },
    ];
    return TimePickerDOMService;
}());

var HOURS_IN_DAY = 24;
var clampToRange = function (rangeValue) { return function (value) { return value % rangeValue; }; };
var clamp = clampToRange(HOURS_IN_DAY);
var stepper = function (start, step) { return function (idx) { return clamp(start + (idx * step)); }; };
var distanceFromMin = function (value, min) { return clamp(HOURS_IN_DAY + value - min); };
var limit = function (borderValue) { return function (barrier, value) {
    var useBarrier = !value || getDate(barrier).getTime() === getDate(value).getTime();
    return useBarrier ? barrier : setHours(barrier, borderValue);
}; };
var limitDown = limit(0);
var limitUp = limit(HOURS_IN_DAY - 1);
/**
 * @hidden
 */
var HoursService = /** @class */ (function () {
    function HoursService(intl) {
        this.intl = intl;
        this.boundRange = false;
        this.insertUndividedMax = false;
    }
    HoursService.prototype.apply = function (value, candidate) {
        return setHours(value, candidate.getHours());
    };
    HoursService.prototype.configure = function (settings) {
        var _this = this;
        var _a = settings.boundRange, boundRange = _a === void 0 ? this.boundRange : _a, _b = settings.insertUndividedMax, insertUndividedMax = _b === void 0 ? this.insertUndividedMax : _b, _c = settings.min, min = _c === void 0 ? this.min : _c, _d = settings.max, max = _d === void 0 ? this.max : _d, part = settings.part, _e = settings.step, step = _e === void 0 ? this.step : _e;
        this.boundRange = boundRange;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = function (hour) {
            var date = setHours(MIDNIGHT_DATE, hour);
            return {
                text: _this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    };
    HoursService.prototype.data = function (selectedValue) {
        var _this = this;
        var min = this.range(selectedValue)[0];
        var getHour = stepper(min, this.step);
        var convertToItem = function (idx) { return (_this.toListItem(getHour(idx))); };
        var data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    };
    HoursService.prototype.isRangeChanged = function (min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    };
    HoursService.prototype.limitRange = function (min, max, value) {
        return this.boundRange ? [limitDown(min, value), limitUp(max, value)] : [min, max];
    };
    HoursService.prototype.total = function (value) {
        var last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        var missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    };
    HoursService.prototype.selectedIndex = function (value) {
        return Math.ceil(this.divideByStep(value));
    };
    HoursService.prototype.valueInList = function (value) {
        if (!value) {
            return true;
        }
        var matchMax = this.insertUndividedMax && this.lastHour(value) === value.getHours();
        return matchMax || !this.isMissing(value);
    };
    HoursService.prototype.addLast = function (data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastHour(value)));
        }
        return data;
    };
    HoursService.prototype.addMissing = function (data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        var missingItem = this.toListItem(value.getHours());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    };
    HoursService.prototype.countFromMin = function (value) {
        var _a = this.range(value), min = _a[0], max = _a[1];
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    };
    HoursService.prototype.isMissing = function (value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    };
    HoursService.prototype.isLastMissing = function (value) {
        return this.isMissing(setHours(this.max, this.lastHour(value)));
    };
    HoursService.prototype.divideByStep = function (value) {
        return distanceFromMin(value.getHours(), this.min.getHours()) / this.step;
    };
    HoursService.prototype.lastHour = function (value) {
        return this.range(value)[1];
    };
    HoursService.prototype.range = function (value) {
        var _a = this.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        return [min.getHours(), max.getHours()];
    };
    HoursService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HoursService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return HoursService;
}());

var MINUTES_IN_HOUR = 60;
var clampToRange$1 = function (rangeValue) { return function (value) { return value % rangeValue; }; };
var clamp$1 = clampToRange$1(MINUTES_IN_HOUR);
var stepper$1 = function (start, step) { return function (idx) { return clamp$1(start + (idx * step)); }; };
var distanceFromMin$1 = function (value, min) { return clamp$1(MINUTES_IN_HOUR + value - min); };
var limit$1 = function (borderValue) { return function (barrier, value) {
    var useBarrier = !value || barrier.getHours() === value.getHours();
    return useBarrier ? barrier : setMinutes(barrier, borderValue);
}; };
var limitDown$1 = limit$1(0);
var limitUp$1 = limit$1(MINUTES_IN_HOUR - 1);
/**
 * @hidden
 */
var MinutesService = /** @class */ (function () {
    function MinutesService(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    MinutesService.prototype.apply = function (value, candidate) {
        return setMinutes(value, candidate.getMinutes());
    };
    MinutesService.prototype.configure = function (settings) {
        var _this = this;
        var _a = settings.insertUndividedMax, insertUndividedMax = _a === void 0 ? this.insertUndividedMax : _a, _b = settings.min, min = _b === void 0 ? this.min : _b, _c = settings.max, max = _c === void 0 ? this.max : _c, part = settings.part, _d = settings.step, step = _d === void 0 ? this.step : _d;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = function (minute) {
            var date = setMinutes(MIDNIGHT_DATE, minute);
            return {
                text: _this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    };
    MinutesService.prototype.data = function (selectedValue) {
        var _this = this;
        var min = this.range(selectedValue)[0];
        var getMinute = stepper$1(min, this.step);
        var convertToItem = function (idx) { return (_this.toListItem(getMinute(idx))); };
        var data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    };
    MinutesService.prototype.isRangeChanged = function (min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    };
    MinutesService.prototype.limitRange = function (min, max, value) {
        return [limitDown$1(min, value), limitUp$1(max, value)];
    };
    MinutesService.prototype.total = function (value) {
        var last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        var missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    };
    MinutesService.prototype.selectedIndex = function (value) {
        return Math.ceil(this.divideByStep(value));
    };
    MinutesService.prototype.valueInList = function (value) {
        if (!value) {
            return true;
        }
        var matchMax = this.insertUndividedMax && this.lastMinute(value) === value.getMinutes();
        return matchMax || !this.isMissing(value);
    };
    MinutesService.prototype.addLast = function (data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastMinute(value)));
        }
        return data;
    };
    MinutesService.prototype.addMissing = function (data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        var missingItem = this.toListItem(value.getMinutes());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    };
    MinutesService.prototype.countFromMin = function (value) {
        var _a = this.range(value), min = _a[0], max = _a[1];
        return Math.floor(distanceFromMin$1(max, min) / this.step) + 1; /* include min */
    };
    MinutesService.prototype.isMissing = function (value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    };
    MinutesService.prototype.isLastMissing = function (value) {
        return this.isMissing(setMinutes(this.max, this.lastMinute(value)));
    };
    MinutesService.prototype.divideByStep = function (value) {
        return distanceFromMin$1(value.getMinutes(), this.min.getMinutes()) / this.step;
    };
    MinutesService.prototype.lastMinute = function (value) {
        return this.range(value)[1];
    };
    MinutesService.prototype.range = function (value) {
        var _a = this.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        return [min.getMinutes(), max.getMinutes()];
    };
    MinutesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MinutesService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return MinutesService;
}());

var SECONDS_IN_HOUR = 60;
var clampToRange$2 = function (rangeValue) { return function (value) { return value % rangeValue; }; };
var clamp$2 = clampToRange$2(SECONDS_IN_HOUR);
var stepper$2 = function (start, step) { return function (idx) { return clamp$2(start + (idx * step)); }; };
var distanceFromMin$2 = function (value, min) { return clamp$2(SECONDS_IN_HOUR + value - min); };
var limit$2 = function (borderValue) { return function (barrier, value) {
    var useBarrier = !value || barrier.getHours() === value.getHours() && barrier.getMinutes() === value.getMinutes();
    return useBarrier ? barrier : setSeconds(barrier, borderValue);
}; };
var limitDown$2 = limit$2(0);
var limitUp$2 = limit$2(SECONDS_IN_HOUR - 1);
/**
 * @hidden
 */
var SecondsService = /** @class */ (function () {
    function SecondsService(intl) {
        this.intl = intl;
        this.insertUndividedMax = false;
    }
    SecondsService.prototype.apply = function (value, candidate) {
        return setSeconds(value, candidate.getSeconds());
    };
    SecondsService.prototype.configure = function (settings) {
        var _this = this;
        var _a = settings.insertUndividedMax, insertUndividedMax = _a === void 0 ? this.insertUndividedMax : _a, _b = settings.min, min = _b === void 0 ? this.min : _b, _c = settings.max, max = _c === void 0 ? this.max : _c, part = settings.part, _d = settings.step, step = _d === void 0 ? this.step : _d;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = function (minute) {
            var date = setSeconds(MIDNIGHT_DATE, minute);
            return {
                text: _this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    };
    SecondsService.prototype.data = function (selectedValue) {
        var _this = this;
        var min = this.range(selectedValue)[0];
        var getSecond = stepper$2(min, this.step);
        var convertToItem = function (idx) { return (_this.toListItem(getSecond(idx))); };
        var data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    };
    SecondsService.prototype.isRangeChanged = function (min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    };
    SecondsService.prototype.limitRange = function (min, max, value) {
        return [limitDown$2(min, value), limitUp$2(max, value)];
    };
    SecondsService.prototype.total = function (value) {
        var last$$1 = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        var missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last$$1;
    };
    SecondsService.prototype.selectedIndex = function (value) {
        return Math.ceil(this.divideByStep(value));
    };
    SecondsService.prototype.valueInList = function (value) {
        if (!value) {
            return true;
        }
        var matchMax = this.insertUndividedMax && this.lastSecond(value) === value.getSeconds();
        return matchMax || !this.isMissing(value);
    };
    SecondsService.prototype.divideByStep = function (value) {
        return distanceFromMin$2(value.getSeconds(), this.min.getSeconds()) / this.step;
    };
    SecondsService.prototype.addLast = function (data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastSecond(value)));
        }
        return data;
    };
    SecondsService.prototype.addMissing = function (data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        var missingItem = this.toListItem(value.getSeconds());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    };
    SecondsService.prototype.countFromMin = function (value) {
        var _a = this.range(value), min = _a[0], max = _a[1];
        return Math.floor(distanceFromMin$2(max, min) / this.step) + 1; /* include min */
    };
    SecondsService.prototype.isMissing = function (value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    };
    SecondsService.prototype.isLastMissing = function (value) {
        return this.isMissing(setSeconds(this.max, this.lastSecond(value)));
    };
    SecondsService.prototype.lastSecond = function (value) {
        return this.range(value)[1];
    };
    SecondsService.prototype.range = function (value) {
        var _a = this.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        return [min.getSeconds(), max.getSeconds()];
    };
    SecondsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SecondsService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return SecondsService;
}());

var setHours$1 = function (date, hours) {
    var clone = cloneDate(date);
    clone.setHours(hours);
    return clone;
};
var isAM = function (value) { return value !== null && value < 12; };
var isPM = function (value) { return value !== null && (!value || value > 11); };
var inRange = function (value, min, max) { return ((!min && !max) || (value >= min && value <= max)); };
var inReverseRange = function (value, min, max) { return ((!min && !max) || value >= min || value <= max); };
/**
 * @hidden
 */
var DayPeriodService = /** @class */ (function () {
    function DayPeriodService(intl) {
        this.intl = intl;
    }
    /**
     * @hidden
     */
    DayPeriodService.prototype.apply = function (value, candidate) {
        var hour = value.getHours();
        var hourAM = isAM(hour);
        var candidateAM = isAM(candidate.getHours());
        if ((hourAM && candidateAM) || (!hourAM && !candidateAM)) {
            return value;
        }
        var _a = this.normalizedRange(), min = _a[0], _b = _a[1], max = _b === void 0 ? 24 : _b;
        var result = hour + (candidateAM ? -12 : 12);
        return setHours$1(value, Math.min(Math.max(min, result), (max || 24)));
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.configure = function (settings) {
        var _a = settings.min, min = _a === void 0 ? this.min : _a, _b = settings.max, max = _b === void 0 ? this.max : _b, _c = settings.part, part = _c === void 0 ? this.part : _c;
        this.min = min;
        this.max = max;
        this.part = part;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.data = function (_) {
        var names = this.part.names;
        if (!names) {
            return [];
        }
        var data = [];
        var _a = this.normalizedRange(), min = _a[0], max = _a[1];
        var dayPeriod = this.intl.dateFormatNames(names);
        if (isAM(min)) {
            data.push({ text: dayPeriod.am, value: setHours$1(this.min, min) });
        }
        if (isPM(max)) {
            data.push({ text: dayPeriod.pm, value: setHours$1(this.min, Math.max(12, max)) });
        }
        return this.min.getHours() !== min ? data.reverse() : data;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.isRangeChanged = function (_, __) {
        return false;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.limitRange = function (min, max, _) {
        return [min, max];
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.total = function () {
        var _a = this.normalizedRange(), min = _a[0], max = _a[1];
        if (!min && !max) {
            return 2;
        }
        if (min > 11 || max < 12) {
            return 1;
        }
        return 2;
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.selectedIndex = function (value) {
        if (!this.valueInList(value)) {
            return -1;
        }
        var index = Math.floor(value.getHours() / 12);
        return this.min.getHours() === this.normalizedRange()[0] ? index : (index === 0 ? 1 : 0);
    };
    /**
     * @hidden
     */
    DayPeriodService.prototype.valueInList = function (value) {
        var reverse = this.min.getHours() !== this.normalizedRange()[0];
        var isInRange = reverse ? inReverseRange : inRange;
        return isInRange(value.getHours(), this.min.getHours(), this.max.getHours());
    };
    DayPeriodService.prototype.normalizedRange = function () {
        var minHour = this.min.getHours();
        var maxHour = this.max.getHours();
        return [
            Math.min(minHour, maxHour),
            Math.max(minHour, maxHour)
        ];
    };
    DayPeriodService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DayPeriodService.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return DayPeriodService;
}());

var _a$6;
var SNAP_THRESHOLD = 0.05; //% of the item height
var SCROLL_THRESHOLD = 2; //< 2px threshold
var nil = function () { return (null); };
var getters = {
    35: function (data, _) { return data[data.length - 1]; },
    36: function (data, _) { return data[0]; },
    38: function (data, index) { return data[index - 1]; },
    40: function (data, index) { return data[index + 1]; }
};
var services$1 = (_a$6 = {},
    _a$6[TIME_PART.dayperiod] = DayPeriodService,
    _a$6[TIME_PART.hour] = HoursService,
    _a$6[TIME_PART.minute] = MinutesService,
    _a$6[TIME_PART.second] = SecondsService,
    _a$6);
/**
 * @hidden
 */
var TimeListComponent = /** @class */ (function () {
    function TimeListComponent(element, injector, dom, renderer, zone) {
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
    Object.defineProperty(TimeListComponent.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? undefined : 0;
        },
        enumerable: true,
        configurable: true
    });
    TimeListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.part) {
            this.service = this.injector.get(services$1[this.part.type]);
            this.service.configure(this.serviceSettings());
        }
        var value = this.value;
        var valueChanges = changes.value || {};
        var _a = this.service.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        if (this.service.isRangeChanged(min, max) || changes.min || changes.max || changes.step) {
            this.data = [];
            this.service.configure(this.serviceSettings({ min: min, max: max }));
        }
        // Skip the rendering of the list whenever possible
        if (!this.data.length || this.hasMissingValue(valueChanges)) {
            this.animateToIndex = false;
            this.data = this.service.data(value);
        }
        this.animateToIndex = this.animateToIndex && this.textHasChanged(valueChanges);
        this.total = this.service.total(value);
        this.indexToScroll = this.selectedIndex(value);
    };
    TimeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.animateToIndex = true;
        this.dom.ensureHeights();
        this.itemHeight = this.dom.itemHeight;
        this.listHeight = this.dom.timeListHeight;
        this.topOffset = (this.listHeight - this.itemHeight) / 2;
        this.bottomOffset = this.listHeight - this.itemHeight;
        this.topThreshold = this.itemHeight * SNAP_THRESHOLD;
        this.bottomThreshold = this.itemHeight * (1 - SNAP_THRESHOLD);
        var translate = "translateY(" + this.topOffset + "px)";
        this.style = { transform: translate, '-ms-transform': translate };
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    TimeListComponent.prototype.ngOnDestroy = function () {
        this.scrollSubscription.unsubscribe();
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
    TimeListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.scrollToIndex(index); });
    };
    TimeListComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this.scrollOnce(function (index) {
            var action = _this.animateToIndex ? 'animateToIndex' : 'scrollToIndex';
            _this.virtualization[action](index);
            _this.animateToIndex = true;
        });
    };
    TimeListComponent.prototype.handleChange = function (dataItem) {
        var candidate = this.service.apply(this.value, dataItem.value);
        if (this.value.getTime() === candidate.getTime()) {
            return;
        }
        this.indexToScroll = this.data.indexOf(dataItem);
        this.value = candidate;
        this.valueChange.emit(candidate);
    };
    TimeListComponent.prototype.handleItemClick = function (args) {
        var item = closestInScope(args.target, function (node) { return node.hasAttribute('data-timelist-item-index'); }, this.element.nativeElement);
        if (item) {
            var index = item.getAttribute('data-timelist-item-index');
            this.handleChange(this.data[index]);
        }
    };
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
    TimeListComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the TimeList component.
     */
    TimeListComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    TimeListComponent.prototype.itemOffset = function (scrollTop) {
        var valueIndex = this.selectedIndex(this.value);
        var activeIndex = this.virtualization.activeIndex();
        var offset = this.virtualization.itemOffset(activeIndex);
        var distance = Math.abs(Math.ceil(scrollTop) - offset);
        if (valueIndex === activeIndex && distance < SCROLL_THRESHOLD) {
            return offset;
        }
        var scrollUp = valueIndex > activeIndex;
        var moveToNext = scrollUp && distance >= this.bottomThreshold || !scrollUp && distance > this.topThreshold;
        return moveToNext ? this.virtualization.itemOffset(activeIndex + 1) : offset;
    };
    TimeListComponent.prototype.hasMissingValue = function (_a) {
        var previousValue = _a.previousValue, currentValue = _a.currentValue;
        var isPreviousMissing = previousValue && !this.service.valueInList(previousValue);
        var isCurrentMissing = currentValue && !this.service.valueInList(currentValue);
        return isPreviousMissing || isCurrentMissing;
    };
    TimeListComponent.prototype.scrollOnce = function (action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    };
    TimeListComponent.prototype.serviceSettings = function (settings) {
        var defaults = {
            boundRange: false,
            insertUndividedMax: false,
            max: this.max,
            min: this.min,
            part: this.part,
            step: this.step
        };
        var result = Object.assign({}, defaults, settings);
        result.boundRange = result.part.type !== 'hour';
        return result;
    };
    TimeListComponent.prototype.selectedIndex = function (value) {
        if (!value) {
            return -1;
        }
        return this.service.selectedIndex(value);
    };
    TimeListComponent.prototype.textHasChanged = function (_a) {
        var previousValue = _a.previousValue, currentValue = _a.currentValue;
        if (!previousValue || !currentValue) {
            return false;
        }
        var oldData = this.data[this.selectedIndex(previousValue)];
        var newData = this.data[this.selectedIndex(currentValue)];
        return oldData && newData && oldData.text !== newData.text;
    };
    TimeListComponent.prototype.handleKeyDown = function (e) {
        var getter = getters[e.keyCode] || nil;
        var dataItem = getter(this.data, this.service.selectedIndex(this.value));
        if (dataItem) {
            this.handleChange(dataItem);
            e.preventDefault();
        }
    };
    TimeListComponent.prototype.bindEvents = function () {
        var _this = this;
        this.scrollSubscription = this.virtualization
            .scroll$()
            .pipe(debounceTime(100), map(function (e) { return e.target.scrollTop; }), map(function (top) { return _this.itemOffset(top); }), map(function (itemOffset) { return _this.virtualization.itemIndex(itemOffset); }))
            .subscribe(function (index) {
            _this.virtualization.scrollToIndex(index);
            _this.handleChange(_this.data[index]);
        });
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', function () { return !_this.isActive && _this.focus(); }), this.renderer.listen(element, 'click', function () { return _this.focus(); }), this.renderer.listen(element, 'blur', function () { return _this.isActive = false; }), this.renderer.listen(element, 'focus', function () { return _this.isActive = true; }), this.renderer.listen(element, 'keydown', this.handleKeyDown.bind(this)));
    };
    TimeListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-timelist',
                    template: "\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"total\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [maxScrollDifference]=\"listHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        class=\"k-time-container\"\n        role=\"presentation\"\n        tabindex=\"-1\"\n    >\n        <ul [ngStyle]=\"style\" class=\"k-reset\"\n            [kendoEventsOutsideAngular]=\"{\n                click: handleItemClick\n            }\"\n            [scope]=\"this\"\n        >\n            <li *ngFor=\"let item of data; let index = index;\" class=\"k-item\"\n                [attr.data-timelist-item-index]=\"index\">\n                <span>{{item.text}}</span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    TimeListComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: TimePickerDOMService },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return TimeListComponent;
}());

var isEqualTillMinute = function (value, min) { return value.getHours() === min.getHours() && value.getMinutes() === min.getMinutes(); };
var isEqualTillSecond = function (value, min) { return isEqualTillMinute(value, min) && value.getSeconds() === min.getSeconds(); };
var isEqualTillMillisecond = function (value, min) { return isEqualTillSecond(value, min) && value.getMilliseconds() === min.getMilliseconds(); };
var ɵ3$6 = function (value) { return value.getHours(); }, ɵ4$2 = function (_, min) { return min.getHours(); }, ɵ5$1 = function (value) { return value.getMinutes(); }, ɵ6$1 = function (value, min) { return isEqualTillMinute(value, min) ? min.getMinutes() : 0; }, ɵ7$1 = function (value) { return value.getSeconds(); }, ɵ8$1 = function (value, min) { return isEqualTillSecond(value, min) ? min.getSeconds() : 0; }, ɵ9$1 = function (value) { return value.getMilliseconds(); }, ɵ10$1 = function (value, min) { return isEqualTillMillisecond(value, min) ? min.getMilliseconds() : 0; };
var defaultGetters = [
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
var left = function (getter) { return function (origin, _) { return getter(origin); }; };
var right = function (getter) { return function (_, candidate) { return getter(candidate); }; };
var convertToObject = function (parts) { return parts.reduce(function (obj, p) { obj[p.type] = p.type; return obj; }, {}); };
var getterByPart = function (parts) { return function (g) { return parts[g.type] ? right(g.getter) : left(g.getter); }; };
var gettersFactory = function (getters) { return function (parts) { return (getters.map(getterByPart(convertToObject(parts)))); }; };
var snapValue = function (getter, minGetter, step) { return function (date, min) {
    var value = getter(date);
    var minValue = minGetter(date, min);
    var rest = value - minValue;
    if (rest < 0) {
        return minValue;
    }
    var mod = rest % step;
    return value - mod + (mod > step / 2 ? step : 0);
}; };
var snappersFactory = function (getters) { return function (steps) { return (getters.map(function (g) {
    var step = steps[g.type];
    return step ? snapValue(g.getter, g.minGetter, step) : g.getter;
})); }; };
/**
 * @hidden
 */
var generateGetters = gettersFactory(defaultGetters);
/**
 * @hidden
 */
var generateSnappers = snappersFactory(defaultGetters);
/**
 * @hidden
 */
var valueMerger = function (getters) { return function (origin, candidate) {
    origin.setHours.apply(origin, getters.map(function (g) { return g(origin, candidate); }));
    return origin;
}; };
/**
 * @hidden
 */
var snapTime = function (snappers) { return function (candidate, min) {
    var date = cloneDate(candidate);
    date.setHours.apply(date, snappers.map(function (s) { return s(date, min); }));
    return date;
}; };

var listReducer = function (state, list, idx, all) {
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
var TimeSelectorComponent = /** @class */ (function () {
    function TimeSelectorComponent(localization, cdr, element, intl, dom, zone, renderer, pickerService) {
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
    Object.defineProperty(TimeSelectorComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
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
        set: function (steps) {
            this._steps = steps || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this._current = timeInRange(this.snapTime(cloneDate(value || MIDNIGHT_DATE), this.min), this.min, this.max);
            if (!NgZone.isInAngularZone()) {
                this.cdr.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "activeListIndex", {
        get: function () {
            return this._activeListIndex;
        },
        set: function (value) {
            var _this = this;
            this._activeListIndex = value;
            if (!this.timeListWrappers || !this.timeListWrappers.length) {
                return;
            }
            this.timeListWrappers.forEach(function (listWrapper) {
                _this.renderer.removeClass(listWrapper.nativeElement, 'k-state-focused');
            });
            if (value >= 0) {
                var listIndex = this.listIndex(value);
                var focusedWrapper = this.timeListWrappers.toArray()[listIndex];
                if (focusedWrapper) {
                    this.renderer.addClass(focusedWrapper.nativeElement, 'k-state-focused');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        if (this.localization) {
            this.subscriptions.add(this.localization
                .changes
                .subscribe(function () { return _this.cdr.markForCheck(); }));
        }
        this.dom.calculateHeights(this.element.nativeElement);
        this.init();
        this.bindEvents();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.ngOnChanges = function (_) {
        this.init();
    };
    TimeSelectorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.timeSelector = null;
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
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
    TimeSelectorComponent.prototype.focus = function () {
        var list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.focus();
    };
    /**
     * Blurs the TimeSelector component.
     */
    TimeSelectorComponent.prototype.blur = function () {
        var list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.blur();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleAccept = function () {
        this.handleChange(this.mergeValue(cloneDate(this.value || getDate(getNow())), this.current));
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleNow = function () {
        this.current = getNow();
        this.handleChange(this.current);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleReject = function () {
        this.current = this.value;
        this.valueReject.emit();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleFocus = function (args) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.emitFocus(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleListFocus = function (args) {
        var index = parseInt(args.target.getAttribute('data-timelist-index'), 10);
        this.activeListIndex = index;
        this.handleFocus(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleBlur = function (args) {
        var currentTarget = currentFocusTarget(args);
        if (currentTarget && this.containsElement(currentTarget)) {
            return;
        }
        this.activeListIndex = -1;
        this.isActive = false;
        this.emitBlur(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    TimeSelectorComponent.prototype.partStep = function (part) {
        return this.steps[part.type] || 1;
    };
    TimeSelectorComponent.prototype.init = function (changes) {
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
    };
    TimeSelectorComponent.prototype.focusList = function (dir) {
        if (!this.timeLists.length) {
            return;
        }
        this.timeLists.reduce(listReducer, [])
            .map(function (state) { return dir === Direction.Right ? state.next : state.prev; })
            .map(function (list) { return list && list.focus(); });
    };
    TimeSelectorComponent.prototype.handleChange = function (value) {
        this.value = value;
        this.valueChange.emit(cloneDate(value));
    };
    TimeSelectorComponent.prototype.hasActiveButton = function () {
        var _this = this;
        if (!this.accept) {
            return false;
        }
        return [this.accept, this.cancel, this.now].reduce(function (isActive, el) { return isActive || _this.dom.isActive(el); }, false);
    };
    TimeSelectorComponent.prototype.hasSteps = function () {
        var _this = this;
        var keys = Object.keys(this.steps);
        return keys.length !== keys.reduce(function (acc, k) { return acc + _this.steps[k]; }, 0);
    };
    TimeSelectorComponent.prototype.intlChange = function () {
        this.dateFormatParts = this.intl.splitDateFormat(this.format);
        this.mergeValue = valueMerger(generateGetters(this.dateFormatParts));
        this.cdr.markForCheck();
    };
    TimeSelectorComponent.prototype.bindEvents = function () {
        var _this = this;
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.domEvents.push(_this.renderer.listen(_this.element.nativeElement, 'keydown', _this.handleKeydown.bind(_this)));
            });
        }
    };
    TimeSelectorComponent.prototype.handleKeydown = function (args) {
        var keyCode = args.keyCode, altKey = args.altKey;
        // reserve the alt + arrow key commands for the picker
        var arrowKeyPressed = [Keys.ArrowLeft, Keys.ArrowRight].indexOf(keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && altKey) {
            return;
        }
        if (keyCode === Keys.Enter && !this.hasActiveButton()) {
            this.handleAccept();
        }
        else if (keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight) {
            this.focusList(keyCode === Keys.ArrowLeft ? Direction.Left : Direction.Right);
        }
    };
    TimeSelectorComponent.prototype.emitBlur = function (args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    TimeSelectorComponent.prototype.emitFocus = function (args) {
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    };
    TimeSelectorComponent.prototype.listIndex = function (partIndex) {
        var listIdx = 0;
        var partIdx = 0;
        while (partIdx < partIndex) {
            if (this.dateFormatParts[partIdx].type !== 'literal') {
                listIdx++;
            }
            partIdx++;
        }
        return listIdx;
    };
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
                    template: "\n        <ng-container kendoTimeSelectorLocalizedMessages\n            i18n-accept=\"kendo.timeselector.accept|The Accept button text in the timeselector component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.timeselector.acceptLabel|The label for the Accept button in the timeselector component\"\n            acceptLabel=\"Set time\"\n\n            i18n-cancel=\"kendo.timeselector.cancel|The Cancel button text in the timeselector component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.timeselector.cancelLabel|The label for the Cancel button in the timeselector component\"\n            cancelLabel=\"Cancel changes\"\n\n            i18n-now=\"kendo.timeselector.now|The Now button text in the timeselector component\"\n            now=\"Now\"\n\n            i18n-nowLabel=\"kendo.timeselector.nowLabel|The label for the Now button in the timeselector component\"\n            nowLabel=\"Select now\"\n        >\n        </ng-container>\n        <div class=\"k-time-header\">\n            <span class=\"k-title\">\n                {{ intl.formatDate(current, format) }}\n            </span>\n            <button\n                #now\n                *ngIf=\"showNowButton\"\n                class=\"k-button k-bare k-time-now\" type=\"button\"\n                [attr.title]=\"localization.get('nowLabel')\"\n                [attr.aria-label]=\"localization.get('nowLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleNow,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('now')}}</button>\n        </div>\n        <div class=\"k-time-list-container\">\n            <span class=\"k-time-highlight\"></span>\n            <ng-template ngFor [ngForOf]=\"dateFormatParts\" let-part let-idx=\"index\">\n                <div\n                    #listWrapper\n                    class=\"k-time-list-wrapper\"\n                    role=\"presentation\" tabindex=\"-1\"\n                    *ngIf=\"part.type !== 'literal'\"\n                >\n                    <span class=\"k-title\">{{intl.dateFieldName(part)}}</span>\n                    <kendo-timelist\n                        [min]=\"min\"\n                        [max]=\"max\"\n                        [part]=\"part\"\n                        [step]=\"partStep(part)\"\n                        [disabled]=\"disabled\"\n                        [(value)]=\"current\"\n                        [kendoEventsOutsideAngular]=\"{\n                            focus: handleListFocus,\n                            blur: handleBlur\n                        }\"\n                        [scope]=\"this\"\n                        [attr.data-timelist-index]=\"idx\"\n                    ></kendo-timelist>\n                </div>\n                <div class=\"k-time-separator\" *ngIf=\"part.type === 'literal'\">\n                    {{part.pattern}}\n                </div>\n            </ng-template>\n        </div>\n        <div class=\"k-time-footer k-action-buttons\" *ngIf=\"setButton || cancelButton\">\n            <button\n                #cancel\n                *ngIf=\"cancelButton\"\n                class=\"k-button k-time-cancel\" type=\"button\"\n                [attr.title]=\"localization.get('cancelLabel')\"\n                [attr.aria-label]=\"localization.get('cancelLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleReject,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('cancel')}}</button>\n            <button\n                #accept\n                *ngIf=\"setButton\"\n                type=\"button\"\n                class=\"k-time-accept k-button k-primary\"\n                [attr.title]=\"localization.get('acceptLabel')\"\n                [attr.aria-label]=\"localization.get('acceptLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleAccept,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('accept')}}</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TimeSelectorComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: IntlService },
        { type: TimePickerDOMService },
        { type: NgZone },
        { type: Renderer2 },
        { type: PickerService, decorators: [{ type: Optional }] }
    ]; };
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
    return TimeSelectorComponent;
}());

/**
 * @hidden
 */
var TimePickerMessages = /** @class */ (function (_super) {
    __extends(TimePickerMessages, _super);
    function TimePickerMessages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return TimePickerMessages;
}(ComponentMessages));

/**
 * @hidden
 */
var TimePickerLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(TimePickerLocalizedMessagesDirective, _super);
    function TimePickerLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    TimePickerLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: TimePickerMessages,
                            useExisting: forwardRef(function () { return TimePickerLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoTimePickerLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    TimePickerLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimePickerLocalizedMessagesDirective;
}(TimePickerMessages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var TimePickerCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(TimePickerCustomMessagesComponent, _super);
    function TimePickerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(TimePickerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TimePickerCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: TimePickerMessages,
                            useExisting: forwardRef(function () { return TimePickerCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-timepicker-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    TimePickerCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimePickerCustomMessagesComponent;
}(TimePickerMessages));

/**
 * @hidden
 */
var TimeSelectorLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(TimeSelectorLocalizedMessagesDirective, _super);
    function TimeSelectorLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    TimeSelectorLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: TimePickerMessages,
                            useExisting: forwardRef(function () { return TimeSelectorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoTimeSelectorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    TimeSelectorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimeSelectorLocalizedMessagesDirective;
}(TimePickerMessages));

/**
 * @hidden
 *
 * Custom component messages override default component messages.
 */
var TimeSelectorCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(TimeSelectorCustomMessagesComponent, _super);
    function TimeSelectorCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(TimeSelectorCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TimeSelectorCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: TimePickerMessages,
                            useExisting: forwardRef(function () { return TimeSelectorCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-timeselector-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    TimeSelectorCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimeSelectorCustomMessagesComponent;
}(TimePickerMessages));

var COMPONENT_DIRECTIVES$2 = [
    TimePickerLocalizedMessagesDirective,
    TimeListComponent,
    TimePickerCustomMessagesComponent,
    TimePickerComponent,
    TimeSelectorLocalizedMessagesDirective,
    TimeSelectorCustomMessagesComponent,
    TimeSelectorComponent
];
var COMPONENT_MODULES$1 = [
    DateInputModule,
    IntlModule,
    PopupModule,
    VirtualizationModule,
    EventsModule
];
var ɵ0$n = touchEnabled;
var providers = [
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
var TimePickerModule = /** @class */ (function () {
    function TimePickerModule() {
    }
    TimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES$2],
                    exports: [COMPONENT_DIRECTIVES$2],
                    imports: [CommonModule].concat(COMPONENT_MODULES$1),
                    providers: providers
                },] },
    ];
    return TimePickerModule;
}());

/**
 * @hidden
 */
var Messages$1 = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
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
    return Messages;
}(ComponentMessages));

/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var DateTimePickerCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(DateTimePickerCustomMessagesComponent, _super);
    function DateTimePickerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(DateTimePickerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages$1,
                            useExisting: forwardRef(function () { return DateTimePickerCustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-datetimepicker-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    DateTimePickerCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DateTimePickerCustomMessagesComponent;
}(Messages$1));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages$1,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: '[kendoDateTimePickerLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages$1));

var COMPONENT_DIRECTIVES$3 = [
    DateTimePickerComponent,
    DateTimePickerCustomMessagesComponent,
    LocalizedMessagesDirective
];
var ɵ0$o = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateTimePicker component.
 */
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES$3.slice(),
                    exports: COMPONENT_DIRECTIVES$3.concat([
                        TemplatesModule
                    ]),
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
    return DateTimePickerModule;
}());

var COMPONENT_MODULES$2 = [
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
var DateInputsModule = /** @class */ (function () {
    function DateInputsModule() {
    }
    DateInputsModule.decorators = [
        { type: NgModule, args: [{
                    exports: COMPONENT_MODULES$2,
                    imports: COMPONENT_MODULES$2
                },] },
    ];
    return DateInputsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarCommonModule, CALENDAR_RANGE_VALIDATORS, CALENDAR_VALUE_ACCESSOR, KENDO_INPUT_PROVIDER, KForOf, KForOfContext, HeaderComponent, HorizontalViewListComponent, CalendarMessages, MultiViewCalendarCustomMessagesComponent, Messages, RANGE_CALENDAR_RANGE_VALIDATORS, RANGE_CALENDAR_VALUE_ACCESSOR, NavigationComponent, BusViewService, CenturyViewService, DecadeViewService, DisabledDatesService, CalendarDOMService, MonthViewService, NavigationService, ScrollSyncService, WeekNamesService, YearViewService, TemplatesModule, CellTemplateDirective, CenturyCellTemplateDirective, DecadeCellTemplateDirective, HeaderTitleTemplateDirective, MonthCellTemplateDirective, NavigationItemTemplateDirective, WeekNumberCellTemplateDirective, YearCellTemplateDirective, ViewListComponent, ViewComponent, PickerService, DateInputMessages, DatePickerMessages, DateRangeInput, DateRangePopupTemplateDirective, DateTimePickerCustomMessagesComponent, LocalizedMessagesDirective, Messages$1, TimePickerMessages, TimePickerCustomMessagesComponent, TimeSelectorCustomMessagesComponent, DayPeriodService, TimePickerDOMService, HoursService, MinutesService, SecondsService, TimeListComponent, TimeSelectorComponent, TOUCH_ENABLED, ScrollerService, DEFAULT_SCROLLER_FACTORY, SCROLLER_FACTORY_TOKEN, VirtualizationComponent, VirtualizationModule, CalendarComponent, DateInputComponent, DatePickerComponent, TimePickerComponent, DateTimePickerComponent, MultiViewCalendarComponent, DateRangeComponent, DateRangePopupComponent, DateRangeEndInputDirective, DateRangeStartInputDirective, DateRangeSelectionDirective, CalendarModule, CalendarsModule, DateInputModule, DatePickerModule, DateInputsModule, TimePickerModule, DateTimePickerModule, MultiViewCalendarModule, DateRangeModule, DateRangeService, CalendarCustomMessagesComponent, DateInputCustomMessagesComponent, DatePickerCustomMessagesComponent, PreventableEvent, CalendarLocalizedMessagesDirective, MultiViewCalendarLocalizedMessagesDirective, DateInputLocalizedMessagesDirective, DatePickerLocalizedMessagesDirective, TimePickerLocalizedMessagesDirective, TimeSelectorLocalizedMessagesDirective };
