import { chainCommands, toggleMark, exitCode, newlineInCode, createParagraphNear, liftEmptyBlock, splitBlockKeepMarks, deleteSelection, joinBackward, selectNodeBackward } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { splitListItemKeepMarks } from '../lists';
const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;
// https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/keymap.js
/**
 * @hidden
 */
export const buildKeymap = (schema) => {
    const keys = {};
    keys['Mod-z'] = undo;
    keys['Shift-Mod-z'] = redo;
    // tslint:disable-next-line:no-string-literal
    keys['Backspace'] = chainCommands(undoInputRule, deleteSelection, joinBackward, selectNodeBackward);
    // tslint:disable-next-line:no-string-literal
    keys['Enter'] = chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlockKeepMarks);
    if (!mac) {
        keys['Mod-y'] = redo;
    }
    if (schema.marks.strong) {
        keys['Mod-b'] = toggleMark(schema.marks.strong);
    }
    if (schema.marks.em) {
        keys['Mod-i'] = toggleMark(schema.marks.em);
    }
    if (schema.marks.underline) {
        keys['Mod-u'] = toggleMark(schema.marks.underline);
    }
    if (schema.nodes.hard_break) {
        const br = schema.nodes.hard_break;
        const cmd = chainCommands(exitCode, (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
            return true;
        });
        keys['Shift-Enter'] = cmd;
    }
    return keys;
};
/**
 * @hidden
 */
export const buildListKeymap = (schema) => {
    const keys = {};
    if (schema.nodes.list_item) {
        // tslint:disable-next-line:no-string-literal
        keys['Enter'] = splitListItemKeepMarks(schema.nodes.list_item);
    }
    return keys;
};
