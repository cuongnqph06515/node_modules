import * as tslib_1 from "tslib";
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
var DAYS_IN_WEEK_COUNT = 7;
var WEEKS_COUNT = 6;
/**
 * @hidden
 */
var MonthViewRendererComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MonthViewRendererComponent, _super);
    function MonthViewRendererComponent(viewContext, viewState, intl, slotService, zone, element, renderer, pdfService, localization) {
        var _this = _super.call(this, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.resizeHintFormat = { skeleton: 'Md' };
        _this.weeks = [];
        return _this;
    }
    Object.defineProperty(MonthViewRendererComponent.prototype, "monthDaySlotTemplateRef", {
        get: function () {
            return this.monthDaySlotTemplate || (this.schedulerMonthDaySlotTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    MonthViewRendererComponent.prototype.horizontalColspan = function (resourceIndex) {
        var resources = this.horizontalResources;
        var result = DAYS_IN_WEEK_COUNT;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    MonthViewRendererComponent.prototype.verticalRowspan = function (resourceIndex) {
        var resources = this.verticalResources;
        var result = WEEKS_COUNT;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    MonthViewRendererComponent.prototype.verticalItem = function (leafIndex, resourceIndex) {
        var data = this.verticalResources[resourceIndex].data || [];
        var resources = this.verticalResources;
        var result = 1;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= ((resources[idx].data || []).length || 1);
        }
        return data[(leafIndex / result) % data.length];
    };
    MonthViewRendererComponent.prototype.daySlotClass = function (day, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: day,
                end: addDays(day, 1),
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: false
            });
        }
    };
    MonthViewRendererComponent.prototype.optionsChange = function (changes) {
        this.schedulerMonthDaySlotTemplate = changes.monthDaySlotTemplate;
        _super.prototype.optionsChange.call(this, changes);
    };
    MonthViewRendererComponent.prototype.createTasks = function (items, dateRange) {
        this.weeks = this.createDaySlots(dateRange);
        return createTasks(dateRange.start, dateRange.end, items, this.weeks);
    };
    MonthViewRendererComponent.prototype.onTasksChange = function () {
        updateTaskData(this.tasks);
        this.items.next(this.tasks);
    };
    MonthViewRendererComponent.prototype.reflow = function () {
        this.updateContentHeight();
        var content = this.content.nativeElement;
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
    };
    MonthViewRendererComponent.prototype.onClick = function (e, eventType) {
        var _this = this;
        if (eventType === void 0) { eventType = e.type; }
        if (eventType === 'click') {
            var eventSlot = closestInScope(e.target, function (node) { return node.hasAttribute('data-slot-index'); }, this.element.nativeElement);
            var navigateToDay = closestInScope(e.target, function (node) { return hasClasses(node, 'k-more-events k-nav-day'); }, eventSlot);
            if (eventSlot && navigateToDay) {
                var index = eventSlot.getAttribute('data-slot-index');
                var slot_1 = this.slotService.slotByIndex(index);
                this.zone.run(function () {
                    _this.viewState.navigateTo({ viewName: 'day', date: toLocalDate(slot_1.start) });
                });
                return;
            }
        }
        _super.prototype.onClick.call(this, e, eventType);
    };
    MonthViewRendererComponent.prototype.slotByIndex = function (index, _args) {
        return this.slotService.slotByIndex(index);
    };
    MonthViewRendererComponent.prototype.onSelectDate = function (date) {
        var dateRange = this.dateRange(date);
        this.selectedDate = date;
        this.viewState.notifyDateRange(dateRange);
        this.weeks = this.createDaySlots(dateRange);
    };
    MonthViewRendererComponent.prototype.onAction = function (e) {
        var now = getDate(this.selectedDate);
        if (e.type === 'next') {
            var next = firstDayOfMonth(addMonths(now, 1));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            var next = firstDayOfMonth(addMonths(now, -1));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
    };
    MonthViewRendererComponent.prototype.dateRange = function (date) {
        if (date === void 0) { date = this.selectedDate; }
        var monthStart = firstDayOfMonth(getDate(date));
        var start = firstDayInWeek(monthStart, this.intl.firstDay());
        var end = addDays(start, DAYS_IN_WEEK_COUNT * WEEKS_COUNT);
        var text = this.intl.format(this.selectedDateFormat, monthStart);
        var shortText = this.intl.format(this.selectedShortDateFormat, monthStart);
        return { start: start, end: end, text: text, shortText: shortText };
    };
    MonthViewRendererComponent.prototype.dragRanges = function (slot) {
        return this.slotService.dragRanges(slot, this.dragging.offset);
    };
    MonthViewRendererComponent.prototype.dragHintSize = function (first, last) {
        return {
            width: toPx(last.rect.left - first.rect.left + last.rect.width),
            height: toPx(first.height)
        };
    };
    MonthViewRendererComponent.prototype.slotByPosition = function (x, y) {
        return this.slotService.slotByPosition(x, y);
    };
    MonthViewRendererComponent.prototype.createDaySlots = function (_a) {
        var start = _a.start;
        var weeks = [];
        var date = start;
        for (var idx = 0; idx < WEEKS_COUNT; idx++) {
            var week = [];
            weeks.push(week);
            for (var dayIdx = 0; dayIdx < DAYS_IN_WEEK_COUNT; dayIdx++) {
                week.push(date);
                date = addDays(date, 1);
            }
        }
        return weeks;
    };
    MonthViewRendererComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'month-view',
                    providers: [
                        MonthSlotService
                    ],
                    template: "\n        <div class=\"k-scheduler-layout k-scheduler-monthview k-scheduler-flex-layout\">\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #timesHeader *ngIf=\"verticalResources.length\">\n                    <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                        <tr>\n                            <th></th>\n                        </tr>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-header k-state-default\" #header>\n                    <div class=\"k-scheduler-header-wrap\" #headerWrap>\n                       <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                         <tr *ngFor=\"let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex\">\n                             <th *ngFor=\"let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex\"\n                                 class=\"k-slot-cell\" [attr.colspan]=\"horizontalColspan(resourceIndex)\">\n                                <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(item, resource.textField) }}</ng-container>\n                                <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ resource: item }\"></ng-container>\n                             </th>\n                         </tr>\n                         <tr>\n                             <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex\">\n                                 <th *ngFor=\"let day of weeks[0]; trackBy: itemIndex\">\n                                     {{ day | kendoDate: 'EEEE' }}\n                                 </th>\n                             </ng-container>\n                         </tr>\n                       </table>\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times k-scheduler-resources\" #times *ngIf=\"verticalResources.length\">\n                    <table class=\"k-scheduler-table\" #timesTable aria-hidden=\"true\">\n                        <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex\">\n                            <tr>\n                                <ng-container *ngFor=\"let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex\">\n                                    <th *ngIf=\"verticalItem(leafIndex, resourceIndex)\" [attr.rowspan]=\"verticalRowspan(resourceIndex)\" class=\"k-slot-cell\" [ngClass]=\"{ 'k-last-resource': resourceIndex === verticalResources.length - 1 }\">\n                                        <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>\n                                        <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ resource: verticalItem(leafIndex, resourceIndex) }\"></ng-container>\n                                    </th>\n                                </ng-container>\n                                <th class=\"k-slot-cell k-empty-slot\">\n                                </th>\n                            </tr>\n                            <tr *ngFor=\"let index of 5 | repeat; trackBy: itemIndex\">\n                                <th class=\"k-slot-cell k-empty-slot\"></th>\n                            </tr>\n                        </ng-container>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-content\" #content>\n                     <table class=\"k-scheduler-table\" #contentTable role=\"presentation\">\n                         <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex\">\n                             <tr *ngFor=\"let week of weeks;  let rangeIndex = index; trackBy: itemIndex\">\n                                <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex\">\n                                     <td *ngFor=\"let day of week; let index = index; trackBy: itemIndex\"\n                                         monthSlot\n                                         [ngClass]=\"daySlotClass(day, verticalResources.length ? verticalIndex : horizontalIndex)\"\n                                         [start]=\"day\"\n                                         [id]=\"{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }\"\n                                        >\n                                        <span class=\"k-link k-nav-day\" *ngIf=\"!monthDaySlotTemplateRef\">{{ day | kendoDate: 'dd' }}</span>\n                                        <ng-container *ngIf=\"monthDaySlotTemplateRef\" [ngTemplateOutlet]=\"monthDaySlotTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ date: day, resources: resourcesByIndex(verticalResources.length ? verticalIndex : horizontalIndex) }\"></ng-container>\n                                     </td>\n                                </ng-container>\n                             </tr>\n                         </ng-container>\n                     </table>\n                     <ng-container *ngFor=\"let item of items | async; trackBy: itemIndex\">\n                         <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex\"\n                            [ngClass]=\"getEventClasses(item, itemResource.resources)\"\n                            [ngStyle]=\"getEventStyles(item, itemResource)\"\n                            [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                            monthViewItem\n                                [editable]=\"editable\"\n                                [item]=\"item\"\n                                [index]=\"item.index\"\n                                [eventTemplate]=\"eventTemplateRef\"\n                                [resources]=\"itemResource.resources\"\n                                [resourceIndex]=\"itemResource.leafIdx\">\n                         </div>\n                     </ng-container>\n                     <kendo-hint-container #hintContainer>\n                        <ng-template>\n                            <div *ngFor=\"let hint of dragHints; trackBy: itemIndex;\"\n                                class=\"k-event-drag-hint\"\n                                monthViewItem\n                                    [ngStyle]=\"hint.style\"\n                                    [ngClass]=\"hint.class\"\n                                    [dragHint]=\"true\"\n                                    [eventTemplate]=\"eventTemplateRef\"\n                                    [item]=\"hint.item\"\n                                    [resources]=\"hint.resources\">\n                            </div>\n\n                            <div *ngFor=\"let hint of resizeHints; trackBy: itemIndex;\"\n                                kendoResizeHint\n                                    [hint]=\"hint\"\n                                    [ngClass]=\"hint.class\"\n                                    [format]=\"resizeHintFormat\">\n                            </div>\n                        </ng-template>\n                     </kendo-hint-container>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewRendererComponent.ctorParameters = function () { return [
        { type: ViewContextService },
        { type: ViewStateService },
        { type: IntlService },
        { type: MonthSlotService },
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: PDFService },
        { type: LocalizationService }
    ]; };
    MonthViewRendererComponent.propDecorators = {
        monthDaySlotTemplate: [{ type: Input }]
    };
    return MonthViewRendererComponent;
}(BaseView));
export { MonthViewRendererComponent };
