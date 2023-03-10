import { Component, Input, NgZone, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BehaviorSubject } from 'rxjs';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayTimeSlotService } from '../day-time/day-time-slot.service';
import { createTasks, isMultiDay } from './utils';
import { DayTimeViewComponent } from '../day-time/day-time-view.component';
import { HintContainerComponent } from '../common/hint-container.component';
import { toPx, dateWithTime, elementOffset, toUTCTime, toUTCDate } from '../utils';
import { PDFService } from '../../pdf/pdf.service';
/**
 * @hidden
 */
export class MultiDayViewRendererComponent extends DayTimeViewComponent {
    constructor(localization, viewContext, viewState, intl, slotService, zone, renderer, element, changeDetector, pdfService) {
        super(changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization);
        this.name = 'day';
        this.dateFormat = { skeleton: 'MEd' };
        this.allDayResizeHintFormat = { skeleton: 'Md' };
        this.allDayItems = new BehaviorSubject(null);
    }
    get allDaySlotTemplateRef() {
        return this.allDaySlotTemplate || (this.schedulerAllDaySlotTemplate || {}).templateRef;
    }
    get allDayEventTemplateRef() {
        return this.allDayEventTemplate || (this.schedulerAllDayEventTemplate || {}).templateRef;
    }
    get minorTimeHeaderTemplateRef() {
        return this.minorTimeHeaderTemplate || (this.schedulerMinorTimeHeaderTemplate || {}).templateRef;
    }
    get majorTimeHeaderTemplateRef() {
        return this.majorTimeHeaderTemplate || (this.schedulerMajorTimeHeaderTemplate || {}).templateRef;
    }
    get allDayMessage() {
        return this.localization.get('allDay');
    }
    get allDayResizeHint() {
        return this.resizing && this.resizing.task.isAllDay;
    }
    get allDayDragHint() {
        return this.dragging && this.dragging.slot.isDaySlot;
    }
    optionsChange(changes) {
        this.schedulerAllDaySlotTemplate = changes.allDaySlotTemplate;
        this.schedulerAllDayEventTemplate = changes.allDayEventTemplate;
        this.schedulerMinorTimeHeaderTemplate = changes.minorTimeHeaderTemplate;
        this.schedulerMajorTimeHeaderTemplate = changes.majorTimeHeaderTemplate;
        super.optionsChange(changes);
    }
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes.slotFill) {
            this.changes.next(null);
        }
    }
    horizontalColspan(resourceIndex) {
        const resources = this.horizontalResources;
        let result = this.daySlots.length;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    verticalRowspan(resourceIndex) {
        const resources = this.verticalResources;
        let result = this.timeSlots.length + 1;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    allDaySlotClass(slot, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: slot.start,
                end: slot.end,
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: true
            });
        }
    }
    createTasks(items, dateRange) {
        const startTimeSlot = this.timeSlots[0];
        const endTimeSlot = this.timeSlots[this.timeSlots.length - 1].end;
        const nextDateEnd = !(endTimeSlot.getHours() || endTimeSlot.getMinutes());
        const ranges = this.daySlots.map(daySlot => ({
            start: toUTCTime(daySlot.start, startTimeSlot.start),
            end: nextDateEnd ? toUTCDate(daySlot.end) : toUTCTime(daySlot.start, endTimeSlot)
        }));
        return createTasks(dateRange.start, dateRange.end, items, ranges);
    }
    onTasksChange() {
        this.items.next(this.tasks.filter(task => !task.isAllDay));
        this.allDayItems.next(this.tasks.filter(task => task.isAllDay));
    }
    reflow() {
        const slotService = this.slotService;
        if (!this.verticalResources.length) {
            this.updateContentHeight();
            this.syncTables();
        }
        this.slotService.containerSize = this.content.nativeElement.clientWidth;
        slotService.layoutDays(this.eventHeight);
        this.updateContentHeight();
        this.syncTables();
        if (this.dayCells.length) {
            const cells = this.dayCells.toArray();
            if (this.verticalResources.length) {
                slotService.forEachDateRange((range, index) => {
                    const slot = range.firstSlot;
                    cells[index].nativeElement.style.height = `${slot.rect.height - slot.padding}px`;
                });
            }
            else {
                const size = slotService.syncDateRanges();
                cells[0].nativeElement.style.height = `${size}px`;
            }
        }
        slotService.layoutTimes({ fill: this.slotFill });
        this.syncTables();
    }
    dragHorizontal(slot) {
        return slot.isDaySlot;
    }
    updateHintContainer() {
        if (this.headerHintContainer) {
            this.headerHintContainer.detectChanges();
        }
        super.updateHintContainer();
    }
    onRelease() {
        super.onRelease();
        this.dragContainers = null;
    }
    updateDragContainer(args) {
        if (!this.dragContainers) {
            this.dragContainers = this.containers;
        }
        const container = this.dragContainers.find(c => {
            const offset = c.offset;
            return offset.top <= args.pageY && args.pageY <= offset.top + offset.height;
        }) || {};
        this.container = container.element;
        this.containerOffset = container.offset;
    }
    containerByPosition({ x, y }) {
        return this.containers.find(c => {
            const offset = c.offset;
            return offset.top <= y && y <= offset.top + offset.height && offset.left <= x && x <= offset.left + offset.width;
        });
    }
    get containers() {
        const header = this.headerWrap.nativeElement.children[1];
        const content = this.content.nativeElement;
        return [{
                element: content,
                offset: elementOffset(content)
            }, {
                element: header,
                offset: elementOffset(header)
            }];
    }
    scrollContainer(callback, args) {
        clearInterval(this.scrollInterval);
        if (this.container && this.container === this.content.nativeElement) {
            super.scrollContainer(callback, args);
        }
    }
    dragRanges(slot) {
        const task = this.dragging.task;
        if (slot.isDaySlot && !task.isAllDay) {
            return {
                ranges: [[slot]],
                start: dateWithTime(slot.start, task.start.toUTCDate()),
                end: dateWithTime(slot.start, task.end.toUTCDate()),
                isAllDay: true
            };
        }
        const allDayToTime = task.isAllDay && !slot.isDaySlot;
        const result = this.slotService.dragRanges(slot, allDayToTime ? { start: 0, end: 0 } : this.dragging.offset);
        if (allDayToTime) {
            result.end = slot.end;
        }
        result.isAllDay = this.draggedIsAllDay(task, slot);
        return result;
    }
    dragHintEventStyleArgs() {
        return {
            event: this.dragging.task.event,
            resources: this.dragging.resourceItems,
            isAllDay: Boolean(this.allDayDragHint)
        };
    }
    draggedIsAllDay(task, slot) {
        return Boolean(slot.isDaySlot && (task.event.isAllDay || !isMultiDay(task)));
    }
    dragHintSize(firstSlot, lastSlot) {
        let width, height;
        if (firstSlot.isDaySlot) {
            width = toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width);
            height = toPx(firstSlot.height);
        }
        else {
            width = toPx(firstSlot.rect.width * 0.9);
            height = toPx(this.dragging.task.isAllDay ? firstSlot.rect.height : lastSlot.rect.top - firstSlot.rect.top + lastSlot.rect.height);
        }
        return { width, height };
    }
    currentTimeArrowOffset() {
        if (this.verticalResources.length) {
            const el = this.times.nativeElement.querySelector('.k-scheduler-times-all-day');
            const timesEl = this.times.nativeElement;
            return this.localization.rtl ? timesEl.offsetWidth - el.offsetWidth : el.offsetLeft;
        }
        return 0;
    }
}
MultiDayViewRendererComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'multi-day-view',
                providers: [
                    DayTimeSlotService
                ],
                template: `
        <div class="k-scheduler-layout k-scheduler-flex-layout" [ngClass]="classNames">
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times" #timesHeader>
                    <table class="k-scheduler-table" aria-hidden="true">
                        <tr *ngFor="let resource of horizontalResources; trackBy: itemIndex;">
                            <th></th>
                        </tr>
                        <tr>
                            <th>???</th>
                        </tr>
                        <tr *ngIf="!verticalResources.length">
                            <th class="k-scheduler-times-all-day" #allDayCell>{{ allDayMessage }}</th>
                        </tr>
                    </table>
                </div>
                <div class="k-scheduler-header k-state-default" #header>
                    <div class="k-scheduler-header-wrap" #headerWrap>
                        <table class="k-scheduler-table" aria-hidden="true">
                            <tr *ngFor="let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;">
                                <th *ngFor="let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;"
                                    class="k-slot-cell" [attr.colspan]="horizontalColspan(resourceIndex)">
                                    <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(item, resource.textField) }}</ng-container>
                                    <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef" [ngTemplateOutletContext]="{ resource: item }"></ng-container>
                                </th>
                            </tr>
                            <tr>
                                <ng-container *ngFor="let resource of horizontalResources | resourceIterator; trackBy: itemIndex;">
                                    <th *ngFor="let slot of daySlots; let index = index; trackBy: itemIndex">
                                        <span *ngIf="!dateHeaderTemplateRef" class="k-link k-nav-day" [attr.data-dayslot-index]="index">{{ slot.start | kendoDate: dateFormat }}</span>
                                        <ng-container *ngIf="dateHeaderTemplateRef" [ngTemplateOutlet]="dateHeaderTemplateRef" [ngTemplateOutletContext]="{ date: slot.start }"></ng-container>
                                    </th>
                                </ng-container>
                            </tr>
                        </table>
                        <div style="position: relative;" *ngIf="!verticalResources.length">
                            <table class="k-scheduler-table k-scheduler-header-all-day" aria-hidden="true">
                                <tr>
                                    <ng-container *ngFor="let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;">
                                        <td *ngFor="let slot of daySlots; let index = index; trackBy: itemIndex"
                                            daySlot
                                            [start]="slot.start"
                                            [end]="slot.end"
                                            [id]="{ resourceIndex: resourceIndex, rangeIndex: 0, index: index }"
                                            [ngClass]="allDaySlotClass(slot, resourceIndex)">
                                            <ng-container *ngIf="allDaySlotTemplateRef" [ngTemplateOutlet]="allDaySlotTemplateRef"
                                                [ngTemplateOutletContext]="{ date: slot.start, resources: resourcesByIndex(resourceIndex) }"></ng-container>
                                        </td>
                                    </ng-container>
                                </tr>
                            </table>
                            <ng-container *ngFor="let item of allDayItems | async; trackBy: itemIndex;">
                                <div *ngFor="let itemResource of item.resources; trackBy: itemIndex;"
                                    [ngClass]="getEventClasses(item, itemResource.resources, true)"
                                    [ngStyle]="getEventStyles(item, itemResource, true)"
                                    [kendoSchedulerFocusIndex]="itemResource.leafIdx"
                                     dayTimeViewItem
                                        [isAllDay]="true"
                                        [editable]="editable"
                                        [eventTemplate]="allDayEventTemplateRef"
                                        [item]="item"
                                        [index]="item.index"
                                        [resources]="itemResource.resources"
                                        [resourceIndex]="itemResource.leafIdx">
                                </div>
                            </ng-container>
                            <kendo-hint-container #headerHintContainer>
                                <ng-template>
                                    <div *ngIf="dragHints.length && allDayDragHint"
                                        class="k-event-drag-hint"
                                        dayTimeViewItem
                                            [isAllDay]="true"
                                            [ngStyle]="dragHints[0].style"
                                            [ngClass]="dragHints[0].class"
                                            [dragHint]="true"
                                            [eventTemplate]="eventTemplateRef"
                                            [item]="dragHints[0].item"
                                            [resources]="dragHints[0].resources">
                                    </div>

                                    <div *ngIf="resizeHints.length && allDayResizeHint"
                                        kendoResizeHint
                                            [hint]="resizeHints[0]"
                                            [ngClass]="resizeHints[0].class"
                                            [format]="allDayResizeHintFormat">
                                    </div>
                                </ng-template>
                            </kendo-hint-container>
                        </div>
                    </div>
                </div>
            </div>
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times" #times>
                    <ng-container *ngIf="showCurrentTime">
                        <div *ngFor="let resource of verticalResources | resourceIterator; trackBy: itemIndex;"
                            #currentTimeArrow class="k-current-time k-current-time-arrow-right">
                        </div>
                    </ng-container>
                    <table class="k-scheduler-table" #timesTable aria-hidden="true">
                        <ng-container *ngFor="let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;">
                            <tr *ngIf="verticalResources.length">
                                <ng-container *ngFor="let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;">
                                    <th *ngIf="verticalItem(leafIndex, resourceIndex)" [attr.rowspan]="verticalRowspan(resourceIndex)" class="k-slot-cell">
                                        <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>
                                        <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef"
                                            [ngTemplateOutletContext]="{ resource: verticalItem(leafIndex, resourceIndex) }"></ng-container>
                                    </th>
                                </ng-container>
                                <th class="k-scheduler-times-all-day" #allDayCell>{{ allDayMessage }}</th>
                            </tr>
                            <tr *ngFor="let slot of timeSlots; let timeSlotIndex = index;trackBy: itemIndex">
                                <th *ngIf="slot.isMajor" [ngClass]="{ 'k-slot-cell': slotDivisions === 1 }">
                                    <ng-container *ngIf="!majorTimeHeaderTemplateRef">{{ slot.start | kendoDate: 't' }}</ng-container>
                                    <ng-container *ngIf="majorTimeHeaderTemplateRef" [ngTemplateOutlet]="majorTimeHeaderTemplateRef" [ngTemplateOutletContext]="{ date: slot.start }"></ng-container>
                                </th>
                                <th *ngIf="!slot.isMajor" [ngClass]="{ 'k-slot-cell': timeSlotIndex % slotDivisions === slotDivisions - 1 }">
                                    <ng-container *ngIf="minorTimeHeaderTemplateRef" [ngTemplateOutlet]="minorTimeHeaderTemplateRef" [ngTemplateOutletContext]="{ date: slot.start }">
                                    </ng-container>
                                </th>
                            </tr>
                        </ng-container>
                    </table>
                </div>
                <div class="k-scheduler-content" #content>
                    <ng-container *ngIf="showCurrentTime">
                        <div *ngFor="let resource of verticalResources | resourceIterator; trackBy: itemIndex;"
                            #currentTimeMarker class="k-current-time">
                        </div>
                    </ng-container>
                    <table class="k-scheduler-table" #contentTable role="presentation">
                        <ng-container *ngFor="let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;">
                            <tr class="k-scheduler-header-all-day" *ngIf="verticalResources.length">
                                <td *ngFor="let slot of daySlots; let index = index; trackBy: itemIndex"
                                    daySlot
                                    [start]="slot.start"
                                    [end]="slot.end"
                                    [id]="{ resourceIndex: verticalIndex, rangeIndex: 0, index: index }">
                                    <ng-container *ngIf="allDaySlotTemplateRef" [ngTemplateOutlet]="allDaySlotTemplateRef"
                                        [ngTemplateOutletContext]="{ date: slot.start, resources: resourcesByIndex(verticalIndex) }"></ng-container>
                                </td>
                            </tr>
                            <tr *ngFor="let slot of timeSlots; index as index; trackBy: itemIndex" [class.k-middle-row]="slot.isMajor">
                                <ng-container *ngFor="let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;">
                                    <td *ngFor="let daySlot of daySlots; index as rangeIndex; trackBy: itemIndex"
                                        [class.k-nonwork-hour]="slot.isWorkHour"
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
                                            [ngTemplateOutletContext]="{ date: timeSlot.startLocalTime, resources: resourcesByIndex(timeSlot.id.resourceIndex) }">
                                        </ng-container>
                                    </td>
                                </ng-container>
                            </tr>
                        </ng-container>
                    </table>
                    <ng-container *ngFor="let item of items | async; trackBy: itemIndex;">
                        <div *ngFor="let itemResource of item.resources; trackBy: itemIndex;"
                            [ngClass]="getEventClasses(item, itemResource.resources)"
                            [ngStyle]="getEventStyles(item, itemResource)"
                            [kendoSchedulerFocusIndex]="itemResource.leafIdx"
                            dayTimeViewItem
                                [editable]="editable"
                                [vertical]="true"
                                [eventTemplate]="eventTemplateRef"
                                [item]="item"
                                [index]="item.index"
                                [resources]="itemResource.resources"
                                [resourceIndex]="itemResource.leafIdx">
                        </div>
                    </ng-container>
                    <ng-container *ngIf="verticalResources.length">
                        <ng-container *ngFor="let item of allDayItems | async; trackBy: itemIndex;">
                            <div *ngFor="let itemResource of item.resources; trackBy: itemIndex;"
                                [ngClass]="getEventClasses(item, itemResource.resources, true)"
                                [ngStyle]="getEventStyles(item, itemResource, true)"
                                [kendoSchedulerFocusIndex]="itemResource.leafIdx"
                                dayTimeViewItem
                                    [isAllDay]="true"
                                    [editable]="editable"
                                    [eventTemplate]="allDayEventTemplateRef"
                                    [item]="item"
                                    [index]="item.index"
                                    [resources]="itemResource.resources"
                                    [resourceIndex]="itemResource.leafIdx">
                            </div>
                        </ng-container>
                    </ng-container>
                    <kendo-hint-container #hintContainer>
                        <ng-template>
                            <div *ngIf="dragHints.length && (!allDayDragHint || verticalResources.length)"
                                class="k-event-drag-hint"
                                dayTimeViewItem
                                    [isAllDay]="allDayDragHint"
                                    [ngStyle]="dragHints[0].style"
                                    [ngClass]="dragHints[0].class"
                                    [dragHint]="true"
                                    [eventTemplate]="eventTemplateRef"
                                    [resources]="dragHints[0].resources"
                                    [item]="dragHints[0].item">
                            </div>

                            <ng-container *ngIf="resizeHints.length && (!allDayResizeHint || verticalResources.length)">
                                <div *ngFor="let hint of resizeHints; trackBy: itemIndex;"
                                    kendoResizeHint
                                        [hint]="hint"
                                        [ngClass]="hint.class"
                                        [format]="allDayResizeHint ? allDayResizeHintFormat : resizeHintFormat">
                                </div>
                            </ng-container>
                        </ng-template>
                    </kendo-hint-container>
                </div>
            </div>
        </div>
    `
            },] },
];
/** @nocollapse */
MultiDayViewRendererComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ViewContextService },
    { type: ViewStateService },
    { type: IntlService },
    { type: DayTimeSlotService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: PDFService }
];
MultiDayViewRendererComponent.propDecorators = {
    name: [{ type: Input }],
    slotFill: [{ type: Input }],
    allDaySlotTemplate: [{ type: Input }],
    allDayEventTemplate: [{ type: Input }],
    minorTimeHeaderTemplate: [{ type: Input }],
    majorTimeHeaderTemplate: [{ type: Input }],
    dayCells: [{ type: ViewChildren, args: ['allDayCell',] }],
    headerHintContainer: [{ type: ViewChild, args: ['headerHintContainer',] }]
};
