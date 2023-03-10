import { ResourceGroup, SlotDirective } from '../view-items/types';
import { BaseSlotService } from '../view-items/base-slot.service';
/** @hidden */
export declare class SlotRange {
    index: number;
    readonly slots: any[];
    readonly firstSlot: any;
    readonly lastSlot: any;
    readonly items: any[];
    readonly rect: any;
    private slotMap;
    private itemMap;
    private slotItems;
    readonly start: Date;
    readonly end: Date;
    readonly hasSlots: boolean;
    readonly hasItems: boolean;
    constructor(index: number);
    registerItem(component: any): void;
    unregisterItem(component: any, index: number): void;
    registerSlot(slot: any): void;
    unregisterSlot(slot: any): void;
    layout(options: any): void;
    initDaySlots(rowHeight: number, eventHeight: number): void;
    setDayOffsets(): void;
    setSlotsHeight(height: number): void;
}
/**
 * @hidden
 */
export declare class DayTimeResourceGroup implements ResourceGroup {
    readonly index: number;
    dayRanges: SlotRange[];
    timeRanges: SlotRange[];
    private slotItems;
    constructor(index: number);
    registerSlot(slot: SlotDirective): void;
    unregisterSlot(slot: SlotDirective): void;
    registerItem(component: any): void;
    unregisterItem(component: any, index: number): void;
    forEachDateRange(callback: (slot: SlotRange) => void): void;
    forEachTimeRange(callback: (slot: SlotRange) => void): void;
    slotRange(slot: any): SlotRange;
    slotRanges(slot: any): SlotRange[];
    initTimeSlots(rowHeight: number, eventHeight: number, resourceRowHeight: any): void;
    setTimelineOffsets(): void;
    setSlotsHeight(height: number): void;
    readonly items: any[];
    readonly slots: any[];
    readonly hasSlots: boolean;
    cleanRanges(): void;
    private itemRange;
}
/**
 * @hidden
 */
export declare class DayTimeSlotService extends BaseSlotService {
    layoutDays(eventHeight?: number): void;
    layoutTimeline(eventHeight: number, resourceRows: any[]): void;
    layoutTimes(options: any): void;
    forEachDateRange(callback: any): void;
    syncDateRanges(): number;
    forEachGroup(callback: any): void;
    forEachSlot(callback: any): void;
    createGroup(index: number): DayTimeResourceGroup;
    slotByIndex(slotIndex: string, allDay?: boolean): any;
    slotByPosition(x: any, y: any, isDaySlot?: boolean, includeDayRanges?: boolean): any;
    groupSlotByPosition(currentSlot: any, x: any, y: any): any;
    dragRanges(currentSlot: any, offset: any, timeRanges?: boolean): any;
    resizeRanges(currentSlot: any, task: any, resizeStart: boolean, offset?: any): any;
    timePosition(date: Date, resourceIndex: number, vertical: boolean): number;
    private findDateSlot;
}
