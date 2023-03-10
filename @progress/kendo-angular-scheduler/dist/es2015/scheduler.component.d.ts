import { AfterContentInit, EventEmitter, NgZone, OnDestroy, OnInit, QueryList, ViewContainerRef, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
import { Day } from '@progress/kendo-date-math';
import { Observable } from 'rxjs';
import { DateChangeEvent, NavigateEvent, SlotClickEvent, EventClickEvent } from './events';
import { ToolbarTemplateDirective } from './toolbar/toolbar-template.directive';
import { DateRange, Group, NavigationAction, Resource, SchedulerModelFields, SchedulerView, EditMode, CrudOperation, EditableSettings, CurrentTimeSettings, SlotClassArgs, EventStyleArgs, SchedulerSlot } from './types';
import { AgendaDateTemplateDirective } from './views/templates/agenda-date-template.directive';
import { AgendaTimeTemplateDirective } from './views/templates/agenda-time-template.directive';
import { AllDayEventTemplateDirective } from './views/templates/all-day-event-template.directive';
import { AllDaySlotTemplateDirective } from './views/templates/all-day-slot-template.directive';
import { DateHeaderTemplateDirective } from './views/templates/date-header-template.directive';
import { EventTemplateDirective } from './views/templates/event-template.directive';
import { GroupHeaderTemplateDirective } from './views/templates/group-header-template.directive';
import { MajorTimeHeaderTemplateDirective } from './views/templates/major-time-header-template.directive';
import { MinorTimeHeaderTemplateDirective } from './views/templates/minor-time-header-template.directive';
import { MonthDaySlotTemplateDirective } from './views/templates/month-day-slot-template.directive';
import { TimeSlotTemplateDirective } from './views/templates/time-slot-template.directive';
import { ViewContextService } from './views/view-context.service';
import { ViewStateService } from './views/view-state.service';
import { EditService } from './editing/edit.service';
import { EditDialogTemplateDirective } from './editing/edit-dialog-template.directive';
import { CancelEvent, SaveEvent, RemoveEvent, ResizeStartEvent, ResizeEvent, ResizeEndEvent, DragStartEvent, DragEvent, DragEndEvent } from './events';
import { FormGroup } from '@angular/forms';
import { DialogsService } from './editing/dialogs.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { EditEventArgs } from './types/edit-event-args.interface';
import { PDFService } from './pdf/pdf.service';
import { PDFExportEvent } from './pdf/pdf-export-event';
import { LoadingComponent } from './loading.component';
import { FocusService, FocusPosition } from './navigation';
import { DomEventsService } from './views/common/dom-events.service';
import { CreateEvent } from './events/create-event';
import { SchedulerEvent } from './types/scheduler-event';
import { EventKeydownEvent } from './events/event-keydown-event';
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
export declare class SchedulerComponent implements AfterContentInit, OnDestroy, OnInit {
    wrapper: ElementRef;
    private viewContext;
    private viewState;
    private editService;
    private dialogsService;
    private intlService;
    private changeDetector;
    private zone;
    private pdfService;
    private localization;
    private domEvents;
    private renderer;
    private focusService;
    hostClasses: boolean;
    rtl: boolean;
    readonly dir: string;
    /**
     * The index of the currently selected view.
     *
     * By default, the selected view index is `0` and
     * indicates that the first declared view is visible.
     */
    selectedViewIndex: number;
    /**
     * Specifies if the Scheduler is editable.
     */
    editable: boolean | EditableSettings;
    /**
     * The minimum date that can be selected by using the navigation of the Scheduler.
     */
    min: Date;
    /**
     * The maximum date that can be selected by using the navigation of the Scheduler.
     */
    max: Date;
    /**
     * The height of the events in the **Month** and **Timeline** views, and the height of the **All day** events in the **Day** and **Week** views.
     */
    eventHeight: number;
    /**
     * Specifies the columns width. Applicable for the **Timeline** views.
     */
    columnWidth: number;
    /**
     * If set to `true`, the view will be initially shown in the business-hours mode.
     * By default, the view is displayed in the full-day mode. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    showWorkHours: boolean;
    /**
     * The start time of the view. The Scheduler displays events which start after the start time.
     * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    startTime: string;
    /**
     * The end time of the view. The Scheduler displays events which end before the end time.
     * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    endTime: string;
    /**
     * The start time of the view when `showWorkHours` is set to `true`.
     * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    workDayStart: string;
    /**
     * The end time of the view when `showWorkHours` is set to `true`.
     * Accepts string values in the `HH:mm` format. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    workDayEnd: string;
    /**
     * The start of the work week. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    workWeekStart: Day;
    /**
     * The end of the work week. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    workWeekEnd: Day;
    /**
     * The duration (in minutes) of the time slots. Applicable for the day, week and timeline views.
     */
    slotDuration: number;
    /**
     * The number of divisions of the time slots. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    slotDivisions: number;
    /**
     * A numeric value between 0 and 1 that specifies what percentage of the slot will be filled by the events.
     * Applicable for the **Day** and **Week** views.
     * Defaults to `0.9` (90% fill).
     */
    slotFill: number;
    /**
     * The time to which the view will initially be scrolled.
     * Accepts string values in the `HH:mm` format or a JavaScript `Date`. Applicable for the **Day**, **Week**, and **Timeline** views.
     */
    scrollTime: string | Date;
    /**
     * Specifies the groups of the Scheduler.
     */
    group: Group;
    /**
     * Specifies the resources of the Scheduler.
     */
    resources: Resource[];
    /**
     * Specifies if the Scheduler will display a loading indicator.
     */
    loading: boolean;
    /**
     * Specifies the id of the timezone that will be displayed in the Scheduler.
     * For example, `Europe/Sofia`.
     * Defaults to `Etc/UTC`.
     */
    timezone: string;
    /**
     * The currently selected view.
     */
    selectedView: SchedulerView;
    /**
     * An array of event instances which will be shown by the Scheduler.
     */
    events: any[];
    /**
     * The currently selected date of the Scheduler.
     * Determines the period which is displayed.
     */
    selectedDate: Date;
    /**
     * The names of the model fields from which the Scheduler will read its data
     * ([see example]({% slug databinding_scheduler %}#toc-binding-to-models)).
     */
    modelFields: SchedulerModelFields;
    /**
     * Specifies the Scheduler current time marker settings.
     */
    currentTimeMarker: boolean | CurrentTimeSettings;
    /**
     * Defines a function that is executed for every slot in the view.
     * The function returns a value which is supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     * import { SlotClassArgs } from '@progress/kendo-angular-scheduler';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *      .evening {
     *        background-color: steelblue;
     *      }
     *    `],
     *    template: `
     *        <kendo-scheduler [slotClass]="getSlotClass"
     *                         style="height: 600px">
     *            <kendo-scheduler-day-view>
     *            </kendo-scheduler-day-view>
     *            <kendo-scheduler-week-view>
     *            </kendo-scheduler-week-view>
     *        </kendo-scheduler>
     *    `
     * })
     * export class AppComponent {
     *   // Use an arrow function to capture the 'this' execution context of the class.
     *   public getSlotClass = (args: SlotClassArgs) => {
     *     const hour = args.start.getHours();
     *
     *     return {
     *       evening: !args.isAllDay && (hour < 6 || hour > 19)
     *     };
     *   }
     * }
     * ```
     */
    slotClass: (args: SlotClassArgs) => any;
    /**
     * Defines a function that is executed for every event in the view.
     * The function returns a value which is supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     * import { EventStyleArgs, SchedulerEvent } from '@progress/kendo-angular-scheduler';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *      .morning.k-event {
     *        background-color: steelblue;
     *      }
     *    `],
     *    template: `
     *        <kendo-scheduler [selectedDate]="selectedDate"
     *                         [kendoSchedulerBinding]="events"
     *                         [eventClass]="getEventClass"
     *                         style="height: 600px">
     *            <kendo-scheduler-day-view>
     *            </kendo-scheduler-day-view>
     *            <kendo-scheduler-week-view>
     *            </kendo-scheduler-week-view>
     *        </kendo-scheduler>
     *    `
     * })
     * export class AppComponent {
     *   public selectedDate: Date = new Date('2018-10-22T00:00:00');
     *   public events: SchedulerEvent[] = [{
     *       id: 1,
     *       title: 'Breakfast',
     *       start: new Date('2018-10-22T09:00:00'),
     *       end: new Date('2018-10-22T09:30:00'),
     *       type: 'morning'
     *   }];
     *   // Use an arrow function to capture the 'this' execution context of the class.
     *   public getEventClass = (args: EventStyleArgs) => {
     *     return args.event.dataItem.type;
     *   }
     * }
     * ```
     */
    eventClass: (args: EventStyleArgs) => any;
    /**
     * Defines a function that is executed for every event in the view.
     * The function returns a value which is supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     * @example
     * ```ts
     * import { Component } from '@angular/core';
     * import { EventStyleArgs, SchedulerEvent } from '@progress/kendo-angular-scheduler';
     *
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-scheduler [selectedDate]="selectedDate"
     *                         [kendoSchedulerBinding]="events"
     *                         [eventStyles]="getEventStyles"
     *                         style="height: 600px">
     *            <kendo-scheduler-day-view>
     *            </kendo-scheduler-day-view>
     *            <kendo-scheduler-week-view>
     *            </kendo-scheduler-week-view>
     *        </kendo-scheduler>
     *    `
     * })
     * export class AppComponent {
     *   public selectedDate: Date = new Date('2018-10-22T00:00:00');
     *   public events: SchedulerEvent[] = [{
     *       id: 1,
     *       title: 'Breakfast',
     *       start: new Date('2018-10-22T09:00:00'),
     *       end: new Date('2018-10-22T09:30:00'),
     *       color: 'steelblue'
     *   }];
     *   // Use an arrow function to capture the 'this' execution context of the class.
     *   public getEventStyles = (args: EventStyleArgs) => {
     *     return { backgroundColor: args.event.dataItem.color };
     *   }
     * }
     * ```
     */
    eventStyles: (args: EventStyleArgs) => any;
    /**
     * @hidden
     */
    selectedViewIndexChange: EventEmitter<number>;
    /**
     * Fires when the Scheduler is about to execute a navigation action
     * (a view, date, or focus change).
     */
    navigate: EventEmitter<NavigateEvent>;
    /**
     * Fires when the date range that is displayed in the Scheduler changes.
     */
    dateChange: EventEmitter<DateChangeEvent>;
    /**
     * Fires when a Scheduler view slot is clicked.
     */
    slotClick: EventEmitter<SlotClickEvent>;
    /**
     * Fires when a Scheduler view slot is double-clicked.
     */
    slotDblClick: EventEmitter<SlotClickEvent>;
    /**
     * Fires when the user cancels the editing by clicking the **Cancel** command button.
     */
    create: EventEmitter<CreateEvent>;
    /**
     * Fires when a Scheduler event is clicked.
     */
    eventClick: EventEmitter<EventClickEvent>;
    /**
     * Fires when a Scheduler event is double-clicked.
     */
    eventDblClick: EventEmitter<EventClickEvent>;
    /**
     * Fires when a key is pressed on a focused Scheduler event.
     */
    eventKeydown: EventEmitter<EventKeydownEvent>;
    /**
     * Fires when the user cancels the editing by clicking the **Cancel** command button.
     */
    cancel: EventEmitter<CancelEvent>;
    /**
     * Fires when the user clicks the **Save** command button to save the changes of the edited event.
     */
    save: EventEmitter<SaveEvent>;
    /**
     * Fires when the user clicks the **Remove** icon of a Scheduler event.
     */
    remove: EventEmitter<RemoveEvent>;
    /**
     * Fires when the user starts resizing a Scheduler event.
     */
    resizeStart: EventEmitter<ResizeStartEvent>;
    /**
     * Fires when the user is resizing a Scheduler event.
     */
    resize: EventEmitter<ResizeEvent>;
    /**
     * Fires when the user stops resizing a Scheduler event.
     */
    resizeEnd: EventEmitter<ResizeEndEvent>;
    /**
     * Fires when the user starts dragging a Scheduler event.
     */
    dragStart: EventEmitter<DragStartEvent>;
    /**
     * Fires when the user is dragging a Scheduler event.
     */
    drag: EventEmitter<DragEvent>;
    /**
     * Fires when the user stops dragging a Scheduler event.
     */
    dragEnd: EventEmitter<DragEndEvent>;
    /**
     * Fires when the user clicks the **PDF export** command button.
     */
    pdfExport: EventEmitter<PDFExportEvent>;
    /**
     * @hidden
     */
    dragEndConfirmed: EventEmitter<DragEndEvent>;
    /**
     * @hidden
     */
    resizeEndConfirmed: EventEmitter<ResizeEndEvent>;
    /**
     * @hidden
     */
    removeConfirmed: EventEmitter<RemoveEvent>;
    /**
     * @hidden
     */
    editDialogTemplate: EditDialogTemplateDirective;
    /**
     * @hidden
     */
    toolbarTemplate: ToolbarTemplateDirective;
    /**
     * @hidden
     */
    dateRangeStream: Observable<DateRange>;
    /**
     * @hidden
     */
    selectedDateStream: Observable<Date>;
    /**
     * @hidden
     */
    views: QueryList<SchedulerView>;
    /**
     * @hidden
     */
    resizeSensor: ResizeSensorComponent;
    /**
     * @hidden
     */
    confirmationDialogContainerRef: ViewContainerRef;
    /**
     * @hidden
     */
    loadingComponent: LoadingComponent;
    /**
     * @hidden
     */
    allDayEventTemplate: QueryList<AllDayEventTemplateDirective>;
    /**
     * @hidden
     */
    eventTemplate: QueryList<EventTemplateDirective>;
    /**
     * @hidden
     */
    timeSlotTemplate: QueryList<TimeSlotTemplateDirective>;
    /**
     * @hidden
     */
    minorTimeHeaderTemplate: QueryList<MinorTimeHeaderTemplateDirective>;
    /**
     * @hidden
     */
    majorTimeHeaderTemplate: QueryList<MajorTimeHeaderTemplateDirective>;
    /**
     * @hidden
     */
    monthDaySlotTemplate: QueryList<MonthDaySlotTemplateDirective>;
    /**
     * @hidden
     */
    dateHeaderTemplate: QueryList<DateHeaderTemplateDirective>;
    /**
     * @hidden
     */
    allDaySlotTemplate: QueryList<AllDaySlotTemplateDirective>;
    /**
     * @hidden
     */
    groupHeaderTemplate: QueryList<GroupHeaderTemplateDirective>;
    /**
     * @hidden
     */
    agendaDateTemplate: QueryList<AgendaDateTemplateDirective>;
    /**
     * @hidden
     */
    agendaTimeTemplate: QueryList<AgendaTimeTemplateDirective>;
    private direction;
    private subs;
    private viewIndex;
    private _selectedDate;
    private _events;
    private _timezone;
    private _modelFields;
    private viewItems;
    private detachElementEventHandlers;
    constructor(wrapper: ElementRef, viewContext: ViewContextService, viewState: ViewStateService, editService: EditService, dialogsService: DialogsService, intlService: IntlService, changeDetector: ChangeDetectorRef, zone: NgZone, pdfService: PDFService, localization: LocalizationService, domEvents: DomEventsService, renderer: Renderer2, focusService: FocusService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    onResize(_event?: any): void;
    /**
     * @hidden
     */
    onNavigationAction(action: NavigationAction): boolean;
    /**
     * Creates a popup editor for the new event.
     *
     * @param group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html) that describes
     * the edit form. If called with a data item, the parameter will build the `FormGroup` from the data item fields.
     */
    addEvent(group: FormGroup | any): void;
    /**
     * Switches the specified event in edit mode.
     *
     * @param dataItem - The event that will be switched to edit mode.
     * @param options - An object which contains the form `group` that will be bound in the edit dialog and the current edit `mode`.
     *
     */
    editEvent(dataItem: any, options?: EditEventArgs): void;
    /**
     * Closes the event editor, if open.
     */
    closeEvent(): void;
    /**
     * Returns a flag which indicates if an event is currently edited.
     *
     * @return {boolean} - A flag which indicates if an event is currently edited.
     */
    isEditing(): boolean;
    /**
     * Opens the built-in confirmation dialog for defining the edit mode
     * that will be used when the user edits or removes a recurring event.
     *
     * @param operation - The type of operation that will be confirmed. Has to be either **Edit** or **Remove**.
     *
     * @return {Observable<EditMode>}
     */
    openRecurringConfirmationDialog(operation: CrudOperation): Observable<EditMode>;
    /**
     * Opens the built-in removal confirmation dialog.
     *
     * @return {Observable<boolean>}
     */
    openRemoveConfirmationDialog(): Observable<boolean>;
    /**
     * Saves the current view as PDF.
     */
    saveAsPDF(): void;
    /**
     * Scrolls the view to the specified time.
     */
    scrollToTime(time: string | Date): void;
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
    slotByPosition(x: number, y: number): SchedulerSlot;
    /**
     * Returns the event associated with the specified DOM element, if any.
     *
     * @param element - The DOM element document position.
     * @return the event instance, if found.
     */
    eventFromElement(element: Element): SchedulerEvent;
    /**
     * Gets the currently active event, if any.
     * The active event is the event that can currently receive focus.
     */
    readonly activeEvent: SchedulerEvent;
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
    focusNext(position?: FocusPosition): boolean;
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
    focusPrev(position: FocusPosition): boolean;
    /**
     * Focuses the last focused event or the Scheduler element, if no events are available.
     */
    focus(): void;
    private isInRange;
    private notifyOptionsChange;
    private readonly workWeek;
    private resetViewIndex;
    private onViewIndexChange;
    private setViewIndex;
    private processEvents;
    private attachEditHandlers;
    private emitCRUDEvent;
    private intlChange;
    private attachElementEventHandlers;
}
