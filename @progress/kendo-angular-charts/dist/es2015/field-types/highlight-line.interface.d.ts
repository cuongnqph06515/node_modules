import { DashType } from './dash-type';
/**
 * The appearance settings for the highlight line of the Candlestick and OHLC series.
 */
export interface HighlightLine {
    /**
     * The color of the highlighted line. Accepts a valid CSS color string, including hex and rgb.
     * The default color is computed from the base-point color.
     */
    color?: string;
    /**
     * The dash type of the line.
     */
    dashType?: DashType;
    /**
     * The opacity of the line. By default, the border is opaque (`opacity = 1`).
     */
    opacity?: number;
    /**
     * The width of the line in pixels.
     */
    width?: number;
}
