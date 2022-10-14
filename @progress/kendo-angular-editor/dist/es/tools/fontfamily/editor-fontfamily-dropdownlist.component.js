/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
var FontFamilyDropDownListComponent = /** @class */ (function () {
    function FontFamilyDropDownListComponent() {
        this.valueChange = new EventEmitter();
    }
    FontFamilyDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FontFamilyDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FontFamilyDropDownListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-fontfamily-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'fontName'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span [ngStyle]=\"{ 'font-family': dataItem.fontName }\">\n                    {{ dataItem.text }}\n                </span>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    FontFamilyDropDownListComponent.propDecorators = {
        data: [{ type: Input }],
        value: [{ type: Input }],
        defaultItem: [{ type: Input }],
        itemDisabled: [{ type: Input }],
        title: [{ type: Input }],
        disabled: [{ type: Input }],
        tabindex: [{ type: Input }],
        valueChange: [{ type: Output }],
        element: [{ type: ViewChild, args: ['element',] }],
        dropDownList: [{ type: ViewChild, args: ['element', { read: DropDownListComponent },] }]
    };
    return FontFamilyDropDownListComponent;
}());
export { FontFamilyDropDownListComponent };
