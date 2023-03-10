/**
 * Represents a message attachment ([see example]({% slug attachments_chat %})).
 *
 */
export interface Attachment {
    /**
     * The content type identifier for the attachment.
     * Typically a MIME type. Can also be any string.
     */
    contentType: string;
    /**
     * The content of the attachment.
     */
    content: any;
    /**
     * (Optional) The title of the attachment.
     */
    title?: string;
    /**
     * (Optional) The subtitle of the attachment.
     */
    subtitle?: string;
}
/**
 * Specifies the layout for the message attachments ([see examples]({% slug attachments_chat %}#toc-display-modes)).
 *
 * The supported values are:
 * * `"list"`&mdash;A vertical list.
 * * `"carousel"`&mdash;A horizontal, scrollable list. Also called a card deck.
 */
export declare type AttachmentLayout = 'list' | 'carousel';
