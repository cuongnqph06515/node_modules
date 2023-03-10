import { EventEmitter } from '@angular/core';
import { ResourceGroup, SlotDirective, ViewItem } from './types';
/**
 * @hidden
 */
export declare abstract class BaseSlotService {
    containerSize: number;
    slotsChange: EventEmitter<any>;
    protected groups: ResourceGroup[];
    abstract forEachSlot(callback: any): void;
    abstract createGroup(index: number): ResourceGroup;
    abstract resizeRanges(currentSlot: any, task: any, resizeStart: boolean, offset?: any): any;
    abstract groupSlotByPosition(currentSlot: any, x: number, y: number): any;
    registerItem(component: ViewItem): void;
    unregisterItem(component: ViewItem, resourceIndex?: number, index?: number): void;
    registerSlot(slot: SlotDirective): void;
    unregisterSlot(slot: SlotDirective): void;
    invalidate(): void;
    cleanRanges(): void;
    protected clearEmptyGroups(): void;
    protected itemGroup(item: ViewItem): ResourceGroup;
    protected slotGroup(slot: SlotDirective): ResourceGroup;
}
