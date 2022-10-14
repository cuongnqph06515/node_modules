/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the Editor component.
 *
 * The package exports:
 * - `EditorComponent`&mdash;The `EditorComponent` class.
 * - `EditorButtonDirective`&mdash;The `EditorButton` directive class.
 * - `EditorDropDownDirective`&mdash;The `EditorDropDown` directive class.
 * - `EditorDialogDirective`&mdash;The `EditorDialog` directive class.
 * - `ToolBarDropDownListComponent`&mdash;The `ToolBarDropDownListComponent` directive class.
 * - `ButtonModule`&mdash;The `KendoButton` module.
 * - `ToolBarModule`&mdash;The `KendoToolBar` module.
 *
 *  * @example
 *
 * ```ts-no-run
 * // Import the Editor module
 * import { EditorModule } from '@progress/kendo-angular-editor';
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
 *     imports:      [BrowserModule, EditorModule], // import the Editor module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export declare class EditorModule {
}
