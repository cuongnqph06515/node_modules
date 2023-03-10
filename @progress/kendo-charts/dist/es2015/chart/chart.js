import { drawing as draw, throttle } from '@progress/kendo-drawing';

import { RootElement, Title, CategoryAxis, Point } from '../core';

import Highlight from './highlight';
import Pannable from './pan-and-zoom/pannable';
import ZoomSelection from './pan-and-zoom/zoom-selection';
import MousewheelZoom from './pan-and-zoom/mousewheel-zoom';
import Legend from './legend/legend';
import PlotAreaFactory from './plotarea/plotarea-factory';
import Selection from './selection';
import SeriesBinder from './series-binder';
import Tooltip from './tooltip/tooltip';
import SharedTooltip from './tooltip/shared-tooltip';
import CategoricalPlotArea from './plotarea/categorical-plotarea';
import PlotAreaBase from './plotarea/plotarea-base';
import { ChartService, DomEventsBuilder } from '../services';
import getField from './utils/get-field';
import isDateAxis from './utils/is-date-axis';
import getDateField from './utils/get-date-field';
import { ChartPane, ChartPlotArea, findAxisByName } from './api-elements';

import { X, Y, VALUE, DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../common/constants';
import { addClass, Class, setDefaultOptions, deepExtend, defined, isObject, isFunction, elementSize, elementOffset,
    elementStyles, eventCoordinates, bindEvents, unbindEvents, mousewheelDelta, FontLoader, inArray, last, round, HashMap } from '../common';

import { dateComparer } from '../date-utils';

import { DRAG_START, DRAG, DRAG_END, ZOOM_START, ZOOM, ZOOM_END, SELECT_START, SELECT, SELECT_END, PLOT_AREA_HOVER, PLOT_AREA_LEAVE,
    RENDER, CATEGORY, PIE, DONUT, FUNNEL, COLUMN, MOUSEWHEEL, MOUSEWHEEL_DELAY, SHOW_TOOLTIP, SERIES_HOVER } from './constants';

import './animations';
import './register-charts';

const AXIS_NAMES = [ CATEGORY, VALUE, X, Y ];

const MOUSEMOVE = "mousemove";
const CONTEXTMENU = "contextmenu";
const MOUSELEAVE = "mouseleave";
const MOUSEMOVE_DELAY = 20;

class Chart extends Class {
    constructor(element, userOptions, themeOptions, context = {}) {
        super();

        this.observers = [];
        this.addObserver(context.observer);
        this.chartService = new ChartService(this, context);
        this.chartService.theme = themeOptions;

        this._initElement(element);

        const options = deepExtend({}, this.options, userOptions);
        this._originalOptions = deepExtend({}, options);
        this._theme = themeOptions;
        this._initTheme(options, themeOptions);

        this._initHandlers();
        this._initSurface();

        this.bindCategories();
        FontLoader.preloadFonts(userOptions, () => {
            this.fontLoaded = true;
            if (!this._destroyed) {
                this.trigger('init');
                this._redraw();
                this._attachEvents();
            }
        });
    }

    _initElement(element) {
        this._setElementClass(element);
        element.style.position = "relative";
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        this.element = element;
    }

    _setElementClass(element) {
        addClass(element, "k-chart");
    }

    _initTheme(options, themeOptions) {
        const seriesCopies = [];
        const series = options.series || [];

        for (let i = 0; i < series.length; i++) {
            seriesCopies.push(Object.assign({}, series[i]));
        }
        options.series = seriesCopies;

        resolveAxisAliases(options);
        this.applyDefaults(options, themeOptions);

        // Clean up default if not overriden by data attributes
        if (options.seriesColors === null) {
            delete options.seriesColors;
        }

        this.options = deepExtend({}, themeOptions, options);
        this.applySeriesColors();
    }

    getSize() {
        const chartArea = this.options.chartArea || {};
        const width = chartArea.width ? parseInt(chartArea.width, 10) : Math.floor(this.element.offsetWidth);
        const height = chartArea.height ? parseInt(chartArea.height, 10) : Math.floor(this.element.offsetHeight);

        return {
            width: width,
            height: height
        };
    }

    resize(force) {
        const size = this.getSize();
        const currentSize = this._size;
        const hasSize = size.width > 0 || size.height > 0;

        if (force || hasSize && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
            this._size = size;
            this._resize(size, force);
            this.trigger("resize", size);
        } else if (hasSize && this._selections && this._selections.find(s => !s.visible)) {
            this._destroySelections();
            this._setupSelection();
        }
    }

    _resize() {
        this._noTransitionsRedraw();
    }

    redraw(paneName) {
        this.applyDefaults(this.options);
        this.applySeriesColors();

        if (paneName) {
            const plotArea = this._model._plotArea;
            const pane = plotArea.findPane(paneName);
            plotArea.redraw(pane);
        } else {
            this._redraw();
        }
    }

    getAxis(name) {
        return findAxisByName(name, this._plotArea.axes);
    }

    findAxisByName(name) {
        return this.getAxis(name);
    }

    findPaneByName(name) {
        const panes = this._plotArea.panes;

        for (let idx = 0; idx < panes.length; idx++) {
            if (panes[idx].options.name === name) {
                return new ChartPane(panes[idx]);
            }
        }
    }

    findPaneByIndex(idx) {
        const panes = this._plotArea.panes;
        if (panes[idx]) {
            return new ChartPane(panes[idx]);
        }
    }

    plotArea() {
        return new ChartPlotArea(this._plotArea);
    }

    toggleHighlight(show, filter) {
        const plotArea = this._plotArea;
        const firstSeries = (plotArea.srcSeries || plotArea.series || [])[0];
        let points;

        if (isFunction(filter)) {
            points = plotArea.filterPoints(filter);
        } else {
            let seriesName, categoryName;
            if (isObject(filter)) {
                seriesName = filter.series;
                categoryName = filter.category;
            } else {
                seriesName = categoryName = filter;
            }

            if (firstSeries.type === DONUT) {
                points = pointByCategoryName(plotArea.pointsBySeriesName(seriesName), categoryName);
            } else if (firstSeries.type === PIE || firstSeries.type === FUNNEL) {
                points = pointByCategoryName((plotArea.charts[0] || {}).points, categoryName);
            } else {
                points = plotArea.pointsBySeriesName(seriesName);
            }
        }

        if (points) {
            this.togglePointsHighlight(show, points);
        }
    }

    togglePointsHighlight(show, points) {
        const highlight = this._highlight;
        for (let idx = 0; idx < points.length; idx++) {
            highlight.togglePointHighlight(points[idx], show);
        }
    }

    showTooltip(filter) {
        const shared = this._sharedTooltip();
        const { _tooltip: tooltip, _plotArea: plotArea } = this;
        let point, categoryIndex;

        if (isFunction(filter)) {
            point = plotArea.findPoint(filter);
            if (point && shared) {
                categoryIndex = point.categoryIx;
            }
        } else if (shared && defined(filter)) {
            categoryIndex = plotArea.categoryAxis.categoryIndex(filter);
        }

        if (shared) {
            if (categoryIndex >= 0) {
                const points = this._plotArea.pointsByCategoryIndex(categoryIndex);
                tooltip.showAt(points);
            }
        } else if (point) {
            tooltip.show(point);
        }
    }

    hideTooltip() {
        this._tooltip.hide();
    }

    _initSurface() {
        const surface = this.surface;
        const wrap = this._surfaceWrap();

        const chartArea = this.options.chartArea || {};
        if (chartArea.width) {
            elementSize(wrap, { width: chartArea.width });
        }
        if (chartArea.height) {
            elementSize(wrap, { height: chartArea.height });
        }

        if (!surface || surface.options.type !== this.options.renderAs) {
            this._destroySurface();

            this.surface = draw.Surface.create(wrap, {
                type: this.options.renderAs
            });

            this.surface.bind("mouseenter", this._surfaceMouseenterHandler);
            this.surface.bind("mouseleave", this._surfaceMouseleaveHandler);

        } else {
            this.surface.clear();
            this.surface.resize();
        }
    }

    _surfaceWrap() {
        return this.element;
    }

    _redraw() {
        const model = this._getModel();
        this._size = {
            width: model.options.width,
            height: model.options.height
        };

        this._destroyView();

        this._model = model;
        this._plotArea = model._plotArea;

        model.renderVisual();

        if (this.options.transitions !== false) {
            model.traverse(function(element) {
                if (element.animation) {
                    element.animation.setup();
                }
            });
        }

        this._initSurface();
        this.surface.draw(model.visual);

        if (this.options.transitions !== false) {
            model.traverse(function(element) {
                if (element.animation) {
                    element.animation.play();
                }
            });
        }

        this._tooltip = this._createTooltip();
        this._highlight = new Highlight();
        this._setupSelection();
        this._createPannable();
        this._createZoomSelection();
        this._createMousewheelZoom();

        this.trigger(RENDER);
        triggerPaneRender(this._plotArea.panes);

        if (!this._navState) {
            this._cancelDomEvents();
        }
    }

    exportVisual(exportOptions) {
        let visual;
        if (exportOptions && (exportOptions.width || exportOptions.height || exportOptions.options)) {
            const currentOptions = this.options;
            const options = deepExtend({}, exportOptions.options, {
                chartArea: {
                    width: exportOptions.width,
                    height: exportOptions.height
                }
            });

            clearMissingValues(this._originalOptions, options);
            this.options = deepExtend({}, this._originalOptions, options);
            this._initTheme(this.options, this._theme);
            this.bindCategories();

            const model = this._getModel();

            model.renderVisual();
            triggerPaneRender(model._plotArea.panes);

            visual = model.visual;

            this.options = currentOptions;
        } else {
            visual = this.surface.exportVisual();
        }

        return visual;
    }

    _sharedTooltip() {
        return this._plotArea instanceof CategoricalPlotArea && this.options.tooltip && this.options.tooltip.shared;
    }

    _createPannable() {
        const options = this.options;
        if (options.pannable !== false) {
            this._pannable = new Pannable(this._plotArea, options.pannable);
        }
    }

    _createZoomSelection() {
        const zoomable = this.options.zoomable;
        const selection = (zoomable || {}).selection;
        if (zoomable !== false && selection !== false) {
            this._zoomSelection = new ZoomSelection(this, selection);
        }
    }

    _createMousewheelZoom() {
        const zoomable = this.options.zoomable;
        const mousewheel = (zoomable || {}).mousewheel;
        if (zoomable !== false && mousewheel !== false) {
            this._mousewheelZoom = new MousewheelZoom(this, mousewheel);
        }
    }

    _toggleDragZoomEvents() {
        const pannable = this.options.pannable;
        const zoomable = this.options.zoomable;
        const selection = (zoomable || {}).selection;
        const mousewheel = (zoomable || {}).mousewheel;
        const allowDrag = !pannable && (zoomable === false || selection === false) && !this.requiresHandlers([ DRAG_START, DRAG, DRAG_END ]);
        const allowZoom = (zoomable === false || mousewheel === false) && !this.requiresHandlers([ ZOOM_START, ZOOM, ZOOM_END ]);
        const element = this.element;

        if (this._dragZoomEnabled && allowDrag && allowZoom) {
            element.style.touchAction = this._touchAction || '';
            this._dragZoomEnabled = false;
        } else if (!this._dragZoomEnabled && !(allowDrag && allowZoom)) {
            element.style.touchAction = "none";

            this._dragZoomEnabled = true;
        }

        this._toggleDomEvents(!allowDrag, !allowZoom);
    }

    _toggleDomEvents(drag, zoom) {
        const domEvents = this.domEvents;
        if (!domEvents) {
            return;
        }

        if (domEvents.toggleDrag) {
            domEvents.toggleDrag(drag);
        }

        if (domEvents.toggleZoom) {
            domEvents.toggleZoom(zoom);
        }
    }

    _createTooltip() {
        const { options: { tooltip: tooltipOptions } } = this;
        let tooltip;

        if (this._sharedTooltip()) {
            tooltip = this._createSharedTooltip(tooltipOptions);
        } else {
            tooltip = new Tooltip(this.chartService, tooltipOptions);
        }

        return tooltip;
    }

    _createSharedTooltip(options) {
        return new SharedTooltip(this._plotArea, options);
    }

    applyDefaults(options, themeOptions) {
        applyAxisDefaults(options, themeOptions);
        applySeriesDefaults(options, themeOptions);
    }

    applySeriesColors() {
        const options = this.options;
        const series = options.series;
        const colors = options.seriesColors || [];

        for (let i = 0; i < series.length; i++) {
            const currentSeries = series[i];
            const seriesColor = colors[i % colors.length];
            const defaults = currentSeries._defaults;

            currentSeries.color = currentSeries.color || seriesColor;
            if (defaults) {
                defaults.color = defaults.color || seriesColor;
            }
        }
    }

    _getModel() {
        const options = this.options;
        const plotArea = this._createPlotArea();
        const model = new RootElement(this._modelOptions());
        model.chart = this;
        model._plotArea = plotArea;

        Title.buildTitle(options.title, model);

        if (options.legend && options.legend.visible) {
            model.append(new Legend(plotArea.options.legend, this.chartService));
        }
        model.append(plotArea);
        model.reflow();

        return model;
    }

    _modelOptions() {
        const options = this.options;
        const size = this.getSize();

        return deepExtend({
            transitions: options.transitions,
            width: size.width || DEFAULT_WIDTH,
            height: size.height || DEFAULT_HEIGHT
        }, options.chartArea);
    }

    _createPlotArea(skipSeries) {
        const options = this.options;

        const plotArea = PlotAreaFactory.current.create(skipSeries ? [] : options.series, options, this.chartService);

        return plotArea;
    }

    _setupSelection() {
        const { _plotArea: { axes } } = this;
        const selections = this._selections = [];

        for (let i = 0; i < axes.length; i++) {
            const axis = axes[i];
            const options = axis.options;
            if (axis instanceof CategoryAxis && options.select && !options.vertical) {
                const range = axis.range();

                const selection = new Selection(this, axis,
                    deepExtend({ min: range.min, max: range.max }, options.select)
                );

                selections.push(selection);
            }
        }
    }

    _selectStart(e) {
        return this.trigger(SELECT_START, e);
    }

    _select(e) {
        return this.trigger(SELECT, e);
    }

    _selectEnd(e) {
        return this.trigger(SELECT_END, e);
    }

    _initHandlers() {
        this._clickHandler = this._click.bind(this);
        this._mousewheelHandler = this._mousewheel.bind(this);
        this._mouseleaveHandler = this._mouseleave.bind(this);
        this._surfaceMouseenterHandler = this._mouseover.bind(this);
        this._surfaceMouseleaveHandler = this._mouseout.bind(this);

        this._mousemove = throttle(
            this._mousemove.bind(this),
            MOUSEMOVE_DELAY
        );
    }

    addObserver(observer) {
        if (observer) {
            this.observers.push(observer);
        }
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }

    requiresHandlers(eventNames) {
        const observers = this.observers;
        for (let idx = 0; idx < observers.length; idx++) {
            if (observers[idx].requiresHandlers(eventNames)) {
                return true;
            }
        }
    }

    trigger(name, args = {}) {
        if (name === SHOW_TOOLTIP) {
            args.anchor.point = this._toDocumentCoordinates(args.anchor.point);
        }
        args.sender = this;

        const observers = this.observers;
        let isDefaultPrevented = false;
        for (let idx = 0; idx < observers.length; idx++) {
            if (observers[idx].trigger(name, args)) {
                isDefaultPrevented = true;
            }
        }

        return isDefaultPrevented;
    }

    _attachEvents() {
        const element = this.element;

        this._touchAction = element.style.touchAction;

        bindEvents(element, {
            [ CONTEXTMENU ]: this._clickHandler,
            [ MOUSEWHEEL ]: this._mousewheelHandler,
            [ MOUSELEAVE ]: this._mouseleaveHandler
        });

        if (this._shouldAttachMouseMove()) {
            bindEvents(element, { [ MOUSEMOVE ]: this._mousemove });
        }

        this.domEvents = DomEventsBuilder.create(this.element, {
            start: this._start.bind(this),
            move: this._move.bind(this),
            end: this._end.bind(this),
            tap: this._tap.bind(this),
            gesturestart: this._gesturestart.bind(this),
            gesturechange: this._gesturechange.bind(this),
            gestureend: this._gestureend.bind(this)
        });

        this._toggleDragZoomEvents();
    }

    _mouseleave(e) {
        if (this._hoveredPoint) {
            this._hoveredPoint.out(this, e);
            this._hoveredPoint = null;
        }

        if (this._plotArea.hovered) {
            this.trigger(PLOT_AREA_LEAVE);
            this._plotArea.hovered = false;
        }
    }

    _cancelDomEvents() {
        if (this.domEvents && this.domEvents.cancel) {
            this.domEvents.cancel();
        }
    }

    _gesturestart(e) {
        if (this._mousewheelZoom && !this._stopChartHandlers(e)) {
            this._gestureDistance = e.distance;
            this._unsetActivePoint();
            this.surface.suspendTracking();
        }
    }

    _gestureend(e) {
        if (this._zooming && !this._stopChartHandlers(e)) {
            if (this.surface) {
                this.surface.resumeTracking();
            }
            this._zooming = false;
            this.trigger(ZOOM_END, {});
        }
    }

    _gesturechange(e) {
        const mousewheelZoom = this._mousewheelZoom;

        if (mousewheelZoom && !this._stopChartHandlers(e)) {
            e.preventDefault();
            const previousGestureDistance = this._gestureDistance;
            let scaleDelta = -e.distance / previousGestureDistance + 1;

            if (Math.abs(scaleDelta) >= 0.1) {
                scaleDelta = Math.round(scaleDelta * 10);

                this._gestureDistance = e.distance;
                const args = { delta: scaleDelta, axisRanges: axisRanges(this._plotArea.axes), originalEvent: e };
                if (this._zooming || !this.trigger(ZOOM_START, args)) {

                    if (!this._zooming) {
                        this._zooming = true;
                    }

                    const ranges = args.axisRanges = mousewheelZoom.updateRanges(scaleDelta);
                    if (ranges && !this.trigger(ZOOM, args)) {
                        mousewheelZoom.zoom();
                    }
                }
            }
        }
    }

    _mouseout(e) {
        if (e.element) {
            const element = this._drawingChartElement(e.element, e);

            if (element && element.leave) {
                element.leave(this, e.originalEvent);
            }
        }
    }

    _start(e) {
        const coords = this._eventCoordinates(e);

        if (this._stopChartHandlers(e) || !this._plotArea.backgroundContainsPoint(coords)) {
            return;
        }


        if (this.requiresHandlers([ DRAG_START, DRAG, DRAG_END ])) {
            this._startNavigation(e, coords, DRAG_START);
        }

        if (this._pannable && this._pannable.start(e)) {
            this.surface.suspendTracking();
            this._unsetActivePoint();
            this._suppressHover = true;
            this.chartService.panning = true;
        }

        if (this._zoomSelection) {
            if (this._zoomSelection.start(e)) {
                this.trigger(ZOOM_START, { axisRanges: axisRanges(this._plotArea.axes), originalEvent: e });
            }
        }
    }

    _move(e) {
        let { _navState: state, _pannable: pannable } = this;

        if (this._stopChartHandlers(e)) {
            return;
        }

        if (pannable) {
            const ranges = pannable.move(e);

            if (ranges && !this.trigger(DRAG, { axisRanges: ranges, originalEvent: e })) {
                pannable.pan();
            }
        } else if (state) {
            const ranges = {};
            const axes = state.axes;

            for (let i = 0; i < axes.length; i++) {
                const currentAxis = axes[i];
                const axisName = currentAxis.options.name;
                if (axisName) {
                    const axis = currentAxis.options.vertical ? e.y : e.x;
                    const delta = axis.startLocation - axis.location;

                    if (delta !== 0) {
                        ranges[currentAxis.options.name] = currentAxis.translateRange(delta);
                    }
                }
            }

            state.axisRanges = ranges;
            this.trigger(DRAG, {
                axisRanges: ranges,
                originalEvent: e
            });
        }

        if (this._zoomSelection) {
            this._zoomSelection.move(e);
        }
    }

    _end(e) {
        if (this._stopChartHandlers(e)) {
            return;
        }

        const pannable = this._pannable;
        if (pannable && pannable.end(e)) {
            this.surface.resumeTracking();
            this.trigger(DRAG_END, {
                axisRanges: axisRanges(this._plotArea.axes),
                originalEvent: e
            });
            this._suppressHover = false;
            this.chartService.panning = false;
        } else {
            this._endNavigation(e, DRAG_END);
        }

        if (this._zoomSelection) {
            const ranges = this._zoomSelection.end(e);
            if (ranges && !this.trigger(ZOOM, { axisRanges: ranges, originalEvent: e })) {
                this._zoomSelection.zoom();
                this.trigger(ZOOM_END, { axisRanges: ranges, originalEvent: e });
            }
        }
    }

    _stopChartHandlers(e) {
        const selections = this._selections || [];
        if (!selections.length) {
            return false;
        }

        const coords = this._eventCoordinates(e);
        const pane = this._plotArea.paneByPoint(coords);
        if (pane) {
            for (let idx = 0; idx < selections.length; idx++) {
                if (selections[idx].onPane(pane)) {
                    return true;
                }
            }
        }
    }

    _mousewheel(e) {
        const delta = mousewheelDelta(e);
        const mousewheelZoom = this._mousewheelZoom;
        const coords = this._eventCoordinates(e);

        if (this._stopChartHandlers(e) || !this._plotArea.backgroundContainsPoint(coords)) {
            return;
        }

        if (mousewheelZoom) {
            const args = { delta: delta, axisRanges: axisRanges(this._plotArea.axes), originalEvent: e };
            if (this._zooming || !this.trigger(ZOOM_START, args)) {
                e.preventDefault();

                if (!this._zooming) {
                    this._unsetActivePoint();
                    this.surface.suspendTracking();
                    this._zooming = true;
                }

                if (this._mwTimeout) {
                    clearTimeout(this._mwTimeout);
                }

                args.axisRanges = mousewheelZoom.updateRanges(delta);
                if (args.axisRanges && !this.trigger(ZOOM, args)) {
                    mousewheelZoom.zoom();
                }

                this._mwTimeout = setTimeout(() => {
                    this.trigger(ZOOM_END, args);
                    this._zooming = false;
                    if (this.surface) {
                        this.surface.resumeTracking();
                    }
                }, MOUSEWHEEL_DELAY);
            }
        } else {
            let state = this._navState;
            if (!state) {
                const prevented = this._startNavigation(e, coords, ZOOM_START);
                if (!prevented) {
                    state = this._navState;
                }
            }

            if (state) {
                const totalDelta = state.totalDelta || delta;
                state.totalDelta = totalDelta + delta;

                const axes = this._navState.axes;
                const ranges = {};

                for (let i = 0; i < axes.length; i++) {
                    const currentAxis = axes[i];
                    const axisName = currentAxis.options.name;
                    if (axisName) {
                        ranges[axisName] = currentAxis.scaleRange(-totalDelta);
                    }
                }

                this.trigger(ZOOM, {
                    delta: delta,
                    axisRanges: ranges,
                    originalEvent: e
                });

                if (this._mwTimeout) {
                    clearTimeout(this._mwTimeout);
                }

                this._mwTimeout = setTimeout(() => {
                    this._endNavigation(e, ZOOM_END);
                }, MOUSEWHEEL_DELAY);
            }
        }
    }

    _startNavigation(e, coords, chartEvent) {
        const plotArea = this._model._plotArea;
        const pane = plotArea.findPointPane(coords);
        const axes = plotArea.axes.slice(0);

        if (!pane) {
            return;
        }

        const ranges = axisRanges(axes);

        const prevented = this.trigger(chartEvent, {
            axisRanges: ranges,
            originalEvent: e
        });

        if (prevented) {
            this._cancelDomEvents();
        } else {
            this._suppressHover = true;
            this._unsetActivePoint();
            this._navState = {
                axisRanges: ranges,
                pane: pane,
                axes: axes
            };
        }
    }

    _endNavigation(e, chartEvent) {
        if (this._navState) {
            this.trigger(chartEvent, {
                axisRanges: this._navState.axisRanges,
                originalEvent: e
            });
            this._suppressHover = false;
            this._navState = null;
        }
    }

    _getChartElement(e, match) {
        const element = this.surface.eventTarget(e);
        if (element) {
            return this._drawingChartElement(element, e, match);
        }
    }

    _drawingChartElement(element, e, match) {
        let current = element;
        let chartElement;
        while (current && !chartElement) {
            chartElement = current.chartElement;
            current = current.parent;
        }

        if (chartElement) {
            if (chartElement.aliasFor) {
                chartElement = chartElement.aliasFor(e, this._eventCoordinates(e));
            }

            if (match) {
                chartElement = chartElement.closest(match);
                if (chartElement && chartElement.aliasFor) {
                    chartElement = chartElement.aliasFor();
                }
            }

            return chartElement;
        }
    }

    _eventCoordinates(e) {
        const coordinates = eventCoordinates(e);
        return this._toModelCoordinates(coordinates.x, coordinates.y);
    }

    _elementPadding() {
        if (!this._padding) {
            const { paddingLeft, paddingTop } = elementStyles(this.element, [ "paddingLeft", "paddingTop" ]);
            this._padding = {
                top: paddingTop,
                left: paddingLeft
            };
        }

        return this._padding;
    }

    _toDocumentCoordinates(point) {
        const padding = this._elementPadding();
        const offset = elementOffset(this.element);

        return {
            left: round(point.x + padding.left + offset.left),
            top: round(point.y + padding.top + offset.top)
        };
    }

    _toModelCoordinates(clientX, clientY) {
        const element = this.element;
        const offset = elementOffset(element);
        const padding = this._elementPadding();

        return new Point(
            clientX - offset.left - padding.left,
            clientY - offset.top - padding.top
        );
    }

    _tap(e) {
        const drawingElement = this.surface.eventTarget(e);
        const element = this._drawingChartElement(drawingElement, e);
        const sharedTooltip = this._sharedTooltip();

        if (!this._startHover(drawingElement, e) && !sharedTooltip) {
            this._unsetActivePoint();
        }

        if (sharedTooltip) {
            this._trackSharedTooltip(this._eventCoordinates(e), e, true);
        }

        this._propagateClick(element, e);

        //part of fix for hover issue on windows touch
        this.handlingTap = true;
        setTimeout(() => {
            this.handlingTap = false;
        }, 0);
    }

    _click(e) {
        const element = this._getChartElement(e);
        this._propagateClick(element, e);
    }

    _propagateClick(element, e) {
        let current = element;
        while (current) {
            if (current.click) {
                current.click(this, e);
            }

            current = current.parent;
        }
    }

    _startHover(element, e) {
        if (this._suppressHover) {
            return false;
        }

        const point = this._drawingChartElement(element, e, function(element) {
            return (element.hover || element.over) && !(element instanceof PlotAreaBase);
        });

        const activePoint = this._activePoint;
        const hoveredPoint = this._hoveredPoint;

        if (hoveredPoint && hoveredPoint !== point) {
            hoveredPoint.out(this, e);
            this._hoveredPoint = null;
        }

        if (point && hoveredPoint !== point && point.over) {
            this._hoveredPoint = point;
            point.over(this, e);
        }

        if (point && activePoint !== point && point.hover) {
            this._activePoint = point;

            if (!this._sharedTooltip() && !point.hover(this, e)) {
                const tooltipOptions = deepExtend({}, this.options.tooltip, point.options.tooltip);
                if (tooltipOptions.visible) {
                    this._tooltip.show(point);
                }

                this._highlight.show(point);
            }
        }

        return point;
    }

    _mouseover(e) {
        const point = this._startHover(e.element, e.originalEvent);

        if (point && point.tooltipTracking && !this._mouseMoveTrackHandler && !this._sharedTooltip()) {
            this._mouseMoveTrackHandler = this._mouseMoveTracking.bind(this);
            bindEvents(document, {
                [ MOUSEMOVE ]: this._mouseMoveTrackHandler
            });
        }
    }

    _mouseMoveTracking(e) {
        const { options, _tooltip: tooltip, _highlight: highlight, _activePoint: point } = this;
        const coords = this._eventCoordinates(e);

        if (this._plotArea.box.containsPoint(coords)) {
            if (point && point.tooltipTracking && point.series && point.parent.getNearestPoint) {
                const seriesPoint = point.parent.getNearestPoint(coords.x, coords.y, point.seriesIx);
                if (seriesPoint && seriesPoint !== point) {
                    this._activePoint = seriesPoint;

                    if (!seriesPoint.hover(this, e)) {
                        const tooltipOptions = deepExtend({}, options.tooltip, seriesPoint.options.tooltip);
                        if (tooltipOptions.visible) {
                            tooltip.show(seriesPoint);
                        }

                        highlight.show(seriesPoint);
                    }
                }
            }
        } else {
            unbindEvents(document, {
                [ MOUSEMOVE ]: this._mouseMoveTrackHandler
            });
            this._unsetActivePoint();
            this._mouseMoveTrackHandler = null;
        }
    }

    _mousemove(e) {
        const coords = this._eventCoordinates(e);
        const plotArea = this._plotArea;

        this._trackCrosshairs(coords);

        if (plotArea.hover) {
            const overPlotArea = plotArea.backgroundContainsPoint(coords);
            if (overPlotArea) {
                plotArea.hovered = true;
                this._plotArea.hover(this, e);
            } else if (plotArea.hovered && !overPlotArea) {
                this.trigger(PLOT_AREA_LEAVE);
                plotArea.hovered = false;
            }
        }

        if (this._sharedTooltip()) {
            this._trackSharedTooltip(coords, e);
        }
    }

    _trackCrosshairs(coords) {
        const crosshairs = this._plotArea.crosshairs;

        for (let i = 0; i < crosshairs.length; i++) {
            const current = crosshairs[i];

            if (current.box.containsPoint(coords)) {
                current.showAt(coords);
            } else {
                current.hide();
            }
        }
    }

    _trackSharedTooltip(coords, e, toggle) {
        if (this._suppressHover) {
            return;
        }

        const { options: { tooltip: tooltipOptions }, _plotArea: plotArea, _plotArea: { categoryAxis }, _tooltip: tooltip, _highlight: highlight } = this;

        if (plotArea.backgroundContainsPoint(coords)) {
            const index = categoryAxis.pointCategoryIndex(coords);
            if (index !== this._tooltipCategoryIx || (!this._sharedHighlight && toggle)) {
                const points = plotArea.pointsByCategoryIndex(index);
                const pointArgs = points.map(function(point) {
                    return point.eventArgs(e);
                });
                const hoverArgs = pointArgs[0] || {};
                hoverArgs.categoryPoints = pointArgs;

                if (points.length > 0 && !this.trigger(SERIES_HOVER, hoverArgs)) {
                    if (tooltipOptions.visible) {
                        tooltip.showAt(points, coords);
                    }

                    highlight.show(points);

                    this._sharedHighlight = true;
                } else {
                    tooltip.hide();
                }

                this._tooltipCategoryIx = index;
            } else if (toggle && this._sharedHighlight) {
                highlight.hide();
                tooltip.hide();
                this._sharedHighlight = false;
            }
        } else if (this._sharedHighlight) {
            highlight.hide();
            tooltip.hide();
            this._tooltipCategoryIx = null;
            this._sharedHighlight = false;
        }
    }

    hideElements() {
        const plotArea = this._plotArea;
        this._mousemove.cancel();

        plotArea.hideCrosshairs();

        this._unsetActivePoint();
    }

    _unsetActivePoint() {
        const { _tooltip: tooltip, _highlight: highlight } = this;

        this._activePoint = null;
        this._hoveredPoint = null;

        if (tooltip) {
            tooltip.hide();
        }

        this._tooltipCategoryIx = null;
        this._sharedHighlight = false;

        if (highlight) {
            highlight.hide();
        }
    }

    _deferRedraw() {
        this._redraw();
    }

    _clearRedrawTimeout() {
        if (this._redrawTimeout) {
            clearInterval(this._redrawTimeout);
            this._redrawTimeout = null;
        }
    }

    bindCategories() {
        const options = this.options;
        const definitions = [].concat(options.categoryAxis);

        for (let axisIx = 0; axisIx < definitions.length; axisIx++) {
            const axis = definitions[axisIx];
            if (axis.autoBind !== false) {
                this.bindCategoryAxisFromSeries(axis, axisIx);
            }
        }
    }

    bindCategoryAxisFromSeries(axis, axisIx) {
        const series = this.options.series;
        const seriesLength = series.length;
        const uniqueCategories = new HashMap();//perf improvement in case type category with dates
        let items = [];
        let bindable = false;
        let dateAxis;

        for (let seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
            const s = series[seriesIx];
            const onAxis = s.categoryAxis === axis.name || (!s.categoryAxis && axisIx === 0);
            const data = s.data;
            const dataLength = data.length;
            const bind = s.categoryField && onAxis;
            bindable = bind || bindable;

            if (bind && dataLength > 0) {
                dateAxis = isDateAxis(axis, getField(s.categoryField, data[0]));

                const getFn = dateAxis ? getDateField : getField;

                for (let dataIx = 0; dataIx < dataLength; dataIx++) {
                    const dataRow = data[dataIx];
                    const category = getFn(s.categoryField, dataRow, this.chartService.intl);

                    if (dateAxis || !uniqueCategories.get(category)) {
                        items.push([ category, dataRow ]);

                        if (!dateAxis) {
                            uniqueCategories.set(category, true);
                        }
                    }
                }
            }
        }

        if (items.length > 0) {
            if (dateAxis) {
                items = uniqueDates(items, function(a, b) {
                    return dateComparer(a[0], b[0]);
                });
            }

            const result = transpose(items);
            axis.categories = result[0];
        } else if (bindable) {
            axis.categories = [];
        }
    }

    _isBindable(series) {
        const valueFields = SeriesBinder.current.valueFields(series);
        let result = true;

        for (let i = 0; i < valueFields.length; i++) {
            let field = valueFields[i];
            if (field === VALUE) {
                field = "field";
            } else {
                field = field + "Field";
            }

            if (!defined(series[field])) {
                result = false;
                break;
            }
        }

        return result;
    }

    _noTransitionsRedraw() {
        const options = this.options;
        let transitionsState;

        if (options.transitions !== false) {
            options.transitions = false;
            transitionsState = true;
        }

        this._redraw();

        if (transitionsState) {
            options.transitions = true;
        }
    }

    _legendItemHover(seriesIndex, pointIndex) {
        const { _plotArea: plotArea, _highlight: highlight } = this;
        const currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex];
        let items;

        if (inArray(currentSeries.type, [ PIE, DONUT, FUNNEL ])) {
            items = plotArea.findPoint(function(point) {
                return point.series.index === seriesIndex && point.index === pointIndex;
            });
        } else {
            items = plotArea.pointsBySeriesIndex(seriesIndex);
        }

        highlight.show(items);
    }

    _shouldAttachMouseMove() {
        return this._plotArea.crosshairs.length || (this._tooltip && this._sharedTooltip()) || this.requiresHandlers([ PLOT_AREA_HOVER, PLOT_AREA_LEAVE ]);
    }

    updateMouseMoveHandler() {
        unbindEvents(this.element, {
            [ MOUSEMOVE ]: this._mousemove
        });

        if (this._shouldAttachMouseMove()) {
            bindEvents(this.element, {
                [ MOUSEMOVE ]: this._mousemove
            });
        }
    }

    applyOptions(options, theme) {
        clearMissingValues(this._originalOptions, options);
        this._originalOptions = deepExtend(this._originalOptions, options);
        this.options = deepExtend({}, this._originalOptions);

        if (theme) {
            this._theme = theme;
            this.chartService.theme = theme;
        }
        this._initTheme(this.options, this._theme);

        this._toggleDragZoomEvents();
    }

    setOptions(options, theme) {
        this.applyOptions(options, theme);
        this.bindCategories();
        this.redraw();
        this.updateMouseMoveHandler();
    }

    setDirection(rtl) {
        this.chartService.rtl = Boolean(rtl);
        if (this.surface && this.surface.type === 'svg') {
            this._destroySurface();
        }
    }

    setIntlService(intl) {
        this.chartService.intl = intl;
    }

    noTransitionsRedraw() {
        this._noTransitionsRedraw();
    }

    destroy() {
        this._destroyed = true;

        unbindEvents(this.element, {
            [ CONTEXTMENU ]: this._clickHandler,
            [ MOUSEWHEEL ]: this._mousewheelHandler,
            [ MOUSEMOVE ]: this._mousemove,
            [ MOUSELEAVE ]: this._mouseleaveHandler
        });

        if (this.domEvents) {
            this.domEvents.destroy();
            delete this.domEvents;
        }

        if (this._mouseMoveTrackHandler) {
            unbindEvents(document, {
                [ MOUSEMOVE ]: this._mouseMoveTrackHandler
            });
        }

        this._destroyView();

        this._destroySurface();

        this._clearRedrawTimeout();
    }

    _destroySurface() {
        const surface = this.surface;
        if (surface) {
            surface.unbind("mouseenter", this._surfaceMouseenterHandler);
            surface.unbind("mouseleave", this._surfaceMouseleaveHandler);
            surface.destroy();

            this.surface = null;
        }
    }

    _destroySelections() {
        const selections = this._selections;

        if (selections) {
            while (selections.length > 0) {
                selections.shift().destroy();
            }
        }
    }

    _destroyView() {
        const model = this._model;

        if (model) {
            model.destroy();
            this._model = null;
        }

        this._unsetActivePoint();

        this._destroySelections();

        if (this._tooltip) {
            this._tooltip.destroy();
        }

        if (this._highlight) {
            this._highlight.destroy();
        }

        if (this._zoomSelection) {
            this._zoomSelection.destroy();
            delete this._zoomSelection;
        }

        if (this._pannable) {
            this._pannable.destroy();
            delete this._pannable;
        }

        if (this._mousewheelZoom) {
            this._mousewheelZoom.destroy();
            delete this._mousewheelZoom;
        }
    }
}

