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
export const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isBlank = (value) => value === null || value === undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isArray = (value) => Array.isArray(value);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isTruthy = (value) => !!value;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isNullOrEmptyString = (value) => isBlank(value) || (value.trim && value.trim().length === 0);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isNumber = (value) => typeof value === "number" && !isNaN(value);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isString = (value) => typeof value === 'string';
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export const isObject = (value) => typeof value === 'object';
/**
 * @hidden
 */
export const isRecurring = (event, fields) => {
    const recurrenceId = getter(fields.recurrenceId)(event);
    const recurrenceRule = getter(fields.recurrenceRule)(event);
    return !!(recurrenceRule || recurrenceId);
};
/**
 * @hidden
 */
export const isException = (event, fields) => {
    const id = getter(fields.id)(event);
    const recurrenceId = getter(fields.recurrenceId)(event);
    return isPresent(id) && id !== OCCURRENCE_ID && isPresent(recurrenceId);
};
/**
 * @hidden
 */
export const copyResources = (event, resources) => {
    if (resources) {
        for (let idx = 0; idx < resources.length; idx++) {
            assignField(event, event.dataItem, resources[idx].field);
        }
    }
};
/**
 * @hidden
 */
export const readEvent = (dataItem, fields, resources) => {
    const result = {
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
        dataItem
    };
    copyResources(result, resources);
    return result;
};
/**
 * @hidden
 */
export const isRecurrenceMaster = (event) => event.recurrenceRule && !isPresent(event.recurrenceId);
/**
 * @hidden
 */
export function groupResources(group, resources) {
    const result = [];
    if (group && group.resources && group.resources.length) {
        const groups = group.resources;
        for (let idx = 0; idx < groups.length; idx++) {
            const resource = resources.find(r => r.name === groups[idx]);
            result.push(resource);
        }
    }
    return result;
}
/**
 * @hidden
 */
export const getField = (obj, field) => getter(field)(obj);
/**
 * @hidden
 */
export const setField = (obj, field, value) => setter(field)(obj, value);
/**
 * @hidden
 */
export function assignField(target, source, field) {
    setField(target, field, getField(source, field));
}
/**
 * @hidden
 */
export function assignFields(target, source, ...fields) {
    for (let idx = 0; idx < fields.length; idx++) {
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
    for (let field in obj) {
        if (obj.hasOwnProperty(field)) {
            const value = obj[field];
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
    const result = {};
    cloneTo(obj, result);
    return result;
}
/** @hidden */
export const iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    const keys = Object.getOwnPropertyNames(Map.prototype);
    const proto = Map.prototype;
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
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
    const DBLCLICK_DELAY = 250;
    const clicks = fromClick(element);
    const endSequence = clicks.pipe(auditTime(DBLCLICK_DELAY));
    return clicks.pipe(buffer(endSequence), filter(sequence => sequence.length === 2), filter((sequence) => sequence[1].target === sequence[0].target), map(sequence => sequence[1]));
}
/**
 * @hidden
 */
export function sortTasksByTime(tasks) {
    tasks.sort((a, b) => (a.startTime - b.startTime) || (b.endTime - a.endTime));
    return tasks;
}
