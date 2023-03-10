import * as tslib_1 from "tslib";
import { orderBy } from '@progress/kendo-data-query';
import { intersects, findRowIndex } from '../utils';
import { ItemMap } from '../view-items/item-map';
import { BaseSlotService } from '../view-items/base-slot.service';
import { rectContains, rectContainsX, dateInRange, dateWithTime } from '../utils';
import { isNumber } from '../../common/util';
var EVENTS_OFFSET = 10;
var MIN_EVENT_HEIGHT = 25;
var minHeightOverlaps = function (top1, top2) {
    return top1 <= top2 && top2 <= top1 + MIN_EVENT_HEIGHT;
};
var ɵ0 = minHeightOverlaps;
var timeOffset = function (slot, date, vertical) {
    if (vertical === void 0) { vertical = true; }
    if (slot.start.getTime() <= date.getTime()) {
        return (vertical ? slot.height : slot.width) * ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
    }
    return 0;
};
var ɵ1 = timeOffset;
var columnIndexComparer = function (a, b) {
    var indexA = isNumber(a.columnIndex) ? a.columnIndex : Number.MAX_VALUE;
    var indexB = isNumber(b.columnIndex) ? b.columnIndex : Number.MAX_VALUE;
    // a un b def = 0
    // b un a def = 0
    if (indexA === indexB) {
        return a.item.startTime.getTime() - b.item.startTime.getTime();
    }
    return indexA - indexB;
};
var ɵ2 = columnIndexComparer;
function initTimeColumns(slotKeys, slotItems) {
    // Break slots into groups with overlapping events.
    var columns = 0;
    var groupSlots = [];
    slotKeys.forEach(function (key) {
        var _a = slotItems[key], slot = _a.slot, events = _a.events;
        var count = events.length;
        var groupEnd = true;
        events.sort(columnIndexComparer);
        columns = Math.max(count, columns);
        groupSlots.push(slot);
        var _loop_1 = function (eventIdx) {
            var event_1 = events[eventIdx];
            groupEnd = groupEnd && event_1.item.endTime.getTime() <= slot.end.getTime();
            if (isNumber(event_1.columnIndex)) {
                return "continue";
            }
            event_1.rect = {
                top: slot.rect.top + timeOffset(slot, event_1.item.startTime)
            };
            event_1.columnIndex = eventIdx;
            event_1.lastColumn = true;
            var _loop_2 = function (idx, previousIdx) {
                var current = events[idx];
                if (current.columnIndex > previousIdx + 1) {
                    event_1.columnIndex = previousIdx + 1;
                    event_1.lastColumn = false;
                    events.splice(eventIdx, 1);
                    events.splice(event_1.columnIndex, 0, event_1);
                    return out_previousIdx_1 = previousIdx, "break";
                }
                if (!intersects(event_1.item.startTime, event_1.item.endTime, current.item.startTime, current.item.endTime) &&
                    !minHeightOverlaps(current.rect.top, event_1.rect.top)) {
                    event_1.columnIndex = idx;
                    event_1.lastColumn = !events.some(function (e) { return e.columnIndex && idx < e.columnIndex &&
                        intersects(event_1.item.startTime, event_1.item.endTime, e.item.startTime, e.item.endTime); });
                    events.splice(eventIdx, 1);
                    events.splice(idx, 0, event_1);
                    return out_previousIdx_1 = previousIdx, "break";
                }
                previousIdx = current.columnIndex;
                current.lastColumn = false;
                out_previousIdx_1 = previousIdx;
            };
            var out_previousIdx_1;
            for (var idx = 0, previousIdx = -1; idx < eventIdx; idx++) {
                var state_1 = _loop_2(idx, previousIdx);
                previousIdx = out_previousIdx_1;
                if (state_1 === "break")
                    break;
            }
        };
        for (var eventIdx = 0; eventIdx < count; eventIdx++) {
            _loop_1(eventIdx);
        }
        if (groupEnd) {
            groupSlots.forEach(function (item) { return item.columns = columns; });
            groupSlots = [];
            columns = 0;
        }
    });
    // The maximum number of overlapping events in the group is used to create the same number of columns.
    groupSlots.forEach(function (slot) { return slot.columns = columns; });
}
function findTimeRowIndex(events, event) {
    if (event.rowIndex !== undefined) {
        return event.rowIndex;
    }
    for (var idx = 0; idx < events.length; idx++) {
        var current = events[idx];
        if (!current || !intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime)) {
            return idx;
        }
    }
    return events.length;
}
function initHorizontalSlots(slots, items, rowHeight, eventHeight, getRowIndex) {
    var padding = slots[0].padding;
    if (!items.length) {
        return {
            height: rowHeight - padding
        };
    }
    items.forEach(function (item) {
        item.rowIndex = undefined;
        item.rect = {
            height: eventHeight,
            width: 0
        };
    });
    var sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
    var slotItems = {};
    sorted.forEach(function (event) { return slots
        .filter(function (slot) { return intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
        .forEach(function (slot) {
        var value = slotItems[slot.key] = slotItems[slot.key] || { rows: [], slot: slot, events: [] };
        event.rowIndex = getRowIndex(value.rows, event);
        value.rows[event.rowIndex] = event;
        value.events.push(event);
    }); });
    var top = slots[0].top;
    var maxOffset = 0;
    Object.keys(slotItems).forEach(function (key) {
        var events = slotItems[key].events;
        var slotOffset = 0;
        for (var idx = 0; idx < events.length; idx++) {
            var event_2 = events[idx];
            if (event_2) {
                event_2.rect.top = top + event_2.rowIndex * (EVENTS_OFFSET + event_2.rect.height);
                slotOffset = Math.max(slotOffset, (event_2.rect.top - top) + event_2.rect.height);
            }
        }
        maxOffset = Math.max(slotOffset, maxOffset);
    });
    maxOffset += rowHeight - padding;
    return {
        height: maxOffset,
        slotItems: slotItems
    };
}
function setHorizontalOffsets(slotItems, items, measureTime) {
    Object.keys(slotItems).forEach(function (key) {
        var _a = slotItems[key], slot = _a.slot, events = _a.events;
        var rect = slot.rect;
        for (var idx = 0; idx < events.length; idx++) {
            var event_3 = events[idx];
            if (event_3) {
                if (!isNumber(event_3.rect.left)) {
                    event_3.rect.left = slot.rect.left +
                        (measureTime ? timeOffset(slot, event_3.item.startTime, false) : 0);
                }
                var slotOffset = measureTime && event_3.item.endTime.getTime() < slot.end.getTime() ?
                    timeOffset(slot, event_3.item.endTime, false) : rect.width;
                event_3.rect.width = slot.rect.left + slotOffset - event_3.rect.left;
            }
        }
    });
    items.forEach(function (item) {
        item.reflow();
    });
}
/** @hidden */
var SlotRange = /** @class */ (function () {
    function SlotRange(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    Object.defineProperty(SlotRange.prototype, "slots", {
        get: function () {
            return this.slotMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "firstSlot", {
        get: function () {
            return this.slotMap.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "lastSlot", {
        get: function () {
            return this.slotMap.last;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "items", {
        get: function () {
            return this.itemMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "rect", {
        get: function () {
            var first = this.firstSlot.rect;
            var last = this.lastSlot.rect;
            return {
                left: first.left,
                top: first.top,
                width: last.left - first.left + last.width,
                height: last.top - first.top + last.height
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "start", {
        get: function () {
            var first = this.slotMap.first;
            if (!first) {
                return null;
            }
            return first.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "end", {
        get: function () {
            var last = this.slotMap.last;
            if (!last) {
                return null;
            }
            return last.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasSlots", {
        get: function () {
            return this.slotMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasItems", {
        get: function () {
            return this.itemMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    SlotRange.prototype.registerItem = function (component) {
        this.itemMap.addItem(component.item.index, component);
    };
    SlotRange.prototype.unregisterItem = function (component, index) {
        this.itemMap.removeItem(index, component);
    };
    SlotRange.prototype.registerSlot = function (slot) {
        this.slotMap.addItem(slot.id.index, slot);
    };
    SlotRange.prototype.unregisterSlot = function (slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    };
    SlotRange.prototype.layout = function (options) {
        var items = this.items;
        if (!items.length) {
            return;
        }
        var fill = Math.max(Math.min(options.fill || 0.9, 1), 0.1);
        var sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        items.forEach(function (item, index) {
            item.rect = null;
            item.columnIndex = undefined;
        });
        var slotItems = {};
        var slots = this.slots;
        // Map each populated slot to the events in it
        sorted.forEach(function (event) { return slots
            .filter(function (slot) { return intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
            .forEach(function (slot) {
            var value = slotItems[slot.key] = slotItems[slot.key] || { events: [] };
            value.slot = slot;
            value.events.push(event);
        }); });
        var slotKeys = Object.keys(slotItems);
        initTimeColumns(slotKeys, slotItems);
        slotKeys.forEach(function (key) {
            var _a = slotItems[key], slot = _a.slot, events = _a.events;
            var count = events.length;
            var spacing = 2;
            var startOffset = 2;
            var slotRect = slot.rect;
            var slotLeft = slotRect.left;
            var columns = slot.columns;
            var slotWidth = slotRect.width * fill - (columns - 1) * spacing - startOffset;
            var origin = slotLeft + startOffset;
            var eventWidth = slotWidth / columns;
            var slotEnd = origin + slotWidth + (columns - 1) * spacing;
            events.forEach(function (event) {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = origin + event.columnIndex * (eventWidth + spacing);
                    event.rect.width = event.lastColumn ? slotEnd - event.rect.left : eventWidth;
                    event.origin = {
                        left: slotLeft,
                        right: slotLeft + slotRect.width
                    };
                }
                // Expand the event to the last group slot
                var slotOffset = slot.end.getTime() <= event.item.endTime.getTime() ? slotRect.height : timeOffset(slot, event.item.endTime);
                event.rect.height = slotRect.top + slotOffset - event.rect.top;
            });
        });
        sorted.forEach(function (event) { return event.reflow(); });
    };
    SlotRange.prototype.initDaySlots = function (rowHeight, eventHeight) {
        var slots = this.slots;
        if (!slots.length) {
            return;
        }
        var _a = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findRowIndex), height = _a.height, slotItems = _a.slotItems;
        this.setSlotsHeight(height);
        this.slotItems = slotItems;
    };
    SlotRange.prototype.setDayOffsets = function () {
        if (!this.itemMap.count || !this.slotItems) {
            return;
        }
        setHorizontalOffsets(this.slotItems, this.items);
        this.slotItems = null;
    };
    SlotRange.prototype.setSlotsHeight = function (height) {
        this.firstSlot.height = height;
    };
    return SlotRange;
}());
export { SlotRange };
/**
 * @hidden
 */
var DayTimeResourceGroup = /** @class */ (function () {
    function DayTimeResourceGroup(index) {
        this.index = index;
        this.dayRanges = [];
        this.timeRanges = [];
    }
    DayTimeResourceGroup.prototype.registerSlot = function (slot) {
        var range = this.slotRange(slot);
        range.registerSlot(slot);
    };
    DayTimeResourceGroup.prototype.unregisterSlot = function (slot) {
        var range = this.slotRange(slot);
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            var ranges = this.slotRanges(slot);
            delete ranges[slot.id.rangeIndex];
        }
    };
    DayTimeResourceGroup.prototype.registerItem = function (component) {
        var range = this.itemRange(component);
        if (range) {
            range.registerItem(component);
            component.rangeIndex = range.index;
        }
        else {
            component.rangeIndex = undefined;
            component.toggle(false);
        }
    };
    DayTimeResourceGroup.prototype.unregisterItem = function (component, index) {
        if (component.rangeIndex !== undefined) {
            var ranges = component.item.isAllDay ? this.dayRanges : this.timeRanges;
            if (ranges[component.rangeIndex]) {
                ranges[component.rangeIndex].unregisterItem(component, index);
            }
            component.rangeIndex = undefined;
        }
    };
    DayTimeResourceGroup.prototype.forEachDateRange = function (callback) {
        for (var i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    };
    DayTimeResourceGroup.prototype.forEachTimeRange = function (callback) {
        for (var i = 0; i < this.timeRanges.length; i++) {
            callback(this.timeRanges[i]);
        }
    };
    DayTimeResourceGroup.prototype.slotRange = function (slot) {
        var ranges = this.slotRanges(slot);
        var rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    };
    DayTimeResourceGroup.prototype.slotRanges = function (slot) {
        return slot.isDaySlot ? this.dayRanges : this.timeRanges;
    };
    DayTimeResourceGroup.prototype.initTimeSlots = function (rowHeight, eventHeight, resourceRowHeight) {
        var slots = this.slots;
        if (!slots.length) {
            return;
        }
        var _a = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findTimeRowIndex), height = _a.height, slotItems = _a.slotItems;
        this.setSlotsHeight(Math.max(height, resourceRowHeight));
        this.slotItems = slotItems;
    };
    DayTimeResourceGroup.prototype.setTimelineOffsets = function () {
        var items = this.items;
        if (!this.slotItems || !items.length) {
            return;
        }
        setHorizontalOffsets(this.slotItems, items, true);
        this.slotItems = null;
    };
    DayTimeResourceGroup.prototype.setSlotsHeight = function (height) {
        //setting the first slot height should be sufficient
        this.timeRanges[0].setSlotsHeight(height);
    };
    Object.defineProperty(DayTimeResourceGroup.prototype, "items", {
        get: function () {
            return this.timeRanges.reduce(function (acc, range) { return acc.concat(range.items); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeResourceGroup.prototype, "slots", {
        get: function () {
            return this.timeRanges.reduce(function (acc, range) { return acc.concat(range.slots); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeResourceGroup.prototype, "hasSlots", {
        get: function () {
            return Boolean(this.dayRanges.find(function (range) { return range && range.hasSlots; }) || this.timeRanges.find(function (range) { return range && range.hasSlots; }));
        },
        enumerable: true,
        configurable: true
    });
    DayTimeResourceGroup.prototype.cleanRanges = function () {
        this.dayRanges = this.dayRanges.filter(function (r) { return Boolean(r); });
        this.timeRanges = this.timeRanges.filter(function (r) { return Boolean(r); });
    };
    DayTimeResourceGroup.prototype.itemRange = function (component) {
        var task = component.item;
        var ranges = task.isAllDay ? this.dayRanges : this.timeRanges;
        if (isNumber(task.rangeIndex)) {
            return ranges[task.rangeIndex];
        }
        return ranges.find(function (r) { return intersects(task.startTime, task.endTime, r.start, r.end); });
    };
    return DayTimeResourceGroup;
}());
export { DayTimeResourceGroup };
/**
 * @hidden
 */
var DayTimeSlotService = /** @class */ (function (_super) {
    tslib_1.__extends(DayTimeSlotService, _super);
    function DayTimeSlotService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayTimeSlotService.prototype.layoutDays = function (eventHeight) {
        if (eventHeight === void 0) { eventHeight = 25; }
        this.groups.forEach(function (group) {
            return group.forEachDateRange(function (range) { return range.slots.forEach(function (slot) {
                slot.element.nativeElement.style.height = '';
            }); });
        });
        var rowHeight = this.groups[0].dayRanges[0].slots[0].height;
        this.groups.forEach(function (group) {
            group.forEachDateRange(function (range) { return range.initDaySlots(rowHeight, eventHeight); });
        });
        this.groups.forEach(function (group) {
            group.forEachDateRange(function (range) { return range.setDayOffsets(); });
        });
    };
    DayTimeSlotService.prototype.layoutTimeline = function (eventHeight, resourceRows) {
        this.groups.forEach(function (group) {
            return group.forEachTimeRange(function (range) { return range.slots.forEach(function (slot) {
                slot.element.nativeElement.style.height = '';
            }); });
        });
        var rowHeight = this.groups[0].timeRanges[0].slots[0].height;
        this.groups.forEach(function (group, index) {
            group.initTimeSlots(rowHeight, eventHeight, resourceRows && resourceRows[index] ? resourceRows[index].nativeElement.children[0].children[0].offsetHeight : 0);
        });
        this.groups.forEach(function (group) {
            return group.setTimelineOffsets();
        });
    };
    DayTimeSlotService.prototype.layoutTimes = function (options) {
        this.groups.forEach(function (group) {
            return group.forEachTimeRange(function (range) { return range.layout(options); });
        });
    };
    DayTimeSlotService.prototype.forEachDateRange = function (callback) {
        this.groups.forEach(function (group, index) {
            callback(group.dayRanges[0], index);
        });
    };
    DayTimeSlotService.prototype.syncDateRanges = function () {
        var maxHeight = 0;
        this.groups.forEach(function (group) {
            var slot = group.dayRanges[0].firstSlot;
            if (slot) {
                maxHeight = Math.max(slot.rect.height - slot.padding, maxHeight);
            }
        });
        this.groups.forEach(function (group) {
            group.dayRanges[0].setSlotsHeight(maxHeight);
        });
        return maxHeight;
    };
    DayTimeSlotService.prototype.forEachGroup = function (callback) {
        this.groups.forEach(callback);
    };
    DayTimeSlotService.prototype.forEachSlot = function (callback) {
        this.groups.forEach(function (group) {
            group.dayRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
            group.timeRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
        });
    };
    DayTimeSlotService.prototype.createGroup = function (index) {
        return new DayTimeResourceGroup(index);
    };
    DayTimeSlotService.prototype.slotByIndex = function (slotIndex, allDay) {
        if (allDay === void 0) { allDay = false; }
        var _a = slotIndex.split(':').map(function (part) { return parseInt(part, 10); }), resourceIndex = _a[0], rangeIndex = _a[1], index = _a[2];
        return this.groups[resourceIndex][allDay ? 'dayRanges' : 'timeRanges'][rangeIndex].slots[index];
    };
    DayTimeSlotService.prototype.slotByPosition = function (x, y, isDaySlot, includeDayRanges) {
        var range;
        if (isDaySlot) {
            this.groups.find(function (group) {
                range = group.dayRanges.find(function (r) { return rectContainsX(r.rect, x); });
                return range;
            });
            if (range) {
                return range.slots.find(function (slot) { return rectContainsX(slot.rect, x); });
            }
        }
        else {
            this.groups.find(function (group) {
                if (includeDayRanges) {
                    range = group.dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
                }
                if (!range) {
                    range = group.timeRanges.find(function (r) { return rectContains(r.rect, x, y); });
                }
                return range;
            });
            if (range) {
                return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
            }
        }
    };
    DayTimeSlotService.prototype.groupSlotByPosition = function (currentSlot, x, y) {
        var group = this.groups[currentSlot.id.resourceIndex];
        var range;
        if (currentSlot.isDaySlot) {
            range = group.dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
        }
        else {
            range = group.timeRanges.find(function (r) { return rectContains(r.rect, x, y); });
        }
        if (range) {
            return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
        }
    };
    DayTimeSlotService.prototype.dragRanges = function (currentSlot, offset, timeRanges) {
        var start = new Date(currentSlot.start.getTime() - offset.start);
        var end = new Date(currentSlot.start.getTime() + offset.end);
        var group = this.groups[currentSlot.id.resourceIndex];
        var result;
        if (timeRanges) {
            var slotRanges_1 = [];
            group.timeRanges.forEach(function (range) {
                var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
                if (slots.length) {
                    slotRanges_1.push(slots);
                }
            });
            var lastRange = slotRanges_1[slotRanges_1.length - 1];
            result = [slotRanges_1[0][0], lastRange[lastRange.length - 1]];
        }
        else {
            result = group.slotRange(currentSlot).slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
        }
        return {
            start: start,
            end: end,
            ranges: [result]
        };
    };
    DayTimeSlotService.prototype.resizeRanges = function (currentSlot, task, resizeStart, offset) {
        var group = this.groups[currentSlot.id.resourceIndex];
        var ranges = task.isAllDay ? group.dayRanges : group.timeRanges;
        var result = [];
        var startDate = task.start.toUTCDate();
        var endDate = task.end.toUTCDate();
        var start, end;
        if (resizeStart) {
            var startTime = currentSlot.start.getTime() + offset.start;
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
        ranges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
            if (slots.length) {
                result.push(slots);
            }
        });
        return {
            start: start,
            end: end,
            ranges: result
        };
    };
    DayTimeSlotService.prototype.timePosition = function (date, resourceIndex, vertical) {
        var group = this.groups[resourceIndex];
        var range = group.timeRanges.find(function (r) { return dateInRange(date, r.start, r.end); });
        if (!range) {
            return;
        }
        var slot = range.slots.find(function (s) { return dateInRange(date, s.start, s.end); });
        if (slot) {
            var position = (vertical ? slot.height : slot.width) *
                ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
            return vertical ? slot.rect.top + position : slot.rect.left + position;
        }
    };
    DayTimeSlotService.prototype.findDateSlot = function (date, ranges, excludeEnd) {
        var result;
        ranges.forEach(function (range) {
            var slots = excludeEnd ? range.slots.filter(function (s) { return intersects(date, date, s.start, s.end); }) :
                range.slots.filter(function (s) { return dateInRange(date, s.start, s.end); });
            if (slots.length) {
                result = slots[0];
            }
        });
        return result;
    };
    return DayTimeSlotService;
}(BaseSlotService));
export { DayTimeSlotService };
export { ɵ0, ɵ1, ɵ2 };
