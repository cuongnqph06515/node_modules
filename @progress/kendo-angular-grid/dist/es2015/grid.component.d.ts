/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SelectionDirective } from './selection/selection.directive';
import { CellSelectedFn, SelectableSettings, SelectionEvent } from './selection/types';
import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, QueryList, SimpleChange, NgZone, ChangeDetectorRef, TemplateRef, TrackByFunction } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SortDescriptor, GroupDescriptor, GroupResult, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { DetailTemplateDirective } from './rendering/details/detail-template.directive';
import { ScrollMode } from './scrolling/scrollmode';
import { SortSettings } from './columns/sort-settings';
import { PagerSettings } from './pager/pager-settings';
import { BrowserSupportService } from './layout/browser-support.service';
import { GridDataResult, DataCollection } from './data/data.collection';
import { SelectionService } from './selection/selection.service';
import { EditService } from './editing/edit.service';
import { PageChangeEvent, DataStateChangeEvent } from './data/change-event-args.interface';
import { DetailsService } from './rendering/details/details.service';
import { DetailExpandEvent } from './rendering/details/detail-expand-event';
import { DetailCollapseEvent } from './rendering/details/detail-collapse-event';
import { GroupsService } from './grouping/groups.service';
import { ColumnsContainer } from './columns/columns-container';
import { GroupInfoService } from './grouping/group-info.service';
import { GroupableSettings } from './grouping/group-settings';
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
import { EditRowOptions } from './editing/edit-row-options.interface';
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
import { GridItem } from './data/grid-item.interface';
import { RowArgs } from './rendering/common/row-args';
import { CellSelectionService } from './selection/cell-selection.service';
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
export declare class GridComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, OnInit {
    private supportService;
    private selectionService;
    private cellSelectionService;
    wrapper: ElementRef;
    private groupInfoService;
    private groupsService;
    private changeNotification;
    private detailsService;
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
    /**
     * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count
     * ([more information and example]({% slug databinding_grid %})).
     */
    data: Array<any> | GridDataResult;
    /**
     * Defines the page size used by the Grid pager.
     * Required by the [paging]({% slug paging_grid %}) functionality.
     */
    pageSize: number;
    /**
     * Defines the height (in pixels) that is used when the `scrollable` option of the Grid is set.
     * To set the height of the Grid, you can also use `style.height`. The `style.height`
     * option supports units such as `px`, `%`, `em`, `rem`, and others.
     */
    height: number;
    /**
     * Defines the row height that is used when the `scrollable` option of the Grid is set to `virtual`.
     * Required by the [virtual scrolling functionality]({% slug scrollmmodes_grid %}).
     */
    rowHeight: number;
    /**
     * Defines the detail row height that is used when the `scrollable` option of the Grid is set to `virtual`.
     * Required by the [virtual scrolling functionality]({% slug scrollmmodes_grid %}).
     */
    detailRowHeight: number;
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_grid %}) functionality.
     */
    skip: number;
    /**
     * Defines the scroll mode used by the Grid.
     *
     * The available options are:
     *  - `none`&mdash;Renders no scrollbar.
     *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
     *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
     */
    scrollable: ScrollMode;
    /**
     * Enables the single-row [selection]({% slug selection_grid %}) of the Grid.
     */
    selectable: SelectableSettings | boolean;
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
     */
    sort: Array<SortDescriptor>;
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
    trackBy: TrackByFunction<GridItem>;
    /**
     * The descriptor by which the data will be filtered ([see examples]({% slug filtering_grid %})).
     */
    filter: CompositeFilterDescriptor;
    /**
     * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
     */
    /**
    */
    group: Array<GroupDescriptor>;
    /**
     * If set to `true`, the grid will render only the columns in the current viewport.
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
     * @hidden
     */
    readonly showGroupPanel: boolean;
    /**
     * @hidden
     */
    readonly groupableEmptyText: string;
    /**
     * @hidden
     */
    readonly marqueeSelection: boolean;
    /**
     * Enables the [filtering]({% slug filtering_grid %}) of the Grid columns that have their `field` option set.
     */
    filterable: FilterableSettings;
    /**
     * Enables the [sorting]({% slug sorting_grid %}) of the Grid columns that have their `field` option set.
     */
    sortable: SortSettings;
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
    pageable: PagerSettings | boolean;
    /**
     * If set to `true`, the user can group the Grid by dragging the column header cells.
     * By default, grouping is disabled ([see example]({% slug groupingbasics_grid %})).
     */
    groupable: GroupableSettings | boolean;
    /**
     * If set to `true`, the user can use dedicated shortcuts to interact with the Grid.
     * By default, navigation is disabled and the Grid content is accessible in the normal tab sequence.
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
     * Indicates whether the Grid columns will be resized during initialization so that
     * they fit their headers and row content. Defaults to `false`.
     * Columns with `autoSize` set to `false` are excluded.
     * To dynamically update the column width to match the new content,
     * refer to [this example]({% slug resizing_columns_grid %}).
     */
    autoSize: boolean;
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
    rowClass: RowClassFn;
    /**
     * Defines a Boolean function that is executed for each data row in the component
     * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
     * Determines whether the row will be selected.
     */
    rowSelected: RowSelectedFn;
    /**
     * Defines a function that determines the selected state of a data cell.
     * Returns an object with `selected` and `item` properties.
     * The cell is marked as selected only if the `selected` property equals `true`.
     *
     * The function is executed for each data cell and may be called more than once
     * as part of a change detection cycle. ([see example]({% slug grid_selection_custom %}toc-setting-the-selected-cells))
     */
    cellSelected: CellSelectedFn;
    /**
     * Returns the currently focused cell (if any).
     */
    readonly activeCell: NavigationCell;
    /**
     * Returns the currently focused row (if any).
     */
    readonly activeRow: NavigationRow;
    /**
     * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
     * ([see example]({% slug resizing_columns_grid %})).
     *
     * @default false
     */
    resizable: boolean;
    /**
     * If set to `true`, the user can reorder columns by dragging their header cells
     * ([see example]({% slug reordering_columns_grid %})).
     *
     * @default false
     */
    reorderable: boolean;
    /**
     * Specifies if the loading indicator of the Grid will be displayed ([see example]({% slug databinding_grid %})).
     *
     * @default false
     */
    loading: boolean;
    /**
     * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_grid %})).
     *
     * @default false
     */
    columnMenu: boolean | ColumnMenuSettings;
    /**
     * Specifies if the header of the grid will be hidden. The header is visible by default.
     *
     * > The header includes column headers and the [filter row]({% slug filtering_grid %}#toc-filter-row).
     */
    hideHeader: boolean;
    /**
     * Fires when the Grid filter is modified through the UI.
     * You have to handle the event yourself and filter the data.
     */
    filterChange: EventEmitter<CompositeFilterDescriptor>;
    /**
     * Fires when the page of the Grid is changed ([see example]({% slug paging_grid %})).
     * You have to handle the event yourself and page the data.
     */
    pageChange: EventEmitter<PageChangeEvent>;
    /**
     * Fires when the grouping of the Grid is changed.
     * You have to handle the event yourself and group the data ([see example]({% slug groupingbasics_grid %})).
     */
    groupChange: EventEmitter<Array<GroupDescriptor>>;
    /**
     * Fires when the sorting of the Grid is changed ([see example]({% slug sorting_grid %})).
     * You have to handle the event yourself and sort the data.
     */
    sortChange: EventEmitter<Array<SortDescriptor>>;
    /**
     * Fires when the user selects a Grid row.
     * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent %}#toc-selectionchange).
     */
    selectionChange: EventEmitter<SelectionEvent>;
    /**
     * Fires when the data state of the Grid is changed.
     */
    dataStateChange: EventEmitter<DataStateChangeEvent>;
    /**
     * Fires when the user expands a group header.
     */
    groupExpand: EventEmitter<{
        group: GroupResult;
        groupIndex: string;
    }>;
    /**
     * Fires when the user collapses a group header.
     */
    groupCollapse: EventEmitter<{
        group: GroupResult;
        groupIndex: string;
    }>;
    /**
     * Fires when the user expands a master row.
     */
    detailExpand: EventEmitter<DetailExpandEvent>;
    /**
     * Fires when the user collapses a master row.
     */
    detailCollapse: EventEmitter<DetailCollapseEvent>;
    /**
     * Fires when the user clicks the **Edit** command button to edit a row
     * ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     */
    edit: EventEmitter<EditEvent>;
    /**
     * Fires when the user clicks the **Cancel** command button to close a row
     * ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     */
    cancel: EventEmitter<CancelEvent>;
    /**
     * Fires when the user clicks the **Save** command button to save changes in a row
     * ([see example]({% slug editing_template_forms_grid %}#toc-saving-records)).
     */
    save: EventEmitter<SaveEvent>;
    /**
     * Fires when the user clicks the **Remove** command button to remove a row
     * ([see example]({% slug editing_template_forms_grid %}#toc-removing-records)).
     */
    remove: EventEmitter<RemoveEvent>;
    /**
     * Fires when the user clicks the **Add** command button to add a new row
     * ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     */
    add: EventEmitter<AddEvent>;
    /**
     * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
     */
    cellClose: EventEmitter<CellCloseEvent>;
    /**
     * Fires when the user clicks a cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
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
     * ([see example]({% slug scrollmmodes_grid %}#toc-endless-scrolling)).
     * You have to handle the event yourself and page the data.
     */
    scrollBottom: EventEmitter<ScrollBottomEvent>;
    /**
     * Fires when the grid content is scrolled.
     * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
     */
    contentScroll: EventEmitter<ContentScrollEvent>;
    /**
     * A query list of all declared columns.
     */
    columns: QueryList<ColumnBase>;
    readonly dir: string;
    readonly hostClasses: boolean;
    readonly lockedClasses: boolean;
    readonly virtualClasses: boolean;
    readonly noScrollbarClass: boolean;
    detailTemplateChildren: QueryList<DetailTemplateDirective>;
    detailTemplate: DetailTemplateDirective;
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
    selectionDirective: boolean | SelectionDirective;
    columnsContainer: ColumnsContainer;
    view: DataCollection;
    readonly hasGroupFooters: boolean;
    readonly showFooter: boolean;
    readonly showGroupFooters: boolean;
    readonly ariaRowCount: number;
    readonly ariaColCount: number;
    private shouldGenerateColumns;
    private direction;
    private _sort;
    private _group;
    private _skip;
    private cachedWindowWidth;
    private defaultSelection;
    private _rowSelected;
    private _cellSelected;
    private _customDetailTemplate;
    private _customNoRecordsTemplate;
    private _customPagerTemplate;
    private _customToolbarTemplate;
    private leafViewportColumns;
    private viewportColumns;
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
    readonly selectableSettings: SelectableSettings;
    readonly columnMenuTemplate: TemplateRef<any>;
    readonly totalCount: number;
    private selectionSubscription;
    private stateChangeSubscription;
    private groupExpandCollapseSubscription;
    private editServiceSubscription;
    private detailsServiceSubscription;
    private filterSubscription;
    private sortSubscription;
    private columnsChangeSubscription;
    private pdfSubscription;
    private excelSubscription;
    private columnsContainerChangeSubscription;
    private cellClickSubscription;
    private footerChangeSubscription;
    private columnResizingSubscription;
    private columnReorderSubscription;
    private detachElementEventHandlers;
    private localizationSubscription;
    private columnVisibilityChangeSubscription;
    private columnLockedChangeSubscription;
    private focusElementSubscription;
    private columnRangeChangeSubscription;
    private rtl;
    constructor(supportService: BrowserSupportService, selectionService: SelectionService, cellSelectionService: CellSelectionService, wrapper: ElementRef, groupInfoService: GroupInfoService, groupsService: GroupsService, changeNotification: ChangeNotificationService, detailsService: DetailsService, editService: EditService, filterService: FilterService, pdfService: PDFService, responsiveService: ResponsiveService, renderer: Renderer2, excelService: ExcelService, ngZone: NgZone, scrollSyncService: ScrollSyncService, domEvents: DomEventsService, columnResizingService: ColumnResizingService, changeDetectorRef: ChangeDetectorRef, columnReorderService: ColumnReorderService, columnInfoService: ColumnInfoService, navigationService: NavigationService, sortService: SortService, scrollRequestService: ScrollRequestService, localization: LocalizationService);
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
    expandRow(index: number): void;
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
    collapseRow(index: number): void;
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
    expandGroup(index: string): void;
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
    collapseGroup(index: string): void;
    /**
     * @hidden
     */
    resetGroupsState(): void;
    /**
     * @hidden
     */
    expandGroupChildren(groupIndex: string): void;
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
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param rowIndex - The data row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options configuring the focus target once the editor opens.
     */
    editRow(rowIndex: number, group?: FormGroup, options?: EditRowOptions): void;
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(index?: number): void;
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group: any): void;
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The data row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(rowIndex: number, column: number | string | any, group?: any): void;
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
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
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    saveAsPDF(): void;
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF(): Promise<any>;
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    saveAsExcel(): void;
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
    autoFitColumn(column: ColumnBase): void;
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
    focusEditElement(containerSelector: string): void;
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus(): NavigationCell;
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
    focusCell(rowIndex: number, colIndex: number): NavigationCell;
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    focusNextCell(wrap?: boolean): NavigationCell;
    /**
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
    reorderColumn(source: ColumnBase, destIndex: number, options?: ColumnReorderConfig): void;
    /**
     * A function which determines if a specific row is expanded.
     */
    isDetailExpanded: (args: RowArgs) => boolean;
    /**
     * @hidden
     */
    private reorder;
    private updateColumnIndices;
    private updateIndicesForLevel;
    private columnsForLevel;
    private initSelectionService;
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
    private handleColumnResize;
    private notifyResize;
    private assertNavigable;
    private _rowClass;
    private navigationMetadata;
    private updateNavigationMetadata;
    private applyAutoSize;
    private onColumnRangeChange;
    private toggleDetailRowLegacy;
    private shouldResetSelection;
}
