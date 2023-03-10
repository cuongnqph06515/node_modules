/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NumericFilterComponent } from '../numeric-filter.component';
/**
 * Represents a numeric filter cell.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
var NumericFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NumericFilterCellComponent, _super);
    function NumericFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.localization = localization;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        _this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    NumericFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-numeric-filter-cell',
                    template: "\n        <kendo-treelist-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\">\n            <kendo-numerictextbox\n                kendoTreeListFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\">\n            </kendo-numerictextbox>\n        </kendo-treelist-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    NumericFilterCellComponent.propDecorators = {
        filterDelay: [{ type: Input }],
        showOperators: [{ type: Input }]
    };
    return NumericFilterCellComponent;
}(NumericFilterComponent));
export { NumericFilterCellComponent };