function resolveAxisAliases(options) {
    const aliases = AXIS_NAMES;

    for (let idx = 0; idx < aliases.length; idx++) {
        const alias = aliases[idx] + "Axes";
        if (options[alias]) {
            options[aliases[idx] + "Axis"] = options[alias];
            delete options[alias];
        }
    }
}

function pointByCategoryName(points, name) {
    if (points) {
        for (let idx = 0; idx < points.length; idx++) {
            if (points[idx].category === name) {
                return [ points[idx] ];
            }
        }
    }
}

function applyAxisDefaults(options, themeOptions) {
    const themeAxisDefaults = ((themeOptions || {}).axisDefaults) || {};
    let axisName, axisDefaults, axes;

    function mapAxisOptions(axisOptions) {
        const axisColor = (axisOptions || {}).color || axisDefaults.color;
        const result = deepExtend({},
            themeAxisDefaults,
            themeAxisDefaults[axisName],
            axisDefaults,
            axisDefaults[axisName], {
                line: { color: axisColor },
                labels: { color: axisColor },
                title: { color: axisColor }
            },
            axisOptions
        );

        delete result[axisName];

        return result;
    }

    for (let idx = 0; idx < AXIS_NAMES.length; idx++) {
        axisName = AXIS_NAMES[idx] + "Axis";
        axisDefaults = options.axisDefaults || {};
        axes = [].concat(options[axisName]);

        axes = axes.map(mapAxisOptions);

        options[axisName] = axes.length > 1 ? axes : axes[0];
    }
}

