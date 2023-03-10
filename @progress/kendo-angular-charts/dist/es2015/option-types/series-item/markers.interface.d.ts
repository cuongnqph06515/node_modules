import { drawing } from '@progress/kendo-drawing';
import { Border, MarkersVisualArgs, MarkerType } from '../../common/property-types';
/**
 * The configuration options of the series markers.
 */
export interface SeriesMarkers {
    /**
     * The background color of the series markers.
     */
    background?: string;
    /**
     * The border of the markers.
     */
    border?: Border;
    /**
     * The rotation angle of the markers.
     */
    rotation?: number;
    /**
     * The marker size in pixels.
     */
    size?: number;
    /**
     * The shape of the series markers.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
    /**
     * If set to `true`, the Chart displays the series markers.
     * By default, the Chart series markers are displayed.
     */
    visible?: boolean;
    /**
     * A function for creating a custom visual for the markers.
     *
     * The available argument fields are:
     *
     * - `rect`&mdash;The [geometry Rect]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The marker options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `category`&mdash;The category of the marker point.
     * - `dataItem`&mdash;The `dataItem` of the marker point.
     * - `value`&mdash;The value of the marker point.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The series of the marker point.
     */
    visual?: (e: MarkersVisualArgs) => drawing.Element;
    /**
     * The Chart series marker configuration for the `from` point. Supported for the RangeArea and VerticalRangeArea series.
     */
    from?: SeriesMarkers;
    /**
     * The Chart series marker configuration for the `to` point. Supported for the RangeArea and VerticalRangeArea series.
     */
    to?: SeriesMarkers;
}
