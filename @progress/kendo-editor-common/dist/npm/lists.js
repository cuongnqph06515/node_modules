"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_transform_1 = require("prosemirror-transform");
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var list_settings_1 = require("./types/list-settings");
//exactly the same
/**
 * @hidden
 */
exports.rootListDepth = function (pos, nodes) {
    // Get the depth of the nearest ancestor list
    var bulletList = nodes.bulletList, orderedList = nodes.orderedList, listItem = nodes.listItem;
    var depth;
    for (var i = pos.depth - 1; i > 0; i--) {
        var node = pos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            depth = i;
        }
        if (node.type !== bulletList && node.type !== orderedList && node.type !== listItem) {
            break;
        }
    }
    return depth;
};
/**
 * @hidden
 */
exports.getListLiftTarget = function (schema, resPos, listNodeNames) {
    // This will return (depth - 1) for root list parent of a list.
    var target = resPos.depth;
    var bulletList = schema.nodes[listNodeNames.bulletList];
    var orderedList = schema.nodes[listNodeNames.orderedList];
    var listItem = schema.nodes[listNodeNames.listItem];
    for (var i = resPos.depth; i > 0; i--) {
        var node = resPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            target = i;
        }
        if (node.type !== bulletList && node.type !== orderedList && node.type !== listItem) {
            break;
        }
    }
    return target - 1;
};
/**
 * @hidden
 */
function liftSelectionList(state, tr, listNodeNames) {
    // The function will list paragraphs in selection out to level 1 below root list.
    var _a = state.selection, from = _a.from, to = _a.to;
    var _b = state.schema.nodes, paragraph = _b.paragraph, heading = _b.heading;
    var listCol = [];
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (node.type === paragraph || node.type === heading) {
            listCol.push({ node: node, pos: pos });
        }
    });
    for (var i = listCol.length - 1; i >= 0; i--) {
        var block = listCol[i];
        var start = tr.doc.resolve(tr.mapping.map(block.pos));
        if (start.depth > 0) {
            var end = void 0;
            if (block.node.textContent && block.node.textContent.length > 0) {
                end = tr.doc.resolve(tr.mapping.map(block.pos + block.node.textContent.length));
            }
            else {
                end = tr.doc.resolve(tr.mapping.map(block.pos + 1));
            }
            var range = start.blockRange(end);
            if (range) {
                tr.lift(range, exports.getListLiftTarget(state.schema, start, listNodeNames));
            }
        }
    }
    return tr;
}
exports.liftSelectionList = liftSelectionList;
/**
 * @hidden
 */
exports.toggleList = function (state, dispatch, view, listNodeNames, command) {
    var listType = listNodeNames.listType;
    var selection = state.selection;
    var fromNode = selection.$from.node(selection.$from.depth - 2);
    var endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode || fromNode.type.name !== listType || (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listNodeNames)(state, dispatch, view);
    }
    else {
        var nodes = view.state.schema.nodes;
        var listNodes = {
            bulletList: nodes[listNodeNames.bulletList],
            orderedList: nodes[listNodeNames.orderedList],
            listItem: nodes[listNodeNames.listItem]
        };
        var depth = exports.rootListDepth(selection.$to, listNodes); //check this
        //angular => let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth, state.tr);
        var tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth, view.state.tr, listNodes.listItem);
        tr = liftSelectionList(state, tr, listNodeNames);
        tr.setMeta('commandName', command);
        dispatch(tr);
        return true;
    }
};
/**
 * @hidden
 */
function toggleListCommand(listNodeNames) {
    return function (state, dispatch, view) {
        if (!view) {
            return false;
        }
        state = view.state;
        var listNode = state.schema.nodes[listNodeNames.listType];
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var parent = $from.node(-2);
        var grandgrandParent = $from.node(-3);
        var isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, listNode);
        if (((parent && parent.type === listNode) ||
            (grandgrandParent && grandgrandParent.type === listNode)) &&
            isRangeOfSingleType) {
            // Untoggles list
            return liftListItems(listNodeNames)(state, dispatch);
        }
        else {
            // Wraps selection in list and converts list type e.g. bullet_list -> ordered_list if needed
            if (!isRangeOfSingleType) {
                liftListItems(listNodeNames)(state, dispatch);
                state = view.state;
            }
            return wrapInList(listNode)(state, dispatch);
        }
    };
}
exports.toggleListCommand = toggleListCommand;
/**
 * @hidden
 */
