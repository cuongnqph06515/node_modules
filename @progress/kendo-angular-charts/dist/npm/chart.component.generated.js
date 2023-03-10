"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
/**
 * @hidden
 */
var ChartComponentGenerated = /** @class */ (function () {
    function ChartComponentGenerated(configurationService) {
        this.configurationService = configurationService;
        /**
         * Fires when the user clicks an axis label ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.axisLabelClick = new core_2.EventEmitter();
        /**
         * Fires as long as the user is dragging the Chart with the mouse or through swipe gestures.
         */
        this.drag = new core_2.EventEmitter();
        /**
         * Fires when the user stops dragging the Chart.
         */
        this.dragEnd = new core_2.EventEmitter();
        /**
         * Fires when the user starts dragging the Chart.
         */
        this.dragStart = new core_2.EventEmitter();
        /**
         * Fires when the user hovers over a legend item ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.legendItemHover = new core_2.EventEmitter();
        /**
         * Fires when the cursor leaves a legend item.
         */
        this.legendItemLeave = new core_2.EventEmitter();
        /**
         * Fires when the user clicks a note.
         */
        this.noteClick = new core_2.EventEmitter();
        /**
         * Fires when the user hovers over a note.
         */
        this.noteHover = new core_2.EventEmitter();
        /**
         * Fires when the cursor leaves a note.
         */
        this.noteLeave = new core_2.EventEmitter();
        /**
         * Fires when a pane is rendered because the Chart:
         * * Is rendered.
         * * Performs panning or zooming.
         * * Is exported with different options.
         * The event is used to render custom visuals in the panes.
         */
        this.paneRender = new core_2.EventEmitter();
        /**
         * Fires when the user clicks the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         * The `click` event is triggered by the `tap` and `contextmenu` events.
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.plotAreaClick = new core_2.EventEmitter();
        /**
         * Fires when the user hovers the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.plotAreaHover = new core_2.EventEmitter();
        /**
         * Fires when the cursor leaves the plot area.
         */
        this.plotAreaLeave = new core_2.EventEmitter();
        /**
         * Fires when the Chart is ready to render on screen ([see example]({% slug overview_chart_charts %}#toc-events)).
         * For example, you can use it to remove loading indicators.
         * Any changes made to the options are ignored.
         */
        this.render = new core_2.EventEmitter();
        /**
         * Fires when the user modifies the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.select = new core_2.EventEmitter();
        /**
         * Fires when the user completes the modification of the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectEnd = new core_2.EventEmitter();
        /**
         * Fires when the user starts modifying the axis selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectStart = new core_2.EventEmitter();
        /**
         * Fires when the user clicks the Chart series.
         *
         * The `click` event will be triggered by the `tap` and `contextmenu` events ([see example]({% slug overview_chart_charts %}#toc-events)).
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.seriesClick = new core_2.EventEmitter();
        /**
         * Fires when the user hovers the Chart series ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.seriesHover = new core_2.EventEmitter();
        /**
         * Fires when the cursor enters a series.
         */
        this.seriesOver = new core_2.EventEmitter();
        /**
         * Fires when the cursor leaves a series.
         */
        this.seriesLeave = new core_2.EventEmitter();
        /**
         * Fires as long as the user is zooming the Chart by using the mousewheel operation.
         */
        this.zoom = new core_2.EventEmitter();
        /**
         * Fires when the user stops zooming the Chart.
         */
        this.zoomEnd = new core_2.EventEmitter();
        /**
         * Fires when the user uses the mousewheel to zoom the Chart.
         */
        this.zoomStart = new core_2.EventEmitter();
    }
    ChartComponentGenerated.propDecorators = {
        pannable: [{ type: core_1.Input }],
        renderAs: [{ type: core_1.Input }],
        seriesColors: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        transitions: [{ type: core_1.Input }],
        zoomable: [{ type: core_1.Input }],
        axisDefaults: [{ type: core_1.Input }],
        categoryAxis: [{ type: core_1.Input }],
        chartArea: [{ type: core_1.Input }],
        legend: [{ type: core_1.Input }],
        panes: [{ type: core_1.Input }],
        plotArea: [{ type: core_1.Input }],
        series: [{ type: core_1.Input }],
        seriesDefaults: [{ type: core_1.Input }],
        tooltip: [{ type: core_1.Input }],
        valueAxis: [{ type: core_1.Input }],
        xAxis: [{ type: core_1.Input }],
        yAxis: [{ type: core_1.Input }],
        axisLabelClick: [{ type: core_2.Output }],
        drag: [{ type: core_2.Output }],
        dragEnd: [{ type: core_2.Output }],
        dragStart: [{ type: core_2.Output }],
        legendItemHover: [{ type: core_2.Output }],
        legendItemLeave: [{ type: core_2.Output }],
        noteClick: [{ type: core_2.Output }],
        noteHover: [{ type: core_2.Output }],
        noteLeave: [{ type: core_2.Output }],
        paneRender: [{ type: core_2.Output }],
        plotAreaClick: [{ type: core_2.Output }],
        plotAreaHover: [{ type: core_2.Output }],
        plotAreaLeave: [{ type: core_2.Output }],
        render: [{ type: core_2.Output }],
        select: [{ type: core_2.Output }],
        selectEnd: [{ type: core_2.Output }],
        selectStart: [{ type: core_2.Output }],
        seriesClick: [{ type: core_2.Output }],
        seriesHover: [{ type: core_2.Output }],
        seriesOver: [{ type: core_2.Output }],
        seriesLeave: [{ type: core_2.Output }],
        zoom: [{ type: core_2.Output }],
        zoomEnd: [{ type: core_2.Output }],
        zoomStart: [{ type: core_2.Output }]
    };
    return ChartComponentGenerated;
}());
exports.ChartComponentGenerated = ChartComponentGenerated;
