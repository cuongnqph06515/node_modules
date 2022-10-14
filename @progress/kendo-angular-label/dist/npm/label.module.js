/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_module_1 = require("./shared.module");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var floating_label_module_1 = require("./floating-label/floating-label.module");
var label_directive_1 = require("./label.directive");
var label_component_1 = require("./label/label.component");
var COMPONENT_DIRECTIVES = [
    label_directive_1.LabelDirective,
    label_component_1.LabelComponent
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `LabelDirective`&mdash;The Label directive class.
 * - `LabelComponent`&mdash;The Label component class
 * - `FLoatingLabel`&mdash;The FloatingLabel component class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Label module
 * import { LabelModule } from '@progress/kendo-angular-label';
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
 *     imports:      [BrowserModule, LabelModule], // import Label module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var LabelModule = /** @class */ (function () {
    function LabelModule() {
    }
    LabelModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, shared_module_1.SharedDirectivesModule],
                    declarations: COMPONENT_DIRECTIVES.slice(),
                    exports: COMPONENT_DIRECTIVES.concat([floating_label_module_1.FloatingLabelModule, shared_module_1.SharedDirectivesModule])
                },] },
    ];
    return LabelModule;
}());
exports.LabelModule = LabelModule;
