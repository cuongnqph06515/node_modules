"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var util_1 = require("../../common/util");
var last = function (arr) { return arr[arr.length - 1]; };
var ɵ0 = last;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.createTasks = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = utils_1.toUTCDate(periodStart);
    var utcEnd = utils_1.toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var data = {};
        var startTime = item.start.stripTime().toUTCDate();
        var end = item.end.stripTime();
        var endTime = (item.end.getTime() !== end.getTime() ? end.addDays(1) : end).toUTCDate();
        if (utils_1.intersects(startTime, endTime, utcStart, utcEnd)) {
            for (var rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
                var range = ranges[rangeIdx];
                var rangeStart = utils_1.toUTCDate(range[0]);
                var rangeEnd = utils_1.addUTCDays(utils_1.toUTCDate(last(range)), 1);
                if (utils_1.intersects(startTime, endTime, rangeStart, rangeEnd)) {
                    var task = {
                        index: index,
                        startTime: startTime,
                        endTime: endTime,
                        start: item.start,
                        end: item.end,
                        event: item.event,
                        isAllDay: item.event.isAllDay,
                        rangeIndex: rangeIdx,
                        data: data
                    };
                    tasks.push(task);
                    task.head = task.endTime > rangeEnd;
                    task.tail = task.startTime < rangeStart;
                }
            }
        }
    }
    return util_1.sortTasksByTime(tasks);
};
function clearTaskData(task) {
    var data = task.data;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            delete data[key];
        }
    }
}
/**
 * @hidden
 */
function updateTaskData(tasks) {
    for (var idx = 0; idx < tasks.length; idx++) {
        var task = tasks[idx];
        var resources = task.resources;
        clearTaskData(task);
        for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
            task.data[resources[resourceIdx].leafIdx] = {};
        }
    }
}
exports.updateTaskData = updateTaskData;
