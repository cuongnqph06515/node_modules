/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("./../shared.module");
var floating_label_component_1 = require("./floating-label.component");
var COMPONENT_DIRECTIVES = [floating_label_component_1.FloatingLabelComponent];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TextBox directive.
 *
 * @example
 *
 * ```ts-no-run
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
 *     imports:      [BrowserModule, FloatingLabelModule], // import FloatingLabel module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var FloatingLabelModule = /** @class */ (function () {
    function FloatingLabelModule() {
    }
    FloatingLabelModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES.slice(),
                    exports: COMPONENT_DIRECTIVES.concat([shared_module_1.SharedDirectivesModule]),
                    imports: [common_1.CommonModule, shared_module_1.SharedDirectivesModule]
                },] },
    ];
    return FloatingLabelModule;
}());
exports.FloatingLabelModule = FloatingLabelModule;
