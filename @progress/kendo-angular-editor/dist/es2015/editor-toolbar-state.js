/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { alignRightRules, alignCenterRules, alignLeftRules, alignJustifyRules, isAligned, bold, italic, underline, strikethrough, subscript, superscript, link, activeNode, hasNode, getActiveMarks, hasMark, indentRules, outdentRules, canIndentAsListItem, canOutdentAsListItem, canBeIndented, undo, redo, addRowBefore, addRowAfter, addColumnBefore, addColumnAfter, deleteRow, deleteColumn, deleteTable, mergeCells, splitCell } from '@progress/kendo-editor-common';
import { schema } from './config/schema';
/**
 * @hidden
 */
export const getToolbarState = (state) => ({
    alignCenter: {
        selected: isAligned(state, alignCenterRules),
        disabled: false
    },
    alignJustify: {
        selected: isAligned(state, alignJustifyRules),
        disabled: false
    },
    alignLeft: {
        selected: isAligned(state, alignLeftRules),
        disabled: false
    },
    alignRight: {
        selected: isAligned(state, alignRightRules),
        disabled: false
    },
    bold: {
        selected: hasMark(state, bold),
        disabled: false
    },
    cleanFormatting: {
        selected: false,
        disabled: state.selection.empty
    },
    format: {
        selected: activeNode(state),
        disabled: false
    },
    indent: {
        selected: false,
        disabled: !(canIndentAsListItem(state, schema.nodes.list_item) || canBeIndented(state, indentRules))
    },
    insertOrderedList: {
        selected: hasNode(state, schema.nodes.ordered_list),
        disabled: false
    },
    insertUnorderedList: {
        selected: hasNode(state, schema.nodes.bullet_list),
        disabled: false
    },
    italic: {
        selected: hasMark(state, italic),
        disabled: false
    },
    unlink: {
        selected: false,
        disabled: !hasMark(state, link)
    },
    outdent: {
        selected: false,
        disabled: !(canOutdentAsListItem(state, outdentRules) || canBeIndented(state, outdentRules))
    },
    redo: {
        selected: false,
        disabled: !redo(state)
    },
    strikethrough: {
        selected: hasMark(state, strikethrough),
        disabled: false
    },
    style: {
        selected: getActiveMarks(state, schema.marks.style),
        disabled: false
    },
    subscript: {
        selected: hasMark(state, subscript),
        disabled: false
    },
    superscript: {
        selected: hasMark(state, superscript),
        disabled: false
    },
    underline: {
        selected: hasMark(state, underline),
        disabled: false
    },
    undo: {
        selected: false,
        disabled: !undo(state)
    },
    //dialogs
    createLink: {
        selected: false,
        disabled: state.selection.empty
    },
    insertFile: {
        selected: false,
        disabled: state.selection.empty
    },
    insertImage: {
        selected: false,
        disabled: false
    },
    viewSource: {
        selected: false,
        disabled: false
    },
    insertTable: {
        selected: false,
        disabled: false
    },
    addColumnBefore: {
        selected: false,
        disabled: !addColumnBefore(state)
    },
    addColumnAfter: {
        selected: false,
        disabled: !addColumnAfter(state)
    },
    addRowBefore: {
        selected: false,
        disabled: !addRowBefore(state)
    },
    addRowAfter: {
        selected: false,
        disabled: !addRowAfter(state)
    },
    deleteRow: {
        selected: false,
        disabled: !deleteRow(state)
    },
    deleteColumn: {
        selected: false,
        disabled: !deleteColumn(state)
    },
    mergeCells: {
        selected: false,
        disabled: !mergeCells(state)
    },
    splitCell: {
        selected: false,
        disabled: !splitCell(state)
    },
    deleteTable: {
        selected: false,
        disabled: !deleteTable(state)
    }
});
/**
 * @hidden
 */
export const initialToolBarState = {
    //alignment
    alignCenter: { selected: false, disabled: false },
    alignJustify: { selected: false, disabled: false },
    alignLeft: { selected: false, disabled: false },
    alignRight: { selected: false, disabled: false },
    //marks
    bold: { selected: false, disabled: false },
    italic: { selected: false, disabled: false },
    underline: { selected: false, disabled: false },
    strikethrough: { selected: false, disabled: false },
    subscript: { selected: false, disabled: false },
    superscript: { selected: false, disabled: false },
    //tools
    format: { selected: { text: 'Format', tag: null }, disabled: false },
    style: { selected: { marks: [], hasNodesWithoutMarks: false }, disabled: false },
    cleanFormatting: { selected: false, disabled: true },
    //indent
    indent: { selected: false, disabled: false },
    outdent: { selected: false, disabled: false },
    //lists
    insertOrderedList: { selected: false, disabled: false },
    insertUnorderedList: { selected: false, disabled: false },
    //links
    unlink: { selected: false, disabled: true },
    //history
    redo: { selected: false, disabled: true },
    undo: { selected: false, disabled: true },
    //dialogs
    createLink: { selected: false, disabled: true },
    insertFile: { selected: false, disabled: true },
    insertImage: { selected: false, disabled: false },
    viewSource: { selected: false, disabled: false },
    //table
    insertTable: { selected: false, disabled: false },
    addColumnBefore: { selected: false, disabled: true },
    addColumnAfter: { selected: false, disabled: true },
    addRowBefore: { selected: false, disabled: true },
    addRowAfter: { selected: false, disabled: true },
    deleteRow: { selected: false, disabled: true },
    deleteColumn: { selected: false, disabled: true },
    mergeCells: { selected: false, disabled: true },
    splitCell: { selected: false, disabled: true },
    deleteTable: { selected: false, disabled: true }
};
/**
 * @hidden
 */
export const disabledToolBarState = {
    //alignment
    alignCenter: { selected: false, disabled: true },
    alignJustify: { selected: false, disabled: true },
    alignLeft: { selected: false, disabled: true },
    alignRight: { selected: false, disabled: true },
    //marks
    bold: { selected: false, disabled: true },
    italic: { selected: false, disabled: true },
    underline: { selected: false, disabled: true },
    strikethrough: { selected: false, disabled: true },
    subscript: { selected: false, disabled: true },
    superscript: { selected: false, disabled: true },
    //tools
    format: { selected: { text: 'Format', tag: null }, disabled: true },
    style: { selected: { marks: [], hasNodesWithoutMarks: false }, disabled: true },
    cleanFormatting: { selected: false, disabled: true },
    //indent
    indent: { selected: false, disabled: true },
    outdent: { selected: false, disabled: true },
    //lists
    insertOrderedList: { selected: false, disabled: true },
    insertUnorderedList: { selected: false, disabled: true },
    //links
    unlink: { selected: false, disabled: true },
    //history
    redo: { selected: false, disabled: true },
    undo: { selected: false, disabled: true },
    //dialogs
    createLink: { selected: false, disabled: true },
    insertFile: { selected: false, disabled: true },
    insertImage: { selected: false, disabled: true },
    viewSource: { selected: false, disabled: true },
    //table
    insertTable: { selected: false, disabled: true },
    addColumnBefore: { selected: false, disabled: true },
    addColumnAfter: { selected: false, disabled: true },
    addRowBefore: { selected: false, disabled: true },
    addRowAfter: { selected: false, disabled: true },
    deleteRow: { selected: false, disabled: true },
    deleteColumn: { selected: false, disabled: true },
    mergeCells: { selected: false, disabled: true },
    splitCell: { selected: false, disabled: true },
    deleteTable: { selected: false, disabled: true }
};
