/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BooleanFilterComponent } from '../boolean-filter.component';
import { guid } from '@progress/kendo-angular-common';
/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-treelist-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-treelist-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-treelist-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
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
        _this.idPrefix = guid();
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
        { type: Component, args: [{
                    selector: 'kendo-treelist-boolean-filter-menu',
                    template: "\n        <ul class=\"k-radio-list k-reset\">\n            <li *ngFor=\"let item of items\">\n                <input type=\"radio\"\n                    [name]=\"idPrefix\"\n                    class=\"k-radio\"\n                    [checked]=\"isSelected(item.value)\"\n                    [attr.id]=\"radioId(item.value)\"\n                    (change)=\"onChange(item.value)\"\n                />\n                <label class=\"k-radio-label\" [attr.for]=\"radioId(item.value)\">{{item.text}}</label>\n            </li>\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    BooleanFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        filter: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return BooleanFilterMenuComponent;
}(BooleanFilterComponent));
export { BooleanFilterMenuComponent };
