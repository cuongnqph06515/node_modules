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
var FormatDropDownListComponent = /** @class */ (function () {
    function FormatDropDownListComponent() {
        this.valueChange = new core_1.EventEmitter();
    }
    FormatDropDownListComponent.prototype.onValueChange = function (tag) {
        this.valueChange.emit(tag);
    };
    FormatDropDownListComponent.prototype.focus = function () {
        this.dropDownList.focus();
    };
    FormatDropDownListComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    selector: 'kendo-editor-format-dropdownlist',
                    template: "\n        <kendo-dropdownlist\n            #element\n            [defaultItem]=\"defaultItem\"\n            [textField]=\"'text'\"\n            [valueField]=\"'tag'\"\n            [data]=\"data\"\n            [(value)]=\"value\"\n            [valuePrimitive]=\"true\"\n            [itemDisabled]=\"itemDisabled\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex\"\n            (valueChange)=\"onValueChange($event)\"\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <ng-container [ngSwitch]=\"dataItem.tag\">\n                    <span *ngSwitchCase=\"'h1'\" style=\"display: block; font-size: 2em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h2'\" style=\"display: block; font-size: 1.5em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h3'\" style=\"display: block; font-size: 1.17em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h4'\" style=\"display: block; font-size: 1em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h5'\" style=\"display: block; font-size: .83em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'h6'\" style=\"display: block; font-size: .67em; margin-left: 0; font-weight: bold;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'p'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchCase=\"'blockquote'\" style=\"display: block; margin-left: 0;\">\n                        {{ dataItem.text }}\n                    </span>\n\n                    <span *ngSwitchDefault>{{ dataItem.text }}</span>\n                </ng-container>\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    FormatDropDownListComponent.propDecorators = {
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
    return FormatDropDownListComponent;
}());
exports.FormatDropDownListComponent = FormatDropDownListComponent;
