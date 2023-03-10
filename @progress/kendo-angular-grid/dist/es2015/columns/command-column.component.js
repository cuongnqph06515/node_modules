/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
/**
 * Represents the command columns of the Grid. You have to define the content of the
 * column inside an `<ng-template>` tag. The template context is set to the current
 * data item. For more information and examples on using the passed fields
 * and the command directives, refer to the article on
 * [editing the Grid in Angular Reactive Forms]({% slug editing_reactive_forms_grid %}).
 *
 * The following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current data row index. If inside a new item row, `rowIndex`is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * Usually, the template contains CRUD command directives such as:
 * - [`EditCommandDirective`]({% slug api_grid_editcommanddirective %})
 * - [`RemoveCommandDirective`]({% slug api_grid_removecommanddirective %})
 * - [`CancelCommandDirective`]({% slug api_grid_cancelcommanddirective %})
 * - [`SaveCommandDirective`]({% slug api_grid_savecommanddirective %})
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-command-column title="command" width="220">
 *               <ng-template kendoGridCellTemplate>
 *                   <button kendoGridEditCommand class="k-primary">Edit</button>
 *                   <button kendoGridRemoveCommand>Remove</button>
 *               </ng-template>
 *           </kendo-grid-command-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
export class CommandColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
}
CommandColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => CommandColumnComponent)
                    }
                ],
                selector: 'kendo-grid-command-column',
                template: ``
            },] },
];
/** @nocollapse */
CommandColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
CommandColumnComponent.propDecorators = {
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
};
