import { ColumnGroupChild } from "./columnGroupChild";
import { OriginalColumnGroupChild } from "./originalColumnGroupChild";
import { AbstractColDef, ColDef, IAggFunc } from "./colDef";
import { RowNode } from "./rowNode";
import { IEventEmitter } from "../interfaces/iEventEmitter";
import { ColumnEventType } from "../events";
import { ColumnGroup } from "./columnGroup";
import { OriginalColumnGroup } from "./originalColumnGroup";
export declare class Column implements ColumnGroupChild, OriginalColumnGroupChild, IEventEmitter {
    static EVENT_MOVING_CHANGED: string;
    static EVENT_LEFT_CHANGED: string;
    static EVENT_WIDTH_CHANGED: string;
    static EVENT_LAST_LEFT_PINNED_CHANGED: string;
    static EVENT_FIRST_RIGHT_PINNED_CHANGED: string;
    static EVENT_VISIBLE_CHANGED: string;
    static EVENT_FILTER_CHANGED: string;
    static EVENT_FILTER_ACTIVE_CHANGED: string;
    static EVENT_SORT_CHANGED: string;
    static EVENT_MENU_VISIBLE_CHANGED: string;
    static EVENT_ROW_GROUP_CHANGED: string;
    static EVENT_PIVOT_CHANGED: string;
    static EVENT_VALUE_CHANGED: string;
    private gridOptionsWrapper;
    private columnUtils;
    private columnApi;
    private gridApi;
    private context;
    private readonly colId;
    private colDef;
    private userProvidedColDef;
    private actualWidth;
    private visible;
    private pinned;
    private left;
    private oldLeft;
    private aggFunc;
    private sort;
    private sortIndex;
    private moving;
    private menuVisible;
    private lastLeftPinned;
    private firstRightPinned;
    private minWidth;
    private maxWidth;
    private filterActive;
    private eventService;
    private fieldContainsDots;
    private tooltipFieldContainsDots;
    private rowGroupActive;
    private pivotActive;
    private aggregationActive;
    private flex;
    private readonly primary;
    private parent;
    private originalParent;
    constructor(colDef: ColDef, userProvidedColDef: ColDef | null, colId: string, primary: boolean);
    private setState;
    setColDef(colDef: ColDef, userProvidedColDef: ColDef | null): void;
    getUserProvidedColDef(): ColDef | null;
    setParent(parent: ColumnGroup): void;
    getParent(): ColumnGroup;
    setOriginalParent(originalParent: OriginalColumnGroup | null): void;
    getOriginalParent(): OriginalColumnGroup | null;
    private initialise;
    private initDotNotation;
    private initMinAndMaxWidths;
    resetActualWidth(source?: ColumnEventType): void;
    isEmptyGroup(): boolean;
    isRowGroupDisplayed(colId: string): boolean;
    getUniqueId(): string;
    isPrimary(): boolean;
    isFilterAllowed(): boolean;
    isFieldContainsDots(): boolean;
    isTooltipFieldContainsDots(): boolean;
    private validate;
    addEventListener(eventType: string, listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
    private createColumnFunctionCallbackParams;
    isSuppressNavigable(rowNode: RowNode): boolean;
    isCellEditable(rowNode: RowNode): boolean;
    isRowDrag(rowNode: RowNode): boolean;
    isDndSource(rowNode: RowNode): boolean;
    isCellCheckboxSelection(rowNode: RowNode): boolean;
    isSuppressPaste(rowNode: RowNode): boolean;
    isResizable(): boolean;
    private isColumnFunc;
    setMoving(moving: boolean, source?: ColumnEventType): void;
    private createColumnEvent;
    isMoving(): boolean;
    getSort(): string | null | undefined;
    setSort(sort: string | null | undefined, source?: ColumnEventType): void;
    setMenuVisible(visible: boolean, source?: ColumnEventType): void;
    isMenuVisible(): boolean;
    isSortAscending(): boolean;
    isSortDescending(): boolean;
    isSortNone(): boolean;
    isSorting(): boolean;
    getSortIndex(): number | null | undefined;
    setSortIndex(sortOrder?: number | null): void;
    setAggFunc(aggFunc: string | IAggFunc | null | undefined): void;
    getAggFunc(): string | IAggFunc | null | undefined;
    getLeft(): number | null;
    getOldLeft(): number | null;
    getRight(): number;
    setLeft(left: number | null, source?: ColumnEventType): void;
    isFilterActive(): boolean;
    setFilterActive(active: boolean, source?: ColumnEventType, additionalEventAttributes?: any): void;
    setPinned(pinned: string | boolean | null | undefined): void;
    setFirstRightPinned(firstRightPinned: boolean, source?: ColumnEventType): void;
    setLastLeftPinned(lastLeftPinned: boolean, source?: ColumnEventType): void;
    isFirstRightPinned(): boolean;
    isLastLeftPinned(): boolean;
    isPinned(): boolean;
    isPinnedLeft(): boolean;
    isPinnedRight(): boolean;
    getPinned(): 'left' | 'right' | null | undefined;
    setVisible(visible: boolean, source?: ColumnEventType): void;
    isVisible(): boolean;
    getColDef(): ColDef;
    getColumnGroupShow(): string | undefined;
    getColId(): string;
    getId(): string;
    getDefinition(): AbstractColDef;
    getActualWidth(): number;
    private createBaseColDefParams;
    getColSpan(rowNode: RowNode): number;
    getRowSpan(rowNode: RowNode): number;
    setActualWidth(actualWidth: number, source?: ColumnEventType, silent?: boolean): void;
    fireColumnWidthChangedEvent(source: ColumnEventType): void;
    isGreaterThanMax(width: number): boolean;
    getMinWidth(): number | null | undefined;
    getMaxWidth(): number | null | undefined;
    getFlex(): number;
    setFlex(flex: number | null): void;
    setMinimum(source?: ColumnEventType): void;
    setRowGroupActive(rowGroup: boolean, source?: ColumnEventType): void;
    isRowGroupActive(): boolean;
    setPivotActive(pivot: boolean, source?: ColumnEventType): void;
    isPivotActive(): boolean;
    isAnyFunctionActive(): boolean;
    isAnyFunctionAllowed(): boolean;
    setValueActive(value: boolean, source?: ColumnEventType): void;
    isValueActive(): boolean;
    isAllowPivot(): boolean;
    isAllowValue(): boolean;
    isAllowRowGroup(): boolean;
    getMenuTabs(defaultValues: string[]): string[];
    isLockPosition(): boolean;
    isLockVisible(): boolean;
    isLockPinned(): boolean;
}
