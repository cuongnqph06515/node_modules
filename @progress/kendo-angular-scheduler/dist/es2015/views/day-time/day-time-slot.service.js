import { orderBy } from '@progress/kendo-data-query';
import { intersects, findRowIndex } from '../utils';
import { ItemMap } from '../view-items/item-map';
import { BaseSlotService } from '../view-items/base-slot.service';
import { rectContains, rectContainsX, dateInRange, dateWithTime } from '../utils';
import { isNumber } from '../../common/util';
const EVENTS_OFFSET = 10;
const MIN_EVENT_HEIGHT = 25;
const minHeightOverlaps = (top1, top2) => top1 <= top2 && top2 <= top1 + MIN_EVENT_HEIGHT;
const ɵ0 = minHeightOverlaps;
const timeOffset = (slot, date, vertical = true) => {
    if (slot.start.getTime() <= date.getTime()) {
        return (vertical ? slot.height : slot.width) * ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
    }
    return 0;
};
const ɵ1 = timeOffset;
const columnIndexComparer = (a, b) => {
    const indexA = isNumber(a.columnIndex) ? a.columnIndex : Number.MAX_VALUE;
    const indexB = isNumber(b.columnIndex) ? b.columnIndex : Number.MAX_VALUE;
    // a un b def = 0
    // b un a def = 0
    if (indexA === indexB) {
        return a.item.startTime.getTime() - b.item.startTime.getTime();
    }
    return indexA - indexB;
};
const ɵ2 = columnIndexComparer;
function initTimeColumns(slotKeys, slotItems) {
    // Break slots into groups with overlapping events.
    let columns = 0;
    let groupSlots = [];
    slotKeys.forEach(key => {
        const { slot, events } = slotItems[key];
        const count = events.length;
        let groupEnd = true;
        events.sort(columnIndexComparer);
        columns = Math.max(count, columns);
        groupSlots.push(slot);
        for (let eventIdx = 0; eventIdx < count; eventIdx++) {
            const event = events[eventIdx];
            groupEnd = groupEnd && event.item.endTime.getTime() <= slot.end.getTime();
            if (isNumber(event.columnIndex)) {
                continue;
            }
            event.rect = {
                top: slot.rect.top + timeOffset(slot, event.item.startTime)
            };
            event.columnIndex = eventIdx;
            event.lastColumn = true;
            for (let idx = 0, previousIdx = -1; idx < eventIdx; idx++) {
                const current = events[idx];
                if (current.columnIndex > previousIdx + 1) {
                    event.columnIndex = previousIdx + 1;
                    event.lastColumn = false;
                    events.splice(eventIdx, 1);
                    events.splice(event.columnIndex, 0, event);
                    break;
                }
                if (!intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime) &&
                    !minHeightOverlaps(current.rect.top, event.rect.top)) {
                    event.columnIndex = idx;
                    event.lastColumn = !events.some(e => e.columnIndex && idx < e.columnIndex &&
                        intersects(event.item.startTime, event.item.endTime, e.item.startTime, e.item.endTime));
                    events.splice(eventIdx, 1);
                    events.splice(idx, 0, event);
                    break;
                }
                previousIdx = current.columnIndex;
                current.lastColumn = false;
            }
        }
        if (groupEnd) {
            groupSlots.forEach(item => item.columns = columns);
            groupSlots = [];
            columns = 0;
        }
    });
    // The maximum number of overlapping events in the group is used to create the same number of columns.
    groupSlots.forEach(slot => slot.columns = columns);
}
function findTimeRowIndex(events, event) {
    if (event.rowIndex !== undefined) {
        return event.rowIndex;
    }
    for (let idx = 0; idx < events.length; idx++) {
        const current = events[idx];
        if (!current || !intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime)) {
            return idx;
        }
    }
    return events.length;
}
function initHorizontalSlots(slots, items, rowHeight, eventHeight, getRowIndex) {
    const padding = slots[0].padding;
    if (!items.length) {
        return {
            height: rowHeight - padding
        };
    }
    items.forEach(item => {
        item.rowIndex = undefined;
        item.rect = {
            height: eventHeight,
            width: 0
        };
    });
    const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
    const slotItems = {};
    sorted.forEach(event => slots
        .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
        .forEach(slot => {
        const value = slotItems[slot.key] = slotItems[slot.key] || { rows: [], slot: slot, events: [] };
        event.rowIndex = getRowIndex(value.rows, event);
        value.rows[event.rowIndex] = event;
        value.events.push(event);
    }));
    const top = slots[0].top;
    let maxOffset = 0;
    Object.keys(slotItems).forEach((key) => {
        const events = slotItems[key].events;
        let slotOffset = 0;
        for (let idx = 0; idx < events.length; idx++) {
            const event = events[idx];
            if (event) {
                event.rect.top = top + event.rowIndex * (EVENTS_OFFSET + event.rect.height);
                slotOffset = Math.max(slotOffset, (event.rect.top - top) + event.rect.height);
            }
        }
        maxOffset = Math.max(slotOffset, maxOffset);
    });
    maxOffset += rowHeight - padding;
    return {
        height: maxOffset,
        slotItems
    };
}
function setHorizontalOffsets(slotItems, items, measureTime) {
    Object.keys(slotItems).forEach((key) => {
        const { slot, events } = slotItems[key];
        const rect = slot.rect;
        for (let idx = 0; idx < events.length; idx++) {
            const event = events[idx];
            if (event) {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = slot.rect.left +
                        (measureTime ? timeOffset(slot, event.item.startTime, false) : 0);
                }
                const slotOffset = measureTime && event.item.endTime.getTime() < slot.end.getTime() ?
                    timeOffset(slot, event.item.endTime, false) : rect.width;
                event.rect.width = slot.rect.left + slotOffset - event.rect.left;
            }
        }
    });
    items.forEach(item => {
        item.reflow();
    });
}
/** @hidden */
export class SlotRange {
    constructor(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    get slots() {
        return this.slotMap.toArray();
    }
    get firstSlot() {
        return this.slotMap.first;
    }
    get lastSlot() {
        return this.slotMap.last;
    }
    get items() {
        return this.itemMap.toArray();
    }
    get rect() {
        const first = this.firstSlot.rect;
        const last = this.lastSlot.rect;
        return {
            left: first.left,
            top: first.top,
            width: last.left - first.left + last.width,
            height: last.top - first.top + last.height
        };
    }
    get start() {
        const first = this.slotMap.first;
        if (!first) {
            return null;
        }
        return first.start;
    }
    get end() {
        const last = this.slotMap.last;
        if (!last) {
            return null;
        }
        return last.end;
    }
    get hasSlots() {
        return this.slotMap.count > 0;
    }
    get hasItems() {
        return this.itemMap.count > 0;
    }
    registerItem(component) {
        this.itemMap.addItem(component.item.index, component);
    }
    unregisterItem(component, index) {
        this.itemMap.removeItem(index, component);
    }
    registerSlot(slot) {
        this.slotMap.addItem(slot.id.index, slot);
    }
    unregisterSlot(slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    }
    layout(options) {
        const items = this.items;
        if (!items.length) {
            return;
        }
        const fill = Math.max(Math.min(options.fill || 0.9, 1), 0.1);
        const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        items.forEach((item, index) => {
            item.rect = null;
            item.columnIndex = undefined;
        });
        const slotItems = {};
        const slots = this.slots;
        // Map each populated slot to the events in it
        sorted.forEach(event => slots
            .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
            .forEach(slot => {
            const value = slotItems[slot.key] = slotItems[slot.key] || { events: [] };
            value.slot = slot;
            value.events.push(event);
        }));
        const slotKeys = Object.keys(slotItems);
        initTimeColumns(slotKeys, slotItems);
        slotKeys.forEach((key) => {
            const { slot, events } = slotItems[key];
            const count = events.length;
            const spacing = 2;
            const startOffset = 2;
            const slotRect = slot.rect;
            const slotLeft = slotRect.left;
            const columns = slot.columns;
            const slotWidth = slotRect.width * fill - (columns - 1) * spacing - startOffset;
            const origin = slotLeft + startOffset;
            const eventWidth = slotWidth / columns;
            const slotEnd = origin + slotWidth + (columns - 1) * spacing;
            events.forEach(event => {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = origin + event.columnIndex * (eventWidth + spacing);
                    event.rect.width = event.lastColumn ? slotEnd - event.rect.left : eventWidth;
                    event.origin = {
                        left: slotLeft,
                        right: slotLeft + slotRect.width
                    };
                }
                // Expand the event to the last group slot
                const slotOffset = slot.end.getTime() <= event.item.endTime.getTime() ? slotRect.height : timeOffset(slot, event.item.endTime);
                event.rect.height = slotRect.top + slotOffset - event.rect.top;
            });
        });
        sorted.forEach(event => event.reflow());
    }
    initDaySlots(rowHeight, eventHeight) {
        const slots = this.slots;
        if (!slots.length) {
            return;
        }
        const { height, slotItems } = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findRowIndex);
        this.setSlotsHeight(height);
        this.slotItems = slotItems;
    }
    setDayOffsets() {
        if (!this.itemMap.count || !this.slotItems) {
            return;
        }
        setHorizontalOffsets(this.slotItems, this.items);
        this.slotItems = null;
    }
    setSlotsHeight(height) {
        this.firstSlot.height = height;
    }
}
/**
 * @hidden
 */
