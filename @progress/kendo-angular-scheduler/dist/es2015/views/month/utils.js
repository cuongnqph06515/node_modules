import { intersects, toUTCDate, addUTCDays } from '../utils';
import { sortTasksByTime } from '../../common/util';
const last = (arr) => arr[arr.length - 1];
const ɵ0 = last;
/**
 * @hidden
 */
export const createTasks = (periodStart, periodEnd, items, ranges) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const data = {};
        const startTime = item.start.stripTime().toUTCDate();
        const end = item.end.stripTime();
        const endTime = (item.end.getTime() !== end.getTime() ? end.addDays(1) : end).toUTCDate();
        if (intersects(startTime, endTime, utcStart, utcEnd)) {
            for (let rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
                const range = ranges[rangeIdx];
                const rangeStart = toUTCDate(range[0]);
                const rangeEnd = addUTCDays(toUTCDate(last(range)), 1);
                if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                    const task = {
                        index,
                        startTime,
                        endTime,
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
    const data = task.data;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            delete data[key];
        }
    }
}
/**
 * @hidden
 */
export function updateTaskData(tasks) {
    for (let idx = 0; idx < tasks.length; idx++) {
        const task = tasks[idx];
        const resources = task.resources;
        clearTaskData(task);
        for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
            task.data[resources[resourceIdx].leafIdx] = {};
        }
    }
}
export { ɵ0 };
