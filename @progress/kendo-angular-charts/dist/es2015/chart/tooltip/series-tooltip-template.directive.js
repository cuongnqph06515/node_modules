import { Directive, TemplateRef, Optional } from '@angular/core';
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
export class SeriesTooltipTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
SeriesTooltipTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChartSeriesTooltipTemplate]'
            },] },
];
/** @nocollapse */
SeriesTooltipTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
