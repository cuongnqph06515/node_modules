/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var toolbar_component_1 = require("./toolbar.component");
var toolbar_tool_component_1 = require("./tools/toolbar-tool.component");
var toolbar_button_component_1 = require("./tools/toolbar-button.component");
var toolbar_buttongroup_component_1 = require("./tools/toolbar-buttongroup.component");
var toolbar_dropdownbutton_component_1 = require("./tools/toolbar-dropdownbutton.component");
var toolbar_splitbutton_component_1 = require("./tools/toolbar-splitbutton.component");
var toolbar_separator_component_1 = require("./tools/toolbar-separator.component");
var renderer_component_1 = require("./renderer.component");
var toolbar_buttonlist_component_1 = require("./tools/toolbar-buttonlist.component");
var TOOLBAR_TOOLS = [
    toolbar_tool_component_1.ToolBarToolComponent,
    toolbar_button_component_1.ToolBarButtonComponent,
    toolbar_buttongroup_component_1.ToolBarButtonGroupComponent,
    toolbar_dropdownbutton_component_1.ToolBarDropDownButtonComponent,
    toolbar_splitbutton_component_1.ToolBarSplitButtonComponent,
    toolbar_separator_component_1.ToolBarSeparatorComponent
];
var TOOLBAR_COMMON = [
    renderer_component_1.ToolBarRendererComponent,
    toolbar_buttonlist_component_1.ToolBarButtonListComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the ToolBar component.
 *
 * The package exports:
 * - `ToolBarComponent`&mdash;The ToolBarComponent class.
 * - `ToolBarToolComponent`&mdash;The base Tool component class.
 * - `ToolBarButtonComponent`&mdash;The Button Tool component class.
 * - `ToolBarButtonGroupComponent`&mdash;The ButtonGroup Tool component class.
 * - `ToolBarDropDownButtonComponent`&mdash;The DropDownButton Tool component class.
 * - `ToolBarSplitButtonComponent`&mdash;The SplitButton Tool component class.
 * - `ToolBarSeparatorComponent`&mdash;The Separator Tool component class.
 */
var ToolBarModule = /** @class */ (function () {
    function ToolBarModule() {
    }
    ToolBarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [toolbar_component_1.ToolBarComponent, TOOLBAR_TOOLS, TOOLBAR_COMMON],
                    exports: [toolbar_component_1.ToolBarComponent, TOOLBAR_TOOLS],
                    imports: [common_1.CommonModule, kendo_angular_buttons_1.ButtonsModule, kendo_angular_popup_1.PopupModule, kendo_angular_common_1.ResizeSensorModule]
                },] },
    ];
    return ToolBarModule;
}());
exports.ToolBarModule = ToolBarModule;
