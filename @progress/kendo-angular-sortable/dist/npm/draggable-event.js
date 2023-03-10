"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * The arguments for the `DraggableDirective` events.
 * @hidden
 */
var DraggableEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DraggableEvent, _super);
    /**
     * @hidden
     */
    function DraggableEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DraggableEvent;
}(preventable_event_1.PreventableEvent));
exports.DraggableEvent = DraggableEvent;
