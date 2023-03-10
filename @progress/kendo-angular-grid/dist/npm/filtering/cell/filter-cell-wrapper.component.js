/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_service_1 = require("../filter.service");
var utils_1 = require("../../utils");
var filter_input_wrapper_component_1 = require("../filter-input-wrapper.component");
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
            return utils_1.isPresent(filter) && (!utils_1.isNullOrEmptyString(filter.value) ||
                EMPTY_FILTER_OPERATORS.indexOf(String(filter.operator)) >= 0);
        },
        enumerable: true,
        configurable: true
    });
    FilterCellWrapperComponent.prototype.filterChange = function (filter) {
        this.applyFilter(filter);
    };
    FilterCellWrapperComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-filter-wrapper-cell',
                    template: "\n        <ng-content></ng-content>\n        <kendo-grid-filter-cell-operators\n            [showOperators]=\"showOperators\"\n            [operators]=\"operators\"\n            (clear)=\"onClear()\"\n            [showButton]=\"showButton\"\n            [(value)]=\"currentOperator\">\n        </kendo-grid-filter-cell-operators>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellWrapperComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService }
    ]; };
    FilterCellWrapperComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell-wrapper',] }],
        overrideBaseClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell',] }],
        showOperators: [{ type: core_1.Input }]
    };
    return FilterCellWrapperComponent;
}(filter_input_wrapper_component_1.FilterInputWrapperComponent));
exports.FilterCellWrapperComponent = FilterCellWrapperComponent;
