/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fileselect_module_1 = require("./fileselect.module");
var upload_module_1 = require("./upload.module");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Uploads components.
 *
 * @example
 *
 * ```ts-no-run
 * import { UploadsModule } from '@progress/kendo-angular-upload';
 *
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { NgModule } from '@angular/core';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, UploadsModule],
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var UploadsModule = /** @class */ (function () {
    function UploadsModule() {
    }
    UploadsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        fileselect_module_1.FileSelectModule,
                        upload_module_1.UploadModule
                    ]
                },] },
    ];
    return UploadsModule;
}());
exports.UploadsModule = UploadsModule;
