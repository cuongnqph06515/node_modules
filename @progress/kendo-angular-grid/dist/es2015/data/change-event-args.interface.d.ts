/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SortDescriptor, GroupDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
/**
 * Arguments for the `pageChange` event.
 */
export interface PageChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
}
/**
 * Arguments for the `dataStateChange` event
 * ([more information and examples]({% slug automaticoperations_grid %})).
 */
export interface DataStateChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
    /**
     * The sort descriptors by which the data is sorted.
     */
    sort?: Array<SortDescriptor>;
    /**
     * The group descriptors by which the data is grouped.
     */
    group?: Array<GroupDescriptor>;
    /**
     * The filter descriptor by which the data is filtered.
     */
    filter?: CompositeFilterDescriptor;
}
