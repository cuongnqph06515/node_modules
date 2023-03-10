/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/* tslint:disable:max-line-length */
/**
 * Represents the template for the column menu in the Grid. Provides an option for
 * customizing the content of the column menu for all or for specific columns.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoGridColumnMenuTemplate` directive inside the `kendo-grid` or the `<kendo-grid-column>` component.
 *
 * The template context is passes through the following fields:
 * - `service`&mdash;Represents the [ColumnMenuService]({% slug api_grid_columnmenuservice %}).
 * - `column`&mdash;Represents the Grid column.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100">
 *              <ng-template kendoGridColumnMenuTemplate let-service="service">
 *                  <kendo-grid-columnmenu-lock [service]="service">
 *                  </kendo-grid-columnmenu-lock>
 *                  <kendo-grid-columnmenu-sort [service]="service">
 *                  </kendo-grid-columnmenu-sort>
 *              </ng-template>
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
export class ColumnMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridColumnMenuTemplate]'
            },] },
];
/** @nocollapse */
ColumnMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
