import { drawing } from '@progress/kendo-drawing';
import { Border, Margin, Padding, SeriesLabelsVisualArgs } from '../../common/property-types';
import { SeriesDefaultsLabelsFrom } from './labels.from.interface';
import { SeriesDefaultsLabelsTo } from './labels.to.interface';
/**
 * The configuration options of the series labels.
 */
export interface SeriesDefaultsLabels {
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
     * The function which returns the Chart series labels content.
     * You can split the text into multiple lines by using line feed characters (`"\n"`).
     *
     * The available fields in the function argument are:
     *
     * - `category`&mdash;The category name. Available for the Area, Bar, Column, Bubble, Donut, Funnel, Line, and Pie
     * series.
     * - `dataItem`&mdash;The original data item used to construct the point. If binding to an array, it will be `null`.
     * - `percentage`&mdash;The point value represented as a percentage value. Available for the Donut, Funnel, and
     * Pie series.
     * - `series`&mdash;The data series.
     * - `value`&mdash;The point value. Can be a number or object containing each bound field.
     * - `runningTotal`&mdash;The sum of point values since the last `"runningTotal"` summary point. Available for
     * the Waterfall series.
     * - `total`&mdash;The sum of all previous series values. Available for the Waterfall series.
     */
    content?: (e: any) => string;
    /**
     * The font style of the labels.
     */
    font?: string;
    /**
     * The format of the labels. Uses the [`format`]({% slug api_intl_intlservice %}#toc-format) method of IntlService.
     */
    format?: string;
    /**
     * The margin of the labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the labels. A numeric value sets all margins.
     */
    padding?: Padding | number;
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
     * - `sender`&mdash;The Chart instance (might be `undefined`).
     * - `options`&mdash;The label options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     */
    visual?: (e: SeriesLabelsVisualArgs) => drawing.Element;
    /**
     * The Chart series `from` label configuration.
     * The Chart displays the series labels when either the [`seriesDefaults.labels.visible`]({% slug api_charts_seriesdefaultslabels %}#toc-visible) or
     * the [`seriesDefaults.labels.from.visible`]({% slug api_charts_seriesdefaultslabelsfrom %}#toc-visible) option is set to `true`.
     */
    from?: SeriesDefaultsLabelsFrom;
    /**
     * The Chart series `to` label configuration.
     * The Chart displays the series labels when either the [`seriesDefaults.labels.visible`]({% slug api_charts_seriesdefaultslabels %}#toc-visible) or
     * the [`seriesDefaults.labels.to.visible`]({% slug api_charts_seriesdefaultslabelsto %}#toc-visible) option is set to `true`.
     */
    to?: SeriesDefaultsLabelsTo;
}
