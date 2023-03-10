/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Used for rendering the cell content of the Calendar. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoCalendarCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details
 * about the current cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * > `kendoCalendarCellTemplate` is equivalent to
 * > [`kendoCalendarMonthCellTemplate`]({% slug api_dateinputs_monthcelltemplatedirective %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarCellTemplate let-date>
 *      <span class="custom">{{date.getDate()}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * export class AppComponent { }
 * ```
 */
var CellTemplateDirective = /** @class */ (function () {
    function CellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CellTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCalendarCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CellTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return CellTemplateDirective;
}());
exports.CellTemplateDirective = CellTemplateDirective;
