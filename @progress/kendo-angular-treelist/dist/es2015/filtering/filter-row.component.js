/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class FilterRowComponent {
    constructor(localization) {
        this.localization = localization;
        this.columns = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
}
FilterRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListFilterRow]',
                template: `
      <td *ngFor="let column of columns; let columnIndex = index"
          [attr.aria-label]="filterLabel"
          kendoTreeListFilterCell
            [column]="column"
            [filter]="filter"
          kendoTreeListLogicalCell
            [logicalRowIndex]="logicalRowIndex"
            [logicalColIndex]="lockedColumnsCount + columnIndex"
      ></td>
    `
            },] },
];
/** @nocollapse */
FilterRowComponent.ctorParameters = () => [
    { type: LocalizationService }
];
FilterRowComponent.propDecorators = {
    columns: [{ type: Input }],
    filter: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
};
