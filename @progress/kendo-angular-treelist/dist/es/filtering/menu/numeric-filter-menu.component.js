/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NumericFilterComponent } from '../numeric-filter.component';
import { setFilter, logicOperators } from '../base-filter-cell.component';
/**
 * Represents a numeric-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="UnitPrice" title="Unit Price">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *          <kendo-treelist-numeric-filter-menu
 *              [column]="column"
 *              [filter]="filter"
 *              [filterService]="filterService"
 *              >
 *          </kendo-treelist-numeric-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
var NumericFilterMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NumericFilterMenuComponent, _super);
    function NumericFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        _this.logicOperators = logicOperators(_this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        _this.extra = true;
        return _this;
    }
    Object.defineProperty(NumericFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterMenuComponent.prototype, "firstFilter", {
        get: function () {
            return setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    NumericFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    NumericFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    NumericFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-numeric-filter-menu',
                    template: "\n        <kendo-treelist-numeric-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [format]=\"format\"\n            [decimals]=\"decimals\"\n            [spinners]=\"spinners\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [step]=\"step\"\n            >\n        </kendo-treelist-numeric-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\"\n            (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-treelist-numeric-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [format]=\"format\"\n            [decimals]=\"decimals\"\n            [spinners]=\"spinners\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [step]=\"step\"\n            >\n        </kendo-treelist-numeric-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    NumericFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        extra: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return NumericFilterMenuComponent;
}(NumericFilterComponent));
export { NumericFilterMenuComponent };
