import { ChartComponent } from '../chart.component';
import { PreventableEvent } from './preventable-event';
import { AxisRange } from '../api-types/axis-range.interface';
/**
 * Arguments for the `zoomStart` event.
 */
export declare class ZoomStartEvent extends PreventableEvent {
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
