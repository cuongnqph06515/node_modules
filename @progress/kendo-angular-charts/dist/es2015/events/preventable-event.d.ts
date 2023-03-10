import { BaseEvent } from './base-event';
/**
 * @hidden
 */
export declare abstract class PreventableEvent extends BaseEvent {
    private prevented;
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault(): void;
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented(): boolean;
}
