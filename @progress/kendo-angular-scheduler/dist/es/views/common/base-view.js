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
export { BaseView };
