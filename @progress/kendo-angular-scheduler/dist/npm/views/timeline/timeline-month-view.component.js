"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var timeline_base_1 = require("./timeline-base");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
/**
 * The component for rendering the **Month** timeline view.
 */
var TimelineMonthViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineMonthViewComponent, _super);
    function TimelineMonthViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`timelineMonth`).
         */
        _this.name = 'timelineMonth';
        /**
         * @hidden
         */
        _this.getStartDate = function (selectedDate) {
            return kendo_date_math_1.firstDayOfMonth(kendo_date_math_1.getDate(selectedDate));
        };
        /**
         * @hidden
         */
        _this.getEndDate = function (selectedDate) {
            return kendo_date_math_1.addMonths(_this.getStartDate(selectedDate), 1);
        };
        /**
         * @hidden
         */
        _this.getNextDate = function (date, count) {
            return kendo_date_math_1.addMonths(date, count);
        };
        return _this;
    }
    Object.defineProperty(TimelineMonthViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('timelineMonthViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    TimelineMonthViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-timeline-month-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return TimelineMonthViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <timeline-multi-day-view\n                viewName=\"timeline-month\"\n                [name]=\"name\"\n                [getNextDate]=\"getNextDate\"\n                [getStartDate]=\"getStartDate\"\n                [getEndDate]=\"getEndDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [columnWidth]=\"viewColumnWidth\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </timeline-multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineMonthViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    TimelineMonthViewComponent.propDecorators = {
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }]
    };
    return TimelineMonthViewComponent;
}(timeline_base_1.TimelineBase));
exports.TimelineMonthViewComponent = TimelineMonthViewComponent;
