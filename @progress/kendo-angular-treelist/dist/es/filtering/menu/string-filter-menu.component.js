/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { StringFilterComponent } from '../string-filter.component';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { setFilter, logicOperators } from '../base-filter-cell.component';
/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 */
var StringFilterMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringFilterMenuComponent, _super);
    function StringFilterMenuComponent(localization) {
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
    Object.defineProperty(StringFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterMenuComponent.prototype, "firstFilter", {
        get: function () {
            return setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    StringFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    StringFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    StringFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-string-filter-menu',
                    template: "\n        <kendo-treelist-string-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-treelist-string-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\" (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-treelist-string-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-treelist-string-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    StringFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        extra: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return StringFilterMenuComponent;
}(StringFilterComponent));
export { StringFilterMenuComponent };
