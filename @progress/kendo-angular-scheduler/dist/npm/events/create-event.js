"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for the `create` event.
 */
var CreateEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CreateEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return CreateEvent;
}());
exports.CreateEvent = CreateEvent;
