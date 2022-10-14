/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SharedDirectivesModule } from './shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FloatingLabelModule } from './floating-label/floating-label.module';
import { LabelDirective } from './label.directive';
import { LabelComponent } from './label/label.component';
var COMPONENT_DIRECTIVES = [
    LabelDirective,
    LabelComponent
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
        { type: NgModule, args: [{
                    imports: [CommonModule, SharedDirectivesModule],
                    declarations: COMPONENT_DIRECTIVES.slice(),
                    exports: COMPONENT_DIRECTIVES.concat([FloatingLabelModule, SharedDirectivesModule])
                },] },
    ];
    return LabelModule;
}());
export { LabelModule };
