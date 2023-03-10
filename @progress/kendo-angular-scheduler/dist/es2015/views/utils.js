import { formatDate } from '@progress/kendo-angular-intl';
import { isPresent, getField, isArray, isObject, isString } from '../common/util';
import { hasClasses } from '../common/dom-queries';
/** @hidden */
export const intersects = (startTime, endTime, periodStart, periodEnd) => (startTime < periodStart && endTime > periodEnd) ||
    (periodStart <= startTime && startTime < periodEnd) ||
    (periodStart < endTime && endTime <= periodEnd && startTime < endTime);
/** @hidden */
export const dateInRange = (date, start, end) => start.getTime() <= date.getTime() && date.getTime() <= end.getTime();
/** @hidden */
export const roundAllDayEnd = ({ start, end }) => {
    const startDate = start.stripTime();
    const endDate = end.stripTime();
    return endDate.getTime() !== end.getTime() || startDate.getTime() === endDate.getTime() ? endDate.addDays(1) : endDate;
};
/** @hidden */
export function toInvariantTime(date) {
    var staticDate = new Date(1980, 0, 1, 0, 0, 0);
    if (date) {
        staticDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    return staticDate;
}
/**
 * @hidden
 * TODO Move to date-math
 */
export const addUTCDays = (date, offset) => {
    const newDate = new Date(date.getTime());
    newDate.setUTCDate(newDate.getUTCDate() + offset);
    return newDate;
};
/**
 * @hidden
 */
export function timeOnDate(date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds, ms);
}
// TODO: name? move to date-math
/** @hidden */
export function toUTCTime(localDate, localTime) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localTime.getHours(), localTime.getMinutes(), localTime.getSeconds(), localTime.getMilliseconds()));
}
//  TODO: move to date-math
/** @hidden */
export function toUTCDate(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
}
// TODO: move to date-math
/** @hidden */
export function getUTCDate(utcDate) {
    return new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate()));
}
// TODO: move to date-math
/** @hidden */
export function toUTCDateTime(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
}
/** @hidden */
export function dateWithTime(target, time) {
    return new Date(target.getFullYear(), target.getMonth(), target.getDate(), time.getHours(), time.getMinutes());
}
function getDataIdx(value, resource) {
    const data = resource.data;
    for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
        if (getField(data[dataIdx], resource.valueField) === value) {
            return dataIdx;
        }
    }
    return -1;
}
function resourceItem(value, resource) {
    const index = getDataIdx(value, resource);
    return index >= 0 ? resource.data[index] : {};
}
function resourceItems(values, resource) {
    return values.map(value => resourceItem(value, resource));
}
function cloneResources(arr) {
    const result = [];
    for (let idx = 0; idx < arr.length; idx++) {
        const clone = Object.assign({}, arr[idx]);
        clone.resources = clone.resources.slice(0);
        result.push(clone);
    }
    return result;
}
/** @hidden */
export function resourceItemByValue(event, resource) {
    const value = getField(event, resource.field);
    if (Array.isArray(value)) {
        return resourceItems(value, resource);
    }
    return resourceItem(value, resource);
}
function addNotGroupedResources(event, resources, allResources) {
    for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
        const current = resources[resourceIdx];
        for (let idx = 0; idx < allResources.length; idx++) {
            const item = allResources[idx];
            if (!current.resources[idx] && item.data) {
                current.resources[idx] = resourceItemByValue(event, item);
            }
        }
    }
}
/** @hidden */
export function eventResources(event, { taskResources, hasGroups, spans, allResources = [] }) {
    let resources = [];
    for (let resourceIdx = 0; resourceIdx < taskResources.length; resourceIdx++) {
        const resource = taskResources[resourceIdx];
        if (!resource.data) {
            resources = [{ leafIdx: 0, resources: [] }];
            continue;
        }
        const resourceIndex = allResources.indexOf(resource);
        let values = getField(event, resource.field);
        if (!Array.isArray(values)) {
            values = [values];
        }
        const expandedResources = [];
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            const dataIdx = getDataIdx(values[valueIdx], resource);
            if (dataIdx < 0) {
                return [{ leafIdx: hasGroups ? -1 : 0, resources: [] }];
            }
            const item = resource.data[dataIdx];
            // has groups - need all copies of the multiple resource
            // no groups - just the first
            if (resourceIdx === 0 && (hasGroups || valueIdx === 0)) {
                const resourceItems = [];
                resourceItems[resourceIndex] = resource.multiple && !hasGroups ? [item] : item;
                resources.push({
                    leafIdx: hasGroups ? dataIdx * spans[resourceIdx] : 0,
                    color: getField(item, resource.colorField),
                    resources: resourceItems
                });
            }
            else if (hasGroups) { // don't create multiple resource groups if no groups for multiple resources
                let currentResources = resources;
                if (values.length > 1) {
                    currentResources = cloneResources(resources);
                    expandedResources.push.apply(expandedResources, currentResources);
                }
                for (let currentIdx = 0; currentIdx < currentResources.length; currentIdx++) {
                    currentResources[currentIdx].leafIdx += dataIdx * spans[resourceIdx];
                    currentResources[currentIdx].resources[resourceIndex] = item;
                }
            }
            else if (valueIdx > 0) {
                for (let idx = 0; idx < resources.length; idx++) {
                    resources[idx].resources[resourceIndex].push(item);
                }
            }
        }
        if (expandedResources.length) {
            resources = expandedResources;
        }
    }
    addNotGroupedResources(event, resources, allResources);
    return resources;
}
/** @hidden */
export function assignTasksResources(tasks, options) {
    for (let idx = 0; idx < tasks.length; idx++) {
        const task = tasks[idx];
        task.resources = eventResources(task.event, options);
    }
}
/** @hidden */
export function findRowIndex(events, data) {
    if (data.rowIndex !== undefined) {
        return data.rowIndex;
    }
    for (let idx = 0; idx < events.length; idx++) {
        if (!events[idx]) {
            return idx;
        }
    }
    return events.length;
}
/** @hidden */
export function isRecurrence(task) {
    return Boolean(task.event && task.event.recurrenceRule);
}
/** @hidden */
export function isRecurrenceException(task) {
    return task.event && isPresent(task.event.recurrenceId) && !task.event.recurrenceRule;
}
/** @hidden */
export const rectContains = (rect, left, top) => rect.left <= left && left <= rect.left + rect.width && rect.top <= top && top <= rect.top + rect.height;
/** @hidden */
export const rectContainsX = (rect, left) => rect.left <= left && left <= rect.left + rect.width;
/** @hidden */
export const toPx = value => `${value}px`;
/** @hidden */
export const elementOffset = (element) => {
    if (!element) {
        return null;
    }
    const box = element.getBoundingClientRect();
    const documentElement = document.documentElement;
    return {
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        width: box.width,
        height: box.height
    };
};
/** @hidden */
export const pointDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
/** @hidden */
export const ignoreContentChild = child => child.nodeName === 'KENDO-RESIZE-SENSOR' || hasClasses(child, 'k-loading-mask');
/** @hidden */
export const setCoordinates = (element, coordinates) => {
    for (let field in coordinates) {
        if (coordinates.hasOwnProperty(field)) {
            element.style[field] = toPx(coordinates[field]);
        }
    }
};
/** @hidden */
export const convertNgClassBindings = (bindingValues) => {
    const result = [];
    if (isString(bindingValues)) {
        result.push(bindingValues);
    }
    else if (isArray(bindingValues)) {
        result.push.apply(result, bindingValues);
    }
    else if (isObject(bindingValues)) {
        for (let field in bindingValues) {
            if (bindingValues.hasOwnProperty(field) && bindingValues[field]) {
                result.push(field);
            }
        }
    }
    return result;
};
/**
 * @hidden
 */
export function formatEventTime(start, end, isAllDay) {
    const startTimeFormat = { skeleton: 'yMMMMEEEEdhm' };
    const startDateFormat = { skeleton: 'yMMMMEEEEd' };
    const endFormat = 't';
    return isAllDay ?
        `${formatDate(start, startDateFormat)}` :
        `${formatDate(start, startTimeFormat)}???${formatDate(end, endFormat)}`;
}
/**
 * @hidden
 */
export function formValueOrDefault(group, field, defaultValue) {
    const control = group.get(field);
    if (!control) {
        return defaultValue;
    }
    return control.value || defaultValue;
}
/**
 * @hidden
 */
export const isWorkWeekDay = (day, start, end) => {
    if (end < start) {
        return day <= end || start <= day;
    }
    return start <= day && day <= end;
};
