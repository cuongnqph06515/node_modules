/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
var ColumnGroupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    ColumnGroupComponent_1 = ColumnGroupComponent;
    var ColumnGroupComponent_1;
    ColumnGroupComponent = ColumnGroupComponent_1 = tslib_1.__decorate([
        Component({
            providers: [
                {
                    provide: ColumnBase,
                    useExisting: forwardRef(function () { return ColumnGroupComponent_1; }) // tslint:disable-line:no-forward-ref
                }
            ],
            selector: 'kendo-excelexport-column-group',
            template: ""
        }),
        tslib_1.__param(0, SkipSelf()), tslib_1.__param(0, Host()), tslib_1.__param(0, Optional()),
        tslib_1.__metadata("design:paramtypes", [ColumnBase])
    ], ColumnGroupComponent);
    return ColumnGroupComponent;
}(ColumnBase));
export { ColumnGroupComponent };
