/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, QueryList, ViewChild, isDevMode, NgZone, ViewChildren, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ZoneAwareEventEmitter } from './common/event-emitter';
import { FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { map, tap, take, filter, switchMap, takeUntil } from 'rxjs/operators';
import { ColumnComponent, isColumnComponent } from './columns/column.component';
import { isSpanColumnComponent } from './columns/span-column.component';
import { isColumnGroupComponent, ColumnGroupComponent } from './columns/column-group.component';
import { DetailTemplateDirective } from './rendering/details/detail-template.directive';
import { isArray, anyChanged, isChanged, isPresent, isUniversal, observe, isTruthy, createPromise, hasObservers } from './utils';
import { BrowserSupportService } from './layout/browser-support.service';
import { DataResultIterator, DataCollection } from './data/data.collection';
import { SelectionService } from './selection/selection.service';
import { Selection } from "./selection/selection-default";
import { EditService } from './editing/edit.service';
import { DetailsService } from './rendering/details/details.service';
import { GroupsService } from './grouping/groups.service';
import { ColumnsContainer } from './columns/columns-container';
import { GroupInfoService } from './grouping/group-info.service';
import { ChangeNotificationService } from './data/change-notification.service';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { ColumnBase } from './columns/column-base';
import { syncRowsHeight } from './layout/row-sync';
import { CELL_CONTEXT, EMPTY_CELL_CONTEXT } from './rendering/common/cell-context';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { FilterService } from './filtering/filter.service';
import { PagerTemplateDirective } from './pager/pager-template.directive';
import { PagerContextService } from "./pager/pager-context.service";
import { PDFService } from './pdf/pdf.service';
import { PDFExportEvent } from './pdf/pdf-export-event';
import { SuspendService } from './scrolling/suspend.service';
import { ResponsiveService } from "./layout/responsive.service";
import { ExcelService } from './excel/excel.service';
import { ColumnList } from './columns/column-list';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { expandColumns, expandColumnsWithSpan, isValidFieldName } from "./columns/column-common";
import { ScrollSyncService } from "./scrolling/scroll-sync.service";
import { ResizeService } from "./layout/resize.service";
import { closest, matchesClasses, matchesNodeName } from './rendering/common/dom-queries';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { DomEventsService } from './common/dom-events.service';
import { ColumnResizingService } from "./column-resizing/column-resizing.service";
import { hasFilterRow } from './filtering/filterable';
import { SinglePopupService } from './common/single-popup.service';
import { DragAndDropService } from './dragdrop/drag-and-drop.service';
import { DragHintService } from './dragdrop/drag-hint.service';
import { DropCueService } from './dragdrop/drop-cue.service';
import { ColumnReorderService } from './dragdrop/column-reorder.service';
import { ColumnReorderEvent } from './dragdrop/column-reorder-event';
import { FocusRoot } from './navigation/focus-root';
import { NavigationService } from './navigation/navigation.service';
import { NavigationMetadata } from './navigation/navigation-metadata';
import { IdService } from './common/id.service';
import { ColumnInfoService } from "./common/column-info.service";
import { ScrollRequestService } from './scrolling/scroll-request.service';
import { SortService } from './common/sort.service';
import { ColumnMenuTemplateDirective } from './column-menu/column-menu-template.directive';
import { ColumnVisibilityChangeEvent } from './column-menu/column-visibility-change-event';
import { ColumnLockedChangeEvent } from './column-menu/column-locked-change-event';
import { GROUP_CELL_WIDTH } from './constants';
import { sortColumns } from './columns/column-common';
import { defaultTrackBy } from './common/default-track-by';
import { CellSelectionService } from './selection/cell-selection.service';
var createControl = function (source) { return function (acc, key) {
    acc[key] = new FormControl(source[key]);
    return acc;
}; };
var ɵ0 = createControl;
var validateColumnsField = function (columns) {
    return expandColumns(columns.toArray())
        .filter(isColumnComponent)
        .filter(function (_a) {
        var field = _a.field;
        return !isValidFieldName(field);
    })
        .forEach(function (_a) {
        var field = _a.field;
        return console.warn("\n                Grid column field name '" + field + "' does not look like a valid JavaScript identifier.\n                Identifiers can contain only alphanumeric characters (including \"$\" or \"_\"), and may not start with a digit.\n                Please use only valid identifier names to ensure error-free operation.\n            ");
    });
};
var ɵ1 = validateColumnsField;
var handleExpandCollapseService = function (service, expandEmitter, collapseEmitter, map) { return (service.changes.pipe(filter(function (_a) {
    var dataItem = _a.dataItem;
    return isPresent(dataItem);
}))
    .subscribe(function (x) { return x.expand ? expandEmitter.emit(map(x)) : collapseEmitter.emit(map(x)); })); };
var ɵ2 = handleExpandCollapseService;
var isInEditedCell = function (element, gridElement) {
    return closest(element, matchesClasses('k-grid-edit-cell')) &&
        closest(element, matchesNodeName('kendo-grid')) === gridElement;
};
var ɵ3 = isInEditedCell;
var ɵ4 = EMPTY_CELL_CONTEXT;
/**
 * Represents the Kendo UI Grid component for Angular.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *        </kendo-grid>
 *    `
 * })
 * class AppComponent {
 *    public gridData: any[] = products;
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 * ```
 */
var GridComponent = /** @class */ (function () {
    function GridComponent(supportService, selectionService, cellSelectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, localization) {
        var _this = this;
        this.supportService = supportService;
        this.selectionService = selectionService;
        this.cellSelectionService = cellSelectionService;
        this.wrapper = wrapper;
        this.groupInfoService = groupInfoService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.detailsService = detailsService;
        this.editService = editService;
        this.filterService = filterService;
        this.pdfService = pdfService;
        this.responsiveService = responsiveService;
        this.renderer = renderer;
        this.excelService = excelService;
        this.ngZone = ngZone;
        this.scrollSyncService = scrollSyncService;
        this.domEvents = domEvents;
        this.columnResizingService = columnResizingService;
        this.changeDetectorRef = changeDetectorRef;
        this.columnReorderService = columnReorderService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.sortService = sortService;
        this.scrollRequestService = scrollRequestService;
        /**
         * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count
         * ([more information and example]({% slug databinding_grid %})).
         */
        this.data = [];
        /**
         * Defines the scroll mode used by the Grid.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
         *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
         */
        this.scrollable = 'scrollable';
        /**
         * Enables the single-row [selection]({% slug selection_grid %}) of the Grid.
         */
        this.selectable = false;
        /**
         * A function that defines how to track changes for the data rows.
         *
         * By default, the Grid tracks changes by the index of the data item.
         * Edited rows are tracked by reference.
         * In some cases, you might need to override the default behavior,
         * for example, when you implement editing with immutable data items.
         *
         * The following example demonstrates how to track items only by index.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { GridItem } from '@progress/kendo-angular-grid';
         *
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-grid [data]="gridData" [trackBy]="trackBy">
         *        </kendo-grid>
         *    `
         * })
         * class AppComponent {
         *    public gridData: any[] = products;
         *
         *    public trackBy(index: number, item: GridItem): any {
         *        console.log(item);
         *        return index;
         *    }
         * }
         *
         * const products = [{
         *    "ProductID": 1,
         *    "ProductName": "Chai",
         *    "UnitPrice": 18.0000,
         *    "Discontinued": true
         *  }, {
         *    "ProductID": 2,
         *    "ProductName": "Chang",
         *    "UnitPrice": 19.0000,
         *    "Discontinued": false
         *  }
         * ];
         * ```
         */
        this.trackBy = defaultTrackBy;
        /**
         * If set to `true`, the grid will render only the columns in the current viewport.
         */
        this.virtualColumns = false;
        /**
         * Enables the [filtering]({% slug filtering_grid %}) of the Grid columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_grid %}) of the Grid columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the Grid ([see example]({% slug paging_grid %})).
         *
         * The available options are:
         * - `buttonCount: Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
         * - `info: Boolean`&mdash;Toggles the information about the current page and the total number of records.
         * - `type: PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
         * - `pageSizes: Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
         * - `previousNext: Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
         */
        this.pageable = false;
        /**
         * If set to `true`, the user can group the Grid by dragging the column header cells.
         * By default, grouping is disabled ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupable = false;
        /**
         * If set to `true`, the user can use dedicated shortcuts to interact with the Grid.
         * By default, navigation is disabled and the Grid content is accessible in the normal tab sequence.
         */
        this.navigable = false;
        /**
         * Indicates whether the Grid columns will be resized during initialization so that
         * they fit their headers and row content. Defaults to `false`.
         * Columns with `autoSize` set to `false` are excluded.
         * To dynamically update the column width to match the new content,
         * refer to [this example]({% slug resizing_columns_grid %}).
         */
        this.autoSize = false;
        /**
         * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
         * ([see example]({% slug resizing_columns_grid %})).
         *
         * @default false
         */
        this.resizable = false;
        /**
         * If set to `true`, the user can reorder columns by dragging their header cells
         * ([see example]({% slug reordering_columns_grid %})).
         *
         * @default false
         */
        this.reorderable = false;
        /**
         * Specifies if the loading indicator of the Grid will be displayed ([see example]({% slug databinding_grid %})).
         *
         * @default false
         */
        this.loading = false;
        /**
         * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_grid %})).
         *
         * @default false
         */
        this.columnMenu = false;
        /**
         * Specifies if the header of the grid will be hidden. The header is visible by default.
         *
         * > The header includes column headers and the [filter row]({% slug filtering_grid %}#toc-filter-row).
         */
        this.hideHeader = false;
        /**
         * Fires when the Grid filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires when the page of the Grid is changed ([see example]({% slug paging_grid %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new EventEmitter();
        /**
         * Fires when the grouping of the Grid is changed.
         * You have to handle the event yourself and group the data ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupChange = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the sorting of the Grid is changed ([see example]({% slug sorting_grid %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new EventEmitter();
        /**
         * Fires when the user selects a Grid row.
         * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent %}#toc-selectionchange).
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when the data state of the Grid is changed.
         */
        this.dataStateChange = new EventEmitter();
        /**
         * Fires when the user expands a group header.
         */
        this.groupExpand = new EventEmitter();
        /**
         * Fires when the user collapses a group header.
         */
        this.groupCollapse = new EventEmitter();
        /**
         * Fires when the user expands a master row.
         */
        this.detailExpand = new EventEmitter();
        /**
         * Fires when the user collapses a master row.
         */
        this.detailCollapse = new EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
         */
        this.edit = new EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-saving-records)).
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-removing-records)).
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
         */
        this.add = new EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClose = new EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClick = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user clicks the **Export to PDF** command button.
         */
        this.pdfExport = new EventEmitter();
        /**
         * Fires when the user clicks the **Export to Excel** command button.
         */
        this.excelExport = new EventEmitter();
        /**
         * Fires when the user completes the resizing of the column.
         */
        this.columnResize = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user completes the reordering of the column.
         */
        this.columnReorder = new EventEmitter();
        /**
         * Fires when the user changes the visibility of the columns from the column menu or column chooser.
         */
        this.columnVisibilityChange = new EventEmitter();
        /**
         * Fires when the user changes the locked state of the columns from the column menu or by reordering the columns.
         */
        this.columnLockedChange = new EventEmitter();
        /**
         * Fires when the user scrolls to the last record on the page and enables endless scrolling
         * ([see example]({% slug scrollmmodes_grid %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new EventEmitter();
        /**
         * Fires when the grid content is scrolled.
         * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
         */
        this.contentScroll = new EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new QueryList();
        this.footer = new QueryList();
        this.selectionDirective = false;
        this.columnsContainer = new ColumnsContainer(function () { return _this.columnList.filterHierarchy(function (column) {
            column.matchesMedia = _this.matchesMedia(column);
            return column.isVisible;
        }); });
        this.view = new DataCollection(function () { return new DataResultIterator(_this.data, _this.skip, _this.hasGroupFooters); });
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this._cellSelected = null;
        this.rtl = false;
        this._rowClass = function () { return null; };
        this.localizationSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
        this.groupInfoService.registerColumnsContainer(function () { return _this.columnList; });
        this.columnInfoService.init(this.columnsContainer, function () { return _this.columnList; });
        this.columnVisibilityChangeSubscription = this.columnInfoService.visibilityChange.subscribe(function (changed) {
            _this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
        });
        this.columnLockedChangeSubscription = this.columnInfoService.lockedChange.subscribe(function (changed) {
            _this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
        });
        this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, function (_a) {
            var group = _a.dataItem, index = _a.index;
            return ({ group: group, groupIndex: index });
        });
        this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, function (args) { return args; });
        this.filterSubscription = this.filterService.changes.subscribe(function (x) {
            _this.filterChange.emit(x);
        });
        this.sortSubscription = this.sortService.changes.subscribe(function (x) {
            _this.sortChange.emit(x);
        });
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
        this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
        this.columnsContainerChange();
        this.handleColumnResize();
        this.columnList = new ColumnList(this.columns);
        this.columnReorderSubscription = this.columnReorderService
            .changes.subscribe(this.reorder.bind(this));
        this.columnRangeChangeSubscription = this.columnInfoService.columnRangeChange.subscribe(this.onColumnRangeChange.bind(this));
    }
    Object.defineProperty(GridComponent.prototype, "skip", {
        /**
         * Defines the number of records to be skipped by the pager.
         * Required by the [paging]({% slug paging_grid %}) functionality.
         */
        get: function () {
            return this._skip;
        },
        set: function (value) {
            if (value >= 0) {
                this._skip = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        /**
         * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
         */
        set: function (value) {
            if (isArray(value)) {
                this._sort = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "group", {
        /**
         */
        get: function () {
            return this._group;
        },
        /**
         * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
         */
        set: function (value) {
            if (isArray(value)) {
                this._group = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showTopToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showBottomToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showPager", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isVirtual && this.pageable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupPanel", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable && this.groupable.enabled !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "groupableEmptyText", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable.emptyText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "marqueeSelection", {
        /**
         * @hidden
         */
        get: function () {
            return this.selectionService.enableMarquee || this.cellSelectionService.enableMarquee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "navigatable", {
        /**
         * @hidden
         */
        get: function () {
            return this.navigable;
        },
        /**
         * @hidden
         *
         * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
         */
        set: function (value) {
            this.navigable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowClass", {
        get: function () {
            return this._rowClass;
        },
        /**
         * Defines a function that is executed for every data row in the component.
         *
         * @example
         * ```ts
         * import { Component, ViewEncapsulation } from '@angular/core';
         * import { RowClassArgs } from '@progress/kendo-angular-grid';
         *
         * _@Component({
         *    selector: 'my-app',
         *    encapsulation: ViewEncapsulation.None,
         *    styles: [`
         *        .k-grid tr.even { background-color: #f45c42; }
         *        .k-grid tr.odd { background-color: #41f4df; }
         *    `],
         *    template: `
         *        <kendo-grid [data]="gridData" [rowClass]="rowCallback">
         *        </kendo-grid>
         *    `
         * })
         * class AppComponent {
         *    public gridData: any[] = products;
         *
         *    public rowCallback(context: RowClassArgs) {
         *        const isEven = context.index % 2 == 0;
         *        return {
         *            even: isEven,
         *            odd: !isEven
         *        };
         *    }
         * }
         *
         * const products = [{
         *    "ProductID": 1,
         *    "ProductName": "Chai",
         *    "UnitPrice": 18.0000,
         *    "Discontinued": true
         *  }, {
         *    "ProductID": 2,
         *    "ProductName": "Chang",
         *    "UnitPrice": 19.0000,
         *    "Discontinued": false
         *  }
         * ];
         * ```
         */
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowClass = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowSelected", {
        get: function () {
            return this._rowSelected;
        },
        /**
         * Defines a Boolean function that is executed for each data row in the component
         * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
         * Determines whether the row will be selected.
         */
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("rowSelected must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowSelected = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "cellSelected", {
        get: function () {
            return this._cellSelected;
        },
        /**
         * Defines a function that determines the selected state of a data cell.
         * Returns an object with `selected` and `item` properties.
         * The cell is marked as selected only if the `selected` property equals `true`.
         *
         * The function is executed for each data cell and may be called more than once
         * as part of a change detection cycle. ([see example]({% slug grid_selection_custom %}toc-setting-the-selected-cells))
         */
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("cellSelected must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._cellSelected = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeCell", {
        /**
         * Returns the currently focused cell (if any).
         */
        get: function () {
            return this.navigationService.activeCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeRow", {
        /**
         * Returns the currently focused row (if any).
         */
        get: function () {
            return this.navigationService.activeRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedClasses", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "virtualClasses", {
        get: function () {
            return this.isVirtual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noScrollbarClass", {
        get: function () {
            return this.scrollbarWidth === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "detailTemplate", {
        get: function () {
            if (this._customDetailTemplate) {
                return this._customDetailTemplate;
            }
            return this.detailTemplateChildren ? this.detailTemplateChildren.first : undefined;
        },
        set: function (detailTemplate) {
            this._customDetailTemplate = detailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noRecordsTemplate", {
        get: function () {
            if (this._customNoRecordsTemplate) {
                return this._customNoRecordsTemplate;
            }
            return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
        },
        set: function (customNoRecordsTemplate) {
            this._customNoRecordsTemplate = customNoRecordsTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "pagerTemplate", {
        get: function () {
            if (this._customPagerTemplate) {
                return this._customPagerTemplate;
            }
            return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
        },
        set: function (customPagerTemplate) {
            this._customPagerTemplate = customPagerTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "toolbarTemplate", {
        get: function () {
            if (this._customToolbarTemplate) {
                return this._customToolbarTemplate;
            }
            return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
        },
        set: function (customToolbarTemplate) {
            this._customToolbarTemplate = customToolbarTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "scrollbarWidth", {
        get: function () {
            return this.supportService.scrollbarWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerPadding", {
        get: function () {
            if (isUniversal()) {
                return "";
            }
            var padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
            var right = this.rtl ? 0 : padding;
            var left = this.rtl ? padding : 0;
            return "0 " + right + " 0 " + left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hasGroupFooters", {
        get: function () {
            return this.columnsContainer.hasGroupFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showFooter", {
        get: function () {
            return this.columnsContainer.hasFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupFooters", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaRowCount", {
        get: function () {
            return this.totalColumnLevels + 1 + this.view.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaColCount", {
        get: function () {
            return this.columnsContainer.leafColumnsToRender.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isVirtual", {
        get: function () {
            return this.scrollable === 'virtual';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isScrollable", {
        get: function () {
            return this.scrollable !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "visibleColumns", {
        get: function () {
            return this.columnsContainer.allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedColumns", {
        get: function () {
            return this.columnsContainer.lockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedColumns", {
        get: function () {
            return this.columnsContainer.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "leafColumns", {
        get: function () {
            return this.columnsContainer.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalColumnLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerLeafColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.leafViewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.group.length * GROUP_CELL_WIDTH;
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedWidth", {
        get: function () {
            if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
                return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                    this.leafViewportColumns.reduce(function (acc, column) { return acc + (column.width || 0); }, 0);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "selectableSettings", {
        get: function () {
            if (this.selectionService) {
                return this.selectionService.options;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "columnMenuTemplate", {
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalCount", {
        get: function () {
            if (this.isVirtual || !isPresent(this.pageSize)) {
                return this.view.total;
            }
            return this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Expands the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * This method is provided only for backwards-compatibility with legacy versions.
     * These versions tracked the expanded state internally using the data row index.
     *
     * For new development, use the [`kendoGridDetailsExpandBy` directive]({% slug api_grid_expanddetailsdirective %})
     * or provide an isDetailExpanded callback. See [Controlling the Expanded State]({% slug master_detail_expanded_state_grid %})
     * for examples on how to control the expanded state.
     *
     * @param index - The data row index of the master row.
     */
    GridComponent.prototype.expandRow = function (index) {
        this.toggleDetailRowLegacy(index, true);
    };
    /**
     * Collapses the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * This method is provided only for backwards-compatibility with legacy versions.
     * These versions tracked the expanded state internally using the data row index.
     *
     * For new development, use the [`kendoGridDetailsExpandBy` directive]({% slug api_grid_expanddetailsdirective %})
     * or provide an isDetailExpanded callback. See [Controlling the Expanded State]({% slug master_detail_expanded_state_grid %})
     * for examples on how to control the expanded state.
     *
     * @param index - The data row index of the master row.
     */
    GridComponent.prototype.collapseRow = function (index) {
        this.toggleDetailRowLegacy(index, false);
    };
    /**
     * Expands a group header item for the given index. For example,
     * `0_1` expands the second inner group of the first master group.
     *
     * > * When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `expandGroup` method is not supported.
     * > * When a Grid is pageable, the indexes of the groups are offset by the current Grid [`skip`]({% slug api_grid_gridcomponent %}#toc-skip).
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.expandGroup = function (index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * Collapses a group header item for the given index. For example,
     * `0_1` collapses the second inner group of the first master group.
     *
     * > * When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `collapseGroup` method is not supported.
     * > * When a Grid is pageable, the indexes of the groups are offset by the current Grid [`skip`]({% slug api_grid_gridcomponent %}#toc-skip).
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.collapseGroup = function (index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.resetGroupsState = function () {
        this.groupsService.reset();
    };
    /**
     * @hidden
     */
    GridComponent.prototype.expandGroupChildren = function (groupIndex) {
        this.groupsService.expandChildren(groupIndex);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.onDataChange = function () {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        if (isPresent(this.defaultSelection)) {
            this.defaultSelection.reset();
        }
        this.initSelectionService();
        this.updateNavigationMetadata();
    };
    GridComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (isChanged("data", changes)) {
            this.onDataChange();
        }
        if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
            this.changeNotification.notify();
        }
        if (anyChanged(["pageSize", "scrollable", 'virtualColumns'], changes)) {
            this.updateNavigationMetadata();
        }
        if (isChanged("virtualColumns", changes)) {
            this.viewportColumns = this.leafViewportColumns = null;
        }
        if (isChanged("height", changes, false)) {
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', this.height + "px");
        }
        if (isChanged("filterable", changes) && this.lockedColumns.length) {
            this.syncHeaderHeight(this.ngZone.onStable.asObservable().pipe(take(1)));
        }
        if (anyChanged(["columnMenu", "sortable", "filterable"], changes, false)) {
            this.columnMenuOptions = this.columnMenu && Object.assign({
                filter: Boolean(this.filterable),
                sort: Boolean(this.sortable)
            }, this.columnMenu); // tslint:disable-line:align
        }
        if (isChanged("scrollable", changes) && this.isScrollable) {
            this.ngZone.onStable.pipe(take(1)).subscribe(function () { return _this.attachScrollSync(); });
        }
        if (isChanged("selectable", changes) && this.shouldResetSelection(changes.selectable)) {
            if (this.defaultSelection) {
                this.defaultSelection.reset();
            }
            else if (this.selectionDirective) {
                this.selectionDirective.reset();
            }
        }
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    };
    GridComponent.prototype.ngAfterContentChecked = function () {
        this.columnsContainer.refresh();
        this.verifySettings();
        this.initSelectionService();
    };
    GridComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(function () { return _this.verifySettings(); });
    };
    GridComponent.prototype.ngOnInit = function () {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    };
    GridComponent.prototype.ngOnDestroy = function () {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.groupExpandCollapseSubscription) {
            this.groupExpandCollapseSubscription.unsubscribe();
        }
        if (this.detailsServiceSubscription) {
            this.detailsServiceSubscription.unsubscribe();
        }
        if (this.editServiceSubscription) {
            this.editServiceSubscription.unsubscribe();
        }
        if (this.pdfSubscription) {
            this.pdfSubscription.unsubscribe();
        }
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }
        if (this.columnsChangeSubscription) {
            this.columnsChangeSubscription.unsubscribe();
        }
        if (this.excelSubscription) {
            this.excelSubscription.unsubscribe();
        }
        if (this.columnsContainerChangeSubscription) {
            this.columnsContainerChangeSubscription.unsubscribe();
        }
        if (this.scrollSyncService) {
            this.scrollSyncService.destroy();
        }
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.defaultSelection) {
            this.defaultSelection.destroy();
        }
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
        }
        if (this.footerChangeSubscription) {
            this.footerChangeSubscription.unsubscribe();
        }
        this.ngZone = null;
        if (this.columnResizingSubscription) {
            this.columnResizingSubscription.unsubscribe();
        }
        if (this.columnReorderSubscription) {
            this.columnReorderSubscription.unsubscribe();
        }
        if (this.localizationSubscription) {
            this.localizationSubscription.unsubscribe();
        }
        if (this.columnVisibilityChangeSubscription) {
            this.columnVisibilityChangeSubscription.unsubscribe();
        }
        if (this.columnLockedChangeSubscription) {
            this.columnLockedChangeSubscription.unsubscribe();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.columnRangeChangeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    GridComponent.prototype.attachScrollSync = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.footerChangeSubscription = observe(this.footer)
                .subscribe(function (footers) {
                return footers
                    .map(function (footer) { return footer.nativeElement; })
                    .filter(isPresent)
                    .forEach(function (element) {
                    return _this.scrollSyncService.registerEmitter(element, "footer");
                });
            });
        }
    };
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param rowIndex - The data row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options configuring the focus target once the editor opens.
     */
    GridComponent.prototype.editRow = function (rowIndex, group, options) {
        this.editService.editRow(rowIndex, group);
        if (isPresent(options) && options.skipFocus) {
            return;
        }
        var row = "tr[data-kendo-grid-item-index=\"" + rowIndex + "\"]";
        var columnIndex = options && options.columnIndex;
        var target = isNaN(columnIndex) ? row : row + " td[data-kendo-grid-column-index=\"" + columnIndex + "\"]";
        this.focusEditElement(target);
    };
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    GridComponent.prototype.closeRow = function (index) {
        this.editService.close(index);
    };
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    GridComponent.prototype.addRow = function (group) {
        var isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            var fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(group);
        this.focusEditElement('.k-grid-add-row');
    };
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The data row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    GridComponent.prototype.editCell = function (rowIndex, column, group) {
        var instance = this.columnInstance(column);
        this.editService.editCell(rowIndex, instance, group);
        this.focusEditElement('.k-grid-edit-cell');
    };
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
     */
    GridComponent.prototype.closeCell = function () {
        return !this.editService.closeCell();
    };
    /**
     * Closes the current cell in edit mode.
     */
    GridComponent.prototype.cancelCell = function () {
        this.editService.cancelCell();
    };
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    GridComponent.prototype.isEditing = function () {
        return this.editService.isEditing();
    };
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    GridComponent.prototype.isEditingCell = function () {
        return this.editService.isEditingCell();
    };
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    GridComponent.prototype.saveAsPDF = function () {
        this.pdfService.save(this);
    };
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    GridComponent.prototype.drawPDF = function () {
        var promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    };
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    GridComponent.prototype.saveAsExcel = function () {
        this.excelService.save(this);
    };
    /**
     * Applies the minimum possible width for the specified column,
     * so that the whole text fits without wrapping. This method expects the Grid
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the Grid is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [resizable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button" (click)="grid.autoFitColumn(groupColumn)">
     *                     Auto-fit the group column
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    [minResizableWidth]="30"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                filter="numeric"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    GridComponent.prototype.autoFitColumn = function (column) {
        this.columnResizingService.autoFit(column);
    };
    /**
     * Adjusts the width of the specified columns to fit the entire content, including headers, without wrapping.
     * If no columns are specified, `autoFitColumns` is applied to all columns.
     *
     * This method requires the Grid to be resizable (set `resizable` to `true`).
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *      <kendo-grid
     *          #grid
     *          [data]="gridData"
     *          [resizable]="true"
     *          style="height: 300px">
     *          <ng-template kendoGridToolbarTemplate>
     *              <button class="k-button" (click)="grid.autoFitColumns([firstColumn, lastColumn])">
     *                  Auto-fit the first and last column
     *              </button>
     *              <button class="k-button" (click)="grid.autoFitColumns()">
     *                  Auto-fit all columns
     *              </button>
     *          </ng-template>
     *          <kendo-grid-column-group title="Product Info">
     *              <kendo-grid-column
     *                  #firstColumn
     *                  field="ProductID"
     *                  [width]="50"
     *                  [minResizableWidth]="30"
     *                  title="ID">
     *              </kendo-grid-column>
     *
     *              <kendo-grid-column
     *                  field="ProductName"
     *                  title="Product Name"
     *                  >
     *              </kendo-grid-column>
     *          </kendo-grid-column-group>
     *
     *          <kendo-grid-column
     *              #lastColumn
     *              field="UnitPrice"
     *              title="Unit Price"
     *              [width]="180"
     *              filter="numeric"
     *              format="{0:c}">
     *          </kendo-grid-column>
     *      </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    GridComponent.prototype.autoFitColumns = function (columns) {
        if (columns === void 0) { columns = this.columns; }
        var _a;
        var cols;
        if (columns instanceof QueryList) {
            cols = columns.toArray();
        }
        else {
            cols = columns;
        }
        (_a = this.columnResizingService).autoFit.apply(_a, cols);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyPageChange = function (source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyScrollBottom = function () {
        var _this = this;
        if (this.scrollable === 'none') {
            return;
        }
        if (hasObservers(this.scrollBottom)) {
            this.ngZone.run(function () { return _this.scrollBottom.emit({ sender: _this }); });
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.focusEditElement = function (containerSelector) {
        var _this = this;
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(function () {
            _this.focusElementSubscription = _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                var wrapper = _this.wrapper.nativeElement;
                if (!_this.setEditFocus(wrapper.querySelector(containerSelector)) && _this.isLocked) {
                    _this.setEditFocus(wrapper.querySelector(".k-grid-content " + containerSelector));
                }
                _this.focusElementSubscription = null;
            });
        });
    };
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    GridComponent.prototype.focus = function () {
        this.assertNavigable();
        return this.navigationService.focusCell();
    };
    /**
     * Focuses the cell with the specified row and column index.
     *
     * The row index is based on the logical structure of the Grid and does not correspond to the data item index:
     * * Header rows are included, starting at index 0.
     * * Group headers and footers are included.
     * * The row indexing is absolute and does not change with paging.
     *
     * If the Grid is configured for scrolling, including virtual scrolling, the scroll position will be updated.
     * If the row is not present on the current page, the method will have no effect.
     *
     * @param rowIndex - The logical row index to focus. The top header row has an index 0.
     * @param colIndex - The column index to focus.
     * @returns {NavigationCell} The focused cell.
     *
     */
    GridComponent.prototype.focusCell = function (rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    };
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    GridComponent.prototype.focusNextCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    };
    /**
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    GridComponent.prototype.focusPrevCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    };
    /**
     * Scrolls to the specified row and column
     */
    GridComponent.prototype.scrollTo = function (request) {
        this.scrollRequestService.scrollTo(request);
    };
    /**
     * Changes the position of the specified column.
     * The reordering of columns operates only on the level
     * which is inferred by the source column.
     * For the `reorderColumn` method to work properly,
     * the `source` column has to be visible.
     *
     * @param {ColumnBase} source - The column whose position will be changed.
     * @param {number} destIndex - The new position of the column.
     * @param {ColumnReorderConfig} options - Additional options.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [reorderable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button"
     *                     (click)="grid.reorderColumn(groupColumn, 2, { before: true })">
     *                     Move the group column before the last one.
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *
     *            <kendo-grid-column
     *                field="Discontinued"
     *                title="Discontinued"
     *                [width]="100">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    GridComponent.prototype.reorderColumn = function (source, destIndex, options) {
        if (options === void 0) { options = { before: false }; }
        var columnsForLevel = this.columnsForLevel(source.level);
        var target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        var lastNonLocked = target.isLocked &&
            !source.isLocked &&
            this.columnsContainer.nonLockedColumns.length === 1;
        if (lastNonLocked) {
            return;
        }
        if (isSpanColumnComponent(target) && !options.before) {
            target = target.childColumns.last;
        }
        this.reorder({
            before: options.before,
            source: source,
            target: target
        });
    };
    Object.defineProperty(GridComponent.prototype, "isDetailExpanded", {
        get: function () {
            return this.detailsService.userCallback;
        },
        /**
         * A function which determines if a specific row is expanded.
         */
        set: function (callback) {
            this.detailsService.userCallback = callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    GridComponent.prototype.reorder = function (_a) {
        var _this = this;
        var target = _a.target, source = _a.source, before = _a.before, changeContainer = _a.changeContainer;
        this.ngZone.run(function () {
            var columnsForLevel = _this.columnsForLevel(source.level);
            var newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            var oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            var args = new ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            _this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                _this.columnLockedChange.emit(new ColumnLockedChangeEvent([source]));
            }
            _this.updateColumnIndices({ source: source, target: target, before: before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            _this.columnsContainer.refresh();
            _this.changeDetectorRef.markForCheck();
        });
    };
    GridComponent.prototype.updateColumnIndices = function (_a) {
        var source = _a.source, target = _a.target, before = _a.before;
        var expandedColumns = expandColumnsWithSpan(this.columnsForLevel(source.level));
        var sourceColumnIndex = expandedColumns.indexOf(source);
        var nextSourceIndex = 0;
        var nextIndex = 0;
        var toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        var i = 0;
        while (i < expandedColumns.length) {
            var column = expandedColumns[i];
            if (column === target) {
                nextSourceIndex = before ? nextIndex : nextIndex + 1;
                nextIndex = before ? nextIndex + toSkip : nextIndex;
                column.orderIndex = nextIndex;
                if (nextSourceIndex === nextIndex + 1) {
                    nextIndex += toSkip;
                }
            }
            else if (column === source) {
                i += toSkip;
                continue;
            }
            else {
                column.orderIndex = nextIndex;
            }
            nextIndex++;
            i++;
        }
        for (i = sourceColumnIndex; i < sourceColumnIndex + toSkip; i++) {
            expandedColumns[i].orderIndex = nextSourceIndex++;
        }
        this.updateIndicesForLevel(source.level + 1);
    };
    GridComponent.prototype.updateIndicesForLevel = function (level) {
        var colsForParentLevel = this.columnsForLevel(level - 1);
        var colsForLevel = [];
        sortColumns(colsForParentLevel).forEach(function (c) {
            if (c.isColumnGroup) {
                colsForLevel.push.apply(colsForLevel, c.childrenArray.sort(function (a, b) { return a.orderIndex - b.orderIndex; }));
            }
        });
        expandColumnsWithSpan(colsForLevel).map(function (c, i) { return c.orderIndex = i; });
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    };
    GridComponent.prototype.columnsForLevel = function (level) {
        return this.columnsContainer
            .allColumns.filter(function (column) { return column.level === level; });
    };
    GridComponent.prototype.initSelectionService = function () {
        var _this = this;
        if (!this.selectable) {
            this.selectionService.ngOnDestroy();
            this.cellSelectionService.ngOnDestroy();
            return;
        }
        if (!this.selectionDirective && !isPresent(this.defaultSelection)) {
            this.defaultSelection = new Selection(this, this.changeDetectorRef);
        }
        var cellSelectionMode = this.selectable['cell'];
        var activeService = cellSelectionMode ? this.cellSelectionService : this.selectionService;
        var inactiveService = cellSelectionMode ? this.selectionService : this.cellSelectionService;
        if (inactiveService.active) {
            inactiveService.ngOnDestroy();
            activeService.addSubscriptions();
            inactiveService.active = false;
        }
        activeService.active = true;
        activeService.init({
            cellSelected: cellSelectionMode ? this.cellSelected : undefined,
            rowSelected: cellSelectionMode ? undefined : this.rowSelected,
            selectable: this.selectable,
            view: this.view,
            columns: cellSelectionMode ? this.columnList.toArray() : undefined
        });
        if (!this.selectionDirective && !this.selectableSettings.enabled) {
            this.defaultSelection.reset();
        }
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (cellSelectionMode) {
            this.selectionSubscription = this.cellSelectionService.changes.subscribe(function (event) {
                _this.ngZone.run(function () { return _this.selectionChange.emit(event); });
            });
        }
        else {
            this.selectionSubscription = this.selectionService.changes.subscribe(function (event) {
                _this.ngZone.run(function () { return _this.selectionChange.emit(event); });
            });
        }
    };
    GridComponent.prototype.setEditFocus = function (element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    };
    GridComponent.prototype.columnInstance = function (column) {
        var instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter(function (item) { return item.field === column; })[0];
        }
        else {
            instance = column;
        }
        if (!instance && isDevMode()) {
            throw new Error("Invalid column " + column);
        }
        return instance;
    };
    GridComponent.prototype.verifySettings = function () {
        if (isDevMode()) {
            var locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (locked && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported.');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(function (column) { return !column.width && !isColumnGroupComponent(column); }).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter(function (x) { return !x.hasChildren; }).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(function (x) { return x.locked && x.parent && !x.parent.isLocked; }).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings require virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    };
    GridComponent.prototype.autoGenerateColumns = function () {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(function (field) {
                var column = new ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    };
    GridComponent.prototype.attachStateChangesEmitter = function () {
        var _this = this;
        this.stateChangeSubscription =
            merge(this.pageChange.pipe(map(function (x) { return ({
                filter: _this.filter, group: _this.group, skip: x.skip, sort: _this.sort, take: x.take
            }); })), this.sortChange.pipe(map(function (sort) { return ({ filter: _this.filter, group: _this.group, skip: _this.skip, sort: sort, take: _this.pageSize }); })), this.groupChange.pipe(map(function (group) { return ({
                filter: _this.filter, group: group, skip: _this.skip, sort: _this.sort, take: _this.pageSize
            }); })), this.filterChange.pipe(map(function (filter) { return ({
                filter: filter, group: _this.group, skip: 0, sort: _this.sort, take: _this.pageSize
            }); })))
                .subscribe(function (x) {
                _this.closeCell();
                _this.cancelCell();
                _this.dataStateChange.emit(x);
            });
    };
    GridComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    };
    GridComponent.prototype.emitCRUDEvent = function (args) {
        var action = args.action, rowIndex = args.rowIndex, formGroup = args.formGroup;
        var dataItem = this.view.at(rowIndex - this.skip);
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        this.closeCell();
        Object.assign(args, {
            dataItem: dataItem,
            sender: this
        });
        switch (action) {
            case 'add':
                this.add.emit(args);
                break;
            case 'cancel':
                this.cancel.emit(args);
                break;
            case 'edit':
                this.edit.emit(args);
                break;
            case 'remove':
                this.remove.emit(args);
                break;
            case 'save':
                this.save.emit(args);
                break;
            case 'cellClose':
                this.cellClose.emit(args);
                break;
            default: break;
        }
    };
    GridComponent.prototype.attachDomEventHandlers = function () {
        var _this = this;
        this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
            _this.cellClick.emit(Object.assign({ sender: _this }, args));
        });
    };
    GridComponent.prototype.attachElementEventHandlers = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(function () {
            var resizeCheck = _this.resizeCheck.bind(_this);
            var resizeSubscription = _this.renderer.listen('window', 'resize', resizeCheck);
            var orientationSubscription = _this.renderer.listen('window', 'orientationchange', resizeCheck);
            var documentClickSubscription = _this.renderer.listen('document', 'click', function (args) {
                var activeElement = document.activeElement;
                if (_this.editService.shouldCloseCell() &&
                    !closest(args.target, matchesClasses('k-animation-container k-grid-ignore-click')) &&
                    !(activeElement &&
                        (closest(activeElement, matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, _this.wrapper.nativeElement)))) {
                    _this.editService.closeCell(args);
                }
            });
            var windowBlurSubscription = _this.renderer.listen('window', 'blur', function (args) {
                var activeElement = document.activeElement;
                if (activeElement && !(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, _this.wrapper.nativeElement))) {
                    _this.editService.closeCell(args);
                }
                _this.domEvents.windowBlur.emit(args);
            });
            var clickSubscription = _this.renderer.listen(wrapper, 'click', function (args) {
                _this.domEvents.click.emit(args);
            });
            var keydownSubscription = _this.renderer.listen(wrapper, 'keydown', function (args) {
                _this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            var focused = false;
            var focusInSubscription = _this.renderer.listen(ariaRoot, 'focusin', function (args) {
                _this.domEvents.focus.emit(args);
                if (!focused) {
                    _this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            var focusOutSubscription = _this.renderer.listen(ariaRoot, 'focusout', function (args) {
                var next = args.relatedTarget || document.activeElement;
                var outside = !closest(next, function (node) { return node === ariaRoot; });
                if (outside) {
                    _this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            _this.detachElementEventHandlers = function () {
                resizeSubscription();
                orientationSubscription();
                documentClickSubscription();
                windowBlurSubscription();
                clickSubscription();
                keydownSubscription();
                focusInSubscription();
                focusOutSubscription();
            };
        });
    };
    GridComponent.prototype.matchesMedia = function (c) {
        return this.responsiveService.matchesMedia(c.media);
    };
    GridComponent.prototype.resizeCheck = function () {
        var _this = this;
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            var hasChanges_1 = false;
            this.columnList.filterHierarchy(function (column) {
                var matchesMedia = _this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges_1 = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges_1) {
                this.ngZone.run(function () {
                    _this.changeDetectorRef.markForCheck();
                });
            }
        }
    };
    GridComponent.prototype.emitPDFExportEvent = function () {
        var args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    };
    GridComponent.prototype.syncHeaderHeight = function (observable) {
        var _this = this;
        return observable
            .pipe(filter(function () { return isPresent(_this.lockedHeader); }))
            .subscribe(function () {
            return syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
        });
    };
    GridComponent.prototype.columnsContainerChange = function () {
        var _this = this;
        this.columnsContainerChangeSubscription =
            this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(function () { return _this.lockedColumns.length > 0; }), switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); })));
    };
    GridComponent.prototype.handleColumnResize = function () {
        var _this = this;
        var resizes = this.columnResizingService.changes;
        this.columnResizingSubscription = resizes.pipe(tap(function (e) {
            if (e.type === 'start') {
                _this.renderer.addClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end') {
                _this.renderer.removeClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(function (e) { return e.type === 'start'; }), switchMap(function () {
            return resizes.pipe(
            // tslint:disable-next-line: rxjs-no-unsafe-takeuntil
            takeUntil(resizes.pipe(filter(function (e) { return e.type === 'triggerAutoFit'; }))), filter(function (e) { return e.type === 'end'; }));
        }))
            .subscribe(this.notifyResize.bind(this));
    };
    GridComponent.prototype.notifyResize = function (e) {
        var args = e.resizedColumns
            .filter(function (item) { return isTruthy(item.column.resizable) && !item.column.isColumnGroup; })
            .map(function (item) { return ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }); });
        this.columnResize.emit(args);
    };
    GridComponent.prototype.assertNavigable = function () {
        if (isDevMode() && !this.navigable) {
            throw new Error('The Grid should be configured as [navigable]="true" to control focus');
        }
    };
    GridComponent.prototype.navigationMetadata = function () {
        var isVirtual = this.isVirtual;
        var pageSize = this.pageSize;
        var dataRows = isVirtual ? this.view.total : pageSize;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        var headerRows = this.totalColumnLevels + 1 + filterRowOffset + addRowOffset;
        return new NavigationMetadata(dataRows, headerRows, isVirtual, this.showPager, isPresent(this.detailTemplate), this.wrapper, this.virtualColumns, this.columnsContainer);
    };
    GridComponent.prototype.updateNavigationMetadata = function () {
        this.navigationService.metadata = this.navigationMetadata();
    };
    GridComponent.prototype.applyAutoSize = function () {
        var _this = this;
        var cols = this.columns.filter(function (c) { return _this.autoSize ? c.autoSize !== false : c.autoSize; });
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(function (_) { return _this.autoFitColumns(cols); });
        }
    };
    GridComponent.prototype.onColumnRangeChange = function (range) {
        var viewportColumns = this.viewportColumns = [];
        var leafViewportColumns = this.columnsContainer
            .nonLockedLeafColumns.toArray().slice(range.start, range.end + 1);
        for (var idx = 0; idx < leafViewportColumns.length; idx++) {
            var column = leafViewportColumns[idx];
            while (column.parent) {
                column = column.parent;
            }
            var toAdd = [column];
            while (toAdd.length) {
                column = toAdd.shift();
                viewportColumns.push(column);
                if (column.isColumnGroup) {
                    toAdd.unshift.apply(toAdd, column.childrenArray);
                }
            }
            var lastFromGroup = viewportColumns[viewportColumns.length - 1];
            column = leafViewportColumns[idx];
            while (column !== lastFromGroup && idx < leafViewportColumns.length) {
                idx++;
                column = leafViewportColumns[idx];
            }
        }
        if (range.start > 0) {
            var first = leafViewportColumns[0];
            var offset = range.offset;
            var current = viewportColumns[0];
            var index = 0;
            while (current !== first) {
                offset -= current.isColumnGroup ? 0 : current.width;
                index++;
                current = viewportColumns[index];
            }
            if (offset > 0) {
                var totalLevels = this.columnsContainer.totalLevels;
                var previous = void 0;
                for (var idx = 0; idx <= totalLevels; idx++) {
                    var offsetColumn = idx < totalLevels ? new ColumnGroupComponent(previous) : new ColumnBase(previous);
                    previous = offsetColumn;
                    offsetColumn.title = "\u00A0";
                    offsetColumn.width = offset;
                    viewportColumns.unshift(offsetColumn);
                }
            }
        }
        this.leafViewportColumns = viewportColumns.filter(function (c) { return !c.isColumnGroup; });
    };
    GridComponent.prototype.toggleDetailRowLegacy = function (index, expand) {
        var hasCallback = typeof this.isDetailExpanded === 'function';
        if (isDevMode() && hasCallback) {
            throw new Error('The expandRow and collapseRow methods should not be called when using the ' +
                'kendoGridDetailsExpandBy directive or the isDetailExpanded callback. ' +
                'These methods are provided only for backwards compatibility with legacy versions.');
        }
        if (!isDevMode() && hasCallback) {
            return;
        }
        if (this.detailsService.isExpanded(index, null) !== expand) {
            this.detailsService.toggleRow(index, null);
        }
    };
    GridComponent.prototype.shouldResetSelection = function (selectableChanges) {
        var previousValue = selectableChanges.previousValue;
        if (!previousValue) {
            // Selection was disabled, no need to reset.
            return false;
        }
        var currentValue = selectableChanges.currentValue;
        if (!currentValue || currentValue.enabled === false) {
            // Selection disabled, reset.
            return true;
        }
        return previousValue.cell !== currentValue.cell;
    };
    GridComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'kendoGrid',
                    providers: [
                        BrowserSupportService,
                        LocalizationService,
                        ColumnInfoService,
                        SelectionService,
                        CellSelectionService,
                        DetailsService,
                        GroupsService,
                        GroupInfoService,
                        ChangeNotificationService,
                        EditService,
                        PDFService,
                        SuspendService,
                        {
                            provide: CELL_CONTEXT,
                            useValue: ɵ4
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.grid'
                        },
                        FilterService,
                        ResponsiveService,
                        PagerContextService,
                        ExcelService,
                        ScrollSyncService,
                        ResizeService,
                        LocalDataChangesService,
                        DomEventsService,
                        ColumnResizingService,
                        SinglePopupService,
                        DragAndDropService,
                        DragHintService,
                        DropCueService,
                        ColumnReorderService,
                        NavigationService,
                        FocusRoot,
                        IdService,
                        ScrollRequestService,
                        SortService
                    ],
                    selector: 'kendo-grid',
                    styles: [
                        // Styles for backwards compatibility with kendo-theme-default@v2.46.0 and earlier.
                        "   .k-grid .k-grid-aria-root {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n            overflow: hidden;\n        }\n\n        .k-grid .k-filter-row td {\n            white-space: nowrap;\n        }"
                    ],
                    template: "\n        <ng-container kendoGridLocalizedMessages\n            i18n-groupPanelEmpty=\"kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty\"\n            groupPanelEmpty=\"Drag a column header and drop it here to group by that column\"\n\n            i18n-noRecords=\"kendo.grid.noRecords|The label visible in the Grid when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.grid.pagerFirstPage|The label for the first page button in Grid pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.grid.pagerNextPage|The label for the next page button in Grid pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.grid.pagerLastPage|The label for the last page button in Grid pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.grid.pagerPage|The label before the current page number in the Grid pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.grid.pagerOf|The label before the total pages number in the Grid pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.grid.pagerItems|The label after the total pages number in the Grid pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerPageNumberInputTitle=\"kendo.grid.pagerPageNumberInputTitle|The label for the pager input in the Grid pager\"\n            pagerPageNumberInputTitle=\"Page Number\"\n\n            i18n-pagerItemsPerPage=\"kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filter=\"kendo.grid.filter|The label of the filter cell or icon\"\n            filter=\"Filter\"\n\n            i18n-filterEqOperator=\"kendo.grid.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.grid.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.grid.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.grid.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.grid.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.grid.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.grid.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.grid.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.grid.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.grid.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.grid.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.grid.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.grid.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n\n            i18n-filterFilterButton=\"kendo.grid.filterFilterButton|The text of the filter button\"\n            filterFilterButton=\"Filter\"\n\n            i18n-filterClearButton=\"kendo.grid.filterClearButton|The text of the clear filter button\"\n            filterClearButton=\"Clear\"\n\n            i18n-filterAndLogic=\"kendo.grid.filterAndLogic|The text of the And filter logic\"\n            filterAndLogic=\"And\"\n\n            i18n-filterOrLogic=\"kendo.grid.filterOrLogic|The text of the Or filter logic\"\n            filterOrLogic=\"Or\"\n\n            i18n-loading=\"kendo.grid.loading|The loading text\"\n            loading=\"Loading\"\n\n            i18n-columnMenu=\"kendo.grid.columnMenu|The title of the column menu icon\"\n            columnMenu=\"Column Menu\"\n\n            i18n-columns=\"kendo.grid.columns|The text shown in the column menu for the columns item\"\n            columns=\"Columns\"\n\n            i18n-lock=\"kendo.grid.lock|The text shown in the column menu for the lock item\"\n            lock=\"Lock\"\n\n            i18n-unlock=\"kendo.grid.unlock|The text shown in the column menu for the unlock item\"\n            unlock=\"Unlock\"\n\n            i18n-sortable=\"kendo.grid.sortable|The label of the sort icon\"\n            sortable=\"Sortable\"\n\n            i18n-sortAscending=\"kendo.grid.sortAscending|The text shown in the column menu for the sort ascending item\"\n            sortAscending=\"Sort Ascending\"\n\n            i18n-sortDescending=\"kendo.grid.sortDescending|The text shown in the column menu for the sort descending item\"\n            sortDescending=\"Sort Descending\"\n\n            i18n-sortedAscending=\"kendo.grid.sortedAscending|The status announcement when a column is sorted ascending\"\n            sortedAscending=\"Sorted Ascending\"\n\n            i18n-sortedDescending=\"kendo.grid.sortedDescending|The status announcement when a column is sorted descending\"\n            sortedDescending=\"Sorted Descending\"\n\n            i18n-sortedDefault=\"kendo.grid.sortedDefault|The status announcement when a column is no longer sorted\"\n            sortedDefault=\"Not Sorted\"\n\n            i18n-columnsApply=\"kendo.grid.columnsApply|The text shown in the column menu or column chooser for the columns apply button\"\n            columnsApply=\"Apply\"\n\n            i18n-columnsReset=\"kendo.grid.columnsReset|The text shown in the column menu or column chooser for the columns reset button\"\n            columnsReset=\"Reset\"\n\n            i18n-detailExpand=\"kendo.grid.detailExpand|The title of the expand icon of detail rows.\"\n            detailExpand=\"Expand Details\"\n\n            i18n-detailCollapse=\"kendo.grid.detailCollapse|The title of the collapse icon of detail rows.\"\n            detailCollapse=\"Collapse Details\"\n\n            i18n-filterDateToday=\"kendo.grid.filterDateToday|The text of the Today button of the Date filter.\"\n            filterDateToday=\"TODAY\"\n\n            i18n-filterDateToggle=\"kendo.grid.filterDateToggle|The title of the Toggle button of the Date filter.\"\n            filterDateToggle=\"Toggle Calendar\"\n\n            i18n-filterNumericDecrement=\"kendo.grid.filterNumericDecrement|The title of the Decrement button of the Numeric filter.\"\n            filterNumericDecrement=\"Decrement\"\n\n            i18n-filterNumericIncrement=\"kendo.grid.filterNumericIncrement|The title of the Increment button of the Numeric filter.\"\n            filterNumericIncrement=\"Increment\"\n        >\n        </ng-container>\n        <kendo-grid-toolbar *ngIf=\"showTopToolbar\" position=\"top\"></kendo-grid-toolbar>\n        <kendo-grid-group-panel\n            *ngIf=\"showGroupPanel\"\n            [text]=\"groupableEmptyText\"\n            [groups]=\"group\"\n            (change)=\"groupChange.emit($event)\">\n        </kendo-grid-group-panel>\n        <div #ariaRoot\n            class=\"k-grid-aria-root\"\n            role=\"grid\"\n            [attr.aria-rowcount]=\"ariaRowCount\"\n            [attr.aria-colcount]=\"ariaColCount\">\n        <ng-template [ngIf]=\"isScrollable\">\n            <div *ngIf=\"!hideHeader\"\n                class=\"k-grid-header\"\n                role=\"presentation\"\n                [style.padding]=\"headerPadding\">\n                <div *ngIf=\"isLocked\"\n                     #lockedHeader\n                     role=\"presentation\"\n                     class=\"k-grid-header-locked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [groups]=\"group\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div><div #header class=\"k-grid-header-wrap\" role=\"presentation\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 2\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\" [virtualColumns]=\"virtualColumns\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"headerLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            role=\"presentation\"\n                            [scrollable]=\"true\"\n                            [columns]=\"headerColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                    <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n                        <div [style.width.px]=\"columnsContainer.unlockedWidth\"></div>\n                    </div>\n                </div>\n            </div>\n            <kendo-grid-list\n                [data]=\"view\"\n                [rowHeight]=\"rowHeight\"\n                [detailRowHeight]=\"detailRowHeight\"\n                [total]=\"totalCount\"\n                [take]=\"pageSize\"\n                [groups]=\"group\"\n                [groupable]=\"groupable\"\n                [skip]=\"skip\"\n                [trackBy]=\"trackBy\"\n                [columns]=\"columnsContainer\"\n                [selectable]=\"selectable\"\n                [filterable]=\"filterable\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\"\n                [loading]=\"loading\"\n                [isVirtual]=\"isVirtual\"\n                [virtualColumns]=\"virtualColumns\"\n                (scrollBottom)=\"notifyScrollBottom()\"\n                (contentScroll)=\"contentScroll.emit($event)\"\n                kendoDraggable\n                kendoGridSelectionMarquee\n                [enableDrag]=\"marqueeSelection\"\n                >\n            </kendo-grid-list>\n            <div\n                *ngIf=\"showFooter\"\n                class=\"k-grid-footer\"\n                [style.padding]=\"headerPadding\">\n                <div\n                    *ngIf=\"lockedLeafColumns.length\"\n                    class=\"k-grid-footer-locked\"\n                    [style.width.px]=\"lockedWidth\">\n                    <table role=\"presentation\" [locked]=\"true\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"group\"\n                            [columns]=\"lockedLeafColumns\"\n                            [detailTemplate]=\"detailTemplate\"\n                            [logicalRowIndex]=\"ariaRowCount\">\n                        </tfoot>\n                    </table>\n                </div><div #footer\n                    class=\"k-grid-footer-wrap\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [logicalRowIndex]=\"ariaRowCount\"\n                            [scrollable]=\"true\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table [style.table-layout]=\"resizable ? 'fixed' : null\">\n                <colgroup kendoGridColGroup\n                    [columns]=\"leafColumns\"\n                    [groups]=\"group\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <thead kendoGridHeader\n                    *ngIf=\"!hideHeader\"\n                    [resizable]=\"resizable\"\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [groups]=\"group\"\n                    [groupable]=\"showGroupPanel\"\n                    [reorderable]=\"reorderable\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    [columnMenu]=\"columnMenuOptions\"\n                    [columnMenuTemplate]=\"columnMenuTemplate\"\n                    [detailTemplate]=\"detailTemplate\">\n                </thead>\n                <tbody kendoGridTableBody\n                    [groups]=\"group\"\n                    [data]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [selectable]=\"selectable\"\n                    [filterable]=\"filterable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showGroupFooters\"\n                    [trackBy]=\"trackBy\"\n                    [rowClass]=\"rowClass\"\n                    kendoDraggable\n                    kendoGridSelectionMarquee\n                    [enableDrag]=\"marqueeSelection\">\n                </tbody>\n                <tfoot kendoGridFooter\n                    *ngIf=\"showFooter\"\n                    [scrollable]=\"false\"\n                    [logicalRowIndex]=\"ariaRowCount\"\n                    [groups]=\"group\"\n                    [columns]=\"leafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </tfoot>\n            </table>\n            <div *ngIf=\"loading\" kendoGridLoading>\n            </div>\n        </ng-template>\n        </div>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-grid-toolbar *ngIf=\"showBottomToolbar\" position=\"bottom\"></kendo-grid-toolbar>\n    "
                },] },
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
        { type: BrowserSupportService },
        { type: SelectionService },
        { type: CellSelectionService },
        { type: ElementRef },
        { type: GroupInfoService },
        { type: GroupsService },
        { type: ChangeNotificationService },
        { type: DetailsService },
        { type: EditService },
        { type: FilterService },
        { type: PDFService },
        { type: ResponsiveService },
        { type: Renderer2 },
        { type: ExcelService },
        { type: NgZone },
        { type: ScrollSyncService },
        { type: DomEventsService },
        { type: ColumnResizingService },
        { type: ChangeDetectorRef },
        { type: ColumnReorderService },
        { type: ColumnInfoService },
        { type: NavigationService },
        { type: SortService },
        { type: ScrollRequestService },
        { type: LocalizationService }
    ]; };
    GridComponent.propDecorators = {
        data: [{ type: Input }],
        pageSize: [{ type: Input }],
        height: [{ type: Input }],
        rowHeight: [{ type: Input }],
        detailRowHeight: [{ type: Input }],
        skip: [{ type: Input }],
        scrollable: [{ type: Input }],
        selectable: [{ type: Input }],
        sort: [{ type: Input }],
        trackBy: [{ type: Input }],
        filter: [{ type: Input }],
        group: [{ type: Input }],
        virtualColumns: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        pageable: [{ type: Input }],
        groupable: [{ type: Input }],
        navigable: [{ type: Input }],
        navigatable: [{ type: Input }],
        autoSize: [{ type: Input }],
        rowClass: [{ type: Input }],
        rowSelected: [{ type: Input }],
        cellSelected: [{ type: Input }],
        resizable: [{ type: Input }],
        reorderable: [{ type: Input }],
        loading: [{ type: Input }],
        columnMenu: [{ type: Input }],
        hideHeader: [{ type: Input }],
        filterChange: [{ type: Output }],
        pageChange: [{ type: Output }],
        groupChange: [{ type: Output }],
        sortChange: [{ type: Output }],
        selectionChange: [{ type: Output }],
        dataStateChange: [{ type: Output }],
        groupExpand: [{ type: Output }],
        groupCollapse: [{ type: Output }],
        detailExpand: [{ type: Output }],
        detailCollapse: [{ type: Output }],
        edit: [{ type: Output }],
        cancel: [{ type: Output }],
        save: [{ type: Output }],
        remove: [{ type: Output }],
        add: [{ type: Output }],
        cellClose: [{ type: Output }],
        cellClick: [{ type: Output }],
        pdfExport: [{ type: Output }],
        excelExport: [{ type: Output }],
        columnResize: [{ type: Output }],
        columnReorder: [{ type: Output }],
        columnVisibilityChange: [{ type: Output }],
        columnLockedChange: [{ type: Output }],
        scrollBottom: [{ type: Output }],
        contentScroll: [{ type: Output }],
        columns: [{ type: ContentChildren, args: [ColumnBase,] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-grid',] }],
        lockedClasses: [{ type: HostBinding, args: ['class.k-grid-lockedcolumns',] }],
        virtualClasses: [{ type: HostBinding, args: ['class.k-grid-virtual',] }],
        noScrollbarClass: [{ type: HostBinding, args: ['class.k-grid-no-scrollbar',] }],
        detailTemplateChildren: [{ type: ContentChildren, args: [DetailTemplateDirective,] }],
        noRecordsTemplateChildren: [{ type: ContentChildren, args: [NoRecordsTemplateDirective,] }],
        pagerTemplateChildren: [{ type: ContentChildren, args: [PagerTemplateDirective,] }],
        toolbarTemplateChildren: [{ type: ContentChildren, args: [ToolbarTemplateDirective,] }],
        columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }],
        lockedHeader: [{ type: ViewChild, args: ["lockedHeader",] }],
        header: [{ type: ViewChild, args: ["header",] }],
        footer: [{ type: ViewChildren, args: ["footer",] }],
        ariaRoot: [{ type: ViewChild, args: ['ariaRoot',] }],
        isDetailExpanded: [{ type: Input }]
    };
    return GridComponent;
}());
export { GridComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
