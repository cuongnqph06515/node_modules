/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChange, NgZone, Renderer2, ElementRef, OnInit, OnDestroy, OnChanges, TrackByFunction } from '@angular/core';
import { ColumnBase } from '../columns/column-base';
import { ChangeNotificationService } from '../data/change-notification.service';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditService } from '../editing/edit.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RowClassFn } from './common/row-class';
import { DomEventsService } from '../common/dom-events.service';
import { ColumnInfoService } from "../common/column-info.service";
import { FilterableSettings } from '../filtering/filterable';
import { NavigationService } from '../navigation/navigation.service';
import { TreeListItem } from '../data/treelist-item.interface';
import { ChildExpandStateService } from '../expand-state/child-expand-state.service';
/**
 * @hidden
 */
export declare class TableBodyComponent implements OnInit, OnDestroy, OnChanges {
    private changeNotification;
    editService: EditService;
    private localization;
    private ngZone;
    private renderer;
    private element;
    private domEvents;
    private columnInfoService;
    private navigationService;
    private childState;
    columns: Array<ColumnBase>;
    allColumns: Array<ColumnBase>;
    noRecordsTemplate: NoRecordsTemplateDirective;
    view: any;
    skip: number;
    filterable: FilterableSettings;
    noRecordsText: string;
    isLocked: boolean;
    lockedColumnsCount: number;
    totalColumnsCount: number;
    virtualColumns: boolean;
    trackBy: TrackByFunction<TreeListItem>;
    private clickSubscription;
    private cellKeydownSubscription;
    private clickTimeout;
    private headerOffset;
    rowClass: RowClassFn;
    constructor(changeNotification: ChangeNotificationService, editService: EditService, localization: LocalizationService, ngZone: NgZone, renderer: Renderer2, element: ElementRef, domEvents: DomEventsService, columnInfoService: ColumnInfoService, navigationService: NavigationService, childState: ChildExpandStateService);
    readonly newDataItem: any;
    readonly unlockedColumnsCount: number;
    isOdd(item: any): boolean;
    trackByWrapper(index: number, item: TreeListItem): any;
    trackByColumns(index: number, item: any): any;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    addRowLogicalIndex(): number;
    logicalColIndex(column: any): number;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    isEditingCell(item: any, column: any): boolean;
    isEditingRow(item: any): boolean;
    readonly columnsContainer: any;
    readonly hasFooter: boolean;
    readonly columnsSpan: number;
    readonly allColumnsSpan: number;
    readonly colSpan: number;
    readonly footerColumns: ColumnBase[];
    logicalRowIndex(rowIndex: number): number;
    private clickHandler;
    private emitCellClick;
    private cellKeydownHandler;
    private cellClickArgs;
    private expandClick;
    private rowItem;
}
