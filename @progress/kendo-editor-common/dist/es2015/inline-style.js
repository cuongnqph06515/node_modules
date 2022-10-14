import { AddMarkStep, RemoveMarkStep } from 'prosemirror-transform';
import { changeStyles } from './utils';
import { markApplies, hasMark, removeMarks, toggleMark } from './mark';
//exactly the same
/**
 * @hidden
 */
export const changeStyleFromMark = (marks, toChange) => {
    const styleMark = marks.find(m => m.type.name === 'style');
    const elementStyle = styleMark && styleMark.attrs.style;
    return changeStyles(elementStyle, toChange);
};
//exactly the same
/**
 * @hidden
 */
export const changeStyleMark = (tr, from, to, attrs, markType) => {
    const mark = markType.create({ style: attrs.style });
    let removed = [], added = [], removing = null, adding = null;
    tr.doc.nodesBetween(from, to, (node, pos, parent) => {
        if (!node.isInline) {
            return;
        }
        let marks = node.marks;
        if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
            let start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
            const newStyle = changeStyleFromMark(marks, attrs);
            if (newStyle.changed || attrs.newValue) {
                const style = newStyle.changed ?
                    { style: newStyle.style || null } : { style: `${[attrs.style]}: ${attrs.newValue};` };
                const currentMark = markType.isInSet(marks) ? marks.find(m => m.type.name === 'style') : null;
                const newMarkAttrs = currentMark ? Object.assign({}, currentMark.attrs, style) : style;
                const newStyleMark = markType.create(newMarkAttrs);
                let newSet = newStyleMark.addToSet(marks);
                for (let i = 0; i < marks.length; i++) {
                    if (!marks[i].isInSet(newSet)) {
                        if (removing && removing.to === start && removing.mark.eq(marks[i])) {
                            removing.to = end;
                        }
                        else {
                            removing = new RemoveMarkStep(start, end, marks[i]);
                            removed.push(removing);
                        }
                    }
                }
                const previousAdded = adding && adding.to === start;
                const sameAdding = previousAdded && newStyleMark.attrs.style === adding.mark.attrs.style;
                if (previousAdded && sameAdding) {
                    adding.to = end;
                }
                else if (Object.keys(newMarkAttrs).some(attrName => newMarkAttrs[attrName] !== null)) {
                    adding = new AddMarkStep(start, end, newStyleMark);
                    added.push(adding);
                }
            }
        }
    });
    removed.forEach(s => tr.step(s));
    added.forEach(s => tr.step(s));
    return removed.length + added.length > 0;
};
//react
/**
 * @hidden
 */
export const hasStyle = (state, style) => {
    let { from, $from, to, empty } = state.selection;
    let result = false;
    const newStyle = { style: style.name, value: style.value };
    if (empty) {
        result = changeStyleFromMark(state.storedMarks || $from.marks(), newStyle).changed;
    }
    else {
        state.doc.nodesBetween(from, to, (node, _pos, _parent) => {
            if (!result && node.isInline) {
                result = changeStyleFromMark(node.marks, newStyle).changed;
            }
        });
    }
    return result;
};
/**
 * @hidden
 */
export const getInlineStyles = (state, style) => {
    let { from, $from, to, empty } = state.selection;
    let result = [];
    let changeStyleResult;
    const newStyle = { style: style.name, value: style.value };
    if (empty) {
        changeStyleResult = changeStyleFromMark(state.storedMarks || $from.marks(), newStyle);
        if (changeStyleResult.changed) {
            result = changeStyleResult.styleMatches;
        }
    }
    else {
        state.doc.nodesBetween(from, to, (node, _pos, _parent) => {
            if (node.isInline) {
                changeStyleResult = changeStyleFromMark(node.marks, newStyle);
                if (changeStyleResult.changed) {
                    result.push(...changeStyleResult.styleMatches);
                }
                else {
                    result.push(null);
                }
            }
        });
    }
    return result.filter(s => s !== null);
};
/**
 * @hidden
 */
