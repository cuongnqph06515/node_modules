/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ColumnComponent } from '../../columns/column.component';
import { FilterService } from '../filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from '../base-filter-cell.component';
import { FilterComponent } from '../filter-component.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class AutoCompleteFilterCellComponent extends BaseFilterCellComponent implements FilterComponent {
    protected localization: LocalizationService;
    showOperators: boolean;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    data: any[];
    valueField: string;
    readonly currentFilter: FilterDescriptor;
    readonly currentOperator: string;
    protected defaultOperators: Array<{
        text: string;
        value: string;
    }>;
    private _valueField;
    constructor(filterService: FilterService, column: ColumnComponent, localization: LocalizationService);
}
