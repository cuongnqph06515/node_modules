/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FilterService } from '../filter.service';
import { FilterInputWrapperComponent } from "../filter-input-wrapper.component";
import { CompositeFilterDescriptor, FilterDescriptor } from "@progress/kendo-data-query";
/**
 * @hidden
 */
export declare class FilterMenuInputWrapperComponent extends FilterInputWrapperComponent {
    filterService: FilterService;
    private _currentFilter;
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    constructor();
    operatorChange(dataItem: any): void;
    protected filterChange(filter: CompositeFilterDescriptor): void;
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    /**
    * The current filter for the associated column field.
    * @readonly
    * @type {FilterDescriptor}
    */
    currentFilter: FilterDescriptor;
    protected updateFilter(filter: FilterDescriptor): CompositeFilterDescriptor;
    onChange(value: any): void;
}
