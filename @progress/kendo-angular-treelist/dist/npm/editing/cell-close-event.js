/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("../common/preventable-event");
/**
 * Arguments for the `cellClose` event.
 */
var CellCloseEvent = /** @class */ (function (_super) {
    tslib_1.__extends(CellCloseEvent, _super);
    function CellCloseEvent(options) {
        var _this = _super.call(this) || this;
        /**
         * @hidden
         */
        _this.action = 'cellClose';
        Object.assign(_this, options);
        return _this;
    }
    return CellCloseEvent;
}(preventable_event_1.PreventableEvent));
exports.CellCloseEvent = CellCloseEvent;
