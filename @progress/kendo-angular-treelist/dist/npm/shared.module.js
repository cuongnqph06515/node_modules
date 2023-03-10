/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var column_component_1 = require("./columns/column.component");
var span_column_component_1 = require("./columns/span-column.component");
var column_group_component_1 = require("./columns/column-group.component");
var col_group_component_1 = require("./rendering/common/col-group.component");
var loading_component_1 = require("./rendering/common/loading.component");
var resizable_directive_1 = require("./layout/resizable.directive");
var template_context_directive_1 = require("./rendering/common/template-context.directive");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var logical_cell_directive_1 = require("./navigation/logical-cell.directive");
var logical_row_directive_1 = require("./navigation/logical-row.directive");
var field_accessor_pipe_1 = require("./rendering/common/field-accessor.pipe");
var table_directive_1 = require("./column-resizing/table.directive");
var focusable_directive_1 = require("./navigation/focusable.directive");
var exportedModules = [
    column_component_1.ColumnComponent,
    column_group_component_1.ColumnGroupComponent,
    logical_cell_directive_1.LogicalCellDirective,
    logical_row_directive_1.LogicalRowDirective,
    focusable_directive_1.FocusableDirective,
    col_group_component_1.ColGroupComponent,
    resizable_directive_1.ResizableContainerDirective,
    template_context_directive_1.TemplateContextDirective,
    field_accessor_pipe_1.FieldAccessorPipe,
    span_column_component_1.SpanColumnComponent,
    table_directive_1.TableDirective,
    loading_component_1.LoadingComponent
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            column_component_1.ColumnComponent,
            span_column_component_1.SpanColumnComponent,
            column_group_component_1.ColumnGroupComponent,
            focusable_directive_1.FocusableDirective
        ];
    };
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exportedModules],
                    exports: [exportedModules, kendo_angular_common_1.DraggableModule],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
