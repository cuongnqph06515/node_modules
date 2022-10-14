/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var kendo_editor_common_1 = require("@progress/kendo-editor-common");
var alignRemove = function (state, dispatch) { return kendo_editor_common_1.alignBlocks(kendo_editor_common_1.alignRemoveRules)(state, dispatch); };
var ɵ0 = alignRemove;
exports.ɵ0 = ɵ0;
var ɵ1 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.bold); }, ɵ2 = function () { return kendo_editor_common_1.removeAllMarks({ except: schema_1.schema.marks.link }); }, ɵ3 = function (attrs) { return kendo_editor_common_1.applyLink({ mark: 'link', attrs: attrs }); }, ɵ4 = function (font) { return kendo_editor_common_1.applyInlineStyle({ style: 'font-family', value: font }); }, ɵ5 = function (size) { return kendo_editor_common_1.applyInlineStyle({ style: 'font-size', value: size + "px" }); }, ɵ6 = function (attrs) { return kendo_editor_common_1.applyLink({ mark: 'link', attrs: attrs }); }, ɵ7 = function (text) { return kendo_editor_common_1.insertText(text); }, ɵ8 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.italic); }, ɵ9 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.strikethrough); }, ɵ10 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.subscript); }, ɵ11 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.superscript); }, ɵ12 = function () { return kendo_editor_common_1.toggleInlineFormat(kendo_editor_common_1.underline); }, ɵ13 = function () { return kendo_editor_common_1.removeLink(kendo_editor_common_1.link); }, ɵ14 = function (color) { return kendo_editor_common_1.applyInlineStyle({ style: 'color', value: color }); }, ɵ15 = function (color) { return kendo_editor_common_1.applyInlineStyle({ style: 'background-color', value: color }); };
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
exports.ɵ3 = ɵ3;
exports.ɵ4 = ɵ4;
exports.ɵ5 = ɵ5;
exports.ɵ6 = ɵ6;
exports.ɵ7 = ɵ7;
exports.ɵ8 = ɵ8;
exports.ɵ9 = ɵ9;
exports.ɵ10 = ɵ10;
exports.ɵ11 = ɵ11;
exports.ɵ12 = ɵ12;
exports.ɵ13 = ɵ13;
exports.ɵ14 = ɵ14;
exports.ɵ15 = ɵ15;
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
var ɵ16 = function () { return function (state, dispatch) { return kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignCenterRules) ? alignRemove(state, dispatch) : kendo_editor_common_1.alignBlocks(kendo_editor_common_1.alignCenterRules)(state, dispatch); }; }, ɵ17 = function () { return function (state, dispatch) { return kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignJustifyRules) ? alignRemove(state, dispatch) : kendo_editor_common_1.alignBlocks(kendo_editor_common_1.alignJustifyRules)(state, dispatch); }; }, ɵ18 = function () { return function (state, dispatch) { return kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignLeftRules) ? alignRemove(state, dispatch) : kendo_editor_common_1.alignBlocks(kendo_editor_common_1.alignLeftRules)(state, dispatch); }; }, ɵ19 = function () { return function (state, dispatch) { return kendo_editor_common_1.isAligned(state, kendo_editor_common_1.alignRightRules) ? alignRemove(state, dispatch) : kendo_editor_common_1.alignBlocks(kendo_editor_common_1.alignRightRules)(state, dispatch); }; }, ɵ20 = function (formatAttr) { return kendo_editor_common_1.formatBlockElements(formatAttr.tag); }, ɵ21 = function () { return kendo_editor_common_1.getHtml; }, ɵ22 = function () { return kendo_editor_common_1.indent; }, ɵ23 = function (attrs) { return kendo_editor_common_1.insertImage(attrs); }, ɵ24 = function () { return kendo_editor_common_1.toggleOrderedList; }, ɵ25 = function () { return kendo_editor_common_1.toggleUnorderedList; }, ɵ26 = function () { return kendo_editor_common_1.outdent; }, ɵ27 = function () { return kendo_editor_common_1.redo; }, ɵ28 = function (content) { return kendo_editor_common_1.setHtml(content); }, ɵ29 = function () { return kendo_editor_common_1.undo; };
exports.ɵ16 = ɵ16;
exports.ɵ17 = ɵ17;
exports.ɵ18 = ɵ18;
exports.ɵ19 = ɵ19;
exports.ɵ20 = ɵ20;
exports.ɵ21 = ɵ21;
exports.ɵ22 = ɵ22;
exports.ɵ23 = ɵ23;
exports.ɵ24 = ɵ24;
exports.ɵ25 = ɵ25;
exports.ɵ26 = ɵ26;
exports.ɵ27 = ɵ27;
exports.ɵ28 = ɵ28;
exports.ɵ29 = ɵ29;
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
exports.insertTable = function (attrs) { return function (state, dispatch) {
    var newTable = kendo_editor_common_1.createTable(state.schema.nodes, attrs.rows, attrs.cols);
    if (newTable) {
        kendo_editor_common_1.insertNode(newTable, true)(state, dispatch);
    }
}; };
var ɵ30 = function (attr) { return exports.insertTable(attr); }, ɵ31 = function () { return kendo_editor_common_1.addColumnBefore; }, ɵ32 = function () { return kendo_editor_common_1.addColumnAfter; }, ɵ33 = function () { return kendo_editor_common_1.addRowBefore; }, ɵ34 = function () { return kendo_editor_common_1.addRowAfter; }, ɵ35 = function () { return kendo_editor_common_1.deleteRow; }, ɵ36 = function () { return kendo_editor_common_1.deleteColumn; }, ɵ37 = function () { return kendo_editor_common_1.mergeCells; }, ɵ38 = function () { return kendo_editor_common_1.splitCell; }, ɵ39 = function () { return kendo_editor_common_1.deleteTable; };
exports.ɵ30 = ɵ30;
exports.ɵ31 = ɵ31;
exports.ɵ32 = ɵ32;
exports.ɵ33 = ɵ33;
exports.ɵ34 = ɵ34;
exports.ɵ35 = ɵ35;
exports.ɵ36 = ɵ36;
exports.ɵ37 = ɵ37;
exports.ɵ38 = ɵ38;
exports.ɵ39 = ɵ39;
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
exports.editorCommands = Object.assign({}, inlineCommand, blockCommand, tableCommand);
