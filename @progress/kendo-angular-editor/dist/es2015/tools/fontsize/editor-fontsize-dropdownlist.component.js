/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
export class FontSizeDropDownListComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    onValueChange(size) {
        this.valueChange.emit(size);
    }
    focus() {
        this.dropDownList.focus();
    }
}
FontSizeDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-fontsize-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'size'"
            [data]="data"
            [(value)]="value"
            [valuePrimitive]="true"
            [itemDisabled]="itemDisabled"
            [attr.title]="title"
            [disabled]="disabled"
            [tabindex]="tabindex"
            (valueChange)="onValueChange($event)"
        >
        </kendo-dropdownlist>
    `
            },] },
];
FontSizeDropDownListComponent.propDecorators = {
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
