"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../common/configuration.service");
var prefix_configuration_service_1 = require("../common/prefix-configuration.service");
var settings_component_1 = require("../common/settings.component");
/**
 * The configuration options of the navigator
 * ([see runnable example]]({% slug overview_stockchart_charts %}#toc-navigator)).
 *
 * @example
 * ```ts-no-run
 * _@Component({
 *     selector: 'my-app',
 *       template: `
 *         <kendo-stockchart (navigatorFilter)="onNavigatorFilter($event)">
 *             <kendo-chart-series>
 *                <kendo-chart-series-item
 *                type="candlestick"
 *                 [data]="seriesData"
 *                 openField="Open"
 *                 closeField="Close"
 *                 lowField="Low"
 *                 highField="High"
 *                 categoryField="Date">
 *             </kendo-chart-series-item>
 *          </kendo-chart-series>
 *          <kendo-chart-navigator
 *            [categoryAxis]="categoryAxisOptions"
 *            [hint]="hintOptions"
 *            [pane]="paneOptions"
 *            [visible]="isVisible">
 *            <kendo-chart-navigator-select [from]="from" [to]="to">
 *            </kendo-chart-navigator-select>
 *            <kendo-chart-navigator-series>
 *              <kendo-chart-navigator-series-item type="area" [data]="navigatorData" field="Close" categoryField="Date">
 *              </kendo-chart-navigator-series-item>
 *           </kendo-chart-navigator-series>
 *          </kendo-chart-navigator>
 *        </kendo-stockchart>
 *        <br /><br />
 *        <button class="k-button" (click)="isVisible = !isVisible">Toggle Navigator</button>
 *    `
 * })
 * ```
 */
var NavigatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorComponent, _super);
    function NavigatorComponent(configurationService) {
        var _this = _super.call(this, '', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: prefix_configuration_service_1.PREFIX, useValue: 'navigator' }, { provide: configuration_service_1.ConfigurationService, useClass: prefix_configuration_service_1.PrefixConfigurationService }],
                    selector: 'kendo-chart-navigator',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    NavigatorComponent.propDecorators = {
        visible: [{ type: core_1.Input }],
        categoryAxis: [{ type: core_1.Input }],
        hint: [{ type: core_1.Input }],
        pane: [{ type: core_1.Input }],
        select: [{ type: core_1.Input }],
        series: [{ type: core_1.Input }]
    };
    return NavigatorComponent;
}(settings_component_1.SettingsComponent));
exports.NavigatorComponent = NavigatorComponent;
