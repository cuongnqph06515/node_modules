/**
 * Defines an event whose default action can be prevented
 * by calling the `preventDefault` method.
 *
 * @hidden
 */
export class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * If the event was prevented
     * by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}
