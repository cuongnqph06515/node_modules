/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter } from '@angular/core';
import { ItemDisabledFn, DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { FontSizeItem } from '../../common/font-size-item.interface';
/**
 * @hidden
 */
export declare class FontSizeDropDownListComponent {
    data: FontSizeItem[];
    value: string;
    defaultItem: FontSizeItem;
    itemDisabled: ItemDisabledFn;
    title: string;
    disabled: boolean;
    tabindex: number;
    valueChange: EventEmitter<string>;
    element: ElementRef;
    dropDownList: DropDownListComponent;
    onValueChange(size: string): void;
    focus(): void;
}
