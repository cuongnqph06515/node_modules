import { AxisLine, AxisTicks, BaseUnit, GridLines, PlotBand, WeekStartDay } from '../common/property-types';
import { XAxisCrosshair } from './x-axis-item/crosshair.interface';
import { XAxisLabels } from './x-axis-item/labels.interface';
import { XAxisNotes } from './x-axis-item/notes.interface';
import { XAxisTitle } from './x-axis-item/title.interface';
/**
 * The configuration options of the X-axis.
 */
export interface XAxis {
    /**
     * * (Only for objects) The value at which the Y axis crosses this axis.
     * * (Only for arrays) The value indices at which the y axes cross the value axis.
     * * (Only for dates) The date at which the Y axis crosses this axis.
     *
     * To denote the far end of the axis, set a value that is greater than or equal to the axis maximum value.
     */
    axisCrossingValue?: any | any[];
    /**
     * The background color of the axis.
     */
    background?: string;
    /**
     * The base time interval for the axis labels.
     * The default `baseUnit` is automatically determined from the value range.
     *
     * The available options are:
     *
     * - milliseconds
     * - seconds
     * - minutes
     * - hours
     * - days
     * - weeks
     * - months
     * - years
     */
    baseUnit?: BaseUnit;
    /**
     * The color of the axis. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
     */
    line?: AxisLine;
    /**
     * The configuration of the major grid lines. These are the lines that are an extension of the major
     * ticks through the body of the Chart.
     */
    majorGridLines?: GridLines;
    /**
     * The configuration of the Scatter Chart X-axis major ticks.
     */
    majorTicks?: AxisTicks;
    /**
     * The interval between major divisions.
     * If this is a date axis, the value represents the number of [`xAxis.baseUnits`]({% slug api_charts_xaxis %}#toc-baseunit) between major divisions.
     * If [`xAxis.type`]({% slug api_charts_xaxis %}#toc-type) is set to `"log"`, the `majorUnit` value is used for the base of the logarithm.
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
     * The configuration of the minor grid lines. These are the lines that are an extension of the minor
     * ticks through the body of the Chart.
     */
    minorGridLines?: GridLines;
    /**
     * The configuration of the X-axis minor ticks.
     */
    minorTicks?: AxisTicks;
    /**
     * The interval between minor divisions. It defaults to 1/5 of the [`xAxis.majorUnit`]({% slug api_charts_xaxis %}#toc-majorunit).
     * If [`xAxis.type`]({% slug api_charts_xaxis %}#toc-type) is set to `"log"`, the `minorUnit` value represents the number of divisions between
     * two major units and defaults to the major unit minus one.
     */
    minorUnit?: number;
    /**
     * The unique axis name. Used to associate a series with a X axis by using the [`series.xAxis`]({% slug api_charts_series %}#toc-xaxis) option.
     */
    name?: string;
    /**
     * If set to `true`, the Chart prevents the automatic axis range from snapping to zero.
     * Setting it to `false` forces the automatic axis range to snap to zero.
     */
    narrowRange?: boolean;
    /**
     * The name of the pane in which the axis has to be rendered.
     * If not set, the axis is rendered in the first (default) pane.
     */
    pane?: string;
    /**
     * The plot bands of the X axis.
     */
    plotBands?: PlotBand[];
    /**
     * If set to `true`, the value axis direction is reversed.
     * By default, values increase from left to right and from bottom to top.
     */
    reverse?: boolean;
    /**
     * The angle (in degrees) where the zero value is placed.
     * Angles increase counterclockwise and zero is to the right. Negative values are acceptable.
     */
    startAngle?: number;
    /**
     * The axis type.
     *
     * The supported values are:
     *
     * - `"numeric"`&mdash;Numeric axis.
     * - `"date"`&mdash;Specialized axis for displaying chronological data.
     * - `"log"`&mdash;Logarithmic axis.
     *
     * If the series X value is of the `date` type, the Chart automatically switches to a date axis.
     * To avoid this behavior, set the `type`.
     */
    type?: 'numeric' | 'log' | 'date';
    /**
     * If set to `true`, the Chart displays the X axis. By default, the X axis is visible.
     */
    visible?: boolean;
    /**
     * The configuration options of the crosshair.
     * The crosshair is displayed when the [`xAxis.crosshair.visible`]({% slug api_charts_xaxiscrosshair %}#toc-visible) option is set to `true`.
     */
    crosshair?: XAxisCrosshair;
    /**
     * The axis labels configuration.
     */
    labels?: XAxisLabels;
    /**
     * The X-axis notes configuration.
     */
    notes?: XAxisNotes;
    /**
     * The title configuration of the Scatter Chart X axis.
     * To display the title, set the [`xAxis.title.text`]({% slug api_charts_xaxistitle %}#toc-text) option.
     */
    title?: XAxisTitle;
    /**
     * The week start day when the `baseUnit` is set to `"weeks"`.
     */
    weekStartDay?: WeekStartDay;
}
