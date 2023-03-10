import { SchedulerComponent } from '../scheduler.component';
/**
 * Arguments for the `create` event.
 */
export declare class CreateEvent {
    /**
     * The start date of the slot.
     */
    start: Date;
    /**
     * The end date of the slot.
     */
    end: Date;
    /**
     * Indicates if the slot is all-day.
     */
    isAllDay: boolean;
    /**
     * The resources of the slot.
     */
    resources: any[];
    /**
     * The original DOM event.
     */
    originalEvent: any;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
