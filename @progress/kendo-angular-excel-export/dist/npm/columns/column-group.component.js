/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
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
        core_1.Component({
            providers: [
                {
                    provide: column_base_1.ColumnBase,
                    useExisting: core_1.forwardRef(function () { return ColumnGroupComponent_1; }) // tslint:disable-line:no-forward-ref
                }
            ],
            selector: 'kendo-excelexport-column-group',
            template: ""
        }),
        tslib_1.__param(0, core_1.SkipSelf()), tslib_1.__param(0, core_1.Host()), tslib_1.__param(0, core_1.Optional()),
        tslib_1.__metadata("design:paramtypes", [column_base_1.ColumnBase])
    ], ColumnGroupComponent);
    return ColumnGroupComponent;
}(column_base_1.ColumnBase));
exports.ColumnGroupComponent = ColumnGroupComponent;
