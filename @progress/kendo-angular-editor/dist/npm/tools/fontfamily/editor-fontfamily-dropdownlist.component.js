/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
/**
 * @hidden
 */
var FontFamilyDropDownListComponent = /** @class */ (function () {
    function FontFamilyDropDownListComponent() {
        this.valueChange = new core_1.EventEmitter();
    }
    FontFamilyDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FontFamilyDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FontFamilyDropDownListComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-fontfamily-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'fontName'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span [ngStyle]=\"{ 'font-family': dataItem.fontName }\">\n                    {{ dataItem.text }}\n                </span>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    FontFamilyDropDownListComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        defaultItem: [{ type: core_1.Input }],
        itemDisabled: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        element: [{ type: core_1.ViewChild, args: ['element',] }],
        dropDownList: [{ type: core_1.ViewChild, args: ['element', { read: kendo_angular_dropdowns_1.DropDownListComponent },] }]
    };
    return FontFamilyDropDownListComponent;
}());
exports.FontFamilyDropDownListComponent = FontFamilyDropDownListComponent;
