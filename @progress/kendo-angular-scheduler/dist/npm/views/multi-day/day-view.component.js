"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var multi_day_view_base_1 = require("./multi-day-view-base");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var templates_1 = require("../templates");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-day-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return DayViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DayViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    DayViewComponent.propDecorators = {
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }],
        allDaySlotTemplate: [{ type: core_1.ContentChild, args: [templates_1.AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: core_1.ContentChild, args: [templates_1.AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: core_1.ContentChild, args: [templates_1.MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: core_1.ContentChild, args: [templates_1.MajorTimeHeaderTemplateDirective,] }]
    };
    return DayViewComponent;
}(multi_day_view_base_1.MultiDayViewBase));
exports.DayViewComponent = DayViewComponent;
