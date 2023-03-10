/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTitleBarComponent } from './dialog/dialog-titlebar.component';
import { DialogService } from './dialog/dialog.service';
import { DialogContainerDirective } from './dialog/dialog-container.directive';
import { DialogContainerService } from './dialog/dialog-container.service';
import { SharedModule, SHARED_DIRECTIVES } from './shared.module';
/**
 * @hidden
 */
export const DIALOG_DIRECTIVES = [
    DialogComponent,
    DialogTitleBarComponent
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
export class DialogModule {
}
DialogModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIALOG_DIRECTIVES, DialogContainerDirective],
                entryComponents: [DIALOG_DIRECTIVES],
                exports: [DIALOG_DIRECTIVES, SHARED_DIRECTIVES, DialogContainerDirective],
                imports: [SharedModule],
                providers: [DialogContainerService, DialogService]
            },] },
];
