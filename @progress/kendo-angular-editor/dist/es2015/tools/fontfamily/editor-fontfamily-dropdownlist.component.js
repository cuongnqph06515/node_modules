/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
export class FontFamilyDropDownListComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    onValueChange(tag) {
        this.valueChange.emit(tag);
    }
    focus() {
        this.dropDownList.focus();
    }
}
FontFamilyDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-fontfamily-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'fontName'"
            [data]="data"
            [(value)]="value"
            [valuePrimitive]="true"
            [itemDisabled]="itemDisabled"
            [attr.title]="title"
            [disabled]="disabled"
            [tabindex]="tabindex"
            (valueChange)="onValueChange($event)"
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <span [ngStyle]="{ 'font-family': dataItem.fontName }">
                    {{ dataItem.text }}
                </span>
            </ng-template>
        </kendo-dropdownlist>
    `
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
