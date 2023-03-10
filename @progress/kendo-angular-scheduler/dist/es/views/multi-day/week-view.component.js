import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { MultiDayViewBase } from './multi-day-view-base';
import { IntlService } from '@progress/kendo-angular-intl';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { firstDayInWeek, getDate } from '@progress/kendo-date-math';
import { AllDaySlotTemplateDirective, AllDayEventTemplateDirective, MinorTimeHeaderTemplateDirective, MajorTimeHeaderTemplateDirective } from '../templates';
/**
 * The component for rendering the **Week** view.
 */
var WeekViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WeekViewComponent, _super);
    function WeekViewComponent(intl, localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        _this.intl = intl;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        _this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        _this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`week`).
         */
        _this.name = 'week';
        _this.getStartDate = _this.getStartDate.bind(_this);
        return _this;
    }
    Object.defineProperty(WeekViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('weekViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WeekViewComponent.prototype.getStartDate = function (selectedDate) {
        return firstDayInWeek(getDate(selectedDate), this.intl.firstDay());
    };
    WeekViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-week-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return WeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [numberOfDays]=\"7\"\n                [getStartDate]=\"getStartDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WeekViewComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    WeekViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
    };
    return WeekViewComponent;
}(MultiDayViewBase));
export { WeekViewComponent };
