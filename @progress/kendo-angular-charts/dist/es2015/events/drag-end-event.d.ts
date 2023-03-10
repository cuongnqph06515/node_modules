import { ChartComponent } from '../chart.component';
import { BaseEvent } from './base-event';
import { AxisRange } from '../api-types/axis-range.interface';
/**
 * Arguments for the `dragEnd` event.
 */
export declare class DragEndEvent extends BaseEvent {
    /**
     * A dictionary which contains the range (min and max values) of named axes.
     * The axis name is used as a key.
     */
    axisRanges: {
        [name: string]: AxisRange;
    };
    /**
     * The original user event that triggered the drag action.
     */
    originalEvent: any;
    /**
     * @hidden
     */
    constructor(e: any, sender: ChartComponent);
}
