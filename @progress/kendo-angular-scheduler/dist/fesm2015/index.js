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
class DateChangeEvent {
    /**
     * @hidden
     */
    constructor(sender, selectedDate, dateRange) {
        this.sender = sender;
        this.selectedDate = selectedDate;
        this.dateRange = dateRange;
    }
}

/**
 * Arguments for the `navigate` event.
 */
class NavigateEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, action) {
        super();
        this.sender = sender;
        this.action = action;
    }
}

/**
 * Arguments for `slotClick` and `slotDblClick` events.
 */
class SlotClickEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `eventClick` and `eventDblClick` events.
 */
class EventClickEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `eventKeydown` event.
 */
class EventKeydownEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `create` event.
 */
class CreateEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * @hidden
 */
class PreventableEvent$1 {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `dragEnd` event.
 */
class DragEndEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `drag` event.
 */
class DragEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `dragStart` event.
 */
class DragStartEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `remove` event.
 */
class RemoveEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `resizeEnd` event.
 */
class ResizeEndEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `resize` event.
 */
class ResizeEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `resizeStart` event.
 */
class ResizeStartEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * @hidden
 *
 * Maps the name of the event to the argument type of the event.
 */
const VIEW_EVENT_MAP = {
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
class EditEventBase {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `cancel` event.
 */
class CancelEvent extends EditEventBase {
}

/**
 * Arguments for the `save` event.
 */
class SaveEvent extends EditEventBase {
}

/**
 * Arguments for the `edit` event of the editing directives.
 */
class EditEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `add` event of the editing directives.
 */
class AddEvent extends PreventableEvent$1 {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}

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
class ToolbarTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ToolbarTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerToolbarTemplate]'
            },] },
];
/** @nocollapse */
ToolbarTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * A service for communication with the toolbar controls
 * which is used by the toolbar components for publishing navigation actions
 * ([see example]({% slug toolbar_scheduler %}#toc-using-the-toolbar-service)).
 */
class ToolbarService {
    /** @hidden */
    constructor() {
        this.actionSource = new Subject();
        this.action = this.actionSource.asObservable();
    }
    /**
     * Emits the specified navigation action.
     *
     * @param action - The navigation action that will be executed.
     */
    navigate(action) {
        this.actionSource.next(action);
    }
}
ToolbarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ToolbarService.ctorParameters = () => [];

/**
 * An abstract class which contains meta information about a Scheduler view.
 */
class SchedulerView {
}

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
class AgendaDateTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
AgendaDateTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerAgendaDateTemplate]'
            },] },
];
/** @nocollapse */
AgendaDateTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class AgendaTimeTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
AgendaTimeTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerAgendaTimeTemplate]'
            },] },
];
/** @nocollapse */
AgendaTimeTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class AllDayEventTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
AllDayEventTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerAllDayEventTemplate]'
            },] },
];
/** @nocollapse */
AllDayEventTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class AllDaySlotTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
AllDaySlotTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerAllDaySlotTemplate]'
            },] },
];
/** @nocollapse */
AllDaySlotTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class DateHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DateHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerDateHeaderTemplate]'
            },] },
];
/** @nocollapse */
DateHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class EventTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
EventTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerEventTemplate]'
            },] },
];
/** @nocollapse */
EventTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class GroupHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerGroupHeaderTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class MajorTimeHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MajorTimeHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerMajorTimeHeaderTemplate]'
            },] },
];
/** @nocollapse */
MajorTimeHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class MinorTimeHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MinorTimeHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerMinorTimeHeaderTemplate]'
            },] },
];
/** @nocollapse */
MinorTimeHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class MonthDaySlotTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MonthDaySlotTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerMonthDaySlotTemplate]'
            },] },
];
/** @nocollapse */
MonthDaySlotTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
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
class TimeSlotTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
TimeSlotTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerTimeSlotTemplate]'
            },] },
];
/** @nocollapse */
TimeSlotTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * A service which publishes information from the Scheduler to the views.
 * Views subscribe to changes in the context (selected date, event, and resource data) through this service.
 */
class ViewContextService {
    constructor() {
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
    notifyAction(action) {
        this.actionSource.next(action);
    }
    /**
     * An internal method which is used by the Scheduler to publish the current set of items.
     *
     * @hidden
     */
    notifyItems(items) {
        this.itemsSource.next(items);
    }
    /**
     * An internal method which is used by the Scheduler to publish the currently selected date.
     *
     * @hidden
     */
    notifySelectedDate(date) {
        this.selectedDateSource.next(date);
    }
    /**
     * An internal method which is used by the Scheduler to notify that the size changed.
     *
     * @hidden
     */
    notifyResize() {
        this.resizeSource.next();
    }
    /**
     * An internal method which is used by the Scheduler to notify that the options changed.
     *
     * @hidden
     */
    notifyOptionsChange(changes) {
        this.optionsChangeSource.next(changes);
    }
    /**
     * An internal method which is used by the Scheduler to execute a view method.
     *
     * @hidden
     */
    executeMethod(name, args) {
        let result;
        this.executeSource.next({ name, args, result: (r) => {
                result = r;
            } });
        return result;
    }
}
ViewContextService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ViewContextService.ctorParameters = () => [];

const emptyDateRange = () => ({
    start: new Date(0),
    end: new Date(0),
    text: '',
    shortText: ''
});
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
class ViewStateService {
    constructor() {
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
    notifyNextDate(date) {
        this.nextDateSource.next(date);
    }
    /**
     * Publishes the visible date range of the view.
     * The view will calculate and set the new data range when
     * the selected date changes.
     */
    notifyDateRange(range) {
        this.dateRangeSource.next(range);
    }
    /**
     * Notifies the Scheduler that the view has completed its layout.
     */
    notifyLayoutEnd() {
        this.layoutEndSource.next();
    }
    /**
     * Navigates to another view.
     */
    navigateTo(args) {
        this.navigateSource.next(args);
    }
    /**
     * Notifies the Scheduler that the view options have been changed.
     */
    notifyOptionsChange() {
        this.optionsChangeSource.next(null);
    }
    /**
     * Emits a DOM event to the Scheduler.
     */
    emitEvent(name, args) {
        this.viewEventSource.next({
            name: name,
            args: args
        });
    }
}
ViewStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ViewStateService.ctorParameters = () => [];

const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const getterCache = {};
getterCache['undefined'] = () => undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
function getter(field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    getterCache[field] = function (obj) {
        let result = obj;
        for (let idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
}

const FIELD_REGEX$1 = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const setterCache = {};
setterCache['undefined'] = obj => obj;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
function setter(field) {
    if (setterCache[field]) {
        return setterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX$1, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    setterCache[field] = function (obj, value) {
        let root = obj;
        const depth = fields.length - 1;
        for (let idx = 0; idx < depth && root; idx++) {
            root = root[fields[idx]] = root[fields[idx]] || {};
        }
        root[fields[depth]] = value;
    };
    return setterCache[field];
}

/**
 * @hidden
 */
const OCCURRENCE_ID = 0;

/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isBlank = (value) => value === null || value === undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isArray = (value) => Array.isArray(value);
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
const isNullOrEmptyString = (value) => isBlank(value) || (value.trim && value.trim().length === 0);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isNumber = (value) => typeof value === "number" && !isNaN(value);
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isString = (value) => typeof value === 'string';
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
const isObject = (value) => typeof value === 'object';
/**
 * @hidden
 */
const isRecurring = (event, fields) => {
    const recurrenceId = getter(fields.recurrenceId)(event);
    const recurrenceRule = getter(fields.recurrenceRule)(event);
    return !!(recurrenceRule || recurrenceId);
};
/**
 * @hidden
 */
const isException = (event, fields) => {
    const id = getter(fields.id)(event);
    const recurrenceId = getter(fields.recurrenceId)(event);
    return isPresent(id) && id !== OCCURRENCE_ID && isPresent(recurrenceId);
};
/**
 * @hidden
 */
const copyResources = (event, resources) => {
    if (resources) {
        for (let idx = 0; idx < resources.length; idx++) {
            assignField(event, event.dataItem, resources[idx].field);
        }
    }
};
/**
 * @hidden
 */
const readEvent = (dataItem, fields, resources) => {
    const result = {
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
        dataItem
    };
    copyResources(result, resources);
    return result;
};
/**
 * @hidden
 */
const isRecurrenceMaster = (event) => event.recurrenceRule && !isPresent(event.recurrenceId);
/**
 * @hidden
 */
function groupResources(group, resources) {
    const result = [];
    if (group && group.resources && group.resources.length) {
        const groups = group.resources;
        for (let idx = 0; idx < groups.length; idx++) {
            const resource = resources.find(r => r.name === groups[idx]);
            result.push(resource);
        }
    }
    return result;
}
/**
 * @hidden
 */
const getField = (obj, field) => getter(field)(obj);
/**
 * @hidden
 */
const setField = (obj, field, value) => setter(field)(obj, value);
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
    for (let field in obj) {
        if (obj.hasOwnProperty(field)) {
            const value = obj[field];
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
    const result = {};
    cloneTo(obj, result);
    return result;
}
/** @hidden */
const iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    const keys = Object.getOwnPropertyNames(Map.prototype);
    const proto = Map.prototype;
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
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
    const DBLCLICK_DELAY = 250;
    const clicks = fromClick(element);
    const endSequence = clicks.pipe(auditTime(DBLCLICK_DELAY));
    return clicks.pipe(buffer(endSequence), filter(sequence => sequence.length === 2), filter((sequence) => sequence[1].target === sequence[0].target), map(sequence => sequence[1]));
}
/**
 * @hidden
 */
function sortTasksByTime(tasks) {
    tasks.sort((a, b) => (a.startTime - b.startTime) || (b.endTime - a.endTime));
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
class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(debounceTime(0));
    }
    endEdit() {
        const formGroup = this.hasNewEvent ? this.newEventGroup.group : this.editedEvent.formGroup;
        this.changes.emit({ action: 'cancel', formGroup });
    }
    removeEvent(dataItem) {
        this.changes.emit({ action: 'remove', dataItem });
    }
    addEvent(formGroup) {
        this.newEventGroup = { formGroup };
        this.onChanged();
    }
    editEvent(dataItem, formGroup = undefined, mode) {
        this.editedEvent = { dataItem, formGroup, mode };
        this.onChanged();
    }
    close() {
        this.newEventGroup = this.editedEvent = null;
        this.onChanged();
    }
    save() {
        const { dataItem, formGroup } = this.context;
        this.changes.emit({
            action: 'save',
            dataItem,
            formGroup,
            isNew: this.hasNewEvent,
            mode: this.occurrenceEditMode
        });
    }
    isEditing() {
        return isPresent(this.context);
    }
    get occurrenceEditMode() {
        if (this.hasNewEvent) {
            return 2 /* Series */;
        }
        else {
            return this.editedEvent.mode || 0 /* Event */;
        }
    }
    get hasNewEvent() {
        return isPresent(this.newEventGroup);
    }
    get newEvent() {
        if (this.hasNewEvent) {
            return this.newEventGroup.group.value;
        }
        return {};
    }
    get context() {
        if (this.hasNewEvent) {
            return this.newEventGroup;
        }
        return this.editedEvent;
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];

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
class EditDialogTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
EditDialogTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerEditDialogTemplate]'
            },] },
];
/** @nocollapse */
EditDialogTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class LocalDataChangesService {
    constructor() {
        this.changes = new EventEmitter();
    }
}
LocalDataChangesService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class DomEventsService {
    constructor() {
        this.focus = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.click = new EventEmitter();
        this.keydown = new EventEmitter();
        this.windowBlur = new EventEmitter();
    }
}
DomEventsService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class FocusService {
    constructor(renderer, wrapper, domEvents) {
        this.renderer = renderer;
        this.wrapper = wrapper;
        this.domEvents = domEvents;
        this.items = new Set();
        this.elementMap = new WeakMap();
        this.subs = new Subscription();
        this.subs.add(this.domEvents.focus.subscribe(e => this.onFocusIn(e)));
        this.subs.add(this.domEvents.focusOut.subscribe(() => this.onFocusOut()));
    }
    get activeElement() {
        if (this.activeItem) {
            return this.activeItem.element;
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    register(item) {
        if (!this.activeItem) {
            this.activeItem = item;
            item.toggle(true);
        }
        this.items.add(item);
        this.elementMap.set(item.element.nativeElement, item);
        this.toggleWrapper();
    }
    unregister(item) {
        this.items.delete(item);
        this.elementMap.delete(item.element.nativeElement);
        if (item === this.activeItem) {
            this.activateNext();
        }
        this.toggleWrapper();
    }
    focus() {
        if (this.activeItem) {
            this.activeItem.focus();
        }
        else {
            this.wrapper.nativeElement.focus();
        }
    }
    focusNext(options) {
        const currentItem = this.activeItem;
        this.activateNext(options);
        if (this.activeItem) {
            this.activeItem.focus();
        }
        return this.activeItem !== currentItem;
    }
    activate(next) {
        this.items.forEach(item => item.toggle(item === next));
        this.activeItem = next;
    }
    activateNext(position) {
        this.activeItem = this.findNext(position);
    }
    findNext(position) {
        const { offset, nowrap } = Object.assign({ nowrap: false, offset: 1 }, position);
        const items = Array.from(this.items.values())
            .filter(item => item.canFocus())
            .sort((a, b) => a.focusIndex - b.focusIndex);
        if (items.length === 0) {
            return null;
        }
        if (!this.activeItem) {
            return nowrap ? null : items[0];
        }
        const index = items.indexOf(this.activeItem);
        let nextIndex = index + offset;
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
    }
    toggleWrapper() {
        if (this.wrapper) {
            this.renderer.setAttribute(this.wrapper.nativeElement, 'tabindex', this.activeItem ? '-1' : '0');
        }
    }
    onFocusIn(e) {
        const item = this.elementMap.get(e.target);
        if (!item || item === this.focusedItem) {
            return;
        }
        if (this.focusedItem) {
            this.focusedItem.toggleFocus(false);
        }
        this.activate(item);
        item.toggleFocus(true);
        this.focusedItem = item;
    }
    onFocusOut() {
        if (!this.focusedItem) {
            return;
        }
        this.focusedItem.toggleFocus(false);
        this.focusedItem = null;
    }
}
FocusService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FocusService.ctorParameters = () => [
    { type: Renderer2, decorators: [{ type: Optional }] },
    { type: ElementRef, decorators: [{ type: Optional }] },
    { type: DomEventsService }
];

/**
 * @hidden
 */
class DialogsService {
    constructor(dialogService, localization, changeDetector, focusService, viewState) {
        this.dialogService = dialogService;
        this.localization = localization;
        this.changeDetector = changeDetector;
        this.focusService = focusService;
        this.viewState = viewState;
        this.isOpen = false;
    }
    openRemoveConfirmationDialog() {
        const dialog = this.dialogService.open({
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
        return dialog.result.pipe(map((result) => {
            this.isOpen = false;
            if (result instanceof DialogCloseResult) {
                this.focusService.focus();
                return false;
            }
            this.viewState.layoutEnd.pipe(take(1)).subscribe(() => this.focusService.focus());
            const res = result;
            return res.value;
        }));
    }
    openRecurringConfirmationDialog(operation) {
        const dialog = this.dialogService.open({
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
        return dialog.result.pipe(map((result) => {
            this.isOpen = false;
            this.focusService.focus();
            if (result instanceof DialogCloseResult) {
                return undefined;
            }
            const res = result;
            return res.value;
        }));
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
DialogsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DialogsService.ctorParameters = () => [
    { type: DialogService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: FocusService },
    { type: ViewStateService }
];

/**
 * @hidden
 */
class SchedulerLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl) {
        super(prefix, messageService, _rtl);
    }
}
/** @nocollapse */
SchedulerLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];

/**
 * @hidden
 */
const defaultModelFields = {
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
class PDFService {
    constructor() {
        this.createElement = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.done = new EventEmitter();
        this.elementReady = new EventEmitter();
    }
    save() {
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
    }
}
PDFService.decorators = [
    { type: Injectable },
];

/**
 * The arguments for the `pdfExport` event.
 */
class PDFExportEvent extends PreventableEvent$1 {
}

/**
 * @hidden
 */
class LoadingComponent {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.hostClasses = true;
    }
    get display() {
        return this.loading || this.force ? 'block' : 'none';
    }
    toggle(value) {
        this.force = value;
        this.renderer.setStyle(this.element.nativeElement, 'display', this.display);
    }
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerLoading]',
                template: `
        <div class="k-loading-image"></div>
        <div class="k-loading-color"></div>
    `
            },] },
];
/** @nocollapse */
LoadingComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
LoadingComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-loading-mask',] }],
    loading: [{ type: Input }],
    display: [{ type: HostBinding, args: ['style.display',] }]
};

/**
 * @hidden
 */
class FocusableDirective {
    constructor(element, renderer, focusService) {
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
    get visible() {
        return this.element.nativeElement.style.display !== 'none';
    }
    get enabled() {
        return !this.element.nativeElement.disabled;
    }
    ngOnDestroy() {
        this.focusService.unregister(this);
    }
    toggle(active) {
        if (active !== this.active) {
            const index = active ? '0' : '-1';
            this.renderer.setAttribute(this.element.nativeElement, 'tabIndex', index);
            this.active = active;
        }
    }
    canFocus() {
        return this.visible && this.enabled;
    }
    focus() {
        this.element.nativeElement.focus();
    }
    toggleFocus(value) {
        const focusedClass = 'k-state-selected';
        const element = this.element.nativeElement;
        if (value) {
            this.renderer.addClass(element, focusedClass);
        }
        else {
            this.renderer.removeClass(element, focusedClass);
        }
        this.renderer.setAttribute(element, 'aria-selected', value.toString());
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerFocusIndex]'
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: FocusService }
];
FocusableDirective.propDecorators = {
    focusIndex: [{ type: Input, args: ['kendoSchedulerFocusIndex',] }]
};

// TODO: Move to @progress/kendo-common
const toClassList = (classNames) => String(classNames).trim().split(' ');
/**
 * @hidden
 */
const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */

/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
const firstElementChild = (node) => {
    const children = node.children;
    const length = children.length;
    for (let idx = 0; idx < length; idx++) {
        if (children[idx].nodeType === 1) {
            return children[idx];
        }
    }
};
/**
 * @hidden
 */
