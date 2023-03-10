import { Component, forwardRef, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayViewComponent } from './day-view.component';
/**
 * The component for rendering the **Multi-Day** view.
 */
export class MultiDayViewComponent extends DayViewComponent {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * Specifies the number of days that the view will render.
         * Defaults to `1`.
         */
        this.numberOfDays = 1;
        /**
         * The invariant name for this view (`multi-day`).
         */
        this.name = 'multiDay';
    }
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D} - {1:D}` for multiple days and `{0:D}` for a single day
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    set selectedDateFormat(value) {
        this.dateFormat = value;
    }
    get selectedDateFormat() {
        return this.dateFormat || this.defaultDateFormat;
    }
    /**
     * The short date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:d} - {1:d}` for multiple days and `{0:d}` for a single day
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    set selectedShortDateFormat(value) {
        this.shortDateFormat = value;
    }
    get selectedShortDateFormat() {
        return this.shortDateFormat || this.defaultShortDateFormat;
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('multiDayViewTitle');
    }
    get defaultDateFormat() {
        return this.numberOfDays === 1 ? '{0:D}' : '{0:D} - {1:D}';
    }
    get defaultShortDateFormat() {
        return this.numberOfDays === 1 ? '{0:d}' : '{0:d} - {1:d}';
    }
}
MultiDayViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-multi-day-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => MultiDayViewComponent)
                    }],
                template: `
        <ng-template #content>
            <multi-day-view
                viewName="day"
                [name]="name"
                [numberOfDays]="numberOfDays"
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
MultiDayViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
MultiDayViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    numberOfDays: [{ type: Input }]
};
