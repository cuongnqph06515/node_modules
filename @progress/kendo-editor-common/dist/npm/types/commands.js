"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The object of the Bold command.
 */
exports.bold = {
    mark: 'strong',
    altMarks: ['b'],
    altStyle: { name: 'font-weight', value: /^(bold(er)?|[5-9]\d{2,})$/ }
};
/**
 * The object of the Italic command.
 */
exports.italic = {
    mark: 'em',
    altMarks: ['i'],
    altStyle: { name: 'font-style', value: /^italic$/i }
};
/**
 * The object of the Underline command.
 */
exports.underline = {
    mark: 'u',
    altStyle: { name: 'text-decoration', value: /^underline$/i }
};
/**
 * The object of the Strikethrough command.
 */
exports.strikethrough = {
    mark: 'del',
    altStyle: { name: 'text-decoration', value: /^line-through$/i }
};
/**
 * The object of the Subscript command.
 */
exports.subscript = {
    mark: 'sub'
};
/**
 * The object of the Superscript command.
 */
exports.superscript = {
    mark: 'sup'
};
/**
 * The object of the Link tool settings.
 */
exports.link = {
    mark: 'link'
};
/**
 * The object of the Unlink tool settings.
 */
exports.unlink = {
    mark: 'link'
};
// /**
//  * The settings of the Style tool which is presented by a DropDownList component.
//  */
// export interface StyleDropDownListSettings {
//     /**
//      * The name of the style which will be added or removed by the Style tool.
//      */
//     style: string;
//     /**
//      * The default item of the Style tool.
//      */
//     defaultItem: { text: string, value: string, localizationKey?: string };
//     /**
//      * The data items of the Style tool.
//      */
//     items: Array<{ text: string, value: string }>;
//     /**
//      * The name of the command that is used by the Style tool.
//      */
//     commandName?: Command;
// }
// /**
//  * The settings of the FormatBlock tool which is presented by a DropDownList.
//  */
// export interface FormatBlockDropDownListSettings {
//     /**
//      * The default item of the FormatBlock tool.
//      */
//     defaultItem: { text: string, value: string, localizationKey?: string };
//     /**
//      * The data items of the FormatBlock tool.
//      */
//     items: Array<{ text: string, value: string }>;
//     /**
//      * The name of the command that is used by the FormatBlock tool.
//      */
//     commandName?: Command;
// }
// /**
//  * The settings of the InsertImage tool or dialog.
//  */
// export interface ImageSettings extends ToolSettings {
//     node: string;
// }
// /**
//  * The settings of the ViewHtml tool or dialog.
//  */
// export interface ViewHtmlSettings extends ToolSettings { }
// /**
//  * @hidden
//  */
// const buttonCommonProps: ButtonProps = {
//     type: 'button'
// };
// /**
//  * The object of the InsertImage tool settings.
//  */
// export const image: ImageSettings = {
//     node: 'image'
// };
// /**
//  * The object of the FontSize tool settings.
//  */
// export const fontSize: StyleDropDownListSettings = {
//     style: 'font-size'
// };
// /**
//  * The object of the FontName tool settings.
//  */
// export const fontName: StyleDropDownListSettings = {
//     style: 'font-family'
// };
// /**
//  * @hidden
//  */
// const style = (name: string, value: string) => ({ name, value });
