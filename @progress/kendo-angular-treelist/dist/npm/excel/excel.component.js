/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var kendo_angular_excel_export_1 = require("@progress/kendo-angular-excel-export");
var excel_service_1 = require("./excel.service");
var excel_export_event_1 = require("./excel-export-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var column_common_1 = require("../columns/column-common");
var data_collection_1 = require("../data/data.collection");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var ɵ0 = function (_item) { return true; };
exports.ɵ0 = ɵ0;
var expandAllState = {
    isExpanded: ɵ0
};
var ɵ1 = function (_item) { return null; }, ɵ2 = function (_item) { return false; };
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
var editState = {
    context: ɵ1,
    hasNew: ɵ2,
    newItem: null
};
function loadView(view, subject) {
    view.loadData();
    if (view.loading) {
        view.dataLoaded.pipe(operators_1.take(1)).subscribe(function () {
            loadView(view, subject);
        });
    }
    else {
        subject.next();
    }
}
var hierarchyData = function (view) {
    var data = view.data;
    var levels = {};
    var aggregates = {};
    var items = [];
    var depth = 0;
    for (var idx = 0, dataIndex = 0; idx < data.length; idx++) {
        var item = data[idx];
        if (item.type === 'data') {
            items.push(item.data);
            levels[dataIndex] = item.level;
            depth = Math.max(depth, item.level);
            dataIndex++;
        }
        else {
            aggregates[item.parentIndex] = item.aggregates;
        }
    }
    return {
        itemId: function (_item, idx) { return idx; },
        itemLevel: function (_item, idx) { return levels[idx]; },
        depth: depth + 1,
        aggregates: aggregates,
        data: items
    };
};
var ɵ3 = hierarchyData;
exports.ɵ3 = ɵ3;
var toExcelColumn = function (column) {
    return {
        title: column.title,
        field: column.field,
        locked: Boolean(column.locked),
        width: column.width,
        level: column.level,
        hidden: !column.isVisible,
        footerTemplate: column.footerTemplate
    };
};
var ɵ4 = toExcelColumn;
exports.ɵ4 = ɵ4;
var toExcelColumns = function (columns) {
    var result = [];
    column_common_1.sortColumns(columns)
        .forEach(function (column) {
        if (column.childColumns) {
            result.push.apply(result, toExcelColumns(column.childColumns.toArray()));
        }
        else {
            var excelColumn = toExcelColumn(column);
            if (column.children) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.children.toArray().slice(1)));
            }
            result.push(excelColumn);
        }
    });
    return result;
};
var ɵ5 = toExcelColumns;
exports.ɵ5 = ɵ5;
var componentColumns = function (component) {
    var columns = toExcelColumns(component.columns.toArray());
    return kendo_data_query_1.orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
var ɵ6 = componentColumns;
exports.ɵ6 = ɵ6;
/**
 * Configures the settings for the export of TreeList in Excel ([see example]({% slug excelexport_treelist %})).
 */
var ExcelComponent = /** @class */ (function () {
    function ExcelComponent(excelService, localization, zone) {
        this.excelService = excelService;
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the file name of the exported Excel file.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * Specifies if export should include all pages
         * @default true
         */
        this.allPages = true;
        /**
         * Specifies if the export should expand all items or should use the current TreeList state.
         * @default true
         */
        this.expandAll = true;
        /**
         * @hidden
         */
        this.columns = new core_1.QueryList();
        this.saveSubscription = excelService.saveToExcel.subscribe(this.save.bind(this));
    }
    ExcelComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    };
    ExcelComponent.prototype.save = function (component) {
        var _this = this;
        var result = this.fetchData ? this.fetchData(component) : null;
        this.excelService.toggleLoading(true);
        this.zone.runOutsideAngular(function () {
            if (result && rxjs_1.isObservable(result.data)) {
                _this.dataSubscription = result.data.pipe(operators_1.take(1)).subscribe(function (data) {
                    _this.dataSubscription = null;
                    _this.exportData(component, {
                        data: data,
                        fetchChildren: result.fetchChildren,
                        hasChildren: result.hasChildren
                    });
                });
            }
            else {
                // allow the loading to be shown
                setTimeout(function () {
                    _this.exportData(component, result);
                });
            }
        });
    };
    ExcelComponent.prototype.exportData = function (component, result) {
        var _this = this;
        var expandState = this.expandAll ? expandAllState : component.childExpandStateService;
        var view = result ? new data_collection_1.ViewCollection(function () { return Object.assign({
            idGetter: function (item) { return item; }
        }, result); }, expandState, editState) : this.componentView(component);
        var loaded = new rxjs_1.Subject();
        loaded.subscribe(function () {
            var hierarchy = hierarchyData(view);
            var options = kendo_angular_excel_export_1.workbookOptions({
                columns: _this.columns.length ? _this.columns : componentColumns(component),
                data: hierarchy.data,
                aggregates: hierarchy.aggregates,
                filterable: _this.filterable,
                creator: _this.creator,
                date: _this.date,
                rtl: _this.localization.rtl,
                collapsible: _this.collapsible,
                hierarchy: hierarchy,
                paddingCellOptions: _this.paddingCellOptions
            });
            var args = new excel_export_event_1.ExcelExportEvent(options);
            if (kendo_angular_common_1.hasObservers(component.excelExport)) {
                _this.zone.run(function () {
                    component.excelExport.emit(args);
                });
            }
            _this.excelService.toggleLoading(false);
            if (!args.isDefaultPrevented()) {
                _this.saveFile(options);
            }
        });
        loadView(view, loaded);
    };
    ExcelComponent.prototype.saveFile = function (options) {
        var _this = this;
        kendo_angular_excel_export_1.toDataURL(options).then(function (dataURL) {
            kendo_file_saver_1.saveAs(dataURL, _this.fileName, {
                forceProxy: _this.forceProxy,
                proxyURL: _this.proxyURL
            });
        });
    };
    ExcelComponent.prototype.componentView = function (component) {
        var _this = this;
        var expandState = !this.expandAll || (!this.allPages && component.pageable) ? component.childExpandStateService : expandAllState;
        var excelView = new data_collection_1.ViewCollection(function () { return Object.assign(component.viewFieldAccessor(), {
            pageable: !_this.allPages,
            skip: _this.allPages ? 0 : component.skip
        }); }, expandState, editState);
        excelView.loaded = new Map(component.view.loaded);
        return excelView;
    };
    ExcelComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-excel',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ExcelComponent.ctorParameters = function () { return [
        { type: excel_service_1.ExcelService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    ExcelComponent.propDecorators = {
        fileName: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        creator: [{ type: core_1.Input }],
        date: [{ type: core_1.Input }],
        forceProxy: [{ type: core_1.Input }],
        proxyURL: [{ type: core_1.Input }],
        fetchData: [{ type: core_1.Input }],
        collapsible: [{ type: core_1.Input }],
        allPages: [{ type: core_1.Input }],
        expandAll: [{ type: core_1.Input }],
        paddingCellOptions: [{ type: core_1.Input }],
        columns: [{ type: core_1.ContentChildren, args: [kendo_angular_excel_export_1.ColumnBase, { descendants: true },] }]
    };
    return ExcelComponent;
}());
exports.ExcelComponent = ExcelComponent;
