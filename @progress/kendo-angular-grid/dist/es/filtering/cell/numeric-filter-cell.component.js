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
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
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
    /**
     * @hidden
     */
    NumericFilterCellComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    NumericFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-numeric-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n        >\n            <kendo-numerictextbox\n                kendoGridFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\"\n            >\n                <kendo-numerictextbox-messages\n                    [increment]=\"messageFor('filterNumericIncrement')\"\n                    [decrement]=\"messageFor('filterNumericDecrement')\"\n                >\n                </kendo-numerictextbox-messages>\n            </kendo-numerictextbox>\n        </kendo-grid-filter-wrapper-cell>\n    "
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
