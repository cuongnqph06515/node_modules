/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorState, Transaction, EditorView } from '@progress/kendo-editor-common';
/**
 * @hidden
 */
export declare type DispatchFn = (tr: Transaction) => void;
/**
 * @hidden
 */
export declare type Command = (state: EditorState, dispatch: DispatchFn, view?: EditorView) => boolean | void;
/**
 * The list of the command names that are accepted by the `exec` method.
 */
export declare type EditorCommand = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'createLink' | 'unlink' | 'insertFile' | 'insertImage' | 'insertOrderedList' | 'insertUnorderedList' | 'insertText' | 'indent' | 'outdent' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify' | 'format' | 'fontFamily' | 'fontSize' | 'cleanFormat' | 'setHTML' | 'undo' | 'redo' | 'subscript' | 'superscript' | 'cleanFormatting' | 'foreColor' | 'backColor' | 'insertTable' | 'addColumnBefore' | 'addColumnAfter' | 'addRowBefore' | 'addRowAfter' | 'deleteRow' | 'deleteColumn' | 'mergeCells' | 'splitCell' | 'deleteTable';
/**
 * The list of the dialog names that are accepted by the `openDialog` method.
 */
export declare type DialogCommand = 'createLink' | 'insertFile' | 'insertImage' | 'viewSource';
