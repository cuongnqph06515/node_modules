import { toggleInlineFormat } from './inline-style';
import { hasMark, getParentMark, toggleMark, removeMark } from './mark';
import { EditorState } from 'prosemirror-state';
/**
 * @hidden
 */
var modifyLink = function (options, tr) { return function (state, dispatch) {
    var _a = state.selection, $cursor = _a.$cursor, from = _a.from, to = _a.to;
    var markType = state.schema.marks[options.mark];
    if (!$cursor) {
        tr.doc.nodesBetween(from, to, function (node, pos) {
            if (node.isInline && markType.isInSet(node.marks)) {
                tr.removeMark(pos, pos + node.nodeSize, markType);
                tr.addMark(pos, pos + node.nodeSize, markType.create(options.attrs));
                dispatch(tr);
            }
        });
    }
    else {
        var parentNode = $cursor.parent;
        var cursorNodeIndex = $cursor.index();
        var mark = parentNode.child(cursorNodeIndex).marks.find(function (m) { return m.type === markType; });
        var childCount = parentNode.childCount;
        var linkStart = $cursor.pos - $cursor.textOffset, linkSize = parentNode.child(cursorNodeIndex).nodeSize, index = void 0, nodeSize = void 0;
        index = cursorNodeIndex - 1;
        while (index >= 0 && mark.isInSet(parentNode.child(index).marks)) {
            nodeSize = parentNode.child(index).nodeSize;
            linkSize += nodeSize;
            linkStart -= nodeSize;
            index -= 1;
        }
        index = cursorNodeIndex + 1;
        while (index < childCount && mark.isInSet(parentNode.child(index).marks)) {
            linkSize += parentNode.child(index).nodeSize;
            index += 1;
        }
        tr.removeMark(linkStart, linkStart + linkSize, markType);
        tr.addMark(linkStart, linkStart + linkSize, markType.create(options.attrs));
        dispatch(tr);
    }
}; };
/**
 * @hidden
 */
export var removeLink = function (options, tr) { return function (state, dispatch) {
    var $cursor = state.selection.$cursor;
    if (!$cursor) {
        toggleInlineFormat(options, tr)(state, dispatch);
    }
    else {
        var parentNode = $cursor.parent;
        var cursorNodeIndex = $cursor.index();
        var toolMark_1 = state.schema.marks[options.mark];
        var mark = parentNode.child(cursorNodeIndex).marks.find(function (m) { return m.type === toolMark_1; });
        var childCount = parentNode.childCount;
        var linkStart = $cursor.pos - $cursor.textOffset, linkSize = parentNode.child(cursorNodeIndex).nodeSize, index = void 0, nodeSize = void 0;
        index = cursorNodeIndex - 1;
        while (index >= 0 && mark.isInSet(parentNode.child(index).marks)) {
            nodeSize = parentNode.child(index).nodeSize;
            linkSize += nodeSize;
            linkStart -= nodeSize;
            index -= 1;
        }
        index = cursorNodeIndex + 1;
        while (index < childCount && mark.isInSet(parentNode.child(index).marks)) {
            linkSize += parentNode.child(index).nodeSize;
            index += 1;
        }
        dispatch(removeMark(tr || state.tr, linkStart, linkStart + linkSize, mark));
    }
}; };
/**
 * @hidden
 */
export var applyLink = function (_a, commandName) {
    var mark = _a.mark, attrs = _a.attrs;
    if (commandName === void 0) { commandName = 'link'; }
    return function (state, dispatch) {
        var marks = state.schema.marks;
        var tr = state.tr;
        if (commandName) {
            tr.setMeta('commandName', commandName);
            tr.setMeta('args', attrs);
        }
        var dispatched = false;
        var markDispatched = function () { return dispatched = true; };
        if (getParentMark(state, marks[mark])) {
            modifyLink({ mark: mark, attrs: attrs }, tr)(state, markDispatched);
        }
        else {
            var nextState = state;
            if (hasMark(state, { mark: mark })) {
                removeLink({ mark: mark, attrs: attrs }, tr)(state, markDispatched);
                nextState = EditorState.create({ doc: tr.doc, selection: tr.selection });
            }
            if (dispatched) {
                toggleMark(marks[mark], attrs, tr)(nextState, markDispatched);
            }
            else {
                toggleInlineFormat({ mark: mark }, tr, attrs)(nextState, markDispatched);
            }
        }
        if (dispatched) {
            dispatch(tr);
        }
        return dispatched;
    };
};
