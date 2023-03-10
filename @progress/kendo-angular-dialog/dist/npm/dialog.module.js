/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_component_1 = require("./dialog/dialog.component");
var dialog_titlebar_component_1 = require("./dialog/dialog-titlebar.component");
var dialog_service_1 = require("./dialog/dialog.service");
var dialog_container_directive_1 = require("./dialog/dialog-container.directive");
var dialog_container_service_1 = require("./dialog/dialog-container.service");
var shared_module_1 = require("./shared.module");
/**
 * @hidden
 */
exports.DIALOG_DIRECTIVES = [
    dialog_component_1.DialogComponent,
    dialog_titlebar_component_1.DialogTitleBarComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dialog component that includes all Dialog components and directives.
 * Imports `DialogModule` into the [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * of your application or into any other sub-module that will use the Dialog component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { DialogModule } from '@progress/kendo-angular-dialog';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, DialogModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exports.DIALOG_DIRECTIVES, dialog_container_directive_1.DialogContainerDirective],
                    entryComponents: [exports.DIALOG_DIRECTIVES],
                    exports: [exports.DIALOG_DIRECTIVES, shared_module_1.SHARED_DIRECTIVES, dialog_container_directive_1.DialogContainerDirective],
                    imports: [shared_module_1.SharedModule],
                    providers: [dialog_container_service_1.DialogContainerService, dialog_service_1.DialogService]
                },] },
    ];
    return DialogModule;
}());
exports.DialogModule = DialogModule;
