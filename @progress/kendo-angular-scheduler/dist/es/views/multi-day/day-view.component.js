import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { MultiDayViewBase } from './multi-day-view-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { AllDaySlotTemplateDirective, AllDayEventTemplateDirective, MinorTimeHeaderTemplateDirective, MajorTimeHeaderTemplateDirective } from '../templates';
/**
 * The component for rendering the **Day** view.
 */
var DayViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DayViewComponent, _super);
    function DayViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d}';
        /**
         * The invariant name for this view (`day`).
         */
        _this.name = 'day';
        return _this;
    }
    Object.defineProperty(DayViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('dayViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    DayViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-day-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return DayViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DayViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    DayViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
    };
    return DayViewComponent;
}(MultiDayViewBase));
export { DayViewComponent };
