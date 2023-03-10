"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * A directive that selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-chart-tooltip>` component for the
 * [series tooltip]({% slug tooltips_chart_charts %}#toc-series-tooltip).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-tooltip>
 *          <ng-template kendoChartSeriesTooltipTemplate let-value="value">
 *             Value is {{value}}
 *           </ng-template>
 *       </kendo-chart-tooltip>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
var SeriesTooltipTemplateDirective = /** @class */ (function () {
    function SeriesTooltipTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    SeriesTooltipTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoChartSeriesTooltipTemplate]'
                },] },
    ];
    /** @nocollapse */
    SeriesTooltipTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return SeriesTooltipTemplateDirective;
}());
exports.SeriesTooltipTemplateDirective = SeriesTooltipTemplateDirective;
