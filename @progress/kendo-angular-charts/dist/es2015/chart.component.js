import { Component, ContentChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { auditTime, tap } from 'rxjs/operators';
import { ChartComponentGenerated } from './chart.component.generated';
import { ConfigurationService, THROTTLE_MS } from './common/configuration.service';
import { LegendItemClickEvent } from './events/legend-item-click-event';
import { InstanceEventService } from './events/instance-event.service';
import { DonutCenterTemplateDirective } from './chart/donut-center-template.directive';
import { SeriesItemComponent } from './chart/series-item.component';
import { ThemeService } from './common/theme.service';
import { ChartInstanceObserver } from './common/chart-instance-observer';
import { TooltipTemplateService } from './common/tooltip-template.service';
import { TooltipPopupComponent } from './chart/tooltip/tooltip-popup.component';
import { CrosshairTooltipsContainerComponent } from './chart/tooltip/crosshair-tooltips-container.component';
import { hasParent } from './common/has-parent';
import { RenderEvent } from './events/render-event';
import { IntlService } from '@progress/kendo-angular-intl';
import { Chart } from '@progress/kendo-charts';
import { exportSVG, exportImage } from '@progress/kendo-drawing';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { copyChanges } from './common/copy-changes';
import './chart-defaults';
import { toSimpleChanges } from './common/to-simple-changes';
function hasObservers(emitter) {
    return emitter.observers.length > 0;
}
/**
 * The root Chart component.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <button (click)="toggleLegend()">Toggle Legend</button>
 *     <button (click)="toggleSeries()">Toggle Series</button>
 *     <kendo-chart>
 *       <kendo-chart-legend [visible]="legendVisible">
 *       </kendo-chart-legend>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item *ngIf="seriesVisible" name="Series #1"
 *                                   type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 *   public legendVisible: boolean = true;
 *   public seriesVisible: boolean = true;
 *
 *   public toggleSeries(): void {
 *     this.seriesVisible = !this.seriesVisible;
 *   }
 *
 *   public toggleLegend(): void {
 *     this.legendVisible = !this.legendVisible;
 *   }
 * }
 *
 * ```
 */
export class ChartComponent extends ChartComponentGenerated {
    constructor(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        super(configurationService);
        this.configurationService = configurationService;
        this.themeService = themeService;
        this.element = element;
        this.intl = intl;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.instanceEventService = instanceEventService;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        /**
         * Fires when a legend item is clicked before the selected series visibility is toggled.
         * Can be prevented.
         */
        this.legendItemClick = new EventEmitter();
        /**
         * Limits the automatic resizing of the Chart. Sets the maximum number of times per second
         * that the component redraws its content when the size of its container changes.
         * Defaults to `10`. To disable the automatic resizing, set it to `0`.
         *
         * @example
         * ```ts
         * _@Component({
         *     selector: 'my-app',
         *     template: `
         *         <kendo-chart [resizeRateLimit]="2">
         * <!--                 ^^^^^^^^^^^^^^^^^^^^^^
         *       Will update the size of the Chart up to two times a second.
         *       Resize the Plunkr pane or window to try it out.
         * -->
         *          <kendo-chart-series>
         *            <kendo-chart-series-item [data]="seriesData">
         *           </kendo-chart-series-item>
         *         </kendo-chart-series>
         *       </kendo-chart>
         *   `
         * })
         * export class AppComponent {
         *    seriesData: number[] = [1, 2, 3, 5];
         * }
         * ```
         */
        this.resizeRateLimit = 10;
        this.className = true;
        this.theme = null;
        this.suppressTransitions = false;
        this.rtl = false;
        this.themeService.loadTheme();
        this.refreshWait();
    }
    ngAfterViewInit() {
        if (this.canRender) {
            this.ngZone.runOutsideAngular(() => {
                const chartMouseleave = this.renderer.listen(this.surfaceElement.nativeElement, 'mouseleave', this.chartMouseleave.bind(this));
                this.domSubscriptions = () => {
                    chartMouseleave();
                };
            });
        }
        this.setDirection();
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.subscriptions.add(this.localizationService.changes.subscribe(this.rtlChange.bind(this)));
    }
    ngAfterViewChecked() {
        if (this.instance && this.autoResize) {
            this.ngZone.runOutsideAngular(() => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.resize();
                }, 0);
            });
        }
    }
    ngOnChanges(changes) {
        const store = this.configurationService.store;
        copyChanges(changes, store);
        store.popupSettings = null;
        this.configurationService.push(store);
    }
    /**
     * Updates the component fields with the specified values and refreshes the Chart.
     *
     * Use this method when the configuration values cannot be set through the template.
     *
     * @example
     * ```ts-no-run
     * chart.notifyChanges({ title: { text: 'New Title' } });
     * ```
     *
     * @param changes An object containing the updated input fields.
     */
    notifyChanges(changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    }
    ngOnDestroy() {
        this.destroyed = true;
        this.subscription.unsubscribe();
        if (this.domSubscriptions) {
            this.domSubscriptions();
            this.domSubscriptions = null;
        }
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        clearTimeout(this.resizeTimeout);
        clearTimeout(this.redrawTimeout);
    }
    createInstance(element, observer) {
        this.instance = new Chart(element, this.options, this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    }
    /**
     * Exports the Chart as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image encoded as a Data URI.
     */
    exportImage(options = {}) {
        return exportImage(this.exportVisual(options), options);
    }
    /**
     * Exports the Chart as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param options - The parameters for the exported file.
     * @returns - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    exportSVG(options = {}) {
        return exportSVG(this.exportVisual(options), options);
    }
    /**
     * Exports the Chart as a Drawing `Scene`.
     *
     * @param options - The parameters for the export operation.
     * @returns - The root Group of the scene.
     */
    exportVisual(options = {}) {
        return this.instance.exportVisual(options);
    }
    /**
     * Returns the axis with the specified name.
     *
     * @param {string} name - The axis name.
     * @returns {ChartAxis} - The axis with a corresponding name.
     */
    findAxisByName(name) {
        if (this.instance) {
            return this.instance.findAxisByName(name);
        }
    }
    /**
     * Returns the pane at the specified index.
     *
     * @param {number} index - The pane index.
     * @returns {ChartPane} - The pane at the specified index.
     */
    findPaneByIndex(index) {
        if (this.instance) {
            return this.instance.findPaneByIndex(index);
        }
    }
    /**
     * Returns the pane with the specified name.
     *
     * @param {string} name - The name of the pane.
     * @returns {ChartPane} - The pane with the provided name.
     */
    findPaneByName(name) {
        if (this.instance) {
            return this.instance.findPaneByName(name);
        }
    }
    /**
     * Returns the plot area of the Chart.
     * @returns {ChartPlotArea} - The plot area of the Chart.
     */
    getPlotArea() {
        if (this.instance) {
            return this.instance.plotArea();
        }
    }
    /**
     * Highlights the series points or the segments of a Pie, Donut, or Funnel charts.
     *
     * In the following example, the callback is evaluated for each data point.
     * If the function returns `true`, the point is highlighted.
     *
     * @example
     * ```ts
     * import { Component, ViewChild } from '@angular/core';
     * import { PlotBand, ChartComponent } from '@progress/kendo-angular-charts';
     *
     * _@Component({
     *  selector: 'my-app',
     *  template: `
     *    <button (click)="toggleHighlight()">Toggle highlight for Google</button>
     *    <kendo-chart #chart>
     *      <kendo-chart-series>
     *        <kendo-chart-title text="Job Growth"></kendo-chart-title>
     *      <kendo-chart-series-item type="bubble" [data]="data"
     *                                 xField="x" yField="y" sizeField="size" categoryField="category">
     *        </kendo-chart-series-item>
     *        <kendo-chart-x-axis>
     *          <kendo-chart-x-axis-item [axisCrossingValue]="-5000" [majorUnit]="2000" [plotBands]="xPlotBands">
     *              <kendo-chart-x-axis-item-labels format="{0:N0}" [skip]="1" rotation="auto">
     *              </kendo-chart-x-axis-item-labels>
     *          </kendo-chart-x-axis-item>
     *        </kendo-chart-x-axis>
     *        <kendo-chart-y-axis>
     *          <kendo-chart-y-axis-item [labels]="{ format: '{0:N0}' }">
     *          </kendo-chart-y-axis-item>
     *        </kendo-chart-y-axis>
     *        <kendo-chart-tooltip format="{3}: {2:N0} applications" [opacity]="1">
     *        </kendo-chart-tooltip>
     *        <kendo-chart-legend [visible]="false">
     *        </kendo-chart-legend>
     *      </kendo-chart-series>
     *    </kendo-chart>
     *  `
     * })
     * export class AppComponent {
     *  xPlotBands: PlotBand[] = [{
     *      from: -5000,
     *      to: 0,
     *      color: "#00f",
     *      opacity: 0.05
     *  }];
     *
     *    public data: any = [{
     *       x: -2500,
     *       y: 50000,
     *       size: 500000,
     *       category: "Microsoft"
     *    }, {
     *       x: 500,
     *       y: 110000,
     *       size: 7600000,
     *       category: "Starbucks"
     *    }, {
     *       x: 7000,
     *       y: 19000,
     *       size: 700000,
     *       category: "Google"
     *    }, {
     *       x: 1400,
     *       y: 150000,
     *       size: 700000,
     *       category: "Publix Super Markets"
     *    }, {
     *       x: 2400,
     *     y: 30000,
     *       size: 300000,
     *       category: "PricewaterhouseCoopers"
     *    }, {
     *       x: 2450,
     *       y: 34000,
     *       size: 90000,
     *       category: "Cisco"
     *    }, {
     *       x: 2700,
     *       y: 34000,
     *       size: 400000,
     *       category: "Accenture"
     *    }, {
     *       x: 2900,
     *       y: 40000,
     *       size: 450000,
     *       category: "Deloitte"
     *    }, {
     *       x: 3000,
     *       y: 55000,
     *       size: 900000,
     *       category: "Whole Foods Market"
     *    }];
     *
     * _@ViewChild('chart')
     *  chart: ChartComponent;
     *
     * private active: boolean = false;
     *
     *  toggleHighlight(): void {
     *    this.active = !this.active;
     *    this.chart.toggleHighlight(this.active, (p) => p.category === 'Google');
     *  }
     * }
     * ```
     *
     * @param show - A Boolean value that indicates whether the highlight is shown or hidden.
     * @param filter - A string that represents the series or category name, an object with the series and category name, or a function which will be called for each point. The function should return `true` for the points for which the highlight is toggled.
     */
    toggleHighlight(show, filter) {
        if (this.instance) {
            this.instance.toggleHighlight(show, filter);
        }
    }
    /**
     * Hides the tooltip of the Chart.
     */
    hideTooltip() {
        if (this.instance) {
            this.instance.hideTooltip();
        }
    }
    /**
     * Shows the Chart tooltip of a specific point or the shared tooltip of a specific category.
     *
     * @param filter - The category for a shared tooltip or a function which will be called for each point until the function returns `true`.
     */
    showTooltip(filter) {
        if (this.instance) {
            this.instance.showTooltip(filter);
        }
    }
    init() {
        if (!this.canRender) {
            return;
        }
        const element = this.surfaceElement.nativeElement;
        const instanceObserver = new ChartInstanceObserver(this);
        this.createInstance(element, instanceObserver);
    }
    /**
     * Detects the size of the container and redraws the Chart.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize() {
        if (this.instance) {
            this.instance.resize();
        }
    }
    /**
     * @hidden
     */
    onResize(_event) {
        if (this.autoResize) {
            this.resize();
        }
    }
    onLegendItemClick(e) {
        this.run(() => {
            const args = new LegendItemClickEvent(e, this);
            this.legendItemClick.emit(args);
            if (!args.isDefaultPrevented()) {
                const series = this.seriesComponents.toArray()[e.series.index];
                if (!series) {
                    return;
                }
                if (e.pointIndex === undefined) {
                    series.toggleVisibility();
                }
                else {
                    series.togglePointVisibility(e.pointIndex);
                }
                this.suppressTransitions = true;
            }
        }, hasObservers(this.legendItemClick), this.seriesComponents.length > 0);
    }
    onInit(e) {
        this.instance = e.sender;
    }
    onRender(e) {
        const donutCenterStyle = this.getDonutCenterStyle();
        this.run(() => {
            const args = new RenderEvent(e, this);
            this.surface = e.sender.surface;
            this.render.emit(args);
            this.donutCenterStyle = donutCenterStyle;
        }, hasObservers(this.render), this.donutCenterStyle !== donutCenterStyle);
    }
    onShowTooltip(e) {
        this.run(() => {
            if (!e.crosshair) {
                this.tooltipInstance.show(e);
            }
            else {
                this.crossahirTooltips.show(e);
            }
        }, !e.crosshair, true);
    }
    onHideTooltip(e) {
        if (!e.crosshair) {
            if (this.tooltipInstance.active) {
                this.tooltipInstance.hide();
                this.detectChanges();
            }
        }
        else if (this.crossahirTooltips.active) {
            this.crossahirTooltips.hide();
            this.detectChanges();
        }
    }
    trigger(name, e) {
        if (name === 'resize') {
            return;
        }
        const emitter = this.activeEmitter(name);
        if (emitter) {
            const args = this.instanceEventService.create(name, e, this);
            this.run(() => {
                emitter.emit(args);
            });
            return args.isDefaultPrevented && args.isDefaultPrevented();
        }
    }
    requiresHandlers(names) {
        for (let idx = 0; idx < names.length; idx++) {
            if (this.activeEmitter(names[idx])) {
                return true;
            }
        }
        return false;
    }
    refresh() {
        clearTimeout(this.redrawTimeout);
        this.updateDirection();
        this.crossahirTooltips.createCrosshairTooltips(this.options);
        this.setChartAreaSize();
        if (!this.instance) {
            this.init();
            return;
        }
        const transitions = this.options.transitions;
        if (this.suppressTransitions) {
            this.options.transitions = false;
        }
        this.updateOptions();
        if (this.suppressTransitions) {
            this.options.transitions = transitions;
            this.suppressTransitions = false;
        }
    }
    setChartAreaSize() {
        if (!this.element) {
            return;
        }
        const element = this.element.nativeElement;
        const chartArea = this.options.chartArea || {};
        if (chartArea.width) {
            element.style.width = `${chartArea.width}px`;
        }
        if (chartArea.height) {
            element.style.height = `${chartArea.height}px`;
        }
    }
    updateOptions() {
        this.instance.setOptions(this.options);
    }
    /**
     * @hidden
     */
    tooltipMouseleave(e) {
        const relatedTarget = e.relatedTarget;
        const chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !hasParent(relatedTarget, chartElement))) {
            this.instance.hideElements();
        }
    }
    /**
     * @hidden
     */
    chartMouseleave(e) {
        const relatedTarget = e.relatedTarget;
        const chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !(this.tooltipInstance.containsElement(relatedTarget) || hasParent(relatedTarget, chartElement))) &&
            !this.instance.handlingTap) {
            this.instance.hideElements();
        }
    }
    get canRender() {
        return isDocumentAvailable() && Boolean(this.surfaceElement);
    }
    get autoResize() {
        return this.resizeRateLimit > 0;
    }
    activeEmitter(name) {
        const emitter = this[name];
        if (emitter && emitter.emit && hasObservers(emitter)) {
            return emitter;
        }
    }
    getDonutCenterStyle() {
        if (!this.instance || !this.options || !this.options.series) {
            return;
        }
        const firstSeries = this.options.series[0];
        const charts = this.instance._plotArea.charts;
        if (!firstSeries || firstSeries.type !== 'donut' || charts[0].points.length === 0) {
            return;
        }
        const firstPoint = charts[0].points[0];
        const center = firstPoint.box.center();
        const radius = firstPoint.sector.innerRadius;
        const top = center.y - radius;
        const left = center.x - radius;
        const size = radius * 2;
        return {
            height: size + 'px',
            left: left + 'px',
            top: top + 'px',
            width: size + 'px'
        };
    }
    refreshWait() {
        this.ngZone.runOutsideAngular(() => {
            this.subscription = combineLatest(this.configurationService.onChange$, this.themeService.onChange$).pipe(tap((result) => {
                this.options = result[0];
                this.theme = result[1];
            }), auditTime(THROTTLE_MS))
                .subscribe(() => {
                this.refresh();
            });
        });
    }
    run(callback, inZone = true, detectChanges) {
        if (inZone) {
            if (detectChanges) {
                this.changeDetector.markForCheck();
            }
            this.ngZone.run(callback);
        }
        else {
            callback();
            if (detectChanges) {
                this.detectChanges();
            }
        }
    }
    detectChanges() {
        if (!this.destroyed) {
            this.changeDetector.detectChanges();
        }
    }
    intlChange() {
        if (this.instance) {
            this.deferredRedraw();
        }
    }
    rtlChange() {
        if (this.instance && this.rtl !== this.isRTL) {
            this.deferredRedraw();
        }
    }
    deferredRedraw() {
        this.ngZone.runOutsideAngular(() => {
            clearTimeout(this.redrawTimeout);
            this.redrawTimeout = setTimeout(() => {
                this.updateDirection();
                this.instance.noTransitionsRedraw();
            }, 0);
        });
    }
    updateDirection() {
        const current = this.isRTL;
        if (this.rtl !== current) {
            this.setDirection();
            if (this.instance) {
                this.instance.setDirection(current);
            }
        }
    }
    setDirection() {
        this.rtl = this.isRTL;
        if (this.element) {
            this.renderer.setAttribute(this.element.nativeElement, 'dir', this.rtl ? 'rtl' : 'ltr');
        }
    }
    get isRTL() {
        return Boolean(this.localizationService.rtl);
    }
}
ChartComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoChart',
                // required because the class should not be inheritted
                // tslint:disable-next-line
                host: {
                    '[class.k-chart]': 'className',
                    '[class.k-widget]': 'className'
                },
                providers: [
                    ConfigurationService,
                    TooltipTemplateService,
                    InstanceEventService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chart'
                    }
                ],
                selector: 'kendo-chart',
                template: `
    <div #surface class="k-chart-surface"></div>
    <kendo-chart-crosshair-tooltips-container [popupSettings]="popupSettings">
    </kendo-chart-crosshair-tooltips-container>
    <kendo-chart-tooltip-popup (leave)="tooltipMouseleave($event)" [popupSettings]="popupSettings">
    </kendo-chart-tooltip-popup>
    <kendo-resize-sensor (resize)="onResize($event)" [rateLimit]="resizeRateLimit"></kendo-resize-sensor>
    <div class="k-chart-donut-center" [ngStyle]="donutCenterStyle" *ngIf="donutCenterStyle && donutCenterTemplate">
      <ng-template [ngTemplateOutlet]="donutCenterTemplate.templateRef"></ng-template>
    </div>
  `
            },] },
];
/** @nocollapse */
ChartComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: ElementRef },
    { type: IntlService },
    { type: LocalizationService },
    { type: NgZone },
    { type: InstanceEventService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
ChartComponent.propDecorators = {
    legendItemClick: [{ type: Output }],
    resizeRateLimit: [{ type: Input }],
    popupSettings: [{ type: Input }],
    seriesComponents: [{ type: ContentChildren, args: [SeriesItemComponent, { descendants: true },] }],
    donutCenterTemplate: [{ type: ContentChild, args: [DonutCenterTemplateDirective,] }],
    tooltipInstance: [{ type: ViewChild, args: [TooltipPopupComponent,] }],
    crossahirTooltips: [{ type: ViewChild, args: [CrosshairTooltipsContainerComponent,] }],
    surfaceElement: [{ type: ViewChild, args: ['surface',] }]
};
