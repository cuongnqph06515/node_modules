"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var multi_day_view_base_1 = require("./multi-day-view-base");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var templates_1 = require("../templates");
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
        return kendo_date_math_1.firstDayInWeek(kendo_date_math_1.getDate(selectedDate), this.intl.firstDay());
    };
    WeekViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-week-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return WeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [numberOfDays]=\"7\"\n                [getStartDate]=\"getStartDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WeekViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    WeekViewComponent.propDecorators = {
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }],
        allDaySlotTemplate: [{ type: core_1.ContentChild, args: [templates_1.AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: core_1.ContentChild, args: [templates_1.AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: core_1.ContentChild, args: [templates_1.MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: core_1.ContentChild, args: [templates_1.MajorTimeHeaderTemplateDirective,] }]
    };
    return WeekViewComponent;
}(multi_day_view_base_1.MultiDayViewBase));
exports.WeekViewComponent = WeekViewComponent;
