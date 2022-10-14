/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { schema } from './schema';
import { alignBlocks, alignLeftRules, alignCenterRules, alignRightRules, alignJustifyRules, alignRemoveRules, createTable, indent, outdent, setHtml, getHtml, insertImage, insertText, insertNode, applyLink, removeLink, 
//marks
bold, italic, underline, strikethrough, subscript, superscript, link, toggleInlineFormat, applyInlineStyle, removeAllMarks, formatBlockElements, toggleOrderedList, toggleUnorderedList, isAligned, undo, redo, addRowBefore, addRowAfter, addColumnBefore, addColumnAfter, deleteRow, deleteColumn, deleteTable, mergeCells, splitCell } from '@progress/kendo-editor-common';
var alignRemove = function (state, dispatch) { return alignBlocks(alignRemoveRules)(state, dispatch); };
var ɵ0 = alignRemove;
var ɵ1 = function () { return toggleInlineFormat(bold); }, ɵ2 = function () { return removeAllMarks({ except: schema.marks.link }); }, ɵ3 = function (attrs) { return applyLink({ mark: 'link', attrs: attrs }); }, ɵ4 = function (font) { return applyInlineStyle({ style: 'font-family', value: font }); }, ɵ5 = function (size) { return applyInlineStyle({ style: 'font-size', value: size + "px" }); }, ɵ6 = function (attrs) { return applyLink({ mark: 'link', attrs: attrs }); }, ɵ7 = function (text) { return insertText(text); }, ɵ8 = function () { return toggleInlineFormat(italic); }, ɵ9 = function () { return toggleInlineFormat(strikethrough); }, ɵ10 = function () { return toggleInlineFormat(subscript); }, ɵ11 = function () { return toggleInlineFormat(superscript); }, ɵ12 = function () { return toggleInlineFormat(underline); }, ɵ13 = function () { return removeLink(link); }, ɵ14 = function (color) { return applyInlineStyle({ style: 'color', value: color }); }, ɵ15 = function (color) { return applyInlineStyle({ style: 'background-color', value: color }); };
var inlineCommand = {
    bold: ɵ1,
    cleanFormatting: ɵ2,
    createLink: ɵ3,
    fontFamily: ɵ4,
    fontSize: ɵ5,
    insertFile: ɵ6,
    insertText: ɵ7,
    italic: ɵ8,
    strikethrough: ɵ9,
    subscript: ɵ10,
    superscript: ɵ11,
    underline: ɵ12,
    unlink: ɵ13,
    foreColor: ɵ14,
    backColor: ɵ15
};
var ɵ16 = function () { return function (state, dispatch) { return isAligned(state, alignCenterRules) ? alignRemove(state, dispatch) : alignBlocks(alignCenterRules)(state, dispatch); }; }, ɵ17 = function () { return function (state, dispatch) { return isAligned(state, alignJustifyRules) ? alignRemove(state, dispatch) : alignBlocks(alignJustifyRules)(state, dispatch); }; }, ɵ18 = function () { return function (state, dispatch) { return isAligned(state, alignLeftRules) ? alignRemove(state, dispatch) : alignBlocks(alignLeftRules)(state, dispatch); }; }, ɵ19 = function () { return function (state, dispatch) { return isAligned(state, alignRightRules) ? alignRemove(state, dispatch) : alignBlocks(alignRightRules)(state, dispatch); }; }, ɵ20 = function (formatAttr) { return formatBlockElements(formatAttr.tag); }, ɵ21 = function () { return getHtml; }, ɵ22 = function () { return indent; }, ɵ23 = function (attrs) { return insertImage(attrs); }, ɵ24 = function () { return toggleOrderedList; }, ɵ25 = function () { return toggleUnorderedList; }, ɵ26 = function () { return outdent; }, ɵ27 = function () { return redo; }, ɵ28 = function (content) { return setHtml(content); }, ɵ29 = function () { return undo; };
var blockCommand = {
    alignCenter: ɵ16,
    alignJustify: ɵ17,
    alignLeft: ɵ18,
    alignRight: ɵ19,
    format: ɵ20,
    getHTML: ɵ21,
    indent: ɵ22,
    insertImage: ɵ23,
    // think about changing the command name.
    insertOrderedList: ɵ24,
    // think about changing the command name.
    insertUnorderedList: ɵ25,
    outdent: ɵ26,
    redo: ɵ27,
    setHTML: ɵ28,
    undo: ɵ29
};
/**
 * @hidden
 * exported for tests
 */
export var insertTable = function (attrs) { return function (state, dispatch) {
    var newTable = createTable(state.schema.nodes, attrs.rows, attrs.cols);
    if (newTable) {
        insertNode(newTable, true)(state, dispatch);
    }
}; };
var ɵ30 = function (attr) { return insertTable(attr); }, ɵ31 = function () { return addColumnBefore; }, ɵ32 = function () { return addColumnAfter; }, ɵ33 = function () { return addRowBefore; }, ɵ34 = function () { return addRowAfter; }, ɵ35 = function () { return deleteRow; }, ɵ36 = function () { return deleteColumn; }, ɵ37 = function () { return mergeCells; }, ɵ38 = function () { return splitCell; }, ɵ39 = function () { return deleteTable; };
var tableCommand = {
    insertTable: ɵ30,
    addColumnBefore: ɵ31,
    addColumnAfter: ɵ32,
    addRowBefore: ɵ33,
    addRowAfter: ɵ34,
    deleteRow: ɵ35,
    deleteColumn: ɵ36,
    mergeCells: ɵ37,
    splitCell: ɵ38,
    deleteTable: ɵ39
};
/**
 * @hidden
 */
export var editorCommands = Object.assign({}, inlineCommand, blockCommand, tableCommand);
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18, ɵ19, ɵ20, ɵ21, ɵ22, ɵ23, ɵ24, ɵ25, ɵ26, ɵ27, ɵ28, ɵ29, ɵ30, ɵ31, ɵ32, ɵ33, ɵ34, ɵ35, ɵ36, ɵ37, ɵ38, ɵ39 };
