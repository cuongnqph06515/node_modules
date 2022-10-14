"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var prosemirror_transform_1 = require("prosemirror-transform");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
/**
 * @hidden
 */
var canChangeType = function (stateDoc, pos, type) {
    var $pos = stateDoc.resolve(pos), index = $pos.index();
    return $pos.parent.canReplaceWith(index, index + 1, type);
};
/**
 * @hidden
 */
exports.changeBlockNode = function (state, dispatch, tr, node, nodeType, attrs) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var applicable = false;
    state.doc.nodesBetween(from, to, function (currNode, pos) {
        if (applicable) {
            return false;
        }
        if (!currNode.isTextblock || currNode.hasMarkup(nodeType, attrs)) {
            return;
        }
        if (currNode.type === nodeType) {
            applicable = true;
        }
        else {
            var $pos = state.doc.resolve(pos), index = $pos.index();
            applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
        }
    });
    if (!applicable) {
        return false;
    }
    if (dispatch) {
        if (!nodeType.isTextblock) {
            throw new RangeError('Type given to setBlockType should be a textblock');
        }
        var mapFrom_1 = tr.steps.length;
        tr.doc.nodesBetween(from, to, function (currNode, pos) {
            if (currNode.eq(node) &&
                currNode.isTextblock &&
                !currNode.hasMarkup(nodeType, attrs) &&
                canChangeType(tr.doc, tr.mapping.slice(mapFrom_1).map(pos), nodeType)) {
                // Ensure all markup that isn't allowed in the new node type is cleared
                tr.clearIncompatible(tr.mapping.slice(mapFrom_1).map(pos, 1), nodeType);
                var mapping = tr.mapping.slice(mapFrom_1);
                var startM = mapping.map(pos, 1), endM = mapping.map(pos + currNode.nodeSize, 1);
                var slice = new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(nodeType.create(attrs, null, currNode.marks)), 0, 0);
                tr.step(new prosemirror_transform_1.ReplaceAroundStep(startM, endM, startM + 1, endM - 1, slice, 1, true));
                return false; // this will skip the node children
            }
        });
    }
    return true;
};
/**
 * @hidden
 */
exports.blockNodes = function (state) {
    var selection = state.selection;
    var from = selection.from, to = selection.to, $from = selection.$from;
    var result = [];
    if (selection.node) {
        if (selection.node.isBlock) {
            result.push(selection.node);
        }
        else if ($from.parent && $from.parent.isBlock) {
            result.push($from.parent);
        }
    }
    else {
        state.doc.nodesBetween(from, to, function (node) {
            if (node.isBlock) {
                result.push(node);
            }
        });
    }
    return result;
};
//react method used for changing the formats
/**
 * @hidden
 */
exports.formatBlockElements = function (value, commandName) {
    return function (state, dispatch) {
        var blocks = exports.blockNodes(state);
        var nodes = state.schema.nodes;
        var result = false;
        var tr = state.tr;
        tr.setMeta('commandName', commandName);
        tr.setMeta('args', { value: value });
        blocks.forEach(function (node) {
            if (node.type.isTextblock) {
                if (value === 'p') {
                    var _a = node.attrs, level = _a.level, attrs = tslib_1.__rest(_a, ["level"]);
                    result = exports.changeBlockNode(state, dispatch, tr, node, nodes.paragraph, attrs) || result;
                }
                else if (/^h[1-6]$/i.test(value)) {
                    var level = parseInt(value.substr(1), 10);
                    result = exports.changeBlockNode(state, dispatch, tr, node, nodes.heading, tslib_1.__assign({}, node.attrs, { level: level })) || result;
                }
                else if (value === 'blockquote') {
                    var _b = node.attrs, level = _b.level, attrs = tslib_1.__rest(_b, ["level"]);
                    result = exports.changeBlockNode(state, dispatch, tr, node, nodes.blockquote, attrs) || result;
                }
            }
        });
        if (result) {
            dispatch(tr.scrollIntoView());
        }
        return result;
    };
};
/**
 * @hidden
 */
