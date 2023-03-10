/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnComponent } from '../columns/column.component';
import { FilterService } from './filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from './base-filter-cell.component';
import { FilterComponent } from './filter-component.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class BooleanFilterComponent extends BaseFilterCellComponent implements FilterComponent {
    protected localization: LocalizationService;
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * @hidden
     */
    operator: string;
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    readonly currentFilter: FilterDescriptor;
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    readonly currentOperator: string;
    /**
     * @hidden
     */
    items: any[];
    /**
     * @hidden
     */
    defaultItem: any;
    private subscription;
    constructor(filterService: FilterService, localization: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected localizationChange(): void;
}
