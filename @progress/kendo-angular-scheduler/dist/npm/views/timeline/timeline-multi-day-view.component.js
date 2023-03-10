"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var day_time_slot_service_1 = require("../day-time/day-time-slot.service");
var utils_1 = require("./utils");
var utils_2 = require("../utils");
var day_time_view_component_1 = require("../day-time/day-time-view.component");
var pdf_service_1 = require("../../pdf/pdf.service");
/**
 * @hidden
 */
var TimelineMultiDayViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineMultiDayViewComponent, _super);
    function TimelineMultiDayViewComponent(localization, changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService) {
        var _this = _super.call(this, changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.name = 'timeline';
        _this.columnWidth = 100;
        _this.viewName = 'timeline';
        _this.verticalTime = false;
        return _this;
    }
    Object.defineProperty(TimelineMultiDayViewComponent.prototype, "classNames", {
        get: function () {
            return "k-scheduler-" + this.viewName + "-view";
        },
        enumerable: true,
        configurable: true
    });
    TimelineMultiDayViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.columnWidth) {
            this.changes.next(null);
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    TimelineMultiDayViewComponent.prototype.reflow = function () {
        var slotService = this.slotService;
        this.updateContentHeight();
        slotService.containerSize = this.content.nativeElement.scrollWidth;
        var verticalResourceRows = this.verticalResources.length ? this.verticalResourceRows.toArray() : [];
        slotService.layoutTimeline(this.eventHeight, verticalResourceRows);
        if (verticalResourceRows.length) {
            slotService.forEachGroup(function (group, index) {
                verticalResourceRows[index].nativeElement.style.height = group.timeRanges[0].slots[0].height + "px";
            });
        }
        this.syncTables();
    };
    Object.defineProperty(TimelineMultiDayViewComponent.prototype, "allEventsMessage", {
        get: function () {
            return this.localization.get('allEvents');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineMultiDayViewComponent.prototype, "slotsCount", {
        get: function () {
            var resources = this.horizontalResources;
            var result = this.daySlots.length * this.timeSlots.length;
            for (var idx = 0; idx < resources.length; idx++) {
                result *= (resources[idx].data || []).length || 1;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    TimelineMultiDayViewComponent.prototype.timeColspan = function (index) {
        var timeSlots = this.timeSlots.length;
        var remainder = timeSlots % this.slotDivisions;
        return remainder === 0 || (index < timeSlots - remainder) ? this.slotDivisions : 1;
    };
    TimelineMultiDayViewComponent.prototype.horizontalColspan = function (resourceIndex) {
        var resources = this.horizontalResources;
        var result = this.daySlots.length * this.timeSlots.length;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    TimelineMultiDayViewComponent.prototype.verticalRowspan = function (resourceIndex) {
        var resources = this.verticalResources;
        var result = 1;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    TimelineMultiDayViewComponent.prototype.createTasks = function (items, dateRange) {
        return utils_1.createTasks(dateRange.start, dateRange.end, items);
    };
    TimelineMultiDayViewComponent.prototype.onTasksChange = function () {
        this.items.next(this.tasks);
    };
    TimelineMultiDayViewComponent.prototype.dragRanges = function (slot) {
        return this.slotService.dragRanges(slot, this.dragging.offset, true);
    };
    TimelineMultiDayViewComponent.prototype.dragHintSize = function (firstSlot, lastSlot) {
        return {
            width: utils_2.toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width),
            height: utils_2.toPx(firstSlot.height)
        };
    };
    TimelineMultiDayViewComponent.prototype.updateResizeHints = function (ranges, start, end) {
        var last = ranges[ranges.length - 1];
        _super.prototype.updateResizeHints.call(this, [[ranges[0][0], last[last.length - 1]]], start, end);
    };
    TimelineMultiDayViewComponent.prototype.pdfWidth = function () {
        var contentWidth = this.content.nativeElement.scrollWidth;
        var timesWidth = this.times.nativeElement.offsetWidth;
        return contentWidth + timesWidth;
    };
    TimelineMultiDayViewComponent.prototype.currentTimeArrowOffset = function () {
        return this.headerWrap.nativeElement.querySelector('tr:last-child').offsetTop;
    };
    TimelineMultiDayViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'timeline-multi-day-view',
                    providers: [
                        day_time_slot_service_1.DayTimeSlotService
                    ],
                    template: "\n        <div class=\"k-scheduler-layout k-scheduler-flex-layout\" [ngClass]=\"classNames\">\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #timesHeader>\n                    <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                        <tr><th></th></tr>\n                        <tr><th class=\"k-slot-cell\"></th></tr>\n                        <tr *ngFor=\"let resource of horizontalResources; trackBy: itemIndex;\">\n                            <th></th>\n                        </tr>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-header k-state-default\" #header >\n                    <div class=\"k-scheduler-header-wrap\" #headerWrap>\n                        <ng-container *ngIf=\"showCurrentTime\">\n                            <div *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\"\n                                #currentTimeArrow class=\"k-current-time k-current-time-arrow-down\">\n                            </div>\n                        </ng-container>\n                        <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                            <colgroup>\n                                <col *ngFor=\"let slotIndex of slotsCount | repeat; trackBy: itemIndex;\" [ngStyle]=\"{ 'width.px': columnWidth }\" />\n                            </colgroup>\n                            <tr *ngFor=\"let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                <th *ngFor=\"let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;\"\n                                    class=\"k-slot-cell\" [attr.colspan]=\"horizontalColspan(resourceIndex)\">\n                                    <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(item, resource.textField) }}</ng-container>\n                                    <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                        [ngTemplateOutletContext]=\"{ resource: item }\"></ng-container>\n                                </th>\n                            </tr>\n                             <tr>\n                                 <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\">\n                                     <ng-container *ngFor=\"let daySlot of daySlots; let index = index; trackBy: itemIndex;\">\n                                         <th [attr.colspan]=\"timeSlots.length\" class=\"k-slot-cell\">\n                                             <span *ngIf=\"!dateHeaderTemplateRef\" class=\"k-link\" [ngClass]=\"{ 'k-nav-day': numberOfDays > 1 }\" [attr.data-dayslot-index]=\"index\">{{ daySlot.start | kendoDate: 'm'}}</span>\n                                             <ng-container *ngIf=\"dateHeaderTemplateRef\" [ngTemplateOutlet]=\"dateHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: daySlot.start }\"></ng-container>\n                                         </th>\n                                     </ng-container>\n                                 </ng-container>\n                             </tr>\n                             <tr>\n                                 <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;\">\n                                    <ng-container *ngFor=\"let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;\">\n                                        <ng-container *ngFor=\"let timeSlot of timeSlots; let index = index; trackBy: itemIndex;\">\n                                            <th *ngIf=\"timeSlot.isMajor\" [attr.colspan]=\"timeColspan(index)\" >{{ timeSlot.start | kendoDate: 't' }}</th>\n                                        </ng-container>\n                                    </ng-container>\n                                 </ng-container>\n                             </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #times>\n                    <table class=\"k-scheduler-table\" #timesTable aria-hidden=\"true\">\n                        <tr *ngIf=\"!verticalResources.length\">\n                            <th rowspan=\"1\" #titleCell>\n                                {{ allEventsMessage }}\n                            </th>\n                        </tr>\n                        <ng-container *ngIf=\"verticalResources.length\">\n                            <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;\">\n                                <tr #verticalResourceRows>\n                                    <ng-container *ngFor=\"let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                        <th *ngIf=\"verticalItem(leafIndex, resourceIndex)\" [attr.rowspan]=\"verticalRowspan(resourceIndex)\" class=\"k-slot-cell\">\n                                            <div>\n                                                <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>\n                                                <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                                    [ngTemplateOutletContext]=\"{ resource: verticalItem(leafIndex, resourceIndex) }\"></ng-container>\n                                            </div>\n                                        </th>\n                                    </ng-container>\n                                </tr>\n                            </ng-container>\n                        </ng-container>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-content\" #content>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\"\n                            class=\"k-current-time\" #currentTimeMarker>\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #contentTable role=\"presentation\">\n                        <colgroup>\n                            <col *ngFor=\"let slotIndex of slotsCount | repeat; trackBy: itemIndex;\" [ngStyle]=\"{ 'width.px': columnWidth }\" />\n                        </colgroup>\n                        <tr *ngFor=\"let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;\">\n                            <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;\">\n                                <ng-container *ngFor=\"let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;\">\n                                    <td *ngFor=\"let slot of timeSlots; let index = index; trackBy: itemIndex;\"\n                                            [ngClass]=\"timeSlotClass(slot, daySlot.start, verticalResources.length ? verticalIndex : horizontalIndex)\"\n                                            timeSlot #timeSlot=\"timeSlot\"\n                                            [date]=\"daySlot.start\"\n                                            [invariantStart]=\"slot.start\"\n                                            [invariantEnd]=\"slot.end\"\n                                            [workDayStart]=\"workDayStartTime\"\n                                            [workDayEnd]=\"workDayEndTime\"\n                                            [workWeekStart]=\"workWeekStart\"\n                                            [workWeekEnd]=\"workWeekEnd\"\n                                            [id]=\"{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }\"\n                                    >\n                                        <ng-container *ngIf=\"timeSlotTemplateRef\" [ngTemplateOutlet]=\"timeSlotTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ date: timeSlot.start, resources: resourcesByIndex(timeSlot.id.resourceIndex ) }\">\n                                        </ng-container>\n                                    </td>\n                                </ng-container>\n                            </ng-container>\n                        </tr>\n                    </table>\n                    <ng-container *ngFor=\"let item of items | async; trackBy: itemIndex;\">\n                        <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                            [ngClass]=\"getEventClasses(item, itemResource.resources)\"\n                            [ngStyle]=\"getEventStyles(item, itemResource)\"\n                            [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                            dayTimeViewItem\n                                [editable]=\"editable\"\n                                [item]=\"item\"\n                                [index]=\"item.index\"\n                                [eventTemplate]=\"eventTemplateRef\"\n                                [resources]=\"itemResource.resources\"\n                                [resourceIndex]=\"itemResource.leafIdx\">\n                        </div>\n                    </ng-container>\n                    <kendo-hint-container #hintContainer>\n                        <ng-template>\n                            <div *ngFor=\"let hint of dragHints; trackBy: itemIndex;\"\n                                class=\"k-event-drag-hint\"\n                                dayTimeViewItem\n                                    [ngStyle]=\"hint.style\"\n                                    [ngClass]=\"hint.class\"\n                                    [dragHint]=\"true\"\n                                    [eventTemplate]=\"eventTemplateRef\"\n                                    [item]=\"hint.item\"\n                                    [resources]=\"hint.resources\">\n                            </div>\n                            <div *ngIf=\"resizeHints && resizeHints.length\"\n                                kendoResizeHint\n                                [hint]=\"resizeHints[0]\"\n                                [ngClass]=\"resizeHints[0].class\"\n                                [format]=\"resizeHintFormat\">\n                            </div>\n                        </ng-template>\n                    </kendo-hint-container>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineMultiDayViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService },
        { type: kendo_angular_intl_1.IntlService },
        { type: day_time_slot_service_1.DayTimeSlotService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: pdf_service_1.PDFService }
    ]; };
    TimelineMultiDayViewComponent.propDecorators = {
        name: [{ type: core_1.Input }],
        columnWidth: [{ type: core_1.Input }],
        viewName: [{ type: core_1.Input }],
        verticalResourceRows: [{ type: core_1.ViewChildren, args: ['verticalResourceRows',] }]
    };
    return TimelineMultiDayViewComponent;
}(day_time_view_component_1.DayTimeViewComponent));
exports.TimelineMultiDayViewComponent = TimelineMultiDayViewComponent;
