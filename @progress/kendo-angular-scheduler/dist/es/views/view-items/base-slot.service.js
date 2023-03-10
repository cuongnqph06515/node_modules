import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var BaseSlotService = /** @class */ (function () {
    function BaseSlotService() {
        this.containerSize = 0;
        this.slotsChange = new EventEmitter();
        this.groups = [];
    }
    BaseSlotService.prototype.registerItem = function (component) {
        var group = this.itemGroup(component);
        group.registerItem(component);
    };
    BaseSlotService.prototype.unregisterItem = function (component, resourceIndex, index) {
        if (resourceIndex === void 0) { resourceIndex = component.resourceIndex; }
        if (index === void 0) { index = component.index; }
        var group = this.groups[resourceIndex];
        if (group) {
            group.unregisterItem(component, index);
        }
    };
    BaseSlotService.prototype.registerSlot = function (slot) {
        var group = this.slotGroup(slot);
        group.registerSlot(slot);
    };
    BaseSlotService.prototype.unregisterSlot = function (slot) {
        var group = this.groups[slot.id.resourceIndex];
        if (group) {
            group.unregisterSlot(slot);
        }
    };
    BaseSlotService.prototype.invalidate = function () {
        this.clearEmptyGroups();
        this.cleanRanges();
        this.slotsChange.emit();
        this.forEachSlot(function (slot) {
            slot.invalidate();
        });
    };
    BaseSlotService.prototype.cleanRanges = function () {
        this.groups.forEach(function (group) {
            group.cleanRanges();
        });
    };
    BaseSlotService.prototype.clearEmptyGroups = function () {
        var groups = this.groups;
        var index = this.groups.length - 1;
        while (index > 0 && !groups[index].hasSlots) {
            groups.splice(index, 1);
            index--;
        }
    };
    BaseSlotService.prototype.itemGroup = function (item) {
        var index = item.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    };
    BaseSlotService.prototype.slotGroup = function (slot) {
        var index = slot.id.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    };
    return BaseSlotService;
}());
export { BaseSlotService };
