/**
 * Arguments for the `eventKeydown` event.
 */
export class EventKeydownEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}
