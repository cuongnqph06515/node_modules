/**
 * Arguments for the `eventKeydown` event.
 */
var EventKeydownEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function EventKeydownEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return EventKeydownEvent;
}());
export { EventKeydownEvent };
