/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnListComponent } from './column-list.component';
import { ColumnChooserComponent } from './column-chooser.component';
import { ColumnMenuChooserComponent } from './column-menu-chooser.component';
import { ColumnMenuFilterComponent } from './column-menu-filter.component';
import { ColumnMenuItemComponent } from './column-menu-item.component';
import { ColumnMenuItemContentTemplateDirective } from './column-menu-item-content-template.directive';
import { ColumnMenuSortComponent } from './column-menu-sort.component';
import { ColumnMenuComponent } from './column-menu.component';
import { ColumnMenuLockComponent } from './column-menu-lock.component';
import { FilterMenuModule } from '../filtering/menu/filter-menu.module';
import { ColumnMenuTemplateDirective } from './column-menu-template.directive';
const COMPONENTS = [
    ColumnListComponent,
    ColumnChooserComponent,
    ColumnMenuChooserComponent,
    ColumnMenuFilterComponent,
    ColumnMenuItemComponent,
    ColumnMenuItemContentTemplateDirective,
    ColumnMenuSortComponent,
    ColumnMenuComponent,
    ColumnMenuLockComponent,
    ColumnMenuTemplateDirective
];
/**
 * @hidden
 */
export class ColumnMenuModule {
    static exports() {
        return [
            ColumnChooserComponent,
            ColumnMenuFilterComponent,
            ColumnMenuItemComponent,
            ColumnMenuItemContentTemplateDirective,
            ColumnMenuSortComponent,
            ColumnMenuLockComponent,
            ColumnMenuChooserComponent,
            ColumnMenuTemplateDirective,
            ColumnMenuComponent
        ];
    }
}
ColumnMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENTS],
                imports: [CommonModule, FilterMenuModule],
                exports: [COMPONENTS]
            },] },
];