const closestInScope = (node, predicate, scope) => {
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
const wheelDeltaY = (e) => {
    const deltaY = e.wheelDeltaY;
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
const preventLockedScroll = el => event => {
    const delta = wheelDeltaY(event);
    const scrollTop = el.scrollTop;
    const allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
let cachedScrollbarWidth = 0;
/**
 * @hidden
 */
function scrollbarWidth() {
    if (!cachedScrollbarWidth && isDocumentAvailable()) {
        const div = document.createElement("div");
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
    const sizeField = type === 'vertical' ? 'Height' : 'Width';
    return element[`scroll${sizeField}`] > element[`client${sizeField}`];
}
/**
 * @hidden
 */
function rtlScrollPosition(element, position) {
    const initial = element.scrollLeft;
    let result = position;
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

const todayDate = () => getDate(new Date());
const DAYS_IN_WEEK = 7;
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
class SchedulerComponent {
    constructor(wrapper, viewContext, viewState, editService, dialogsService, intlService, changeDetector, zone, pdfService, localization, domEvents, renderer, focusService) {
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
    get dir() {
        return this.direction;
    }
    /**
     * The index of the currently selected view.
     *
     * By default, the selected view index is `0` and
     * indicates that the first declared view is visible.
     */
    set selectedViewIndex(index) {
        this.viewIndex = index;
        this.onViewIndexChange();
    }
    get selectedViewIndex() {
        return this.viewIndex;
    }
    /**
     * Specifies the id of the timezone that will be displayed in the Scheduler.
     * For example, `Europe/Sofia`.
     * Defaults to `Etc/UTC`.
     */
    set timezone(value) {
        this._timezone = value;
        this.events = this.events || [];
    }
    get timezone() {
        return this._timezone;
    }
    /**
     * An array of event instances which will be shown by the Scheduler.
     */
    set events(value) {
        this._events = value;
        this.processEvents(value);
    }
    get events() {
        return this._events;
    }
    /**
     * The currently selected date of the Scheduler.
     * Determines the period which is displayed.
     */
    set selectedDate(value) {
        if (!value) {
            return;
        }
        this._selectedDate = value;
        this.viewContext.notifySelectedDate(value);
    }
    get selectedDate() {
        return this._selectedDate;
    }
    /**
     * The names of the model fields from which the Scheduler will read its data
     * ([see example]({% slug databinding_scheduler %}#toc-binding-to-models)).
     */
    set modelFields(value) {
        this._modelFields = Object.assign({}, defaultModelFields, value);
    }
    get modelFields() {
        return this._modelFields;
    }
    ngOnInit() {
        if (!this.selectedDate) {
            this.selectedDate = todayDate();
        }
    }
    ngAfterContentInit() {
        if (isDevMode() && this.views.length === 0) {
            throw new Error('No views declared for <kendo-scheduler>. Please, declare at least one view.');
        }
        this.subs = this.views.changes.subscribe(() => this.resetViewIndex());
        this.subs.add(this.intlService.changes.subscribe(this.intlChange.bind(this)));
        this.subs.add(this.viewState.nextDate.subscribe(nextDate => {
            this.selectedDate = nextDate;
        }));
        this.subs.add(this.viewState.dateRange.subscribe(dateRange => {
            const isEmpty = dateRange.start.getTime() === 0;
            if (!isEmpty) {
                const args = new DateChangeEvent(this, this.selectedDate, dateRange);
                this.dateChange.emit(args);
            }
        }));
        this.subs.add(this.viewState.navigate.subscribe(({ viewName, date }) => {
            const views = this.views.toArray();
            const view = views.find(v => v.name === viewName);
            if (view) {
                const index = views.indexOf(view);
                this.selectedView = view;
                this.setViewIndex(index);
                this.selectedDate = date;
            }
        }));
        this.subs.add(this.viewState.viewEvent.subscribe(({ name, args }) => {
            const emitter = this[name];
            const confirmedEmitter = this[`${name}Confirmed`];
            if (hasObservers(emitter) || (confirmedEmitter && hasObservers(confirmedEmitter))) {
                this.zone.run(() => {
                    const eventInstance = new VIEW_EVENT_MAP[name](this, args);
                    emitter.emit(eventInstance);
                    args.prevented = eventInstance.prevented;
                    if (confirmedEmitter && !args.prevented) {
                        confirmedEmitter.emit(eventInstance);
                    }
                });
            }
        }));
        this.subs.add(this.viewState.layoutEnd.subscribe(() => {
            if (this.resizeSensor) {
                this.resizeSensor.acceptSize();
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
        this.subs.add(this.views.changes.subscribe(() => {
            this.changeDetector.markForCheck();
        }));
        //this.editService.timezone = this.timezone;
        this.attachEditHandlers();
        this.dialogsService.container = this.confirmationDialogContainerRef;
        this.notifyOptionsChange();
        this.subs.add(this.pdfService.exportClick.subscribe(() => {
            const args = new PDFExportEvent();
            this.pdfExport.emit(args);
            if (!args.isDefaultPrevented()) {
                this.saveAsPDF();
            }
        }));
        this.subs.add(this.pdfService.done.subscribe(() => {
            this.loadingComponent.toggle(false);
        }));
        this.subs.add(this.localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        }));
        this.subs.add(this.viewState.optionsChange.subscribe(() => {
            this.changeDetector.markForCheck();
        }));
        this.attachElementEventHandlers();
    }
    ngOnChanges(changes) {
        if (isChanged('resources', changes) && !isChanged('events', changes) && this.viewItems) {
            this.viewItems.forEach(item => {
                copyResources(item.event, this.resources);
            });
        }
        if (anyChanged(['group', 'resources', 'min', 'max', 'showWorkHours', 'startTime', 'scrollTime', 'endTime', 'eventHeight',
            'workDayStart', 'workDayEnd', 'workWeekStart', 'workWeekEnd', 'slotDuration', 'slotDivisions',
            'editable', 'timezone', 'slotClass', 'slotFill', 'columnWidth', 'eventClass', 'eventStyles'], changes)) {
            this.notifyOptionsChange(changes);
        }
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
    }
    /**
     * @hidden
     */
    onResize(_event) {
        this.viewContext.notifyResize();
    }
    /**
     * @hidden
     */
    onNavigationAction(action) {
        const args = new NavigateEvent(this, action);
        this.navigate.next(args);
        if (args.isDefaultPrevented()) {
            return true;
        }
        if (action.type === 'view-change') {
            const views = this.views.toArray();
            const index = views.indexOf(action.view);
            this.selectedView = action.view;
            this.setViewIndex(index);
        }
        else if (action.type === 'select-date') {
            if (this.isInRange(action.date)) {
                this.selectedDate = action.date;
            }
        }
        else if (action.type === 'today') {
            const date = new Date();
            if (this.isInRange(date)) {
                this.selectedDate = date;
            }
        }
        else {
            this.viewContext.notifyAction(action);
        }
    }
    /**
     * Creates a popup editor for the new event.
     *
     * @param group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html) that describes
     * the edit form. If called with a data item, the parameter will build the `FormGroup` from the data item fields.
     */
    addEvent(group) {
        const isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            const createControl = (source) => (acc, key) => {
                acc[key] = new FormControl(source[key]);
                return acc;
            };
            const fields = Object.keys(group).reduce(createControl(group), {});
            group = new FormGroup(fields);
        }
        this.editService.addEvent(group);
    }
    /**
     * Switches the specified event in edit mode.
     *
     * @param dataItem - The event that will be switched to edit mode.
     * @param options - An object which contains the form `group` that will be bound in the edit dialog and the current edit `mode`.
     *
     */
    editEvent(dataItem, options = {}) {
        const { group, mode } = options;
        this.editService.editEvent(dataItem, group, mode);
    }
    /**
     * Closes the event editor, if open.
     */
    closeEvent() {
        this.editService.close();
    }
    /**
     * Returns a flag which indicates if an event is currently edited.
     *
     * @return {boolean} - A flag which indicates if an event is currently edited.
     */
    isEditing() {
        return this.editService.isEditing();
    }
    /**
     * Opens the built-in confirmation dialog for defining the edit mode
     * that will be used when the user edits or removes a recurring event.
     *
     * @param operation - The type of operation that will be confirmed. Has to be either **Edit** or **Remove**.
     *
     * @return {Observable<EditMode>}
     */
    openRecurringConfirmationDialog(operation) {
        return this.dialogsService.openRecurringConfirmationDialog(operation);
    }
    /**
     * Opens the built-in removal confirmation dialog.
     *
     * @return {Observable<boolean>}
     */
    openRemoveConfirmationDialog() {
        return this.dialogsService.openRemoveConfirmationDialog();
    }
    /**
     * Saves the current view as PDF.
     */
    saveAsPDF() {
        this.loadingComponent.toggle(true);
        this.zone.runOutsideAngular(() => {
            // wait a tick in order for the loading element style to be updated by the browser.
            // if the export is synchronous, the browser will not update the element before the export is finished.
            setTimeout(() => {
                this.pdfService.save();
            }, 0);
        });
    }
    /**
     * Scrolls the view to the specified time.
     */
    scrollToTime(time) {
        this.viewContext.notifyAction({
            type: 'scroll-time',
            time: time
        });
    }
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
    slotByPosition(x, y) {
        return this.viewContext.executeMethod('slotByPosition', { x, y });
    }
    /**
     * Returns the event associated with the specified DOM element, if any.
     *
     * @param element - The DOM element document position.
     * @return the event instance, if found.
     */
    eventFromElement(element) {
        return this.viewContext.executeMethod('eventFromElement', { element });
    }
    /**
     * Gets the currently active event, if any.
     * The active event is the event that can currently receive focus.
     */
    get activeEvent() {
        const activeElement = this.focusService.activeElement;
        if (activeElement) {
            return this.eventFromElement(activeElement.nativeElement);
        }
    }
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
    focusNext(position) {
        return this.focusService.focusNext(position);
    }
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
    focusPrev(position) {
        const prevPosition = Object.assign({ offset: -1 }, position);
        return this.focusService.focusNext(prevPosition);
    }
    /**
     * Focuses the last focused event or the Scheduler element, if no events are available.
     */
    focus() {
        return this.focusService.focus();
    }
    isInRange(date) {
        return (!this.min || this.min <= date) && (!this.max || date <= this.max);
    }
    notifyOptionsChange(changes) {
        const workweek = this.workWeek;
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
    }
    get workWeek() {
        let { start, end } = this.intlService.weekendRange();
        const workWeekStart = isPresent(this.workWeekStart) ? this.workWeekStart : (end + 1) % DAYS_IN_WEEK;
        const weekEnd = start > 0 ? start - 1 : Day.Saturday;
        const workWeekEnd = isPresent(this.workWeekEnd) ? this.workWeekEnd : weekEnd;
        return { start: workWeekStart, end: workWeekEnd };
    }
    resetViewIndex() {
        const index = this.selectedViewIndex;
        const newIndex = Math.max(0, Math.min(index, this.views.length - 1));
        this.setViewIndex(newIndex);
        this.onViewIndexChange();
    }
    onViewIndexChange() {
        if (!this.views) {
            return;
        }
        const views = this.views.toArray();
        const selectedView = views[this.viewIndex];
        if (selectedView) {
            this.selectedView = selectedView;
        }
    }
    setViewIndex(newIndex) {
        const changed = this.selectedViewIndex !== newIndex;
        if (changed) {
            this.selectedViewIndex = newIndex;
            this.selectedViewIndexChange.emit(newIndex);
        }
        return changed;
    }
    processEvents(dataItems) {
        const timezone = this.timezone;
        const fields = this.modelFields;
        const items = dataItems
            .map(dataItem => readEvent(dataItem, fields, this.resources))
            .filter(event => !isRecurrenceMaster(event))
            .map(event => {
            const start = ZonedDate.fromLocalDate(event.start, timezone);
            const end = ZonedDate.fromLocalDate(event.end, timezone);
            return { start, end, event };
        });
        this.viewItems = items;
        this.viewContext.notifyItems(items);
    }
    attachEditHandlers() {
        if (!this.editService) {
            return;
        }
        this.subs.add(this.editService.changes.subscribe(this.emitCRUDEvent.bind(this)));
    }
    emitCRUDEvent(args) {
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
    }
    intlChange() {
        const currentView = this.selectedView;
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
    }
    attachElementEventHandlers() {
        if (!isDocumentAvailable()) {
            return;
        }
        const wrapper = this.wrapper.nativeElement;
        this.zone.runOutsideAngular(() => {
            const windowBlurSubscription = this.renderer.listen('window', 'blur', (args) => {
                this.domEvents.windowBlur.emit(args);
            });
            const clickSubscription = this.renderer.listen(wrapper, 'click', (args) => {
                this.domEvents.click.emit(args);
            });
            const keydownSubscription = this.renderer.listen(wrapper, 'keydown', args => {
                this.domEvents.keydown.emit(args);
            });
            let focused = false;
            const focusInSubscription = this.renderer.listen(wrapper, 'focusin', (args) => {
                this.domEvents.focus.emit(args);
                if (!focused) {
                    this.domEvents.focusIn.emit(args);
                    this.renderer.addClass(this.wrapper.nativeElement, 'k-state-focused');
                    focused = true;
                }
            });
            const focusOutSubscription = this.renderer.listen(wrapper, 'focusout', (args) => {
                const next = args.relatedTarget || document.activeElement;
                const outside = !closest(next, (node) => node === wrapper);
                if (outside) {
                    this.domEvents.focusOut.emit(args);
                    this.renderer.removeClass(this.wrapper.nativeElement, 'k-state-focused');
                    focused = false;
                }
            });
            this.detachElementEventHandlers = () => {
                windowBlurSubscription();
                clickSubscription();
                keydownSubscription();
                focusInSubscription();
                focusOutSubscription();
            };
        });
    }
}
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
                template: `
        <ng-container kendoSchedulerLocalizedMessages
            i18n-allEvents="kendo.scheduler.allEvents|The All events text displayed in the timeline views when there is no vertical grouping."
            allEvents="All events"

            i18n-allDay="kendo.scheduler.allDay|The all day text displayed in the day and week views."
            allDay="all day"

            i18n-dateHeader="kendo.scheduler.dateHeader|The date header text displayed in the agenda view."
            dateHeader="Date"

            i18n-timeHeader="kendo.scheduler.timeHeader|The time header text displayed in the agenda view."
            timeHeader="Time"

            i18n-deleteTitle="kendo.scheduler.deleteTitle|The delete icon title."
            deleteTitle="Delete"

            i18n-eventHeader="kendo.scheduler.eventHeader|The event header text displayed in the agenda view."
            eventHeader="Event"

            i18n-nextTitle="kendo.scheduler.nextTitle|The title of the navigation next button."
            nextTitle="Next"

            i18n-previousTitle="kendo.scheduler.previousTitle|The title of the navigation previous button."
            previousTitle="Previous"

            i18n-showFullDay="kendo.scheduler.showFullDay|The text of the show full day button displayed in the footer of the day, week and timeline views."
            showFullDay="Show full day"

            i18n-showWorkDay="kendo.scheduler.showWorkDay|The text of the show work day button displayed in the footer of the day, week and timeline views."
            showWorkDay="Show business hours"

            i18n-today="kendo.scheduler.today|The today button text displayed in the navigation."
            today="Today"

            i18n-calendarToday="kendo.scheduler.calendarToday|The text of today's date in the header of the Calendar."
            calendarToday="TODAY"

            i18n-dayViewTitle="kendo.scheduler.dayViewTitle|The day view title."
            dayViewTitle="Day"

            i18n-multiDayViewTitle="kendo.scheduler.multiDayViewTitle|The multi day view title."
            multiDayViewTitle="Multi-Day"

            i18n-weekViewTitle="kendo.scheduler.weekViewTitle|The week view title."
            weekViewTitle="Week"

            i18n-workWeekViewTitle="kendo.scheduler.workWeekViewTitle|The work week view title."
            workWeekViewTitle="Work Week"

            i18n-monthViewTitle="kendo.scheduler.monthViewTitle|The month view title."
            monthViewTitle="Month"

            i18n-timelineViewTitle="kendo.scheduler.timelineViewTitle|The timeline view title."
            timelineViewTitle="Timeline"

            i18n-timelineWeekViewTitle="kendo.scheduler.timelineWeekViewTitle|The timeline week view title."
            timelineWeekViewTitle="Timeline Week"

            i18n-timelineMonthViewTitle="kendo.scheduler.timelineMonthViewTitle|The timeline month view title."
            timelineMonthViewTitle="Timeline Month"

            i18n-agendaViewTitle="kendo.scheduler.agendaViewTitle|The agenda view title."
            agendaViewTitle="Agenda"

            i18n-cancel="kendo.scheduler.cancel|The text similar to 'Cancel' displayed in scheduler."
            cancel="Cancel"

            i18-save="kendo.scheduler.save|The text similar to 'Save' displayed in scheduler."
            save="Save"

            i18-editorEventTitle="kendo.scheduler.editorEventTitle|The text similar to 'Title' displayed in the scheduler event editor."
            editorEventTitle='Title'

            i18-editorEventStart="kendo.scheduler.editorEventStart|The text similar to 'Start' displayed in the scheduler event editor."
            editorEventStart="Start"

            i18-editorEventStartTimeZone="kendo.scheduler.editorEventStartTimeZone|The text similar to 'Start Time Zone' displayed in the scheduler event editor."
            editorEventStartTimeZone="Start Time Zone"

            i18-editorEventEnd="kendo.scheduler.editorEventEnd|The text similar to 'End' displayed in the scheduler event editor."
            editorEventEnd="End"

            i18-editorEventEndTimeZone="kendo.scheduler.editorEventEndTimeZone|The text similar to 'End Time Zone' displayed in the scheduler event editor."
            editorEventEndTimeZone="End Time Zone"

            i18n-editorEventAllDay="kendo.scheduler.editorEventAllDay|The text similar to 'All Day event' displayed in the scheduler event editor."
            editorEventAllDay="All Day Event"

            i18n-editorEventDescription="kendo.scheduler.editorEventDescription|The text similar to 'Description' displayed in the scheduler event editor."
            editorEventDescription="Description"

            i18n-editorEventSeparateTimeZones="kendo.scheduler.editorEventSeparateTimeZones|The text similar to 'Use separate Start and End Time Zones' displayed in the scheduler event editor."
            editorEventSeparateTimeZones="End in different Time Zone"

            i18n-editorEventTimeZone="kendo.scheduler.editorEventTimeZone|The text similar to 'Time Zone' displayed in the scheduler event editor."
            editorEventTimeZone='Specify Time Zone'

            i18n-editorTitle="kendo.scheduler.editorTitle|The text similar to 'Event' displayed as title of the scheduler event editor."
            editorTitle='Event'

            i18n-recurrenceEditorRepeat="kendo.scheduler.recurrenceEditorRepeat|The text similar to 'Repeat' displayed in the scheduler recurrence editor."
            recurrenceEditorRepeat='Repeat'

            i18n-recurrenceEditorDailyInterval="kendo.scheduler.recurrenceEditorDailyInterval|The text similar to 'day(s)' displayed in the scheduler recurrence editor."
            recurrenceEditorDailyInterval='day(s)'

            i18n-recurrenceEditorDailyRepeatEvery="kendo.scheduler.recurrenceEditorDailyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor."
            recurrenceEditorDailyRepeatEvery='Repeat every'

            i18n-recurrenceEditorWeeklyInterval="kendo.scheduler.recurrenceEditorWeeklyInterval|The text similar to 'week(s)' displayed in the scheduler recurrence editor."
            recurrenceEditorWeeklyInterval='week(s)'

            i18n-recurrenceEditorWeeklyRepeatEvery="kendo.scheduler.recurrenceEditorWeeklyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor."
            recurrenceEditorWeeklyRepeatEvery='Repeat every'

            i18n-recurrenceEditorWeeklyRepeatOn="kendo.scheduler.recurrenceEditorWeeklyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor."
            recurrenceEditorWeeklyRepeatOn='Repeat on'

            i18n-recurrenceEditorMonthlyDay="kendo.scheduler.recurrenceEditorMonthlyDay|The text similar to 'Day' displayed in the scheduler recurrence editor."
            recurrenceEditorMonthlyDay='Day'

            i18n-recurrenceEditorMonthlyInterval="kendo.scheduler.recurrenceEditorMonthlyInterval|The text similar to 'month(s)' displayed in the scheduler recurrence editor."
            recurrenceEditorMonthlyInterval='month(s)'

            i18n-recurrenceEditorMonthlyRepeatEvery="kendo.scheduler.recurrenceEditorMonthlyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor."
            recurrenceEditorMonthlyRepeatEvery='Repeat every'

            i18n-recurrenceEditorMonthlyRepeatOn="kendo.scheduler.recurrenceEditorMonthlyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor."
            recurrenceEditorMonthlyRepeatOn='Repeat on'

            i18n-recurrenceEditorYearlyOf="kendo.scheduler.recurrenceEditorYearlyOf|The text similar to 'of' displayed in the scheduler recurrence editor."
            recurrenceEditorYearlyOf='of'

            i18n-recurrenceEditorYearlyRepeatEvery="kendo.scheduler.recurrenceEditorYearlyRepeatEvery|The text similar to 'Repeat every' displayed in the scheduler recurrence editor."
            recurrenceEditorYearlyRepeatEvery='Repeat every'

            i18n-recurrenceEditorYearlyRepeatOn="kendo.scheduler.recurrenceEditorYearlyRepeatOn|The text similar to 'Repeat on' displayed in the scheduler recurrence editor."
            recurrenceEditorYearlyRepeatOn='Repeat on'

            i18n-recurrenceEditorYearlyInterval="kendo.scheduler.recurrenceEditorYearlyInterval|The text similar to 'year(s)' displayed in the scheduler recurrence editor."
            recurrenceEditorYearlyInterval='year(s)'

            i18n-recurrenceEditorFrequenciesDaily="kendo.scheduler.recurrenceEditorFrequenciesDaily|The text similar to 'Daily' displayed in the scheduler recurrence editor."
            recurrenceEditorFrequenciesDaily='Daily'

            i18n-recurrenceEditorFrequenciesMonthly="kendo.scheduler.recurrenceEditorFrequenciesMonthly|The text similar to 'Monthly' displayed in the scheduler recurrence editor."
            recurrenceEditorFrequenciesMonthly='Monthly'

            i18n-recurrenceEditorFrequenciesNever="kendo.scheduler.recurrenceEditorFrequenciesNever|The text similar to 'Never' displayed in the scheduler recurrence editor."
            recurrenceEditorFrequenciesNever='Never'

            i18n-recurrenceEditorFrequenciesWeekly="kendo.scheduler.recurrenceEditorFrequenciesWeekly|The text similar to 'Weekly' displayed in the scheduler recurrence editor."
            recurrenceEditorFrequenciesWeekly='Weekly'

            i18n-recurrenceEditorFrequenciesYearly="kendo.scheduler.recurrenceEditorFrequenciesYearly|The text similar to 'Yearly' displayed in the scheduler recurrence editor."
            recurrenceEditorFrequenciesYearly='Yearly'

            i18n-recurrenceEditorOffsetPositionsFirst="kendo.scheduler.recurrenceEditorOffsetPositionsFirst|The text similar to 'First' displayed in the scheduler recurrence editor."
            recurrenceEditorOffsetPositionsFirst='First'

            i18n-recurrenceEditorOffsetPositionsSecond="kendo.scheduler.recurrenceEditorOffsetPositionsSecond|The text similar to 'Second' displayed in the scheduler recurrence editor."
            recurrenceEditorOffsetPositionsSecond='Second'

            i18n-recurrenceEditorOffsetPositionsThird="kendo.scheduler.recurrenceEditorOffsetPositionsThird|The text similar to 'Third' displayed in the scheduler recurrence editor."
            recurrenceEditorOffsetPositionsThird='Third'

            i18n-recurrenceEditorOffsetPositionsFourth="kendo.scheduler.recurrenceEditorOffsetPositionsFourth|The text similar to 'Fourth' displayed in the scheduler recurrence editor."
            recurrenceEditorOffsetPositionsFourth='Fourth'

            i18n-recurrenceEditorOffsetPositionsLast="kendo.scheduler.recurrenceEditorOffsetPositionsLast|The text similar to 'Last' displayed in the scheduler recurrence editor."
            recurrenceEditorOffsetPositionsLast='Last'

            i18n-recurrenceEditorWeekdaysDay="kendo.scheduler.recurrenceEditorWeekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern."
            recurrenceEditorWeekdaysDay='Day'

            i18n-recurrenceEditorWeekdaysWeekday="kendo.scheduler.recurrenceEditorWeekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern."
            recurrenceEditorWeekdaysWeekday='Weekday'

            i18n-recurrenceEditorWeekdaysWeekendday="kendo.scheduler.recurrenceEditorWeekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern."
            recurrenceEditorWeekdaysWeekendday='Weekend Day'

            i18n-recurrenceEditorEndAfter="kendo.scheduler.recurrenceEditorEndAfter|The text similar to 'After' displayed in the scheduler recurrence editor."
            recurrenceEditorEndAfter='After'

            i18n-recurrenceEditorEndOccurrence="kendo.scheduler.recurrenceEditorEndOccurrence|The text similar to 'occurrence(s)' displayed in the scheduler recurrence editor."
            recurrenceEditorEndOccurrence='occurrence(s)'

            i18n-recurrenceEditorEndLabel="kendo.scheduler.recurrenceEditorEndLabel|The text similar to 'End' displayed in the scheduler recurrence editor."
            recurrenceEditorEndLabel='End'

            i18n-recurrenceEditorEndNever="kendo.scheduler.recurrenceEditorEndNever|The text similar to 'Never' displayed in the scheduler recurrence editor."
            recurrenceEditorEndNever='Never'

            i18n-recurrenceEditorEndOn="kendo.scheduler.recurrenceEditorEndOn|The text similar to 'On' displayed in the scheduler recurrence editor."
            recurrenceEditorEndOn='On'

            i18n-destroy="kendo.scheduler.destroy|The text of the 'Delete' button displayed in the scheduler remove confirmation dialog."
            destroy='Delete'

            i18n-deleteConfirmation="kendo.scheduler.deleteConfirmation|The text similar to 'Are you sure you want to delete this event?' displayed in scheduler remove confirmation dialog."
            deleteConfirmation='Are you sure you want to delete this event?'

            i18n-editRecurringConfirmation="kendo.scheduler.editRecurringConfirmation|The text similar to 'Do you want to edit only this event occurrence or the whole series?' displayed in the scheduler recurring confirmation dialog."
            editRecurringConfirmation='Do you want to edit only this event occurrence or the whole series?'

            i18n-editOccurrence="kendo.scheduler.editOccurrence|The text of the 'Edit current occurrence' button displayed in the scheduler recurring confirmation dialog."
            editOccurrence='Edit current occurrence'

            i18n-editSeries="kendo.scheduler.editSeries|The text of the 'Edit the series' button displayed in the scheduler recurring confirmation dialog."
            editSeries='Edit the series'

            i18n-deleteRecurringConfirmation="kendo.scheduler.deleteRecurringConfirmation|The text similar to 'Do you want to delete only this event occurrence or the whole series?' displayed in the scheduler recurring confirmation dialog."
            deleteRecurringConfirmation='Do you want to delete only this event occurrence or the whole series?'

            i18n-deleteOccurrence="kendo.scheduler.deleteOccurrence|The text of the 'Delete current occurrence' button displayed in the scheduler recurring confirmation dialog."
            deleteOccurrence='Delete current occurrence'

            i18n-deleteSeries="kendo.scheduler.deleteSeries|The text similar of the 'Delete the series' button displayed in the scheduler recurring confirmation dialog."
            deleteSeries='Delete the series'

            i18n-deleteDialogTitle="kendo.scheduler.deleteDialogTitle|The title of the remove confirmation dialog, similar to 'Delete Event'."
            deleteDialogTitle='Delete Event'

            i18n-deleteRecurringDialogTitle="kendo.scheduler.deleteRecurringDialogTitle|The title of the recurring remove confirmation dialog, similar to 'Delete Recurring Item'"
            deleteRecurringDialogTitle='Delete Recurring Item'

            i18n-editRecurringDialogTitle="kendo.scheduler.editRecurringDialogTitle|The title of the recurring edit confirmation dialog, similar to 'Edit Recurring Item'"
            editRecurringDialogTitle='Edit Recurring Item'
        >
        </ng-container>

        <kendo-scheduler-toolbar
            [dateRange]="dateRangeStream"
            [selectedDate]="selectedDateStream"
            [views]="views"
            [selectedView]="selectedView"
            [template]="toolbarTemplate"
            (navigate)="onNavigationAction($event)"
            [min]="min"
            [max]="max"
        ></kendo-scheduler-toolbar>

        <ng-container *ngTemplateOutlet="selectedView?.template">
        </ng-container>

        <ng-container #confirmationDialogContainer>
        </ng-container>

        <kendo-scheduler-edit-dialog
            [resources]="resources"
            [editTemplate]="editDialogTemplate"
            [timezone]="timezone"
            [fields]="modelFields"
        ></kendo-scheduler-edit-dialog>

        <kendo-resize-sensor (resize)="onResize()"></kendo-resize-sensor>

        <div [loading]="loading" kendoSchedulerLoading>
        </div>
    `
            },] },
];
/** @nocollapse */
SchedulerComponent.ctorParameters = () => [
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
];
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

/** @hidden */
const intersects = (startTime, endTime, periodStart, periodEnd) => (startTime < periodStart && endTime > periodEnd) ||
    (periodStart <= startTime && startTime < periodEnd) ||
    (periodStart < endTime && endTime <= periodEnd && startTime < endTime);
/** @hidden */
const dateInRange = (date, start, end) => start.getTime() <= date.getTime() && date.getTime() <= end.getTime();
/** @hidden */
const roundAllDayEnd = ({ start, end }) => {
    const startDate = start.stripTime();
    const endDate = end.stripTime();
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
const addUTCDays = (date, offset) => {
    const newDate = new Date(date.getTime());
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
    const data = resource.data;
    for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
        if (getField(data[dataIdx], resource.valueField) === value) {
            return dataIdx;
        }
    }
    return -1;
}
function resourceItem(value, resource) {
    const index = getDataIdx(value, resource);
    return index >= 0 ? resource.data[index] : {};
}
function resourceItems(values, resource) {
    return values.map(value => resourceItem(value, resource));
}
function cloneResources(arr) {
    const result = [];
    for (let idx = 0; idx < arr.length; idx++) {
        const clone$$1 = Object.assign({}, arr[idx]);
        clone$$1.resources = clone$$1.resources.slice(0);
        result.push(clone$$1);
    }
    return result;
}
/** @hidden */
function resourceItemByValue(event, resource) {
    const value = getField(event, resource.field);
    if (Array.isArray(value)) {
        return resourceItems(value, resource);
    }
    return resourceItem(value, resource);
}
function addNotGroupedResources(event, resources, allResources) {
    for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
        const current = resources[resourceIdx];
        for (let idx = 0; idx < allResources.length; idx++) {
            const item = allResources[idx];
            if (!current.resources[idx] && item.data) {
                current.resources[idx] = resourceItemByValue(event, item);
            }
        }
    }
}
/** @hidden */
function eventResources(event, { taskResources, hasGroups, spans, allResources = [] }) {
    let resources = [];
    for (let resourceIdx = 0; resourceIdx < taskResources.length; resourceIdx++) {
        const resource = taskResources[resourceIdx];
        if (!resource.data) {
            resources = [{ leafIdx: 0, resources: [] }];
            continue;
        }
        const resourceIndex = allResources.indexOf(resource);
        let values = getField(event, resource.field);
        if (!Array.isArray(values)) {
            values = [values];
        }
        const expandedResources = [];
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            const dataIdx = getDataIdx(values[valueIdx], resource);
            if (dataIdx < 0) {
                return [{ leafIdx: hasGroups ? -1 : 0, resources: [] }];
            }
            const item = resource.data[dataIdx];
            // has groups - need all copies of the multiple resource
            // no groups - just the first
            if (resourceIdx === 0 && (hasGroups || valueIdx === 0)) {
                const resourceItems = [];
                resourceItems[resourceIndex] = resource.multiple && !hasGroups ? [item] : item;
                resources.push({
                    leafIdx: hasGroups ? dataIdx * spans[resourceIdx] : 0,
                    color: getField(item, resource.colorField),
                    resources: resourceItems
                });
            }
            else if (hasGroups) { // don't create multiple resource groups if no groups for multiple resources
                let currentResources = resources;
                if (values.length > 1) {
                    currentResources = cloneResources(resources);
                    expandedResources.push.apply(expandedResources, currentResources);
                }
                for (let currentIdx = 0; currentIdx < currentResources.length; currentIdx++) {
                    currentResources[currentIdx].leafIdx += dataIdx * spans[resourceIdx];
                    currentResources[currentIdx].resources[resourceIndex] = item;
                }
            }
            else if (valueIdx > 0) {
                for (let idx = 0; idx < resources.length; idx++) {
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
    for (let idx = 0; idx < tasks.length; idx++) {
        const task = tasks[idx];
        task.resources = eventResources(task.event, options);
    }
}
/** @hidden */
function findRowIndex(events, data) {
    if (data.rowIndex !== undefined) {
        return data.rowIndex;
    }
    for (let idx = 0; idx < events.length; idx++) {
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
const rectContains = (rect, left, top) => rect.left <= left && left <= rect.left + rect.width && rect.top <= top && top <= rect.top + rect.height;
/** @hidden */
const rectContainsX = (rect, left) => rect.left <= left && left <= rect.left + rect.width;
/** @hidden */
const toPx = value => `${value}px`;
/** @hidden */
const elementOffset = (element) => {
    if (!element) {
        return null;
    }
    const box = element.getBoundingClientRect();
    const documentElement = document.documentElement;
    return {
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        width: box.width,
        height: box.height
    };
};
/** @hidden */
const pointDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
/** @hidden */
const ignoreContentChild = child => child.nodeName === 'KENDO-RESIZE-SENSOR' || hasClasses(child, 'k-loading-mask');
/** @hidden */
const setCoordinates = (element, coordinates) => {
    for (let field in coordinates) {
        if (coordinates.hasOwnProperty(field)) {
            element.style[field] = toPx(coordinates[field]);
        }
    }
};
/** @hidden */
const convertNgClassBindings = (bindingValues) => {
    const result = [];
    if (isString(bindingValues)) {
        result.push(bindingValues);
    }
    else if (isArray(bindingValues)) {
        result.push.apply(result, bindingValues);
    }
    else if (isObject(bindingValues)) {
        for (let field in bindingValues) {
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
    const startTimeFormat = { skeleton: 'yMMMMEEEEdhm' };
    const startDateFormat = { skeleton: 'yMMMMEEEEd' };
    const endFormat = 't';
    return isAllDay ?
        `${formatDate(start, startDateFormat)}` :
        `${formatDate(start, startTimeFormat)}???${formatDate(end, endFormat)}`;
}
/**
 * @hidden
 */
function formValueOrDefault(group, field, defaultValue) {
    const control = group.get(field);
    if (!control) {
        return defaultValue;
    }
    return control.value || defaultValue;
}
/**
 * @hidden
 */
const isWorkWeekDay = (day, start, end) => {
    if (end < start) {
        return day <= end || start <= day;
    }
    return start <= day && day <= end;
};

// TODO
// Extract as public method
const occurrences = (item, fields, range, timezone, weekStart) => {
    const rrule = parseRule({
        recurrenceRule: getField(item, fields.recurrenceRule),
        weekStart: weekStart
    });
    if (!rrule.start) {
        const start = getField(item, fields.start);
        rrule.start = ZonedDate.fromLocalDate(start, timezone);
    }
    if (!rrule.end) {
        const end = getField(item, fields.end);
        rrule.end = ZonedDate.fromLocalDate(end, timezone);
    }
    const exceptions = getField(item, fields.recurrenceExceptions);
    if (exceptions) {
        rrule.exceptionDates = exceptions
            .map(exDate => ZonedDate.fromLocalDate(exDate, timezone));
        // TODO: Merge exceptions from recurrence rule with event.recurrenceException
    }
    const utcRangeStart = toUTCDateTime(range.start);
    const utcRangeEnd = toUTCDateTime(range.end);
    const series = expand(rrule, {
        rangeStart: ZonedDate.fromUTCDate(utcRangeStart, timezone),
        rangeEnd: ZonedDate.fromUTCDate(utcRangeEnd, timezone)
    });
    if (!series.events.length) {
        return [];
    }
    const expanded = series.events.map(occ => {
        const event = clone(item);
        setField(event, fields.id, OCCURRENCE_ID);
        setField(event, fields.recurrenceId, getField(item, fields.id));
        setField(event, fields.start, occ.start.toLocalDate());
        setField(event, fields.end, occ.end.toLocalDate());
        return event;
    });
    return [item, ...expanded];
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
class DataBindingDirective {
    constructor(scheduler, changeDetector, intl, localDataChangesService) {
        this.scheduler = scheduler;
        this.changeDetector = changeDetector;
        this.intl = intl;
        this.localDataChangesService = localDataChangesService;
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    /**
     * The array of data which will populate the Scheduler.
     */
    set data(value) {
        this.originalData = value || [];
        if (this.localDataChangesService) {
            this.localDataChangesService.data = value;
        }
        this.scheduler.events = this.process();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscription = this.scheduler
            .dateChange
            .subscribe(e => this.onDateChange(e));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    rebind() {
        this.data = this.originalData;
        this.changeDetector.markForCheck();
    }
    process() {
        if (!this.dateRange) {
            // No processing until a date range is set
            return [];
        }
        const data = [];
        const fields = this.scheduler.modelFields;
        this.originalData
            .forEach(item => {
            if (getField(item, fields.recurrenceRule)) {
                const series = occurrences(item, fields, this.dateRange, this.scheduler.timezone, this.intl.firstDay());
                data.push(...series);
            }
            else {
                data.push(item);
            }
        });
        return data;
    }
    onDateChange(e) {
        this.dateRange = e.dateRange;
        this.rebind();
    }
}
DataBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerBinding]'
            },] },
];
/** @nocollapse */
DataBindingDirective.ctorParameters = () => [
    { type: SchedulerComponent },
    { type: ChangeDetectorRef },
    { type: IntlService },
    { type: LocalDataChangesService }
];
DataBindingDirective.propDecorators = {
    data: [{ type: Input, args: ['kendoSchedulerBinding',] }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
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

/**
 * Custom component messages override default component messages.
 */
class SchedulerCustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
SchedulerCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => SchedulerCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-scheduler-messages',
                template: ``
            },] },
];
/** @nocollapse */
SchedulerCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoSchedulerLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

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
class ToolbarNavigationComponent {
    constructor(popupService, toolbarService, localization, cd) {
        this.popupService = popupService;
        this.toolbarService = toolbarService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.hostClasses = true;
        this.subs = this.localization.changes.subscribe(({ rtl }) => {
            cd.markForCheck();
        });
    }
    /**
     * @hidden
     */
    get todayText() {
        return this.localization.get('today');
    }
    /**
     * @hidden
     */
    get calendarTodayText() {
        return this.localization.get('calendarToday');
    }
    /**
     * @hidden
     */
    get nextText() {
        return this.localization.get('nextTitle');
    }
    /**
     * @hidden
     */
    get previousText() {
        return this.localization.get('previousTitle');
    }
    /**
     * @hidden
     */
    get ctx() {
        return this.toolbarService.context;
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
        this.closePopup();
    }
    /**
     * @hidden
     */
    toggleSelectedDate(anchor, template) {
        if (this.popupRef) {
            this.closePopup();
        }
        else {
            const popupSettings = {
                anchor: anchor,
                content: template
            };
            if (this.localization.rtl) {
                popupSettings.popupClass = 'k-rtl';
            }
            this.popupRef = this.popupService.open(popupSettings);
        }
        return false;
    }
    /**
     * @hidden
     */
    selectDate(value) {
        this.closePopup();
        this.toolbarService.navigate({
            type: 'select-date',
            date: value
        });
    }
    /**
     * @hidden
     */
    prevClick() {
        this.toolbarService.navigate({
            type: 'prev'
        });
        return false;
    }
    /**
     * @hidden
     */
    nextClick() {
        this.toolbarService.navigate({
            type: 'next'
        });
        return false;
    }
    /**
     * @hidden
     */
    todayClick() {
        this.toolbarService.navigate({
            type: 'today'
        });
        return false;
    }
    closePopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
}
ToolbarNavigationComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerToolbarNavigation]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    PopupService
                ],
                template: `
        <li class="k-state-default k-header k-nav-today">
            <a role="button"
                (click)="todayClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="todayText">{{todayText}}</a>
        </li>
        <li class="k-state-default k-header k-nav-prev">
            <a role="button"
                (click)="prevClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="previousText"
                [attr.aria-label]="previousText">
                <span class="k-icon k-i-arrow-60-left" style="pointer-events: none"></span>
            </a>
        </li>
        <li class="k-state-default k-header k-nav-next">
            <a role="button"
                (click)="nextClick()"
                href="#"
                class="k-link"
                tabindex="-1"
                [attr.title]="nextText"
                [attr.aria-label]="nextText">
                <span class="k-icon k-i-arrow-60-right" style="pointer-events: none"></span>
            </a>
        </li>
        <li class="k-state-default k-nav-current">
            <a role="button" #anchor href="#" class="k-link" tabindex="-1" (click)="toggleSelectedDate(anchor, template)">
                <span class="k-icon k-i-calendar"></span>
                <span class="k-sm-date-format">{{ (ctx.dateRange | async)?.shortText }}</span>
                <span class="k-lg-date-format">{{ (ctx.dateRange | async)?.text }}</span>
            </a>
        </li>

        <ng-template #template>
            <kendo-calendar (valueChange)="selectDate($event)" [value]="ctx.selectedDate | async" [min]="min" [max]="max">
                <kendo-calendar-messages [today]="calendarTodayText">
                </kendo-calendar-messages>
            </kendo-calendar>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarNavigationComponent.ctorParameters = () => [
    { type: PopupService },
    { type: ToolbarService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
ToolbarNavigationComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-navigation',] }, { type: HostBinding, args: ['class.k-reset',] }],
    min: [{ type: Input }],
    max: [{ type: Input }]
};

/**
 * @hidden
 */
class ToolbarComponent {
    constructor(service) {
        this.service = service;
        this.hostClasses = true;
        this.navigate = new EventEmitter();
        // The template context is the same as the service context,
        // but with resolved values instead of observables.
        this.templateContext = {};
        this.subs = new Subscription();
        this.subs.add(service.action.subscribe(action => this.navigate.next(action)));
    }
    ngOnInit() {
        this.subs.add(this.selectedDate.subscribe(date => this.templateContext.selectedDate = date));
        this.subs.add(this.dateRange.subscribe(dateRange => this.templateContext.dateRange = dateRange));
    }
    ngOnChanges() {
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
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scheduler-toolbar',
                template: `
        <ng-template
            *ngIf="template; else defaultTemplate"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext"
        >
        </ng-template>

        <ng-template #defaultTemplate>
            <ul kendoSchedulerToolbarNavigation [min]="min" [max]="max"></ul>
            <ul kendoSchedulerToolbarViewSelector></ul>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarComponent.ctorParameters = () => [
    { type: ToolbarService }
];
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
class ToolbarViewSelectorComponent {
    constructor(service) {
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
    /**
     * @hidden
     */
    get ctx() {
        return this.service.context;
    }
    /**
     * @hidden
     */
    get itemDisplay() {
        if (this.ctx.views && this.ctx.views.length === 1) {
            return 'list-item';
        }
    }
    /**
     * @hidden
     */
    onClick(view) {
        if (this.ctx.selectedView !== view) {
            this.service.navigate({
                type: 'view-change',
                view: view
            });
        }
        this.expanded = false;
        return false;
    }
    /**
     * @hidden
     */
    onCurrentViewClick(e) {
        this.expanded = !this.expanded;
        return false;
    }
    /**
     * @hidden
     */
    isSelected(view) {
        return this.ctx.selectedView === view;
    }
}
ToolbarViewSelectorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerToolbarViewSelector]',
                template: `
        <li class="k-current-view" *ngIf="ctx.views?.length > 1">
            <a role="button" href="#" class="k-link" tabindex="-1" (click)="onCurrentViewClick($event)">
                {{ ctx.selectedView?.title }}
            </a>
        </li>
        <li *ngFor="let view of ctx.views"
            [class.k-state-selected]="isSelected(view)" [ngStyle]="{ display: itemDisplay }"
         >
            <a role="button" href="#" class="k-link" tabindex="-1" (click)="onClick(view)">
                {{ view.title }}
            </a>
        </li>
    `
            },] },
];
/** @nocollapse */
ToolbarViewSelectorComponent.ctorParameters = () => [
    { type: ToolbarService }
];
ToolbarViewSelectorComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-views',] }, { type: HostBinding, args: ['class.k-reset',] }],
    expanded: [{ type: HostBinding, args: ['class.k-state-expanded',] }]
};

