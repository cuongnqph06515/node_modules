/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var string_filter_component_1 = require("../string-filter.component");
var filter_service_1 = require("../filter.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var base_filter_cell_component_1 = require("../base-filter-cell.component");
/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 */
var StringFilterMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringFilterMenuComponent, _super);
    function StringFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        _this.logicOperators = base_filter_cell_component_1.logicOperators(_this.localization);
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
            return base_filter_cell_component_1.setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return base_filter_cell_component_1.setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    StringFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    StringFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = base_filter_cell_component_1.logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    StringFilterMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-string-filter-menu',
                    template: "\n        <kendo-treelist-string-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-treelist-string-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\" (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-treelist-string-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-treelist-string-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterMenuComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    StringFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        extra: [{ type: core_1.Input }],
        filterService: [{ type: core_1.Input }]
    };
    return StringFilterMenuComponent;
}(string_filter_component_1.StringFilterComponent));
exports.StringFilterMenuComponent = StringFilterMenuComponent;
