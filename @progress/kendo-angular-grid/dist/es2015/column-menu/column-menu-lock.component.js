/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnInfoService } from '../common/column-info.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-lock` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-lock [service]="service">
 *              </kendo-grid-columnmenu-lock>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
export class ColumnMenuLockComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
    }
    get text() {
        return this.localization.get(this.locked ? 'unlock' : 'lock');
    }
    get icon() {
        return this.locked ? 'unlock' : 'lock';
    }
    get disabled() {
        return !this.locked && this.columnInfoService.unlockedRootCount < 2;
    }
    /**
     * @hidden
     */
    toggleColumn() {
        this.toggleHierarchy(!this.locked);
        this.close();
        this.changeDetector.markForCheck();
    }
    toggleHierarchy(locked) {
        let root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        const columns = [root];
        const allChanged = [];
        while (columns.length) {
            const column = columns.shift();
            column.locked = locked;
            allChanged.push(column);
            if (column.hasChildren) {
                columns.push(...column.childrenArray);
            }
        }
        this.columnInfoService.changeLocked(allChanged);
    }
    get locked() {
        return this.service.column.locked;
    }
}
ColumnMenuLockComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-lock',
                template: `
       <kendo-grid-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuLockComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: ChangeDetectorRef }
];
