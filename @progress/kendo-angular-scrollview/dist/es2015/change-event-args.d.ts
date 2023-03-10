/**
 * Arguments for the `itemChanged` event.
 * The `itemChanged` event fires when the current item is changed.
 */
export interface ItemChangedEvent {
    /**
     * The changed item.
     */
    item: any;
    /**
     * The index of the changed item.
     */
    index: number;
}
