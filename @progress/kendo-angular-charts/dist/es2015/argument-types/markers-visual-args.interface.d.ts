import { ChartComponent } from '../chart.component';
import { drawing, geometry } from '@progress/kendo-drawing';
/**
 * The context for the markers visual function.
 */
export interface MarkersVisualArgs {
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
     * The marker options.
     */
    options: any;
    /**
     * The rectangle that defines the normal position of the visual.
     */
    rect: geometry.Rect;
    /**
     * The instance of the Chart component.
     */
    sender: ChartComponent;
    /**
     * The point series.
     */
    series: any;
    /**
     * The point value.
     */
    value: any;
}
