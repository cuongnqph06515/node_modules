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
import { CalendarView, DateInputFormatPlaceholder } from '@progress/kendo-angular-dateinputs';
/**
 * @hidden
 */
export declare class DateFilterComponent extends BaseFilterCellComponent implements FilterComponent, OnInit {
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
     * The default filter operator. Defaults to `contains`.
     * @type {string}
     */
    operator: string;
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    readonly currentFilter: FilterDescriptor;
    /**
     * Specifies the date format that is used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    /**
    * Specifies the date format that is used when the component is not focused.
    * By default, the `column.format` value is used (if set).
    *
    * @readonly
    * @type {string}
    */
    format: string;
    /**
     * Specifies the smallest value that is valid.
     * @type {Date}
     */
    min: Date;
    /**
     * Specifies the greatest value that is valid.
     * @type {Date}
     */
    max: Date;
    /**
     * Defines the descriptions of the format sections in the input field.
     * * `wide`&mdash;Displays the full description of the format section. For example, turns `MM` into `month`.
     * Retrieved from [CLDR](https://github.com/telerik/kendo-intl/blob/develop/docs/cldr/index.md).
     * * `narrow`&mdash;Displays the narrow description of the format section. For example, turns `MM` into `mo.`.
     * Retrieved from [CLDR](https://github.com/telerik/kendo-intl/blob/develop/docs/cldr/index.md).
     * * `short`&mdash;Displays the short description of the format section. For example, turns `MM` into `mo.`.
     * Retrieved from [CLDR](https://github.com/telerik/kendo-intl/blob/develop/docs/cldr/index.md).
     * * `formatPattern`&mdash;Directly displays the format section.
     * * [`CustomFormatPlaceholder`]({% slug api_dateinputs_dateinputcustomformatplaceholder %})&mdash;
     * An object that defines the description of the format sections.
     * For example, `{ day: 'd.', month: 'M.', year: 'y', hour: 'h.' }`.
     */
    formatPlaceholder: DateInputFormatPlaceholder;
    /**
     * Specifies the hint that the component displays when its value is `null`.
     */
    placeholder: string;
    /**
     * Defines the active view that the calendar initially renders.
     * By default, the active view is `month`.
     *
     * > You have to set `activeView` within the `topView`-`bottomView` range.
     */
    activeView: CalendarView;
    /**
     * Defines the bottommost calendar view, to which the user can navigate.
     */
    bottomView: CalendarView;
    /**
     * Defines the topmost calendar view, to which the user can navigate.
     */
    topView: CalendarView;
    /**
     * Determines whether to display a week number column in the `month` view of the Calendar.
     */
    weekNumber: boolean;
    private readonly columnFormat;
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
    private _format;
    private subscription;
    constructor(filterService: FilterService, localization: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected localizationChange(): void;
}