export class DayTimeResourceGroup {
    constructor(index) {
        this.index = index;
        this.dayRanges = [];
        this.timeRanges = [];
    }
    registerSlot(slot) {
        const range = this.slotRange(slot);
        range.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const range = this.slotRange(slot);
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            const ranges = this.slotRanges(slot);
            delete ranges[slot.id.rangeIndex];
        }
    }
    registerItem(component) {
        const range = this.itemRange(component);
        if (range) {
            range.registerItem(component);
            component.rangeIndex = range.index;
        }
        else {
            component.rangeIndex = undefined;
            component.toggle(false);
        }
    }
    unregisterItem(component, index) {
        if (component.rangeIndex !== undefined) {
            const ranges = component.item.isAllDay ? this.dayRanges : this.timeRanges;
            if (ranges[component.rangeIndex]) {
                ranges[component.rangeIndex].unregisterItem(component, index);
            }
            component.rangeIndex = undefined;
        }
    }
    forEachDateRange(callback) {
        for (let i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    }
    forEachTimeRange(callback) {
        for (let i = 0; i < this.timeRanges.length; i++) {
            callback(this.timeRanges[i]);
        }
    }
    slotRange(slot) {
        const ranges = this.slotRanges(slot);
        const rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    }
    slotRanges(slot) {
        return slot.isDaySlot ? this.dayRanges : this.timeRanges;
    }
    initTimeSlots(rowHeight, eventHeight, resourceRowHeight) {
        const slots = this.slots;
        if (!slots.length) {
            return;
        }
        const { height, slotItems } = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findTimeRowIndex);
        this.setSlotsHeight(Math.max(height, resourceRowHeight));
        this.slotItems = slotItems;
    }
    setTimelineOffsets() {
        const items = this.items;
        if (!this.slotItems || !items.length) {
            return;
        }
        setHorizontalOffsets(this.slotItems, items, true);
        this.slotItems = null;
    }
    setSlotsHeight(height) {
        //setting the first slot height should be sufficient
        this.timeRanges[0].setSlotsHeight(height);
    }
    get items() {
        return this.timeRanges.reduce((acc, range) => acc.concat(range.items), []);
    }
    get slots() {
        return this.timeRanges.reduce((acc, range) => acc.concat(range.slots), []);
    }
    get hasSlots() {
        return Boolean(this.dayRanges.find(range => range && range.hasSlots) || this.timeRanges.find(range => range && range.hasSlots));
    }
    cleanRanges() {
        this.dayRanges = this.dayRanges.filter(r => Boolean(r));
        this.timeRanges = this.timeRanges.filter(r => Boolean(r));
    }
    itemRange(component) {
        const task = component.item;
        const ranges = task.isAllDay ? this.dayRanges : this.timeRanges;
        if (isNumber(task.rangeIndex)) {
            return ranges[task.rangeIndex];
        }
        return ranges.find(r => intersects(task.startTime, task.endTime, r.start, r.end));
    }
}
/**
 * @hidden
 */
