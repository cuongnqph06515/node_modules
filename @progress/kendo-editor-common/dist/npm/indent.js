"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var indent_rules_1 = require("./types/indent-rules");
var blockNode_1 = require("./blockNode");
var utils_1 = require("./utils");
/**
 * Indenting block elements in the selection.
 *
 * @returns {boolean} - Returns true if any indentation is applied.
 */
exports.indentBlocks = function (actions, command, dir) { return function (state, dispatch) {
    var blocks = blockNode_1.blockNodes(state);
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
                newAttrs = blockNode_1.addStyles(node, [newStyle]);
            }
            if (newAttrs) {
                result = blockNode_1.changeBlockNode(state, dispatch, tr, node, node.type, newAttrs) || result;
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
exports.isIndented = function (state, rules, dir) {
    var blocks = blockNode_1.blockNodes(state);
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
exports.canIndentAsListItem = function (state, nodeType) {
    return prosemirror_schema_list_1.sinkListItem(nodeType)(state);
};
/**
 * @hidden
 */
exports.canOutdentAsListItem = function (state, rules) {
    var listItem = state.schema.nodes[rules.listsTypes.listItem];
    var orderedList = state.schema.nodes[rules.listsTypes.orderedList];
    var bulletList = state.schema.nodes[rules.listsTypes.bulletList];
    var isNestedInOL = !!utils_1.findNthParentNodeOfType(orderedList, 2)(state.selection);
    var isNestedInUL = !!utils_1.findNthParentNodeOfType(bulletList, 2)(state.selection);
    return (isNestedInOL || isNestedInUL) && prosemirror_schema_list_1.liftListItem(listItem)(state);
};
/**
 * @hidden
 */
exports.canBeIndented = function (state, rules) {
    var nodes = state.schema.nodes;
    var listItem = nodes[indent_rules_1.indentRules.listsTypes.listItem];
    return ((exports.isIndented(state, rules.nodes) || indent_rules_1.indentRules.nodes.some(function (rule) { return nodes[rule.node] && blockNode_1.hasNode(state, nodes[rule.node]); })) &&
        !blockNode_1.hasNode(state, listItem));
};
/**
 * @hidden
 */
exports.indent = function (state, dispatch) {
    var listItem = state.schema.nodes[indent_rules_1.indentRules.listsTypes.listItem];
    var isIndentableBlock = exports.canBeIndented(state, indent_rules_1.indentRules);
    if (exports.canIndentAsListItem(state, listItem)) {
        prosemirror_schema_list_1.sinkListItem(listItem)(state, dispatch);
    }
    else if (isIndentableBlock) {
        exports.indentBlocks(indent_rules_1.indentRules.nodes)(state, dispatch);
    }
};
/**
 * @hidden
 */
exports.outdent = function (state, dispatch) {
    var listItem = state.schema.nodes[indent_rules_1.outdentRules.listsTypes.listItem];
    var isIndentableBlock = exports.canBeIndented(state, indent_rules_1.outdentRules);
    if (exports.canOutdentAsListItem(state, indent_rules_1.outdentRules)) {
        prosemirror_schema_list_1.liftListItem(listItem)(state, dispatch);
    }
    else if (isIndentableBlock) {
        exports.indentBlocks(indent_rules_1.outdentRules.nodes)(state, dispatch);
    }
};
