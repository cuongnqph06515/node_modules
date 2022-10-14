import * as tslib_1 from "tslib";
import { AddMarkStep, RemoveMarkStep } from 'prosemirror-transform';
import { changeStyles } from './utils';
import { markApplies, hasMark, removeMarks, toggleMark } from './mark';
//exactly the same
/**
 * @hidden
 */
export var changeStyleFromMark = function (marks, toChange) {
    var styleMark = marks.find(function (m) { return m.type.name === 'style'; });
    var elementStyle = styleMark && styleMark.attrs.style;
    return changeStyles(elementStyle, toChange);
};
//exactly the same
/**
 * @hidden
 */
export var changeStyleMark = function (tr, from, to, attrs, markType) {
    var mark = markType.create({ style: attrs.style });
    var removed = [], added = [], removing = null, adding = null;
    tr.doc.nodesBetween(from, to, function (node, pos, parent) {
        if (!node.isInline) {
            return;
        }
        var marks = node.marks;
        if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
            var start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
            var newStyle = changeStyleFromMark(marks, attrs);
            if (newStyle.changed || attrs.newValue) {
                var style = newStyle.changed ?
                    { style: newStyle.style || null } : { style: [attrs.style] + ": " + attrs.newValue + ";" };
                var currentMark = markType.isInSet(marks) ? marks.find(function (m) { return m.type.name === 'style'; }) : null;
                var newMarkAttrs_1 = currentMark ? tslib_1.__assign({}, currentMark.attrs, style) : style;
                var newStyleMark = markType.create(newMarkAttrs_1);
                var newSet = newStyleMark.addToSet(marks);
                for (var i = 0; i < marks.length; i++) {
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
                var previousAdded = adding && adding.to === start;
                var sameAdding = previousAdded && newStyleMark.attrs.style === adding.mark.attrs.style;
                if (previousAdded && sameAdding) {
                    adding.to = end;
                }
                else if (Object.keys(newMarkAttrs_1).some(function (attrName) { return newMarkAttrs_1[attrName] !== null; })) {
                    adding = new AddMarkStep(start, end, newStyleMark);
                    added.push(adding);
                }
            }
        }
    });
    removed.forEach(function (s) { return tr.step(s); });
    added.forEach(function (s) { return tr.step(s); });
    return removed.length + added.length > 0;
};
//react
/**
 * @hidden
 */
export var hasStyle = function (state, style) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    var result = false;
    var newStyle = { style: style.name, value: style.value };
    if (empty) {
        result = changeStyleFromMark(state.storedMarks || $from.marks(), newStyle).changed;
    }
    else {
        state.doc.nodesBetween(from, to, function (node, _pos, _parent) {
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
export var getInlineStyles = function (state, style) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    var result = [];
    var changeStyleResult;
    var newStyle = { style: style.name, value: style.value };
    if (empty) {
        changeStyleResult = changeStyleFromMark(state.storedMarks || $from.marks(), newStyle);
        if (changeStyleResult.changed) {
            result = changeStyleResult.styleMatches;
        }
    }
    else {
        state.doc.nodesBetween(from, to, function (node, _pos, _parent) {
            if (node.isInline) {
                changeStyleResult = changeStyleFromMark(node.marks, newStyle);
                if (changeStyleResult.changed) {
                    result.push.apply(result, changeStyleResult.styleMatches);
                }
                else {
                    result.push(null);
                }
            }
        });
    }
    return result.filter(function (s) { return s !== null; });
};
/**
 * @hidden
 */
export var changeStyle = function (markType, attrs) {
    return function (state, dispatch, tr) {
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
        if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
            return false;
        }
        var result = false;
        if (dispatch) {
            tr = tr || state.tr;
            if ($cursor) {
                var currentMarks = state.storedMarks || $cursor.marks();
                if (markType.isInSet(currentMarks)) {
                    var newStyle = changeStyleFromMark(currentMarks, attrs);
                    var styleMark = currentMarks.find(function (m) { return m.type.name === 'style'; });
                    var newAttrs_1 = tslib_1.__assign({}, (styleMark ? styleMark.attrs : {}), { style: newStyle.style || null });
                    dispatch(tr.removeStoredMark(markType));
                    if (Object.keys(newAttrs_1).some(function (attrName) { return newAttrs_1[attrName] !== null; })) {
                        dispatch(tr.addStoredMark(markType.create(newAttrs_1)));
                    }
                    result = true;
                }
            }
            else {
                for (var i = 0; i < ranges.length; i++) {
                    var _b = ranges[i], $from = _b.$from, $to = _b.$to;
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
export var toggleInlineFormat = function (options, tr, markAttrs) { return function (state, dispatch) {
    var marks = state.schema.marks;
    var altStyle = options.altStyle, _a = options.altMarks, altMarks = _a === void 0 ? [] : _a, mark = options.mark;
    tr = tr || state.tr;
    var styleRemoved = false;
    var dispatched = false;
    var markDispatched = function () { return dispatched = true; };
    if (altStyle && marks.style) {
        var styleMark = marks.style;
        var cmd = changeStyle(styleMark, { style: altStyle.name, value: altStyle.value });
        styleRemoved = cmd(state, markDispatched, tr);
    }
    var allMarks = [mark].concat(altMarks).filter(function (m) { return marks[m]; });
    var toRemove = allMarks.map(function (m) { return hasMark(state, { mark: m }) && marks[m]; }).filter(function (m) { return m; });
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
}; };
//react
/**
 * @hidden
 */
export var applyInlineStyle = function (options, command) { return function (state, dispatch) {
    var marks = state.schema.marks;
    var markType = marks.style;
    var attrs = {
        style: options.style, value: /^.+$/, newValue: options.value
    };
    var tr = state.tr;
    if (command) {
        tr.setMeta('commandName', command);
    }
    tr.setMeta('args', options);
    var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) {
        return false;
    }
    // Empty selection
    if ($cursor) {
        var selectionMarks = state.storedMarks || $cursor.marks();
        var currentMark = markType.isInSet(selectionMarks) ? selectionMarks.find(function (m) { return m.type.name === 'style'; }) : null;
        var newStyles = { style: null };
        if (currentMark && currentMark.attrs.style) {
            var resultStyles = changeStyles(currentMark.attrs.style, attrs);
            if (resultStyles.changed && resultStyles.style) {
                newStyles.style = resultStyles.style;
            }
        }
        else if (attrs.newValue) {
            newStyles.style = [attrs.style] + ": " + attrs.newValue + ";";
        }
        var newMarkAttrs_2 = currentMark ? tslib_1.__assign({}, currentMark.attrs, newStyles) : newStyles;
        if (Object.keys(newMarkAttrs_2).some(function (attrName) { return newMarkAttrs_2[attrName] !== null; })) {
            dispatch(tr.addStoredMark(markType.create(newMarkAttrs_2)));
        }
        else {
            dispatch(tr.removeStoredMark(markType));
        }
        return true;
    }
    return changeStyle(markType, attrs)(state, dispatch, tr);
}; };
