/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var header_component_1 = require("./header.component");
var group_module_1 = require("../../grouping/group.module");
var shared_module_1 = require("../../shared.module");
var row_filtering_module_1 = require("../../filtering/cell/row-filtering.module");
var header_template_directive_1 = require("./header-template.directive");
var column_handle_directive_1 = require("./../../column-resizing/column-handle.directive");
var selectall_checkbox_directive_1 = require("../../selection/selectall-checkbox.directive");
var filter_menu_module_1 = require("../../filtering/menu/filter-menu.module");
var drag_and_drop_module_1 = require("../../dragdrop/drag-and-drop.module");
var column_menu_module_1 = require("../../column-menu/column-menu.module");
var exportedModules = [
    header_component_1.HeaderComponent,
    header_template_directive_1.HeaderTemplateDirective,
    column_handle_directive_1.ColumnHandleDirective,
    selectall_checkbox_directive_1.SelectAllCheckboxDirective
];
var importedModules = [
    common_1.CommonModule,
    group_module_1.GroupModule,
    row_filtering_module_1.RowFilterModule,
    filter_menu_module_1.FilterMenuModule,
    shared_module_1.SharedModule,
    drag_and_drop_module_1.DragAndDropModule,
    column_menu_module_1.ColumnMenuModule
];
/**
 * @hidden
 */
var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule.exports = function () {
        return [
            header_template_directive_1.HeaderTemplateDirective,
            selectall_checkbox_directive_1.SelectAllCheckboxDirective
        ];
    };
    HeaderModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exportedModules],
                    exports: [exportedModules],
                    imports: importedModules.slice()
                },] },
    ];
    return HeaderModule;
}());
exports.HeaderModule = HeaderModule;
