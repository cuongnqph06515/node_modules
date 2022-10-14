/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/**
 * The data type that is expected by the TreeList.
 */
export interface TreeListDataResult {
    data: any[];
    aggregates?: any;
}
/**
 * The data type that is expected by the TreeList.
 */
export interface ExpandState {
    isExpanded: (item: any) => boolean;
}
/**
 * The data type that is expected by the TreeList.
 */
export interface EditState {
    context: (item: any) => any;
    hasNew: (item: any) => boolean;
    newItem: any;
}
/**
 * @hidden
 */
export declare class ViewItemFactory {
    private expandState;
    private editState;
    private loaded;
    private fieldAccessor;
    observables: any[];
    private rowIndex;
    private rootLevel;
    private fetchChildren;
    private hasChildren;
    private pageable;
    private skip;
    private pageSize;
    private idGetter;
    private hasFooter;
    constructor(expandState: ExpandState, editState: EditState, loaded: any, fieldAccessor: any, rootItem?: any);
    generate(): any;
    private loadChildren;
    private inPageRange;
    private intersectsPageRange;
    private dataLevel;
    private addNew;
}
/**
 * @hidden
 */
export declare class ViewCollection {
    private fieldAccessor;
    private expandState;
    private editState;
    childrenLoaded: EventEmitter<any>;
    dataLoaded: EventEmitter<any>;
    total: number;
    totalVisible: number;
    loaded: any;
    loading: boolean;
    private loadingCount;
    private childrenSubscription;
    private _data;
    readonly data: any[];
    constructor(fieldAccessor: any, expandState: ExpandState, editState: EditState);
    readonly length: number;
    readonly first: any;
    readonly last: any;
    at(index: number): any;
    itemIndex(item: any): number;
    map(fn: (item: any, index: number, array: any[]) => any): any[];
    filter(fn: (item: any, index: number, array: any[]) => boolean): any[];
    reduce(fn: (prevValue: any, curValue: any, curIndex: number, array: any[]) => any, init: any): any;
    forEach(fn: (item: any, index: number, array: any[]) => void): void;
    some(fn: (value: any, index: number, array: any[]) => boolean): boolean;
    find(fn: (value: any, index: number, array: any[]) => boolean): any;
    toString(): string;
    reset(): void;
    resetItem(item: any, resetChildren: boolean): void;
    clear(): void;
    loadData(): void;
    private unsubscribeChildren;
}
