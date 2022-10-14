/**
 * Describes the relative position of an event to focus.
 */
export interface FocusPosition {
    /**
     * The offset of the focused event in relation to the current event.
     * For example, `1` focuses the next event and `-1` focuses the previous one.
     */
    offset?: number;
    /**
     * A flag that indicates whether the focus will stop at the first and the last event instead of wrapping around.
     */
    nowrap?: boolean;
}
