/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_module_1 = require("./dialog.module");
var window_module_1 = require("./window.module");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dialogs components.
 *
 * @example
 *
 * ```ts-no-run
 * import { DialogsModule } from '@progress/kendo-angular-dialog';
 *
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { NgModule } from '@angular/core';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, DialogsModule],
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DialogsModule = /** @class */ (function () {
    function DialogsModule() {
    }
    DialogsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [dialog_module_1.DialogModule, window_module_1.WindowModule]
                },] },
    ];
    return DialogsModule;
}());
exports.DialogsModule = DialogsModule;
