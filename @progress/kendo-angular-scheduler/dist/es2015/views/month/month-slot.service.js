import { orderBy } from '@progress/kendo-data-query';
import { intersects, findRowIndex, addUTCDays, rectContains, dateWithTime } from '../utils';
import { ItemMap } from '../view-items/item-map';
import { BaseSlotService } from '../view-items/base-slot.service';
import { BORDER_WIDTH } from '../constants';
//better try to measure this one
const MORE_BUTTON_HEIGHT = 13;
const EVENT_OFFSET = 2;
/**
 * @hidden
 */
export class SlotRange {
    constructor(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    get slots() {
        return this.slotMap.toArray();
    }
    get items() {
        return this.itemMap.toArray();
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
        return addUTCDays(last.end, 1);
    }
    get hasSlots() {
        return this.slotMap.count > 0;
    }
    get hasItems() {
        return this.itemMap.count > 0;
    }
    get firstSlot() {
        return this.slotMap.first;
    }
    get lastSlot() {
        return this.slotMap.last;
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
    layout(eventHeight) {
        if (!this.hasItems) {
            return;
        }
        const items = this.items;
        const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        const slotItems = {};
        const slots = this.slots;
        sorted.forEach(event => slots
            .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
            .forEach(slot => {
            const value = slotItems[slot.key] = slotItems[slot.key] || { events: [], height: slot.linkHeight };
            value.slot = slot;
            const rect = slot.rect;
            const data = event.item.data[event.resourceIndex];
            data.rowIndex = findRowIndex(value.events, data);
            if (value.height + eventHeight + EVENT_OFFSET + MORE_BUTTON_HEIGHT > rect.height || data.hidden) {
                data.hidden = true;
                slot.showMore({ width: rect.width, left: rect.left, top: rect.top + slot.linkHeight + ((data.rowIndex) * (eventHeight + EVENT_OFFSET)) });
            }
            else {
                value.events[data.rowIndex] = event;
                if (!event.rect) {
                    event.rect = {
                        top: rect.top + slot.linkHeight + (data.rowIndex * (eventHeight + EVENT_OFFSET)),
                        left: rect.left,
                        height: eventHeight,
                        width: 0
                    };
                }
                event.rect.width += rect.width + BORDER_WIDTH;
                value.height += eventHeight + EVENT_OFFSET;
            }
        }));
        sorted.forEach(event => {
            if (event.rect) {
                event.rect.width -= BORDER_WIDTH;
            }
            event.reflow();
        });
    }
}
/**
 * @hidden
 */
export class MonthResourceGroup {
    constructor(index) {
        this.index = index;
        this.dayRanges = [];
    }
    get hasSlots() {
        return Boolean(this.dayRanges.find(range => range && range.hasSlots));
    }
    registerSlot(slot) {
        const range = this.slotRange(slot);
        range.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const range = this.dayRanges[slot.id.rangeIndex];
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            delete this.dayRanges[slot.id.rangeIndex];
        }
    }
    registerItem(component) {
        const range = this.dayRanges[component.item.rangeIndex];
        range.registerItem(component);
    }
    unregisterItem(component, index) {
        const range = this.dayRanges[component.item.rangeIndex];
        if (range) {
            range.unregisterItem(component, index);
        }
    }
    slotRange(slot) {
        const ranges = this.dayRanges;
        const rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    }
    forEachRange(callback) {
        for (let i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    }
    cleanRanges() {
        this.dayRanges = this.dayRanges.filter(r => Boolean(r));
    }
}
/**
 * @hidden
 */
export class MonthSlotService extends BaseSlotService {
    layout(eventHeight) {
        this.groups.forEach((group) => group.forEachRange(range => range.layout(eventHeight)));
    }
    slotByIndex(slotIndex) {
        const [resourceIndex, rangeIndex, index] = slotIndex.split(':').map(part => parseInt(part, 10));
        return this.groups[resourceIndex].dayRanges[rangeIndex].slots[index];
    }
    forEachSlot(callback) {
        this.groups.forEach((group) => {
            group.dayRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
        });
    }
    createGroup(index) {
        return new MonthResourceGroup(index);
    }
    slotByPosition(x, y) {
        let range;
        this.groups.find((group) => {
            range = group.dayRanges.find(r => rectContains(r.rect, x, y));
            return range;
        });
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    dragRanges(currentSlot, offset) {
        const start = new Date(currentSlot.start.getTime() - offset.start);
        const end = new Date(currentSlot.start.getTime() + offset.end);
        const group = this.groups[currentSlot.id.resourceIndex];
        const ranges = [];
        group.dayRanges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start,
            end,
            ranges
        };
    }
    groupSlotByPosition(currentSlot, x, y) {
        const range = this.groups[currentSlot.id.resourceIndex].dayRanges.find(r => rectContains(r.rect, x, y));
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    resizeRanges(currentSlot, task, resizeStart, offset) {
        const group = this.groups[task.resources[0].leafIdx];
        const ranges = [];
        const startDate = task.start.toUTCDate();
        const endDate = task.end.toUTCDate();
        let start, end;
        if (resizeStart) {
            start = currentSlot.start.getTime() + offset.start;
            if (start > endDate.getTime()) {
                start = new Date(Math.min(dateWithTime(endDate, startDate).getTime(), endDate.getTime()));
            }
            end = endDate;
        }
        else {
            start = startDate;
            end = currentSlot.start.getTime() + offset.end;
            if (end < start.getTime()) {
                end = new Date(Math.max(dateWithTime(startDate, endDate).getTime(), start.getTime()));
            }
        }
        group.dayRanges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: new Date(start),
            end: new Date(end),
            ranges: ranges
        };
    }
}
