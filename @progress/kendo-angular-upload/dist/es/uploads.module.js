/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { FileSelectModule } from './fileselect.module';
import { UploadModule } from './upload.module';
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
        { type: NgModule, args: [{
                    exports: [
                        FileSelectModule,
                        UploadModule
                    ]
                },] },
    ];
    return UploadsModule;
}());
export { UploadsModule };
