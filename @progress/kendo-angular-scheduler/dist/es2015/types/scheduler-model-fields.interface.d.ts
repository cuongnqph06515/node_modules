/**
 * Defines the model fields that will be used for creating `SchedulerEvent` instances.
 */
export interface SchedulerModelFields {
    /**
     * The name of the `ID` model field.
     * Defaults to `"id"`.
     */
    id?: string;
    /**
     * The name of the start date model field.
     * Defaults to `"start"`.
     */
    start?: string;
    /**
     * The name of the start timezone model field.
     * Defaults to `"startTimezone"`.
     */
    startTimezone?: string;
    /**
     * The name of the end date model field.
     * Defaults to `"end"`.
     */
    end?: string;
    /**
     * The name of the end timezone model field.
     * Defaults to `"endTimezone"`.
     */
    endTimezone?: string;
    /**
     * The name of the all-day flag model field.
     * Defaults to `"isAllDay"`.
     */
    isAllDay?: string;
    /**
     * The name of the title model field.
     * Defaults to `"title"`.
     */
    title?: string;
    /**
     * The name of the description model field.
     * Defaults to `"title"`.
     */
    description?: string;
    /**
     * The name of the recurrence model field.
     * Defaults to `"recurrenceRule"`.
     */
    recurrenceRule?: string;
    /**
     * The name of the recurrence ID model field.
     * Defaults to `"recurrenceId"`.
     */
    recurrenceId?: any;
    /**
     * The name of the recurrence exceptions model field.
     * Defaults to `"recurrenceExceptions"`.
     */
    recurrenceExceptions?: string;
}
