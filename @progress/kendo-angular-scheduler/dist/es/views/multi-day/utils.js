import { intersects, toUTCDate, roundAllDayEnd } from '../utils';
import { MS_PER_DAY } from '@progress/kendo-date-math';
import { sortTasksByTime } from '../../common/util';
/** @hidden */
export var isMultiDay = function (_a) {
    var start = _a.start, end = _a.end;
    var startDate = start.stripTime();
    var endDate = end.stripTime();
    return startDate.getTime() !== endDate.getTime() &&
        (endDate.getTime() !== end.getTime() || startDate.addDays(1).getTime() !== endDate.getTime());
};
//check start and times or update day ranges to have them
/** @hidden */
export var createTasks = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var multiDay = isMultiDay(item);
        var multipleRanges = multiDay && !item.event.isAllDay && (item.end.getTime() - item.start.getTime()) < MS_PER_DAY;
        var isAllDay = item.event.isAllDay || (multiDay && !multipleRanges);
        var endTime = (isAllDay ? roundAllDayEnd(item) : item.end).toUTCDate();
        var startTime = (isAllDay ? item.start.stripTime() : item.start).toUTCDate();
        for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            var rangeStart = ranges[rangeIndex].start;
            var rangeEnd = ranges[rangeIndex].end;
            if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
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
    return sortTasksByTime(tasks);
};
