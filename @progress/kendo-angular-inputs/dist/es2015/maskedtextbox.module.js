/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { MaskedTextBoxComponent } from './maskedtextbox/maskedtextbox.component';
import { CommonModule } from '@angular/common';
import { EventsModule } from '@progress/kendo-angular-common';
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the MaskedTextBox component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the MaskedTextBox module
 * import { MaskedTextBoxModule } from '@progress/kendo-angular-inputs';
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
 *     imports:      [BrowserModule, MaskedTextBoxModule], // import MaskedTextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class MaskedTextBoxModule {
}
MaskedTextBoxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MaskedTextBoxComponent],
                exports: [MaskedTextBoxComponent],
                imports: [CommonModule, EventsModule]
            },] },
];
