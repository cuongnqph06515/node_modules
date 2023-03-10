/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { FilterService } from './filter.service';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from './base-filter-cell.component';
import { FilterComponent } from './filter-component.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents a base numeric filter component.
 */
export declare abstract class NumericFilterComponent extends BaseFilterCellComponent implements FilterComponent, OnInit {
    protected localization: LocalizationService;
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
     * The default filter operator. Defaults to `eq`.
     * @type {string}
     */
    operator: string;
    /**
     * Specifies the value that is used to increment or decrement the component value.
     * @type {numeric}
     */
    step: number;
    /**
     * Specifies the smallest value that is valid.
     * @type {number}
     */
    min: number;
    /**
     * Specifies the greatest value that is valid.
     * @type {number}
     */
    max: number;
    /**
     * Specifies whether the **Up** and **Down** spin buttons will be rendered.
     * @type {boolean}
     */
    spinners: boolean;
    /**
     * Specifies the number precision applied to the component value when it is focused.
     * If the user enters a number with a greater precision than is currently configured, the component value is rounded.
     *
     * @type {number}
     */
    decimals: number;
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    /**
    * Specifies the number format used when the component is not focused.
    * By default, the `column.format` value is used (if set).
    *
    * @readonly
    * @type {string}
    */
    format: string;
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
    protected defaultOperators: Array<{
        text: string;
        value: string;
    }>;
    private readonly columnFormat;
    private _format;
    private subscription;
    constructor(filterService: FilterService, localization: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected localizationChange(): void;
}
