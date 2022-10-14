/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { schema } from './schema';
import { alignBlocks, alignLeftRules, alignCenterRules, alignRightRules, alignJustifyRules, alignRemoveRules, createTable, indent, outdent, setHtml, getHtml, insertImage, insertText, insertNode, applyLink, removeLink, 
//marks
bold, italic, underline, strikethrough, subscript, superscript, link, toggleInlineFormat, applyInlineStyle, removeAllMarks, formatBlockElements, toggleOrderedList, toggleUnorderedList, isAligned, undo, redo, addRowBefore, addRowAfter, addColumnBefore, addColumnAfter, deleteRow, deleteColumn, deleteTable, mergeCells, splitCell } from '@progress/kendo-editor-common';
const alignRemove = (state, dispatch) => alignBlocks(alignRemoveRules)(state, dispatch);
const ɵ0 = alignRemove;
const ɵ1 = () => toggleInlineFormat(bold), ɵ2 = () => removeAllMarks({ except: schema.marks.link }), ɵ3 = attrs => applyLink({ mark: 'link', attrs: attrs }), ɵ4 = font => applyInlineStyle({ style: 'font-family', value: font }), ɵ5 = size => applyInlineStyle({ style: 'font-size', value: size + "px" }), ɵ6 = attrs => applyLink({ mark: 'link', attrs: attrs }), ɵ7 = text => insertText(text), ɵ8 = () => toggleInlineFormat(italic), ɵ9 = () => toggleInlineFormat(strikethrough), ɵ10 = () => toggleInlineFormat(subscript), ɵ11 = () => toggleInlineFormat(superscript), ɵ12 = () => toggleInlineFormat(underline), ɵ13 = () => removeLink(link), ɵ14 = (color) => applyInlineStyle({ style: 'color', value: color }), ɵ15 = (color) => applyInlineStyle({ style: 'background-color', value: color });
const inlineCommand = {
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
const ɵ16 = () => (state, dispatch) => isAligned(state, alignCenterRules) ? alignRemove(state, dispatch) : alignBlocks(alignCenterRules)(state, dispatch), ɵ17 = () => (state, dispatch) => isAligned(state, alignJustifyRules) ? alignRemove(state, dispatch) : alignBlocks(alignJustifyRules)(state, dispatch), ɵ18 = () => (state, dispatch) => isAligned(state, alignLeftRules) ? alignRemove(state, dispatch) : alignBlocks(alignLeftRules)(state, dispatch), ɵ19 = () => (state, dispatch) => isAligned(state, alignRightRules) ? alignRemove(state, dispatch) : alignBlocks(alignRightRules)(state, dispatch), ɵ20 = formatAttr => formatBlockElements(formatAttr.tag), ɵ21 = () => getHtml, ɵ22 = () => indent, ɵ23 = attrs => insertImage(attrs), ɵ24 = () => toggleOrderedList, ɵ25 = () => toggleUnorderedList, ɵ26 = () => outdent, ɵ27 = () => redo, ɵ28 = content => setHtml(content), ɵ29 = () => undo;
const blockCommand = {
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
export const insertTable = (attrs) => (state, dispatch) => {
    const newTable = createTable(state.schema.nodes, attrs.rows, attrs.cols);
    if (newTable) {
        insertNode(newTable, true)(state, dispatch);
    }
};
const ɵ30 = attr => insertTable(attr), ɵ31 = () => addColumnBefore, ɵ32 = () => addColumnAfter, ɵ33 = () => addRowBefore, ɵ34 = () => addRowAfter, ɵ35 = () => deleteRow, ɵ36 = () => deleteColumn, ɵ37 = () => mergeCells, ɵ38 = () => splitCell, ɵ39 = () => deleteTable;
const tableCommand = {
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
export const editorCommands = Object.assign({}, inlineCommand, blockCommand, tableCommand);
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18, ɵ19, ɵ20, ɵ21, ɵ22, ɵ23, ɵ24, ɵ25, ɵ26, ɵ27, ɵ28, ɵ29, ɵ30, ɵ31, ɵ32, ɵ33, ɵ34, ɵ35, ɵ36, ɵ37, ɵ38, ɵ39 };
