import { Input, Component, NgZone, ElementRef, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { isDevMode } from '@angular/core';
import { ConfigurationService } from './common/configuration.service';
import { RootConfigurationService } from './common/root-configuration.service';
import { TooltipTemplateService } from './common/tooltip-template.service';
import { ChartComponent } from './chart.component';
import { ThemeService } from './common/theme.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { StockInstanceEventService } from './stock-chart/events/instance-event.service';
import { StockChart } from '@progress/kendo-charts';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
const NAVIGATOR_DEFAULTS = {
    autoBindElements: true,
    liveDrag: false,
    partialRedraw: true
};
/* tslint:disable:no-access-missing-member */
/**
 * The root StockChart component.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-stockchart>
 *         <kendo-chart-series>
 *             <kendo-chart-series-item type="line" [data]="data" field="value" categoryField="date">
 *             </kendo-chart-series-item>
 *         </kendo-chart-series>
 *         <kendo-chart-navigator>
 *             <kendo-chart-navigator-select to="2017/02/01">
 *             </kendo-chart-navigator-select>
 *             <kendo-chart-navigator-series>
 *                 <kendo-chart-navigator-series-item type="area" [data]="data" field="value" categoryField="date">
 *                 </kendo-chart-navigator-series-item>
 *             </kendo-chart-navigator-series>
 *         </kendo-chart-navigator>
 *     </kendo-stockchart>
 *   `
 * })
 * class AppComponent {
 *   public data: any[] = [];
 *
 *   constructor() {
 *      for (let idx = 0; idx < 100; idx++) {
 *          this.data.push({
 *              date: new Date(2017, 0, idx),
 *              value: Math.random() * 100
 *          });
 *      }
 *   }
 * }
 *
 * ```
 */
export class StockChartComponent extends ChartComponent {
    constructor(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        super(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer);
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
         * Fires when the navigator range is changed.
         */
        this.navigatorFilter = new EventEmitter();
        this.redrawSlaves = false;
    }
    /**
     * If called, the navigator pane is not redrawn the next time the StockChart options are updated.
     * The method is useful if you need to update only the main series data for the selected period.
     */
    skipNavigatorRedraw() {
        this.redrawSlaves = true;
    }
    createInstance(element, observer) {
        this.applyNavigatorDefaults();
        if (this.isDevMode() && (this.options.zoomable || this.options.pannable)) {
            throw new Error('The pannable and zoomable options are not supported by the StockChart component.');
        }
        this.instance = new StockChart(element, this.options, this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    }
    updateOptions() {
        this.applyNavigatorDefaults();
        if (this.redrawSlaves) {
            this.instance.applyOptions(this.options);
            this.instance.bindCategories();
            this.instance.navigator.redrawSlaves();
        }
        else {
            this.instance.setOptions(this.options);
        }
        this.redrawSlaves = false;
    }
    applyNavigatorDefaults() {
        this.options.navigator = Object.assign({}, this.options.navigator, NAVIGATOR_DEFAULTS);
    }
    isDevMode() {
        return isDevMode();
    }
}
StockChartComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoStockChart',
                // required because the class should not be inheritted
                // tslint:disable-next-line
                host: {
                    '[class.k-chart]': 'className',
                    '[class.k-stockchart]': 'className'
                },
                providers: [
                    ConfigurationService,
                    TooltipTemplateService,
                    { provide: RootConfigurationService, useExisting: ConfigurationService },
                    StockInstanceEventService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chart'
                    }
                ],
                selector: 'kendo-stockchart',
                template: `
        <div #surface class="k-chart-surface"></div>
        <kendo-chart-crosshair-tooltips-container [popupSettings]="popupSettings">
        </kendo-chart-crosshair-tooltips-container>
        <kendo-chart-tooltip-popup (leave)="tooltipMouseleave($event)" [popupSettings]="popupSettings">
        </kendo-chart-tooltip-popup>
        <kendo-resize-sensor (resize)="onResize($event)"></kendo-resize-sensor>
    `
            },] },
];
/** @nocollapse */
StockChartComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: ElementRef },
    { type: IntlService },
    { type: LocalizationService },
    { type: NgZone },
    { type: StockInstanceEventService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
StockChartComponent.propDecorators = {
    navigator: [{ type: Input }],
    pannable: [{ type: Input }],
    zoomable: [{ type: Input }],
    navigatorFilter: [{ type: Output }]
};
