import { SchedulerComponent } from '../scheduler.component';
/**
 * Arguments for the `eventKeydown` event.
 */
export declare class EventKeydownEvent {
    /**
     * The original Scheduler event.
     */
    event: any;
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
