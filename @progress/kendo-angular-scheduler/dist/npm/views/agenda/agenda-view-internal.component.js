"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var dom_queries_1 = require("../../common/dom-queries");
var utils_1 = require("./utils");
var utils_2 = require("../utils");
var pdf_service_1 = require("../../pdf/pdf.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        this.tasks = new rxjs_1.BehaviorSubject(null);
        this.groupedResources = [];
        this.spans = [];
        this.subs = new rxjs_1.Subscription();
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
        this.subs.add(rxjs_1.combineLatest(this.viewContext.items, this.viewState.dateRange).pipe(operators_1.map(function (_a) {
            var items = _a[0], dateRange = _a[1];
            _this.items = items;
            _this.range = dateRange;
            return _this.createEventGroups();
        }))
            .subscribe(function (tasks) {
            _this.tasks.next(tasks);
        }));
        this.subs.add(this.viewContext.optionsChange.subscribe(this.optionsChange.bind(this)));
        var onStable = function () { return _this.zone.onStable.pipe(operators_1.take(1)); };
        this.subs.add(rxjs_1.combineLatest(this.tasks, this.localization.changes).pipe(operators_1.switchMap(onStable))
            .subscribe(this.updateContentHeight));
        this.subs.add(this.pdfService.createElement.subscribe(this.createPDFElement.bind(this)));
    };
    AgendaViewInternalComponent.prototype.ngOnChanges = function (changes) {
        if (kendo_angular_common_1.anyChanged(['selectedDateFormat', 'selectedShortDateFormat'], changes)) {
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
            _this.subs.add(rxjs_1.merge(rxjs_1.fromEvent(contentElement, 'click'), rxjs_1.fromEvent(contentElement, 'contextmenu'), rxjs_1.fromEvent(contentElement, 'dblclick'))
                .subscribe(function (e) { return _this.onClick(e); }));
            _this.subs.add(rxjs_1.fromEvent(contentElement, 'keydown')
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
            if (isSingle && dom_queries_1.closestInScope(e.target, function (node) { return dom_queries_1.hasClasses(node, 'k-event-delete'); }, eventTarget)) {
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
        var eventTarget = dom_queries_1.closestInScope(target, function (node) { return node.hasAttribute('data-task-index'); }, this.element.nativeElement);
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
            if (child !== element && !utils_2.ignoreContentChild(child)) {
                height -= child.offsetHeight;
            }
        }
        var headerElement = this.headerWrap.nativeElement;
        height -= this.headerWrap ? headerElement.offsetHeight : 0;
        this.renderer.setStyle(content, 'height', height + "px");
        var rtl = this.localization.rtl;
        var padding = dom_queries_1.hasScrollbar(content, 'vertical') ? dom_queries_1.scrollbarWidth() : 0;
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
        var now = kendo_date_math_1.getDate(this.selectedDate);
        if (e.type === 'next') {
            var next = kendo_date_math_1.getDate(kendo_date_math_1.addDays(now, 7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
        if (e.type === 'prev') {
            var next = kendo_date_math_1.getDate(kendo_date_math_1.addDays(now, -7));
            if (this.isInRange(next)) {
                this.viewState.notifyNextDate(next);
            }
        }
    };
    AgendaViewInternalComponent.prototype.createEventGroups = function () {
        var resourceGroups = this.groupedResources.length ? utils_1.createResourceGroups(this.groupedResources) : null;
        var eventGroups = this.groups = utils_1.groupEvents(this.items, {
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
        var start = kendo_date_math_1.getDate(date);
        var end = kendo_date_math_1.getDate(kendo_date_math_1.addDays(start, 7));
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
        var offset = utils_2.elementOffset(contentTable);
        if (offset.top <= y && y <= offset.top + offset.height) {
            var contentRows = contentTable.rows;
            if (!contentRows.length) {
                return;
            }
            var taskOffset = utils_2.elementOffset(contentRows[0].cells[contentRows[0].cells.length - 1]);
            if (taskOffset.left <= x && x <= taskOffset.left + taskOffset.width) {
                for (var idx = 0; idx < contentRows.length; idx++) {
                    var row = contentRows[idx];
                    var rowOffset = utils_2.elementOffset(row);
                    if (rowOffset.top <= y && y <= rowOffset.top + rowOffset.height) {
                        var element = row.querySelector('[data-task-index]');
                        var task = this.elementTask(element);
                        var event_1 = task.event;
                        return {
                            element: new core_1.ElementRef(element),
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
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'agenda-view-internal',
                    template: "\n        <table class=\"k-scheduler-layout k-scheduler-agendaview k-scheduler-agenda\">\n            <tbody>\n                <tr>\n                    <td>\n                        <div kendoSchedulerAgendaHeader [resources]=\"groupedResources\" #headerWrap></div>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <div kendoSchedulerAgendaList #content\n                            [editable]=\"editable\"\n                            [eventTemplate]=\"eventTemplateRef\"\n                            [slotClass]=\"slotClass\"\n                            [eventClass]=\"eventClass\"\n                            [eventStyles]=\"eventStyles\"\n                            [agendaTimeTemplate]=\"agendaTimeTemplateRef\"\n                            [agendaDateTemplate]=\"agendaDateTemplateRef\"\n                            [tasks]=\"tasks | async\">\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaViewInternalComponent.ctorParameters = function () { return [
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService },
        { type: kendo_angular_intl_1.IntlService },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: pdf_service_1.PDFService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    AgendaViewInternalComponent.propDecorators = {
        eventTemplate: [{ type: core_1.Input }],
        slotClass: [{ type: core_1.Input }],
        eventClass: [{ type: core_1.Input }],
        eventStyles: [{ type: core_1.Input }],
        agendaTimeTemplate: [{ type: core_1.Input }],
        agendaDateTemplate: [{ type: core_1.Input }],
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }],
        headerWrap: [{ type: core_1.ViewChild, args: ['headerWrap', { read: core_1.ElementRef },] }],
        content: [{ type: core_1.ViewChild, args: ['content', { read: core_1.ElementRef },] }]
    };
    return AgendaViewInternalComponent;
}());
exports.AgendaViewInternalComponent = AgendaViewInternalComponent;
