/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, QueryList, ViewChild, isDevMode, NgZone, ViewChildren, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, merge, isObservable } from 'rxjs';
import { map, tap, take, filter, switchMap } from 'rxjs/operators';
import { ColumnComponent, isColumnComponent } from './columns/column.component';
import { isSpanColumnComponent } from './columns/span-column.component';
import { isColumnGroupComponent, ColumnGroupComponent } from './columns/column-group.component';
import { isArray, anyChanged, isChanged, isPresent, isUniversal, observe, isTruthy, createPromise, hasObservers } from './utils';
import { BrowserSupportService } from './layout/browser-support.service';
import { ViewCollection } from './data/data.collection';
import { EditService } from './editing/edit.service';
import { ColumnsContainer } from './columns/columns-container';
import { ChangeNotificationService } from './data/change-notification.service';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { ColumnBase } from './columns/column-base';
import { syncRowsHeight } from './layout/row-sync';
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
import { sortColumns } from './columns/column-common';
import { defaultTrackBy } from './common/default-track-by';
import { ChildExpandStateService } from './expand-state/child-expand-state.service';
import { getter } from '@progress/kendo-common';
import { LocalEditService } from './editing-directives/local-edit.service';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { OptionChangesService } from "./common/option-changes.service";
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
        return console.warn("\n                TreeList column field name '" + field + "' does not look like a valid JavaScript identifier.\n                Identifiers can contain only alphanumeric characters (including \"$\" or \"_\"), and may not start with a digit.\n                Please use only valid identifier names to ensure error-free operation.\n            ");
    });
};
var ɵ1 = validateColumnsField;
var isInEditedCell = function (element, treelistElement) {
    return closest(element, matchesClasses('k-grid-edit-cell')) &&
        closest(element, matchesNodeName('kendo-treelist')) === treelistElement;
};
var ɵ2 = isInEditedCell;
/**
 * Represents the Kendo UI TreeList component for Angular.
 *
 * {% meta height:470 %}
 * {% embed_file data-binding/flat/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var TreeListComponent = /** @class */ (function () {
    function TreeListComponent(supportService, wrapper, changeNotification, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, childExpandStateService, optionChanges, localization) {
        var _this = this;
        this.supportService = supportService;
        this.wrapper = wrapper;
        this.changeNotification = changeNotification;
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
        this.childExpandStateService = childExpandStateService;
        this.optionChanges = optionChanges;
        /**
         * Defines the page size used by the TreeList when [paging]({% slug paging_treelist %}) is enabled.
         *
         * @default 10
         */
        this.pageSize = 10;
        /**
         * Defines the scroll mode used by the TreeList.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
         */
        this.scrollable = 'scrollable';
        /**
         * A function that defines how to track changes for the data rows.
         *
         * By default, the TreeList tracks changes by the index of the data item.
         * Edited rows are tracked by reference.
         * In some cases, you might need to override the default behavior,
         * for example, when you implement editing with immutable data items.
         *
         * The following example demonstrates how to track items only by index.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { TreeListItem } from '@progress/kendo-angular-treelist';
         *
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-treelist [data]="treelistData" [trackBy]="trackBy">
         *        </kendo-treelist>
         *    `
         * })
         * class AppComponent {
         *    public treelistData: any[] = products;
         *
         *    public trackBy(index: number, item: TreeListItem): any {
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
         * If set to `true`, the treelist will render only the columns in the current viewport.
         */
        this.virtualColumns = false;
        /**
         * Enables the [filtering]({% slug filtering_treelist %}) of the TreeList columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_treelist %}) of the TreeList columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the TreeList ([see example]({% slug paging_treelist %})).
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
         * @hidden Not Implemented
         *
         * If set to `true`, the user can use dedicated shortcuts to interact with the TreeList.
         * By default, navigation is disabled and the TreeList content is accessible in the normal tab sequence.
         */
        this.navigable = false;
        /**
         * Indicates whether the TreeList columns will be resized during initialization so that
         * they fit their headers and row content. Defaults to `false`.
         * Columns with `autoSize` set to `false` are excluded.
         * To dynamically update the column width to match the new content,
         * refer to [this example]({% slug resizing_columns_treelist %}).
         */
        this.autoSize = false;
        /**
         * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
         * ([see example]({% slug resizing_columns_treelist %})).
         *
         * @default false
         */
        this.resizable = false;
        /**
         * If set to `true`, the user can reorder columns by dragging their header cells
         * ([see example]({% slug reordering_columns_treelist %})).
         *
         * @default false
         */
        this.reorderable = false;
        /**
         * Specifies if the loading indicator of the TreeList will be displayed ([see example]({% slug databinding_treelist %})).
         *
         * @default false
         */
        this.loading = false;
        /**
         * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_treelist %})).
         *
         * @default false
         */
        this.columnMenu = false;
        /**
         * Specifies if the header of the treelist will be hidden. The header is visible by default.
         *
         * > The header includes column headers and the [filter row]({% slug filtering_treelist %}#toc-filter-row).
         */
        this.hideHeader = false;
        /**
         * Fires when the TreeList filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires when the page of the TreeList is changed ([see example]({% slug paging_treelist %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new EventEmitter();
        /**
         * Fires when the sorting of the TreeList is changed ([see example]({% slug sorting_treelist %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new EventEmitter();
        /**
         * Fires when the data state of the TreeList is changed.
         */
        this.dataStateChange = new EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
         */
        this.edit = new EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-saving-records)).
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-removing-records)).
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
         */
        this.add = new EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
         */
        this.cellClose = new EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
         */
        this.cellClick = new EventEmitter();
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
        this.columnResize = new EventEmitter();
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
         * ([see example]({% slug scrollmmodes_treelist %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new EventEmitter();
        /**
         * Fires when the treelist content is scrolled.
         * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
         */
        this.contentScroll = new EventEmitter();
        /**
         * Fires when an item is expanded.
         */
        this.expandEvent = new EventEmitter();
        /**
         * Fires when an item is collapsed.
         */
        this.collapseEvent = new EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new QueryList();
        this.footer = new QueryList();
        this.columnsContainer = new ColumnsContainer(function () { return _this.columnList.filterHierarchy(function (column) {
            column.matchesMedia = _this.matchesMedia(column);
            return column.isVisible;
        }); });
        this.localEditService = new LocalEditService();
        this.view = new ViewCollection(this.viewFieldAccessor.bind(this), this.childExpandStateService, this.editService);
        this.dataChanged = false;
        this._hasChildren = (function () { return false; });
        this.subscriptions = new Subscription();
        this.rtl = false;
        this.shouldGenerateColumns = true;
        this._data = [];
        this._sort = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this.idGetter = getter(undefined);
        this._rowClass = function () { return null; };
        this.subscriptions.add(localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        }));
        this.columnInfoService.init(this.columnsContainer, function () { return _this.columnList; });
        this.subscriptions.add(this.columnInfoService.visibilityChange.subscribe(function (changed) {
            _this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
            _this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.columnInfoService.lockedChange.subscribe(function (changed) {
            _this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
            _this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(merge(this.optionChanges.columns, this.optionChanges.options).subscribe(function () {
            _this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.filterService.changes.subscribe(function (x) {
            _this.filterChange.emit(x);
        }));
        this.subscriptions.add(this.sortService.changes.subscribe(function (x) {
            _this.sortChange.emit(x);
        }));
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.subscriptions.add(this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this)));
        this.subscriptions.add(this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this)));
        this.subscriptions.add(this.excelService.loadingChange.subscribe(function () {
            _this.changeDetectorRef.detectChanges();
        }));
        this.columnsContainerChange();
        this.subscriptions.add(this.columnResizingService
            .changes
            .pipe(tap(function (e) {
            if (e.type === 'start') {
                _this.renderer.addClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end' || e.type === 'autoFitComplete') {
                _this.renderer.removeClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(function (e) { return e.type === 'end'; }))
            .subscribe(this.notifyResize.bind(this)));
        this.columnList = new ColumnList(this.columns);
        this.subscriptions.add(this.columnReorderService
            .changes.subscribe(this.reorder.bind(this)));
        this.subscriptions.add(this.columnInfoService.columnRangeChange.subscribe(this.onColumnRangeChange.bind(this)));
        this.subscriptions.add(this.childExpandStateService.changes.subscribe(function (args) {
            if (args.expand) {
                _this.expandEvent.emit(args);
            }
            else {
                _this.collapseEvent.emit(args);
            }
            if (!args.isDefaultPrevented()) {
                _this.changeDetectorRef.markForCheck();
                _this.view.clear();
            }
        }));
        this.subscriptions.add(this.view.childrenLoaded.subscribe(function () {
            _this.changeDetectorRef.detectChanges();
        }));
        this.dataLoaded = this.dataLoaded.bind(this);
        this.editService.idGetter = this.idGetter;
    }
    Object.defineProperty(TreeListComponent.prototype, "data", {
        get: function () {
            return this.loadedData;
        },
        /**
         * Sets the data of the TreeList. If an array is provided, the TreeList automatically gets the total count
         * ([more information and example]({% slug databinding_treelist %})).
         */
        set: function (value) {
            this.view.reset();
            this._data = value;
            this.loadedData = null;
            this.unsubscribeDataLoaded();
            if (isObservable(value)) {
                this.dataLoadedSubscription = value.subscribe(this.dataLoaded); // handle error
            }
            else {
                this.dataLoaded(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "skip", {
        /**
         * Defines the number of records to be skipped by the pager.
         * Required by the [paging]({% slug paging_treelist %}) functionality.
         */
        get: function () {
            return this._skip;
        },
        set: function (value) {
            if (value >= 0) {
                this._skip = value;
                this.view.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        /**
         * The descriptors by which the data will be sorted ([see example]({% slug sorting_treelist %})).
         */
        set: function (value) {
            if (isArray(value)) {
                this._sort = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "showTopToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "showBottomToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "showPager", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isVirtual && this.pageable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "navigatable", {
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
    Object.defineProperty(TreeListComponent.prototype, "rowClass", {
        get: function () {
            return this._rowClass;
        },
        /**
         * Defines a function that is executed for every data row in the component.
         *
         * @example
         * ```ts
         * import { Component, ViewEncapsulation } from '@angular/core';
         * import { RowClassArgs } from '@progress/kendo-angular-treelist';
         *
         * _@Component({
         *    selector: 'my-app',
         *    encapsulation: ViewEncapsulation.None,
         *    styles: [`
         *        .k-treelist tr.even { background-color: #f45c42; }
         *        .k-treelist tr.odd { background-color: #41f4df; }
         *    `],
         *    template: `
         *        <kendo-treelist [data]="treelistData" [rowClass]="rowCallback">
         *        </kendo-treelist>
         *    `
         * })
         * class AppComponent {
         *    public treelistData: any[] = products;
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
            if (typeof fn !== 'function') {
                throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowClass = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "rowSelected", {
        get: function () {
            return this._rowSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "activeCell", {
        /**
         * @hidden Not Implemented
         * Returns the currently focused cell (if any).
         */
        get: function () {
            return this.navigationService.activeCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "activeRow", {
        /**
         * @hidden Not Implemented
         * Returns the currently focused row (if any).
         */
        get: function () {
            return this.navigationService.activeRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "idField", {
        /**
         * The name of the field which contains the unique identifier of the node.
         *
         * @default "id"
         */
        set: function (value) {
            if (typeof value === "function") {
                this.idGetter = value;
            }
            else {
                this.idGetter = getter(value);
            }
            this.editService.idGetter = this.idGetter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "lockedClasses", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "virtualClasses", {
        get: function () {
            return this.isVirtual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "noScrollbarClass", {
        get: function () {
            return this.scrollbarWidth === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "noRecordsTemplate", {
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
    Object.defineProperty(TreeListComponent.prototype, "pagerTemplate", {
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
    Object.defineProperty(TreeListComponent.prototype, "toolbarTemplate", {
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
    Object.defineProperty(TreeListComponent.prototype, "scrollbarWidth", {
        get: function () {
            return this.supportService.scrollbarWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "headerPadding", {
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
    Object.defineProperty(TreeListComponent.prototype, "showLoading", {
        get: function () {
            return this.loading || (isObservable(this._data) && !this.loadedData) || this.excelService.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "showFooter", {
        get: function () {
            return this.columnsContainer.hasFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "ariaRowCount", {
        get: function () {
            return this.totalColumnLevels + 1 + this.view.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "ariaColCount", {
        get: function () {
            return this.columnsContainer.leafColumnsToRender.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "isVirtual", {
        get: function () {
            return false; // this.scrollable === 'virtual';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "isScrollable", {
        get: function () {
            return this.scrollable !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "visibleColumns", {
        get: function () {
            return this.columnsContainer.allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "lockedColumns", {
        get: function () {
            return this.columnsContainer.lockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "nonLockedColumns", {
        get: function () {
            return this.columnsContainer.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "leafColumns", {
        get: function () {
            return this.columnsContainer.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "totalColumnLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "headerColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "headerLeafColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.leafViewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "lockedWidth", {
        get: function () {
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (!this.rtl && this.lockedLeafColumns.length) {
                return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                    this.leafViewportColumns.reduce(function (acc, column) { return acc + (column.width || 0); }, 0);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "columnMenuTemplate", {
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "totalCount", {
        get: function () {
            if (this.isVirtual || !isPresent(this.pageSize)) {
                return this.view.total;
            }
            return this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "fetchChildren", {
        get: function () {
            return this._fetchChildren;
        },
        /**
         * Gets or sets the callback function that retrieves the child nodes for a particular node.
         */
        set: function (value) {
            this._fetchChildren = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeListComponent.prototype, "hasChildren", {
        get: function () {
            return this._hasChildren;
        },
        /**
         * Gets or sets the callback function that indicates if a particular node has child nodes.
         */
        set: function (value) {
            this._hasChildren = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TreeListComponent.prototype.viewFieldAccessor = function () {
        return {
            fetchChildren: this.fetchChildren,
            hasChildren: this.hasChildren,
            idGetter: this.idGetter,
            skip: this.skip,
            pageSize: this.pageSize,
            pageable: this.pageable,
            data: this.loadedData,
            hasFooter: this.columnsContainer.hasFooter
        };
    };
    /**
     * @hidden
     */
    TreeListComponent.prototype.onDataChange = function () {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        this.updateNavigationMetadata();
    };
    TreeListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort"], changes)) {
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
    };
    TreeListComponent.prototype.ngAfterViewInit = function () {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    };
    TreeListComponent.prototype.ngAfterContentChecked = function () {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.onDataChange();
        }
        this.columnsContainer.refresh();
        this.verifySettings();
    };
    TreeListComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        // is this needed? after content checked already does this
        this.subscriptions.add(this.columns.changes.subscribe(function () {
            _this.verifySettings();
            _this.optionChanges.columnChanged();
        }));
    };
    TreeListComponent.prototype.ngOnInit = function () {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    };
    TreeListComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.unsubscribeDataLoaded();
        this.ngZone = null;
    };
    /**
     * @hidden
     */
    TreeListComponent.prototype.attachScrollSync = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.subscriptions.add(observe(this.footer)
                .subscribe(function (footers) {
                return footers
                    .map(function (footer) { return footer.nativeElement; })
                    .filter(isPresent)
                    .forEach(function (element) {
                    return _this.scrollSyncService.registerEmitter(element, "footer");
                });
            }));
        }
    };
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    TreeListComponent.prototype.editRow = function (item, group, options) {
        var _this = this;
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.editRow(item, group);
        if (options && options.skipFocus) {
            return;
        }
        this.focusEditElement(function () {
            return "tr[data-treelist-view-index=\"" + _this.view.itemIndex(item) + "\"]";
        });
    };
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    TreeListComponent.prototype.closeRow = function (item, isNew) {
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.close(item, isNew);
    };
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    TreeListComponent.prototype.addRow = function (group, parent) {
        var _this = this;
        var isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            var fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(parent, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(function () {
            return parent ? "tr[data-treelist-view-index=\"" + (_this.view.itemIndex(parent) + 1) + "\"]" : '.k-grid-add-row';
        });
    };
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    TreeListComponent.prototype.editCell = function (dataItem, column, group) {
        var instance = this.columnInstance(column);
        this.editService.editCell(dataItem, instance, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(function () { return '.k-grid-edit-cell'; });
    };
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event was prevented.
     */
    TreeListComponent.prototype.closeCell = function () {
        return !this.editService.closeCell();
    };
    /**
     * Closes the current cell in edit mode.
     */
    TreeListComponent.prototype.cancelCell = function () {
        this.editService.cancelCell();
    };
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    TreeListComponent.prototype.isEditing = function () {
        return this.editService.isEditing();
    };
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    TreeListComponent.prototype.isEditingCell = function () {
        return this.editService.isEditing() && this.editService.isEditingCell();
    };
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_treelist %})).
     */
    TreeListComponent.prototype.saveAsPDF = function () {
        this.pdfService.save(this);
    };
    /**
     * Exports the TreeList element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-treelist-pdf` component options.
     * ([see example]({% slug pdfexport_treelist %}#toc-exporting-multiple-treelists-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    TreeListComponent.prototype.drawPDF = function () {
        var promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    };
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_treelist %})).
     */
    TreeListComponent.prototype.saveAsExcel = function () {
        this.excelService.save(this);
    };
    /**
     * Applies the minimum possible width for the specified column,
     * so that the whole text fits without wrapping. This method expects the TreeList
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the TreeList is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-treelist
     *            #treelist
     *            [data]="treelistData"
     *            [resizable]="true"
     *            style="height: 300px">
     *            <ng-template kendoTreeListToolbarTemplate>
     *                 <button class="k-button" (click)="treelist.autoFitColumn(groupColumn)">
     *                     Auto-fit the group column
     *                 </button>
     *            </ng-template>
     *            <kendo-treelist-column-group #groupColumn title="Product Info">
     *                <kendo-treelist-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    [minResizableWidth]="30"
     *                    title="ID">
     *                </kendo-treelist-column>
     *
     *                <kendo-treelist-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-treelist-column>
     *            </kendo-treelist-column-group>
     *
     *            <kendo-treelist-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                filter="numeric"
     *                format="{0:c}">
     *            </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
    TreeListComponent.prototype.autoFitColumn = function (column) {
        this.columnResizingService.autoFit(column);
    };
    /**
     * Applies the minimum possible width for the specified columns,
     * so that the whole text fits without wrapping.
     * If no argument is supplied, `autoFitColumns` auto-fits
     * the content of current TreeList columns. This method expects the TreeList
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the TreeList is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *      <kendo-treelist
     *          #treelist
     *          [data]="treelistData"
     *          [resizable]="true"
     *          style="height: 300px">
     *          <ng-template kendoTreeListToolbarTemplate>
     *              <button class="k-button" (click)="treelist.autoFitColumns([firstColumn, lastColumn])">
     *                  Auto-fit the first and last column
     *              </button>
     *              <button class="k-button" (click)="treelist.autoFitColumns()">
     *                  Auto-fit all columns
     *              </button>
     *          </ng-template>
     *          <kendo-treelist-column-group title="Product Info">
     *              <kendo-treelist-column
     *                  #firstColumn
     *                  field="ProductID"
     *                  [width]="50"
     *                  [minResizableWidth]="30"
     *                  title="ID">
     *              </kendo-treelist-column>
     *
     *              <kendo-treelist-column
     *                  field="ProductName"
     *                  title="Product Name"
     *                  >
     *              </kendo-treelist-column>
     *          </kendo-treelist-column-group>
     *
     *          <kendo-treelist-column
     *              #lastColumn
     *              field="UnitPrice"
     *              title="Unit Price"
     *              [width]="180"
     *              filter="numeric"
     *              format="{0:c}">
     *          </kendo-treelist-column>
     *      </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
    TreeListComponent.prototype.autoFitColumns = function (columns) {
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
    TreeListComponent.prototype.notifyPageChange = function (source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.skip = event.skip;
        this.pageSize = event.take;
        this.closeCell();
        this.cancelCell();
        this.changeDetectorRef.markForCheck();
        this.pageChange.emit(event);
    };
    /**
     * @hidden
     */
    TreeListComponent.prototype.notifyScrollBottom = function () {
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
    TreeListComponent.prototype.focusEditElement = function (containerSelector) {
        var _this = this;
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(function () {
            _this.focusElementSubscription = _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                var wrapper = _this.wrapper.nativeElement;
                var selector = containerSelector();
                if (!_this.setEditFocus(wrapper.querySelector(selector)) && _this.isLocked) {
                    _this.setEditFocus(wrapper.querySelector(".k-grid-content " + selector));
                }
                _this.focusElementSubscription = null;
            });
        });
    };
    /**
     * @hidden Not Implemented
     * Focuses the last active or the first cell of the TreeList.
     *
     * @returns {NavigationCell} The focused cell.
     */
    TreeListComponent.prototype.focus = function () {
        this.assertNavigable();
        return this.navigationService.focusCell();
    };
    /**
     * @hidden Not Implemented
     * Focuses the cell with the specified row and column index.
     *
     * The row index is based on the logical structure of the TreeList and does not correspond to the data item index:
     * * Header rows are indexed and start at row `#0`.
     * * Group headers and footers are indexed.
     *
     * If the TreeList is configured for scrolling, including virtual scrolling, the scroll position will be updated.
     * If the row is not present on the current page, the method will have no effect.
     *
     * @param rowIndex - The row index to focus.
     * @param colIndex - The column index to focus.
     * @returns {NavigationCell} The focused cell.
     *
     */
    TreeListComponent.prototype.focusCell = function (rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    };
    /**
     * @hidden Not Implemented
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    TreeListComponent.prototype.focusNextCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    };
    /**
     * @hidden Not Implemented
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    TreeListComponent.prototype.focusPrevCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    };
    /**
     * Scrolls to the specified row and column
     */
    TreeListComponent.prototype.scrollTo = function (request) {
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
     *        <kendo-treelist
     *            #treelist
     *            [data]="treelistData"
     *            [reorderable]="true"
     *            style="height: 300px">
     *            <ng-template kendoTreeListToolbarTemplate>
     *                 <button class="k-button"
     *                     (click)="treelist.reorderColumn(groupColumn, 2, { before: true })">
     *                     Move the group column before the last one.
     *                 </button>
     *            </ng-template>
     *            <kendo-treelist-column-group #groupColumn title="Product Info">
     *                <kendo-treelist-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    title="ID">
     *                </kendo-treelist-column>
     *
     *                <kendo-treelist-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-treelist-column>
     *            </kendo-treelist-column-group>
     *
     *            <kendo-treelist-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                format="{0:c}">
     *            </kendo-treelist-column>
     *
     *            <kendo-treelist-column
     *                field="Discontinued"
     *                title="Discontinued"
     *                [width]="100">
     *            </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
    TreeListComponent.prototype.reorderColumn = function (source, destIndex, options) {
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
    TreeListComponent.prototype.reload = function (item, reloadChildren) {
        if (item) {
            this.view.resetItem(item, reloadChildren);
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @hidden
     */
    TreeListComponent.prototype.reorder = function (_a) {
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
    TreeListComponent.prototype.updateColumnIndices = function (_a) {
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
    TreeListComponent.prototype.updateIndicesForLevel = function (level) {
        var colsForParentLevel = this.columnsForLevel(level - 1);
        var colsForLevel = [];
        sortColumns(colsForParentLevel).forEach(function (c) {
            if (c.children) {
                colsForLevel.push.apply(colsForLevel, c.children.toArray().splice(1, c.children.length - 1).sort(function (a, b) { return a.orderIndex - b.orderIndex; }));
            }
        });
        expandColumnsWithSpan(colsForLevel).map(function (c, i) { return c.orderIndex = i; });
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    };
    TreeListComponent.prototype.columnsForLevel = function (level) {
        return this.columnsContainer
            .allColumns.filter(function (column) { return column.level === level; });
    };
    TreeListComponent.prototype.setEditFocus = function (element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    };
    TreeListComponent.prototype.columnInstance = function (column) {
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
    TreeListComponent.prototype.verifySettings = function () {
        if (isDevMode()) {
            var locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(function (column) { return !column.width && !isColumnGroupComponent(column); }).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter(function (x) { return x.children.length < 2; }).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(function (x) { return x.locked && x.parent && !x.parent.isLocked; }).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight) && !this.isVirtual) {
                throw new Error('Row height setting requires virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    };
    TreeListComponent.prototype.autoGenerateColumns = function () {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            var columns = Object.keys(this.view.at(0).data).map(function (field) {
                var column = new ColumnComponent();
                column.field = field;
                return column;
            });
            columns[0].expandable = true;
            this.columns.reset(columns);
        }
    };
    TreeListComponent.prototype.attachStateChangesEmitter = function () {
        var _this = this;
        this.subscriptions.add(merge(this.sortChange.pipe(map(function (sort) { return ({ filter: _this.filter, skip: _this.skip, sort: sort, take: _this.pageSize }); })), this.filterChange.pipe(map(function (filter) { return ({
            filter: filter, skip: 0, sort: _this.sort, take: _this.pageSize
        }); })))
            .subscribe(function (x) {
            _this.closeCell();
            _this.cancelCell();
            _this.dataStateChange.emit(x);
        }));
    };
    TreeListComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.subscriptions.add(this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this)));
    };
    TreeListComponent.prototype.emitCRUDEvent = function (args) {
        var action = args.action, formGroup = args.formGroup, dataItem = args.dataItem, parent = args.parent;
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        // remove automatic expand. leave it to the user once the expand state is moved outside the grid
        if (action === 'add' && parent && !this.childExpandStateService.isExpanded(this.idGetter(parent))) { // has children???
            this.childExpandStateService.toggleRow(this.idGetter(parent), parent);
        }
        this.view.clear();
        this.changeDetectorRef.markForCheck();
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
    TreeListComponent.prototype.attachDomEventHandlers = function () {
        var _this = this;
        this.subscriptions.add(this.domEvents.cellClick.subscribe(function (args) {
            if (hasObservers(_this.cellClick)) {
                _this.ngZone.run(function () {
                    _this.cellClick.emit(Object.assign({ sender: _this }, args));
                });
            }
        }));
    };
    TreeListComponent.prototype.attachElementEventHandlers = function () {
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
                    !closest(args.target, matchesClasses('k-animation-container k-treelist-ignore-click')) &&
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
    TreeListComponent.prototype.matchesMedia = function (c) {
        return this.responsiveService.matchesMedia(c.media);
    };
    TreeListComponent.prototype.resizeCheck = function () {
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
    TreeListComponent.prototype.emitPDFExportEvent = function () {
        var args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    };
    TreeListComponent.prototype.syncHeaderHeight = function (observable) {
        var _this = this;
        return observable
            .pipe(filter(function () { return isPresent(_this.lockedHeader); }))
            .subscribe(function () {
            return syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
        });
    };
    TreeListComponent.prototype.columnsContainerChange = function () {
        var _this = this;
        this.subscriptions.add(this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(function () { return _this.lockedColumns.length > 0; }), switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); }))));
    };
    TreeListComponent.prototype.notifyResize = function (e) {
        var _this = this;
        var args = e.resizedColumns
            .filter(function (item) { return isTruthy(item.column.resizable) && !item.column.isColumnGroup; })
            .map(function (item) { return ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }); });
        if (hasObservers(this.columnResize)) {
            this.ngZone.run(function () {
                _this.columnResize.emit(args);
            });
        }
    };
    TreeListComponent.prototype.assertNavigable = function () {
        if (isDevMode() && !this.navigable) {
            throw new Error('The TreeList should be configured as [navigable]="true" to control focus');
        }
    };
    TreeListComponent.prototype.navigationMetadata = function () {
        var isVirtual = this.isVirtual;
        var filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        var headerRows = this.totalColumnLevels + 1 + filterRowOffset;
        return new NavigationMetadata(this.view, headerRows, isVirtual, this.showPager, this.wrapper, this.virtualColumns, this.columnsContainer);
    };
    TreeListComponent.prototype.updateNavigationMetadata = function () {
        this.navigationService.metadata = this.navigationMetadata();
    };
    TreeListComponent.prototype.applyAutoSize = function () {
        var _this = this;
        var cols = this.columns.filter(function (c) { return _this.autoSize ? c.autoSize !== false : c.autoSize; });
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(function (_) { return _this.autoFitColumns(cols); });
        }
    };
    TreeListComponent.prototype.onColumnRangeChange = function (range) {
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
                if (column.children) {
                    toAdd.unshift.apply(toAdd, column.children.toArray().slice(1));
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
    TreeListComponent.prototype.dataLoaded = function (result) {
        this.loadedData = result || [];
        this.view.reset();
        this.dataChanged = true;
        this.changeDetectorRef.markForCheck();
    };
    TreeListComponent.prototype.unsubscribeDataLoaded = function () {
        if (this.dataLoadedSubscription) {
            this.dataLoadedSubscription.unsubscribe();
            this.dataLoadedSubscription = null;
        }
    };
    TreeListComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'kendoTreeList',
                    providers: [
                        BrowserSupportService,
                        LocalizationService,
                        ColumnInfoService,
                        ChangeNotificationService,
                        EditService,
                        PDFService,
                        SuspendService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.treelist'
                        },
                        FilterService,
                        ResponsiveService,
                        PagerContextService,
                        ExcelService,
                        ScrollSyncService,
                        ResizeService,
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
                        SortService,
                        ChildExpandStateService,
                        LocalDataChangesService,
                        OptionChangesService
                    ],
                    selector: 'kendo-treelist',
                    template: "\n        <ng-container kendoTreeListLocalizedMessages\n\n            i18n-noRecords=\"kendo.treelist.noRecords|The label visible in the TreeList when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.treelist.pagerFirstPage|The label for the first page button in TreeList pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.treelist.pagerPreviousPage|The label for the previous page button in TreeList pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.treelist.pagerNextPage|The label for the next page button in TreeList pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.treelist.pagerLastPage|The label for the last page button in TreeList pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.treelist.pagerPage|The label before the current page number in the TreeList pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.treelist.pagerOf|The label before the total pages number in the TreeList pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.treelist.pagerItems|The label after the total pages number in the TreeList pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerItemsPerPage=\"kendo.treelist.pagerItemsPerPage|The label for the page size chooser in the TreeList pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filter=\"kendo.treelist.filter|The label of the filter cell or icon\"\n            filter=\"Filter\"\n\n            i18n-filterEqOperator=\"kendo.treelist.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.treelist.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.treelist.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.treelist.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.treelist.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.treelist.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.treelist.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.treelist.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.treelist.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.treelist.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.treelist.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.treelist.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.treelist.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.treelist.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.treelist.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.treelist.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.treelist.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.treelist.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.treelist.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.treelist.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.treelist.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n\n            i18n-filterFilterButton=\"kendo.treelist.filterFilterButton|The text of the filter button\"\n            filterFilterButton=\"Filter\"\n\n            i18n-filterClearButton=\"kendo.treelist.filterClearButton|The text of the clear filter button\"\n            filterClearButton=\"Clear\"\n\n            i18n-filterAndLogic=\"kendo.treelist.filterAndLogic|The text of the And filter logic\"\n            filterAndLogic=\"And\"\n\n            i18n-filterOrLogic=\"kendo.treelist.filterOrLogic|The text of the Or filter logic\"\n            filterOrLogic=\"Or\"\n\n            i18n-loading=\"kendo.treelist.loading|The loading text\"\n            loading=\"Loading\"\n\n            i18n-columnMenu=\"kendo.treelist.columnMenu|The title of the column menu icon\"\n            columnMenu=\"Column Menu\"\n\n            i18n-columns=\"kendo.treelist.columns|The text shown in the column menu for the columns item\"\n            columns=\"Columns\"\n\n            i18n-lock=\"kendo.treelist.lock|The text shown in the column menu for the lock item\"\n            lock=\"Lock\"\n\n            i18n-unlock=\"kendo.treelist.unlock|The text shown in the column menu for the unlock item\"\n            unlock=\"Unlock\"\n\n            i18n-sortable=\"kendo.treelist.sortable|The label of the sort icon\"\n            sortable=\"Sortable\"\n\n            i18n-sortAscending=\"kendo.treelist.sortAscending|The text shown in the column menu for the sort ascending item\"\n            sortAscending=\"Sort Ascending\"\n\n            i18n-sortDescending=\"kendo.treelist.sortDescending|The text shown in the column menu for the sort descending item\"\n            sortDescending=\"Sort Descending\"\n\n            i18n-sortedAscending=\"kendo.treelist.sortedAscending|The status announcement when a column is sorted ascending\"\n            sortedAscending=\"Sorted Ascending\"\n\n            i18n-sortedDescending=\"kendo.treelist.sortedDescending|The status announcement when a column is sorted descending\"\n            sortedDescending=\"Sorted Descending\"\n\n            i18n-sortedDefault=\"kendo.treelist.sortedDefault|The status announcement when a column is no longer sorted\"\n            sortedDefault=\"Not Sorted\"\n\n            i18n-columnsApply=\"kendo.treelist.columnsApply|The text shown in the column menu or column chooser for the columns apply button\"\n            columnsApply=\"Apply\"\n\n            i18n-columnsReset=\"kendo.treelist.columnsReset|The text shown in the column menu or column chooser for the columns reset button\"\n            columnsReset=\"Reset\"\n         >\n        </ng-container>\n        <kendo-treelist-toolbar *ngIf=\"showTopToolbar\" position=\"top\"></kendo-treelist-toolbar>\n        <div #ariaRoot\n            class=\"k-grid-aria-root\"\n            role=\"grid\"\n            [attr.aria-rowcount]=\"ariaRowCount\"\n            [attr.aria-colcount]=\"ariaColCount\">\n        <ng-template [ngIf]=\"isScrollable\">\n            <div *ngIf=\"!hideHeader\"\n                class=\"k-grid-header\"\n                role=\"presentation\"\n                [style.padding]=\"headerPadding\">\n                <div *ngIf=\"isLocked\"\n                     #lockedHeader\n                     role=\"presentation\"\n                     class=\"k-grid-header-locked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoTreeListColGroup\n                            role=\"presentation\"\n                            [columns]=\"lockedLeafColumns\">\n                        </colgroup>\n                        <thead kendoTreeListHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [reorderable]=\"reorderable\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [totalColumnsCount]=\"leafColumns.length\">\n                        </thead>\n                    </table>\n                </div><div #header class=\"k-grid-header-wrap\" role=\"presentation\" data-scrollable\n                    [kendoTreeListResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 2\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoTreeListColGroup\n                            role=\"presentation\"\n                            [columns]=\"headerLeafColumns\">\n                        </colgroup>\n                        <thead kendoTreeListHeader\n                            [resizable]=\"resizable\"\n                            role=\"presentation\"\n                            [scrollable]=\"true\"\n                            [columns]=\"headerColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [reorderable]=\"reorderable\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [totalColumnsCount]=\"leafColumns.length\">\n                        </thead>\n                    </table>\n                    <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n                        <div [style.width.px]=\"columnsContainer.unlockedWidth\"></div>\n                    </div>\n                </div>\n            </div>\n            <kendo-treelist-list\n                [view]=\"view\"\n                [loading]=\"showLoading\"\n                [rowHeight]=\"rowHeight\"\n                [total]=\"totalCount\"\n                [take]=\"pageSize\"\n                [skip]=\"skip\"\n                [trackBy]=\"trackBy\"\n                [columns]=\"columnsContainer\"\n                [filterable]=\"filterable\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\"\n                [isVirtual]=\"isVirtual\"\n                [virtualColumns]=\"virtualColumns\"\n                (scrollBottom)=\"notifyScrollBottom()\"\n                (contentScroll)=\"contentScroll.emit($event)\"\n                >\n            </kendo-treelist-list>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table [style.table-layout]=\"resizable ? 'fixed' : null\">\n                <colgroup kendoTreeListColGroup\n                    [columns]=\"leafColumns\">\n                </colgroup>\n                <thead kendoTreeListHeader\n                    *ngIf=\"!hideHeader\"\n                    [resizable]=\"resizable\"\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [reorderable]=\"reorderable\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    [columnMenu]=\"columnMenuOptions\"\n                    [columnMenuTemplate]=\"columnMenuTemplate\">\n                </thead>\n                <tbody kendoTreeListTableBody\n                    [view]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [filterable]=\"filterable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [trackBy]=\"trackBy\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <div *ngIf=\"showLoading\" kendoTreeListLoading>\n            </div>\n        </ng-template>\n        </div>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.totalVisible\"\n            [allCount]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-treelist-toolbar *ngIf=\"showBottomToolbar\" position=\"bottom\"></kendo-treelist-toolbar>\n    "
                },] },
    ];
    /** @nocollapse */
    TreeListComponent.ctorParameters = function () { return [
        { type: BrowserSupportService },
        { type: ElementRef },
        { type: ChangeNotificationService },
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
        { type: ChildExpandStateService },
        { type: OptionChangesService },
        { type: LocalizationService }
    ]; };
    TreeListComponent.propDecorators = {
        data: [{ type: Input }],
        pageSize: [{ type: Input }],
        height: [{ type: Input }],
        rowHeight: [{ type: Input }],
        skip: [{ type: Input }],
        scrollable: [{ type: Input }],
        sort: [{ type: Input }],
        trackBy: [{ type: Input }],
        filter: [{ type: Input }],
        virtualColumns: [{ type: Input }],
        filterable: [{ type: Input }],
        sortable: [{ type: Input }],
        pageable: [{ type: Input }],
        navigable: [{ type: Input }],
        navigatable: [{ type: Input }],
        autoSize: [{ type: Input }],
        rowClass: [{ type: Input }],
        resizable: [{ type: Input }],
        reorderable: [{ type: Input }],
        loading: [{ type: Input }],
        columnMenu: [{ type: Input }],
        hideHeader: [{ type: Input }],
        idField: [{ type: Input }],
        filterChange: [{ type: Output }],
        pageChange: [{ type: Output }],
        sortChange: [{ type: Output }],
        dataStateChange: [{ type: Output }],
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
        expandEvent: [{ type: Output, args: ['expand',] }],
        collapseEvent: [{ type: Output, args: ['collapse',] }],
        columns: [{ type: ContentChildren, args: [ColumnBase,] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-grid',] }, { type: HostBinding, args: ['class.k-treelist',] }],
        lockedClasses: [{ type: HostBinding, args: ['class.k-grid-lockedcolumns',] }],
        virtualClasses: [{ type: HostBinding, args: ['class.k-grid-virtual',] }],
        noScrollbarClass: [{ type: HostBinding, args: ['class.k-grid-no-scrollbar',] }],
        noRecordsTemplateChildren: [{ type: ContentChildren, args: [NoRecordsTemplateDirective,] }],
        pagerTemplateChildren: [{ type: ContentChildren, args: [PagerTemplateDirective,] }],
        toolbarTemplateChildren: [{ type: ContentChildren, args: [ToolbarTemplateDirective,] }],
        columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }],
        lockedHeader: [{ type: ViewChild, args: ["lockedHeader",] }],
        header: [{ type: ViewChild, args: ["header",] }],
        footer: [{ type: ViewChildren, args: ["footer",] }],
        ariaRoot: [{ type: ViewChild, args: ['ariaRoot',] }],
        fetchChildren: [{ type: Input }],
        hasChildren: [{ type: Input }]
    };
    return TreeListComponent;
}());
export { TreeListComponent };
export { ɵ0, ɵ1, ɵ2 };
