/**
 * The context for the legend label content function.
 */
export interface LegendLabelsContentArgs {
    /**
     * The text of the legend item.
     */
    text: string;
    /**
     * The series configuration object.
     */
    series: any;
    /**
     * The point value of the Donut and Pie charts.
     */
    value?: any;
    /**
     * The point value represented as a percentage value.
     * Available only for the Donut, Pie, and Funnel charts.
     */
    percentage?: number;
    /**
     * The point dataItem.
     * Available only for the Donut, Pie, and Funnel charts.
     */
    dataItem?: any;
}
