/**
 * Configuration of the mousewheel action for selection.
 */
export interface MousewheelSelect {
    /**
     * If set to `true`, the option reverses the mousewheel direction.
     * The normal direction is down for `"zoom out"`.
     * The normal direction is up for `"zoom in"`.
     */
    reverse?: boolean;
    /**
     * The zoom direction of the selection.
     *
     * The supported values are:
     *
     * * `"both"`&mdash;Zooming expands and contracts the selection on both sides.
     * * `"left"`&mdash;Zooming expands and contracts the selection on the left side only.
     * * `"right"`&mdash;Zooming expands and contracts the selection on the right side only.
     */
    zoom?: 'both' | 'left' | 'right';
}
