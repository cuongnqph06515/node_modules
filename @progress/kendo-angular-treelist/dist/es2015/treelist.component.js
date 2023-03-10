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
const createControl = (source) => (acc, key) => {
    acc[key] = new FormControl(source[key]);
    return acc;
};
const ɵ0 = createControl;
const validateColumnsField = (columns) => expandColumns(columns.toArray())
    .filter(isColumnComponent)
    .filter(({ field }) => !isValidFieldName(field))
    .forEach(({ field }) => console.warn(`
                TreeList column field name '${field}' does not look like a valid JavaScript identifier.
                Identifiers can contain only alphanumeric characters (including "$" or "_"), and may not start with a digit.
                Please use only valid identifier names to ensure error-free operation.
            `));
const ɵ1 = validateColumnsField;
const isInEditedCell = (element, treelistElement) => closest(element, matchesClasses('k-grid-edit-cell')) &&
    closest(element, matchesNodeName('kendo-treelist')) === treelistElement;
const ɵ2 = isInEditedCell;
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
export class TreeListComponent {
    constructor(supportService, wrapper, changeNotification, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, childExpandStateService, optionChanges, localization) {
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
        this.columnsContainer = new ColumnsContainer(() => this.columnList.filterHierarchy(column => {
            column.matchesMedia = this.matchesMedia(column);
            return column.isVisible;
        }));
        this.localEditService = new LocalEditService();
        this.view = new ViewCollection(this.viewFieldAccessor.bind(this), this.childExpandStateService, this.editService);
        this.dataChanged = false;
        this._hasChildren = (() => false);
        this.subscriptions = new Subscription();
        this.rtl = false;
        this.shouldGenerateColumns = true;
        this._data = [];
        this._sort = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this.idGetter = getter(undefined);
        this._rowClass = () => null;
        this.subscriptions.add(localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        }));
        this.columnInfoService.init(this.columnsContainer, () => this.columnList);
        this.subscriptions.add(this.columnInfoService.visibilityChange.subscribe((changed) => {
            this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.columnInfoService.lockedChange.subscribe((changed) => {
            this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(merge(this.optionChanges.columns, this.optionChanges.options).subscribe(() => {
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.filterService.changes.subscribe(x => {
            this.filterChange.emit(x);
        }));
        this.subscriptions.add(this.sortService.changes.subscribe(x => {
            this.sortChange.emit(x);
        }));
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.subscriptions.add(this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this)));
        this.subscriptions.add(this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this)));
        this.subscriptions.add(this.excelService.loadingChange.subscribe(() => {
            this.changeDetectorRef.detectChanges();
        }));
        this.columnsContainerChange();
        this.subscriptions.add(this.columnResizingService
            .changes
            .pipe(tap(e => {
            if (e.type === 'start') {
                this.renderer.addClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end' || e.type === 'autoFitComplete') {
                this.renderer.removeClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(e => e.type === 'end'))
            .subscribe(this.notifyResize.bind(this)));
        this.columnList = new ColumnList(this.columns);
        this.subscriptions.add(this.columnReorderService
            .changes.subscribe(this.reorder.bind(this)));
        this.subscriptions.add(this.columnInfoService.columnRangeChange.subscribe(this.onColumnRangeChange.bind(this)));
        this.subscriptions.add(this.childExpandStateService.changes.subscribe((args) => {
            if (args.expand) {
                this.expandEvent.emit(args);
            }
            else {
                this.collapseEvent.emit(args);
            }
            if (!args.isDefaultPrevented()) {
                this.changeDetectorRef.markForCheck();
                this.view.clear();
            }
        }));
        this.subscriptions.add(this.view.childrenLoaded.subscribe(() => {
            this.changeDetectorRef.detectChanges();
        }));
        this.dataLoaded = this.dataLoaded.bind(this);
        this.editService.idGetter = this.idGetter;
    }
    /**
     * Sets the data of the TreeList. If an array is provided, the TreeList automatically gets the total count
     * ([more information and example]({% slug databinding_treelist %})).
     */
    set data(value) {
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
    }
    get data() {
        return this.loadedData;
    }
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_treelist %}) functionality.
     */
    get skip() {
        return this._skip;
    }
    set skip(value) {
        if (value >= 0) {
            this._skip = value;
            this.view.clear();
        }
    }
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_treelist %})).
     */
    set sort(value) {
        if (isArray(value)) {
            this._sort = value;
        }
    }
    get sort() {
        return this._sort;
    }
    /**
     * @hidden
     */
    get showTopToolbar() {
        return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get showBottomToolbar() {
        return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    /**
     * @hidden
     */
    get showPager() {
        return !this.isVirtual && this.pageable !== false;
    }
    /**
     * @hidden
     *
     * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
     */
    set navigatable(value) {
        this.navigable = value;
    }
    /**
     * @hidden
     */
    get navigatable() {
        return this.navigable;
    }
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
    set rowClass(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`rowClass must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowClass = fn;
    }
    get rowClass() {
        return this._rowClass;
    }
    get rowSelected() {
        return this._rowSelected;
    }
    /**
     * @hidden Not Implemented
     * Returns the currently focused cell (if any).
     */
    get activeCell() {
        return this.navigationService.activeCell;
    }
    /**
     * @hidden Not Implemented
     * Returns the currently focused row (if any).
     */
    get activeRow() {
        return this.navigationService.activeRow;
    }
    /**
     * The name of the field which contains the unique identifier of the node.
     *
     * @default "id"
     */
    set idField(value) {
        if (typeof value === "function") {
            this.idGetter = value;
        }
        else {
            this.idGetter = getter(value);
        }
        this.editService.idGetter = this.idGetter;
    }
    get dir() {
        return this.direction;
    }
    get hostClasses() {
        return true;
    }
    get lockedClasses() {
        return this.lockedLeafColumns.length > 0;
    }
    get virtualClasses() {
        return this.isVirtual;
    }
    get noScrollbarClass() {
        return this.scrollbarWidth === 0;
    }
    get noRecordsTemplate() {
        if (this._customNoRecordsTemplate) {
            return this._customNoRecordsTemplate;
        }
        return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
    }
    set noRecordsTemplate(customNoRecordsTemplate) {
        this._customNoRecordsTemplate = customNoRecordsTemplate;
    }
    get pagerTemplate() {
        if (this._customPagerTemplate) {
            return this._customPagerTemplate;
        }
        return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
    }
    set pagerTemplate(customPagerTemplate) {
        this._customPagerTemplate = customPagerTemplate;
    }
    get toolbarTemplate() {
        if (this._customToolbarTemplate) {
            return this._customToolbarTemplate;
        }
        return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
    }
    set toolbarTemplate(customToolbarTemplate) {
        this._customToolbarTemplate = customToolbarTemplate;
    }
    get scrollbarWidth() {
        return this.supportService.scrollbarWidth;
    }
    get headerPadding() {
        if (isUniversal()) {
            return "";
        }
        const padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
        const right = this.rtl ? 0 : padding;
        const left = this.rtl ? padding : 0;
        return `0 ${right} 0 ${left}`;
    }
    get showLoading() {
        return this.loading || (isObservable(this._data) && !this.loadedData) || this.excelService.loading;
    }
    get showFooter() {
        return this.columnsContainer.hasFooter;
    }
    get ariaRowCount() {
        return this.totalColumnLevels + 1 + this.view.total;
    }
    get ariaColCount() {
        return this.columnsContainer.leafColumnsToRender.length;
    }
    get isVirtual() {
        return false; // this.scrollable === 'virtual';
    }
    get isScrollable() {
        return this.scrollable !== 'none';
    }
    get visibleColumns() {
        return this.columnsContainer.allColumns;
    }
    get lockedColumns() {
        return this.columnsContainer.lockedColumns;
    }
    get nonLockedColumns() {
        return this.columnsContainer.nonLockedColumns;
    }
    get lockedLeafColumns() {
        return this.columnsContainer.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columnsContainer.nonLockedLeafColumns;
    }
    get leafColumns() {
        return this.columnsContainer.leafColumns;
    }
    get totalColumnLevels() {
        return this.columnsContainer.totalLevels;
    }
    get headerColumns() {
        if (this.virtualColumns && !this.pdfService.exporting) {
            return this.viewportColumns;
        }
        return this.nonLockedColumns;
    }
    get headerLeafColumns() {
        if (this.virtualColumns && !this.pdfService.exporting) {
            return this.leafViewportColumns;
        }
        return this.nonLockedLeafColumns;
    }
    get lockedWidth() {
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), 0);
    }
    get nonLockedWidth() {
        if (!this.rtl && this.lockedLeafColumns.length) {
            return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                this.leafViewportColumns.reduce((acc, column) => acc + (column.width || 0), 0);
        }
        return undefined;
    }
    get columnMenuTemplate() {
        const template = this.columnMenuTemplates.first;
        return template ? template.templateRef : null;
    }
    get totalCount() {
        if (this.isVirtual || !isPresent(this.pageSize)) {
            return this.view.total;
        }
        return this.pageSize;
    }
    /**
     * Gets or sets the callback function that retrieves the child nodes for a particular node.
     */
    set fetchChildren(value) {
        this._fetchChildren = value;
    }
    get fetchChildren() {
        return this._fetchChildren;
    }
    /**
     * Gets or sets the callback function that indicates if a particular node has child nodes.
     */
    set hasChildren(value) {
        this._hasChildren = value;
    }
    get hasChildren() {
        return this._hasChildren;
    }
    /**
     * @hidden
     */
    viewFieldAccessor() {
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
    }
    /**
     * @hidden
     */
    onDataChange() {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        this.updateNavigationMetadata();
    }
    ngOnChanges(changes) {
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
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', `${this.height}px`);
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
            this.ngZone.onStable.pipe(take(1)).subscribe(() => this.attachScrollSync());
        }
    }
    ngAfterViewInit() {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    }
    ngAfterContentChecked() {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.onDataChange();
        }
        this.columnsContainer.refresh();
        this.verifySettings();
    }
    ngAfterContentInit() {
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        // is this needed? after content checked already does this
        this.subscriptions.add(this.columns.changes.subscribe(() => {
            this.verifySettings();
            this.optionChanges.columnChanged();
        }));
    }
    ngOnInit() {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.unsubscribeDataLoaded();
        this.ngZone = null;
    }
    /**
     * @hidden
     */
    attachScrollSync() {
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.subscriptions.add(observe(this.footer)
                .subscribe(footers => footers
                .map(footer => footer.nativeElement)
                .filter(isPresent)
                .forEach(element => this.scrollSyncService.registerEmitter(element, "footer"))));
        }
    }
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    editRow(item, group, options) {
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.editRow(item, group);
        if (options && options.skipFocus) {
            return;
        }
        this.focusEditElement(() => {
            return `tr[data-treelist-view-index="${this.view.itemIndex(item)}"]`;
        });
    }
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(item, isNew) {
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.close(item, isNew);
    }
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group, parent) {
        const isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            const fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(parent, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(() => {
            return parent ? `tr[data-treelist-view-index="${this.view.itemIndex(parent) + 1}"]` : '.k-grid-add-row';
        });
    }
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(dataItem, column, group) {
        const instance = this.columnInstance(column);
        this.editService.editCell(dataItem, instance, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(() => '.k-grid-edit-cell');
    }
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event was prevented.
     */
    closeCell() {
        return !this.editService.closeCell();
    }
    /**
     * Closes the current cell in edit mode.
     */
    cancelCell() {
        this.editService.cancelCell();
    }
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    isEditing() {
        return this.editService.isEditing();
    }
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    isEditingCell() {
        return this.editService.isEditing() && this.editService.isEditingCell();
    }
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_treelist %})).
     */
    saveAsPDF() {
        this.pdfService.save(this);
    }
    /**
     * Exports the TreeList element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-treelist-pdf` component options.
     * ([see example]({% slug pdfexport_treelist %}#toc-exporting-multiple-treelists-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF() {
        const promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    }
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_treelist %})).
     */
    saveAsExcel() {
        this.excelService.save(this);
    }
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
    autoFitColumn(column) {
        this.columnResizingService.autoFit(column);
    }
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
    autoFitColumns(columns = this.columns) {
        let cols;
        if (columns instanceof QueryList) {
            cols = columns.toArray();
        }
        else {
            cols = columns;
        }
        this.columnResizingService.autoFit(...cols);
    }
    /**
     * @hidden
     */
    notifyPageChange(source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.skip = event.skip;
        this.pageSize = event.take;
        this.closeCell();
        this.cancelCell();
        this.changeDetectorRef.markForCheck();
        this.pageChange.emit(event);
    }
    /**
     * @hidden
     */
    notifyScrollBottom() {
        if (this.scrollable === 'none') {
            return;
        }
        if (hasObservers(this.scrollBottom)) {
            this.ngZone.run(() => this.scrollBottom.emit({ sender: this }));
        }
    }
    /**
     * @hidden
     */
    focusEditElement(containerSelector) {
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(() => {
            this.focusElementSubscription = this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
                const wrapper = this.wrapper.nativeElement;
                const selector = containerSelector();
                if (!this.setEditFocus(wrapper.querySelector(selector)) && this.isLocked) {
                    this.setEditFocus(wrapper.querySelector(`.k-grid-content ${selector}`));
                }
                this.focusElementSubscription = null;
            });
        });
    }
    /**
     * @hidden Not Implemented
     * Focuses the last active or the first cell of the TreeList.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus() {
        this.assertNavigable();
        return this.navigationService.focusCell();
    }
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
    focusCell(rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    }
    /**
     * @hidden Not Implemented
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    focusNextCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    }
    /**
     * @hidden Not Implemented
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    focusPrevCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    }
    /**
     * Scrolls to the specified row and column
     */
    scrollTo(request) {
        this.scrollRequestService.scrollTo(request);
    }
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
    reorderColumn(source, destIndex, options = { before: false }) {
        const columnsForLevel = this.columnsForLevel(source.level);
        let target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        const lastNonLocked = target.isLocked &&
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
    }
    reload(item, reloadChildren) {
        if (item) {
            this.view.resetItem(item, reloadChildren);
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @hidden
     */
    reorder({ target, source, before, changeContainer }) {
        this.ngZone.run(() => {
            const columnsForLevel = this.columnsForLevel(source.level);
            let newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            let oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            const args = new ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                this.columnLockedChange.emit(new ColumnLockedChangeEvent([source]));
            }
            this.updateColumnIndices({ source, target, before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            this.columnsContainer.refresh();
            this.changeDetectorRef.markForCheck();
        });
    }
    updateColumnIndices({ source, target, before }) {
        const expandedColumns = expandColumnsWithSpan(this.columnsForLevel(source.level));
        const sourceColumnIndex = expandedColumns.indexOf(source);
        let nextSourceIndex = 0;
        let nextIndex = 0;
        let toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        let i = 0;
        while (i < expandedColumns.length) {
            let column = expandedColumns[i];
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
    }
    updateIndicesForLevel(level) {
        const colsForParentLevel = this.columnsForLevel(level - 1);
        const colsForLevel = [];
        sortColumns(colsForParentLevel).forEach((c) => {
            if (c.children) {
                colsForLevel.push(...c.children.toArray().splice(1, c.children.length - 1).sort((a, b) => a.orderIndex - b.orderIndex));
            }
        });
        expandColumnsWithSpan(colsForLevel).map((c, i) => c.orderIndex = i);
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    }
    columnsForLevel(level) {
        return this.columnsContainer
            .allColumns.filter(column => column.level === level);
    }
    setEditFocus(element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    }
    columnInstance(column) {
        let instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter((item) => item.field === column)[0];
        }
        else {
            instance = column;
        }
        if (!instance && isDevMode()) {
            throw new Error(`Invalid column ${column}`);
        }
        return instance;
    }
    verifySettings() {
        if (isDevMode()) {
            const locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(column => !column.width && !isColumnGroupComponent(column)).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter((x) => x.children.length < 2).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(x => x.locked && x.parent && !x.parent.isLocked).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight) && !this.isVirtual) {
                throw new Error('Row height setting requires virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    }
    autoGenerateColumns() {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            const columns = Object.keys(this.view.at(0).data).map(field => {
                let column = new ColumnComponent();
                column.field = field;
                return column;
            });
            columns[0].expandable = true;
            this.columns.reset(columns);
        }
    }
    attachStateChangesEmitter() {
        this.subscriptions.add(merge(this.sortChange.pipe(map(sort => ({ filter: this.filter, skip: this.skip, sort: sort, take: this.pageSize }))), this.filterChange.pipe(map(filter => ({
            filter: filter, skip: 0, sort: this.sort, take: this.pageSize
        }))))
            .subscribe(x => {
            this.closeCell();
            this.cancelCell();
            this.dataStateChange.emit(x);
        }));
    }
    attachEditHandlers() {
        if (!this.editService) {
            return;
        }
        this.subscriptions.add(this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this)));
    }
    emitCRUDEvent(args) {
        let { action, formGroup, dataItem, parent } = args;
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
    }
    attachDomEventHandlers() {
        this.subscriptions.add(this.domEvents.cellClick.subscribe((args) => {
            if (hasObservers(this.cellClick)) {
                this.ngZone.run(() => {
                    this.cellClick.emit(Object.assign({ sender: this }, args));
                });
            }
        }));
    }
    attachElementEventHandlers() {
        if (isUniversal()) {
            return;
        }
        const wrapper = this.wrapper.nativeElement;
        const ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            const resizeCheck = this.resizeCheck.bind(this);
            const resizeSubscription = this.renderer.listen('window', 'resize', resizeCheck);
            const orientationSubscription = this.renderer.listen('window', 'orientationchange', resizeCheck);
            const documentClickSubscription = this.renderer.listen('document', 'click', (args) => {
                const activeElement = document.activeElement;
                if (this.editService.shouldCloseCell() &&
                    !closest(args.target, matchesClasses('k-animation-container k-treelist-ignore-click')) &&
                    !(activeElement &&
                        (closest(activeElement, matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, this.wrapper.nativeElement)))) {
                    this.editService.closeCell(args);
                }
            });
            const windowBlurSubscription = this.renderer.listen('window', 'blur', (args) => {
                const activeElement = document.activeElement;
                if (activeElement && !(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, this.wrapper.nativeElement))) {
                    this.editService.closeCell(args);
                }
                this.domEvents.windowBlur.emit(args);
            });
            const clickSubscription = this.renderer.listen(wrapper, 'click', (args) => {
                this.domEvents.click.emit(args);
            });
            const keydownSubscription = this.renderer.listen(wrapper, 'keydown', (args) => {
                this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            let focused = false;
            const focusInSubscription = this.renderer.listen(ariaRoot, 'focusin', (args) => {
                this.domEvents.focus.emit(args);
                if (!focused) {
                    this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            const focusOutSubscription = this.renderer.listen(ariaRoot, 'focusout', (args) => {
                const next = args.relatedTarget || document.activeElement;
                const outside = !closest(next, (node) => node === ariaRoot);
                if (outside) {
                    this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            this.detachElementEventHandlers = () => {
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
    }
    matchesMedia(c) {
        return this.responsiveService.matchesMedia(c.media);
    }
    resizeCheck() {
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            let hasChanges = false;
            this.columnList.filterHierarchy(column => {
                const matchesMedia = this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges) {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                });
            }
        }
    }
    emitPDFExportEvent() {
        const args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    }
    syncHeaderHeight(observable) {
        return observable
            .pipe(filter(() => isPresent(this.lockedHeader)))
            .subscribe(() => syncRowsHeight(this.lockedHeader.nativeElement.children[0], this.header.nativeElement.children[0]));
    }
    columnsContainerChange() {
        this.subscriptions.add(this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(() => this.lockedColumns.length > 0), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))))));
    }
    notifyResize(e) {
        const args = e.resizedColumns
            .filter(item => isTruthy(item.column.resizable) && !item.column.isColumnGroup)
            .map(item => ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }));
        if (hasObservers(this.columnResize)) {
            this.ngZone.run(() => {
                this.columnResize.emit(args);
            });
        }
    }
    assertNavigable() {
        if (isDevMode() && !this.navigable) {
            throw new Error('The TreeList should be configured as [navigable]="true" to control focus');
        }
    }
    navigationMetadata() {
        const isVirtual = this.isVirtual;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRows = this.totalColumnLevels + 1 + filterRowOffset;
        return new NavigationMetadata(this.view, headerRows, isVirtual, this.showPager, this.wrapper, this.virtualColumns, this.columnsContainer);
    }
    updateNavigationMetadata() {
        this.navigationService.metadata = this.navigationMetadata();
    }
    applyAutoSize() {
        const cols = this.columns.filter((c) => this.autoSize ? c.autoSize !== false : c.autoSize);
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(_ => this.autoFitColumns(cols));
        }
    }
    onColumnRangeChange(range) {
        const viewportColumns = this.viewportColumns = [];
        const leafViewportColumns = this.columnsContainer
            .nonLockedLeafColumns.toArray().slice(range.start, range.end + 1);
        for (let idx = 0; idx < leafViewportColumns.length; idx++) {
            let column = leafViewportColumns[idx];
            while (column.parent) {
                column = column.parent;
            }
            const toAdd = [column];
            while (toAdd.length) {
                column = toAdd.shift();
                viewportColumns.push(column);
                if (column.children) {
                    toAdd.unshift.apply(toAdd, column.children.toArray().slice(1));
                }
            }
            const lastFromGroup = viewportColumns[viewportColumns.length - 1];
            column = leafViewportColumns[idx];
            while (column !== lastFromGroup && idx < leafViewportColumns.length) {
                idx++;
                column = leafViewportColumns[idx];
            }
        }
        if (range.start > 0) {
            const first = leafViewportColumns[0];
            let offset = range.offset;
            let current = viewportColumns[0];
            let index = 0;
            while (current !== first) {
                offset -= current.isColumnGroup ? 0 : current.width;
                index++;
                current = viewportColumns[index];
            }
            if (offset > 0) {
                const totalLevels = this.columnsContainer.totalLevels;
                let previous;
                for (let idx = 0; idx <= totalLevels; idx++) {
                    const offsetColumn = idx < totalLevels ? new ColumnGroupComponent(previous) : new ColumnBase(previous);
                    previous = offsetColumn;
                    offsetColumn.title = "\u00A0";
                    offsetColumn.width = offset;
                    viewportColumns.unshift(offsetColumn);
                }
            }
        }
        this.leafViewportColumns = viewportColumns.filter(c => !c.isColumnGroup);
    }
    dataLoaded(result) {
        this.loadedData = result || [];
        this.view.reset();
        this.dataChanged = true;
        this.changeDetectorRef.markForCheck();
    }
    unsubscribeDataLoaded() {
        if (this.dataLoadedSubscription) {
            this.dataLoadedSubscription.unsubscribe();
            this.dataLoadedSubscription = null;
        }
    }
}
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
                template: `
        <ng-container kendoTreeListLocalizedMessages

            i18n-noRecords="kendo.treelist.noRecords|The label visible in the TreeList when there are no records"
            noRecords="No records available."

            i18n-pagerFirstPage="kendo.treelist.pagerFirstPage|The label for the first page button in TreeList pager"
            pagerFirstPage="Go to the first page"

            i18n-pagerPreviousPage="kendo.treelist.pagerPreviousPage|The label for the previous page button in TreeList pager"
            pagerPreviousPage="Go to the previous page"

            i18n-pagerNextPage="kendo.treelist.pagerNextPage|The label for the next page button in TreeList pager"
            pagerNextPage="Go to the next page"

            i18n-pagerLastPage="kendo.treelist.pagerLastPage|The label for the last page button in TreeList pager"
            pagerLastPage="Go to the last page"

            i18n-pagerPage="kendo.treelist.pagerPage|The label before the current page number in the TreeList pager"
            pagerPage="Page"

            i18n-pagerOf="kendo.treelist.pagerOf|The label before the total pages number in the TreeList pager"
            pagerOf="of"

            i18n-pagerItems="kendo.treelist.pagerItems|The label after the total pages number in the TreeList pager"
            pagerItems="items"

            i18n-pagerItemsPerPage="kendo.treelist.pagerItemsPerPage|The label for the page size chooser in the TreeList pager"
            pagerItemsPerPage="items per page"

            i18n-filter="kendo.treelist.filter|The label of the filter cell or icon"
            filter="Filter"

            i18n-filterEqOperator="kendo.treelist.filterEqOperator|The text of the equal filter operator"
            filterEqOperator="Is equal to"

            i18n-filterNotEqOperator="kendo.treelist.filterNotEqOperator|The text of the not equal filter operator"
            filterNotEqOperator="Is not equal to"

            i18n-filterIsNullOperator="kendo.treelist.filterIsNullOperator|The text of the is null filter operator"
            filterIsNullOperator="Is null"

            i18n-filterIsNotNullOperator="kendo.treelist.filterIsNotNullOperator|The text of the is not null filter operator"
            filterIsNotNullOperator="Is not null"

            i18n-filterIsEmptyOperator="kendo.treelist.filterIsEmptyOperator|The text of the is empty filter operator"
            filterIsEmptyOperator="Is empty"

            i18n-filterIsNotEmptyOperator="kendo.treelist.filterIsNotEmptyOperator|The text of the is not empty filter operator"
            filterIsNotEmptyOperator="Is not empty"

            i18n-filterStartsWithOperator="kendo.treelist.filterStartsWithOperator|The text of the starts with filter operator"
            filterStartsWithOperator="Starts with"

            i18n-filterContainsOperator="kendo.treelist.filterContainsOperator|The text of the contains filter operator"
            filterContainsOperator="Contains"

            i18n-filterNotContainsOperator="kendo.treelist.filterNotContainsOperator|The text of the does not contain filter operator"
            filterNotContainsOperator="Does not contain"

            i18n-filterEndsWithOperator="kendo.treelist.filterEndsWithOperator|The text of the ends with filter operator"
            filterEndsWithOperator="Ends with"

            i18n-filterGteOperator="kendo.treelist.filterGteOperator|The text of the greater than or equal filter operator"
            filterGteOperator="Is greater than or equal to"

            i18n-filterGtOperator="kendo.treelist.filterGtOperator|The text of the greater than filter operator"
            filterGtOperator="Is greater than"

            i18n-filterLteOperator="kendo.treelist.filterLteOperator|The text of the less than or equal filter operator"
            filterLteOperator="Is less than or equal to"

            i18n-filterLtOperator="kendo.treelist.filterLtOperator|The text of the less than filter operator"
            filterLtOperator="Is less than"

            i18n-filterIsTrue="kendo.treelist.filterIsTrue|The text of the IsTrue boolean filter option"
            filterIsTrue="Is True"

            i18n-filterIsFalse="kendo.treelist.filterIsFalse|The text of the IsFalse boolean filter option"
            filterIsFalse="Is False"

            i18n-filterBooleanAll="kendo.treelist.filterBooleanAll|The text of the (All) boolean filter option"
            filterBooleanAll="(All)"

            i18n-filterAfterOrEqualOperator="kendo.treelist.filterAfterOrEqualOperator|The text of the after or equal date filter operator"
            filterAfterOrEqualOperator="Is after or equal to"

            i18n-filterAfterOperator="kendo.treelist.filterAfterOperator|The text of the after date filter operator"
            filterAfterOperator="Is after"

            i18n-filterBeforeOperator="kendo.treelist.filterBeforeOperator|The text of the before date filter operator"
            filterBeforeOperator="Is before"

            i18n-filterBeforeOrEqualOperator="kendo.treelist.filterBeforeOrEqualOperator|The text of the before or equal date filter operator"
            filterBeforeOrEqualOperator="Is before or equal to"

            i18n-filterFilterButton="kendo.treelist.filterFilterButton|The text of the filter button"
            filterFilterButton="Filter"

            i18n-filterClearButton="kendo.treelist.filterClearButton|The text of the clear filter button"
            filterClearButton="Clear"

            i18n-filterAndLogic="kendo.treelist.filterAndLogic|The text of the And filter logic"
            filterAndLogic="And"

            i18n-filterOrLogic="kendo.treelist.filterOrLogic|The text of the Or filter logic"
            filterOrLogic="Or"

            i18n-loading="kendo.treelist.loading|The loading text"
            loading="Loading"

            i18n-columnMenu="kendo.treelist.columnMenu|The title of the column menu icon"
            columnMenu="Column Menu"

            i18n-columns="kendo.treelist.columns|The text shown in the column menu for the columns item"
            columns="Columns"

            i18n-lock="kendo.treelist.lock|The text shown in the column menu for the lock item"
            lock="Lock"

            i18n-unlock="kendo.treelist.unlock|The text shown in the column menu for the unlock item"
            unlock="Unlock"

            i18n-sortable="kendo.treelist.sortable|The label of the sort icon"
            sortable="Sortable"

            i18n-sortAscending="kendo.treelist.sortAscending|The text shown in the column menu for the sort ascending item"
            sortAscending="Sort Ascending"

            i18n-sortDescending="kendo.treelist.sortDescending|The text shown in the column menu for the sort descending item"
            sortDescending="Sort Descending"

            i18n-sortedAscending="kendo.treelist.sortedAscending|The status announcement when a column is sorted ascending"
            sortedAscending="Sorted Ascending"

            i18n-sortedDescending="kendo.treelist.sortedDescending|The status announcement when a column is sorted descending"
            sortedDescending="Sorted Descending"

            i18n-sortedDefault="kendo.treelist.sortedDefault|The status announcement when a column is no longer sorted"
            sortedDefault="Not Sorted"

            i18n-columnsApply="kendo.treelist.columnsApply|The text shown in the column menu or column chooser for the columns apply button"
            columnsApply="Apply"

            i18n-columnsReset="kendo.treelist.columnsReset|The text shown in the column menu or column chooser for the columns reset button"
            columnsReset="Reset"
         >
        </ng-container>
        <kendo-treelist-toolbar *ngIf="showTopToolbar" position="top"></kendo-treelist-toolbar>
        <div #ariaRoot
            class="k-grid-aria-root"
            role="grid"
            [attr.aria-rowcount]="ariaRowCount"
            [attr.aria-colcount]="ariaColCount">
        <ng-template [ngIf]="isScrollable">
            <div *ngIf="!hideHeader"
                class="k-grid-header"
                role="presentation"
                [style.padding]="headerPadding">
                <div *ngIf="isLocked"
                     #lockedHeader
                     role="presentation"
                     class="k-grid-header-locked"
                     [style.width.px]="lockedWidth">
                    <table [locked]="true" role="presentation" [style.width.px]="lockedWidth">
                        <colgroup kendoTreeListColGroup
                            role="presentation"
                            [columns]="lockedLeafColumns">
                        </colgroup>
                        <thead kendoTreeListHeader
                            [resizable]="resizable"
                            [scrollable]="true"
                            [columns]="lockedColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [totalColumnsCount]="leafColumns.length">
                        </thead>
                    </table>
                </div><div #header class="k-grid-header-wrap" role="presentation" data-scrollable
                    [kendoTreeListResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 2">
                    <table role="presentation" [style.width.px]="nonLockedWidth">
                        <colgroup kendoTreeListColGroup
                            role="presentation"
                            [columns]="headerLeafColumns">
                        </colgroup>
                        <thead kendoTreeListHeader
                            [resizable]="resizable"
                            role="presentation"
                            [scrollable]="true"
                            [columns]="headerColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [totalColumnsCount]="leafColumns.length">
                        </thead>
                    </table>
                    <div *ngIf="virtualColumns" class="k-width-container" role="presentation">
                        <div [style.width.px]="columnsContainer.unlockedWidth"></div>
                    </div>
                </div>
            </div>
            <kendo-treelist-list
                [view]="view"
                [loading]="showLoading"
                [rowHeight]="rowHeight"
                [total]="totalCount"
                [take]="pageSize"
                [skip]="skip"
                [trackBy]="trackBy"
                [columns]="columnsContainer"
                [filterable]="filterable"
                [noRecordsTemplate]="noRecordsTemplate"
                (pageChange)="notifyPageChange('list', $event)"
                [rowClass]="rowClass"
                [isVirtual]="isVirtual"
                [virtualColumns]="virtualColumns"
                (scrollBottom)="notifyScrollBottom()"
                (contentScroll)="contentScroll.emit($event)"
                >
            </kendo-treelist-list>
        </ng-template>
        <ng-template [ngIf]="!isScrollable">
            <table [style.table-layout]="resizable ? 'fixed' : null">
                <colgroup kendoTreeListColGroup
                    [columns]="leafColumns">
                </colgroup>
                <thead kendoTreeListHeader
                    *ngIf="!hideHeader"
                    [resizable]="resizable"
                    [scrollable]="false"
                    [columns]="visibleColumns"
                    [totalColumnLevels]="totalColumnLevels"
                    [reorderable]="reorderable"
                    [sort]="sort"
                    [sortable]="sortable"
                    [filter]="filter"
                    [filterable]="filterable"
                    [columnMenu]="columnMenuOptions"
                    [columnMenuTemplate]="columnMenuTemplate">
                </thead>
                <tbody kendoTreeListTableBody
                    [view]="view"
                    [skip]="skip"
                    [columns]="leafColumns"
                    [filterable]="filterable"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [trackBy]="trackBy"
                    [rowClass]="rowClass">
                </tbody>
            </table>
            <div *ngIf="showLoading" kendoTreeListLoading>
            </div>
        </ng-template>
        </div>
        <kendo-pager
            *ngIf="showPager"
            [template]="pagerTemplate"
            [pageSize]="pageSize"
            [total]="view.totalVisible"
            [allCount]="view.total"
            [skip]="skip"
            [options]="pageable"
            (pageChange)="notifyPageChange('pager', $event)">
        </kendo-pager>
        <kendo-treelist-toolbar *ngIf="showBottomToolbar" position="bottom"></kendo-treelist-toolbar>
    `
            },] },
];
/** @nocollapse */
TreeListComponent.ctorParameters = () => [
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
];
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
export { ɵ0, ɵ1, ɵ2 };
