/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ListModule } from '../listbutton/list.module';
import { ButtonModule } from '../button/button.module';
import { DropDownButtonComponent } from './dropdownbutton.component';
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownButtonComponent`&mdash;The DropDownButtonComponent component class.
 */
export class DropDownButtonModule {
}
DropDownButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DropDownButtonComponent],
                exports: [DropDownButtonComponent, ListModule],
                imports: [CommonModule, PopupModule, ListModule, ButtonModule]
            },] },
];