function applySeriesDefaults(options, themeOptions) {
    const series = options.series;
    const seriesLength = series.length;
    const seriesDefaults = options.seriesDefaults;
    const commonDefaults = deepExtend({}, options.seriesDefaults);
    const themeSeriesDefaults = themeOptions ? deepExtend({}, themeOptions.seriesDefaults) : {};
    const commonThemeDefaults = deepExtend({}, themeSeriesDefaults);

    cleanupNestedSeriesDefaults(commonDefaults);
    cleanupNestedSeriesDefaults(commonThemeDefaults);

    for (let i = 0; i < seriesLength; i++) {
        const seriesType = series[i].type || options.seriesDefaults.type;

        const baseOptions = deepExtend(
            { data: [] },
            commonThemeDefaults,
            themeSeriesDefaults[seriesType],
            { tooltip: options.tooltip },
            commonDefaults,
            seriesDefaults[seriesType]
        );

        series[i]._defaults = baseOptions;
        series[i] = deepExtend({}, baseOptions, series[i]);
        series[i].data = series[i].data || [];
    }
}

function cleanupNestedSeriesDefaults(seriesDefaults) {
    delete seriesDefaults.bar;
    delete seriesDefaults.column;
    delete seriesDefaults.rangeColumn;
    delete seriesDefaults.line;
    delete seriesDefaults.verticalLine;
    delete seriesDefaults.pie;
    delete seriesDefaults.donut;
    delete seriesDefaults.area;
    delete seriesDefaults.verticalArea;
    delete seriesDefaults.scatter;
    delete seriesDefaults.scatterLine;
    delete seriesDefaults.bubble;
    delete seriesDefaults.candlestick;
    delete seriesDefaults.ohlc;
    delete seriesDefaults.boxPlot;
    delete seriesDefaults.bullet;
    delete seriesDefaults.verticalBullet;
    delete seriesDefaults.polarArea;
    delete seriesDefaults.polarLine;
    delete seriesDefaults.radarArea;
    delete seriesDefaults.radarLine;
    delete seriesDefaults.waterfall;
}


