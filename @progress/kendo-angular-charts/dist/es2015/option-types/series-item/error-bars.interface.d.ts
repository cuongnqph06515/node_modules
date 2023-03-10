import { drawing } from '@progress/kendo-drawing';
import { ErrorBarLine, ErrorBarsVisualArgs } from '../../common/property-types';
/**
 * The configuration options of the series error bars.
 */
export interface SeriesErrorBars {
    /**
     * The color of the error bars. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * If set to `false`, the caps of the error bars are not displayed. By default, the caps are visible.
     */
    endCaps?: boolean;
    /**
     * The error bars line options.
     */
    line?: ErrorBarLine;
    /**
     * The error bars value.
     * The value option is supported when [series.type]({% slug api_charts_series %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, or `"area"`.
     *
     * The following value types are supported:
     *
     * - `"stderr"`&mdash;The standard error of the series values will be used to calculate the point low and
     * high values.
     * - `"stddev(n)"`&mdash;The standard deviation of the series values will be used to calculate the point low
     * and high values. Between the parentheses, a number can be specified that will be multiplied by the
     * calculated standard deviation.
     * - `"percentage(n)"`&mdash;A percentage of the point value.
     * - A number that will be subtracted or added to the point value.
     * - An array that holds the low and high difference from the point value.
     * - A function that returns the `errorBars` point value.
     */
    value?: string;
    /**
     * A function that for creating custom visuals for the error bars.
     *
     * The available argument fields are:
     *
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The error bar options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `low`&mdash;The error bar low value.
     * - `high`&mdash;The error bar high value.
     * - `sender`&mdash;The Chart instance.
     */
    visual?: (e: ErrorBarsVisualArgs) => drawing.Element;
    /**
     * The value of the [`xAxis`]({% slug api_charts_xaxis %}) error bars. For a list of the supported value
     * types, refer to the [`series.errorBars.value`]({% slug api_charts_serieserrorbars %}#toc-value) option.
     * The `xValue` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"`, `"scatterLine"`, or `"bubble"`.
     */
    xValue?: string;
    /**
     * The value of the [`yAxis`]({% slug api_charts_yaxis %}) error bars. For a list of supported value types, refer
     * to the [`series.errorBars.value`]({% slug api_charts_serieserrorbars %}#toc-value) option.
     * The `yValue` option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"scatter"`, `"scatterLine"`, or `"bubble"`.
     */
    yValue?: string;
}
