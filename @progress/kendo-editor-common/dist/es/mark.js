import { RemoveMarkStep } from 'prosemirror-transform';
import { MarkType } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { hasStyle } from './inline-style';
/**
 * @hidden
 */
export var markApplies = function (doc, ranges, type) {
    var loop = function (i) {
        var ref = ranges[i];
        var $from = ref.$from;
        var $to = ref.$to;
        var can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, function (node) {
            if (can) {
                return false;
            }
            can = node.inlineContent && node.type.allowsMarkType(type);
        });
        if (can) {
            return { v: true };
        }
    };
    for (var i = 0; i < ranges.length; i++) {
        var returned = loop(i);
        if (returned) {
            return returned.v;
        }
    }
    return false;
};
/**
 * @hidden
 */
export var toggleMark = function (markType, attrs, tr) { return function (state, dispatch) {
    var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
        return false;
    }
    if (dispatch) {
        if ($cursor) {
            if (markType.isInSet(state.storedMarks || $cursor.marks())) {
                dispatch(tr.removeStoredMark(markType));
            }
            else {
                dispatch(tr.addStoredMark(markType.create(attrs)));
            }
        }
        else {
            var has = false;
            for (var i = 0; !has && i < ranges.length; i++) {
                var _b = ranges[i], $from = _b.$from, $to = _b.$to;
                has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
            }
            for (var i = 0; i < ranges.length; i++) {
                var _c = ranges[i], $from = _c.$from, $to = _c.$to;
                if (has) {
                    tr.removeMark($from.pos, $to.pos, markType);
                }
                else {
                    tr.addMark($from.pos, $to.pos, markType.create(attrs));
                }
            }
            dispatch(tr.scrollIntoView());
        }
    }
    return true;
}; };
/**
 * @hidden
 */
export var removeMark = function (tr, from, to, mark) {
    if (mark === void 0) {
        mark = null;
    }
    var matched = [], step = 0;
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (!node.isInline) {
            return;
        }
        step++;
        var toRemove = null;
        if (mark instanceof MarkType) {
            var found = mark.isInSet(node.marks);
            if (found) {
                toRemove = [found];
            }
        }
        else if (mark) {
            if (mark.isInSet(node.marks)) {
                toRemove = [mark];
            }
        }
        else {
            toRemove = node.marks;
        }
        if (toRemove && toRemove.length) {
            var end = Math.min(pos + node.nodeSize, to);
            for (var i = 0; i < toRemove.length; i++) {
                var style = toRemove[i], found$1 = (void 0);
                for (var j = 0; j < matched.length; j++) {
                    var m = matched[j];
                    if (m.step === step - 1 && style.eq(m.style)) {
                        found$1 = m;
                    }
                }
                if (found$1) {
                    found$1.to = end;
                    found$1.step = step;
                }
                else {
                    matched.push({ style: style, from: Math.max(pos, from), to: end, step: step });
                }
            }
        }
    });
    matched.forEach(function (m) { return tr.step(new RemoveMarkStep(m.from, m.to, m.style)); });
    return tr;
};
/**
 * @hidden
 */
export var removeMarks = function (marks, state, dispatch, tr) {
    var _a = state.selection, $cursor = _a.$cursor, ranges = _a.ranges;
    tr = tr || state.tr;
    if ($cursor) {
        marks.forEach(function (m) {
            if (m.isInSet(state.storedMarks || $cursor.marks())) {
                dispatch(tr.removeStoredMark(m));
            }
        });
    }
    else {
        var _loop_1 = function (i) {
            var _a = ranges[i], $from = _a.$from, $to = _a.$to;
            marks.forEach(function (m) {
                removeMark(tr, $from.pos, $to.pos, m);
            });
        };
        for (var i = 0; i < ranges.length; i++) {
            _loop_1(i);
        }
        dispatch(tr.scrollIntoView());
    }
    return true;
};
var toArray = function (x) { return x instanceof Array ? x : [x]; };
/**
 * @hidden
 */
