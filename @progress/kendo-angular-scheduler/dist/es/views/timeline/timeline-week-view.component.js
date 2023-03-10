import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { TimelineBase } from './timeline-base';
import { IntlService } from '@progress/kendo-angular-intl';
import { firstDayInWeek, getDate } from '@progress/kendo-date-math';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
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
            return firstDayInWeek(getDate(selectedDate), _this.intl.firstDay());
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-timeline-week-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return TimelineWeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <timeline-multi-day-view\n                viewName=\"timeline-week\"\n                [name]=\"name\"\n                [numberOfDays]=\"7\"\n                [getStartDate]=\"getStartDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [columnWidth]=\"viewColumnWidth\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </timeline-multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineWeekViewComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    TimelineWeekViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }]
    };
    return TimelineWeekViewComponent;
}(TimelineBase));
export { TimelineWeekViewComponent };
