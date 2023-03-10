import { Component, Input, NgZone, ViewChildren, QueryList, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayTimeSlotService } from '../day-time/day-time-slot.service';
import { createTasks } from './utils';
import { toPx } from '../utils';
import { DayTimeViewComponent } from '../day-time/day-time-view.component';
import { PDFService } from '../../pdf/pdf.service';
/**
 * @hidden
 */
export class TimelineMultiDayViewComponent extends DayTimeViewComponent {
    constructor(localization, changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService) {
        super(changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization);
        this.name = 'timeline';
        this.columnWidth = 100;
        this.viewName = 'timeline';
        this.verticalTime = false;
    }
    get classNames() {
        return `k-scheduler-${this.viewName}-view`;
    }
    ngOnChanges(changes) {
        if (changes.columnWidth) {
            this.changes.next(null);
        }
        super.ngOnChanges(changes);
    }
    reflow() {
        const slotService = this.slotService;
        this.updateContentHeight();
        slotService.containerSize = this.content.nativeElement.scrollWidth;
        const verticalResourceRows = this.verticalResources.length ? this.verticalResourceRows.toArray() : [];
        slotService.layoutTimeline(this.eventHeight, verticalResourceRows);
        if (verticalResourceRows.length) {
            slotService.forEachGroup((group, index) => {
                verticalResourceRows[index].nativeElement.style.height = `${group.timeRanges[0].slots[0].height}px`;
            });
        }
        this.syncTables();
    }
    get allEventsMessage() {
        return this.localization.get('allEvents');
    }
    get slotsCount() {
        const resources = this.horizontalResources;
        let result = this.daySlots.length * this.timeSlots.length;
        for (let idx = 0; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    timeColspan(index) {
        const timeSlots = this.timeSlots.length;
        const remainder = timeSlots % this.slotDivisions;
        return remainder === 0 || (index < timeSlots - remainder) ? this.slotDivisions : 1;
    }
    horizontalColspan(resourceIndex) {
        const resources = this.horizontalResources;
        let result = this.daySlots.length * this.timeSlots.length;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    verticalRowspan(resourceIndex) {
        const resources = this.verticalResources;
        let result = 1;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    createTasks(items, dateRange) {
        return createTasks(dateRange.start, dateRange.end, items);
    }
    onTasksChange() {
        this.items.next(this.tasks);
    }
    dragRanges(slot) {
        return this.slotService.dragRanges(slot, this.dragging.offset, true);
    }
    dragHintSize(firstSlot, lastSlot) {
        return {
            width: toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width),
            height: toPx(firstSlot.height)
        };
    }
    updateResizeHints(ranges, start, end) {
        const last = ranges[ranges.length - 1];
        super.updateResizeHints([[ranges[0][0], last[last.length - 1]]], start, end);
    }
    pdfWidth() {
        const contentWidth = this.content.nativeElement.scrollWidth;
        const timesWidth = this.times.nativeElement.offsetWidth;
        return contentWidth + timesWidth;
    }
    currentTimeArrowOffset() {
        return this.headerWrap.nativeElement.querySelector('tr:last-child').offsetTop;
    }
}
TimelineMultiDayViewComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'timeline-multi-day-view',
                providers: [
                    DayTimeSlotService
                ],
                template: `
        <div class="k-scheduler-layout k-scheduler-flex-layout" [ngClass]="classNames">
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times" #timesHeader>
                    <table class="k-scheduler-table" aria-hidden="true">
                        <tr><th></th></tr>
                        <tr><th class="k-slot-cell"></th></tr>
                        <tr *ngFor="let resource of horizontalResources; trackBy: itemIndex;">
                            <th></th>
                        </tr>
                    </table>
                </div>
                <div class="k-scheduler-header k-state-default" #header >
                    <div class="k-scheduler-header-wrap" #headerWrap>
                        <ng-container *ngIf="showCurrentTime">
                            <div *ngFor="let resource of horizontalResources | resourceIterator; trackBy: itemIndex;"
                                #currentTimeArrow class="k-current-time k-current-time-arrow-down">
                            </div>
                        </ng-container>
                        <table class="k-scheduler-table" aria-hidden="true">
                            <colgroup>
                                <col *ngFor="let slotIndex of slotsCount | repeat; trackBy: itemIndex;" [ngStyle]="{ 'width.px': columnWidth }" />
                            </colgroup>
                            <tr *ngFor="let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;">
                                <th *ngFor="let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;"
                                    class="k-slot-cell" [attr.colspan]="horizontalColspan(resourceIndex)">
                                    <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(item, resource.textField) }}</ng-container>
                                    <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef"
                                        [ngTemplateOutletContext]="{ resource: item }"></ng-container>
                                </th>
                            </tr>
                             <tr>
                                 <ng-container *ngFor="let resource of horizontalResources | resourceIterator; trackBy: itemIndex;">
                                     <ng-container *ngFor="let daySlot of daySlots; let index = index; trackBy: itemIndex;">
                                         <th [attr.colspan]="timeSlots.length" class="k-slot-cell">
                                             <span *ngIf="!dateHeaderTemplateRef" class="k-link" [ngClass]="{ 'k-nav-day': numberOfDays > 1 }" [attr.data-dayslot-index]="index">{{ daySlot.start | kendoDate: 'm'}}</span>
                                             <ng-container *ngIf="dateHeaderTemplateRef" [ngTemplateOutlet]="dateHeaderTemplateRef" [ngTemplateOutletContext]="{ date: daySlot.start }"></ng-container>
                                         </th>
                                     </ng-container>
                                 </ng-container>
                             </tr>
                             <tr>
                                 <ng-container *ngFor="let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;">
                                    <ng-container *ngFor="let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;">
                                        <ng-container *ngFor="let timeSlot of timeSlots; let index = index; trackBy: itemIndex;">
                                            <th *ngIf="timeSlot.isMajor" [attr.colspan]="timeColspan(index)" >{{ timeSlot.start | kendoDate: 't' }}</th>
                                        </ng-container>
                                    </ng-container>
                                 </ng-container>
                             </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times" #times>
                    <table class="k-scheduler-table" #timesTable aria-hidden="true">
                        <tr *ngIf="!verticalResources.length">
                            <th rowspan="1" #titleCell>
                                {{ allEventsMessage }}
                            </th>
                        </tr>
                        <ng-container *ngIf="verticalResources.length">
                            <ng-container *ngFor="let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;">
                                <tr #verticalResourceRows>
                                    <ng-container *ngFor="let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;">
                                        <th *ngIf="verticalItem(leafIndex, resourceIndex)" [attr.rowspan]="verticalRowspan(resourceIndex)" class="k-slot-cell">
                                            <div>
                                                <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>
                                                <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef"
                                                    [ngTemplateOutletContext]="{ resource: verticalItem(leafIndex, resourceIndex) }"></ng-container>
                                            </div>
                                        </th>
                                    </ng-container>
                                </tr>
                            </ng-container>
                        </ng-container>
                    </table>
                </div>
                <div class="k-scheduler-content" #content>
                    <ng-container *ngIf="showCurrentTime">
                        <div *ngFor="let resource of horizontalResources | resourceIterator; trackBy: itemIndex;"
                            class="k-current-time" #currentTimeMarker>
                        </div>
                    </ng-container>
                    <table class="k-scheduler-table" #contentTable role="presentation">
                        <colgroup>
                            <col *ngFor="let slotIndex of slotsCount | repeat; trackBy: itemIndex;" [ngStyle]="{ 'width.px': columnWidth }" />
                        </colgroup>
                        <tr *ngFor="let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;">
                            <ng-container *ngFor="let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;">
                                <ng-container *ngFor="let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;">
                                    <td *ngFor="let slot of timeSlots; let index = index; trackBy: itemIndex;"
                                            [ngClass]="timeSlotClass(slot, daySlot.start, verticalResources.length ? verticalIndex : horizontalIndex)"
                                            timeSlot #timeSlot="timeSlot"
                                            [date]="daySlot.start"
                                            [invariantStart]="slot.start"
                                            [invariantEnd]="slot.end"
                                            [workDayStart]="workDayStartTime"
                                            [workDayEnd]="workDayEndTime"
                                            [workWeekStart]="workWeekStart"
                                            [workWeekEnd]="workWeekEnd"
                                            [id]="{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }"
                                    >
                                        <ng-container *ngIf="timeSlotTemplateRef" [ngTemplateOutlet]="timeSlotTemplateRef"
                                            [ngTemplateOutletContext]="{ date: timeSlot.start, resources: resourcesByIndex(timeSlot.id.resourceIndex ) }">
                                        </ng-container>
                                    </td>
                                </ng-container>
                            </ng-container>
                        </tr>
                    </table>
                    <ng-container *ngFor="let item of items | async; trackBy: itemIndex;">
                        <div *ngFor="let itemResource of item.resources; trackBy: itemIndex;"
                            [ngClass]="getEventClasses(item, itemResource.resources)"
                            [ngStyle]="getEventStyles(item, itemResource)"
                            [kendoSchedulerFocusIndex]="itemResource.leafIdx"
                            dayTimeViewItem
                                [editable]="editable"
                                [item]="item"
                                [index]="item.index"
                                [eventTemplate]="eventTemplateRef"
                                [resources]="itemResource.resources"
                                [resourceIndex]="itemResource.leafIdx">
                        </div>
                    </ng-container>
                    <kendo-hint-container #hintContainer>
                        <ng-template>
                            <div *ngFor="let hint of dragHints; trackBy: itemIndex;"
                                class="k-event-drag-hint"
                                dayTimeViewItem
                                    [ngStyle]="hint.style"
                                    [ngClass]="hint.class"
                                    [dragHint]="true"
                                    [eventTemplate]="eventTemplateRef"
                                    [item]="hint.item"
                                    [resources]="hint.resources">
                            </div>
                            <div *ngIf="resizeHints && resizeHints.length"
                                kendoResizeHint
                                [hint]="resizeHints[0]"
                                [ngClass]="resizeHints[0].class"
                                [format]="resizeHintFormat">
                            </div>
                        </ng-template>
                    </kendo-hint-container>
                </div>
            </div>
        </div>
    `
            },] },
];
/** @nocollapse */
TimelineMultiDayViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService },
    { type: IntlService },
    { type: DayTimeSlotService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef },
    { type: PDFService }
];
TimelineMultiDayViewComponent.propDecorators = {
    name: [{ type: Input }],
    columnWidth: [{ type: Input }],
    viewName: [{ type: Input }],
    verticalResourceRows: [{ type: ViewChildren, args: ['verticalResourceRows',] }]
};
