/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var treelist_component_1 = require("./treelist.component");
var list_component_1 = require("./rendering/list.component");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var custom_messages_component_1 = require("./localization/custom-messages.component");
var row_filtering_module_1 = require("./filtering/cell/row-filtering.module");
var pager_module_1 = require("./pager/pager.module");
var header_module_1 = require("./rendering/header/header.module");
var body_module_1 = require("./rendering/body.module");
var shared_module_1 = require("./shared.module");
var toolbar_template_directive_1 = require("./rendering/toolbar/toolbar-template.directive");
var toolbar_component_1 = require("./rendering/toolbar/toolbar.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var template_editing_directive_1 = require("./editing-directives/template-editing.directive");
var reactive_editing_directive_1 = require("./editing-directives/reactive-editing.directive");
var in_cell_editing_directive_1 = require("./editing-directives/in-cell-editing.directive");
var filter_menu_module_1 = require("./filtering/menu/filter-menu.module");
var column_menu_module_1 = require("./column-menu/column-menu.module");
var hierarchy_binding_directive_1 = require("./binding-directives/hierarchy-binding.directive");
var flat_binding_directive_1 = require("./binding-directives/flat-binding.directive");
var exportedModules = [
    treelist_component_1.TreeListComponent,
    toolbar_template_directive_1.ToolbarTemplateDirective,
    toolbar_component_1.ToolbarComponent,
    custom_messages_component_1.CustomMessagesComponent,
    template_editing_directive_1.TemplateEditingDirective,
    reactive_editing_directive_1.ReactiveEditingDirective,
    in_cell_editing_directive_1.InCellEditingDirective,
    hierarchy_binding_directive_1.HierarchyBindingDirective,
    flat_binding_directive_1.FlatBindingDirective
].concat(shared_module_1.SharedModule.exports(), body_module_1.BodyModule.exports(), header_module_1.HeaderModule.exports(), pager_module_1.PagerModule.exports(), row_filtering_module_1.RowFilterModule.exports(), filter_menu_module_1.FilterMenuModule.exports(), column_menu_module_1.ColumnMenuModule.exports());
var declarations = [
    treelist_component_1.TreeListComponent,
    list_component_1.ListComponent,
    toolbar_component_1.ToolbarComponent,
    localized_messages_directive_1.LocalizedMessagesDirective,
    custom_messages_component_1.CustomMessagesComponent,
    toolbar_template_directive_1.ToolbarTemplateDirective,
    template_editing_directive_1.TemplateEditingDirective,
    reactive_editing_directive_1.ReactiveEditingDirective,
    in_cell_editing_directive_1.InCellEditingDirective,
    hierarchy_binding_directive_1.HierarchyBindingDirective,
    flat_binding_directive_1.FlatBindingDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TreeList component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList module
 * import { TreeListModule } from '@progress/kendo-angular-treelist';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, TreeListModule], // import TreeList module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var TreeListModule = /** @class */ (function () {
    function TreeListModule() {
    }
    TreeListModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [
                        common_1.CommonModule,
                        shared_module_1.SharedModule,
                        body_module_1.BodyModule,
                        header_module_1.HeaderModule,
                        pager_module_1.PagerModule,
                        row_filtering_module_1.RowFilterModule,
                        filter_menu_module_1.FilterMenuModule,
                        kendo_angular_common_1.ResizeSensorModule,
                        column_menu_module_1.ColumnMenuModule
                    ]
                },] },
    ];
    return TreeListModule;
}());
exports.TreeListModule = TreeListModule;
