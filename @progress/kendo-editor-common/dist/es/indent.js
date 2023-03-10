import { sinkListItem, liftListItem } from 'prosemirror-schema-list';
import { indentRules, outdentRules } from './types/indent-rules';
import { blockNodes, addStyles, changeBlockNode, hasNode } from './blockNode';
import { findNthParentNodeOfType } from './utils';
/**
 * Indenting block elements in the selection.
 *
 * @returns {boolean} - Returns true if any indentation is applied.
 */
export var indentBlocks = function (actions, command, dir) { return function (state, dispatch) {
    var blocks = blockNodes(state);
    var tr = state.tr;
    var result = false;
    tr.setMeta('commandName', command);
    blocks.forEach(function (node) {
        if (node.type.isTextblock) {
            var newAttrs = void 0;
            var action = actions.find(function (a) { return a.node === node.type.name; });
            if (action) {
                var style = dir === 'rtl' ? action.rtlStyle : action.style;
                var newStyle = {
                    name: style,
                    value: action.step > 0 ? "" + action.step + action.unit : ''
                };
                if (node.attrs.style) {
                    var re = new RegExp(style + ":\\s?(\\d+)" + action.unit, 'i');
                    var match = node.attrs.style.match(re);
                    if (match) {
                        var newMargin = parseFloat(match[1]) + action.step;
                        newMargin = newMargin <= 0 ? '' : newMargin;
                        newStyle.value = "" + newMargin + (newMargin ? action.unit : '');
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
}; };
/**
 * @hidden
 */
export var isIndented = function (state, rules, dir) {
    var blocks = blockNodes(state);
    var result = false;
    blocks.forEach(function (node) {
        if (!result && node.type.isTextblock && node.attrs.style) {
            var action = rules.find(function (a) { return a.node === node.type.name; });
            if (action) {
                var style = dir === 'rtl' ? action.rtlStyle : action.style;
                var reIndent = new RegExp(style + ":\\s?\\d+" + action.unit, 'i');
                result = reIndent.test(node.attrs.style);
            }
        }
    });
    return result;
};
/**
 * @hidden
 */
export var canIndentAsListItem = function (state, nodeType) {
    return sinkListItem(nodeType)(state);
};
/**
 * @hidden
 */
export var canOutdentAsListItem = function (state, rules) {
    var listItem = state.schema.nodes[rules.listsTypes.listItem];
    var orderedList = state.schema.nodes[rules.listsTypes.orderedList];
    var bulletList = state.schema.nodes[rules.listsTypes.bulletList];
    var isNestedInOL = !!findNthParentNodeOfType(orderedList, 2)(state.selection);
    var isNestedInUL = !!findNthParentNodeOfType(bulletList, 2)(state.selection);
    return (isNestedInOL || isNestedInUL) && liftListItem(listItem)(state);
};
/**
 * @hidden
 */
export var canBeIndented = function (state, rules) {
    var nodes = state.schema.nodes;
    var listItem = nodes[indentRules.listsTypes.listItem];
    return ((isIndented(state, rules.nodes) || indentRules.nodes.some(function (rule) { return nodes[rule.node] && hasNode(state, nodes[rule.node]); })) &&
        !hasNode(state, listItem));
};
/**
 * @hidden
 */
export var indent = function (state, dispatch) {
    var listItem = state.schema.nodes[indentRules.listsTypes.listItem];
    var isIndentableBlock = canBeIndented(state, indentRules);
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
export var outdent = function (state, dispatch) {
    var listItem = state.schema.nodes[outdentRules.listsTypes.listItem];
    var isIndentableBlock = canBeIndented(state, outdentRules);
    if (canOutdentAsListItem(state, outdentRules)) {
        liftListItem(listItem)(state, dispatch);
    }
    else if (isIndentableBlock) {
        indentBlocks(outdentRules.nodes)(state, dispatch);
    }
};
