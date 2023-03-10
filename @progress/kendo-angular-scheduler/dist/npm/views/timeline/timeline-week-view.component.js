"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var timeline_base_1 = require("./timeline-base");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
/**
 * The component for rendering the **Week** timeline view.
 */
var TimelineWeekViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineWeekViewComponent, _super);
    function TimelineWeekViewComponent(intl, localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        _this.intl = intl;
        /**
         * The long-date format that will be used for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short date format that will be used for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`timelineWeek`).
         */
        _this.name = 'timelineWeek';
        /**
         * @hidden
         */
        _this.getStartDate = function (selectedDate) {
            return kendo_date_math_1.firstDayInWeek(kendo_date_math_1.getDate(selectedDate), _this.intl.firstDay());
        };
        return _this;
    }
    Object.defineProperty(TimelineWeekViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('timelineWeekViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    TimelineWeekViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-timeline-week-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return TimelineWeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <timeline-multi-day-view\n                viewName=\"timeline-week\"\n                [name]=\"name\"\n                [numberOfDays]=\"7\"\n                [getStartDate]=\"getStartDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [columnWidth]=\"viewColumnWidth\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </timeline-multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineWeekViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    TimelineWeekViewComponent.propDecorators = {
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }]
    };
    return TimelineWeekViewComponent;
}(timeline_base_1.TimelineBase));
exports.TimelineWeekViewComponent = TimelineWeekViewComponent;
