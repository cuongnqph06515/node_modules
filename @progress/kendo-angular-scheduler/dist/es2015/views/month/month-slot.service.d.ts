import { SlotDirective, ResourceGroup } from '../view-items/types';
import { MonthViewItemComponent } from './month-view-item.component';
import { BaseSlotService } from '../view-items/base-slot.service';
/**
 * @hidden
 */
export declare class SlotRange {
    index: number;
    readonly slots: any[];
    readonly items: any[];
    private slotMap;
    private itemMap;
    readonly start: Date;
    readonly end: Date;
    readonly hasSlots: boolean;
    readonly hasItems: boolean;
    readonly firstSlot: any;
    readonly lastSlot: any;
    readonly rect: any;
    constructor(index: number);
    registerItem(component: MonthViewItemComponent): void;
    unregisterItem(component: MonthViewItemComponent, index: number): void;
    registerSlot(slot: any): void;
    unregisterSlot(slot: any): void;
    layout(eventHeight: number): void;
}
/**
 * @hidden
 */
export declare class MonthResourceGroup implements ResourceGroup {
    readonly index: number;
    dayRanges: SlotRange[];
    constructor(index: number);
    readonly hasSlots: boolean;
    registerSlot(slot: SlotDirective): void;
    unregisterSlot(slot: SlotDirective): void;
    registerItem(component: MonthViewItemComponent): void;
    unregisterItem(component: MonthViewItemComponent, index: number): void;
    slotRange(slot: SlotDirective): SlotRange;
    forEachRange(callback: (slot: SlotRange) => void): void;
    cleanRanges(): void;
}
/**
 * @hidden
 */
export declare class MonthSlotService extends BaseSlotService {
    layout(eventHeight: number): void;
    slotByIndex(slotIndex: string): any;
    forEachSlot(callback: any): void;
    createGroup(index: number): MonthResourceGroup;
    slotByPosition(x: any, y: any): any;
    dragRanges(currentSlot: any, offset: any): any;
    groupSlotByPosition(currentSlot: any, x: any, y: any): any;
    resizeRanges(currentSlot: any, task: any, resizeStart: boolean, offset: any): any;
}
