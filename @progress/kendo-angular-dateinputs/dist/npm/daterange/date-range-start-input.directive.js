/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var dateinput_component_1 = require("../dateinput/dateinput.component");
var date_range_input_1 = require("./date-range-input");
var date_range_service_1 = require("./date-range.service");
var selection_range_interface_1 = require("../calendar/models/selection-range.interface");
var util_1 = require("../util");
/**
 * A directive which manages the start selection range.
 *
 * > You can use the DateRangeStartInputDirective only with a DateInput component.
 */
var DateRangeStartInputDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeStartInputDirective, _super);
    function DateRangeStartInputDirective(rangeService, dateInput, element, renderer, zone) {
        var _this = _super.call(this, 'start', rangeService, dateInput, element, renderer, zone) || this;
        _this.rangeService = rangeService;
        _this.dateInput = dateInput;
        /**
         * Specifies the navigation behavior of the calendar when the active end is changed on input focus.
         * When enabled, the calendar navigates to the value of the focused input. Otherwise, the calendar
         * displays the last picked date.
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
    DateRangeStartInputDirective.prototype.ngOnInit = function () {
        this.rangeService.registerStartInput(this.dateInput);
        _super.prototype.init.call(this);
    };
    DateRangeStartInputDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    DateRangeStartInputDirective.prototype.getRange = function (value, correctOn) {
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (!util_1.isInRange(value, min, max)) {
            return null;
        }
        var end = (this.rangeService.selectionRange || selection_range_interface_1.EMPTY_SELECTIONRANGE).end;
        var shouldClamp = this.autoCorrectOn === correctOn && end && value > end;
        return shouldClamp ? util_1.clampRange(value) : { start: kendo_date_math_1.cloneDate(value), end: end };
    };
    DateRangeStartInputDirective.prototype.updateInputValue = function (range) {
        var start = (range || selection_range_interface_1.EMPTY_SELECTIONRANGE).start;
        var _a = this.dateInput, min = _a.min, max = _a.max;
        if (kendo_date_math_1.isEqual(this.dateInput.value, start) || !util_1.isInRange(start, min, max)) {
            return;
        }
        this.dateInput.writeValue(kendo_date_math_1.cloneDate(start));
        this.dateInput.notify();
    };
    DateRangeStartInputDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDateRangeStartInput]'
                },] },
    ];
    /** @nocollapse */
    DateRangeStartInputDirective.ctorParameters = function () { return [
        { type: date_range_service_1.DateRangeService },
        { type: dateinput_component_1.DateInputComponent },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    DateRangeStartInputDirective.propDecorators = {
        autoCorrectOn: [{ type: core_1.Input }],
        navigateCalendarOnFocus: [{ type: core_1.Input }]
    };
    return DateRangeStartInputDirective;
}(date_range_input_1.DateRangeInput));
exports.DateRangeStartInputDirective = DateRangeStartInputDirective;
