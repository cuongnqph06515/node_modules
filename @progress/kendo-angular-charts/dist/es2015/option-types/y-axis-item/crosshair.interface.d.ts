import { YAxisCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The configuration options of the Y-axis crosshair.
 */
export interface YAxisCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the Y-axis crosshair of the Scatter Chart.
     * By default, the Y-axis crosshair of the Scatter Chart is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The options of the crosshair tooltip.
     * The crosshair tooltip is displayed when the [`yAxis.crosshair.tooltip.visible`]({% slug api_charts_yaxiscrosshairtooltip %}#toc-visible) option is set to `true`.
     */
    tooltip?: YAxisCrosshairTooltip;
}