/**
 * @hidden
 */
const publicDirectives = [
    ToolbarNavigationComponent,
    ToolbarTemplateDirective,
    ToolbarViewSelectorComponent
];
/**
 * @hidden
 */
class ToolbarModule {
}
ToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CalendarModule,
                    PopupModule
                ],
                exports: [
                    ToolbarComponent,
                    ...publicDirectives
                ],
                declarations: [
                    ToolbarComponent,
                    ...publicDirectives
                ]
            },] },
];

const defaultSlotClass = (_args) => null;
/**
 * @hidden
 */
class ConfigurationViewBase extends SchedulerView {
    constructor(localization, changeDetector, viewContext, viewState) {
        super();
        this.localization = localization;
        this.changeDetector = changeDetector;
        this.viewContext = viewContext;
        this.viewState = viewState;
        this.schedulerOptions = {};
        this.subs = this.localization.changes.subscribe(({ rtl }) => {
            changeDetector.markForCheck();
        });
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
    }
    /**
     * @hidden
     */
    get viewSlotClass() {
        return isPresent(this.slotClass) ? this.slotClass : (this.schedulerOptions.slotClass || defaultSlotClass);
    }
    /**
     * @hidden
     */
    get viewEventClass() {
        return isPresent(this.eventClass) ? this.eventClass : this.schedulerOptions.eventClass;
    }
    /**
     * @hidden
     */
    get viewEventStyles() {
        return isPresent(this.eventStyles) ? this.eventStyles : this.schedulerOptions.eventStyles;
    }
    ngOnChanges(_changes) {
        this.viewState.notifyOptionsChange();
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    optionsChange(options) {
        this.schedulerOptions = options;
    }
}
ConfigurationViewBase.propDecorators = {
    slotClass: [{ type: Input }],
    eventClass: [{ type: Input }],
    eventStyles: [{ type: Input }],
    template: [{ type: ViewChild, args: ['content',] }],
    eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
    groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }]
};

/**
 * The component for rendering the **Agenda** view.
 */
class AgendaViewComponent extends ConfigurationViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`agenda`).
         */
        this.name = 'agenda';
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('agendaViewTitle');
    }
}
AgendaViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-agenda-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => AgendaViewComponent)
                    }],
                template: `
        <ng-template #content>
            <agenda-view-internal
                [eventTemplate]="eventTemplate?.templateRef"
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [agendaTimeTemplate]="agendaTimeTemplate?.templateRef"
                [agendaDateTemplate]="agendaDateTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </agenda-view-internal>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
AgendaViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
AgendaViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
    agendaTimeTemplate: [{ type: ContentChild, args: [AgendaTimeTemplateDirective,] }],
    agendaDateTemplate: [{ type: ContentChild, args: [AgendaDateTemplateDirective,] }]
};

/**
 * @hidden
 */
class AgendaHeaderItemComponent {
    constructor() {
        this.classes = true;
    }
    get rowSpan() {
        return this.item.rowSpan;
    }
    get itemDate() {
        return toLocalDate(this.item.dataItem.value);
    }
}
AgendaHeaderItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaHeaderItem]',
                template: `
        <ng-container *ngIf="!agendaDateTemplate">
            <strong class="k-scheduler-agendaday">{{itemDate | kendoDate: 'dd'}}</strong>
            <em class="k-scheduler-agendaweek">{{itemDate | kendoDate: 'EEEE'}}</em>
            <span class="k-scheduler-agendadate">{{itemDate | kendoDate: 'y'}}</span>
        </ng-container>
        <ng-container *ngIf="agendaDateTemplate" [ngTemplateOutlet]="agendaDateTemplate"
            [ngTemplateOutletContext]="{ date: itemDate }">
        </ng-container>
    `
            },] },
];
AgendaHeaderItemComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-scheduler-datecolumn",] }],
    rowSpan: [{ type: HostBinding, args: ["attr.rowspan",] }],
    item: [{ type: Input, args: ["kendoSchedulerAgendaHeaderItem",] }],
    agendaDateTemplate: [{ type: Input }]
};

/**
 * @hidden
 */
class AgendaHeaderComponent {
    constructor(localization) {
        this.localization = localization;
        this.classes = true;
    }
    get dateMessage() {
        return this.localization.get('dateHeader');
    }
    get timeMessage() {
        return this.localization.get('timeHeader');
    }
    get eventMessage() {
        return this.localization.get('eventHeader');
    }
}
AgendaHeaderComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaHeader]',
                template: `
        <div class="k-scheduler-header-wrap">
            <table class="k-scheduler-table" role="presentation">
                <tbody>
                    <tr>
                        <th *ngFor="let resource of resources" class="k-scheduler-groupcolumn"></th>
                        <th class="k-scheduler-datecolumn">{{ dateMessage }}</th>
                        <th class="k-scheduler-timecolumn">{{ timeMessage }}</th>
                        <th>{{ eventMessage }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    `
            },] },
];
/** @nocollapse */
AgendaHeaderComponent.ctorParameters = () => [
    { type: LocalizationService }
];
AgendaHeaderComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-scheduler-header",] }, { type: HostBinding, args: ["class.k-state-default",] }],
    resources: [{ type: Input }]
};

/**
 * @hidden
 */
class AgendaTaskItemComponent {
    constructor(localization) {
        this.localization = localization;
    }
    get eventTitle() {
        const start = toLocalDate(this.item.start);
        const end = toLocalDate(this.item.end);
        const time = formatEventTime(start, end, this.item.isAllDay);
        return `${time}, ${this.item.event.title}`;
    }
    get eventColor() {
        return this.item.color;
    }
    get deleteMessage() {
        return this.localization.get('deleteTitle');
    }
    get isRecurrence() {
        return isRecurrence(this.item);
    }
    get isRecurrenceException() {
        return isRecurrenceException(this.item);
    }
    get removable() {
        return this.editable && this.editable.remove !== false;
    }
}
AgendaTaskItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaTaskItem]',
                template: `
        <div class="k-task" [title]="item.title">
            <span class="k-scheduler-mark" *ngIf="eventColor" [style.background-color]="eventColor"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
            <ng-container *ngIf="!eventTemplate">
                {{item?.title }}
            </ng-container>
            <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
                [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: item.resources }">
            </ng-container>

            <a href="#" *ngIf="removable" class="k-link k-event-delete" tabindex="-1" [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
        </div>
    `
            },] },
];
/** @nocollapse */
AgendaTaskItemComponent.ctorParameters = () => [
    { type: LocalizationService }
];
AgendaTaskItemComponent.propDecorators = {
    item: [{ type: Input, args: ["kendoSchedulerAgendaTaskItem",] }],
    color: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    editable: [{ type: Input }],
    eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
};

/**
 * @hidden
 */
class AgendaListComponent {
    constructor(intlService, localization) {
        this.intlService = intlService;
        this.localization = localization;
        this.classes = true;
    }
    extractDataItem(item) {
        return item.type === "group" ? item.dataItem.items[0] : item.dataItem;
    }
    formatTime(dataItem) {
        if (dataItem.isAllDay) {
            return this.localization.get('allDay');
        }
        let format = "{0:t}-{1:t}";
        if (dataItem.head) {
            format = "{0:t}";
        }
        else if (dataItem.tail) {
            format = "{1:t}";
        }
        return this.intlService.format(format, toLocalDate(dataItem.start), toLocalDate(dataItem.end));
    }
    trackByFn(_, item) {
        return item.dataItem;
    }
    cellClasses(item) {
        const task = this.extractDataItem(item);
        let result = [];
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
    }
    getEventStyles(item) {
        if (this.eventStyles) {
            const task = this.extractDataItem(item);
            return this.eventStyles({
                event: task.event,
                resources: task.resources
            });
        }
    }
}
AgendaListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaList]',
                template: `
        <table class="k-scheduler-table" role="presentation">
            <tbody>
                <ng-container *ngFor="let group of tasks; let groupIndex = index;">
                    <tr *ngFor="let item of group.tasks;let index = index; trackBy: trackByFn">
                        <ng-container *ngFor="let resource of group.resources;let resourceIndex = index">
                            <td *ngIf="group.spans[resourceIndex] && index === 0" class="k-scheduler-groupcolumn" [attr.rowspan]="group.spans[resourceIndex]">
                                {{ resource }}
                            </td>
                        </ng-container>
                        <td *ngIf="item.type === 'group'"
                            [kendoSchedulerAgendaHeaderItem]="item"
                            [agendaDateTemplate]="agendaDateTemplate">
                        </td>
                        <td class="k-scheduler-timecolumn">
                            <div *ngIf="!agendaTimeTemplate">
                                <span class="k-icon k-i-arrow-60-left" *ngIf="extractDataItem(item).tail"></span>
                                {{formatTime(extractDataItem(item)) }}
                                <span class="k-icon k-i-arrow-60-right" *ngIf="extractDataItem(item).head"></span>
                            </div>
                            <ng-container *ngIf="agendaTimeTemplate" [ngTemplateOutlet]="agendaTimeTemplate"
                                [ngTemplateOutletContext]="extractDataItem(item)">
                            </ng-container>
                        </td>
                        <td [attr.data-group-index]="groupIndex" [attr.data-task-index]="index"
                            [ngClass]="cellClasses(item)" [ngStyle]="getEventStyles(item)"
                            [kendoSchedulerFocusIndex]="groupIndex"
                            [kendoSchedulerAgendaTaskItem]="extractDataItem(item)"
                                [editable]="editable"
                                [eventTemplate]="eventTemplate"
                        ></td>
                    </tr>
                </ng-container>
            </tbody>
        </table>
    `
            },] },
];
/** @nocollapse */
AgendaListComponent.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService }
];
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

const flip = fn => a => b => fn(b, a);
const sort = flip(orderBy);
const group = flip(groupBy);
/**
 * @hidden
 */
const compose = (...args) => (data) => args.reduceRight((acc, curr) => curr(acc), data);
/**
 * @hidden
 */
const processEvents = (start, end) => compose(group([{ field: "startDate" }]), sort([{ field: "start", dir: "asc" }, { field: "end", dir: "asc" }]));
function* flattenGroups(groups) {
    for (let index = 0; index < groups.length; index++) {
        const groupItem = groups[index];
        yield {
            type: "group",
            dataItem: groupItem,
            rowSpan: groupItem.items.length
        };
        for (let itemIndex = 1; itemIndex < groupItem.items.length; itemIndex++) {
            const item = groupItem.items[itemIndex];
            yield {
                type: "event",
                dataItem: item
            };
        }
    }
}
/** @hidden */
class EmptyIterator {
    [iterator]() {
        return {
            next: () => ({ done: true, value: null })
        };
    }
    toString() {
        return "Empty Iterator";
    }
}
/**
 * @hidden
 */
class TaskCollection {
    constructor(start, end, events) {
        this.start = start;
        this.end = end;
        this.events = events;
        this.createIterator = compose(flattenGroups, processEvents(this.start, this.end));
    }
    static empty() {
        return (new EmptyIterator());
    }
    [iterator]() {
        return this.createIterator(this.events);
    }
    itemAt(index) {
        const taskIterator = this.createIterator(this.events);
        let idx = 0;
        let item;
        do {
            item = taskIterator.next();
            if (item && idx === index) {
                const value = item.value;
                return value.type === 'group' ? value.dataItem.items[0] : value.dataItem;
            }
            idx++;
        } while (item);
    }
    toString() {
        return this.events.toString();
    }
}

/**
 * @hidden
 */
function createResourceGroups(groupedResources) {
    let result = [];
    const firstResource = groupedResources[0];
    const firstResourceData = firstResource.data;
    for (let dataIdx = 0; dataIdx < firstResourceData.length; dataIdx++) {
        const item = firstResourceData[dataIdx];
        result.push({ resources: [getField(item, firstResource.textField)] });
    }
    for (let idx = 1; idx < groupedResources.length; idx++) {
        const resource = groupedResources[idx];
        const data = resource.data;
        const current = [];
        for (let resourceIdx = 0; resourceIdx < result.length; resourceIdx++) {
            const resourceItem = result[resourceIdx];
            for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
                const item = data[dataIdx];
                current.push({ resources: resourceItem.resources.concat(getField(item, resource.textField)) });
            }
        }
        result = current;
    }
    return result;
}
function createTask(item, resourceIdx, resources, color) {
    const event = item.event;
    return {
        event,
        start: item.start.toUTCDate(),
        end: item.end.toUTCDate(),
        title: event.title,
        isAllDay: event.isAllDay,
        color,
        resourceIdx,
        resources
    };
}
const durationInDays = ({ start, end, isAllDay = false }) => {
    const eventEnd = isAllDay ? getUTCDate(end) : end;
    const duration = Math.ceil((eventEnd - +getUTCDate(start)) / MS_PER_DAY);
    if (isAllDay) {
        return duration + 1;
    }
    return duration;
};
const curry = fn => {
    const len = fn.length;
    return (...args) => len === args.length
        ? fn.apply(null, args)
        : curry(fn.bind(null, ...args));
};
const range = num => Array.from(new Array(num).keys());
const cloneTask = (eventStart) => task => (Object.assign({}, task, { start: getUTCDate(eventStart), end: addUTCDays(eventStart, 1), startDate: getUTCDate(eventStart) }));
const previousEventEnd = (start, events) => events.length
    ? events[events.length - 1].end
    : start;
const markAsTailOrMid = isLast => task => {
    if (isLast) {
        task.tail = true;
    }
    else {
        task.mid = true;
    }
    return task;
};
const addTaskPart = (task, start) => (tasks, _, day, days) => tasks.concat(compose(markAsTailOrMid(day === days.length - 1), cloneTask(previousEventEnd(start, tasks)))(task));
const splitMultiDayTask = (task, start) => range(durationInDays(task) - 1)
    .reduce(addTaskPart(task, start), []);
/**
 * @hidden
 */
const splitTasks = curry((periodStart, periodEnd, tasks) => {
    const result = [];
    for (let index = 0; index < tasks.length; index++) {
        let task = Object.assign({}, tasks[index]);
        task.startDate = getUTCDate(task.start);
        if (task.start >= periodStart && task.start <= periodEnd) {
            result.push(task);
        }
        if (durationInDays(task) > 1) {
            task.end = addUTCDays(task.startDate, 1);
            task.head = true;
            result.push(...splitMultiDayTask(Object.assign({}, tasks[index]), task.end)
                .filter(tsk => getUTCDate(tsk.end) <= periodEnd && tsk.start >= periodStart));
        }
    }
    return result;
});
function groupByResource(groupedResources, resourceGroups, dateRange) {
    const groups = resourceGroups.filter(group => group.tasks && group.tasks.length);
    if (!groups.length) {
        return [];
    }
    const values = groups[0].resources.map(resource => ({ value: resource, span: 0, groupIdx: 0 }));
    const periodStart = toUTCDate(dateRange.start);
    const periodEnd = toUTCDate(dateRange.end);
    for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
        const group = groups[groupIdx];
        group.tasks = splitTasks(periodStart, periodEnd, group.tasks);
        const count = group.tasks.length;
        group.tasks = new TaskCollection(periodStart, periodEnd, group.tasks);
        let invalidate = false;
        for (let resourceIdx = 0; resourceIdx < groupedResources.length; resourceIdx++) {
            const resourceValue = values[resourceIdx];
            if (resourceValue.value !== group.resources[resourceIdx] || invalidate) {
                resourceValue.value = group.resources[resourceIdx];
                const spanGroup = groups[resourceValue.groupIdx];
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
    values.forEach((value, index) => {
        const group = groups[value.groupIdx];
        group.spans = group.spans || [];
        group.spans[index] = value.span;
    });
    return groups;
}
/**
 * @hidden
 */
function groupEvents(items, { taskResources, resourceGroups, spans, allResources, dateRange }) {
    const groups = resourceGroups || [{}];
    const periodStart = toUTCDate(dateRange.start);
    const periodEnd = toUTCDate(dateRange.end);
    for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        const event = item.event;
        if (!intersects(item.start.toUTCDate(), item.end.toUTCDate(), periodStart, periodEnd)) {
            continue;
        }
        const resources = eventResources(event, { taskResources, hasGroups: resourceGroups && resourceGroups.length > 0, spans, allResources });
        if (resources.length && resources[0].leafIdx >= 0) {
            for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
                const current = resources[resourceIdx];
                const task = createTask(item, current.leafIdx, current.resources, current.color);
                const tasks = groups[current.leafIdx].tasks = groups[current.leafIdx].tasks || [];
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
class AgendaViewInternalComponent {
    constructor(viewContext, viewState, intl, renderer, element, zone, pdfService, localization) {
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
    get eventTemplateRef() {
        return this.eventTemplate || (this.schedulerEventTemplate || {}).templateRef;
    }
    get agendaTimeTemplateRef() {
        return this.agendaTimeTemplate || (this.schedulerAgendaTimeTemplate || {}).templateRef;
    }
    get agendaDateTemplateRef() {
        return this.agendaDateTemplate || (this.schedulerAgendaDateTemplate || {}).templateRef;
    }
    ngOnInit() {
        this.updateContentHeight = this.updateContentHeight.bind(this);
        this.subs.add(this.viewContext.selectedDate.subscribe(this.onSelectDate.bind(this)));
        this.subs.add(this.viewContext.action.subscribe(this.onAction.bind(this)));
        this.subs.add(this.viewContext.execute.subscribe(this.execute.bind(this)));
        this.subs.add(this.viewContext.resize.subscribe(this.updateContentHeight));
        this.subs.add(combineLatest(this.viewContext.items, this.viewState.dateRange).pipe(map(([items, dateRange]) => {
            this.items = items;
            this.range = dateRange;
            return this.createEventGroups();
        }))
            .subscribe((tasks) => {
            this.tasks.next(tasks);
        }));
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
        const onStable = () => this.zone.onStable.pipe(take(1));
        this.subs.add(combineLatest(this.tasks, this.localization.changes).pipe(switchMap(onStable))
            .subscribe(this.updateContentHeight));
        this.subs.add(this.pdfService.createElement.subscribe(this.createPDFElement.bind(this)));
    }
    ngOnChanges(changes) {
        if (anyChanged(['selectedDateFormat', 'selectedShortDateFormat'], changes)) {
            this.viewState.notifyDateRange(this.dateRange(this.selectedDate));
        }
    }
    ngAfterViewInit() {
        if (!this.element) {
            return;
        }
        const contentElement = this.content.nativeElement;
        this.zone.runOutsideAngular(() => {
            this.subs.add(merge(fromEvent(contentElement, 'click'), fromEvent(contentElement, 'contextmenu'), fromEvent(contentElement, 'dblclick'))
                .subscribe(e => this.onClick(e)));
            this.subs.add(fromEvent(contentElement, 'keydown')
                .subscribe(e => this.onKeydown(e)));
        });
    }
    onClick(e) {
        const targetTask = this.targetTask(e.target);
        if (targetTask) {
            const { task, eventTarget } = targetTask;
            const eventType = e.type;
            const isSingle = eventType === 'click';
            const isDouble = eventType === 'dblclick';
            if (isSingle && closestInScope(e.target, node => hasClasses(node, 'k-event-delete'), eventTarget)) {
                e.preventDefault();
                this.viewState.emitEvent('remove', { event: task.event, dataItem: task.event.dataItem });
            }
            else {
                const name = isDouble ? 'eventDblClick' : 'eventClick';
                this.viewState.emitEvent(name, { type: eventType, event: task.event, originalEvent: e });
            }
        }
    }
    onKeydown(e) {
        const targetTask = this.targetTask(e.target);
        if (targetTask) {
            const task = targetTask.task;
            this.viewState.emitEvent('eventKeydown', { event: task.event, dataItem: task.event.dataItem, originalEvent: e });
        }
    }
    targetTask(target) {
        const eventTarget = closestInScope(target, node => node.hasAttribute('data-task-index'), this.element.nativeElement);
        if (eventTarget) {
            return {
                eventTarget,
                task: this.elementTask(eventTarget)
            };
        }
    }
    updateContentHeight() {
        const element = this.element.nativeElement;
        const parent = element.parentNode;
        const content = this.content.nativeElement;
        this.renderer.setStyle(content, 'height', '');
        let height = parent.clientHeight;
        for (let idx = 0; idx < parent.children.length; idx++) {
            const child = parent.children[idx];
            if (child !== element && !ignoreContentChild(child)) {
                height -= child.offsetHeight;
            }
        }
        const headerElement = this.headerWrap.nativeElement;
        height -= this.headerWrap ? headerElement.offsetHeight : 0;
        this.renderer.setStyle(content, 'height', `${height}px`);
        const rtl = this.localization.rtl;
        const padding = hasScrollbar(content, 'vertical') ? scrollbarWidth() : 0;
        this.renderer.setStyle(headerElement, !rtl ? 'padding-right' : 'padding-left', `${padding}px`);
        this.renderer.setStyle(headerElement, rtl ? 'padding-right' : 'padding-left', '0px');
        this.viewState.notifyLayoutEnd();
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    optionsChange(changes) {
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
    }
    onSelectDate(date) {
        this.selectedDate = date;
        this.viewState.notifyDateRange(this.dateRange());
    }
    onAction(e) {
        const now = getDate(this.selectedDate);
        if (e.type === 'next') {
            const next = getDate(addDays(now, 7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            const next = getDate(addDays(now, -7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
    }
    createEventGroups() {
        const resourceGroups = this.groupedResources.length ? createResourceGroups(this.groupedResources) : null;
        const eventGroups = this.groups = groupEvents(this.items, {
            taskResources: this.taskResources,
            resourceGroups,
            allResources: this.resources,
            spans: this.spans,
            dateRange: this.range
        });
        return eventGroups;
    }
    dateRange(date = this.selectedDate) {
        const start = getDate(date);
        const end = getDate(addDays(start, 7));
        const text = this.intl.format(this.selectedDateFormat, start, end);
        const shortText = this.intl.format(this.selectedShortDateFormat, start, end);
        return { start, end, text, shortText };
    }
    groupResources() {
        const resources = this.resources || [];
        const group = this.group || {};
        const grouped = group.resources;
        const groupedResources = this.groupedResources = [];
        if (grouped && grouped.length) {
            for (let groupIdx = 0; groupIdx < grouped.length; groupIdx++) {
                const name = grouped[groupIdx];
                const resource = resources.find(item => item.name === name);
                if (resource) {
                    groupedResources.push(resource);
                }
            }
        }
        this.spans = this.resourceSpans();
    }
    resourceSpans() {
        const spans = [1];
        const resources = this.groupedResources;
        let span = 1;
        for (let idx = resources.length - 1; idx > 0; idx--) {
            span *= ((resources[idx].data || []).length || 1);
            spans.unshift(span);
        }
        return spans;
    }
    get taskResources() {
        if (this.groupedResources.length) {
            return this.groupedResources;
        }
        else if (this.resources && this.resources.length) {
            return [this.resources[0]];
        }
        else {
            return [{}];
        }
    }
    isInRange(date) {
        const dateRange = this.dateRange(date);
        return (!this.min || this.min < dateRange.end) && (!this.max || dateRange.start <= this.max);
    }
    createPDFElement() {
        const element = this.element.nativeElement.cloneNode(true);
        element.style.width = `${this.element.nativeElement.offsetWidth}px`;
        element.querySelector('.k-scheduler-content').style.height = 'auto';
        const header = element.querySelector('.k-scheduler-header');
        header.style.paddingRight = 0;
        header.style.paddingLeft = 0;
        this.pdfService.elementReady.emit({
            element: element
        });
    }
    elementTask(element) {
        const index = parseInt(element.getAttribute('data-task-index'), 10);
        const groupIndex = parseInt(element.getAttribute('data-group-index'), 10);
        const group = this.groups[groupIndex];
        const task = group.tasks.itemAt(index);
        return task;
    }
    execute(e) {
        if (e.name === 'slotByPosition') {
            const slot = this.slotByPosition(e.args);
            e.result(slot);
        }
        else if (e.name === 'eventFromElement') {
            const task = this.elementTask(e.args.element);
            if (task) {
                e.result(task.event);
            }
        }
    }
    slotByPosition({ x, y }) {
        const contentTable = this.content.nativeElement.querySelector('table');
        const offset = elementOffset(contentTable);
        if (offset.top <= y && y <= offset.top + offset.height) {
            const contentRows = contentTable.rows;
            if (!contentRows.length) {
                return;
            }
            const taskOffset = elementOffset(contentRows[0].cells[contentRows[0].cells.length - 1]);
            if (taskOffset.left <= x && x <= taskOffset.left + taskOffset.width) {
                for (let idx = 0; idx < contentRows.length; idx++) {
                    const row = contentRows[idx];
                    const rowOffset = elementOffset(row);
                    if (rowOffset.top <= y && y <= rowOffset.top + rowOffset.height) {
                        const element = row.querySelector('[data-task-index]');
                        const task = this.elementTask(element);
                        const event = task.event;
                        return {
                            element: new ElementRef(element),
                            start: event.start,
                            end: event.end,
                            event: event,
                            resources: task.resources,
                            isAllDay: task.isAllDay
                        };
                    }
                }
            }
        }
    }
}
AgendaViewInternalComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'agenda-view-internal',
                template: `
        <table class="k-scheduler-layout k-scheduler-agendaview k-scheduler-agenda">
            <tbody>
                <tr>
                    <td>
                        <div kendoSchedulerAgendaHeader [resources]="groupedResources" #headerWrap></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div kendoSchedulerAgendaList #content
                            [editable]="editable"
                            [eventTemplate]="eventTemplateRef"
                            [slotClass]="slotClass"
                            [eventClass]="eventClass"
                            [eventStyles]="eventStyles"
                            [agendaTimeTemplate]="agendaTimeTemplateRef"
                            [agendaDateTemplate]="agendaDateTemplateRef"
                            [tasks]="tasks | async">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `
            },] },
];
/** @nocollapse */
AgendaViewInternalComponent.ctorParameters = () => [
    { type: ViewContextService },
    { type: ViewStateService },
    { type: IntlService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: PDFService },
    { type: LocalizationService }
];
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

/**
 * @hidden
 */
class SharedModule {
    static exports() {
        return [
            FocusableDirective
        ];
    }
}
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

const COMPONENTS = [
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
class AgendaViewModule {
}
AgendaViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IntlModule, SharedModule],
                exports: [AgendaViewComponent],
                declarations: [COMPONENTS]
            },] },
];

/**
 * @hidden
 */
class ItemMap {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    get first() {
        if (this.count > 0) {
            return this.items[Object.keys(this.items)[0]];
        }
    }
    get last() {
        if (this.count > 0) {
            const keys = Object.keys(this.items);
            return this.items[keys[keys.length - 1]];
        }
    }
    addItem(index, item) {
        if (!this.items[index]) {
            this.count++;
        }
        this.items[index] = item;
    }
    removeItem(index, item) {
        const current = this.items[index];
        if (current === item) {
            delete this.items[index];
            this.count--;
        }
    }
    toArray() {
        return Object.keys(this.items).map(index => this.items[index]);
    }
}

/**
 * @hidden
 */
class BaseSlotService {
    constructor() {
        this.containerSize = 0;
        this.slotsChange = new EventEmitter();
        this.groups = [];
    }
    registerItem(component) {
        const group = this.itemGroup(component);
        group.registerItem(component);
    }
    unregisterItem(component, resourceIndex = component.resourceIndex, index = component.index) {
        const group = this.groups[resourceIndex];
        if (group) {
            group.unregisterItem(component, index);
        }
    }
    registerSlot(slot) {
        const group = this.slotGroup(slot);
        group.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const group = this.groups[slot.id.resourceIndex];
        if (group) {
            group.unregisterSlot(slot);
        }
    }
    invalidate() {
        this.clearEmptyGroups();
        this.cleanRanges();
        this.slotsChange.emit();
        this.forEachSlot(slot => {
            slot.invalidate();
        });
    }
    cleanRanges() {
        this.groups.forEach(group => {
            group.cleanRanges();
        });
    }
    clearEmptyGroups() {
        const groups = this.groups;
        let index = this.groups.length - 1;
        while (index > 0 && !groups[index].hasSlots) {
            groups.splice(index, 1);
            index--;
        }
    }
    itemGroup(item) {
        const index = item.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    }
    slotGroup(slot) {
        const index = slot.id.resourceIndex;
        if (!this.groups[index]) {
            this.groups[index] = this.createGroup(index);
        }
        return this.groups[index];
    }
}

/** @hidden */
const MIDNIGHT_INVARIANT = new Date(1980, 0, 1);
/** @hidden */
const INVARIANT_END = new Date(1980, 0, 2);
/** @hidden */
const MS_PER_SECOND = 1000;
/** @hidden */
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
/** @hidden */

//probably should calculate this
/** @hidden */
const BORDER_WIDTH = 1;
/** @hidden */
const DEFAULT_EVENT_HEIGHT = 25;

//better try to measure this one
const MORE_BUTTON_HEIGHT = 13;
const EVENT_OFFSET = 2;
/**
 * @hidden
 */
class SlotRange {
    constructor(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    get slots() {
        return this.slotMap.toArray();
    }
    get items() {
        return this.itemMap.toArray();
    }
    get start() {
        const first = this.slotMap.first;
        if (!first) {
            return null;
        }
        return first.start;
    }
    get end() {
        const last = this.slotMap.last;
        if (!last) {
            return null;
        }
        return addUTCDays(last.end, 1);
    }
    get hasSlots() {
        return this.slotMap.count > 0;
    }
    get hasItems() {
        return this.itemMap.count > 0;
    }
    get firstSlot() {
        return this.slotMap.first;
    }
    get lastSlot() {
        return this.slotMap.last;
    }
    get rect() {
        const first = this.firstSlot.rect;
        const last = this.lastSlot.rect;
        return {
            left: first.left,
            top: first.top,
            width: last.left - first.left + last.width,
            height: last.top - first.top + last.height
        };
    }
    registerItem(component) {
        this.itemMap.addItem(component.item.index, component);
    }
    unregisterItem(component, index) {
        this.itemMap.removeItem(index, component);
    }
    registerSlot(slot) {
        this.slotMap.addItem(slot.id.index, slot);
    }
    unregisterSlot(slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    }
    layout(eventHeight) {
        if (!this.hasItems) {
            return;
        }
        const items = this.items;
        const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        const slotItems = {};
        const slots = this.slots;
        sorted.forEach(event => slots
            .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
            .forEach(slot => {
            const value = slotItems[slot.key] = slotItems[slot.key] || { events: [], height: slot.linkHeight };
            value.slot = slot;
            const rect = slot.rect;
            const data = event.item.data[event.resourceIndex];
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
        }));
        sorted.forEach(event => {
            if (event.rect) {
                event.rect.width -= BORDER_WIDTH;
            }
            event.reflow();
        });
    }
}
/**
 * @hidden
 */
class MonthResourceGroup {
    constructor(index) {
        this.index = index;
        this.dayRanges = [];
    }
    get hasSlots() {
        return Boolean(this.dayRanges.find(range => range && range.hasSlots));
    }
    registerSlot(slot) {
        const range = this.slotRange(slot);
        range.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const range = this.dayRanges[slot.id.rangeIndex];
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            delete this.dayRanges[slot.id.rangeIndex];
        }
    }
    registerItem(component) {
        const range = this.dayRanges[component.item.rangeIndex];
        range.registerItem(component);
    }
    unregisterItem(component, index) {
        const range = this.dayRanges[component.item.rangeIndex];
        if (range) {
            range.unregisterItem(component, index);
        }
    }
    slotRange(slot) {
        const ranges = this.dayRanges;
        const rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange(rangeIndex);
        }
        return ranges[rangeIndex];
    }
    forEachRange(callback) {
        for (let i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    }
    cleanRanges() {
        this.dayRanges = this.dayRanges.filter(r => Boolean(r));
    }
}
/**
 * @hidden
 */
class MonthSlotService extends BaseSlotService {
    layout(eventHeight) {
        this.groups.forEach((group) => group.forEachRange(range => range.layout(eventHeight)));
    }
    slotByIndex(slotIndex) {
        const [resourceIndex, rangeIndex, index] = slotIndex.split(':').map(part => parseInt(part, 10));
        return this.groups[resourceIndex].dayRanges[rangeIndex].slots[index];
    }
    forEachSlot(callback) {
        this.groups.forEach((group) => {
            group.dayRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
        });
    }
    createGroup(index) {
        return new MonthResourceGroup(index);
    }
    slotByPosition(x, y) {
        let range;
        this.groups.find((group) => {
            range = group.dayRanges.find(r => rectContains(r.rect, x, y));
            return range;
        });
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    dragRanges(currentSlot, offset) {
        const start = new Date(currentSlot.start.getTime() - offset.start);
        const end = new Date(currentSlot.start.getTime() + offset.end);
        const group = this.groups[currentSlot.id.resourceIndex];
        const ranges = [];
        group.dayRanges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start,
            end,
            ranges
        };
    }
    groupSlotByPosition(currentSlot, x, y) {
        const range = this.groups[currentSlot.id.resourceIndex].dayRanges.find(r => rectContains(r.rect, x, y));
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    resizeRanges(currentSlot, task, resizeStart, offset) {
        const group = this.groups[task.resources[0].leafIdx];
        const ranges = [];
        const startDate = task.start.toUTCDate();
        const endDate = task.end.toUTCDate();
        let start, end;
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
        group.dayRanges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                ranges.push(slots);
            }
        });
        return {
            start: new Date(start),
            end: new Date(end),
            ranges: ranges
        };
    }
}

/**
 * @hidden
 */
class BaseViewItem {
    constructor(slotService, localization, focusService, element, renderer) {
        this.slotService = slotService;
        this.localization = localization;
        this.focusService = focusService;
        this.element = element;
        this.renderer = renderer;
        this.className = true;
        this.subs = new Subscription();
    }
    get taskIndex() {
        return this.item.index;
    }
    get touchAction() {
        return this.editable && this.editable.drag !== false ? 'none' : null;
    }
    get eventTitle() {
        const startTime = toLocalDate(this.item.startTime);
        const endTime = toLocalDate(this.item.endTime);
        const time = formatEventTime(startTime, endTime, this.item.isAllDay);
        return `${time}, ${this.item.event.title}`;
    }
    get deleteMessage() {
        return this.localization.get('deleteTitle');
    }
    get resizable() {
        return this.editable && this.editable.resize !== false;
    }
    get removable() {
        return this.editable && this.editable.remove !== false;
    }
    get isRecurrence() {
        return isRecurrence(this.item);
    }
    get isRecurrenceException() {
        return isRecurrenceException(this.item);
    }
    get nativeElement() {
        if (this.element) {
            return this.element.nativeElement;
        }
    }
    setStyles(styles) {
        const element = this.nativeElement;
        if (element) {
            for (let name in styles) {
                if (styles.hasOwnProperty(name)) {
                    this.renderer.setStyle(element, name, styles[name]);
                }
            }
        }
    }
    toggle(visible) {
        this.setStyles({ display: visible ? 'block' : 'none' });
    }
    reflow() {
        const rect = this.rect;
        if (rect) {
            this.setStyles({
                left: !this.localization.rtl ? `${rect.left}px` : '',
                right: this.localization.rtl ? `${rect.left}px` : '',
                top: `${rect.top}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                display: 'block'
            });
        }
    }
    ngOnInit() {
        if (this.dragHint) {
            return;
        }
        this.subs.add(this.slotService.slotsChange.subscribe(() => {
            this.rect = null;
            this.setStyles({
                display: 'none',
                width: 0,
                left: 0
            });
            this.slotService.unregisterItem(this, this.resourceIndex, this.index);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
            }
        }));
    }
    ngOnChanges(changes) {
        if (this.dragHint) {
            return;
        }
        if (anyChanged(['resourceIndex', 'index'], changes)) {
            const { resourceIndex, index } = changes;
            const previousResourceIndex = resourceIndex ? resourceIndex.previousValue : this.resourceIndex;
            const previousIndex = index ? index.previousValue : this.index;
            this.slotService.unregisterItem(this, previousResourceIndex, previousIndex);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
                this.toggle(true);
            }
            else {
                this.toggle(false);
            }
        }
    }
    ngOnDestroy() {
        if (this.dragHint) {
            return;
        }
        this.slotService.unregisterItem(this);
        this.subs.unsubscribe();
    }
}
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

