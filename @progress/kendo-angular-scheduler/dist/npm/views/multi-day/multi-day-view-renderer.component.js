"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var rxjs_1 = require("rxjs");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var day_time_slot_service_1 = require("../day-time/day-time-slot.service");
var utils_1 = require("./utils");
var day_time_view_component_1 = require("../day-time/day-time-view.component");
var hint_container_component_1 = require("../common/hint-container.component");
var utils_2 = require("../utils");
var pdf_service_1 = require("../../pdf/pdf.service");
/**
 * @hidden
 */
var MultiDayViewRendererComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultiDayViewRendererComponent, _super);
    function MultiDayViewRendererComponent(localization, viewContext, viewState, intl, slotService, zone, renderer, element, changeDetector, pdfService) {
        var _this = _super.call(this, changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.name = 'day';
        _this.dateFormat = { skeleton: 'MEd' };
        _this.allDayResizeHintFormat = { skeleton: 'Md' };
        _this.allDayItems = new rxjs_1.BehaviorSubject(null);
        return _this;
    }
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "allDaySlotTemplateRef", {
        get: function () {
            return this.allDaySlotTemplate || (this.schedulerAllDaySlotTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "allDayEventTemplateRef", {
        get: function () {
            return this.allDayEventTemplate || (this.schedulerAllDayEventTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "minorTimeHeaderTemplateRef", {
        get: function () {
            return this.minorTimeHeaderTemplate || (this.schedulerMinorTimeHeaderTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "majorTimeHeaderTemplateRef", {
        get: function () {
            return this.majorTimeHeaderTemplate || (this.schedulerMajorTimeHeaderTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "allDayMessage", {
        get: function () {
            return this.localization.get('allDay');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "allDayResizeHint", {
        get: function () {
            return this.resizing && this.resizing.task.isAllDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "allDayDragHint", {
        get: function () {
            return this.dragging && this.dragging.slot.isDaySlot;
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewRendererComponent.prototype.optionsChange = function (changes) {
        this.schedulerAllDaySlotTemplate = changes.allDaySlotTemplate;
        this.schedulerAllDayEventTemplate = changes.allDayEventTemplate;
        this.schedulerMinorTimeHeaderTemplate = changes.minorTimeHeaderTemplate;
        this.schedulerMajorTimeHeaderTemplate = changes.majorTimeHeaderTemplate;
        _super.prototype.optionsChange.call(this, changes);
    };
    MultiDayViewRendererComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.slotFill) {
            this.changes.next(null);
        }
    };
    MultiDayViewRendererComponent.prototype.horizontalColspan = function (resourceIndex) {
        var resources = this.horizontalResources;
        var result = this.daySlots.length;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    MultiDayViewRendererComponent.prototype.verticalRowspan = function (resourceIndex) {
        var resources = this.verticalResources;
        var result = this.timeSlots.length + 1;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= (resources[idx].data || []).length || 1;
        }
        return result;
    };
    MultiDayViewRendererComponent.prototype.allDaySlotClass = function (slot, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: slot.start,
                end: slot.end,
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: true
            });
        }
    };
    MultiDayViewRendererComponent.prototype.createTasks = function (items, dateRange) {
        var startTimeSlot = this.timeSlots[0];
        var endTimeSlot = this.timeSlots[this.timeSlots.length - 1].end;
        var nextDateEnd = !(endTimeSlot.getHours() || endTimeSlot.getMinutes());
        var ranges = this.daySlots.map(function (daySlot) { return ({
            start: utils_2.toUTCTime(daySlot.start, startTimeSlot.start),
            end: nextDateEnd ? utils_2.toUTCDate(daySlot.end) : utils_2.toUTCTime(daySlot.start, endTimeSlot)
        }); });
        return utils_1.createTasks(dateRange.start, dateRange.end, items, ranges);
    };
    MultiDayViewRendererComponent.prototype.onTasksChange = function () {
        this.items.next(this.tasks.filter(function (task) { return !task.isAllDay; }));
        this.allDayItems.next(this.tasks.filter(function (task) { return task.isAllDay; }));
    };
    MultiDayViewRendererComponent.prototype.reflow = function () {
        var slotService = this.slotService;
        if (!this.verticalResources.length) {
            this.updateContentHeight();
            this.syncTables();
        }
        this.slotService.containerSize = this.content.nativeElement.clientWidth;
        slotService.layoutDays(this.eventHeight);
        this.updateContentHeight();
        this.syncTables();
        if (this.dayCells.length) {
            var cells_1 = this.dayCells.toArray();
            if (this.verticalResources.length) {
                slotService.forEachDateRange(function (range, index) {
                    var slot = range.firstSlot;
                    cells_1[index].nativeElement.style.height = slot.rect.height - slot.padding + "px";
                });
            }
            else {
                var size = slotService.syncDateRanges();
                cells_1[0].nativeElement.style.height = size + "px";
            }
        }
        slotService.layoutTimes({ fill: this.slotFill });
        this.syncTables();
    };
    MultiDayViewRendererComponent.prototype.dragHorizontal = function (slot) {
        return slot.isDaySlot;
    };
    MultiDayViewRendererComponent.prototype.updateHintContainer = function () {
        if (this.headerHintContainer) {
            this.headerHintContainer.detectChanges();
        }
        _super.prototype.updateHintContainer.call(this);
    };
    MultiDayViewRendererComponent.prototype.onRelease = function () {
        _super.prototype.onRelease.call(this);
        this.dragContainers = null;
    };
    MultiDayViewRendererComponent.prototype.updateDragContainer = function (args) {
        if (!this.dragContainers) {
            this.dragContainers = this.containers;
        }
        var container = this.dragContainers.find(function (c) {
            var offset = c.offset;
            return offset.top <= args.pageY && args.pageY <= offset.top + offset.height;
        }) || {};
        this.container = container.element;
        this.containerOffset = container.offset;
    };
    MultiDayViewRendererComponent.prototype.containerByPosition = function (_a) {
        var x = _a.x, y = _a.y;
        return this.containers.find(function (c) {
            var offset = c.offset;
            return offset.top <= y && y <= offset.top + offset.height && offset.left <= x && x <= offset.left + offset.width;
        });
    };
    Object.defineProperty(MultiDayViewRendererComponent.prototype, "containers", {
        get: function () {
            var header = this.headerWrap.nativeElement.children[1];
            var content = this.content.nativeElement;
            return [{
                    element: content,
                    offset: utils_2.elementOffset(content)
                }, {
                    element: header,
                    offset: utils_2.elementOffset(header)
                }];
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewRendererComponent.prototype.scrollContainer = function (callback, args) {
        clearInterval(this.scrollInterval);
        if (this.container && this.container === this.content.nativeElement) {
            _super.prototype.scrollContainer.call(this, callback, args);
        }
    };
    MultiDayViewRendererComponent.prototype.dragRanges = function (slot) {
        var task = this.dragging.task;
        if (slot.isDaySlot && !task.isAllDay) {
            return {
                ranges: [[slot]],
                start: utils_2.dateWithTime(slot.start, task.start.toUTCDate()),
                end: utils_2.dateWithTime(slot.start, task.end.toUTCDate()),
                isAllDay: true
            };
        }
        var allDayToTime = task.isAllDay && !slot.isDaySlot;
        var result = this.slotService.dragRanges(slot, allDayToTime ? { start: 0, end: 0 } : this.dragging.offset);
        if (allDayToTime) {
            result.end = slot.end;
        }
        result.isAllDay = this.draggedIsAllDay(task, slot);
        return result;
    };
    MultiDayViewRendererComponent.prototype.dragHintEventStyleArgs = function () {
        return {
            event: this.dragging.task.event,
            resources: this.dragging.resourceItems,
            isAllDay: Boolean(this.allDayDragHint)
        };
    };
    MultiDayViewRendererComponent.prototype.draggedIsAllDay = function (task, slot) {
        return Boolean(slot.isDaySlot && (task.event.isAllDay || !utils_1.isMultiDay(task)));
    };
    MultiDayViewRendererComponent.prototype.dragHintSize = function (firstSlot, lastSlot) {
        var width, height;
        if (firstSlot.isDaySlot) {
            width = utils_2.toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width);
            height = utils_2.toPx(firstSlot.height);
        }
        else {
            width = utils_2.toPx(firstSlot.rect.width * 0.9);
            height = utils_2.toPx(this.dragging.task.isAllDay ? firstSlot.rect.height : lastSlot.rect.top - firstSlot.rect.top + lastSlot.rect.height);
        }
        return { width: width, height: height };
    };
    MultiDayViewRendererComponent.prototype.currentTimeArrowOffset = function () {
        if (this.verticalResources.length) {
            var el = this.times.nativeElement.querySelector('.k-scheduler-times-all-day');
            var timesEl = this.times.nativeElement;
            return this.localization.rtl ? timesEl.offsetWidth - el.offsetWidth : el.offsetLeft;
        }
        return 0;
    };
    MultiDayViewRendererComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'multi-day-view',
                    providers: [
                        day_time_slot_service_1.DayTimeSlotService
                    ],
                    template: "\n        <div class=\"k-scheduler-layout k-scheduler-flex-layout\" [ngClass]=\"classNames\">\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #timesHeader>\n                    <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                        <tr *ngFor=\"let resource of horizontalResources; trackBy: itemIndex;\">\n                            <th></th>\n                        </tr>\n                        <tr>\n                            <th>\u200B</th>\n                        </tr>\n                        <tr *ngIf=\"!verticalResources.length\">\n                            <th class=\"k-scheduler-times-all-day\" #allDayCell>{{ allDayMessage }}</th>\n                        </tr>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-header k-state-default\" #header>\n                    <div class=\"k-scheduler-header-wrap\" #headerWrap>\n                        <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                            <tr *ngFor=\"let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                <th *ngFor=\"let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;\"\n                                    class=\"k-slot-cell\" [attr.colspan]=\"horizontalColspan(resourceIndex)\">\n                                    <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(item, resource.textField) }}</ng-container>\n                                    <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ resource: item }\"></ng-container>\n                                </th>\n                            </tr>\n                            <tr>\n                                <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\">\n                                    <th *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\">\n                                        <span *ngIf=\"!dateHeaderTemplateRef\" class=\"k-link k-nav-day\" [attr.data-dayslot-index]=\"index\">{{ slot.start | kendoDate: dateFormat }}</span>\n                                        <ng-container *ngIf=\"dateHeaderTemplateRef\" [ngTemplateOutlet]=\"dateHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\"></ng-container>\n                                    </th>\n                                </ng-container>\n                            </tr>\n                        </table>\n                        <div style=\"position: relative;\" *ngIf=\"!verticalResources.length\">\n                            <table class=\"k-scheduler-table k-scheduler-header-all-day\" aria-hidden=\"true\">\n                                <tr>\n                                    <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;\">\n                                        <td *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\"\n                                            daySlot\n                                            [start]=\"slot.start\"\n                                            [end]=\"slot.end\"\n                                            [id]=\"{ resourceIndex: resourceIndex, rangeIndex: 0, index: index }\"\n                                            [ngClass]=\"allDaySlotClass(slot, resourceIndex)\">\n                                            <ng-container *ngIf=\"allDaySlotTemplateRef\" [ngTemplateOutlet]=\"allDaySlotTemplateRef\"\n                                                [ngTemplateOutletContext]=\"{ date: slot.start, resources: resourcesByIndex(resourceIndex) }\"></ng-container>\n                                        </td>\n                                    </ng-container>\n                                </tr>\n                            </table>\n                            <ng-container *ngFor=\"let item of allDayItems | async; trackBy: itemIndex;\">\n                                <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                                    [ngClass]=\"getEventClasses(item, itemResource.resources, true)\"\n                                    [ngStyle]=\"getEventStyles(item, itemResource, true)\"\n                                    [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                                     dayTimeViewItem\n                                        [isAllDay]=\"true\"\n                                        [editable]=\"editable\"\n                                        [eventTemplate]=\"allDayEventTemplateRef\"\n                                        [item]=\"item\"\n                                        [index]=\"item.index\"\n                                        [resources]=\"itemResource.resources\"\n                                        [resourceIndex]=\"itemResource.leafIdx\">\n                                </div>\n                            </ng-container>\n                            <kendo-hint-container #headerHintContainer>\n                                <ng-template>\n                                    <div *ngIf=\"dragHints.length && allDayDragHint\"\n                                        class=\"k-event-drag-hint\"\n                                        dayTimeViewItem\n                                            [isAllDay]=\"true\"\n                                            [ngStyle]=\"dragHints[0].style\"\n                                            [ngClass]=\"dragHints[0].class\"\n                                            [dragHint]=\"true\"\n                                            [eventTemplate]=\"eventTemplateRef\"\n                                            [item]=\"dragHints[0].item\"\n                                            [resources]=\"dragHints[0].resources\">\n                                    </div>\n\n                                    <div *ngIf=\"resizeHints.length && allDayResizeHint\"\n                                        kendoResizeHint\n                                            [hint]=\"resizeHints[0]\"\n                                            [ngClass]=\"resizeHints[0].class\"\n                                            [format]=\"allDayResizeHintFormat\">\n                                    </div>\n                                </ng-template>\n                            </kendo-hint-container>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #times>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of verticalResources | resourceIterator; trackBy: itemIndex;\"\n                            #currentTimeArrow class=\"k-current-time k-current-time-arrow-right\">\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #timesTable aria-hidden=\"true\">\n                        <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;\">\n                            <tr *ngIf=\"verticalResources.length\">\n                                <ng-container *ngFor=\"let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                    <th *ngIf=\"verticalItem(leafIndex, resourceIndex)\" [attr.rowspan]=\"verticalRowspan(resourceIndex)\" class=\"k-slot-cell\">\n                                        <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>\n                                        <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ resource: verticalItem(leafIndex, resourceIndex) }\"></ng-container>\n                                    </th>\n                                </ng-container>\n                                <th class=\"k-scheduler-times-all-day\" #allDayCell>{{ allDayMessage }}</th>\n                            </tr>\n                            <tr *ngFor=\"let slot of timeSlots; let timeSlotIndex = index;trackBy: itemIndex\">\n                                <th *ngIf=\"slot.isMajor\" [ngClass]=\"{ 'k-slot-cell': slotDivisions === 1 }\">\n                                    <ng-container *ngIf=\"!majorTimeHeaderTemplateRef\">{{ slot.start | kendoDate: 't' }}</ng-container>\n                                    <ng-container *ngIf=\"majorTimeHeaderTemplateRef\" [ngTemplateOutlet]=\"majorTimeHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\"></ng-container>\n                                </th>\n                                <th *ngIf=\"!slot.isMajor\" [ngClass]=\"{ 'k-slot-cell': timeSlotIndex % slotDivisions === slotDivisions - 1 }\">\n                                    <ng-container *ngIf=\"minorTimeHeaderTemplateRef\" [ngTemplateOutlet]=\"minorTimeHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\">\n                                    </ng-container>\n                                </th>\n                            </tr>\n                        </ng-container>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-content\" #content>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of verticalResources | resourceIterator; trackBy: itemIndex;\"\n                            #currentTimeMarker class=\"k-current-time\">\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #contentTable role=\"presentation\">\n                        <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;\">\n                            <tr class=\"k-scheduler-header-all-day\" *ngIf=\"verticalResources.length\">\n                                <td *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\"\n                                    daySlot\n                                    [start]=\"slot.start\"\n                                    [end]=\"slot.end\"\n                                    [id]=\"{ resourceIndex: verticalIndex, rangeIndex: 0, index: index }\">\n                                    <ng-container *ngIf=\"allDaySlotTemplateRef\" [ngTemplateOutlet]=\"allDaySlotTemplateRef\"\n                                        [ngTemplateOutletContext]=\"{ date: slot.start, resources: resourcesByIndex(verticalIndex) }\"></ng-container>\n                                </td>\n                            </tr>\n                            <tr *ngFor=\"let slot of timeSlots; index as index; trackBy: itemIndex\" [class.k-middle-row]=\"slot.isMajor\">\n                                <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;\">\n                                    <td *ngFor=\"let daySlot of daySlots; index as rangeIndex; trackBy: itemIndex\"\n                                        [class.k-nonwork-hour]=\"slot.isWorkHour\"\n                                        [ngClass]=\"timeSlotClass(slot, daySlot.start, verticalResources.length ? verticalIndex : horizontalIndex)\"\n                                        timeSlot #timeSlot=\"timeSlot\"\n                                            [date]=\"daySlot.start\"\n                                            [invariantStart]=\"slot.start\"\n                                            [invariantEnd]=\"slot.end\"\n                                            [workDayStart]=\"workDayStartTime\"\n                                            [workDayEnd]=\"workDayEndTime\"\n                                            [workWeekStart]=\"workWeekStart\"\n                                            [workWeekEnd]=\"workWeekEnd\"\n                                            [id]=\"{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }\"\n                                    >\n                                        <ng-container *ngIf=\"timeSlotTemplateRef\" [ngTemplateOutlet]=\"timeSlotTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ date: timeSlot.startLocalTime, resources: resourcesByIndex(timeSlot.id.resourceIndex) }\">\n                                        </ng-container>\n                                    </td>\n                                </ng-container>\n                            </tr>\n                        </ng-container>\n                    </table>\n                    <ng-container *ngFor=\"let item of items | async; trackBy: itemIndex;\">\n                        <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                            [ngClass]=\"getEventClasses(item, itemResource.resources)\"\n                            [ngStyle]=\"getEventStyles(item, itemResource)\"\n                            [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                            dayTimeViewItem\n                                [editable]=\"editable\"\n                                [vertical]=\"true\"\n                                [eventTemplate]=\"eventTemplateRef\"\n                                [item]=\"item\"\n                                [index]=\"item.index\"\n                                [resources]=\"itemResource.resources\"\n                                [resourceIndex]=\"itemResource.leafIdx\">\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"verticalResources.length\">\n                        <ng-container *ngFor=\"let item of allDayItems | async; trackBy: itemIndex;\">\n                            <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                                [ngClass]=\"getEventClasses(item, itemResource.resources, true)\"\n                                [ngStyle]=\"getEventStyles(item, itemResource, true)\"\n                                [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                                dayTimeViewItem\n                                    [isAllDay]=\"true\"\n                                    [editable]=\"editable\"\n                                    [eventTemplate]=\"allDayEventTemplateRef\"\n                                    [item]=\"item\"\n                                    [index]=\"item.index\"\n                                    [resources]=\"itemResource.resources\"\n                                    [resourceIndex]=\"itemResource.leafIdx\">\n                            </div>\n                        </ng-container>\n                    </ng-container>\n                    <kendo-hint-container #hintContainer>\n                        <ng-template>\n                            <div *ngIf=\"dragHints.length && (!allDayDragHint || verticalResources.length)\"\n                                class=\"k-event-drag-hint\"\n                                dayTimeViewItem\n                                    [isAllDay]=\"allDayDragHint\"\n                                    [ngStyle]=\"dragHints[0].style\"\n                                    [ngClass]=\"dragHints[0].class\"\n                                    [dragHint]=\"true\"\n                                    [eventTemplate]=\"eventTemplateRef\"\n                                    [resources]=\"dragHints[0].resources\"\n                                    [item]=\"dragHints[0].item\">\n                            </div>\n\n                            <ng-container *ngIf=\"resizeHints.length && (!allDayResizeHint || verticalResources.length)\">\n                                <div *ngFor=\"let hint of resizeHints; trackBy: itemIndex;\"\n                                    kendoResizeHint\n                                        [hint]=\"hint\"\n                                        [ngClass]=\"hint.class\"\n                                        [format]=\"allDayResizeHint ? allDayResizeHintFormat : resizeHintFormat\">\n                                </div>\n                            </ng-container>\n                        </ng-template>\n                    </kendo-hint-container>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MultiDayViewRendererComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService },
        { type: kendo_angular_intl_1.IntlService },
        { type: day_time_slot_service_1.DayTimeSlotService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.ChangeDetectorRef },
        { type: pdf_service_1.PDFService }
    ]; };
    MultiDayViewRendererComponent.propDecorators = {
        name: [{ type: core_1.Input }],
        slotFill: [{ type: core_1.Input }],
        allDaySlotTemplate: [{ type: core_1.Input }],
        allDayEventTemplate: [{ type: core_1.Input }],
        minorTimeHeaderTemplate: [{ type: core_1.Input }],
        majorTimeHeaderTemplate: [{ type: core_1.Input }],
        dayCells: [{ type: core_1.ViewChildren, args: ['allDayCell',] }],
        headerHintContainer: [{ type: core_1.ViewChild, args: ['headerHintContainer',] }]
    };
    return MultiDayViewRendererComponent;
}(day_time_view_component_1.DayTimeViewComponent));
exports.MultiDayViewRendererComponent = MultiDayViewRendererComponent;