function axisRanges(axes) {
    const ranges = {};

    for (let i = 0; i < axes.length; i++) {
        const axis = axes[i];
        const axisName = axis.options.name;
        if (axisName) {
            ranges[axisName] = axis.range();
        }
    }

    return ranges;
}

function sortDates(dates, comparer = dateComparer) {
    for (let i = 1, length = dates.length; i < length; i++) {
        if (comparer(dates[i], dates[i - 1]) < 0) {
            dates.sort(comparer);
            break;
        }
    }

    return dates;
}

function uniqueDates(srcDates, comparer = dateComparer) {
    const dates = sortDates(srcDates, comparer);
    const length = dates.length;
    const result = length > 0 ? [ dates[0] ] : [];

    for (let i = 1; i < length; i++) {
        if (comparer(dates[i], last(result)) !== 0) {
            result.push(dates[i]);
        }
    }

    return result;
}

function transpose(rows) {
    const rowCount = rows.length;
    const result = [];

    for (let rowIx = 0; rowIx < rowCount; rowIx++) {
        const row = rows[rowIx];
        const colCount = row.length;

        for (let colIx = 0; colIx < colCount; colIx++) {
            result[colIx] = result[colIx] || [];
            result[colIx].push(row[colIx]);
        }
    }

    return result;
}

