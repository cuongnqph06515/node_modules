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
var FilterRowComponent = /** @class */ (function () {
    function FilterRowComponent(localization) {
        this.localization = localization;
        this.columns = [];
        this.groups = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
    FilterRowComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridFilterRow]',
                    template: "\n      <td\n         [class.k-group-cell]=\"true\"\n         *ngFor=\"let g of groups\"\n         role=\"presentation\">\n      </td>\n      <td\n         [class.k-hierarchy-cell]=\"true\"\n         *ngIf=\"detailTemplate?.templateRef\"\n         role=\"presentation\">\n      </td>\n      <td *ngFor=\"let column of columns; let columnIndex = index\"\n          [attr.aria-label]=\"filterLabel\"\n          kendoGridFilterCell\n            [column]=\"column\"\n            [filter]=\"filter\"\n          kendoGridLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"lockedColumnsCount + columnIndex\"\n      ></td>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterRowComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    FilterRowComponent.propDecorators = {
        columns: [{ type: Input }],
        filter: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
    };
    return FilterRowComponent;
}());
export { FilterRowComponent };