/**
 * @hidden
 */
class MonthViewItemComponent extends BaseViewItem {
    constructor(slotService, localization, focusService, element, renderer) {
        super(slotService, localization, focusService, element, renderer);
    }
    reflow() {
        if (this.item.data[this.resourceIndex].hidden) {
            this.toggle(false);
            return;
        }
        super.reflow();
    }
}
MonthViewItemComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[monthViewItem]',
                template: `
        <span class="k-event-actions">
            <span class="k-icon k-i-arrow-60-left" *ngIf="item.tail"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
        </span>
        <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
            [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: resources }">
        </ng-container>
        <div *ngIf="!eventTemplate" [attr.title]="eventTitle">
            <div class="k-event-template">{{ item.event.title }}</div>
        </div>

        <span class="k-event-actions">
            <a *ngIf="removable" href="#" class="k-link k-event-delete" tabindex="-1" [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
            <span class="k-icon k-i-arrow-60-right" *ngIf="item.head"></span>
        </span>

        <ng-container *ngIf="resizable">
            <span class="k-resize-handle k-resize-w"></span>
            <span class="k-resize-handle k-resize-e"></span>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
MonthViewItemComponent.ctorParameters = () => [
    { type: MonthSlotService },
    { type: LocalizationService },
    { type: FocusService },
    { type: ElementRef },
    { type: Renderer2 }
];

/**
 * The component for rendering the **Month** view.
 */
class MonthViewComponent extends ConfigurationViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting.
         */
        this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`month`).
         */
        this.name = 'month';
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('monthViewTitle');
    }
    get viewEventHeight() {
        return isPresent(this.eventHeight) ? this.eventHeight : (this.schedulerOptions.eventHeight || DEFAULT_EVENT_HEIGHT);
    }
}
MonthViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-month-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => MonthViewComponent)
                    }],
                template: `
        <ng-template #content>
            <month-view
                [eventHeight]="viewEventHeight"
                [??ventTemplate]="eventTemplate?.templateRef"
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [groupHeaderTemplate]="groupHeaderTemplate?.templateRef"
                [monthDaySlotTemplate]="monthDaySlotTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </month-view>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
MonthViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
MonthViewComponent.propDecorators = {
    eventHeight: [{ type: Input }],
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    monthDaySlotTemplate: [{ type: ContentChild, args: [MonthDaySlotTemplateDirective,] }]
};

const last = (arr) => arr[arr.length - 1];
/**
 * @hidden
 */
const createTasks = (periodStart, periodEnd, items, ranges) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const data = {};
        const startTime = item.start.stripTime().toUTCDate();
        const end = item.end.stripTime();
        const endTime = (item.end.getTime() !== end.getTime() ? end.addDays(1) : end).toUTCDate();
        if (intersects(startTime, endTime, utcStart, utcEnd)) {
            for (let rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
                const range = ranges[rangeIdx];
                const rangeStart = toUTCDate(range[0]);
                const rangeEnd = addUTCDays(toUTCDate(last(range)), 1);
                if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                    const task = {
                        index,
                        startTime,
                        endTime,
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
    const data = task.data;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            delete data[key];
        }
    }
}
/**
 * @hidden
 */
function updateTaskData(tasks) {
    for (let idx = 0; idx < tasks.length; idx++) {
        const task = tasks[idx];
        const resources = task.resources;
        clearTaskData(task);
        for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
            task.data[resources[resourceIdx].leafIdx] = {};
        }
    }
}

/**
 * @hidden
 */
class HintContainerComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.changeDetector.detach();
    }
    detectChanges() {
        this.changeDetector.detectChanges();
    }
}
HintContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-hint-container',
                template: `
        <ng-container [ngTemplateOutlet]="hintTemplate">
        </ng-container>
    `
            },] },
];
/** @nocollapse */
HintContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
HintContainerComponent.propDecorators = {
    hintTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};

const SCROLL_CHANGE = 15;
const MIN_DISTANCE = 60;
const SCROLL_INTERVAL = 50;
const MIN_MOVE_DISTANCE = 10;
/** @hidden */
class BaseView {
    constructor(viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) {
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
    get eventTemplateRef() {
        return this.??ventTemplate || (this.schedulerEventTemplate || {}).templateRef;
    }
    get groupHeaderTemplateRef() {
        return this.groupHeaderTemplate || (this.schedulerGroupHeaderTemplate || {}).templateRef;
    }
    ngOnInit() {
        const updateView = this.updateView.bind(this);
        this.resourcesByIndex = this.resourcesByIndex.bind(this);
        this.subs.add(this.viewContext.selectedDate.subscribe(this.onSelectDate.bind(this)));
        this.subs.add(this.viewContext.action.subscribe(this.onAction.bind(this)));
        this.subs.add(this.viewContext.execute.subscribe(this.execute.bind(this)));
        this.subs.add(this.viewContext.resize.subscribe(() => {
            this.toggleElement(false);
            this.updateView();
        }));
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
        this.subs.add(this.changes.subscribe(() => {
            this.toggleElement(false);
        }));
        this.subs.add(combineLatest(this.viewContext.items, this.viewState.dateRange)
            .pipe(map(([items, dateRange]) => this.createTasks(items, dateRange)))
            .subscribe((tasks) => {
            this.tasks = tasks;
            this.assignResources();
            this.onTasksChange();
        }));
        this.subs.add(combineLatest(this.items, this.changes, this.localization.changes).pipe(switchMap(() => this.onStable()))
            .subscribe(updateView));
        this.subs.add(this.pdfService.createElement.subscribe(this.createPDFElement.bind(this)));
    }
    ngOnChanges(changes) {
        if (anyChanged(['selectedDateFormat', 'selectedShortDateFormat'], changes)) {
            this.viewState.notifyDateRange(this.dateRange(this.selectedDate));
        }
        if (changes.eventHeight) {
            this.changes.next(null);
        }
    }
    ngAfterViewInit() {
        this.bindEvents();
        this.subs.add(this.localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
        }));
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
        this.domEvents.forEach(unbindHandler => unbindHandler());
        this.domEvents = [];
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    }
    itemIndex(index, _) {
        return index;
    }
    resourcesByIndex(index) {
        if (!this.resourcesCache[index]) {
            const resources = this.taskResources;
            const result = [];
            let currentIndex = index;
            for (let idx = 0; idx < resources.length; idx++) {
                const data = resources[idx].data || [];
                const dataIdx = Math.floor(currentIndex / this.spans[idx]);
                result.push(data[dataIdx]);
                currentIndex -= dataIdx * this.spans[idx];
            }
            this.resourcesCache[index] = result;
        }
        return this.resourcesCache[index];
    }
    dragResourcesByIndex(index) {
        const allResources = this.resources || [];
        const result = [];
        if (this.groupedResources.length) {
            const resources = this.resourcesByIndex(index).slice(0);
            const taskResources = this.taskResources;
            for (let idx = 0; idx < taskResources.length; idx++) {
                const index = this.resources.indexOf(taskResources[idx]);
                if (index >= 0) {
                    result[index] = resources[idx];
                }
            }
        }
        for (let idx = 0; idx < allResources.length; idx++) {
            if (!result[idx]) {
                result[idx] = resourceItemByValue(this.dragging.task.event, allResources[idx]);
            }
        }
        return result;
    }
    getEventClasses(item, resources, isAllDay) {
        if (this.eventClass) {
            return this.eventClass({
                event: item.event,
                resources,
                isAllDay
            });
        }
    }
    getEventStyles(item, itemResource, isAllDay) {
        const result = { backgroundColor: itemResource.color, borderColor: itemResource.color };
        if (this.eventStyles) {
            Object.assign(result, this.eventStyles({
                event: item.event,
                resources: itemResource.resources,
                isAllDay
            }));
        }
        return result;
    }
    optionsChange(options) {
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
    }
    toggleElement(visible) {
        if (this.element) {
            this.renderer.setStyle(this.element.nativeElement, 'display', visible ? 'block' : 'none');
        }
    }
    onStable() {
        return this.zone.onStable.asObservable().pipe(take(1));
    }
    updateView() {
        this.slotService.invalidate();
        this.toggleElement(true);
        this.reflow();
        this.viewState.notifyLayoutEnd();
    }
    assignResources() {
        assignTasksResources(this.tasks, {
            taskResources: this.taskResources,
            hasGroups: this.groupedResources.length > 0,
            allResources: this.resources,
            spans: this.spans
        });
    }
    bindEvents() {
        const contentElement = this.content.nativeElement;
        const element = this.element.nativeElement;
        this.zone.runOutsideAngular(() => {
            if (this.times) {
                this.subs.add(merge(fromEvent(this.times.nativeElement, 'mousewheel'), fromEvent(this.times.nativeElement, 'DOMMouseScroll')).pipe(filter((event) => !event.ctrlKey), tap(preventLockedScroll(contentElement)), map(wheelDeltaY))
                    .subscribe(x => contentElement.scrollTop -= x));
            }
            this.subs.add(merge(fromClick(contentElement), fromEvent(contentElement, 'contextmenu'))
                .subscribe(e => this.onClick(e)));
            this.subs.add(fromDoubleClick(contentElement)
                .subscribe(e => this.onClick(e, 'dblclick')));
            this.subs.add(fromEvent(element, 'keydown')
                .subscribe(e => this.onKeydown(e)));
            this.domEvents.push(this.renderer.listen(contentElement, 'scroll', () => {
                if (this.headerWrap) {
                    this.headerWrap.nativeElement.scrollLeft = contentElement.scrollLeft;
                }
                if (this.times) {
                    this.times.nativeElement.scrollTop = contentElement.scrollTop;
                }
            }));
            this.draggable = new Draggable({
                press: this.onPress.bind(this),
                drag: this.onDrag.bind(this),
                release: this.onRelease.bind(this)
            });
            this.draggable.bindTo(element);
        });
    }
    onPress(args) {
        const resizable = this.editable && this.editable.resize !== false;
        const draggable = this.editable && this.editable.drag !== false;
        const target = args.originalEvent.target;
        if (hasClasses(target, 'k-resize-handle')) {
            if (!resizable) {
                return;
            }
            this.initResize(args);
        }
        else if (draggable) {
            const task = this.targetTask(target);
            if (task) {
                if (!args.isTouch) {
                    args.originalEvent.preventDefault();
                }
                this.pressLocation = { x: args.pageX, y: args.pageY };
                this.pressTarget = task;
            }
        }
        this.dragArgs = args;
    }
    onDrag(args) {
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
    }
    onRelease() {
        clearInterval(this.scrollInterval);
        const { resizing, dragging } = this;
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
    }
    setHintClass(className) {
        (this.dragging || this.resizing).hintClass = className;
    }
    updateHintClass() {
        const current = this.dragging || this.resizing;
        let update = false;
        this.hints.forEach(hint => {
            if (hint.class !== current.hintClass) {
                hint.class = current.hintClass;
                update = true;
            }
        });
        if (update) {
            this.updateHintContainer();
        }
    }
    removeHintClass() {
        (this.dragging || this.resizing).hintClass = null;
    }
    setSlotClass(className) {
        const current = this.dragging || this.resizing;
        current.slotClass = className;
        this.renderer.addClass(current.slot.nativeElement, current.slotClass);
    }
    removeSlotClass() {
        const current = this.dragging || this.resizing;
        if (current.slotClass) {
            this.renderer.removeClass(current.slot.nativeElement, current.slotClass);
            current.slotClass = null;
        }
    }
    get hints() {
        return this.dragging ? this.dragHints : this.resizeHints;
    }
    initDrag(args) {
        if (!this.dragging && this.pressLocation && pointDistance(this.pressLocation.x, this.pressLocation.y, args.pageX, args.pageY) >= MIN_MOVE_DISTANCE) {
            const dragging = this.pressTarget;
            const task = dragging.task;
            if (this.emitEvent('dragStart', { event: task.event, dataItem: task.event.dataItem })) {
                this.pressLocation = null;
                this.pressTarget = null;
                return;
            }
            this.dragging = dragging;
            this.updateDragContainer(args);
            const { x, y } = this.coordinatesOffset(this.pressLocation.x, this.pressLocation.y);
            const slot = this.slotByPosition(x, y, this.container);
            this.dragging.offset = {
                start: slot.start.getTime() - task.start.toUTCDate().getTime(),
                end: task.end.toUTCDate().getTime() - slot.start.getTime()
            };
            this.dragging.slot = slot;
            this.dragging.startResources = this.dragging.resourceItems = this.dragResourcesByIndex(slot.id.resourceIndex);
            this.dragging.resources = this.resourceValues(task, this.dragging.startResources);
        }
    }
    updateDragContainer(args) {
        if (!this.container) {
            this.container = this.content.nativeElement;
            this.containerOffset = elementOffset(this.container);
        }
    }
    drag(args) {
        this.updateDragContainer(args);
        if (!this.container) {
            return;
        }
        const { x, y } = this.coordinatesOffset(args.pageX, args.pageY);
        const slot = this.slotByPosition(x, y, this.container);
        if (slot && (slot !== this.dragging.slot || !this.dragHints.length)) {
            const dragging = this.dragging;
            const { slot: currentSlot, task } = dragging;
            const { ranges, start, end, isAllDay } = this.dragRanges(slot);
            let resourceItems, resourceValues;
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
                isAllDay,
                setHintClass: this.setHintClass,
                setSlotClass: this.setSlotClass
            })) {
                this.updateHintClass();
                return;
            }
            const color = this.dragResourceColor(task, resourceItems);
            const hintClasses = this.dragHintClasses();
            this.dragHints = [];
            for (let idx = 0; idx < ranges.length; idx++) {
                const slots = ranges[idx];
                const first = slots[0];
                const last = slots[slots.length - 1];
                const size = this.dragHintSize(first, last);
                let origin = first.rect.left;
                const styles = {
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
    }
    dragHintClasses() {
        const hintClass = this.dragging.hintClass;
        let result = [];
        if (hintClass) {
            result.push(hintClass);
        }
        if (this.eventClass) {
            const eventClass = this.eventClass(this.dragHintEventStyleArgs());
            result = result.concat(convertNgClassBindings(eventClass));
        }
        return result;
    }
    dragHintEventStyleArgs() {
        return {
            event: this.dragging.task.event,
            resources: this.dragging.resourceItems
        };
    }
    draggedIsAllDay(task, _slot) {
        return Boolean(task.event.isAllDay);
    }
    dragResourceColor(task, slotResources) {
        if (this.groupedResources.length) {
            const index = this.resources.indexOf(this.groupedResources[0]);
            return getField(slotResources[index], this.groupedResources[0].colorField);
        }
        else if (this.resources && this.resources.length) {
            return task.resources[0].color;
        }
        return '';
    }
    resourceValues(task, currentResources) {
        const result = {};
        for (let idx = 0; idx < currentResources.length; idx++) {
            const resource = this.resources[idx];
            const resourceItem = currentResources[idx];
            let value;
            if (Array.isArray(resourceItem)) { // not grouped multiple resource
                value = getField(task.event, resource.field);
            }
            else {
                value = getField(currentResources[idx], resource.valueField);
                if (resource.multiple) {
                    const startValue = getField(this.dragging.startResources[idx], resource.valueField);
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
    }
    initResize(args) {
        args.originalEvent.preventDefault();
        const target = args.originalEvent.target;
        const resizing = this.targetTask(target);
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
        const { x, y } = this.coordinatesOffset(args.pageX, args.pageY);
        resizing.slot = this.slotByPosition(x, y, this.container);
        resizing.offset = {
            start: resizing.task.start.toUTCDate().getTime() - resizing.slot.start.getTime(),
            end: resizing.task.end.toUTCDate().getTime() - resizing.slot.start.getTime()
        };
    }
    resize(args) {
        const { x, y } = this.coordinatesOffset(args.pageX, args.pageY);
        const resizing = this.resizing;
        const { direction, task, offset } = resizing;
        const slot = this.slotService.groupSlotByPosition(resizing.slot, x, y);
        if (!slot || slot === resizing.slot) {
            return;
        }
        this.removeSlotClass();
        const { start, end, ranges } = this.slotService.resizeRanges(slot, task, direction === 'w' || direction === 'n', offset);
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
    }
    updateResizeHints(ranges, start, end) {
        const resizing = this.resizing;
        const direction = resizing.direction;
        const horizontal = direction === 'w' || direction === 'e';
        const resizeStart = direction === 'w' || direction === 'n';
        this.resizeHints = [];
        for (let idx = 0; idx < ranges.length; idx++) {
            const range = ranges[idx];
            const firstSlot = range[0];
            const lastSlot = range[range.length - 1];
            const first = idx === 0;
            const last = idx === ranges.length - 1;
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
    }
    coordinatesOffset(x, y, container = this.container, offset = this.containerOffset) {
        const position = x - offset.left + container.scrollLeft;
        return {
            x: !this.localization.rtl ? position : this.slotService.containerSize - position,
            y: y - offset.top + container.scrollTop
        };
    }
    scrollContainer(callback, args) {
        clearInterval(this.scrollInterval);
        const container = this.container;
        if (!container) {
            return;
        }
        const viewPortY = args.pageY - this.containerOffset.top;
        const pointerYDistance = Math.abs(container.offsetHeight - viewPortY);
        const deltaY = args.pageY - this.dragArgs.pageY;
        const viewPortX = args.pageX - this.containerOffset.left;
        const pointerXDistance = Math.abs(container.offsetWidth - viewPortX);
        const deltaX = args.pageX - this.dragArgs.pageX;
        let scroll = false;
        let leftChange = 0;
        let topChange = 0;
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
            this.scrollInterval = setInterval(() => {
                if (this.container) {
                    this.container.scrollLeft += leftChange;
                    this.container.scrollTop += topChange;
                    callback.call(this, args);
                }
                else {
                    clearInterval(this.scrollInterval);
                }
            }, SCROLL_INTERVAL);
        }
    }
    emitEvent(name, args) {
        this.viewState.emitEvent(name, args);
        return args.prevented;
    }
    targetTask(target) {
        const eventTarget = closestInScope(target, node => node.hasAttribute('data-task-index'), this.element.nativeElement);
        if (eventTarget) {
            const index = parseInt(eventTarget.getAttribute('data-task-index'), 10);
            return {
                target: eventTarget,
                task: this.tasks.find(t => t.index === index)
            };
        }
    }
    updateHintContainer() {
        if (this.hintContainer) {
            this.hintContainer.detectChanges();
        }
    }
    /**
     * Converts a "view date" (date stored in the UTC parts of a Date object) to a local date.
     */
    convertDate(date) {
        return ZonedDate.fromUTCDate(date, this.timezone).toLocalDate();
    }
    onClick(e, eventType = e.type) {
        this.emitSlotEvent(e, eventType);
        this.emitTaskEvent(e, eventType);
    }
    emitSlotEvent(e, eventType) {
        const targetSlot = closestInScope(e.target, node => node.hasAttribute('data-slot-index'), this.element.nativeElement);
        if (targetSlot) {
            const slotIndex = targetSlot.getAttribute('data-slot-index');
            const name = eventType === 'dblclick' ? 'slotDblClick' : 'slotClick';
            const slot = this.slotByIndex(slotIndex, e);
            this.viewState.emitEvent(name, {
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
    }
    emitTaskEvent(e, eventType) {
        const targetTask = this.targetTask(e.target);
        if (targetTask) {
            const task = targetTask.task;
            const isSingle = eventType === 'click';
            const isDouble = eventType === 'dblclick';
            if (isSingle && closestInScope(e.target, node => hasClasses(node, 'k-event-delete'), targetTask.target)) {
                e.preventDefault();
                this.viewState.emitEvent('remove', { event: task.event, dataItem: task.event.dataItem });
            }
            else {
                const name = isDouble ? 'eventDblClick' : 'eventClick';
                this.viewState.emitEvent(name, { type: eventType, event: task.event, originalEvent: e });
                targetTask.target.focus();
            }
        }
    }
    onKeydown(e) {
        const targetTask = this.targetTask(e.target);
        if (targetTask) {
            const task = targetTask.task;
            this.viewState.emitEvent('eventKeydown', { event: task.event, dataItem: task.event.dataItem, originalEvent: e });
        }
    }
    syncTables() {
        if (this.timesTable) {
            this.renderer.setStyle(this.timesTable.nativeElement, 'height', `${this.contentTable.nativeElement.offsetHeight}px`);
        }
        if (this.header) {
            this.renderer.setStyle(this.header.nativeElement, !this.localization.rtl ? 'padding-right' : 'padding-left', `${hasScrollbar(this.content.nativeElement, 'vertical') ? scrollbarWidth() - BORDER_WIDTH : 0}px`);
            this.renderer.setStyle(this.header.nativeElement, this.localization.rtl ? 'padding-right' : 'padding-left', '0px');
        }
        if (this.times) {
            const times = this.times.nativeElement;
            this.timesHeader.nativeElement.style.width = `${times.offsetWidth}px`;
            const contentHeight = this.contentHeight === 'auto' ? this.content.nativeElement.offsetHeight : this.contentHeight;
            this.renderer.setStyle(times, 'height', `${contentHeight - (hasScrollbar(this.content.nativeElement, 'horizontal') ? scrollbarWidth() : 0)}px`);
        }
    }
    updateContentHeight() {
        const element = this.element.nativeElement;
        const parent = element.parentNode;
        const content = this.content.nativeElement;
        const autoHeight = this.autoHeight || !parent.style.height;
        const scrollLeft = content.scrollLeft;
        const scrollTop = content.scrollTop;
        this.renderer.setStyle(content, 'height', '');
        if (this.times) {
            this.renderer.setStyle(this.times.nativeElement, 'height', '');
        }
        if (autoHeight) {
            this.contentHeight = 'auto';
            return;
        }
        let height = parent.clientHeight;
        for (let idx = 0; idx < parent.children.length; idx++) {
            const child = parent.children[idx];
            if (child !== element && !ignoreContentChild(child)) {
                height -= child.offsetHeight;
            }
        }
        height -= this.headerWrap ? this.headerWrap.nativeElement.offsetHeight : 0;
        this.renderer.setStyle(content, 'height', `${height}px`);
        this.contentHeight = height;
        content.scrollLeft = scrollLeft;
        content.scrollTop = scrollTop;
    }
    groupResources() {
        const resources = this.resources || [];
        const group = this.group || {};
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
    }
    get taskResources() {
        if (this.groupedResources.length) {
            return this.groupedResources;
        }
        else if (this.resources && this.resources.length) {
            return [this.resources[0]];
        }
        else {
            return [{}];
        }
    }
    resourceSpans() {
        const spans = [1];
        const resources = this.groupedResources;
        let span = 1;
        for (let idx = resources.length - 1; idx > 0; idx--) {
            span *= ((resources[idx].data || []).length || 1);
            spans.unshift(span);
        }
        return spans;
    }
    isInRange(date) {
        const dateRange = this.dateRange(date);
        return (!this.min || this.min < dateRange.end) && (!this.max || dateRange.start <= this.max);
    }
    createPDFElement() {
        const contentHeight = this.contentHeight;
        if (contentHeight !== 'auto') {
            this.autoHeight = true;
            this.updateView();
        }
        const element = this.element.nativeElement.cloneNode(true);
        element.style.width = `${this.pdfWidth()}px`;
        if (contentHeight !== 'auto') {
            this.autoHeight = false;
            this.updateView();
        }
        this.pdfService.elementReady.emit({
            element: element
        });
    }
    pdfWidth() {
        return this.element.nativeElement.offsetWidth;
    }
    containerByPosition({ x, y }) {
        const content = this.content.nativeElement;
        const offset = elementOffset(content);
        if (offset.top <= y && y <= offset.top + offset.height && offset.left <= x && x <= offset.left + offset.width) {
            return {
                element: content,
                offset: offset
            };
        }
    }
    execute(e) {
        if (e.name === 'slotByPosition') {
            const container = this.containerByPosition(e.args);
            if (container) {
                const offset = this.coordinatesOffset(e.args.x, e.args.y, container.element, container.offset);
                const slot = this.slotByPosition(offset.x, offset.y, container.element);
                e.result(this.slotFields(slot));
            }
        }
        else if (e.name === 'eventFromElement') {
            const target = this.targetTask(e.args.element);
            if (target) {
                e.result(target.task.event);
            }
        }
    }
    slotFields(slot) {
        return {
            element: slot.element,
            resources: this.groupedResources.length ? this.resourcesByIndex(slot.id.resourceIndex) : [],
            start: this.convertDate(slot.start),
            end: this.convertDate(slot.end)
        };
    }
}
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

const DAYS_IN_WEEK_COUNT = 7;
const WEEKS_COUNT = 6;
/**
 * @hidden
 */
class MonthViewRendererComponent extends BaseView {
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

/**
 * @hidden
 */
class BaseSlotDirective {
    constructor(element, slotService, localization) {
        this.element = element;
        this.slotService = slotService;
        this.localization = localization;
        this._rect = null;
    }
    get slotIndex() {
        return this.key;
    }
    get rect() {
        if (this._rect) {
            return this._rect;
        }
        const el = this.nativeElement;
        this._rect = {
            left: !this.localization.rtl ? el.offsetLeft : this.slotService.containerSize - (el.offsetLeft + el.clientWidth),
            top: el.offsetTop,
            width: el.clientWidth,
            height: el.clientHeight
        };
        return this._rect;
    }
    get top() {
        return this.element ? this.nativeElement.offsetTop : 0;
    }
    get padding() {
        if (!this.element || !isDocumentAvailable()) {
            return 0;
        }
        return parseInt(window.getComputedStyle(this.nativeElement).paddingTop, 10) * 2;
    }
    get height() {
        return this.element ? this.nativeElement.offsetHeight : 0;
    }
    set height(value) {
        if (this.element) {
            this.nativeElement.style.height = `${value}px`;
        }
        if (this._rect) {
            this._rect.height = value;
        }
    }
    get width() {
        return this.element ? this.nativeElement.offsetWidth : 0;
    }
    get key() {
        return `${this.id.resourceIndex}:${this.id.rangeIndex}:${this.id.index}`;
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
    ngOnInit() {
        this.slotService.registerSlot(this);
    }
    ngOnDestroy() {
        this.slotService.unregisterSlot(this);
    }
    invalidate() {
        this._rect = null;
    }
}
BaseSlotDirective.propDecorators = {
    id: [{ type: Input }],
    slotIndex: [{ type: HostBinding, args: ['attr.data-slot-index',] }]
};

/**
 * @hidden
 */
class MonthSlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = true;
        this._linkHeight = null;
    }
    set start(value) {
        this.startDate = toUTCDate(value);
    }
    get start() {
        return this.startDate;
    }
    get end() {
        return addUTCDays(this.start, 1);
    }
    get linkHeight() {
        if (this._linkHeight === null) {
            const element = firstElementChild(this.nativeElement);
            this._linkHeight = element ? element.offsetHeight + element.offsetTop : 0;
        }
        return this._linkHeight;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.removeShowMore();
    }
    showMore(rect) {
        if (!this.showMoreElement) {
            const element = this.showMoreElement = document.createElement('div');
            element.innerHTML = '<span>...</span>';
            element.className = 'k-more-events k-button';
            element.style.width = `${rect.width}px`;
            element.style.left = `${rect.left}px`;
            element.style.top = `${rect.top}px`;
            this.nativeElement.appendChild(element);
        }
    }
    hideMore() {
        this.removeShowMore();
    }
    invalidate() {
        super.invalidate();
        this._linkHeight = null;
        this.removeShowMore();
    }
    removeShowMore() {
        if (this.showMoreElement) {
            this.showMoreElement.parentNode.removeChild(this.showMoreElement);
            this.showMoreElement = null;
        }
    }
}
MonthSlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[monthSlot]'
            },] },
];
/** @nocollapse */
MonthSlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: MonthSlotService },
    { type: LocalizationService }
];
MonthSlotDirective.propDecorators = {
    start: [{ type: Input }]
};

