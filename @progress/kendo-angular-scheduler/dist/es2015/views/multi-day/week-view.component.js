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
export class WeekViewComponent extends MultiDayViewBase {
    constructor(intl, localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        this.intl = intl;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`week`).
         */
        this.name = 'week';
        this.getStartDate = this.getStartDate.bind(this);
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('weekViewTitle');
    }
    /**
     * @hidden
     */
    getStartDate(selectedDate) {
        return firstDayInWeek(getDate(selectedDate), this.intl.firstDay());
    }
}
WeekViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-week-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => WeekViewComponent)
                    }],
                template: `
        <ng-template #content>
            <multi-day-view
                [name]="name"
                [numberOfDays]="7"
                [getStartDate]="getStartDate"
                [eventHeight]="viewEventHeight"
                [currentTimeMarker]="viewCurrentTimeMarker"
                [showWorkHours]="shouldShowWorkHours"
                [scrollTime]="viewScrollTime"
                [startTime]="viewStartTime"
                [endTime]="viewEndTime"
                [workDayStart]="viewWorkDayStart"
                [workDayEnd]="viewWorkDayEnd"
                [workWeekStart]="viewWorkWeekStart"
                [workWeekEnd]="viewWorkWeekEnd"
                [slotDuration]="viewSlotDuration"
                [slotDivisions]="viewSlotDivisions"
                [slotFill]="viewSlotFill"
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [allDaySlotTemplate]="allDaySlotTemplate?.templateRef"
                [allDayEventTemplate]="allDayEventTemplate?.templateRef"
                [??ventTemplate]="eventTemplate?.templateRef"
                [groupHeaderTemplate]="groupHeaderTemplate?.templateRef"
                [timeSlotTemplate]="timeSlotTemplate?.templateRef"
                [minorTimeHeaderTemplate]="minorTimeHeaderTemplate?.templateRef"
                [majorTimeHeaderTemplate]="majorTimeHeaderTemplate?.templateRef"
                [dateHeaderTemplate]="dateHeaderTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </multi-day-view>
            <div viewFooter kendoWorkHoursFooter [showWorkHours]="shouldShowWorkHours" (itemClick)="showWorkHours = !shouldShowWorkHours"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
WeekViewComponent.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
WeekViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
    allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
    minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
    majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
};
