import { drawing } from '@progress/kendo-drawing';
import { Border, BulletTarget, DashType, LabelConnectors } from '../common/property-types';
import { Margin, NegativeBubbleValues, Overlay, SeriesLine, SeriesWhiskers, SeriesType } from '../common/property-types';
import { LineStyle, SeriesStack, SeriesVisualArgs } from '../common/property-types';
import { SeriesErrorBars } from './series-item/error-bars.interface';
import { SeriesExtremes } from './series-item/extremes.interface';
import { SeriesHighlight } from './series-item/highlight.interface';
import { SeriesLabels } from './series-item/labels.interface';
import { SeriesMarkers } from './series-item/markers.interface';
import { SeriesNotes } from './series-item/notes.interface';
import { SeriesOutliers } from './series-item/outliers.interface';
import { SeriesTooltip } from './series-item/tooltip.interface';
/**
 * The configuration options of the series.
 */
export interface Series {
    /**
     * The aggregate function for the date series.
     * The function is used when a category (year, month, or other) contains two or more points.
     * The Chart displays the return value of the function instead of the individual points.
     *
     * The supported values are:
     * - `"avg"`&mdash;The average of all values for the date period.
     * - `"count"`&mdash;The number of values for the date period.
     * - `"max"`&mdash;The highest value for the date period.
     * - `"min"`&mdash;The lowest value for the date period.
     * - `"sum"`&mdash;The sum of all values for the date period. Defaults to `0` if no data points are defined.
     * - `"sumOrNull"`&mdash;The sum of all values for the date period. Defaults to `null` if no data points are
     * defined.
     * - `"first"`&mdash;The first value.
     * - function (values, series, dataItems, category)&mdash;A user-defined aggregate function. Returns a single
     * value or a data item.
     * - object (compound aggregate)&mdash;Applicable to the Candlestick, Box Plot, and OHLC series.
     * Specifies the aggregate for each data item field.
     */
    aggregate?: any;
    /**
     * If set to `true`, the Chart automatically scales down to fit the content area.
     * Applicable for the Pie and Donut series.
     */
    autoFit?: boolean;
    /**
     * The name of the value axis.
     * The axis option is supported for Scatter plots. For more information on Scatter plots, refer to
     * [`xAxis`]({% slug api_charts_xaxis %}) and [`yAxis`]({% slug api_charts_yaxis %}).
     */
    axis?: string;
    /**
     * The border of the Chart series.
     * The border option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to
     * `"bar"`, `"column"`, `"donut"`, `"pie"`, `"bubble"`, `"boxPlot"`, `"candlestick"`, or `"ohlc"`.
     */
    border?: Border;
    /**
     * The name of the category axis that will be used for the series.
     * If no [`categoryAxis`]({% slug api_charts_categoryaxis %}) is specified, the first axis is used.
     */
    categoryAxis?: string;
    /**
     * The data item field which contains the category name or date.
     * If the category is a date, the points are rendered in chronological order.
     */
    categoryField?: string;
    /**
     * The data field that contains the `close` value.
     * The `closeField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"` or `"ohlc"`.
     */
    closeField?: string;
    /**
     * The series base color.
     *
     * The supported values are:
     * - CSS color string, including hex and rgb.
     * - function (point)&mdash;A user-defined function that is evaluated for each point.
     * Returning `undefined assumes the default series color.
     */
    color?: any;
    /**
     * The data item field which contains the series color.
     * The `colorField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type)
     * is set to `"bar"`, `"column"`, `"rangeBar"`, `"rangeColumn"`, `"bubble"`, `"donut"`, `"pie"`, `"candlestick"`,
     * `"ohlc"`, or `"waterfall"`.
     */
    colorField?: string;
    /**
     * The label connectors options.
     * The connectors option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"` or `"pie"` and
     * [`series.labels.visible`]({% slug api_charts_serieslabels %}#toc-visible) is set to `true`.
     */
    connectors?: LabelConnectors;
    /**
     * The data item field which contains the current value.
     * The `currentField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bullet"` or `"verticalBullet"`.
     */
    currentField?: string;
    /**
     * The dash type of line Chart.
     * The `dashType` option is considered only if the [`series.type`]({% slug api_charts_series %}#toc-type) option is set to `"line"`.
     *
     * The following dash types are supported:
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
     * The array of data items which represent the series data.
     *
     * You can set it to:
     * - Array of objects. Each point is bound to the field specified through the [`series.field`]({% slug api_charts_series %}#toc-field) option.
     * - Array of numbers. Supported when the [`series.type`]({% slug api_charts_series %}#toc-type) option is set to `"area"`, `"bar"`, `"column"`,
     * `"donut"`, `"pie"`, `"line"`, or `"waterfall"`.
     * - Array of arrays of numbers. Supported when the [`series.type`]({% slug api_charts_series %}#toc-type) option is set to `"bubble"`, `"scatter"`,
     * `"scatterLine"`, `"ohlc"`, `"polar"`, `"rangeBar"`, or `"rangeArea"`.
     *
     * The Bubble series need arrays of three values&mdash;X value, Y value, and Size value&mdash;for example, `[1, 1, 10]`.
     * The Scatter and ScatterLine series need arrays of two values&mdash;X value and Y value.
     * The OHLC and Candlestick series need arrays of four values&mdash;open, high, low, and close.
     * The RangeBar and RangeArea series need arrays of two values&mdash;the from and to value.
     */
    data?: any[];
    /**
     * The series color when the open value is greater than the close value.
     * The `downColor` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"`.
     */
    downColor?: string;
    /**
     * The data field which contains the color that is applied when the `open` value is greater than the `close` value.
     * The `downColorField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"`.
     */
    downColorField?: string;
    /**
     * The `dynamicHeight` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"funnel"`.
     * When set to `false`, all segments become with the same height.
     * Otherwise, the height of each segment is based on its value.
     */
    dynamicHeight?: boolean;
    /**
     * The `dynamicSlope` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"funnel"`.
     * When set to `true`, the ratio of the bases of each segment is calculated based on the ratio of
     * `currentDataItem.value`/`nextDataItem.value`.
     * The last element is always created like a rectangle since there is no following element.
     */
    dynamicSlope?: boolean;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) high value.
     * The `errorHighField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, or `"area"`.
     */
    errorHighField?: string;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) low value.
     * The `errorLowField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, or `"area"`.
     */
    errorLowField?: string;
    /**
     * The data item field which contains a Boolean value indicating whether the sector is exploded.
     * The `explodeField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"` or `"pie"`.
     */
    explodeField?: string;
    /**
     * The data item field which contains the series value.
     */
    field?: string;
    /**
     * The data item field which contains the series from value.
     */
    fromField?: string;
    /**
     * The distance between the categories expressed as a percentage of the bar width.
     * See the related spacing setting.
     * The `gap` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"candlestick"`, `"ohlc"`,
     * `"radarColumn"`, or `"waterfall"`.
     */
    gap?: number;
    /**
     * The data field which contains the high value.
     * The `highField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"` or `"ohlc"`.
     */
    highField?: string;
    /**
     * The diameter of the donut hole in pixels.
     * The `holeSize` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"`.
     */
    holeSize?: number;
    /**
     * The Chart line configuration options.
     * The line option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"area"`, `"candlestick"`, `"ohlc"`, or
     * `"waterfall"`.
     */
    line?: SeriesLine;
    /**
     * The data field containing the low value.
     * The `lowField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"` or `"ohlc"`.
     */
    lowField?: string;
    /**
     * The data item field which contains the series lower value.
     * The `lowerField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    lowerField?: string;
    /**
     * The margin around each donut series (ring). A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The maximum size of the Chart bubble series marker.
     */
    maxSize?: number;
    /**
     * The data item field which contains the series mean value.
     * The `meanField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    meanField?: string;
    /**
     * The data item field which contains the series median value.
     * The `medianField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    medianField?: string;
    /**
     * The minimum size of the Chart bubble series marker.
     */
    minSize?: number;
    /**
     * The behavior for handling missing values.
     * The `missingValues` option is available when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"area"`, `"rangeArea"`, `"line"`, `"scatterLine"`,
     * `"radarLine"`, `"radarArea"`, `"polarLine"`, or `"polarArea"`.
     *
     * The supported values are:
     *
     * - `"gap"`&mdash;The plot stops before the missing point and continues after it.
     * - `"interpolate"`&mdash;The value is interpolated from neighboring points.
     * Represents the default value for all series except for the `"area"` and stacked series. Area and stacked series default to `"zero"`.
     * - `"zero"`&mdash;The value is assumed to be zero.
     */
    missingValues?: 'gap' | 'interpolate' | 'zero';
    /**
     * The name of the Chart series which is visible in the legend.
     */
    name?: string;
    /**
     * Specifies the top-base/bottom-base ratio of the whole Chart. If the `neckRatio` is set to `3`,
     * it means the top base is three times smaller than the bottom base.
     * The `neckRatio` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"funnel"` and `dynamicSlope` is set to `false`.
     */
    neckRatio?: number;
    /**
     * The color to use for the Bar, Column, or Waterfall series with negative values.
     * Accepts a valid CSS color string, including hex and rgb.
     */
    negativeColor?: string;
    /**
     * The options for displaying the Chart negative bubble values.
     */
    negativeValues?: NegativeBubbleValues;
    /**
     * The data item field which contains the series note text.
     */
    noteTextField?: string;
    /**
     * The opacity of the series. By default, the series are opaque.
     */
    opacity?: number;
    /**
     * The data field which contains the open value.
     * The `openField` option is available when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"` or `"ohlc"`.
     */
    openField?: string;
    /**
     * The data item field which contains the series outliers value.
     * The `outliersField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    outliersField?: string;
    /**
     * The overlay options of the Chart series.
     */
    overlay?: Overlay;
    /**
     * The padding around the Chart (equal on all sides).
     * The padding option is available when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"` or `"pie"`.
     */
    padding?: number;
    /**
     * The data item field which contains the series `q1` value.
     * The `q1Field` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    q1Field?: string;
    /**
     * The data item field which contains the series `q3` value.
     * The `q3Field` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    q3Field?: string;
    /**
     * The space in pixels between the different segments of the Funnel Chart.
     * The `segmentSpacing` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"funnel"`.
     */
    segmentSpacing?: number;
    /**
     * The radius of the Chart Donut series in pixels. If not set, the available space is split evenly
     * between the series.
     */
    size?: number;
    /**
     * The data field which contains the bubble size value.
     */
    sizeField?: string;
    /**
     * The distance between series points within a category. Expressed as a percentage of the bar width.
     * See the related `gap` setting.
     * The spacing option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"candlestick"`, `"ohlc"`, or
     * `"radarColumn"`.
     */
    spacing?: number;
    /**
     * A Boolean value which indicates if the series have to be stacked.
     * A string value is interpreted as [`series.stack.group`]({% slug api_charts_seriesstack %}#toc-group).
     *
     * The `stack` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, `"area"`,
     * `"verticalLine"`, `"verticalArea"`, `"radarLine"`, `"radarArea"`, and `"radarColumn"`.
     * If not overridden, the stack settings of the first series are inherited as a default value by the rest of the series.
     */
    stack?: boolean | string | SeriesStack;
    /**
     * The start angle (in degrees) of the first Donut or Pie segment.
     * Angles increase clockwise with zero to the left. Negative values are acceptable.
     */
    startAngle?: number;
    /**
     * The `style` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to
     * `"line"`, `"scatterLine"`, `"radarLine"`, or `"polarLine"`.
     *
     * The supported values are:
     *
     * - `"normal"` (default)&mdash;The values are connected with a straight line.
     * - `"step"`&mdash;The values are connected with a right-angled line.
     * Only available when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"line"`.
     * - `"smooth"`&mdash;The values are connected with a smooth line. Not supported for stacked area series with missing values.
     */
    style?: LineStyle;
    /**
     * The data item field which contains the summary type for the Waterfall series.
     * The value (if any) of a data item marked as a summary point will be discarded.
     *
     * Summary columns are optional and can be one of two types:
     *
     * - `"runningTotal"`&mdash;Displays the sum of all items since the last `"runningTotal"` point.
     * - `"total"`&mdash;Displays the sum of all previous items.
     */
    summaryField?: string;
    /**
     * The configuration options of the target.
     * The `target` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bullet"` or `"verticalBullet"`.
     */
    target?: BulletTarget;
    /**
     * The data item field which contains the series to value.
     */
    toField?: string;
    /**
     * The type of the series.
     *
     * The supported values are:
     *
     * - `area`
     * - `bar`
     * - `bubble`
     * - `boxPlot`
     * - `bullet`
     * - `candlestick`
     * - `column`
     * - `donut`
     * - `funnel`
     * - `horizontalWaterfall`
     * - `line`
     * - `ohlc`
     * - `pie`
     * - `polarArea`
     * - `polarLine`
     * - `polarScatter`
     * - `radarArea`
     * - `radarColumn`
     * - `radarLine`
     * - `rangeArea`
     * - `rangeBar`
     * - `rangeColumn`
     * - `scatter`
     * - `scatterLine`
     * - `verticalArea`
     * - `verticalBoxPlot`
     * - `verticalBullet`
     * - `verticalLine`
     * - `verticalRangeArea`
     * - `waterfall`
     */
    type?: SeriesType;
    /**
     * The data item field which contains the series upper value.
     * The `upperField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    upperField?: string;
    /**
     * Sets the visible property of a Chart series.
     */
    visible?: boolean;
    /**
     * A value which indicates whether to show the point category (for Funnel, Donut, and Pie series)
     * or the series name (for other available series types) in the legend.
     */
    visibleInLegend?: boolean;
    /**
     * The data item field which indicates whether to show the point category name in the legend.
     * The `visibleInLegendField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"funnel"`, `"donut"`, or `"pie"`.
     */
    visibleInLegendField?: string;
    /**
     * A function that can be used to create a custom visual for the points. Applicable for the Bar, Column,
     * Pie, Donut, Funnel, Range Bar, Range Column, Line, ScatterLine, and Waterfall series.
     *
     * The available argument fields are:
     *
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The point options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `category`&mdash;The point category.
     * - `dataItem`&mdash;The point `dataItem`.
     * - `value`&mdash;The point value.
     * - `stackValue`&mdash;The cumulative point value on the stack. Available only for the stackable series.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The point series.
     * - `percentage`&mdash;The point value represented as a percentage value. Available only for the Donut, Pie, and
     * 100% Stacked Charts.
     * - `runningTotal`&mdash;The sum of point values since the last `"runningTotal"` summary point. Available for
     * the Waterfall series.
     * - `total`&mdash;The sum of all previous series values. Available for the Waterfall series.
     * - `radius`&mdash;The segment radius. Available for the Donut and Pie series.
     * - `innerRadius`&mdash;The segment inner radius. Available for the Donut series.
     * - `startAngle`&mdash;The segment start angle. Available for the Donut and Pie series.
     * - `endAngle`&mdash;The segment end angle. Available for the Donut and Pie series.
     * - `center`&mdash;The segment center point. Available for the Donut and Pie series.
     * - `points`&mdash;The segment points. Available for the Funnel series.
     */
    visual?: (e: SeriesVisualArgs) => drawing.Element;
    /**
     * The line width.
     * The `width` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"line"`, `"scatterLine"`, `"radarLine"`, or
     * `"polarLine"`.
     */
    width?: number;
    /**
     * The name of the X axis.
     * The [`xAxis`]({% slug api_charts_xaxis %}) option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bubble"`, `"scatter"`, `"scatterLine"`, or `"polar"` series.
     * For the Polar series, the [`xAxis`]({% slug api_charts_xaxis %}) range is expressed in degrees.
     */
    xAxis?: string;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) xAxis high value.
     * The `xErrorHighField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"``, `"scatterLine"`, or
     * `"bubble"`.
     */
    xErrorHighField?: string;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) xAxis low value.
     * The `xErrorLowField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"`, `"scatterLine"`, or
     * `"bubble"`.
     */
    xErrorLowField?: string;
    /**
     * The data item field containing the x value.
     * The `xField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bubble"`, `"scatter"`, `"scatterLine"`, or
     * `"polar"` series.
     */
    xField?: string;
    /**
     * The name of the Y axis to use.
     * Available for the Bubble, Scatter, Scatter Line, and Polar series.
     */
    yAxis?: string;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) yAxis high value.
     * The `yErrorHighField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"`, `"scatterLine"`, or
     * `"bubble"`.
     */
    yErrorHighField?: string;
    /**
     * The data item field which contains the [`series.errorBars`]({% slug api_charts_series %}#toc-errorbars) yAxis low value.
     * The `yErrorLowField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"`, `"scatterLine"`, or
     * `"bubble"`.
     */
    yErrorLowField?: string;
    /**
     * The data item field containing the y value.
     * The `yField` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bubble"`, `"scatter"`, or `"scatterLine"`.
     */
    yField?: string;
    /**
     * An optional Z-index that can be used to change the default stacking order of series.
     * The series with the highest Z-index are placed on top.
     * Series with no Z-index use the default stacking order based on the series type.
     * For example, Line series will be on top with the Bar and Area following after.
     */
    zIndex?: number;
    /**
     * The error bars of the Chart series.
     * The `errorBars` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, `"area"`,
     * `"scatter"`, `"scatterLine"`, or `"bubble"`.
     */
    errorBars?: SeriesErrorBars;
    /**
     * The configuration of the Chart series extremes. Applies to extreme outliers.
     * The `extremes` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    extremes?: SeriesExtremes;
    /**
     * The configuration of the Chart series highlight.
     */
    highlight?: SeriesHighlight;
    /**
     * The configuration of the Chart series label.
     * The Chart displays the series labels when the [`series.labels.visible`]({% slug api_charts_serieslabels %}#toc-visible) option is set to `true`.
     */
    labels?: SeriesLabels;
    /**
     * The configuration of the Chart series marker.
     * The Chart displays the series labels when the [`series.markers.visible`]({% slug api_charts_seriesmarkers %}#toc-visible) option is set to `true`.
     * The markers option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"area"`, `"rangeArea"`, `"line"`, `"scatter"`, `"scatterLine"`,
     * `"radarLine"`, `"radarArea"`, `"polarLine"`, `"polarScatter"`, or `"polarArea"`.
     */
    markers?: SeriesMarkers;
    /**
     * The configuration of the series notes.
     */
    notes?: SeriesNotes;
    /**
     * The configuration of the Chart series outliers. Applies to mild outliers.
     * The `outliers` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    outliers?: SeriesOutliers;
    /**
     * The configuration options of the Chart series tooltip.
     */
    tooltip?: SeriesTooltip;
    /**
     * The configuration of the whiskers for the Chart series.
     * The `whiskers` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"boxPlot"`.
     */
    whiskers?: SeriesWhiskers;
}
