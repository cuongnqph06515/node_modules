/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { GroupModule } from "../../grouping/group.module";
import { SharedModule } from "../../shared.module";
import { RowFilterModule } from '../../filtering/cell/row-filtering.module';
import { HeaderTemplateDirective } from "./header-template.directive";
import { ColumnHandleDirective } from './../../column-resizing/column-handle.directive';
import { SelectAllCheckboxDirective } from "../../selection/selectall-checkbox.directive";
import { FilterMenuModule } from '../../filtering/menu/filter-menu.module';
import { DragAndDropModule } from '../../dragdrop/drag-and-drop.module';
import { ColumnMenuModule } from '../../column-menu/column-menu.module';
var exportedModules = [
    HeaderComponent,
    HeaderTemplateDirective,
    ColumnHandleDirective,
    SelectAllCheckboxDirective
];
var importedModules = [
    CommonModule,
    GroupModule,
    RowFilterModule,
    FilterMenuModule,
    SharedModule,
    DragAndDropModule,
    ColumnMenuModule
];
/**
 * @hidden
 */
var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule.exports = function () {
        return [
            HeaderTemplateDirective,
            SelectAllCheckboxDirective
        ];
    };
    HeaderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exportedModules],
                    exports: [exportedModules],
                    imports: importedModules.slice()
                },] },
    ];
    return HeaderModule;
}());
export { HeaderModule };