export class DayTimeSlotService extends BaseSlotService {
    layoutDays(eventHeight = 25) {
        this.groups.forEach((group) => group.forEachDateRange(range => range.slots.forEach(slot => {
            slot.element.nativeElement.style.height = '';
        })));
        const rowHeight = this.groups[0].dayRanges[0].slots[0].height;
        this.groups.forEach((group) => {
            group.forEachDateRange(range => range.initDaySlots(rowHeight, eventHeight));
        });
        this.groups.forEach((group) => {
            group.forEachDateRange(range => range.setDayOffsets());
        });
    }
    layoutTimeline(eventHeight, resourceRows) {
        this.groups.forEach((group) => group.forEachTimeRange(range => range.slots.forEach(slot => {
            slot.element.nativeElement.style.height = '';
        })));
        const rowHeight = this.groups[0].timeRanges[0].slots[0].height;
        this.groups.forEach((group, index) => {
            group.initTimeSlots(rowHeight, eventHeight, resourceRows && resourceRows[index] ? resourceRows[index].nativeElement.children[0].children[0].offsetHeight : 0);
        });
        this.groups.forEach((group) => group.setTimelineOffsets());
    }
    layoutTimes(options) {
        this.groups.forEach((group) => group.forEachTimeRange(range => range.layout(options)));
    }
    forEachDateRange(callback) {
        this.groups.forEach((group, index) => {
            callback(group.dayRanges[0], index);
        });
    }
    syncDateRanges() {
        let maxHeight = 0;
        this.groups.forEach((group) => {
            const slot = group.dayRanges[0].firstSlot;
            if (slot) {
                maxHeight = Math.max(slot.rect.height - slot.padding, maxHeight);
            }
        });
        this.groups.forEach((group) => {
            group.dayRanges[0].setSlotsHeight(maxHeight);
        });
        return maxHeight;
    }
    forEachGroup(callback) {
        this.groups.forEach(callback);
    }
    forEachSlot(callback) {
        this.groups.forEach((group) => {
            group.dayRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
            group.timeRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
        });
    }
    createGroup(index) {
        return new DayTimeResourceGroup(index);
    }
    slotByIndex(slotIndex, allDay = false) {
        const [resourceIndex, rangeIndex, index] = slotIndex.split(':').map(part => parseInt(part, 10));
        return this.groups[resourceIndex][allDay ? 'dayRanges' : 'timeRanges'][rangeIndex].slots[index];
    }
    slotByPosition(x, y, isDaySlot, includeDayRanges) {
        let range;
        if (isDaySlot) {
            this.groups.find((group) => {
                range = group.dayRanges.find(r => rectContainsX(r.rect, x));
                return range;
            });
            if (range) {
                return range.slots.find(slot => rectContainsX(slot.rect, x));
            }
        }
        else {
            this.groups.find((group) => {
                if (includeDayRanges) {
                    range = group.dayRanges.find(r => rectContains(r.rect, x, y));
                }
                if (!range) {
                    range = group.timeRanges.find(r => rectContains(r.rect, x, y));
                }
                return range;
            });
            if (range) {
                return range.slots.find(slot => rectContains(slot.rect, x, y));
            }
        }
    }
    groupSlotByPosition(currentSlot, x, y) {
        const group = this.groups[currentSlot.id.resourceIndex];
        let range;
        if (currentSlot.isDaySlot) {
            range = group.dayRanges.find(r => rectContains(r.rect, x, y));
        }
        else {
            range = group.timeRanges.find(r => rectContains(r.rect, x, y));
        }
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    dragRanges(currentSlot, offset, timeRanges) {
        const start = new Date(currentSlot.start.getTime() - offset.start);
        const end = new Date(currentSlot.start.getTime() + offset.end);
        const group = this.groups[currentSlot.id.resourceIndex];
        let result;
        if (timeRanges) {
            const slotRanges = [];
            group.timeRanges.forEach(range => {
                const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
                if (slots.length) {
                    slotRanges.push(slots);
                }
            });
            const lastRange = slotRanges[slotRanges.length - 1];
            result = [slotRanges[0][0], lastRange[lastRange.length - 1]];
        }
        else {
            result = group.slotRange(currentSlot).slots.filter(s => intersects(start, end, s.start, s.end));
        }
        return {
            start,
            end,
            ranges: [result]
        };
    }
    resizeRanges(currentSlot, task, resizeStart, offset) {
        const group = this.groups[currentSlot.id.resourceIndex];
        const ranges = task.isAllDay ? group.dayRanges : group.timeRanges;
        const result = [];
        const startDate = task.start.toUTCDate();
        const endDate = task.end.toUTCDate();
        let start, end;
        if (resizeStart) {
            const startTime = currentSlot.start.getTime() + offset.start;
            end = startDate.getTime() === endDate.getTime() ? this.findDateSlot(endDate, ranges, true).end : endDate;
            if (startTime >= endDate.getTime()) {
                if (task.isAllDay) {
                    start = new Date(Math.min(dateWithTime(endDate, startDate).getTime(), endDate.getTime()));
                }
                else {
                    start = this.findDateSlot(end, ranges).start;
                }
            }
            else if (offset.start && task.isAllDay) {
                start = new Date(startTime);
            }
            else {
                start = new Date(currentSlot.start.getTime());
            }
        }
        else {
            start = startDate;
            if (currentSlot.start.getTime() <= start.getTime()) {
                if (task.isAllDay) {
                    end = new Date(Math.max(dateWithTime(startDate, endDate).getTime(), startDate.getTime()));
                }
                else {
                    end = this.findDateSlot(start, ranges, true).end;
                }
            }
            else if (offset.end && task.isAllDay) {
                end = new Date(currentSlot.start.getTime() + offset.end);
            }
            else {
                end = currentSlot.end;
            }
        }
        ranges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                result.push(slots);
            }
        });
        return {
            start,
            end,
            ranges: result
        };
    }
    timePosition(date, resourceIndex, vertical) {
        const group = this.groups[resourceIndex];
        const range = group.timeRanges.find(r => dateInRange(date, r.start, r.end));
        if (!range) {
            return;
        }
        const slot = range.slots.find(s => dateInRange(date, s.start, s.end));
        if (slot) {
            const position = (vertical ? slot.height : slot.width) *
                ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
            return vertical ? slot.rect.top + position : slot.rect.left + position;
        }
    }
    findDateSlot(date, ranges, excludeEnd) {
        let result;
        ranges.forEach(range => {
            const slots = excludeEnd ? range.slots.filter(s => intersects(date, date, s.start, s.end)) :
                range.slots.filter(s => dateInRange(date, s.start, s.end));
            if (slots.length) {
                result = slots[0];
            }
        });
        return result;
    }
}
export { ɵ0, ɵ1, ɵ2 };
