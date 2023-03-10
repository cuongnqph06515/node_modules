/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var FilterRowComponent = /** @class */ (function () {
    function FilterRowComponent(localization) {
        this.localization = localization;
        this.columns = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
    FilterRowComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoTreeListFilterRow]',
                    template: "\n      <td *ngFor=\"let column of columns; let columnIndex = index\"\n          [attr.aria-label]=\"filterLabel\"\n          kendoTreeListFilterCell\n            [column]=\"column\"\n            [filter]=\"filter\"\n          kendoTreeListLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"lockedColumnsCount + columnIndex\"\n      ></td>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterRowComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    FilterRowComponent.propDecorators = {
        columns: [{ type: Input }],
        filter: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
    };
    return FilterRowComponent;
}());
export { FilterRowComponent };
