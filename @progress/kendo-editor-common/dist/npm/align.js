"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockNode_1 = require("./blockNode");
/**
 * @hidden
 * Aligning block elements in the selection.
 *
 * @returns {boolean} - Returns true if any alignment is applied.
 */
exports.alignBlocks = function (actions, commandName) { return function (state, dispatch) {
    var blocks = blockNode_1.blockNodes(state);
    var tr = state.tr;
    tr.setMeta('commandName', commandName);
    var result = false;
    blocks.forEach(function (node) {
        if (node.type.isTextblock) {
            var newAttrs = {};
            var action = actions.find(function (n) { return n.node === node.type.name; });
            if (action) {
                newAttrs = blockNode_1.addStyles(node, action.style);
            }
            result = blockNode_1.changeBlockNode(state, dispatch, tr, node, node.type, newAttrs) || result;
        }
    });
    if (result) {
        dispatch(tr.scrollIntoView());
    }
    return result;
}; };
/**
 * @hidden
 */
exports.isAligned = function (state, actions) {
    var blocks = blockNode_1.blockNodes(state);
    var result = false;
    blocks.forEach(function (node) {
        if (!result && node.type.isTextblock && node.attrs.style) {
            var action = actions.find(function (a) { return a.node === node.type.name; });
            if (action) {
                result = action.style.every(function (style) {
                    return !!style.value && new RegExp(style.name + ":\\s?" + style.value, 'i').test(node.attrs.style);
                });
            }
        }
    });
    return result;
};
