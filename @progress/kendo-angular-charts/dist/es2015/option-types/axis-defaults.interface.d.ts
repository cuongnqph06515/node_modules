import { AxisLine, AxisTicks, GridLines, PlotBand } from '../common/property-types';
import { AxisDefaultsCrosshair } from './axis-defaults/crosshair.interface';
import { AxisDefaultsLabels } from './axis-defaults/labels.interface';
import { AxisDefaultsTitle } from './axis-defaults/title.interface';
/**
 * The configuration options of the axis.
 */
export interface AxisDefaults {
    /**
     * The background color of the axis.
     */
    background?: string;
    /**
     * The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
     */
    line?: AxisLine;
    /**
     * The configuration of the major grid lines.
     * These are the lines that are an extension of the major ticks through the body of the Chart.
     */
    majorGridLines?: GridLines;
    /**
     * The configuration of the axis major ticks.
     */
    majorTicks?: AxisTicks;
    /**
     * The configuration of the minor grid lines.
     * These are the lines that are an extension of the minor ticks through the body of the Chart.
     */
    minorGridLines?: GridLines;
    /**
     * The configuration of the axis minor ticks.
     */
    minorTicks?: AxisTicks;
    /**
     * If set to `true`, the Chart prevents the axis range from snapping to zero.
     * Setting it to `false`, forces the axis range to snap to zero.
     */
    narrowRange?: boolean;
    /**
     * The name of the pane in which the axis has to be rendered.
     * If not set, the axis will be rendered in the first (default) pane.
     */
    pane?: string;
    /**
     * The plot bands of the axis.
     */
    plotBands?: PlotBand[];
    /**
     * If set to `true`, the axis direction is reversed. By default, categories are listed from left to
     * right and from bottom to top.
     */
    reverse?: boolean;
    /**
     * The angle (degrees) of the first category on the axis.
     * Angles increase clockwise with zero to the left. Negative values are acceptable.
     */
    startAngle?: number;
    /**
     * If set to `true`, the Chart displays the axis. By default, the axis is visible.
     */
    visible?: boolean;
    /**
     * The crosshair configuration options.
     * The crosshair is displayed when the [`axisDefaults.crosshair.visible`]({% slug api_charts_axisdefaultscrosshair %}#toc-visible) option is set to `true`.
     */
    crosshair?: AxisDefaultsCrosshair;
    /**
     * The configuration of the axis labels.
     */
    labels?: AxisDefaultsLabels;
    /**
     * The title configuration of the axis.
     * To display the title, set the [`axisDefaults.title.text`]({% slug api_charts_axisdefaultstitle %}#toc-text) option.
     */
    title?: AxisDefaultsTitle;
}
