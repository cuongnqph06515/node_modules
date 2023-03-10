import { Component, Input, ViewChild, ElementRef, NgZone, Renderer2, TemplateRef } from '@angular/core';
import { anyChanged } from '@progress/kendo-angular-common';
import { IntlService } from '@progress/kendo-angular-intl';
import { addDays, getDate } from '@progress/kendo-date-math';
import { Subscription, BehaviorSubject, combineLatest, fromEvent, merge } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { scrollbarWidth, hasScrollbar, closestInScope, hasClasses } from '../../common/dom-queries';
import { createResourceGroups, groupEvents } from './utils';
import { ignoreContentChild, elementOffset } from '../utils';
import { PDFService } from '../../pdf/pdf.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class AgendaViewInternalComponent {
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
