import { AxisLine, AxisTicks, BaseUnit, GridLines, PlotBand } from '../common/property-types';
import { YAxisCrosshair } from './y-axis-item/crosshair.interface';
import { YAxisLabels } from './y-axis-item/labels.interface';
import { YAxisNotes } from './y-axis-item/notes.interface';
import { YAxisTitle } from './y-axis-item/title.interface';
/**
 * The Y-axis options.
 */
export interface YAxis {
    /**
     * * (Only for objects) The value at which the Y axis crosses this axis.
     * * (Only for arrays) The value indices at which the Y axes cross the value axis.
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
     * - `milliseconds`
     * - `seconds`
     * - `minutes`
     * - `hours`
     * - `days`
     * - `weeks`
     * - `months`
     * - `years`
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
     * The configuration of the major grid lines.
     * These are the lines that are an extension of the major ticks through the body of the Chart.
     */
    majorGridLines?: GridLines;
    /**
     * The configuration of the Scatter Chart Y-axis major ticks.
     */
    majorTicks?: AxisTicks;
    /**
     * The interval between major divisions.
     * If this is a date axis, the value represents the number of [`yAxis.baseUnits`]({% slug api_charts_yaxis %}#toc-baseunit) between major divisions.
     * If the [`yAxis.type`]({% slug api_charts_yaxis %}#toc-type) is set to `"log"`, the `majorUnit` value is used for the base of the logarithm.
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
     * The configuration of the Y-axis minor ticks.
     */
    minorTicks?: AxisTicks;
    /**
     * The interval between minor divisions. It defaults to one-fifth (1/5) of [`yAxis.majorUnit`]({% slug api_charts_yaxis %}#toc-majorunit).
     * If [`yAxis.type`]({% slug api_charts_yaxis %}#toc-type) is set to `"log"`, the `minorUnit` value represents the number of divisions between
     * two major units and defaults to the major unit minus one.
     */
    minorUnit?: number;
    /**
     * The unique axis name. Used to associate a series with a Y axis by using the [`series.yAxis`]({% slug api_charts_series %}#toc-yaxis) option.
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
     * The plot bands of the Y axis.
     */
    plotBands?: PlotBand[];
    /**
     * If set to `true`, the value axis direction is reversed.
     * By default, the values increase from left to right and from bottom to top.
     */
    reverse?: boolean;
    /**
     * The axis type.
     *
     * The supported values are:
     *
     * - `"numeric"`&mdash;Numeric axis.
     * - `"date"`&mdash;Specialized axis for displaying chronological data.
     * - `"log"`&mdash;Logarithmic axis.
     *
     * If the series Y value is of the `date` type, the Chart automatically switches to a date axis.
     * To avoid this behavior, set the `type`.
     */
    type?: 'numeric' | 'log' | 'date';
    /**
     * If set to `true`, the Chart displays the Y axis. By default, the Y axis is visible.
     */
    visible?: boolean;
    /**
     * The configuration options of the crosshair.
     * The crosshair is displayed when the [`yAxis.crosshair.visible`]({% slug api_charts_yaxiscrosshair %}#toc-visible) option is set to `true`.
     */
    crosshair?: YAxisCrosshair;
    /**
     * The axis labels configuration.
     */
    labels?: YAxisLabels;
    /**
     * The Y-axis notes configuration.
     */
    notes?: YAxisNotes;
    /**
     * The title configuration of the Scatter Chart Y axis.
     * To display the title, set the [`yAxis.title.text`]({% slug api_charts_yaxistitle %}#toc-text) option.
     */
    title?: YAxisTitle;
}
