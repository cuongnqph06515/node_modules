/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var window_component_1 = require("./window/window.component");
var window_titlebar_component_1 = require("./window/window-titlebar.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var window_resize_handle_directive_1 = require("./window/window-resize-handle.directive");
var window_maximize_action_directive_1 = require("./window/actions/window-maximize-action.directive");
var window_minimize_action_directive_1 = require("./window/actions/window-minimize-action.directive");
var window_close_action_directive_1 = require("./window/actions/window-close-action.directive");
var window_restore_action_directive_1 = require("./window/actions/window-restore-action.directive");
var window_service_1 = require("./window/window.service");
var window_container_service_1 = require("./window/window-container.service");
var window_container_directive_1 = require("./window/window-container.directive");
var shared_module_1 = require("./shared.module");
var WINDOW_DIRECTIVES = [
    window_resize_handle_directive_1.ResizeHandleDirective,
    window_component_1.WindowComponent,
    window_titlebar_component_1.WindowTitleBarComponent,
    window_close_action_directive_1.WindowCloseActionDirective,
    window_minimize_action_directive_1.WindowMinimizeActionDirective,
    window_maximize_action_directive_1.WindowMaximizeActionDirective,
    window_restore_action_directive_1.WindowRestoreActionDirective
];
var ENTRY_COMPONENTS = [
    window_component_1.WindowComponent,
    window_titlebar_component_1.WindowTitleBarComponent
];
var exportedModules = [
    window_component_1.WindowComponent,
    window_close_action_directive_1.WindowCloseActionDirective,
    window_minimize_action_directive_1.WindowMinimizeActionDirective,
    window_maximize_action_directive_1.WindowMaximizeActionDirective,
    window_restore_action_directive_1.WindowRestoreActionDirective,
    window_titlebar_component_1.WindowTitleBarComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Window component. Imports `WindowModule` into the
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * of your application or into any other sub-module that will use the Window component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { WindowModule } from '@progress/kendo-angular-window';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, WindowModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var WindowModule = /** @class */ (function () {
    function WindowModule() {
    }
    WindowModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [WINDOW_DIRECTIVES, window_container_directive_1.WindowContainerDirective],
                    entryComponents: [ENTRY_COMPONENTS],
                    exports: [exportedModules, shared_module_1.SHARED_DIRECTIVES, window_container_directive_1.WindowContainerDirective],
                    imports: [shared_module_1.SharedModule, kendo_angular_common_1.DraggableModule],
                    providers: [window_container_service_1.WindowContainerService, window_service_1.WindowService]
                },] },
    ];
    return WindowModule;
}());
exports.WindowModule = WindowModule;
