import { Component, Input, NgZone, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { addDays, getDate, firstDayInWeek, firstDayOfMonth, addMonths, toLocalDate } from '@progress/kendo-date-math';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { closestInScope, hasClasses } from '../../common/dom-queries';
import { MonthSlotService } from './month-slot.service';
import { updateTaskData, createTasks } from './utils';
import { toPx } from '../utils';
import { BaseView } from '../common/base-view';
import { PDFService } from '../../pdf/pdf.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
const DAYS_IN_WEEK_COUNT = 7;
const WEEKS_COUNT = 6;
/**
 * @hidden
 */
export class MonthViewRendererComponent extends BaseView {
    constructor(viewContext, viewState, intl, slotService, zone, element, renderer, pdfService, localization) {
        super(viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization);
        this.resizeHintFormat = { skeleton: 'Md' };
        this.weeks = [];
    }
    get monthDaySlotTemplateRef() {
        return this.monthDaySlotTemplate || (this.schedulerMonthDaySlotTemplate || {}).templateRef;
    }
    horizontalColspan(resourceIndex) {
        const resources = this.horizontalResources;
        let result = DAYS_IN_WEEK_COUNT;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    verticalRowspan(resourceIndex) {
        const resources = this.verticalResources;
        let result = WEEKS_COUNT;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    }
    verticalItem(leafIndex, resourceIndex) {
        const data = this.verticalResources[resourceIndex].data || [];
        const resources = this.verticalResources;
        let result = 1;
        for (let idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= ((resources[idx].data || []).length || 1);
        }
        return data[(leafIndex / result) % data.length];
    }
    daySlotClass(day, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: day,
                end: addDays(day, 1),
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: false
            });
        }
    }
    optionsChange(changes) {
        this.schedulerMonthDaySlotTemplate = changes.monthDaySlotTemplate;
        super.optionsChange(changes);
    }
    createTasks(items, dateRange) {
        this.weeks = this.createDaySlots(dateRange);
        return createTasks(dateRange.start, dateRange.end, items, this.weeks);
    }
    onTasksChange() {
        updateTaskData(this.tasks);
        this.items.next(this.tasks);
    }
    reflow() {
        this.updateContentHeight();
        const content = this.content.nativeElement;
        this.slotService.containerSize = content.scrollWidth;
        if (this.contentHeight === 'auto') {
            // bigger size changes cause the table to overflow the container and in horizontal scrollbars
            // this changes the table and slots size during rendering before the browser re-adjusts the 100% table width
            content.style.overflow = 'visible';
        }
        this.slotService.layout(this.eventHeight);
        if (this.contentHeight === 'auto') {
            content.style.overflow = '';
        }
        this.syncTables();
    }
    onClick(e, eventType = e.type) {
        if (eventType === 'click') {
            const eventSlot = closestInScope(e.target, node => node.hasAttribute('data-slot-index'), this.element.nativeElement);
            const navigateToDay = closestInScope(e.target, node => hasClasses(node, 'k-more-events k-nav-day'), eventSlot);
            if (eventSlot && navigateToDay) {
                const index = eventSlot.getAttribute('data-slot-index');
                const slot = this.slotService.slotByIndex(index);
                this.zone.run(() => {
                    this.viewState.navigateTo({ viewName: 'day', date: toLocalDate(slot.start) });
                });
                return;
            }
        }
        super.onClick(e, eventType);
    }
    slotByIndex(index, _args) {
        return this.slotService.slotByIndex(index);
    }
    onSelectDate(date) {
        const dateRange = this.dateRange(date);
        this.selectedDate = date;
        this.viewState.notifyDateRange(dateRange);
        this.weeks = this.createDaySlots(dateRange);
    }
    onAction(e) {
        const now = getDate(this.selectedDate);
        if (e.type === 'next') {
            const next = firstDayOfMonth(addMonths(now, 1));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            const next = firstDayOfMonth(addMonths(now, -1));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
    }
    dateRange(date = this.selectedDate) {
        const monthStart = firstDayOfMonth(getDate(date));
        const start = firstDayInWeek(monthStart, this.intl.firstDay());
        const end = addDays(start, DAYS_IN_WEEK_COUNT * WEEKS_COUNT);
        const text = this.intl.format(this.selectedDateFormat, monthStart);
        const shortText = this.intl.format(this.selectedShortDateFormat, monthStart);
        return { start, end, text, shortText };
    }
    dragRanges(slot) {
        return this.slotService.dragRanges(slot, this.dragging.offset);
    }
    dragHintSize(first, last) {
        return {
            width: toPx(last.rect.left - first.rect.left + last.rect.width),
            height: toPx(first.height)
        };
    }
    slotByPosition(x, y) {
        return this.slotService.slotByPosition(x, y);
    }
    createDaySlots({ start }) {
        const weeks = [];
        let date = start;
        for (let idx = 0; idx < WEEKS_COUNT; idx++) {
            const week = [];
            weeks.push(week);
            for (let dayIdx = 0; dayIdx < DAYS_IN_WEEK_COUNT; dayIdx++) {
                week.push(date);
                date = addDays(date, 1);
            }
        }
        return weeks;
    }
}
MonthViewRendererComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'month-view',
                providers: [
                    MonthSlotService
                ],
                template: `
        <div class="k-scheduler-layout k-scheduler-monthview k-scheduler-flex-layout">
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times" #timesHeader *ngIf="verticalResources.length">
                    <table class="k-scheduler-table" aria-hidden="true">
                        <tr>
                            <th></th>
                        </tr>
                    </table>
                </div>
                <div class="k-scheduler-header k-state-default" #header>
                    <div class="k-scheduler-header-wrap" #headerWrap>
                       <table class="k-scheduler-table" aria-hidden="true">
                         <tr *ngFor="let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex">
                             <th *ngFor="let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex"
                                 class="k-slot-cell" [attr.colspan]="horizontalColspan(resourceIndex)">
                                <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(item, resource.textField) }}</ng-container>
                                <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef" [ngTemplateOutletContext]="{ resource: item }"></ng-container>
                             </th>
                         </tr>
                         <tr>
                             <ng-container *ngFor="let resource of horizontalResources | resourceIterator; trackBy: itemIndex">
                                 <th *ngFor="let day of weeks[0]; trackBy: itemIndex">
                                     {{ day | kendoDate: 'EEEE' }}
                                 </th>
                             </ng-container>
                         </tr>
                       </table>
                    </div>
                </div>
            </div>
            <div class="k-scheduler-pane">
                <div class="k-scheduler-times k-scheduler-resources" #times *ngIf="verticalResources.length">
                    <table class="k-scheduler-table" #timesTable aria-hidden="true">
                        <ng-container *ngFor="let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex">
                            <tr>
                                <ng-container *ngFor="let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex">
                                    <th *ngIf="verticalItem(leafIndex, resourceIndex)" [attr.rowspan]="verticalRowspan(resourceIndex)" class="k-slot-cell" [ngClass]="{ 'k-last-resource': resourceIndex === verticalResources.length - 1 }">
                                        <ng-container *ngIf="!groupHeaderTemplateRef">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>
                                        <ng-container *ngIf="groupHeaderTemplateRef" [ngTemplateOutlet]="groupHeaderTemplateRef"
                                            [ngTemplateOutletContext]="{ resource: verticalItem(leafIndex, resourceIndex) }"></ng-container>
                                    </th>
                                </ng-container>
                                <th class="k-slot-cell k-empty-slot">
                                </th>
                            </tr>
                            <tr *ngFor="let index of 5 | repeat; trackBy: itemIndex">
                                <th class="k-slot-cell k-empty-slot"></th>
                            </tr>
                        </ng-container>
                    </table>
                </div>
                <div class="k-scheduler-content" #content>
                     <table class="k-scheduler-table" #contentTable role="presentation">
                         <ng-container *ngFor="let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex">
                             <tr *ngFor="let week of weeks;  let rangeIndex = index; trackBy: itemIndex">
                                <ng-container *ngFor="let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex">
                                     <td *ngFor="let day of week; let index = index; trackBy: itemIndex"
                                         monthSlot
                                         [ngClass]="daySlotClass(day, verticalResources.length ? verticalIndex : horizontalIndex)"
                                         [start]="day"
                                         [id]="{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }"
                                        >
                                        <span class="k-link k-nav-day" *ngIf="!monthDaySlotTemplateRef">{{ day | kendoDate: 'dd' }}</span>
                                        <ng-container *ngIf="monthDaySlotTemplateRef" [ngTemplateOutlet]="monthDaySlotTemplateRef"
                                            [ngTemplateOutletContext]="{ date: day, resources: resourcesByIndex(verticalResources.length ? verticalIndex : horizontalIndex) }"></ng-container>
                                     </td>
                                </ng-container>
                             </tr>
                         </ng-container>
                     </table>
                     <ng-container *ngFor="let item of items | async; trackBy: itemIndex">
                         <div *ngFor="let itemResource of item.resources; trackBy: itemIndex"
                            [ngClass]="getEventClasses(item, itemResource.resources)"
                            [ngStyle]="getEventStyles(item, itemResource)"
                            [kendoSchedulerFocusIndex]="itemResource.leafIdx"
                            monthViewItem
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
                                monthViewItem
                                    [ngStyle]="hint.style"
                                    [ngClass]="hint.class"
                                    [dragHint]="true"
                                    [eventTemplate]="eventTemplateRef"
                                    [item]="hint.item"
                                    [resources]="hint.resources">
                            </div>

                            <div *ngFor="let hint of resizeHints; trackBy: itemIndex;"
                                kendoResizeHint
                                    [hint]="hint"
                                    [ngClass]="hint.class"
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
MonthViewRendererComponent.ctorParameters = () => [
    { type: ViewContextService },
    { type: ViewStateService },
    { type: IntlService },
    { type: MonthSlotService },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: PDFService },
    { type: LocalizationService }
];
MonthViewRendererComponent.propDecorators = {
    monthDaySlotTemplate: [{ type: Input }]
};
