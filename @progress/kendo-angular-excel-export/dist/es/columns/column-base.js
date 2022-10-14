/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Input, ContentChildren, QueryList } from '@angular/core';
/**
 * @hidden
 */
var ColumnBase = /** @class */ (function () {
    function ColumnBase(parent) {
        this.parent = parent;
    }
    Object.defineProperty(ColumnBase.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ColumnBase.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], ColumnBase.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ColumnBase.prototype, "locked", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ColumnBase.prototype, "hidden", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ColumnBase.prototype, "headerCellOptions", void 0);
    tslib_1.__decorate([
        ContentChildren(ColumnBase),
        tslib_1.__metadata("design:type", QueryList)
    ], ColumnBase.prototype, "children", void 0);
    return ColumnBase;
}());
export { ColumnBase };
