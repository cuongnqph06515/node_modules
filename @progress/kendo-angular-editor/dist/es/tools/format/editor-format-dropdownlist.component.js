/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
var FormatDropDownListComponent = /** @class */ (function () {
    function FormatDropDownListComponent() {
        this.valueChange = new EventEmitter();
    }
    FormatDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FormatDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FormatDropDownListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-format-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'tag'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <ng-container [ngSwitch]=\"dataItem.tag\">\n                    <span *ngSwitchCase=\"'h1'\" style=\"display: block; font-size: 2em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h2'\" style=\"display: block; font-size: 1.5em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h3'\" style=\"display: block; font-size: 1.17em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h4'\" style=\"display: block; font-size: 1em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h5'\" style=\"display: block; font-size: .83em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h6'\" style=\"display: block; font-size: .67em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'p'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'blockquote'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchDefault>{{ dataItem.text }}</span>\n                </ng-container>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    FormatDropDownListComponent.propDecorators = {
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
    return FormatDropDownListComponent;
}());
export { FormatDropDownListComponent };
