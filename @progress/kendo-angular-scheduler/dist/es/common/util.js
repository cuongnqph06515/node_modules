import { fromEvent } from 'rxjs';
import { auditTime, buffer, filter, map } from 'rxjs/operators';
import { getter } from './getter';
import { setter } from './setter';
import { OCCURRENCE_ID } from './constants';
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var capitalize = function (value) { return value.charAt(0).toUpperCase() + value.slice(1); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isTruthy = function (value) { return !!value; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isNullOrEmptyString = function (value) { return isBlank(value) || (value.trim && value.trim().length === 0); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isNumber = function (value) { return typeof value === "number" && !isNaN(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isString = function (value) { return typeof value === 'string'; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export var isObject = function (value) { return typeof value === 'object'; };
/**
 * @hidden
 */
export var isRecurring = function (event, fields) {
    var recurrenceId = getter(fields.recurrenceId)(event);
    var recurrenceRule = getter(fields.recurrenceRule)(event);
    return !!(recurrenceRule || recurrenceId);
};
/**
 * @hidden
 */
export var isException = function (event, fields) {
    var id = getter(fields.id)(event);
    var recurrenceId = getter(fields.recurrenceId)(event);
    return isPresent(id) && id !== OCCURRENCE_ID && isPresent(recurrenceId);
};
/**
 * @hidden
 */
export var copyResources = function (event, resources) {
    if (resources) {
        for (var idx = 0; idx < resources.length; idx++) {
            assignField(event, event.dataItem, resources[idx].field);
        }
    }
};
/**
 * @hidden
 */
export var readEvent = function (dataItem, fields, resources) {
    var result = {
        id: getter(fields.id)(dataItem),
        start: getter(fields.start)(dataItem),
        startTimezone: getter(fields.startTimezone)(dataItem),
        end: getter(fields.end)(dataItem),
        endTimezone: getter(fields.endTimezone)(dataItem),
        isAllDay: getter(fields.isAllDay)(dataItem),
        title: getter(fields.title)(dataItem),
        description: getter(fields.description)(dataItem),
        recurrenceRule: getter(fields.recurrenceRule)(dataItem),
        recurrenceExceptions: getter(fields.recurrenceExceptions)(dataItem),
        recurrenceId: getter(fields.recurrenceId)(dataItem),
        dataItem: dataItem
    };
    copyResources(result, resources);
    return result;
};
/**
 * @hidden
 */
export var isRecurrenceMaster = function (event) {
    return event.recurrenceRule && !isPresent(event.recurrenceId);
};
/**
 * @hidden
 */
export function groupResources(group, resources) {
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
/**
 * @hidden
 */
export var getField = function (obj, field) { return getter(field)(obj); };
/**
 * @hidden
 */
export var setField = function (obj, field, value) { return setter(field)(obj, value); };
/**
 * @hidden
 */
export function assignField(target, source, field) {
    setField(target, field, getField(source, field));
}
/**
 * @hidden
 */
export function assignFields(target, source) {
    var fields = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        fields[_i - 2] = arguments[_i];
    }
    for (var idx = 0; idx < fields.length; idx++) {
        assignField(target, source, fields[idx]);
    }
}
/**
 * @hidden
 */
export function assignValues(target, source) {
    cloneTo(source, target);
    return target;
}
/**
 * @hidden
 */
export function cloneTo(obj, result) {
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
/**
 * @hidden
 */
export function clone(obj) {
    var result = {};
    cloneTo(obj, result);
    return result;
}
/** @hidden */
export var iterator = getIterator();
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
export function fromClick(element) {
    return fromEvent(element, 'click');
}
/**
 * @hidden
 */
export function fromDoubleClick(element) {
    var DBLCLICK_DELAY = 250;
    var clicks = fromClick(element);
    var endSequence = clicks.pipe(auditTime(DBLCLICK_DELAY));
    return clicks.pipe(buffer(endSequence), filter(function (sequence) { return sequence.length === 2; }), filter(function (sequence) { return sequence[1].target === sequence[0].target; }), map(function (sequence) { return sequence[1]; }));
}
/**
 * @hidden
 */
export function sortTasksByTime(tasks) {
    tasks.sort(function (a, b) { return (a.startTime - b.startTime) || (b.endTime - a.endTime); });
    return tasks;
}
