import { Border, Margin, Padding } from '../../common/property-types';
/**
 * The configuration options of the series `to` labels.
 */
export interface SeriesLabelsTo {
    /**
     * The background color of the `to` labels. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the `to` labels.
     */
    border?: Border;
    /**
     * The text color of the `to` labels. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The function which returns the Chart series `to` label content.
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
     * The format of the `to` labels. Uses [IntlService format]({% slug api_intl_intlservice %}#toc-format).
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
     * The position of the `to` labels.
     *
     * The available options are:
     *
     * - `"center"`&mdash;The label is positioned at the point center.
     * - `"insideBase"`&mdash;The label is positioned inside, near the base of the bar.
     * - `"insideEnd"`&mdash;The label is positioned inside, near the end of the point.
     * - `"outsideEnd"`&mdash;The label is positioned outside, near the end of the point.
     * - `"above"`&mdash;The label is positioned at the top of the marker. Applicable for the RangeArea and VerticalRangeArea series.
     * - `"below"`&mdash;The label is positioned at the bottom of the marker. Applicable for the RangeArea and VerticalRangeArea series.
     * - `"left"`&mdash;The label is positioned to the left of the marker. Applicable for the RangeArea and VerticalRangeArea series.
     * - `"right"`&mdash;The label is positioned to the right of the marker. Applicable for the RangeArea and VerticalRangeArea series.
     */
    position?: 'center' | 'insideBase' | 'insideEnd' | 'outsideEnd';
    /**
     * If set to `true`, the Chart displays the series `to` labels.
     * By default, the Chart series `to` labels are not displayed.
     */
    visible?: boolean;
}
