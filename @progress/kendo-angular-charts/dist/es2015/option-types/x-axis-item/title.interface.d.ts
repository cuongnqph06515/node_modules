import { drawing } from '@progress/kendo-drawing';
import { AxisTitlePosition, Border, Margin, Padding, TitleVisualArgs } from '../../common/property-types';
/**
 * The configuration options of the X-axis title.
 */
export interface XAxisTitle {
    /**
     * The background color of the title. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the title.
     */
    border?: Border;
    /**
     * The text color of the title. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The font style of the title.
     */
    font?: string;
    /**
     * The margin of the title. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the title. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * The position of the title.
     *
     * The supported values are:
     *
     * - `"top"`&mdash;The axis title is positioned on the top (applicable to the vertical axis).
     * - `"bottom"`&mdash;The axis title is positioned on the bottom (applicable to the vertical axis).
     * - `"left"`&mdash;The axis title is positioned on the left (applicable to the horizontal axis).
     * - `"right"`&mdash;The axis title is positioned on the right (applicable to the horizontal axis).
     * - `"center"`&mdash;The axis title is positioned in the center.
     */
    position?: AxisTitlePosition;
    /**
     * The rotation angle of the title. By default, the title is not rotated.
     */
    rotation?: number;
    /**
     * The text of the title.
     * You can split the text into multiple lines by using the line feed characters (`"\n"`).
     */
    text?: string;
    /**
     * If set to `true`, the Chart displays the X axis title of the Scatter Chart.
     * By default, the X-axis title of the Scatter Chart is visible.
     */
    visible?: boolean;
    /**
     * A function that can be used to create a custom visual for the title.
     *
     * The available argument fields are:
     *
     * - `text`&mdash;The label text.
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `sender`&mdash;The Chart instance (might be `undefined`).
     * - `options`&mdash;The label options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     */
    visual?: (e: TitleVisualArgs) => drawing.Element;
}
