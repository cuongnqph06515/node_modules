/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input, ChangeDetectorRef } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { GridComponent } from './grid.component';
import { anyChanged, isPresent } from './utils';
import { LocalDataChangesService } from './editing/local-data-changes.service';
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_grid %}),
 * [sorting]({% slug sorting_grid %}), and [grouping]({% slug groupingbasics_grid %})
 * ([more information and examples]({% slug automaticoperations_grid %})).
 */
export class DataBindingDirective {
    constructor(grid, changeDetector, localDataChangesService) {
        this.grid = grid;
        this.changeDetector = changeDetector;
        this.localDataChangesService = localDataChangesService;
        this.state = {
            skip: 0
        };
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    /**
     * Defines the number of records that will be skipped by the pager.
     */
    set skip(value) {
        if (!isPresent(value)) {
            value = 0;
        }
        this.grid.skip = this.state.skip = value;
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        this.grid.sort = this.state.sort = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        this.grid.filter = this.state.filter = value;
    }
    /**
     * Defines the page size used by the Grid pager.
     */
    set pageSize(value) {
        this.grid.pageSize = this.state.take = value;
    }
    /**
     * The descriptors by which the data will be grouped.
     */
    set group(value) {
        this.grid.group = this.state.group = value;
    }
    /**
     * The array of data which will be used to populate the Grid.
     */
    set data(value) {
        this.originalData = value || [];
        if (this.localDataChangesService) {
            this.localDataChangesService.data = value;
        }
        this.dataChanged = true;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.applyState(this.state);
        this.stateChangeSubscription = this.grid
            .dataStateChange
            .subscribe(this.onStateChange.bind(this));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (anyChanged(["pageSize", "skip", "sort", "group", "filter"], changes)) {
            this.rebind();
        }
    }
    ngDoCheck() {
        if (this.dataChanged) {
            this.updateGridData();
        }
    }
    /**
     * @hidden
     */
    onStateChange(state) {
        this.applyState(state);
        this.rebind();
    }
    /**
     * @hidden
     */
    rebind() {
        this.data = this.originalData;
        this.updateGridData();
        this.notifyDataChange();
    }
    /**
     * Notifies the Grid that its data has changed.
     */
    notifyDataChange() {
        this.grid.onDataChange();
        if (this.changeDetector) {
            this.changeDetector.markForCheck();
        }
    }
    process(state) {
        return process(this.originalData, state);
    }
    applyState({ skip, take, sort, group, filter }) {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;
        this.group = group;
        this.filter = filter;
    }
    updateGridData() {
        this.grid.data = this.process(this.state);
        this.dataChanged = false;
    }
}
DataBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridBinding]'
            },] },
];
/** @nocollapse */
DataBindingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef },
    { type: LocalDataChangesService }
];
DataBindingDirective.propDecorators = {
    skip: [{ type: Input }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    pageSize: [{ type: Input }],
    group: [{ type: Input }],
    data: [{ type: Input, args: ["kendoGridBinding",] }]
};
