import { ValueAxisCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The configuration options of the value axis crosshair.
 */
export interface ValueAxisCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the value axis crosshair.
     * By default, the value axis crosshair is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The options of the crosshair tooltip.
     * The crosshair tooltip is displayed when the [`valueAxis.crosshair.tooltip.visible`]({% slug api_charts_valueaxiscrosshairtooltip %}#toc-visible)
     * option is set to `true`.
     */
    tooltip?: ValueAxisCrosshairTooltip;
}
