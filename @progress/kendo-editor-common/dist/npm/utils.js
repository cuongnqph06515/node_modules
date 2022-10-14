"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var mark_1 = require("./mark");
var inline_style_1 = require("./inline-style");
var source_1 = require("./source");
//exactly the same
/**
 * @hidden
 */
exports.changeStyles = function (elementStyle, newStyle) {
    var styleToChange = newStyle.style;
    var regExp = newStyle.value;
    var newValue = newStyle.newValue;
    var styleMatches = [];
    if (elementStyle) {
        var splits = elementStyle.split(/\s*;\s*/).filter(function (s) { return s; });
        var filtered = splits.filter(function (s) {
            if (!s.toLowerCase().trim().startsWith(styleToChange)) {
                return true;
            }
            var value = s.split(':')[1].trim();
            if (regExp.test(value)) {
                styleMatches.push(value);
                return false;
            }
            return true;
        });
        if (newValue) {
            filtered.push(styleToChange + ": " + newValue);
        }
        return {
            style: filtered.join('; ') + (filtered.length ? ';' : ''),
            changed: !!newValue || filtered.length !== splits.length,
            styleMatches: styleMatches
        };
    }
    return { changed: false, styleMatches: styleMatches, style: null };
};
/**
 * @hidden
 */
exports.changeStyle = function (markType, attrs) {
    return function (state, dispatch, tr) {
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
        if ((empty && !$cursor) || !mark_1.markApplies(state.doc, ranges, markType)) {
            return false;
        }
        var result = false;
        if (dispatch) {
            tr = tr || state.tr;
            if ($cursor) {
                var currentMarks = state.storedMarks || $cursor.marks();
                if (markType.isInSet(currentMarks)) {
                    var newStyle = inline_style_1.changeStyleFromMark(currentMarks, attrs);
                    dispatch(tr.removeStoredMark(markType));
                    dispatch(tr.addStoredMark(markType.create({ style: newStyle.style })));
                    result = true;
                }
            }
            else {
                for (var i = 0; i < ranges.length; i++) {
                    var _b = ranges[i], $from = _b.$from, $to = _b.$to;
                    result = inline_style_1.changeStyleMark(tr, $from.pos, $to.pos, attrs, markType);
                }
                if (result) {
                    tr.scrollIntoView();
                    dispatch(tr);
                }
            }
        }
        return result;
    };
};
//from react
/**
 * Determines if a given node type can be inserted at the current cursor position.
 *
 * @param state - The Editor state.
 * @param nodeType - The Prosemirror node type.
 * @returns - Boolean value that indicates whether the node can be inserted or not.
 */
exports.canInsert = function (state, nodeType) {
    var $from = state.selection.$from;
    for (var d = $from.depth; d >= 0; d--) {
        var index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, nodeType)) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
exports.getTypeName = function (n) {
    return n instanceof prosemirror_model_1.Node ? n.type.name : n.name;
};
/**
 * @hidden
 */
exports.findParentNode = function (predicate) {
    return function (selection) {
        var $from = selection.$from;
        for (var i = $from.depth; i > 0; i--) {
            var node = $from.node(i);
            if (predicate(node)) {
                return { depth: i, node: node };
            }
        }
    };
};
/**
 * @hidden
 */
exports.findNthParentNode = function (predicate, depth) {
    if (depth === void 0) { depth = 1; }
    return function (selection) {
        var $from = selection.$from;
        for (var i = $from.depth; i > 0; i--) {
            var node = $from.node(i);
            if (predicate(node)) {
                depth = depth - 1;
                if (depth === 0) {
                    return { depth: i, node: node };
                }
            }
        }
    };
};
/**
 * @hidden
 */
exports.findNthParentNodeOfType = function (nodeType, depth) {
    if (depth === void 0) { depth = 1; }
    return function (selection) {
        return exports.findNthParentNode(function (node) { return exports.getTypeName(node) === exports.getTypeName(nodeType); }, depth)(selection);
    };
};
//from react
/**
 * Inserts the given node at the place of current selection.
 *
 * @param node - The node to insert.
 * @param scrollIntoView - Indicate that the editor should scroll the inserted node into view.
 * @returns - Command function that takes an editor `state` and `dispatch` function.
 */
exports.insertNode = function (node, scrollIntoView) { return function (state, dispatch) {
    var tr = state.tr.replaceSelectionWith(node);
    if (scrollIntoView) {
        tr.scrollIntoView();
    }
    dispatch(tr);
}; };
/**
 * @hidden
 */
exports.hasSameMarkup = function (dom1, dom2, schema, parseOptions) {
    var fragment1 = prosemirror_model_1.Fragment.from(source_1.parseContent(dom1, schema, parseOptions));
    var fragment2 = prosemirror_model_1.Fragment.from(source_1.parseContent(dom2, schema, parseOptions));
    return fragment1.eq(fragment2);
};
/**
 * @hidden
 */
exports.first = function (arr) { return arr[0]; };
/**
 * @hidden
 */
exports.last = function (arr) { return arr[arr.length - 1]; };
/**
 * @hidden
 */
exports.split = function (splitter) { return function (value) { return value.split(splitter); }; };
/**
 * @hidden
 */
exports.trim = function (value) { return value.trim(); };
/**
 * @hidden
 */
exports.filter = function (predicate) { return function (arr) { return arr.filter(predicate); }; };
/**
 * @hidden
 */
exports.getUniqueStyleValues = function (style, cssStyle) {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    var uniqueMarkValues = style.marks
        .filter(function (m) { return m.type.name === 'style'; })
        .map(function (m) { return m.attrs.style; })
        .map(exports.split(';'))
        .map(exports.filter(function (m) { return m.includes(cssStyle); }))
        // guards against empty array
        .map(function (cssStyleValues) { return (cssStyleValues.length !== 0 ? cssStyleValues : [cssStyle + ": INVALID"]); })
        .map(exports.first)
        .map(exports.split(':'))
        .map(exports.last)
        .map(exports.trim)
        .reduce(function (acc, curr) { return (acc.indexOf(curr) > -1 ? acc : acc.concat([curr])); }, []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
exports.getSelectionText = function (state) {
    var sel = state.selection;
    if (sel instanceof prosemirror_state_1.TextSelection || sel instanceof prosemirror_state_1.AllSelection) {
        var fragment = sel.content().content;
        return fragment.textBetween(0, fragment.size);
    }
    return '';
};
/**
 * @hidden
 */
exports.getNodeFromSelection = function (state) {
    if (state.selection instanceof prosemirror_state_1.NodeSelection) {
        return state.selection.node;
    }
};
/**
 * @hidden
 */
exports.indentHtml = function (content) {
    return content.replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/ig, '</$1>\n')
        .replace(/<(ul|ol)([^>]*)><li/ig, '<$1$2>\n<li')
        .replace(/<br \/>/ig, '<br />\n')
        .replace(/\n$/, '');
};
