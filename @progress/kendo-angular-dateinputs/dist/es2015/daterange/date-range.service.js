/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EMPTY_SELECTIONRANGE } from '../calendar/models/selection-range.interface';
import { isEqual } from '@progress/kendo-date-math';
const isActive = (cmp) => (cmp && cmp.isActive) || false;
const ɵ0 = isActive;
const hasActiveContent = (popup) => popup && popup.hasActiveContent();
const ɵ1 = hasActiveContent;
/**
 * A service that handles the communication between the components that are placed inside the DateRangeComponent.
 * For example, the start and end `DateInput` and `DateRangePopup` components.
 */
export class DateRangeService {
    constructor() {
        /**
         * An Observable instance that notifies when the `activeRangeEnd` state is changed.
         */
        this.activeRangeEnd$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the `focusedDate` is changed.
         */
        this.focusedDate$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the end `DateInput` component is changed.
         * For example, when a new end `DateInput` is attached or when the old one is detached.
         */
        this.endInput$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the start `DateInput` component is changed.
         * For example, when a new start `DateInput` is attached or the old one is detached.
         */
        this.startInput$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the `DateRangePopup` component is changed.
         */
        this.dateRangePopup$ = new BehaviorSubject(null);
        /**
         * An Observable instance that notifies when the state of the selection range is changed.
         */
        this.range$ = new BehaviorSubject(EMPTY_SELECTIONRANGE);
    }
    /**
     * Gets the current `activeRangeEnd` value.
     */
    get activeRangeEnd() {
        return this.activeRangeEnd$.value;
    }
    /**
     * Gets the current `focusedDate` value.
     */
    get focusedDate() {
        return this.focusedDate$.value;
    }
    /**
     * Gets the `min` range value.
     * The `min` value is extracted from the `start` DateInput value or the `min` value of the Calendar.
     */
    get min() {
        return (this.startInput$.value || {}).min || null;
    }
    /**
     * Gets the `max` range value.
     * The `max` value is extracted from the `end` DateInput value or the `max` value of the Calendar.
     */
    get max() {
        return (this.endInput$.value || {}).max || null;
    }
    /**
     * Gets the current `selectionRange` value.
     */
    get selectionRange() {
        return this.range$.value;
    }
    /**
     * Activates the registered `DateRangePopup` component.
     * The method opens the popup and focuses the calendar.
     */
    activatePopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!dateRangePopup) {
            return;
        }
        dateRangePopup.activate();
    }
    /**
     * Deactivates the registered `DateRangePopup` component.
     * The method closes the popup.
     */
    deactivatePopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.show = false;
    }
    /**
     * @hidden
     *
     * Deactivates the registered `DateRangePopup` component and fires the `cancel` event.
     * The method closes the popup.
     */
    cancelPopup() {
        const dateRangePopup = this.dateRangePopup$.value;
        if (!(dateRangePopup && dateRangePopup.show)) {
            return;
        }
        dateRangePopup.cancelPopup();
    }
    /**
     * Completes all observables to mitigate possible memory leaks.
     * Calls the method when a component that uses it is destroyed.
     */
    destroy() {
        this.activeRangeEnd$.complete();
        this.dateRangePopup$.complete();
        this.focusedDate$.complete();
        this.endInput$.complete();
        this.startInput$.complete();
        this.range$.complete();
    }
    /**
     * Returns `true` when an active component that is placed inside the `DateRangeComponent` is detected.
     * For example, the opened popup or the focused DateInput.
     *
     * @returns `true` if an active component is present.
     */
    hasActiveComponent() {
        const popup = this.dateRangePopup$.value;
        const isPopup = isActive(popup);
        const isStart = isActive(this.startInput$.value);
        const isEnd = isActive(this.endInput$.value);
        return isPopup || isStart || isEnd || hasActiveContent(popup) || false;
    }
    /**
     * Registers a new start `DateInput` component. Notifies all `startInput$` listeners.
     */
    registerStartInput(startInput) {
        this.startInput$.next(startInput);
    }
    /**
     * Registers a new end `DateInput` component. Notifies all `endInput$` listeners.
     */
    registerEndInput(endInput) {
        this.endInput$.next(endInput);
    }
    /**
     * Registers a new `DateRangePopup` component. Notifies all `dateRangePopup$` listeners.
     */
    registerPopup(dateRangePopup) {
        this.dateRangePopup$.next(dateRangePopup);
    }
    /**
     * Updates the `activeRangeEnd` value. Notifies all `activeRangeEnd$` listeners.
     */
    setActiveRangeEnd(activeRange) {
        if (!activeRange || this.activeRangeEnd === activeRange) {
            return;
        }
        this.activeRangeEnd$.next(activeRange);
    }
    /**
     * Updates the focused date. Notifies all `focusedDate$` listeners.
     */
    setFocusedDate(value) {
        if (isEqual(this.focusedDate$.value, value)) {
            return;
        }
        this.focusedDate$.next(value);
    }
    /**
     * Updates the selection range. Notifies all `range$` listeners.
     */
    setRange(range = EMPTY_SELECTIONRANGE) {
        this.range$.next(range);
    }
}
DateRangeService.decorators = [
    { type: Injectable },
];
export { ɵ0, ɵ1 };
