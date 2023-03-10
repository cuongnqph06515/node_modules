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
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-lock` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item-lock/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
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
            if (column.children) {
                columns.push(...column.children.toArray().slice(1));
            }
            if (column.childColumns) {
                columns.push(...column.childColumns.toArray());
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
                selector: 'kendo-treelist-columnmenu-lock',
                template: `
       <kendo-treelist-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-treelist-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuLockComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: ChangeDetectorRef }
];
