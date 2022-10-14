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
var FontSizeDropDownListComponent = /** @class */ (function () {
    function FontSizeDropDownListComponent() {
        this.valueChange = new core_1.EventEmitter();
    }
    FontSizeDropDownListComponent.prototype.onValueChange = function (size) {
        this.valueChange.emit(size);
    };
    FontSizeDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FontSizeDropDownListComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-fontsize-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'size'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    FontSizeDropDownListComponent.propDecorators = {
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
    return FontSizeDropDownListComponent;
}());
exports.FontSizeDropDownListComponent = FontSizeDropDownListComponent;
