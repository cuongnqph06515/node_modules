/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, QueryList, SimpleChange, NgZone, ChangeDetectorRef, TemplateRef, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { SortDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ScrollMode } from './scrolling/scrollmode';
import { SortSettings } from './columns/sort-settings';
import { PagerSettings } from './pager/pager-settings';
import { BrowserSupportService } from './layout/browser-support.service';
import { TreeListDataResult, ViewCollection } from './data/data.collection';
import { EditService } from './editing/edit.service';
import { PageChangeEvent, DataStateChangeEvent } from './data/change-event-args.interface';
import { ColumnsContainer } from './columns/columns-container';
import { ChangeNotificationService } from './data/change-notification.service';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { ColumnBase } from './columns/column-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { FilterService } from './filtering/filter.service';
import { PagerTemplateDirective } from './pager/pager-template.directive';
import { PDFService } from './pdf/pdf.service';
import { PDFExportEvent } from './pdf/pdf-export-event';
import { ResponsiveService } from "./layout/responsive.service";
import { ExcelService } from './excel/excel.service';
import { ExcelExportEvent } from './excel/excel-export-event';
import { ColumnList } from './columns/column-list';
import { RowClassFn, RowSelectedFn } from './rendering/common/row-class';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { EditEvent } from "./editing/edit-event-args.interface";
import { RemoveEvent } from "./editing/remove-event-args.interface";
import { SaveEvent } from "./editing/save-event-args.interface";
import { CancelEvent } from "./editing/cancel-event-args.interface";
import { AddEvent } from "./editing/add-event-args.interface";
import { CellCloseEvent } from './editing/cell-close-event';
import { CellClickEvent } from './common/cell-click-event-args.interface';
import { ScrollSyncService } from "./scrolling/scroll-sync.service";
import { DomEventsService } from './common/dom-events.service';
import { ColumnResizingService } from "./column-resizing/column-resizing.service";
import { ColumnResizeArgs } from './column-resizing/column-resize.interface';
import { FilterableSettings } from './filtering/filterable';
import { ColumnReorderService } from './dragdrop/column-reorder.service';
import { ColumnReorderEvent } from './dragdrop/column-reorder-event';
import { ColumnReorderConfig } from './dragdrop/column-reorder-config';
import { NavigationService } from './navigation/navigation.service';
import { NavigationCell } from './navigation/navigation-cell.interface';
import { NavigationRow } from './navigation/navigation-row.interface';
import { ColumnInfoService } from "./common/column-info.service";
import { ScrollRequestService, ScrollRequest } from './scrolling/scroll-request.service';
import { SortService } from './common/sort.service';
import { ColumnMenuTemplateDirective } from './column-menu/column-menu-template.directive';
import { ColumnMenuSettings } from './column-menu/column-menu-settings.interface';
import { ColumnVisibilityChangeEvent } from './column-menu/column-visibility-change-event';
import { ColumnLockedChangeEvent } from './column-menu/column-locked-change-event';
import { ScrollBottomEvent } from './scrolling/scroll-bottom-event';
import { ContentScrollEvent } from './scrolling/content-scroll-event';
import { TreeListItem } from './data/treelist-item.interface';
import { ChildExpandStateService } from './expand-state/child-expand-state.service';
import { ExpandEvent } from './expand-state/expand-event';
import { OptionChangesService } from "./common/option-changes.service";
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
export declare class TreeListComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, OnInit {
    private supportService;
    wrapper: ElementRef;
    private changeNotification;
    private editService;
    private filterService;
    private pdfService;
    private responsiveService;
    private renderer;
    private excelService;
    private ngZone;
    private scrollSyncService;
    private domEvents;
    private columnResizingService;
    private changeDetectorRef;
    private columnReorderService;
    private columnInfoService;
    private navigationService;
    private sortService;
    private scrollRequestService;
    private childExpandStateService;
    private optionChanges;
    /**
     * Sets the data of the TreeList. If an array is provided, the TreeList automatically gets the total count
     * ([more information and example]({% slug databinding_treelist %})).
     */
    data: Array<any> | TreeListDataResult | Observable<any>;
    /**
     * Defines the page size used by the TreeList when [paging]({% slug paging_treelist %}) is enabled.
     *
     * @default 10
     */
    pageSize: number;
    /**
     * Defines the height (in pixels) that is used when the `scrollable` option of the TreeList is set.
     * To set the height of the TreeList, you can also use `style.height`. The `style.height`
     * option supports units such as `px`, `%`, `em`, `rem`, and others.
     */
    height: number;
    /**
     * Defines the row height that is used when the `scrollable` option of the TreeList is set to `virtual`.
     * Required by the [virtual scrolling functionality]({% slug scrollmmodes_treelist %}).
     *
     * @hidden
     */
    rowHeight: number;
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_treelist %}) functionality.
     */
    skip: number;
    /**
     * Defines the scroll mode used by the TreeList.
     *
     * The available options are:
     *  - `none`&mdash;Renders no scrollbar.
     *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
     */
    scrollable: ScrollMode;
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_treelist %})).
     */
    sort: Array<SortDescriptor>;
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
    trackBy: TrackByFunction<TreeListItem>;
    /**
     * The descriptor by which the data will be filtered ([see examples]({% slug filtering_treelist %})).
     */
    filter: CompositeFilterDescriptor;
    /**
     * If set to `true`, the treelist will render only the columns in the current viewport.
     */
    virtualColumns: boolean;
    /**
     * @hidden
     */
    readonly showTopToolbar: boolean;
    /**
     * @hidden
     */
    readonly showBottomToolbar: boolean;
    /**
     * @hidden
     */
    readonly isLocked: boolean;
    /**
     * @hidden
     */
    readonly showPager: boolean;
    /**
     * Enables the [filtering]({% slug filtering_treelist %}) of the TreeList columns that have their `field` option set.
     */
    filterable: FilterableSettings;
    /**
     * Enables the [sorting]({% slug sorting_treelist %}) of the TreeList columns that have their `field` option set.
     */
    sortable: SortSettings;
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
    pageable: PagerSettings | boolean;
    /**
     * @hidden Not Implemented
     *
     * If set to `true`, the user can use dedicated shortcuts to interact with the TreeList.
     * By default, navigation is disabled and the TreeList content is accessible in the normal tab sequence.
     */
    navigable: boolean;
    /**
     * @hidden
     *
     * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
     */
    /**
    * @hidden
    */
    navigatable: boolean;
    /**
     * Indicates whether the TreeList columns will be resized during initialization so that
     * they fit their headers and row content. Defaults to `false`.
     * Columns with `autoSize` set to `false` are excluded.
     * To dynamically update the column width to match the new content,
     * refer to [this example]({% slug resizing_columns_treelist %}).
     */
    autoSize: boolean;
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
    rowClass: RowClassFn;
    readonly rowSelected: RowSelectedFn;
    /**
     * @hidden Not Implemented
     * Returns the currently focused cell (if any).
     */
    readonly activeCell: NavigationCell;
    /**
     * @hidden Not Implemented
     * Returns the currently focused row (if any).
     */
    readonly activeRow: NavigationRow;
    /**
     * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
     * ([see example]({% slug resizing_columns_treelist %})).
     *
     * @default false
     */
    resizable: boolean;
    /**
     * If set to `true`, the user can reorder columns by dragging their header cells
     * ([see example]({% slug reordering_columns_treelist %})).
     *
     * @default false
     */
    reorderable: boolean;
    /**
     * Specifies if the loading indicator of the TreeList will be displayed ([see example]({% slug databinding_treelist %})).
     *
     * @default false
     */
    loading: boolean;
    /**
     * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_treelist %})).
     *
     * @default false
     */
    columnMenu: boolean | ColumnMenuSettings;
    /**
     * Specifies if the header of the treelist will be hidden. The header is visible by default.
     *
     * > The header includes column headers and the [filter row]({% slug filtering_treelist %}#toc-filter-row).
     */
    hideHeader: boolean;
    /**
     * The name of the field which contains the unique identifier of the node.
     *
     * @default "id"
     */
    idField: string;
    /**
     * Fires when the TreeList filter is modified through the UI.
     * You have to handle the event yourself and filter the data.
     */
    filterChange: EventEmitter<CompositeFilterDescriptor>;
    /**
     * Fires when the page of the TreeList is changed ([see example]({% slug paging_treelist %})).
     * You have to handle the event yourself and page the data.
     */
    pageChange: EventEmitter<PageChangeEvent>;
    /**
     * Fires when the sorting of the TreeList is changed ([see example]({% slug sorting_treelist %})).
     * You have to handle the event yourself and sort the data.
     */
    sortChange: EventEmitter<Array<SortDescriptor>>;
    /**
     * Fires when the data state of the TreeList is changed.
     */
    dataStateChange: EventEmitter<DataStateChangeEvent>;
    /**
     * Fires when the user clicks the **Edit** command button to edit a row
     * ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
     */
    edit: EventEmitter<EditEvent>;
    /**
     * Fires when the user clicks the **Cancel** command button to close a row
     * ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
     */
    cancel: EventEmitter<CancelEvent>;
    /**
     * Fires when the user clicks the **Save** command button to save changes in a row
     * ([see example]({% slug editing_template_forms_treelist %}#toc-saving-records)).
     */
    save: EventEmitter<SaveEvent>;
    /**
     * Fires when the user clicks the **Remove** command button to remove a row
     * ([see example]({% slug editing_template_forms_treelist %}#toc-removing-records)).
     */
    remove: EventEmitter<RemoveEvent>;
    /**
     * Fires when the user clicks the **Add** command button to add a new row
     * ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
     */
    add: EventEmitter<AddEvent>;
    /**
     * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
     */
    cellClose: EventEmitter<CellCloseEvent>;
    /**
     * Fires when the user clicks a cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
     */
    cellClick: EventEmitter<CellClickEvent>;
    /**
     * Fires when the user clicks the **Export to PDF** command button.
     */
    pdfExport: EventEmitter<PDFExportEvent>;
    /**
     * Fires when the user clicks the **Export to Excel** command button.
     */
    excelExport: EventEmitter<ExcelExportEvent>;
    /**
     * Fires when the user completes the resizing of the column.
     */
    columnResize: EventEmitter<Array<ColumnResizeArgs>>;
    /**
     * Fires when the user completes the reordering of the column.
     */
    columnReorder: EventEmitter<ColumnReorderEvent>;
    /**
     * Fires when the user changes the visibility of the columns from the column menu or column chooser.
     */
    columnVisibilityChange: EventEmitter<ColumnVisibilityChangeEvent>;
    /**
     * Fires when the user changes the locked state of the columns from the column menu or by reordering the columns.
     */
    columnLockedChange: EventEmitter<ColumnLockedChangeEvent>;
    /**
     * Fires when the user scrolls to the last record on the page and enables endless scrolling
     * ([see example]({% slug scrollmmodes_treelist %}#toc-endless-scrolling)).
     * You have to handle the event yourself and page the data.
     */
    scrollBottom: EventEmitter<ScrollBottomEvent>;
    /**
     * Fires when the treelist content is scrolled.
     * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
     */
    contentScroll: EventEmitter<ContentScrollEvent>;
    /**
     * Fires when an item is expanded.
     */
    expandEvent: EventEmitter<ExpandEvent>;
    /**
     * Fires when an item is collapsed.
     */
    collapseEvent: EventEmitter<ExpandEvent>;
    /**
     * A query list of all declared columns.
     */
    columns: QueryList<ColumnBase>;
    readonly dir: string;
    readonly hostClasses: boolean;
    readonly lockedClasses: boolean;
    readonly virtualClasses: boolean;
    readonly noScrollbarClass: boolean;
    noRecordsTemplateChildren: QueryList<NoRecordsTemplateDirective>;
    noRecordsTemplate: NoRecordsTemplateDirective;
    pagerTemplateChildren: QueryList<PagerTemplateDirective>;
    pagerTemplate: PagerTemplateDirective;
    toolbarTemplateChildren: QueryList<ToolbarTemplateDirective>;
    toolbarTemplate: ToolbarTemplateDirective;
    columnMenuTemplates: QueryList<ColumnMenuTemplateDirective>;
    lockedHeader: any;
    header: any;
    footer: QueryList<any>;
    ariaRoot: ElementRef;
    readonly scrollbarWidth: number;
    readonly headerPadding: any;
    columnMenuOptions: any;
    columnList: ColumnList;
    columnsContainer: ColumnsContainer;
    readonly showLoading: boolean;
    readonly showFooter: boolean;
    readonly ariaRowCount: number;
    readonly ariaColCount: number;
    readonly isVirtual: boolean;
    readonly isScrollable: boolean;
    readonly visibleColumns: QueryList<ColumnBase>;
    readonly lockedColumns: QueryList<ColumnBase>;
    readonly nonLockedColumns: QueryList<ColumnBase>;
    readonly lockedLeafColumns: QueryList<ColumnBase>;
    readonly nonLockedLeafColumns: QueryList<ColumnBase>;
    readonly leafColumns: QueryList<ColumnBase>;
    readonly totalColumnLevels: number;
    readonly headerColumns: any;
    readonly headerLeafColumns: any;
    readonly lockedWidth: number;
    readonly nonLockedWidth: number;
    readonly columnMenuTemplate: TemplateRef<any>;
    readonly totalCount: number;
    /**
     * Gets or sets the callback function that retrieves the child nodes for a particular node.
     */
    fetchChildren: (node: any) => Observable<any[]> | any[];
    /**
     * Gets or sets the callback function that indicates if a particular node has child nodes.
     */
    hasChildren: (node: any) => boolean;
    localEditService: any;
    view: ViewCollection;
    private dataChanged;
    private loadedData;
    private _fetchChildren;
    private _hasChildren;
    private subscriptions;
    private dataLoadedSubscription;
    private focusElementSubscription;
    private detachElementEventHandlers;
    private rtl;
    private shouldGenerateColumns;
    private direction;
    private _data;
    private _sort;
    private _skip;
    private cachedWindowWidth;
    private _rowSelected;
    private _customNoRecordsTemplate;
    private _customPagerTemplate;
    private _customToolbarTemplate;
    private leafViewportColumns;
    private viewportColumns;
    private idGetter;
    constructor(supportService: BrowserSupportService, wrapper: ElementRef, changeNotification: ChangeNotificationService, editService: EditService, filterService: FilterService, pdfService: PDFService, responsiveService: ResponsiveService, renderer: Renderer2, excelService: ExcelService, ngZone: NgZone, scrollSyncService: ScrollSyncService, domEvents: DomEventsService, columnResizingService: ColumnResizingService, changeDetectorRef: ChangeDetectorRef, columnReorderService: ColumnReorderService, columnInfoService: ColumnInfoService, navigationService: NavigationService, sortService: SortService, scrollRequestService: ScrollRequestService, childExpandStateService: ChildExpandStateService, optionChanges: OptionChangesService, localization: LocalizationService);
    /**
     * @hidden
     */
    viewFieldAccessor(): any;
    /**
     * @hidden
     */
    onDataChange(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    attachScrollSync(): void;
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    editRow(item: any, group?: any, options?: {
        [skipFocus: string]: boolean;
    }): void;
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(item: any, isNew: boolean): void;
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group: any, parent?: any): void;
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(dataItem: any, column: number | string | any, group?: any): void;
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event was prevented.
     */
    closeCell(): boolean;
    /**
     * Closes the current cell in edit mode.
     */
    cancelCell(): void;
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    isEditing(): boolean;
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    isEditingCell(): boolean;
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_treelist %})).
     */
    saveAsPDF(): void;
    /**
     * Exports the TreeList element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-treelist-pdf` component options.
     * ([see example]({% slug pdfexport_treelist %}#toc-exporting-multiple-treelists-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF(): Promise<any>;
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_treelist %})).
     */
    saveAsExcel(): void;
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
    autoFitColumn(column: ColumnBase): void;
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
    autoFitColumns(columns?: Array<ColumnBase> | QueryList<ColumnBase>): void;
    /**
     * @hidden
     */
    notifyPageChange(source: string, event: any): void;
    /**
     * @hidden
     */
    notifyScrollBottom(): void;
    /**
     * @hidden
     */
    focusEditElement(containerSelector: () => string): void;
    /**
     * @hidden Not Implemented
     * Focuses the last active or the first cell of the TreeList.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus(): NavigationCell;
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
    focusCell(rowIndex: number, colIndex: number): NavigationCell;
    /**
     * @hidden Not Implemented
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    focusNextCell(wrap?: boolean): NavigationCell;
    /**
     * @hidden Not Implemented
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    focusPrevCell(wrap?: boolean): NavigationCell;
    /**
     * Scrolls to the specified row and column
     */
    scrollTo(request: ScrollRequest): void;
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
    reorderColumn(source: ColumnBase, destIndex: number, options?: ColumnReorderConfig): void;
    reload(item: any, reloadChildren?: boolean): void;
    /**
     * @hidden
     */
    private reorder;
    private updateColumnIndices;
    private updateIndicesForLevel;
    private columnsForLevel;
    private setEditFocus;
    private columnInstance;
    private verifySettings;
    private autoGenerateColumns;
    private attachStateChangesEmitter;
    private attachEditHandlers;
    private emitCRUDEvent;
    private attachDomEventHandlers;
    private attachElementEventHandlers;
    private matchesMedia;
    private resizeCheck;
    private emitPDFExportEvent;
    private syncHeaderHeight;
    private columnsContainerChange;
    private notifyResize;
    private assertNavigable;
    private _rowClass;
    private navigationMetadata;
    private updateNavigationMetadata;
    private applyAutoSize;
    private onColumnRangeChange;
    private dataLoaded;
    private unsubscribeDataLoaded;
}
