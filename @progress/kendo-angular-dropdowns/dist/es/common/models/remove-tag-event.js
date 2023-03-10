/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `removeTag` event. The `removeTag` event fires when a tag is about
 * to the removed. If you cancel the event, the removal is prevented.
 */
var RemoveTagEvent = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveTagEvent, _super);
    /**
     * Constructs the event arguments for the `remove` event.
     * @param dataItem - The data item or an array of data items that will be removed.
     */
    function RemoveTagEvent(dataItem) {
        var _this = _super.call(this) || this;
        _this.dataItem = dataItem;
        return _this;
    }
    return RemoveTagEvent;
}(PreventableEvent));
export { RemoveTagEvent };
