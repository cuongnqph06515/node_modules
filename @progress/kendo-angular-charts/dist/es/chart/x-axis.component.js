import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { CollectionService } from '../common/collection.service';
import { XAxisComponentGenerated } from './x-axis.component.generated';
/**
 * A collection of one or more X-axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *  selector: 'my-app',
 * template: `
 *   <kendo-chart>
 *     <kendo-chart-x-axis>
 *       <kendo-chart-x-axis-item
 *         [background]="'rgba(100, 100, 100, 0.2)'"
 *         [color]="'red'"
 *         [notes]="notesConfig"
 *         [crosshair]="crosshairConfig">
 *       </kendo-chart-x-axis-item>
 *       <kendo-chart-x-axis-item name="secondAxis">
 *       </kendo-chart-x-axis-item>
 *     </kendo-chart-x-axis>
 *     <kendo-chart-series>
 *       <kendo-chart-series-item type="scatter" [data]="[[1, 2]]">
 *       </kendo-chart-series-item>
 *       <kendo-chart-series-item type="scatter" [data]="[[0.1, 0.2]]"
 *                                xAxis="secondAxis">
 *       </kendo-chart-series-item>
 *     </kendo-chart-series>
 *   </kendo-chart>
 * `
 * })
 * export class AppComponent {
 * public notesConfig = {
 *   data: [{
 *       value: 0.2,
 *       text: "foo"
 *     }, {
 *       value: 0.8,
 *       text: "bar"
 *     }],
 *   label: {
 *     content: (args: any) => args.dataItem.text,
 *     background: 'red',
 *     color: 'white'
 *   },
 *   line: {
 *     color: 'blue',
 *     dashType: 'dash',
 *     length: 150,
 *     width: 2
 *   },
 *   position: 'top'
 * };
 *
 * public crosshairConfig = {
 *   color: 'green',
 *   opacity: 0.8,
 *   visible: true,
 *   width: 3
 * };
 * }
 *
 * ```
 */
var XAxisComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisComponent, _super);
    // Place custom properties here
    function XAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    XAxisComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CollectionService],
                    selector: 'kendo-chart-x-axis',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return XAxisComponent;
}(XAxisComponentGenerated));
export { XAxisComponent };
