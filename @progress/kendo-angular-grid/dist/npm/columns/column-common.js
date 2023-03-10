/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var span_column_component_1 = require("./span-column.component");
var utils_1 = require("../utils");
var kendo_data_query_1 = require("@progress/kendo-data-query");
/**
 * @hidden
 */
exports.expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(span_column_component_1.isSpanColumnComponent(column) ? column.childrenArray : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
exports.expandColumnsWithSpan = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(span_column_component_1.isSpanColumnComponent(column) ?
    [column].concat(column.childrenArray) :
    [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
exports.columnsToRender = function (columns) { return (exports.expandColumns(columns).filter(function (x) { return x.isVisible; })); };
var sumProp = function (prop) { return function (array) {
    return (array || []).reduce(function (prev, curr) { return prev + (curr[prop] || 0); }, 0);
}; };
var ɵ0 = sumProp;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.sumColumnWidths = sumProp('width');
/**
 * @hidden
 */
exports.columnsSpan = sumProp('colspan');
// tslint:disable-next-line:max-line-length
var validField = new RegExp("^[$A-Z_a-z][$A-Z_a-z0-9\\.]*$");
/**
 * @hidden
 */
exports.isValidFieldName = function (fieldName) {
    return !utils_1.isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
        fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
};
/**
 * @hidden
 */
exports.children = function (column) { return column.children.filter(function (child) { return child !== column; }); };
/**
 * @hidden
 */
exports.leafColumns = function (columns) {
    return columns.reduce(function (acc, column) {
        if (column.isColumnGroup) {
            acc = acc.concat(exports.leafColumns(exports.children(column)));
        }
        else if (column.isSpanColumn) {
            acc = acc.concat(column.childrenArray);
        }
        else {
            acc.push(column);
        }
        return acc;
    }, []).filter(function (x) { return x.isVisible; }); // tslint:disable-line:align
};
/**
 * @hidden
 */
exports.someLeafColumn = function (callback) {
    var columns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        columns[_i - 1] = arguments[_i];
    }
    return exports.leafColumns(columns).some(callback);
};
/**
 * @hidden
 */
exports.resizableColumns = function (columns) { return columns.filter(function (column) { return utils_1.isTruthy(column.resizable) && column.isVisible; }); };
/**
 * @hidden
 */
exports.sortColumns = function (columns) {
    return kendo_data_query_1.orderBy(columns, [{ field: 'orderIndex', dir: 'asc' }]);
};
/**
 * @hidden
 */
exports.isInSpanColumn = function (column) {
    return utils_1.isTruthy(column.parent) && span_column_component_1.isSpanColumnComponent(column.parent);
};
