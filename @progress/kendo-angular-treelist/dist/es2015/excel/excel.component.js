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
const ɵ0 = (_item) => true;
const expandAllState = {
    isExpanded: ɵ0
};
const ɵ1 = (_item) => null, ɵ2 = (_item) => false;
const editState = {
    context: ɵ1,
    hasNew: ɵ2,
    newItem: null
};
function loadView(view, subject) {
    view.loadData();
    if (view.loading) {
        view.dataLoaded.pipe(take(1)).subscribe(() => {
            loadView(view, subject);
        });
    }
    else {
        subject.next();
    }
}
const hierarchyData = (view) => {
    const data = view.data;
    const levels = {};
    const aggregates = {};
    const items = [];
    let depth = 0;
    for (let idx = 0, dataIndex = 0; idx < data.length; idx++) {
        const item = data[idx];
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
        itemId: (_item, idx) => idx,
        itemLevel: (_item, idx) => levels[idx],
        depth: depth + 1,
        aggregates,
        data: items
    };
};
const ɵ3 = hierarchyData;
const toExcelColumn = (column) => {
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
const ɵ4 = toExcelColumn;
const toExcelColumns = (columns) => {
    const result = [];
    sortColumns(columns)
        .forEach((column) => {
        if (column.childColumns) {
            result.push(...toExcelColumns(column.childColumns.toArray()));
        }
        else {
            const excelColumn = toExcelColumn(column);
            if (column.children) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.children.toArray().slice(1)));
            }
            result.push(excelColumn);
        }
    });
    return result;
};
const ɵ5 = toExcelColumns;
const componentColumns = (component) => {
    const columns = toExcelColumns(component.columns.toArray());
    return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
const ɵ6 = componentColumns;
/**
 * Configures the settings for the export of TreeList in Excel ([see example]({% slug excelexport_treelist %})).
 */
export class ExcelComponent {
    constructor(excelService, localization, zone) {
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
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    }
    save(component) {
        const result = this.fetchData ? this.fetchData(component) : null;
        this.excelService.toggleLoading(true);
        this.zone.runOutsideAngular(() => {
            if (result && isObservable(result.data)) {
                this.dataSubscription = result.data.pipe(take(1)).subscribe((data) => {
                    this.dataSubscription = null;
                    this.exportData(component, {
                        data: data,
                        fetchChildren: result.fetchChildren,
                        hasChildren: result.hasChildren
                    });
                });
            }
            else {
                // allow the loading to be shown
                setTimeout(() => {
                    this.exportData(component, result);
                });
            }
        });
    }
    exportData(component, result) {
        const expandState = this.expandAll ? expandAllState : component.childExpandStateService;
        const view = result ? new ViewCollection(() => Object.assign({
            idGetter: item => item
        }, result), expandState, editState) : this.componentView(component);
        const loaded = new Subject();
        loaded.subscribe(() => {
            const hierarchy = hierarchyData(view);
            const options = workbookOptions({
                columns: this.columns.length ? this.columns : componentColumns(component),
                data: hierarchy.data,
                aggregates: hierarchy.aggregates,
                filterable: this.filterable,
                creator: this.creator,
                date: this.date,
                rtl: this.localization.rtl,
                collapsible: this.collapsible,
                hierarchy: hierarchy,
                paddingCellOptions: this.paddingCellOptions
            });
            const args = new ExcelExportEvent(options);
            if (hasObservers(component.excelExport)) {
                this.zone.run(() => {
                    component.excelExport.emit(args);
                });
            }
            this.excelService.toggleLoading(false);
            if (!args.isDefaultPrevented()) {
                this.saveFile(options);
            }
        });
        loadView(view, loaded);
    }
    saveFile(options) {
        toDataURL(options).then((dataURL) => {
            saveAs(dataURL, this.fileName, {
                forceProxy: this.forceProxy,
                proxyURL: this.proxyURL
            });
        });
    }
    componentView(component) {
        const expandState = !this.expandAll || (!this.allPages && component.pageable) ? component.childExpandStateService : expandAllState;
        const excelView = new ViewCollection(() => Object.assign(component.viewFieldAccessor(), {
            pageable: !this.allPages,
            skip: this.allPages ? 0 : component.skip
        }), expandState, editState);
        excelView.loaded = new Map(component.view.loaded);
        return excelView;
    }
}
ExcelComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-excel',
                template: ``
            },] },
];
/** @nocollapse */
ExcelComponent.ctorParameters = () => [
    { type: ExcelService },
    { type: LocalizationService },
    { type: NgZone }
];
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
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };
