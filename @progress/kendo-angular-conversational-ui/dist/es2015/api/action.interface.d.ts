/**
 * The button type of the quick action ([see example]({% slug suggested_actions_chat %})).
 * * `openUrl`&mdash;Opens a new browser window with the specified URL.
 * * `reply`&mdash;Sends the action value as a reply in the Chat.
 * * `call`&mdash;Treats a value as a phone number. Similar to clicking a [telephone link](https://css-tricks.com/the-current-state-of-telephone-links/).
 * * other&mdash;Handled by user code in the [`ExecuteActionEvent`]({% slug api_conversational-ui_executeactionevent %}).
 */
export declare type ActionType = 'openUrl' | 'reply' | 'call' | string;
/**
 * Defines a quick action for a message.
 * The value is interpreted according to the specified action type.
 */
export interface Action {
    /**
     * A predefined or custom (string) type for the action.
     */
    type: ActionType;
    /**
     * The value which is associated with the action.
     */
    value: any;
    /**
     * An optional title for the quick action.
     * If omitted, the Chat displays the value instead.
     */
    title?: string;
}
