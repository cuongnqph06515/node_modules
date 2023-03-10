/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-bitwise max-line-length */
import { addDays, cloneDate, getDate, isEqual } from '@progress/kendo-date-math';
import { MIDNIGHT_DATE } from './defaults';
import { EMPTY_SELECTIONRANGE } from './calendar/models/selection-range.interface';
var isSet = function (value) { return value !== null && value !== undefined; };
var ɵ0 = isSet;
var setter = function (method) { return function (date, value) {
    var clone = cloneDate(date);
    clone[method](value);
    return clone;
}; };
var ɵ1 = setter;
/**
 * @hidden
 */
export var setTime = function (origin, candidate) {
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
var ɵ2 = normalizeTimes;
/**
 * @hidden
 */
export var setHours = setter('setHours');
/**
 * @hidden
 */
export var setMinutes = setter('setMinutes');
/**
 * @hidden
 */
export var setSeconds = setter('setSeconds');
/**
 * @hidden
 */
export var range = function (start, end, step) {
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
export var isInRange = function (candidate, min, max) { return (!candidate || !((min && min > candidate) || (max && max < candidate))); };
/**
 * @hidden
 */
export var isInTimeRange = function (candidate, min, max) {
    if (!candidate || !min || !max) {
        return true;
    }
    var _a = normalizeTimes(candidate, min, max), candidateValue = _a.candidateValue, minValue = _a.minValue, maxValue = _a.maxValue;
    return minValue <= candidateValue && candidateValue <= maxValue;
};
/**
 * @hidden
 */
export var isValidRange = function (min, max) { return (!isSet(min) || !isSet(max) || min <= max); };
/**
 * @hidden
 */
export var dateInRange = function (candidate, min, max) {
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
export var timeInRange = function (candidate, min, max) {
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
export var getNow = function () { return new Date(); };
/**
 * @hidden
 */
export var getToday = function () { return getDate(new Date()); };
/**
 * @hidden
 */
export var noop = function (_) { }; // tslint:disable-line:no-empty
/**
 * @hidden
 */
export var isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
export var stringifyClassObject = function (classes) {
    var pushToAcc = function (acc, cls) { return classes[cls] ? acc.concat(cls) : acc; };
    return Object.keys(classes).reduce(pushToAcc, []).join(' ');
};
/**
 * @hidden
 */
export var shiftWeekNames = function (names, offset) { return (names.slice(offset).concat(names.slice(0, offset))); };
/**
 * @hidden
 */
export var approximateStringMatching = function (oldTextOrigin, oldFormat, newTextOrigin, caret) {
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
export var domContainerFactory = function (type) { return function (children, classes, styles) {
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
export var hasChange = function (changes, field) { return changes[field] !== undefined; };
/**
 * @hidden
 */
export var hasExistingValue = function (changes, field) { return changes[field] && changes[field].currentValue !== undefined && changes[field].currentValue !== null; };
/**
 * @hidden
 */
export var last = function (list) {
    if (list === void 0) { list = []; }
    return list[list.length - 1];
};
/**
 * @hidden
 */
export var isInSelectionRange = function (value, selectionRange) {
    var _a = selectionRange || EMPTY_SELECTIONRANGE, start = _a.start, end = _a.end;
    if (!start || !end) {
        return false;
    }
    return start < value && value < end;
};
/**
 * @hidden
 */
export var either = function (value1, value2) { return value1 || value2; };
/**
 * @hidden
 */
export var clampRange = function (value) { return ({ start: value, end: value }); };
/**
 * @hidden
 */
export var isEqualRange = function (initial, updated) {
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
export var mergeDateAndTime = function (date, time) {
    if (!(date && time)) {
        return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};
/**
 * @hidden
 */
export var lastMillisecondOfDate = function (date) {
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
export var disabledDatesInRange = function (start, end, isDateDisabled) {
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
export { ɵ0, ɵ1, ɵ2 };
