/**
 * @hidden
 */
export interface SlotID {
    resourceIndex: number;
    rangeIndex: number;
    index: number;
}
/**
 * @hidden
 */
export interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * @hidden
 */
export interface SlotDirective {
    start: Date;
    end: Date;
    rect: Rect;
    id: SlotID;
    key: string;
    invalidate(): void;
}
/**
 * @hidden
 */
export interface ViewItem {
    item: any;
    resourceIndex: number;
    index: number;
    rect: Rect;
}
/**
 * @hidden
 */
export interface ResourceGroup {
    hasSlots: boolean;
    registerSlot(slot: SlotDirective): void;
    unregisterSlot(slot: SlotDirective): void;
    registerItem(component: ViewItem): void;
    unregisterItem(component: ViewItem, index: number): void;
    cleanRanges(): void;
}
