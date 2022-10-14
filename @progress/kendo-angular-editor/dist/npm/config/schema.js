/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var kendo_editor_common_1 = require("@progress/kendo-editor-common");
var util_1 = require("../util");
var commonAttributes = function () {
    return {
        class: { default: null },
        id: { default: null },
        style: { default: null }
    };
};
var ɵ0 = commonAttributes;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var marks = kendo_editor_common_1.marks;
var ɵ1 = function () {
    return Object.assign(kendo_editor_common_1.nodes, {
        table: {
            attrs: tslib_1.__assign({}, commonAttributes(), { class: { default: 'k-table' }, cellspacing: { default: null }, cellpadding: { default: null } }),
            content: "table_row+",
            tableRole: "table",
            isolating: true,
            group: 'block',
            parseDOM: [
                {
                    getAttrs: util_1.serializeDOMAttrs,
                    tag: "table"
                }
            ],
            toDOM: function (node) { return ["table", util_1.removeEmptyEntries(node.attrs), ["tbody", 0]]; }
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
exports.ɵ1 = ɵ1;
var nodes = (ɵ1)();
/**
 * @hidden
 */
exports.schema = new kendo_editor_common_1.Schema({
    marks: marks,
    nodes: nodes
});
