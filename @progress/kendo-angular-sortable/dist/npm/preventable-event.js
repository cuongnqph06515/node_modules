"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an event whose default action can be prevented
 * by calling the `preventDefault` method.
 *
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event was prevented
     * by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());
exports.PreventableEvent = PreventableEvent;
