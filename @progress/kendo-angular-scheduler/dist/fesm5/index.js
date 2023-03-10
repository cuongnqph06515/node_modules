import { __assign, __extends, __generator } from 'tslib';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, Input, NgModule, NgZone, Optional, Output, Pipe, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { ComponentMessages, L10N_PREFIX, LocalizationService, MessageService, RTL } from '@progress/kendo-angular-l10n';
import { Keys, ResizeSensorComponent, ResizeSensorModule, anyChanged, guid, hasObservers, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { Day, MS_PER_DAY, ZonedDate, addDays, addMonths, firstDayInWeek, firstDayOfMonth, getDate, timezoneNames, toLocalDate } from '@progress/kendo-date-math';
import { CalendarModule, DateInputsModule, PreventableEvent } from '@progress/kendo-angular-dateinputs';
import { BehaviorSubject, Subject, Subscription, combineLatest, fromEvent, merge } from 'rxjs';
import { auditTime, buffer, debounceTime, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DialogCloseResult, DialogModule, DialogService } from '@progress/kendo-angular-dialog';
import { CldrIntlService, IntlModule, IntlService, formatDate, parseDate } from '@progress/kendo-angular-intl';
import { CommonModule } from '@angular/common';
import { expand, parseRule, serializeRule } from '@progress/kendo-recurrence';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { groupBy, orderBy } from '@progress/kendo-data-query';
import Draggable from '@telerik/kendo-draggable';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Button, ButtonsModule } from '@progress/kendo-angular-buttons';
import { NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

/**
 * Arguments for the `dateChange` event.
 */
var DateChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function DateChangeEvent(sender, selectedDate, dateRange) {
        this.sender = sender;
        this.selectedDate = selectedDate;
        this.dateRange = dateRange;
    }
    return DateChangeEvent;
}());

/**
 * Arguments for the `navigate` event.
 */
var NavigateEvent = /** @class */ (function (_super) {
    __extends(NavigateEvent, _super);
    /**
     * @hidden
     */
    function NavigateEvent(sender, action) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.action = action;
        return _this;
    }
    return NavigateEvent;
}(PreventableEvent));

/**
 * Arguments for `slotClick` and `slotDblClick` events.
 */
var SlotClickEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function SlotClickEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return SlotClickEvent;
}());

/**
 * Arguments for the `eventClick` and `eventDblClick` events.
 */
var EventClickEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function EventClickEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return EventClickEvent;
}());

/**
 * Arguments for the `eventKeydown` event.
 */
var EventKeydownEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function EventKeydownEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return EventKeydownEvent;
}());

/**
 * Arguments for the `create` event.
 */
var CreateEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CreateEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return CreateEvent;
}());

/**
 * @hidden
 */
var PreventableEvent$1 = /** @class */ (function () {
    function PreventableEvent$$1() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent$$1.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent$$1.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent$$1;
}());

/**
 * Arguments for the `dragEnd` event.
 */
var DragEndEvent = /** @class */ (function (_super) {
    __extends(DragEndEvent, _super);
    /**
     * @hidden
     */
    function DragEndEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragEndEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `drag` event.
 */
var DragEvent = /** @class */ (function (_super) {
    __extends(DragEvent, _super);
    /**
     * @hidden
     */
    function DragEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `dragStart` event.
 */
var DragStartEvent = /** @class */ (function (_super) {
    __extends(DragStartEvent, _super);
    /**
     * @hidden
     */
    function DragStartEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragStartEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `remove` event.
 */
var RemoveEvent = /** @class */ (function (_super) {
    __extends(RemoveEvent, _super);
    /**
     * @hidden
     */
    function RemoveEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return RemoveEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `resizeEnd` event.
 */
var ResizeEndEvent = /** @class */ (function (_super) {
    __extends(ResizeEndEvent, _super);
    /**
     * @hidden
     */
    function ResizeEndEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeEndEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `resize` event.
 */
var ResizeEvent = /** @class */ (function (_super) {
    __extends(ResizeEvent, _super);
    /**
     * @hidden
     */
    function ResizeEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `resizeStart` event.
 */
var ResizeStartEvent = /** @class */ (function (_super) {
    __extends(ResizeStartEvent, _super);
    /**
     * @hidden
     */
    function ResizeStartEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeStartEvent;
}(PreventableEvent$1));

/**
 * @hidden
 *
 * Maps the name of the event to the argument type of the event.
 */
var VIEW_EVENT_MAP = {
    slotClick: SlotClickEvent,
    slotDblClick: SlotClickEvent,
    eventClick: EventClickEvent,
    eventDblClick: EventClickEvent,
    eventKeydown: EventKeydownEvent,
    create: CreateEvent,
    remove: RemoveEvent,
    resizeStart: ResizeStartEvent,
    resize: ResizeEvent,
    resizeEnd: ResizeEndEvent,
    dragStart: DragStartEvent,
    drag: DragEvent,
    dragEnd: DragEndEvent
};

/**
 * @hidden
 */
var EditEventBase = /** @class */ (function () {
    /**
     * @hidden
     */
    function EditEventBase(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return EditEventBase;
}());

/**
 * Arguments for the `cancel` event.
 */
var CancelEvent = /** @class */ (function (_super) {
    __extends(CancelEvent, _super);
    function CancelEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CancelEvent;
}(EditEventBase));

/**
 * Arguments for the `save` event.
 */
var SaveEvent = /** @class */ (function (_super) {
    __extends(SaveEvent, _super);
    function SaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SaveEvent;
}(EditEventBase));

/**
 * Arguments for the `edit` event of the editing directives.
 */
var EditEvent = /** @class */ (function (_super) {
    __extends(EditEvent, _super);
    /**
     * @hidden
     */
    function EditEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return EditEvent;
}(PreventableEvent$1));

/**
 * Arguments for the `add` event of the editing directives.
 */
var AddEvent = /** @class */ (function (_super) {
    __extends(AddEvent, _super);
    /**
     * @hidden
     */
    function AddEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return AddEvent;
}(PreventableEvent$1));

/**
 * Represents the toolbar template of the Scheduler. To define a toolbar
 * template, nest an `<ng-template kendoSchedulerToolbarTemplate>` tag
 * inside `<kendo-scheduler>`. For more information and examples, refer to the article on
 * [customizing the toolbar]({% slug toolbar_scheduler %}) of the Scheduler.
 *
 * The template context receives the following template variables:
 * * `selectedDate`&mdash;The currently selected date.
 * * `dateRange`&mdash;The currently selected [`DateRange`]({% slug api_scheduler_daterange %}).
 * * `views`&mdash;A [`SchedulerView`]({% slug api_scheduler_schedulerview %}) array with the available views.
 * * `selectedView`&mdash;The currently selected [`SchedulerView`]({% slug api_scheduler_schedulerview %}).
 *
 * You can declare either of the following built-in navigation components in the toolbar template:
 * * `kendoSchedulerToolbarNavigation`&mdash;Renders navigation buttons, a calendar, and a date-range label.
 * * `kendoSchedulerToolbarViewSelector`&mdash;Renders the buttons for selecting the view.
 *
 * To emit navigation events, the components inside the toolbar can inject
 * the [`ToolbarService`]({% slug api_scheduler_toolbarservice %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var ToolbarTemplateDirective = /** @class */ (function () {
    function ToolbarTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ToolbarTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerToolbarTemplate]'
                },] },
    ];
    /** @nocollapse */
    ToolbarTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ToolbarTemplateDirective;
}());

/**
 * A service for communication with the toolbar controls
 * which is used by the toolbar components for publishing navigation actions
 * ([see example]({% slug toolbar_scheduler %}#toc-using-the-toolbar-service)).
 */
var ToolbarService = /** @class */ (function () {
    /** @hidden */
    function ToolbarService() {
        this.actionSource = new Subject();
        this.action = this.actionSource.asObservable();
    }
    /**
     * Emits the specified navigation action.
     *
     * @param action - The navigation action that will be executed.
     */
    ToolbarService.prototype.navigate = function (action) {
        this.actionSource.next(action);
    };
    ToolbarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ToolbarService.ctorParameters = function () { return []; };
    return ToolbarService;
}());

/**
 * An abstract class which contains meta information about a Scheduler view.
 */
var SchedulerView = /** @class */ (function () {
    function SchedulerView() {
    }
    return SchedulerView;
}());

/**
 * Represents the template which renders the date header in the **Agenda** view.
 * To define the date template, nest an `<ng-template>` tag with the `kendoSchedulerAgendaDateTemplate`
 * directive inside the `<kendo-scheduler-agenda-view>` or `<kendo-scheduler>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The header date.
 *
 * {% meta height:500 %}
 * {% embed_file templates/agenda-date-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AgendaDateTemplateDirective = /** @class */ (function () {
    function AgendaDateTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AgendaDateTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerAgendaDateTemplate]'
                },] },
    ];
    /** @nocollapse */
    AgendaDateTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AgendaDateTemplateDirective;
}());

/**
 * Represents the template which renders the time header in the **Agenda** view.
 * To define the time template, nest an `<ng-template>` tag with the `kendoSchedulerAgendaTimeTemplate`
 * directive inside the `<kendo-scheduler>` or in the `<kendo-scheduler-agenda-view>` component.
 *
 * The available fields in the template context are:
 * - `start`&mdash;The start date of the event.
 * - `end`&mdash;The end date of the event.
 * - `title`&mdash;The title of the event.
 * - `description`&mdash;The description of the event.
 * - `isAllDay`&mdash;A Boolean value which indicates if the event is all-day.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/agenda-time-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AgendaTimeTemplateDirective = /** @class */ (function () {
    function AgendaTimeTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AgendaTimeTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerAgendaTimeTemplate]'
                },] },
    ];
    /** @nocollapse */
    AgendaTimeTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AgendaTimeTemplateDirective;
}());

/**
 * Represents the template for and assists the content customization of all-day events.
 * To define the all-day event template, nest an `<ng-template>` tag with the `kendoSchedulerAllDayEventTemplate`
 * directive inside the `<kendo-scheduler>`, `<kendo-scheduler-day-view>`, or `kendo-scheduler-week-view` component.
 *
 * The available fields in the template context are:
 * - `event`&mdash;The event that is associated with the item.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/all-day-event/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AllDayEventTemplateDirective = /** @class */ (function () {
    function AllDayEventTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AllDayEventTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerAllDayEventTemplate]'
                },] },
    ];
    /** @nocollapse */
    AllDayEventTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AllDayEventTemplateDirective;
}());

/**
 * Represents the template for and assists the content customization of all-day slots.
 * To define the all-day slot template, nest an `<ng-template>` tag with the `kendoSchedulerAllDaySlotTemplate`
 * directive inside the `<kendo-scheduler>`, `<kendo-scheduler-day-view>`, or `kendo-scheduler-week-view` component.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/all-day-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AllDaySlotTemplateDirective = /** @class */ (function () {
    function AllDaySlotTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AllDaySlotTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerAllDaySlotTemplate]'
                },] },
    ];
    /** @nocollapse */
    AllDaySlotTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AllDaySlotTemplateDirective;
}());

/**
 * Represents the template which renders the date header in the **Day**, **Week**, and **Timeline** views.
 * To define the day template, nest an `<ng-template>` tag with the `kendoSchedulerDateHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The header date.
 *
 * {% meta height:500 %}
 * {% embed_file templates/date-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var DateHeaderTemplateDirective = /** @class */ (function () {
    function DateHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DateHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerDateHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    DateHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DateHeaderTemplateDirective;
}());

/**
 * Represents the template for and assists the content customization of the Scheduler events.
 * To define the event template, nest an `<ng-template>` tag with the `kendoSchedulerEventTemplate`
 * directive inside the `<kendo-scheduler>`, or in the view components.
 *
 * The available fields in the template context are:
 * - `event`&mdash;The event that is associated with the item.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/event/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var EventTemplateDirective = /** @class */ (function () {
    function EventTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    EventTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerEventTemplate]'
                },] },
    ];
    /** @nocollapse */
    EventTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return EventTemplateDirective;
}());

/**
 * Represents the template which renders the resource group header in the **Day**, **Week**, and **Timeline** views.
 * To define the template, nest an `<ng-template>` tag with the `kendoSchedulerGroupHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `resource`&mdash;The resource item.
 *
 * {% meta height:500 %}
 * {% embed_file templates/group-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());

/**
 * Represents the template for the major-time headers in the **Day** and **Week** views.
 * To define the major-time header template, nest an `<ng-template>` tag with the `kendoSchedulerMajorTimeHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>` and `<kendo-scheduler-week-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the header.
 *
 * {% meta height:500 %}
 * {% embed_file templates/major-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var MajorTimeHeaderTemplateDirective = /** @class */ (function () {
    function MajorTimeHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MajorTimeHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerMajorTimeHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    MajorTimeHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return MajorTimeHeaderTemplateDirective;
}());

/**
 * Represents the template for the minor-time headers in the **Day** and **Week** views.
 * To define the minor-time header template, nest an `<ng-template>` tag with the `kendoSchedulerMinorTimeHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>` and `<kendo-scheduler-week-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the header.
 *
 * {% meta height:500 %}
 * {% embed_file templates/minor-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var MinorTimeHeaderTemplateDirective = /** @class */ (function () {
    function MinorTimeHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MinorTimeHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerMinorTimeHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    MinorTimeHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return MinorTimeHeaderTemplateDirective;
}());

/**
 * Represents the template for rendering the day slots in the **Month** view.
 * To define the day template, nest an `<ng-template>` tag with the `kendoSchedulerMonthDaySlotTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-month-view>` component.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/month-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var MonthDaySlotTemplateDirective = /** @class */ (function () {
    function MonthDaySlotTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MonthDaySlotTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerMonthDaySlotTemplate]'
                },] },
    ];
    /** @nocollapse */
    MonthDaySlotTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return MonthDaySlotTemplateDirective;
}());

// Rename to indicate that it is only for the month view.

/**
 * Represents the template for the time-slot renderer in the **Day**, **Week**, and **Timeline** views.
 * To define the time-slot template, nest an `<ng-template>` tag with the `kendoSchedulerTimeSlotTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/time-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var TimeSlotTemplateDirective = /** @class */ (function () {
    function TimeSlotTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TimeSlotTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerTimeSlotTemplate]'
                },] },
    ];
    /** @nocollapse */
    TimeSlotTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return TimeSlotTemplateDirective;
}());

/**
 * A service which publishes information from the Scheduler to the views.
 * Views subscribe to changes in the context (selected date, event, and resource data) through this service.
 */
var ViewContextService = /** @class */ (function () {
    function ViewContextService() {
        this.actionSource = new Subject();
        this.itemsSource = new BehaviorSubject([]);
        this.selectedDateSource = new BehaviorSubject(null);
        this.resizeSource = new Subject();
        this.optionsChangeSource = new BehaviorSubject({});
        this.executeSource = new Subject();
        this.action = this.actionSource.asObservable();
        this.items = this.itemsSource.asObservable();
        this.selectedDate = this.selectedDateSource.asObservable();
        this.resize = this.resizeSource.asObservable();
        this.optionsChange = this.optionsChangeSource.asObservable();
        this.execute = this.executeSource.asObservable();
    }
    /**
     * An internal method which is used by the Scheduler to publish unhandled navigation actions.
     *
     * @hidden
     */
    ViewContextService.prototype.notifyAction = function (action) {
        this.actionSource.next(action);
    };
    /**
     * An internal method which is used by the Scheduler to publish the current set of items.
     *
     * @hidden
     */
    ViewContextService.prototype.notifyItems = function (items) {
        this.itemsSource.next(items);
    };
    /**
     * An internal method which is used by the Scheduler to publish the currently selected date.
     *
     * @hidden
     */
    ViewContextService.prototype.notifySelectedDate = function (date) {
        this.selectedDateSource.next(date);
    };
    /**
     * An internal method which is used by the Scheduler to notify that the size changed.
     *
     * @hidden
     */
    ViewContextService.prototype.notifyResize = function () {
        this.resizeSource.next();
    };
    /**
     * An internal method which is used by the Scheduler to notify that the options changed.
     *
     * @hidden
     */
    ViewContextService.prototype.notifyOptionsChange = function (changes) {
        this.optionsChangeSource.next(changes);
    };
    /**
     * An internal method which is used by the Scheduler to execute a view method.
     *
     * @hidden
     */
    ViewContextService.prototype.executeMethod = function (name, args) {
        var result;
        this.executeSource.next({ name: name, args: args, result: function (r) {
                result = r;
            } });
        return result;
    };
    ViewContextService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ViewContextService.ctorParameters = function () { return []; };
    return ViewContextService;
}());

var emptyDateRange = function () { return ({
    start: new Date(0),
    end: new Date(0),
    text: '',
    shortText: ''
}); };
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
var ViewStateService = /** @class */ (function () {
    function ViewStateService() {
        this.dateRangeSource = new BehaviorSubject(emptyDateRange());
        this.nextDateSource = new Subject();
        this.navigateSource = new Subject();
        this.viewEventSource = new Subject();
        this.layoutEndSource = new Subject();
        this.optionsChangeSource = new Subject();
        this.dateRange = this.dateRangeSource.asObservable();
        this.nextDate = this.nextDateSource.asObservable();
        this.navigate = this.navigateSource.asObservable();
        this.viewEvent = this.viewEventSource.asObservable();
        this.layoutEnd = this.layoutEndSource.asObservable();
        this.optionsChange = this.optionsChangeSource.asObservable();
    }
    /**
     * Publishes the date that will be displayed by the Scheduler
     * typically as a result from processing a navigation action.
     */
    ViewStateService.prototype.notifyNextDate = function (date) {
        this.nextDateSource.next(date);
    };
    /**
     * Publishes the visible date range of the view.
     * The view will calculate and set the new data range when
     * the selected date changes.
     */
    ViewStateService.prototype.notifyDateRange = function (range) {
        this.dateRangeSource.next(range);
    };
    /**
     * Notifies the Scheduler that the view has completed its layout.
     */
    ViewStateService.prototype.notifyLayoutEnd = function () {
        this.layoutEndSource.next();
    };
    /**
     * Navigates to another view.
     */
    ViewStateService.prototype.navigateTo = function (args) {
        this.navigateSource.next(args);
    };
    /**
     * Notifies the Scheduler that the view options have been changed.
     */
    ViewStateService.prototype.notifyOptionsChange = function () {
        this.optionsChangeSource.next(null);
    };
    /**
     * Emits a DOM event to the Scheduler.
     */
    ViewStateService.prototype.emitEvent = function (name, args) {
        this.viewEventSource.next({
            name: name,
            args: args
        });
    };
    ViewStateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ViewStateService.ctorParameters = function () { return []; };
    return ViewStateService;
}());

var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};
getterCache['undefined'] = function () { return undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
function getter(field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    getterCache[field] = function (obj) {
        var result = obj;
        for (var idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
}

var FIELD_REGEX$1 = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var setterCache = {};
setterCache['undefined'] = function (obj) { return obj; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
function setter(field) {
    if (setterCache[field]) {
        return setterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX$1, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    setterCache[field] = function (obj, value) {
        var root = obj;
        var depth = fields.length - 1;
        for (var idx = 0; idx < depth && root; idx++) {
            root = root[fields[idx]] = root[fields[idx]] || {};
        }
        root[fields[depth]] = value;
    };
    return setterCache[field];
}

/**
 * @hidden
 */
var OCCURRENCE_ID = 0;

/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var capitalize = function (value) { return value.charAt(0).toUpperCase() + value.slice(1); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */

/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isNullOrEmptyString = function (value) { return isBlank(value) || (value.trim && value.trim().length === 0); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isNumber = function (value) { return typeof value === "number" && !isNaN(value); };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isString = function (value) { return typeof value === 'string'; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
var isObject = function (value) { return typeof value === 'object'; };
/**
 * @hidden
 */
var isRecurring = function (event, fields) {
    var recurrenceId = getter(fields.recurrenceId)(event);
    var recurrenceRule = getter(fields.recurrenceRule)(event);
    return !!(recurrenceRule || recurrenceId);
};
/**
 * @hidden
 */
var isException = function (event, fields) {
    var id = getter(fields.id)(event);
    var recurrenceId = getter(fields.recurrenceId)(event);
    return isPresent(id) && id !== OCCURRENCE_ID && isPresent(recurrenceId);
};
/**
 * @hidden
 */
var copyResources = function (event, resources) {
    if (resources) {
        for (var idx = 0; idx < resources.length; idx++) {
            assignField(event, event.dataItem, resources[idx].field);
        }
    }
};
/**
 * @hidden
 */
var readEvent = function (dataItem, fields, resources) {
    var result = {
        id: getter(fields.id)(dataItem),
        start: getter(fields.start)(dataItem),
        startTimezone: getter(fields.startTimezone)(dataItem),
        end: getter(fields.end)(dataItem),
        endTimezone: getter(fields.endTimezone)(dataItem),
        isAllDay: getter(fields.isAllDay)(dataItem),
        title: getter(fields.title)(dataItem),
        description: getter(fields.description)(dataItem),
        recurrenceRule: getter(fields.recurrenceRule)(dataItem),
        recurrenceExceptions: getter(fields.recurrenceExceptions)(dataItem),
        recurrenceId: getter(fields.recurrenceId)(dataItem),
        dataItem: dataItem
    };
    copyResources(result, resources);
    return result;
};
/**
 * @hidden
 */
var isRecurrenceMaster = function (event) {
    return event.recurrenceRule && !isPresent(event.recurrenceId);
};
/**
 * @hidden
 */
function groupResources(group, resources) {
    var result = [];
    if (group && group.resources && group.resources.length) {
        var groups_1 = group.resources;
        var _loop_1 = function (idx) {
            var resource = resources.find(function (r) { return r.name === groups_1[idx]; });
            result.push(resource);
        };
        for (var idx = 0; idx < groups_1.length; idx++) {
            _loop_1(idx);
        }
    }
    return result;
}
/**
 * @hidden
 */
var getField = function (obj, field) { return getter(field)(obj); };
/**
 * @hidden
 */
var setField = function (obj, field, value) { return setter(field)(obj, value); };
/**
 * @hidden
 */
function assignField(target, source, field) {
    setField(target, field, getField(source, field));
}
/**
 * @hidden
 */

/**
 * @hidden
 */
function assignValues(target, source) {
    cloneTo(source, target);
    return target;
}
/**
 * @hidden
 */
function cloneTo(obj, result) {
    for (var field in obj) {
        if (obj.hasOwnProperty(field)) {
            var value = obj[field];
            if (Array.isArray(value)) {
                result[field] = value.slice(0);
            }
            else if (value && typeof value === 'object' && !(value instanceof Date)) {
                result[field] = result[field] || {};
                cloneTo(value, result[field]);
            }
            else {
                result[field] = value;
            }
        }
    }
}
/**
 * @hidden
 */
function clone(obj) {
    var result = {};
    cloneTo(obj, result);
    return result;
}
/** @hidden */
var iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
/**
 * @hidden
 */
function fromClick(element) {
    return fromEvent(element, 'click');
}
/**
 * @hidden
 */
function fromDoubleClick(element) {
    var DBLCLICK_DELAY = 250;
    var clicks = fromClick(element);
    var endSequence = clicks.pipe(auditTime(DBLCLICK_DELAY));
    return clicks.pipe(buffer(endSequence), filter(function (sequence) { return sequence.length === 2; }), filter(function (sequence) { return sequence[1].target === sequence[0].target; }), map(function (sequence) { return sequence[1]; }));
}
/**
 * @hidden
 */
function sortTasksByTime(tasks) {
    tasks.sort(function (a, b) { return (a.startTime - b.startTime) || (b.endTime - a.endTime); });
    return tasks;
}

// const toSimilarDate = (date: ZonedDate): Date => new Date(
//     date.getFullYear(), date.getMonth(), date.getDay(),
//     date.getHours(), date.getMinutes(), date.getSeconds(),
//     date.getMilliseconds()
//   );
// const toUTCDateTime = (localDate: Date): Date => new Date(Date.UTC(
//       localDate.getFullYear(),
//       localDate.getMonth(),
//       localDate.getDate(),
//       localDate.getHours(),
//       localDate.getMinutes(),
//       localDate.getSeconds(),
//       localDate.getMilliseconds()
//     ));
/**
 * @hidden
 */
var EditService = /** @class */ (function () {
    function EditService(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(debounceTime(0));
    }
    EditService.prototype.endEdit = function () {
        var formGroup = this.hasNewEvent ? this.newEventGroup.group : this.editedEvent.formGroup;
        this.changes.emit({ action: 'cancel', formGroup: formGroup });
    };
    EditService.prototype.removeEvent = function (dataItem) {
        this.changes.emit({ action: 'remove', dataItem: dataItem });
    };
    EditService.prototype.addEvent = function (formGroup) {
        this.newEventGroup = { formGroup: formGroup };
        this.onChanged();
    };
    EditService.prototype.editEvent = function (dataItem, formGroup, mode) {
        if (formGroup === void 0) { formGroup = undefined; }
        this.editedEvent = { dataItem: dataItem, formGroup: formGroup, mode: mode };
        this.onChanged();
    };
    EditService.prototype.close = function () {
        this.newEventGroup = this.editedEvent = null;
        this.onChanged();
    };
    EditService.prototype.save = function () {
        var _a = this.context, dataItem = _a.dataItem, formGroup = _a.formGroup;
        this.changes.emit({
            action: 'save',
            dataItem: dataItem,
            formGroup: formGroup,
            isNew: this.hasNewEvent,
            mode: this.occurrenceEditMode
        });
    };
    EditService.prototype.isEditing = function () {
        return isPresent(this.context);
    };
    Object.defineProperty(EditService.prototype, "occurrenceEditMode", {
        get: function () {
            if (this.hasNewEvent) {
                return 2 /* Series */;
            }
            else {
                return this.editedEvent.mode || 0 /* Event */;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "hasNewEvent", {
        get: function () {
            return isPresent(this.newEventGroup);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "newEvent", {
        get: function () {
            if (this.hasNewEvent) {
                return this.newEventGroup.group.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "context", {
        get: function () {
            if (this.hasNewEvent) {
                return this.newEventGroup;
            }
            return this.editedEvent;
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.onChanged = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.changedSource.next();
        });
    };
    EditService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return EditService;
}());

/**
 * Represents the template for the edit dialog of the Scheduler.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoSchedulerEditTemplate` directive inside the `<kendo-scheduler>` tag.
 *
 * The template context contains the following fields:
 * - `formGroup`&mdash;The current [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html).
 * - `event`&mdash;The currently edited event.
 * - `editMode`&mdash;The current edit mode.
 * - `isNew`&mdash;The state of the current event.
 */
var EditDialogTemplateDirective = /** @class */ (function () {
    function EditDialogTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    EditDialogTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerEditDialogTemplate]'
                },] },
    ];
    /** @nocollapse */
    EditDialogTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return EditDialogTemplateDirective;
}());

/**
 * @hidden
 */
var LocalDataChangesService = /** @class */ (function () {
    function LocalDataChangesService() {
        this.changes = new EventEmitter();
    }
    LocalDataChangesService.decorators = [
        { type: Injectable },
    ];
    return LocalDataChangesService;
}());

/**
 * @hidden
 */
var DomEventsService = /** @class */ (function () {
    function DomEventsService() {
        this.focus = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.click = new EventEmitter();
        this.keydown = new EventEmitter();
        this.windowBlur = new EventEmitter();
    }
    DomEventsService.decorators = [
        { type: Injectable },
    ];
    return DomEventsService;
}());

/**
 * @hidden
 */
var FocusService = /** @class */ (function () {
    function FocusService(renderer, wrapper, domEvents) {
        var _this = this;
        this.renderer = renderer;
        this.wrapper = wrapper;
        this.domEvents = domEvents;
        this.items = new Set();
        this.elementMap = new WeakMap();
        this.subs = new Subscription();
        this.subs.add(this.domEvents.focus.subscribe(function (e) { return _this.onFocusIn(e); }));
        this.subs.add(this.domEvents.focusOut.subscribe(function () { return _this.onFocusOut(); }));
    }
    Object.defineProperty(FocusService.prototype, "activeElement", {
        get: function () {
            if (this.activeItem) {
                return this.activeItem.element;
            }
        },
        enumerable: true,
        configurable: true
    });
    FocusService.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    FocusService.prototype.register = function (item) {
        if (!this.activeItem) {
            this.activeItem = item;
            item.toggle(true);
        }
        this.items.add(item);
        this.elementMap.set(item.element.nativeElement, item);
        this.toggleWrapper();
    };
    FocusService.prototype.unregister = function (item) {
        this.items.delete(item);
        this.elementMap.delete(item.element.nativeElement);
        if (item === this.activeItem) {
            this.activateNext();
        }
        this.toggleWrapper();
    };
    FocusService.prototype.focus = function () {
        if (this.activeItem) {
            this.activeItem.focus();
        }
        else {
            this.wrapper.nativeElement.focus();
        }
    };
    FocusService.prototype.focusNext = function (options) {
        var currentItem = this.activeItem;
        this.activateNext(options);
        if (this.activeItem) {
            this.activeItem.focus();
        }
        return this.activeItem !== currentItem;
    };
    FocusService.prototype.activate = function (next) {
        this.items.forEach(function (item) { return item.toggle(item === next); });
        this.activeItem = next;
    };
    FocusService.prototype.activateNext = function (position) {
        this.activeItem = this.findNext(position);
    };
    FocusService.prototype.findNext = function (position) {
        var _a = __assign({ nowrap: false, offset: 1 }, position), offset = _a.offset, nowrap = _a.nowrap;
        var items = Array.from(this.items.values())
            .filter(function (item) { return item.canFocus(); })
            .sort(function (a, b) { return a.focusIndex - b.focusIndex; });
        if (items.length === 0) {
            return null;
        }
        if (!this.activeItem) {
            return nowrap ? null : items[0];
        }
        var index = items.indexOf(this.activeItem);
        var nextIndex = index + offset;
        if (nowrap) {
            nextIndex = Math.max(0, Math.min(items.length - 1, nextIndex));
        }
        else {
            nextIndex = nextIndex % items.length;
            if (nextIndex < 0) {
                nextIndex = items.length - 1;
            }
        }
        return items[nextIndex];
    };
    FocusService.prototype.toggleWrapper = function () {
        if (this.wrapper) {
            this.renderer.setAttribute(this.wrapper.nativeElement, 'tabindex', this.activeItem ? '-1' : '0');
        }
    };
    FocusService.prototype.onFocusIn = function (e) {
        var item = this.elementMap.get(e.target);
        if (!item || item === this.focusedItem) {
            return;
        }
        if (this.focusedItem) {
            this.focusedItem.toggleFocus(false);
        }
        this.activate(item);
        item.toggleFocus(true);
        this.focusedItem = item;
    };
    FocusService.prototype.onFocusOut = function () {
        if (!this.focusedItem) {
            return;
        }
        this.focusedItem.toggleFocus(false);
        this.focusedItem = null;
    };
    FocusService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FocusService.ctorParameters = function () { return [
        { type: Renderer2, decorators: [{ type: Optional }] },
        { type: ElementRef, decorators: [{ type: Optional }] },
        { type: DomEventsService }
    ]; };
    return FocusService;
}());

/**
 * @hidden
 */
var DialogsService = /** @class */ (function () {
    function DialogsService(dialogService, localization, changeDetector, focusService, viewState) {
        this.dialogService = dialogService;
        this.localization = localization;
        this.changeDetector = changeDetector;
        this.focusService = focusService;
        this.viewState = viewState;
        this.isOpen = false;
    }
    DialogsService.prototype.openRemoveConfirmationDialog = function () {
        var _this = this;
        var dialog = this.dialogService.open({
            title: this.textFor('deleteDialogTitle'),
            content: this.textFor('deleteConfirmation'),
            actions: [
                { text: this.textFor('cancel'), value: false },
                { text: this.textFor('destroy'), value: true }
            ],
            appendTo: this.container,
            autoFocusedElement: 'button:nth-child(2)'
        });
        this.isOpen = true;
        this.changeDetector.markForCheck();
        return dialog.result.pipe(map(function (result) {
            _this.isOpen = false;
            if (result instanceof DialogCloseResult) {
                _this.focusService.focus();
                return false;
            }
            _this.viewState.layoutEnd.pipe(take(1)).subscribe(function () {
                return _this.focusService.focus();
            });
            var res = result;
            return res.value;
        }));
    };
    DialogsService.prototype.openRecurringConfirmationDialog = function (operation) {
        var _this = this;
        var dialog = this.dialogService.open({
            actions: [
                {
                    text: operation === 0 /* Edit */ ? this.textFor('editOccurrence') : this.textFor('deleteOccurrence'),
                    value: 1 /* Occurrence */
                },
                {
                    text: operation === 0 /* Edit */ ? this.textFor('editSeries') : this.textFor('deleteSeries'),
                    value: 2 /* Series */
                }
            ],
            appendTo: this.container,
            autoFocusedElement: 'button:nth-child(1)',
            content: operation === 0 /* Edit */ ? this.textFor('editRecurringConfirmation') : this.textFor('deleteRecurringConfirmation'),
            title: operation === 0 /* Edit */ ? this.textFor('editRecurringDialogTitle') : this.textFor('deleteRecurringDialogTitle')
        });
        this.isOpen = true;
        this.changeDetector.markForCheck();
        return dialog.result.pipe(map(function (result) {
            _this.isOpen = false;
            _this.focusService.focus();
            if (result instanceof DialogCloseResult) {
                return undefined;
            }
            var res = result;
            return res.value;
        }));
    };
    DialogsService.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    DialogsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DialogsService.ctorParameters = function () { return [
        { type: DialogService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: FocusService },
        { type: ViewStateService }
    ]; };
    return DialogsService;
}());

/**
 * @hidden
 */
var SchedulerLocalizationService = /** @class */ (function (_super) {
    __extends(SchedulerLocalizationService, _super);
    function SchedulerLocalizationService(prefix, messageService, _rtl) {
        return _super.call(this, prefix, messageService, _rtl) || this;
    }
    /** @nocollapse */
    SchedulerLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    return SchedulerLocalizationService;
}(LocalizationService));

/**
 * @hidden
 */
var defaultModelFields = {
    id: 'id',
    start: 'start',
    startTimezone: 'startTimezone',
    end: 'end',
    endTimezone: 'endTimezone',
    isAllDay: 'isAllDay',
    title: 'title',
    description: 'description',
    recurrenceRule: 'recurrenceRule',
    recurrenceId: 'recurrenceId',
    recurrenceExceptions: 'recurrenceExceptions'
};

/**
 * @hidden
 */
var PDFService = /** @class */ (function () {
    function PDFService() {
        this.createElement = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.done = new EventEmitter();
        this.elementReady = new EventEmitter();
    }
    PDFService.prototype.save = function () {
        if (!hasObservers(this.elementReady)) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-scheduler-pdf> component.');
            }
            return;
        }
        if (!hasObservers(this.createElement)) {
            if (isDevMode()) {
                throw new Error('No active Scheduler view to export.');
            }
            return;
        }
        this.createElement.emit();
    };
    PDFService.decorators = [
        { type: Injectable },
    ];
    return PDFService;
}());

/**
 * The arguments for the `pdfExport` event.
 */
var PDFExportEvent = /** @class */ (function (_super) {
    __extends(PDFExportEvent, _super);
    function PDFExportEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PDFExportEvent;
}(PreventableEvent$1));

/**
 * @hidden
 */
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.hostClasses = true;
    }
    Object.defineProperty(LoadingComponent.prototype, "display", {
        get: function () {
            return this.loading || this.force ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    LoadingComponent.prototype.toggle = function (value) {
        this.force = value;
        this.renderer.setStyle(this.element.nativeElement, 'display', this.display);
    };
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerLoading]',
                    template: "\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    LoadingComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-loading-mask',] }],
        loading: [{ type: Input }],
        display: [{ type: HostBinding, args: ['style.display',] }]
    };
    return LoadingComponent;
}());

/**
 * @hidden
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(element, renderer, focusService) {
        this.element = element;
        this.renderer = renderer;
        this.focusService = focusService;
        /**
         * The order of the element with respect to the other focusable elements.
         * If multiple elements share the same value, their relative to each other order follows their position in the component tree.
         */
        this.focusIndex = 0;
        this.toggle(false);
        this.focusService.register(this);
    }
    Object.defineProperty(FocusableDirective.prototype, "visible", {
        get: function () {
            return this.element.nativeElement.style.display !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusableDirective.prototype, "enabled", {
        get: function () {
            return !this.element.nativeElement.disabled;
        },
        enumerable: true,
        configurable: true
    });
    FocusableDirective.prototype.ngOnDestroy = function () {
        this.focusService.unregister(this);
    };
    FocusableDirective.prototype.toggle = function (active) {
        if (active !== this.active) {
            var index = active ? '0' : '-1';
            this.renderer.setAttribute(this.element.nativeElement, 'tabIndex', index);
            this.active = active;
        }
    };
    FocusableDirective.prototype.canFocus = function () {
        return this.visible && this.enabled;
    };
    FocusableDirective.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    FocusableDirective.prototype.toggleFocus = function (value) {
        var focusedClass = 'k-state-selected';
        var element = this.element.nativeElement;
        if (value) {
            this.renderer.addClass(element, focusedClass);
        }
        else {
            this.renderer.removeClass(element, focusedClass);
        }
        this.renderer.setAttribute(element, 'aria-selected', value.toString());
    };
    FocusableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerFocusIndex]'
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: FocusService }
    ]; };
    FocusableDirective.propDecorators = {
        focusIndex: [{ type: Input, args: ['kendoSchedulerFocusIndex',] }]
    };
    return FocusableDirective;
}());

// TODO: Move to @progress/kendo-common
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */

/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
var firstElementChild = function (node) {
    var children = node.children;
    var length = children.length;
    for (var idx = 0; idx < length; idx++) {
        if (children[idx].nodeType === 1) {
            return children[idx];
        }
    }
};
/**
 * @hidden
 */
var closestInScope = function (node, predicate, scope) {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
/**
 * @hidden
 */
var preventLockedScroll = function (el) { return function (event) {
    var delta = wheelDeltaY(event);
    var scrollTop = el.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
}; };
var cachedScrollbarWidth = 0;
/**
 * @hidden
 */
function scrollbarWidth() {
    if (!cachedScrollbarWidth && isDocumentAvailable()) {
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
/**
 * @hidden
 */
function hasScrollbar(element, type) {
    var sizeField = type === 'vertical' ? 'Height' : 'Width';
    return element["scroll" + sizeField] > element["client" + sizeField];
}
/**
 * @hidden
 */
function rtlScrollPosition(element, position) {
    var initial = element.scrollLeft;
    var result = position;
    element.scrollLeft = -1;
    if (element.scrollLeft < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}
/**
 * @hidden
 */

var todayDate = function () { return getDate(new Date()); };
var DAYS_IN_WEEK = 7;
/**
 * Represents the [Kendo UI Scheduler component for Angular]({% slug overview_scheduler %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-scheduler style="height: 600px">
 *            <kendo-scheduler-day-view>
 *            </kendo-scheduler-day-view>
 *            <kendo-scheduler-week-view>
 *            </kendo-scheduler-week-view>
 *        </kendo-scheduler>
 *    `
 * })
 * class AppComponent {}
 * ```
 */
var SchedulerComponent = /** @class */ (function () {
    function SchedulerComponent(wrapper, viewContext, viewState, editService, dialogsService, intlService, changeDetector, zone, pdfService, localization, domEvents, renderer, focusService) {
        this.wrapper = wrapper;
        this.viewContext = viewContext;
        this.viewState = viewState;
        this.editService = editService;
        this.dialogsService = dialogsService;
        this.intlService = intlService;
        this.changeDetector = changeDetector;
        this.zone = zone;
        this.pdfService = pdfService;
        this.localization = localization;
        this.domEvents = domEvents;
        this.renderer = renderer;
        this.focusService = focusService;
        this.hostClasses = true;
        this.rtl = false;
        /**
         * Specifies if the Scheduler is editable.
         */
        this.editable = false;
        /**
         * The height of the events in the **Month** and **Timeline** views, and the height of the **All day** events in the **Day** and **Week** views.
         */
        this.eventHeight = 25;
        /**
         * Specifies the columns width. Applicable for the **Timeline** views.
         */
        this.columnWidth = 100;
        /**
         * The start time of the view. The Scheduler displays events which start after the start time.
         * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.startTime = '00:00';
        /**
         * The end time of the view. The Scheduler displays events which end before the end time.
         * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.endTime = '00:00';
        /**
         * The start time of the view when `showWorkHours` is set to `true`.
         * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.workDayStart = '08:00';
        /**
         * The end time of the view when `showWorkHours` is set to `true`.
         * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.workDayEnd = '17:00';
        /**
         * The duration (in minutes) of the time slots. Applicable for the day, week and timeline views.
         */
        this.slotDuration = 60;
        /**
         * The number of divisions of the time slots. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.slotDivisions = 2;
        /**
         * A numeric value between 0 and 1 that specifies what percentage of the slot will be filled by the events.
         * Applicable for the **Day** and **Week** views.
         * Defaults to `0.9` (90% fill).
         */
        this.slotFill = 0.9;
        /**
         * The time to which the view will initially be scrolled.
         * Accepts string values in the `HH:mm` format or a JavaScript `Date`. Applicable for the **Day**, **Week**, and **Timeline** views.
         */
        this.scrollTime = this.workDayStart;
        /**
         * Specifies the Scheduler current time marker settings.
         */
        this.currentTimeMarker = true;
        /**
         * @hidden
         */
        this.selectedViewIndexChange = new EventEmitter();
        /**
         * Fires when the Scheduler is about to execute a navigation action
         * (a view, date, or focus change).
         */
        this.navigate = new EventEmitter();
        /**
         * Fires when the date range that is displayed in the Scheduler changes.
         */
        this.dateChange = new EventEmitter();
        /**
         * Fires when a Scheduler view slot is clicked.
         */
        this.slotClick = new EventEmitter();
        /**
         * Fires when a Scheduler view slot is double-clicked.
         */
        this.slotDblClick = new EventEmitter();
        /**
         * Fires when the user cancels the editing by clicking the **Cancel** command button.
         */
        this.create = new EventEmitter();
        /**
         * Fires when a Scheduler event is clicked.
         */
        this.eventClick = new EventEmitter();
        /**
         * Fires when a Scheduler event is double-clicked.
         */
        this.eventDblClick = new EventEmitter();
        /**
         * Fires when a key is pressed on a focused Scheduler event.
         */
        this.eventKeydown = new EventEmitter();
        /**
         * Fires when the user cancels the editing by clicking the **Cancel** command button.
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save the changes of the edited event.
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** icon of a Scheduler event.
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user starts resizing a Scheduler event.
         */
        this.resizeStart = new EventEmitter();
        /**
         * Fires when the user is resizing a Scheduler event.
         */
        this.resize = new EventEmitter();
        /**
         * Fires when the user stops resizing a Scheduler event.
         */
        this.resizeEnd = new EventEmitter();
        /**
         * Fires when the user starts dragging a Scheduler event.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the user is dragging a Scheduler event.
         */
        this.drag = new EventEmitter();
        /**
         * Fires when the user stops dragging a Scheduler event.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the user clicks the **PDF export** command button.
         */
        this.pdfExport = new EventEmitter();
        /**
         * @hidden
         */
        this.dragEndConfirmed = new EventEmitter();
        /**
         * @hidden
         */
        this.resizeEndConfirmed = new EventEmitter();
        /**
         * @hidden
         */
        this.removeConfirmed = new EventEmitter();
        this.viewIndex = 0;
        this._timezone = '';
        this._modelFields = defaultModelFields;
        this.dateRangeStream = viewState.dateRange;
        this.selectedDateStream = viewContext.selectedDate;
    }
    Object.defineProperty(SchedulerComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchedulerComponent.prototype, "selectedViewIndex", {
        get: function () {
            return this.viewIndex;
        },
        /**
         * The index of the currently selected view.
         *
         * By default, the selected view index is `0` and
         * indicates that the first declared view is visible.
         */
        set: function (index) {
            this.viewIndex = index;
            this.onViewIndexChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchedulerComponent.prototype, "timezone", {
        get: function () {
            return this._timezone;
        },
        /**
         * Specifies the id of the timezone that will be displayed in the Scheduler.
         * For example, `Europe/Sofia`.
         * Defaults to `Etc/UTC`.
         */
        set: function (value) {
            this._timezone = value;
            this.events = this.events || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchedulerComponent.prototype, "events", {
        get: function () {
            return this._events;
        },
        /**
         * An array of event instances which will be shown by the Scheduler.
         */
        set: function (value) {
            this._events = value;
            this.processEvents(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchedulerComponent.prototype, "selectedDate", {
        get: function () {
            return this._selectedDate;
        },
        /**
         * The currently selected date of the Scheduler.
         * Determines the period which is displayed.
         */
        set: function (value) {
            if (!value) {
                return;
            }
            this._selectedDate = value;
            this.viewContext.notifySelectedDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchedulerComponent.prototype, "modelFields", {
        get: function () {
            return this._modelFields;
        },
        /**
         * The names of the model fields from which the Scheduler will read its data
         * ([see example]({% slug databinding_scheduler %}#toc-binding-to-models)).
         */
        set: function (value) {
            this._modelFields = __assign({}, defaultModelFields, value);
        },
        enumerable: true,
        configurable: true
    });
    SchedulerComponent.prototype.ngOnInit = function () {
        if (!this.selectedDate) {
            this.selectedDate = todayDate();
        }
    };
    SchedulerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (isDevMode() && this.views.length === 0) {
            throw new Error('No views declared for <kendo-scheduler>. Please, declare at least one view.');
        }
        this.subs = this.views.changes.subscribe(function () {
            return _this.resetViewIndex();
        });
        this.subs.add(this.intlService.changes.subscribe(this.intlChange.bind(this)));
        this.subs.add(this.viewState.nextDate.subscribe(function (nextDate) {
            _this.selectedDate = nextDate;
        }));
        this.subs.add(this.viewState.dateRange.subscribe(function (dateRange) {
            var isEmpty = dateRange.start.getTime() === 0;
            if (!isEmpty) {
                var args = new DateChangeEvent(_this, _this.selectedDate, dateRange);
                _this.dateChange.emit(args);
            }
        }));
        this.subs.add(this.viewState.navigate.subscribe(function (_a) {
            var viewName = _a.viewName, date = _a.date;
            var views = _this.views.toArray();
            var view = views.find(function (v) { return v.name === viewName; });
            if (view) {
                var index = views.indexOf(view);
                _this.selectedView = view;
                _this.setViewIndex(index);
                _this.selectedDate = date;
            }
        }));
        this.subs.add(this.viewState.viewEvent.subscribe(function (_a) {
            var name = _a.name, args = _a.args;
            var emitter = _this[name];
            var confirmedEmitter = _this[name + "Confirmed"];
            if (hasObservers(emitter) || (confirmedEmitter && hasObservers(confirmedEmitter))) {
                _this.zone.run(function () {
                    var eventInstance = new VIEW_EVENT_MAP[name](_this, args);
                    emitter.emit(eventInstance);
                    args.prevented = eventInstance.prevented;
                    if (confirmedEmitter && !args.prevented) {
                        confirmedEmitter.emit(eventInstance);
                    }
                });
            }
        }));
        this.subs.add(this.viewState.layoutEnd.subscribe(function () {
            if (_this.resizeSensor) {
                _this.resizeSensor.acceptSize();
            }
        }));
        this.onViewIndexChange();
        this.notifyOptionsChange = this.notifyOptionsChange.bind(this);
        this.subs.add(this.allDayEventTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.eventTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.timeSlotTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.timeSlotTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.minorTimeHeaderTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.majorTimeHeaderTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.monthDaySlotTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.dateHeaderTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.allDaySlotTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.groupHeaderTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.agendaDateTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.agendaTimeTemplate.changes.subscribe(this.notifyOptionsChange));
        this.subs.add(this.views.changes.subscribe(function () {
            _this.changeDetector.markForCheck();
        }));
        //this.editService.timezone = this.timezone;
        this.attachEditHandlers();
        this.dialogsService.container = this.confirmationDialogContainerRef;
        this.notifyOptionsChange();
        this.subs.add(this.pdfService.exportClick.subscribe(function () {
            var args = new PDFExportEvent();
            _this.pdfExport.emit(args);
            if (!args.isDefaultPrevented()) {
                _this.saveAsPDF();
            }
        }));
        this.subs.add(this.pdfService.done.subscribe(function () {
            _this.loadingComponent.toggle(false);
        }));
        this.subs.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        }));
        this.subs.add(this.viewState.optionsChange.subscribe(function () {
            _this.changeDetector.markForCheck();
        }));
        this.attachElementEventHandlers();
    };
    SchedulerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (isChanged('resources', changes) && !isChanged('events', changes) && this.viewItems) {
            this.viewItems.forEach(function (item) {
                copyResources(item.event, _this.resources);
            });
        }
        if (anyChanged(['group', 'resources', 'min', 'max', 'showWorkHours', 'startTime', 'scrollTime', 'endTime', 'eventHeight',
            'workDayStart', 'workDayEnd', 'workWeekStart', 'workWeekEnd', 'slotDuration', 'slotDivisions',
            'editable', 'timezone', 'slotClass', 'slotFill', 'columnWidth', 'eventClass', 'eventStyles'], changes)) {
            this.notifyOptionsChange(changes);
        }
    };
    SchedulerComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
    };
    /**
     * @hidden
     */
    SchedulerComponent.prototype.onResize = function (_event) {
        this.viewContext.notifyResize();
    };
    /**
     * @hidden
     */
    SchedulerComponent.prototype.onNavigationAction = function (action) {
        var args = new NavigateEvent(this, action);
        this.navigate.next(args);
        if (args.isDefaultPrevented()) {
            return true;
        }
        if (action.type === 'view-change') {
            var views = this.views.toArray();
            var index = views.indexOf(action.view);
            this.selectedView = action.view;
            this.setViewIndex(index);
        }
        else if (action.type === 'select-date') {
            if (this.isInRange(action.date)) {
                this.selectedDate = action.date;
            }
        }
        else if (action.type === 'today') {
            var date = new Date();
            if (this.isInRange(date)) {
                this.selectedDate = date;
            }
        }
        else {
            this.viewContext.notifyAction(action);
        }
    };
    /**
     * Creates a popup editor for the new event.
     *
     * @param group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html) that describes
     * the edit form. If called with a data item, the parameter will build the `FormGroup` from the data item fields.
     */
    SchedulerComponent.prototype.addEvent = function (group) {
        var isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            var createControl = function (source) { return function (acc, key) {
                acc[key] = new FormControl(source[key]);
                return acc;
            }; };
            var fields = Object.keys(group).reduce(createControl(group), {});
            group = new FormGroup(fields);
        }
        this.editService.addEvent(group);
    };
    /**
     * Switches the specified event in edit mode.
     *
     * @param dataItem - The event that will be switched to edit mode.
     * @param options - An object which contains the form `group` that will be bound in the edit dialog and the current edit `mode`.
     *
     */
    SchedulerComponent.prototype.editEvent = function (dataItem, options) {
        if (options === void 0) { options = {}; }
        var group = options.group, mode = options.mode;
        this.editService.editEvent(dataItem, group, mode);
    };
    /**
     * Closes the event editor, if open.
     */
    SchedulerComponent.prototype.closeEvent = function () {
        this.editService.close();
    };
    /**
     * Returns a flag which indicates if an event is currently edited.
     *
     * @return {boolean} - A flag which indicates if an event is currently edited.
     */
    SchedulerComponent.prototype.isEditing = function () {
        return this.editService.isEditing();
    };
    /**
     * Opens the built-in confirmation dialog for defining the edit mode
     * that will be used when the user edits or removes a recurring event.
     *
     * @param operation - The type of operation that will be confirmed. Has to be either **Edit** or **Remove**.
     *
     * @return {Observable<EditMode>}
     */
    SchedulerComponent.prototype.openRecurringConfirmationDialog = function (operation) {
        return this.dialogsService.openRecurringConfirmationDialog(operation);
    };
    /**
     * Opens the built-in removal confirmation dialog.
     *
     * @return {Observable<boolean>}
     */
    SchedulerComponent.prototype.openRemoveConfirmationDialog = function () {
        return this.dialogsService.openRemoveConfirmationDialog();
    };
    /**
     * Saves the current view as PDF.
     */
    SchedulerComponent.prototype.saveAsPDF = function () {
        var _this = this;
        this.loadingComponent.toggle(true);
        this.zone.runOutsideAngular(function () {
            // wait a tick in order for the loading element style to be updated by the browser.
            // if the export is synchronous, the browser will not update the element before the export is finished.
            setTimeout(function () {
                _this.pdfService.save();
            }, 0);
        });
    };
    /**
     * Scrolls the view to the specified time.
     */
    SchedulerComponent.prototype.scrollToTime = function (time) {
        this.viewContext.notifyAction({
            type: 'scroll-time',
            time: time
        });
    };
    /**
     * Returns the current view slot that matches the passed document position.
     *
     * @param x - The x document position.
     * @param y - The y document position.
     *
     * @return {SchedulerSlot} - The slot.
     *
     * {% embed_file drag-and-drop/app.component.ts %}
     * {% embed_file drag-and-drop/draggable.directive.ts %}
     * {% embed_file drag-and-drop/app.module.ts %}
     * {% embed_file shared/main.ts %}
     */
    SchedulerComponent.prototype.slotByPosition = function (x, y) {
        return this.viewContext.executeMethod('slotByPosition', { x: x, y: y });
    };
    /**
     * Returns the event associated with the specified DOM element, if any.
     *
     * @param element - The DOM element document position.
     * @return the event instance, if found.
     */
    SchedulerComponent.prototype.eventFromElement = function (element) {
        return this.viewContext.executeMethod('eventFromElement', { element: element });
    };
    Object.defineProperty(SchedulerComponent.prototype, "activeEvent", {
        /**
         * Gets the currently active event, if any.
         * The active event is the event that can currently receive focus.
         */
        get: function () {
            var activeElement = this.focusService.activeElement;
            if (activeElement) {
                return this.eventFromElement(activeElement.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the next event or an event at a specified relative position.
     * The `options` parameter can be used to set a positive or negative offset
     * that is relative to the currently focused event.
     * A `nowrap` flag toggles the wrapping to the first or to the last item.
     *
     * @example
     * ```ts-no-run
     * scheduler.focusNext(); // Focuses the next event.
     * scheduler.focusNext({ offset: 1 }); // Focuses the next event.
     * scheduler.focusNext({ offset: -1 }); // Focuses the previous event.
     * scheduler.focusNext({ nowrap: true }); // If the focus is on the last event, does not move the focus to the first event.
     * ```
     *
     * @param position The relative position of the event to focus.
     * @returns `true` if the focused event changed. Otherwise, returns `false`.
     */
    SchedulerComponent.prototype.focusNext = function (position) {
        return this.focusService.focusNext(position);
    };
    /**
     * Focuses the previous event or an event at a specified relative position.
     * The `options` parameter can be used to set a positive or negative offset
     * that is relative to the currently focused event.
     * A `nowrap` flag toggles the wrapping to the first or to the last item.
     *
     * @example
     * ```ts-no-run
     * scheduler.focusPrev(); // Focuses the previous event
     * scheduler.focusPrev({ nowrap: true }); // Does not move the focus to the last event, if focus is on the first one.
     * ```
     *
     * @param position The relative position of the event to focus.
     * @returns `true` if the focused event changed. Otherwise, returns `false`.
     */
    SchedulerComponent.prototype.focusPrev = function (position) {
        var prevPosition = __assign({ offset: -1 }, position);
        return this.focusService.focusNext(prevPosition);
    };
    /**
     * Focuses the last focused event or the Scheduler element, if no events are available.
     */
    SchedulerComponent.prototype.focus = function () {
        return this.focusService.focus();
    };
    SchedulerComponent.prototype.isInRange = function (date) {
        return (!this.min || this.min <= date) && (!this.max || date <= this.max);
    };
    SchedulerComponent.prototype.notifyOptionsChange = function (changes) {
        var workweek = this.workWeek;
        this.viewContext.notifyOptionsChange({
            group: this.group,
            resources: this.resources,
            allDayEventTemplate: this.allDayEventTemplate ? this.allDayEventTemplate.first : null,
            eventTemplate: this.eventTemplate ? this.eventTemplate.first : null,
            timeSlotTemplate: this.timeSlotTemplate ? this.timeSlotTemplate.first : null,
            minorTimeHeaderTemplate: this.minorTimeHeaderTemplate ? this.minorTimeHeaderTemplate.first : null,
            majorTimeHeaderTemplate: this.majorTimeHeaderTemplate ? this.majorTimeHeaderTemplate.first : null,
            monthDaySlotTemplate: this.monthDaySlotTemplate ? this.monthDaySlotTemplate.first : null,
            dateHeaderTemplate: this.dateHeaderTemplate ? this.dateHeaderTemplate.first : null,
            allDaySlotTemplate: this.allDaySlotTemplate ? this.allDaySlotTemplate.first : null,
            groupHeaderTemplate: this.groupHeaderTemplate ? this.groupHeaderTemplate.first : null,
            agendaDateTemplate: this.agendaDateTemplate ? this.agendaDateTemplate.first : null,
            agendaTimeTemplate: this.agendaTimeTemplate ? this.agendaTimeTemplate.first : null,
            min: this.min,
            max: this.max,
            showWorkHours: this.showWorkHours,
            startTime: this.startTime,
            scrollTime: this.scrollTime,
            endTime: this.endTime,
            workDayStart: this.workDayStart,
            workDayEnd: this.workDayEnd,
            workWeekStart: workweek.start,
            workWeekEnd: workweek.end,
            slotDuration: this.slotDuration,
            slotDivisions: this.slotDivisions,
            eventHeight: this.eventHeight,
            editable: this.editable,
            timezone: this.timezone,
            currentTimeMarker: this.currentTimeMarker,
            slotClass: this.slotClass,
            slotFill: this.slotFill,
            columnWidth: this.columnWidth,
            eventClass: this.eventClass,
            eventStyles: this.eventStyles,
            changes: changes
        });
    };
    Object.defineProperty(SchedulerComponent.prototype, "workWeek", {
        get: function () {
            var _a = this.intlService.weekendRange(), start = _a.start, end = _a.end;
            var workWeekStart = isPresent(this.workWeekStart) ? this.workWeekStart : (end + 1) % DAYS_IN_WEEK;
            var weekEnd = start > 0 ? start - 1 : Day.Saturday;
            var workWeekEnd = isPresent(this.workWeekEnd) ? this.workWeekEnd : weekEnd;
            return { start: workWeekStart, end: workWeekEnd };
        },
        enumerable: true,
        configurable: true
    });
    SchedulerComponent.prototype.resetViewIndex = function () {
        var index = this.selectedViewIndex;
        var newIndex = Math.max(0, Math.min(index, this.views.length - 1));
        this.setViewIndex(newIndex);
        this.onViewIndexChange();
    };
    SchedulerComponent.prototype.onViewIndexChange = function () {
        if (!this.views) {
            return;
        }
        var views = this.views.toArray();
        var selectedView = views[this.viewIndex];
        if (selectedView) {
            this.selectedView = selectedView;
        }
    };
    SchedulerComponent.prototype.setViewIndex = function (newIndex) {
        var changed = this.selectedViewIndex !== newIndex;
        if (changed) {
            this.selectedViewIndex = newIndex;
            this.selectedViewIndexChange.emit(newIndex);
        }
        return changed;
    };
    SchedulerComponent.prototype.processEvents = function (dataItems) {
        var _this = this;
        var timezone = this.timezone;
        var fields = this.modelFields;
        var items = dataItems
            .map(function (dataItem) { return readEvent(dataItem, fields, _this.resources); })
            .filter(function (event) { return !isRecurrenceMaster(event); })
            .map(function (event) {
            var start = ZonedDate.fromLocalDate(event.start, timezone);
            var end = ZonedDate.fromLocalDate(event.end, timezone);
            return { start: start, end: end, event: event };
        });
        this.viewItems = items;
        this.viewContext.notifyItems(items);
    };
    SchedulerComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.subs.add(this.editService.changes.subscribe(this.emitCRUDEvent.bind(this)));
    };
    SchedulerComponent.prototype.emitCRUDEvent = function (args) {
        Object.assign(args, { sender: this });
        switch (args.action) {
            case 'cancel':
                this.cancel.emit(args);
                break;
            case 'save':
                this.save.emit(args);
                break;
            default: break;
        }
    };
    SchedulerComponent.prototype.intlChange = function () {
        var currentView = this.selectedView;
        this.selectedView = null;
        if (!isPresent(this.workWeekStart) || !isPresent(this.workWeekEnd)) {
            this.notifyOptionsChange();
        }
        this.changeDetector.detectChanges();
        this.selectedView = currentView;
        if (NgZone.isInAngularZone()) {
            this.changeDetector.markForCheck();
        }
        else {
            this.changeDetector.detectChanges();
        }
    };
    SchedulerComponent.prototype.attachElementEventHandlers = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        this.zone.runOutsideAngular(function () {
            var windowBlurSubscription = _this.renderer.listen('window', 'blur', function (args) {
                _this.domEvents.windowBlur.emit(args);
            });
            var clickSubscription = _this.renderer.listen(wrapper, 'click', function (args) {
                _this.domEvents.click.emit(args);
            });
            var keydownSubscription = _this.renderer.listen(wrapper, 'keydown', function (args) {
                _this.domEvents.keydown.emit(args);
            });
            var focused = false;
            var focusInSubscription = _this.renderer.listen(wrapper, 'focusin', function (args) {
                _this.domEvents.focus.emit(args);
                if (!focused) {
                    _this.domEvents.focusIn.emit(args);
                    _this.renderer.addClass(_this.wrapper.nativeElement, 'k-state-focused');
                    focused = true;
                }
            });
            var focusOutSubscription = _this.renderer.listen(wrapper, 'focusout', function (args) {
                var next = args.relatedTarget || document.activeElement;
                var outside = !closest(next, function (node) { return node === wrapper; });
                if (outside) {
                    _this.domEvents.focusOut.emit(args);
                    _this.renderer.removeClass(_this.wrapper.nativeElement, 'k-state-focused');
                    focused = false;
                }
            });
            _this.detachElementEventHandlers = function () {
                windowBlurSubscription();
                clickSubscription();
                keydownSubscription();
                focusInSubscription();
                focusOutSubscription();
            };
        });
    };
    SchedulerComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler',
                    providers: [
                        EditService,
                        DialogsService,
                        DomEventsService,
                        LocalDataChangesService,
                        FocusService,
                        SchedulerLocalizationService,
                        {
                            provide: LocalizationService,
                            useExisting: SchedulerLocalizationService
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.scheduler'
                        },
                        ToolbarService,
                        ViewContextService,
                        ViewStateService,
                        PDFService
                    ],
                    // TODO: Move to themes
                    styles: ['.k-scheduler.k-state-focused { box-shadow: 0 0.5px 0.5px 0.5px rgba(0, 0, 0, .12); }'],
                    encapsulation: ViewEncapsulation.None,
                    template: "\n        <ng-container kendoSchedulerLocalizedMessages\n            i18n-allEvents=\"kendo.scheduler.allEvents|The All events text displayed in the timeline views when there is no vertical grouping.\"\n            allEvents=\"All events\"\n\n            i18n-allDay=\"kendo.scheduler.allDay|The all day text displayed in the day and week views.\"\n            allDay=\"all day\"\n\n            i18n-dateHeader=\"kendo.scheduler.dateHeader|The date header text displayed in the agenda view.\"\n            dateHeader=\"Date\"\n\n            i18n-timeHeader=\"kendo.scheduler.timeHeader|The time header text displayed in the agenda view.\"\n            timeHeader=\"Time\"\n\n            i18n-deleteTitle=\"kendo.scheduler.deleteTitle|The delete icon title.\"\n            deleteTitle=\"Delete\"\n\n            i18n-eventHeader=\"kendo.scheduler.eventHeader|The event header text displayed in the agenda view.\"\n            eventHeader=\"Event\"\n\n            i18n-nextTitle=\"kendo.scheduler.nextTitle|The title of the navigation next button.\"\n            nextTitle=\"Next\"\n\n            i18n-previousTitle=\"kendo.scheduler.previousTitle|The title of the navigation previous button.\"\n            previousTitle=\"Previous\"\n\n            i18n-showFullDay=\"kendo.scheduler.showFullDay|The text of the show full day button displayed in the footer of the day, week and timeline views.\"\n            showFullDay=\"Show full day\"\n\n            i18n-showWorkDay=\"kendo.scheduler.showWorkDay|The text of the show work day button displayed in the footer of the day, week and timeline views.\"\n            showWorkDay=\"Show business hours\"\n\n            i18n-today=\"kendo.scheduler.today|The today button text displayed in the navigation.\"\n            today=\"Today\"\n\n            i18n-calendarToday=\"kendo.scheduler.calendarToday|The text of today's date in the header of the Calendar.\"\n            calendarToday=\"TODAY\"\n\n            i18n-dayViewTitle=\"kendo.scheduler.dayViewTitle|The day view title.\"\n            dayViewTitle=\"Day\"\n\n            i18n-multiDayViewTitle=\"kendo.scheduler.multiDayViewTitle|The multi day view title.\"\n            multiDayViewTitle=\"Multi-Day\"\n\n            i18n-weekViewTitle=\"kendo.scheduler.weekViewTitle|The week view title.\"\n            weekViewTitle=\"Week\"\n\n            i18n-workWeekViewTitle=\"kendo.scheduler.workWeekViewTitle|The work week view title.\"\n            workWeekViewTitle=\"Work Week\"\n\n            i18n-monthViewTitle=\"kendo.scheduler.monthViewTitle|The month view title.\"\n            monthViewTitle=\"Month\"\n\n            i18n-timelineViewTitle=\"kendo.scheduler.timelineViewTitle|The timeline view title.\"\n            timelineViewTitle=\"Timeline\"\n\n            i18n-timelineWeekViewTitle=\"kendo.scheduler.timelineWeekViewTitle|The timeline week view title.\"\n            timelineWeekViewTitle=\"Timeline Week\"\n\n            i18n-timelineMonthViewTitle=\"kendo.scheduler.timelineMonthViewTitle|The timeline month view title.\"\n            timelineMonthViewTitle=\"Timeline Month\"\n\n            i18n-agendaViewTitle=\"kendo.scheduler.agendaViewTitle|The agenda view title.\"\n            agendaViewTitle=\"Agenda\"\n\n            i18n-cancel=\"kendo.scheduler.cancel|The text similar to 'Cancel' displayed in scheduler.\"\n            cancel=\"Cancel\"\n\n            i18-save=\"kendo.scheduler.save|The text similar to 'Save' displayed in scheduler.\"\n            save=\"Save\"\n\n            i18-editorEventTitle=\"kendo.scheduler.editorEventTitle|The text similar to 'Title' displayed in the scheduler event editor.\"\n            editorEventTitle='Title'\n\n            i18-editorEventStart=\"kendo.scheduler.editorEventStart|The text similar to 'Start' displayed in the scheduler event editor.\"\n            editorEventStart=\"Start\"\n\n            i18-editorEventStartTimeZone=\"kendo.scheduler.editorEventStartTimeZone|The text similar to 'Start Time Zone' displayed in the scheduler event editor.\"\n            editorEventStartTimeZone=\"Start Time Zone\"\n\n            i18-editorEventEnd=\"kendo.scheduler.editorEventEnd|The text similar to 'End' displayed in the scheduler event editor.\"\n            editorEventEnd=\"End\"\n\n            i18-editorEventEndTimeZone=\"kendo.scheduler.editorEventEndTimeZone|The text similar to 'End Time Zone' displayed in the scheduler event editor.\"\n            editorEventEndTimeZone=\"End Time Zone\"\n\n            i18n-editorEventAllDay=\"kendo.scheduler.editorEventAllDay|The text similar to 'All Day event' displayed in the scheduler event editor.\"\n            editorEventAllDay=\"All Day Event\"\n\n            i18n-editorEventDescription=\"kendo.scheduler.editorEventDescription|The text similar to 'Description' displayed in the scheduler event editor.\"\n            editorEventDescription=\"Description\"\n\n            i18n-editorEventSeparateTimeZones=\"kendo.scheduler.editorEventSeparateTimeZones|The text similar to 'Use separate Start and End Time Zones' displayed in the scheduler event editor.\"\n            editorEventSeparateTimeZones=\"End in different Time Zone\"\n\n            i18n-editorEventTimeZone=\"kendo.scheduler.editorEventTimeZone|The text similar to 'Time Zone' displayed in the scheduler event editor.\"\n            editorEventTimeZone='Specify Time Zone'\n\n            i18n-editorTitle=\"kendo.scheduler.editorTitle|The text similar to 'Event' displayed as title of the scheduler event editor.\"\n            editorTitle='Event'\n\n            i18n-recurrenceEditorRepeat=\"kendo.scheduler.recurrenceEditorRepeat|The text similar to 'Repeat' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorRepeat='Repeat'\n\n            i18n-recurrenceEditorDailyInterval=\"kendo.scheduler.recurrenceEditorDailyInterval|The text similar to 'day(s)' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorDailyInterval='day(s)'\n\n            i18n-recurrenceEditorDailyRepeatEvery=\"kendo.scheduler.recurrenceEditorDailyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorDailyRepeatEvery='Repeat every'\n\n            i18n-recurrenceEditorWeeklyInterval=\"kendo.scheduler.recurrenceEditorWeeklyInterval|The text similar to 'week(s)' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorWeeklyInterval='week(s)'\n\n            i18n-recurrenceEditorWeeklyRepeatEvery=\"kendo.scheduler.recurrenceEditorWeeklyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorWeeklyRepeatEvery='Repeat every'\n\n            i18n-recurrenceEditorWeeklyRepeatOn=\"kendo.scheduler.recurrenceEditorWeeklyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorWeeklyRepeatOn='Repeat on'\n\n            i18n-recurrenceEditorMonthlyDay=\"kendo.scheduler.recurrenceEditorMonthlyDay|The text similar to 'Day' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorMonthlyDay='Day'\n\n            i18n-recurrenceEditorMonthlyInterval=\"kendo.scheduler.recurrenceEditorMonthlyInterval|The text similar to 'month(s)' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorMonthlyInterval='month(s)'\n\n            i18n-recurrenceEditorMonthlyRepeatEvery=\"kendo.scheduler.recurrenceEditorMonthlyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorMonthlyRepeatEvery='Repeat every'\n\n            i18n-recurrenceEditorMonthlyRepeatOn=\"kendo.scheduler.recurrenceEditorMonthlyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorMonthlyRepeatOn='Repeat on'\n\n            i18n-recurrenceEditorYearlyOf=\"kendo.scheduler.recurrenceEditorYearlyOf|The text similar to 'of' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorYearlyOf='of'\n\n            i18n-recurrenceEditorYearlyRepeatEvery=\"kendo.scheduler.recurrenceEditorYearlyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorYearlyRepeatEvery='Repeat every'\n\n            i18n-recurrenceEditorYearlyRepeatOn=\"kendo.scheduler.recurrenceEditorYearlyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorYearlyRepeatOn='Repeat on'\n\n            i18n-recurrenceEditorYearlyInterval=\"kendo.scheduler.recurrenceEditorYearlyInterval|The text similar to 'year(s)' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorYearlyInterval='year(s)'\n\n            i18n-recurrenceEditorFrequenciesDaily=\"kendo.scheduler.recurrenceEditorFrequenciesDaily|The text similar to 'Daily' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorFrequenciesDaily='Daily'\n\n            i18n-recurrenceEditorFrequenciesMonthly=\"kendo.scheduler.recurrenceEditorFrequenciesMonthly|The text similar to 'Monthly' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorFrequenciesMonthly='Monthly'\n\n            i18n-recurrenceEditorFrequenciesNever=\"kendo.scheduler.recurrenceEditorFrequenciesNever|The text similar to 'Never' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorFrequenciesNever='Never'\n\n            i18n-recurrenceEditorFrequenciesWeekly=\"kendo.scheduler.recurrenceEditorFrequenciesWeekly|The text similar to 'Weekly' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorFrequenciesWeekly='Weekly'\n\n            i18n-recurrenceEditorFrequenciesYearly=\"kendo.scheduler.recurrenceEditorFrequenciesYearly|The text similar to 'Yearly' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorFrequenciesYearly='Yearly'\n\n            i18n-recurrenceEditorOffsetPositionsFirst=\"kendo.scheduler.recurrenceEditorOffsetPositionsFirst|The text similar to 'First' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorOffsetPositionsFirst='First'\n\n            i18n-recurrenceEditorOffsetPositionsSecond=\"kendo.scheduler.recurrenceEditorOffsetPositionsSecond|The text similar to 'Second' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorOffsetPositionsSecond='Second'\n\n            i18n-recurrenceEditorOffsetPositionsThird=\"kendo.scheduler.recurrenceEditorOffsetPositionsThird|The text similar to 'Third' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorOffsetPositionsThird='Third'\n\n            i18n-recurrenceEditorOffsetPositionsFourth=\"kendo.scheduler.recurrenceEditorOffsetPositionsFourth|The text similar to 'Fourth' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorOffsetPositionsFourth='Fourth'\n\n            i18n-recurrenceEditorOffsetPositionsLast=\"kendo.scheduler.recurrenceEditorOffsetPositionsLast|The text similar to 'Last' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorOffsetPositionsLast='Last'\n\n            i18n-recurrenceEditorWeekdaysDay=\"kendo.scheduler.recurrenceEditorWeekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            recurrenceEditorWeekdaysDay='Day'\n\n            i18n-recurrenceEditorWeekdaysWeekday=\"kendo.scheduler.recurrenceEditorWeekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern.\"\n            recurrenceEditorWeekdaysWeekday='Weekday'\n\n            i18n-recurrenceEditorWeekdaysWeekendday=\"kendo.scheduler.recurrenceEditorWeekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            recurrenceEditorWeekdaysWeekendday='Weekend Day'\n\n            i18n-recurrenceEditorEndAfter=\"kendo.scheduler.recurrenceEditorEndAfter|The text similar to 'After' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorEndAfter='After'\n\n            i18n-recurrenceEditorEndOccurrence=\"kendo.scheduler.recurrenceEditorEndOccurrence|The text similar to 'occurrence(s)' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorEndOccurrence='occurrence(s)'\n\n            i18n-recurrenceEditorEndLabel=\"kendo.scheduler.recurrenceEditorEndLabel|The text similar to 'End' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorEndLabel='End'\n\n            i18n-recurrenceEditorEndNever=\"kendo.scheduler.recurrenceEditorEndNever|The text similar to 'Never' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorEndNever='Never'\n\n            i18n-recurrenceEditorEndOn=\"kendo.scheduler.recurrenceEditorEndOn|The text similar to 'On' displayed in the scheduler recurrence editor.\"\n            recurrenceEditorEndOn='On'\n\n            i18n-destroy=\"kendo.scheduler.destroy|The text of the 'Delete' button displayed in the scheduler remove confirmation dialog.\"\n            destroy='Delete'\n\n            i18n-deleteConfirmation=\"kendo.scheduler.deleteConfirmation|The text similar to 'Are you sure you want to delete this event?' displayed in scheduler remove confirmation dialog.\"\n            deleteConfirmation='Are you sure you want to delete this event?'\n\n            i18n-editRecurringConfirmation=\"kendo.scheduler.editRecurringConfirmation|The text similar to 'Do you want to edit only this event occurrence or the whole series?' displayed in the scheduler recurring confirmation dialog.\"\n            editRecurringConfirmation='Do you want to edit only this event occurrence or the whole series?'\n\n            i18n-editOccurrence=\"kendo.scheduler.editOccurrence|The text of the 'Edit current occurrence' button displayed in the scheduler recurring confirmation dialog.\"\n            editOccurrence='Edit current occurrence'\n\n            i18n-editSeries=\"kendo.scheduler.editSeries|The text of the 'Edit the series' button displayed in the scheduler recurring confirmation dialog.\"\n            editSeries='Edit the series'\n\n            i18n-deleteRecurringConfirmation=\"kendo.scheduler.deleteRecurringConfirmation|The text similar to 'Do you want to delete only this event occurrence or the whole series?' displayed in the scheduler recurring confirmation dialog.\"\n            deleteRecurringConfirmation='Do you want to delete only this event occurrence or the whole series?'\n\n            i18n-deleteOccurrence=\"kendo.scheduler.deleteOccurrence|The text of the 'Delete current occurrence' button displayed in the scheduler recurring confirmation dialog.\"\n            deleteOccurrence='Delete current occurrence'\n\n            i18n-deleteSeries=\"kendo.scheduler.deleteSeries|The text similar of the 'Delete the series' button displayed in the scheduler recurring confirmation dialog.\"\n            deleteSeries='Delete the series'\n\n            i18n-deleteDialogTitle=\"kendo.scheduler.deleteDialogTitle|The title of the remove confirmation dialog, similar to 'Delete Event'.\"\n            deleteDialogTitle='Delete Event'\n\n            i18n-deleteRecurringDialogTitle=\"kendo.scheduler.deleteRecurringDialogTitle|The title of the recurring remove confirmation dialog, similar to 'Delete Recurring Item'\"\n            deleteRecurringDialogTitle='Delete Recurring Item'\n\n            i18n-editRecurringDialogTitle=\"kendo.scheduler.editRecurringDialogTitle|The title of the recurring edit confirmation dialog, similar to 'Edit Recurring Item'\"\n            editRecurringDialogTitle='Edit Recurring Item'\n        >\n        </ng-container>\n\n        <kendo-scheduler-toolbar\n            [dateRange]=\"dateRangeStream\"\n            [selectedDate]=\"selectedDateStream\"\n            [views]=\"views\"\n            [selectedView]=\"selectedView\"\n            [template]=\"toolbarTemplate\"\n            (navigate)=\"onNavigationAction($event)\"\n            [min]=\"min\"\n            [max]=\"max\"\n        ></kendo-scheduler-toolbar>\n\n        <ng-container *ngTemplateOutlet=\"selectedView?.template\">\n        </ng-container>\n\n        <ng-container #confirmationDialogContainer>\n        </ng-container>\n\n        <kendo-scheduler-edit-dialog\n            [resources]=\"resources\"\n            [editTemplate]=\"editDialogTemplate\"\n            [timezone]=\"timezone\"\n            [fields]=\"modelFields\"\n        ></kendo-scheduler-edit-dialog>\n\n        <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n\n        <div [loading]=\"loading\" kendoSchedulerLoading>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    SchedulerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContextService },
        { type: ViewStateService },
        { type: EditService },
        { type: DialogsService },
        { type: IntlService },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: PDFService },
        { type: LocalizationService },
        { type: DomEventsService },
        { type: Renderer2 },
        { type: FocusService }
    ]; };
    SchedulerComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-scheduler',] }, { type: HostBinding, args: ['class.k-floatwrap',] }],
        rtl: [{ type: HostBinding, args: ['class.k-rtl',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        selectedViewIndex: [{ type: Input }],
        editable: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        eventHeight: [{ type: Input }],
        columnWidth: [{ type: Input }],
        showWorkHours: [{ type: Input }],
        startTime: [{ type: Input }],
        endTime: [{ type: Input }],
        workDayStart: [{ type: Input }],
        workDayEnd: [{ type: Input }],
        workWeekStart: [{ type: Input }],
        workWeekEnd: [{ type: Input }],
        slotDuration: [{ type: Input }],
        slotDivisions: [{ type: Input }],
        slotFill: [{ type: Input }],
        scrollTime: [{ type: Input }],
        group: [{ type: Input }],
        resources: [{ type: Input }],
        loading: [{ type: Input }],
        timezone: [{ type: Input }],
        events: [{ type: Input }],
        selectedDate: [{ type: Input }],
        modelFields: [{ type: Input }],
        currentTimeMarker: [{ type: Input }],
        slotClass: [{ type: Input }],
        eventClass: [{ type: Input }],
        eventStyles: [{ type: Input }],
        selectedViewIndexChange: [{ type: Output }],
        navigate: [{ type: Output }],
        dateChange: [{ type: Output }],
        slotClick: [{ type: Output }],
        slotDblClick: [{ type: Output }],
        create: [{ type: Output }],
        eventClick: [{ type: Output }],
        eventDblClick: [{ type: Output }],
        eventKeydown: [{ type: Output }],
        cancel: [{ type: Output }],
        save: [{ type: Output }],
        remove: [{ type: Output }],
        resizeStart: [{ type: Output }],
        resize: [{ type: Output }],
        resizeEnd: [{ type: Output }],
        dragStart: [{ type: Output }],
        drag: [{ type: Output }],
        dragEnd: [{ type: Output }],
        pdfExport: [{ type: Output }],
        editDialogTemplate: [{ type: ContentChild, args: [EditDialogTemplateDirective,] }],
        toolbarTemplate: [{ type: ContentChild, args: [ToolbarTemplateDirective,] }],
        views: [{ type: ContentChildren, args: [SchedulerView,] }],
        resizeSensor: [{ type: ViewChild, args: [ResizeSensorComponent,] }],
        confirmationDialogContainerRef: [{ type: ViewChild, args: ["confirmationDialogContainer", { read: ViewContainerRef },] }],
        loadingComponent: [{ type: ViewChild, args: [LoadingComponent,] }],
        allDayEventTemplate: [{ type: ContentChildren, args: [AllDayEventTemplateDirective,] }],
        eventTemplate: [{ type: ContentChildren, args: [EventTemplateDirective,] }],
        timeSlotTemplate: [{ type: ContentChildren, args: [TimeSlotTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: ContentChildren, args: [MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: ContentChildren, args: [MajorTimeHeaderTemplateDirective,] }],
        monthDaySlotTemplate: [{ type: ContentChildren, args: [MonthDaySlotTemplateDirective,] }],
        dateHeaderTemplate: [{ type: ContentChildren, args: [DateHeaderTemplateDirective,] }],
        allDaySlotTemplate: [{ type: ContentChildren, args: [AllDaySlotTemplateDirective,] }],
        groupHeaderTemplate: [{ type: ContentChildren, args: [GroupHeaderTemplateDirective,] }],
        agendaDateTemplate: [{ type: ContentChildren, args: [AgendaDateTemplateDirective,] }],
        agendaTimeTemplate: [{ type: ContentChildren, args: [AgendaTimeTemplateDirective,] }]
    };
    return SchedulerComponent;
}());

/** @hidden */
var intersects = function (startTime, endTime, periodStart, periodEnd) {
    return (startTime < periodStart && endTime > periodEnd) ||
        (periodStart <= startTime && startTime < periodEnd) ||
        (periodStart < endTime && endTime <= periodEnd && startTime < endTime);
};
/** @hidden */
var dateInRange = function (date, start, end) { return start.getTime() <= date.getTime() && date.getTime() <= end.getTime(); };
/** @hidden */
var roundAllDayEnd = function (_a) {
    var start = _a.start, end = _a.end;
    var startDate = start.stripTime();
    var endDate = end.stripTime();
    return endDate.getTime() !== end.getTime() || startDate.getTime() === endDate.getTime() ? endDate.addDays(1) : endDate;
};
/** @hidden */
function toInvariantTime(date) {
    var staticDate = new Date(1980, 0, 1, 0, 0, 0);
    if (date) {
        staticDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    return staticDate;
}
/**
 * @hidden
 * TODO Move to date-math
 */
var addUTCDays = function (date, offset) {
    var newDate = new Date(date.getTime());
    newDate.setUTCDate(newDate.getUTCDate() + offset);
    return newDate;
};
/**
 * @hidden
 */

// TODO: name? move to date-math
/** @hidden */
function toUTCTime(localDate, localTime) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localTime.getHours(), localTime.getMinutes(), localTime.getSeconds(), localTime.getMilliseconds()));
}
//  TODO: move to date-math
/** @hidden */
function toUTCDate(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
}
// TODO: move to date-math
/** @hidden */
function getUTCDate(utcDate) {
    return new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate()));
}
// TODO: move to date-math
/** @hidden */
function toUTCDateTime(localDate) {
    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
}
/** @hidden */
function dateWithTime(target, time) {
    return new Date(target.getFullYear(), target.getMonth(), target.getDate(), time.getHours(), time.getMinutes());
}
function getDataIdx(value, resource) {
    var data = resource.data;
    for (var dataIdx = 0; dataIdx < data.length; dataIdx++) {
        if (getField(data[dataIdx], resource.valueField) === value) {
            return dataIdx;
        }
    }
    return -1;
}
function resourceItem(value, resource) {
    var index = getDataIdx(value, resource);
    return index >= 0 ? resource.data[index] : {};
}
function resourceItems(values, resource) {
    return values.map(function (value) { return resourceItem(value, resource); });
}
function cloneResources(arr) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        var clone$$1 = Object.assign({}, arr[idx]);
        clone$$1.resources = clone$$1.resources.slice(0);
        result.push(clone$$1);
    }
    return result;
}
/** @hidden */
function resourceItemByValue(event, resource) {
    var value = getField(event, resource.field);
    if (Array.isArray(value)) {
        return resourceItems(value, resource);
    }
    return resourceItem(value, resource);
}
function addNotGroupedResources(event, resources, allResources) {
    for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
        var current = resources[resourceIdx];
        for (var idx = 0; idx < allResources.length; idx++) {
            var item = allResources[idx];
            if (!current.resources[idx] && item.data) {
                current.resources[idx] = resourceItemByValue(event, item);
            }
        }
    }
}
/** @hidden */
function eventResources(event, _a) {
    var taskResources = _a.taskResources, hasGroups = _a.hasGroups, spans = _a.spans, _b = _a.allResources, allResources = _b === void 0 ? [] : _b;
    var resources = [];
    for (var resourceIdx = 0; resourceIdx < taskResources.length; resourceIdx++) {
        var resource = taskResources[resourceIdx];
        if (!resource.data) {
            resources = [{ leafIdx: 0, resources: [] }];
            continue;
        }
        var resourceIndex = allResources.indexOf(resource);
        var values = getField(event, resource.field);
        if (!Array.isArray(values)) {
            values = [values];
        }
        var expandedResources = [];
        for (var valueIdx = 0; valueIdx < values.length; valueIdx++) {
            var dataIdx = getDataIdx(values[valueIdx], resource);
            if (dataIdx < 0) {
                return [{ leafIdx: hasGroups ? -1 : 0, resources: [] }];
            }
            var item = resource.data[dataIdx];
            // has groups - need all copies of the multiple resource
            // no groups - just the first
            if (resourceIdx === 0 && (hasGroups || valueIdx === 0)) {
                var resourceItems_1 = [];
                resourceItems_1[resourceIndex] = resource.multiple && !hasGroups ? [item] : item;
                resources.push({
                    leafIdx: hasGroups ? dataIdx * spans[resourceIdx] : 0,
                    color: getField(item, resource.colorField),
                    resources: resourceItems_1
                });
            }
            else if (hasGroups) { // don't create multiple resource groups if no groups for multiple resources
                var currentResources = resources;
                if (values.length > 1) {
                    currentResources = cloneResources(resources);
                    expandedResources.push.apply(expandedResources, currentResources);
                }
                for (var currentIdx = 0; currentIdx < currentResources.length; currentIdx++) {
                    currentResources[currentIdx].leafIdx += dataIdx * spans[resourceIdx];
                    currentResources[currentIdx].resources[resourceIndex] = item;
                }
            }
            else if (valueIdx > 0) {
                for (var idx = 0; idx < resources.length; idx++) {
                    resources[idx].resources[resourceIndex].push(item);
                }
            }
        }
        if (expandedResources.length) {
            resources = expandedResources;
        }
    }
    addNotGroupedResources(event, resources, allResources);
    return resources;
}
/** @hidden */
function assignTasksResources(tasks, options) {
    for (var idx = 0; idx < tasks.length; idx++) {
        var task = tasks[idx];
        task.resources = eventResources(task.event, options);
    }
}
/** @hidden */
function findRowIndex(events, data) {
    if (data.rowIndex !== undefined) {
        return data.rowIndex;
    }
    for (var idx = 0; idx < events.length; idx++) {
        if (!events[idx]) {
            return idx;
        }
    }
    return events.length;
}
/** @hidden */
function isRecurrence(task) {
    return Boolean(task.event && task.event.recurrenceRule);
}
/** @hidden */
function isRecurrenceException(task) {
    return task.event && isPresent(task.event.recurrenceId) && !task.event.recurrenceRule;
}
/** @hidden */
var rectContains = function (rect, left, top) {
    return rect.left <= left && left <= rect.left + rect.width && rect.top <= top && top <= rect.top + rect.height;
};
/** @hidden */
var rectContainsX = function (rect, left) {
    return rect.left <= left && left <= rect.left + rect.width;
};
/** @hidden */
var toPx = function (value) { return value + "px"; };
/** @hidden */
var elementOffset = function (element) {
    if (!element) {
        return null;
    }
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    return {
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        width: box.width,
        height: box.height
    };
};
/** @hidden */
var pointDistance = function (x1, y1, x2, y2) { return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)); };
/** @hidden */
var ignoreContentChild = function (child) { return child.nodeName === 'KENDO-RESIZE-SENSOR' || hasClasses(child, 'k-loading-mask'); };
/** @hidden */
var setCoordinates = function (element, coordinates) {
    for (var field in coordinates) {
        if (coordinates.hasOwnProperty(field)) {
            element.style[field] = toPx(coordinates[field]);
        }
    }
};
/** @hidden */
var convertNgClassBindings = function (bindingValues) {
    var result = [];
    if (isString(bindingValues)) {
        result.push(bindingValues);
    }
    else if (isArray(bindingValues)) {
        result.push.apply(result, bindingValues);
    }
    else if (isObject(bindingValues)) {
        for (var field in bindingValues) {
            if (bindingValues.hasOwnProperty(field) && bindingValues[field]) {
                result.push(field);
            }
        }
    }
    return result;
};
/**
 * @hidden
 */
function formatEventTime(start, end, isAllDay) {
    var startTimeFormat = { skeleton: 'yMMMMEEEEdhm' };
    var startDateFormat = { skeleton: 'yMMMMEEEEd' };
    var endFormat = 't';
    return isAllDay ?
        "" + formatDate(start, startDateFormat) :
        formatDate(start, startTimeFormat) + "\u2013" + formatDate(end, endFormat);
}
/**
 * @hidden
 */
function formValueOrDefault(group, field, defaultValue) {
    var control = group.get(field);
    if (!control) {
        return defaultValue;
    }
    return control.value || defaultValue;
}
/**
 * @hidden
 */
var isWorkWeekDay = function (day, start, end) {
    if (end < start) {
        return day <= end || start <= day;
    }
    return start <= day && day <= end;
};

// TODO
// Extract as public method
var occurrences = function (item, fields, range, timezone, weekStart) {
    var rrule = parseRule({
        recurrenceRule: getField(item, fields.recurrenceRule),
        weekStart: weekStart
    });
    if (!rrule.start) {
        var start = getField(item, fields.start);
        rrule.start = ZonedDate.fromLocalDate(start, timezone);
    }
    if (!rrule.end) {
        var end = getField(item, fields.end);
        rrule.end = ZonedDate.fromLocalDate(end, timezone);
    }
    var exceptions = getField(item, fields.recurrenceExceptions);
    if (exceptions) {
        rrule.exceptionDates = exceptions
            .map(function (exDate) {
            return ZonedDate.fromLocalDate(exDate, timezone);
        });
        // TODO: Merge exceptions from recurrence rule with event.recurrenceException
    }
    var utcRangeStart = toUTCDateTime(range.start);
    var utcRangeEnd = toUTCDateTime(range.end);
    var series = expand(rrule, {
        rangeStart: ZonedDate.fromUTCDate(utcRangeStart, timezone),
        rangeEnd: ZonedDate.fromUTCDate(utcRangeEnd, timezone)
    });
    if (!series.events.length) {
        return [];
    }
    var expanded = series.events.map(function (occ) {
        var event = clone(item);
        setField(event, fields.id, OCCURRENCE_ID);
        setField(event, fields.recurrenceId, getField(item, fields.id));
        setField(event, fields.start, occ.start.toLocalDate());
        setField(event, fields.end, occ.end.toLocalDate());
        return event;
    });
    return [item].concat(expanded);
};
/**
 * A directive that processes Scheduler events in-memory.
 *
 * Processing includes the expanding of recurring events and the filtering of data for
 * the currently active period.
 *
 * {% meta height:650 %}
 * {% embed_file basic-usage/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var DataBindingDirective = /** @class */ (function () {
    function DataBindingDirective(scheduler, changeDetector, intl, localDataChangesService) {
        this.scheduler = scheduler;
        this.changeDetector = changeDetector;
        this.intl = intl;
        this.localDataChangesService = localDataChangesService;
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    Object.defineProperty(DataBindingDirective.prototype, "data", {
        /**
         * The array of data which will populate the Scheduler.
         */
        set: function (value) {
            this.originalData = value || [];
            if (this.localDataChangesService) {
                this.localDataChangesService.data = value;
            }
            this.scheduler.events = this.process();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.scheduler
            .dateChange
            .subscribe(function (e) { return _this.onDateChange(e); });
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.rebind = function () {
        this.data = this.originalData;
        this.changeDetector.markForCheck();
    };
    DataBindingDirective.prototype.process = function () {
        var _this = this;
        if (!this.dateRange) {
            // No processing until a date range is set
            return [];
        }
        var data = [];
        var fields = this.scheduler.modelFields;
        this.originalData
            .forEach(function (item) {
            if (getField(item, fields.recurrenceRule)) {
                var series = occurrences(item, fields, _this.dateRange, _this.scheduler.timezone, _this.intl.firstDay());
                data.push.apply(data, series);
            }
            else {
                data.push(item);
            }
        });
        return data;
    };
    DataBindingDirective.prototype.onDateChange = function (e) {
        this.dateRange = e.dateRange;
        this.rebind();
    };
    DataBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerBinding]'
                },] },
    ];
    /** @nocollapse */
    DataBindingDirective.ctorParameters = function () { return [
        { type: SchedulerComponent },
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: LocalDataChangesService }
    ]; };
    DataBindingDirective.propDecorators = {
        data: [{ type: Input, args: ['kendoSchedulerBinding',] }]
    };
    return DataBindingDirective;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        allEvents: [{ type: Input }],
        allDay: [{ type: Input }],
        dateHeader: [{ type: Input }],
        timeHeader: [{ type: Input }],
        eventHeader: [{ type: Input }],
        deleteTitle: [{ type: Input }],
        nextTitle: [{ type: Input }],
        previousTitle: [{ type: Input }],
        today: [{ type: Input }],
        calendarToday: [{ type: Input }],
        showFullDay: [{ type: Input }],
        showWorkDay: [{ type: Input }],
        dayViewTitle: [{ type: Input }],
        multiDayViewTitle: [{ type: Input }],
        weekViewTitle: [{ type: Input }],
        workWeekViewTitle: [{ type: Input }],
        monthViewTitle: [{ type: Input }],
        timelineViewTitle: [{ type: Input }],
        timelineWeekViewTitle: [{ type: Input }],
        timelineMonthViewTitle: [{ type: Input }],
        agendaViewTitle: [{ type: Input }],
        cancel: [{ type: Input }],
        save: [{ type: Input }],
        editorEventTitle: [{ type: Input }],
        editorEventStart: [{ type: Input }],
        editorEventStartTimeZone: [{ type: Input }],
        editorEventEnd: [{ type: Input }],
        editorEventEndTimeZone: [{ type: Input }],
        editorEventAllDay: [{ type: Input }],
        editorEventDescription: [{ type: Input }],
        editorEventSeparateTimeZones: [{ type: Input }],
        editorEventTimeZone: [{ type: Input }],
        recurrenceEditorRepeat: [{ type: Input }],
        recurrenceEditorDailyInterval: [{ type: Input }],
        recurrenceEditorDailyRepeatEvery: [{ type: Input }],
        recurrenceEditorWeeklyInterval: [{ type: Input }],
        recurrenceEditorWeeklyRepeatEvery: [{ type: Input }],
        recurrenceEditorWeeklyRepeatOn: [{ type: Input }],
        recurrenceEditorMonthlyDay: [{ type: Input }],
        recurrenceEditorMonthlyInterval: [{ type: Input }],
        recurrenceEditorMonthlyRepeatEvery: [{ type: Input }],
        recurrenceEditorMonthlyRepeatOn: [{ type: Input }],
        recurrenceEditorYearlyOf: [{ type: Input }],
        recurrenceEditorYearlyRepeatEvery: [{ type: Input }],
        recurrenceEditorYearlyRepeatOn: [{ type: Input }],
        recurrenceEditorYearlyInterval: [{ type: Input }],
        recurrenceEditorFrequenciesDaily: [{ type: Input }],
        recurrenceEditorFrequenciesMonthly: [{ type: Input }],
        recurrenceEditorFrequenciesNever: [{ type: Input }],
        recurrenceEditorFrequenciesWeekly: [{ type: Input }],
        recurrenceEditorFrequenciesYearly: [{ type: Input }],
        recurrenceEditorOffsetPositionsFirst: [{ type: Input }],
        recurrenceEditorOffsetPositionsSecond: [{ type: Input }],
        recurrenceEditorOffsetPositionsThird: [{ type: Input }],
        recurrenceEditorOffsetPositionsFourth: [{ type: Input }],
        recurrenceEditorOffsetPositionsLast: [{ type: Input }],
        recurrenceEditorWeekdaysDay: [{ type: Input }],
        recurrenceEditorWeekdaysWeekday: [{ type: Input }],
        recurrenceEditorWeekdaysWeekendday: [{ type: Input }],
        recurrenceEditorEndAfter: [{ type: Input }],
        recurrenceEditorEndOccurrence: [{ type: Input }],
        recurrenceEditorEndLabel: [{ type: Input }],
        recurrenceEditorEndNever: [{ type: Input }],
        recurrenceEditorEndOn: [{ type: Input }],
        editorTitle: [{ type: Input }],
        destroy: [{ type: Input }],
        deleteConfirmation: [{ type: Input }],
        editRecurringConfirmation: [{ type: Input }],
        editOccurrence: [{ type: Input }],
        editSeries: [{ type: Input }],
        deleteRecurringConfirmation: [{ type: Input }],
        deleteOccurrence: [{ type: Input }],
        deleteSeries: [{ type: Input }],
        deleteDialogTitle: [{ type: Input }],
        deleteRecurringDialogTitle: [{ type: Input }],
        editRecurringDialogTitle: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * Custom component messages override default component messages.
 */
var SchedulerCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(SchedulerCustomMessagesComponent, _super);
    function SchedulerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(SchedulerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SchedulerCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return SchedulerCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-scheduler-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SchedulerCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return SchedulerCustomMessagesComponent;
}(Messages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoSchedulerLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * A toolbar component which contains the controls for date navigation
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the **Previous**, **Today**, **Next**, and **Date picker**
 * buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var ToolbarNavigationComponent = /** @class */ (function () {
    function ToolbarNavigationComponent(popupService, toolbarService, localization, cd) {
        this.popupService = popupService;
        this.toolbarService = toolbarService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.hostClasses = true;
        this.subs = this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            cd.markForCheck();
        });
    }
    Object.defineProperty(ToolbarNavigationComponent.prototype, "todayText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('today');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "calendarTodayText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('calendarToday');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "nextText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('nextTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "previousText", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('previousTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarNavigationComponent.prototype, "ctx", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarService.context;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarNavigationComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
        this.closePopup();
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.toggleSelectedDate = function (anchor, template) {
        if (this.popupRef) {
            this.closePopup();
        }
        else {
            var popupSettings = {
                anchor: anchor,
                content: template
            };
            if (this.localization.rtl) {
                popupSettings.popupClass = 'k-rtl';
            }
            this.popupRef = this.popupService.open(popupSettings);
        }
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.selectDate = function (value) {
        this.closePopup();
        this.toolbarService.navigate({
            type: 'select-date',
            date: value
        });
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.prevClick = function () {
        this.toolbarService.navigate({
            type: 'prev'
        });
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.nextClick = function () {
        this.toolbarService.navigate({
            type: 'next'
        });
        return false;
    };
    /**
     * @hidden
     */
    ToolbarNavigationComponent.prototype.todayClick = function () {
        this.toolbarService.navigate({
            type: 'today'
        });
        return false;
    };
    ToolbarNavigationComponent.prototype.closePopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    ToolbarNavigationComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerToolbarNavigation]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        PopupService
                    ],
                    template: "\n        <li class=\"k-state-default k-header k-nav-today\">\n            <a role=\"button\"\n                (click)=\"todayClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"todayText\">{{todayText}}</a>\n        </li>\n        <li class=\"k-state-default k-header k-nav-prev\">\n            <a role=\"button\"\n                (click)=\"prevClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"previousText\"\n                [attr.aria-label]=\"previousText\">\n                <span class=\"k-icon k-i-arrow-60-left\" style=\"pointer-events: none\"></span>\n            </a>\n        </li>\n        <li class=\"k-state-default k-header k-nav-next\">\n            <a role=\"button\"\n                (click)=\"nextClick()\"\n                href=\"#\"\n                class=\"k-link\"\n                tabindex=\"-1\"\n                [attr.title]=\"nextText\"\n                [attr.aria-label]=\"nextText\">\n                <span class=\"k-icon k-i-arrow-60-right\" style=\"pointer-events: none\"></span>\n            </a>\n        </li>\n        <li class=\"k-state-default k-nav-current\">\n            <a role=\"button\" #anchor href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"toggleSelectedDate(anchor, template)\">\n                <span class=\"k-icon k-i-calendar\"></span>\n                <span class=\"k-sm-date-format\">{{ (ctx.dateRange | async)?.shortText }}</span>\n                <span class=\"k-lg-date-format\">{{ (ctx.dateRange | async)?.text }}</span>\n            </a>\n        </li>\n\n        <ng-template #template>\n            <kendo-calendar (valueChange)=\"selectDate($event)\" [value]=\"ctx.selectedDate | async\" [min]=\"min\" [max]=\"max\">\n                <kendo-calendar-messages [today]=\"calendarTodayText\">\n                </kendo-calendar-messages>\n            </kendo-calendar>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarNavigationComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: ToolbarService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    ToolbarNavigationComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-navigation',] }, { type: HostBinding, args: ['class.k-reset',] }],
        min: [{ type: Input }],
        max: [{ type: Input }]
    };
    return ToolbarNavigationComponent;
}());

/**
 * @hidden
 */
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(service) {
        var _this = this;
        this.service = service;
        this.hostClasses = true;
        this.navigate = new EventEmitter();
        // The template context is the same as the service context,
        // but with resolved values instead of observables.
        this.templateContext = {};
        this.subs = new Subscription();
        this.subs.add(service.action.subscribe(function (action) {
            return _this.navigate.next(action);
        }));
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.add(this.selectedDate.subscribe(function (date) {
            return _this.templateContext.selectedDate = date;
        }));
        this.subs.add(this.dateRange.subscribe(function (dateRange) {
            return _this.templateContext.dateRange = dateRange;
        }));
    };
    ToolbarComponent.prototype.ngOnChanges = function () {
        this.service.context = {
            dateRange: this.dateRange,
            selectedDate: this.selectedDate,
            views: this.views,
            selectedView: this.selectedView
        };
        Object.assign(this.templateContext, {
            views: this.views,
            selectedView: this.selectedView
            // The dateRange and selectedDate context fields
            // are updated through the subscriptions added in ngOnInit.
        });
    };
    ToolbarComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-toolbar',
                    template: "\n        <ng-template\n            *ngIf=\"template; else defaultTemplate\"\n            [ngTemplateOutlet]=\"template.templateRef\"\n            [ngTemplateOutletContext]=\"templateContext\"\n        >\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ul kendoSchedulerToolbarNavigation [min]=\"min\" [max]=\"max\"></ul>\n            <ul kendoSchedulerToolbarViewSelector></ul>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
    ToolbarComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-toolbar',] }, { type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-floatwrap',] }],
        selectedView: [{ type: Input }],
        views: [{ type: Input }],
        dateRange: [{ type: Input }],
        selectedDate: [{ type: Input }],
        template: [{ type: Input }],
        navigate: [{ type: Output }],
        min: [{ type: Input }],
        max: [{ type: Input }]
    };
    return ToolbarComponent;
}());

/**
 * A toolbar component which contains the controls for switching the views
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the view-selection buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var ToolbarViewSelectorComponent = /** @class */ (function () {
    function ToolbarViewSelectorComponent(service) {
        this.service = service;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.expanded = false;
    }
    Object.defineProperty(ToolbarViewSelectorComponent.prototype, "ctx", {
        /**
         * @hidden
         */
        get: function () {
            return this.service.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarViewSelectorComponent.prototype, "itemDisplay", {
        /**
         * @hidden
         */
        get: function () {
            if (this.ctx.views && this.ctx.views.length === 1) {
                return 'list-item';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.onClick = function (view) {
        if (this.ctx.selectedView !== view) {
            this.service.navigate({
                type: 'view-change',
                view: view
            });
        }
        this.expanded = false;
        return false;
    };
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.onCurrentViewClick = function (e) {
        this.expanded = !this.expanded;
        return false;
    };
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.isSelected = function (view) {
        return this.ctx.selectedView === view;
    };
    ToolbarViewSelectorComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerToolbarViewSelector]',
                    template: "\n        <li class=\"k-current-view\" *ngIf=\"ctx.views?.length > 1\">\n            <a role=\"button\" href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"onCurrentViewClick($event)\">\n                {{ ctx.selectedView?.title }}\n            </a>\n        </li>\n        <li *ngFor=\"let view of ctx.views\"\n            [class.k-state-selected]=\"isSelected(view)\" [ngStyle]=\"{ display: itemDisplay }\"\n         >\n            <a role=\"button\" href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"onClick(view)\">\n                {{ view.title }}\n            </a>\n        </li>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarViewSelectorComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
    ToolbarViewSelectorComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-views',] }, { type: HostBinding, args: ['class.k-reset',] }],
        expanded: [{ type: HostBinding, args: ['class.k-state-expanded',] }]
    };
    return ToolbarViewSelectorComponent;
}());

/**
 * @hidden
 */
var publicDirectives = [
    ToolbarNavigationComponent,
    ToolbarTemplateDirective,
    ToolbarViewSelectorComponent
];
/**
 * @hidden
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CalendarModule,
                        PopupModule
                    ],
                    exports: [
                        ToolbarComponent
                    ].concat(publicDirectives),
                    declarations: [
                        ToolbarComponent
                    ].concat(publicDirectives)
                },] },
    ];
    return ToolbarModule;
}());

var defaultSlotClass = function (_args) { return null; };
/**
 * @hidden
 */
var ConfigurationViewBase = /** @class */ (function (_super) {
    __extends(ConfigurationViewBase, _super);
    function ConfigurationViewBase(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.changeDetector = changeDetector;
        _this.viewContext = viewContext;
        _this.viewState = viewState;
        _this.schedulerOptions = {};
        _this.subs = _this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            changeDetector.markForCheck();
        });
        _this.subs.add(_this.viewContext.optionsChange.subscribe(_this.optionsChange.bind(_this)));
        return _this;
    }
    Object.defineProperty(ConfigurationViewBase.prototype, "viewSlotClass", {
        /**
         * @hidden
         */
        get: function () {
            return isPresent(this.slotClass) ? this.slotClass : (this.schedulerOptions.slotClass || defaultSlotClass);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationViewBase.prototype, "viewEventClass", {
        /**
         * @hidden
         */
        get: function () {
            return isPresent(this.eventClass) ? this.eventClass : this.schedulerOptions.eventClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationViewBase.prototype, "viewEventStyles", {
        /**
         * @hidden
         */
        get: function () {
            return isPresent(this.eventStyles) ? this.eventStyles : this.schedulerOptions.eventStyles;
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationViewBase.prototype.ngOnChanges = function (_changes) {
        this.viewState.notifyOptionsChange();
    };
    ConfigurationViewBase.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    ConfigurationViewBase.prototype.optionsChange = function (options) {
        this.schedulerOptions = options;
    };
    ConfigurationViewBase.propDecorators = {
        slotClass: [{ type: Input }],
        eventClass: [{ type: Input }],
        eventStyles: [{ type: Input }],
        template: [{ type: ViewChild, args: ['content',] }],
        eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
        groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }]
    };
    return ConfigurationViewBase;
}(SchedulerView));

/**
 * The component for rendering the **Agenda** view.
 */
var AgendaViewComponent = /** @class */ (function (_super) {
    __extends(AgendaViewComponent, _super);
    function AgendaViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`agenda`).
         */
        _this.name = 'agenda';
        return _this;
    }
    Object.defineProperty(AgendaViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('agendaViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    AgendaViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-agenda-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return AgendaViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <agenda-view-internal\n                [eventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [agendaTimeTemplate]=\"agendaTimeTemplate?.templateRef\"\n                [agendaDateTemplate]=\"agendaDateTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </agenda-view-internal>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    AgendaViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
        agendaTimeTemplate: [{ type: ContentChild, args: [AgendaTimeTemplateDirective,] }],
        agendaDateTemplate: [{ type: ContentChild, args: [AgendaDateTemplateDirective,] }]
    };
    return AgendaViewComponent;
}(ConfigurationViewBase));

/**
 * @hidden
 */
var AgendaHeaderItemComponent = /** @class */ (function () {
    function AgendaHeaderItemComponent() {
        this.classes = true;
    }
    Object.defineProperty(AgendaHeaderItemComponent.prototype, "rowSpan", {
        get: function () {
            return this.item.rowSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderItemComponent.prototype, "itemDate", {
        get: function () {
            return toLocalDate(this.item.dataItem.value);
        },
        enumerable: true,
        configurable: true
    });
    AgendaHeaderItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeaderItem]',
                    template: "\n        <ng-container *ngIf=\"!agendaDateTemplate\">\n            <strong class=\"k-scheduler-agendaday\">{{itemDate | kendoDate: 'dd'}}</strong>\n            <em class=\"k-scheduler-agendaweek\">{{itemDate | kendoDate: 'EEEE'}}</em>\n            <span class=\"k-scheduler-agendadate\">{{itemDate | kendoDate: 'y'}}</span>\n        </ng-container>\n        <ng-container *ngIf=\"agendaDateTemplate\" [ngTemplateOutlet]=\"agendaDateTemplate\"\n            [ngTemplateOutletContext]=\"{ date: itemDate }\">\n        </ng-container>\n    "
                },] },
    ];
    AgendaHeaderItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ["class.k-scheduler-datecolumn",] }],
        rowSpan: [{ type: HostBinding, args: ["attr.rowspan",] }],
        item: [{ type: Input, args: ["kendoSchedulerAgendaHeaderItem",] }],
        agendaDateTemplate: [{ type: Input }]
    };
    return AgendaHeaderItemComponent;
}());

/**
 * @hidden
 */
var AgendaHeaderComponent = /** @class */ (function () {
    function AgendaHeaderComponent(localization) {
        this.localization = localization;
        this.classes = true;
    }
    Object.defineProperty(AgendaHeaderComponent.prototype, "dateMessage", {
        get: function () {
            return this.localization.get('dateHeader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderComponent.prototype, "timeMessage", {
        get: function () {
            return this.localization.get('timeHeader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderComponent.prototype, "eventMessage", {
        get: function () {
            return this.localization.get('eventHeader');
        },
        enumerable: true,
        configurable: true
    });
    AgendaHeaderComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeader]',
                    template: "\n        <div class=\"k-scheduler-header-wrap\">\n            <table class=\"k-scheduler-table\" role=\"presentation\">\n                <tbody>\n                    <tr>\n                        <th *ngFor=\"let resource of resources\" class=\"k-scheduler-groupcolumn\"></th>\n                        <th class=\"k-scheduler-datecolumn\">{{ dateMessage }}</th>\n                        <th class=\"k-scheduler-timecolumn\">{{ timeMessage }}</th>\n                        <th>{{ eventMessage }}</th>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaHeaderComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    AgendaHeaderComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ["class.k-scheduler-header",] }, { type: HostBinding, args: ["class.k-state-default",] }],
        resources: [{ type: Input }]
    };
    return AgendaHeaderComponent;
}());

/**
 * @hidden
 */
var AgendaTaskItemComponent = /** @class */ (function () {
    function AgendaTaskItemComponent(localization) {
        this.localization = localization;
    }
    Object.defineProperty(AgendaTaskItemComponent.prototype, "eventTitle", {
        get: function () {
            var start = toLocalDate(this.item.start);
            var end = toLocalDate(this.item.end);
            var time = formatEventTime(start, end, this.item.isAllDay);
            return time + ", " + this.item.event.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "eventColor", {
        get: function () {
            return this.item.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "deleteMessage", {
        get: function () {
            return this.localization.get('deleteTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "isRecurrence", {
        get: function () {
            return isRecurrence(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "isRecurrenceException", {
        get: function () {
            return isRecurrenceException(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "removable", {
        get: function () {
            return this.editable && this.editable.remove !== false;
        },
        enumerable: true,
        configurable: true
    });
    AgendaTaskItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaTaskItem]',
                    template: "\n        <div class=\"k-task\" [title]=\"item.title\">\n            <span class=\"k-scheduler-mark\" *ngIf=\"eventColor\" [style.background-color]=\"eventColor\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n            <ng-container *ngIf=\"!eventTemplate\">\n                {{item?.title }}\n            </ng-container>\n            <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: item.resources }\">\n            </ng-container>\n\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaTaskItemComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    AgendaTaskItemComponent.propDecorators = {
        item: [{ type: Input, args: ["kendoSchedulerAgendaTaskItem",] }],
        color: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        editable: [{ type: Input }],
        eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
    };
    return AgendaTaskItemComponent;
}());

/**
 * @hidden
 */
var AgendaListComponent = /** @class */ (function () {
    function AgendaListComponent(intlService, localization) {
        this.intlService = intlService;
        this.localization = localization;
        this.classes = true;
    }
    AgendaListComponent.prototype.extractDataItem = function (item) {
        return item.type === "group" ? item.dataItem.items[0] : item.dataItem;
    };
    AgendaListComponent.prototype.formatTime = function (dataItem) {
        if (dataItem.isAllDay) {
            return this.localization.get('allDay');
        }
        var format = "{0:t}-{1:t}";
        if (dataItem.head) {
            format = "{0:t}";
        }
        else if (dataItem.tail) {
            format = "{1:t}";
        }
        return this.intlService.format(format, toLocalDate(dataItem.start), toLocalDate(dataItem.end));
    };
    AgendaListComponent.prototype.trackByFn = function (_, item) {
        return item.dataItem;
    };
    AgendaListComponent.prototype.cellClasses = function (item) {
        var task = this.extractDataItem(item);
        var result = [];
        if (this.slotClass) {
            result = result.concat(convertNgClassBindings(this.slotClass({
                start: task.start,
                end: task.end,
                resources: task.resources,
                event: task.event
            })));
        }
        if (this.eventClass) {
            result = result.concat(convertNgClassBindings(this.eventClass({
                event: task.event,
                resources: task.resources
            })));
        }
        return result;
    };
    AgendaListComponent.prototype.getEventStyles = function (item) {
        if (this.eventStyles) {
            var task = this.extractDataItem(item);
            return this.eventStyles({
                event: task.event,
                resources: task.resources
            });
        }
    };
    AgendaListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaList]',
                    template: "\n        <table class=\"k-scheduler-table\" role=\"presentation\">\n            <tbody>\n                <ng-container *ngFor=\"let group of tasks; let groupIndex = index;\">\n                    <tr *ngFor=\"let item of group.tasks;let index = index; trackBy: trackByFn\">\n                        <ng-container *ngFor=\"let resource of group.resources;let resourceIndex = index\">\n                            <td *ngIf=\"group.spans[resourceIndex] && index === 0\" class=\"k-scheduler-groupcolumn\" [attr.rowspan]=\"group.spans[resourceIndex]\">\n                                {{ resource }}\n                            </td>\n                        </ng-container>\n                        <td *ngIf=\"item.type === 'group'\"\n                            [kendoSchedulerAgendaHeaderItem]=\"item\"\n                            [agendaDateTemplate]=\"agendaDateTemplate\">\n                        </td>\n                        <td class=\"k-scheduler-timecolumn\">\n                            <div *ngIf=\"!agendaTimeTemplate\">\n                                <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"extractDataItem(item).tail\"></span>\n                                {{formatTime(extractDataItem(item)) }}\n                                <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"extractDataItem(item).head\"></span>\n                            </div>\n                            <ng-container *ngIf=\"agendaTimeTemplate\" [ngTemplateOutlet]=\"agendaTimeTemplate\"\n                                [ngTemplateOutletContext]=\"extractDataItem(item)\">\n                            </ng-container>\n                        </td>\n                        <td [attr.data-group-index]=\"groupIndex\" [attr.data-task-index]=\"index\"\n                            [ngClass]=\"cellClasses(item)\" [ngStyle]=\"getEventStyles(item)\"\n                            [kendoSchedulerFocusIndex]=\"groupIndex\"\n                            [kendoSchedulerAgendaTaskItem]=\"extractDataItem(item)\"\n                                [editable]=\"editable\"\n                                [eventTemplate]=\"eventTemplate\"\n                        ></td>\n                    </tr>\n                </ng-container>\n            </tbody>\n        </table>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaListComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService }
    ]; };
    AgendaListComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class.k-scheduler-content',] }],
        tasks: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        slotClass: [{ type: Input }],
        eventClass: [{ type: Input }],
        eventStyles: [{ type: Input }],
        agendaTimeTemplate: [{ type: Input }],
        agendaDateTemplate: [{ type: Input }],
        editable: [{ type: Input }]
    };
    return AgendaListComponent;
}());

var flip = function (fn) { return function (a) { return function (b) { return fn(b, a); }; }; };
var sort = flip(orderBy);
var group = flip(groupBy);
/**
 * @hidden
 */
var compose = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (data) { return args.reduceRight(function (acc, curr) { return curr(acc); }, data); };
};
/**
 * @hidden
 */
var processEvents = function (start, end) {
    return compose(group([{ field: "startDate" }]), sort([{ field: "start", dir: "asc" }, { field: "end", dir: "asc" }]));
};
function flattenGroups(groups) {
    var index, groupItem, itemIndex, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                _a.label = 1;
            case 1:
                if (!(index < groups.length)) return [3 /*break*/, 7];
                groupItem = groups[index];
                return [4 /*yield*/, {
                        type: "group",
                        dataItem: groupItem,
                        rowSpan: groupItem.items.length
                    }];
            case 2:
                _a.sent();
                itemIndex = 1;
                _a.label = 3;
            case 3:
                if (!(itemIndex < groupItem.items.length)) return [3 /*break*/, 6];
                item = groupItem.items[itemIndex];
                return [4 /*yield*/, {
                        type: "event",
                        dataItem: item
                    }];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                itemIndex++;
                return [3 /*break*/, 3];
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}
/** @hidden */
var EmptyIterator = /** @class */ (function () {
    function EmptyIterator() {
    }
    EmptyIterator.prototype[iterator] = function () {
        return {
            next: function () { return ({ done: true, value: null }); }
        };
    };
    EmptyIterator.prototype.toString = function () {
        return "Empty Iterator";
    };
    return EmptyIterator;
}());
/**
 * @hidden
 */
var TaskCollection = /** @class */ (function () {
    function TaskCollection(start, end, events) {
        this.start = start;
        this.end = end;
        this.events = events;
        this.createIterator = compose(flattenGroups, processEvents(this.start, this.end));
    }
    TaskCollection.empty = function () {
        return (new EmptyIterator());
    };
    TaskCollection.prototype[iterator] = function () {
        return this.createIterator(this.events);
    };
    TaskCollection.prototype.itemAt = function (index) {
        var taskIterator = this.createIterator(this.events);
        var idx = 0;
        var item;
        do {
            item = taskIterator.next();
            if (item && idx === index) {
                var value = item.value;
                return value.type === 'group' ? value.dataItem.items[0] : value.dataItem;
            }
            idx++;
        } while (item);
    };
    TaskCollection.prototype.toString = function () {
        return this.events.toString();
    };
    return TaskCollection;
}());

/**
 * @hidden
 */
function createResourceGroups(groupedResources) {
    var result = [];
    var firstResource = groupedResources[0];
    var firstResourceData = firstResource.data;
    for (var dataIdx = 0; dataIdx < firstResourceData.length; dataIdx++) {
        var item = firstResourceData[dataIdx];
        result.push({ resources: [getField(item, firstResource.textField)] });
    }
    for (var idx = 1; idx < groupedResources.length; idx++) {
        var resource = groupedResources[idx];
        var data = resource.data;
        var current = [];
        for (var resourceIdx = 0; resourceIdx < result.length; resourceIdx++) {
            var resourceItem = result[resourceIdx];
            for (var dataIdx = 0; dataIdx < data.length; dataIdx++) {
                var item = data[dataIdx];
                current.push({ resources: resourceItem.resources.concat(getField(item, resource.textField)) });
            }
        }
        result = current;
    }
    return result;
}
function createTask(item, resourceIdx, resources, color) {
    var event = item.event;
    return {
        event: event,
        start: item.start.toUTCDate(),
        end: item.end.toUTCDate(),
        title: event.title,
        isAllDay: event.isAllDay,
        color: color,
        resourceIdx: resourceIdx,
        resources: resources
    };
}
var durationInDays = function (_a) {
    var start = _a.start, end = _a.end, _b = _a.isAllDay, isAllDay = _b === void 0 ? false : _b;
    var eventEnd = isAllDay ? getUTCDate(end) : end;
    var duration = Math.ceil((eventEnd - +getUTCDate(start)) / MS_PER_DAY);
    if (isAllDay) {
        return duration + 1;
    }
    return duration;
};
var curry = function (fn) {
    var len = fn.length;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return len === args.length
            ? fn.apply(null, args)
            : curry(fn.bind.apply(fn, [null].concat(args)));
    };
};
var range = function (num) { return Array.from(new Array(num).keys()); };
var cloneTask = function (eventStart) { return function (task) { return (__assign({}, task, { start: getUTCDate(eventStart), end: addUTCDays(eventStart, 1), startDate: getUTCDate(eventStart) })); }; };
var previousEventEnd = function (start, events) {
    return events.length
        ? events[events.length - 1].end
        : start;
};
var markAsTailOrMid = function (isLast) { return function (task) {
    if (isLast) {
        task.tail = true;
    }
    else {
        task.mid = true;
    }
    return task;
}; };
var addTaskPart = function (task, start) {
    return function (tasks, _, day, days) {
        return tasks.concat(compose(markAsTailOrMid(day === days.length - 1), cloneTask(previousEventEnd(start, tasks)))(task));
    };
};
var splitMultiDayTask = function (task, start) {
    return range(durationInDays(task) - 1)
        .reduce(addTaskPart(task, start), []);
};
/**
 * @hidden
 */
var splitTasks = curry(function (periodStart, periodEnd, tasks) {
    var result = [];
    for (var index = 0; index < tasks.length; index++) {
        var task = __assign({}, tasks[index]);
        task.startDate = getUTCDate(task.start);
        if (task.start >= periodStart && task.start <= periodEnd) {
            result.push(task);
        }
        if (durationInDays(task) > 1) {
            task.end = addUTCDays(task.startDate, 1);
            task.head = true;
            result.push.apply(result, splitMultiDayTask(__assign({}, tasks[index]), task.end)
                .filter(function (tsk) { return getUTCDate(tsk.end) <= periodEnd && tsk.start >= periodStart; }));
        }
    }
    return result;
});
function groupByResource(groupedResources, resourceGroups, dateRange) {
    var groups = resourceGroups.filter(function (group) { return group.tasks && group.tasks.length; });
    if (!groups.length) {
        return [];
    }
    var values = groups[0].resources.map(function (resource) { return ({ value: resource, span: 0, groupIdx: 0 }); });
    var periodStart = toUTCDate(dateRange.start);
    var periodEnd = toUTCDate(dateRange.end);
    for (var groupIdx = 0; groupIdx < groups.length; groupIdx++) {
        var group = groups[groupIdx];
        group.tasks = splitTasks(periodStart, periodEnd, group.tasks);
        var count = group.tasks.length;
        group.tasks = new TaskCollection(periodStart, periodEnd, group.tasks);
        var invalidate = false;
        for (var resourceIdx = 0; resourceIdx < groupedResources.length; resourceIdx++) {
            var resourceValue = values[resourceIdx];
            if (resourceValue.value !== group.resources[resourceIdx] || invalidate) {
                resourceValue.value = group.resources[resourceIdx];
                var spanGroup = groups[resourceValue.groupIdx];
                spanGroup.spans = spanGroup.spans || [];
                spanGroup.spans[resourceIdx] = resourceValue.span;
                resourceValue.span = count;
                resourceValue.groupIdx = groupIdx;
                invalidate = true;
            }
            else {
                resourceValue.span += count;
            }
        }
    }
    values.forEach(function (value, index) {
        var group = groups[value.groupIdx];
        group.spans = group.spans || [];
        group.spans[index] = value.span;
    });
    return groups;
}
/**
 * @hidden
 */
function groupEvents(items, _a) {
    var taskResources = _a.taskResources, resourceGroups = _a.resourceGroups, spans = _a.spans, allResources = _a.allResources, dateRange = _a.dateRange;
    var groups = resourceGroups || [{}];
    var periodStart = toUTCDate(dateRange.start);
    var periodEnd = toUTCDate(dateRange.end);
    for (var idx = 0; idx < items.length; idx++) {
        var item = items[idx];
        var event_1 = item.event;
        if (!intersects(item.start.toUTCDate(), item.end.toUTCDate(), periodStart, periodEnd)) {
            continue;
        }
        var resources = eventResources(event_1, { taskResources: taskResources, hasGroups: resourceGroups && resourceGroups.length > 0, spans: spans, allResources: allResources });
        if (resources.length && resources[0].leafIdx >= 0) {
            for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
                var current = resources[resourceIdx];
                var task = createTask(item, current.leafIdx, current.resources, current.color);
                var tasks = groups[current.leafIdx].tasks = groups[current.leafIdx].tasks || [];
                tasks.push(task);
            }
        }
    }
    if (resourceGroups) {
        return groupByResource(taskResources, groups, dateRange);
    }
    groups[0].tasks = new TaskCollection(periodStart, periodEnd, splitTasks(periodStart, periodEnd, groups[0].tasks || []));
    return groups;
}

/**
 * @hidden
 */
var AgendaViewInternalComponent = /** @class */ (function () {
    function AgendaViewInternalComponent(viewContext, viewState, intl, renderer, element, zone, pdfService, localization) {
        this.viewContext = viewContext;
        this.viewState = viewState;
        this.intl = intl;
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
        this.pdfService = pdfService;
        this.localization = localization;
        this.tasks = new BehaviorSubject(null);
        this.groupedResources = [];
        this.spans = [];
        this.subs = new Subscription();
    }
    Object.defineProperty(AgendaViewInternalComponent.prototype, "eventTemplateRef", {
        get: function () {
            return this.eventTemplate || (this.schedulerEventTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaViewInternalComponent.prototype, "agendaTimeTemplateRef", {
        get: function () {
            return this.agendaTimeTemplate || (this.schedulerAgendaTimeTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaViewInternalComponent.prototype, "agendaDateTemplateRef", {
        get: function () {
            return this.agendaDateTemplate || (this.schedulerAgendaDateTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    AgendaViewInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateContentHeight = this.updateContentHeight.bind(this);
        this.subs.add(this.viewContext.selectedDate.subscribe(this.onSelectDate.bind(this)));
        this.subs.add(this.viewContext.action.subscribe(this.onAction.bind(this)));
        this.subs.add(this.viewContext.execute.subscribe(this.execute.bind(this)));
        this.subs.add(this.viewContext.resize.subscribe(this.updateContentHeight));
        this.subs.add(combineLatest(this.viewContext.items, this.viewState.dateRange).pipe(map(function (_a) {
            var items = _a[0], dateRange = _a[1];
            _this.items = items;
            _this.range = dateRange;
            return _this.createEventGroups();
        }))
            .subscribe(function (tasks) {
            _this.tasks.next(tasks);
        }));
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
        var onStable = function () { return _this.zone.onStable.pipe(take(1)); };
        this.subs.add(combineLatest(this.tasks, this.localization.changes).pipe(switchMap(onStable))
            .subscribe(this.updateContentHeight));
        this.subs.add(this.pdfService.createElement.subscribe(this.createPDFElement.bind(this)));
    };
    AgendaViewInternalComponent.prototype.ngOnChanges = function (changes) {
        if (anyChanged(['selectedDateFormat', 'selectedShortDateFormat'], changes)) {
            this.viewState.notifyDateRange(this.dateRange(this.selectedDate));
        }
    };
    AgendaViewInternalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        var contentElement = this.content.nativeElement;
        this.zone.runOutsideAngular(function () {
            _this.subs.add(merge(fromEvent(contentElement, 'click'), fromEvent(contentElement, 'contextmenu'), fromEvent(contentElement, 'dblclick'))
                .subscribe(function (e) { return _this.onClick(e); }));
            _this.subs.add(fromEvent(contentElement, 'keydown')
                .subscribe(function (e) { return _this.onKeydown(e); }));
        });
    };
    AgendaViewInternalComponent.prototype.onClick = function (e) {
        var targetTask = this.targetTask(e.target);
        if (targetTask) {
            var task = targetTask.task, eventTarget = targetTask.eventTarget;
            var eventType = e.type;
            var isSingle = eventType === 'click';
            var isDouble = eventType === 'dblclick';
            if (isSingle && closestInScope(e.target, function (node) { return hasClasses(node, 'k-event-delete'); }, eventTarget)) {
                e.preventDefault();
                this.viewState.emitEvent('remove', { event: task.event, dataItem: task.event.dataItem });
            }
            else {
                var name_1 = isDouble ? 'eventDblClick' : 'eventClick';
                this.viewState.emitEvent(name_1, { type: eventType, event: task.event, originalEvent: e });
            }
        }
    };
    AgendaViewInternalComponent.prototype.onKeydown = function (e) {
        var targetTask = this.targetTask(e.target);
        if (targetTask) {
            var task = targetTask.task;
            this.viewState.emitEvent('eventKeydown', { event: task.event, dataItem: task.event.dataItem, originalEvent: e });
        }
    };
    AgendaViewInternalComponent.prototype.targetTask = function (target) {
        var eventTarget = closestInScope(target, function (node) { return node.hasAttribute('data-task-index'); }, this.element.nativeElement);
        if (eventTarget) {
            return {
                eventTarget: eventTarget,
                task: this.elementTask(eventTarget)
            };
        }
    };
    AgendaViewInternalComponent.prototype.updateContentHeight = function () {
        var element = this.element.nativeElement;
        var parent = element.parentNode;
        var content = this.content.nativeElement;
        this.renderer.setStyle(content, 'height', '');
        var height = parent.clientHeight;
        for (var idx = 0; idx < parent.children.length; idx++) {
            var child = parent.children[idx];
            if (child !== element && !ignoreContentChild(child)) {
                height -= child.offsetHeight;
            }
        }
        var headerElement = this.headerWrap.nativeElement;
        height -= this.headerWrap ? headerElement.offsetHeight : 0;
        this.renderer.setStyle(content, 'height', height + "px");
        var rtl = this.localization.rtl;
        var padding = hasScrollbar(content, 'vertical') ? scrollbarWidth() : 0;
        this.renderer.setStyle(headerElement, !rtl ? 'padding-right' : 'padding-left', padding + "px");
        this.renderer.setStyle(headerElement, rtl ? 'padding-right' : 'padding-left', '0px');
        this.viewState.notifyLayoutEnd();
    };
    AgendaViewInternalComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    AgendaViewInternalComponent.prototype.optionsChange = function (changes) {
        this.group = changes.group;
        this.resources = changes.resources;
        this.groupResources();
        this.min = changes.min;
        this.max = changes.max;
        this.editable = changes.editable;
        if (this.items && this.items.length) {
            this.tasks.next(this.createEventGroups());
        }
        this.schedulerEventTemplate = changes.eventTemplate;
        this.schedulerAgendaTimeTemplate = changes.agendaTimeTemplate;
        this.schedulerAgendaDateTemplate = changes.agendaDateTemplate;
    };
    AgendaViewInternalComponent.prototype.onSelectDate = function (date) {
        this.selectedDate = date;
        this.viewState.notifyDateRange(this.dateRange());
    };
    AgendaViewInternalComponent.prototype.onAction = function (e) {
        var now = getDate(this.selectedDate);
        if (e.type === 'next') {
            var next = getDate(addDays(now, 7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            var next = getDate(addDays(now, -7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
    };
    AgendaViewInternalComponent.prototype.createEventGroups = function () {
        var resourceGroups = this.groupedResources.length ? createResourceGroups(this.groupedResources) : null;
        var eventGroups = this.groups = groupEvents(this.items, {
            taskResources: this.taskResources,
            resourceGroups: resourceGroups,
            allResources: this.resources,
            spans: this.spans,
            dateRange: this.range
        });
        return eventGroups;
    };
    AgendaViewInternalComponent.prototype.dateRange = function (date) {
        if (date === void 0) { date = this.selectedDate; }
        var start = getDate(date);
        var end = getDate(addDays(start, 7));
        var text = this.intl.format(this.selectedDateFormat, start, end);
        var shortText = this.intl.format(this.selectedShortDateFormat, start, end);
        return { start: start, end: end, text: text, shortText: shortText };
    };
    AgendaViewInternalComponent.prototype.groupResources = function () {
        var resources = this.resources || [];
        var group = this.group || {};
        var grouped = group.resources;
        var groupedResources = this.groupedResources = [];
        if (grouped && grouped.length) {
            var _loop_1 = function (groupIdx) {
                var name_2 = grouped[groupIdx];
                var resource = resources.find(function (item) { return item.name === name_2; });
                if (resource) {
                    groupedResources.push(resource);
                }
            };
            for (var groupIdx = 0; groupIdx < grouped.length; groupIdx++) {
                _loop_1(groupIdx);
            }
        }
        this.spans = this.resourceSpans();
    };
    AgendaViewInternalComponent.prototype.resourceSpans = function () {
        var spans = [1];
        var resources = this.groupedResources;
        var span = 1;
        for (var idx = resources.length - 1; idx > 0; idx--) {
            span *= ((resources[idx].data || []).length || 1);
            spans.unshift(span);
        }
        return spans;
    };
    Object.defineProperty(AgendaViewInternalComponent.prototype, "taskResources", {
        get: function () {
            if (this.groupedResources.length) {
                return this.groupedResources;
            }
            else if (this.resources && this.resources.length) {
                return [this.resources[0]];
            }
            else {
                return [{}];
            }
        },
        enumerable: true,
        configurable: true
    });
    AgendaViewInternalComponent.prototype.isInRange = function (date) {
        var dateRange = this.dateRange(date);
        return (!this.min || this.min < dateRange.end) && (!this.max || dateRange.start <= this.max);
    };
    AgendaViewInternalComponent.prototype.createPDFElement = function () {
        var element = this.element.nativeElement.cloneNode(true);
        element.style.width = this.element.nativeElement.offsetWidth + "px";
        element.querySelector('.k-scheduler-content').style.height = 'auto';
        var header = element.querySelector('.k-scheduler-header');
        header.style.paddingRight = 0;
        header.style.paddingLeft = 0;
        this.pdfService.elementReady.emit({
            element: element
        });
    };
    AgendaViewInternalComponent.prototype.elementTask = function (element) {
        var index = parseInt(element.getAttribute('data-task-index'), 10);
        var groupIndex = parseInt(element.getAttribute('data-group-index'), 10);
        var group = this.groups[groupIndex];
        var task = group.tasks.itemAt(index);
        return task;
    };
    AgendaViewInternalComponent.prototype.execute = function (e) {
        if (e.name === 'slotByPosition') {
            var slot = this.slotByPosition(e.args);
            e.result(slot);
        }
        else if (e.name === 'eventFromElement') {
            var task = this.elementTask(e.args.element);
            if (task) {
                e.result(task.event);
            }
        }
    };
    AgendaViewInternalComponent.prototype.slotByPosition = function (_a) {
        var x = _a.x, y = _a.y;
        var contentTable = this.content.nativeElement.querySelector('table');
        var offset = elementOffset(contentTable);
        if (offset.top <= y && y <= offset.top + offset.height) {
            var contentRows = contentTable.rows;
            if (!contentRows.length) {
                return;
            }
            var taskOffset = elementOffset(contentRows[0].cells[contentRows[0].cells.length - 1]);
            if (taskOffset.left <= x && x <= taskOffset.left + taskOffset.width) {
                for (var idx = 0; idx < contentRows.length; idx++) {
                    var row = contentRows[idx];
                    var rowOffset = elementOffset(row);
                    if (rowOffset.top <= y && y <= rowOffset.top + rowOffset.height) {
                        var element = row.querySelector('[data-task-index]');
                        var task = this.elementTask(element);
                        var event_1 = task.event;
                        return {
                            element: new ElementRef(element),
                            start: event_1.start,
                            end: event_1.end,
                            event: event_1,
                            resources: task.resources,
                            isAllDay: task.isAllDay
                        };
                    }
                }
            }
        }
    };
    AgendaViewInternalComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'agenda-view-internal',
                    template: "\n        <table class=\"k-scheduler-layout k-scheduler-agendaview k-scheduler-agenda\">\n            <tbody>\n                <tr>\n                    <td>\n                        <div kendoSchedulerAgendaHeader [resources]=\"groupedResources\" #headerWrap></div>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <div kendoSchedulerAgendaList #content\n                            [editable]=\"editable\"\n                            [eventTemplate]=\"eventTemplateRef\"\n                            [slotClass]=\"slotClass\"\n                            [eventClass]=\"eventClass\"\n                            [eventStyles]=\"eventStyles\"\n                            [agendaTimeTemplate]=\"agendaTimeTemplateRef\"\n                            [agendaDateTemplate]=\"agendaDateTemplateRef\"\n                            [tasks]=\"tasks | async\">\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaViewInternalComponent.ctorParameters = function () { return [
        { type: ViewContextService },
        { type: ViewStateService },
        { type: IntlService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: PDFService },
        { type: LocalizationService }
    ]; };
    AgendaViewInternalComponent.propDecorators = {
        eventTemplate: [{ type: Input }],
        slotClass: [{ type: Input }],
        eventClass: [{ type: Input }],
        eventStyles: [{ type: Input }],
        agendaTimeTemplate: [{ type: Input }],
        agendaDateTemplate: [{ type: Input }],
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        headerWrap: [{ type: ViewChild, args: ['headerWrap', { read: ElementRef },] }],
        content: [{ type: ViewChild, args: ['content', { read: ElementRef },] }]
    };
    return AgendaViewInternalComponent;
}());

/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            FocusableDirective
        ];
    };
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FocusableDirective
                    ],
                    exports: [
                        FocusableDirective
                    ]
                },] },
    ];
    return SharedModule;
}());

var COMPONENTS = [
    AgendaHeaderComponent,
    AgendaHeaderItemComponent,
    AgendaListComponent,
    AgendaTaskItemComponent,
    AgendaViewComponent,
    AgendaViewInternalComponent
];
/**
 * @hidden
 */
var AgendaViewModule = /** @class */ (function () {
    function AgendaViewModule() {
    }
    AgendaViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, IntlModule, SharedModule],
                    exports: [AgendaViewComponent],
                    declarations: [COMPONENTS]
                },] },
    ];
    return AgendaViewModule;
}());

/**
 * @hidden
 */
var ItemMap = /** @class */ (function () {
    function ItemMap() {
        this.count = 0;
        this.items = {};
    }
    Object.defineProperty(ItemMap.prototype, "first", {
        get: function () {
            if (this.count > 0) {
                return this.items[Object.keys(this.items)[0]];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemMap.prototype, "last", {
        get: function () {
            if (this.count > 0) {
                var keys = Object.keys(this.items);
                return this.items[keys[keys.length - 1]];
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemMap.prototype.addItem = function (index, item) {
        if (!this.items[index]) {
            this.count++;
        }
        this.items[index] = item;
    };
    ItemMap.prototype.removeItem = function (index, item) {
        var current = this.items[index];
        if (current === item) {
            delete this.items[index];
            this.count--;
        }
    };
    ItemMap.prototype.toArray = function () {
        var _this = this;
        return Object.keys(this.items).map(function (index) { return _this.items[index]; });
    };
    return ItemMap;
}());

/**
 * @hidden
 */
var BaseSlotService = /** @class */ (function () {
    function BaseSlotService() {
        this.containerSize = 0;
        this.slotsChange = new EventEmitter();
        this.groups = [];
    }
    BaseSlotService.prototype.registerItem = function (component) {
        var group = this.itemGroup(component);
        group.registerItem(component);
    };
    BaseSlotService.prototype.unregisterItem = function (component, resourceIndex, index) {
        if (resourceIndex === void 0) { resourceIndex = component.resourceIndex; }
        if (index === void 0) { index = component.index; }
        var group = this.groups[resourceIndex];
        if (group) {
            group.unregisterItem(component, index);
        }
    };
    BaseSlotService.prototype.registerSlot = function (slot) {
        var group = this.slotGroup(slot);
        group.registerSlot(slot);
    };
    BaseSlotService.prototype.unregisterSlot = function (slot) {
        var group = this.groups[slot.id.resourceIndex];
        if (group) {
            group.unregisterSlot(slot);
        }
    };
    BaseSlotService.prototype.invalidate = function () {
        this.clearEmptyGroups();
        this.cleanRanges();
        this.slotsChange.emit();
        this.forEachSlot(function (slot) {
            slot.invalidate();
        });
    };
    BaseSlotService.prototype.cleanRanges = function () {
        this.groups.forEach(function (group) {
            group.cleanRanges();
        });
    };
    BaseSlotService.prototype.clearEmptyGroups = function () {
        var groups = this.groups;
        var index = this.groups.length - 1;
        while (index > 0 && !groups[index].hasSlots) {
            groups.splice(index, 1);
            index--;
        }
    };
    BaseSlotService.prototype.itemGroup = function (item) {
        var index = item.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    };
    BaseSlotService.prototype.slotGroup = function (slot) {
        var index = slot.id.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    };
    return BaseSlotService;
}());

/** @hidden */
var MIDNIGHT_INVARIANT = new Date(1980, 0, 1);
/** @hidden */
var INVARIANT_END = new Date(1980, 0, 2);
/** @hidden */
var MS_PER_SECOND = 1000;
/** @hidden */
var MS_PER_MINUTE = 60 * MS_PER_SECOND;
/** @hidden */

//probably should calculate this
/** @hidden */
var BORDER_WIDTH = 1;
/** @hidden */
var DEFAULT_EVENT_HEIGHT = 25;

//better try to measure this one
var MORE_BUTTON_HEIGHT = 13;
var EVENT_OFFSET = 2;
/**
 * @hidden
 */
var SlotRange = /** @class */ (function () {
    function SlotRange(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    Object.defineProperty(SlotRange.prototype, "slots", {
        get: function () {
            return this.slotMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "items", {
        get: function () {
            return this.itemMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "start", {
        get: function () {
            var first = this.slotMap.first;
            if (!first) {
                return null;
            }
            return first.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "end", {
        get: function () {
            var last = this.slotMap.last;
            if (!last) {
                return null;
            }
            return addUTCDays(last.end, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasSlots", {
        get: function () {
            return this.slotMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasItems", {
        get: function () {
            return this.itemMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "firstSlot", {
        get: function () {
            return this.slotMap.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "lastSlot", {
        get: function () {
            return this.slotMap.last;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "rect", {
        get: function () {
            var first = this.firstSlot.rect;
            var last = this.lastSlot.rect;
            return {
                left: first.left,
                top: first.top,
                width: last.left - first.left + last.width,
                height: last.top - first.top + last.height
            };
        },
        enumerable: true,
        configurable: true
    });
    SlotRange.prototype.registerItem = function (component) {
        this.itemMap.addItem(component.item.index, component);
    };
    SlotRange.prototype.unregisterItem = function (component, index) {
        this.itemMap.removeItem(index, component);
    };
    SlotRange.prototype.registerSlot = function (slot) {
        this.slotMap.addItem(slot.id.index, slot);
    };
    SlotRange.prototype.unregisterSlot = function (slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    };
    SlotRange.prototype.layout = function (eventHeight) {
        if (!this.hasItems) {
            return;
        }
        var items = this.items;
        var sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        var slotItems = {};
        var slots = this.slots;
        sorted.forEach(function (event) { return slots
            .filter(function (slot) { return intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
            .forEach(function (slot) {
            var value = slotItems[slot.key] = slotItems[slot.key] || { events: [], height: slot.linkHeight };
            value.slot = slot;
            var rect = slot.rect;
            var data = event.item.data[event.resourceIndex];
            data.rowIndex = findRowIndex(value.events, data);
            if (value.height + eventHeight + EVENT_OFFSET + MORE_BUTTON_HEIGHT > rect.height || data.hidden) {
                data.hidden = true;
                slot.showMore({ width: rect.width, left: rect.left, top: rect.top + slot.linkHeight + ((data.rowIndex) * (eventHeight + EVENT_OFFSET)) });
            }
            else {
                value.events[data.rowIndex] = event;
                if (!event.rect) {
                    event.rect = {
                        top: rect.top + slot.linkHeight + (data.rowIndex * (eventHeight + EVENT_OFFSET)),
                        left: rect.left,
                        height: eventHeight,
                        width: 0
                    };
                }
                event.rect.width += rect.width + BORDER_WIDTH;
                value.height += eventHeight + EVENT_OFFSET;
            }
        }); });
        sorted.forEach(function (event) {
            if (event.rect) {
                event.rect.width -= BORDER_WIDTH;
            }
            event.reflow();
        });
    };
    return SlotRange;
}());
/**
 * @hidden
 */
var MonthResourceGroup = /** @class */ (function () {
    function MonthResourceGroup(index) {
        this.index = index;
        this.dayRanges = [];
    }
    Object.defineProperty(MonthResourceGroup.prototype, "hasSlots", {
        get: function () {
            return Boolean(this.dayRanges.find(function (range) { return range && range.hasSlots; }));
        },
        enumerable: true,
        configurable: true
    });
    MonthResourceGroup.prototype.registerSlot = function (slot) {
        var range = this.slotRange(slot);
        range.registerSlot(slot);
    };
    MonthResourceGroup.prototype.unregisterSlot = function (slot) {
        var range = this.dayRanges[slot.id.rangeIndex];
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            delete this.dayRanges[slot.id.rangeIndex];
        }
    };
    MonthResourceGroup.prototype.registerItem = function (component) {
        var range = this.dayRanges[component.item.rangeIndex];
        range.registerItem(component);
    };
    MonthResourceGroup.prototype.unregisterItem = function (component, index) {
        var range = this.dayRanges[component.item.rangeIndex];
        if (range) {
            range.unregisterItem(component, index);
        }
    };
    MonthResourceGroup.prototype.slotRange = function (slot) {
        var ranges = this.dayRanges;
        var rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    };
    MonthResourceGroup.prototype.forEachRange = function (callback) {
        for (var i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    };
    MonthResourceGroup.prototype.cleanRanges = function () {
        this.dayRanges = this.dayRanges.filter(function (r) { return Boolean(r); });
    };
    return MonthResourceGroup;
}());
/**
 * @hidden
 */
var MonthSlotService = /** @class */ (function (_super) {
    __extends(MonthSlotService, _super);
    function MonthSlotService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthSlotService.prototype.layout = function (eventHeight) {
        this.groups.forEach(function (group) {
            return group.forEachRange(function (range) { return range.layout(eventHeight); });
        });
    };
    MonthSlotService.prototype.slotByIndex = function (slotIndex) {
        var _a = slotIndex.split(':').map(function (part) { return parseInt(part, 10); }), resourceIndex = _a[0], rangeIndex = _a[1], index = _a[2];
        return this.groups[resourceIndex].dayRanges[rangeIndex].slots[index];
    };
    MonthSlotService.prototype.forEachSlot = function (callback) {
        this.groups.forEach(function (group) {
            group.dayRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
        });
    };
    MonthSlotService.prototype.createGroup = function (index) {
        return new MonthResourceGroup(index);
    };
    MonthSlotService.prototype.slotByPosition = function (x, y) {
        var range;
        this.groups.find(function (group) {
            range = group.dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
            return range;
        });
        if (range) {
            return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
        }
    };
    MonthSlotService.prototype.dragRanges = function (currentSlot, offset) {
        var start = new Date(currentSlot.start.getTime() - offset.start);
        var end = new Date(currentSlot.start.getTime() + offset.end);
        var group = this.groups[currentSlot.id.resourceIndex];
        var ranges = [];
        group.dayRanges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: start,
            end: end,
            ranges: ranges
        };
    };
    MonthSlotService.prototype.groupSlotByPosition = function (currentSlot, x, y) {
        var range = this.groups[currentSlot.id.resourceIndex].dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
        if (range) {
            return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
        }
    };
    MonthSlotService.prototype.resizeRanges = function (currentSlot, task, resizeStart, offset) {
        var group = this.groups[task.resources[0].leafIdx];
        var ranges = [];
        var startDate = task.start.toUTCDate();
        var endDate = task.end.toUTCDate();
        var start, end;
        if (resizeStart) {
            start = currentSlot.start.getTime() + offset.start;
            if (start > endDate.getTime()) {
                start = new Date(Math.min(dateWithTime(endDate, startDate).getTime(), endDate.getTime()));
            }
            end = endDate;
        }
        else {
            start = startDate;
            end = currentSlot.start.getTime() + offset.end;
            if (end < start.getTime()) {
                end = new Date(Math.max(dateWithTime(startDate, endDate).getTime(), start.getTime()));
            }
        }
        group.dayRanges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: new Date(start),
            end: new Date(end),
            ranges: ranges
        };
    };
    return MonthSlotService;
}(BaseSlotService));

/**
 * @hidden
 */
var BaseViewItem = /** @class */ (function () {
    function BaseViewItem(slotService, localization, focusService, element, renderer) {
        this.slotService = slotService;
        this.localization = localization;
        this.focusService = focusService;
        this.element = element;
        this.renderer = renderer;
        this.className = true;
        this.subs = new Subscription();
    }
    Object.defineProperty(BaseViewItem.prototype, "taskIndex", {
        get: function () {
            return this.item.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "touchAction", {
        get: function () {
            return this.editable && this.editable.drag !== false ? 'none' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "eventTitle", {
        get: function () {
            var startTime = toLocalDate(this.item.startTime);
            var endTime = toLocalDate(this.item.endTime);
            var time = formatEventTime(startTime, endTime, this.item.isAllDay);
            return time + ", " + this.item.event.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "deleteMessage", {
        get: function () {
            return this.localization.get('deleteTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "resizable", {
        get: function () {
            return this.editable && this.editable.resize !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "removable", {
        get: function () {
            return this.editable && this.editable.remove !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "isRecurrence", {
        get: function () {
            return isRecurrence(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "isRecurrenceException", {
        get: function () {
            return isRecurrenceException(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "nativeElement", {
        get: function () {
            if (this.element) {
                return this.element.nativeElement;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseViewItem.prototype.setStyles = function (styles) {
        var element = this.nativeElement;
        if (element) {
            for (var name_1 in styles) {
                if (styles.hasOwnProperty(name_1)) {
                    this.renderer.setStyle(element, name_1, styles[name_1]);
                }
            }
        }
    };
    BaseViewItem.prototype.toggle = function (visible) {
        this.setStyles({ display: visible ? 'block' : 'none' });
    };
    BaseViewItem.prototype.reflow = function () {
        var rect = this.rect;
        if (rect) {
            this.setStyles({
                left: !this.localization.rtl ? rect.left + "px" : '',
                right: this.localization.rtl ? rect.left + "px" : '',
                top: rect.top + "px",
                width: rect.width + "px",
                height: rect.height + "px",
                display: 'block'
            });
        }
    };
    BaseViewItem.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dragHint) {
            return;
        }
        this.subs.add(this.slotService.slotsChange.subscribe(function () {
            _this.rect = null;
            _this.setStyles({
                display: 'none',
                width: 0,
                left: 0
            });
            _this.slotService.unregisterItem(_this, _this.resourceIndex, _this.index);
            if (_this.resourceIndex >= 0) {
                _this.slotService.registerItem(_this);
            }
        }));
    };
    BaseViewItem.prototype.ngOnChanges = function (changes) {
        if (this.dragHint) {
            return;
        }
        if (anyChanged(['resourceIndex', 'index'], changes)) {
            var resourceIndex = changes.resourceIndex, index = changes.index;
            var previousResourceIndex = resourceIndex ? resourceIndex.previousValue : this.resourceIndex;
            var previousIndex = index ? index.previousValue : this.index;
            this.slotService.unregisterItem(this, previousResourceIndex, previousIndex);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
                this.toggle(true);
            }
            else {
                this.toggle(false);
            }
        }
    };
    BaseViewItem.prototype.ngOnDestroy = function () {
        if (this.dragHint) {
            return;
        }
        this.slotService.unregisterItem(this);
        this.subs.unsubscribe();
    };
    BaseViewItem.propDecorators = {
        item: [{ type: Input }],
        resourceIndex: [{ type: Input }],
        index: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        editable: [{ type: Input }],
        dragHint: [{ type: Input }],
        resources: [{ type: Input }],
        className: [{ type: HostBinding, args: ['class.k-event',] }],
        taskIndex: [{ type: HostBinding, args: ['attr.data-task-index',] }],
        touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
        eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
    };
    return BaseViewItem;
}());

/**
 * @hidden
 */
var MonthViewItemComponent = /** @class */ (function (_super) {
    __extends(MonthViewItemComponent, _super);
    function MonthViewItemComponent(slotService, localization, focusService, element, renderer) {
        return _super.call(this, slotService, localization, focusService, element, renderer) || this;
    }
    MonthViewItemComponent.prototype.reflow = function () {
        if (this.item.data[this.resourceIndex].hidden) {
            this.toggle(false);
            return;
        }
        _super.prototype.reflow.call(this);
    };
    MonthViewItemComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[monthViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a *ngIf=\"removable\" href=\"#\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewItemComponent.ctorParameters = function () { return [
        { type: MonthSlotService },
        { type: LocalizationService },
        { type: FocusService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MonthViewItemComponent;
}(BaseViewItem));

/**
 * The component for rendering the **Month** view.
 */
var MonthViewComponent = /** @class */ (function (_super) {
    __extends(MonthViewComponent, _super);
    function MonthViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting.
         */
        _this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`month`).
         */
        _this.name = 'month';
        return _this;
    }
    Object.defineProperty(MonthViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('monthViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthViewComponent.prototype, "viewEventHeight", {
        get: function () {
            return isPresent(this.eventHeight) ? this.eventHeight : (this.schedulerOptions.eventHeight || DEFAULT_EVENT_HEIGHT);
        },
        enumerable: true,
        configurable: true
    });
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-month-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return MonthViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <month-view\n                [eventHeight]=\"viewEventHeight\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [monthDaySlotTemplate]=\"monthDaySlotTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </month-view>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    MonthViewComponent.propDecorators = {
        eventHeight: [{ type: Input }],
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        monthDaySlotTemplate: [{ type: ContentChild, args: [MonthDaySlotTemplateDirective,] }]
    };
    return MonthViewComponent;
}(ConfigurationViewBase));

var last = function (arr) { return arr[arr.length - 1]; };
/**
 * @hidden
 */
var createTasks = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var data = {};
        var startTime = item.start.stripTime().toUTCDate();
        var end = item.end.stripTime();
        var endTime = (item.end.getTime() !== end.getTime() ? end.addDays(1) : end).toUTCDate();
        if (intersects(startTime, endTime, utcStart, utcEnd)) {
            for (var rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
                var range = ranges[rangeIdx];
                var rangeStart = toUTCDate(range[0]);
                var rangeEnd = addUTCDays(toUTCDate(last(range)), 1);
                if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                    var task = {
                        index: index,
                        startTime: startTime,
                        endTime: endTime,
                        start: item.start,
                        end: item.end,
                        event: item.event,
                        isAllDay: item.event.isAllDay,
                        rangeIndex: rangeIdx,
                        data: data
                    };
                    tasks.push(task);
                    task.head = task.endTime > rangeEnd;
                    task.tail = task.startTime < rangeStart;
                }
            }
        }
    }
    return sortTasksByTime(tasks);
};
function clearTaskData(task) {
    var data = task.data;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            delete data[key];
        }
    }
}
/**
 * @hidden
 */
function updateTaskData(tasks) {
    for (var idx = 0; idx < tasks.length; idx++) {
        var task = tasks[idx];
        var resources = task.resources;
        clearTaskData(task);
        for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
            task.data[resources[resourceIdx].leafIdx] = {};
        }
    }
}

/**
 * @hidden
 */
var HintContainerComponent = /** @class */ (function () {
    function HintContainerComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.changeDetector.detach();
    }
    HintContainerComponent.prototype.detectChanges = function () {
        this.changeDetector.detectChanges();
    };
    HintContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-hint-container',
                    template: "\n        <ng-container [ngTemplateOutlet]=\"hintTemplate\">\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    HintContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    HintContainerComponent.propDecorators = {
        hintTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return HintContainerComponent;
}());

var SCROLL_CHANGE = 15;
var MIN_DISTANCE = 60;
var SCROLL_INTERVAL = 50;
var MIN_MOVE_DISTANCE = 10;
/** @hidden */
var BaseView = /** @class */ (function () {
    function BaseView(viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) {
        this.viewContext = viewContext;
        this.viewState = viewState;
        this.intl = intl;
        this.slotService = slotService;
        this.zone = zone;
        this.renderer = renderer;
        this.element = element;
        this.pdfService = pdfService;
        this.localization = localization;
        this.items = new BehaviorSubject(null);
        this.horizontalResources = [];
        this.verticalResources = [];
        this.dragHints = [];
        this.resizeHints = [];
        this.getField = getField;
        this.changes = new BehaviorSubject(null);
        this.subs = new Subscription();
        this.groupedResources = [];
        this.spans = [];
        this.domEvents = [];
        this.resourcesCache = {};
        this.autoHeight = false;
        this.rtl = false;
        this.setSlotClass = this.setSlotClass.bind(this);
        this.setHintClass = this.setHintClass.bind(this);
    }
    Object.defineProperty(BaseView.prototype, "eventTemplateRef", {
        get: function () {
            return this.??ventTemplate || (this.schedulerEventTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseView.prototype, "groupHeaderTemplateRef", {
        get: function () {
            return this.groupHeaderTemplate || (this.schedulerGroupHeaderTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.ngOnInit = function () {
        var _this = this;
        var updateView = this.updateView.bind(this);
        this.resourcesByIndex = this.resourcesByIndex.bind(this);
        this.subs.add(this.viewContext.selectedDate.subscribe(this.onSelectDate.bind(this)));
        this.subs.add(this.viewContext.action.subscribe(this.onAction.bind(this)));
        this.subs.add(this.viewContext.execute.subscribe(this.execute.bind(this)));
        this.subs.add(this.viewContext.resize.subscribe(function () {
            _this.toggleElement(false);
            _this.updateView();
        }));
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
        this.subs.add(this.changes.subscribe(function () {
            _this.toggleElement(false);
        }));
        this.subs.add(combineLatest(this.viewContext.items, this.viewState.dateRange)
            .pipe(map(function (_a) {
            var items = _a[0], dateRange = _a[1];
            return _this.createTasks(items, dateRange);
        }))
            .subscribe(function (tasks) {
            _this.tasks = tasks;
            _this.assignResources();
            _this.onTasksChange();
        }));
        this.subs.add(combineLatest(this.items, this.changes, this.localization.changes).pipe(switchMap(function () { return _this.onStable(); }))
            .subscribe(updateView));
        this.subs.add(this.pdfService.createElement.subscribe(this.createPDFElement.bind(this)));
    };
    BaseView.prototype.ngOnChanges = function (changes) {
        if (anyChanged(['selectedDateFormat', 'selectedShortDateFormat'], changes)) {
            this.viewState.notifyDateRange(this.dateRange(this.selectedDate));
        }
        if (changes.eventHeight) {
            this.changes.next(null);
        }
    };
    BaseView.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.bindEvents();
        this.subs.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
        }));
    };
    BaseView.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
        this.domEvents.forEach(function (unbindHandler) { return unbindHandler(); });
        this.domEvents = [];
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    };
    BaseView.prototype.itemIndex = function (index, _) {
        return index;
    };
    BaseView.prototype.resourcesByIndex = function (index) {
        if (!this.resourcesCache[index]) {
            var resources = this.taskResources;
            var result = [];
            var currentIndex = index;
            for (var idx = 0; idx < resources.length; idx++) {
                var data = resources[idx].data || [];
                var dataIdx = Math.floor(currentIndex / this.spans[idx]);
                result.push(data[dataIdx]);
                currentIndex -= dataIdx * this.spans[idx];
            }
            this.resourcesCache[index] = result;
        }
        return this.resourcesCache[index];
    };
    BaseView.prototype.dragResourcesByIndex = function (index) {
        var allResources = this.resources || [];
        var result = [];
        if (this.groupedResources.length) {
            var resources = this.resourcesByIndex(index).slice(0);
            var taskResources = this.taskResources;
            for (var idx = 0; idx < taskResources.length; idx++) {
                var index_1 = this.resources.indexOf(taskResources[idx]);
                if (index_1 >= 0) {
                    result[index_1] = resources[idx];
                }
            }
        }
        for (var idx = 0; idx < allResources.length; idx++) {
            if (!result[idx]) {
                result[idx] = resourceItemByValue(this.dragging.task.event, allResources[idx]);
            }
        }
        return result;
    };
    BaseView.prototype.getEventClasses = function (item, resources, isAllDay) {
        if (this.eventClass) {
            return this.eventClass({
                event: item.event,
                resources: resources,
                isAllDay: isAllDay
            });
        }
    };
    BaseView.prototype.getEventStyles = function (item, itemResource, isAllDay) {
        var result = { backgroundColor: itemResource.color, borderColor: itemResource.color };
        if (this.eventStyles) {
            Object.assign(result, this.eventStyles({
                event: item.event,
                resources: itemResource.resources,
                isAllDay: isAllDay
            }));
        }
        return result;
    };
    BaseView.prototype.optionsChange = function (options) {
        this.schedulerEventTemplate = options.eventTemplate;
        this.schedulerGroupHeaderTemplate = options.groupHeaderTemplate;
        this.min = options.min;
        this.max = options.max;
        this.editable = options.editable;
        this.timezone = options.timezone;
        if (!options.changes || anyChanged(['group', 'resources'], options.changes, false)) {
            this.group = options.group;
            this.resources = options.resources;
            this.groupResources();
            this.resourcesCache = {};
            if (this.tasks && this.tasks.length) {
                this.assignResources();
                this.onTasksChange();
            }
            this.changes.next(null);
        }
    };
    BaseView.prototype.toggleElement = function (visible) {
        if (this.element) {
            this.renderer.setStyle(this.element.nativeElement, 'display', visible ? 'block' : 'none');
        }
    };
    BaseView.prototype.onStable = function () {
        return this.zone.onStable.asObservable().pipe(take(1));
    };
    BaseView.prototype.updateView = function () {
        this.slotService.invalidate();
        this.toggleElement(true);
        this.reflow();
        this.viewState.notifyLayoutEnd();
    };
    BaseView.prototype.assignResources = function () {
        assignTasksResources(this.tasks, {
            taskResources: this.taskResources,
            hasGroups: this.groupedResources.length > 0,
            allResources: this.resources,
            spans: this.spans
        });
    };
    BaseView.prototype.bindEvents = function () {
        var _this = this;
        var contentElement = this.content.nativeElement;
        var element = this.element.nativeElement;
        this.zone.runOutsideAngular(function () {
            if (_this.times) {
                _this.subs.add(merge(fromEvent(_this.times.nativeElement, 'mousewheel'), fromEvent(_this.times.nativeElement, 'DOMMouseScroll')).pipe(filter(function (event) { return !event.ctrlKey; }), tap(preventLockedScroll(contentElement)), map(wheelDeltaY))
                    .subscribe(function (x) { return contentElement.scrollTop -= x; }));
            }
            _this.subs.add(merge(fromClick(contentElement), fromEvent(contentElement, 'contextmenu'))
                .subscribe(function (e) { return _this.onClick(e); }));
            _this.subs.add(fromDoubleClick(contentElement)
                .subscribe(function (e) { return _this.onClick(e, 'dblclick'); }));
            _this.subs.add(fromEvent(element, 'keydown')
                .subscribe(function (e) { return _this.onKeydown(e); }));
            _this.domEvents.push(_this.renderer.listen(contentElement, 'scroll', function () {
                if (_this.headerWrap) {
                    _this.headerWrap.nativeElement.scrollLeft = contentElement.scrollLeft;
                }
                if (_this.times) {
                    _this.times.nativeElement.scrollTop = contentElement.scrollTop;
                }
            }));
            _this.draggable = new Draggable({
                press: _this.onPress.bind(_this),
                drag: _this.onDrag.bind(_this),
                release: _this.onRelease.bind(_this)
            });
            _this.draggable.bindTo(element);
        });
    };
    BaseView.prototype.onPress = function (args) {
        var resizable = this.editable && this.editable.resize !== false;
        var draggable = this.editable && this.editable.drag !== false;
        var target = args.originalEvent.target;
        if (hasClasses(target, 'k-resize-handle')) {
            if (!resizable) {
                return;
            }
            this.initResize(args);
        }
        else if (draggable) {
            var task = this.targetTask(target);
            if (task) {
                if (!args.isTouch) {
                    args.originalEvent.preventDefault();
                }
                this.pressLocation = { x: args.pageX, y: args.pageY };
                this.pressTarget = task;
            }
        }
        this.dragArgs = args;
    };
    BaseView.prototype.onDrag = function (args) {
        if (this.resizing) {
            this.resize(args);
            this.scrollContainer(this.resize, args);
        }
        else {
            this.initDrag(args);
            if (this.dragging) {
                this.drag(args);
                args.originalEvent.preventDefault();
                this.scrollContainer(this.drag, args);
            }
        }
        this.dragArgs = args;
    };
    BaseView.prototype.onRelease = function () {
        clearInterval(this.scrollInterval);
        var _a = this, resizing = _a.resizing, dragging = _a.dragging;
        if (resizing) {
            this.emitEvent('resizeEnd', {
                event: resizing.task.event,
                dataItem: resizing.task.event.dataItem,
                start: this.convertDate(resizing.start),
                end: this.convertDate(resizing.end)
            });
            this.resizeHints = [];
        }
        if (dragging) {
            this.emitEvent('dragEnd', {
                event: dragging.task.event,
                dataItem: dragging.task.event.dataItem,
                start: dragging.start ? this.convertDate(dragging.start) : dragging.task.start.toLocalDate(),
                end: dragging.end ? this.convertDate(dragging.end) : dragging.task.end.toLocalDate(),
                resources: dragging.resources,
                isAllDay: this.draggedIsAllDay(dragging.task, dragging.slot)
            });
            this.dragHints = [];
        }
        if (resizing || dragging) {
            this.removeSlotClass();
            this.updateHintContainer();
            this.resizing = null;
            this.dragging = null;
        }
        this.container = null;
        this.dragArgs = null;
        this.pressLocation = null;
        this.pressTarget = null;
    };
    BaseView.prototype.setHintClass = function (className) {
        (this.dragging || this.resizing).hintClass = className;
    };
    BaseView.prototype.updateHintClass = function () {
        var current = this.dragging || this.resizing;
        var update = false;
        this.hints.forEach(function (hint) {
            if (hint.class !== current.hintClass) {
                hint.class = current.hintClass;
                update = true;
            }
        });
        if (update) {
            this.updateHintContainer();
        }
    };
    BaseView.prototype.removeHintClass = function () {
        (this.dragging || this.resizing).hintClass = null;
    };
    BaseView.prototype.setSlotClass = function (className) {
        var current = this.dragging || this.resizing;
        current.slotClass = className;
        this.renderer.addClass(current.slot.nativeElement, current.slotClass);
    };
    BaseView.prototype.removeSlotClass = function () {
        var current = this.dragging || this.resizing;
        if (current.slotClass) {
            this.renderer.removeClass(current.slot.nativeElement, current.slotClass);
            current.slotClass = null;
        }
    };
    Object.defineProperty(BaseView.prototype, "hints", {
        get: function () {
            return this.dragging ? this.dragHints : this.resizeHints;
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.initDrag = function (args) {
        if (!this.dragging && this.pressLocation && pointDistance(this.pressLocation.x, this.pressLocation.y, args.pageX, args.pageY) >= MIN_MOVE_DISTANCE) {
            var dragging = this.pressTarget;
            var task = dragging.task;
            if (this.emitEvent('dragStart', { event: task.event, dataItem: task.event.dataItem })) {
                this.pressLocation = null;
                this.pressTarget = null;
                return;
            }
            this.dragging = dragging;
            this.updateDragContainer(args);
            var _a = this.coordinatesOffset(this.pressLocation.x, this.pressLocation.y), x = _a.x, y = _a.y;
            var slot = this.slotByPosition(x, y, this.container);
            this.dragging.offset = {
                start: slot.start.getTime() - task.start.toUTCDate().getTime(),
                end: task.end.toUTCDate().getTime() - slot.start.getTime()
            };
            this.dragging.slot = slot;
            this.dragging.startResources = this.dragging.resourceItems = this.dragResourcesByIndex(slot.id.resourceIndex);
            this.dragging.resources = this.resourceValues(task, this.dragging.startResources);
        }
    };
    BaseView.prototype.updateDragContainer = function (args) {
        if (!this.container) {
            this.container = this.content.nativeElement;
            this.containerOffset = elementOffset(this.container);
        }
    };
    BaseView.prototype.drag = function (args) {
        this.updateDragContainer(args);
        if (!this.container) {
            return;
        }
        var _a = this.coordinatesOffset(args.pageX, args.pageY), x = _a.x, y = _a.y;
        var slot = this.slotByPosition(x, y, this.container);
        if (slot && (slot !== this.dragging.slot || !this.dragHints.length)) {
            var dragging = this.dragging;
            var currentSlot = dragging.slot, task = dragging.task;
            var _b = this.dragRanges(slot), ranges = _b.ranges, start = _b.start, end = _b.end, isAllDay = _b.isAllDay;
            var resourceItems = void 0, resourceValues = void 0;
            if (currentSlot.id.resourceIndex !== slot.id.resourceIndex) {
                resourceItems = this.dragResourcesByIndex(slot.id.resourceIndex);
                resourceValues = this.resourceValues(task, resourceItems);
            }
            else {
                resourceItems = dragging.resourceItems;
                resourceValues = dragging.resources;
            }
            this.removeSlotClass();
            dragging.start = start;
            dragging.end = end;
            dragging.slot = slot;
            dragging.resources = resourceValues;
            dragging.resourceItems = resourceItems;
            dragging.hintClass = null;
            if (this.emitEvent('drag', {
                event: task.event,
                dataItem: task.event.dataItem,
                start: this.convertDate(start),
                end: this.convertDate(end),
                resources: resourceValues,
                isAllDay: isAllDay,
                setHintClass: this.setHintClass,
                setSlotClass: this.setSlotClass
            })) {
                this.updateHintClass();
                return;
            }
            var color = this.dragResourceColor(task, resourceItems);
            var hintClasses = this.dragHintClasses();
            this.dragHints = [];
            for (var idx = 0; idx < ranges.length; idx++) {
                var slots = ranges[idx];
                var first = slots[0];
                var last = slots[slots.length - 1];
                var size = this.dragHintSize(first, last);
                var origin = first.rect.left;
                var styles = {
                    top: toPx(first.rect.top),
                    left: this.localization.rtl ? '' : toPx(origin),
                    right: !this.localization.rtl ? '' : toPx(origin),
                    width: size.width,
                    height: size.height,
                    backgroundColor: color,
                    borderColor: color
                };
                if (this.eventStyles) {
                    Object.assign(styles, this.eventStyles(this.dragHintEventStyleArgs()));
                }
                this.dragHints.push({
                    item: Object.assign({}, this.dragging.task, {
                        startTime: start,
                        endTime: end
                    }),
                    resources: resourceItems,
                    class: hintClasses,
                    style: styles
                });
            }
            this.updateHintContainer();
        }
    };
    BaseView.prototype.dragHintClasses = function () {
        var hintClass = this.dragging.hintClass;
        var result = [];
        if (hintClass) {
            result.push(hintClass);
        }
        if (this.eventClass) {
            var eventClass = this.eventClass(this.dragHintEventStyleArgs());
            result = result.concat(convertNgClassBindings(eventClass));
        }
        return result;
    };
    BaseView.prototype.dragHintEventStyleArgs = function () {
        return {
            event: this.dragging.task.event,
            resources: this.dragging.resourceItems
        };
    };
    BaseView.prototype.draggedIsAllDay = function (task, _slot) {
        return Boolean(task.event.isAllDay);
    };
    BaseView.prototype.dragResourceColor = function (task, slotResources) {
        if (this.groupedResources.length) {
            var index = this.resources.indexOf(this.groupedResources[0]);
            return getField(slotResources[index], this.groupedResources[0].colorField);
        }
        else if (this.resources && this.resources.length) {
            return task.resources[0].color;
        }
        return '';
    };
    BaseView.prototype.resourceValues = function (task, currentResources) {
        var result = {};
        for (var idx = 0; idx < currentResources.length; idx++) {
            var resource = this.resources[idx];
            var resourceItem = currentResources[idx];
            var value = void 0;
            if (Array.isArray(resourceItem)) { // not grouped multiple resource
                value = getField(task.event, resource.field);
            }
            else {
                value = getField(currentResources[idx], resource.valueField);
                if (resource.multiple) {
                    var startValue = getField(this.dragging.startResources[idx], resource.valueField);
                    if (startValue !== value) {
                        value = [value];
                    }
                    else {
                        value = getField(task.event.dataItem, resource.field);
                    }
                }
            }
            setField(result, resource.field, value);
        }
        return result;
    };
    BaseView.prototype.initResize = function (args) {
        args.originalEvent.preventDefault();
        var target = args.originalEvent.target;
        var resizing = this.targetTask(target);
        if (this.emitEvent('resizeStart', { event: resizing.task.event, dataItem: resizing.task.event.dataItem })) {
            return;
        }
        this.resizing = resizing;
        resizing.start = resizing.task.start.toUTCDate();
        resizing.end = resizing.task.end.toUTCDate();
        if (hasClasses(target, 'k-resize-n')) {
            resizing.direction = 'n';
        }
        else if (hasClasses(target, 'k-resize-s')) {
            resizing.direction = 's';
        }
        else if (hasClasses(target, 'k-resize-w')) {
            resizing.direction = 'w';
        }
        else {
            resizing.direction = 'e';
        }
        this.updateDragContainer(args);
        var _a = this.coordinatesOffset(args.pageX, args.pageY), x = _a.x, y = _a.y;
        resizing.slot = this.slotByPosition(x, y, this.container);
        resizing.offset = {
            start: resizing.task.start.toUTCDate().getTime() - resizing.slot.start.getTime(),
            end: resizing.task.end.toUTCDate().getTime() - resizing.slot.start.getTime()
        };
    };
    BaseView.prototype.resize = function (args) {
        var _a = this.coordinatesOffset(args.pageX, args.pageY), x = _a.x, y = _a.y;
        var resizing = this.resizing;
        var direction = resizing.direction, task = resizing.task, offset = resizing.offset;
        var slot = this.slotService.groupSlotByPosition(resizing.slot, x, y);
        if (!slot || slot === resizing.slot) {
            return;
        }
        this.removeSlotClass();
        var _b = this.slotService.resizeRanges(slot, task, direction === 'w' || direction === 'n', offset), start = _b.start, end = _b.end, ranges = _b.ranges;
        resizing.hintClass = null;
        resizing.start = start;
        resizing.end = end;
        resizing.slot = slot;
        if (this.emitEvent('resize', {
            event: task.event,
            dataItem: task.event.dataItem,
            start: this.convertDate(start),
            end: this.convertDate(end),
            setHintClass: this.setHintClass,
            setSlotClass: this.setSlotClass
        })) {
            this.updateHintClass();
            return;
        }
        this.updateResizeHints(ranges, start, end);
        this.updateHintContainer();
    };
    BaseView.prototype.updateResizeHints = function (ranges, start, end) {
        var resizing = this.resizing;
        var direction = resizing.direction;
        var horizontal = direction === 'w' || direction === 'e';
        var resizeStart = direction === 'w' || direction === 'n';
        this.resizeHints = [];
        for (var idx = 0; idx < ranges.length; idx++) {
            var range = ranges[idx];
            var firstSlot = range[0];
            var lastSlot = range[range.length - 1];
            var first = idx === 0;
            var last = idx === ranges.length - 1;
            this.resizeHints.push({
                first: first,
                last: last,
                rect: {
                    left: firstSlot.rect.left,
                    top: firstSlot.top,
                    height: horizontal ? firstSlot.height : Math.abs(lastSlot.rect.top - firstSlot.rect.top) + lastSlot.rect.height,
                    width: horizontal ? Math.abs(lastSlot.rect.left - firstSlot.rect.left) + lastSlot.rect.width : firstSlot.width
                },
                start: first && !resizeStart ? resizing.start : firstSlot.start,
                end: last && resizeStart ? resizing.end : lastSlot.end,
                class: resizing.hintClass
            });
        }
    };
    BaseView.prototype.coordinatesOffset = function (x, y, container, offset) {
        if (container === void 0) { container = this.container; }
        if (offset === void 0) { offset = this.containerOffset; }
        var position = x - offset.left + container.scrollLeft;
        return {
            x: !this.localization.rtl ? position : this.slotService.containerSize - position,
            y: y - offset.top + container.scrollTop
        };
    };
    BaseView.prototype.scrollContainer = function (callback, args) {
        var _this = this;
        clearInterval(this.scrollInterval);
        var container = this.container;
        if (!container) {
            return;
        }
        var viewPortY = args.pageY - this.containerOffset.top;
        var pointerYDistance = Math.abs(container.offsetHeight - viewPortY);
        var deltaY = args.pageY - this.dragArgs.pageY;
        var viewPortX = args.pageX - this.containerOffset.left;
        var pointerXDistance = Math.abs(container.offsetWidth - viewPortX);
        var deltaX = args.pageX - this.dragArgs.pageX;
        var scroll = false;
        var leftChange = 0;
        var topChange = 0;
        if (pointerYDistance < MIN_DISTANCE && container.scrollTop + container.offsetHeight < container.scrollHeight && deltaY > 0) {
            scroll = true;
            topChange = SCROLL_CHANGE;
            this.container.scrollTop += MIN_DISTANCE - pointerYDistance;
        }
        else if (viewPortY < MIN_DISTANCE && container.scrollTop > 0 && deltaY < 0) {
            scroll = true;
            topChange = -SCROLL_CHANGE;
            this.container.scrollTop -= MIN_DISTANCE - viewPortY;
        }
        if (pointerXDistance < MIN_DISTANCE && container.scrollLeft + container.offsetWidth < container.scrollWidth && deltaX > 0) {
            scroll = true;
            leftChange = SCROLL_CHANGE;
            this.container.scrollLeft += MIN_DISTANCE - pointerXDistance;
        }
        else if (viewPortX < MIN_DISTANCE && container.scrollLeft > 0 && deltaY < 0) {
            scroll = true;
            leftChange = -SCROLL_CHANGE;
            this.container.scrollLeft -= MIN_DISTANCE - viewPortX;
        }
        if (scroll) {
            this.scrollInterval = setInterval(function () {
                if (_this.container) {
                    _this.container.scrollLeft += leftChange;
                    _this.container.scrollTop += topChange;
                    callback.call(_this, args);
                }
                else {
                    clearInterval(_this.scrollInterval);
                }
            }, SCROLL_INTERVAL);
        }
    };
    BaseView.prototype.emitEvent = function (name, args) {
        this.viewState.emitEvent(name, args);
        return args.prevented;
    };
    BaseView.prototype.targetTask = function (target) {
        var eventTarget = closestInScope(target, function (node) { return node.hasAttribute('data-task-index'); }, this.element.nativeElement);
        if (eventTarget) {
            var index_2 = parseInt(eventTarget.getAttribute('data-task-index'), 10);
            return {
                target: eventTarget,
                task: this.tasks.find(function (t) { return t.index === index_2; })
            };
        }
    };
    BaseView.prototype.updateHintContainer = function () {
        if (this.hintContainer) {
            this.hintContainer.detectChanges();
        }
    };
    /**
     * Converts a "view date" (date stored in the UTC parts of a Date object) to a local date.
     */
    BaseView.prototype.convertDate = function (date) {
        return ZonedDate.fromUTCDate(date, this.timezone).toLocalDate();
    };
    BaseView.prototype.onClick = function (e, eventType) {
        if (eventType === void 0) { eventType = e.type; }
        this.emitSlotEvent(e, eventType);
        this.emitTaskEvent(e, eventType);
    };
    BaseView.prototype.emitSlotEvent = function (e, eventType) {
        var targetSlot = closestInScope(e.target, function (node) { return node.hasAttribute('data-slot-index'); }, this.element.nativeElement);
        if (targetSlot) {
            var slotIndex = targetSlot.getAttribute('data-slot-index');
            var name_1 = eventType === 'dblclick' ? 'slotDblClick' : 'slotClick';
            var slot = this.slotByIndex(slotIndex, e);
            this.viewState.emitEvent(name_1, {
                type: eventType,
                slot: slot,
                start: this.convertDate(slot.start),
                end: this.convertDate(slot.end),
                isAllDay: slot.isDaySlot,
                originalEvent: e,
                resources: this.resources && this.resources.length ?
                    this.resourcesByIndex(slot.id.resourceIndex) : []
            });
        }
    };
    BaseView.prototype.emitTaskEvent = function (e, eventType) {
        var targetTask = this.targetTask(e.target);
        if (targetTask) {
            var task = targetTask.task;
            var isSingle = eventType === 'click';
            var isDouble = eventType === 'dblclick';
            if (isSingle && closestInScope(e.target, function (node) { return hasClasses(node, 'k-event-delete'); }, targetTask.target)) {
                e.preventDefault();
                this.viewState.emitEvent('remove', { event: task.event, dataItem: task.event.dataItem });
            }
            else {
                var name_2 = isDouble ? 'eventDblClick' : 'eventClick';
                this.viewState.emitEvent(name_2, { type: eventType, event: task.event, originalEvent: e });
                targetTask.target.focus();
            }
        }
    };
    BaseView.prototype.onKeydown = function (e) {
        var targetTask = this.targetTask(e.target);
        if (targetTask) {
            var task = targetTask.task;
            this.viewState.emitEvent('eventKeydown', { event: task.event, dataItem: task.event.dataItem, originalEvent: e });
        }
    };
    BaseView.prototype.syncTables = function () {
        if (this.timesTable) {
            this.renderer.setStyle(this.timesTable.nativeElement, 'height', this.contentTable.nativeElement.offsetHeight + "px");
        }
        if (this.header) {
            this.renderer.setStyle(this.header.nativeElement, !this.localization.rtl ? 'padding-right' : 'padding-left', (hasScrollbar(this.content.nativeElement, 'vertical') ? scrollbarWidth() - BORDER_WIDTH : 0) + "px");
            this.renderer.setStyle(this.header.nativeElement, this.localization.rtl ? 'padding-right' : 'padding-left', '0px');
        }
        if (this.times) {
            var times = this.times.nativeElement;
            this.timesHeader.nativeElement.style.width = times.offsetWidth + "px";
            var contentHeight = this.contentHeight === 'auto' ? this.content.nativeElement.offsetHeight : this.contentHeight;
            this.renderer.setStyle(times, 'height', contentHeight - (hasScrollbar(this.content.nativeElement, 'horizontal') ? scrollbarWidth() : 0) + "px");
        }
    };
    BaseView.prototype.updateContentHeight = function () {
        var element = this.element.nativeElement;
        var parent = element.parentNode;
        var content = this.content.nativeElement;
        var autoHeight = this.autoHeight || !parent.style.height;
        var scrollLeft = content.scrollLeft;
        var scrollTop = content.scrollTop;
        this.renderer.setStyle(content, 'height', '');
        if (this.times) {
            this.renderer.setStyle(this.times.nativeElement, 'height', '');
        }
        if (autoHeight) {
            this.contentHeight = 'auto';
            return;
        }
        var height = parent.clientHeight;
        for (var idx = 0; idx < parent.children.length; idx++) {
            var child = parent.children[idx];
            if (child !== element && !ignoreContentChild(child)) {
                height -= child.offsetHeight;
            }
        }
        height -= this.headerWrap ? this.headerWrap.nativeElement.offsetHeight : 0;
        this.renderer.setStyle(content, 'height', height + "px");
        this.contentHeight = height;
        content.scrollLeft = scrollLeft;
        content.scrollTop = scrollTop;
    };
    BaseView.prototype.groupResources = function () {
        var resources = this.resources || [];
        var group = this.group || {};
        this.groupedResources = groupResources(group, resources);
        if (group.orientation !== 'vertical') {
            this.horizontalResources = this.groupedResources;
            this.verticalResources = [];
        }
        else {
            this.verticalResources = this.groupedResources;
            this.horizontalResources = [];
        }
        this.spans = this.resourceSpans();
    };
    Object.defineProperty(BaseView.prototype, "taskResources", {
        get: function () {
            if (this.groupedResources.length) {
                return this.groupedResources;
            }
            else if (this.resources && this.resources.length) {
                return [this.resources[0]];
            }
            else {
                return [{}];
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.resourceSpans = function () {
        var spans = [1];
        var resources = this.groupedResources;
        var span = 1;
        for (var idx = resources.length - 1; idx > 0; idx--) {
            span *= ((resources[idx].data || []).length || 1);
            spans.unshift(span);
        }
        return spans;
    };
    BaseView.prototype.isInRange = function (date) {
        var dateRange = this.dateRange(date);
        return (!this.min || this.min < dateRange.end) && (!this.max || dateRange.start <= this.max);
    };
    BaseView.prototype.createPDFElement = function () {
        var contentHeight = this.contentHeight;
        if (contentHeight !== 'auto') {
            this.autoHeight = true;
            this.updateView();
        }
        var element = this.element.nativeElement.cloneNode(true);
        element.style.width = this.pdfWidth() + "px";
        if (contentHeight !== 'auto') {
            this.autoHeight = false;
            this.updateView();
        }
        this.pdfService.elementReady.emit({
            element: element
        });
    };
    BaseView.prototype.pdfWidth = function () {
        return this.element.nativeElement.offsetWidth;
    };
    BaseView.prototype.containerByPosition = function (_a) {
        var x = _a.x, y = _a.y;
        var content = this.content.nativeElement;
        var offset = elementOffset(content);
        if (offset.top <= y && y <= offset.top + offset.height && offset.left <= x && x <= offset.left + offset.width) {
            return {
                element: content,
                offset: offset
            };
        }
    };
    BaseView.prototype.execute = function (e) {
        if (e.name === 'slotByPosition') {
            var container = this.containerByPosition(e.args);
            if (container) {
                var offset = this.coordinatesOffset(e.args.x, e.args.y, container.element, container.offset);
                var slot = this.slotByPosition(offset.x, offset.y, container.element);
                e.result(this.slotFields(slot));
            }
        }
        else if (e.name === 'eventFromElement') {
            var target = this.targetTask(e.args.element);
            if (target) {
                e.result(target.task.event);
            }
        }
    };
    BaseView.prototype.slotFields = function (slot) {
        return {
            element: slot.element,
            resources: this.groupedResources.length ? this.resourcesByIndex(slot.id.resourceIndex) : [],
            start: this.convertDate(slot.start),
            end: this.convertDate(slot.end)
        };
    };
    BaseView.propDecorators = {
        ??ventTemplate: [{ type: Input }],
        groupHeaderTemplate: [{ type: Input }],
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        eventHeight: [{ type: Input }],
        slotClass: [{ type: Input }],
        eventClass: [{ type: Input }],
        eventStyles: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content',] }],
        header: [{ type: ViewChild, args: ['header',] }],
        contentTable: [{ type: ViewChild, args: ['contentTable',] }],
        times: [{ type: ViewChild, args: ['times',] }],
        timesHeader: [{ type: ViewChild, args: ['timesHeader',] }],
        timesTable: [{ type: ViewChild, args: ['timesTable',] }],
        headerWrap: [{ type: ViewChild, args: ['headerWrap',] }],
        hintContainer: [{ type: ViewChild, args: ['hintContainer',] }]
    };
    return BaseView;
}());

var DAYS_IN_WEEK_COUNT = 7;
var WEEKS_COUNT = 6;
/**
 * @hidden
 */
var MonthViewRendererComponent = /** @class */ (function (_super) {
    __extends(MonthViewRendererComponent, _super);
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

/**
 * @hidden
 */
var BaseSlotDirective = /** @class */ (function () {
    function BaseSlotDirective(element, slotService, localization) {
        this.element = element;
        this.slotService = slotService;
        this.localization = localization;
        this._rect = null;
    }
    Object.defineProperty(BaseSlotDirective.prototype, "slotIndex", {
        get: function () {
            return this.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "rect", {
        get: function () {
            if (this._rect) {
                return this._rect;
            }
            var el = this.nativeElement;
            this._rect = {
                left: !this.localization.rtl ? el.offsetLeft : this.slotService.containerSize - (el.offsetLeft + el.clientWidth),
                top: el.offsetTop,
                width: el.clientWidth,
                height: el.clientHeight
            };
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "top", {
        get: function () {
            return this.element ? this.nativeElement.offsetTop : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "padding", {
        get: function () {
            if (!this.element || !isDocumentAvailable()) {
                return 0;
            }
            return parseInt(window.getComputedStyle(this.nativeElement).paddingTop, 10) * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "height", {
        get: function () {
            return this.element ? this.nativeElement.offsetHeight : 0;
        },
        set: function (value) {
            if (this.element) {
                this.nativeElement.style.height = value + "px";
            }
            if (this._rect) {
                this._rect.height = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "width", {
        get: function () {
            return this.element ? this.nativeElement.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "key", {
        get: function () {
            return this.id.resourceIndex + ":" + this.id.rangeIndex + ":" + this.id.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "nativeElement", {
        get: function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    BaseSlotDirective.prototype.ngOnInit = function () {
        this.slotService.registerSlot(this);
    };
    BaseSlotDirective.prototype.ngOnDestroy = function () {
        this.slotService.unregisterSlot(this);
    };
    BaseSlotDirective.prototype.invalidate = function () {
        this._rect = null;
    };
    BaseSlotDirective.propDecorators = {
        id: [{ type: Input }],
        slotIndex: [{ type: HostBinding, args: ['attr.data-slot-index',] }]
    };
    return BaseSlotDirective;
}());

/**
 * @hidden
 */
var MonthSlotDirective = /** @class */ (function (_super) {
    __extends(MonthSlotDirective, _super);
    function MonthSlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = true;
        _this._linkHeight = null;
        return _this;
    }
    Object.defineProperty(MonthSlotDirective.prototype, "start", {
        get: function () {
            return this.startDate;
        },
        set: function (value) {
            this.startDate = toUTCDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "end", {
        get: function () {
            return addUTCDays(this.start, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "linkHeight", {
        get: function () {
            if (this._linkHeight === null) {
                var element = firstElementChild(this.nativeElement);
                this._linkHeight = element ? element.offsetHeight + element.offsetTop : 0;
            }
            return this._linkHeight;
        },
        enumerable: true,
        configurable: true
    });
    MonthSlotDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.showMore = function (rect) {
        if (!this.showMoreElement) {
            var element = this.showMoreElement = document.createElement('div');
            element.innerHTML = '<span>...</span>';
            element.className = 'k-more-events k-button';
            element.style.width = rect.width + "px";
            element.style.left = rect.left + "px";
            element.style.top = rect.top + "px";
            this.nativeElement.appendChild(element);
        }
    };
    MonthSlotDirective.prototype.hideMore = function () {
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.invalidate = function () {
        _super.prototype.invalidate.call(this);
        this._linkHeight = null;
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.removeShowMore = function () {
        if (this.showMoreElement) {
            this.showMoreElement.parentNode.removeChild(this.showMoreElement);
            this.showMoreElement = null;
        }
    };
    MonthSlotDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[monthSlot]'
                },] },
    ];
    /** @nocollapse */
    MonthSlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MonthSlotService },
        { type: LocalizationService }
    ]; };
    MonthSlotDirective.propDecorators = {
        start: [{ type: Input }]
    };
    return MonthSlotDirective;
}(BaseSlotDirective));

/**
 * @hidden
 */
var ViewFooterComponent = /** @class */ (function () {
    function ViewFooterComponent() {
        this.hostClasses = true;
        this.itemClick = new EventEmitter();
    }
    ViewFooterComponent.prototype.onItemClick = function (e, item) {
        e.preventDefault();
        this.itemClick.emit(item);
    };
    ViewFooterComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[viewFooter]',
                    template: "\n        <ul class=\"k-reset k-header\">\n            <li class=\"k-state-default\" *ngFor=\"let item of items\" [ngClass]=\"item.cssClass\" (click)=\"onItemClick($event, item)\">\n                <a href=\"#\" class=\"k-link\" tabindex=\"-1\">\n                    <span class=\"k-icon\" [ngClass]=\"item.iconClass\"></span>\n                    {{ item.text }}\n                </a>\n            </li>\n        </ul>\n    "
                },] },
    ];
    ViewFooterComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-scheduler-footer',] }],
        itemClick: [{ type: Output }],
        items: [{ type: Input }]
    };
    return ViewFooterComponent;
}());

/**
 * @hidden
 */
var WorkHoursFooterDirective = /** @class */ (function () {
    function WorkHoursFooterDirective(footer, localization) {
        this.footer = footer;
        this.localization = localization;
        this.showWorkHours = false;
        this.footerItems = [{ cssClass: 'k-scheduler-fullday', iconClass: 'k-i-clock', text: '' }];
    }
    WorkHoursFooterDirective.prototype.ngOnInit = function () {
        this.toggleWorkHours();
        this.footer.items = this.footerItems;
    };
    WorkHoursFooterDirective.prototype.ngOnChanges = function () {
        this.toggleWorkHours();
    };
    WorkHoursFooterDirective.prototype.toggleWorkHours = function () {
        this.footerItems[0].text = this.showWorkHours ? this.localization.get('showFullDay') : this.localization.get('showWorkDay');
    };
    WorkHoursFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoWorkHoursFooter]'
                },] },
    ];
    /** @nocollapse */
    WorkHoursFooterDirective.ctorParameters = function () { return [
        { type: ViewFooterComponent },
        { type: LocalizationService }
    ]; };
    WorkHoursFooterDirective.propDecorators = {
        showWorkHours: [{ type: Input }]
    };
    return WorkHoursFooterDirective;
}());

var NumberIterator = /** @class */ (function () {
    function NumberIterator(count) {
        this.count = count;
    }
    NumberIterator.prototype[iterator] = function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < this.count)) return [3 /*break*/, 4];
                    return [4 /*yield*/, i];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    return NumberIterator;
}());
/**
 * @hidden
 */
var RepeatPipe = /** @class */ (function () {
    function RepeatPipe() {
    }
    RepeatPipe.prototype.transform = function (value) {
        return new NumberIterator(value);
    };
    RepeatPipe.decorators = [
        { type: Pipe, args: [{
                    // tslint:disable-next-line:pipe-naming
                    name: 'repeat'
                },] },
    ];
    return RepeatPipe;
}());

var ResourceIterator = /** @class */ (function () {
    function ResourceIterator(resources, lastIndex) {
        if (lastIndex === void 0) { lastIndex = resources.length - 1; }
        this.resources = resources;
        this.lastIndex = lastIndex;
    }
    ResourceIterator.prototype[iterator] = function () {
        var resources, lastIndex, lastData, length, count, idx, idx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resources = this.resources;
                    lastIndex = Math.max(0, this.lastIndex);
                    if (!(resources && resources.length)) {
                        resources = [{}];
                    }
                    lastData = resources[lastIndex].data || [];
                    length = lastData.length;
                    count = 1;
                    for (idx = 0; idx <= lastIndex; idx++) {
                        count *= (resources[idx].data || []).length || 1;
                    }
                    idx = 0;
                    _a.label = 1;
                case 1:
                    if (!(idx < count)) return [3 /*break*/, 4];
                    return [4 /*yield*/, lastData[idx % length]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    idx++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    return ResourceIterator;
}());
/**
 * @hidden
 */
var ResourceIteratorPipe = /** @class */ (function () {
    function ResourceIteratorPipe() {
    }
    ResourceIteratorPipe.prototype.transform = function (resources, lastIndex) {
        if (resources === void 0) { resources = []; }
        return new ResourceIterator(resources, lastIndex);
    };
    ResourceIteratorPipe.decorators = [
        { type: Pipe, args: [{
                    // tslint:disable-next-line:pipe-naming
                    name: 'resourceIterator'
                },] },
    ];
    return ResourceIteratorPipe;
}());

/**
 * @hidden
 */
var ResizeHintComponent = /** @class */ (function () {
    function ResizeHintComponent() {
        this.marqueeClasses = true;
    }
    Object.defineProperty(ResizeHintComponent.prototype, "left", {
        get: function () {
            return this.hint.rect.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "top", {
        get: function () {
            return this.hint.rect.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "width", {
        get: function () {
            return this.hint.rect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "height", {
        get: function () {
            return this.hint.rect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "start", {
        get: function () {
            return toLocalDate(this.hint.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "end", {
        get: function () {
            return toLocalDate(this.hint.end);
        },
        enumerable: true,
        configurable: true
    });
    ResizeHintComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoResizeHint]',
                    template: "\n        <div class=\"k-marquee-color\"></div>\n        <div class=\"k-marquee-text\">\n            <div class=\"k-label-top\" *ngIf=\"hint.first\">{{ start | kendoDate : format }}</div>\n            <div class=\"k-label-bottom\" *ngIf=\"hint.last\">{{ end | kendoDate : format }}</div>\n        </div>\n    "
                },] },
    ];
    ResizeHintComponent.propDecorators = {
        hint: [{ type: Input }],
        format: [{ type: Input }],
        marqueeClasses: [{ type: HostBinding, args: ['class.k-marquee',] }, { type: HostBinding, args: ['class.k-scheduler-marquee',] }, { type: HostBinding, args: ['class.k-first',] }, { type: HostBinding, args: ['class.k-last',] }],
        left: [{ type: HostBinding, args: ['style.left.px',] }, { type: HostBinding, args: ['style.right.px',] }],
        top: [{ type: HostBinding, args: ['style.top.px',] }],
        width: [{ type: HostBinding, args: ['style.width.px',] }],
        height: [{ type: HostBinding, args: ['style.height.px',] }]
    };
    return ResizeHintComponent;
}());

var DECLARATIONS = [
    ViewFooterComponent,
    WorkHoursFooterDirective,
    RepeatPipe,
    ResourceIteratorPipe,
    HintContainerComponent,
    ResizeHintComponent
];
/**
 * @hidden
 */
var ViewsSharedModule = /** @class */ (function () {
    function ViewsSharedModule() {
    }
    ViewsSharedModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, IntlModule, SharedModule],
                    exports: [
                        DECLARATIONS,
                        IntlModule,
                        CommonModule,
                        SharedModule
                    ],
                    declarations: [
                        DECLARATIONS
                    ]
                },] },
    ];
    return ViewsSharedModule;
}());

/**
 * @hidden
 */
var MonthViewModule = /** @class */ (function () {
    function MonthViewModule() {
    }
    MonthViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ViewsSharedModule
                    ],
                    exports: [
                        MonthViewComponent
                    ],
                    declarations: [
                        MonthViewComponent,
                        MonthViewRendererComponent,
                        MonthViewItemComponent,
                        MonthSlotDirective
                    ]
                },] },
    ];
    return MonthViewModule;
}());

var EVENT_HEIGHT = 'eventHeight';
var SHOW_WORK_HOURS = 'showWorkHours';
var START_TIME = 'startTime';
var END_TIME = 'endTime';
var WORK_DAY_START = 'workDayStart';
var WORK_DAY_END = 'workDayEnd';
var WORK_WEEK_START = 'workWeekStart';
var WORK_WEEK_END = 'workWeekEnd';
var SLOT_DURATION = 'slotDuration';
var SLOT_DIVISIONS = 'slotDivisions';
var CURRENT_TIME_MARKER = 'currentTimeMarker';
/**
 * @hidden
 */
var DayTimeViewBase = /** @class */ (function (_super) {
    __extends(DayTimeViewBase, _super);
    function DayTimeViewBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(DayTimeViewBase.prototype, "viewEventHeight", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(EVENT_HEIGHT) || DEFAULT_EVENT_HEIGHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "shouldShowWorkHours", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SHOW_WORK_HOURS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewStartTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(START_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewEndTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(END_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkDayStart", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_DAY_START);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkDayEnd", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_DAY_END);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkWeekStart", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_WEEK_START);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkWeekEnd", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_WEEK_END);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewSlotDuration", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_DURATION);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewSlotDivisions", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_DIVISIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewCurrentTimeMarker", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(CURRENT_TIME_MARKER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewScrollTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue('scrollTime');
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewBase.prototype.optionValue = function (name) {
        return isPresent(this[name]) ? this[name] : this.schedulerOptions[name];
    };
    DayTimeViewBase.propDecorators = {
        timeSlotTemplate: [{ type: ContentChild, args: [TimeSlotTemplateDirective,] }],
        dateHeaderTemplate: [{ type: ContentChild, args: [DateHeaderTemplateDirective,] }],
        showWorkHours: [{ type: Input }],
        eventHeight: [{ type: Input }],
        startTime: [{ type: Input }],
        scrollTime: [{ type: Input }],
        endTime: [{ type: Input }],
        workDayStart: [{ type: Input }],
        workDayEnd: [{ type: Input }],
        workWeekStart: [{ type: Input }],
        workWeekEnd: [{ type: Input }],
        slotDuration: [{ type: Input }],
        slotDivisions: [{ type: Input }],
        currentTimeMarker: [{ type: Input }]
    };
    return DayTimeViewBase;
}(ConfigurationViewBase));

var SLOT_FILL = 'slotFill';
/**
 * @hidden
 */
var MultiDayViewBase = /** @class */ (function (_super) {
    __extends(MultiDayViewBase, _super);
    function MultiDayViewBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(MultiDayViewBase.prototype, "viewSlotFill", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_FILL);
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewBase.propDecorators = {
        slotFill: [{ type: Input }]
    };
    return MultiDayViewBase;
}(DayTimeViewBase));

/**
 * The component for rendering the **Day** view.
 */
var DayViewComponent = /** @class */ (function (_super) {
    __extends(DayViewComponent, _super);
    function DayViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d}';
        /**
         * The invariant name for this view (`day`).
         */
        _this.name = 'day';
        return _this;
    }
    Object.defineProperty(DayViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('dayViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    DayViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-day-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return DayViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DayViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    DayViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
    };
    return DayViewComponent;
}(MultiDayViewBase));

/**
 * The component for rendering the **Multi-Day** view.
 */
var MultiDayViewComponent = /** @class */ (function (_super) {
    __extends(MultiDayViewComponent, _super);
    function MultiDayViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * Specifies the number of days that the view will render.
         * Defaults to `1`.
         */
        _this.numberOfDays = 1;
        /**
         * The invariant name for this view (`multi-day`).
         */
        _this.name = 'multiDay';
        return _this;
    }
    Object.defineProperty(MultiDayViewComponent.prototype, "selectedDateFormat", {
        get: function () {
            return this.dateFormat || this.defaultDateFormat;
        },
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}` for multiple days and `{0:D}` for a single day
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        set: function (value) {
            this.dateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "selectedShortDateFormat", {
        get: function () {
            return this.shortDateFormat || this.defaultShortDateFormat;
        },
        /**
         * The short date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}` for multiple days and `{0:d}` for a single day
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        set: function (value) {
            this.shortDateFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('multiDayViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "defaultDateFormat", {
        get: function () {
            return this.numberOfDays === 1 ? '{0:D}' : '{0:D} - {1:D}';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiDayViewComponent.prototype, "defaultShortDateFormat", {
        get: function () {
            return this.numberOfDays === 1 ? '{0:d}' : '{0:d} - {1:d}';
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-multi-day-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return MultiDayViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                viewName=\"day\"\n                [name]=\"name\"\n                [numberOfDays]=\"numberOfDays\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    MultiDayViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    MultiDayViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        numberOfDays: [{ type: Input }]
    };
    return MultiDayViewComponent;
}(DayViewComponent));

/**
 * The component for rendering the **Week** view.
 */
var WeekViewComponent = /** @class */ (function (_super) {
    __extends(WeekViewComponent, _super);
    function WeekViewComponent(intl, localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        _this.intl = intl;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        _this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
         */
        _this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`week`).
         */
        _this.name = 'week';
        _this.getStartDate = _this.getStartDate.bind(_this);
        return _this;
    }
    Object.defineProperty(WeekViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('weekViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WeekViewComponent.prototype.getStartDate = function (selectedDate) {
        return firstDayInWeek(getDate(selectedDate), this.intl.firstDay());
    };
    WeekViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-week-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return WeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                [name]=\"name\"\n                [numberOfDays]=\"7\"\n                [getStartDate]=\"getStartDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WeekViewComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    WeekViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        allDaySlotTemplate: [{ type: ContentChild, args: [AllDaySlotTemplateDirective,] }],
        allDayEventTemplate: [{ type: ContentChild, args: [AllDayEventTemplateDirective,] }],
        minorTimeHeaderTemplate: [{ type: ContentChild, args: [MinorTimeHeaderTemplateDirective,] }],
        majorTimeHeaderTemplate: [{ type: ContentChild, args: [MajorTimeHeaderTemplateDirective,] }]
    };
    return WeekViewComponent;
}(MultiDayViewBase));

var DAYS_IN_WEEK$1 = 7;
/**
 * The component for rendering the **Work Week** view.
 */
var WorkWeekViewComponent = /** @class */ (function (_super) {
    __extends(WorkWeekViewComponent, _super);
    function WorkWeekViewComponent(intl, localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, intl, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The invariant name for this view (`week`).
         */
        _this.name = 'workWeek';
        _this.getNextDate = _this.getNextDate.bind(_this);
        return _this;
    }
    Object.defineProperty(WorkWeekViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('workWeekViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkWeekViewComponent.prototype, "numberOfDays", {
        /**
         * @hidden
         */
        get: function () {
            if (this.viewWorkWeekStart > this.viewWorkWeekEnd) {
                return (DAYS_IN_WEEK$1 - this.viewWorkWeekStart + this.viewWorkWeekEnd) + 1;
            }
            return (this.viewWorkWeekEnd - this.viewWorkWeekStart) + 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WorkWeekViewComponent.prototype.getStartDate = function (selectedDate) {
        return firstDayInWeek(getDate(selectedDate), this.viewWorkWeekStart);
    };
    /**
     * @hidden
     */
    WorkWeekViewComponent.prototype.getNextDate = function (date, count, _numberOfDays) {
        return getDate(addDays(date, DAYS_IN_WEEK$1 * count));
    };
    WorkWeekViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-work-week-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return WorkWeekViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <multi-day-view\n                viewName=\"workWeekview\"\n                [name]=\"name\"\n                [numberOfDays]=\"numberOfDays\"\n                [getStartDate]=\"getStartDate\"\n                [getNextDate]=\"getNextDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotFill]=\"viewSlotFill\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [allDaySlotTemplate]=\"allDaySlotTemplate?.templateRef\"\n                [allDayEventTemplate]=\"allDayEventTemplate?.templateRef\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [minorTimeHeaderTemplate]=\"minorTimeHeaderTemplate?.templateRef\"\n                [majorTimeHeaderTemplate]=\"majorTimeHeaderTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WorkWeekViewComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    return WorkWeekViewComponent;
}(WeekViewComponent));

var EVENTS_OFFSET = 10;
var MIN_EVENT_HEIGHT = 25;
var minHeightOverlaps = function (top1, top2) {
    return top1 <= top2 && top2 <= top1 + MIN_EVENT_HEIGHT;
};
var timeOffset = function (slot, date, vertical) {
    if (vertical === void 0) { vertical = true; }
    if (slot.start.getTime() <= date.getTime()) {
        return (vertical ? slot.height : slot.width) * ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
    }
    return 0;
};
var columnIndexComparer = function (a, b) {
    var indexA = isNumber(a.columnIndex) ? a.columnIndex : Number.MAX_VALUE;
    var indexB = isNumber(b.columnIndex) ? b.columnIndex : Number.MAX_VALUE;
    // a un b def = 0
    // b un a def = 0
    if (indexA === indexB) {
        return a.item.startTime.getTime() - b.item.startTime.getTime();
    }
    return indexA - indexB;
};
function initTimeColumns(slotKeys, slotItems) {
    // Break slots into groups with overlapping events.
    var columns = 0;
    var groupSlots = [];
    slotKeys.forEach(function (key) {
        var _a = slotItems[key], slot = _a.slot, events = _a.events;
        var count = events.length;
        var groupEnd = true;
        events.sort(columnIndexComparer);
        columns = Math.max(count, columns);
        groupSlots.push(slot);
        var _loop_1 = function (eventIdx) {
            var event_1 = events[eventIdx];
            groupEnd = groupEnd && event_1.item.endTime.getTime() <= slot.end.getTime();
            if (isNumber(event_1.columnIndex)) {
                return "continue";
            }
            event_1.rect = {
                top: slot.rect.top + timeOffset(slot, event_1.item.startTime)
            };
            event_1.columnIndex = eventIdx;
            event_1.lastColumn = true;
            var _loop_2 = function (idx, previousIdx) {
                var current = events[idx];
                if (current.columnIndex > previousIdx + 1) {
                    event_1.columnIndex = previousIdx + 1;
                    event_1.lastColumn = false;
                    events.splice(eventIdx, 1);
                    events.splice(event_1.columnIndex, 0, event_1);
                    return out_previousIdx_1 = previousIdx, "break";
                }
                if (!intersects(event_1.item.startTime, event_1.item.endTime, current.item.startTime, current.item.endTime) &&
                    !minHeightOverlaps(current.rect.top, event_1.rect.top)) {
                    event_1.columnIndex = idx;
                    event_1.lastColumn = !events.some(function (e) { return e.columnIndex && idx < e.columnIndex &&
                        intersects(event_1.item.startTime, event_1.item.endTime, e.item.startTime, e.item.endTime); });
                    events.splice(eventIdx, 1);
                    events.splice(idx, 0, event_1);
                    return out_previousIdx_1 = previousIdx, "break";
                }
                previousIdx = current.columnIndex;
                current.lastColumn = false;
                out_previousIdx_1 = previousIdx;
            };
            var out_previousIdx_1;
            for (var idx = 0, previousIdx = -1; idx < eventIdx; idx++) {
                var state_1 = _loop_2(idx, previousIdx);
                previousIdx = out_previousIdx_1;
                if (state_1 === "break")
                    break;
            }
        };
        for (var eventIdx = 0; eventIdx < count; eventIdx++) {
            _loop_1(eventIdx);
        }
        if (groupEnd) {
            groupSlots.forEach(function (item) { return item.columns = columns; });
            groupSlots = [];
            columns = 0;
        }
    });
    // The maximum number of overlapping events in the group is used to create the same number of columns.
    groupSlots.forEach(function (slot) { return slot.columns = columns; });
}
function findTimeRowIndex(events, event) {
    if (event.rowIndex !== undefined) {
        return event.rowIndex;
    }
    for (var idx = 0; idx < events.length; idx++) {
        var current = events[idx];
        if (!current || !intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime)) {
            return idx;
        }
    }
    return events.length;
}
function initHorizontalSlots(slots, items, rowHeight, eventHeight, getRowIndex) {
    var padding = slots[0].padding;
    if (!items.length) {
        return {
            height: rowHeight - padding
        };
    }
    items.forEach(function (item) {
        item.rowIndex = undefined;
        item.rect = {
            height: eventHeight,
            width: 0
        };
    });
    var sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
    var slotItems = {};
    sorted.forEach(function (event) { return slots
        .filter(function (slot) { return intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
        .forEach(function (slot) {
        var value = slotItems[slot.key] = slotItems[slot.key] || { rows: [], slot: slot, events: [] };
        event.rowIndex = getRowIndex(value.rows, event);
        value.rows[event.rowIndex] = event;
        value.events.push(event);
    }); });
    var top = slots[0].top;
    var maxOffset = 0;
    Object.keys(slotItems).forEach(function (key) {
        var events = slotItems[key].events;
        var slotOffset = 0;
        for (var idx = 0; idx < events.length; idx++) {
            var event_2 = events[idx];
            if (event_2) {
                event_2.rect.top = top + event_2.rowIndex * (EVENTS_OFFSET + event_2.rect.height);
                slotOffset = Math.max(slotOffset, (event_2.rect.top - top) + event_2.rect.height);
            }
        }
        maxOffset = Math.max(slotOffset, maxOffset);
    });
    maxOffset += rowHeight - padding;
    return {
        height: maxOffset,
        slotItems: slotItems
    };
}
function setHorizontalOffsets(slotItems, items, measureTime) {
    Object.keys(slotItems).forEach(function (key) {
        var _a = slotItems[key], slot = _a.slot, events = _a.events;
        var rect = slot.rect;
        for (var idx = 0; idx < events.length; idx++) {
            var event_3 = events[idx];
            if (event_3) {
                if (!isNumber(event_3.rect.left)) {
                    event_3.rect.left = slot.rect.left +
                        (measureTime ? timeOffset(slot, event_3.item.startTime, false) : 0);
                }
                var slotOffset = measureTime && event_3.item.endTime.getTime() < slot.end.getTime() ?
                    timeOffset(slot, event_3.item.endTime, false) : rect.width;
                event_3.rect.width = slot.rect.left + slotOffset - event_3.rect.left;
            }
        }
    });
    items.forEach(function (item) {
        item.reflow();
    });
}
/** @hidden */
var SlotRange$1 = /** @class */ (function () {
    function SlotRange(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    Object.defineProperty(SlotRange.prototype, "slots", {
        get: function () {
            return this.slotMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "firstSlot", {
        get: function () {
            return this.slotMap.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "lastSlot", {
        get: function () {
            return this.slotMap.last;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "items", {
        get: function () {
            return this.itemMap.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "rect", {
        get: function () {
            var first = this.firstSlot.rect;
            var last = this.lastSlot.rect;
            return {
                left: first.left,
                top: first.top,
                width: last.left - first.left + last.width,
                height: last.top - first.top + last.height
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "start", {
        get: function () {
            var first = this.slotMap.first;
            if (!first) {
                return null;
            }
            return first.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "end", {
        get: function () {
            var last = this.slotMap.last;
            if (!last) {
                return null;
            }
            return last.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasSlots", {
        get: function () {
            return this.slotMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlotRange.prototype, "hasItems", {
        get: function () {
            return this.itemMap.count > 0;
        },
        enumerable: true,
        configurable: true
    });
    SlotRange.prototype.registerItem = function (component) {
        this.itemMap.addItem(component.item.index, component);
    };
    SlotRange.prototype.unregisterItem = function (component, index) {
        this.itemMap.removeItem(index, component);
    };
    SlotRange.prototype.registerSlot = function (slot) {
        this.slotMap.addItem(slot.id.index, slot);
    };
    SlotRange.prototype.unregisterSlot = function (slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    };
    SlotRange.prototype.layout = function (options) {
        var items = this.items;
        if (!items.length) {
            return;
        }
        var fill = Math.max(Math.min(options.fill || 0.9, 1), 0.1);
        var sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        items.forEach(function (item, index) {
            item.rect = null;
            item.columnIndex = undefined;
        });
        var slotItems = {};
        var slots = this.slots;
        // Map each populated slot to the events in it
        sorted.forEach(function (event) { return slots
            .filter(function (slot) { return intersects(event.item.startTime, event.item.endTime, slot.start, slot.end); })
            .forEach(function (slot) {
            var value = slotItems[slot.key] = slotItems[slot.key] || { events: [] };
            value.slot = slot;
            value.events.push(event);
        }); });
        var slotKeys = Object.keys(slotItems);
        initTimeColumns(slotKeys, slotItems);
        slotKeys.forEach(function (key) {
            var _a = slotItems[key], slot = _a.slot, events = _a.events;
            var count = events.length;
            var spacing = 2;
            var startOffset = 2;
            var slotRect = slot.rect;
            var slotLeft = slotRect.left;
            var columns = slot.columns;
            var slotWidth = slotRect.width * fill - (columns - 1) * spacing - startOffset;
            var origin = slotLeft + startOffset;
            var eventWidth = slotWidth / columns;
            var slotEnd = origin + slotWidth + (columns - 1) * spacing;
            events.forEach(function (event) {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = origin + event.columnIndex * (eventWidth + spacing);
                    event.rect.width = event.lastColumn ? slotEnd - event.rect.left : eventWidth;
                    event.origin = {
                        left: slotLeft,
                        right: slotLeft + slotRect.width
                    };
                }
                // Expand the event to the last group slot
                var slotOffset = slot.end.getTime() <= event.item.endTime.getTime() ? slotRect.height : timeOffset(slot, event.item.endTime);
                event.rect.height = slotRect.top + slotOffset - event.rect.top;
            });
        });
        sorted.forEach(function (event) { return event.reflow(); });
    };
    SlotRange.prototype.initDaySlots = function (rowHeight, eventHeight) {
        var slots = this.slots;
        if (!slots.length) {
            return;
        }
        var _a = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findRowIndex), height = _a.height, slotItems = _a.slotItems;
        this.setSlotsHeight(height);
        this.slotItems = slotItems;
    };
    SlotRange.prototype.setDayOffsets = function () {
        if (!this.itemMap.count || !this.slotItems) {
            return;
        }
        setHorizontalOffsets(this.slotItems, this.items);
        this.slotItems = null;
    };
    SlotRange.prototype.setSlotsHeight = function (height) {
        this.firstSlot.height = height;
    };
    return SlotRange;
}());
/**
 * @hidden
 */
var DayTimeResourceGroup = /** @class */ (function () {
    function DayTimeResourceGroup(index) {
        this.index = index;
        this.dayRanges = [];
        this.timeRanges = [];
    }
    DayTimeResourceGroup.prototype.registerSlot = function (slot) {
        var range = this.slotRange(slot);
        range.registerSlot(slot);
    };
    DayTimeResourceGroup.prototype.unregisterSlot = function (slot) {
        var range = this.slotRange(slot);
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            var ranges = this.slotRanges(slot);
            delete ranges[slot.id.rangeIndex];
        }
    };
    DayTimeResourceGroup.prototype.registerItem = function (component) {
        var range = this.itemRange(component);
        if (range) {
            range.registerItem(component);
            component.rangeIndex = range.index;
        }
        else {
            component.rangeIndex = undefined;
            component.toggle(false);
        }
    };
    DayTimeResourceGroup.prototype.unregisterItem = function (component, index) {
        if (component.rangeIndex !== undefined) {
            var ranges = component.item.isAllDay ? this.dayRanges : this.timeRanges;
            if (ranges[component.rangeIndex]) {
                ranges[component.rangeIndex].unregisterItem(component, index);
            }
            component.rangeIndex = undefined;
        }
    };
    DayTimeResourceGroup.prototype.forEachDateRange = function (callback) {
        for (var i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    };
    DayTimeResourceGroup.prototype.forEachTimeRange = function (callback) {
        for (var i = 0; i < this.timeRanges.length; i++) {
            callback(this.timeRanges[i]);
        }
    };
    DayTimeResourceGroup.prototype.slotRange = function (slot) {
        var ranges = this.slotRanges(slot);
        var rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange$1(rangeIndex);
        }
        return ranges[rangeIndex];
    };
    DayTimeResourceGroup.prototype.slotRanges = function (slot) {
        return slot.isDaySlot ? this.dayRanges : this.timeRanges;
    };
    DayTimeResourceGroup.prototype.initTimeSlots = function (rowHeight, eventHeight, resourceRowHeight) {
        var slots = this.slots;
        if (!slots.length) {
            return;
        }
        var _a = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findTimeRowIndex), height = _a.height, slotItems = _a.slotItems;
        this.setSlotsHeight(Math.max(height, resourceRowHeight));
        this.slotItems = slotItems;
    };
    DayTimeResourceGroup.prototype.setTimelineOffsets = function () {
        var items = this.items;
        if (!this.slotItems || !items.length) {
            return;
        }
        setHorizontalOffsets(this.slotItems, items, true);
        this.slotItems = null;
    };
    DayTimeResourceGroup.prototype.setSlotsHeight = function (height) {
        //setting the first slot height should be sufficient
        this.timeRanges[0].setSlotsHeight(height);
    };
    Object.defineProperty(DayTimeResourceGroup.prototype, "items", {
        get: function () {
            return this.timeRanges.reduce(function (acc, range) { return acc.concat(range.items); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeResourceGroup.prototype, "slots", {
        get: function () {
            return this.timeRanges.reduce(function (acc, range) { return acc.concat(range.slots); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeResourceGroup.prototype, "hasSlots", {
        get: function () {
            return Boolean(this.dayRanges.find(function (range) { return range && range.hasSlots; }) || this.timeRanges.find(function (range) { return range && range.hasSlots; }));
        },
        enumerable: true,
        configurable: true
    });
    DayTimeResourceGroup.prototype.cleanRanges = function () {
        this.dayRanges = this.dayRanges.filter(function (r) { return Boolean(r); });
        this.timeRanges = this.timeRanges.filter(function (r) { return Boolean(r); });
    };
    DayTimeResourceGroup.prototype.itemRange = function (component) {
        var task = component.item;
        var ranges = task.isAllDay ? this.dayRanges : this.timeRanges;
        if (isNumber(task.rangeIndex)) {
            return ranges[task.rangeIndex];
        }
        return ranges.find(function (r) { return intersects(task.startTime, task.endTime, r.start, r.end); });
    };
    return DayTimeResourceGroup;
}());
/**
 * @hidden
 */
var DayTimeSlotService = /** @class */ (function (_super) {
    __extends(DayTimeSlotService, _super);
    function DayTimeSlotService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayTimeSlotService.prototype.layoutDays = function (eventHeight) {
        if (eventHeight === void 0) { eventHeight = 25; }
        this.groups.forEach(function (group) {
            return group.forEachDateRange(function (range) { return range.slots.forEach(function (slot) {
                slot.element.nativeElement.style.height = '';
            }); });
        });
        var rowHeight = this.groups[0].dayRanges[0].slots[0].height;
        this.groups.forEach(function (group) {
            group.forEachDateRange(function (range) { return range.initDaySlots(rowHeight, eventHeight); });
        });
        this.groups.forEach(function (group) {
            group.forEachDateRange(function (range) { return range.setDayOffsets(); });
        });
    };
    DayTimeSlotService.prototype.layoutTimeline = function (eventHeight, resourceRows) {
        this.groups.forEach(function (group) {
            return group.forEachTimeRange(function (range) { return range.slots.forEach(function (slot) {
                slot.element.nativeElement.style.height = '';
            }); });
        });
        var rowHeight = this.groups[0].timeRanges[0].slots[0].height;
        this.groups.forEach(function (group, index) {
            group.initTimeSlots(rowHeight, eventHeight, resourceRows && resourceRows[index] ? resourceRows[index].nativeElement.children[0].children[0].offsetHeight : 0);
        });
        this.groups.forEach(function (group) {
            return group.setTimelineOffsets();
        });
    };
    DayTimeSlotService.prototype.layoutTimes = function (options) {
        this.groups.forEach(function (group) {
            return group.forEachTimeRange(function (range) { return range.layout(options); });
        });
    };
    DayTimeSlotService.prototype.forEachDateRange = function (callback) {
        this.groups.forEach(function (group, index) {
            callback(group.dayRanges[0], index);
        });
    };
    DayTimeSlotService.prototype.syncDateRanges = function () {
        var maxHeight = 0;
        this.groups.forEach(function (group) {
            var slot = group.dayRanges[0].firstSlot;
            if (slot) {
                maxHeight = Math.max(slot.rect.height - slot.padding, maxHeight);
            }
        });
        this.groups.forEach(function (group) {
            group.dayRanges[0].setSlotsHeight(maxHeight);
        });
        return maxHeight;
    };
    DayTimeSlotService.prototype.forEachGroup = function (callback) {
        this.groups.forEach(callback);
    };
    DayTimeSlotService.prototype.forEachSlot = function (callback) {
        this.groups.forEach(function (group) {
            group.dayRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
            group.timeRanges.forEach(function (range) {
                range.slots.forEach(function (slot) { return callback(slot); });
            });
        });
    };
    DayTimeSlotService.prototype.createGroup = function (index) {
        return new DayTimeResourceGroup(index);
    };
    DayTimeSlotService.prototype.slotByIndex = function (slotIndex, allDay) {
        if (allDay === void 0) { allDay = false; }
        var _a = slotIndex.split(':').map(function (part) { return parseInt(part, 10); }), resourceIndex = _a[0], rangeIndex = _a[1], index = _a[2];
        return this.groups[resourceIndex][allDay ? 'dayRanges' : 'timeRanges'][rangeIndex].slots[index];
    };
    DayTimeSlotService.prototype.slotByPosition = function (x, y, isDaySlot, includeDayRanges) {
        var range;
        if (isDaySlot) {
            this.groups.find(function (group) {
                range = group.dayRanges.find(function (r) { return rectContainsX(r.rect, x); });
                return range;
            });
            if (range) {
                return range.slots.find(function (slot) { return rectContainsX(slot.rect, x); });
            }
        }
        else {
            this.groups.find(function (group) {
                if (includeDayRanges) {
                    range = group.dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
                }
                if (!range) {
                    range = group.timeRanges.find(function (r) { return rectContains(r.rect, x, y); });
                }
                return range;
            });
            if (range) {
                return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
            }
        }
    };
    DayTimeSlotService.prototype.groupSlotByPosition = function (currentSlot, x, y) {
        var group = this.groups[currentSlot.id.resourceIndex];
        var range;
        if (currentSlot.isDaySlot) {
            range = group.dayRanges.find(function (r) { return rectContains(r.rect, x, y); });
        }
        else {
            range = group.timeRanges.find(function (r) { return rectContains(r.rect, x, y); });
        }
        if (range) {
            return range.slots.find(function (slot) { return rectContains(slot.rect, x, y); });
        }
    };
    DayTimeSlotService.prototype.dragRanges = function (currentSlot, offset, timeRanges) {
        var start = new Date(currentSlot.start.getTime() - offset.start);
        var end = new Date(currentSlot.start.getTime() + offset.end);
        var group = this.groups[currentSlot.id.resourceIndex];
        var result;
        if (timeRanges) {
            var slotRanges_1 = [];
            group.timeRanges.forEach(function (range) {
                var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
                if (slots.length) {
                    slotRanges_1.push(slots);
                }
            });
            var lastRange = slotRanges_1[slotRanges_1.length - 1];
            result = [slotRanges_1[0][0], lastRange[lastRange.length - 1]];
        }
        else {
            result = group.slotRange(currentSlot).slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
        }
        return {
            start: start,
            end: end,
            ranges: [result]
        };
    };
    DayTimeSlotService.prototype.resizeRanges = function (currentSlot, task, resizeStart, offset) {
        var group = this.groups[currentSlot.id.resourceIndex];
        var ranges = task.isAllDay ? group.dayRanges : group.timeRanges;
        var result = [];
        var startDate = task.start.toUTCDate();
        var endDate = task.end.toUTCDate();
        var start, end;
        if (resizeStart) {
            var startTime = currentSlot.start.getTime() + offset.start;
            end = startDate.getTime() === endDate.getTime() ? this.findDateSlot(endDate, ranges, true).end : endDate;
            if (startTime >= endDate.getTime()) {
                if (task.isAllDay) {
                    start = new Date(Math.min(dateWithTime(endDate, startDate).getTime(), endDate.getTime()));
                }
                else {
                    start = this.findDateSlot(end, ranges).start;
                }
            }
            else if (offset.start && task.isAllDay) {
                start = new Date(startTime);
            }
            else {
                start = new Date(currentSlot.start.getTime());
            }
        }
        else {
            start = startDate;
            if (currentSlot.start.getTime() <= start.getTime()) {
                if (task.isAllDay) {
                    end = new Date(Math.max(dateWithTime(startDate, endDate).getTime(), startDate.getTime()));
                }
                else {
                    end = this.findDateSlot(start, ranges, true).end;
                }
            }
            else if (offset.end && task.isAllDay) {
                end = new Date(currentSlot.start.getTime() + offset.end);
            }
            else {
                end = currentSlot.end;
            }
        }
        ranges.forEach(function (range) {
            var slots = range.slots.filter(function (s) { return intersects(start, end, s.start, s.end); });
            if (slots.length) {
                result.push(slots);
            }
        });
        return {
            start: start,
            end: end,
            ranges: result
        };
    };
    DayTimeSlotService.prototype.timePosition = function (date, resourceIndex, vertical) {
        var group = this.groups[resourceIndex];
        var range = group.timeRanges.find(function (r) { return dateInRange(date, r.start, r.end); });
        if (!range) {
            return;
        }
        var slot = range.slots.find(function (s) { return dateInRange(date, s.start, s.end); });
        if (slot) {
            var position = (vertical ? slot.height : slot.width) *
                ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
            return vertical ? slot.rect.top + position : slot.rect.left + position;
        }
    };
    DayTimeSlotService.prototype.findDateSlot = function (date, ranges, excludeEnd) {
        var result;
        ranges.forEach(function (range) {
            var slots = excludeEnd ? range.slots.filter(function (s) { return intersects(date, date, s.start, s.end); }) :
                range.slots.filter(function (s) { return dateInRange(date, s.start, s.end); });
            if (slots.length) {
                result = slots[0];
            }
        });
        return result;
    };
    return DayTimeSlotService;
}(BaseSlotService));

/** @hidden */
var isMultiDay = function (_a) {
    var start = _a.start, end = _a.end;
    var startDate = start.stripTime();
    var endDate = end.stripTime();
    return startDate.getTime() !== endDate.getTime() &&
        (endDate.getTime() !== end.getTime() || startDate.addDays(1).getTime() !== endDate.getTime());
};
//check start and times or update day ranges to have them
/** @hidden */
var createTasks$1 = function (periodStart, periodEnd, items, ranges) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var multiDay = isMultiDay(item);
        var multipleRanges = multiDay && !item.event.isAllDay && (item.end.getTime() - item.start.getTime()) < MS_PER_DAY;
        var isAllDay = item.event.isAllDay || (multiDay && !multipleRanges);
        var endTime = (isAllDay ? roundAllDayEnd(item) : item.end).toUTCDate();
        var startTime = (isAllDay ? item.start.stripTime() : item.start).toUTCDate();
        for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            var rangeStart = ranges[rangeIndex].start;
            var rangeEnd = ranges[rangeIndex].end;
            if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                var task = {
                    index: index,
                    isAllDay: isAllDay,
                    startTime: startTime,
                    endTime: endTime,
                    rangeIndex: isAllDay ? 0 : rangeIndex,
                    start: item.start,
                    end: item.end,
                    event: item.event
                };
                tasks.push(task);
                if (!multipleRanges) {
                    task.head = utcEnd < endTime;
                    task.tail = startTime < utcStart;
                    break;
                }
                else {
                    var nextRange = ranges[rangeIndex + 1];
                    var previousRange = ranges[rangeIndex - 1];
                    task.head = (nextRange ? nextRange.start : utcEnd) < endTime;
                    task.tail = startTime < (previousRange ? previousRange.end : utcStart);
                }
            }
        }
    }
    return sortTasksByTime(tasks);
};

/**
 * @hidden
 */
function createTimeSlots(intlService, _a) {
    var showWorkHours = _a.showWorkHours, startTime = _a.startTime, endTime = _a.endTime, workDayStart = _a.workDayStart, workDayEnd = _a.workDayEnd, slotDivisions = _a.slotDivisions, slotDuration = _a.slotDuration;
    var startDate = intlService.parseDate(showWorkHours ? workDayStart : startTime);
    var start = toInvariantTime(startDate).getTime();
    var endDate = intlService.parseDate(showWorkHours ? workDayEnd : endTime);
    var end = toInvariantTime(endDate).getTime();
    if (end <= start) {
        end = toInvariantTime(MIDNIGHT_INVARIANT).getTime() + MS_PER_DAY;
    }
    var slots = [];
    var duration = Math.round((slotDuration / slotDivisions) * MS_PER_MINUTE);
    var slotTime = start;
    var index = 0;
    while (slotTime < end) {
        slots.push({
            start: new Date(slotTime),
            end: new Date(slotTime + duration),
            isMajor: index % slotDivisions === 0
        });
        index++;
        slotTime += duration;
    }
    return slots;
}

var getStartDate = function (date) { return getDate(date); };
var getEndDate = function (start, numberOfDays) { return getDate(addDays(start, numberOfDays || 1)); };
var getNextDate = function (date, count, numberOfDays) { return getDate(addDays(date, numberOfDays * count)); };
/**
 * @hidden
 */
var DayTimeViewComponent = /** @class */ (function (_super) {
    __extends(DayTimeViewComponent, _super);
    function DayTimeViewComponent(changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) {
        var _this = _super.call(this, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.changeDetector = changeDetector;
        _this.numberOfDays = 1;
        _this.startTime = '00:00';
        _this.endTime = '00:00';
        _this.workDayStart = '08:00';
        _this.workDayEnd = '17:00';
        _this.workWeekStart = 1;
        _this.workWeekEnd = 5;
        _this.slotDuration = 60;
        _this.slotDivisions = 2;
        _this.showWorkHours = false;
        _this.getStartDate = getStartDate;
        _this.getEndDate = getEndDate;
        _this.getNextDate = getNextDate;
        _this.daySlots = [];
        _this.timeSlots = [];
        _this.resizeHintFormat = 't';
        _this.showCurrentTime = false;
        _this.verticalTime = true;
        _this.initialUpdate = true;
        _this.updateCurrentTime = _this.updateCurrentTime.bind(_this);
        return _this;
    }
    Object.defineProperty(DayTimeViewComponent.prototype, "classNames", {
        get: function () {
            return "k-scheduler-" + this.name + "view";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewComponent.prototype, "timeSlotTemplateRef", {
        get: function () {
            return this.timeSlotTemplate || (this.schedulerTimeSlotTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewComponent.prototype, "dateHeaderTemplateRef", {
        get: function () {
            return this.dateHeaderTemplate || (this.schedulerDateHeaderTemplate || {}).templateRef;
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.startTime || changes.endTime || changes.showWorkHours || changes.workDayStart || changes.workDayEnd ||
            changes.workWeekStart || changes.workWeekEnd || changes.slotDivisions || changes.slotDuration) {
            this.timeSlots = this.createTimeSlots();
            this.initWorkDay();
            this.changes.next(null);
        }
        if (isChanged('currentTimeMarker', changes)) {
            this.showCurrentTime = this.enableCurrentTime();
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    DayTimeViewComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        clearTimeout(this.currentTimeTimeout);
    };
    DayTimeViewComponent.prototype.verticalItem = function (leafIndex, resourceIndex) {
        var data = this.verticalResources[resourceIndex].data || [];
        var resources = this.verticalResources;
        var result = 1;
        for (var idx = resourceIndex + 1; idx < resources.length; idx++) {
            result *= ((resources[idx].data || []).length || 1);
        }
        return data[(leafIndex / result) % data.length];
    };
    DayTimeViewComponent.prototype.timeSlotClass = function (slot, date, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: dateWithTime(date, slot.start),
                end: dateWithTime(date, slot.end),
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: false
            });
        }
    };
    DayTimeViewComponent.prototype.scrollToTime = function (time) {
        if (time === void 0) { time = this.scrollTime; }
        var scrollDate = this.intl.parseDate(time);
        if (!scrollDate) {
            return;
        }
        var date = toUTCTime(this.daySlots[0].start, scrollDate);
        var position = this.slotService.timePosition(date, 0, this.verticalTime);
        if (isNumber(position)) {
            var contentElement = this.content.nativeElement;
            contentElement[this.verticalTime ? 'scrollTop' : 'scrollLeft'] =
                (this.localization.rtl && !this.verticalTime) ? rtlScrollPosition(contentElement, position) : position;
        }
    };
    DayTimeViewComponent.prototype.optionsChange = function (options) {
        this.schedulerTimeSlotTemplate = options.timeSlotTemplate;
        this.schedulerDateHeaderTemplate = options.dateHeaderTemplate;
        _super.prototype.optionsChange.call(this, options);
    };
    DayTimeViewComponent.prototype.updateView = function () {
        _super.prototype.updateView.call(this);
        this.updateCurrentTime();
        if (this.initialUpdate) {
            this.scrollToTime();
            this.initialUpdate = false;
        }
    };
    DayTimeViewComponent.prototype.enableCurrentTime = function () {
        if (!this.currentTimeMarker || this.currentTimeMarker.enabled === false || !this.selectedDate) {
            return false;
        }
        var dateRange = this.dateRange();
        this.currentDate = ZonedDate.fromLocalDate(this.currentTime(), this.currentTimeMarker.localTimezone !== false ? '' : this.timezone);
        var localTime = this.currentDate.toLocalDate();
        var invariantTime = toInvariantTime(localTime);
        var timeSlots = this.timeSlots;
        var inDateRange = dateInRange(localTime, dateRange.start, dateRange.end);
        var inTimeRange = timeSlots.length && dateInRange(invariantTime, timeSlots[0].start, timeSlots[timeSlots.length - 1].end);
        return inDateRange && inTimeRange;
    };
    DayTimeViewComponent.prototype.currentTime = function () {
        return new Date();
    };
    DayTimeViewComponent.prototype.updateCurrentTime = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var enable = this.enableCurrentTime();
        if (enable !== this.showCurrentTime) {
            this.showCurrentTime = enable;
            this.changeDetector.detectChanges();
        }
        clearTimeout(this.currentTimeTimeout);
        if (enable) {
            this.zone.runOutsideAngular(function () {
                _this.currentTimeTimeout = setTimeout(_this.updateCurrentTime, _this.currentTimeMarker.updateInterval || MS_PER_MINUTE);
            });
            this.positionCurrentTime();
        }
    };
    DayTimeViewComponent.prototype.positionCurrentTime = function () {
        var _this = this;
        if (this.currentTimeElements && this.currentTimeElements.length) {
            var date_1 = this.currentDate.toUTCDate();
            var currentTimeArrows_1 = this.currentTimeArrows ? this.currentTimeArrows.toArray() : [];
            var arrowOffset_1 = currentTimeArrows_1.length ? this.currentTimeArrowOffset() : 0;
            var arrowMid_1 = currentTimeArrows_1.length ? (currentTimeArrows_1[0].nativeElement.offsetHeight / 2) : 4;
            var tableWidth_1 = this.contentTable.nativeElement.clientWidth;
            var tableHeight_1 = this.contentTable.nativeElement.clientHeight;
            var vertical_1 = this.verticalTime;
            this.currentTimeElements.forEach(function (element, index) {
                var position = _this.slotService.timePosition(date_1, index, vertical_1);
                if (position !== undefined) {
                    var line = element.nativeElement;
                    if (currentTimeArrows_1[index]) {
                        var arrow = currentTimeArrows_1[index].nativeElement;
                        var origin_1 = vertical_1 ? arrowOffset_1 : position - arrowMid_1;
                        setCoordinates(arrow, {
                            top: vertical_1 ? position - arrowMid_1 : arrowOffset_1,
                            left: origin_1,
                            right: origin_1
                        });
                    }
                    var origin = vertical_1 ? 0 : position;
                    setCoordinates(line, {
                        top: vertical_1 ? position : 0,
                        left: origin,
                        right: origin,
                        width: vertical_1 ? tableWidth_1 : 1,
                        height: vertical_1 ? 1 : tableHeight_1
                    });
                }
            });
        }
    };
    DayTimeViewComponent.prototype.bindEvents = function () {
        var _this = this;
        _super.prototype.bindEvents.call(this);
        this.zone.runOutsideAngular(function () {
            _this.subs.add(fromClick(_this.headerWrap.nativeElement)
                .subscribe(function (e) { return _this.onHeaderClick(e); }));
            _this.subs.add(fromEvent(_this.headerWrap.nativeElement, 'contextmenu')
                .subscribe(function (e) { return _this.onClick(e); }));
            _this.subs.add(fromDoubleClick(_this.headerWrap.nativeElement)
                .subscribe(function (e) { return _this.onClick(e, 'dblclick'); }));
        });
    };
    DayTimeViewComponent.prototype.onHeaderClick = function (e) {
        var _this = this;
        this.onClick(e);
        if (this.daySlots.length <= 1) {
            return;
        }
        var daySlotIndex = e.target.getAttribute('data-dayslot-index');
        if (daySlotIndex) {
            var slot_1 = this.daySlots[parseInt(daySlotIndex, 10)];
            this.zone.run(function () {
                _this.viewState.navigateTo({ viewName: 'day', date: slot_1.start });
            });
        }
    };
    DayTimeViewComponent.prototype.slotByIndex = function (slotIndex, args) {
        return this.slotService.slotByIndex(slotIndex, args.target.hasAttribute('data-day-slot'));
    };
    DayTimeViewComponent.prototype.onSelectDate = function (date) {
        this.selectedDate = date;
        this.daySlots = this.createDaySlots();
        this.showCurrentTime = this.enableCurrentTime();
        this.viewState.notifyDateRange(this.dateRange());
    };
    DayTimeViewComponent.prototype.onAction = function (e) {
        var now = getDate(this.selectedDate);
        if (e.type === 'next') {
            var next = this.getNextDate(now, 1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            var next = this.getNextDate(now, -1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'scroll-time') {
            this.scrollToTime(e.time);
        }
    };
    DayTimeViewComponent.prototype.dateRange = function (date) {
        if (date === void 0) { date = this.selectedDate; }
        var start = this.getStartDate(date);
        var end = this.getEndDate(start, this.numberOfDays);
        var rangeEnd = this.getEndDate(start, this.numberOfDays - 1);
        var text = this.intl.format(this.selectedDateFormat, start, rangeEnd);
        var shortText = this.intl.format(this.selectedShortDateFormat, start, rangeEnd);
        return { start: start, end: end, text: text, shortText: shortText };
    };
    DayTimeViewComponent.prototype.createDaySlots = function () {
        var current = this.getStartDate(this.selectedDate);
        var end = this.getEndDate(current, this.numberOfDays);
        var dates = [];
        while (current < end) {
            var next = addDays(current, 1);
            dates.push({
                start: current,
                end: next
            });
            current = next;
        }
        return dates;
    };
    DayTimeViewComponent.prototype.createTimeSlots = function () {
        return createTimeSlots(this.intl, {
            showWorkHours: this.showWorkHours,
            startTime: this.startTime,
            endTime: this.endTime,
            workDayStart: this.workDayStart,
            workDayEnd: this.workDayEnd,
            slotDivisions: this.slotDivisions,
            slotDuration: this.slotDuration
        });
    };
    DayTimeViewComponent.prototype.initWorkDay = function () {
        var startDate = this.intl.parseDate(this.workDayStart);
        this.workDayStartTime = toInvariantTime(startDate);
        var endDate = this.intl.parseDate(this.workDayEnd);
        this.workDayEndTime = toInvariantTime(endDate);
    };
    DayTimeViewComponent.prototype.slotByPosition = function (x, y, container) {
        var isDaySlot = container ? hasClasses(container.parentNode, 'k-scheduler-header-wrap') : y < 0;
        return this.slotService.slotByPosition(x, y, isDaySlot, Boolean(this.verticalResources.length));
    };
    DayTimeViewComponent.prototype.slotFields = function (slot) {
        var fields = _super.prototype.slotFields.call(this, slot);
        if (slot.isDaySlot) {
            fields.isAllDay = true;
        }
        else {
            fields.start = this.convertDate(slot.start);
            fields.end = this.convertDate(slot.end);
        }
        return fields;
    };
    DayTimeViewComponent.propDecorators = {
        timeSlotTemplate: [{ type: Input }],
        dateHeaderTemplate: [{ type: Input }],
        numberOfDays: [{ type: Input }],
        scrollTime: [{ type: Input }],
        startTime: [{ type: Input }],
        endTime: [{ type: Input }],
        workDayStart: [{ type: Input }],
        workDayEnd: [{ type: Input }],
        workWeekStart: [{ type: Input }],
        workWeekEnd: [{ type: Input }],
        slotDuration: [{ type: Input }],
        slotDivisions: [{ type: Input }],
        showWorkHours: [{ type: Input }],
        getStartDate: [{ type: Input }],
        getEndDate: [{ type: Input }],
        getNextDate: [{ type: Input }],
        currentTimeMarker: [{ type: Input }],
        currentTimeElements: [{ type: ViewChildren, args: ['currentTimeMarker',] }],
        currentTimeArrows: [{ type: ViewChildren, args: ['currentTimeArrow',] }]
    };
    return DayTimeViewComponent;
}(BaseView));

/**
 * @hidden
 */
var MultiDayViewRendererComponent = /** @class */ (function (_super) {
    __extends(MultiDayViewRendererComponent, _super);
    function MultiDayViewRendererComponent(localization, viewContext, viewState, intl, slotService, zone, renderer, element, changeDetector, pdfService) {
        var _this = _super.call(this, changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) || this;
        _this.name = 'day';
        _this.dateFormat = { skeleton: 'MEd' };
        _this.allDayResizeHintFormat = { skeleton: 'Md' };
        _this.allDayItems = new BehaviorSubject(null);
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
            start: toUTCTime(daySlot.start, startTimeSlot.start),
            end: nextDateEnd ? toUTCDate(daySlot.end) : toUTCTime(daySlot.start, endTimeSlot)
        }); });
        return createTasks$1(dateRange.start, dateRange.end, items, ranges);
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
                    offset: elementOffset(content)
                }, {
                    element: header,
                    offset: elementOffset(header)
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
                start: dateWithTime(slot.start, task.start.toUTCDate()),
                end: dateWithTime(slot.start, task.end.toUTCDate()),
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
        return Boolean(slot.isDaySlot && (task.event.isAllDay || !isMultiDay(task)));
    };
    MultiDayViewRendererComponent.prototype.dragHintSize = function (firstSlot, lastSlot) {
        var width, height;
        if (firstSlot.isDaySlot) {
            width = toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width);
            height = toPx(firstSlot.height);
        }
        else {
            width = toPx(firstSlot.rect.width * 0.9);
            height = toPx(this.dragging.task.isAllDay ? firstSlot.rect.height : lastSlot.rect.top - firstSlot.rect.top + lastSlot.rect.height);
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
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'multi-day-view',
                    providers: [
                        DayTimeSlotService
                    ],
                    template: "\n        <div class=\"k-scheduler-layout k-scheduler-flex-layout\" [ngClass]=\"classNames\">\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #timesHeader>\n                    <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                        <tr *ngFor=\"let resource of horizontalResources; trackBy: itemIndex;\">\n                            <th></th>\n                        </tr>\n                        <tr>\n                            <th>\u200B</th>\n                        </tr>\n                        <tr *ngIf=\"!verticalResources.length\">\n                            <th class=\"k-scheduler-times-all-day\" #allDayCell>{{ allDayMessage }}</th>\n                        </tr>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-header k-state-default\" #header>\n                    <div class=\"k-scheduler-header-wrap\" #headerWrap>\n                        <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                            <tr *ngFor=\"let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                <th *ngFor=\"let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;\"\n                                    class=\"k-slot-cell\" [attr.colspan]=\"horizontalColspan(resourceIndex)\">\n                                    <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(item, resource.textField) }}</ng-container>\n                                    <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ resource: item }\"></ng-container>\n                                </th>\n                            </tr>\n                            <tr>\n                                <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\">\n                                    <th *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\">\n                                        <span *ngIf=\"!dateHeaderTemplateRef\" class=\"k-link k-nav-day\" [attr.data-dayslot-index]=\"index\">{{ slot.start | kendoDate: dateFormat }}</span>\n                                        <ng-container *ngIf=\"dateHeaderTemplateRef\" [ngTemplateOutlet]=\"dateHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\"></ng-container>\n                                    </th>\n                                </ng-container>\n                            </tr>\n                        </table>\n                        <div style=\"position: relative;\" *ngIf=\"!verticalResources.length\">\n                            <table class=\"k-scheduler-table k-scheduler-header-all-day\" aria-hidden=\"true\">\n                                <tr>\n                                    <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;\">\n                                        <td *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\"\n                                            daySlot\n                                            [start]=\"slot.start\"\n                                            [end]=\"slot.end\"\n                                            [id]=\"{ resourceIndex: resourceIndex, rangeIndex: 0, index: index }\"\n                                            [ngClass]=\"allDaySlotClass(slot, resourceIndex)\">\n                                            <ng-container *ngIf=\"allDaySlotTemplateRef\" [ngTemplateOutlet]=\"allDaySlotTemplateRef\"\n                                                [ngTemplateOutletContext]=\"{ date: slot.start, resources: resourcesByIndex(resourceIndex) }\"></ng-container>\n                                        </td>\n                                    </ng-container>\n                                </tr>\n                            </table>\n                            <ng-container *ngFor=\"let item of allDayItems | async; trackBy: itemIndex;\">\n                                <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                                    [ngClass]=\"getEventClasses(item, itemResource.resources, true)\"\n                                    [ngStyle]=\"getEventStyles(item, itemResource, true)\"\n                                    [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                                     dayTimeViewItem\n                                        [isAllDay]=\"true\"\n                                        [editable]=\"editable\"\n                                        [eventTemplate]=\"allDayEventTemplateRef\"\n                                        [item]=\"item\"\n                                        [index]=\"item.index\"\n                                        [resources]=\"itemResource.resources\"\n                                        [resourceIndex]=\"itemResource.leafIdx\">\n                                </div>\n                            </ng-container>\n                            <kendo-hint-container #headerHintContainer>\n                                <ng-template>\n                                    <div *ngIf=\"dragHints.length && allDayDragHint\"\n                                        class=\"k-event-drag-hint\"\n                                        dayTimeViewItem\n                                            [isAllDay]=\"true\"\n                                            [ngStyle]=\"dragHints[0].style\"\n                                            [ngClass]=\"dragHints[0].class\"\n                                            [dragHint]=\"true\"\n                                            [eventTemplate]=\"eventTemplateRef\"\n                                            [item]=\"dragHints[0].item\"\n                                            [resources]=\"dragHints[0].resources\">\n                                    </div>\n\n                                    <div *ngIf=\"resizeHints.length && allDayResizeHint\"\n                                        kendoResizeHint\n                                            [hint]=\"resizeHints[0]\"\n                                            [ngClass]=\"resizeHints[0].class\"\n                                            [format]=\"allDayResizeHintFormat\">\n                                    </div>\n                                </ng-template>\n                            </kendo-hint-container>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #times>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of verticalResources | resourceIterator; trackBy: itemIndex;\"\n                            #currentTimeArrow class=\"k-current-time k-current-time-arrow-right\">\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #timesTable aria-hidden=\"true\">\n                        <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;\">\n                            <tr *ngIf=\"verticalResources.length\">\n                                <ng-container *ngFor=\"let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                    <th *ngIf=\"verticalItem(leafIndex, resourceIndex)\" [attr.rowspan]=\"verticalRowspan(resourceIndex)\" class=\"k-slot-cell\">\n                                        <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>\n                                        <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ resource: verticalItem(leafIndex, resourceIndex) }\"></ng-container>\n                                    </th>\n                                </ng-container>\n                                <th class=\"k-scheduler-times-all-day\" #allDayCell>{{ allDayMessage }}</th>\n                            </tr>\n                            <tr *ngFor=\"let slot of timeSlots; let timeSlotIndex = index;trackBy: itemIndex\">\n                                <th *ngIf=\"slot.isMajor\" [ngClass]=\"{ 'k-slot-cell': slotDivisions === 1 }\">\n                                    <ng-container *ngIf=\"!majorTimeHeaderTemplateRef\">{{ slot.start | kendoDate: 't' }}</ng-container>\n                                    <ng-container *ngIf=\"majorTimeHeaderTemplateRef\" [ngTemplateOutlet]=\"majorTimeHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\"></ng-container>\n                                </th>\n                                <th *ngIf=\"!slot.isMajor\" [ngClass]=\"{ 'k-slot-cell': timeSlotIndex % slotDivisions === slotDivisions - 1 }\">\n                                    <ng-container *ngIf=\"minorTimeHeaderTemplateRef\" [ngTemplateOutlet]=\"minorTimeHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: slot.start }\">\n                                    </ng-container>\n                                </th>\n                            </tr>\n                        </ng-container>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-content\" #content>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of verticalResources | resourceIterator; trackBy: itemIndex;\"\n                            #currentTimeMarker class=\"k-current-time\">\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #contentTable role=\"presentation\">\n                        <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;\">\n                            <tr class=\"k-scheduler-header-all-day\" *ngIf=\"verticalResources.length\">\n                                <td *ngFor=\"let slot of daySlots; let index = index; trackBy: itemIndex\"\n                                    daySlot\n                                    [start]=\"slot.start\"\n                                    [end]=\"slot.end\"\n                                    [id]=\"{ resourceIndex: verticalIndex, rangeIndex: 0, index: index }\">\n                                    <ng-container *ngIf=\"allDaySlotTemplateRef\" [ngTemplateOutlet]=\"allDaySlotTemplateRef\"\n                                        [ngTemplateOutletContext]=\"{ date: slot.start, resources: resourcesByIndex(verticalIndex) }\"></ng-container>\n                                </td>\n                            </tr>\n                            <tr *ngFor=\"let slot of timeSlots; index as index; trackBy: itemIndex\" [class.k-middle-row]=\"slot.isMajor\">\n                                <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;\">\n                                    <td *ngFor=\"let daySlot of daySlots; index as rangeIndex; trackBy: itemIndex\"\n                                        [class.k-nonwork-hour]=\"slot.isWorkHour\"\n                                        [ngClass]=\"timeSlotClass(slot, daySlot.start, verticalResources.length ? verticalIndex : horizontalIndex)\"\n                                        timeSlot #timeSlot=\"timeSlot\"\n                                            [date]=\"daySlot.start\"\n                                            [invariantStart]=\"slot.start\"\n                                            [invariantEnd]=\"slot.end\"\n                                            [workDayStart]=\"workDayStartTime\"\n                                            [workDayEnd]=\"workDayEndTime\"\n                                            [workWeekStart]=\"workWeekStart\"\n                                            [workWeekEnd]=\"workWeekEnd\"\n                                            [id]=\"{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }\"\n                                    >\n                                        <ng-container *ngIf=\"timeSlotTemplateRef\" [ngTemplateOutlet]=\"timeSlotTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ date: timeSlot.startLocalTime, resources: resourcesByIndex(timeSlot.id.resourceIndex) }\">\n                                        </ng-container>\n                                    </td>\n                                </ng-container>\n                            </tr>\n                        </ng-container>\n                    </table>\n                    <ng-container *ngFor=\"let item of items | async; trackBy: itemIndex;\">\n                        <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                            [ngClass]=\"getEventClasses(item, itemResource.resources)\"\n                            [ngStyle]=\"getEventStyles(item, itemResource)\"\n                            [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                            dayTimeViewItem\n                                [editable]=\"editable\"\n                                [vertical]=\"true\"\n                                [eventTemplate]=\"eventTemplateRef\"\n                                [item]=\"item\"\n                                [index]=\"item.index\"\n                                [resources]=\"itemResource.resources\"\n                                [resourceIndex]=\"itemResource.leafIdx\">\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"verticalResources.length\">\n                        <ng-container *ngFor=\"let item of allDayItems | async; trackBy: itemIndex;\">\n                            <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                                [ngClass]=\"getEventClasses(item, itemResource.resources, true)\"\n                                [ngStyle]=\"getEventStyles(item, itemResource, true)\"\n                                [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                                dayTimeViewItem\n                                    [isAllDay]=\"true\"\n                                    [editable]=\"editable\"\n                                    [eventTemplate]=\"allDayEventTemplateRef\"\n                                    [item]=\"item\"\n                                    [index]=\"item.index\"\n                                    [resources]=\"itemResource.resources\"\n                                    [resourceIndex]=\"itemResource.leafIdx\">\n                            </div>\n                        </ng-container>\n                    </ng-container>\n                    <kendo-hint-container #hintContainer>\n                        <ng-template>\n                            <div *ngIf=\"dragHints.length && (!allDayDragHint || verticalResources.length)\"\n                                class=\"k-event-drag-hint\"\n                                dayTimeViewItem\n                                    [isAllDay]=\"allDayDragHint\"\n                                    [ngStyle]=\"dragHints[0].style\"\n                                    [ngClass]=\"dragHints[0].class\"\n                                    [dragHint]=\"true\"\n                                    [eventTemplate]=\"eventTemplateRef\"\n                                    [resources]=\"dragHints[0].resources\"\n                                    [item]=\"dragHints[0].item\">\n                            </div>\n\n                            <ng-container *ngIf=\"resizeHints.length && (!allDayResizeHint || verticalResources.length)\">\n                                <div *ngFor=\"let hint of resizeHints; trackBy: itemIndex;\"\n                                    kendoResizeHint\n                                        [hint]=\"hint\"\n                                        [ngClass]=\"hint.class\"\n                                        [format]=\"allDayResizeHint ? allDayResizeHintFormat : resizeHintFormat\">\n                                </div>\n                            </ng-container>\n                        </ng-template>\n                    </kendo-hint-container>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MultiDayViewRendererComponent.ctorParameters = function () { return [
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
    ]; };
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
    return MultiDayViewRendererComponent;
}(DayTimeViewComponent));

/**
 * @hidden
 */
var TimeSlotDirective = /** @class */ (function (_super) {
    __extends(TimeSlotDirective, _super);
    function TimeSlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = false;
        return _this;
    }
    Object.defineProperty(TimeSlotDirective.prototype, "nonWorkHour", {
        get: function () {
            var date = this.date.getDay();
            return this.invariantStart < this.workDayStart || this.workDayEnd < this.invariantEnd || !isWorkWeekDay(date, this.workWeekStart, this.workWeekEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "startLocalTime", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return dateWithTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "endLocalTime", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            return dateWithTime(this.date, this.invariantEnd);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "start", {
        get: function () {
            if (!this.date || !this.invariantStart) {
                return null;
            }
            return toUTCTime(this.date, this.invariantStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSlotDirective.prototype, "end", {
        get: function () {
            if (!this.date || !this.invariantEnd) {
                return null;
            }
            var localEnd = toUTCTime(this.date, this.invariantEnd);
            if (INVARIANT_END.getTime() <= this.invariantEnd.getTime()) {
                return addUTCDays(localEnd, 1);
            }
            return localEnd;
        },
        enumerable: true,
        configurable: true
    });
    TimeSlotDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[timeSlot]',
                    exportAs: 'timeSlot'
                },] },
    ];
    /** @nocollapse */
    TimeSlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DayTimeSlotService },
        { type: LocalizationService }
    ]; };
    TimeSlotDirective.propDecorators = {
        invariantStart: [{ type: Input }],
        invariantEnd: [{ type: Input }],
        workDayStart: [{ type: Input }],
        workDayEnd: [{ type: Input }],
        workWeekStart: [{ type: Input }],
        workWeekEnd: [{ type: Input }],
        date: [{ type: Input }],
        nonWorkHour: [{ type: HostBinding, args: ['class.k-nonwork-hour',] }]
    };
    return TimeSlotDirective;
}(BaseSlotDirective));
/**
 * @hidden
 */
var DaySlotDirective = /** @class */ (function (_super) {
    __extends(DaySlotDirective, _super);
    function DaySlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = true;
        return _this;
    }
    Object.defineProperty(DaySlotDirective.prototype, "start", {
        get: function () {
            if (!this.startDate) {
                return null;
            }
            return toUTCDate(this.startDate);
        },
        set: function (value) {
            this.startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaySlotDirective.prototype, "end", {
        get: function () {
            if (!this.endDate) {
                return null;
            }
            return toUTCDate(this.endDate);
        },
        set: function (value) {
            this.endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaySlotDirective.prototype, "daySlot", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DaySlotDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[daySlot]'
                },] },
    ];
    /** @nocollapse */
    DaySlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DayTimeSlotService },
        { type: LocalizationService }
    ]; };
    DaySlotDirective.propDecorators = {
        start: [{ type: Input }],
        end: [{ type: Input }],
        daySlot: [{ type: HostBinding, args: ['attr.data-day-slot',] }]
    };
    return DaySlotDirective;
}(BaseSlotDirective));

/**
 * @hidden
 */
var DayTimeViewItemComponent = /** @class */ (function (_super) {
    __extends(DayTimeViewItemComponent, _super);
    function DayTimeViewItemComponent(intlService, slotService, localization, focusService, element, renderer) {
        var _this = _super.call(this, slotService, localization, focusService, element, renderer) || this;
        _this.intlService = intlService;
        return _this;
    }
    Object.defineProperty(DayTimeViewItemComponent.prototype, "eventTime", {
        get: function () {
            return this.intlService.format('{0:t}???{1:t}', toLocalDate(this.item.startTime), toLocalDate(this.item.endTime));
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewItemComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[dayTimeViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail && !vertical\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template k-event-time\" *ngIf=\"!isAllDay\">{{ eventTime }}</div>\n            <div class=\"k-event-template\" aria-hidden=\"true\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\"\n               tabindex=\"-1\" aria-hidden=\"true\"\n               [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head && !vertical\"></span>\n        </span>\n\n        <span class=\"k-event-top-actions\" *ngIf=\"item.tail && vertical\">\n            <span class=\"k-icon k-i-arrow-60-up\"></span>\n        </span>\n\n        <span class=\"k-event-bottom-actions\" *ngIf=\"item.head && vertical\">\n            <span class=\"k-icon k-i-arrow-60-down\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable && vertical\">\n            <span class=\"k-resize-handle k-resize-n\" *ngIf=\"!item.tail\"></span>\n            <span class=\"k-resize-handle k-resize-s\" *ngIf=\"!item.head\"></span>\n        </ng-container>\n\n        <ng-container *ngIf=\"resizable && !vertical\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DayTimeViewItemComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: DayTimeSlotService },
        { type: LocalizationService },
        { type: FocusService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    DayTimeViewItemComponent.propDecorators = {
        vertical: [{ type: Input }],
        isAllDay: [{ type: Input }]
    };
    return DayTimeViewItemComponent;
}(BaseViewItem));

var DIRECTIVES = [TimeSlotDirective, DaySlotDirective, DayTimeViewItemComponent];
/**
 * @hidden
 */
var DayTimeModule = /** @class */ (function () {
    function DayTimeModule() {
    }
    DayTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, SharedModule],
                    exports: [
                        DIRECTIVES
                    ],
                    declarations: [
                        DIRECTIVES
                    ]
                },] },
    ];
    return DayTimeModule;
}());

var PUBLIC_DIRECTIVES = [
    DayViewComponent,
    MultiDayViewComponent,
    WeekViewComponent,
    WorkWeekViewComponent
];
/**
 * @hidden
 */
var MultiDayViewModule = /** @class */ (function () {
    function MultiDayViewModule() {
    }
    MultiDayViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ViewsSharedModule,
                        DayTimeModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES
                    ],
                    declarations: PUBLIC_DIRECTIVES.concat([
                        MultiDayViewRendererComponent
                    ])
                },] },
    ];
    return MultiDayViewModule;
}());

// tslint:disable:no-input-rename
/**
 * A directive selector for a custom Scheduler view
 */
var SchedulerViewDirective = /** @class */ (function (_super) {
    __extends(SchedulerViewDirective, _super);
    function SchedulerViewDirective(template) {
        var _this = _super.call(this) || this;
        _this.template = template;
        return _this;
    }
    Object.defineProperty(SchedulerViewDirective.prototype, "name", {
        /**
         * The invariant name for this view. For example, `day`.
         * If not set, the name will be the same as the title.
         */
        get: function () {
            return this._name || this.title;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    SchedulerViewDirective.decorators = [
        { type: Directive, args: [{
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return SchedulerViewDirective; })
                        }],
                    selector: '[kendoSchedulerView]'
                },] },
    ];
    /** @nocollapse */
    SchedulerViewDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    SchedulerViewDirective.propDecorators = {
        title: [{ type: Input, args: ['kendoSchedulerView',] }],
        name: [{ type: Input, args: ['kendoSchedulerViewName',] }]
    };
    return SchedulerViewDirective;
}(SchedulerView));

/**
 * @hidden
 */
var createTasks$2 = function (periodStart, periodEnd, items) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var event_1 = item.event;
        var task = {
            index: index,
            start: item.start,
            end: item.end,
            event: event_1,
            isAllDay: false
        };
        var endTime = event_1.isAllDay ? roundAllDayEnd(item) : task.end;
        var startTime = event_1.isAllDay ? task.start.stripTime() : task.start;
        task.startTime = startTime.toUTCDate();
        task.endTime = endTime.toUTCDate();
        if (intersects(task.startTime, task.endTime, utcStart, utcEnd)) {
            tasks.push(task);
            task.head = task.endTime > periodEnd;
            task.tail = task.startTime < periodStart;
        }
    }
    return tasks;
};

/**
 * @hidden
 */
var TimelineMultiDayViewComponent = /** @class */ (function (_super) {
    __extends(TimelineMultiDayViewComponent, _super);
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
        return createTasks$2(dateRange.start, dateRange.end, items);
    };
    TimelineMultiDayViewComponent.prototype.onTasksChange = function () {
        this.items.next(this.tasks);
    };
    TimelineMultiDayViewComponent.prototype.dragRanges = function (slot) {
        return this.slotService.dragRanges(slot, this.dragging.offset, true);
    };
    TimelineMultiDayViewComponent.prototype.dragHintSize = function (firstSlot, lastSlot) {
        return {
            width: toPx(lastSlot.rect.left - firstSlot.rect.left + lastSlot.rect.width),
            height: toPx(firstSlot.height)
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
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'timeline-multi-day-view',
                    providers: [
                        DayTimeSlotService
                    ],
                    template: "\n        <div class=\"k-scheduler-layout k-scheduler-flex-layout\" [ngClass]=\"classNames\">\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #timesHeader>\n                    <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                        <tr><th></th></tr>\n                        <tr><th class=\"k-slot-cell\"></th></tr>\n                        <tr *ngFor=\"let resource of horizontalResources; trackBy: itemIndex;\">\n                            <th></th>\n                        </tr>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-header k-state-default\" #header >\n                    <div class=\"k-scheduler-header-wrap\" #headerWrap>\n                        <ng-container *ngIf=\"showCurrentTime\">\n                            <div *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\"\n                                #currentTimeArrow class=\"k-current-time k-current-time-arrow-down\">\n                            </div>\n                        </ng-container>\n                        <table class=\"k-scheduler-table\" aria-hidden=\"true\">\n                            <colgroup>\n                                <col *ngFor=\"let slotIndex of slotsCount | repeat; trackBy: itemIndex;\" [ngStyle]=\"{ 'width.px': columnWidth }\" />\n                            </colgroup>\n                            <tr *ngFor=\"let resource of horizontalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                <th *ngFor=\"let item of horizontalResources | resourceIterator : resourceIndex; trackBy: itemIndex;\"\n                                    class=\"k-slot-cell\" [attr.colspan]=\"horizontalColspan(resourceIndex)\">\n                                    <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(item, resource.textField) }}</ng-container>\n                                    <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                        [ngTemplateOutletContext]=\"{ resource: item }\"></ng-container>\n                                </th>\n                            </tr>\n                             <tr>\n                                 <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\">\n                                     <ng-container *ngFor=\"let daySlot of daySlots; let index = index; trackBy: itemIndex;\">\n                                         <th [attr.colspan]=\"timeSlots.length\" class=\"k-slot-cell\">\n                                             <span *ngIf=\"!dateHeaderTemplateRef\" class=\"k-link\" [ngClass]=\"{ 'k-nav-day': numberOfDays > 1 }\" [attr.data-dayslot-index]=\"index\">{{ daySlot.start | kendoDate: 'm'}}</span>\n                                             <ng-container *ngIf=\"dateHeaderTemplateRef\" [ngTemplateOutlet]=\"dateHeaderTemplateRef\" [ngTemplateOutletContext]=\"{ date: daySlot.start }\"></ng-container>\n                                         </th>\n                                     </ng-container>\n                                 </ng-container>\n                             </tr>\n                             <tr>\n                                 <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let resourceIndex = index; trackBy: itemIndex;\">\n                                    <ng-container *ngFor=\"let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;\">\n                                        <ng-container *ngFor=\"let timeSlot of timeSlots; let index = index; trackBy: itemIndex;\">\n                                            <th *ngIf=\"timeSlot.isMajor\" [attr.colspan]=\"timeColspan(index)\" >{{ timeSlot.start | kendoDate: 't' }}</th>\n                                        </ng-container>\n                                    </ng-container>\n                                 </ng-container>\n                             </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n            <div class=\"k-scheduler-pane\">\n                <div class=\"k-scheduler-times\" #times>\n                    <table class=\"k-scheduler-table\" #timesTable aria-hidden=\"true\">\n                        <tr *ngIf=\"!verticalResources.length\">\n                            <th rowspan=\"1\" #titleCell>\n                                {{ allEventsMessage }}\n                            </th>\n                        </tr>\n                        <ng-container *ngIf=\"verticalResources.length\">\n                            <ng-container *ngFor=\"let resourceItem of verticalResources | resourceIterator; let leafIndex = index; trackBy: itemIndex;\">\n                                <tr #verticalResourceRows>\n                                    <ng-container *ngFor=\"let resource of verticalResources; let resourceIndex = index; trackBy: itemIndex;\">\n                                        <th *ngIf=\"verticalItem(leafIndex, resourceIndex)\" [attr.rowspan]=\"verticalRowspan(resourceIndex)\" class=\"k-slot-cell\">\n                                            <div>\n                                                <ng-container *ngIf=\"!groupHeaderTemplateRef\">{{ getField(verticalItem(leafIndex, resourceIndex), resource.textField) }}</ng-container>\n                                                <ng-container *ngIf=\"groupHeaderTemplateRef\" [ngTemplateOutlet]=\"groupHeaderTemplateRef\"\n                                                    [ngTemplateOutletContext]=\"{ resource: verticalItem(leafIndex, resourceIndex) }\"></ng-container>\n                                            </div>\n                                        </th>\n                                    </ng-container>\n                                </tr>\n                            </ng-container>\n                        </ng-container>\n                    </table>\n                </div>\n                <div class=\"k-scheduler-content\" #content>\n                    <ng-container *ngIf=\"showCurrentTime\">\n                        <div *ngFor=\"let resource of horizontalResources | resourceIterator; trackBy: itemIndex;\"\n                            class=\"k-current-time\" #currentTimeMarker>\n                        </div>\n                    </ng-container>\n                    <table class=\"k-scheduler-table\" #contentTable role=\"presentation\">\n                        <colgroup>\n                            <col *ngFor=\"let slotIndex of slotsCount | repeat; trackBy: itemIndex;\" [ngStyle]=\"{ 'width.px': columnWidth }\" />\n                        </colgroup>\n                        <tr *ngFor=\"let resourceItem of verticalResources | resourceIterator; let verticalIndex = index; trackBy: itemIndex;\">\n                            <ng-container *ngFor=\"let resource of horizontalResources | resourceIterator; let horizontalIndex = index; trackBy: itemIndex;\">\n                                <ng-container *ngFor=\"let daySlot of daySlots; let rangeIndex = index; trackBy: itemIndex;\">\n                                    <td *ngFor=\"let slot of timeSlots; let index = index; trackBy: itemIndex;\"\n                                            [ngClass]=\"timeSlotClass(slot, daySlot.start, verticalResources.length ? verticalIndex : horizontalIndex)\"\n                                            timeSlot #timeSlot=\"timeSlot\"\n                                            [date]=\"daySlot.start\"\n                                            [invariantStart]=\"slot.start\"\n                                            [invariantEnd]=\"slot.end\"\n                                            [workDayStart]=\"workDayStartTime\"\n                                            [workDayEnd]=\"workDayEndTime\"\n                                            [workWeekStart]=\"workWeekStart\"\n                                            [workWeekEnd]=\"workWeekEnd\"\n                                            [id]=\"{ resourceIndex: verticalResources.length ? verticalIndex : horizontalIndex, rangeIndex: rangeIndex, index: index }\"\n                                    >\n                                        <ng-container *ngIf=\"timeSlotTemplateRef\" [ngTemplateOutlet]=\"timeSlotTemplateRef\"\n                                            [ngTemplateOutletContext]=\"{ date: timeSlot.start, resources: resourcesByIndex(timeSlot.id.resourceIndex ) }\">\n                                        </ng-container>\n                                    </td>\n                                </ng-container>\n                            </ng-container>\n                        </tr>\n                    </table>\n                    <ng-container *ngFor=\"let item of items | async; trackBy: itemIndex;\">\n                        <div *ngFor=\"let itemResource of item.resources; trackBy: itemIndex;\"\n                            [ngClass]=\"getEventClasses(item, itemResource.resources)\"\n                            [ngStyle]=\"getEventStyles(item, itemResource)\"\n                            [kendoSchedulerFocusIndex]=\"itemResource.leafIdx\"\n                            dayTimeViewItem\n                                [editable]=\"editable\"\n                                [item]=\"item\"\n                                [index]=\"item.index\"\n                                [eventTemplate]=\"eventTemplateRef\"\n                                [resources]=\"itemResource.resources\"\n                                [resourceIndex]=\"itemResource.leafIdx\">\n                        </div>\n                    </ng-container>\n                    <kendo-hint-container #hintContainer>\n                        <ng-template>\n                            <div *ngFor=\"let hint of dragHints; trackBy: itemIndex;\"\n                                class=\"k-event-drag-hint\"\n                                dayTimeViewItem\n                                    [ngStyle]=\"hint.style\"\n                                    [ngClass]=\"hint.class\"\n                                    [dragHint]=\"true\"\n                                    [eventTemplate]=\"eventTemplateRef\"\n                                    [item]=\"hint.item\"\n                                    [resources]=\"hint.resources\">\n                            </div>\n                            <div *ngIf=\"resizeHints && resizeHints.length\"\n                                kendoResizeHint\n                                [hint]=\"resizeHints[0]\"\n                                [ngClass]=\"resizeHints[0].class\"\n                                [format]=\"resizeHintFormat\">\n                            </div>\n                        </ng-template>\n                    </kendo-hint-container>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineMultiDayViewComponent.ctorParameters = function () { return [
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
    ]; };
    TimelineMultiDayViewComponent.propDecorators = {
        name: [{ type: Input }],
        columnWidth: [{ type: Input }],
        viewName: [{ type: Input }],
        verticalResourceRows: [{ type: ViewChildren, args: ['verticalResourceRows',] }]
    };
    return TimelineMultiDayViewComponent;
}(DayTimeViewComponent));

var COLUMN_WIDTH = 'columnWidth';
/**
 * @hidden
 */
var TimelineBase = /** @class */ (function (_super) {
    __extends(TimelineBase, _super);
    function TimelineBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(TimelineBase.prototype, "viewColumnWidth", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(COLUMN_WIDTH);
        },
        enumerable: true,
        configurable: true
    });
    TimelineBase.propDecorators = {
        columnWidth: [{ type: Input }]
    };
    return TimelineBase;
}(DayTimeViewBase));

/**
 * The component for rendering the **Timeline** view.
 */
var TimelineViewComponent = /** @class */ (function (_super) {
    __extends(TimelineViewComponent, _super);
    function TimelineViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d}';
        /**
         * The invariant name for this view (`timeline`).
         */
        _this.name = 'timeline';
        return _this;
    }
    Object.defineProperty(TimelineViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('timelineViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    TimelineViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-timeline-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return TimelineViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <timeline-multi-day-view\n                [name]=\"name\"\n                [eventHeight]=\"viewEventHeight\"\n                [columnWidth]=\"viewColumnWidth\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </timeline-multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    TimelineViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }]
    };
    return TimelineViewComponent;
}(TimelineBase));

/**
 * The component for rendering the **Week** timeline view.
 */
var TimelineWeekViewComponent = /** @class */ (function (_super) {
    __extends(TimelineWeekViewComponent, _super);
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

/**
 * The component for rendering the **Month** timeline view.
 */
var TimelineMonthViewComponent = /** @class */ (function (_super) {
    __extends(TimelineMonthViewComponent, _super);
    function TimelineMonthViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`timelineMonth`).
         */
        _this.name = 'timelineMonth';
        /**
         * @hidden
         */
        _this.getStartDate = function (selectedDate) {
            return firstDayOfMonth(getDate(selectedDate));
        };
        /**
         * @hidden
         */
        _this.getEndDate = function (selectedDate) {
            return addMonths(_this.getStartDate(selectedDate), 1);
        };
        /**
         * @hidden
         */
        _this.getNextDate = function (date, count) {
            return addMonths(date, count);
        };
        return _this;
    }
    Object.defineProperty(TimelineMonthViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('timelineMonthViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    TimelineMonthViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-timeline-month-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return TimelineMonthViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <timeline-multi-day-view\n                viewName=\"timeline-month\"\n                [name]=\"name\"\n                [getNextDate]=\"getNextDate\"\n                [getStartDate]=\"getStartDate\"\n                [getEndDate]=\"getEndDate\"\n                [eventHeight]=\"viewEventHeight\"\n                [columnWidth]=\"viewColumnWidth\"\n                [currentTimeMarker]=\"viewCurrentTimeMarker\"\n                [showWorkHours]=\"shouldShowWorkHours\"\n                [scrollTime]=\"viewScrollTime\"\n                [startTime]=\"viewStartTime\"\n                [endTime]=\"viewEndTime\"\n                [workDayStart]=\"viewWorkDayStart\"\n                [workDayEnd]=\"viewWorkDayEnd\"\n                [workWeekStart]=\"viewWorkWeekStart\"\n                [workWeekEnd]=\"viewWorkWeekEnd\"\n                [slotDuration]=\"viewSlotDuration\"\n                [slotDivisions]=\"viewSlotDivisions\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [timeSlotTemplate]=\"timeSlotTemplate?.templateRef\"\n                [dateHeaderTemplate]=\"dateHeaderTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </timeline-multi-day-view>\n            <div viewFooter kendoWorkHoursFooter [showWorkHours]=\"shouldShowWorkHours\" (itemClick)=\"showWorkHours = !shouldShowWorkHours\"></div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TimelineMonthViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    TimelineMonthViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }]
    };
    return TimelineMonthViewComponent;
}(TimelineBase));

var PUBLIC_DIRECTIVES$1 = [
    TimelineViewComponent,
    TimelineWeekViewComponent,
    TimelineMonthViewComponent
];
/**
 * @hidden
 */
var TimelineViewModule = /** @class */ (function () {
    function TimelineViewModule() {
    }
    TimelineViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        DayTimeModule,
                        ViewsSharedModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES$1
                    ],
                    declarations: PUBLIC_DIRECTIVES$1.concat([
                        TimelineMultiDayViewComponent
                    ])
                },] },
    ];
    return TimelineViewModule;
}());

var isRecurrenceMaster$1 = function (ev) { return !!(ev.id && ev.recurrenceRule); };
/**
 * @hidden
 */
var LocalEditService = /** @class */ (function () {
    function LocalEditService(scheduler, localDataChangesService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
    }
    Object.defineProperty(LocalEditService.prototype, "fields", {
        get: function () {
            return this.scheduler.modelFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "hasLocalData", {
        get: function () {
            return isPresent(this.localDataChangesService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "data", {
        get: function () {
            if (this.hasLocalData) {
                return this.localDataChangesService.data;
            }
            return this.scheduler.events;
        },
        enumerable: true,
        configurable: true
    });
    LocalEditService.prototype.create = function (item) {
        var idField = this.fields.id;
        var id = getField(item, idField);
        if (!isPresent(id)) {
            setField(item, idField, this.nextId());
        }
        this.data.push(item);
        this.dataChanged();
    };
    LocalEditService.prototype.createException = function (item, value) {
        var exception = this.buildException(value);
        this.removeOccurrenceInternal(item);
        this.create(exception);
    };
    LocalEditService.prototype.update = function (item, value) {
        assignValues(item, value);
        this.dataChanged();
    };
    LocalEditService.prototype.remove = function (item) {
        var idField = this.fields.id;
        var itemId = getField(item, idField);
        var data = this.data;
        for (var idx = 0; idx < data.length; idx++) {
            if (itemId === getField(data[idx], idField)) {
                data.splice(idx, 1);
                break;
            }
        }
        this.dataChanged();
    };
    LocalEditService.prototype.removeSeries = function (item) {
        var event = readEvent(item, this.fields);
        var isHead = isRecurrenceMaster$1(event);
        this.removeItemAndExceptions(isHead ? event.id : event.recurrenceId);
        this.dataChanged();
    };
    LocalEditService.prototype.removeOccurrence = function (item) {
        this.removeOccurrenceInternal(item);
        this.dataChanged();
    };
    LocalEditService.prototype.findRecurrenceMaster = function (item) {
        var fields = this.scheduler.modelFields;
        var event = readEvent(item, fields);
        var headId = isRecurrenceMaster$1(event) ? event.id : event.recurrenceId;
        return this.data.find(function (dataItem) { return getField(dataItem, fields.id) === headId; });
    };
    LocalEditService.prototype.isRecurring = function (event) {
        return isRecurring(event, this.scheduler.modelFields);
    };
    LocalEditService.prototype.isException = function (event) {
        return isException(event, this.scheduler.modelFields);
    };
    LocalEditService.prototype.nextId = function () {
        return guid();
    };
    LocalEditService.prototype.buildException = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        if (!head) {
            if (isDevMode()) {
                throw new Error('Unable to find recurrence head for event. Please check that recurrenceId is set and refers to an existing event.');
            }
            return;
        }
        var exception = clone(item);
        setField(exception, fields.id, this.nextId());
        setField(exception, fields.recurrenceId, getField(head, fields.id));
        setField(exception, fields.recurrenceRule, null);
        return exception;
    };
    LocalEditService.prototype.removeItemAndExceptions = function (itemId) {
        var data = this.data;
        var fields = this.scheduler.modelFields;
        for (var idx = data.length - 1; idx >= 0; idx--) {
            if (itemId === getField(data[idx], fields.recurrenceId) || itemId === getField(data[idx], fields.id)) {
                data.splice(idx, 1);
            }
        }
    };
    LocalEditService.prototype.removeOccurrenceInternal = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        var exceptionDate = getField(item, fields.start);
        var currentExceptions = getField(head, fields.recurrenceExceptions) || [];
        setField(head, fields.recurrenceExceptions, currentExceptions.concat([exceptionDate]));
    };
    LocalEditService.prototype.dataChanged = function () {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit();
        }
    };
    return LocalEditService;
}());

/**
 * @hidden
 */
var markAllAsTouched = function (control) {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        var controls = control.controls;
        for (var inner in controls) {
            if (controls.hasOwnProperty(inner)) {
                markAllAsTouched(controls[inner]);
            }
        }
    }
};
/**
 * @hidden
 */
function diff(obj1, obj2, fields) {
    for (var idx = 0; idx < fields.length; idx++) {
        var field = fields[idx];
        if (!areEqual(getField(obj1, field), getField(obj2, field))) {
            return true;
        }
    }
    return false;
}
/**
 * @hidden
 */
function areEqual(value1, value2) {
    if (value1 && value1.getTime && value2 && value2.getTime) {
        return value1.getTime() === value2.getTime();
    }
    else if (Array.isArray(value1)) {
        if (!Array.isArray(value2) || value1.length !== value2.length) {
            return false;
        }
        for (var idx = 0; idx < value1.length; idx++) {
            if (value1[idx] !== value2[idx]) {
                return false;
            }
        }
        return true;
    }
    // tslint:disable-next-line:triple-equals
    return value1 == value2;
}
var DATE_ACCESSORS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];
/**
 * @hidden
 */
function seriesDate(head, occurrence, current, field) {
    var _a;
    var values = [];
    var headDate = getField(head, field);
    var occurrenceDate = getField(occurrence, field);
    var currentDate = getField(current, field);
    DATE_ACCESSORS.forEach(function (accessor) {
        values.push(occurrenceDate[accessor]() === currentDate[accessor]() ? headDate[accessor]() : currentDate[accessor]());
    });
    return new ((_a = Date).bind.apply(_a, [void 0].concat(values)))();
}

/**
 * @hidden
 */
var EditingDirectiveBase = /** @class */ (function () {
    function EditingDirectiveBase(scheduler, localDataChangesService, dialogsService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
        this.dialogsService = dialogsService;
        /**
         * Fires before the editing directive renders the **Add** dialog.
         */
        this.add = new EventEmitter();
        /**
         * Fires before the editing directive renders the **Edit** dialog.
         */
        this.edit = new EventEmitter();
        this.defaultTitle = 'No title';
        this.defaultEditService = this.createDefaultService();
        this.scheduler.editable = true;
    }
    Object.defineProperty(EditingDirectiveBase.prototype, "editService", {
        get: function () {
            return this.userEditService || this.defaultEditService;
        },
        /**
         * The edit service that will handle the editing operations.
         */
        set: function (value) {
            this.userEditService = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnInit = function () {
        this.subscriptions = merge(this.scheduler.slotDblClick, this.scheduler.create).subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.scheduler.removeConfirmed.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.scheduler.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.scheduler.resizeEndConfirmed.subscribe(this.resizeEndHandler.bind(this)));
        this.subscriptions.add(this.scheduler.dragEndConfirmed.subscribe(this.dragEndHandler.bind(this)));
    };
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    EditingDirectiveBase.prototype.createDefaultService = function () {
        return new LocalEditService(this.scheduler, this.localDataChangesService);
    };
    EditingDirectiveBase.prototype.addHandler = function (args) {
        this.closeEditor();
        if (!this.isEnabled('add')) {
            return;
        }
        var fields = this.scheduler.modelFields;
        var dataItem = {};
        setField(dataItem, fields.start, args.start);
        setField(dataItem, fields.end, args.end);
        setField(dataItem, fields.isAllDay, args.isAllDay);
        setField(dataItem, fields.title, args.title);
        var resources = groupResources(this.scheduler.group, this.scheduler.resources);
        var slotResources = args.resources;
        for (var idx = 0; idx < resources.length; idx++) {
            var resource = resources[idx];
            var value = getField(slotResources[idx], resource.valueField);
            setField(dataItem, resource.field, resource.multiple ? [value] : value);
        }
        var addArgs = new AddEvent(this.scheduler, { dataItem: dataItem });
        this.add.emit(addArgs);
        if (!addArgs.isDefaultPrevented()) {
            this.scheduler.addEvent(this.createModel({
                action: 'add',
                isNew: true,
                dataItem: dataItem
            }));
        }
    };
    EditingDirectiveBase.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        if (!this.isEnabled('remove')) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(1 /* Remove */)
                .subscribe(function (editMode) {
                if (editMode !== undefined) {
                    _this.handleRemove(dataItem, editMode);
                }
            });
        }
        else {
            this.dialogsService.openRemoveConfirmationDialog()
                .subscribe(function (shouldRemove) {
                if (shouldRemove) {
                    _this.handleRemove(dataItem, 0 /* Event */);
                }
            });
        }
    };
    EditingDirectiveBase.prototype.cancelHandler = function () {
        this.closeEditor();
    };
    EditingDirectiveBase.prototype.closeEditor = function () {
        this.scheduler.closeEvent();
    };
    EditingDirectiveBase.prototype.handleUpdate = function (item, value, mode) {
        var svc = this.editService;
        if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.update(item, value) :
                svc.createException(item, value);
        }
        else {
            // Item is not recurring or we're editing the entire series
            svc.update(item, value);
        }
    };
    EditingDirectiveBase.prototype.handleRemove = function (item, mode) {
        var svc = this.editService;
        if (mode === 2 /* Series */) {
            svc.removeSeries(item);
        }
        else if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.remove(item) :
                svc.removeOccurrence(item);
        }
        else {
            // Item is not recurring
            svc.remove(item);
        }
    };
    EditingDirectiveBase.prototype.resizeEndHandler = function (_a) {
        var _this = this;
        var event = _a.event, start = _a.start, end = _a.end;
        if (areEqual(start, event.start) && areEqual(end, event.end)) {
            return;
        }
        var dataItem = event.dataItem;
        var fields = this.scheduler.modelFields;
        var value = {};
        setField(value, fields.start, start);
        setField(value, fields.end, end);
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe(function (result) {
                var target = dataItem;
                if (result === 2 /* Series */) {
                    target = _this.editService.findRecurrenceMaster(dataItem);
                    setField(value, fields.start, seriesDate(target, dataItem, value, fields.start));
                    setField(value, fields.end, seriesDate(target, dataItem, value, fields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                _this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    };
    EditingDirectiveBase.prototype.dragEndHandler = function (_a) {
        var _this = this;
        var dataItem = _a.event.dataItem, start = _a.start, end = _a.end, resources = _a.resources, isAllDay = _a.isAllDay;
        var modelFields = this.scheduler.modelFields;
        var resourceFields = groupResources(this.scheduler.group, this.scheduler.resources).map(function (r) { return r.field; });
        var fields = [modelFields.start, modelFields.end, modelFields.isAllDay].concat(resourceFields);
        var value = clone(resources);
        setField(value, modelFields.start, start);
        setField(value, modelFields.end, end);
        setField(value, modelFields.isAllDay, isAllDay);
        if (!diff(dataItem, value, fields)) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe(function (result) {
                var target = dataItem;
                if (result === 2 /* Series */) {
                    target = _this.editService.findRecurrenceMaster(dataItem);
                    setField(value, modelFields.start, seriesDate(target, dataItem, value, modelFields.start));
                    setField(value, modelFields.end, seriesDate(target, dataItem, value, modelFields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                _this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    };
    EditingDirectiveBase.prototype.isEnabled = function (action) {
        var editable = this.scheduler.editable;
        return editable && editable[action] !== false;
    };
    EditingDirectiveBase.propDecorators = {
        add: [{ type: Output }],
        edit: [{ type: Output }],
        editService: [{ type: Input }]
    };
    return EditingDirectiveBase;
}());

/**
 * A directive which encapsulates the editing operations when the Scheduler
 * uses the [Reactive Angular Forms]({{ site.data.urls.angular['reactiveforms'] }}).
 */
var ReactiveEditingDirective = /** @class */ (function (_super) {
    __extends(ReactiveEditingDirective, _super);
    function ReactiveEditingDirective(scheduler, localDataChangesService, dialogsService) {
        var _this = _super.call(this, scheduler, localDataChangesService, dialogsService) || this;
        _this.scheduler = scheduler;
        _this.localDataChangesService = localDataChangesService;
        _this.dialogsService = dialogsService;
        return _this;
    }
    ReactiveEditingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions.add(this.scheduler.eventDblClick.subscribe(this.editHandler.bind(this)));
        this.subscriptions.add(this.scheduler.save.subscribe(this.saveHandler.bind(this)));
    };
    ReactiveEditingDirective.prototype.editHandler = function (args) {
        var _this = this;
        if (!this.isEnabled('edit')) {
            return;
        }
        var editArgs = new EditEvent(this.scheduler, { dataItem: args.event.dataItem, event: args.event });
        this.edit.emit(editArgs);
        if (editArgs.isDefaultPrevented()) {
            return;
        }
        var dataItem = args.event.dataItem;
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .pipe(filter(function (mode) { return mode !== undefined; }))
                .subscribe(function (mode) {
                if (mode === 2 /* Series */) {
                    dataItem = _this.editService.findRecurrenceMaster(dataItem);
                }
                var group = _this.createModel({
                    action: 'edit',
                    isNew: false,
                    mode: mode,
                    dataItem: dataItem
                });
                _this.scheduler.editEvent(dataItem, { group: group, mode: mode });
            });
        }
        else {
            var group = this.createModel({
                action: 'edit',
                isNew: false,
                mode: 0 /* Event */,
                dataItem: dataItem
            });
            this.scheduler.editEvent(dataItem, { group: group });
        }
    };
    ReactiveEditingDirective.prototype.saveHandler = function (args) {
        if (this.isFormValid(args)) {
            var formValue = args.formGroup.value;
            if (args.isNew) {
                this.editService.create(formValue);
            }
            else {
                this.handleUpdate(args.dataItem, formValue, args.mode);
            }
        }
        this.closeEditor();
    };
    ReactiveEditingDirective.prototype.createModel = function (args) {
        // Alias `event` for backwards compatibility.
        args.event = args.dataItem;
        return this.createFormGroup(args);
    };
    ReactiveEditingDirective.prototype.isFormValid = function (_a) {
        var formGroup = _a.formGroup, isNew = _a.isNew;
        if (formGroup.valid) {
            return true;
        }
        if (!formGroup.dirty && !isNew) {
            return false;
        }
        markAllAsTouched(formGroup);
        return false;
    };
    ReactiveEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerReactiveEditing]'
                },] },
    ];
    /** @nocollapse */
    ReactiveEditingDirective.ctorParameters = function () { return [
        { type: SchedulerComponent },
        { type: LocalDataChangesService },
        { type: DialogsService }
    ]; };
    ReactiveEditingDirective.propDecorators = {
        createFormGroup: [{ type: Input, args: ['kendoSchedulerReactiveEditing',] }]
    };
    return ReactiveEditingDirective;
}(EditingDirectiveBase));

/**
 * @hidden
 */
var ResourceEditorBase = /** @class */ (function () {
    function ResourceEditorBase() {
        this.valueChange = new EventEmitter();
        this.getField = getField;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
    }
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.writeValue = function (newValue) {
        this.resourceValue = newValue;
    };
    ResourceEditorBase.prototype.getResourceStyle = function (dataItem) {
        return {
            'background-color': getField(dataItem, this.resource.colorField),
            'margin-right': isPresent(getField(dataItem, this.resource.valueField)) ? '8px' : '4px'
        };
    };
    ResourceEditorBase.prototype.onResourceValueChange = function (newValue) {
        this.resourceValue = newValue;
        this.emitChange(this.resourceValue);
    };
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    ResourceEditorBase.prototype.emitChange = function (value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    };
    ResourceEditorBase.propDecorators = {
        resource: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return ResourceEditorBase;
}());

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
var MULTIPLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultipleResourceEditorComponent; })
};
/**
 * @hidden
 */
var MultipleResourceEditorComponent = /** @class */ (function (_super) {
    __extends(MultipleResourceEditorComponent, _super);
    function MultipleResourceEditorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleResourceEditorComponent.prototype.getTagStyle = function (dataItem) {
        return {
            'background-color': dataItem[this.resource.colorField]
        };
    };
    MultipleResourceEditorComponent.prototype.focus = function () {
        this.resourceMultiSelect.focus();
    };
    MultipleResourceEditorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        MULTIPLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-multiple-resource-editor',
                    template: "\n        <kendo-multiselect\n            #resourceMultiSelect\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n            <ng-template kendoMultiSelectTagTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getTagStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-multiselect>\n    "
                },] },
    ];
    MultipleResourceEditorComponent.propDecorators = {
        resourceMultiSelect: [{ type: ViewChild, args: ['resourceMultiSelect',] }]
    };
    return MultipleResourceEditorComponent;
}(ResourceEditorBase));

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
var SINGLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SingleResourceEditorComponent; })
};
/**
 * @hidden
 */
var SingleResourceEditorComponent = /** @class */ (function (_super) {
    __extends(SingleResourceEditorComponent, _super);
    function SingleResourceEditorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleResourceEditorComponent.prototype.focus = function () {
        this.resourceDropDown.focus();
    };
    SingleResourceEditorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        SINGLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-single-resource-editor',
                    template: "\n        <kendo-dropdownlist\n            #resourceDropDown\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    SingleResourceEditorComponent.propDecorators = {
        resourceDropDown: [{ type: ViewChild, args: ['resourceDropDown',] }]
    };
    return SingleResourceEditorComponent;
}(ResourceEditorBase));

// tslint:disable:no-bitwise
/**
 * @hidden
 */
var Modifiers;
(function (Modifiers) {
    Modifiers[Modifiers["None"] = 0] = "None";
    Modifiers[Modifiers["AltKey"] = 1] = "AltKey";
    Modifiers[Modifiers["CtrlKey"] = 2] = "CtrlKey";
    Modifiers[Modifiers["ShiftKey"] = 4] = "ShiftKey";
    Modifiers[Modifiers["MetaKey"] = 8] = "MetaKey";
})(Modifiers || (Modifiers = {}));
/**
 * @hidden
 */
function withModifiers(e, modifiers) {
    return e.altKey === ((modifiers & Modifiers.AltKey) === Modifiers.AltKey) &&
        e.ctrlKey === ((modifiers & Modifiers.CtrlKey) === Modifiers.CtrlKey) &&
        e.shiftKey === ((modifiers & Modifiers.ShiftKey) === Modifiers.ShiftKey) &&
        e.metaKey === ((modifiers & Modifiers.MetaKey) === Modifiers.MetaKey);
}
/**
 * @hidden
 */
function noModifiers(e) {
    return withModifiers(e, Modifiers.None);
}

/**
 * @hidden
 */
var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(ngZone, editService, localization, changeDetector, element, focusService) {
        var _this = this;
        this.ngZone = ngZone;
        this.editService = editService;
        this.localization = localization;
        this.changeDetector = changeDetector;
        this.element = element;
        this.focusService = focusService;
        this.resources = [];
        this.timezone = 'Etc/UTC';
        this.setTimeZone = false;
        this.setSeparateStartEndTimeZones = false;
        this.subs = this.editService.changed.subscribe(function () {
            _this.ngZone.run(function () { _this.onChange(); });
        });
        this.subs.add(fromEvent(this.element.nativeElement, 'keydown')
            .pipe(filter(function () { return _this.isActive; }))
            .subscribe(function (e) {
            if (e.keyCode === Keys.Escape) {
                _this.reset();
            }
            if (e.keyCode === Keys.Enter && (withModifiers(e, Modifiers.CtrlKey) || withModifiers(e, Modifiers.MetaKey))) {
                _this.onSave(e);
            }
            e.stopPropagation();
        }));
    }
    Object.defineProperty(EditDialogComponent.prototype, "isEditingSeries", {
        get: function () {
            return this.editMode === 2 /* Series */ && Boolean(this.formGroup.get(this.fields.recurrenceRule));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "eventTimezone", {
        get: function () {
            return formValueOrDefault(this.formGroup, this.fields.startTimezone, this.timezone);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "endTimezone", {
        get: function () {
            return formValueOrDefault(this.formGroup, this.fields.endTimezone, this.eventTimezone);
        },
        enumerable: true,
        configurable: true
    });
    EditDialogComponent.prototype.onChange = function () {
        var _this = this;
        this.changeDetector.markForCheck();
        if (this.editService.hasNewEvent) {
            this.editMode = 2 /* Series */;
            this.formGroup = this.editService.context.formGroup;
            this.isNew = true;
            this.applyLocalTimezone();
        }
        else if (this.editService.isEditing()) {
            var _a = this.editService.context, dataItem = _a.dataItem, mode = _a.mode;
            this.formGroup = this.editService.context.formGroup;
            this.isNew = false;
            this.editedEvent = dataItem;
            this.editMode = isPresent(mode) ? mode : 2 /* Series */;
            this.applyLocalTimezone();
        }
        else {
            this.reset();
            return;
        }
        if (!this.editTemplate) {
            this.addTimeZoneCheckboxesToFormGroup();
            this.subscribeToFormGroupChanges();
        }
        if (isPresent(this.formGroup)) {
            this.recurrenceStart = this.formGroup.get(this.fields.start).value;
        }
        this.ngZone.onStable.pipe(take(1)).subscribe(function () {
            _this.titleInput.nativeElement.select();
        });
        this.isActive = true;
    };
    EditDialogComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    EditDialogComponent.prototype.onCancel = function (e) {
        e.preventDefault();
        this.onClose();
        this.changeDetector.markForCheck();
    };
    EditDialogComponent.prototype.onSave = function (e) {
        e.preventDefault();
        this.applyTimezone();
        this.editService.save();
        this.changeDetector.markForCheck();
    };
    EditDialogComponent.prototype.onClose = function () {
        this.editService.endEdit();
        this.changeDetector.markForCheck();
        this.focusService.focus();
    };
    Object.defineProperty(EditDialogComponent.prototype, "hasAllDay", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.isAllDay));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "hasStartTimeZone", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.startTimezone));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "isStartTimeZoneVisible", {
        get: function () {
            return this.formGroup && this.formGroup.get('startTimezoneCheckbox').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "hasEndTimeZone", {
        get: function () {
            return Boolean(this.formGroup.get(this.fields.endTimezone));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditDialogComponent.prototype, "isEndTimeZoneVisible", {
        get: function () {
            return this.formGroup && this.formGroup.get('endTimezoneCheckbox').value;
        },
        enumerable: true,
        configurable: true
    });
    EditDialogComponent.prototype.getFormValue = function (field) {
        if (field) {
            return this.formGroup.get(field);
        }
    };
    EditDialogComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    EditDialogComponent.prototype.onResourceClick = function (resource) {
        var resourceEditors = resource.multiple ? this.multipleResourceEditors : this.singleResourceEditors;
        var currentEditor = resourceEditors.filter(function (editor) { return editor.resource.field === resource.field; }).pop();
        if (currentEditor) {
            currentEditor.focus();
        }
    };
    EditDialogComponent.prototype.reset = function () {
        this.isActive = false;
        this.setTimeZone = false;
        this.setSeparateStartEndTimeZones = false;
        this.removeTimeZoneCheckboxesFromFormGroup();
        this.focusService.focus();
    };
    EditDialogComponent.prototype.addTimeZoneCheckboxesToFormGroup = function () {
        if (isPresent(this.formGroup)) {
            var startField = this.fields.startTimezone;
            this.formGroup.addControl('startTimezoneCheckbox', new FormControl(this.formGroup.contains(startField) &&
                this.formGroup.get(startField).value));
            var endField = this.fields.endTimezone;
            this.formGroup.addControl('endTimezoneCheckbox', new FormControl(this.formGroup.contains(endField) &&
                this.formGroup.get(endField).value));
        }
    };
    EditDialogComponent.prototype.removeTimeZoneCheckboxesFromFormGroup = function () {
        if (isPresent(this.formGroup)) {
            this.formGroup.removeControl('startTimezoneCheckbox');
            this.formGroup.removeControl('endTimezoneCheckbox');
        }
    };
    EditDialogComponent.prototype.subscribeToFormGroupChanges = function () {
        var _this = this;
        if (isPresent(this.formGroup)) {
            var fields_1 = this.fields;
            this.formGroup.get('startTimezoneCheckbox').valueChanges.subscribe(function (isTrue) {
                if (!isTrue) {
                    _this.formGroup.get(fields_1.startTimezone).setValue(null, { emitEvent: false });
                    _this.formGroup.get(fields_1.endTimezone).setValue(null, { emitEvent: false });
                    _this.formGroup.get('endTimezoneCheckbox').setValue(false, { emitEvent: false });
                }
            });
            this.formGroup.get('endTimezoneCheckbox').valueChanges.subscribe(function (isTrue) {
                if (!isTrue) {
                    _this.formGroup.get(fields_1.endTimezone).setValue(null, { emitEvent: false });
                }
            });
            this.formGroup.get(fields_1.start).valueChanges.subscribe(function (newStart) {
                _this.recurrenceStart = newStart;
            });
        }
    };
    /**
     * Converts the event dates to "display dates" that look like the original date in its time zone.
     * The result does not represent the same moment in time and must be converted back to local dates.
     */
    EditDialogComponent.prototype.applyLocalTimezone = function () {
        var fields = this.fields;
        var start = this.readDateAsLocal(fields.start, this.eventTimezone);
        var end = this.readDateAsLocal(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    };
    /**
     * Converts the "display dates" used by the editors back to local dates that represent the true moment in time.
     */
    EditDialogComponent.prototype.applyTimezone = function () {
        var fields = this.fields;
        var start = this.readDateWithTimezone(fields.start, this.eventTimezone);
        var end = this.readDateWithTimezone(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    };
    EditDialogComponent.prototype.readDateWithTimezone = function (field, timezone) {
        var value = this.formGroup.get(field).value;
        return ZonedDate.fromUTCDate(toUTCDateTime(value), timezone).toLocalDate();
    };
    EditDialogComponent.prototype.readDateAsLocal = function (field, timezone) {
        var value = this.formGroup.get(field).value;
        return toLocalDate(ZonedDate.fromLocalDate(value, timezone).toUTCDate());
    };
    EditDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-edit-dialog',
                    template: "\n        <kendo-dialog (close)='onClose()' [minWidth]='700' *ngIf='isActive' title='{{ textFor(\"editorTitle\") }}' class='k-scheduler-edit-dialog'>\n            <ng-container *ngIf='!editTemplate'>\n                <div class='k-scheduler-edit-form'>\n                    <div class='k-edit-form-container'>\n                        <form novalidate [formGroup]='formGroup'>\n                            <div class='k-edit-label'>\n                                <label for='k-event-title'>{{ textFor('editorEventTitle') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <input #title id='k-event-title' class='k-textbox' placeholder='Title' [formControl]='formGroup.get(fields.title)' />\n                            </div>\n\n                            <div class='k-edit-label'>\n                                <label (click)=\"startDateTimePicker.focus()\">{{ textFor('editorEventStart') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <kendo-scheduler-datetime-picker #startDateTimePicker [formControl]='formGroup.get(fields.start)'\n                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>\n                                </kendo-scheduler-datetime-picker>\n                            </div>\n\n                            <ng-container *ngIf=\"isStartTimeZoneVisible\">\n                                <div class='k-edit-label'>\n                                    <label (click)=\"startTzPicker.focus()\">{{ textFor('editorEventStartTimeZone') }}</label>\n                                </div>\n\n                                <div class='k-edit-field'>\n                                    <kendo-timezone-editor #startTzPicker [formControl]='formGroup.get(fields.startTimezone)'></kendo-timezone-editor>\n                                </div>\n                            </ng-container>\n\n                            <div class='k-edit-label'>\n                                <label (click)=\"endDateTimePicker.focus()\">{{ textFor('editorEventEnd') }}</label>\n                            </div>\n                            <div class='k-edit-field'>\n                                <kendo-scheduler-datetime-picker #endDateTimePicker [formControl]='formGroup.get(fields.end)'\n                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>\n                                </kendo-scheduler-datetime-picker>\n                            </div>\n\n                            <ng-container *ngIf=\"isEndTimeZoneVisible\">\n                                <div class='k-edit-label'>\n                                    <label (click)=\"endTzPicker.focus()\">{{ textFor('editorEventEndTimeZone') }}</label>\n                                </div>\n\n                                <div class='k-edit-field'>\n                                    <kendo-timezone-editor #endTzPicker [formControl]='formGroup.get(fields.endTimezone)'></kendo-timezone-editor>\n                                </div>\n                            </ng-container>\n\n                            <div class='k-edit-field' *ngIf=\"hasAllDay\">\n                                <input type='checkbox' id='k-is-allday-chkbox' class='k-checkbox' [formControl]='formGroup.get(fields.isAllDay)' />\n                                <label class='k-checkbox-label' for='k-is-allday-chkbox'>{{ textFor('editorEventAllDay') }}</label>\n                            </div>\n\n                            <div class='k-edit-field' *ngIf=\"hasStartTimeZone\">\n                                <input type='checkbox' id='k-set-timezone' class='k-checkbox'\n                                formControlName='startTimezoneCheckbox' />\n                                <label class='k-checkbox-label' for='k-set-timezone'>{{ textFor('editorEventTimeZone') }}</label>\n\n                                <ng-container *ngIf=\"isStartTimeZoneVisible && hasEndTimeZone\">\n                                    <input type='checkbox' id='k-use-separate' class='k-checkbox' formControlName='endTimezoneCheckbox' />\n                                    <label class='k-checkbox-label' for='k-use-separate'>{{ textFor('editorEventSeparateTimeZones') }}</label>\n                                </ng-container>\n                            </div>\n\n                            <ng-container *ngIf=\"isEditingSeries\">\n                                <kendo-recurrence-editor\n                                    [formControl]='formGroup.get(fields.recurrenceRule)'\n                                    [start]='recurrenceStart'\n                                    [timezone]='eventTimezone'\n                                ></kendo-recurrence-editor>\n                            </ng-container>\n\n                            <ng-container *ngIf='getFormValue(fields.description)'>\n                                <div class='k-edit-label'>\n                                    <label for='k-event-description'>{{ textFor('editorEventDescription') }}</label>\n                                </div>\n                                <div class='k-edit-field'>\n                                    <textarea id='k-event-description' class='k-textbox' [formControl]='formGroup.get(fields.description)'></textarea>\n                                </div>\n                            </ng-container>\n\n                            <ng-container *ngFor='let resource of resources'>\n                                <ng-container *ngIf='getFormValue(resource.field)'>\n                                    <div class='k-edit-label'>\n                                        <label (click)=\"onResourceClick(resource)\">\n                                            {{ resource.name ? resource.name : resource.field }}\n                                        </label>\n                                    </div>\n                                    <div class='k-edit-field'>\n                                        <kendo-multiple-resource-editor\n                                            *ngIf='resource.multiple'\n                                            [formControl]='formGroup.get(resource.field)'\n                                            [resource]='resource'>\n                                        </kendo-multiple-resource-editor>\n                                        <kendo-single-resource-editor\n                                            *ngIf='!resource.multiple'\n                                            [formControl]='formGroup.get(resource.field)'\n                                            [resource]='resource'>\n                                        </kendo-single-resource-editor>\n                                    </div>\n                                </ng-container>\n                            </ng-container>\n                        </form>\n                    </div>\n                </div>\n            </ng-container>\n\n            <ng-container *ngIf='editTemplate'>\n                <form novalidate [formGroup]='formGroup'>\n                    <ng-container [ngTemplateOutlet]='editTemplate.templateRef'\n                        [ngTemplateOutletContext]=\"{\n                            $implicit: formGroup,\n                            formGroup: formGroup,\n                            dataItem: editedEvent,\n                            editMode: editMode,\n                            isNew: isNew\n                        }\">\n                    </ng-container>\n                </form>\n            </ng-container>\n\n            <kendo-dialog-actions>\n                <button class=\"k-button\" (click)=\"onCancel($event)\">{{ textFor('cancel') }}</button>\n                <button class=\"k-button k-primary\" (click)=\"onSave($event)\" [disabled]=\"!formGroup.valid\">{{ textFor('save') }}</button>\n            </kendo-dialog-actions>\n        </kendo-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    EditDialogComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: EditService },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FocusService }
    ]; };
    EditDialogComponent.propDecorators = {
        multipleResourceEditors: [{ type: ViewChildren, args: [MultipleResourceEditorComponent,] }],
        singleResourceEditors: [{ type: ViewChildren, args: [SingleResourceEditorComponent,] }],
        titleInput: [{ type: ViewChild, args: ['title',] }],
        resources: [{ type: Input }],
        timezone: [{ type: Input }],
        fields: [{ type: Input }],
        editTemplate: [{ type: Input }]
    };
    return EditDialogComponent;
}());

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
var SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SchedulerDateTimePickerComponent; })
};
/**
 * @hidden
 */
var SchedulerDateTimePickerComponent = /** @class */ (function () {
    function SchedulerDateTimePickerComponent() {
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
    }
    SchedulerDateTimePickerComponent.prototype.writeValue = function (newDate) {
        if (newDate instanceof Date) {
            this.date = newDate;
        }
    };
    SchedulerDateTimePickerComponent.prototype.onValueChange = function (newValue) {
        this.onChangeCallback(newValue);
        this.valueChange.emit(newValue);
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.focus = function () {
        this.datePicker.focus();
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SchedulerDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-scheduler-datetime-picker',
                    template: "\n    <kendo-datepicker\n        #datepicker\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-datepicker>\n    <kendo-timepicker *ngIf='!isAllDay'\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-timepicker>\n    "
                },] },
    ];
    SchedulerDateTimePickerComponent.propDecorators = {
        datePicker: [{ type: ViewChild, args: ['datepicker',] }],
        isAllDay: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return SchedulerDateTimePickerComponent;
}());

var offsetPositions = ['first', 'second', 'third', 'fourth', 'last'];
var frequencies = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * @hidden
 */
var dayRule = [
    { day: 0, offset: 0 },
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 */
var weekdayRule = [
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 }
];
/**
 * @hidden
 */
var weekendRule = [
    { day: 0, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 *
 * The internal service for handling changes in the RecurrenceEditor component.
 */
var RecurrenceService = /** @class */ (function () {
    function RecurrenceService(intl, localization) {
        this.intl = intl;
        this.localization = localization;
        this.change = new EventEmitter();
        this.endRuleChange = new EventEmitter();
        this.frequencyChange = new EventEmitter();
        this.repeatOnRuleChange = new EventEmitter();
    }
    RecurrenceService.prototype.init = function (rrule, start, timezone) {
        if (rrule === void 0) { rrule = ""; }
        this.rrule = parseRule({
            recurrenceRule: rrule,
            weekStart: this.intl.firstDay()
        });
        this.start = start;
        this.timezone = timezone;
    };
    Object.defineProperty(RecurrenceService.prototype, "frequencies", {
        get: function () {
            var _this = this;
            return frequencies.map(function (freq) { return ({
                value: freq,
                text: _this.localization.get('frequencies' + capitalize(freq))
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "frequency", {
        get: function () {
            if (isPresent(this.rrule) && !isNullOrEmptyString(this.rrule.freq)) {
                return this.rrule.freq;
            }
            return 'never';
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setFrequency = function (freq) {
        this.rrule = {};
        this.rrule.freq = freq;
        this.rrule.interval = 1;
        if (freq === 'weekly') {
            this.rrule.byWeekDay = [{
                    day: this.start.getDay(),
                    offset: 0
                }];
        }
        if (freq === 'monthly' || freq === 'yearly') {
            this.rrule.byMonthDay = [this.start.getDate()];
        }
        if (freq === 'yearly') {
            this.rrule.byMonth = [this.start.getMonth() + 1];
        }
        this.frequencyChange.emit();
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "interval", {
        set: function (newInterval) {
            this.rrule.interval = newInterval;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "count", {
        set: function (newCount) {
            this.rrule.count = newCount;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "until", {
        get: function () {
            if (isPresent(this.rrule.until)) {
                return toLocalDate(this.rrule.until);
            }
        },
        set: function (newUntil) {
            this.rrule.until = ZonedDate.fromLocalDate(newUntil, this.timezone);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setWeekDays = function (newWeekDays) {
        this.rrule.byWeekDay = newWeekDays;
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "monthDays", {
        set: function (newMonthDays) {
            this.rrule.byMonthDay = newMonthDays;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "positions", {
        set: function (newPositions) {
            this.rrule.bySetPosition = newPositions;
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.setMonths = function (newMonths) {
        this.rrule.byMonth = newMonths;
        this.onChange();
    };
    Object.defineProperty(RecurrenceService.prototype, "months", {
        get: function () {
            return this.intl.dateFormatNames({
                type: 'months',
                nameType: 'wide'
            }).map(function (month, idx) { return ({
                text: month,
                value: idx + 1
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "weekDays", {
        /*
            ToDo Refactor weekDays and extendedWeekDays getters into a single method
        */
        get: function () {
            var firstDay = this.intl.firstDay();
            var abbrNames = this.intl.dateFormatNames({
                type: 'days',
                nameType: 'abbreviated'
            }).map(function (day, idx) { return ({
                text: day,
                value: idx
            }); });
            /* Sorting according to first week day */
            return (abbrNames.slice(firstDay)).concat(abbrNames.slice(0, firstDay));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "extendedWeekDays", {
        get: function () {
            var firstDay = this.intl.firstDay();
            var wideNames = this.intl.dateFormatNames({
                type: 'days',
                nameType: 'wide'
            }).map(function (day, idx) { return ({
                text: day,
                value: idx
            }); });
            var sortedWideNames = (wideNames.slice(firstDay)).concat(wideNames.slice(0, firstDay));
            var specialRules = [
                { text: this.localization.get('weekdaysDay'), value: 'day' },
                { text: this.localization.get('weekdaysWeekday'), value: 'weekday' },
                { text: this.localization.get('weekdaysWeekendday'), value: 'weekend' }
            ];
            return specialRules.concat(sortedWideNames);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "offsetPositions", {
        get: function () {
            var _this = this;
            var values = [1, 2, 3, 4, -1];
            return offsetPositions.map(function (offset, idx) { return ({
                text: _this.localization.get('offsetPositions' + capitalize(offset)),
                value: values[idx]
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "endRule", {
        get: function () {
            if (isPresent(this.rrule.count)) {
                return 'count';
            }
            else if (isPresent(this.rrule.until)) {
                return 'until';
            }
            else {
                return 'never';
            }
        },
        set: function (endRule) {
            if (endRule === 'count') {
                this.rrule.until = null;
            }
            else if (endRule === 'until') {
                this.rrule.count = null;
            }
            else {
                /* never */
                this.rrule.count = null;
                this.rrule.until = null;
            }
            this.endRuleChange.emit(endRule);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceService.prototype, "repeatOnRule", {
        get: function () {
            if (isPresent(this.rrule.byWeekDay)) {
                return 'weekday';
            }
            else if (isPresent(this.rrule.byMonthDay)) {
                return 'monthday';
            }
            return null;
        },
        set: function (repeatOnRule) {
            if (repeatOnRule === 'monthday') {
                this.rrule.byWeekDay = null;
                this.rrule.bySetPosition = null;
            }
            else {
                /* weekDays */
                this.rrule.byMonthDay = null;
            }
            this.repeatOnRuleChange.emit(repeatOnRule);
            this.onChange();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceService.prototype.onChange = function () {
        if (this.frequency === 'never') {
            this.change.emit(null);
        }
        else {
            this.change.emit(serializeRule(this.rrule, this.timezone));
        }
    };
    RecurrenceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RecurrenceService.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService }
    ]; };
    return RecurrenceService;
}());

/**
 * @hidden
 */
var RecurrenceLocalizationService = /** @class */ (function (_super) {
    __extends(RecurrenceLocalizationService, _super);
    function RecurrenceLocalizationService(prefix, messageService, _rtl, schedulerLocalization) {
        var _this = _super.call(this, prefix, messageService, _rtl) || this;
        _this.schedulerLocalization = schedulerLocalization;
        return _this;
    }
    RecurrenceLocalizationService.prototype.get = function (shortKey) {
        if (this.schedulerLocalization) {
            return this.schedulerLocalization.get('recurrenceEditor' + capitalize(shortKey));
        }
        return _super.prototype.get.call(this, shortKey);
    };
    /** @nocollapse */
    RecurrenceLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] },
        { type: SchedulerLocalizationService, decorators: [{ type: Optional }, { type: Inject, args: [SchedulerLocalizationService,] }] }
    ]; };
    return RecurrenceLocalizationService;
}(LocalizationService));

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
var RECURRENCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RecurrenceEditorComponent; })
};
/**
 * Represents the Kendo UI Recurrence Editor component for Angular.
 */
var RecurrenceEditorComponent = /** @class */ (function () {
    function RecurrenceEditorComponent(recurrenceService) {
        var _this = this;
        this.recurrenceService = recurrenceService;
        this.cssClass = true;
        /**
         * Specifies the id of the timezone that will be used.
         */
        this.timezone = 'Etc/UTC';
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.subscriptions = this.recurrenceService.change.subscribe(function (rrule) {
            _this.emitChange(rrule);
        });
    }
    Object.defineProperty(RecurrenceEditorComponent.prototype, "start", {
        get: function () {
            return isPresent(this._start) ? this._start : getDate(new Date());
        },
        /**
         * Specifies the start date of the event.
         */
        set: function (value) {
            this._start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEditorComponent.prototype, "currentFreq", {
        /**
         * @hidden
         */
        get: function () {
            return this.recurrenceService.frequency;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.ngOnInit = function () {
        this.recurrenceService.init('', this.start, this.timezone);
    };
    RecurrenceEditorComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('start', changes)) {
            this.recurrenceService.start = this.start;
        }
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.writeValue = function (rrule) {
        this.recurrenceService.init(typeof rrule === 'string' ? rrule : '', this.start, this.timezone);
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    RecurrenceEditorComponent.prototype.emitChange = function (rrule) {
        this.onChangeCallback(rrule);
        this.valueChange.emit(rrule);
    };
    RecurrenceEditorComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoRecurrenceEditor',
                    providers: [
                        RecurrenceLocalizationService,
                        {
                            provide: LocalizationService,
                            useExisting: RecurrenceLocalizationService
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.recurrenceeditor'
                        },
                        RECURRENCE_VALUE_ACCESSOR,
                        RecurrenceService
                    ],
                    selector: 'kendo-recurrence-editor',
                    template: "\n        <ng-container kendoRecurrenceEditorLocalizedMessages\n            i18n-repeat=\"kendo.recurrenceeditor.repeat|The text similar to 'Repeat' displayed in the recurrence editor.\"\n            repeat='Repeat'\n\n            i18n-dailyInterval=\"kendo.recurrenceeditor.dailyInterval|The text similar to 'day(s)' displayed in the recurrence editor.\"\n            dailyInterval='day(s)'\n\n            i18n-dailyRepeatEvery=\"kendo.recurrenceeditor.dailyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            dailyRepeatEvery='Repeat every'\n\n            i18n-weeklyInterval=\"kendo.recurrenceeditor.weeklyInterval|The text similar to 'week(s)' displayed in the recurrence editor.\"\n            weeklyInterval='week(s)'\n\n            i18n-weeklyRepeatEvery=\"kendo.recurrenceeditor.weeklyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            weeklyRepeatEvery='Repeat every'\n\n            i18n-weeklyRepeatOn=\"kendo.recurrenceeditor.weeklyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            weeklyRepeatOn='Repeat on'\n\n            i18n-monthlyDay=\"kendo.recurrenceeditor.monthlyDay|The text similar to 'Day' displayed in the recurrence editor.\"\n            monthlyDay='Day'\n\n            i18n-monthlyInterval=\"kendo.recurrenceeditor.monthlyInterval|The text similar to 'month(s)' displayed in the recurrence editor.\"\n            monthlyInterval='month(s)'\n\n            i18n-monthlyRepeatEvery=\"kendo.recurrenceeditor.monthlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            monthlyRepeatEvery='Repeat every'\n\n            i18n-monthlyRepeatOn=\"kendo.recurrenceeditor.monthlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            monthlyRepeatOn='Repeat on'\n\n            i18n-yearlyOf=\"kendo.recurrenceeditor.yearlyOf|The text similar to 'of' displayed in the recurrence editor.\"\n            yearlyOf='of'\n\n            i18n-yearlyRepeatEvery=\"kendo.recurrenceeditor.yearlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            yearlyRepeatEvery='Repeat every'\n\n            i18n-yearlyRepeatOn=\"kendo.recurrenceeditor.yearlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            yearlyRepeatOn='Repeat on'\n\n            i18n-yearlyInterval=\"kendo.recurrenceeditor.yearlyInterval|The text similar to 'year(s)' displayed in the recurrence editor.\"\n            yearlyInterval='year(s)'\n\n            i18n-frequenciesDaily=\"kendo.recurrenceeditor.frequenciesDaily|The text similar to 'Daily' displayed in the recurrence editor.\"\n            frequenciesDaily='Daily'\n\n            i18n-frequenciesMonthly=\"kendo.recurrenceeditor.frequenciesMonthly|The text similar to 'Monthly' displayed in the recurrence editor.\"\n            frequenciesMonthly='Monthly'\n\n            i18n-frequenciesNever=\"kendo.recurrenceeditor.frequenciesNever|The text similar to 'Never' displayed in the recurrence editor.\"\n            frequenciesNever='Never'\n\n            i18n-frequenciesWeekly=\"kendo.recurrenceeditor.frequenciesWeekly|The text similar to 'Weekly' displayed in the recurrence editor.\"\n            frequenciesWeekly='Weekly'\n\n            i18n-frequenciesYearly=\"kendo.recurrenceeditor.frequenciesYearly|The text similar to 'Yearly' displayed in the recurrence editor.\"\n            frequenciesYearly='Yearly'\n\n            i18n-fffsetPositionsFirst=\"kendo.recurrenceeditor.fffsetPositionsFirst|The text similar to 'First' displayed in the recurrence editor.\"\n            offsetPositionsFirst='First'\n\n            i18n-offsetPositionsSecond=\"kendo.recurrenceeditor.offsetPositionsSecond|The text similar to 'Second' displayed in the recurrence editor.\"\n            offsetPositionsSecond='Second'\n\n            i18n-offsetPositionsThird=\"kendo.recurrenceeditor.offsetPositionsThird|The text similar to 'Third' displayed in the recurrence editor.\"\n            offsetPositionsThird='Third'\n\n            i18n-offsetPositionsFourth=\"kendo.recurrenceeditor.offsetPositionsFourth|The text similar to 'Fourth' displayed in the recurrence editor.\"\n            offsetPositionsFourth='Fourth'\n\n            i18n-offsetPositionsLast=\"kendo.recurrenceeditor.offsetPositionsLast|The text similar to 'Last' displayed in the recurrence editor.\"\n            offsetPositionsLast='Last'\n\n            i18n-weekdaysDay=\"kendo.recurrenceeditor.weekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysDay='Day'\n\n            i18n-weekdaysWeekday=\"kendo.recurrenceeditor.weekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysWeekday='Weekday'\n\n            i18n-weekdaysWeekendday=\"kendo.recurrenceeditor.weekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysWeekendday='Weekend Day'\n\n            i18n-endAfter=\"kendo.recurrenceeditor.endAfter|The text similar to 'After' displayed in the recurrence editor.\"\n            endAfter='After'\n\n            i18n-endOccurrence=\"kendo.recurrenceeditor.endOccurrence|The text similar to 'occurrence(s)' displayed in the recurrence editor.\"\n            endOccurrence='occurrence(s)'\n\n            i18n-endLabel=\"kendo.recurrenceeditor.endLabel|The text similar to 'End' displayed in the recurrence editor.\"\n            endLabel='End'\n\n            i18n-endNever=\"kendo.recurrenceeditor.endNever|The text similar to 'Never' displayed in the recurrence editor.\"\n            endNever='Never'\n\n            i18n-endOn=\"kendo.recurrenceeditor.endOn|The text similar to 'On' displayed in the recurrence editor.\"\n            endOn='On'\n        >\n        </ng-container>\n\n        <kendo-recurrence-frequency-editor>\n        </kendo-recurrence-frequency-editor>\n\n        <div class='k-recur-view'>\n            <kendo-recurrence-interval-editor *ngIf=\"currentFreq !== 'never'\">\n            </kendo-recurrence-interval-editor>\n\n            <kendo-recurrence-weekday-rule-editor *ngIf=\"currentFreq === 'weekly'\">\n            </kendo-recurrence-weekday-rule-editor>\n\n            <kendo-recurrence-monthly-yearly-editor *ngIf=\"currentFreq === 'monthly' || currentFreq === 'yearly'\">\n            </kendo-recurrence-monthly-yearly-editor>\n\n            <kendo-recurrence-end-rule-editor *ngIf=\"currentFreq !== 'never'\">\n            </kendo-recurrence-end-rule-editor>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService }
    ]; };
    RecurrenceEditorComponent.propDecorators = {
        cssClass: [{ type: HostBinding, args: ['class.k-recurrence-editor',] }],
        start: [{ type: Input }],
        timezone: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return RecurrenceEditorComponent;
}());

/**
 * @hidden
 */
var RecurrenceFrequencyEditorComponent = /** @class */ (function () {
    function RecurrenceFrequencyEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
    }
    RecurrenceFrequencyEditorComponent.prototype.ngOnInit = function () {
        this.frequencies = this.recurrence.frequencies;
    };
    Object.defineProperty(RecurrenceFrequencyEditorComponent.prototype, "selected", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceFrequencyEditorComponent.prototype.onClick = function (newFreq) {
        if (newFreq.value !== this.selected) {
            this.recurrence.setFrequency(newFreq.value);
        }
    };
    RecurrenceFrequencyEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceFrequencyEditorComponent.prototype.onFrequencyClick = function () {
        var selected = this.weekDayButtons.toArray().find(function (r) { return r.selected; });
        if (selected) {
            selected.focus();
        }
    };
    RecurrenceFrequencyEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-frequency-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onFrequencyClick()\">{{ textFor('repeat') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <kendo-buttongroup [selection]=\"'single'\">\n                <button *ngFor='let freq of frequencies' kendoButton\n                        [style.width.px]=\"100\"\n                        [togglable]=\"true\"\n                        [selected]=\"freq.value === selected\"\n                        (click)=\"onClick(freq)\"\n                >{{ freq.text }}</button>\n            </kendo-buttongroup>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceFrequencyEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceFrequencyEditorComponent.propDecorators = {
        weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
    };
    return RecurrenceFrequencyEditorComponent;
}());

/**
 * @hidden
 */
var EndRuleRadioButtonDirective = /** @class */ (function () {
    function EndRuleRadioButtonDirective(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'end';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    EndRuleRadioButtonDirective.prototype.ngOnInit = function () {
        this.endRule = this.endRuleId.split('-').pop();
        this.renderer.setAttribute(this.elem, 'id', this.endRuleId);
    };
    EndRuleRadioButtonDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    EndRuleRadioButtonDirective.prototype.ngOnDestroy = function () {
        if (this.destroyChange) {
            this.destroyChange();
        }
    };
    EndRuleRadioButtonDirective.prototype.onChange = function () {
        if (this.elem.checked) {
            this.reccurence.endRule = this.endRule;
            this.changeDetector.markForCheck();
        }
    };
    EndRuleRadioButtonDirective.prototype.setCheckedState = function () {
        var isChecked = this.endRule === this.reccurence.endRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    };
    Object.defineProperty(EndRuleRadioButtonDirective.prototype, "elem", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    EndRuleRadioButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoRecurrenceEndRuleRadioButton]'
                },] },
    ];
    /** @nocollapse */
    EndRuleRadioButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: RecurrenceService },
        { type: ChangeDetectorRef }
    ]; };
    EndRuleRadioButtonDirective.propDecorators = {
        type: [{ type: HostBinding, args: ['attr.type',] }],
        name: [{ type: HostBinding, args: ['attr.name',] }],
        radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
        endRuleId: [{ type: Input, args: ["kendoRecurrenceEndRuleRadioButton",] }]
    };
    return EndRuleRadioButtonDirective;
}());

/**
 * @hidden
 */
var RecurrenceEndRuleEditorComponent = /** @class */ (function () {
    function RecurrenceEndRuleEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeChanges();
    }
    RecurrenceEndRuleEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.setEndRule = function (endRule) {
        if (endRule === 'count') {
            this.recurrence.rrule.count = this.countValue;
        }
        else if (endRule === 'until') {
            this.recurrence.until = this.untilValue;
        }
    };
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "rrule", {
        get: function () {
            return this.recurrence.rrule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "isCountDisabled", {
        get: function () {
            return this.recurrence.endRule !== 'count';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "isUntilDisabled", {
        get: function () {
            return this.recurrence.endRule !== 'until';
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceEndRuleEditorComponent.prototype.onCountChange = function (value) {
        if (isPresent(value)) {
            this.recurrence.count = value;
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onCountBlur = function () {
        if (!isPresent(this.countValue)) {
            this.recurrence.count = this.countValue = 1;
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onUntilChange = function (value) {
        if (isPresent(value)) {
            this.recurrence.until = this.createUntil(value);
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onUntilBlur = function () {
        if (!isPresent(this.untilValue)) {
            this.recurrence.until = this.untilValue = this.createUntil(this.recurrence.start);
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceEndRuleEditorComponent.prototype.onEndLabelClick = function () {
        var selected = this.endRuleRadioButtons.toArray().find(function (r) { return r.elem.checked; });
        if (selected) {
            selected.elem.focus();
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.setInitialValues = function () {
        this.countValue = this.rrule.count || 1;
        var currentUntil = this.recurrence.until;
        var currentStart = this.recurrence.start;
        this.untilValue = isPresent(currentUntil) ? currentUntil : this.createUntil(currentStart);
    };
    RecurrenceEndRuleEditorComponent.prototype.subscribeChanges = function () {
        var _this = this;
        this.subscriptions = this.recurrence.endRuleChange.subscribe(function (endRule) {
            _this.setEndRule(endRule);
        });
        this.subscriptions.add(this.recurrence.frequencyChange.subscribe(function () {
            _this.setInitialValues();
        }));
    };
    RecurrenceEndRuleEditorComponent.prototype.createUntil = function (until) {
        // Read the until date as UTC date parts to avoid interfering with the local time zone.
        var untilDate = toUTCDate(until);
        untilDate.setUTCDate(untilDate.getUTCDate() + 1);
        // Convert to the scheduler time zone.
        return ZonedDate.fromUTCDate(untilDate, this.recurrence.timezone).toLocalDate();
    };
    RecurrenceEndRuleEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-end-rule-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onEndLabelClick()\">{{ textFor('endLabel') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <ul class='k-reset'>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-never'\" />\n                    <label class='k-radio-label' for='k-endrule-never'>{{ textFor('endNever') }}</label>\n                </li>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-count'\" />\n                    <label class='k-radio-label' for='k-endrule-count'>{{ textFor('endAfter') }}</label>\n\n                    <kendo-numerictextbox\n                        [style.width.px]='70'\n                        [autoCorrect]='true'\n                        [decimals]='0'\n                        [disabled]='isCountDisabled'\n                        [format]=\"'#'\"\n                        [min]='1'\n                        [(value)]='countValue'\n                        (blur)=\"onCountBlur()\"\n                        (valueChange)='onCountChange($event)'>\n                    </kendo-numerictextbox>\n                    <span>{{ textFor('endOccurrence') }}</span>\n                </li>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-until'\" />\n                    <label class='k-radio-label' for='k-endrule-until'>{{ textFor('endOn') }}</label>\n\n                    <kendo-datepicker\n                        [style.width.px]='150'\n                        [disabled]='isUntilDisabled'\n                        [(value)]='untilValue'\n                        (blur)=\"onUntilBlur()\"\n                        (valueChange)='onUntilChange($event)'>\n                    </kendo-datepicker>\n                </li>\n            </ul>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceEndRuleEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceEndRuleEditorComponent.propDecorators = {
        endRuleRadioButtons: [{ type: ViewChildren, args: [EndRuleRadioButtonDirective,] }]
    };
    return RecurrenceEndRuleEditorComponent;
}());

/**
 * @hidden
 */
var RecurrenceIntervalEditorComponent = /** @class */ (function () {
    function RecurrenceIntervalEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.intervalValue = this.recurrence.rrule.interval || 1;
    }
    Object.defineProperty(RecurrenceIntervalEditorComponent.prototype, "currentFreq", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceIntervalEditorComponent.prototype.onIntervalChange = function (newInterval) {
        if (isPresent(newInterval)) {
            this.recurrence.interval = newInterval;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.onIntervalBlur = function () {
        if (!isPresent(this.intervalValue)) {
            this.recurrence.interval = this.intervalValue = 1;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.textForRepeatEvery = function () {
        var freq = this.currentFreq;
        switch (freq) {
            case 'daily':
                return this.textFor('dailyRepeatEvery');
            case 'weekly':
                return this.textFor('weeklyRepeatEvery');
            case 'monthly':
                return this.textFor('monthlyRepeatEvery');
            case 'yearly':
                return this.textFor('yearlyRepeatEvery');
            default:
                break;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.textForFrequency = function () {
        var freq = this.currentFreq;
        switch (freq) {
            case 'daily':
                return this.textFor('dailyInterval');
            case 'weekly':
                return this.textFor('weeklyInterval');
            case 'monthly':
                return this.textFor('monthlyInterval');
            case 'yearly':
                return this.textFor('yearlyInterval');
            default:
                break;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceIntervalEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-interval-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"intervalNumeric.focus()\">{{ textForRepeatEvery() }}</label>\n        </div>\n\n        <div class='k-edit-field'>\n            <kendo-numerictextbox\n                #intervalNumeric\n                [style.width.px]='70'\n                [min]='1'\n                [decimals]='0'\n                [format]=\"'#'\"\n                [autoCorrect]='true'\n                [(value)]='intervalValue'\n                (blur)=\"onIntervalBlur()\"\n                (valueChange)='onIntervalChange($event)'>\n            </kendo-numerictextbox>\n\n            <span>{{ textForFrequency() }}</span>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceIntervalEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    return RecurrenceIntervalEditorComponent;
}());

/**
 * @hidden
 */
var RepeatOnRadioButtonDirective = /** @class */ (function () {
    function RepeatOnRadioButtonDirective(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'day';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    RepeatOnRadioButtonDirective.prototype.ngOnInit = function () {
        this.renderer.setAttribute(this.elem, 'id', 'k-repeaton-' + this.repeatOnRule);
    };
    RepeatOnRadioButtonDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    RepeatOnRadioButtonDirective.prototype.ngOnDestroy = function () {
        if (this.destroyChange) {
            this.destroyChange();
        }
    };
    RepeatOnRadioButtonDirective.prototype.onChange = function () {
        if (this.elem.checked) {
            this.reccurence.repeatOnRule = this.repeatOnRule;
            this.changeDetector.markForCheck();
        }
    };
    RepeatOnRadioButtonDirective.prototype.setCheckedState = function () {
        var isChecked = this.repeatOnRule === this.reccurence.repeatOnRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    };
    Object.defineProperty(RepeatOnRadioButtonDirective.prototype, "elem", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    RepeatOnRadioButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoRecurrenceRepeatOnRadioButton]'
                },] },
    ];
    /** @nocollapse */
    RepeatOnRadioButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: RecurrenceService },
        { type: ChangeDetectorRef }
    ]; };
    RepeatOnRadioButtonDirective.propDecorators = {
        type: [{ type: HostBinding, args: ['attr.type',] }],
        name: [{ type: HostBinding, args: ['attr.name',] }],
        radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
        repeatOnRule: [{ type: Input, args: ["kendoRecurrenceRepeatOnRadioButton",] }]
    };
    return RepeatOnRadioButtonDirective;
}());

/**
 * @hidden
 */
var RecurrenceMonthlyYearlyEditorComponent = /** @class */ (function () {
    function RecurrenceMonthlyYearlyEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeEventHandlers();
    }
    RecurrenceMonthlyYearlyEditorComponent.prototype.setInitialValues = function () {
        this.extendedWeekDays = this.recurrence.extendedWeekDays;
        this.offsetPositions = this.recurrence.offsetPositions;
        this.currentOffset = this.defaultOffset;
        this.currentWeekDay = this.defaultWeekDay;
        if (this.currentFreq === 'yearly') {
            this.months = this.recurrence.months;
            this.currentMonthMonthDay = this.currentMonthWeekDay = this.recurrence.rrule.byMonth[0];
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.subscribeEventHandlers = function () {
        this.subs = this.recurrence.repeatOnRuleChange.subscribe(this.onRepeatOnRuleChange.bind(this));
        this.subs.add(this.recurrence.frequencyChange.subscribe(this.onFrequencyChange.bind(this)));
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onRepeatOnRuleChange = function (newRepeatOnRule) {
        if (newRepeatOnRule === 'monthday') {
            this.recurrence.rrule.byMonthDay = [this.monthDay];
            if (this.currentFreq === 'yearly') {
                this.recurrence.rrule.byMonth = [this.currentMonthMonthDay];
            }
        }
        else if (newRepeatOnRule === 'weekday') {
            if (typeof this.weekDay === 'string') {
                /* day, weekday or weekend */
                this.recurrence.rrule.bySetPosition = [this.offset];
                this.recurrence.rrule.byWeekDay = this.weekDayRuleFromString(this.weekDay);
            }
            else {
                /* specific weekday */
                this.recurrence.rrule.byWeekDay = [{
                        day: this.weekDay,
                        offset: this.offset
                    }];
            }
            if (this.currentFreq === 'yearly') {
                this.recurrence.rrule.byMonth = [this.currentMonthWeekDay];
            }
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onFrequencyChange = function () {
        this.setInitialValues();
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "monthDay", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (isPresent(rrule.byMonthDay) && rrule.byMonthDay.length > 0) {
                return rrule.byMonthDay[0];
            }
            else if (isPresent(this.currentMonthDay)) {
                return this.currentMonthDay;
            }
            else {
                return this.recurrence.start.getDate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "weekDay", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (isPresent(rrule.byWeekDay)) {
                var weekDaysCount = rrule.byWeekDay.length;
                switch (weekDaysCount) {
                    case 7:
                        return 'day';
                    case 5:
                        return 'weekday';
                    case 2:
                        return 'weekend';
                    case 1:
                        return rrule.byWeekDay[0].day;
                    default:
                        break;
                }
            }
            else if (isPresent(this.currentWeekDay)) {
                return this.currentWeekDay;
            }
            return this.defaultWeekDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "offset", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (isPresent(rrule.byWeekDay)) {
                var weekDaysCount = rrule.byWeekDay.length;
                switch (weekDaysCount) {
                    case 7:
                    case 5:
                    case 2:
                        return rrule.bySetPosition[0];
                    case 1:
                        return rrule.byWeekDay[0].offset;
                    default:
                        break;
                }
            }
            else if (isPresent(this.currentOffset)) {
                return this.currentOffset;
            }
            return this.defaultOffset;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceMonthlyYearlyEditorComponent.prototype.onMonthChange = function (month, repeatOnRule) {
        if (repeatOnRule === 'monthday') {
            this.currentMonthMonthDay = month;
        }
        else {
            this.currentMonthWeekDay = month;
        }
        this.recurrence.setMonths([month]);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onMonthDayChange = function (monthDay) {
        this.currentMonthDay = monthDay;
        this.recurrence.monthDays = [monthDay];
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onOffsetPositionChange = function (offset) {
        var rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            var weekDaysCount = rrule.byWeekDay.length;
            switch (weekDaysCount) {
                case 7:
                case 5:
                case 2:
                    this.recurrence.positions = [offset];
                    break;
                case 1:
                    rrule.byWeekDay[0].offset = offset;
                    this.recurrence.onChange();
                    break;
                default:
                    break;
            }
        }
        this.currentOffset = offset;
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onWeekDayChange = function (weekDay) {
        var weekDays;
        if (typeof weekDay === 'string') {
            /* day, weekday or weekend */
            weekDays = this.weekDayRuleFromString(weekDay);
            this.recurrence.positions = [this.offset];
        }
        else {
            /* specific weekday */
            weekDays = [{
                    day: weekDay,
                    offset: this.offset
                }];
        }
        this.currentWeekDay = weekDay;
        this.recurrence.setWeekDays(weekDays);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.isDisabled = function (repeatOn) {
        return this.recurrence.repeatOnRule !== repeatOn;
    };
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "currentFreq", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "defaultOffset", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "defaultWeekDay", {
        get: function () {
            return this.recurrence.start.getDay();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceMonthlyYearlyEditorComponent.prototype.weekDayRuleFromString = function (weekDay) {
        switch (weekDay) {
            case 'day':
                return dayRule;
            case 'weekday':
                return weekdayRule;
            case 'weekend':
                return weekendRule;
            default:
                break;
        }
        return null;
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.textForRepeatOn = function () {
        var freq = this.currentFreq;
        switch (freq) {
            case 'monthly':
                return this.textFor('monthlyRepeatOn');
            case 'yearly':
                return this.textFor('yearlyRepeatOn');
            default:
                break;
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onRepeatOnLabelClick = function () {
        var selected = this.repeatOnRadioButtons.toArray().find(function (r) { return r.elem.checked; });
        if (selected) {
            selected.elem.focus();
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-monthly-yearly-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onRepeatOnLabelClick()\">{{ textForRepeatOn() }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <ul class='k-reset' [style.width.px]='650'>\n                <li>\n                    <input [kendoRecurrenceRepeatOnRadioButton]=\"'monthday'\" />\n\n                    <label class='k-radio-label' for='k-repeaton-monthday'>\n                        <ng-template [ngIf]=\"currentFreq === 'monthly'\">\n                            {{ textFor('monthlyDay') }}\n                        </ng-template>\n                    </label>\n\n                    <ng-template [ngIf]=\"currentFreq === 'yearly'\">\n                        <kendo-dropdownlist\n                            [data]='months'\n                            textField='text'\n                            valueField='value'\n                            [value]='currentMonthMonthDay'\n                            [valuePrimitive]='true'\n                            (valueChange)=\"onMonthChange($event, 'monthday')\"\n                            [disabled]=\"isDisabled('monthday')\">\n                        </kendo-dropdownlist>\n                    </ng-template>\n\n                    <kendo-numerictextbox\n                        [style.width.px]='70'\n                        [min]='1'\n                        [max]='31'\n                        [decimals]='0'\n                        [format]=\"'#'\"\n                        [autoCorrect]='true'\n                        [value]='monthDay'\n                        (valueChange)='onMonthDayChange($event)'\n                        [disabled]=\"isDisabled('monthday')\">\n                    </kendo-numerictextbox>\n                </li>\n                <li>\n                    <input [kendoRecurrenceRepeatOnRadioButton]=\"'weekday'\" />\n                    <label class='k-radio-label' for='k-repeaton-weekday'></label>\n\n                    <kendo-dropdownlist\n                        [data]='offsetPositions'\n                        textField='text'\n                        valueField='value'\n                        [value]='offset'\n                        [valuePrimitive]='true'\n                        (valueChange)='onOffsetPositionChange($event)'\n                        [disabled]=\"isDisabled('weekday')\">\n                    </kendo-dropdownlist>\n\n                    <kendo-dropdownlist\n                        [data]=\"extendedWeekDays\"\n                        textField='text'\n                        valueField='value'\n                        [value]='weekDay'\n                        [valuePrimitive]='true'\n                        (valueChange)='onWeekDayChange($event)'\n                        [disabled]=\"isDisabled('weekday')\">\n                    </kendo-dropdownlist>\n\n                    <ng-template [ngIf]=\"currentFreq === 'yearly'\">\n                        <span>{{ textFor('yearlyOf') }}</span>\n\n                        <kendo-dropdownlist\n                            [data]='months'\n                            textField='text'\n                            valueField='value'\n                            [value]='currentMonthWeekDay'\n                            [valuePrimitive]='true'\n                            (valueChange)=\"onMonthChange($event, 'weekday')\"\n                            [disabled]=\"isDisabled('weekday')\">\n                        </kendo-dropdownlist>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceMonthlyYearlyEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceMonthlyYearlyEditorComponent.propDecorators = {
        repeatOnRadioButtons: [{ type: ViewChildren, args: [RepeatOnRadioButtonDirective,] }]
    };
    return RecurrenceMonthlyYearlyEditorComponent;
}());

/**
 * @hidden
 */
var RecurrenceWeekdayRuleEditorComponent = /** @class */ (function () {
    function RecurrenceWeekdayRuleEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.selected = [];
        this.weekDays = this.recurrence.weekDays;
        this.setSelectedDays();
    }
    RecurrenceWeekdayRuleEditorComponent.prototype.setSelectedDays = function () {
        var _this = this;
        for (var i = 0; i < 7; i++) {
            this.selected[i] = false;
        }
        if (isPresent(this.rrule.byWeekDay)) {
            this.rrule.byWeekDay.forEach(function (rule) {
                _this.selected[rule.day] = true;
            });
        }
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.onSelectedChange = function (isSelected, day) {
        this.selected[day] = isSelected;
        this.recurrence.setWeekDays(this.serializeToWeekDayRuleArray(this.selected));
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.isSelected = function (day) {
        return this.selected[day.value];
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.serializeToWeekDayRuleArray = function (arr) {
        var selectedValues = [];
        arr.forEach(function (isSelected, idx) {
            if (isSelected) {
                selectedValues.push({ day: idx, offset: 0 });
            }
        });
        return selectedValues.length > 0 ? selectedValues : null;
    };
    Object.defineProperty(RecurrenceWeekdayRuleEditorComponent.prototype, "rrule", {
        get: function () {
            return this.recurrence.rrule;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceWeekdayRuleEditorComponent.prototype.capitalize = function (day) {
        return capitalize(day);
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.onWeeklyRepeatOnClick = function () {
        var selected = this.weekDayButtons.toArray().find(function (r) { return r.selected; });
        if (selected) {
            selected.focus();
        }
    };
    RecurrenceWeekdayRuleEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-weekday-rule-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onWeeklyRepeatOnClick()\">{{ textFor('weeklyRepeatOn') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <kendo-buttongroup [selection]=\"'multiple'\">\n                <button *ngFor='let day of weekDays' kendoButton\n                        [style.width.px]=\"75\"\n                        [toggleable]=\"true\"\n                        [selected]=\"isSelected(day)\"\n                        (selectedChange)=\"onSelectedChange($event, day.value)\"\n                >{{ capitalize(day.text) }}</button>\n            </kendo-buttongroup>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceWeekdayRuleEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceWeekdayRuleEditorComponent.propDecorators = {
        weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
    };
    return RecurrenceWeekdayRuleEditorComponent;
}());

/**
 * @hidden
 */
var Messages$1 = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        repeat: [{ type: Input }],
        dailyInterval: [{ type: Input }],
        dailyRepeatEvery: [{ type: Input }],
        weeklyInterval: [{ type: Input }],
        weeklyRepeatEvery: [{ type: Input }],
        weeklyRepeatOn: [{ type: Input }],
        monthlyDay: [{ type: Input }],
        monthlyInterval: [{ type: Input }],
        monthlyRepeatEvery: [{ type: Input }],
        monthlyRepeatOn: [{ type: Input }],
        yearlyOf: [{ type: Input }],
        yearlyRepeatEvery: [{ type: Input }],
        yearlyRepeatOn: [{ type: Input }],
        yearlyInterval: [{ type: Input }],
        frequenciesDaily: [{ type: Input }],
        frequenciesMonthly: [{ type: Input }],
        frequenciesNever: [{ type: Input }],
        frequenciesWeekly: [{ type: Input }],
        frequenciesYearly: [{ type: Input }],
        offsetPositionsFirst: [{ type: Input }],
        offsetPositionsSecond: [{ type: Input }],
        offsetPositionsThird: [{ type: Input }],
        offsetPositionsFourth: [{ type: Input }],
        offsetPositionsLast: [{ type: Input }],
        weekdaysDay: [{ type: Input }],
        weekdaysWeekday: [{ type: Input }],
        weekdaysWeekendday: [{ type: Input }],
        endAfter: [{ type: Input }],
        endOccurrence: [{ type: Input }],
        endLabel: [{ type: Input }],
        endNever: [{ type: Input }],
        endOn: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 * Custom component messages override default component messages.
 */
var RecurrenceEditorCustomMessagesComponent = /** @class */ (function (_super) {
    __extends(RecurrenceEditorCustomMessagesComponent, _super);
    function RecurrenceEditorCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(RecurrenceEditorCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceEditorCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages$1,
                            useExisting: forwardRef(function () { return RecurrenceEditorCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-recurrence-editor-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return RecurrenceEditorCustomMessagesComponent;
}(Messages$1));

/**
 * @hidden
 */
var RecurrenceEditorLocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(RecurrenceEditorLocalizedMessagesDirective, _super);
    function RecurrenceEditorLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    RecurrenceEditorLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages$1,
                            useExisting: forwardRef(function () { return RecurrenceEditorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoRecurrenceEditorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return RecurrenceEditorLocalizedMessagesDirective;
}(Messages$1));

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
var TIME_ZONE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TimeZoneEditorComponent; })
};
/**
 * Represents the Kendo UI TimeZone Editor component for Angular.
 * `TimeZoneEditorComponent` displays the currently loaded timezones.
 * Used for editing the `start` and `end` timezones of the `SchedulerEvent` objects.
 */
var TimeZoneEditorComponent = /** @class */ (function () {
    function TimeZoneEditorComponent() {
        /**
         * Specifies the width of the ComboBox which contains the names of the timezones.
         */
        this.width = 260;
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.tzNames = timezoneNames();
        this.tzSource = this.tzNames.slice();
    }
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.onTimeZoneChange = function (tzName) {
        this.tz = tzName;
        this.onChangeCallback(this.tz);
        this.valueChange.emit(tzName);
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.onTimeZoneFilterChange = function (value) {
        this.tzSource = this.tzNames.filter(function (tz) {
            return tz.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.writeValue = function (value) {
        if (typeof value === 'string' && this.tzNames.indexOf(value) >= 0) {
            this.tz = value;
        }
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.focus = function () {
        this.tzComboBox.focus();
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TimeZoneEditorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        TIME_ZONE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-timezone-editor',
                    template: "\n        <kendo-combobox\n            #tzcombobox\n            [style.width.px]=\"width\"\n            [allowCustom]=\"false\"\n            [data]=\"tzSource\"\n            [filterable]=\"true\"\n            [suggest]=\"true\"\n            [value]=\"tz\"\n            (filterChange)=\"onTimeZoneFilterChange($event)\"\n            (valueChange)=\"onTimeZoneChange($event)\">\n        </kendo-combobox>\n    "
                },] },
    ];
    /** @nocollapse */
    TimeZoneEditorComponent.ctorParameters = function () { return []; };
    TimeZoneEditorComponent.propDecorators = {
        tzComboBox: [{ type: ViewChild, args: ['tzcombobox',] }],
        width: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return TimeZoneEditorComponent;
}());

var isContentWrapper = function (element) { return hasClasses(element, 'k-scheduler-content'); };
/**
 * @hidden
 */
var ShortcutsDirective = /** @class */ (function () {
    function ShortcutsDirective(scheduler, domEvents, focusService, zone, changeDetector, viewState, dialogsService) {
        var _this = this;
        this.scheduler = scheduler;
        this.domEvents = domEvents;
        this.focusService = focusService;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.viewState = viewState;
        this.dialogsService = dialogsService;
        this.shortcuts = [{
                match: function (e) { return e.keyCode === Keys.KeyC && noModifiers(e); },
                action: function (e) {
                    var scheduler = _this.scheduler;
                    var hours = new Date().getHours();
                    var selected = scheduler.selectedDate;
                    var start = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours + 1);
                    var end = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours + 2);
                    var firstResource;
                    if (scheduler.group) {
                        var resources = scheduler.resources || [];
                        var group = scheduler.group || {};
                        var grouped = groupResources(group, resources);
                        if (grouped.length > 0) {
                            firstResource = grouped[0].data[0];
                        }
                    }
                    scheduler.create.emit({
                        start: ZonedDate.fromLocalDate(start, scheduler.timezone).toLocalDate(),
                        end: ZonedDate.fromLocalDate(end, scheduler.timezone).toLocalDate(),
                        isAllDay: false,
                        resources: [firstResource],
                        originalEvent: e,
                        sender: scheduler
                    });
                }
            }, {
                match: function (e) { return e.keyCode >= Keys.Digit1 && e.keyCode <= Keys.Digit9 && withModifiers(e, Modifiers.AltKey); },
                action: function (e) {
                    var scheduler = _this.scheduler;
                    var viewIndex = e.keyCode - Keys.Digit0 - 1;
                    var views = scheduler.views.toArray();
                    var view = views[viewIndex];
                    if (view) {
                        _this.zone.run(function () {
                            var prevented = scheduler.onNavigationAction({ type: 'view-change', view: view });
                            if (!prevented) {
                                _this.changeDetector.markForCheck();
                                _this.focusWait();
                            }
                        });
                    }
                }
            }, {
                match: function (e) { return e.keyCode === Keys.KeyT && noModifiers(e); },
                action: function () {
                    _this.zone.run(function () {
                        _this.scheduler.onNavigationAction({ type: 'today' });
                        _this.focusWait();
                    });
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: function (e) { return (e.keyCode === Keys.ArrowLeft || e.keyCode === Keys.ArrowRight) && withModifiers(e, Modifiers.ShiftKey); },
                action: function (e) {
                    // tslint:disable-next-line:deprecation
                    var type = e.keyCode === Keys.ArrowLeft ? 'prev' : 'next';
                    _this.zone.run(function () {
                        _this.scheduler.onNavigationAction({ type: type });
                        _this.focusWait();
                    });
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: function (e) { return (e.keyCode === Keys.ArrowUp || e.keyCode === Keys.ArrowLeft) && noModifiers(e) && !isContentWrapper(e.target); },
                action: function (e) {
                    var prevented = _this.scheduler.onNavigationAction({ type: 'focus-prev' });
                    if (!prevented) {
                        _this.focusService.focusNext({ offset: -1 });
                        e.preventDefault();
                    }
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: function (e) { return (e.keyCode === Keys.ArrowDown || e.keyCode === Keys.ArrowRight) && noModifiers(e) && !isContentWrapper(e.target); },
                action: function (e) {
                    var prevented = _this.scheduler.onNavigationAction({ type: 'focus-next' });
                    if (!prevented) {
                        _this.focusService.focusNext({ offset: 1 });
                        e.preventDefault();
                    }
                }
            }];
        this.taskShortcuts = [{
                match: function (e) { return (e.keyCode === Keys.Delete || e.keyCode === Keys.Backspace) && noModifiers(e); },
                action: function (e, event) {
                    _this.viewState.emitEvent('remove', { event: event, dataItem: event.dataItem });
                    e.preventDefault();
                }
            }, {
                match: function (e) { return e.keyCode === Keys.Enter && noModifiers(e); },
                action: function (e, event) {
                    _this.viewState.emitEvent('eventDblClick', { type: 'dblclick', event: event, originalEvent: e });
                    e.preventDefault();
                }
            }];
        this.subs = new Subscription();
        this.subs.add(this.domEvents.keydown.subscribe(function (e) { return _this.onKeydown(e); }));
        this.subs.add(this.scheduler.eventKeydown.subscribe(function (e) { return _this.onEventKeydown(e); }));
    }
    ShortcutsDirective.prototype.onKeydown = function (e) {
        var match = this.shortcuts.find(function (shortcut) { return shortcut.match(e); });
        if (match && !this.dialogsService.isOpen) {
            match.action(e);
        }
    };
    ShortcutsDirective.prototype.onEventKeydown = function (e) {
        var match = this.taskShortcuts.find(function (shortcut) { return shortcut.match(e.originalEvent); });
        if (match && !this.dialogsService.isOpen) {
            match.action(e.originalEvent, e.event);
        }
    };
    ShortcutsDirective.prototype.focusWait = function () {
        var _this = this;
        this.viewState.layoutEnd.pipe(take(1)).subscribe(function () {
            return _this.focusService.focus();
        });
    };
    ShortcutsDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'kendo-scheduler'
                },] },
    ];
    /** @nocollapse */
    ShortcutsDirective.ctorParameters = function () { return [
        { type: SchedulerComponent },
        { type: DomEventsService },
        { type: FocusService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ViewStateService },
        { type: DialogsService }
    ]; };
    return ShortcutsDirective;
}());

var TEMPLATES = [
    AgendaDateTemplateDirective,
    AgendaTimeTemplateDirective,
    AllDayEventTemplateDirective,
    AllDaySlotTemplateDirective,
    DateHeaderTemplateDirective,
    EventTemplateDirective,
    EditDialogTemplateDirective,
    GroupHeaderTemplateDirective,
    MajorTimeHeaderTemplateDirective,
    MinorTimeHeaderTemplateDirective,
    MonthDaySlotTemplateDirective,
    TimeSlotTemplateDirective
];
var declarations = [
    SchedulerComponent,
    SchedulerViewDirective,
    DataBindingDirective,
    ShortcutsDirective,
    ReactiveEditingDirective,
    SchedulerDateTimePickerComponent,
    RecurrenceEditorComponent,
    RecurrenceEndRuleEditorComponent,
    RecurrenceFrequencyEditorComponent,
    RecurrenceIntervalEditorComponent,
    RecurrenceMonthlyYearlyEditorComponent,
    RecurrenceWeekdayRuleEditorComponent,
    EndRuleRadioButtonDirective,
    RepeatOnRadioButtonDirective,
    MultipleResourceEditorComponent,
    SingleResourceEditorComponent,
    TimeZoneEditorComponent,
    EditDialogComponent,
    SchedulerCustomMessagesComponent,
    LocalizedMessagesDirective,
    RecurrenceEditorCustomMessagesComponent,
    RecurrenceEditorLocalizedMessagesDirective,
    LoadingComponent
].concat(TEMPLATES);
var publicDirectives$1 = [
    AgendaViewComponent,
    MonthViewModule,
    MultiDayViewModule,
    ReactiveEditingDirective,
    TimelineViewModule,
    publicDirectives
].concat(declarations);
var importedKendoModules = [
    ButtonsModule,
    DateInputsModule,
    DialogModule,
    NumericTextBoxModule,
    TextBoxModule,
    DropDownsModule,
    ReactiveFormsModule,
    SharedModule
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Scheduler component.
 *
 * @example
 * ```ts-no-run
 * import { BrowserModule } from '@angular/platform-browser';
 * import { NgModule } from '@angular/core';
 *
 * // Import the Scheduler module
 * import { SchedulerModule } from '@progress/kendo-angular-scheduler';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [
 *         AppComponent
 *     ],
 *     imports: [
 *         BrowserModule,
 *
 *         // Import the Scheduler module
 *         SchedulerModule
 *     ],
 *     bootstrap: [
 *         AppComponent
 *     ]
 * })
 * export class AppModule { }
 * ```
 */
var SchedulerModule = /** @class */ (function () {
    function SchedulerModule() {
    }
    SchedulerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ToolbarModule,
                        AgendaViewModule,
                        MultiDayViewModule,
                        ResizeSensorModule,
                        MonthViewModule,
                        TimelineViewModule
                    ].concat(importedKendoModules),
                    declarations: declarations,
                    exports: publicDirectives$1,
                    providers: [{
                            provide: IntlService,
                            useClass: CldrIntlService
                        }]
                },] },
    ];
    return SchedulerModule;
}());

var DATE_FORMATS = [
    "yyyyMMddTHHmmssSSSXXX",
    "yyyyMMddTHHmmssXXX",
    "yyyyMMddTHHmmss",
    "yyyyMMddTHHmm",
    "yyyyMMddTHH",
    "yyyyMMdd"
];
/**
 * A base implementation of the [edit service]({% slug api_scheduler_editservice %}) which persists data to traditional CRUD services such as OData.
 *
 * To support custom models, the `BaseEditService` class requires a [field map]({% slug api_scheduler_schedulermodelfields %}) as a constructor parameter. Subclasses require you to
 * implement the `read` operation, which is not called directly by the base class, and the [`save`]({% slug api_scheduler_baseeditservice %}#toc-save) method which persists the created,
 * updated, and deleted entities.
 *
 * The [`events`](#toc-events) observable will publish the current data which is set upon subscription by using, for example, an [async pipe](https://angular.io/api/common/AsyncPipe)
 * ([more information]({% slug editing_directives_scheduler %}#toc-custom-service)).
 *
 * Implementations which utilize dedicated services, such as Google Calendar and Microsoft Exchange, will typically implement the
 * [`EditService`]({% slug api_scheduler_editservice %}) of the Scheduler directly.
 *
 * {% meta height:700 %}
 * {% embed_file editing/editing-directives/reactive-editing-service/app.component.ts preview %}
 * {% embed_file editing/editing-directives/reactive-editing-service/app.module.ts %}
 * {% embed_file editing/shared/edit.service.ts %}
 * {% embed_file editing/shared/my-event.interface.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var BaseEditService = /** @class */ (function () {
    /**
     * Initializes the base edit service.
     *
     * @param fields - A field map that will be used for reading and modifying model objects. Defaults to the [`SchedulerEvent`]({% slug api_scheduler_schedulerevent %}) fields.
     */
    function BaseEditService(fields) {
        /**
         * An array of the currently loaded events which is populated by the derived class.
         */
        this.data = [];
        /**
         * The source subject for the `events` observable.
         */
        this.source = new BehaviorSubject([]);
        this.createdItems = [];
        this.updatedItems = [];
        this.deletedItems = [];
        this.events = this.source.asObservable();
        this.fields = __assign({}, defaultModelFields, fields);
        this.getId = getter(this.fields.id);
        this.getRecurrenceId = getter(this.fields.recurrenceId);
        this.getRecurrenceRule = getter(this.fields.recurrenceRule);
        this.getRecurrenceExceptions = getter(this.fields.recurrenceExceptions);
        this.getStart = getter(this.fields.start);
        this.setId = setter(this.fields.id);
        this.setRecurrenceRule = setter(this.fields.recurrenceRule);
        this.setRecurrenceExceptions = setter(this.fields.recurrenceExceptions);
        this.setRecurrenceId = setter(this.fields.recurrenceId);
    }
    BaseEditService.prototype.create = function (event) {
        this.logCreate(event);
        this.saveChanges();
    };
    /*
     * Creates an exception to a recurring series.
     *
     * The `createException` method performs the following operations:
     * * Adds the start date of the event to the `recurrenceExceptions` of the master event (recurrence head).
     * * Creates a new event that stores the recurrence exception itself.
     */
    BaseEditService.prototype.createException = function (event, value) {
        var exception = this.buildException(value);
        this.logRemoveOccurrence(event);
        this.logCreate(exception);
        this.saveChanges();
    };
    BaseEditService.prototype.update = function (event, value) {
        this.assignValues(event, value);
        this.logUpdate(event);
        this.saveChanges();
    };
    BaseEditService.prototype.remove = function (event) {
        this.logRemove(event);
        this.saveChanges();
    };
    BaseEditService.prototype.removeSeries = function (event) {
        var id = this.getId(event);
        var recurrenceId = this.getRecurrenceId(event);
        var isHead = this.isRecurrenceHead(event);
        this.removeItemAndExceptions(isHead ? id : recurrenceId);
        this.saveChanges();
    };
    BaseEditService.prototype.removeOccurrence = function (event) {
        this.logRemoveOccurrence(event);
        this.saveChanges();
    };
    BaseEditService.prototype.findRecurrenceMaster = function (event) {
        var id = this.getId(event);
        var recurrenceId = this.getRecurrenceId(event);
        var headId = this.isRecurrenceHead(event) ? id : recurrenceId;
        var index = this.itemIndex(headId, this.data);
        return this.data[index];
    };
    BaseEditService.prototype.isRecurring = function (event) {
        return isRecurring(event, this.fields);
    };
    BaseEditService.prototype.isException = function (event) {
        return isException(event, this.fields);
    };
    /**
     * Returns a Boolean value which indicates if the event is new.
     * If the `ID` field is defined, the default implementation returns `true`.
     * Can be overridden to implement different conditions.
     *
     * @param event - The event that will be checked.
     */
    BaseEditService.prototype.isNew = function (event) {
        var id = this.getId(event);
        return !isPresent(id);
    };
    /**
     * Returns the next `ID` that will be used for new events.
     * The default implementation returns `undefined`.
     */
    BaseEditService.prototype.nextId = function () {
        return undefined;
    };
    /**
     * Copies values to the target model instance.
     * To copy the top-level fields, the base implementation uses
     * [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
     * To copy nested fields, override `assignValues` and handle the model-specific cases.
     *
     * @param target - The target object that will receive the field values.
     * @param source - The source object from which the fields will be read.
     */
    BaseEditService.prototype.assignValues = function (target, source) {
        cloneTo(source, target);
    };
    /**
     * Clones an existing model object.
     * To copy the top-level model fields, the base creates an empty object and calls [`assignValues`](#toc-assignvalues).
     * To create models of the correct type, override `cloneEvent`.
     *
     * @param event - The model instance to copy.
     * @returns TEvent - The new model instance.
     */
    BaseEditService.prototype.cloneEvent = function (event) {
        var result = {};
        this.assignValues(result, event);
        return result;
    };
    /**
     * A utility method which parses recurrence exception dates in an ISO format.
     *
     * @example
     * ```ts-no-run
     *   const exdates = '20180614T060000Z;20180615T060000Z';
     *   const result = super.parseExceptions(exdates);
     *
     *   // console.log(result);
     *   // Array [ Date 2018-06-14T03:00:00.000Z, Date 2018-06-15T03:00:00.000Z ]
     * ```
     *
     * @param value - A comma-separated list of ISO-formatted dates.
     * @returns Date[] - The recurrence exceptions as local dates.
     */
    BaseEditService.prototype.parseExceptions = function (value) {
        if (!isPresent(value) || value === '') {
            return [];
        }
        return value
            .split(';')
            .map(function (ex) { return parseDate(ex, DATE_FORMATS) || undefined; });
    };
    /**
     * A utility method which serializes recurrence exception dates in an ISO format.
     *
     * @example
     * ```ts-no-run
     *   const exdates = [ new Date(2018, 5, 14, 3, 0, 0), new Date(2018, 5, 15, 3, 0, 0) ];
     *   const result = super.serializeExceptions(exdates);
     *
     *   // console.log(result);
     *   // '20180614T060000Z;20180615T060000Z'
     * ```
     *
     * @param value - An array of `Date` instances.
     * @returns string - A comma-separated list of ISO-formatted dates.
     */
    BaseEditService.prototype.serializeExceptions = function (exceptions) {
        if (!exceptions || exceptions.length === 0) {
            return '';
        }
        return exceptions.map(function (date) {
            return formatDate(toLocalDate(date), 'yyyyMMddTHHmmss') + 'Z';
        }).join(';');
    };
    BaseEditService.prototype.reset = function () {
        this.data = [];
        this.deletedItems = [];
        this.updatedItems = [];
        this.createdItems = [];
    };
    BaseEditService.prototype.itemIndex = function (id, items) {
        for (var idx = 0; idx < items.length; idx++) {
            if (this.getId(items[idx]) === id) {
                return idx;
            }
        }
        return -1;
    };
    BaseEditService.prototype.buildException = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        var copy = this.cloneEvent(item);
        assignField(copy, head, fields.id);
        this.setId(copy, this.nextId());
        this.setRecurrenceRule(copy, undefined);
        this.setRecurrenceId(copy, this.getId(head));
        return copy;
    };
    BaseEditService.prototype.isRecurrenceHead = function (item) {
        var id = this.getId(item);
        var recurrenceRule = this.getRecurrenceRule(item);
        return !!(id && recurrenceRule);
    };
    BaseEditService.prototype.logCreate = function (item) {
        this.data = this.data.concat([item]);
        this.source.next(this.data);
        this.createdItems.push(item);
    };
    BaseEditService.prototype.logUpdate = function (item) {
        var id = this.getId(item);
        if (!this.isNew(item)) {
            var index = this.itemIndex(id, this.updatedItems);
            if (index !== -1) {
                this.updatedItems.splice(index, 1, item);
            }
            else {
                this.updatedItems.push(item);
            }
        }
        else {
            var index = this.createdItems.indexOf(item);
            this.createdItems.splice(index, 1, item);
        }
    };
    BaseEditService.prototype.logRemove = function (item) {
        var id = this.getId(item);
        var index = this.itemIndex(id, this.data);
        this.data = this.data.filter(function (_, i) { return i !== index; });
        this.source.next(this.data);
        index = this.itemIndex(id, this.createdItems);
        if (index >= 0) {
            this.createdItems.splice(index, 1);
        }
        else {
            this.deletedItems.push(item);
        }
        index = this.itemIndex(id, this.updatedItems);
        if (index >= 0) {
            this.updatedItems.splice(index, 1);
        }
    };
    BaseEditService.prototype.logRemoveOccurrence = function (event) {
        var head = this.findRecurrenceMaster(event);
        var exceptionDate = this.getStart(event);
        var currentExceptions = this.getRecurrenceExceptions(head) || [];
        this.setRecurrenceExceptions(head, currentExceptions.concat([exceptionDate]));
        this.logUpdate(head);
    };
    BaseEditService.prototype.removeItemAndExceptions = function (itemId) {
        var _this = this;
        this.deletedItems = this.deletedItems.concat(this.data.filter(function (ev) {
            return _this.getRecurrenceId(ev) === itemId || _this.getId(ev) === itemId;
        }));
    };
    BaseEditService.prototype.hasChanges = function () {
        return this.deletedItems.length + this.updatedItems.length + this.createdItems.length > 0;
    };
    BaseEditService.prototype.saveChanges = function () {
        if (!this.hasChanges()) {
            return;
        }
        this.save(this.createdItems, this.updatedItems, this.deletedItems);
        this.reset();
    };
    return BaseEditService;
}());

var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var createDiv = function (className) { return createElement('div', className); };
/**
 * Configures the settings for the export of Scheduler in PDF ([see example]({% slug pdfexport_scheduler %})).
 */
var PDFComponent = /** @class */ (function () {
    function PDFComponent(pdfService, ngZone) {
        this.pdfService = pdfService;
        this.ngZone = ngZone;
        /**
         * The creator of the PDF document.
         * Defaults to `Kendo UI PDF Generator`.
         */
        this.creator = 'Kendo UI PDF Generator';
        this.subscriptions = this.pdfService.elementReady.subscribe(this.createElement.bind(this));
        this.saveDataUri = this.saveDataUri.bind(this);
        this.exportGroup = this.exportGroup.bind(this);
        this.done = this.done.bind(this);
    }
    PDFComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(PDFComponent.prototype, "drawOptions", {
        get: function () {
            return {
                _destructive: true,
                avoidLinks: this.avoidLinks,
                margin: this.margin,
                scale: this.scale
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PDFComponent.prototype, "pdfOptions", {
        get: function () {
            return {
                author: this.author,
                creator: this.creator,
                date: this.date,
                imgDPI: this.imageResolution,
                keywords: this.keywords,
                margin: this.margin,
                producer: this.producer,
                subject: this.subject,
                title: this.title
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PDFComponent.prototype, "saveOptions", {
        get: function () {
            return {
                forceProxy: this.forceProxy,
                proxyData: this.proxyData,
                proxyTarget: this.proxyTarget,
                proxyURL: this.proxyURL
            };
        },
        enumerable: true,
        configurable: true
    });
    PDFComponent.prototype.createElement = function (args) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var container = _this.container = createDiv();
            container.style.top = container.style.left = '-10000px';
            container.style.position = 'absolute';
            var wrapper = createDiv('k-widget k-scheduler k-floatwrap');
            wrapper.style.position = 'relative';
            wrapper.appendChild(args.element);
            container.appendChild(wrapper);
            document.body.appendChild(container);
            _this.save(wrapper);
        });
    };
    PDFComponent.prototype.save = function (element) {
        this.drawElement(element, this.drawOptions)
            .then(this.exportGroup)
            .then(this.saveDataUri)
            .then(this.done, this.done);
    };
    PDFComponent.prototype.drawElement = function (element, options) {
        return drawDOM(element, options);
    };
    PDFComponent.prototype.exportGroup = function (group) {
        return exportPDF(group, this.pdfOptions);
    };
    PDFComponent.prototype.saveDataUri = function (dataUri) {
        saveAs(dataUri, this.fileName, this.saveOptions);
    };
    PDFComponent.prototype.done = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        this.pdfService.done.emit();
    };
    PDFComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-pdf',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PDFComponent.ctorParameters = function () { return [
        { type: PDFService },
        { type: NgZone }
    ]; };
    PDFComponent.propDecorators = {
        author: [{ type: Input }],
        avoidLinks: [{ type: Input }],
        creator: [{ type: Input }],
        date: [{ type: Input }],
        imageResolution: [{ type: Input }],
        fileName: [{ type: Input }],
        forceProxy: [{ type: Input }],
        keywords: [{ type: Input }],
        margin: [{ type: Input }],
        scale: [{ type: Input }],
        proxyData: [{ type: Input }],
        proxyURL: [{ type: Input }],
        proxyTarget: [{ type: Input }],
        producer: [{ type: Input }],
        subject: [{ type: Input }],
        title: [{ type: Input }]
    };
    return PDFComponent;
}());

/**
 * Represents the `export-to-PDF` command of the Scheduler.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug toolbar_scheduler %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_scheduler_schedulercomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_scheduler %})).
 *
 * @example
 * ```html-no-run
 * <kendo-scheduler>
 *      <ng-template kendoSchedulerToolbarTemplate>
 *          <button kendoSchedulerPDFCommand>Export PDF</button>
 *          <ul kendoSchedulerToolbarNavigation></ul>
 *          <ul kendoSchedulerToolbarViewSelector></ul>
 *      </ng-template>
 *      <kendo-scheduler-pdf fileName="Scheduler.pdf">
 *      </kendo-scheduler-pdf>
 * </kendo-scheduler>
 * ```
 */
var PDFCommandDirective = /** @class */ (function (_super) {
    __extends(PDFCommandDirective, _super);
    function PDFCommandDirective(pdfService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.pdfService = pdfService;
        return _this;
    }
    /**
     * @hidden
     */
    PDFCommandDirective.prototype.click = function (e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    };
    PDFCommandDirective.prototype.ngOnInit = function () {
        this.icon = 'pdf';
    };
    PDFCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerPDFCommand]'
                },] },
    ];
    /** @nocollapse */
    PDFCommandDirective.ctorParameters = function () { return [
        { type: PDFService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    PDFCommandDirective.propDecorators = {
        click: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return PDFCommandDirective;
}(Button));

var declarations$1 = [
    PDFComponent,
    PDFCommandDirective
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule)
 * definition for the Scheduler PDF component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Scheduler and PDF modules
 * import { SchedulerModule, PDFModule } from '@progress/kendo-angular-scheduler';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, SchedulerModule, PDFModule], // import Scheduler and PDF modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var PDFModule = /** @class */ (function () {
    function PDFModule() {
    }
    PDFModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$1],
                    exports: [declarations$1]
                },] },
    ];
    return PDFModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DataBindingDirective, EditingDirectiveBase, ReactiveEditingDirective, SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR, SchedulerDateTimePickerComponent, DialogsService, EditDialogTemplateDirective, EditDialogComponent, EditService, LocalDataChangesService, EndRuleRadioButtonDirective, RecurrenceEditorCustomMessagesComponent, RecurrenceEditorLocalizedMessagesDirective, Messages$1 as Messages, RecurrenceLocalizationService, RECURRENCE_VALUE_ACCESSOR, RecurrenceEndRuleEditorComponent, RecurrenceFrequencyEditorComponent, RecurrenceIntervalEditorComponent, RecurrenceMonthlyYearlyEditorComponent, RecurrenceWeekdayRuleEditorComponent, RecurrenceService, RepeatOnRadioButtonDirective, ResourceEditorBase, MULTIPLE_RESOURCE_VALUE_ACCESSOR, MultipleResourceEditorComponent, SINGLE_RESOURCE_VALUE_ACCESSOR, SingleResourceEditorComponent, TIME_ZONE_VALUE_ACCESSOR, TimeZoneEditorComponent, CreateEvent, PreventableEvent$1 as PreventableEvent, LoadingComponent, SchedulerCustomMessagesComponent, LocalizedMessagesDirective, Messages as Messages$1, SchedulerLocalizationService, FocusService, ShortcutsDirective, ToolbarNavigationComponent, ToolbarTemplateDirective, ToolbarComponent, ToolbarModule, publicDirectives, ToolbarViewSelectorComponent, AgendaHeaderItemComponent, AgendaHeaderComponent, AgendaTaskItemComponent, AgendaViewInternalComponent, AgendaListComponent, AgendaViewModule, BaseView, ConfigurationViewBase, DomEventsService, HintContainerComponent, RepeatPipe, ResizeHintComponent, ResourceIteratorPipe, ViewFooterComponent, ViewsSharedModule, WorkHoursFooterDirective, DayTimeSlotService, DayTimeViewBase, DayTimeViewItemComponent, DayTimeViewComponent, DayTimeModule, DaySlotDirective, TimeSlotDirective, MonthSlotDirective, MonthSlotService, MonthViewItemComponent, MonthViewRendererComponent, MonthViewComponent, MonthViewModule, MultiDayViewBase, MultiDayViewRendererComponent, MultiDayViewComponent, MultiDayViewModule, WorkWeekViewComponent, SchedulerViewDirective, AgendaDateTemplateDirective, AgendaTimeTemplateDirective, AllDayEventTemplateDirective, AllDaySlotTemplateDirective, DateHeaderTemplateDirective, EventTemplateDirective, GroupHeaderTemplateDirective, MajorTimeHeaderTemplateDirective, MinorTimeHeaderTemplateDirective, MonthDaySlotTemplateDirective, TimeSlotTemplateDirective, TimelineBase, TimelineMonthViewComponent, TimelineMultiDayViewComponent, TimelineViewComponent, TimelineViewModule, TimelineWeekViewComponent, BaseSlotDirective, BaseSlotService, BaseViewItem, SchedulerComponent, SchedulerModule, ViewContextService, ViewStateService, ToolbarService, AgendaViewComponent, DayViewComponent, WeekViewComponent, RecurrenceEditorComponent, BaseEditService, PDFModule, PDFComponent, PDFService, PDFCommandDirective, PDFExportEvent, FocusableDirective, SharedModule, SchedulerView, DateChangeEvent, NavigateEvent, SlotClickEvent, EventClickEvent, EventKeydownEvent, VIEW_EVENT_MAP, CancelEvent, EditEventBase, RemoveEvent, SaveEvent, ResizeStartEvent, ResizeEvent, ResizeEndEvent, DragStartEvent, DragEvent, DragEndEvent, EditEvent, AddEvent };
