import { drawing } from '@progress/kendo-drawing';
import { Border, Margin, Padding, SeriesLabelsVisualArgs } from '../../common/property-types';
import { SeriesLabelsPosition } from '../../common/property-types';
import { SeriesLabelsFrom } from './labels.from.interface';
import { SeriesLabelsTo } from './labels.to.interface';
/**
 * The configuration options of the series labels.
 */
export interface SeriesLabels {
    /**
     * The alignment of the label when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"`, `"funnel"`, or `"pie"`.
     *
     * The supported values  for `"donut"` and `"pie"` are:
     *
     * - `"circle"`&mdash;The labels are positioned in circle around the Chart.
     * - `"column"`&mdash;The labels are positioned in columns to the left and right of the Chart.
     *
     * The supported values for `"funnel"` are:
     *
     * - `"center"`&mdash;The labels are positioned in the center over the funnel segment.
     * - `"right"`&mdash;The labels are positioned on the right side of the Chart and, if there is enough
     * space, do not overlap the funnel segments.
     * - `"left"`&mdash;The labels are positioned on the left side of the Chart and, if there is enough
     * space, do not overlap the funnel segments.
     */
    align?: 'circle' | 'column' | 'center' | 'right' | 'left';
    /**
     * The background color of the labels. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the labels.
     */
    border?: Border;
    /**
     * The text color of the labels. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The function which returns the Chart series label content.
     * You can split the text into multiple lines by using line feed characters (`"\n"`).
     *
     * The fields available in the function argument are:
     *
     * - `category`&mdash;The category name. Available for the Area, Bar, Column, Bubble, Donut, Line, Pie, and
     * Waterfall series.
     * - `dataItem`&mdash;The original data item used to construct the point. If binding to an array, it will be `null`.
     * - `percentage`&mdash;The point value represented as a percentage value. Available only for the Donut, Pie, and
     * 100% stacked charts.
     * - `series`&mdash;The data series.
     * - `stackValue`&mdash;The cumulative point value on the stack. Available only for the stackable series.
     * - `value`&mdash;The point value. Can be a number or object containing each bound field.
     * - `runningTotal`&mdash;The sum of point values since the last `"runningTotal"` summary point. Available for
     * the Waterfall series.
     * - `total`&mdash;The sum of all previous series values. Available for the Waterfall series.
     */
    content?: (e: any) => string;
    /**
     * The distance between the labels when [`series.type`]({% slug api_charts_series %}#toc-type) is set to `"donut"` or `"pie"`.
     */
    distance?: number;
    /**
     * The font style of the labels.
     */
    font?: string;
    /**
     * The format of the labels. Uses the [`format`]({% slug api_intl_intlservice %}#toc-format) method of the IntlService.
     */
    format?: string;
    /**
     * The margin of the labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the labels. A numeric value sets all paddings.
     * Bar and Column series always apply full padding and ignore this setting.
     */
    padding?: Padding | number;
    /**
     * The position of the labels.
     */
    position?: SeriesLabelsPosition;
    /**
     * The rotation angle of the labels. By default, the labels are not rotated.
     */
    rotation?: number;
    /**
     * If set to `true`, the Chart displays the series labels.
     * By default, the Chart series labels are not displayed.
     */
    visible?: boolean;
    /**
     * A function that can be used to create a custom visual for the labels.
     *
     * The available argument fields are:
     *
     * - `text`&mdash;The label text.
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The label options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `sender`&mdash;The Chart instance (might be `undefined`).
     */
    visual?: (e: SeriesLabelsVisualArgs) => drawing.Element;
    /**
     * The `from` label configuration of the Chart series.
     * The Chart displays the series from labels when either the [`series.labels.visible`]({% slug api_charts_serieslabels %}#toc-visible) or
     * the [`series.labels.from.visible`]({% slug api_charts_serieslabelsfrom %}#toc-visible) option is set to `true`.
     */
    from?: SeriesLabelsFrom;
    /**
     * The `to` label configuration of the Chart series.
     * The Chart displays the series to labels when either the [`series.labels.visible`]({% slug api_charts_serieslabels %}#toc-visible) or
     * the [`series.labels.to.visible`]({% slug api_charts_serieslabelsto %}#toc-visible) option is set to `true`.
     */
    to?: SeriesLabelsTo;
}
