import * as tslib_1 from "tslib";
import { changeStyles, getTypeName } from './utils';
import { ReplaceAroundStep } from 'prosemirror-transform';
import { Fragment, Slice, DOMSerializer } from 'prosemirror-model';
import { NodeSelection, TextSelection, AllSelection } from 'prosemirror-state';
/**
 * @hidden
 */
const canChangeType = (stateDoc, pos, type) => {
    let $pos = stateDoc.resolve(pos), index = $pos.index();
    return $pos.parent.canReplaceWith(index, index + 1, type);
};
/**
 * @hidden
 */
export const changeBlockNode = (state, dispatch, tr, node, nodeType, attrs) => {
    let { from, to } = state.selection;
    let applicable = false;
    state.doc.nodesBetween(from, to, (currNode, pos) => {
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
            let $pos = state.doc.resolve(pos), index = $pos.index();
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
        let mapFrom = tr.steps.length;
        tr.doc.nodesBetween(from, to, (currNode, pos) => {
            if (currNode.eq(node) &&
                currNode.isTextblock &&
                !currNode.hasMarkup(nodeType, attrs) &&
                canChangeType(tr.doc, tr.mapping.slice(mapFrom).map(pos), nodeType)) {
                // Ensure all markup that isn't allowed in the new node type is cleared
                tr.clearIncompatible(tr.mapping.slice(mapFrom).map(pos, 1), nodeType);
                let mapping = tr.mapping.slice(mapFrom);
                let startM = mapping.map(pos, 1), endM = mapping.map(pos + currNode.nodeSize, 1);
                let slice = new Slice(Fragment.from(nodeType.create(attrs, null, currNode.marks)), 0, 0);
                tr.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, slice, 1, true));
                return false; // this will skip the node children
            }
        });
    }
    return true;
};
/**
 * @hidden
 */
export const blockNodes = (state) => {
    const selection = state.selection;
    let { from, to, $from } = selection;
    const result = [];
    if (selection.node) {
        if (selection.node.isBlock) {
            result.push(selection.node);
        }
        else if ($from.parent && $from.parent.isBlock) {
            result.push($from.parent);
        }
    }
    else {
        state.doc.nodesBetween(from, to, node => {
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
export const formatBlockElements = (value, commandName) => (state, dispatch) => {
    const blocks = blockNodes(state);
    const nodes = state.schema.nodes;
    let result = false;
    const tr = state.tr;
    tr.setMeta('commandName', commandName);
    tr.setMeta('args', { value });
    blocks.forEach(node => {
        if (node.type.isTextblock) {
            if (value === 'p') {
                const _a = node.attrs, { level } = _a, attrs = tslib_1.__rest(_a, ["level"]);
                result = changeBlockNode(state, dispatch, tr, node, nodes.paragraph, attrs) || result;
            }
            else if (/^h[1-6]$/i.test(value)) {
                const level = parseInt(value.substr(1), 10);
                result = changeBlockNode(state, dispatch, tr, node, nodes.heading, Object.assign({}, node.attrs, { level })) || result;
            }
            else if (value === 'blockquote') {
                const _b = node.attrs, { level } = _b, attrs = tslib_1.__rest(_b, ["level"]);
                result = changeBlockNode(state, dispatch, tr, node, nodes.blockquote, attrs) || result;
            }
        }
    });
    if (result) {
        dispatch(tr.scrollIntoView());
    }
    return result;
};
/**
 * @hidden
 */
export const getBlockFormats = (state) => {
    const blocks = blockNodes(state);
    const nodes = state.schema.nodes;
    const result = [];
    blocks.forEach((node) => {
        if (node.type === nodes.paragraph) {
            result.push('p');
        }
        else if (node.type === nodes.heading) {
            for (let i = 1; i <= 6; i++) {
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
export const addStyles = (node, stylesToApply) => {
    let currentStyles = node.attrs.style, changedStyleResult = null, toChange = null;
    if (currentStyles) {
        stylesToApply.forEach(style => {
            toChange = { style: style.name, value: /^.+$/, newValue: style.value };
            changedStyleResult = changeStyles(currentStyles, toChange);
            currentStyles = changedStyleResult.changed ? changedStyleResult.style : currentStyles;
        });
    }
    const reducer = (acc, curr) => ((acc && curr.value ? acc + ' ' : '') + curr.value ? `${curr.name}: ${curr.value};` : '');
    currentStyles = currentStyles || stylesToApply.reduce(reducer, '');
    return Object.assign({}, node.attrs, { style: currentStyles || null });
};
/**
 * @hidden
 */
export const hasNode = (state, nodeType) => {
    let { from, to } = state.selection;
    let result = false;
    state.doc.nodesBetween(from, to, node => {
        result = result || node.type === nodeType;
        return !result;
    });
    return result;
};
/**
 * @hidden
 */
const removeEntries = (obj, predicate) => Object.keys(obj)
    .filter(key => predicate(key))
    .reduce((acc, curr) => Object.assign(acc, { [curr]: obj[curr] }), {});
/**
 * @hidden
 */
const removeEmptyEntries = (obj) => {
    const predicate = (key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== '';
    return removeEntries(obj, predicate);
};
/**
 * @hidden
 */
export const getNodeTagName = (node, schema) => {
    const parseRules = node.type.spec.parseDOM || [];
    const nodeAttrs = node.attrs;
    let parseRule;
    if (parseRules.length === 1) {
        parseRule = parseRules[0];
    }
    else {
        // TODO: refactor this
        // removeEmptyEntries is needed due to the default attributes in the schema
        parseRule = parseRules.find((rule) => {
            // getAttrs needs a DOM Node
            const domNode = DOMSerializer.fromSchema(schema).serializeNode(node);
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
export const activeNode = (state) => {
    const { doc } = state.schema.nodes;
    let node;
    if (state.selection instanceof AllSelection) {
        node = state.doc;
    }
    else if (state.selection instanceof TextSelection) {
        const $anchor = state.selection.$anchor;
        const blockNode = $anchor.node($anchor.blockRange().depth);
        const isDoc = getTypeName(blockNode) === getTypeName(doc);
        node = isDoc ? $anchor.node() : blockNode;
    }
    else if (state.selection instanceof NodeSelection) {
        node = state.selection.node;
    }
    return {
        name: getTypeName(node),
        tag: getNodeTagName(node, state.schema)
    };
};
