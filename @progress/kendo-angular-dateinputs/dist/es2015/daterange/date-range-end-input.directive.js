/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, Renderer2, NgZone } from '@angular/core';
import { cloneDate, isEqual } from '@progress/kendo-date-math';
import { DateInputComponent } from '../dateinput/dateinput.component';
import { DateRangeInput } from './date-range-input';
import { DateRangeService } from './date-range.service';
import { EMPTY_SELECTIONRANGE } from '../calendar/models/selection-range.interface';
import { clampRange, isInRange } from '../util';
import { isPresent } from '../common/utils';
/**
 * A directive which manages the end range selection.
 *
 * > You can use the DateRangeEndInputDirective only with a DateInput component.
 */
export class DateRangeEndInputDirective extends DateRangeInput {
    constructor(rangeService, dateInput, element, renderer, zone) {
        super('end', rangeService, dateInput, element, renderer, zone);
        this.rangeService = rangeService;
        this.dateInput = dateInput;
        /**
         * Specifies the navigation behavior of the calendar when the active end is changed on input focus. When enabled,
         * the calendar navigates to the value of the focused input. Otherwise, the calendar displays the last picked date.
         *
         * By default, the automatic navigation behavior on input focus is disabled.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <h5>Toggle input focus to see the calendar navigating between range ends.</h5>
         *  <kendo-daterange>
         *      <kendo-dateinput kendoDateRangeStartInput [navigateCalendarOnFocus]="true" [(value)]="start"></kendo-dateinput>
         *      <kendo-dateinput kendoDateRangeEndInput [navigateCalendarOnFocus]="true" [(value)]="end"></kendo-dateinput>
         *  </kendo-daterange>
         * `
         * })
         * export class AppComponent {
         *   public start: Date = new Date(2018, 3, 10);
         *   public end: Date = new Date(2018, 10, 20);
         * }
         * ```
         */
        this.navigateCalendarOnFocus = false;
    }
    ngOnInit() {
        this.rangeService.registerEndInput(this.dateInput);
        super.init();
    }
    ngOnDestroy() {
        super.destroy();
    }
    getRange(value, correctOn) {
        const { min, max } = this.dateInput;
        if (!isInRange(value, min, max)) {
            return null;
        }
        const { start } = this.rangeService.selectionRange || EMPTY_SELECTIONRANGE;
        const shouldClamp = this.autoCorrectOn === correctOn && isPresent(value) && value < start;
        return shouldClamp ? clampRange(value) : { start, end: cloneDate(value) };
    }
    updateInputValue(range) {
        const { end } = range || EMPTY_SELECTIONRANGE;
        const { min, max } = this.dateInput;
        if (isEqual(this.dateInput.value, end) || !isInRange(end, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(end));
        this.dateInput.notify();
    }
}
DateRangeEndInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDateRangeEndInput]'
            },] },
];
/** @nocollapse */
DateRangeEndInputDirective.ctorParameters = () => [
    { type: DateRangeService },
    { type: DateInputComponent },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
DateRangeEndInputDirective.propDecorators = {
    autoCorrectOn: [{ type: Input }],
    navigateCalendarOnFocus: [{ type: Input }]
};
