import { RemoveMarkStep } from 'prosemirror-transform';
import { MarkType } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { hasStyle } from './inline-style';
/**
 * @hidden
 */
export const markApplies = (doc, ranges, type) => {
    let loop = i => {
        let ref = ranges[i];
        let $from = ref.$from;
        let $to = ref.$to;
        let can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, node => {
            if (can) {
                return false;
            }
            can = node.inlineContent && node.type.allowsMarkType(type);
        });
        if (can) {
            return { v: true };
        }
    };
    for (let i = 0; i < ranges.length; i++) {
        let returned = loop(i);
        if (returned) {
            return returned.v;
        }
    }
    return false;
};
/**
 * @hidden
 */
export const toggleMark = (markType, attrs, tr) => (state, dispatch) => {
    let { empty, $cursor, ranges } = state.selection;
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
            let has = false;
            for (let i = 0; !has && i < ranges.length; i++) {
                let { $from, $to } = ranges[i];
                has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
            }
            for (let i = 0; i < ranges.length; i++) {
                let { $from, $to } = ranges[i];
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
};
/**
 * @hidden
 */
export const removeMark = (tr, from, to, mark) => {
    if (mark === void 0) {
        mark = null;
    }
    let matched = [], step = 0;
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (!node.isInline) {
            return;
        }
        step++;
        let toRemove = null;
        if (mark instanceof MarkType) {
            let found = mark.isInSet(node.marks);
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
            let end = Math.min(pos + node.nodeSize, to);
            for (let i = 0; i < toRemove.length; i++) {
                let style = toRemove[i], found$1 = (void 0);
                for (let j = 0; j < matched.length; j++) {
                    let m = matched[j];
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
    matched.forEach((m) => { return tr.step(new RemoveMarkStep(m.from, m.to, m.style)); });
    return tr;
};
/**
 * @hidden
 */
export const removeMarks = (marks, state, dispatch, tr) => {
    let { $cursor, ranges } = state.selection;
    tr = tr || state.tr;
    if ($cursor) {
        marks.forEach(m => {
            if (m.isInSet(state.storedMarks || $cursor.marks())) {
                dispatch(tr.removeStoredMark(m));
            }
        });
    }
    else {
        for (let i = 0; i < ranges.length; i++) {
            let { $from, $to } = ranges[i];
            marks.forEach(m => {
                removeMark(tr, $from.pos, $to.pos, m);
            });
        }
        dispatch(tr.scrollIntoView());
    }
    return true;
};
const toArray = (x) => x instanceof Array ? x : [x];
/**
 * @hidden
 */
export const removeAllMarks = ({ except = [] } = {}) => (state, dispatch) => {
    const schema = state.schema;
    const { empty, ranges } = state.selection;
    const tr = state.tr;
    const excludedMarkTypes = toArray(except).map(mt => mt.name);
    if (!empty) {
        const marks = Object.keys(schema.marks)
            .map(m => schema.marks[m])
            .filter(mt => excludedMarkTypes.indexOf(mt.name) === -1);
        ranges.forEach(range => {
            let { $from, $to } = range;
            marks.forEach(mark => tr.removeMark($from.pos, $to.pos, mark));
        });
        dispatch(tr);
    }
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
export const getParentMark = (state, markType) => {
    let { from, $from, to, empty } = state.selection;
    const stateDoc = state.doc;
    if (empty) {
        return markType.isInSet(state.storedMarks || $from.marks()) || null;
    }
    else {
        const marks = [];
        stateDoc.nodesBetween(from, to, node => {
            if (node.isInline) {
                marks.push(markType.isInSet(node.marks));
            }
        });
        return marks.length === 1 && marks[0] ? marks[0] : null;
    }
};
/**
 * @hidden
 */
export const hasMark = (state, options) => {
    const marks = state.schema.marks;
    const altMarks = (options.altMarks || []).filter(m => marks[m]);
    const altStyle = options.altStyle;
    let { from, $from, to, empty } = state.selection;
    const type = marks[options.mark];
    const doc = state.doc;
    let result = false;
    let currMarks;
    if (empty) {
        currMarks = state.storedMarks || $from.marks();
        result = (type && type.isInSet(currMarks)) || altMarks.some(m => marks[m].isInSet(currMarks));
    }
    else {
        result = (type && doc.rangeHasMark(from, to, type)) || altMarks.some(m => doc.rangeHasMark(from, to, marks[m]));
    }
    if (!result && altStyle) {
        return hasStyle(state, altStyle);
    }
    return Boolean(result);
};
/**
 * @hidden
 */
export const getMark = (state, markType) => {
    let { from, $from, to, empty } = state.selection;
    const stateDoc = state.doc;
    let mark;
    if (empty) {
        mark = markType.isInSet(state.storedMarks || $from.marks());
    }
    else {
        let marks = [];
        stateDoc.nodesBetween(from, to, node => {
            if (node.isInline) {
                marks.push(markType.isInSet(node.marks));
            }
        });
        if (!marks.some(m => !m)) {
            mark = marks[marks.length - 1];
        }
    }
    return mark;
};
const getNodeMarksOfType = (markType, node) => node.marks.filter(m => m.type.name === markType.name);
/**
 * @hidden
 */
export const getActiveMarks = ({ selection }, markType) => {
    let hasNodesWithoutMarks = false;
    if (selection instanceof TextSelection && selection.$cursor) {
        return {
            hasNodesWithoutMarks,
            marks: selection.$cursor.marks().filter(m => (markType ? m.type.name === markType.name : true))
        };
    }
    const filtered = [];
    selection.content().content.descendants((node) => {
        if (node.type.name === 'text') {
            const nodeMarksOfType = markType ? getNodeMarksOfType(markType, node) : node.marks;
            if (node.marks.length > 0 && nodeMarksOfType.length > 0) {
                filtered.push(...nodeMarksOfType);
            }
            else {
                hasNodesWithoutMarks = true;
            }
        }
    });
    return {
        hasNodesWithoutMarks,
        marks: filtered
    };
};
