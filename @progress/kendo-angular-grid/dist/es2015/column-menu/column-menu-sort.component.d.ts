/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SortService } from '../common/sort.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
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
export declare class ColumnMenuSortComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    protected sortService: SortService;
    constructor(localization: LocalizationService, sortService: SortService);
    readonly sortedAsc: boolean;
    readonly sortedDesc: boolean;
    /**
     * @hidden
     */
    toggleSort(dir: string): void;
    private readonly descriptor;
}
