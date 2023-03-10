"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var getter_1 = require("./getter");
var setter_1 = require("./setter");
var constants_1 = require("./constants");
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.capitalize = function (value) { return value.charAt(0).toUpperCase() + value.slice(1); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isTruthy = function (value) { return !!value; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isNullOrEmptyString = function (value) { return exports.isBlank(value) || (value.trim && value.trim().length === 0); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isNumber = function (value) { return typeof value === "number" && !isNaN(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isString = function (value) { return typeof value === 'string'; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
exports.isObject = function (value) { return typeof value === 'object'; };
/**
 * @hidden
 */
exports.isRecurring = function (event, fields) {
    var recurrenceId = getter_1.getter(fields.recurrenceId)(event);
    var recurrenceRule = getter_1.getter(fields.recurrenceRule)(event);
    return !!(recurrenceRule || recurrenceId);
};
/**
 * @hidden
 */
exports.isException = function (event, fields) {
    var id = getter_1.getter(fields.id)(event);
    var recurrenceId = getter_1.getter(fields.recurrenceId)(event);
    return exports.isPresent(id) && id !== constants_1.OCCURRENCE_ID && exports.isPresent(recurrenceId);
};
/**
 * @hidden
 */
exports.copyResources = function (event, resources) {
    if (resources) {
        for (var idx = 0; idx < resources.length; idx++) {
            assignField(event, event.dataItem, resources[idx].field);
        }
    }
};
/**
 * @hidden
 */
exports.readEvent = function (dataItem, fields, resources) {
    var result = {
        id: getter_1.getter(fields.id)(dataItem),
        start: getter_1.getter(fields.start)(dataItem),
        startTimezone: getter_1.getter(fields.startTimezone)(dataItem),
        end: getter_1.getter(fields.end)(dataItem),
        endTimezone: getter_1.getter(fields.endTimezone)(dataItem),
        isAllDay: getter_1.getter(fields.isAllDay)(dataItem),
        title: getter_1.getter(fields.title)(dataItem),
        description: getter_1.getter(fields.description)(dataItem),
        recurrenceRule: getter_1.getter(fields.recurrenceRule)(dataItem),
        recurrenceExceptions: getter_1.getter(fields.recurrenceExceptions)(dataItem),
        recurrenceId: getter_1.getter(fields.recurrenceId)(dataItem),
        dataItem: dataItem
    };
    exports.copyResources(result, resources);
    return result;
};
/**
 * @hidden
 */
exports.isRecurrenceMaster = function (event) {
    return event.recurrenceRule && !exports.isPresent(event.recurrenceId);
};
/**
 * @hidden
 */
function groupResources(group, resources) {
    var result = [];
    if (group && group.resources && group.resources.length) {
        var groups_1 = group.resources;
        var _loop_1 = function (idx) {
            var resource = resources.find(function (r) { return r.name === groups_1[idx]; });
            result.push(resource);
        };
        for (var idx = 0; idx < groups_1.length; idx++) {
            _loop_1(idx);
        }
    }
    return result;
}
exports.groupResources = groupResources;
/**
 * @hidden
 */
exports.getField = function (obj, field) { return getter_1.getter(field)(obj); };
/**
 * @hidden
 */
exports.setField = function (obj, field, value) { return setter_1.setter(field)(obj, value); };
/**
 * @hidden
 */
function assignField(target, source, field) {
    exports.setField(target, field, exports.getField(source, field));
}
exports.assignField = assignField;
/**
 * @hidden
 */
function assignFields(target, source) {
    var fields = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        fields[_i - 2] = arguments[_i];
    }
    for (var idx = 0; idx < fields.length; idx++) {
        assignField(target, source, fields[idx]);
    }
}
exports.assignFields = assignFields;
/**
 * @hidden
 */
function assignValues(target, source) {
    cloneTo(source, target);
    return target;
}
exports.assignValues = assignValues;
/**
 * @hidden
 */
function cloneTo(obj, result) {
    for (var field in obj) {
        if (obj.hasOwnProperty(field)) {
            var value = obj[field];
            if (Array.isArray(value)) {
                result[field] = value.slice(0);
            }
            else if (value && typeof value === 'object' && !(value instanceof Date)) {
                result[field] = result[field] || {};
                cloneTo(value, result[field]);
            }
            else {
                result[field] = value;
            }
        }
    }
}
exports.cloneTo = cloneTo;
/**
 * @hidden
 */
function clone(obj) {
    var result = {};
    cloneTo(obj, result);
    return result;
}
exports.clone = clone;
/** @hidden */
exports.iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
/**
 * @hidden
 */
function fromClick(element) {
    return rxjs_1.fromEvent(element, 'click');
}
exports.fromClick = fromClick;
/**
 * @hidden
 */
function fromDoubleClick(element) {
    var DBLCLICK_DELAY = 250;
    var clicks = fromClick(element);
    var endSequence = clicks.pipe(operators_1.auditTime(DBLCLICK_DELAY));
    return clicks.pipe(operators_1.buffer(endSequence), operators_1.filter(function (sequence) { return sequence.length === 2; }), operators_1.filter(function (sequence) { return sequence[1].target === sequence[0].target; }), operators_1.map(function (sequence) { return sequence[1]; }));
}
exports.fromDoubleClick = fromDoubleClick;
/**
 * @hidden
 */
function sortTasksByTime(tasks) {
    tasks.sort(function (a, b) { return (a.startTime - b.startTime) || (b.endTime - a.endTime); });
    return tasks;
}
exports.sortTasksByTime = sortTasksByTime;
