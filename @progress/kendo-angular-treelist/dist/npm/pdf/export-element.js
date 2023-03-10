/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var treelist_query_1 = require("./treelist-query");
var FIRST_CLASS = 'k-first';
var INPUTS = ['input', 'select', 'textarea', 'option'];
/** @hidden */
exports.cloneNode = function (node) {
    var clone = node.cloneNode(false);
    if (node._kendoExportVisual) {
        clone._kendoExportVisual = node._kendoExportVisual;
    }
    if (INPUTS.indexOf(String(node.nodeName).toLowerCase()) >= 0) {
        clone.removeAttribute("id");
        clone.removeAttribute("name");
        clone.value = node.value;
        clone.checked = node.checked;
        clone.selected = node.selected;
    }
    var child = node.firstChild;
    while (child) {
        clone.appendChild(exports.cloneNode(child));
        child = child.nextSibling;
    }
    return clone;
};
var appendNodes = function (element, nodes) {
    var length = nodes.length;
    for (var idx = 0; idx < length; idx++) {
        element.appendChild(exports.cloneNode(nodes[idx]));
    }
};
var ɵ0 = appendNodes;
exports.ɵ0 = ɵ0;
var wrapTable = function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'k-widget k-grid';
    wrapper.appendChild(table);
    return wrapper;
};
var ɵ1 = wrapTable;
exports.ɵ1 = ɵ1;
var createTableElement = function (sources) {
    var sourceCount = sources.length;
    var element = exports.cloneNode(sources[0]);
    var rowsCount = element.rows.length;
    if (sourceCount > 1) {
        for (var rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
            for (var sourceIdx = 1; sourceIdx < sourceCount; sourceIdx++) {
                appendNodes(element.rows[rowIdx], sources[sourceIdx].rows[rowIdx].cells);
            }
        }
    }
    return element;
};
var ɵ2 = createTableElement;
exports.ɵ2 = ɵ2;
var setFirstCellClass = function (header, headers) {
    if (headers.length > 1 && header.rows.length > 1) {
        for (var idx = 1; idx < header.rows.length; idx++) {
            var firstCellIndex = headers[0].rows[idx].cells.length;
            var cell = header.rows[idx].cells[firstCellIndex];
            if (String(cell.className).indexOf(FIRST_CLASS) === -1) {
                cell.className += " " + FIRST_CLASS;
            }
        }
    }
};
var ɵ3 = setFirstCellClass;
exports.ɵ3 = ɵ3;
var createTable = function (colGroups, headers, bodies, footers) {
    var table = document.createElement('table');
    var colGroup = colGroups[0].cloneNode(true);
    for (var idx = 1; idx < colGroups.length; idx++) {
        appendNodes(colGroup, colGroups[idx].querySelectorAll('col'));
    }
    var header = createTableElement(headers);
    var body = createTableElement(bodies);
    header.className = treelist_query_1.HEADER_CLASS;
    setFirstCellClass(header, headers);
    table.appendChild(colGroup);
    table.appendChild(header);
    table.appendChild(body);
    if (footers.length) {
        var footer = createTableElement(footers);
        footer.className = treelist_query_1.FOOTER_CLASS;
        table.appendChild(footer);
    }
    return wrapTable(table);
};
var ɵ4 = createTable;
exports.ɵ4 = ɵ4;
/**
 * @hidden
 */
exports.exportElement = function (wrapper) {
    var query = new treelist_query_1.TreeListQuery(wrapper);
    var content = query.content();
    var result;
    if (content) {
        var colGroups = [content.querySelector('colgroup')];
        var headers = [query.header().querySelector('thead')];
        var bodies = [content.querySelector('tbody')];
        var footer = query.footer();
        var footers = [];
        if (footer) {
            footers.push(footer.querySelector('tfoot'));
        }
        var lockedContent = query.content(true);
        if (lockedContent) {
            colGroups.unshift(lockedContent.querySelector('colgroup'));
            headers.unshift(query.header(true).querySelector('thead'));
            bodies.unshift(lockedContent.querySelector('tbody'));
            if (footer) {
                footers.unshift(query.footer(true).querySelector('tfoot'));
            }
        }
        result = createTable(colGroups, headers, bodies, footers);
    }
    else {
        result = wrapTable(query.table().cloneNode(true));
    }
    return result;
};
