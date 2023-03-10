import { intersects, toUTCDate, addUTCDays } from '../utils';
import { sortTasksByTime } from '../../common/util';
var last = function (arr) { return arr[arr.length - 1]; };
var ɵ0 = last;
/**
 * @hidden
 */
export var createTasks = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var data = {};
        var startTime = item.start.stripTime().toUTCDate();
        var end = item.end.stripTime();
        var endTime = (item.end.getTime() !== end.getTime() ? end.addDays(1) : end).toUTCDate();
        if (intersects(startTime, endTime, utcStart, utcEnd)) {
            for (var rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
                var range = ranges[rangeIdx];
                var rangeStart = toUTCDate(range[0]);
                var rangeEnd = addUTCDays(toUTCDate(last(range)), 1);
                if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
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
    return sortTasksByTime(tasks);
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
export function updateTaskData(tasks) {
    for (var idx = 0; idx < tasks.length; idx++) {
        var task = tasks[idx];
        var resources = task.resources;
        clearTaskData(task);
        for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
            task.data[resources[resourceIdx].leafIdx] = {};
        }
    }
}
export { ɵ0 };
