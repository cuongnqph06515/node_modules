/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { marks as commonMarks, nodes as commonNodes, Schema } from '@progress/kendo-editor-common';
import { serializeDOMAttrs, removeEmptyEntries } from '../util';
var commonAttributes = function () {
    return {
        class: { default: null },
        id: { default: null },
        style: { default: null }
    };
};
var ɵ0 = commonAttributes;
/**
 * @hidden
 */
var marks = commonMarks;
var ɵ1 = function () {
    return Object.assign(commonNodes, {
        table: {
            attrs: tslib_1.__assign({}, commonAttributes(), { class: { default: 'k-table' }, cellspacing: { default: null }, cellpadding: { default: null } }),
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
            toDOM: function (node) { return ["table", removeEmptyEntries(node.attrs), ["tbody", 0]]; }
        },
        htmlBlock: {
            group: "block",
            attrs: {
                html: {}
            },
            parseDOM: [
                {
                    tag: "*:not(p):not(blockquote):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(pre):not(img):not(ol):not(ul):not(li):not(table):not(tbody):not(td):not(th):not(tr):not(thead):not(tfoot):not(colgroup):not(col):not(object)",
                    getAttrs: function (elt) {
                        return { html: elt.outerHTML };
                    }
                }
            ],
            toDOM: function (node) {
                var scratch = document.createElement("div");
                scratch.innerHTML = node.attrs.html;
                return scratch.firstChild;
            }
        }
    });
};
var nodes = (ɵ1)();
/**
 * @hidden
 */
export var schema = new Schema({
    marks: marks,
    nodes: nodes
});
export { ɵ0, ɵ1 };
