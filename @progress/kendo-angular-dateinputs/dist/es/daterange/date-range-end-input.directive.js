/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var DateRangeEndInputDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeEndInputDirective, _super);
    function DateRangeEndInputDirective(rangeService, dateInput, element, renderer, zone) {
        var _this = _super.call(this, 'end', rangeService, dateInput, element, renderer, zone) || this;
        _this.rangeService = rangeService;
        _this.dateInput = dateInput;
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
        _this.navigateCalendarOnFocus = false;
        return _this;
    }
    DateRangeEndInputDirective.prototype.ngOnInit = function () {
        this.rangeService.registerEndInput(this.dateInput);
        _super.prototype.init.call(this);
    };
    DateRangeEndInputDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    DateRangeEndInputDirective.prototype.getRange = function (value, correctOn) {
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (!isInRange(value, min, max)) {
            return null;
        }
        var start = (this.rangeService.selectionRange || EMPTY_SELECTIONRANGE).start;
        var shouldClamp = this.autoCorrectOn === correctOn && isPresent(value) && value < start;
        return shouldClamp ? clampRange(value) : { start: start, end: cloneDate(value) };
    };
    DateRangeEndInputDirective.prototype.updateInputValue = function (range) {
        var end = (range || EMPTY_SELECTIONRANGE).end;
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (isEqual(this.dateInput.value, end) || !isInRange(end, min, max)) {
            return;
        }
        this.dateInput.writeValue(cloneDate(end));
        this.dateInput.notify();
    };
    DateRangeEndInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDateRangeEndInput]'
                },] },
    ];
    /** @nocollapse */
    DateRangeEndInputDirective.ctorParameters = function () { return [
        { type: DateRangeService },
        { type: DateInputComponent },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    DateRangeEndInputDirective.propDecorators = {
        autoCorrectOn: [{ type: Input }],
        navigateCalendarOnFocus: [{ type: Input }]
    };
    return DateRangeEndInputDirective;
}(DateRangeInput));
export { DateRangeEndInputDirective };
