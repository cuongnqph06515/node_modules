import { Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
/**
 * @hidden
 */
export class ChartComponentGenerated {
    constructor(configurationService) {
        this.configurationService = configurationService;
        /**
         * Fires when the user clicks an axis label ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.axisLabelClick = new EventEmitter();
        /**
         * Fires as long as the user is dragging the Chart with the mouse or through swipe gestures.
         */
        this.drag = new EventEmitter();
        /**
         * Fires when the user stops dragging the Chart.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the user starts dragging the Chart.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the user hovers over a legend item ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.legendItemHover = new EventEmitter();
        /**
         * Fires when the cursor leaves a legend item.
         */
        this.legendItemLeave = new EventEmitter();
        /**
         * Fires when the user clicks a note.
         */
        this.noteClick = new EventEmitter();
        /**
         * Fires when the user hovers over a note.
         */
        this.noteHover = new EventEmitter();
        /**
         * Fires when the cursor leaves a note.
         */
        this.noteLeave = new EventEmitter();
        /**
         * Fires when a pane is rendered because the Chart:
         * * Is rendered.
         * * Performs panning or zooming.
         * * Is exported with different options.
         * The event is used to render custom visuals in the panes.
         */
        this.paneRender = new EventEmitter();
        /**
         * Fires when the user clicks the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         * The `click` event is triggered by the `tap` and `contextmenu` events.
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.plotAreaClick = new EventEmitter();
        /**
         * Fires when the user hovers the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.plotAreaHover = new EventEmitter();
        /**
         * Fires when the cursor leaves the plot area.
         */
        this.plotAreaLeave = new EventEmitter();
        /**
         * Fires when the Chart is ready to render on screen ([see example]({% slug overview_chart_charts %}#toc-events)).
         * For example, you can use it to remove loading indicators.
         * Any changes made to the options are ignored.
         */
        this.render = new EventEmitter();
        /**
         * Fires when the user modifies the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.select = new EventEmitter();
        /**
         * Fires when the user completes the modification of the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectEnd = new EventEmitter();
        /**
         * Fires when the user starts modifying the axis selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectStart = new EventEmitter();
        /**
         * Fires when the user clicks the Chart series.
         *
         * The `click` event will be triggered by the `tap` and `contextmenu` events ([see example]({% slug overview_chart_charts %}#toc-events)).
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.seriesClick = new EventEmitter();
        /**
         * Fires when the user hovers the Chart series ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.seriesHover = new EventEmitter();
        /**
         * Fires when the cursor enters a series.
         */
        this.seriesOver = new EventEmitter();
        /**
         * Fires when the cursor leaves a series.
         */
        this.seriesLeave = new EventEmitter();
        /**
         * Fires as long as the user is zooming the Chart by using the mousewheel operation.
         */
        this.zoom = new EventEmitter();
        /**
         * Fires when the user stops zooming the Chart.
         */
        this.zoomEnd = new EventEmitter();
        /**
         * Fires when the user uses the mousewheel to zoom the Chart.
         */
        this.zoomStart = new EventEmitter();
    }
}
ChartComponentGenerated.propDecorators = {
    pannable: [{ type: Input }],
    renderAs: [{ type: Input }],
    seriesColors: [{ type: Input }],
    title: [{ type: Input }],
    transitions: [{ type: Input }],
    zoomable: [{ type: Input }],
    axisDefaults: [{ type: Input }],
    categoryAxis: [{ type: Input }],
    chartArea: [{ type: Input }],
    legend: [{ type: Input }],
    panes: [{ type: Input }],
    plotArea: [{ type: Input }],
    series: [{ type: Input }],
    seriesDefaults: [{ type: Input }],
    tooltip: [{ type: Input }],
    valueAxis: [{ type: Input }],
    xAxis: [{ type: Input }],
    yAxis: [{ type: Input }],
    axisLabelClick: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    dragStart: [{ type: Output }],
    legendItemHover: [{ type: Output }],
    legendItemLeave: [{ type: Output }],
    noteClick: [{ type: Output }],
    noteHover: [{ type: Output }],
    noteLeave: [{ type: Output }],
    paneRender: [{ type: Output }],
    plotAreaClick: [{ type: Output }],
    plotAreaHover: [{ type: Output }],
    plotAreaLeave: [{ type: Output }],
    render: [{ type: Output }],
    select: [{ type: Output }],
    selectEnd: [{ type: Output }],
    selectStart: [{ type: Output }],
    seriesClick: [{ type: Output }],
    seriesHover: [{ type: Output }],
    seriesOver: [{ type: Output }],
    seriesLeave: [{ type: Output }],
    zoom: [{ type: Output }],
    zoomEnd: [{ type: Output }],
    zoomStart: [{ type: Output }]
};
