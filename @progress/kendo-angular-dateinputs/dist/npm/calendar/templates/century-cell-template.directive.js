/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Used for rendering the century cell content of the Calendar. To define the century cell template, nest an `<ng-template>`
 * tag with the `kendoCalendarCenturyCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details about
 * the current century cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [activeView]="activeView">
 *    <ng-template kendoCalendarCenturyCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent {
 *  public activeView: CalendarView = 'century';
 * }
 * ```
 */
var CenturyCellTemplateDirective = /** @class */ (function () {
    function CenturyCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CenturyCellTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCalendarCenturyCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CenturyCellTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return CenturyCellTemplateDirective;
}());
exports.CenturyCellTemplateDirective = CenturyCellTemplateDirective;
