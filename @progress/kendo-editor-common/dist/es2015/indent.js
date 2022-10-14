import { sinkListItem, liftListItem } from 'prosemirror-schema-list';
import { indentRules, outdentRules } from './types/indent-rules';
import { blockNodes, addStyles, changeBlockNode, hasNode } from './blockNode';
import { findNthParentNodeOfType } from './utils';
/**
 * Indenting block elements in the selection.
 *
 * @returns {boolean} - Returns true if any indentation is applied.
 */
export const indentBlocks = (actions, command, dir) => (state, dispatch) => {
    const blocks = blockNodes(state);
    const tr = state.tr;
    let result = false;
    tr.setMeta('commandName', command);
    blocks.forEach(node => {
        if (node.type.isTextblock) {
            let newAttrs;
            const action = actions.find(a => a.node === node.type.name);
            if (action) {
                const style = dir === 'rtl' ? action.rtlStyle : action.style;
                const newStyle = {
                    name: style,
                    value: action.step > 0 ? `${action.step}${action.unit}` : ''
                };
                if (node.attrs.style) {
                    const re = new RegExp(`${style}:\\s?(\\d+)${action.unit}`, 'i');
                    const match = node.attrs.style.match(re);
                    if (match) {
                        let newMargin = parseFloat(match[1]) + action.step;
                        newMargin = newMargin <= 0 ? '' : newMargin;
                        newStyle.value = `${newMargin}${newMargin ? action.unit : ''}`;
                    }
                }
                newAttrs = addStyles(node, [newStyle]);
            }
            if (newAttrs) {
                result = changeBlockNode(state, dispatch, tr, node, node.type, newAttrs) || result;
            }
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
export const isIndented = (state, rules, dir) => {
    const blocks = blockNodes(state);
    let result = false;
    blocks.forEach(node => {
        if (!result && node.type.isTextblock && node.attrs.style) {
            const action = rules.find(a => a.node === node.type.name);
            if (action) {
                const style = dir === 'rtl' ? action.rtlStyle : action.style;
                const reIndent = new RegExp(`${style}:\\s?\\d+${action.unit}`, 'i');
                result = reIndent.test(node.attrs.style);
            }
        }
    });
    return result;
};
/**
 * @hidden
 */
export const canIndentAsListItem = (state, nodeType) => {
    return sinkListItem(nodeType)(state);
};
/**
 * @hidden
 */
export const canOutdentAsListItem = (state, rules) => {
    const listItem = state.schema.nodes[rules.listsTypes.listItem];
    const orderedList = state.schema.nodes[rules.listsTypes.orderedList];
    const bulletList = state.schema.nodes[rules.listsTypes.bulletList];
    const isNestedInOL = !!findNthParentNodeOfType(orderedList, 2)(state.selection);
    const isNestedInUL = !!findNthParentNodeOfType(bulletList, 2)(state.selection);
    return (isNestedInOL || isNestedInUL) && liftListItem(listItem)(state);
};
/**
 * @hidden
 */
export const canBeIndented = (state, rules) => {
    const nodes = state.schema.nodes;
    const listItem = nodes[indentRules.listsTypes.listItem];
    return ((isIndented(state, rules.nodes) || indentRules.nodes.some(rule => nodes[rule.node] && hasNode(state, nodes[rule.node]))) &&
        !hasNode(state, listItem));
};
/**
 * @hidden
 */
export const indent = (state, dispatch) => {
    const listItem = state.schema.nodes[indentRules.listsTypes.listItem];
    const isIndentableBlock = canBeIndented(state, indentRules);
    if (canIndentAsListItem(state, listItem)) {
        sinkListItem(listItem)(state, dispatch);
    }
    else if (isIndentableBlock) {
        indentBlocks(indentRules.nodes)(state, dispatch);
    }
};
/**
 * @hidden
 */
export const outdent = (state, dispatch) => {
    const listItem = state.schema.nodes[outdentRules.listsTypes.listItem];
    const isIndentableBlock = canBeIndented(state, outdentRules);
    if (canOutdentAsListItem(state, outdentRules)) {
        liftListItem(listItem)(state, dispatch);
    }
    else if (isIndentableBlock) {
        indentBlocks(outdentRules.nodes)(state, dispatch);
    }
};
