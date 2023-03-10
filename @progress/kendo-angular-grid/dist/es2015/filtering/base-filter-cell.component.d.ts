/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { FilterService } from './filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { FilterOperatorBase } from './operators/filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare const setFilter: (index: any, filter: any, field: any, defaultOperator: any) => FilterDescriptor;
/**
 * @hidden
 */
export declare const logicOperators: (localization: LocalizationService) => {
    text: string;
    value: "or" | "and";
}[];
/**
 * @hidden
 */
export declare const flatten: (filter: CompositeFilterDescriptor) => FilterDescriptor[];
/**
 * @hidden
 */
export declare const filtersByField: (filter: CompositeFilterDescriptor, field: string) => FilterDescriptor[];
/**
 * @hidden
 */
export declare const filterByField: (filter: CompositeFilterDescriptor, field: string) => FilterDescriptor;
/**
 * @hidden
 */
export declare const removeFilter: (filter: CompositeFilterDescriptor, field: string) => CompositeFilterDescriptor;
/**
 * @hidden
 */
export declare const localizeOperators: (operators: any) => (localization: any) => {
    text: any;
    value: any;
}[];
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-row)).
 */
export declare abstract class BaseFilterCellComponent implements AfterContentInit, OnDestroy {
    protected filterService: FilterService;
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    operatorList: QueryList<FilterOperatorBase>;
    operators: Array<{
        text: string;
        value: string;
    }>;
    filter: CompositeFilterDescriptor;
    protected defaultOperators: Array<{
        text: string;
        value: string;
    }>;
    private _operators;
    private operationListSubscription;
    constructor(filterService: FilterService);
    /**
     * @hidden
     */
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    protected filterByField(field: string): FilterDescriptor;
    protected filtersByField(field: string): FilterDescriptor[];
    protected removeFilter(field: string): CompositeFilterDescriptor;
    protected updateFilter(filter: FilterDescriptor): CompositeFilterDescriptor;
    protected applyFilter(filter: CompositeFilterDescriptor): void;
}
