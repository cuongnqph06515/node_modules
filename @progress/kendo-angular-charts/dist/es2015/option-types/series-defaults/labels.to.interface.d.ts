import { Border, Margin, Padding } from '../../common/property-types';
/**
 * The configuration options of the Chart series `to` labels.
 */
export interface SeriesDefaultsLabelsTo {
    /**
     * The background color of `to` lables. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of `to` labels.
     */
    border?: Border;
    /**
     * The text color of `to` labels. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The function which returns the `from` label content of the Chart series.
     * You can split the text into multiple lines by using the line feed characters (`"\n"`).
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
     * The font style of the `to` labels.
     */
    font?: string;
    /**
     * The format of the `to` labels. Uses the [`format`]({% slug api_intl_intlservice %}#toc-format) method of IntlService.
     */
    format?: string;
    /**
     * The margin of the `to` labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the `to` labels. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the Chart displays the `to` labels of the series.
     * By default, the `to` labels of the Chart series are not displayed.
     */
    visible?: boolean;
}
