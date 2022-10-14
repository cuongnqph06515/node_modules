import { ElementRef } from '@angular/core';
import { SchedulerEvent } from './scheduler-event';
/**
 * Represents a Scheduler slot.
 */
export interface SchedulerSlot {
    /**
     * The slot event. Applicable for the **Agenda** view.
     */
    event?: SchedulerEvent;
    /**
     * The slot resources.
     */
    resources?: any[];
    /**
     * The slot element.
     */
    element?: ElementRef;
    /**
     * Specifies if the slot is an all-day slot.
     */
    isAllDay?: boolean;
    /**
     * The start date of the slot.
     */
    start?: Date;
    /**
     * The end date of the slot.
     */
    end?: Date;
}
