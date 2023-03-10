import { Component, ContentChild, ContentChildren, EventEmitter, HostBinding, Input, isDevMode, NgZone, Output, QueryList, ViewChild, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { ResizeSensorComponent, isDocumentAvailable } from '@progress/kendo-angular-common';
import { anyChanged, isChanged, hasObservers } from '@progress/kendo-angular-common';
import { getDate, ZonedDate, Day } from '@progress/kendo-date-math';
import { DateChangeEvent, NavigateEvent, VIEW_EVENT_MAP } from './events';
import { ToolbarTemplateDirective } from './toolbar/toolbar-template.directive';
import { ToolbarService } from './toolbar/toolbar.service';
import { SchedulerView } from './types';
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
import { FormGroup, FormControl } from '@angular/forms';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { DialogsService } from './editing/dialogs.service';
import { SchedulerLocalizationService } from './localization/scheduler-localization.service';
import { defaultModelFields } from './common/default-model-fields';
import { readEvent, isRecurrenceMaster, copyResources, isPresent } from './common/util';
import { IntlService } from '@progress/kendo-angular-intl';
import { PDFService } from './pdf/pdf.service';
import { PDFExportEvent } from './pdf/pdf-export-event';
import { LoadingComponent } from './loading.component';
import { FocusService } from './navigation';
import { DomEventsService } from './views/common/dom-events.service';
import { closest } from './common/dom-queries';
const todayDate = () => getDate(new Date());
const ??0 = todayDate;
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
export class SchedulerComponent {
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
export { ??0 };
