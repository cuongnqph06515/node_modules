/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SortService } from '../common/sort.service';
import { normalize } from '../columns/sort-settings';
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item for sorting Grid columns that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-sort` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
export class ColumnMenuSortComponent extends ColumnMenuItemBase {
    constructor(localization, sortService) {
        super();
        this.localization = localization;
        this.sortService = sortService;
    }
    get sortedAsc() {
        const descriptor = this.descriptor;
        return descriptor && (!descriptor.dir || descriptor.dir === 'asc');
    }
    get sortedDesc() {
        const descriptor = this.descriptor;
        return descriptor && descriptor.dir === 'desc';
    }
    /**
     * @hidden
     */
    toggleSort(dir) {
        const field = this.service.column.field;
        const { mode, allowUnsort } = normalize(this.service.sortable);
        const descriptor = this.descriptor;
        const sort = mode === 'multiple' ? this.service.sort.filter(s => s.field !== field) : [];
        if (descriptor && descriptor.dir === dir) {
            if (!allowUnsort) {
                return;
            }
        }
        else {
            sort.push({ field, dir });
        }
        this.sortService.sort(sort);
        this.close();
    }
    get descriptor() {
        return [].concat(this.service.sort || []).find(s => s.field === this.service.column.field);
    }
}
ColumnMenuSortComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-sort',
                template: `
        <kendo-grid-columnmenu-item [text]="localization.get('sortAscending')"
            icon="sort-asc-sm" (itemClick)="toggleSort('asc')" [selected]="sortedAsc">
        </kendo-grid-columnmenu-item>
        <kendo-grid-columnmenu-item [text]="localization.get('sortDescending')"
            icon="sort-desc-sm" (itemClick)="toggleSort('desc')" [selected]="sortedDesc">
        </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuSortComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: SortService }
];
