/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from '../grid.component';
import { Selection } from "./selection-default";
/**
 * A directive which stores the row selection state of the Grid in memory
 * ([see example]({% slug selection_grid %}#toc-during-data-operations)).
 */
var SelectionDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionDirective, _super);
    function SelectionDirective(grid, cd) {
        var _this = _super.call(this, grid, cd) || this;
        _this.grid = grid;
        return _this;
    }
    /**
     * @hidden
     */
    SelectionDirective.prototype.ngOnInit = function () {
        if (this.grid.selectable === false) {
            this.grid.selectable = true;
        }
        this.grid.selectionDirective = this;
    };
    /**
     * @hidden
     */
    SelectionDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    SelectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectBy]'
                },] },
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: ChangeDetectorRef }
    ]; };
    return SelectionDirective;
}(Selection));
export { SelectionDirective };
