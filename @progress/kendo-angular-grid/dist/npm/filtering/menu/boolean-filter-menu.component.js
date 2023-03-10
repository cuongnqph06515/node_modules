/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_service_1 = require("../filter.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var boolean_filter_component_1 = require("../boolean-filter.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var BooleanFilterMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanFilterMenuComponent, _super);
    function BooleanFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        _this.idPrefix = kendo_angular_common_1.guid();
        return _this;
    }
    Object.defineProperty(BooleanFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.radioId = function (value) {
        return this.idPrefix + "_" + value;
    };
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.onChange = function (value) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: "eq",
            value: value
        }));
    };
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.isSelected = function (radioValue) {
        return this.filtersByField(this.column.field).some(function (_a) {
            var value = _a.value;
            return value === radioValue;
        });
    };
    BooleanFilterMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-boolean-filter-menu',
                    template: "\n        <ul class=\"k-radio-list k-reset\">\n            <li *ngFor=\"let item of items\">\n                <input type=\"radio\"\n                    [name]=\"idPrefix\"\n                    class=\"k-radio\"\n                    [checked]=\"isSelected(item.value)\"\n                    [attr.id]=\"radioId(item.value)\"\n                    (change)=\"onChange(item.value)\"\n                />\n                <label class=\"k-radio-label\" [attr.for]=\"radioId(item.value)\">{{item.text}}</label>\n            </li>\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanFilterMenuComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    BooleanFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell',] }],
        filter: [{ type: core_1.Input }],
        filterService: [{ type: core_1.Input }]
    };
    return BooleanFilterMenuComponent;
}(boolean_filter_component_1.BooleanFilterComponent));
exports.BooleanFilterMenuComponent = BooleanFilterMenuComponent;
