import { DashType } from '../../common/property-types';
import { CategoryAxisCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The configuration options of the category axis crosshair.
 */
export interface CategoryAxisCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The dash type of the crosshair.
     *
     * The following dash types are supported:
     *
     * - `"dash"`&mdash;A line consisting of dashes.
     * - `"dashDot"`&mdash;A line consisting of a repeating pattern of dash-dot.
     * - `"dot"`&mdash;A line consisting of dots.
     * - `"longDash"`&mdash;A line consisting of a repeating pattern of long-dash.
     * - `"longDashDot"`&mdash;A line consisting of a repeating pattern of long-dash-dot.
     * - `"longDashDotDot"`&mdash;A line consisting of a repeating pattern of long-dash-dot-dot.
     * - `"solid"`&mdash;A solid line.
     */
    dashType?: DashType;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the category axis crosshair.
     * By default, the category axis crosshair is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The options of the crosshair tooltip.
     * The crosshair tooltip is displayed when the [`categoryAxis.crosshair.tooltip.visible`]({% slug api_charts_categoryaxiscrosshairtooltip %}#toc-visible) option is set to
     * `true`.
     */
    tooltip?: CategoryAxisCrosshairTooltip;
}
