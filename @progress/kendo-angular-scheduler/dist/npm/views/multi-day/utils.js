"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../../common/util");
/** @hidden */
exports.isMultiDay = function (_a) {
    var start = _a.start, end = _a.end;
    var startDate = start.stripTime();
    var endDate = end.stripTime();
    return startDate.getTime() !== endDate.getTime() &&
        (endDate.getTime() !== end.getTime() || startDate.addDays(1).getTime() !== endDate.getTime());
};
//check start and times or update day ranges to have them
/** @hidden */
exports.createTasks = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = utils_1.toUTCDate(periodStart);
    var utcEnd = utils_1.toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var multiDay = exports.isMultiDay(item);
        var multipleRanges = multiDay && !item.event.isAllDay && (item.end.getTime() - item.start.getTime()) < kendo_date_math_1.MS_PER_DAY;
        var isAllDay = item.event.isAllDay || (multiDay && !multipleRanges);
        var endTime = (isAllDay ? utils_1.roundAllDayEnd(item) : item.end).toUTCDate();
        var startTime = (isAllDay ? item.start.stripTime() : item.start).toUTCDate();
        for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            var rangeStart = ranges[rangeIndex].start;
            var rangeEnd = ranges[rangeIndex].end;
            if (utils_1.intersects(startTime, endTime, rangeStart, rangeEnd)) {
                var task = {
                    index: index,
                    isAllDay: isAllDay,
                    startTime: startTime,
                    endTime: endTime,
                    rangeIndex: isAllDay ? 0 : rangeIndex,
                    start: item.start,
                    end: item.end,
                    event: item.event
                };
                tasks.push(task);
                if (!multipleRanges) {
                    task.head = utcEnd < endTime;
                    task.tail = startTime < utcStart;
                    break;
                }
                else {
                    var nextRange = ranges[rangeIndex + 1];
                    var previousRange = ranges[rangeIndex - 1];
                    task.head = (nextRange ? nextRange.start : utcEnd) < endTime;
                    task.tail = startTime < (previousRange ? previousRange.end : utcStart);
                }
            }
        }
    }
    return util_1.sortTasksByTime(tasks);
};
