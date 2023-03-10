import { ViewChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { anyChanged } from '@progress/kendo-angular-common';
import { ZonedDate } from '@progress/kendo-date-math';
import { Subscription, BehaviorSubject, combineLatest, fromEvent, merge } from 'rxjs';
import { switchMap, take, map, filter, tap } from 'rxjs/operators';
import { closestInScope, hasClasses, preventLockedScroll, scrollbarWidth, wheelDeltaY, hasScrollbar } from '../../common/dom-queries';
import { groupResources, getField, setField, fromClick, fromDoubleClick } from '../../common/util';
import { assignTasksResources, toPx, elementOffset, pointDistance, ignoreContentChild, resourceItemByValue, convertNgClassBindings } from '../utils';
import { BORDER_WIDTH } from '../constants';
import Draggable from '@telerik/kendo-draggable';
import { HintContainerComponent } from '../common/hint-container.component';
const SCROLL_CHANGE = 15;
const MIN_DISTANCE = 60;
const SCROLL_INTERVAL = 50;
const MIN_MOVE_DISTANCE = 10;
/** @hidden */
export class BaseView {
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
