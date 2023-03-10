/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable align */
/* tslint:disable:no-use-before-declare */
var compileTemplate = function (templateRef, context, updateContext) {
    var embeddedView = templateRef.createEmbeddedView(context);
    var result = function (data) {
        updateContext(context, data);
        embeddedView.detectChanges();
        return embeddedView.rootNodes.reduce(function (content, rootNode) {
            return content + rootNode.textContent;
        }, '').trim();
    };
    result.destroy = function () {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
var ɵ0 = compileTemplate;
exports.ɵ0 = ɵ0;
var updateGroupHeaderContext = function (context, data) {
    context.$implicit = context.group = data;
    context.field = data.field;
    context.value = data.value;
    context.aggregates = data.aggregates;
};
var ɵ1 = updateGroupHeaderContext;
exports.ɵ1 = ɵ1;
var updateGroupFooterContext = function (context, data) {
    context.group = data.group;
    context.$implicit = context.aggregates = data;
};
var ɵ2 = updateGroupFooterContext;
exports.ɵ2 = ɵ2;
var updateFooterContext = function (context, data) {
    context.aggregates = data.aggregates;
};
var ɵ3 = updateFooterContext;
exports.ɵ3 = ɵ3;
/**
 * @hidden
 */
exports.toExporterColumns = function (sourceColumns) {
    var exporterColumns = [];
    var columnIndex = 0;
    var addColumns = function (columns, result, level) {
        columns.forEach(function (column) {
            if (column.level === level) {
                var exporterColumn = new ExporterColumn(column, columnIndex);
                result.push(exporterColumn);
                if (column.children && column.children.some(function (c) { return c !== column; })) {
                    var children = exporterColumn.columns = [];
                    addColumns(column.children, children, level + 1);
                }
                else {
                    columnIndex++;
                }
            }
        });
    };
    addColumns(sourceColumns, exporterColumns, 0);
    return exporterColumns;
};
/**
 * @hidden
 */
exports.destroyColumns = function (columns) {
    if (columns) {
        columns.forEach(function (column) {
            column.destroy();
        });
    }
};
/**
 * @hidden
 */
var ExporterColumn = /** @class */ (function () {
    function ExporterColumn(column, columnIndex) {
        this.title = column.title;
        this.field = column.field;
        this.hidden = column.hidden;
        this.locked = column.locked;
        this.width = column.width;
        this.headerCellOptions = column.headerCellOptions;
        this.cellOptions = column.cellOptions;
        this.groupHeaderCellOptions = column.groupHeaderCellOptions;
        this.groupFooterCellOptions = column.groupFooterCellOptions;
        this.footerCellOptions = column.footerCellOptions;
        if (column.footerTemplate) {
            this.footerTemplate = compileTemplate(column.footerTemplate.templateRef, {
                $implicit: column,
                column: column,
                columnIndex: columnIndex
            }, updateFooterContext);
        }
        if (column.groupFooterTemplate) {
            this.groupFooterTemplate = compileTemplate(column.groupFooterTemplate.templateRef, {
                column: column,
                field: column.field
            }, updateGroupFooterContext);
        }
        if (column.groupHeaderTemplate) {
            this.groupHeaderTemplate = compileTemplate(column.groupHeaderTemplate.templateRef, {}, updateGroupHeaderContext);
        }
        if (column.groupHeaderColumnTemplate) {
            this.groupHeaderColumnTemplate = compileTemplate(column.groupHeaderColumnTemplate.templateRef, {}, updateGroupHeaderContext);
        }
    }
    ExporterColumn.prototype.destroy = function () {
        if (this.footerTemplate) {
            this.footerTemplate.destroy();
        }
        if (this.groupFooterTemplate) {
            this.groupFooterTemplate.destroy();
        }
        if (this.groupHeaderTemplate) {
            this.groupHeaderTemplate.destroy();
        }
        if (this.groupHeaderColumnTemplate) {
            this.groupHeaderColumnTemplate.destroy();
        }
        exports.destroyColumns(this.columns);
    };
    return ExporterColumn;
}());
exports.ExporterColumn = ExporterColumn;
