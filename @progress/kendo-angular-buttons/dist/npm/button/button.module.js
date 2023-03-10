/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var button_directive_1 = require("./button.directive");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmodules'] }})
 * definition for the Button directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonModule } from '@progress/kendo-angular-buttons';
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
 *     imports:      [BrowserModule, ButtonModule], // import Button module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [button_directive_1.ButtonDirective],
                    exports: [button_directive_1.ButtonDirective]
                },] },
    ];
    return ButtonModule;
}());
exports.ButtonModule = ButtonModule;
