/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
var ColumnGroupComponent_1;
import { Component, forwardRef, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
let ColumnGroupComponent = ColumnGroupComponent_1 = class ColumnGroupComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
};
ColumnGroupComponent = ColumnGroupComponent_1 = tslib_1.__decorate([
    Component({
        providers: [
            {
                provide: ColumnBase,
                useExisting: forwardRef(() => ColumnGroupComponent_1) // tslint:disable-line:no-forward-ref
            }
        ],
        selector: 'kendo-excelexport-column-group',
        template: ``
    }),
    tslib_1.__param(0, SkipSelf()), tslib_1.__param(0, Host()), tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [ColumnBase])
], ColumnGroupComponent);
export { ColumnGroupComponent };
