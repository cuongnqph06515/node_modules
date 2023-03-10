import { Border, MarkerType } from '../../common/property-types';
/**
 * The configuration options of the series outliers.
 */
export interface SeriesOutliers {
    /**
     * The background color of the series outliers.
     */
    background?: string;
    /**
     * The border of the outliers.
     */
    border?: Border;
    /**
     * The rotation angle of the outliers.
     */
    rotation?: number;
    /**
     * The marker size in pixels.
     */
    size?: number;
    /**
     * The outliers shape.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
}
