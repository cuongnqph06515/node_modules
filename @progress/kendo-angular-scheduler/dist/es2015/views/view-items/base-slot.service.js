import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class BaseSlotService {
    constructor() {
        this.containerSize = 0;
        this.slotsChange = new EventEmitter();
        this.groups = [];
    }
    registerItem(component) {
        const group = this.itemGroup(component);
        group.registerItem(component);
    }
    unregisterItem(component, resourceIndex = component.resourceIndex, index = component.index) {
        const group = this.groups[resourceIndex];
        if (group) {
            group.unregisterItem(component, index);
        }
    }
    registerSlot(slot) {
        const group = this.slotGroup(slot);
        group.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const group = this.groups[slot.id.resourceIndex];
        if (group) {
            group.unregisterSlot(slot);
        }
    }
    invalidate() {
        this.clearEmptyGroups();
        this.cleanRanges();
        this.slotsChange.emit();
        this.forEachSlot(slot => {
            slot.invalidate();
        });
    }
    cleanRanges() {
        this.groups.forEach(group => {
            group.cleanRanges();
        });
    }
    clearEmptyGroups() {
        const groups = this.groups;
        let index = this.groups.length - 1;
        while (index > 0 && !groups[index].hasSlots) {
            groups.splice(index, 1);
            index--;
        }
    }
    itemGroup(item) {
        const index = item.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    }
    slotGroup(slot) {
        const index = slot.id.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    }
}
