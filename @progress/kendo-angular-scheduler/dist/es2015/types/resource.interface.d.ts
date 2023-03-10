/**
 * An interface for the resources of the Scheduler.
 */
export interface Resource {
    /**
     * The resource name. If not set, the value of the `field` option is used.
     */
    name?: string;
    /**
     * The field name of the event that contains the resource value.
     */
    field: string;
    /**
     * The resource data.
     */
    data: any[];
    /**
     * The field name from the data that contains the resource value.
     */
    valueField: string;
    /**
     * The field name from the data that contains the resource text.
     */
    textField: string;
    /**
     * The field name from the data that contains the resource color.
     */
    colorField?: string;
    /**
     * Specifies if the events have multiple resource values.
     */
    multiple?: boolean;
}
