/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Schema } from '@progress/kendo-editor-common';
/**
 * @hidden
 */
export declare type EditorMarks = 'link' | 'em' | 'strong' | 'code' | 'underline' | 'strikethrough' | 'subscript' | 'superscript' | 'style';
/**
 * @hidden
 */
export declare type EditorNodes = 'doc' | 'paragraph' | 'blockquote' | 'horizontalRule' | 'heading' | 'codeBlock' | 'text' | 'image' | 'hardBreak' | 'listItem' | 'orderedList' | 'bulletList' | 'htmlBlock' | 'table' | 'table_row' | 'table_cell' | 'table_header';
/**
 * @hidden
 */
export declare const schema: Schema<string, string>;
