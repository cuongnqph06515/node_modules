"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * A directive which selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-chart>` component for the
 * [Donut center template]({% slug donut_seriestypes_charts %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart style="height: 450px;">
 *       <ng-template kendoChartDonutCenterTemplate>
 *         <h3>22.5%</h3>
 *         of which renewables
 *       </ng-template>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item
 *             type="donut" [data]="data"
 *             categoryField="kind" field="share">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *       <kendo-chart-legend [visible]="false"></kendo-chart-legend>
 *     </kendo-chart>
 *   `
 * })
 * export class AppComponent {
 *   public data: any[] = [{
 *     kind: 'Hydroelectric', share: 0.175
 *   }, {
 *     kind: 'Nuclear', share: 0.238
 *   }, {
 *     kind: 'Coal', share: 0.118
 *   }, {
 *     kind: 'Solar', share: 0.052
 *   }, {
 *     kind: 'Wind', share: 0.225
 *   }, {
 *     kind: 'Other', share: 0.192
 *   }];
 * }
 *
 * ```
 */
var DonutCenterTemplateDirective = /** @class */ (function () {
    function DonutCenterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DonutCenterTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoChartDonutCenterTemplate]'
                },] },
    ];
    /** @nocollapse */
    DonutCenterTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return DonutCenterTemplateDirective;
}());
exports.DonutCenterTemplateDirective = DonutCenterTemplateDirective;
