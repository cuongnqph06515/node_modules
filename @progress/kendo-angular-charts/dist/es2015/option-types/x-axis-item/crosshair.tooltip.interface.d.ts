import { Border, Padding } from '../../common/property-types';
/**
 * The configuration options of the X-axis crosshair tooltip.
 */
export interface XAxisCrosshairTooltip {
    /**
     * The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border options of the tooltip.
     */
    border?: Border;
    /**
     * The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The font of the tooltip.
     */
    font?: string;
    /**
     * The format for displaying the tooltip. Uses the [`format`]({% slug api_intl_intlservice %}#toc-format) method of IntlService.
     * Contains one placeholder (`"{0}"`) which represents the value.
     */
    format?: string;
    /**
     * The padding of the crosshair tooltip. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the Chart displays the crosshair tooltip of the Scatter chart X axis.
     * By default, the crosshair tooltip of the Scatter chart X axis is not visible.
     */
    visible?: boolean;
}
