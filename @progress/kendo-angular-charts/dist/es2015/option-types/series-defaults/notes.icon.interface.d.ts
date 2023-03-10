import { Border, MarkerType } from '../../common/property-types';
/**
 * The configuration options of the series notes icon.
 */
export interface SeriesDefaultsNotesIcon {
    /**
     * The background color of the notes icon.
     */
    background?: string;
    /**
     * The border of the notes icon.
     */
    border?: Border;
    /**
     * The size of the notes icon.
     */
    size?: number;
    /**
     * The shape of the notes icon.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
    /**
     * The visibility of the notes icon.
     */
    visible?: boolean;
}
