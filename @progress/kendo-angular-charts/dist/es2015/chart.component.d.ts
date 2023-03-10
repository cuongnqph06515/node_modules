import { NgZone, OnDestroy, ChangeDetectorRef, AfterViewInit, AfterViewChecked, Renderer2, SimpleChange, OnChanges } from '@angular/core';
import { QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartComponentGenerated } from './chart.component.generated';
import { ConfigurationService } from './common/configuration.service';
import { LegendItemClickEvent } from './events/legend-item-click-event';
import { InstanceEventService } from './events/instance-event.service';
import { DonutCenterTemplateDirective } from './chart/donut-center-template.directive';
import { SeriesItemComponent } from './chart/series-item.component';
import { ThemeService } from './common/theme.service';
import { ChartInstanceObserver } from './common/chart-instance-observer';
import { TooltipPopupComponent } from './chart/tooltip/tooltip-popup.component';
import { CrosshairTooltipsContainerComponent } from './chart/tooltip/crosshair-tooltips-container.component';
import { ChartAxis } from './api-types/chart-axis.interface';
import { ChartPane } from './api-types/chart-pane.interface';
import { SeriesPoint } from './api-types/series-point.interface';
import { ChartPlotArea } from './api-types/chart-plotarea.interface';
import { ChartSVGExportOptions, ChartVisualExportOptions } from './common/api-types';
import { IntlService } from '@progress/kendo-angular-intl';
import { ImageExportOptions, Group, Surface } from '@progress/kendo-drawing';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupSettings } from './chart/tooltip/popup-settings.interface';
import './chart-defaults';
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
export declare class ChartComponent extends ChartComponentGenerated implements OnChanges, OnDestroy, AfterViewInit, AfterViewChecked {
    configurationService: ConfigurationService;
    themeService: ThemeService;
    protected element: ElementRef;
    protected intl: IntlService;
    protected localizationService: LocalizationService;
    protected ngZone: NgZone;
    protected instanceEventService: InstanceEventService;
    protected changeDetector: ChangeDetectorRef;
    protected renderer: Renderer2;
    /**
     * Fires when a legend item is clicked before the selected series visibility is toggled.
     * Can be prevented.
     */
    legendItemClick: EventEmitter<LegendItemClickEvent>;
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
    resizeRateLimit: number;
    /**
     * The settings for the tooltip popup.
     */
    popupSettings: PopupSettings;
    /**
     * The Drawing `Surface` of the Chart.
     */
    surface: Surface;
    className: boolean;
    seriesComponents: QueryList<SeriesItemComponent>;
    donutCenterTemplate: DonutCenterTemplateDirective;
    tooltipInstance: TooltipPopupComponent;
    crossahirTooltips: CrosshairTooltipsContainerComponent;
    surfaceElement: ElementRef;
    /**
     * @hidden
     */
    donutCenterStyle: any;
    protected options: any;
    protected theme: any;
    protected subscription: Subscription;
    protected suppressTransitions: boolean;
    protected resizeTimeout: any;
    protected redrawTimeout: any;
    protected domSubscriptions: any;
    protected destroyed: boolean;
    protected subscriptions: any;
    protected rtl: boolean;
    constructor(configurationService: ConfigurationService, themeService: ThemeService, element: ElementRef, intl: IntlService, localizationService: LocalizationService, ngZone: NgZone, instanceEventService: InstanceEventService, changeDetector: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
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
    notifyChanges(changes: any): void;
    ngOnDestroy(): void;
    protected createInstance(element: any, observer: ChartInstanceObserver): void;
    /**
     * Exports the Chart as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image encoded as a Data URI.
     */
    exportImage(options?: ImageExportOptions): Promise<string>;
    /**
     * Exports the Chart as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param options - The parameters for the exported file.
     * @returns - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    exportSVG(options?: ChartSVGExportOptions): Promise<string>;
    /**
     * Exports the Chart as a Drawing `Scene`.
     *
     * @param options - The parameters for the export operation.
     * @returns - The root Group of the scene.
     */
    exportVisual(options?: ChartVisualExportOptions | any): Group;
    /**
     * Returns the axis with the specified name.
     *
     * @param {string} name - The axis name.
     * @returns {ChartAxis} - The axis with a corresponding name.
     */
    findAxisByName(name: string): ChartAxis;
    /**
     * Returns the pane at the specified index.
     *
     * @param {number} index - The pane index.
     * @returns {ChartPane} - The pane at the specified index.
     */
    findPaneByIndex(index: number): ChartPane;
    /**
     * Returns the pane with the specified name.
     *
     * @param {string} name - The name of the pane.
     * @returns {ChartPane} - The pane with the provided name.
     */
    findPaneByName(name: string): ChartPane;
    /**
     * Returns the plot area of the Chart.
     * @returns {ChartPlotArea} - The plot area of the Chart.
     */
    getPlotArea(): ChartPlotArea;
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
    toggleHighlight(show: boolean, filter: string | {
        category: string;
        series: string;
    } | {
        (point: SeriesPoint): boolean;
    }): void;
    /**
     * Hides the tooltip of the Chart.
     */
    hideTooltip(): void;
    /**
     * Shows the Chart tooltip of a specific point or the shared tooltip of a specific category.
     *
     * @param filter - The category for a shared tooltip or a function which will be called for each point until the function returns `true`.
     */
    showTooltip(filter: number | string | Date | {
        (point: SeriesPoint): boolean;
    }): void;
    protected init(): void;
    /**
     * Detects the size of the container and redraws the Chart.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize(): void;
    /**
     * @hidden
     */
    onResize(_event?: any): void;
    protected onLegendItemClick(e: any): void;
    protected onInit(e: any): void;
    protected onRender(e: any): void;
    protected onShowTooltip(e: any): void;
    protected onHideTooltip(e: any): void;
    protected trigger(name: string, e: any): boolean;
    protected requiresHandlers(names: string[]): boolean;
    protected refresh(): void;
    protected setChartAreaSize(): void;
    protected updateOptions(): void;
    /**
     * @hidden
     */
    tooltipMouseleave(e: any): void;
    /**
     * @hidden
     */
    chartMouseleave(e: any): void;
    protected readonly canRender: boolean;
    protected readonly autoResize: boolean;
    protected activeEmitter(name: string): any;
    protected getDonutCenterStyle(): any;
    protected refreshWait(): void;
    protected run(callback: any, inZone?: boolean, detectChanges?: boolean): void;
    protected detectChanges(): void;
    protected intlChange(): void;
    protected rtlChange(): void;
    protected deferredRedraw(): void;
    protected updateDirection(): void;
    protected setDirection(): void;
    protected readonly isRTL: boolean;
}