/**
 * @hidden
 */
class ViewFooterComponent {
    constructor() {
        this.hostClasses = true;
        this.itemClick = new EventEmitter();
    }
    onItemClick(e, item) {
        e.preventDefault();
        this.itemClick.emit(item);
    }
}
ViewFooterComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[viewFooter]',
                template: `
        <ul class="k-reset k-header">
            <li class="k-state-default" *ngFor="let item of items" [ngClass]="item.cssClass" (click)="onItemClick($event, item)">
                <a href="#" class="k-link" tabindex="-1">
                    <span class="k-icon" [ngClass]="item.iconClass"></span>
                    {{ item.text }}
                </a>
            </li>
        </ul>
    `
            },] },
];
ViewFooterComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-scheduler-footer',] }],
    itemClick: [{ type: Output }],
    items: [{ type: Input }]
};

/**
 * @hidden
 */
class WorkHoursFooterDirective {
    constructor(footer, localization) {
        this.footer = footer;
        this.localization = localization;
        this.showWorkHours = false;
        this.footerItems = [{ cssClass: 'k-scheduler-fullday', iconClass: 'k-i-clock', text: '' }];
    }
    ngOnInit() {
        this.toggleWorkHours();
        this.footer.items = this.footerItems;
    }
    ngOnChanges() {
        this.toggleWorkHours();
    }
    toggleWorkHours() {
        this.footerItems[0].text = this.showWorkHours ? this.localization.get('showFullDay') : this.localization.get('showWorkDay');
    }
}
WorkHoursFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoWorkHoursFooter]'
            },] },
];
/** @nocollapse */
WorkHoursFooterDirective.ctorParameters = () => [
    { type: ViewFooterComponent },
    { type: LocalizationService }
];
WorkHoursFooterDirective.propDecorators = {
    showWorkHours: [{ type: Input }]
};

class NumberIterator {
    constructor(count) {
        this.count = count;
    }
    *[iterator]() {
        for (let i = 0; i < this.count; i++) {
            yield i;
        }
    }
}
/**
 * @hidden
 */
class RepeatPipe {
    transform(value) {
        return new NumberIterator(value);
    }
}
RepeatPipe.decorators = [
    { type: Pipe, args: [{
                // tslint:disable-next-line:pipe-naming
                name: 'repeat'
            },] },
];

class ResourceIterator {
    constructor(resources, lastIndex = resources.length - 1) {
        this.resources = resources;
        this.lastIndex = lastIndex;
    }
    *[iterator]() {
        let resources = this.resources;
        const lastIndex = Math.max(0, this.lastIndex);
        if (!(resources && resources.length)) {
            resources = [{}];
        }
        const lastData = resources[lastIndex].data || [];
        const length = lastData.length;
        let count = 1;
        for (let idx = 0; idx <= lastIndex; idx++) {
            count *= (resources[idx].data || []).length || 1;
        }
        for (let idx = 0; idx < count; idx++) {
            yield lastData[idx % length];
        }
    }
}
/**
 * @hidden
 */
class ResourceIteratorPipe {
    transform(resources = [], lastIndex) {
        return new ResourceIterator(resources, lastIndex);
    }
}
ResourceIteratorPipe.decorators = [
    { type: Pipe, args: [{
                // tslint:disable-next-line:pipe-naming
                name: 'resourceIterator'
            },] },
];

/**
 * @hidden
 */
class ResizeHintComponent {
    constructor() {
        this.marqueeClasses = true;
    }
    get left() {
        return this.hint.rect.left;
    }
    get top() {
        return this.hint.rect.top;
    }
    get width() {
        return this.hint.rect.width;
    }
    get height() {
        return this.hint.rect.height;
    }
    get start() {
        return toLocalDate(this.hint.start);
    }
    get end() {
        return toLocalDate(this.hint.end);
    }
}
ResizeHintComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoResizeHint]',
                template: `
        <div class="k-marquee-color"></div>
        <div class="k-marquee-text">
            <div class="k-label-top" *ngIf="hint.first">{{ start | kendoDate : format }}</div>
            <div class="k-label-bottom" *ngIf="hint.last">{{ end | kendoDate : format }}</div>
        </div>
    `
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

const DECLARATIONS = [
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
class ViewsSharedModule {
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

/**
 * @hidden
 */
class MonthViewModule {
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

const EVENT_HEIGHT = 'eventHeight';
const SHOW_WORK_HOURS = 'showWorkHours';
const START_TIME = 'startTime';
const END_TIME = 'endTime';
const WORK_DAY_START = 'workDayStart';
const WORK_DAY_END = 'workDayEnd';
const WORK_WEEK_START = 'workWeekStart';
const WORK_WEEK_END = 'workWeekEnd';
const SLOT_DURATION = 'slotDuration';
const SLOT_DIVISIONS = 'slotDivisions';
const CURRENT_TIME_MARKER = 'currentTimeMarker';
/**
 * @hidden
 */
class DayTimeViewBase extends ConfigurationViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewEventHeight() {
        return this.optionValue(EVENT_HEIGHT) || DEFAULT_EVENT_HEIGHT;
    }
    /**
     * @hidden
     */
    get shouldShowWorkHours() {
        return this.optionValue(SHOW_WORK_HOURS);
    }
    /**
     * @hidden
     */
    get viewStartTime() {
        return this.optionValue(START_TIME);
    }
    /**
     * @hidden
     */
    get viewEndTime() {
        return this.optionValue(END_TIME);
    }
    /**
     * @hidden
     */
    get viewWorkDayStart() {
        return this.optionValue(WORK_DAY_START);
    }
    /**
     * @hidden
     */
    get viewWorkDayEnd() {
        return this.optionValue(WORK_DAY_END);
    }
    /**
     * @hidden
     */
    get viewWorkWeekStart() {
        return this.optionValue(WORK_WEEK_START);
    }
    /**
     * @hidden
     */
    get viewWorkWeekEnd() {
        return this.optionValue(WORK_WEEK_END);
    }
    /**
     * @hidden
     */
    get viewSlotDuration() {
        return this.optionValue(SLOT_DURATION);
    }
    /**
     * @hidden
     */
    get viewSlotDivisions() {
        return this.optionValue(SLOT_DIVISIONS);
    }
    /**
     * @hidden
     */
    get viewCurrentTimeMarker() {
        return this.optionValue(CURRENT_TIME_MARKER);
    }
    /**
     * @hidden
     */
    get viewScrollTime() {
        return this.optionValue('scrollTime');
    }
    optionValue(name) {
        return isPresent(this[name]) ? this[name] : this.schedulerOptions[name];
    }
}
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

const SLOT_FILL = 'slotFill';
/**
 * @hidden
 */
class MultiDayViewBase extends DayTimeViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewSlotFill() {
        return this.optionValue(SLOT_FILL);
    }
}
MultiDayViewBase.propDecorators = {
    slotFill: [{ type: Input }]
};

/**
 * The component for rendering the **Day** view.
 */
class DayViewComponent extends MultiDayViewBase {
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

/**
 * The component for rendering the **Multi-Day** view.
 */
class MultiDayViewComponent extends DayViewComponent {
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

/**
 * The component for rendering the **Week** view.
 */
class WeekViewComponent extends MultiDayViewBase {
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

const DAYS_IN_WEEK$1 = 7;
/**
 * The component for rendering the **Work Week** view.
 */
class WorkWeekViewComponent extends WeekViewComponent {
    constructor(intl, localization, changeDetector, viewContext, viewState) {
        super(intl, localization, changeDetector, viewContext, viewState);
        /**
         * The invariant name for this view (`week`).
         */
        this.name = 'workWeek';
        this.getNextDate = this.getNextDate.bind(this);
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('workWeekViewTitle');
    }
    /**
     * @hidden
     */
    get numberOfDays() {
        if (this.viewWorkWeekStart > this.viewWorkWeekEnd) {
            return (DAYS_IN_WEEK$1 - this.viewWorkWeekStart + this.viewWorkWeekEnd) + 1;
        }
        return (this.viewWorkWeekEnd - this.viewWorkWeekStart) + 1;
    }
    /**
     * @hidden
     */
    getStartDate(selectedDate) {
        return firstDayInWeek(getDate(selectedDate), this.viewWorkWeekStart);
    }
    /**
     * @hidden
     */
    getNextDate(date, count, _numberOfDays) {
        return getDate(addDays(date, DAYS_IN_WEEK$1 * count));
    }
}
WorkWeekViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-work-week-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => WorkWeekViewComponent)
                    }],
                template: `
        <ng-template #content>
            <multi-day-view
                viewName="workWeekview"
                [name]="name"
                [numberOfDays]="numberOfDays"
                [getStartDate]="getStartDate"
                [getNextDate]="getNextDate"
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
WorkWeekViewComponent.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];

const EVENTS_OFFSET = 10;
const MIN_EVENT_HEIGHT = 25;
const minHeightOverlaps = (top1, top2) => top1 <= top2 && top2 <= top1 + MIN_EVENT_HEIGHT;
const timeOffset = (slot, date, vertical = true) => {
    if (slot.start.getTime() <= date.getTime()) {
        return (vertical ? slot.height : slot.width) * ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
    }
    return 0;
};
const columnIndexComparer = (a, b) => {
    const indexA = isNumber(a.columnIndex) ? a.columnIndex : Number.MAX_VALUE;
    const indexB = isNumber(b.columnIndex) ? b.columnIndex : Number.MAX_VALUE;
    // a un b def = 0
    // b un a def = 0
    if (indexA === indexB) {
        return a.item.startTime.getTime() - b.item.startTime.getTime();
    }
    return indexA - indexB;
};
function initTimeColumns(slotKeys, slotItems) {
    // Break slots into groups with overlapping events.
    let columns = 0;
    let groupSlots = [];
    slotKeys.forEach(key => {
        const { slot, events } = slotItems[key];
        const count = events.length;
        let groupEnd = true;
        events.sort(columnIndexComparer);
        columns = Math.max(count, columns);
        groupSlots.push(slot);
        for (let eventIdx = 0; eventIdx < count; eventIdx++) {
            const event = events[eventIdx];
            groupEnd = groupEnd && event.item.endTime.getTime() <= slot.end.getTime();
            if (isNumber(event.columnIndex)) {
                continue;
            }
            event.rect = {
                top: slot.rect.top + timeOffset(slot, event.item.startTime)
            };
            event.columnIndex = eventIdx;
            event.lastColumn = true;
            for (let idx = 0, previousIdx = -1; idx < eventIdx; idx++) {
                const current = events[idx];
                if (current.columnIndex > previousIdx + 1) {
                    event.columnIndex = previousIdx + 1;
                    event.lastColumn = false;
                    events.splice(eventIdx, 1);
                    events.splice(event.columnIndex, 0, event);
                    break;
                }
                if (!intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime) &&
                    !minHeightOverlaps(current.rect.top, event.rect.top)) {
                    event.columnIndex = idx;
                    event.lastColumn = !events.some(e => e.columnIndex && idx < e.columnIndex &&
                        intersects(event.item.startTime, event.item.endTime, e.item.startTime, e.item.endTime));
                    events.splice(eventIdx, 1);
                    events.splice(idx, 0, event);
                    break;
                }
                previousIdx = current.columnIndex;
                current.lastColumn = false;
            }
        }
        if (groupEnd) {
            groupSlots.forEach(item => item.columns = columns);
            groupSlots = [];
            columns = 0;
        }
    });
    // The maximum number of overlapping events in the group is used to create the same number of columns.
    groupSlots.forEach(slot => slot.columns = columns);
}
function findTimeRowIndex(events, event) {
    if (event.rowIndex !== undefined) {
        return event.rowIndex;
    }
    for (let idx = 0; idx < events.length; idx++) {
        const current = events[idx];
        if (!current || !intersects(event.item.startTime, event.item.endTime, current.item.startTime, current.item.endTime)) {
            return idx;
        }
    }
    return events.length;
}
function initHorizontalSlots(slots, items, rowHeight, eventHeight, getRowIndex) {
    const padding = slots[0].padding;
    if (!items.length) {
        return {
            height: rowHeight - padding
        };
    }
    items.forEach(item => {
        item.rowIndex = undefined;
        item.rect = {
            height: eventHeight,
            width: 0
        };
    });
    const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
    const slotItems = {};
    sorted.forEach(event => slots
        .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
        .forEach(slot => {
        const value = slotItems[slot.key] = slotItems[slot.key] || { rows: [], slot: slot, events: [] };
        event.rowIndex = getRowIndex(value.rows, event);
        value.rows[event.rowIndex] = event;
        value.events.push(event);
    }));
    const top = slots[0].top;
    let maxOffset = 0;
    Object.keys(slotItems).forEach((key) => {
        const events = slotItems[key].events;
        let slotOffset = 0;
        for (let idx = 0; idx < events.length; idx++) {
            const event = events[idx];
            if (event) {
                event.rect.top = top + event.rowIndex * (EVENTS_OFFSET + event.rect.height);
                slotOffset = Math.max(slotOffset, (event.rect.top - top) + event.rect.height);
            }
        }
        maxOffset = Math.max(slotOffset, maxOffset);
    });
    maxOffset += rowHeight - padding;
    return {
        height: maxOffset,
        slotItems
    };
}
function setHorizontalOffsets(slotItems, items, measureTime) {
    Object.keys(slotItems).forEach((key) => {
        const { slot, events } = slotItems[key];
        const rect = slot.rect;
        for (let idx = 0; idx < events.length; idx++) {
            const event = events[idx];
            if (event) {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = slot.rect.left +
                        (measureTime ? timeOffset(slot, event.item.startTime, false) : 0);
                }
                const slotOffset = measureTime && event.item.endTime.getTime() < slot.end.getTime() ?
                    timeOffset(slot, event.item.endTime, false) : rect.width;
                event.rect.width = slot.rect.left + slotOffset - event.rect.left;
            }
        }
    });
    items.forEach(item => {
        item.reflow();
    });
}
/** @hidden */
class SlotRange$1 {
    constructor(index) {
        this.index = index;
        this.slotMap = new ItemMap();
        this.itemMap = new ItemMap();
    }
    get slots() {
        return this.slotMap.toArray();
    }
    get firstSlot() {
        return this.slotMap.first;
    }
    get lastSlot() {
        return this.slotMap.last;
    }
    get items() {
        return this.itemMap.toArray();
    }
    get rect() {
        const first = this.firstSlot.rect;
        const last = this.lastSlot.rect;
        return {
            left: first.left,
            top: first.top,
            width: last.left - first.left + last.width,
            height: last.top - first.top + last.height
        };
    }
    get start() {
        const first = this.slotMap.first;
        if (!first) {
            return null;
        }
        return first.start;
    }
    get end() {
        const last = this.slotMap.last;
        if (!last) {
            return null;
        }
        return last.end;
    }
    get hasSlots() {
        return this.slotMap.count > 0;
    }
    get hasItems() {
        return this.itemMap.count > 0;
    }
    registerItem(component) {
        this.itemMap.addItem(component.item.index, component);
    }
    unregisterItem(component, index) {
        this.itemMap.removeItem(index, component);
    }
    registerSlot(slot) {
        this.slotMap.addItem(slot.id.index, slot);
    }
    unregisterSlot(slot) {
        this.slotMap.removeItem(slot.id.index, slot);
    }
    layout(options) {
        const items = this.items;
        if (!items.length) {
            return;
        }
        const fill = Math.max(Math.min(options.fill || 0.9, 1), 0.1);
        const sorted = orderBy(items, [{ field: "item.startTime", dir: "asc" }, { field: "item.endTime", dir: "desc" }]);
        items.forEach((item, index) => {
            item.rect = null;
            item.columnIndex = undefined;
        });
        const slotItems = {};
        const slots = this.slots;
        // Map each populated slot to the events in it
        sorted.forEach(event => slots
            .filter(slot => intersects(event.item.startTime, event.item.endTime, slot.start, slot.end))
            .forEach(slot => {
            const value = slotItems[slot.key] = slotItems[slot.key] || { events: [] };
            value.slot = slot;
            value.events.push(event);
        }));
        const slotKeys = Object.keys(slotItems);
        initTimeColumns(slotKeys, slotItems);
        slotKeys.forEach((key) => {
            const { slot, events } = slotItems[key];
            const count = events.length;
            const spacing = 2;
            const startOffset = 2;
            const slotRect = slot.rect;
            const slotLeft = slotRect.left;
            const columns = slot.columns;
            const slotWidth = slotRect.width * fill - (columns - 1) * spacing - startOffset;
            const origin = slotLeft + startOffset;
            const eventWidth = slotWidth / columns;
            const slotEnd = origin + slotWidth + (columns - 1) * spacing;
            events.forEach(event => {
                if (!isNumber(event.rect.left)) {
                    event.rect.left = origin + event.columnIndex * (eventWidth + spacing);
                    event.rect.width = event.lastColumn ? slotEnd - event.rect.left : eventWidth;
                    event.origin = {
                        left: slotLeft,
                        right: slotLeft + slotRect.width
                    };
                }
                // Expand the event to the last group slot
                const slotOffset = slot.end.getTime() <= event.item.endTime.getTime() ? slotRect.height : timeOffset(slot, event.item.endTime);
                event.rect.height = slotRect.top + slotOffset - event.rect.top;
            });
        });
        sorted.forEach(event => event.reflow());
    }
    initDaySlots(rowHeight, eventHeight) {
        const slots = this.slots;
        if (!slots.length) {
            return;
        }
        const { height, slotItems } = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findRowIndex);
        this.setSlotsHeight(height);
        this.slotItems = slotItems;
    }
    setDayOffsets() {
        if (!this.itemMap.count || !this.slotItems) {
            return;
        }
        setHorizontalOffsets(this.slotItems, this.items);
        this.slotItems = null;
    }
    setSlotsHeight(height) {
        this.firstSlot.height = height;
    }
}
/**
 * @hidden
 */
class DayTimeResourceGroup {
    constructor(index) {
        this.index = index;
        this.dayRanges = [];
        this.timeRanges = [];
    }
    registerSlot(slot) {
        const range = this.slotRange(slot);
        range.registerSlot(slot);
    }
    unregisterSlot(slot) {
        const range = this.slotRange(slot);
        range.unregisterSlot(slot);
        if (!range.hasSlots) {
            const ranges = this.slotRanges(slot);
            delete ranges[slot.id.rangeIndex];
        }
    }
    registerItem(component) {
        const range = this.itemRange(component);
        if (range) {
            range.registerItem(component);
            component.rangeIndex = range.index;
        }
        else {
            component.rangeIndex = undefined;
            component.toggle(false);
        }
    }
    unregisterItem(component, index) {
        if (component.rangeIndex !== undefined) {
            const ranges = component.item.isAllDay ? this.dayRanges : this.timeRanges;
            if (ranges[component.rangeIndex]) {
                ranges[component.rangeIndex].unregisterItem(component, index);
            }
            component.rangeIndex = undefined;
        }
    }
    forEachDateRange(callback) {
        for (let i = 0; i < this.dayRanges.length; i++) {
            callback(this.dayRanges[i]);
        }
    }
    forEachTimeRange(callback) {
        for (let i = 0; i < this.timeRanges.length; i++) {
            callback(this.timeRanges[i]);
        }
    }
    slotRange(slot) {
        const ranges = this.slotRanges(slot);
        const rangeIndex = slot.id.rangeIndex;
        if (!ranges[rangeIndex]) {
            ranges[rangeIndex] = new SlotRange$1(rangeIndex);
        }
        return ranges[rangeIndex];
    }
    slotRanges(slot) {
        return slot.isDaySlot ? this.dayRanges : this.timeRanges;
    }
    initTimeSlots(rowHeight, eventHeight, resourceRowHeight) {
        const slots = this.slots;
        if (!slots.length) {
            return;
        }
        const { height, slotItems } = initHorizontalSlots(slots, this.items, rowHeight, eventHeight, findTimeRowIndex);
        this.setSlotsHeight(Math.max(height, resourceRowHeight));
        this.slotItems = slotItems;
    }
    setTimelineOffsets() {
        const items = this.items;
        if (!this.slotItems || !items.length) {
            return;
        }
        setHorizontalOffsets(this.slotItems, items, true);
        this.slotItems = null;
    }
    setSlotsHeight(height) {
        //setting the first slot height should be sufficient
        this.timeRanges[0].setSlotsHeight(height);
    }
    get items() {
        return this.timeRanges.reduce((acc, range) => acc.concat(range.items), []);
    }
    get slots() {
        return this.timeRanges.reduce((acc, range) => acc.concat(range.slots), []);
    }
    get hasSlots() {
        return Boolean(this.dayRanges.find(range => range && range.hasSlots) || this.timeRanges.find(range => range && range.hasSlots));
    }
    cleanRanges() {
        this.dayRanges = this.dayRanges.filter(r => Boolean(r));
        this.timeRanges = this.timeRanges.filter(r => Boolean(r));
    }
    itemRange(component) {
        const task = component.item;
        const ranges = task.isAllDay ? this.dayRanges : this.timeRanges;
        if (isNumber(task.rangeIndex)) {
            return ranges[task.rangeIndex];
        }
        return ranges.find(r => intersects(task.startTime, task.endTime, r.start, r.end));
    }
}
/**
 * @hidden
 */
class DayTimeSlotService extends BaseSlotService {
    layoutDays(eventHeight = 25) {
        this.groups.forEach((group) => group.forEachDateRange(range => range.slots.forEach(slot => {
            slot.element.nativeElement.style.height = '';
        })));
        const rowHeight = this.groups[0].dayRanges[0].slots[0].height;
        this.groups.forEach((group) => {
            group.forEachDateRange(range => range.initDaySlots(rowHeight, eventHeight));
        });
        this.groups.forEach((group) => {
            group.forEachDateRange(range => range.setDayOffsets());
        });
    }
    layoutTimeline(eventHeight, resourceRows) {
        this.groups.forEach((group) => group.forEachTimeRange(range => range.slots.forEach(slot => {
            slot.element.nativeElement.style.height = '';
        })));
        const rowHeight = this.groups[0].timeRanges[0].slots[0].height;
        this.groups.forEach((group, index) => {
            group.initTimeSlots(rowHeight, eventHeight, resourceRows && resourceRows[index] ? resourceRows[index].nativeElement.children[0].children[0].offsetHeight : 0);
        });
        this.groups.forEach((group) => group.setTimelineOffsets());
    }
    layoutTimes(options) {
        this.groups.forEach((group) => group.forEachTimeRange(range => range.layout(options)));
    }
    forEachDateRange(callback) {
        this.groups.forEach((group, index) => {
            callback(group.dayRanges[0], index);
        });
    }
    syncDateRanges() {
        let maxHeight = 0;
        this.groups.forEach((group) => {
            const slot = group.dayRanges[0].firstSlot;
            if (slot) {
                maxHeight = Math.max(slot.rect.height - slot.padding, maxHeight);
            }
        });
        this.groups.forEach((group) => {
            group.dayRanges[0].setSlotsHeight(maxHeight);
        });
        return maxHeight;
    }
    forEachGroup(callback) {
        this.groups.forEach(callback);
    }
    forEachSlot(callback) {
        this.groups.forEach((group) => {
            group.dayRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
            group.timeRanges.forEach(range => {
                range.slots.forEach(slot => callback(slot));
            });
        });
    }
    createGroup(index) {
        return new DayTimeResourceGroup(index);
    }
    slotByIndex(slotIndex, allDay = false) {
        const [resourceIndex, rangeIndex, index] = slotIndex.split(':').map(part => parseInt(part, 10));
        return this.groups[resourceIndex][allDay ? 'dayRanges' : 'timeRanges'][rangeIndex].slots[index];
    }
    slotByPosition(x, y, isDaySlot, includeDayRanges) {
        let range;
        if (isDaySlot) {
            this.groups.find((group) => {
                range = group.dayRanges.find(r => rectContainsX(r.rect, x));
                return range;
            });
            if (range) {
                return range.slots.find(slot => rectContainsX(slot.rect, x));
            }
        }
        else {
            this.groups.find((group) => {
                if (includeDayRanges) {
                    range = group.dayRanges.find(r => rectContains(r.rect, x, y));
                }
                if (!range) {
                    range = group.timeRanges.find(r => rectContains(r.rect, x, y));
                }
                return range;
            });
            if (range) {
                return range.slots.find(slot => rectContains(slot.rect, x, y));
            }
        }
    }
    groupSlotByPosition(currentSlot, x, y) {
        const group = this.groups[currentSlot.id.resourceIndex];
        let range;
        if (currentSlot.isDaySlot) {
            range = group.dayRanges.find(r => rectContains(r.rect, x, y));
        }
        else {
            range = group.timeRanges.find(r => rectContains(r.rect, x, y));
        }
        if (range) {
            return range.slots.find(slot => rectContains(slot.rect, x, y));
        }
    }
    dragRanges(currentSlot, offset, timeRanges) {
        const start = new Date(currentSlot.start.getTime() - offset.start);
        const end = new Date(currentSlot.start.getTime() + offset.end);
        const group = this.groups[currentSlot.id.resourceIndex];
        let result;
        if (timeRanges) {
            const slotRanges = [];
            group.timeRanges.forEach(range => {
                const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
                if (slots.length) {
                    slotRanges.push(slots);
                }
            });
            const lastRange = slotRanges[slotRanges.length - 1];
            result = [slotRanges[0][0], lastRange[lastRange.length - 1]];
        }
        else {
            result = group.slotRange(currentSlot).slots.filter(s => intersects(start, end, s.start, s.end));
        }
        return {
            start,
            end,
            ranges: [result]
        };
    }
    resizeRanges(currentSlot, task, resizeStart, offset) {
        const group = this.groups[currentSlot.id.resourceIndex];
        const ranges = task.isAllDay ? group.dayRanges : group.timeRanges;
        const result = [];
        const startDate = task.start.toUTCDate();
        const endDate = task.end.toUTCDate();
        let start, end;
        if (resizeStart) {
            const startTime = currentSlot.start.getTime() + offset.start;
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
        ranges.forEach(range => {
            const slots = range.slots.filter(s => intersects(start, end, s.start, s.end));
            if (slots.length) {
                result.push(slots);
            }
        });
        return {
            start,
            end,
            ranges: result
        };
    }
    timePosition(date, resourceIndex, vertical) {
        const group = this.groups[resourceIndex];
        const range = group.timeRanges.find(r => dateInRange(date, r.start, r.end));
        if (!range) {
            return;
        }
        const slot = range.slots.find(s => dateInRange(date, s.start, s.end));
        if (slot) {
            const position = (vertical ? slot.height : slot.width) *
                ((date.getTime() - slot.start.getTime()) / (slot.end.getTime() - slot.start.getTime()));
            return vertical ? slot.rect.top + position : slot.rect.left + position;
        }
    }
    findDateSlot(date, ranges, excludeEnd) {
        let result;
        ranges.forEach(range => {
            const slots = excludeEnd ? range.slots.filter(s => intersects(date, date, s.start, s.end)) :
                range.slots.filter(s => dateInRange(date, s.start, s.end));
            if (slots.length) {
                result = slots[0];
            }
        });
        return result;
    }
}

/** @hidden */
const isMultiDay = ({ start, end }) => {
    const startDate = start.stripTime();
    const endDate = end.stripTime();
    return startDate.getTime() !== endDate.getTime() &&
        (endDate.getTime() !== end.getTime() || startDate.addDays(1).getTime() !== endDate.getTime());
};
//check start and times or update day ranges to have them
/** @hidden */
const createTasks$1 = (periodStart, periodEnd, items, ranges) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const multiDay = isMultiDay(item);
        const multipleRanges = multiDay && !item.event.isAllDay && (item.end.getTime() - item.start.getTime()) < MS_PER_DAY;
        const isAllDay = item.event.isAllDay || (multiDay && !multipleRanges);
        const endTime = (isAllDay ? roundAllDayEnd(item) : item.end).toUTCDate();
        const startTime = (isAllDay ? item.start.stripTime() : item.start).toUTCDate();
        for (let rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
            const rangeStart = ranges[rangeIndex].start;
            const rangeEnd = ranges[rangeIndex].end;
            if (intersects(startTime, endTime, rangeStart, rangeEnd)) {
                const task = {
                    index,
                    isAllDay,
                    startTime,
                    endTime,
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
                    const nextRange = ranges[rangeIndex + 1];
                    const previousRange = ranges[rangeIndex - 1];
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
function createTimeSlots(intlService, { showWorkHours, startTime, endTime, workDayStart, workDayEnd, slotDivisions, slotDuration }) {
    const startDate = intlService.parseDate(showWorkHours ? workDayStart : startTime);
    const start = toInvariantTime(startDate).getTime();
    const endDate = intlService.parseDate(showWorkHours ? workDayEnd : endTime);
    let end = toInvariantTime(endDate).getTime();
    if (end <= start) {
        end = toInvariantTime(MIDNIGHT_INVARIANT).getTime() + MS_PER_DAY;
    }
    const slots = [];
    const duration = Math.round((slotDuration / slotDivisions) * MS_PER_MINUTE);
    let slotTime = start;
    let index = 0;
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

const getStartDate = date => getDate(date);
const getEndDate = (start, numberOfDays) => getDate(addDays(start, numberOfDays || 1));
const getNextDate = (date, count, numberOfDays) => getDate(addDays(date, numberOfDays * count));
/**
 * @hidden
 */
class DayTimeViewComponent extends BaseView {
    constructor(changeDetector, viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization) {
        super(viewContext, viewState, intl, slotService, zone, renderer, element, pdfService, localization);
        this.changeDetector = changeDetector;
        this.numberOfDays = 1;
        this.startTime = '00:00';
        this.endTime = '00:00';
        this.workDayStart = '08:00';
        this.workDayEnd = '17:00';
        this.workWeekStart = 1;
        this.workWeekEnd = 5;
        this.slotDuration = 60;
        this.slotDivisions = 2;
        this.showWorkHours = false;
        this.getStartDate = getStartDate;
        this.getEndDate = getEndDate;
        this.getNextDate = getNextDate;
        this.daySlots = [];
        this.timeSlots = [];
        this.resizeHintFormat = 't';
        this.showCurrentTime = false;
        this.verticalTime = true;
        this.initialUpdate = true;
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
    }
    get classNames() {
        return `k-scheduler-${this.name}view`;
    }
    get timeSlotTemplateRef() {
        return this.timeSlotTemplate || (this.schedulerTimeSlotTemplate || {}).templateRef;
    }
    get dateHeaderTemplateRef() {
        return this.dateHeaderTemplate || (this.schedulerDateHeaderTemplate || {}).templateRef;
    }
    ngOnChanges(changes) {
        if (changes.startTime || changes.endTime || changes.showWorkHours || changes.workDayStart || changes.workDayEnd ||
            changes.workWeekStart || changes.workWeekEnd || changes.slotDivisions || changes.slotDuration) {
            this.timeSlots = this.createTimeSlots();
            this.initWorkDay();
            this.changes.next(null);
        }
        if (isChanged('currentTimeMarker', changes)) {
            this.showCurrentTime = this.enableCurrentTime();
        }
        super.ngOnChanges(changes);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        clearTimeout(this.currentTimeTimeout);
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
    timeSlotClass(slot, date, resourceIndex) {
        if (this.slotClass) {
            return this.slotClass({
                start: dateWithTime(date, slot.start),
                end: dateWithTime(date, slot.end),
                resources: this.resourcesByIndex(resourceIndex),
                isAllDay: false
            });
        }
    }
    scrollToTime(time = this.scrollTime) {
        const scrollDate = this.intl.parseDate(time);
        if (!scrollDate) {
            return;
        }
        const date = toUTCTime(this.daySlots[0].start, scrollDate);
        const position = this.slotService.timePosition(date, 0, this.verticalTime);
        if (isNumber(position)) {
            const contentElement = this.content.nativeElement;
            contentElement[this.verticalTime ? 'scrollTop' : 'scrollLeft'] =
                (this.localization.rtl && !this.verticalTime) ? rtlScrollPosition(contentElement, position) : position;
        }
    }
    optionsChange(options) {
        this.schedulerTimeSlotTemplate = options.timeSlotTemplate;
        this.schedulerDateHeaderTemplate = options.dateHeaderTemplate;
        super.optionsChange(options);
    }
    updateView() {
        super.updateView();
        this.updateCurrentTime();
        if (this.initialUpdate) {
            this.scrollToTime();
            this.initialUpdate = false;
        }
    }
    enableCurrentTime() {
        if (!this.currentTimeMarker || this.currentTimeMarker.enabled === false || !this.selectedDate) {
            return false;
        }
        const dateRange = this.dateRange();
        this.currentDate = ZonedDate.fromLocalDate(this.currentTime(), this.currentTimeMarker.localTimezone !== false ? '' : this.timezone);
        const localTime = this.currentDate.toLocalDate();
        const invariantTime = toInvariantTime(localTime);
        const timeSlots = this.timeSlots;
        const inDateRange = dateInRange(localTime, dateRange.start, dateRange.end);
        const inTimeRange = timeSlots.length && dateInRange(invariantTime, timeSlots[0].start, timeSlots[timeSlots.length - 1].end);
        return inDateRange && inTimeRange;
    }
    currentTime() {
        return new Date();
    }
    updateCurrentTime() {
        if (!isDocumentAvailable()) {
            return;
        }
        const enable = this.enableCurrentTime();
        if (enable !== this.showCurrentTime) {
            this.showCurrentTime = enable;
            this.changeDetector.detectChanges();
        }
        clearTimeout(this.currentTimeTimeout);
        if (enable) {
            this.zone.runOutsideAngular(() => {
                this.currentTimeTimeout = setTimeout(this.updateCurrentTime, this.currentTimeMarker.updateInterval || MS_PER_MINUTE);
            });
            this.positionCurrentTime();
        }
    }
    positionCurrentTime() {
        if (this.currentTimeElements && this.currentTimeElements.length) {
            const date = this.currentDate.toUTCDate();
            const currentTimeArrows = this.currentTimeArrows ? this.currentTimeArrows.toArray() : [];
            const arrowOffset = currentTimeArrows.length ? this.currentTimeArrowOffset() : 0;
            const arrowMid = currentTimeArrows.length ? (currentTimeArrows[0].nativeElement.offsetHeight / 2) : 4;
            const tableWidth = this.contentTable.nativeElement.clientWidth;
            const tableHeight = this.contentTable.nativeElement.clientHeight;
            const vertical = this.verticalTime;
            this.currentTimeElements.forEach((element, index) => {
                const position = this.slotService.timePosition(date, index, vertical);
                if (position !== undefined) {
                    const line = element.nativeElement;
                    if (currentTimeArrows[index]) {
                        const arrow = currentTimeArrows[index].nativeElement;
                        const origin = vertical ? arrowOffset : position - arrowMid;
                        setCoordinates(arrow, {
                            top: vertical ? position - arrowMid : arrowOffset,
                            left: origin,
                            right: origin
                        });
                    }
                    const origin = vertical ? 0 : position;
                    setCoordinates(line, {
                        top: vertical ? position : 0,
                        left: origin,
                        right: origin,
                        width: vertical ? tableWidth : 1,
                        height: vertical ? 1 : tableHeight
                    });
                }
            });
        }
    }
    bindEvents() {
        super.bindEvents();
        this.zone.runOutsideAngular(() => {
            this.subs.add(fromClick(this.headerWrap.nativeElement)
                .subscribe(e => this.onHeaderClick(e)));
            this.subs.add(fromEvent(this.headerWrap.nativeElement, 'contextmenu')
                .subscribe(e => this.onClick(e)));
            this.subs.add(fromDoubleClick(this.headerWrap.nativeElement)
                .subscribe(e => this.onClick(e, 'dblclick')));
        });
    }
    onHeaderClick(e) {
        this.onClick(e);
        if (this.daySlots.length <= 1) {
            return;
        }
        const daySlotIndex = e.target.getAttribute('data-dayslot-index');
        if (daySlotIndex) {
            const slot = this.daySlots[parseInt(daySlotIndex, 10)];
            this.zone.run(() => {
                this.viewState.navigateTo({ viewName: 'day', date: slot.start });
            });
        }
    }
    slotByIndex(slotIndex, args) {
        return this.slotService.slotByIndex(slotIndex, args.target.hasAttribute('data-day-slot'));
    }
    onSelectDate(date) {
        this.selectedDate = date;
        this.daySlots = this.createDaySlots();
        this.showCurrentTime = this.enableCurrentTime();
        this.viewState.notifyDateRange(this.dateRange());
    }
    onAction(e) {
        const now = getDate(this.selectedDate);
        if (e.type === 'next') {
            const next = this.getNextDate(now, 1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            const next = this.getNextDate(now, -1, this.numberOfDays);
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'scroll-time') {
            this.scrollToTime(e.time);
        }
    }
    dateRange(date = this.selectedDate) {
        const start = this.getStartDate(date);
        const end = this.getEndDate(start, this.numberOfDays);
        const rangeEnd = this.getEndDate(start, this.numberOfDays - 1);
        const text = this.intl.format(this.selectedDateFormat, start, rangeEnd);
        const shortText = this.intl.format(this.selectedShortDateFormat, start, rangeEnd);
        return { start, end, text, shortText };
    }
    createDaySlots() {
        let current = this.getStartDate(this.selectedDate);
        const end = this.getEndDate(current, this.numberOfDays);
        const dates = [];
        while (current < end) {
            const next = addDays(current, 1);
            dates.push({
                start: current,
                end: next
            });
            current = next;
        }
        return dates;
    }
    createTimeSlots() {
        return createTimeSlots(this.intl, {
            showWorkHours: this.showWorkHours,
            startTime: this.startTime,
            endTime: this.endTime,
            workDayStart: this.workDayStart,
            workDayEnd: this.workDayEnd,
            slotDivisions: this.slotDivisions,
            slotDuration: this.slotDuration
        });
    }
    initWorkDay() {
        const startDate = this.intl.parseDate(this.workDayStart);
        this.workDayStartTime = toInvariantTime(startDate);
        const endDate = this.intl.parseDate(this.workDayEnd);
        this.workDayEndTime = toInvariantTime(endDate);
    }
    slotByPosition(x, y, container) {
        const isDaySlot = container ? hasClasses(container.parentNode, 'k-scheduler-header-wrap') : y < 0;
        return this.slotService.slotByPosition(x, y, isDaySlot, Boolean(this.verticalResources.length));
    }
    slotFields(slot) {
        const fields = super.slotFields(slot);
        if (slot.isDaySlot) {
            fields.isAllDay = true;
        }
        else {
            fields.start = this.convertDate(slot.start);
            fields.end = this.convertDate(slot.end);
        }
        return fields;
    }
}
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

/**
 * @hidden
 */
class MultiDayViewRendererComponent extends DayTimeViewComponent {
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
        return createTasks$1(dateRange.start, dateRange.end, items, ranges);
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

/**
 * @hidden
 */
class TimeSlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = false;
    }
    get nonWorkHour() {
        const date = this.date.getDay();
        return this.invariantStart < this.workDayStart || this.workDayEnd < this.invariantEnd || !isWorkWeekDay(date, this.workWeekStart, this.workWeekEnd);
    }
    get startLocalTime() {
        if (!this.date || !this.invariantStart) {
            return null;
        }
        return dateWithTime(this.date, this.invariantStart);
    }
    get endLocalTime() {
        if (!this.date || !this.invariantEnd) {
            return null;
        }
        return dateWithTime(this.date, this.invariantEnd);
    }
    get start() {
        if (!this.date || !this.invariantStart) {
            return null;
        }
        return toUTCTime(this.date, this.invariantStart);
    }
    get end() {
        if (!this.date || !this.invariantEnd) {
            return null;
        }
        const localEnd = toUTCTime(this.date, this.invariantEnd);
        if (INVARIANT_END.getTime() <= this.invariantEnd.getTime()) {
            return addUTCDays(localEnd, 1);
        }
        return localEnd;
    }
}
TimeSlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[timeSlot]',
                exportAs: 'timeSlot'
            },] },
];
/** @nocollapse */
TimeSlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DayTimeSlotService },
    { type: LocalizationService }
];
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
/**
 * @hidden
 */
class DaySlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = true;
    }
    set start(value) {
        this.startDate = value;
    }
    get start() {
        if (!this.startDate) {
            return null;
        }
        return toUTCDate(this.startDate);
    }
    set end(value) {
        this.endDate = value;
    }
    get end() {
        if (!this.endDate) {
            return null;
        }
        return toUTCDate(this.endDate);
    }
    get daySlot() {
        return true;
    }
}
DaySlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[daySlot]'
            },] },
];
/** @nocollapse */
DaySlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DayTimeSlotService },
    { type: LocalizationService }
];
DaySlotDirective.propDecorators = {
    start: [{ type: Input }],
    end: [{ type: Input }],
    daySlot: [{ type: HostBinding, args: ['attr.data-day-slot',] }]
};

/**
 * @hidden
 */
class DayTimeViewItemComponent extends BaseViewItem {
    constructor(intlService, slotService, localization, focusService, element, renderer) {
        super(slotService, localization, focusService, element, renderer);
        this.intlService = intlService;
    }
    get eventTime() {
        return this.intlService.format('{0:t}???{1:t}', toLocalDate(this.item.startTime), toLocalDate(this.item.endTime));
    }
}
DayTimeViewItemComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[dayTimeViewItem]',
                template: `
        <span class="k-event-actions">
            <span class="k-icon k-i-arrow-60-left" *ngIf="item.tail && !vertical"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
        </span>
        <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
            [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: resources }">
        </ng-container>
        <div *ngIf="!eventTemplate" [attr.title]="eventTitle">
            <div class="k-event-template k-event-time" *ngIf="!isAllDay">{{ eventTime }}</div>
            <div class="k-event-template" aria-hidden="true">{{ item.event.title }}</div>
        </div>

        <span class="k-event-actions">
            <a href="#" *ngIf="removable" class="k-link k-event-delete"
               tabindex="-1" aria-hidden="true"
               [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
            <span class="k-icon k-i-arrow-60-right" *ngIf="item.head && !vertical"></span>
        </span>

        <span class="k-event-top-actions" *ngIf="item.tail && vertical">
            <span class="k-icon k-i-arrow-60-up"></span>
        </span>

        <span class="k-event-bottom-actions" *ngIf="item.head && vertical">
            <span class="k-icon k-i-arrow-60-down"></span>
        </span>

        <ng-container *ngIf="resizable && vertical">
            <span class="k-resize-handle k-resize-n" *ngIf="!item.tail"></span>
            <span class="k-resize-handle k-resize-s" *ngIf="!item.head"></span>
        </ng-container>

        <ng-container *ngIf="resizable && !vertical">
            <span class="k-resize-handle k-resize-w"></span>
            <span class="k-resize-handle k-resize-e"></span>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
DayTimeViewItemComponent.ctorParameters = () => [
    { type: IntlService },
    { type: DayTimeSlotService },
    { type: LocalizationService },
    { type: FocusService },
    { type: ElementRef },
    { type: Renderer2 }
];
DayTimeViewItemComponent.propDecorators = {
    vertical: [{ type: Input }],
    isAllDay: [{ type: Input }]
};

const DIRECTIVES = [TimeSlotDirective, DaySlotDirective, DayTimeViewItemComponent];
/**
 * @hidden
 */
class DayTimeModule {
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

const PUBLIC_DIRECTIVES = [
    DayViewComponent,
    MultiDayViewComponent,
    WeekViewComponent,
    WorkWeekViewComponent
];
/**
 * @hidden
 */
class MultiDayViewModule {
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
                declarations: [
                    ...PUBLIC_DIRECTIVES,
                    MultiDayViewRendererComponent
                ]
            },] },
];

