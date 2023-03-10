/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { BehaviorSubject } from 'rxjs';
import { DateInputComponent } from '../dateinput/dateinput.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { SelectionRangeEnd } from '../calendar/models/selection-range-end.type';
import { SelectionRange } from '../calendar/models/selection-range.interface';
/**
 * A service that handles the communication between the components that are placed inside the DateRangeComponent.
 * For example, the start and end `DateInput` and `DateRangePopup` components.
 */
export declare class DateRangeService {
    /**
     * An Observable instance that notifies when the `activeRangeEnd` state is changed.
     */
    activeRangeEnd$: BehaviorSubject<SelectionRangeEnd>;
    /**
     * An Observable instance that notifies when the `focusedDate` is changed.
     */
    focusedDate$: BehaviorSubject<Date>;
    /**
     * An Observable instance that notifies when the end `DateInput` component is changed.
     * For example, when a new end `DateInput` is attached or when the old one is detached.
     */
    endInput$: BehaviorSubject<DateInputComponent>;
    /**
     * An Observable instance that notifies when the start `DateInput` component is changed.
     * For example, when a new start `DateInput` is attached or the old one is detached.
     */
    startInput$: BehaviorSubject<DateInputComponent>;
    /**
     * An Observable instance that notifies when the `DateRangePopup` component is changed.
     */
    dateRangePopup$: BehaviorSubject<DateRangePopupComponent>;
    /**
     * An Observable instance that notifies when the state of the selection range is changed.
     */
    range$: BehaviorSubject<SelectionRange>;
    /**
     * Gets the current `activeRangeEnd` value.
     */
    readonly activeRangeEnd: SelectionRangeEnd;
    /**
     * Gets the current `focusedDate` value.
     */
    readonly focusedDate: Date;
    /**
     * Gets the `min` range value.
     * The `min` value is extracted from the `start` DateInput value or the `min` value of the Calendar.
     */
    readonly min: Date;
    /**
     * Gets the `max` range value.
     * The `max` value is extracted from the `end` DateInput value or the `max` value of the Calendar.
     */
    readonly max: Date;
    /**
     * Gets the current `selectionRange` value.
     */
    readonly selectionRange: SelectionRange;
    /**
     * Activates the registered `DateRangePopup` component.
     * The method opens the popup and focuses the calendar.
     */
    activatePopup(): void;
    /**
     * Deactivates the registered `DateRangePopup` component.
     * The method closes the popup.
     */
    deactivatePopup(): void;
    /**
     * @hidden
     *
     * Deactivates the registered `DateRangePopup` component and fires the `cancel` event.
     * The method closes the popup.
     */
    cancelPopup(): void;
    /**
     * Completes all observables to mitigate possible memory leaks.
     * Calls the method when a component that uses it is destroyed.
     */
    destroy(): void;
    /**
     * Returns `true` when an active component that is placed inside the `DateRangeComponent` is detected.
     * For example, the opened popup or the focused DateInput.
     *
     * @returns `true` if an active component is present.
     */
    hasActiveComponent(): boolean;
    /**
     * Registers a new start `DateInput` component. Notifies all `startInput$` listeners.
     */
    registerStartInput(startInput: DateInputComponent): void;
    /**
     * Registers a new end `DateInput` component. Notifies all `endInput$` listeners.
     */
    registerEndInput(endInput: DateInputComponent): void;
    /**
     * Registers a new `DateRangePopup` component. Notifies all `dateRangePopup$` listeners.
     */
    registerPopup(dateRangePopup: DateRangePopupComponent): void;
    /**
     * Updates the `activeRangeEnd` value. Notifies all `activeRangeEnd$` listeners.
     */
    setActiveRangeEnd(activeRange: SelectionRangeEnd): void;
    /**
     * Updates the focused date. Notifies all `focusedDate$` listeners.
     */
    setFocusedDate(value: Date): void;
    /**
     * Updates the selection range. Notifies all `range$` listeners.
     */
    setRange(range?: SelectionRange): void;
}
