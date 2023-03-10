/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { FilterService } from '../filter.service';
import { isPresent, isNullOrEmptyString } from '../../utils';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
var EMPTY_FILTER_OPERATORS = ['isnull', 'isnotnull', 'isempty', 'isnotempty'];
/**
 * @hidden
 */
var FilterCellWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterCellWrapperComponent, _super);
    function FilterCellWrapperComponent(filterService) {
        var _this = _super.call(this, filterService) || this;
        _this.showOperators = true;
        return _this;
    }
    Object.defineProperty(FilterCellWrapperComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "overrideBaseClasses", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "showButton", {
        get: function () {
            var filter = this.currentFilter;
            return isPresent(filter) && (!isNullOrEmptyString(filter.value) ||
                EMPTY_FILTER_OPERATORS.indexOf(String(filter.operator)) >= 0);
        },
        enumerable: true,
        configurable: true
    });
    FilterCellWrapperComponent.prototype.filterChange = function (filter) {
        this.applyFilter(filter);
    };
    FilterCellWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-wrapper-cell',
                    template: "\n        <ng-content></ng-content>\n        <kendo-grid-filter-cell-operators\n            [showOperators]=\"showOperators\"\n            [operators]=\"operators\"\n            (clear)=\"onClear()\"\n            [showButton]=\"showButton\"\n            [(value)]=\"currentOperator\">\n        </kendo-grid-filter-cell-operators>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellWrapperComponent.ctorParameters = function () { return [
        { type: FilterService }
    ]; };
    FilterCellWrapperComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-wrapper',] }],
        overrideBaseClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        showOperators: [{ type: Input }]
    };
    return FilterCellWrapperComponent;
}(FilterInputWrapperComponent));
export { FilterCellWrapperComponent };
