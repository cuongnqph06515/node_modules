/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { DateInputComponent } from '../dateinput/dateinput.component';
import { DateRangeService } from './date-range.service';
import { AutoCorrectOn } from './auto-correct-on.type';
import { SelectionRange } from '../calendar/models/selection-range.interface';
import { SelectionRangeEnd } from '../calendar/models/selection-range-end.type';
/**
 * @hidden
 */
export declare abstract class DateRangeInput {
    private activeRangeEnd;
    private dateRangeService;
    private input;
    private element;
    private renderer;
    private zone;
    navigateCalendarOnFocus: boolean;
    private readonly isActiveEnd;
    private popupSubscriptions;
    private subscriptions;
    private readonly popupCalendarActivated;
    constructor(activeRangeEnd: SelectionRangeEnd, dateRangeService: DateRangeService, input: DateInputComponent, element: ElementRef, renderer: Renderer2, zone: NgZone);
    protected init(): void;
    protected destroy(): void;
    protected abstract getRange(value: Date, correctOn?: AutoCorrectOn): SelectionRange;
    protected abstract updateInputValue(range: SelectionRange): void;
    private initPopup;
    private unsubscribePopup;
    private activate;
    private deactivate;
    private updateRange;
    private togglePopup;
    private focusActiveDate;
    private toggleActiveClass;
}
