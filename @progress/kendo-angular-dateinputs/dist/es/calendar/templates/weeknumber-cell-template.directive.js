/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering the week number cell content in the month view of the Calendar. To define the month week number cell template,
 * nest an `<ng-template>` tag with the `kendoCalendarWeekNumberCellTemplate` directive inside the component tag. The template
 * context is set to the current component. To get a reference to the current date, use the `let-date` directive. To provide more
 * details about the current week number cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [weekNumber]="true">
 *    <ng-template kendoCalendarWeekNumberCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
var WeekNumberCellTemplateDirective = /** @class */ (function () {
    function WeekNumberCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    WeekNumberCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarWeekNumberCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    WeekNumberCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return WeekNumberCellTemplateDirective;
}());
export { WeekNumberCellTemplateDirective };
