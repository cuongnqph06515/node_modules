/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy } from '@angular/core';
import { FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { SinglePopupService } from '../../common/single-popup.service';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
import { CalendarView, DateInputFormatPlaceholder } from '@progress/kendo-angular-dateinputs';
/**
 * @hidden
 */
export declare class DateFilterMenuInputComponent implements OnDestroy {
    private popupService;
    operators: Array<{
        text: string;
        value: string;
    }>;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    operator: string;
    currentFilter: FilterDescriptor;
    filterService: FilterService;
    format: string;
    formatPlaceholder: DateInputFormatPlaceholder;
    placeholder: string;
    min: Date;
    max: Date;
    activeView: CalendarView;
    bottomView: CalendarView;
    topView: CalendarView;
    weekNumber: boolean;
    private subscription;
    constructor(popupService: SinglePopupService);
    open(picker: DatePickerComponent): void;
    ngOnDestroy(): void;
}
