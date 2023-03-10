/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from "@angular/core";
import { WindowComponent } from "./window/window.component";
import { WindowTitleBarComponent } from "./window/window-titlebar.component";
import { DraggableModule } from '@progress/kendo-angular-common';
import { ResizeHandleDirective } from './window/window-resize-handle.directive';
import { WindowMaximizeActionDirective } from './window/actions/window-maximize-action.directive';
import { WindowMinimizeActionDirective } from './window/actions/window-minimize-action.directive';
import { WindowCloseActionDirective } from './window/actions/window-close-action.directive';
import { WindowRestoreActionDirective } from './window/actions/window-restore-action.directive';
import { WindowService } from './window/window.service';
import { WindowContainerService } from './window/window-container.service';
import { WindowContainerDirective } from './window/window-container.directive';
import { SharedModule, SHARED_DIRECTIVES } from './shared.module';
var WINDOW_DIRECTIVES = [
    ResizeHandleDirective,
    WindowComponent,
    WindowTitleBarComponent,
    WindowCloseActionDirective,
    WindowMinimizeActionDirective,
    WindowMaximizeActionDirective,
    WindowRestoreActionDirective
];
var ENTRY_COMPONENTS = [
    WindowComponent,
    WindowTitleBarComponent
];
var exportedModules = [
    WindowComponent,
    WindowCloseActionDirective,
    WindowMinimizeActionDirective,
    WindowMaximizeActionDirective,
    WindowRestoreActionDirective,
    WindowTitleBarComponent
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
        { type: NgModule, args: [{
                    declarations: [WINDOW_DIRECTIVES, WindowContainerDirective],
                    entryComponents: [ENTRY_COMPONENTS],
                    exports: [exportedModules, SHARED_DIRECTIVES, WindowContainerDirective],
                    imports: [SharedModule, DraggableModule],
                    providers: [WindowContainerService, WindowService]
                },] },
    ];
    return WindowModule;
}());
export { WindowModule };
