import { AxisLine, AxisTicks, GridLines, PlotBand } from '../common/property-types';
import { ValueAxisCrosshair } from './value-axis-item/crosshair.interface';
import { ValueAxisLabels } from './value-axis-item/labels.interface';
import { ValueAxisNotes } from './value-axis-item/notes.interface';
import { ValueAxisTitle } from './value-axis-item/title.interface';
/**
 * The configuration options of the value axis.
 */
export interface ValueAxis {
    /**
     * * (Only for objects) The value at which the category axis crosses this axis.
     * * (Only for arrays) The value indices at which the category axes cross the value axis.
     * * (Only for dates) The date at which the category axis crosses this axis.
     */
    axisCrossingValue?: any | any[];
    /**
     * The background color of the axis.
     */
    background?: string;
    /**
     * The color of the value axis. Accepts a valid CSS color string, including hex and rgb.
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
     * The configuration of the value axis major ticks.
     */
    majorTicks?: AxisTicks;
    /**
     * The interval between major divisions.
     * If [`valueAxis.type`]({% slug api_charts_valueaxis %}#toc-type) is set to `"log"`, the `majorUnit` value is used for the base of the
     * logarithm.
     */
    majorUnit?: number;
    /**
     * The maximum value of the axis.
     */
    max?: any;
    /**
     * The minimum value of the axis.
     */
    min?: any;
    /**
     * The configuration of the minor grid lines.
     * These are the lines that are an extension of the minor ticks through the body of the Chart.
     */
    minorGridLines?: GridLines;
    /**
     * The configuration of the value axis minor ticks.
     */
    minorTicks?: AxisTicks;
    /**
     * The interval between minor divisions. It defaults to one-fifth (1/5) of the [`valueAxis.majorUnit`]({% slug api_charts_valueaxis %}#toc-majorunit).
     * If [`valueAxis.type`]({% slug api_charts_valueaxis %}#toc-type) is set to `"log"`, the `minorUnit` value represents the number of divisions
     * between two major units and defaults to the major unit minus one.
     */
    minorUnit?: number;
    /**
     * The unique axis name. Used to associate a series with a value axis by using the [`series.axis`]({% slug api_charts_series %}#toc-axis) option.
     */
    name?: string;
    /**
     * If set to `true`, the Chart prevents the automatic axis range from snapping to zero.
     * Setting it to `false` forces the automatic axis range to snap to zero.
     */
    narrowRange?: boolean;
    /**
     * The name of the pane that the value axis has to be rendered in.
     * If not set, the axis is rendered in the first (default) pane.
     */
    pane?: string;
    /**
     * The plot bands of the value axis.
     */
    plotBands?: PlotBand[];
    /**
     * If set to `true`, the value axis direction is reversed.
     * By default, the categories are listed from left to right and from bottom to top.
     *
     * > Radar and Polar Charts do not support reverse value axes.
     */
    reverse?: boolean;
    /**
     * The axis type.
     *
     * The supported values are:
     *
     * - `"numeric"`&mdash;Numeric axis.
     * - `"log"`&mdash;Logarithmic axis.
     */
    type?: 'numeric' | 'log';
    /**
     * If set to `true`, the Chart displays the value axis. By default, the value axis is visible.
     */
    visible?: boolean;
    /**
     * The crosshair configuration options.
     *
     * The crosshair is displayed when the [`valueAxis.crosshair.visible`]({% slug api_charts_valueaxiscrosshair %}#toc-visible) option is set to `true`.
     */
    crosshair?: ValueAxisCrosshair;
    /**
     * The axis labels configuration.
     */
    labels?: ValueAxisLabels;
    /**
     * The value axis notes configuration.
     */
    notes?: ValueAxisNotes;
    /**
     * The title configuration of the value axis.
     *
     * To display the title, set the [`valueAxis.title.text`]({% slug api_charts_valueaxistitle %}#toc-text) option.
     */
    title?: ValueAxisTitle;
}
