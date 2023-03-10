import { drawing } from '@progress/kendo-drawing';
/**
 * A series point.
 */
export interface SeriesPoint {
    /**
     * The point category value. Available only for the Categorical points (Bar, Line, and other).
     */
    category?: string | Date | number;
    /**
     * The point `dataItem`.
     */
    dataItem?: any;
    /**
     * The point options.
     */
    options?: any;
    /**
     * The point value represented as a percentage value. Available only for the Donut, Pie, and 100% Stacked chart points.
     */
    percentage?: number;
    /**
     * The sum of point values since the last `"runningTotal"` summary point. Available for the Waterfall series points.
     */
    runningTotal?: number;
    /**
     * The sum of all previous series values. Available for the Waterfall series points.
     */
    total?: number;
    /**
     * The point value.
     */
    value?: any;
    /**
     * The Drawing element used to draw the point.
     */
    visual?: drawing.Element;
}
