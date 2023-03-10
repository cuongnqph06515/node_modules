import { intersects, toUTCDate, roundAllDayEnd } from '../utils';
import { MS_PER_DAY } from '@progress/kendo-date-math';
import { sortTasksByTime } from '../../common/util';
/** @hidden */
export const isMultiDay = ({ start, end }) => {
    const startDate = start.stripTime();
    const endDate = end.stripTime();
    return startDate.getTime() !== endDate.getTime() &&
        (endDate.getTime() !== end.getTime() || startDate.addDays(1).getTime() !== endDate.getTime());
};
//check start and times or update day ranges to have them
/** @hidden */
export const createTasks = (periodStart, periodEnd, items, ranges) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const multiDay = isMultiDay(item);
        const multipleRanges = multiDay && !item.event.isAllDay && (item.end.getTime() - item.start.getTime()) < MS_PER_DAY;
        const isAllDay = item.event.isAllDay || (multiDay && !multipleRanges);
        const endTime = (isAllDay ? roundAllDayEnd(item) : item.end).toUTCDate();
        const startTime = (isAllDay ? item.start.stripTime() : item.start).toUTCDate();
        for (let rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            const rangeStart = ranges[rangeIndex].start;
            const rangeEnd = ranges[rangeIndex].end;
            if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                const task = {
                    index,
                    isAllDay,
                    startTime,
                    endTime,
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
                    const nextRange = ranges[rangeIndex + 1];
                    const previousRange = ranges[rangeIndex - 1];
                    task.head = (nextRange ? nextRange.start : utcEnd) < endTime;
                    task.tail = startTime < (previousRange ? previousRange.end : utcStart);
                }
            }
        }
    }
    return sortTasksByTime(tasks);
};
