import { ChartComponent } from '../chart.component';
import { BaseEvent } from './base-event';
import { EventAxisOptions } from '../api-types/event-axis-options.interface';
/**
 * Arguments for the `axisLabelClick` event.
 */
export declare class AxisLabelClickEvent extends BaseEvent {
    /**
     * The axis options to which the label belongs.
     */
    axis: EventAxisOptions;
    /**
     * The original data item that is used to generate the label.
     * Available only for category axes which are populated from the `categoryField` of the series.
     */
    dataItem: any;
    /**
     * The label sequential or category index.
     */
    index: number;
    /**
     * The label text.
     */
    text: string;
    /**
     * The label value or category name.
     */
    value: any;
    /**
     * @hidden
     */
    constructor(e: any, sender: ChartComponent);
}
