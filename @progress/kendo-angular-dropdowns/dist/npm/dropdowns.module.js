/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var autocomplete_module_1 = require("./autocomplete/autocomplete.module");
var combobox_module_1 = require("./comboboxes/combobox.module");
var dropdownlist_module_1 = require("./dropdownlist/dropdownlist.module");
var multiselect_module_1 = require("./multiselect/multiselect.module");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dropdowns components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Dropdowns module
 * import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
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
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, DropDownsModule], // import the Dropdowns module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DropDownsModule = /** @class */ (function () {
    function DropDownsModule() {
    }
    DropDownsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [autocomplete_module_1.AutoCompleteModule, combobox_module_1.ComboBoxModule, dropdownlist_module_1.DropDownListModule, multiselect_module_1.MultiSelectModule]
                },] },
    ];
    return DropDownsModule;
}());
exports.DropDownsModule = DropDownsModule;
