/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/* tslint:disable:max-line-length */
/**
 * Represents the content template of the
 * [`kendo-grid-columnmenu-item`]({% slug api_grid_columnmenuitemcomponent %}) component.
 * Provides an option for specifying the content of a column item.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoGridColumnMenuItemContentTemplate` directive inside a `<kendo-grid-columnmenu-item>`.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate>
 *              <kendo-grid-columnmenu-item text="Item Text" [expanded]="true">
 *                  <ng-template kendoGridColumnMenuItemContentTemplate>
 *                      Item Content
 *                  </ng-template>
 *              </kendo-grid-columnmenu-item>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
export class ColumnMenuItemContentTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuItemContentTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridColumnMenuItemContentTemplate]'
            },] },
];
/** @nocollapse */
ColumnMenuItemContentTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
