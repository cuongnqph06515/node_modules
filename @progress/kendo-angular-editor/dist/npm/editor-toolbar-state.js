/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_editor_common_1 = require("@progress/kendo-editor-common");
var schema_1 = require("./config/schema");
/**
 * @hidden
 */
exports.getToolbarState = function (state) { return ({
    alignCenter: {
        selected: kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignCenterRules),
        disabled: false
    },
    alignJustify: {
        selected: kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignJustifyRules),
        disabled: false
    },
    alignLeft: {
        selected: kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignLeftRules),
        disabled: false
    },
    alignRight: {
        selected: kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignRightRules),
        disabled: false
    },
    bold: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.bold),
        disabled: false
    },
    cleanFormatting: {
        selected: false,
        disabled: state.selection.empty
    },
    format: {
        selected: kendo_editor_common_1.activeNode(state),
        disabled: false
    },
    indent: {
        selected: false,
        disabled: !(kendo_editor_common_1.canIndentAsListItem(state, schema_1.schema.nodes.list_item) || kendo_editor_common_1.canBeIndented(state, kendo_editor_common_1.indentRules))
    },
    insertOrderedList: {
        selected: kendo_editor_common_1.hasNode(state, schema_1.schema.nodes.ordered_list),
        disabled: false
    },
    insertUnorderedList: {
        selected: kendo_editor_common_1.hasNode(state, schema_1.schema.nodes.bullet_list),
        disabled: false
    },
    italic: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.italic),
        disabled: false
    },
    unlink: {
        selected: false,
        disabled: !kendo_editor_common_1.hasMark(state, kendo_editor_common_1.link)
    },
    outdent: {
        selected: false,
        disabled: !(kendo_editor_common_1.canOutdentAsListItem(state, kendo_editor_common_1.outdentRules) || kendo_editor_common_1.canBeIndented(state, kendo_editor_common_1.outdentRules))
    },
    redo: {
        selected: false,
        disabled: !kendo_editor_common_1.redo(state)
    },
    strikethrough: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.strikethrough),
        disabled: false
    },
    style: {
        selected: kendo_editor_common_1.getActiveMarks(state, schema_1.schema.marks.style),
        disabled: false
    },
    subscript: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.subscript),
        disabled: false
    },
    superscript: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.superscript),
        disabled: false
    },
    underline: {
        selected: kendo_editor_common_1.hasMark(state, kendo_editor_common_1.underline),
        disabled: false
    },
    undo: {
        selected: false,
        disabled: !kendo_editor_common_1.undo(state)
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
        disabled: !kendo_editor_common_1.addColumnBefore(state)
    },
    addColumnAfter: {
        selected: false,
        disabled: !kendo_editor_common_1.addColumnAfter(state)
    },
    addRowBefore: {
        selected: false,
        disabled: !kendo_editor_common_1.addRowBefore(state)
    },
    addRowAfter: {
        selected: false,
        disabled: !kendo_editor_common_1.addRowAfter(state)
    },
    deleteRow: {
        selected: false,
        disabled: !kendo_editor_common_1.deleteRow(state)
    },
    deleteColumn: {
        selected: false,
        disabled: !kendo_editor_common_1.deleteColumn(state)
    },
    mergeCells: {
        selected: false,
        disabled: !kendo_editor_common_1.mergeCells(state)
    },
    splitCell: {
        selected: false,
        disabled: !kendo_editor_common_1.splitCell(state)
    },
    deleteTable: {
        selected: false,
        disabled: !kendo_editor_common_1.deleteTable(state)
    }
}); };
/**
 * @hidden
 */
exports.initialToolBarState = {
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
exports.disabledToolBarState = {
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
