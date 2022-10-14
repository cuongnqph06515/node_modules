/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
/**
 * Represents the column cell template of the TreeList ([more information and example]({% slug templates_columns_treelist %}#toc-cell-template)).
 * Helps to customize the content of the cells. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoTreeListCellTemplate` directive inside a `<kendo-treelist-column>` tag.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index. Use it as an alias for a template variable by utilizing the `let-columnIndex="columnIndex"` syntax.
 * - `rowIndex`&mdash;The current row index. Use it as an alias for a template variable by utilizing the `let-rowIndex="rowIndex"` syntax.
 * - `dataItem`&mdash;The current data item. Represents the default context that will be assigned to any template variable which utilizes the `let-x` syntax&mdash;for example, `let-dataItem`.
 * - `column`&mdash;The current column instance. Use it as an alias for a template variable by utilizing the `let-column="column"` syntax.
 *
 * {% meta height:470 %}
 * {% embed_file data-binding/hierarchy/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
 */
export declare class CellTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
