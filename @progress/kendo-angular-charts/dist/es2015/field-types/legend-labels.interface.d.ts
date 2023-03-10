import { LegendLabelsContentArgs } from '../argument-types/legend-labels-content-args.interface';
import { Margin } from './margin.interface';
import { Padding } from './padding.interface';
/**
 * The appearance configuration for the legend labels.
 */
export interface LegendLabels {
    /**
     * The color of the legend label text.
     * Accepts a valid [CSS `color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
     * configuration string, including hex and rgb.
     */
    color?: string;
    /**
     * The font of the legend label text.
     * Accepts a valid [CSS `font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font)
     * configuration string.
     */
    font?: string;
    /**
     * The margin of the labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the labels. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * A function used to generate the content of each label.
     */
    content?: (e: LegendLabelsContentArgs) => string;
}