export const changeStyle = (markType, attrs) => {
    return function (state, dispatch, tr) {
        let { empty, $cursor, ranges } = state.selection;
        if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
            return false;
        }
        let result = false;
        if (dispatch) {
            tr = tr || state.tr;
            if ($cursor) {
                const currentMarks = state.storedMarks || $cursor.marks();
                if (markType.isInSet(currentMarks)) {
                    const newStyle = changeStyleFromMark(currentMarks, attrs);
                    const styleMark = currentMarks.find(m => m.type.name === 'style');
                    const newAttrs = Object.assign({}, (styleMark ? styleMark.attrs : {}), { style: newStyle.style || null });
                    dispatch(tr.removeStoredMark(markType));
                    if (Object.keys(newAttrs).some(attrName => newAttrs[attrName] !== null)) {
                        dispatch(tr.addStoredMark(markType.create(newAttrs)));
                    }
                    result = true;
                }
            }
            else {
                for (let i = 0; i < ranges.length; i++) {
                    let { $from, $to } = ranges[i];
                    result = changeStyleMark(tr, $from.pos, $to.pos, attrs, markType);
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
//react, angular uses build-in toggleMark
/**
 * @hidden
 */
export const toggleInlineFormat = (options, tr, markAttrs) => (state, dispatch) => {
    const marks = state.schema.marks;
    const { altStyle, altMarks = [], mark } = options;
    tr = tr || state.tr;
    let styleRemoved = false;
    let dispatched = false;
    const markDispatched = () => dispatched = true;
    if (altStyle && marks.style) {
        const styleMark = marks.style;
        const cmd = changeStyle(styleMark, { style: altStyle.name, value: altStyle.value });
        styleRemoved = cmd(state, markDispatched, tr);
    }
    const allMarks = [mark, ...altMarks].filter(m => marks[m]);
    const toRemove = allMarks.map(m => hasMark(state, { mark: m }) && marks[m]).filter(m => m);
    if (toRemove.length) {
        removeMarks(toRemove, state, markDispatched, tr);
    }
    else {
        if (!styleRemoved) {
            toggleMark(marks[mark], markAttrs, tr)(state, markDispatched);
        }
    }
    if (dispatched) {
        dispatch(tr);
    }
    return dispatched;
};
//react
/**
 * @hidden
 */
export const applyInlineStyle = (options, command) => (state, dispatch) => {
    const marks = state.schema.marks;
    const markType = marks.style;
    const attrs = {
        style: options.style, value: /^.+$/, newValue: options.value
    };
    const tr = state.tr;
    if (command) {
        tr.setMeta('commandName', command);
    }
    tr.setMeta('args', options);
    let { empty, $cursor, ranges } = state.selection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
        return false;
    }
    // Empty selection
    if ($cursor) {
        const selectionMarks = state.storedMarks || $cursor.marks();
        const currentMark = markType.isInSet(selectionMarks) ? selectionMarks.find(m => m.type.name === 'style') : null;
        const newStyles = { style: null };
        if (currentMark && currentMark.attrs.style) {
            const resultStyles = changeStyles(currentMark.attrs.style, attrs);
            if (resultStyles.changed && resultStyles.style) {
                newStyles.style = resultStyles.style;
            }
        }
        else if (attrs.newValue) {
            newStyles.style = `${[attrs.style]}: ${attrs.newValue};`;
        }
        const newMarkAttrs = currentMark ? Object.assign({}, currentMark.attrs, newStyles) : newStyles;
        if (Object.keys(newMarkAttrs).some(attrName => newMarkAttrs[attrName] !== null)) {
            dispatch(tr.addStoredMark(markType.create(newMarkAttrs)));
        }
        else {
            dispatch(tr.removeStoredMark(markType));
        }
        return true;
    }
    return changeStyle(markType, attrs)(state, dispatch, tr);
};
