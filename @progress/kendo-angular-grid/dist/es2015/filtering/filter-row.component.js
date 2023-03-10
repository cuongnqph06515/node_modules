/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { DetailTemplateDirective } from '../rendering/details/detail-template.directive';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class FilterRowComponent {
    constructor(localization) {
        this.localization = localization;
        this.columns = [];
        this.groups = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
}
FilterRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFilterRow]',
                template: `
      <td
         [class.k-group-cell]="true"
         *ngFor="let g of groups"
         role="presentation">
      </td>
      <td
         [class.k-hierarchy-cell]="true"
         *ngIf="detailTemplate?.templateRef"
         role="presentation">
      </td>
      <td *ngFor="let column of columns; let columnIndex = index"
          [attr.aria-label]="filterLabel"
          kendoGridFilterCell
            [column]="column"
            [filter]="filter"
          kendoGridLogicalCell
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
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
};
