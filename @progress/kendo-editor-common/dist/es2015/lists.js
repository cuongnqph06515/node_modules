import { Fragment, Slice, NodeRange } from 'prosemirror-model';
import { TextSelection, NodeSelection } from 'prosemirror-state';
import { liftTarget, ReplaceAroundStep } from 'prosemirror-transform';
import { autoJoin } from 'prosemirror-commands';
import { wrapInList as pmWrapInList, splitListItem } from 'prosemirror-schema-list';
import { bulletList as bulletListSettings, orderedList as orderedListSettings } from './types/list-settings';
//exactly the same
/**
 * @hidden
 */
export const rootListDepth = (pos, nodes) => {
    // Get the depth of the nearest ancestor list
    const { bulletList, orderedList, listItem } = nodes;
    let depth;
    for (let i = pos.depth - 1; i > 0; i--) {
        const node = pos.node(i);
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
export const getListLiftTarget = (schema, resPos, listNodeNames) => {
    // This will return (depth - 1) for root list parent of a list.
    let target = resPos.depth;
    const bulletList = schema.nodes[listNodeNames.bulletList];
    const orderedList = schema.nodes[listNodeNames.orderedList];
    const listItem = schema.nodes[listNodeNames.listItem];
    for (let i = resPos.depth; i > 0; i--) {
        const node = resPos.node(i);
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
export function liftSelectionList(state, tr, listNodeNames) {
    // The function will list paragraphs in selection out to level 1 below root list.
    const { from, to } = state.selection;
    const { paragraph, heading } = state.schema.nodes;
    const listCol = [];
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === paragraph || node.type === heading) {
            listCol.push({ node, pos });
        }
    });
    for (let i = listCol.length - 1; i >= 0; i--) {
        const block = listCol[i];
        const start = tr.doc.resolve(tr.mapping.map(block.pos));
        if (start.depth > 0) {
            let end;
            if (block.node.textContent && block.node.textContent.length > 0) {
                end = tr.doc.resolve(tr.mapping.map(block.pos + block.node.textContent.length));
            }
            else {
                end = tr.doc.resolve(tr.mapping.map(block.pos + 1));
            }
            const range = start.blockRange(end);
            if (range) {
                tr.lift(range, getListLiftTarget(state.schema, start, listNodeNames));
            }
        }
    }
    return tr;
}
/**
 * @hidden
 */
export const toggleList = (state, dispatch, view, listNodeNames, command) => {
    const { listType } = listNodeNames;
    const { selection } = state;
    const fromNode = selection.$from.node(selection.$from.depth - 2);
    const endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode || fromNode.type.name !== listType || (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listNodeNames)(state, dispatch, view);
    }
    else {
        const nodes = view.state.schema.nodes;
        const listNodes = {
            bulletList: nodes[listNodeNames.bulletList],
            orderedList: nodes[listNodeNames.orderedList],
            listItem: nodes[listNodeNames.listItem]
        };
        const depth = rootListDepth(selection.$to, listNodes); //check this
        //angular => let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth, state.tr);
        let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth, view.state.tr, listNodes.listItem);
        tr = liftSelectionList(state, tr, listNodeNames);
        tr.setMeta('commandName', command);
        dispatch(tr);
        return true;
    }
};
/**
 * @hidden
 */
export function toggleListCommand(listNodeNames) {
    return function (state, dispatch, view) {
        if (!view) {
            return false;
        }
        state = view.state;
        const listNode = state.schema.nodes[listNodeNames.listType];
        const { $from, $to } = state.selection;
        const parent = $from.node(-2);
        const grandgrandParent = $from.node(-3);
        const isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, listNode);
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
/**
 * @hidden
 */
function liftListItem(state, selection, tr, nodeType) {
    if (!nodeType) {
        nodeType = state.schema.nodes.listItem;
    }
    let { $from, $to } = selection;
    let range = $from.blockRange($to, node => node.childCount && node.firstChild.type === nodeType);
    if (!range || range.depth < 2 || $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    let end = range.end;
    let endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, liftTarget(range)).scrollIntoView();
}
/**
 * @hidden
 */
export function liftFollowingList(state, from, to, rootListDepthNum, tr, listItem) {
    // Function will lift list item following selection to level-1.
    if (!listItem) {
        listItem = state.schema.nodes.listItem;
    }
    let lifted = false;
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            let listDepth = rootListDepthNum + 3;
            while (listDepth > rootListDepthNum + 2) {
                const start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                const sel = new TextSelection(start, end);
                tr = liftListItem(state, sel, tr, listItem);
            }
        }
    });
    return tr;
}
/**
 * @hidden
 */
export function isRangeOfType(doc, $from, $to, nodeType) {
    // Step through block-nodes between $from and $to and returns false if a node is
    // found that isn't of the specified type
    return getAncestorNodesBetween(doc, $from, $to).filter((node) => node.type !== nodeType).length === 0;
}
/**
 * @hidden
 */
export function getAncestorNodesBetween(doc, $from, $to) {
    // Returns all top-level ancestor-nodes between $from and $to
    const nodes = Array();
    const maxDepth = findAncestorPosition(doc, $from).depth;
    let current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        const depth = Math.min(current.depth, maxDepth);
        const node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        let next = doc.resolve(current.after(depth));
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
/**
 * @hidden
 */
export function findAncestorPosition(doc, pos) {
    // Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
    const nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];
    if (pos.depth === 1) {
        return pos;
    }
    let node = pos.node(pos.depth);
    let newPos = pos;
    while (pos.depth >= 1) {
        pos = doc.resolve(pos.before(pos.depth));
        node = pos.node(pos.depth);
        if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
            newPos = pos;
        }
    }
    return newPos;
}
/**
 * @hidden
 */
export function liftListItems(listNodeNames) {
    return function (state, dispatch) {
        const { tr } = state;
        const { $from, $to } = state.selection;
        tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            // Following condition will ensure that block types `paragraph`, `heading`, `codeBlock`, `blockquote`, `div` are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock || node.type.name === 'blockquote' || node.type.name === 'div') {
                const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                const range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes[listNodeNames.listItem]) {
                    return false;
                }
                const target = range && liftTarget(range);
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
/**
 * @hidden
 */
export function wrapInList(nodeType) {
    return autoJoin(pmWrapInList(nodeType), (before, after) => before.type === after.type && before.type === nodeType);
}
/**
 * @hidden
 */
export function toggleUnorderedList(state, dispatch, view) {
    return toggleList(state, dispatch, view, Object.assign({ listType: bulletListSettings.listType }, bulletListSettings.types));
}
/**
 * @hidden
 */
export function toggleOrderedList(state, dispatch, view) {
    return toggleList(state, dispatch, view, Object.assign({ listType: orderedListSettings.listType }, orderedListSettings.types));
}
/**
 * @hidden
 */
export const splitListItemKeepMarks = (itemType) => (state, dispatch) => {
    // see https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js#L321-L327
    return splitListItem(itemType)(state, tr => {
        let marks = state.storedMarks || (state.selection.$to.parentOffset && state.selection.$from.marks());
        if (marks) {
            tr.ensureMarks(marks);
        }
        dispatch(tr);
    });
};
