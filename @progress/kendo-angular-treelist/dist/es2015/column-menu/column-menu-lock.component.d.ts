/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnInfoService } from '../common/column-info.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
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
export declare class ColumnMenuLockComponent extends ColumnMenuItemBase {
    private localization;
    private columnInfoService;
    private changeDetector;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService, changeDetector: ChangeDetectorRef);
    readonly text: string;
    readonly icon: string;
    readonly disabled: boolean;
    /**
     * @hidden
     */
    toggleColumn(): void;
    private toggleHierarchy;
    private readonly locked;
}
