/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
/**
 * @hidden
 */
var FilterMenuInputWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterMenuInputWrapperComponent, _super);
    function FilterMenuInputWrapperComponent() {
        return _super.call(this, null) || this;
    }
    Object.defineProperty(FilterMenuInputWrapperComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuInputWrapperComponent.prototype.operatorChange = function (dataItem) {
        this.currentOperator = dataItem;
    };
    FilterMenuInputWrapperComponent.prototype.filterChange = function (filter) {
        this.applyFilter(filter);
    };
    Object.defineProperty(FilterMenuInputWrapperComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this._currentFilter;
        },
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        set: function (value) {
            this._currentFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuInputWrapperComponent.prototype.updateFilter = function (filter) {
        Object.assign(this.currentFilter, filter);
        return this.filter;
    };
    FilterMenuInputWrapperComponent.prototype.onChange = function (value) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value: value
        }));
    };
    FilterMenuInputWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-menu-input-wrapper',
                    template: "\n        <kendo-dropdownlist\n            [data]=\"operators\"\n            (valueChange)=\"operatorChange($event)\"\n            [value]=\"currentOperator\"\n            [valuePrimitive]=\"true\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuInputWrapperComponent.ctorParameters = function () { return []; };
    FilterMenuInputWrapperComponent.propDecorators = {
        filterService: [{ type: Input }],
        currentFilter: [{ type: Input }]
    };
    return FilterMenuInputWrapperComponent;
}(FilterInputWrapperComponent));
export { FilterMenuInputWrapperComponent };
