/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_date_math_1 = require("@progress/kendo-date-math");
var defaults_1 = require("./defaults");
var selection_range_interface_1 = require("./calendar/models/selection-range.interface");
var isSet = function (value) { return value !== null && value !== undefined; };
var ɵ0 = isSet;
exports.ɵ0 = ɵ0;
var setter = function (method) { return function (date, value) {
    var clone = kendo_date_math_1.cloneDate(date);
    clone[method](value);
    return clone;
}; };
var ɵ1 = setter;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
exports.setTime = function (origin, candidate) {
    var date = kendo_date_math_1.cloneDate(origin);
    date.setHours(candidate.getHours(), candidate.getMinutes(), candidate.getSeconds(), candidate.getMilliseconds());
    return date;
};
var normalizeTimes = function (candidate, min, max) { return ({
    candidateValue: exports.setTime(defaults_1.MIDNIGHT_DATE, candidate),
    maxValue: kendo_date_math_1.addDays(exports.setTime(defaults_1.MIDNIGHT_DATE, max), min.getHours() < max.getHours() ||
        (min.getHours() === max.getHours() && min.getMinutes() < max.getMinutes()) ? 0 : 1),
    minValue: exports.setTime(defaults_1.MIDNIGHT_DATE, min)
}); };
var ɵ2 = normalizeTimes;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
exports.setHours = setter('setHours');
/**
 * @hidden
 */
exports.setMinutes = setter('setMinutes');
/**
 * @hidden
 */
exports.setSeconds = setter('setSeconds');
/**
 * @hidden
 */
exports.range = function (start, end, step) {
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
exports.isInRange = function (candidate, min, max) { return (!candidate || !((min && min > candidate) || (max && max < candidate))); };
/**
 * @hidden
 */
exports.isInTimeRange = function (candidate, min, max) {
    if (!candidate || !min || !max) {
        return true;
    }
    var _a = normalizeTimes(candidate, min, max), candidateValue = _a.candidateValue, minValue = _a.minValue, maxValue = _a.maxValue;
    return minValue <= candidateValue && candidateValue <= maxValue;
};
/**
 * @hidden
 */
exports.isValidRange = function (min, max) { return (!isSet(min) || !isSet(max) || min <= max); };
/**
 * @hidden
 */
exports.dateInRange = function (candidate, min, max) {
    if (!candidate) {
        return candidate;
    }
    if (min && candidate < min) {
        return kendo_date_math_1.cloneDate(min);
    }
    if (max && candidate > max) {
        return kendo_date_math_1.cloneDate(max);
    }
    return candidate;
};
/**
 * @hidden
 */
exports.timeInRange = function (candidate, min, max) {
    if (!candidate || !min || !max) {
        return candidate;
    }
    var _a = normalizeTimes(candidate, min, max), candidateValue = _a.candidateValue, minValue = _a.minValue, maxValue = _a.maxValue;
    if (candidateValue < minValue) {
        return exports.setTime(candidate, min);
    }
    if (candidateValue > maxValue) {
        return exports.setTime(candidate, max);
    }
    return candidate;
};
/**
 * @hidden
 */
exports.getNow = function () { return new Date(); };
/**
 * @hidden
 */
exports.getToday = function () { return kendo_date_math_1.getDate(new Date()); };
/**
 * @hidden
 */
exports.noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
exports.isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
exports.stringifyClassObject = function (classes) {
    var pushToAcc = function (acc, cls) { return classes[cls] ? acc.concat(cls) : acc; };
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
exports.shiftWeekNames = function (names, offset) { return (names.slice(offset).concat(names.slice(0, offset))); };
/**
 * @hidden
 */
exports.approximateStringMatching = function (oldTextOrigin, oldFormat, newTextOrigin, caret) {
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
exports.domContainerFactory = function (type) { return function (children, classes, styles) {
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
exports.hasChange = function (changes, field) { return changes[field] !== undefined; };
/**
 * @hidden
 */
exports.hasExistingValue = function (changes, field) { return changes[field] && changes[field].currentValue !== undefined && changes[field].currentValue !== null; };
/**
 * @hidden
 */
exports.last = function (list) {
    if (list === void 0) { list = []; }
    return list[list.length - 1];
};
/**
 * @hidden
 */
exports.isInSelectionRange = function (value, selectionRange) {
    var _a = selectionRange || selection_range_interface_1.EMPTY_SELECTIONRANGE, start = _a.start, end = _a.end;
    if (!start || !end) {
        return false;
    }
    return start < value && value < end;
};
/**
 * @hidden
 */
exports.either = function (value1, value2) { return value1 || value2; };
/**
 * @hidden
 */
exports.clampRange = function (value) { return ({ start: value, end: value }); };
/**
 * @hidden
 */
exports.isEqualRange = function (initial, updated) {
    var _a = initial || selection_range_interface_1.EMPTY_SELECTIONRANGE, initialStart = _a.start, initialEnd = _a.end;
    var _b = updated || selection_range_interface_1.EMPTY_SELECTIONRANGE, updatedStart = _b.start, updatedEnd = _b.end;
    return kendo_date_math_1.isEqual(initialStart, updatedStart) && kendo_date_math_1.isEqual(initialEnd, updatedEnd);
};
/**
 * @hidden
 *
 * Creates a new date based on the date information from the specified date portion
 * and the time information from the time portion.
 * If a parameter is not provided, returns `null`.
 */
exports.mergeDateAndTime = function (date, time) {
    if (!(date && time)) {
        return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};
/**
 * @hidden
 */
exports.lastMillisecondOfDate = function (date) {
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
exports.disabledDatesInRange = function (start, end, isDateDisabled) {
    if (!(start && end && isDateDisabled) || (start > end)) {
        return [];
    }
    var dates = [];
    var current = start;
    while (current <= end) {
        if (isDateDisabled(current)) {
            dates.push(current);
        }
        current = kendo_date_math_1.addDays(current, 1);
    }
    return dates;
};
