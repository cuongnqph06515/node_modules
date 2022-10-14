/**
 * Arguments for the `create` event.
 */
export class CreateEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}
