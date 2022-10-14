import { blockNodes, addStyles, changeBlockNode } from './blockNode';
/**
 * @hidden
 * Aligning block elements in the selection.
 *
 * @returns {boolean} - Returns true if any alignment is applied.
 */
export const alignBlocks = (actions, commandName) => (state, dispatch) => {
    const blocks = blockNodes(state);
    const tr = state.tr;
    tr.setMeta('commandName', commandName);
    let result = false;
    blocks.forEach(node => {
        if (node.type.isTextblock) {
            let newAttrs = {};
            const action = actions.find(n => n.node === node.type.name);
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
};
/**
 * @hidden
 */
export const isAligned = (state, actions) => {
    const blocks = blockNodes(state);
    let result = false;
    blocks.forEach(node => {
        if (!result && node.type.isTextblock && node.attrs.style) {
            const action = actions.find(a => a.node === node.type.name);
            if (action) {
                result = action.style.every(style => {
                    return !!style.value && new RegExp(`${style.name}:\\s?${style.value}`, 'i').test(node.attrs.style);
                });
            }
        }
    });
    return result;
};
