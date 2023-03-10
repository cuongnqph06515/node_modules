import { drawing } from '@progress/kendo-drawing';
import { Border, HighlightLine, HighlightVisualArgs, HighlightToggleArgs } from '../../common/property-types';
import { MarkersHighlight } from './markers-highlight.interface';
/**
 * The configuration options of the series highlight.
 */
export interface SeriesHighlight {
    /**
     * The border of the highlighted Chart series.
     * The color is computed automatically from the base point color.
     * The border option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to
     * `"donut"`, `"bubble"`, `"pie"`, `"candlestick"`, or `"ohlc"`.
     */
    border?: Border;
    /**
     * The highlight color. Accepts a valid CSS color string, including hex and rgb.
     * The color option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"` or `"pie"`.
     */
    color?: string;
    /**
     * The line of the highlighted Chart series.
     * The color is computed automatically from the base point color.
     * The line option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"candlestick"` or `"ohlc"`.
     */
    line?: HighlightLine;
    /**
     * The opacity of the highlighted points.
     * The opacity option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"bubble"`, `"pie"`, or `"donut"`.
     */
    opacity?: number;
    /**
     * The appearance of the highlighted point markers.
     * The markers option is supported when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"line"`, `"area"`, `"scatter"`, `"scatterLine"`, or `"rangeArea"`.
     */
    markers?: MarkersHighlight;
    /**
     * A function for handling the toggling of the points highlight.
     *
     * The available argument fields are:
     *
     * - `preventDefault`&mdash;A function that can be used to prevent the showing of the default highlight overlay.
     * - `show`&mdash;A Boolean value indicating whether the highlight has to be shown.
     * - `visual`&mdash;The visual element that needs to be highlighted.
     * - `category`&mdash;The point category.
     * - `dataItem`&mdash;The point `dataItem`.
     * - `value`&mdash;The point value.
     * - `series`&mdash;The point series.
     */
    toggle?: (e: HighlightToggleArgs) => void;
    /**
     * If set to `true`, the Chart highlights the series when the user hovers over it with the mouse.
     * By default, the highlighting of the Chart series is enabled.
     */
    visible?: boolean;
    /**
     * A function for setting custom visuals for the point highlights.
     *
     * The available argument fields are:
     *
     * - `createVisual`&mdash;A function that can be used to get the default highlight visual.
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `visual`&mdash;The visual element that needs to be highlighted.
     * - `options`&mdash;The point options.
     * - `category`&mdash;The point category.
     * - `dataItem`&mdash;The point `dataItem`.
     * - `value`&mdash;The point value.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The point series.
     * - `stackValue`&mdash;The cumulative point value on the stack. Available only for the stackable series.
     * - `percentage`&mdash;The point value represented as a percentage value. Available only for the Donut, Pie, and
     * 100% stacked charts.
     * - `runningTotal`&mdash;The sum of point values since the last `"runningTotal"` summary point. Available for
     * the Waterfall series.
     * - `total`&mdash;The sum of all previous series values. Available for the Waterfall series.
     * - `from`&mdash;The `from` point highlight visual options. Available for the RangeArea and VerticalRangeArea series.
     * - `to`&mdash;The `to` point highlight visual options. Available for the RangeArea and VerticalRangeArea series.
     */
    visual?: (e: HighlightVisualArgs) => drawing.Element;
}
