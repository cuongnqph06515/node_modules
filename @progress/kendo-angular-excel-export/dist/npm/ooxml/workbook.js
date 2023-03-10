/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_ooxml_1 = require("@progress/kendo-ooxml");
var exporter_columns_1 = require("./exporter-columns");
var kendo_intl_1 = require("@telerik/kendo-intl");
kendo_ooxml_1.IntlService.register({ toString: kendo_intl_1.toString });
/**
 *
 * @hidden
 */
exports.workbookOptions = function (options) {
    var columns = exporter_columns_1.toExporterColumns(options.columns);
    var exporter = new kendo_ooxml_1.ExcelExporter({
        columns: columns,
        data: options.data,
        filterable: options.filterable,
        groups: options.group,
        paddingCellOptions: options.paddingCellOptions,
        headerPaddingCellOptions: options.headerPaddingCellOptions,
        collapsible: options.collapsible,
        hierarchy: options.hierarchy,
        aggregates: options.aggregates
    });
    var result = exporter.workbook();
    result.creator = options.creator;
    result.date = options.date;
    result.rtl = options.rtl;
    exporter_columns_1.destroyColumns(columns);
    return result;
};
/**
 * @hidden
 */
exports.toDataURL = function (options) {
    var workbook = new kendo_ooxml_1.Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
exports.isWorkbookOptions = function (value) {
    return value && value.sheets;
};
