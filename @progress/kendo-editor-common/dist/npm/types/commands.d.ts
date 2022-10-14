/**
 * The list of the command names.
 */
export declare type CommandName = 'undo' | 'redo' | 'bold' | 'italic' | 'underline' | 'strikethrough' | 'subscript' | 'superscript' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify' | 'alignRemove' | 'link' | 'unlink' | 'insertFile' | 'insertImage' | 'insertText' | 'orderedList' | 'unorderedList' | 'indent' | 'outdent' | 'insertTable' | 'addRowBefore' | 'addRowAfter' | 'addColumnBefore' | 'addColumnAfter' | 'deleteRow' | 'deleteColumn' | 'deleteTable' | 'mergeCells' | 'splitCell' | 'formatBlock' | 'fontName' | 'fontSize' | 'foreColor' | 'backColor' | 'setHTML' | 'cleanFormat';
/**
 * The inline-formatting options.
 */
export interface InlineFormatOptions {
    /**
     * The mark which will be applied or stripped.
     */
    mark: string;
    /**
     * The additional marks which will be stripped.
     */
    altMarks?: Array<string>;
    /**
     * An object which holds the style that will be stripped by the tool.
     */
    altStyle?: {
        /**
         * The name of the style.
         */
        name: string;
        /**
         * The regular expression which will be matched with the value of the style.
         */
        value: RegExp;
    };
}
/**
 * The object of the Bold command.
 */
export declare const bold: InlineFormatOptions;
/**
 * The object of the Italic command.
 */
export declare const italic: InlineFormatOptions;
/**
 * The object of the Underline command.
 */
export declare const underline: InlineFormatOptions;
/**
 * The object of the Strikethrough command.
 */
export declare const strikethrough: InlineFormatOptions;
/**
 * The object of the Subscript command.
 */
export declare const subscript: InlineFormatOptions;
/**
 * The object of the Superscript command.
 */
export declare const superscript: InlineFormatOptions;
/**
 * The settings of the Link tool or dialog.
 */
export interface LinkOptions {
    mark: string;
}
/**
 * The object of the Link tool settings.
 */
export declare const link: LinkOptions;
/**
 * The settings of the Unlink tool.
 */
export interface UnlinkOptions {
    mark: string;
}
/**
 * The object of the Unlink tool settings.
 */
export declare const unlink: UnlinkOptions;
