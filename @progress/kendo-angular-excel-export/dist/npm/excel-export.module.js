/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var excel_export_component_1 = require("./excel-export.component");
var column_component_1 = require("./columns/column.component");
var column_group_component_1 = require("./columns/column-group.component");
var footer_template_directive_1 = require("./columns/footer-template.directive");
var group_footer_template_directive_1 = require("./columns/group-footer-template.directive");
var group_header_template_directive_1 = require("./columns/group-header-template.directive");
var group_header_column_template_directive_1 = require("./columns/group-header-column-template.directive");
var declarations = [
    excel_export_component_1.ExcelExportComponent,
    column_component_1.ColumnComponent,
    column_group_component_1.ColumnGroupComponent,
    footer_template_directive_1.FooterTemplateDirective,
    group_footer_template_directive_1.GroupFooterTemplateDirective,
    group_header_template_directive_1.GroupHeaderTemplateDirective,
    group_header_column_template_directive_1.GroupHeaderColumnTemplateDirective
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
var ExcelExportModule = /** @class */ (function () {
    function ExcelExportModule() {
    }
    ExcelExportModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [declarations],
            exports: [declarations]
        })
    ], ExcelExportModule);
    return ExcelExportModule;
}());
exports.ExcelExportModule = ExcelExportModule;
