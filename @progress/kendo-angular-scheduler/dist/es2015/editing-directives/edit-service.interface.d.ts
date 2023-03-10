/**
 * A service which is used by the reactive and template editing directives of the Scheduler.
 * Used to persist the changes which are applied during editing.
 *
 * * [Custom Service]({% slug editing_directives_scheduler %}#toc-custom-service)
 * * [`BaseEditService`]({% slug api_scheduler_baseeditservice %})
 */
export interface EditService<TEvent> {
    /**
     * Creates a new event.
     *
     * @param event - The event that will be created.
     */
    create(event: TEvent): void;
    /**
     * Creates an exception to an existing recurring event. The `recurrenceId` field of the recurrence exception
     * or the custom field that is set by the model map will point to the master recurring event.
     *
     * @param event - The instance of the occurrence that will be removed from the series.
     * @param value - An object which contains the updated field values, for example, a form group value.
     */
    createException(event: TEvent, value: any): void;
    /**
     * Updates the specified event by copying the changed fields from the supplied `value` object.
     *
     * @param event - The event that will be updated.
     * @param value - An object which contains the new field values, for example, a form group value.
     */
    update(event: TEvent, value: any): void;
    /**
     * Removes a non-recurring event.
     *
     * @param event - A reference to the event that will be removed.
     */
    remove(event: TEvent): void;
    /**
     * Removes the recurrence series and exceptions, if any.
     *
     * @param event - Any event from the recurrence series.
     */
    removeSeries(event: TEvent): void;
    /**
     * Removes a single occurrence from a series of recurring events. The `recurrenceId` field of the occurrence
     * or the custom field which is set by a model map will point to the master recurring event.
     *
     * @param event - A reference to the occurrence.
     */
    removeOccurrence(event: TEvent): void;
    /**
     * Returns the master recurring event for a specified recurring event.
     *
     * @param event - An event from the recurrence series.
     * @returns the master recurring event for the series.
     */
    findRecurrenceMaster(event: TEvent): TEvent;
    /**
     * Checks if the event is part of the recurrence series.
     *
     * @param event - The event that will be checked.
     * @returns `true` if the event is an occurrence, an exception, or a master event. Otherwise, returns `false`.
     */
    isRecurring(event: TEvent): boolean;
    /**
     * Checks if the event is a recurrence exception.
     *
     * @param event - The event that will be checked.
     * @returns `true` if the event is a unique event which belongs to a recurrence series. Otherwise, returns `false`.
     */
    isException(event: TEvent): boolean;
}