const DATA_FIELDS = [ 'data', 'categories' ];

function clearMissingValues(originalOptions, options) {
    for (let field in options) {
        if (!inArray(field, DATA_FIELDS) && options.hasOwnProperty(field)) {
            const fieldValue = options[field];
            const originalValue = originalOptions[field];
            if (defined(originalValue)) {
                const nullValue = fieldValue === null;
                if ((nullValue || !defined(fieldValue))) {
                    delete originalOptions[field];
                    if (nullValue) {
                        delete options[field];
                    }
                } else if (originalValue && isObject(fieldValue)) {
                    if (isObject(originalValue)) {
                        clearMissingValues(originalValue, fieldValue);
                    }
                }
            }
        }
    }
}

function triggerPaneRender(panes) {
    for (let idx = 0; idx < panes.length; idx++) {
        panes[idx].notifyRender();
    }
}

setDefaultOptions(Chart, {
    renderAs: "",
    chartArea: {},
    legend: {
        visible: true,
        labels: {}
    },
    categoryAxis: {},
    seriesDefaults: {
        type: COLUMN,
        data: [],
        highlight: {
            visible: true
        },
        labels: {},
        negativeValues: {
            visible: false
        }
    },
    series: [],
    seriesColors: null,
    tooltip: {
        visible: false
    },
    transitions: true,
    valueAxis: {},
    plotArea: {},
    title: {},
    xAxis: {},
    yAxis: {},
    panes: [ {} ],
    pannable: false,
    zoomable: false
});

export default Chart;
