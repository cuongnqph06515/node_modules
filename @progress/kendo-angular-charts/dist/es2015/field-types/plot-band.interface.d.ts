/**
 * A plot band.
 */
export interface PlotBand {
    /**
     * The color of the plot band.
     */
    color?: string;
    /**
     * The start position of the plot band in axis units.
     */
    from?: number | Date;
    /**
     * The opacity of the plot band.
     */
    opacity?: number;
    /**
     * The end position of the plot band in axis units.
     */
    to?: number | Date;
}