exports.getBlockFormats = function (state) {
    var blocks = exports.blockNodes(state);
    var nodes = state.schema.nodes;
    var result = [];
    blocks.forEach(function (node) {
        if (node.type === nodes.paragraph) {
            result.push('p');
        }
        else if (node.type === nodes.heading) {
            for (var i = 1; i <= 6; i++) {
                if (node.attrs.level === i) {
                    result.push('h' + i);
                    break;
                }
            }
        }
    });
    return result;
};
/**
 * @hidden
 */
exports.addStyles = function (node, stylesToApply) {
    var currentStyles = node.attrs.style, changedStyleResult = null, toChange = null;
    if (currentStyles) {
        stylesToApply.forEach(function (style) {
            toChange = { style: style.name, value: /^.+$/, newValue: style.value };
            changedStyleResult = utils_1.changeStyles(currentStyles, toChange);
            currentStyles = changedStyleResult.changed ? changedStyleResult.style : currentStyles;
        });
    }
    var reducer = function (acc, curr) { return ((acc && curr.value ? acc + ' ' : '') + curr.value ? curr.name + ": " + curr.value + ";" : ''); };
    currentStyles = currentStyles || stylesToApply.reduce(reducer, '');
    return Object.assign({}, node.attrs, { style: currentStyles || null });
};
/**
 * @hidden
 */
exports.hasNode = function (state, nodeType) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var result = false;
    state.doc.nodesBetween(from, to, function (node) {
        result = result || node.type === nodeType;
        return !result;
    });
    return result;
};
/**
 * @hidden
 */
var removeEntries = function (obj, predicate) {
    return Object.keys(obj)
        .filter(function (key) { return predicate(key); })
        .reduce(function (acc, curr) {
        var _a;
        return Object.assign(acc, (_a = {}, _a[curr] = obj[curr], _a));
    }, {});
};
/**
 * @hidden
 */
var removeEmptyEntries = function (obj) {
    var predicate = function (key) { return obj[key] !== null && obj[key] !== undefined && obj[key] !== ''; };
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
exports.getNodeTagName = function (node, schema) {
    var parseRules = node.type.spec.parseDOM || [];
    var nodeAttrs = node.attrs;
    var parseRule;
    if (parseRules.length === 1) {
        parseRule = parseRules[0];
    }
    else {
        // TODO: refactor this
        // removeEmptyEntries is needed due to the default attributes in the schema
        parseRule = parseRules.find(function (rule) {
            // getAttrs needs a DOM Node
            var domNode = prosemirror_model_1.DOMSerializer.fromSchema(schema).serializeNode(node);
            return JSON.stringify(rule.getAttrs(domNode)) === JSON.stringify(removeEmptyEntries(nodeAttrs));
        });
    }
    if (parseRule) {
        // regex is needed since image node has tag = img[src]
        // https://stackoverflow.com/a/25777116
        return parseRule.tag.toLowerCase().replace(/ *\[[^\]]*]/, '');
    }
    else {
        return '';
    }
};
//angular, react uses getBlockFormats
/**
 * @hidden
 */
exports.activeNode = function (state) {
    var doc = state.schema.nodes.doc;
    var node;
    if (state.selection instanceof prosemirror_state_1.AllSelection) {
        node = state.doc;
    }
    else if (state.selection instanceof prosemirror_state_1.TextSelection) {
        var $anchor = state.selection.$anchor;
        var blockNode = $anchor.node($anchor.blockRange().depth);
        var isDoc = utils_1.getTypeName(blockNode) === utils_1.getTypeName(doc);
        node = isDoc ? $anchor.node() : blockNode;
    }
    else if (state.selection instanceof prosemirror_state_1.NodeSelection) {
        node = state.selection.node;
    }
    return {
        name: utils_1.getTypeName(node),
        tag: exports.getNodeTagName(node, state.schema)
    };
};