// tslint:disable:no-input-rename
/**
 * A directive selector for a custom Scheduler view
 */
class SchedulerViewDirective extends SchedulerView {
    constructor(template) {
        super();
        this.template = template;
    }
    /**
     * The invariant name for this view. For example, `day`.
     * If not set, the name will be the same as the title.
     */
    get name() {
        return this._name || this.title;
    }
    set name(value) {
        this._name = value;
    }
}
SchedulerViewDirective.decorators = [
    { type: Directive, args: [{
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => SchedulerViewDirective)
                    }],
                selector: '[kendoSchedulerView]'
            },] },
];
/** @nocollapse */
SchedulerViewDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SchedulerViewDirective.propDecorators = {
    title: [{ type: Input, args: ['kendoSchedulerView',] }],
    name: [{ type: Input, args: ['kendoSchedulerViewName',] }]
};

/**
 * @hidden
 */
const createTasks$2 = (periodStart, periodEnd, items) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const event = item.event;
        const task = {
            index,
            start: item.start,
            end: item.end,
            event: event,
            isAllDay: false
        };
        const endTime = event.isAllDay ? roundAllDayEnd(item) : task.end;
        const startTime = event.isAllDay ? task.start.stripTime() : task.start;
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
class TimelineMultiDayViewComponent extends DayTimeViewComponent {
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
        return createTasks$2(dateRange.start, dateRange.end, items);
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

const COLUMN_WIDTH = 'columnWidth';
/**
 * @hidden
 */
class TimelineBase extends DayTimeViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewColumnWidth() {
        return this.optionValue(COLUMN_WIDTH);
    }
}
TimelineBase.propDecorators = {
    columnWidth: [{ type: Input }]
};

/**
 * The component for rendering the **Timeline** view.
 */
class TimelineViewComponent extends TimelineBase {
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
         * The invariant name for this view (`timeline`).
         */
        this.name = 'timeline';
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('timelineViewTitle');
    }
}
TimelineViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-timeline-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => TimelineViewComponent)
                    }],
                template: `
        <ng-template #content>
            <timeline-multi-day-view
                [name]="name"
                [eventHeight]="viewEventHeight"
                [columnWidth]="viewColumnWidth"
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
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [??ventTemplate]="eventTemplate?.templateRef"
                [groupHeaderTemplate]="groupHeaderTemplate?.templateRef"
                [timeSlotTemplate]="timeSlotTemplate?.templateRef"
                [dateHeaderTemplate]="dateHeaderTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </timeline-multi-day-view>
            <div viewFooter kendoWorkHoursFooter [showWorkHours]="shouldShowWorkHours" (itemClick)="showWorkHours = !shouldShowWorkHours"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
TimelineViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
TimelineViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }]
};

/**
 * The component for rendering the **Week** timeline view.
 */
class TimelineWeekViewComponent extends TimelineBase {
    constructor(intl, localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        this.intl = intl;
        /**
         * The long-date format that will be used for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short date format that will be used for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`timelineWeek`).
         */
        this.name = 'timelineWeek';
        /**
         * @hidden
         */
        this.getStartDate = (selectedDate) => {
            return firstDayInWeek(getDate(selectedDate), this.intl.firstDay());
        };
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('timelineWeekViewTitle');
    }
}
TimelineWeekViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-timeline-week-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => TimelineWeekViewComponent)
                    }],
                template: `
        <ng-template #content>
            <timeline-multi-day-view
                viewName="timeline-week"
                [name]="name"
                [numberOfDays]="7"
                [getStartDate]="getStartDate"
                [eventHeight]="viewEventHeight"
                [columnWidth]="viewColumnWidth"
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
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [??ventTemplate]="eventTemplate?.templateRef"
                [groupHeaderTemplate]="groupHeaderTemplate?.templateRef"
                [timeSlotTemplate]="timeSlotTemplate?.templateRef"
                [dateHeaderTemplate]="dateHeaderTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </timeline-multi-day-view>
            <div viewFooter kendoWorkHoursFooter [showWorkHours]="shouldShowWorkHours" (itemClick)="showWorkHours = !shouldShowWorkHours"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
TimelineWeekViewComponent.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
TimelineWeekViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }]
};

/**
 * The component for rendering the **Month** timeline view.
 */
