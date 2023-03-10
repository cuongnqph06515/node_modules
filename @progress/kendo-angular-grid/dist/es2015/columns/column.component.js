/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { GroupHeaderTemplateDirective } from '../grouping/group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from '../grouping/group-header-column-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { GroupFooterTemplateDirective } from '../grouping/group-footer-template.directive';
import { ColumnBase } from './column-base';
import { isPresent } from '../utils';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
/**
 * @hidden
 */
export function isColumnComponent(column) {
    return isPresent(column.field);
}
/**
 * Represents the columns of the [Angular Data Grid]({% slug overview_grid %}).
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
 *          <kendo-grid-column field="Discontinued" width="120">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
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
export class ColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        this.sortable = true;
        /**
         * Determines if the column can be dragged to the group panel. The default value is `true`.
         * If set to `false`, you can group the columns by the column field by using the API of the Grid.
         */
        this.groupable = true;
        /**
         * Defines the editor type ([see example]({% slug editing_reactive_forms_grid %}#toc-setup)).
         * Used when the column enters the edit mode. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" editor="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" filter="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [filterable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [editable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editable = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    get groupHeaderTemplateRef() {
        return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
    }
    get groupHeaderColumnTemplateRef() {
        return this.groupHeaderColumnTemplate ? this.groupHeaderColumnTemplate.templateRef : undefined;
    }
    get groupFooterTemplateRef() {
        return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
    }
    get editTemplateRef() {
        return this.editTemplate ? this.editTemplate.templateRef : undefined;
    }
    get filterCellTemplateRef() {
        return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
    }
    get filterMenuTemplateRef() {
        return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
    }
    get displayTitle() {
        return this.title === undefined ? this.field : this.title;
    }
}
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnComponent)
                    }
                ],
                selector: 'kendo-grid-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
ColumnComponent.propDecorators = {
    field: [{ type: Input }],
    format: [{ type: Input }],
    sortable: [{ type: Input }],
    groupable: [{ type: Input }],
    editor: [{ type: Input }],
    filter: [{ type: Input }],
    filterable: [{ type: Input }],
    editable: [{ type: Input }],
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }],
    groupHeaderColumnTemplate: [{ type: ContentChild, args: [GroupHeaderColumnTemplateDirective,] }],
    groupFooterTemplate: [{ type: ContentChild, args: [GroupFooterTemplateDirective,] }],
    editTemplate: [{ type: ContentChild, args: [EditTemplateDirective,] }],
    filterCellTemplate: [{ type: ContentChild, args: [FilterCellTemplateDirective,] }],
    filterMenuTemplate: [{ type: ContentChild, args: [FilterMenuTemplateDirective,] }]
};
