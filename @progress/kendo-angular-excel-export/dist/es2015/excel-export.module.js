/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ExcelExportComponent } from './excel-export.component';
import { ColumnComponent } from './columns/column.component';
import { ColumnGroupComponent } from './columns/column-group.component';
import { FooterTemplateDirective } from './columns/footer-template.directive';
import { GroupFooterTemplateDirective } from './columns/group-footer-template.directive';
import { GroupHeaderTemplateDirective } from './columns/group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from './columns/group-header-column-template.directive';
const declarations = [
    ExcelExportComponent,
    ColumnComponent,
    ColumnGroupComponent,
    FooterTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderTemplateDirective,
    GroupHeaderColumnTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel Export component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ExcelExportModule module
 * import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
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
 *     imports:      [BrowserModule, ExcelExportModule], // import ExcelExportModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
let ExcelExportModule = class ExcelExportModule {
};
ExcelExportModule = tslib_1.__decorate([
    NgModule({
        declarations: [declarations],
        exports: [declarations]
    })
], ExcelExportModule);
export { ExcelExportModule };
