/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable:max-line-length
var core_1 = require("@angular/core");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var workbook_1 = require("./ooxml/workbook");
var column_base_1 = require("./columns/column-base");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_licensing_1 = require("@progress/kendo-licensing");
var package_metadata_1 = require("./package-metadata");
/**
 * Represents the [Kendo UI Excel Export component for Angular]({% slug overview_excelexport %}).
 * Configures the settings for the Excel export of the Kendo UI Grid.
 */
var ExcelExportComponent = /** @class */ (function () {
    function ExcelExportComponent(localization, zone) {
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the name of the file that is exported to Excel.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new core_1.QueryList();
        kendo_licensing_1.validatePackage(package_metadata_1.packageMetadata);
        this.saveFile = this.saveFile.bind(this);
    }
    /**
     * Saves the data to Excel.
     *
     * @param exportData - An optional parameter. Can be the data that will be exported or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}).
     */
    ExcelExportComponent.prototype.save = function (exportData) {
        this.toDataURL(exportData).then(this.saveFile);
    };
    /**
     * Based on the specified columns and data, returns
     * [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %})
     * ([see example]({% slug customrowsandcells_excelexport %})).
     *
     * @param exportData - The optional data to be exported.
     * @returns {WorkbookOptions} - The workbook options.
     */
    ExcelExportComponent.prototype.workbookOptions = function (exportData) {
        var currentData = this.getExportData(exportData);
        var options = workbook_1.workbookOptions({
            columns: this.columns,
            data: currentData.data,
            group: currentData.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            rtl: this.localization.rtl,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            collapsible: this.collapsible
        });
        return options;
    };
    /**
     * Returns a promise which will be resolved with the file data URI
     * ([see example]({% slug filesaving_excelexport %})).
     *
     * @param exportData - The optional data or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) that will be used to generate the data URI.
     * @returns {Promise<string>} - The promise that will be resolved by the file data URI.
     */
    ExcelExportComponent.prototype.toDataURL = function (exportData) {
        var options = workbook_1.isWorkbookOptions(exportData) ?
            exportData :
            this.workbookOptions(exportData);
        return this.zone.runOutsideAngular(function () { return workbook_1.toDataURL(options); });
    };
    ExcelExportComponent.prototype.getExportData = function (exportData) {
        var result;
        if (exportData) {
            if (Array.isArray(exportData)) {
                result = {
                    data: exportData
                };
            }
            else {
                result = exportData;
            }
        }
        else {
            result = {
                data: this.data,
                group: this.group
            };
        }
        return result;
    };
    ExcelExportComponent.prototype.saveFile = function (dataURL) {
        kendo_file_saver_1.saveAs(dataURL, this.fileName, {
            forceProxy: this.forceProxy,
            proxyURL: this.proxyURL
        });
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], ExcelExportComponent.prototype, "fileName", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ExcelExportComponent.prototype, "filterable", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ExcelExportComponent.prototype, "collapsible", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], ExcelExportComponent.prototype, "creator", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Date)
    ], ExcelExportComponent.prototype, "date", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ExcelExportComponent.prototype, "forceProxy", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], ExcelExportComponent.prototype, "proxyURL", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], ExcelExportComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], ExcelExportComponent.prototype, "group", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ExcelExportComponent.prototype, "paddingCellOptions", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ExcelExportComponent.prototype, "headerPaddingCellOptions", void 0);
    tslib_1.__decorate([
        core_1.ContentChildren(column_base_1.ColumnBase, { descendants: true }),
        tslib_1.__metadata("design:type", core_1.QueryList)
    ], ExcelExportComponent.prototype, "columns", void 0);
    ExcelExportComponent = tslib_1.__decorate([
        core_1.Component({
            exportAs: 'kendoExcelExport',
            selector: 'kendo-excelexport',
            providers: [
                kendo_angular_l10n_1.LocalizationService,
                {
                    provide: kendo_angular_l10n_1.L10N_PREFIX,
                    useValue: 'kendo.excelexport'
                }
            ],
            template: ""
        }),
        tslib_1.__metadata("design:paramtypes", [kendo_angular_l10n_1.LocalizationService, core_1.NgZone])
    ], ExcelExportComponent);
    return ExcelExportComponent;
}());
exports.ExcelExportComponent = ExcelExportComponent;
