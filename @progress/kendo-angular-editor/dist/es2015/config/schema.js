/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { marks as commonMarks, nodes as commonNodes, Schema } from '@progress/kendo-editor-common';
import { serializeDOMAttrs, removeEmptyEntries } from '../util';
const commonAttributes = () => {
    return {
        class: { default: null },
        id: { default: null },
        style: { default: null }
    };
};
const ɵ0 = commonAttributes;
/**
 * @hidden
 */
const marks = commonMarks;
const ɵ1 = () => Object.assign(commonNodes, {
    table: {
        attrs: Object.assign({}, commonAttributes(), { class: { default: 'k-table' }, cellspacing: { default: null }, cellpadding: { default: null } }),
        content: "table_row+",
        tableRole: "table",
        isolating: true,
        group: 'block',
        parseDOM: [
            {
                getAttrs: serializeDOMAttrs,
                tag: "table"
            }
        ],
        toDOM: (node) => ["table", removeEmptyEntries(node.attrs), ["tbody", 0]]
    },
    htmlBlock: {
        group: "block",
        attrs: {
            html: {}
        },
        parseDOM: [
            {
                tag: "*:not(p):not(blockquote):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(pre):not(img):not(ol):not(ul):not(li):not(table):not(tbody):not(td):not(th):not(tr):not(thead):not(tfoot):not(colgroup):not(col):not(object)",
                getAttrs: (elt) => {
                    return { html: elt.outerHTML };
                }
            }
        ],
        toDOM: (node) => {
            const scratch = document.createElement("div");
            scratch.innerHTML = node.attrs.html;
            return scratch.firstChild;
        }
    }
});
const nodes = (ɵ1)();
/**
 * @hidden
 */
export const schema = new Schema({
    marks,
    nodes
});
export { ɵ0, ɵ1 };
