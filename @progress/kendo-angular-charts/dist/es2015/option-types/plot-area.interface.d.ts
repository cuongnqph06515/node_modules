import { Border, Margin, Padding } from '../common/property-types';
/**
 * The configuration options of the Chart plot area.
 */
export interface PlotArea {
    /**
     * The background color of the Chart plot area.
     * Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the plot area.
     */
    border?: Border;
    /**
     * The margin of the plot area. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The background opacity of the plot area. By default, the background is opaque.
     */
    opacity?: number;
    /**
     * The padding of the plot area. A numeric value sets all paddings.
     * The default padding for the Pie, Donut, Radar, and Polar Charts is proportional of the Chart size.
     */
    padding?: Padding | number;
}
