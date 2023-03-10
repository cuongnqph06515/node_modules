/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `columnReorder` event.
 */
var ColumnReorderEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnReorderEvent, _super);
    /**
     * @hidden
     */
    function ColumnReorderEvent(_a) {
        var column = _a.column, newIndex = _a.newIndex, oldIndex = _a.oldIndex;
        var _this = _super.call(this) || this;
        _this.column = column;
        _this.newIndex = newIndex;
        _this.oldIndex = oldIndex;
        return _this;
    }
    return ColumnReorderEvent;
}(PreventableEvent));
export { ColumnReorderEvent };
