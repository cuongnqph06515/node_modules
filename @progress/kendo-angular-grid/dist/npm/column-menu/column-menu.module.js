/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var column_list_component_1 = require("./column-list.component");
var column_chooser_component_1 = require("./column-chooser.component");
var column_menu_chooser_component_1 = require("./column-menu-chooser.component");
var column_menu_filter_component_1 = require("./column-menu-filter.component");
var column_menu_item_component_1 = require("./column-menu-item.component");
var column_menu_item_content_template_directive_1 = require("./column-menu-item-content-template.directive");
var column_menu_sort_component_1 = require("./column-menu-sort.component");
var column_menu_component_1 = require("./column-menu.component");
var column_menu_lock_component_1 = require("./column-menu-lock.component");
var filter_menu_module_1 = require("../filtering/menu/filter-menu.module");
var column_menu_template_directive_1 = require("./column-menu-template.directive");
var COMPONENTS = [
    column_list_component_1.ColumnListComponent,
    column_chooser_component_1.ColumnChooserComponent,
    column_menu_chooser_component_1.ColumnMenuChooserComponent,
    column_menu_filter_component_1.ColumnMenuFilterComponent,
    column_menu_item_component_1.ColumnMenuItemComponent,
    column_menu_item_content_template_directive_1.ColumnMenuItemContentTemplateDirective,
    column_menu_sort_component_1.ColumnMenuSortComponent,
    column_menu_component_1.ColumnMenuComponent,
    column_menu_lock_component_1.ColumnMenuLockComponent,
    column_menu_template_directive_1.ColumnMenuTemplateDirective
];
/**
 * @hidden
 */
var ColumnMenuModule = /** @class */ (function () {
    function ColumnMenuModule() {
    }
    ColumnMenuModule.exports = function () {
        return [
            column_chooser_component_1.ColumnChooserComponent,
            column_menu_filter_component_1.ColumnMenuFilterComponent,
            column_menu_item_component_1.ColumnMenuItemComponent,
            column_menu_item_content_template_directive_1.ColumnMenuItemContentTemplateDirective,
            column_menu_sort_component_1.ColumnMenuSortComponent,
            column_menu_lock_component_1.ColumnMenuLockComponent,
            column_menu_chooser_component_1.ColumnMenuChooserComponent,
            column_menu_template_directive_1.ColumnMenuTemplateDirective,
            column_menu_component_1.ColumnMenuComponent
        ];
    };
    ColumnMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENTS],
                    imports: [common_1.CommonModule, filter_menu_module_1.FilterMenuModule],
                    exports: [COMPONENTS]
                },] },
    ];
    return ColumnMenuModule;
}());
exports.ColumnMenuModule = ColumnMenuModule;
