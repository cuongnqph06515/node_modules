"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../utils");
var item_map_1 = require("../view-items/item-map");
var base_slot_service_1 = require("../view-items/base-slot.service");
var constants_1 = require("../constants");
//better try to measure this one
var MORE_BUTTON_HEIGHT = 13;
var EVENT_OFFSET = 2;
/**
 * @hidden
 */
var SlotRange = /** @class */ (function () {
    function SlotRange(index) {
        this.index = index;
        this.slotMap = new item_map_1.ItemMap();
        this.itemMap = new item_map_1.ItemMap();
    }
    Object.defineProperty(SlotRange.prototype, "slots", {
        get: function () {
            return this.slotMap.toArray();
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
            return utils_1.addUTCDays(last.end, 1);
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
    SlotRange.prototype.layout = function (eventHeight) {
        if (!this.hasItems) {
            return;
        }
        var items = this.items;
        var sorted = kendo_data_query_1.orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        var slotItems = {};
        var slots = this.slots;
        sorted.forEach(function (event) { return slots
            .filter(function (slot) { return utils_1.intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
            .forEach(function (slot) {
            var value = slotItems[slot.key] = slotItems[slot.key] || { events: [], height: slot.linkHeight };
            value.slot = slot;
            var rect = slot.rect;
            var data = event.item.data[event.resourceIndex];
            data.rowIndex = utils_1.findRowIndex(value.events, data);
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
                event.rect.width += rect.width + constants_1.BORDER_WIDTH;
                value.height += eventHeight + EVENT_OFFSET;
            }
        }); });
        sorted.forEach(function (event) {
            if (event.rect) {
                event.rect.width -= constants_1.BORDER_WIDTH;
            }
            event.reflow();
        });
    };
    return SlotRange;
}());
exports.SlotRange = SlotRange;
/**
 * @hidden
 */
var MonthResourceGroup = /** @class */ (function () {
    function MonthResourceGroup(index) {
        this.index = index;
        this.dayRanges = [];
    }
    Object.defineProperty(MonthResourceGroup.prototype, "hasSlots", {
        get: function () {
            return Boolean(this.dayRanges.find(function (range) { return range && range.hasSlots; }));
        },
        enumerable: true,
        configurable: true
    });
    MonthResourceGroup.prototype.registerSlot = function (slot) {
        var range = this.slotRange(slot);
        range.registerSlot(slot);
    };
    MonthResourceGroup.prototype.unregisterSlot = function (slot) {
        var range = this.dayRanges[slot.id.rangeIndex];
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            delete this.dayRanges[slot.id.rangeIndex];
        }
    };
    MonthResourceGroup.prototype.registerItem = function (component) {
        var range = this.dayRanges[component.item.rangeIndex];
        range.registerItem(component);
    };
    MonthResourceGroup.prototype.unregisterItem = function (component, index) {
        var range = this.dayRanges[component.item.rangeIndex];
        if (range) {
            range.unregisterItem(component, index);
        }
    };
    MonthResourceGroup.prototype.slotRange = function (slot) {
        var ranges = this.dayRanges;
        var rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    };
    MonthResourceGroup.prototype.forEachRange = function (callback) {
        for (var i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    };
    MonthResourceGroup.prototype.cleanRanges = function () {
        this.dayRanges = this.dayRanges.filter(function (r) { return Boolean(r); });
    };
    return MonthResourceGroup;
}());
exports.MonthResourceGroup = MonthResourceGroup;
/**
 * @hidden
 */
var MonthSlotService = /** @class */ (function (_super) {
    tslib_1.__extends(MonthSlotService, _super);
    function MonthSlotService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthSlotService.prototype.layout = function (eventHeight) {
        this.groups.forEach(function (group) {
            return group.forEachRange(function (range) { return range.layout(eventHeight); });
        });
    };
    MonthSlotService.prototype.slotByIndex = function (slotIndex) {
        var _a = slotIndex.split(':').map(function (part) { return parseInt(part, 10); }), resourceIndex = _a[0], rangeIndex = _a[1], index = _a[2];
        return this.groups[resourceIndex].dayRanges[rangeIndex].slots[index];
    };
    MonthSlotService.prototype.forEachSlot = function (callback) {
        this.groups.forEach(function (group) {
            group.dayRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
        });
    };
    MonthSlotService.prototype.createGroup = function (index) {
        return new MonthResourceGroup(index);
    };
    MonthSlotService.prototype.slotByPosition = function (x, y) {
        var range;
        this.groups.find(function (group) {
            range = group.dayRanges.find(function (r) { return utils_1.rectContains(r.rect, x, y); });
            return range;
        });
        if (range) {
            return range.slots.find(function (slot) { return utils_1.rectContains(slot.rect, x, y); });
        }
    };
    MonthSlotService.prototype.dragRanges = function (currentSlot, offset) {
        var start = new Date(currentSlot.start.getTime() - offset.start);
        var end = new Date(currentSlot.start.getTime() + offset.end);
        var group = this.groups[currentSlot.id.resourceIndex];
        var ranges = [];
        group.dayRanges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return utils_1.intersects(start, end, s.start, s.end); });
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: start,
            end: end,
            ranges: ranges
        };
    };
    MonthSlotService.prototype.groupSlotByPosition = function (currentSlot, x, y) {
        var range = this.groups[currentSlot.id.resourceIndex].dayRanges.find(function (r) { return utils_1.rectContains(r.rect, x, y); });
        if (range) {
            return range.slots.find(function (slot) { return utils_1.rectContains(slot.rect, x, y); });
        }
    };
    MonthSlotService.prototype.resizeRanges = function (currentSlot, task, resizeStart, offset) {
        var group = this.groups[task.resources[0].leafIdx];
        var ranges = [];
        var startDate = task.start.toUTCDate();
        var endDate = task.end.toUTCDate();
        var start, end;
        if (resizeStart) {
            start = currentSlot.start.getTime() + offset.start;
            if (start > endDate.getTime()) {
                start = new Date(Math.min(utils_1.dateWithTime(endDate, startDate).getTime(), endDate.getTime()));
            }
            end = endDate;
        }
        else {
            start = startDate;
            end = currentSlot.start.getTime() + offset.end;
            if (end < start.getTime()) {
                end = new Date(Math.max(utils_1.dateWithTime(startDate, endDate).getTime(), start.getTime()));
            }
        }
        group.dayRanges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return utils_1.intersects(start, end, s.start, s.end); });
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: new Date(start),
            end: new Date(end),
            ranges: ranges
        };
    };
    return MonthSlotService;
}(base_slot_service_1.BaseSlotService));
exports.MonthSlotService = MonthSlotService;
