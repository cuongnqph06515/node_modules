/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
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
}(preventable_event_1.PreventableEvent));
exports.RemoveTagEvent = RemoveTagEvent;
