/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from "../filter.service";
import { ColumnComponent } from '../../columns/column.component';
import { SinglePopupService } from '../../common/single-popup.service';
import { filtersByField } from '../base-filter-cell.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
/**
 * @hidden
 */
export class FilterMenuComponent {
    constructor(filterService, popupService, localization) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.filterLabel = this.localization.get('filter');
    }
    get hasFilters() {
        return filtersByField(this.filter, (this.column || {}).field).length > 0;
    }
    toggle(anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        return false;
    }
    close() {
        this.popupService.destroy();
    }
}
FilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-filter-menu',
                template: `
        <a #anchor
            [ngClass]="{'k-grid-filter':true, 'k-state-active': hasFilters}"
            (click)="toggle(anchor, template)"
            href="#"
            [attr.title]="filterLabel">
            <span class="k-icon k-i-filter"></span>
        </a>
        <ng-template #template>
            <kendo-treelist-filter-menu-container
                [column]="column"
                [filter]="filter"
                (close)="close()"
                >
            </kendo-treelist-filter-menu-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
FilterMenuComponent.ctorParameters = () => [
    { type: FilterService },
    { type: SinglePopupService },
    { type: LocalizationService }
];
FilterMenuComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};
