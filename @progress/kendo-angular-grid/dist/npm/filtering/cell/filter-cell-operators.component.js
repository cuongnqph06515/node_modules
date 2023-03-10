/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Represents a component which accommodates the filter operators.
 */
var FilterCellOperatorsComponent = /** @class */ (function () {
    function FilterCellOperatorsComponent(localization) {
        this.localization = localization;
        this.clearText = 'Clear';
        /**
         * The filter operators that will be displayed.
         */
        this.operators = [];
        /**
         * Determines if the list of operators will be displayed.
         * @type {boolean}
         */
        this.showOperators = true;
        /**
         * Fires when the operator is selected.
         * @type {EventEmitter<string>}
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires when the **Clear** button is clicked.
         * @type {EventEmitter<{}>}
         */
        this.clear = new core_1.EventEmitter();
    }
    Object.defineProperty(FilterCellOperatorsComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.onChange = function (dataItem) {
        this.valueChange.emit(dataItem);
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.clearClick = function () {
        this.clear.emit();
        return false;
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.clearKeydown = function (args) {
        if (args.keyCode === kendo_angular_common_1.Keys.Enter || args.keyCode === kendo_angular_common_1.Keys.Space) {
            this.clear.emit();
        }
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.dropdownKeydown = function (args) {
        if (args.defaultPrevented) {
            return;
        }
        if (args.keyCode === kendo_angular_common_1.Keys.Enter && !this.dropdown.isOpen) {
            this.dropdown.toggle(true);
            args.preventDefault();
        }
    };
    FilterCellOperatorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localization.changes.subscribe(function () { return _this.clearText = _this.localization.get("filterClearButton"); });
    };
    FilterCellOperatorsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-filter-cell-operators',
                    template: "\n        <kendo-dropdownlist\n            #dropdown\n            *ngIf=\"showOperators\"\n            kendoGridFocusable\n            [data]=\"operators\"\n            class=\"k-dropdown-operator\"\n            (valueChange)=\"onChange($event)\"\n            [value]=\"value\"\n            iconClass=\"k-i-filter\"\n            [valuePrimitive]=\"true\"\n            textField=\"text\"\n            [popupSettings]=\"{ width: 'auto' }\"\n            valueField=\"value\"\n            (keydown)=\"dropdownKeydown($event)\">\n        </kendo-dropdownlist>\n        <button type=\"button\"\n            kendoGridFocusable\n            [ngClass]=\"{'k-clear-button-visible': showButton}\"\n            class=\"k-button k-button-icon\"\n            [title]=\"clearText\"\n            (click)=\"clearClick()\"\n            (keydown)=\"clearKeydown($event)\">\n                <span class=\"k-icon k-i-filter-clear\"></span>\n        </button>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellOperatorsComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    FilterCellOperatorsComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-filtercell-operator',] }],
        dropdown: [{ type: core_1.ViewChild, args: ['dropdown',] }],
        operators: [{ type: core_1.Input }],
        showButton: [{ type: core_1.Input }],
        showOperators: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        clear: [{ type: core_1.Output }]
    };
    return FilterCellOperatorsComponent;
}());
exports.FilterCellOperatorsComponent = FilterCellOperatorsComponent;
