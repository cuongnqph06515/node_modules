"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var week_view_component_1 = require("./week-view.component");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var DAYS_IN_WEEK = 7;
/**
 * The component for rendering the **Work Week** view.
 */
var WorkWeekViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WorkWeekViewComponent, _super);
    function WorkWeekViewComponent(intl, localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, intl, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The invariant name for this view (`week`).
         */
        _this.name = 'workWeek';
        _this.getNextDate = _this.getNextDate.bind(_this);
        return _this;
    }
    Object.defineProperty(WorkWeekViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('workWeekViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkWeekViewComponent.prototype, "numberOfDays", {
        /**
         * @hidden
         */
        get: function () {
            if (this.viewWorkWeekStart > this.viewWorkWeekEnd) {
                return (DAYS_IN_WEEK - this.viewWorkWeekStart + this.viewWorkWeekEnd) + 1;
            }
            return (this.viewWorkWeekEnd - this.viewWorkWeekStart) + 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WorkWeekViewComponent.prototype.getStartDate = function (selectedDate) {
        return kendo_date_math_1.firstDayInWeek(kendo_date_math_1.getDate(selectedDate), this.viewWorkWeekStart);
    };
    /**
     * @hidden
     */
    WorkWeekViewComponent.prototype.getNextDate = function (date, count, _numberOfDays) {
        return kendo_date_math_1.getDate(kendo_date_math_1.addDays(date, DAYS_IN_WEEK * count));
    };
    WorkWeekViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-work-week-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return WorkWeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                viewName=\"workWeekview\"\n                [name]=\"name\"\n                [numberOfDays]=\"numberOfDays\"\n                [getStartDate]=\"getStartDate\"\n                [getNextDate]=\"getNextDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WorkWeekViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    return WorkWeekViewComponent;
}(week_view_component_1.WeekViewComponent));
exports.WorkWeekViewComponent = WorkWeekViewComponent;
