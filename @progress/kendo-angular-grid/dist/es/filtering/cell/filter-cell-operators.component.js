/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { Keys } from '@progress/kendo-angular-common';
import { LocalizationService } from '@progress/kendo-angular-l10n';
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
        this.valueChange = new EventEmitter();
        /**
         * Fires when the **Clear** button is clicked.
         * @type {EventEmitter<{}>}
         */
        this.clear = new EventEmitter();
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
        if (args.keyCode === Keys.Enter || args.keyCode === Keys.Space) {
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
        if (args.keyCode === Keys.Enter && !this.dropdown.isOpen) {
            this.dropdown.toggle(true);
            args.preventDefault();
        }
    };
    FilterCellOperatorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localization.changes.subscribe(function () { return _this.clearText = _this.localization.get("filterClearButton"); });
    };
    FilterCellOperatorsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-cell-operators',
                    template: "\n        <kendo-dropdownlist\n            #dropdown\n            *ngIf=\"showOperators\"\n            kendoGridFocusable\n            [data]=\"operators\"\n            class=\"k-dropdown-operator\"\n            (valueChange)=\"onChange($event)\"\n            [value]=\"value\"\n            iconClass=\"k-i-filter\"\n            [valuePrimitive]=\"true\"\n            textField=\"text\"\n            [popupSettings]=\"{ width: 'auto' }\"\n            valueField=\"value\"\n            (keydown)=\"dropdownKeydown($event)\">\n        </kendo-dropdownlist>\n        <button type=\"button\"\n            kendoGridFocusable\n            [ngClass]=\"{'k-clear-button-visible': showButton}\"\n            class=\"k-button k-button-icon\"\n            [title]=\"clearText\"\n            (click)=\"clearClick()\"\n            (keydown)=\"clearKeydown($event)\">\n                <span class=\"k-icon k-i-filter-clear\"></span>\n        </button>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellOperatorsComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    FilterCellOperatorsComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-operator',] }],
        dropdown: [{ type: ViewChild, args: ['dropdown',] }],
        operators: [{ type: Input }],
        showButton: [{ type: Input }],
        showOperators: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        clear: [{ type: Output }]
    };
    return FilterCellOperatorsComponent;
}());
export { FilterCellOperatorsComponent };
