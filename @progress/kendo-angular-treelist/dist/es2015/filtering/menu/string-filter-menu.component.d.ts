/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { StringFilterComponent } from '../string-filter.component';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 */
export declare class StringFilterMenuComponent extends StringFilterComponent {
    logicOperators: Array<{
        text: string;
        value: "and" | "or";
    }>;
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
     * The current menu filter.
     * @type {CompositeFilterDescriptor}
     */
    filter: CompositeFilterDescriptor;
    /**
     * Determines if the inputs of second criteria will displayed.
     */
    extra: boolean;
    /**
     * The `FilterService` instance which is responsible for handling the changes in the filter descriptor.
     */
    filterService: FilterService;
    constructor(localization: LocalizationService);
    readonly firstFilter: FilterDescriptor;
    readonly secondFilter: FilterDescriptor;
    logicChange(value: 'and' | 'or'): void;
    protected localizationChange(): void;
}
