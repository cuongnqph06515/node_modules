/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChange, OnInit, OnDestroy, OnChanges, DoCheck, ChangeDetectorRef } from '@angular/core';
import { State, SortDescriptor, GroupDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridComponent } from './grid.component';
import { DataStateChangeEvent } from './data/change-event-args.interface';
import { GridDataResult } from './data/data.collection';
import { LocalDataChangesService } from './editing/local-data-changes.service';
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_grid %}),
 * [sorting]({% slug sorting_grid %}), and [grouping]({% slug groupingbasics_grid %})
 * ([more information and examples]({% slug automaticoperations_grid %})).
 */
export declare class DataBindingDirective implements OnInit, OnDestroy, DoCheck, OnChanges {
    protected grid: GridComponent;
    protected changeDetector?: ChangeDetectorRef;
    protected localDataChangesService?: LocalDataChangesService;
    /**
     * Defines the number of records that will be skipped by the pager.
     */
    skip: number;
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    sort: SortDescriptor[];
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    filter: CompositeFilterDescriptor;
    /**
     * Defines the page size used by the Grid pager.
     */
    pageSize: number;
    /**
     * The descriptors by which the data will be grouped.
     */
    group: GroupDescriptor[];
    /**
     * The array of data which will be used to populate the Grid.
     */
    data: any[];
    protected state: State;
    protected originalData: any[];
    protected dataChanged: boolean;
    private stateChangeSubscription;
    private dataChangedSubscription;
    constructor(grid: GridComponent, changeDetector?: ChangeDetectorRef, localDataChangesService?: LocalDataChangesService);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngDoCheck(): void;
    /**
     * @hidden
     */
    onStateChange(state: DataStateChangeEvent): void;
    /**
     * @hidden
     */
    rebind(): void;
    /**
     * Notifies the Grid that its data has changed.
     */
    notifyDataChange(): void;
    protected process(state: State): GridDataResult;
    protected applyState({ skip, take, sort, group, filter }: State): void;
    protected updateGridData(): void;
}
