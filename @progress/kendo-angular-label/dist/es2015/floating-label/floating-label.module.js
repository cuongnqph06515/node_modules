/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectivesModule } from './../shared.module';
import { FloatingLabelComponent } from './floating-label.component';
const COMPONENT_DIRECTIVES = [FloatingLabelComponent];
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
export class FloatingLabelModule {
}
FloatingLabelModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...COMPONENT_DIRECTIVES],
                exports: [...COMPONENT_DIRECTIVES, SharedDirectivesModule],
                imports: [CommonModule, SharedDirectivesModule]
            },] },
];
