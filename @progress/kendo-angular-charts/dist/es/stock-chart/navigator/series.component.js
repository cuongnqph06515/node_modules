import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, QueryList, ContentChildren } from '@angular/core';
import { ConfigurationService } from "../../common/configuration.service";
import { CollectionService } from "../../common/collection.service";
import { TooltipTemplateService } from "../../common/tooltip-template.service";
import { SeriesComponent } from '../../chart/series.component';
import { NavigatorSeriesItemComponent } from './series-item.component';
/**
 * A collection of one or more navigator series items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-stockchart>
 *         <kendo-chart-navigator>
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
var NavigatorSeriesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesComponent, _super);
    function NavigatorSeriesComponent(configurationService, collectionService, tooltipTemplateService) {
        var _this = _super.call(this, configurationService, collectionService, tooltipTemplateService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.tooltipTemplateService = tooltipTemplateService;
        return _this;
    }
    NavigatorSeriesComponent.prototype.readTooltipTemplates = function () {
    };
    NavigatorSeriesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CollectionService],
                    selector: 'kendo-chart-navigator-series',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: TooltipTemplateService }
    ]; };
    NavigatorSeriesComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [NavigatorSeriesItemComponent,] }]
    };
    return NavigatorSeriesComponent;
}(SeriesComponent));
export { NavigatorSeriesComponent };
