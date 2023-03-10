/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { ToolBarComponent } from './toolbar.component';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
import { ToolBarButtonComponent } from './tools/toolbar-button.component';
import { ToolBarButtonGroupComponent } from './tools/toolbar-buttongroup.component';
import { ToolBarDropDownButtonComponent } from './tools/toolbar-dropdownbutton.component';
import { ToolBarSplitButtonComponent } from './tools/toolbar-splitbutton.component';
import { ToolBarSeparatorComponent } from './tools/toolbar-separator.component';
import { ToolBarRendererComponent } from './renderer.component';
import { ToolBarButtonListComponent } from './tools/toolbar-buttonlist.component';
var TOOLBAR_TOOLS = [
    ToolBarToolComponent,
    ToolBarButtonComponent,
    ToolBarButtonGroupComponent,
    ToolBarDropDownButtonComponent,
    ToolBarSplitButtonComponent,
    ToolBarSeparatorComponent
];
var TOOLBAR_COMMON = [
    ToolBarRendererComponent,
    ToolBarButtonListComponent
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
        { type: NgModule, args: [{
                    declarations: [ToolBarComponent, TOOLBAR_TOOLS, TOOLBAR_COMMON],
                    exports: [ToolBarComponent, TOOLBAR_TOOLS],
                    imports: [CommonModule, ButtonsModule, PopupModule, ResizeSensorModule]
                },] },
    ];
    return ToolBarModule;
}());
export { ToolBarModule };
