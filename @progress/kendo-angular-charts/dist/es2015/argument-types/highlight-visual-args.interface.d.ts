import { ChartComponent } from '../chart.component';
import { drawing, geometry } from '@progress/kendo-drawing';
/**
 * The context for the point highlight visual function.
 */
export interface HighlightVisualArgs {
    /**
     * The point category.
     */
    category: any;
    /**
     * A function that can be used to get the default visual.
     */
    createVisual: () => drawing.Element;
    /**
     * The point data item.
     */
    dataItem: any;
    /**
     * The point options.
     */
    options: any;
    /**
     * The point value represented as a percentage value.
     * Available only for the Donut, Pie, and 100% stacked series.
     */
    percentage?: number;
    /**
     * The rectangle that defines the normal position of the visual.
     */
    rect: geometry.Rect;
    /**
     * The sum of point values since the last `runningTotal`
     * summary point.
     * Available for the Waterfall series.
     */
    runningTotal?: number;
    /**
     * The instance of the Chart component.
     */
    sender: ChartComponent;
    /**
     * The point series.
     */
    series: any;
    /**
     * The sum of all previous series values.
     * Available for the Waterfall series.
     */
    total?: number;
    /**
     * The point value.
     */
    value: any;
}
