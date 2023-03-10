/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnSortSettings } from './sort-settings';
import { ColumnBase } from './column-base';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export declare function isColumnComponent(column: any): column is ColumnComponent;
/**
 * Represents the columns of the [Angular TreeList]({% slug getstarted_treelist %}).
 *
 * {% meta height:470 %}
 * {% embed_file basic-usage/app.component.ts preview %}
 * {% embed_file basic-usage/app.module.ts %}
 * {% embed_file basic-usage/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export declare class ColumnComponent extends ColumnBase {
    /**
     * Defines whether the expand indicator should be rendered in the column.
     * @default false
     */
    expandable: boolean;
    /**
     * The field to which the column is bound.
     */
    field: string;
    /**
     * The format that is applied to the value before it is displayed.
     * Takes the `{0:format}` form where `format` is a standard number format, a custom number format,
     * a standard date format, a custom date format or a format object. For more information on the supported date and number formats,
     * refer to the [kendo-intl](https://github.com/telerik/kendo-intl/blob/develop/docs/index.md) documentation.
     *
     * Standard format:
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" format="{0:c}">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     *
     * Format object for currency:
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" [format]="{ style: 'currency', currency: 'EUR' }">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     *
     * Format object for dates:
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="FirstOrderedOn" [format]="{ date: 'short' }">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     */
    format: any;
    /**
     * Allows the column headers to be clicked and the `sortChange` event emitted.
     * You have to handle the `sortChange` event yourself and sort the data.
     */
    sortable: boolean | ColumnSortSettings;
    /**
     * Defines the editor type ([see example]({% slug editing_reactive_forms_treelist %}#toc-setup)).
     * Used when the column enters the edit mode. The default value is `text`.
     *
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" editor="numeric">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     */
    editor: 'text' | 'numeric' | 'date' | 'boolean';
    /**
     * Defines the filter type that is displayed inside the filter row. The default value is `text`.
     *
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" filter="numeric">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     */
    filter: 'text' | 'numeric' | 'boolean' | 'date';
    /**
     * Defines if a filter UI will be displayed for this column. The default value is `true`.
     *
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" [filterable]="false">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     */
    filterable: boolean;
    /**
     * Defines whether the column is editable. The default value is `true`.
     *
     * @example
     * ```html-no-run
     * <kendo-treelist>
     *    <kendo-treelist-column field="UnitPrice" [editable]="false">
     *    </kendo-treelist-column>
     * </kendo-treelist>
     * ```
     */
    editable: boolean;
    template: CellTemplateDirective;
    editTemplate: EditTemplateDirective;
    filterCellTemplate: FilterCellTemplateDirective;
    filterMenuTemplate: FilterMenuTemplateDirective;
    constructor(parent?: ColumnBase, optionChanges?: OptionChangesService);
    readonly templateRef: TemplateRef<any>;
    readonly editTemplateRef: TemplateRef<any>;
    readonly filterCellTemplateRef: TemplateRef<any>;
    readonly filterMenuTemplateRef: TemplateRef<any>;
    readonly displayTitle: string;
    /**
     * @hidden
     */
    readonly isEditable: boolean;
}