export var removeAllMarks = function (_a) {
    var _b = (_a === void 0 ? {} : _a).except, except = _b === void 0 ? [] : _b;
    return function (state, dispatch) {
        var schema = state.schema;
        var _a = state.selection, empty = _a.empty, ranges = _a.ranges;
        var tr = state.tr;
        var excludedMarkTypes = toArray(except).map(function (mt) { return mt.name; });
        if (!empty) {
            var marks_1 = Object.keys(schema.marks)
                .map(function (m) { return schema.marks[m]; })
                .filter(function (mt) { return excludedMarkTypes.indexOf(mt.name) === -1; });
            ranges.forEach(function (range) {
                var $from = range.$from, $to = range.$to;
                marks_1.forEach(function (mark) { return tr.removeMark($from.pos, $to.pos, mark); });
            });
            dispatch(tr);
        }
    };
};
//angular
/**
 * @hidden
 */
/*
export const removeMark = (markType: MarkType): Command => (state, dispatch) => {
    const { from, to, $cursor } = state.selection as TextSelection;
    if ($cursor) {
        let resolvedRange = getMarkRange($cursor, markType);
        dispatch(state.tr.removeMark(resolvedRange.from, resolvedRange.to, markType));
    } else {
        dispatch(state.tr.removeMark(from, to, markType));
    }
};
*/
/**
 * @hidden
 */
export var getParentMark = function (state, markType) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    var stateDoc = state.doc;
    if (empty) {
        return markType.isInSet(state.storedMarks || $from.marks()) || null;
    }
    else {
        var marks_2 = [];
        stateDoc.nodesBetween(from, to, function (node) {
            if (node.isInline) {
                marks_2.push(markType.isInSet(node.marks));
            }
        });
        return marks_2.length === 1 && marks_2[0] ? marks_2[0] : null;
    }
};
/**
 * @hidden
 */
export var hasMark = function (state, options) {
    var marks = state.schema.marks;
    var altMarks = (options.altMarks || []).filter(function (m) { return marks[m]; });
    var altStyle = options.altStyle;
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    var type = marks[options.mark];
    var doc = state.doc;
    var result = false;
    var currMarks;
    if (empty) {
        currMarks = state.storedMarks || $from.marks();
        result = (type && type.isInSet(currMarks)) || altMarks.some(function (m) { return marks[m].isInSet(currMarks); });
    }
    else {
        result = (type && doc.rangeHasMark(from, to, type)) || altMarks.some(function (m) { return doc.rangeHasMark(from, to, marks[m]); });
    }
    if (!result && altStyle) {
        return hasStyle(state, altStyle);
    }
    return Boolean(result);
};
/**
 * @hidden
 */
export var getMark = function (state, markType) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    var stateDoc = state.doc;
    var mark;
    if (empty) {
        mark = markType.isInSet(state.storedMarks || $from.marks());
    }
    else {
        var marks_3 = [];
        stateDoc.nodesBetween(from, to, function (node) {
            if (node.isInline) {
                marks_3.push(markType.isInSet(node.marks));
            }
        });
        if (!marks_3.some(function (m) { return !m; })) {
            mark = marks_3[marks_3.length - 1];
        }
    }
    return mark;
};
var getNodeMarksOfType = function (markType, node) { return node.marks.filter(function (m) { return m.type.name === markType.name; }); };
/**
 * @hidden
 */
export var getActiveMarks = function (_a, markType) {
    var selection = _a.selection;
    var hasNodesWithoutMarks = false;
    if (selection instanceof TextSelection && selection.$cursor) {
        return {
            hasNodesWithoutMarks: hasNodesWithoutMarks,
            marks: selection.$cursor.marks().filter(function (m) { return (markType ? m.type.name === markType.name : true); })
        };
    }
    var filtered = [];
    selection.content().content.descendants(function (node) {
        if (node.type.name === 'text') {
            var nodeMarksOfType = markType ? getNodeMarksOfType(markType, node) : node.marks;
            if (node.marks.length > 0 && nodeMarksOfType.length > 0) {
                filtered.push.apply(filtered, nodeMarksOfType);
            }
            else {
                hasNodesWithoutMarks = true;
            }
        }
    });
    return {
        hasNodesWithoutMarks: hasNodesWithoutMarks,
        marks: filtered
    };
};
