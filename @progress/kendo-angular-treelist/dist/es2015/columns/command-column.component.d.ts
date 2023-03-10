/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
import { ColumnBase } from './column-base';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { OptionChangesService } from '../common/option-changes.service';
/**
 * Represents the command columns of the TreeList. You have to define the content of the
 * column inside an `<ng-template>` tag. The template context is set to the current
 * data item. For more information and examples on using the passed fields
 * and the command directives, refer to the article on
 * [editing the TreeList in Angular Reactive Forms]({% slug editing_reactive_forms_treelist %}).
 *
 * The following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, `rowIndex`is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * Usually, the template contains CRUD command directives such as:
 * - [`EditCommandDirective`]({% slug api_treelist_editcommanddirective %})
 * - [`RemoveCommandDirective`]({% slug api_treelist_removecommanddirective %})
 * - [`CancelCommandDirective`]({% slug api_treelist_cancelcommanddirective %})
 * - [`SaveCommandDirective`]({% slug api_treelist_savecommanddirective %})
 *
 * {% meta height:590 %}
 * {% embed_file editing/editing-directives/reactive-editing/app.component.ts preview %}
 * {% embed_file shared/employees.ts %}
 * {% embed_file editing/editing-directives/reactive-editing/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export declare class CommandColumnComponent extends ColumnBase {
    parent?: ColumnBase;
    template: CellTemplateDirective;
    isCommand: boolean;
    constructor(parent?: ColumnBase, optionChanges?: OptionChangesService);
    readonly templateRef: TemplateRef<any>;
}
