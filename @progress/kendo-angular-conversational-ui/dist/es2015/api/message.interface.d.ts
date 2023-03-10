import { Action } from './action.interface';
import { Attachment, AttachmentLayout } from './attachment.interface';
import { User } from './user.interface';
/**
 * Represents a Chat message ([see example]({% slug overview_convui %}#toc-basic-usage)).
 *
 * > * You are required to provide the `author` field.
 * > * [Local users]({% slug api_conversational-ui_chatcomponent %}#toc-user) are displayed to the
 * right in left-to-right languages and to the left in right-to-left languages.
 * > * If `typing` is set to `true`, the Chat displays a typing indicator instead of text.
 */
export interface Message {
    /**
     * The author of the message.
     */
    author: User;
    /**
     * The layout that will be used for displaying message attachments (if any).
     */
    attachmentLayout?: AttachmentLayout;
    /**
     * (Optional) The message attachments.
     */
    attachments?: Attachment[];
    /**
     * The suggested quick actions that will be displayed below this message.
     *
     * > Suggested actions are displayed only for the last message in the conversation.
     */
    suggestedActions?: Action[];
    /**
     * An optional status string for the message.
     * The status is displayed when the message is selected&mdash;either
     * by clicking on it or by using the keyboard navigation shortcuts.
     */
    status?: string;
    /**
     * (Optional) The text for the message.
     * For example, certain messages can contain
     * only attachments or quick actions.
     */
    text?: string;
    /**
     * The time at which the message was composed.
     */
    timestamp?: Date;
    /**
     * A Boolean value which indicates if the message is still being typed by the user.
     * If set to `true`, the Chat displays a typing indicator instead of the actual message.
     */
    typing?: boolean;
}
