/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
/**
 * @hidden
 */
export class ToolBarButtonListComponent extends ToolBarToolComponent {
    constructor() {
        super(...arguments);
        this.itemClick = new EventEmitter();
    }
    getText(dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    }
    onClick(item) {
        const dataItem = this.data[this.data.indexOf(item)];
        if (item.click) {
            item.click(dataItem);
        }
        this.itemClick.emit(dataItem);
    }
}
ToolBarButtonListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-toolbar-buttonlist',
                template: `
        <button
            type="button"
            tabindex="-1"
            kendoButton
            style="padding-left: 16px"
            class="k-overflow-button"
            *ngFor="let item of data"
            [disabled]="item.disabled"
            [icon]="item.icon"
            [iconClass]="item.iconClass"
            [imageUrl]="item.imageUrl"
            (click)="onClick(item)"
        >
            {{ getText(item) }}
        </button>
    `
            },] },
];
ToolBarButtonListComponent.propDecorators = {
    data: [{ type: Input }],
    textField: [{ type: Input }],
    itemClick: [{ type: Output }]
};
