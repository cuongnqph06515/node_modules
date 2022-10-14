"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var lists_1 = require("../lists");
var mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;
// https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/keymap.js
/**
 * @hidden
 */
exports.buildKeymap = function (schema) {
    var keys = {};
    keys['Mod-z'] = prosemirror_history_1.undo;
    keys['Shift-Mod-z'] = prosemirror_history_1.redo;
    // tslint:disable-next-line:no-string-literal
    keys['Backspace'] = prosemirror_commands_1.chainCommands(prosemirror_inputrules_1.undoInputRule, prosemirror_commands_1.deleteSelection, prosemirror_commands_1.joinBackward, prosemirror_commands_1.selectNodeBackward);
    // tslint:disable-next-line:no-string-literal
    keys['Enter'] = prosemirror_commands_1.chainCommands(prosemirror_commands_1.newlineInCode, prosemirror_commands_1.createParagraphNear, prosemirror_commands_1.liftEmptyBlock, prosemirror_commands_1.splitBlockKeepMarks);
    if (!mac) {
        keys['Mod-y'] = prosemirror_history_1.redo;
    }
    if (schema.marks.strong) {
        keys['Mod-b'] = prosemirror_commands_1.toggleMark(schema.marks.strong);
    }
    if (schema.marks.em) {
        keys['Mod-i'] = prosemirror_commands_1.toggleMark(schema.marks.em);
    }
    if (schema.marks.underline) {
        keys['Mod-u'] = prosemirror_commands_1.toggleMark(schema.marks.underline);
    }
    if (schema.nodes.hard_break) {
        var br_1 = schema.nodes.hard_break;
        var cmd = prosemirror_commands_1.chainCommands(prosemirror_commands_1.exitCode, function (state, dispatch) {
            dispatch(state.tr.replaceSelectionWith(br_1.create()).scrollIntoView());
            return true;
        });
        keys['Shift-Enter'] = cmd;
    }
    return keys;
};
/**
 * @hidden
 */
exports.buildListKeymap = function (schema) {
    var keys = {};
    if (schema.nodes.list_item) {
        // tslint:disable-next-line:no-string-literal
        keys['Enter'] = lists_1.splitListItemKeepMarks(schema.nodes.list_item);
    }
    return keys;
};
