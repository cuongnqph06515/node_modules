/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { DialogModule } from './dialog.module';
import { WindowModule } from './window.module';
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
        { type: NgModule, args: [{
                    exports: [DialogModule, WindowModule]
                },] },
    ];
    return DialogsModule;
}());
export { DialogsModule };
