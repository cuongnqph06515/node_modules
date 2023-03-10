/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonItemTemplateDirective } from './button-item-template.directive';
/**
 * @hidden
 */
export class ListComponent {
    constructor() {
        this.onItemClick = new EventEmitter();
        this.onItemBlur = new EventEmitter();
    }
    getText(dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    }
    getIconClasses(dataItem) {
        const icon = dataItem.icon ? 'k-icon k-i-' + dataItem.icon : undefined;
        const classes = {};
        classes[icon || dataItem.iconClass] = true;
        return classes;
    }
    onClick(index) {
        this.onItemClick.emit(index);
    }
    onBlur() {
        this.onItemBlur.emit();
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-button-list',
                template: `
        <ul class="k-list k-reset" unselectable="on">
            <li role="menuItem" unselectable="on" tabindex="-1"
                kendoButtonFocusable
                *ngFor="let dataItem of data; let index = index;"
                [index]="index"
                [ngClass]="{'k-item': true, 'k-state-disabled': dataItem.disabled}"
                (click)="onClick(index)"
                (blur)="onBlur()"
                [attr.aria-disabled]="dataItem.disabled ? true : false">
                <ng-template *ngIf="itemTemplate?.templateRef"
                    [templateContext]="{
                        templateRef: itemTemplate?.templateRef,
                        $implicit: dataItem
                    }">
                </ng-template>
                <ng-template [ngIf]="!itemTemplate?.templateRef">
                    <span
                        *ngIf="dataItem.icon || dataItem.iconClass"
                        [ngClass]="getIconClasses(dataItem)"
                    ></span>
                    <img
                        *ngIf="dataItem.imageUrl"
                        class="k-image"
                        [src]="dataItem.imageUrl"
                        alt=""
                    >
                    {{ getText(dataItem) }}
                </ng-template>
            </li>
        </ul>
      `
            },] },
];
ListComponent.propDecorators = {
    data: [{ type: Input }],
    textField: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    onItemClick: [{ type: Output }],
    onItemBlur: [{ type: Output }]
};
