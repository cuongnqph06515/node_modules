/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
export class FormatDropDownListComponent {
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
FormatDropDownListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                selector: 'kendo-editor-format-dropdownlist',
                template: `
        <kendo-dropdownlist
            #element
            [defaultItem]="defaultItem"
            [textField]="'text'"
            [valueField]="'tag'"
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
                <ng-container [ngSwitch]="dataItem.tag">
                    <span *ngSwitchCase="'h1'" style="display: block; font-size: 2em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h2'" style="display: block; font-size: 1.5em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h3'" style="display: block; font-size: 1.17em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h4'" style="display: block; font-size: 1em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h5'" style="display: block; font-size: .83em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'h6'" style="display: block; font-size: .67em; margin-left: 0; font-weight: bold;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'p'" style="display: block; margin-left: 0;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchCase="'blockquote'" style="display: block; margin-left: 0;">
                        {{ dataItem.text }}
                    </span>

                    <span *ngSwitchDefault>{{ dataItem.text }}</span>
                </ng-container>
            </ng-template>
        </kendo-dropdownlist>
    `
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
