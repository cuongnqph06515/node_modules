"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var util_1 = require("../common/util");
var dom_queries_1 = require("../common/dom-queries");
/** @hidden */
exports.intersects = function (startTime, endTime, periodStart, periodEnd) {
    return (startTime < periodStart && endTime > periodEnd) ||
        (periodStart <= startTime && startTime < periodEnd) ||
        (periodStart < endTime && endTime <= periodEnd && startTime < endTime);
};
/** @hidden */
exports.dateInRange = function (date, start, end) { return start.getTime() <= date.getTime() && date.getTime() <= end.getTime(); };
/** @hidden */
exports.roundAllDayEnd = function (_a) {
    var start = _a.start, end = _a.end;
    var startDate = start.stripTime();
    var endDate = end.stripTime();
    return endDate.getTime() !== end.getTime() || startDate.getTime() === endDate.getTime() ? endDate.addDays(1) : endDate;
};
/** @hidden */
function toInvariantTime(date) {
    var staticDate = new Date(1980, 0, 1, 0, 0, 0);
    if (date) {
        staticDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    return staticDate;
}
exports.toInvariantTime = toInvariantTime;
/**
 * @hidden
 * TODO Move to date-math
 */
exports.addUTCDays = function (date, offset) {
    var newDate = new Date(date.getTime());
    newDate.setUTCDate(newDate.getUTCDate() + offset);
    return newDate;
};
/**
 * @hidden
 */
function timeOnDate(date, hours, minutes, seconds, ms) {
    if (hours === void 0) { hours = 0; }
    if (minutes === void 0) { minutes = 0; }
    if (seconds === void 0) { seconds = 0; }
    if (ms === void 0) { ms = 0; }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds, ms);
}
exports.timeOnDate = timeOnDate;
// TODO: name? move to date-math
/** @hidden */
function toUTCTime(localDate, localTime) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localTime.getHours(), localTime.getMinutes(), localTime.getSeconds(), localTime.getMilliseconds()));
}
exports.toUTCTime = toUTCTime;
//  TODO: move to date-math
/** @hidden */
function toUTCDate(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
}
exports.toUTCDate = toUTCDate;
// TODO: move to date-math
/** @hidden */
function getUTCDate(utcDate) {
    return new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate()));
}
exports.getUTCDate = getUTCDate;
// TODO: move to date-math
/** @hidden */
function toUTCDateTime(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
}
exports.toUTCDateTime = toUTCDateTime;
/** @hidden */
function dateWithTime(target, time) {
    return new Date(target.getFullYear(), target.getMonth(), target.getDate(), time.getHours(), time.getMinutes());
}
exports.dateWithTime = dateWithTime;
function getDataIdx(value, resource) {
    var data = resource.data;
    for (var dataIdx = 0; dataIdx < data.length; dataIdx++) {
        if (util_1.getField(data[dataIdx], resource.valueField) === value) {
            return dataIdx;
        }
    }
    return -1;
}
function resourceItem(value, resource) {
    var index = getDataIdx(value, resource);
    return index >= 0 ? resource.data[index] : {};
}
function resourceItems(values, resource) {
    return values.map(function (value) { return resourceItem(value, resource); });
}
function cloneResources(arr) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        var clone = Object.assign({}, arr[idx]);
        clone.resources = clone.resources.slice(0);
        result.push(clone);
    }
    return result;
}
/** @hidden */
function resourceItemByValue(event, resource) {
    var value = util_1.getField(event, resource.field);
    if (Array.isArray(value)) {
        return resourceItems(value, resource);
    }
    return resourceItem(value, resource);
}
exports.resourceItemByValue = resourceItemByValue;
function addNotGroupedResources(event, resources, allResources) {
    for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
        var current = resources[resourceIdx];
        for (var idx = 0; idx < allResources.length; idx++) {
            var item = allResources[idx];
            if (!current.resources[idx] && item.data) {
                current.resources[idx] = resourceItemByValue(event, item);
            }
        }
    }
}
/** @hidden */
function eventResources(event, _a) {
    var taskResources = _a.taskResources, hasGroups = _a.hasGroups, spans = _a.spans, _b = _a.allResources, allResources = _b === void 0 ? [] : _b;
    var resources = [];
    for (var resourceIdx = 0; resourceIdx < taskResources.length; resourceIdx++) {
        var resource = taskResources[resourceIdx];
        if (!resource.data) {
            resources = [{ leafIdx: 0, resources: [] }];
            continue;
        }
        var resourceIndex = allResources.indexOf(resource);
        var values = util_1.getField(event, resource.field);
        if (!Array.isArray(values)) {
            values = [values];
        }
        var expandedResources = [];
        for (var valueIdx = 0; valueIdx < values.length; valueIdx++) {
            var dataIdx = getDataIdx(values[valueIdx], resource);
            if (dataIdx < 0) {
                return [{ leafIdx: hasGroups ? -1 : 0, resources: [] }];
            }
            var item = resource.data[dataIdx];
            // has groups - need all copies of the multiple resource
            // no groups - just the first
            if (resourceIdx === 0 && (hasGroups || valueIdx === 0)) {
                var resourceItems_1 = [];
                resourceItems_1[resourceIndex] = resource.multiple && !hasGroups ? [item] : item;
                resources.push({
                    leafIdx: hasGroups ? dataIdx * spans[resourceIdx] : 0,
                    color: util_1.getField(item, resource.colorField),
                    resources: resourceItems_1
                });
            }
            else if (hasGroups) { // don't create multiple resource groups if no groups for multiple resources
                var currentResources = resources;
                if (values.length > 1) {
                    currentResources = cloneResources(resources);
                    expandedResources.push.apply(expandedResources, currentResources);
                }
                for (var currentIdx = 0; currentIdx < currentResources.length; currentIdx++) {
                    currentResources[currentIdx].leafIdx += dataIdx * spans[resourceIdx];
                    currentResources[currentIdx].resources[resourceIndex] = item;
                }
            }
            else if (valueIdx > 0) {
                for (var idx = 0; idx < resources.length; idx++) {
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
exports.eventResources = eventResources;
/** @hidden */
function assignTasksResources(tasks, options) {
    for (var idx = 0; idx < tasks.length; idx++) {
        var task = tasks[idx];
        task.resources = eventResources(task.event, options);
    }
}
exports.assignTasksResources = assignTasksResources;
/** @hidden */
function findRowIndex(events, data) {
    if (data.rowIndex !== undefined) {
        return data.rowIndex;
    }
    for (var idx = 0; idx < events.length; idx++) {
        if (!events[idx]) {
            return idx;
        }
    }
    return events.length;
}
exports.findRowIndex = findRowIndex;
/** @hidden */
function isRecurrence(task) {
    return Boolean(task.event && task.event.recurrenceRule);
}
exports.isRecurrence = isRecurrence;
/** @hidden */
function isRecurrenceException(task) {
    return task.event && util_1.isPresent(task.event.recurrenceId) && !task.event.recurrenceRule;
}
exports.isRecurrenceException = isRecurrenceException;
/** @hidden */
exports.rectContains = function (rect, left, top) {
    return rect.left <= left && left <= rect.left + rect.width && rect.top <= top && top <= rect.top + rect.height;
};
/** @hidden */
exports.rectContainsX = function (rect, left) {
    return rect.left <= left && left <= rect.left + rect.width;
};
/** @hidden */
exports.toPx = function (value) { return value + "px"; };
/** @hidden */
exports.elementOffset = function (element) {
    if (!element) {
        return null;
    }
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    return {
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        width: box.width,
        height: box.height
    };
};
/** @hidden */
exports.pointDistance = function (x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
/** @hidden */
exports.ignoreContentChild = function (child) { return child.nodeName === 'KENDO-RESIZE-SENSOR' || dom_queries_1.hasClasses(child, 'k-loading-mask'); };
/** @hidden */
exports.setCoordinates = function (element, coordinates) {
    for (var field in coordinates) {
        if (coordinates.hasOwnProperty(field)) {
            element.style[field] = exports.toPx(coordinates[field]);
        }
    }
};
/** @hidden */
exports.convertNgClassBindings = function (bindingValues) {
    var result = [];
    if (util_1.isString(bindingValues)) {
        result.push(bindingValues);
    }
    else if (util_1.isArray(bindingValues)) {
        result.push.apply(result, bindingValues);
    }
    else if (util_1.isObject(bindingValues)) {
        for (var field in bindingValues) {
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
function formatEventTime(start, end, isAllDay) {
    var startTimeFormat = { skeleton: 'yMMMMEEEEdhm' };
    var startDateFormat = { skeleton: 'yMMMMEEEEd' };
    var endFormat = 't';
    return isAllDay ?
        "" + kendo_angular_intl_1.formatDate(start, startDateFormat) :
        kendo_angular_intl_1.formatDate(start, startTimeFormat) + "\u2013" + kendo_angular_intl_1.formatDate(end, endFormat);
}
exports.formatEventTime = formatEventTime;
/**
 * @hidden
 */
function formValueOrDefault(group, field, defaultValue) {
    var control = group.get(field);
    if (!control) {
        return defaultValue;
    }
    return control.value || defaultValue;
}
exports.formValueOrDefault = formValueOrDefault;
/**
 * @hidden
 */
exports.isWorkWeekDay = function (day, start, end) {
    if (end < start) {
        return day <= end || start <= day;
    }
    return start <= day && day <= end;
};
