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
export class DayViewComponent extends MultiDayViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedShortDateFormat = '{0:d}';
        /**
         * The invariant name for this view (`day`).
         */
        this.name = 'day';
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('dayViewTitle');
    }
}
DayViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-day-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => DayViewComponent)
                    }],
                template: `
        <ng-template #content>
            <multi-day-view
                [name]="name"
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
DayViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
DayViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
    allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
    minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
    majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
};