class TimelineMonthViewComponent extends TimelineBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`timelineMonth`).
         */
        this.name = 'timelineMonth';
        /**
         * @hidden
         */
        this.getStartDate = (selectedDate) => {
            return firstDayOfMonth(getDate(selectedDate));
        };
        /**
         * @hidden
         */
        this.getEndDate = (selectedDate) => {
            return addMonths(this.getStartDate(selectedDate), 1);
        };
        /**
         * @hidden
         */
        this.getNextDate = (date, count) => {
            return addMonths(date, count);
        };
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('timelineMonthViewTitle');
    }
}
TimelineMonthViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-timeline-month-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => TimelineMonthViewComponent)
                    }],
                template: `
        <ng-template #content>
            <timeline-multi-day-view
                viewName="timeline-month"
                [name]="name"
                [getNextDate]="getNextDate"
                [getStartDate]="getStartDate"
                [getEndDate]="getEndDate"
                [eventHeight]="viewEventHeight"
                [columnWidth]="viewColumnWidth"
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
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [??ventTemplate]="eventTemplate?.templateRef"
                [groupHeaderTemplate]="groupHeaderTemplate?.templateRef"
                [timeSlotTemplate]="timeSlotTemplate?.templateRef"
                [dateHeaderTemplate]="dateHeaderTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </timeline-multi-day-view>
            <div viewFooter kendoWorkHoursFooter [showWorkHours]="shouldShowWorkHours" (itemClick)="showWorkHours = !shouldShowWorkHours"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
TimelineMonthViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
TimelineMonthViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }]
};

const PUBLIC_DIRECTIVES$1 = [
    TimelineViewComponent,
    TimelineWeekViewComponent,
    TimelineMonthViewComponent
];
/**
 * @hidden
 */
class TimelineViewModule {
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
                declarations: [
                    ...PUBLIC_DIRECTIVES$1,
                    TimelineMultiDayViewComponent
                ]
            },] },
];

const isRecurrenceMaster$1 = (ev) => !!(ev.id && ev.recurrenceRule);
/**
 * @hidden
 */
class LocalEditService {
    constructor(scheduler, localDataChangesService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
    }
    get fields() {
        return this.scheduler.modelFields;
    }
    get hasLocalData() {
        return isPresent(this.localDataChangesService.data);
    }
    get data() {
        if (this.hasLocalData) {
            return this.localDataChangesService.data;
        }
        return this.scheduler.events;
    }
    create(item) {
        const idField = this.fields.id;
        const id = getField(item, idField);
        if (!isPresent(id)) {
            setField(item, idField, this.nextId());
        }
        this.data.push(item);
        this.dataChanged();
    }
    createException(item, value) {
        const exception = this.buildException(value);
        this.removeOccurrenceInternal(item);
        this.create(exception);
    }
    update(item, value) {
        assignValues(item, value);
        this.dataChanged();
    }
    remove(item) {
        const idField = this.fields.id;
        const itemId = getField(item, idField);
        const data = this.data;
        for (let idx = 0; idx < data.length; idx++) {
            if (itemId === getField(data[idx], idField)) {
                data.splice(idx, 1);
                break;
            }
        }
        this.dataChanged();
    }
    removeSeries(item) {
        const event = readEvent(item, this.fields);
        const isHead = isRecurrenceMaster$1(event);
        this.removeItemAndExceptions(isHead ? event.id : event.recurrenceId);
        this.dataChanged();
    }
    removeOccurrence(item) {
        this.removeOccurrenceInternal(item);
        this.dataChanged();
    }
    findRecurrenceMaster(item) {
        const fields = this.scheduler.modelFields;
        const event = readEvent(item, fields);
        const headId = isRecurrenceMaster$1(event) ? event.id : event.recurrenceId;
        return this.data.find((dataItem) => getField(dataItem, fields.id) === headId);
    }
    isRecurring(event) {
        return isRecurring(event, this.scheduler.modelFields);
    }
    isException(event) {
        return isException(event, this.scheduler.modelFields);
    }
    nextId() {
        return guid();
    }
    buildException(item) {
        const fields = this.fields;
        const head = this.findRecurrenceMaster(item);
        if (!head) {
            if (isDevMode()) {
                throw new Error('Unable to find recurrence head for event. Please check that recurrenceId is set and refers to an existing event.');
            }
            return;
        }
        const exception = clone(item);
        setField(exception, fields.id, this.nextId());
        setField(exception, fields.recurrenceId, getField(head, fields.id));
        setField(exception, fields.recurrenceRule, null);
        return exception;
    }
    removeItemAndExceptions(itemId) {
        const data = this.data;
        const fields = this.scheduler.modelFields;
        for (let idx = data.length - 1; idx >= 0; idx--) {
            if (itemId === getField(data[idx], fields.recurrenceId) || itemId === getField(data[idx], fields.id)) {
                data.splice(idx, 1);
            }
        }
    }
    removeOccurrenceInternal(item) {
        const fields = this.fields;
        const head = this.findRecurrenceMaster(item);
        const exceptionDate = getField(item, fields.start);
        const currentExceptions = getField(head, fields.recurrenceExceptions) || [];
        setField(head, fields.recurrenceExceptions, [...currentExceptions, exceptionDate]);
    }
    dataChanged() {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit();
        }
    }
}

/**
 * @hidden
 */
const markAllAsTouched = (control) => {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        let controls = control.controls;
        for (let inner in controls) {
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
    for (let idx = 0; idx < fields.length; idx++) {
        const field = fields[idx];
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
        for (let idx = 0; idx < value1.length; idx++) {
            if (value1[idx] !== value2[idx]) {
                return false;
            }
        }
        return true;
    }
    // tslint:disable-next-line:triple-equals
    return value1 == value2;
}
const DATE_ACCESSORS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];
/**
 * @hidden
 */
function seriesDate(head, occurrence, current, field) {
    const values = [];
    const headDate = getField(head, field);
    const occurrenceDate = getField(occurrence, field);
    const currentDate = getField(current, field);
    DATE_ACCESSORS.forEach(accessor => {
        values.push(occurrenceDate[accessor]() === currentDate[accessor]() ? headDate[accessor]() : currentDate[accessor]());
    });
    return new Date(...values);
}

/**
 * @hidden
 */
class EditingDirectiveBase {
    constructor(scheduler, localDataChangesService, dialogsService) {
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
    /**
     * The edit service that will handle the editing operations.
     */
    set editService(value) {
        this.userEditService = value;
    }
    get editService() {
        return this.userEditService || this.defaultEditService;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = merge(this.scheduler.slotDblClick, this.scheduler.create).subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.scheduler.removeConfirmed.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.scheduler.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.scheduler.resizeEndConfirmed.subscribe(this.resizeEndHandler.bind(this)));
        this.subscriptions.add(this.scheduler.dragEndConfirmed.subscribe(this.dragEndHandler.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    createDefaultService() {
        return new LocalEditService(this.scheduler, this.localDataChangesService);
    }
    addHandler(args) {
        this.closeEditor();
        if (!this.isEnabled('add')) {
            return;
        }
        const fields = this.scheduler.modelFields;
        const dataItem = {};
        setField(dataItem, fields.start, args.start);
        setField(dataItem, fields.end, args.end);
        setField(dataItem, fields.isAllDay, args.isAllDay);
        setField(dataItem, fields.title, args.title);
        const resources = groupResources(this.scheduler.group, this.scheduler.resources);
        const slotResources = args.resources;
        for (let idx = 0; idx < resources.length; idx++) {
            const resource = resources[idx];
            const value = getField(slotResources[idx], resource.valueField);
            setField(dataItem, resource.field, resource.multiple ? [value] : value);
        }
        const addArgs = new AddEvent(this.scheduler, { dataItem });
        this.add.emit(addArgs);
        if (!addArgs.isDefaultPrevented()) {
            this.scheduler.addEvent(this.createModel({
                action: 'add',
                isNew: true,
                dataItem
            }));
        }
    }
    removeHandler({ dataItem }) {
        if (!this.isEnabled('remove')) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(1 /* Remove */)
                .subscribe((editMode) => {
                if (editMode !== undefined) {
                    this.handleRemove(dataItem, editMode);
                }
            });
        }
        else {
            this.dialogsService.openRemoveConfirmationDialog()
                .subscribe((shouldRemove) => {
                if (shouldRemove) {
                    this.handleRemove(dataItem, 0 /* Event */);
                }
            });
        }
    }
    cancelHandler() {
        this.closeEditor();
    }
    closeEditor() {
        this.scheduler.closeEvent();
    }
    handleUpdate(item, value, mode) {
        const svc = this.editService;
        if (mode === 1 /* Occurrence */) {
            svc.isException(item) ?
                svc.update(item, value) :
                svc.createException(item, value);
        }
        else {
            // Item is not recurring or we're editing the entire series
            svc.update(item, value);
        }
    }
    handleRemove(item, mode) {
        const svc = this.editService;
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
    }
    resizeEndHandler({ event, start, end }) {
        if (areEqual(start, event.start) && areEqual(end, event.end)) {
            return;
        }
        const dataItem = event.dataItem;
        const fields = this.scheduler.modelFields;
        let value = {};
        setField(value, fields.start, start);
        setField(value, fields.end, end);
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe((result) => {
                let target = dataItem;
                if (result === 2 /* Series */) {
                    target = this.editService.findRecurrenceMaster(dataItem);
                    setField(value, fields.start, seriesDate(target, dataItem, value, fields.start));
                    setField(value, fields.end, seriesDate(target, dataItem, value, fields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    }
    dragEndHandler({ event: { dataItem }, start, end, resources, isAllDay }) {
        const modelFields = this.scheduler.modelFields;
        const resourceFields = groupResources(this.scheduler.group, this.scheduler.resources).map(r => r.field);
        const fields = [modelFields.start, modelFields.end, modelFields.isAllDay].concat(resourceFields);
        let value = clone(resources);
        setField(value, modelFields.start, start);
        setField(value, modelFields.end, end);
        setField(value, modelFields.isAllDay, isAllDay);
        if (!diff(dataItem, value, fields)) {
            return;
        }
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .subscribe((result) => {
                let target = dataItem;
                if (result === 2 /* Series */) {
                    target = this.editService.findRecurrenceMaster(dataItem);
                    setField(value, modelFields.start, seriesDate(target, dataItem, value, modelFields.start));
                    setField(value, modelFields.end, seriesDate(target, dataItem, value, modelFields.end));
                }
                else if (result !== undefined) {
                    value = assignValues(clone(dataItem), value);
                }
                this.handleUpdate(target, value, result);
            });
        }
        else {
            this.editService.update(dataItem, value);
        }
    }
    isEnabled(action) {
        const editable = this.scheduler.editable;
        return editable && editable[action] !== false;
    }
}
EditingDirectiveBase.propDecorators = {
    add: [{ type: Output }],
    edit: [{ type: Output }],
    editService: [{ type: Input }]
};

/**
 * A directive which encapsulates the editing operations when the Scheduler
 * uses the [Reactive Angular Forms]({{ site.data.urls.angular['reactiveforms'] }}).
 */
class ReactiveEditingDirective extends EditingDirectiveBase {
    constructor(scheduler, localDataChangesService, dialogsService) {
        super(scheduler, localDataChangesService, dialogsService);
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
        this.dialogsService = dialogsService;
    }
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.scheduler.eventDblClick.subscribe(this.editHandler.bind(this)));
        this.subscriptions.add(this.scheduler.save.subscribe(this.saveHandler.bind(this)));
    }
    editHandler(args) {
        if (!this.isEnabled('edit')) {
            return;
        }
        const editArgs = new EditEvent(this.scheduler, { dataItem: args.event.dataItem, event: args.event });
        this.edit.emit(editArgs);
        if (editArgs.isDefaultPrevented()) {
            return;
        }
        let dataItem = args.event.dataItem;
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .pipe(filter(mode => mode !== undefined))
                .subscribe((mode) => {
                if (mode === 2 /* Series */) {
                    dataItem = this.editService.findRecurrenceMaster(dataItem);
                }
                const group = this.createModel({
                    action: 'edit',
                    isNew: false,
                    mode,
                    dataItem
                });
                this.scheduler.editEvent(dataItem, { group, mode });
            });
        }
        else {
            const group = this.createModel({
                action: 'edit',
                isNew: false,
                mode: 0 /* Event */,
                dataItem
            });
            this.scheduler.editEvent(dataItem, { group });
        }
    }
    saveHandler(args) {
        if (this.isFormValid(args)) {
            const formValue = args.formGroup.value;
            if (args.isNew) {
                this.editService.create(formValue);
            }
            else {
                this.handleUpdate(args.dataItem, formValue, args.mode);
            }
        }
        this.closeEditor();
    }
    createModel(args) {
        // Alias `event` for backwards compatibility.
        args.event = args.dataItem;
        return this.createFormGroup(args);
    }
    isFormValid({ formGroup, isNew }) {
        if (formGroup.valid) {
            return true;
        }
        if (!formGroup.dirty && !isNew) {
            return false;
        }
        markAllAsTouched(formGroup);
        return false;
    }
}
ReactiveEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: SchedulerComponent },
    { type: LocalDataChangesService },
    { type: DialogsService }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoSchedulerReactiveEditing',] }]
};

/**
 * @hidden
 */
class ResourceEditorBase {
    constructor() {
        this.valueChange = new EventEmitter();
        this.getField = getField;
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
    }
    /**
     * @hidden
     */
    writeValue(newValue) {
        this.resourceValue = newValue;
    }
    getResourceStyle(dataItem) {
        return {
            'background-color': getField(dataItem, this.resource.colorField),
            'margin-right': isPresent(getField(dataItem, this.resource.valueField)) ? '8px' : '4px'
        };
    }
    onResourceValueChange(newValue) {
        this.resourceValue = newValue;
        this.emitChange(this.resourceValue);
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    emitChange(value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    }
}
ResourceEditorBase.propDecorators = {
    resource: [{ type: Input }],
    valueChange: [{ type: Output }]
};

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
const MULTIPLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleResourceEditorComponent)
};
/**
 * @hidden
 */
class MultipleResourceEditorComponent extends ResourceEditorBase {
    getTagStyle(dataItem) {
        return {
            'background-color': dataItem[this.resource.colorField]
        };
    }
    focus() {
        this.resourceMultiSelect.focus();
    }
}
MultipleResourceEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    MULTIPLE_RESOURCE_VALUE_ACCESSOR
                ],
                selector: 'kendo-multiple-resource-editor',
                template: `
        <kendo-multiselect
            #resourceMultiSelect
            [data]='resource.data'
            [textField]='resource.textField'
            [valueField]='resource.valueField'
            [valuePrimitive]='true'
            [value]='resourceValue'
            (valueChange)='onResourceValueChange($event)'
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <span *ngIf="resource.colorField" class="k-scheduler-mark"
                [ngStyle]="getResourceStyle(dataItem)"></span>
                {{ getField(dataItem, resource.textField) }}
            </ng-template>
            <ng-template kendoMultiSelectTagTemplate let-dataItem>
                <span *ngIf="resource.colorField" class="k-scheduler-mark"
                [ngStyle]="getTagStyle(dataItem)"></span>
                {{ getField(dataItem, resource.textField) }}
            </ng-template>
        </kendo-multiselect>
    `
            },] },
];
MultipleResourceEditorComponent.propDecorators = {
    resourceMultiSelect: [{ type: ViewChild, args: ['resourceMultiSelect',] }]
};

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
const SINGLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SingleResourceEditorComponent)
};
/**
 * @hidden
 */
class SingleResourceEditorComponent extends ResourceEditorBase {
    focus() {
        this.resourceDropDown.focus();
    }
}
SingleResourceEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    SINGLE_RESOURCE_VALUE_ACCESSOR
                ],
                selector: 'kendo-single-resource-editor',
                template: `
        <kendo-dropdownlist
            #resourceDropDown
            [data]='resource.data'
            [textField]='resource.textField'
            [valueField]='resource.valueField'
            [valuePrimitive]='true'
            [value]='resourceValue'
            (valueChange)='onResourceValueChange($event)'
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <span *ngIf="resource.colorField" class="k-scheduler-mark"
                [ngStyle]="getResourceStyle(dataItem)"></span>
                {{ getField(dataItem, resource.textField) }}
            </ng-template>
        </kendo-dropdownlist>
    `
            },] },
];
SingleResourceEditorComponent.propDecorators = {
    resourceDropDown: [{ type: ViewChild, args: ['resourceDropDown',] }]
};

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
class EditDialogComponent {
    constructor(ngZone, editService, localization, changeDetector, element, focusService) {
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
        this.subs = this.editService.changed.subscribe(() => {
            this.ngZone.run(() => { this.onChange(); });
        });
        this.subs.add(fromEvent(this.element.nativeElement, 'keydown')
            .pipe(filter(() => this.isActive))
            .subscribe((e) => {
            if (e.keyCode === Keys.Escape) {
                this.reset();
            }
            if (e.keyCode === Keys.Enter && (withModifiers(e, Modifiers.CtrlKey) || withModifiers(e, Modifiers.MetaKey))) {
                this.onSave(e);
            }
            e.stopPropagation();
        }));
    }
    get isEditingSeries() {
        return this.editMode === 2 /* Series */ && Boolean(this.formGroup.get(this.fields.recurrenceRule));
    }
    get eventTimezone() {
        return formValueOrDefault(this.formGroup, this.fields.startTimezone, this.timezone);
    }
    get endTimezone() {
        return formValueOrDefault(this.formGroup, this.fields.endTimezone, this.eventTimezone);
    }
    onChange() {
        this.changeDetector.markForCheck();
        if (this.editService.hasNewEvent) {
            this.editMode = 2 /* Series */;
            this.formGroup = this.editService.context.formGroup;
            this.isNew = true;
            this.applyLocalTimezone();
        }
        else if (this.editService.isEditing()) {
            const { dataItem, mode } = this.editService.context;
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
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.titleInput.nativeElement.select();
        });
        this.isActive = true;
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    onCancel(e) {
        e.preventDefault();
        this.onClose();
        this.changeDetector.markForCheck();
    }
    onSave(e) {
        e.preventDefault();
        this.applyTimezone();
        this.editService.save();
        this.changeDetector.markForCheck();
    }
    onClose() {
        this.editService.endEdit();
        this.changeDetector.markForCheck();
        this.focusService.focus();
    }
    get hasAllDay() {
        return Boolean(this.formGroup.get(this.fields.isAllDay));
    }
    get hasStartTimeZone() {
        return Boolean(this.formGroup.get(this.fields.startTimezone));
    }
    get isStartTimeZoneVisible() {
        return this.formGroup && this.formGroup.get('startTimezoneCheckbox').value;
    }
    get hasEndTimeZone() {
        return Boolean(this.formGroup.get(this.fields.endTimezone));
    }
    get isEndTimeZoneVisible() {
        return this.formGroup && this.formGroup.get('endTimezoneCheckbox').value;
    }
    getFormValue(field) {
        if (field) {
            return this.formGroup.get(field);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onResourceClick(resource) {
        const resourceEditors = resource.multiple ? this.multipleResourceEditors : this.singleResourceEditors;
        const currentEditor = resourceEditors.filter((editor) => editor.resource.field === resource.field).pop();
        if (currentEditor) {
            currentEditor.focus();
        }
    }
    reset() {
        this.isActive = false;
        this.setTimeZone = false;
        this.setSeparateStartEndTimeZones = false;
        this.removeTimeZoneCheckboxesFromFormGroup();
        this.focusService.focus();
    }
    addTimeZoneCheckboxesToFormGroup() {
        if (isPresent(this.formGroup)) {
            const startField = this.fields.startTimezone;
            this.formGroup.addControl('startTimezoneCheckbox', new FormControl(this.formGroup.contains(startField) &&
                this.formGroup.get(startField).value));
            const endField = this.fields.endTimezone;
            this.formGroup.addControl('endTimezoneCheckbox', new FormControl(this.formGroup.contains(endField) &&
                this.formGroup.get(endField).value));
        }
    }
    removeTimeZoneCheckboxesFromFormGroup() {
        if (isPresent(this.formGroup)) {
            this.formGroup.removeControl('startTimezoneCheckbox');
            this.formGroup.removeControl('endTimezoneCheckbox');
        }
    }
    subscribeToFormGroupChanges() {
        if (isPresent(this.formGroup)) {
            const fields = this.fields;
            this.formGroup.get('startTimezoneCheckbox').valueChanges.subscribe(isTrue => {
                if (!isTrue) {
                    this.formGroup.get(fields.startTimezone).setValue(null, { emitEvent: false });
                    this.formGroup.get(fields.endTimezone).setValue(null, { emitEvent: false });
                    this.formGroup.get('endTimezoneCheckbox').setValue(false, { emitEvent: false });
                }
            });
            this.formGroup.get('endTimezoneCheckbox').valueChanges.subscribe(isTrue => {
                if (!isTrue) {
                    this.formGroup.get(fields.endTimezone).setValue(null, { emitEvent: false });
                }
            });
            this.formGroup.get(fields.start).valueChanges.subscribe((newStart) => {
                this.recurrenceStart = newStart;
            });
        }
    }
    /**
     * Converts the event dates to "display dates" that look like the original date in its time zone.
     * The result does not represent the same moment in time and must be converted back to local dates.
     */
    applyLocalTimezone() {
        const fields = this.fields;
        const start = this.readDateAsLocal(fields.start, this.eventTimezone);
        const end = this.readDateAsLocal(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    }
    /**
     * Converts the "display dates" used by the editors back to local dates that represent the true moment in time.
     */
    applyTimezone() {
        const fields = this.fields;
        const start = this.readDateWithTimezone(fields.start, this.eventTimezone);
        const end = this.readDateWithTimezone(fields.end, this.endTimezone);
        this.formGroup.get(fields.start).reset(start);
        this.formGroup.get(fields.end).reset(end);
    }
    readDateWithTimezone(field, timezone) {
        const value = this.formGroup.get(field).value;
        return ZonedDate.fromUTCDate(toUTCDateTime(value), timezone).toLocalDate();
    }
    readDateAsLocal(field, timezone) {
        const value = this.formGroup.get(field).value;
        return toLocalDate(ZonedDate.fromLocalDate(value, timezone).toUTCDate());
    }
}
EditDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scheduler-edit-dialog',
                template: `
        <kendo-dialog (close)='onClose()' [minWidth]='700' *ngIf='isActive' title='{{ textFor("editorTitle") }}' class='k-scheduler-edit-dialog'>
            <ng-container *ngIf='!editTemplate'>
                <div class='k-scheduler-edit-form'>
                    <div class='k-edit-form-container'>
                        <form novalidate [formGroup]='formGroup'>
                            <div class='k-edit-label'>
                                <label for='k-event-title'>{{ textFor('editorEventTitle') }}</label>
                            </div>
                            <div class='k-edit-field'>
                                <input #title id='k-event-title' class='k-textbox' placeholder='Title' [formControl]='formGroup.get(fields.title)' />
                            </div>

                            <div class='k-edit-label'>
                                <label (click)="startDateTimePicker.focus()">{{ textFor('editorEventStart') }}</label>
                            </div>
                            <div class='k-edit-field'>
                                <kendo-scheduler-datetime-picker #startDateTimePicker [formControl]='formGroup.get(fields.start)'
                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>
                                </kendo-scheduler-datetime-picker>
                            </div>

                            <ng-container *ngIf="isStartTimeZoneVisible">
                                <div class='k-edit-label'>
                                    <label (click)="startTzPicker.focus()">{{ textFor('editorEventStartTimeZone') }}</label>
                                </div>

                                <div class='k-edit-field'>
                                    <kendo-timezone-editor #startTzPicker [formControl]='formGroup.get(fields.startTimezone)'></kendo-timezone-editor>
                                </div>
                            </ng-container>

                            <div class='k-edit-label'>
                                <label (click)="endDateTimePicker.focus()">{{ textFor('editorEventEnd') }}</label>
                            </div>
                            <div class='k-edit-field'>
                                <kendo-scheduler-datetime-picker #endDateTimePicker [formControl]='formGroup.get(fields.end)'
                                    [isAllDay]='getFormValue(fields.isAllDay)?.value'>
                                </kendo-scheduler-datetime-picker>
                            </div>

                            <ng-container *ngIf="isEndTimeZoneVisible">
                                <div class='k-edit-label'>
                                    <label (click)="endTzPicker.focus()">{{ textFor('editorEventEndTimeZone') }}</label>
                                </div>

                                <div class='k-edit-field'>
                                    <kendo-timezone-editor #endTzPicker [formControl]='formGroup.get(fields.endTimezone)'></kendo-timezone-editor>
                                </div>
                            </ng-container>

                            <div class='k-edit-field' *ngIf="hasAllDay">
                                <input type='checkbox' id='k-is-allday-chkbox' class='k-checkbox' [formControl]='formGroup.get(fields.isAllDay)' />
                                <label class='k-checkbox-label' for='k-is-allday-chkbox'>{{ textFor('editorEventAllDay') }}</label>
                            </div>

                            <div class='k-edit-field' *ngIf="hasStartTimeZone">
                                <input type='checkbox' id='k-set-timezone' class='k-checkbox'
                                formControlName='startTimezoneCheckbox' />
                                <label class='k-checkbox-label' for='k-set-timezone'>{{ textFor('editorEventTimeZone') }}</label>

                                <ng-container *ngIf="isStartTimeZoneVisible && hasEndTimeZone">
                                    <input type='checkbox' id='k-use-separate' class='k-checkbox' formControlName='endTimezoneCheckbox' />
                                    <label class='k-checkbox-label' for='k-use-separate'>{{ textFor('editorEventSeparateTimeZones') }}</label>
                                </ng-container>
                            </div>

                            <ng-container *ngIf="isEditingSeries">
                                <kendo-recurrence-editor
                                    [formControl]='formGroup.get(fields.recurrenceRule)'
                                    [start]='recurrenceStart'
                                    [timezone]='eventTimezone'
                                ></kendo-recurrence-editor>
                            </ng-container>

                            <ng-container *ngIf='getFormValue(fields.description)'>
                                <div class='k-edit-label'>
                                    <label for='k-event-description'>{{ textFor('editorEventDescription') }}</label>
                                </div>
                                <div class='k-edit-field'>
                                    <textarea id='k-event-description' class='k-textbox' [formControl]='formGroup.get(fields.description)'></textarea>
                                </div>
                            </ng-container>

                            <ng-container *ngFor='let resource of resources'>
                                <ng-container *ngIf='getFormValue(resource.field)'>
                                    <div class='k-edit-label'>
                                        <label (click)="onResourceClick(resource)">
                                            {{ resource.name ? resource.name : resource.field }}
                                        </label>
                                    </div>
                                    <div class='k-edit-field'>
                                        <kendo-multiple-resource-editor
                                            *ngIf='resource.multiple'
                                            [formControl]='formGroup.get(resource.field)'
                                            [resource]='resource'>
                                        </kendo-multiple-resource-editor>
                                        <kendo-single-resource-editor
                                            *ngIf='!resource.multiple'
                                            [formControl]='formGroup.get(resource.field)'
                                            [resource]='resource'>
                                        </kendo-single-resource-editor>
                                    </div>
                                </ng-container>
                            </ng-container>
                        </form>
                    </div>
                </div>
            </ng-container>

            <ng-container *ngIf='editTemplate'>
                <form novalidate [formGroup]='formGroup'>
                    <ng-container [ngTemplateOutlet]='editTemplate.templateRef'
                        [ngTemplateOutletContext]="{
                            $implicit: formGroup,
                            formGroup: formGroup,
                            dataItem: editedEvent,
                            editMode: editMode,
                            isNew: isNew
                        }">
                    </ng-container>
                </form>
            </ng-container>

            <kendo-dialog-actions>
                <button class="k-button" (click)="onCancel($event)">{{ textFor('cancel') }}</button>
                <button class="k-button k-primary" (click)="onSave($event)" [disabled]="!formGroup.valid">{{ textFor('save') }}</button>
            </kendo-dialog-actions>
        </kendo-dialog>
    `
            },] },
];
/** @nocollapse */
EditDialogComponent.ctorParameters = () => [
    { type: NgZone },
    { type: EditService },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: FocusService }
];
EditDialogComponent.propDecorators = {
    multipleResourceEditors: [{ type: ViewChildren, args: [MultipleResourceEditorComponent,] }],
    singleResourceEditors: [{ type: ViewChildren, args: [SingleResourceEditorComponent,] }],
    titleInput: [{ type: ViewChild, args: ['title',] }],
    resources: [{ type: Input }],
    timezone: [{ type: Input }],
    fields: [{ type: Input }],
    editTemplate: [{ type: Input }]
};

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
const SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SchedulerDateTimePickerComponent)
};
/**
 * @hidden
 */
class SchedulerDateTimePickerComponent {
    constructor() {
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
    }
    writeValue(newDate) {
        if (newDate instanceof Date) {
            this.date = newDate;
        }
    }
    onValueChange(newValue) {
        this.onChangeCallback(newValue);
        this.valueChange.emit(newValue);
    }
    /**
     * @hidden
     */
    focus() {
        this.datePicker.focus();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
SchedulerDateTimePickerComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR
                ],
                selector: 'kendo-scheduler-datetime-picker',
                template: `
    <kendo-datepicker
        #datepicker
        [(value)]='date'
        (valueChange)='onValueChange($event)'
    ></kendo-datepicker>
    <kendo-timepicker *ngIf='!isAllDay'
        [(value)]='date'
        (valueChange)='onValueChange($event)'
    ></kendo-timepicker>
    `
            },] },
];
SchedulerDateTimePickerComponent.propDecorators = {
    datePicker: [{ type: ViewChild, args: ['datepicker',] }],
    isAllDay: [{ type: Input }],
    valueChange: [{ type: Output }]
};

const offsetPositions = ['first', 'second', 'third', 'fourth', 'last'];
const frequencies = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * @hidden
 */
const dayRule = [
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
const weekdayRule = [
    { day: 1, offset: 0 },
    { day: 2, offset: 0 },
    { day: 3, offset: 0 },
    { day: 4, offset: 0 },
    { day: 5, offset: 0 }
];
/**
 * @hidden
 */
const weekendRule = [
    { day: 0, offset: 0 },
    { day: 6, offset: 0 }
];
/**
 * @hidden
 *
 * The internal service for handling changes in the RecurrenceEditor component.
 */
class RecurrenceService {
    constructor(intl, localization) {
        this.intl = intl;
        this.localization = localization;
        this.change = new EventEmitter();
        this.endRuleChange = new EventEmitter();
        this.frequencyChange = new EventEmitter();
        this.repeatOnRuleChange = new EventEmitter();
    }
    init(rrule = "", start, timezone) {
        this.rrule = parseRule({
            recurrenceRule: rrule,
            weekStart: this.intl.firstDay()
        });
        this.start = start;
        this.timezone = timezone;
    }
    get frequencies() {
        return frequencies.map((freq) => ({
            value: freq,
            text: this.localization.get('frequencies' + capitalize(freq))
        }));
    }
    get frequency() {
        if (isPresent(this.rrule) && !isNullOrEmptyString(this.rrule.freq)) {
            return this.rrule.freq;
        }
        return 'never';
    }
    setFrequency(freq) {
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
    }
    set interval(newInterval) {
        this.rrule.interval = newInterval;
        this.onChange();
    }
    set count(newCount) {
        this.rrule.count = newCount;
        this.onChange();
    }
    set until(newUntil) {
        this.rrule.until = ZonedDate.fromLocalDate(newUntil, this.timezone);
        this.onChange();
    }
    get until() {
        if (isPresent(this.rrule.until)) {
            return toLocalDate(this.rrule.until);
        }
    }
    setWeekDays(newWeekDays) {
        this.rrule.byWeekDay = newWeekDays;
        this.onChange();
    }
    set monthDays(newMonthDays) {
        this.rrule.byMonthDay = newMonthDays;
        this.onChange();
    }
    set positions(newPositions) {
        this.rrule.bySetPosition = newPositions;
        this.onChange();
    }
    setMonths(newMonths) {
        this.rrule.byMonth = newMonths;
        this.onChange();
    }
    get months() {
        return this.intl.dateFormatNames({
            type: 'months',
            nameType: 'wide'
        }).map((month, idx) => ({
            text: month,
            value: idx + 1
        }));
    }
    /*
        ToDo Refactor weekDays and extendedWeekDays getters into a single method
    */
    get weekDays() {
        const firstDay = this.intl.firstDay();
        const abbrNames = this.intl.dateFormatNames({
            type: 'days',
            nameType: 'abbreviated'
        }).map((day, idx) => ({
            text: day,
            value: idx
        }));
        /* Sorting according to first week day */
        return (abbrNames.slice(firstDay)).concat(abbrNames.slice(0, firstDay));
    }
    get extendedWeekDays() {
        const firstDay = this.intl.firstDay();
        let wideNames = this.intl.dateFormatNames({
            type: 'days',
            nameType: 'wide'
        }).map((day, idx) => ({
            text: day,
            value: idx
        }));
        const sortedWideNames = (wideNames.slice(firstDay)).concat(wideNames.slice(0, firstDay));
        const specialRules = [
            { text: this.localization.get('weekdaysDay'), value: 'day' },
            { text: this.localization.get('weekdaysWeekday'), value: 'weekday' },
            { text: this.localization.get('weekdaysWeekendday'), value: 'weekend' }
        ];
        return specialRules.concat(sortedWideNames);
    }
    get offsetPositions() {
        const values = [1, 2, 3, 4, -1];
        return offsetPositions.map((offset, idx) => ({
            text: this.localization.get('offsetPositions' + capitalize(offset)),
            value: values[idx]
        }));
    }
    get endRule() {
        if (isPresent(this.rrule.count)) {
            return 'count';
        }
        else if (isPresent(this.rrule.until)) {
            return 'until';
        }
        else {
            return 'never';
        }
    }
    set endRule(endRule) {
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
    }
    get repeatOnRule() {
        if (isPresent(this.rrule.byWeekDay)) {
            return 'weekday';
        }
        else if (isPresent(this.rrule.byMonthDay)) {
            return 'monthday';
        }
        return null;
    }
    set repeatOnRule(repeatOnRule) {
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
    }
    onChange() {
        if (this.frequency === 'never') {
            this.change.emit(null);
        }
        else {
            this.change.emit(serializeRule(this.rrule, this.timezone));
        }
    }
}
RecurrenceService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RecurrenceService.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService }
];

/**
 * @hidden
 */
class RecurrenceLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl, schedulerLocalization) {
        super(prefix, messageService, _rtl);
        this.schedulerLocalization = schedulerLocalization;
    }
    get(shortKey) {
        if (this.schedulerLocalization) {
            return this.schedulerLocalization.get('recurrenceEditor' + capitalize(shortKey));
        }
        return super.get(shortKey);
    }
}
/** @nocollapse */
RecurrenceLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] },
    { type: SchedulerLocalizationService, decorators: [{ type: Optional }, { type: Inject, args: [SchedulerLocalizationService,] }] }
];

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
const RECURRENCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecurrenceEditorComponent)
};
/**
 * Represents the Kendo UI Recurrence Editor component for Angular.
 */
class RecurrenceEditorComponent {
    constructor(recurrenceService) {
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
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.subscriptions = this.recurrenceService.change.subscribe((rrule) => {
            this.emitChange(rrule);
        });
    }
    /**
     * Specifies the start date of the event.
     */
    set start(value) {
        this._start = value;
    }
    get start() {
        return isPresent(this._start) ? this._start : getDate(new Date());
    }
    /**
     * @hidden
     */
    get currentFreq() {
        return this.recurrenceService.frequency;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.recurrenceService.init('', this.start, this.timezone);
    }
    ngOnChanges(changes) {
        if (isChanged('start', changes)) {
            this.recurrenceService.start = this.start;
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    writeValue(rrule) {
        this.recurrenceService.init(typeof rrule === 'string' ? rrule : '', this.start, this.timezone);
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    emitChange(rrule) {
        this.onChangeCallback(rrule);
        this.valueChange.emit(rrule);
    }
}
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
                template: `
        <ng-container kendoRecurrenceEditorLocalizedMessages
            i18n-repeat="kendo.recurrenceeditor.repeat|The text similar to 'Repeat' displayed in the recurrence editor."
            repeat='Repeat'

            i18n-dailyInterval="kendo.recurrenceeditor.dailyInterval|The text similar to 'day(s)' displayed in the recurrence editor."
            dailyInterval='day(s)'

            i18n-dailyRepeatEvery="kendo.recurrenceeditor.dailyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            dailyRepeatEvery='Repeat every'

            i18n-weeklyInterval="kendo.recurrenceeditor.weeklyInterval|The text similar to 'week(s)' displayed in the recurrence editor."
            weeklyInterval='week(s)'

            i18n-weeklyRepeatEvery="kendo.recurrenceeditor.weeklyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            weeklyRepeatEvery='Repeat every'

            i18n-weeklyRepeatOn="kendo.recurrenceeditor.weeklyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            weeklyRepeatOn='Repeat on'

            i18n-monthlyDay="kendo.recurrenceeditor.monthlyDay|The text similar to 'Day' displayed in the recurrence editor."
            monthlyDay='Day'

            i18n-monthlyInterval="kendo.recurrenceeditor.monthlyInterval|The text similar to 'month(s)' displayed in the recurrence editor."
            monthlyInterval='month(s)'

            i18n-monthlyRepeatEvery="kendo.recurrenceeditor.monthlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            monthlyRepeatEvery='Repeat every'

            i18n-monthlyRepeatOn="kendo.recurrenceeditor.monthlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            monthlyRepeatOn='Repeat on'

            i18n-yearlyOf="kendo.recurrenceeditor.yearlyOf|The text similar to 'of' displayed in the recurrence editor."
            yearlyOf='of'

            i18n-yearlyRepeatEvery="kendo.recurrenceeditor.yearlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            yearlyRepeatEvery='Repeat every'

            i18n-yearlyRepeatOn="kendo.recurrenceeditor.yearlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            yearlyRepeatOn='Repeat on'

            i18n-yearlyInterval="kendo.recurrenceeditor.yearlyInterval|The text similar to 'year(s)' displayed in the recurrence editor."
            yearlyInterval='year(s)'

            i18n-frequenciesDaily="kendo.recurrenceeditor.frequenciesDaily|The text similar to 'Daily' displayed in the recurrence editor."
            frequenciesDaily='Daily'

            i18n-frequenciesMonthly="kendo.recurrenceeditor.frequenciesMonthly|The text similar to 'Monthly' displayed in the recurrence editor."
            frequenciesMonthly='Monthly'

            i18n-frequenciesNever="kendo.recurrenceeditor.frequenciesNever|The text similar to 'Never' displayed in the recurrence editor."
            frequenciesNever='Never'

            i18n-frequenciesWeekly="kendo.recurrenceeditor.frequenciesWeekly|The text similar to 'Weekly' displayed in the recurrence editor."
            frequenciesWeekly='Weekly'

            i18n-frequenciesYearly="kendo.recurrenceeditor.frequenciesYearly|The text similar to 'Yearly' displayed in the recurrence editor."
            frequenciesYearly='Yearly'

            i18n-fffsetPositionsFirst="kendo.recurrenceeditor.fffsetPositionsFirst|The text similar to 'First' displayed in the recurrence editor."
            offsetPositionsFirst='First'

            i18n-offsetPositionsSecond="kendo.recurrenceeditor.offsetPositionsSecond|The text similar to 'Second' displayed in the recurrence editor."
            offsetPositionsSecond='Second'

            i18n-offsetPositionsThird="kendo.recurrenceeditor.offsetPositionsThird|The text similar to 'Third' displayed in the recurrence editor."
            offsetPositionsThird='Third'

            i18n-offsetPositionsFourth="kendo.recurrenceeditor.offsetPositionsFourth|The text similar to 'Fourth' displayed in the recurrence editor."
            offsetPositionsFourth='Fourth'

            i18n-offsetPositionsLast="kendo.recurrenceeditor.offsetPositionsLast|The text similar to 'Last' displayed in the recurrence editor."
            offsetPositionsLast='Last'

            i18n-weekdaysDay="kendo.recurrenceeditor.weekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysDay='Day'

            i18n-weekdaysWeekday="kendo.recurrenceeditor.weekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysWeekday='Weekday'

            i18n-weekdaysWeekendday="kendo.recurrenceeditor.weekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysWeekendday='Weekend Day'

            i18n-endAfter="kendo.recurrenceeditor.endAfter|The text similar to 'After' displayed in the recurrence editor."
            endAfter='After'

            i18n-endOccurrence="kendo.recurrenceeditor.endOccurrence|The text similar to 'occurrence(s)' displayed in the recurrence editor."
            endOccurrence='occurrence(s)'

            i18n-endLabel="kendo.recurrenceeditor.endLabel|The text similar to 'End' displayed in the recurrence editor."
            endLabel='End'

            i18n-endNever="kendo.recurrenceeditor.endNever|The text similar to 'Never' displayed in the recurrence editor."
            endNever='Never'

            i18n-endOn="kendo.recurrenceeditor.endOn|The text similar to 'On' displayed in the recurrence editor."
            endOn='On'
        >
        </ng-container>

        <kendo-recurrence-frequency-editor>
        </kendo-recurrence-frequency-editor>

        <div class='k-recur-view'>
            <kendo-recurrence-interval-editor *ngIf="currentFreq !== 'never'">
            </kendo-recurrence-interval-editor>

            <kendo-recurrence-weekday-rule-editor *ngIf="currentFreq === 'weekly'">
            </kendo-recurrence-weekday-rule-editor>

            <kendo-recurrence-monthly-yearly-editor *ngIf="currentFreq === 'monthly' || currentFreq === 'yearly'">
            </kendo-recurrence-monthly-yearly-editor>

            <kendo-recurrence-end-rule-editor *ngIf="currentFreq !== 'never'">
            </kendo-recurrence-end-rule-editor>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceEditorComponent.ctorParameters = () => [
    { type: RecurrenceService }
];
RecurrenceEditorComponent.propDecorators = {
    cssClass: [{ type: HostBinding, args: ['class.k-recurrence-editor',] }],
    start: [{ type: Input }],
    timezone: [{ type: Input }],
    valueChange: [{ type: Output }]
};

/**
 * @hidden
 */
class RecurrenceFrequencyEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
    }
    ngOnInit() {
        this.frequencies = this.recurrence.frequencies;
    }
    get selected() {
        return this.recurrence.frequency;
    }
    onClick(newFreq) {
        if (newFreq.value !== this.selected) {
            this.recurrence.setFrequency(newFreq.value);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onFrequencyClick() {
        const selected = this.weekDayButtons.toArray().find(r => r.selected);
        if (selected) {
            selected.focus();
        }
    }
}
RecurrenceFrequencyEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-frequency-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onFrequencyClick()">{{ textFor('repeat') }}</label>
        </div>
        <div class='k-edit-field'>
            <kendo-buttongroup [selection]="'single'">
                <button *ngFor='let freq of frequencies' kendoButton
                        [style.width.px]="100"
                        [togglable]="true"
                        [selected]="freq.value === selected"
                        (click)="onClick(freq)"
                >{{ freq.text }}</button>
            </kendo-buttongroup>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceFrequencyEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceFrequencyEditorComponent.propDecorators = {
    weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
};

/**
 * @hidden
 */
class EndRuleRadioButtonDirective {
    constructor(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'end';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    ngOnInit() {
        this.endRule = this.endRuleId.split('-').pop();
        this.renderer.setAttribute(this.elem, 'id', this.endRuleId);
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyChange) {
            this.destroyChange();
        }
    }
    onChange() {
        if (this.elem.checked) {
            this.reccurence.endRule = this.endRule;
            this.changeDetector.markForCheck();
        }
    }
    setCheckedState() {
        const isChecked = this.endRule === this.reccurence.endRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    }
    get elem() {
        return this.el.nativeElement;
    }
}
EndRuleRadioButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoRecurrenceEndRuleRadioButton]'
            },] },
];
/** @nocollapse */
EndRuleRadioButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: RecurrenceService },
    { type: ChangeDetectorRef }
];
EndRuleRadioButtonDirective.propDecorators = {
    type: [{ type: HostBinding, args: ['attr.type',] }],
    name: [{ type: HostBinding, args: ['attr.name',] }],
    radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
    endRuleId: [{ type: Input, args: ["kendoRecurrenceEndRuleRadioButton",] }]
};

/**
 * @hidden
 */
class RecurrenceEndRuleEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeChanges();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    setEndRule(endRule) {
        if (endRule === 'count') {
            this.recurrence.rrule.count = this.countValue;
        }
        else if (endRule === 'until') {
            this.recurrence.until = this.untilValue;
        }
    }
    get rrule() {
        return this.recurrence.rrule;
    }
    get isCountDisabled() {
        return this.recurrence.endRule !== 'count';
    }
    get isUntilDisabled() {
        return this.recurrence.endRule !== 'until';
    }
    onCountChange(value) {
        if (isPresent(value)) {
            this.recurrence.count = value;
        }
    }
    onCountBlur() {
        if (!isPresent(this.countValue)) {
            this.recurrence.count = this.countValue = 1;
        }
    }
    onUntilChange(value) {
        if (isPresent(value)) {
            this.recurrence.until = this.createUntil(value);
        }
    }
    onUntilBlur() {
        if (!isPresent(this.untilValue)) {
            this.recurrence.until = this.untilValue = this.createUntil(this.recurrence.start);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onEndLabelClick() {
        const selected = this.endRuleRadioButtons.toArray().find(r => r.elem.checked);
        if (selected) {
            selected.elem.focus();
        }
    }
    setInitialValues() {
        this.countValue = this.rrule.count || 1;
        const currentUntil = this.recurrence.until;
        const currentStart = this.recurrence.start;
        this.untilValue = isPresent(currentUntil) ? currentUntil : this.createUntil(currentStart);
    }
    subscribeChanges() {
        this.subscriptions = this.recurrence.endRuleChange.subscribe((endRule) => {
            this.setEndRule(endRule);
        });
        this.subscriptions.add(this.recurrence.frequencyChange.subscribe(() => {
            this.setInitialValues();
        }));
    }
    createUntil(until) {
        // Read the until date as UTC date parts to avoid interfering with the local time zone.
        const untilDate = toUTCDate(until);
        untilDate.setUTCDate(untilDate.getUTCDate() + 1);
        // Convert to the scheduler time zone.
        return ZonedDate.fromUTCDate(untilDate, this.recurrence.timezone).toLocalDate();
    }
}
RecurrenceEndRuleEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-end-rule-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onEndLabelClick()">{{ textFor('endLabel') }}</label>
        </div>
        <div class='k-edit-field'>
            <ul class='k-reset'>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-never'" />
                    <label class='k-radio-label' for='k-endrule-never'>{{ textFor('endNever') }}</label>
                </li>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-count'" />
                    <label class='k-radio-label' for='k-endrule-count'>{{ textFor('endAfter') }}</label>

                    <kendo-numerictextbox
                        [style.width.px]='70'
                        [autoCorrect]='true'
                        [decimals]='0'
                        [disabled]='isCountDisabled'
                        [format]="'#'"
                        [min]='1'
                        [(value)]='countValue'
                        (blur)="onCountBlur()"
                        (valueChange)='onCountChange($event)'>
                    </kendo-numerictextbox>
                    <span>{{ textFor('endOccurrence') }}</span>
                </li>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-until'" />
                    <label class='k-radio-label' for='k-endrule-until'>{{ textFor('endOn') }}</label>

                    <kendo-datepicker
                        [style.width.px]='150'
                        [disabled]='isUntilDisabled'
                        [(value)]='untilValue'
                        (blur)="onUntilBlur()"
                        (valueChange)='onUntilChange($event)'>
                    </kendo-datepicker>
                </li>
            </ul>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceEndRuleEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceEndRuleEditorComponent.propDecorators = {
    endRuleRadioButtons: [{ type: ViewChildren, args: [EndRuleRadioButtonDirective,] }]
};

/**
 * @hidden
 */
class RecurrenceIntervalEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.intervalValue = this.recurrence.rrule.interval || 1;
    }
    get currentFreq() {
        return this.recurrence.frequency;
    }
    onIntervalChange(newInterval) {
        if (isPresent(newInterval)) {
            this.recurrence.interval = newInterval;
        }
    }
    onIntervalBlur() {
        if (!isPresent(this.intervalValue)) {
            this.recurrence.interval = this.intervalValue = 1;
        }
    }
    textForRepeatEvery() {
        const freq = this.currentFreq;
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
    }
    textForFrequency() {
        const freq = this.currentFreq;
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
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
RecurrenceIntervalEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-interval-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="intervalNumeric.focus()">{{ textForRepeatEvery() }}</label>
        </div>

        <div class='k-edit-field'>
            <kendo-numerictextbox
                #intervalNumeric
                [style.width.px]='70'
                [min]='1'
                [decimals]='0'
                [format]="'#'"
                [autoCorrect]='true'
                [(value)]='intervalValue'
                (blur)="onIntervalBlur()"
                (valueChange)='onIntervalChange($event)'>
            </kendo-numerictextbox>

            <span>{{ textForFrequency() }}</span>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceIntervalEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];

/**
 * @hidden
 */
class RepeatOnRadioButtonDirective {
    constructor(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'day';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    ngOnInit() {
        this.renderer.setAttribute(this.elem, 'id', 'k-repeaton-' + this.repeatOnRule);
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyChange) {
            this.destroyChange();
        }
    }
    onChange() {
        if (this.elem.checked) {
            this.reccurence.repeatOnRule = this.repeatOnRule;
            this.changeDetector.markForCheck();
        }
    }
    setCheckedState() {
        const isChecked = this.repeatOnRule === this.reccurence.repeatOnRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    }
    get elem() {
        return this.el.nativeElement;
    }
}
RepeatOnRadioButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoRecurrenceRepeatOnRadioButton]'
            },] },
];
/** @nocollapse */
RepeatOnRadioButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: RecurrenceService },
    { type: ChangeDetectorRef }
];
RepeatOnRadioButtonDirective.propDecorators = {
    type: [{ type: HostBinding, args: ['attr.type',] }],
    name: [{ type: HostBinding, args: ['attr.name',] }],
    radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
    repeatOnRule: [{ type: Input, args: ["kendoRecurrenceRepeatOnRadioButton",] }]
};

/**
 * @hidden
 */
class RecurrenceMonthlyYearlyEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeEventHandlers();
    }
    setInitialValues() {
        this.extendedWeekDays = this.recurrence.extendedWeekDays;
        this.offsetPositions = this.recurrence.offsetPositions;
        this.currentOffset = this.defaultOffset;
        this.currentWeekDay = this.defaultWeekDay;
        if (this.currentFreq === 'yearly') {
            this.months = this.recurrence.months;
            this.currentMonthMonthDay = this.currentMonthWeekDay = this.recurrence.rrule.byMonth[0];
        }
    }
    subscribeEventHandlers() {
        this.subs = this.recurrence.repeatOnRuleChange.subscribe(this.onRepeatOnRuleChange.bind(this));
        this.subs.add(this.recurrence.frequencyChange.subscribe(this.onFrequencyChange.bind(this)));
    }
    onRepeatOnRuleChange(newRepeatOnRule) {
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
    }
    onFrequencyChange() {
        this.setInitialValues();
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    get monthDay() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byMonthDay) && rrule.byMonthDay.length > 0) {
            return rrule.byMonthDay[0];
        }
        else if (isPresent(this.currentMonthDay)) {
            return this.currentMonthDay;
        }
        else {
            return this.recurrence.start.getDate();
        }
    }
    get weekDay() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
    }
    get offset() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
    }
    onMonthChange(month, repeatOnRule) {
        if (repeatOnRule === 'monthday') {
            this.currentMonthMonthDay = month;
        }
        else {
            this.currentMonthWeekDay = month;
        }
        this.recurrence.setMonths([month]);
    }
    onMonthDayChange(monthDay) {
        this.currentMonthDay = monthDay;
        this.recurrence.monthDays = [monthDay];
    }
    onOffsetPositionChange(offset) {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
    }
    onWeekDayChange(weekDay) {
        let weekDays;
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
    }
    isDisabled(repeatOn) {
        return this.recurrence.repeatOnRule !== repeatOn;
    }
    get currentFreq() {
        return this.recurrence.frequency;
    }
    get defaultOffset() {
        return 1;
    }
    get defaultWeekDay() {
        return this.recurrence.start.getDay();
    }
    weekDayRuleFromString(weekDay) {
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
    }
    textForRepeatOn() {
        const freq = this.currentFreq;
        switch (freq) {
            case 'monthly':
                return this.textFor('monthlyRepeatOn');
            case 'yearly':
                return this.textFor('yearlyRepeatOn');
            default:
                break;
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onRepeatOnLabelClick() {
        const selected = this.repeatOnRadioButtons.toArray().find(r => r.elem.checked);
        if (selected) {
            selected.elem.focus();
        }
    }
}
RecurrenceMonthlyYearlyEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-monthly-yearly-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onRepeatOnLabelClick()">{{ textForRepeatOn() }}</label>
        </div>
        <div class='k-edit-field'>
            <ul class='k-reset' [style.width.px]='650'>
                <li>
                    <input [kendoRecurrenceRepeatOnRadioButton]="'monthday'" />

                    <label class='k-radio-label' for='k-repeaton-monthday'>
                        <ng-template [ngIf]="currentFreq === 'monthly'">
                            {{ textFor('monthlyDay') }}
                        </ng-template>
                    </label>

                    <ng-template [ngIf]="currentFreq === 'yearly'">
                        <kendo-dropdownlist
                            [data]='months'
                            textField='text'
                            valueField='value'
                            [value]='currentMonthMonthDay'
                            [valuePrimitive]='true'
                            (valueChange)="onMonthChange($event, 'monthday')"
                            [disabled]="isDisabled('monthday')">
                        </kendo-dropdownlist>
                    </ng-template>

                    <kendo-numerictextbox
                        [style.width.px]='70'
                        [min]='1'
                        [max]='31'
                        [decimals]='0'
                        [format]="'#'"
                        [autoCorrect]='true'
                        [value]='monthDay'
                        (valueChange)='onMonthDayChange($event)'
                        [disabled]="isDisabled('monthday')">
                    </kendo-numerictextbox>
                </li>
                <li>
                    <input [kendoRecurrenceRepeatOnRadioButton]="'weekday'" />
                    <label class='k-radio-label' for='k-repeaton-weekday'></label>

                    <kendo-dropdownlist
                        [data]='offsetPositions'
                        textField='text'
                        valueField='value'
                        [value]='offset'
                        [valuePrimitive]='true'
                        (valueChange)='onOffsetPositionChange($event)'
                        [disabled]="isDisabled('weekday')">
                    </kendo-dropdownlist>

                    <kendo-dropdownlist
                        [data]="extendedWeekDays"
                        textField='text'
                        valueField='value'
                        [value]='weekDay'
                        [valuePrimitive]='true'
                        (valueChange)='onWeekDayChange($event)'
                        [disabled]="isDisabled('weekday')">
                    </kendo-dropdownlist>

                    <ng-template [ngIf]="currentFreq === 'yearly'">
                        <span>{{ textFor('yearlyOf') }}</span>

                        <kendo-dropdownlist
                            [data]='months'
                            textField='text'
                            valueField='value'
                            [value]='currentMonthWeekDay'
                            [valuePrimitive]='true'
                            (valueChange)="onMonthChange($event, 'weekday')"
                            [disabled]="isDisabled('weekday')">
                        </kendo-dropdownlist>
                    </ng-template>
                </li>
            </ul>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceMonthlyYearlyEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceMonthlyYearlyEditorComponent.propDecorators = {
    repeatOnRadioButtons: [{ type: ViewChildren, args: [RepeatOnRadioButtonDirective,] }]
};

/**
 * @hidden
 */
class RecurrenceWeekdayRuleEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.selected = [];
        this.weekDays = this.recurrence.weekDays;
        this.setSelectedDays();
    }
    setSelectedDays() {
        for (let i = 0; i < 7; i++) {
            this.selected[i] = false;
        }
        if (isPresent(this.rrule.byWeekDay)) {
            this.rrule.byWeekDay.forEach((rule) => {
                this.selected[rule.day] = true;
            });
        }
    }
    onSelectedChange(isSelected, day) {
        this.selected[day] = isSelected;
        this.recurrence.setWeekDays(this.serializeToWeekDayRuleArray(this.selected));
    }
    isSelected(day) {
        return this.selected[day.value];
    }
    serializeToWeekDayRuleArray(arr) {
        let selectedValues = [];
        arr.forEach((isSelected, idx) => {
            if (isSelected) {
                selectedValues.push({ day: idx, offset: 0 });
            }
        });
        return selectedValues.length > 0 ? selectedValues : null;
    }
    get rrule() {
        return this.recurrence.rrule;
    }
    capitalize(day) {
        return capitalize(day);
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onWeeklyRepeatOnClick() {
        const selected = this.weekDayButtons.toArray().find(r => r.selected);
        if (selected) {
            selected.focus();
        }
    }
}
RecurrenceWeekdayRuleEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-weekday-rule-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onWeeklyRepeatOnClick()">{{ textFor('weeklyRepeatOn') }}</label>
        </div>
        <div class='k-edit-field'>
            <kendo-buttongroup [selection]="'multiple'">
                <button *ngFor='let day of weekDays' kendoButton
                        [style.width.px]="75"
                        [toggleable]="true"
                        [selected]="isSelected(day)"
                        (selectedChange)="onSelectedChange($event, day.value)"
                >{{ capitalize(day.text) }}</button>
            </kendo-buttongroup>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceWeekdayRuleEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceWeekdayRuleEditorComponent.propDecorators = {
    weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
};

/**
 * @hidden
 */
class Messages$1 extends ComponentMessages {
}
Messages$1.propDecorators = {
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

/**
 * @hidden
 * Custom component messages override default component messages.
 */
class RecurrenceEditorCustomMessagesComponent extends Messages$1 {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
RecurrenceEditorCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages$1,
                        useExisting: forwardRef(() => RecurrenceEditorCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-recurrence-editor-messages',
                template: ``
            },] },
];
/** @nocollapse */
RecurrenceEditorCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class RecurrenceEditorLocalizedMessagesDirective extends Messages$1 {
    constructor(service) {
        super();
        this.service = service;
    }
}
RecurrenceEditorLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages$1,
                        useExisting: forwardRef(() => RecurrenceEditorLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoRecurrenceEditorLocalizedMessages]'
            },] },
];
/** @nocollapse */
RecurrenceEditorLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
const TIME_ZONE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeZoneEditorComponent)
};
/**
 * Represents the Kendo UI TimeZone Editor component for Angular.
 * `TimeZoneEditorComponent` displays the currently loaded timezones.
 * Used for editing the `start` and `end` timezones of the `SchedulerEvent` objects.
 */
class TimeZoneEditorComponent {
    constructor() {
        /**
         * Specifies the width of the ComboBox which contains the names of the timezones.
         */
        this.width = 260;
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.tzNames = timezoneNames();
        this.tzSource = this.tzNames.slice();
    }
    /**
     * @hidden
     */
    onTimeZoneChange(tzName) {
        this.tz = tzName;
        this.onChangeCallback(this.tz);
        this.valueChange.emit(tzName);
    }
    /**
     * @hidden
     */
    onTimeZoneFilterChange(value) {
        this.tzSource = this.tzNames.filter((tz) => tz.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    /**
     * @hidden
     */
    writeValue(value) {
        if (typeof value === 'string' && this.tzNames.indexOf(value) >= 0) {
            this.tz = value;
        }
    }
    /**
     * @hidden
     */
    focus() {
        this.tzComboBox.focus();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
TimeZoneEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    TIME_ZONE_VALUE_ACCESSOR
                ],
                selector: 'kendo-timezone-editor',
                template: `
        <kendo-combobox
            #tzcombobox
            [style.width.px]="width"
            [allowCustom]="false"
            [data]="tzSource"
            [filterable]="true"
            [suggest]="true"
            [value]="tz"
            (filterChange)="onTimeZoneFilterChange($event)"
            (valueChange)="onTimeZoneChange($event)">
        </kendo-combobox>
    `
            },] },
];
/** @nocollapse */
TimeZoneEditorComponent.ctorParameters = () => [];
TimeZoneEditorComponent.propDecorators = {
    tzComboBox: [{ type: ViewChild, args: ['tzcombobox',] }],
    width: [{ type: Input }],
    valueChange: [{ type: Output }]
};

const isContentWrapper = element => hasClasses(element, 'k-scheduler-content');
/**
 * @hidden
 */
class ShortcutsDirective {
    constructor(scheduler, domEvents, focusService, zone, changeDetector, viewState, dialogsService) {
        this.scheduler = scheduler;
        this.domEvents = domEvents;
        this.focusService = focusService;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.viewState = viewState;
        this.dialogsService = dialogsService;
        this.shortcuts = [{
                match: e => e.keyCode === Keys.KeyC && noModifiers(e),
                action: e => {
                    const scheduler = this.scheduler;
                    const hours = new Date().getHours();
                    const selected = scheduler.selectedDate;
                    const start = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours + 1);
                    const end = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours + 2);
                    let firstResource;
                    if (scheduler.group) {
                        const resources = scheduler.resources || [];
                        const group = scheduler.group || {};
                        const grouped = groupResources(group, resources);
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
                match: e => e.keyCode >= Keys.Digit1 && e.keyCode <= Keys.Digit9 && withModifiers(e, Modifiers.AltKey),
                action: e => {
                    const scheduler = this.scheduler;
                    const viewIndex = e.keyCode - Keys.Digit0 - 1;
                    const views = scheduler.views.toArray();
                    const view = views[viewIndex];
                    if (view) {
                        this.zone.run(() => {
                            const prevented = scheduler.onNavigationAction({ type: 'view-change', view });
                            if (!prevented) {
                                this.changeDetector.markForCheck();
                                this.focusWait();
                            }
                        });
                    }
                }
            }, {
                match: e => e.keyCode === Keys.KeyT && noModifiers(e),
                action: () => {
                    this.zone.run(() => {
                        this.scheduler.onNavigationAction({ type: 'today' });
                        this.focusWait();
                    });
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: (e) => (e.keyCode === Keys.ArrowLeft || e.keyCode === Keys.ArrowRight) && withModifiers(e, Modifiers.ShiftKey),
                action: (e) => {
                    // tslint:disable-next-line:deprecation
                    const type = e.keyCode === Keys.ArrowLeft ? 'prev' : 'next';
                    this.zone.run(() => {
                        this.scheduler.onNavigationAction({ type });
                        this.focusWait();
                    });
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: e => (e.keyCode === Keys.ArrowUp || e.keyCode === Keys.ArrowLeft) && noModifiers(e) && !isContentWrapper(e.target),
                action: e => {
                    const prevented = this.scheduler.onNavigationAction({ type: 'focus-prev' });
                    if (!prevented) {
                        this.focusService.focusNext({ offset: -1 });
                        e.preventDefault();
                    }
                }
            }, {
                // tslint:disable-next-line:deprecation
                match: e => (e.keyCode === Keys.ArrowDown || e.keyCode === Keys.ArrowRight) && noModifiers(e) && !isContentWrapper(e.target),
                action: e => {
                    const prevented = this.scheduler.onNavigationAction({ type: 'focus-next' });
                    if (!prevented) {
                        this.focusService.focusNext({ offset: 1 });
                        e.preventDefault();
                    }
                }
            }];
        this.taskShortcuts = [{
                match: e => (e.keyCode === Keys.Delete || e.keyCode === Keys.Backspace) && noModifiers(e),
                action: (e, event) => {
                    this.viewState.emitEvent('remove', { event: event, dataItem: event.dataItem });
                    e.preventDefault();
                }
            }, {
                match: e => e.keyCode === Keys.Enter && noModifiers(e),
                action: (e, event) => {
                    this.viewState.emitEvent('eventDblClick', { type: 'dblclick', event: event, originalEvent: e });
                    e.preventDefault();
                }
            }];
        this.subs = new Subscription();
        this.subs.add(this.domEvents.keydown.subscribe(e => this.onKeydown(e)));
        this.subs.add(this.scheduler.eventKeydown.subscribe(e => this.onEventKeydown(e)));
    }
    onKeydown(e) {
        const match = this.shortcuts.find(shortcut => shortcut.match(e));
        if (match && !this.dialogsService.isOpen) {
            match.action(e);
        }
    }
    onEventKeydown(e) {
        const match = this.taskShortcuts.find(shortcut => shortcut.match(e.originalEvent));
        if (match && !this.dialogsService.isOpen) {
            match.action(e.originalEvent, e.event);
        }
    }
    focusWait() {
        this.viewState.layoutEnd.pipe(take(1)).subscribe(() => this.focusService.focus());
    }
}
ShortcutsDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'kendo-scheduler'
            },] },
];
/** @nocollapse */
ShortcutsDirective.ctorParameters = () => [
    { type: SchedulerComponent },
    { type: DomEventsService },
    { type: FocusService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ViewStateService },
    { type: DialogsService }
];

const TEMPLATES = [
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
const declarations = [
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
    LoadingComponent,
    ...TEMPLATES
];
const publicDirectives$1 = [
    AgendaViewComponent,
    MonthViewModule,
    MultiDayViewModule,
    ReactiveEditingDirective,
    TimelineViewModule,
    publicDirectives,
    ...declarations
];
const importedKendoModules = [
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
class SchedulerModule {
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
                    TimelineViewModule,
                    ...importedKendoModules
                ],
                declarations: declarations,
                exports: publicDirectives$1,
                providers: [{
                        provide: IntlService,
                        useClass: CldrIntlService
                    }]
            },] },
];

const DATE_FORMATS = [
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
class BaseEditService {
    /**
     * Initializes the base edit service.
     *
     * @param fields - A field map that will be used for reading and modifying model objects. Defaults to the [`SchedulerEvent`]({% slug api_scheduler_schedulerevent %}) fields.
     */
    constructor(fields) {
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
        this.fields = Object.assign({}, defaultModelFields, fields);
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
    create(event) {
        this.logCreate(event);
        this.saveChanges();
    }
    /*
     * Creates an exception to a recurring series.
     *
     * The `createException` method performs the following operations:
     * * Adds the start date of the event to the `recurrenceExceptions` of the master event (recurrence head).
     * * Creates a new event that stores the recurrence exception itself.
     */
    createException(event, value) {
        const exception = this.buildException(value);
        this.logRemoveOccurrence(event);
        this.logCreate(exception);
        this.saveChanges();
    }
    update(event, value) {
        this.assignValues(event, value);
        this.logUpdate(event);
        this.saveChanges();
    }
    remove(event) {
        this.logRemove(event);
        this.saveChanges();
    }
    removeSeries(event) {
        const id = this.getId(event);
        const recurrenceId = this.getRecurrenceId(event);
        const isHead = this.isRecurrenceHead(event);
        this.removeItemAndExceptions(isHead ? id : recurrenceId);
        this.saveChanges();
    }
    removeOccurrence(event) {
        this.logRemoveOccurrence(event);
        this.saveChanges();
    }
    findRecurrenceMaster(event) {
        const id = this.getId(event);
        const recurrenceId = this.getRecurrenceId(event);
        const headId = this.isRecurrenceHead(event) ? id : recurrenceId;
        const index = this.itemIndex(headId, this.data);
        return this.data[index];
    }
    isRecurring(event) {
        return isRecurring(event, this.fields);
    }
    isException(event) {
        return isException(event, this.fields);
    }
    /**
     * Returns a Boolean value which indicates if the event is new.
     * If the `ID` field is defined, the default implementation returns `true`.
     * Can be overridden to implement different conditions.
     *
     * @param event - The event that will be checked.
     */
    isNew(event) {
        const id = this.getId(event);
        return !isPresent(id);
    }
    /**
     * Returns the next `ID` that will be used for new events.
     * The default implementation returns `undefined`.
     */
    nextId() {
        return undefined;
    }
    /**
     * Copies values to the target model instance.
     * To copy the top-level fields, the base implementation uses
     * [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
     * To copy nested fields, override `assignValues` and handle the model-specific cases.
     *
     * @param target - The target object that will receive the field values.
     * @param source - The source object from which the fields will be read.
     */
    assignValues(target, source) {
        cloneTo(source, target);
    }
    /**
     * Clones an existing model object.
     * To copy the top-level model fields, the base creates an empty object and calls [`assignValues`](#toc-assignvalues).
     * To create models of the correct type, override `cloneEvent`.
     *
     * @param event - The model instance to copy.
     * @returns TEvent - The new model instance.
     */
    cloneEvent(event) {
        const result = {};
        this.assignValues(result, event);
        return result;
    }
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
    parseExceptions(value) {
        if (!isPresent(value) || value === '') {
            return [];
        }
        return value
            .split(';')
            .map(ex => parseDate(ex, DATE_FORMATS) || undefined);
    }
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
    serializeExceptions(exceptions) {
        if (!exceptions || exceptions.length === 0) {
            return '';
        }
        return exceptions.map(date => formatDate(toLocalDate(date), 'yyyyMMddTHHmmss') + 'Z').join(';');
    }
    reset() {
        this.data = [];
        this.deletedItems = [];
        this.updatedItems = [];
        this.createdItems = [];
    }
    itemIndex(id, items) {
        for (let idx = 0; idx < items.length; idx++) {
            if (this.getId(items[idx]) === id) {
                return idx;
            }
        }
        return -1;
    }
    buildException(item) {
        const fields = this.fields;
        const head = this.findRecurrenceMaster(item);
        const copy = this.cloneEvent(item);
        assignField(copy, head, fields.id);
        this.setId(copy, this.nextId());
        this.setRecurrenceRule(copy, undefined);
        this.setRecurrenceId(copy, this.getId(head));
        return copy;
    }
    isRecurrenceHead(item) {
        const id = this.getId(item);
        const recurrenceRule = this.getRecurrenceRule(item);
        return !!(id && recurrenceRule);
    }
    logCreate(item) {
        this.data = [...this.data, item];
        this.source.next(this.data);
        this.createdItems.push(item);
    }
    logUpdate(item) {
        const id = this.getId(item);
        if (!this.isNew(item)) {
            const index = this.itemIndex(id, this.updatedItems);
            if (index !== -1) {
                this.updatedItems.splice(index, 1, item);
            }
            else {
                this.updatedItems.push(item);
            }
        }
        else {
            const index = this.createdItems.indexOf(item);
            this.createdItems.splice(index, 1, item);
        }
    }
    logRemove(item) {
        const id = this.getId(item);
        let index = this.itemIndex(id, this.data);
        this.data = this.data.filter((_, i) => i !== index);
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
    }
    logRemoveOccurrence(event) {
        const head = this.findRecurrenceMaster(event);
        const exceptionDate = this.getStart(event);
        const currentExceptions = this.getRecurrenceExceptions(head) || [];
        this.setRecurrenceExceptions(head, [...currentExceptions, exceptionDate]);
        this.logUpdate(head);
    }
    removeItemAndExceptions(itemId) {
        this.deletedItems = this.deletedItems.concat(this.data.filter(ev => this.getRecurrenceId(ev) === itemId || this.getId(ev) === itemId));
    }
    hasChanges() {
        return this.deletedItems.length + this.updatedItems.length + this.createdItems.length > 0;
    }
    saveChanges() {
        if (!this.hasChanges()) {
            return;
        }
        this.save(this.createdItems, this.updatedItems, this.deletedItems);
        this.reset();
    }
}

const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
const createDiv = (className) => createElement('div', className);
/**
 * Configures the settings for the export of Scheduler in PDF ([see example]({% slug pdfexport_scheduler %})).
 */
class PDFComponent {
    constructor(pdfService, ngZone) {
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
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get drawOptions() {
        return {
            _destructive: true,
            avoidLinks: this.avoidLinks,
            margin: this.margin,
            scale: this.scale
        };
    }
    get pdfOptions() {
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
    }
    get saveOptions() {
        return {
            forceProxy: this.forceProxy,
            proxyData: this.proxyData,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        };
    }
    createElement(args) {
        this.ngZone.runOutsideAngular(() => {
            const container = this.container = createDiv();
            container.style.top = container.style.left = '-10000px';
            container.style.position = 'absolute';
            const wrapper = createDiv('k-widget k-scheduler k-floatwrap');
            wrapper.style.position = 'relative';
            wrapper.appendChild(args.element);
            container.appendChild(wrapper);
            document.body.appendChild(container);
            this.save(wrapper);
        });
    }
    save(element) {
        this.drawElement(element, this.drawOptions)
            .then(this.exportGroup)
            .then(this.saveDataUri)
            .then(this.done, this.done);
    }
    drawElement(element, options) {
        return drawDOM(element, options);
    }
    exportGroup(group) {
        return exportPDF(group, this.pdfOptions);
    }
    saveDataUri(dataUri) {
        saveAs(dataUri, this.fileName, this.saveOptions);
    }
    done() {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        this.pdfService.done.emit();
    }
}
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scheduler-pdf',
                template: ''
            },] },
];
/** @nocollapse */
PDFComponent.ctorParameters = () => [
    { type: PDFService },
    { type: NgZone }
];
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
class PDFCommandDirective extends Button {
    constructor(pdfService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.pdfService = pdfService;
    }
    /**
     * @hidden
     */
    click(e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    }
    ngOnInit() {
        this.icon = 'pdf';
    }
}
PDFCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerPDFCommand]'
            },] },
];
/** @nocollapse */
PDFCommandDirective.ctorParameters = () => [
    { type: PDFService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
PDFCommandDirective.propDecorators = {
    click: [{ type: HostListener, args: ['click', ['$event'],] }]
};

const declarations$1 = [
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
class PDFModule {
}
PDFModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$1],
                exports: [declarations$1]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { DataBindingDirective, EditingDirectiveBase, ReactiveEditingDirective, SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR, SchedulerDateTimePickerComponent, DialogsService, EditDialogTemplateDirective, EditDialogComponent, EditService, LocalDataChangesService, EndRuleRadioButtonDirective, RecurrenceEditorCustomMessagesComponent, RecurrenceEditorLocalizedMessagesDirective, Messages$1 as Messages, RecurrenceLocalizationService, RECURRENCE_VALUE_ACCESSOR, RecurrenceEndRuleEditorComponent, RecurrenceFrequencyEditorComponent, RecurrenceIntervalEditorComponent, RecurrenceMonthlyYearlyEditorComponent, RecurrenceWeekdayRuleEditorComponent, RecurrenceService, RepeatOnRadioButtonDirective, ResourceEditorBase, MULTIPLE_RESOURCE_VALUE_ACCESSOR, MultipleResourceEditorComponent, SINGLE_RESOURCE_VALUE_ACCESSOR, SingleResourceEditorComponent, TIME_ZONE_VALUE_ACCESSOR, TimeZoneEditorComponent, CreateEvent, PreventableEvent$1 as PreventableEvent, LoadingComponent, SchedulerCustomMessagesComponent, LocalizedMessagesDirective, Messages as Messages$1, SchedulerLocalizationService, FocusService, ShortcutsDirective, ToolbarNavigationComponent, ToolbarTemplateDirective, ToolbarComponent, ToolbarModule, publicDirectives, ToolbarViewSelectorComponent, AgendaHeaderItemComponent, AgendaHeaderComponent, AgendaTaskItemComponent, AgendaViewInternalComponent, AgendaListComponent, AgendaViewModule, BaseView, ConfigurationViewBase, DomEventsService, HintContainerComponent, RepeatPipe, ResizeHintComponent, ResourceIteratorPipe, ViewFooterComponent, ViewsSharedModule, WorkHoursFooterDirective, DayTimeSlotService, DayTimeViewBase, DayTimeViewItemComponent, DayTimeViewComponent, DayTimeModule, DaySlotDirective, TimeSlotDirective, MonthSlotDirective, MonthSlotService, MonthViewItemComponent, MonthViewRendererComponent, MonthViewComponent, MonthViewModule, MultiDayViewBase, MultiDayViewRendererComponent, MultiDayViewComponent, MultiDayViewModule, WorkWeekViewComponent, SchedulerViewDirective, AgendaDateTemplateDirective, AgendaTimeTemplateDirective, AllDayEventTemplateDirective, AllDaySlotTemplateDirective, DateHeaderTemplateDirective, EventTemplateDirective, GroupHeaderTemplateDirective, MajorTimeHeaderTemplateDirective, MinorTimeHeaderTemplateDirective, MonthDaySlotTemplateDirective, TimeSlotTemplateDirective, TimelineBase, TimelineMonthViewComponent, TimelineMultiDayViewComponent, TimelineViewComponent, TimelineViewModule, TimelineWeekViewComponent, BaseSlotDirective, BaseSlotService, BaseViewItem, SchedulerComponent, SchedulerModule, ViewContextService, ViewStateService, ToolbarService, AgendaViewComponent, DayViewComponent, WeekViewComponent, RecurrenceEditorComponent, BaseEditService, PDFModule, PDFComponent, PDFService, PDFCommandDirective, PDFExportEvent, FocusableDirective, SharedModule, SchedulerView, DateChangeEvent, NavigateEvent, SlotClickEvent, EventClickEvent, EventKeydownEvent, VIEW_EVENT_MAP, CancelEvent, EditEventBase, RemoveEvent, SaveEvent, ResizeStartEvent, ResizeEvent, ResizeEndEvent, DragStartEvent, DragEvent, DragEndEvent, EditEvent, AddEvent };
