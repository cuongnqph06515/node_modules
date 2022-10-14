/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ContentChildren, QueryList, NgZone } from '@angular/core';
import { isObservable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { saveAs } from '@progress/kendo-file-saver';
import { toDataURL, workbookOptions, ColumnBase } from '@progress/kendo-angular-excel-export';
import { ExcelService } from './excel.service';
import { ExcelExportEvent } from './excel-export-event';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { orderBy } from '@progress/kendo-data-query';
import { sortColumns } from '../columns/column-common';
import { ViewCollection } from '../data/data.collection';
import { hasObservers } from '@progress/kendo-angular-common';
var ɵ0 = function (_item) { return true; };
var expandAllState = {
    isExpanded: ɵ0
};
var ɵ1 = function (_item) { return null; }, ɵ2 = function (_item) { return false; };
var editState = {
    context: ɵ1,
    hasNew: ɵ2,
    newItem: null
};
function loadView(view, subject) {
    view.loadData();
    if (view.loading) {
        view.dataLoaded.pipe(take(1)).subscribe(function () {
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
var toExcelColumns = function (columns) {
    var result = [];
    sortColumns(columns)
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
var componentColumns = function (component) {
    var columns = toExcelColumns(component.columns.toArray());
    return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
var ɵ6 = componentColumns;
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
        this.columns = new QueryList();
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
            if (result && isObservable(result.data)) {
                _this.dataSubscription = result.data.pipe(take(1)).subscribe(function (data) {
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
        var view = result ? new ViewCollection(function () { return Object.assign({
            idGetter: function (item) { return item; }
        }, result); }, expandState, editState) : this.componentView(component);
        var loaded = new Subject();
        loaded.subscribe(function () {
            var hierarchy = hierarchyData(view);
            var options = workbookOptions({
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
            var args = new ExcelExportEvent(options);
            if (hasObservers(component.excelExport)) {
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
        toDataURL(options).then(function (dataURL) {
            saveAs(dataURL, _this.fileName, {
                forceProxy: _this.forceProxy,
                proxyURL: _this.proxyURL
            });
        });
    };
    ExcelComponent.prototype.componentView = function (component) {
        var _this = this;
        var expandState = !this.expandAll || (!this.allPages && component.pageable) ? component.childExpandStateService : expandAllState;
        var excelView = new ViewCollection(function () { return Object.assign(component.viewFieldAccessor(), {
            pageable: !_this.allPages,
            skip: _this.allPages ? 0 : component.skip
        }); }, expandState, editState);
        excelView.loaded = new Map(component.view.loaded);
        return excelView;
    };
    ExcelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-excel',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ExcelComponent.ctorParameters = function () { return [
        { type: ExcelService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    ExcelComponent.propDecorators = {
        fileName: [{ type: Input }],
        filterable: [{ type: Input }],
        creator: [{ type: Input }],
        date: [{ type: Input }],
        forceProxy: [{ type: Input }],
        proxyURL: [{ type: Input }],
        fetchData: [{ type: Input }],
        collapsible: [{ type: Input }],
        allPages: [{ type: Input }],
        expandAll: [{ type: Input }],
        paddingCellOptions: [{ type: Input }],
        columns: [{ type: ContentChildren, args: [ColumnBase, { descendants: true },] }]
    };
    return ExcelComponent;
}());
export { ExcelComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
