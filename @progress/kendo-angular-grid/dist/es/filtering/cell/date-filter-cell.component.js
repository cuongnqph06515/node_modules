/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateFilterComponent } from '../date-filter.component';
/**
 * Represents a date-filter cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var DateFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateFilterCellComponent, _super);
    function DateFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    /**
     * @hidden
     */
    DateFilterCellComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    DateFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-date-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n        >\n            <kendo-datepicker\n                kendoFilterInput\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [weekNumber]=\"weekNumber\"\n            >\n                <kendo-datepicker-messages\n                    [toggle]=\"messageFor('filterDateToggle')\"\n                    [today]=\"messageFor('filterDateToday')\"\n                >\n                </kendo-datepicker-messages>\n            </kendo-datepicker>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    DateFilterCellComponent.propDecorators = {
        showOperators: [{ type: Input }]
    };
    return DateFilterCellComponent;
}(DateFilterComponent));
export { DateFilterCellComponent };