function liftListItem(state, selection, tr, nodeType) {
    if (!nodeType) {
        nodeType = state.schema.nodes.listItem;
    }
    var $from = selection.$from, $to = selection.$to;
    var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type === nodeType; });
    if (!range || range.depth < 2 || $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    var end = range.end;
    var endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new prosemirror_transform_1.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new prosemirror_model_1.NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, prosemirror_transform_1.liftTarget(range)).scrollIntoView();
}
/**
 * @hidden
 */
function liftFollowingList(state, from, to, rootListDepthNum, tr, listItem) {
    // Function will lift list item following selection to level-1.
    if (!listItem) {
        listItem = state.schema.nodes.listItem;
    }
    var lifted = false;
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            var listDepth = rootListDepthNum + 3;
            while (listDepth > rootListDepthNum + 2) {
                var start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                var end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                var sel = new prosemirror_state_1.TextSelection(start, end);
                tr = liftListItem(state, sel, tr, listItem);
            }
        }
    });
    return tr;
}
exports.liftFollowingList = liftFollowingList;
/**
 * @hidden
 */
function isRangeOfType(doc, $from, $to, nodeType) {
    // Step through block-nodes between $from and $to and returns false if a node is
    // found that isn't of the specified type
    return getAncestorNodesBetween(doc, $from, $to).filter(function (node) { return node.type !== nodeType; }).length === 0;
}
exports.isRangeOfType = isRangeOfType;
/**
 * @hidden
 */
function getAncestorNodesBetween(doc, $from, $to) {
    // Returns all top-level ancestor-nodes between $from and $to
    var nodes = Array();
    var maxDepth = findAncestorPosition(doc, $from).depth;
    var current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        var depth = Math.min(current.depth, maxDepth);
        var node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        var next = doc.resolve(current.after(depth));
        if (next.start(depth) >= doc.nodeSize - 2) {
            break;
        }
        if (next.depth !== current.depth) {
            next = doc.resolve(next.pos + 2);
        }
        if (next.depth) {
            current = doc.resolve(next.start(next.depth));
        }
        else {
            current = doc.resolve(next.end(next.depth));
        }
    }
    return nodes;
}
exports.getAncestorNodesBetween = getAncestorNodesBetween;
/**
 * @hidden
 */
function findAncestorPosition(doc, pos) {
    // Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
    var nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];
    if (pos.depth === 1) {
        return pos;
    }
    var node = pos.node(pos.depth);
    var newPos = pos;
    while (pos.depth >= 1) {
        pos = doc.resolve(pos.before(pos.depth));
        node = pos.node(pos.depth);
        if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
            newPos = pos;
        }
    }
    return newPos;
}
exports.findAncestorPosition = findAncestorPosition;
/**
 * @hidden
 */
function liftListItems(listNodeNames) {
    return function (state, dispatch) {
        var tr = state.tr;
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        tr.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
            // Following condition will ensure that block types `paragraph`, `heading`, `codeBlock`, `blockquote`, `div` are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock || node.type.name === 'blockquote' || node.type.name === 'div') {
                var sel = new prosemirror_state_1.NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                var range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes[listNodeNames.listItem]) {
                    return false;
                }
                var target = range && prosemirror_transform_1.liftTarget(range);
                if (target === undefined || target === null) {
                    return false;
                }
                tr.lift(range, target);
            }
        });
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
exports.liftListItems = liftListItems;
/**
 * @hidden
 */
function wrapInList(nodeType) {
    return prosemirror_commands_1.autoJoin(prosemirror_schema_list_1.wrapInList(nodeType), function (before, after) { return before.type === after.type && before.type === nodeType; });
}
exports.wrapInList = wrapInList;
/**
 * @hidden
 */
function toggleUnorderedList(state, dispatch, view) {
    return exports.toggleList(state, dispatch, view, tslib_1.__assign({ listType: list_settings_1.bulletList.listType }, list_settings_1.bulletList.types));
}
exports.toggleUnorderedList = toggleUnorderedList;
/**
 * @hidden
 */
function toggleOrderedList(state, dispatch, view) {
    return exports.toggleList(state, dispatch, view, tslib_1.__assign({ listType: list_settings_1.orderedList.listType }, list_settings_1.orderedList.types));
}
exports.toggleOrderedList = toggleOrderedList;
/**
 * @hidden
 */
exports.splitListItemKeepMarks = function (itemType) { return function (state, dispatch) {
    // see https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js#L321-L327
    return prosemirror_schema_list_1.splitListItem(itemType)(state, function (tr) {
        var marks = state.storedMarks || (state.selection.$to.parentOffset && state.selection.$from.marks());
        if (marks) {
            tr.ensureMarks(marks);
        }
        dispatch(tr);
    });
}; };
