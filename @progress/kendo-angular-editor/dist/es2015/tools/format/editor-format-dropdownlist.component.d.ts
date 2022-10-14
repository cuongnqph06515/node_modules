/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter } from '@angular/core';
import { ItemDisabledFn, DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { FormatItem } from '../../common/format-item.interface';
/**
 * @hidden
 */
export declare class FormatDropDownListComponent {
    data: FormatItem[];
    value: string;
    defaultItem: FormatItem;
    itemDisabled: ItemDisabledFn;
    title: string;
    disabled: boolean;
    tabindex: number;
    valueChange: EventEmitter<string>;
    element: ElementRef;
    dropDownList: DropDownListComponent;
    onValueChange(tag: string): void;
    focus(): void;
}
