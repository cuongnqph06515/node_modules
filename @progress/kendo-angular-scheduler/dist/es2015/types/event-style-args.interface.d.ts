/**
 * The arguments for the `eventStyles` and `eventClass` functions.
 */
export interface EventStyleArgs {
    /**
     * Specifies if the event is an all-day event. Applicable for the day and week views.
     */
    isAllDay?: boolean;
    /**
     * The event resources.
     */
    resources?: any[];
    /**
     * The event.
     */
    event?: any;
}
