import { Node, Fragment } from 'prosemirror-model';
import { TextSelection, AllSelection, NodeSelection } from 'prosemirror-state';
import { markApplies } from './mark';
import { changeStyleFromMark, changeStyleMark } from './inline-style';
import { parseContent } from './source';
//exactly the same
/**
 * @hidden
 */
export const changeStyles = (elementStyle, newStyle) => {
    const styleToChange = newStyle.style;
    const regExp = newStyle.value;
    const newValue = newStyle.newValue;
    const styleMatches = [];
    if (elementStyle) {
        const splits = elementStyle.split(/\s*;\s*/).filter(s => s);
        const filtered = splits.filter(s => {
            if (!s.toLowerCase().trim().startsWith(styleToChange)) {
                return true;
            }
            const value = s.split(':')[1].trim();
            if (regExp.test(value)) {
                styleMatches.push(value);
                return false;
            }
            return true;
        });
        if (newValue) {
            filtered.push(`${styleToChange}: ${newValue}`);
        }
        return {
            style: filtered.join('; ') + (filtered.length ? ';' : ''),
            changed: !!newValue || filtered.length !== splits.length,
            styleMatches
        };
    }
    return { changed: false, styleMatches, style: null };
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
                    let newStyle = changeStyleFromMark(currentMarks, attrs);
                    dispatch(tr.removeStoredMark(markType));
                    dispatch(tr.addStoredMark(markType.create({ style: newStyle.style })));
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
//from react
/**
 * Determines if a given node type can be inserted at the current cursor position.
 *
 * @param state - The Editor state.
 * @param nodeType - The Prosemirror node type.
 * @returns - Boolean value that indicates whether the node can be inserted or not.
 */
export const canInsert = (state, nodeType) => {
    let $from = state.selection.$from;
    for (let d = $from.depth; d >= 0; d--) {
        let index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, nodeType)) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
export const getTypeName = (n) => {
    return n instanceof Node ? n.type.name : n.name;
};
/**
 * @hidden
 */
export const findParentNode = (predicate) => {
    return (selection) => {
        const { $from } = selection;
        for (let i = $from.depth; i > 0; i--) {
            const node = $from.node(i);
            if (predicate(node)) {
                return { depth: i, node };
            }
        }
    };
};
/**
 * @hidden
 */
export const findNthParentNode = (predicate, depth = 1) => {
    return (selection) => {
        const { $from } = selection;
        for (let i = $from.depth; i > 0; i--) {
            const node = $from.node(i);
            if (predicate(node)) {
                depth = depth - 1;
                if (depth === 0) {
                    return { depth: i, node };
                }
            }
        }
    };
};
/**
 * @hidden
 */
export const findNthParentNodeOfType = (nodeType, depth = 1) => {
    return (selection) => {
        return findNthParentNode((node) => getTypeName(node) === getTypeName(nodeType), depth)(selection);
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
export const insertNode = (node, scrollIntoView) => (state, dispatch) => {
    const tr = state.tr.replaceSelectionWith(node);
    if (scrollIntoView) {
        tr.scrollIntoView();
    }
    dispatch(tr);
};
/**
 * @hidden
 */
export const hasSameMarkup = (dom1, dom2, schema, parseOptions) => {
    const fragment1 = Fragment.from(parseContent(dom1, schema, parseOptions));
    const fragment2 = Fragment.from(parseContent(dom2, schema, parseOptions));
    return fragment1.eq(fragment2);
};
/**
 * @hidden
 */
export const first = (arr) => arr[0];
/**
 * @hidden
 */
export const last = (arr) => arr[arr.length - 1];
/**
 * @hidden
 */
export const split = (splitter) => (value) => value.split(splitter);
/**
 * @hidden
 */
export const trim = (value) => value.trim();
/**
 * @hidden
 */
export const filter = (predicate) => (arr) => arr.filter(predicate);
/**
 * @hidden
 */
export const getUniqueStyleValues = (style, cssStyle) => {
    if (style.hasNodesWithoutMarks) {
        return '';
    }
    const uniqueMarkValues = style.marks
        .filter(m => m.type.name === 'style')
        .map((m) => m.attrs.style)
        .map(split(';'))
        .map(filter((m) => m.includes(cssStyle)))
        // guards against empty array
        .map((cssStyleValues) => (cssStyleValues.length !== 0 ? cssStyleValues : [`${cssStyle}: INVALID`]))
        .map(first)
        .map(split(':'))
        .map(last)
        .map(trim)
        .reduce((acc, curr) => (acc.indexOf(curr) > -1 ? acc : [...acc, curr]), []);
    if (uniqueMarkValues.indexOf('INVALID') > -1 || uniqueMarkValues.length !== 1) {
        return '';
    }
    return uniqueMarkValues[0];
};
/**
 * @hidden
 */
export const getSelectionText = (state) => {
    const sel = state.selection;
    if (sel instanceof TextSelection || sel instanceof AllSelection) {
        const fragment = sel.content().content;
        return fragment.textBetween(0, fragment.size);
    }
    return '';
};
/**
 * @hidden
 */
export const getNodeFromSelection = (state) => {
    if (state.selection instanceof NodeSelection) {
        return state.selection.node;
    }
};
/**
 * @hidden
 */
export const indentHtml = (content) => {
    return content.replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/ig, '</$1>\n')
        .replace(/<(ul|ol)([^>]*)><li/ig, '<$1$2>\n<li')
        .replace(/<br \/>/ig, '<br />\n')
        .replace(/\n$/, '');
};
