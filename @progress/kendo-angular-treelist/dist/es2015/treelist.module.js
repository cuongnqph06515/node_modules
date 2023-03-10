/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeListComponent } from './treelist.component';
import { ListComponent } from './rendering/list.component';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { RowFilterModule } from "./filtering/cell/row-filtering.module";
import { PagerModule } from "./pager/pager.module";
import { HeaderModule } from "./rendering/header/header.module";
import { BodyModule } from "./rendering/body.module";
import { SharedModule } from './shared.module';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { ToolbarComponent } from "./rendering/toolbar/toolbar.component";
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { TemplateEditingDirective } from './editing-directives/template-editing.directive';
import { ReactiveEditingDirective } from './editing-directives/reactive-editing.directive';
import { InCellEditingDirective } from './editing-directives/in-cell-editing.directive';
import { FilterMenuModule } from "./filtering/menu/filter-menu.module";
import { ColumnMenuModule } from './column-menu/column-menu.module';
import { HierarchyBindingDirective } from './binding-directives/hierarchy-binding.directive';
import { FlatBindingDirective } from './binding-directives/flat-binding.directive';
const exportedModules = [
    TreeListComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    CustomMessagesComponent,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    HierarchyBindingDirective,
    FlatBindingDirective,
    ...SharedModule.exports(),
    ...BodyModule.exports(),
    ...HeaderModule.exports(),
    ...PagerModule.exports(),
    ...RowFilterModule.exports(),
    ...FilterMenuModule.exports(),
    ...ColumnMenuModule.exports()
];
const declarations = [
    TreeListComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    ToolbarTemplateDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    HierarchyBindingDirective,
    FlatBindingDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TreeList component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList module
 * import { TreeListModule } from '@progress/kendo-angular-treelist';
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
 *     imports:      [BrowserModule, TreeListModule], // import TreeList module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class TreeListModule {
}
TreeListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [
                    CommonModule,
                    SharedModule,
                    BodyModule,
                    HeaderModule,
                    PagerModule,
                    RowFilterModule,
                    FilterMenuModule,
                    ResizeSensorModule,
                    ColumnMenuModule
                ]
            },] },
];
