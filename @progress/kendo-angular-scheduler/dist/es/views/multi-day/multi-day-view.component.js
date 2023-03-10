import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayViewComponent } from './day-view.component';
/**
 * The component for rendering the **Multi-Day** view.
 */
var MultiDayViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultiDayViewComponent, _super);
    function MultiDayViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * Specifies the number of days that the view will render.
         * Defaults to `1`.
         */
        _this.numberOfDays = 1;
        /**
         * The invariant name for this view (`multi-day`).
         */
        _this.name = 'multiDay';
        return _this;
    }
    Object.defineProperty(MultiDayViewComponent.prototype, "selectedDateFormat", {
        get: function () {
            return this.dateFormat || this.defaultDateFormat;
        },
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}` for multiple days and `{0:D}` for a single day
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        set: function (value) {
            this.dateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "selectedShortDateFormat", {
        get: function () {
            return this.shortDateFormat || this.defaultShortDateFormat;
        },
        /**
         * The short date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}` for multiple days and `{0:d}` for a single day
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        set: function (value) {
            this.shortDateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('multiDayViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "defaultDateFormat", {
        get: function () {
            return this.numberOfDays === 1 ? '{0:D}' : '{0:D} - {1:D}';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "defaultShortDateFormat", {
        get: function () {
            return this.numberOfDays === 1 ? '{0:d}' : '{0:d} - {1:d}';
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-multi-day-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return MultiDayViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                viewName=\"day\"\n                [name]=\"name\"\n                [numberOfDays]=\"numberOfDays\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    MultiDayViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    MultiDayViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        numberOfDays: [{ type: Input }]
    };
    return MultiDayViewComponent;
}(DayViewComponent));
export { MultiDayViewComponent };
