"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_service_1 = require("../common/collection.service");
var configuration_service_1 = require("../common/configuration.service");
var pane_component_generated_1 = require("./pane.component.generated");
/**
 * The configuration component for a Chart pane.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-chart>
 *         <kendo-chart-panes>
 *             <kendo-chart-pane name="top" background="pink" [border]="{ color: 'black', dashtype: 'dash', width: 2 }">
 *               <!--            ^^^^^^^^^^
 *                   Unique ID for the pane.
 *               -->
 *             </kendo-chart-pane>
 *             <kendo-chart-pane name="bottom" [height]="150" title="Bottom pane">
 *               <!--                          ^^^^^^^^^^^^^^
 *                   Note that the binding is required,
 *                   otherwise the property will be
 *                   bound to a '100' string.
 *               -->
 *             </kendo-chart-pane>
 *         </kendo-chart-panes>
 *
 *         <kendo-chart-value-axis>
 *             <kendo-chart-value-axis-item name="top">
 *               <!--                       ^^^^^^^^^^
 *                   Unique ID for the axis.
 *                   No need to set a pane as it will use the first,
 *                   'top' pane by default.
 *               -->
 *             </kendo-chart-value-axis-item>
 *             <kendo-chart-value-axis-item name="bottom"
 *                                          pane="bottom">
 *               <!--                       ^^^^^^^^^^^^^
 *                   Move the axis to the bottom pane.
 *               -->
 *             </kendo-chart-value-axis-item>
 *         </kendo-chart-value-axis>
 *         <kendo-chart-series>
 *           <kendo-chart-series-item [data]="seriesData[0]">
 *               <!-- Will use the first, 'top' value axis by default. -->
 *           </kendo-chart-series-item>
 *           <kendo-chart-series-item type="line" [data]="seriesData[1]" axis="bottom">
 *               <!-- Plot this series to the 'bottom' axis.              ^^^^^^^^^^^^^ -->
 *           </kendo-chart-series-item>
 *         </kendo-chart-series>
 *       </kendo-chart>
 *   `
 * })
 * export class AppComponent {
 *   public seriesData: number[][] = [[1, 2, 3, 5], [0, 1, 0, 1]];
 * }
 * ```
 */
var PaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PaneComponent, _super);
    // Place custom properties here
    function PaneComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    PaneComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [configuration_service_1.ConfigurationService],
                    selector: 'kendo-chart-pane',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PaneComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService },
        { type: collection_service_1.CollectionService }
    ]; };
    return PaneComponent;
}(pane_component_generated_1.PaneComponentGenerated));
exports.PaneComponent = PaneComponent;
