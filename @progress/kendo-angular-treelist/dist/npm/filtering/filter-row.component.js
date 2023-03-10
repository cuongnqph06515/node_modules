/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: core_1.Component, args: [{
                    selector: '[kendoTreeListFilterRow]',
                    template: "\n      <td *ngFor=\"let column of columns; let columnIndex = index\"\n          [attr.aria-label]=\"filterLabel\"\n          kendoTreeListFilterCell\n            [column]=\"column\"\n            [filter]=\"filter\"\n          kendoTreeListLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"lockedColumnsCount + columnIndex\"\n      ></td>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterRowComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    FilterRowComponent.propDecorators = {
        columns: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        logicalRowIndex: [{ type: core_1.Input }],
        lockedColumnsCount: [{ type: core_1.Input }],
        filterRowClass: [{ type: core_1.HostBinding, args: ['class.k-filter-row',] }]
    };
    return FilterRowComponent;
}());
exports.FilterRowComponent = FilterRowComponent;
