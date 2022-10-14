import { blockNodes, addStyles, changeBlockNode } from './blockNode';
/**
 * @hidden
 * Aligning block elements in the selection.
 *
 * @returns {boolean} - Returns true if any alignment is applied.
 */
export var alignBlocks = function (actions, commandName) { return function (state, dispatch) {
    var blocks = blockNodes(state);
    var tr = state.tr;
    tr.setMeta('commandName', commandName);
    var result = false;
    blocks.forEach(function (node) {
        if (node.type.isTextblock) {
            var newAttrs = {};
            var action = actions.find(function (n) { return n.node === node.type.name; });
            if (action) {
                newAttrs = addStyles(node, action.style);
            }
            result = changeBlockNode(state, dispatch, tr, node, node.type, newAttrs) || result;
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
export var isAligned = function (state, actions) {
    var blocks = blockNodes(state);
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
