/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var view_enum_1 = require("./models/view.enum");
var bus_view_service_1 = require("./services/bus-view.service");
var weeknames_service_1 = require("./services/weeknames.service");
var disabled_dates_service_1 = require("./services/disabled-dates.service");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
var dom_queries_1 = require("../common/dom-queries");
/**
 * @hidden
 */
var ViewComponent = /** @class */ (function () {
    function ViewComponent(bus, intl, cdr, weekService, element, zone, renderer, disabledDatesService) {
        this.bus = bus;
        this.intl = intl;
        this.cdr = cdr;
        this.weekService = weekService;
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.disabledDatesService = disabledDatesService;
        this.direction = 'vertical';
        this.isActive = true;
        this.change = new core_1.EventEmitter();
        this.cellEnter = new core_1.EventEmitter();
        this.cellLeave = new core_1.EventEmitter();
        this.weekNames = [];
        this.colSpan = 0;
        this.subscriptions = new rxjs_1.Subscription();
        this.domEvents = [];
        this.subscriptions
            .add(this.intl.changes.subscribe(this.intlChange.bind(this)))
            .add(this.disabledDatesService.changes.subscribe(this.disabledDatesChange.bind(this)));
    }
    Object.defineProperty(ViewComponent.prototype, "weekNumber", {
        get: function () {
            return this.showWeekNumbers && this.activeView === view_enum_1.CalendarViewEnum.month;
        },
        set: function (showWeekNumbers) {
            this.showWeekNumbers = showWeekNumbers;
        },
        enumerable: true,
        configurable: true
    });
    ViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    ViewComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        var generateWeekNames = this.isHorizontal() && this.weekNames.length === 0;
        if (generateWeekNames && (changes.weekNumber || changes.direction)) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.colSpan = this.service.rowLength(this.weekNumber);
        this.title = this.service.title(this.viewDate);
        this.updateData();
        if (changes.activeView) {
            this.currentCellIndex = null;
        }
    };
    ViewComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        this.domEvents.forEach(function (unsubscribeCallback) { return unsubscribeCallback(); });
    };
    ViewComponent.prototype.isHorizontal = function () {
        return this.direction === 'horizontal';
    };
    ViewComponent.prototype.isMonthView = function () {
        return this.activeView === view_enum_1.CalendarViewEnum.month;
    };
    ViewComponent.prototype.firstDate = function (rowCtx) {
        var ctx = this.firstWeekDateContext(rowCtx);
        return ctx ? ctx.value : null;
    };
    ViewComponent.prototype.getWeekNumber = function (date) {
        if (!this.weekNumber) {
            return null;
        }
        return kendo_date_math_1.weekInYear(date, this.intl.firstDay());
    };
    ViewComponent.prototype.getWeekNumberContext = function (rowCtx) {
        var ctx = this.firstWeekDateContext(rowCtx);
        if (!this.weekNumber || !ctx) {
            return null;
        }
        var weekNumber = kendo_date_math_1.weekInYear(ctx.value, this.intl.firstDay()).toString();
        return {
            formattedValue: weekNumber,
            id: null,
            isFocused: false,
            isSelected: false,
            isWeekend: false,
            title: weekNumber,
            value: kendo_date_math_1.cloneDate(ctx.value)
        };
    };
    ViewComponent.prototype.getStyles = function (context) {
        var isRangeEnd = context.isRangeEnd, isRangeStart = context.isRangeStart;
        var isEndActive = this.activeRangeEnd === 'end' && isRangeEnd;
        var isStartActive = this.activeRangeEnd === 'start' && isRangeStart;
        return util_1.stringifyClassObject({
            'k-range-end': isRangeEnd,
            'k-range-mid': context.isRangeMid,
            'k-range-split-end': context.isRangeSplitEnd,
            'k-range-split-start': context.isRangeSplitStart,
            'k-range-start': isRangeStart,
            'k-state-active': isStartActive || isEndActive,
            'k-state-focused': this.isActive && context.isFocused,
            'k-state-selected': context.isSelected || isRangeStart || isRangeEnd,
            'k-today': context.isToday,
            'k-weekend': context.isWeekend,
            'k-state-disabled': context.isDisabled
        });
    };
    ViewComponent.prototype.tableCellIndex = function (rowIndex, cellIndex) {
        return rowIndex + ":" + cellIndex;
    };
    ViewComponent.prototype.firstWeekDateContext = function (rowCtx) {
        if (!this.weekNumber) {
            return null;
        }
        var idx = 0;
        var ctx = rowCtx[idx];
        while (!ctx && idx < rowCtx.length) {
            ctx = rowCtx[++idx];
        }
        return ctx;
    };
    ViewComponent.prototype.updateData = function () {
        var time = this.selectedDate || util_1.getToday();
        var viewDate = util_1.setTime(this.viewDate, time);
        this.data = this.service.data({
            cellUID: this.cellUID,
            focusedDate: this.focusedDate,
            isActiveView: !this.bus.canMoveDown(this.activeView),
            max: this.max,
            min: this.min,
            selectedDate: this.selectedDate,
            selectionRange: this.selectionRange,
            viewDate: viewDate,
            isDateDisabled: this.disabledDatesService.isDateDisabled
        });
    };
    ViewComponent.prototype.intlChange = function () {
        this.updateData();
        if (this.isHorizontal()) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.cdr.markForCheck();
    };
    ViewComponent.prototype.disabledDatesChange = function () {
        this.updateData();
        this.cdr.markForCheck();
    };
    ViewComponent.prototype.bindEvents = function () {
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', this.cellMouseoverHandler.bind(this)), this.renderer.listen(element, 'mouseleave', this.mouseLeaveHandler.bind(this)), this.renderer.listen(element, 'click', this.clickHandler.bind(this)));
    };
    ViewComponent.prototype.clickHandler = function (args) {
        var cell = this.closestCell(args);
        if (cell) {
            var index = cell.getAttribute('data-cell-index');
            var cellContext = this.cellByIndex(index);
            if (!cellContext.isDisabled) {
                this.change.emit(cellContext.value);
            }
        }
    };
    ViewComponent.prototype.mouseLeaveHandler = function () {
        if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    };
    ViewComponent.prototype.cellMouseoverHandler = function (args) {
        var cell = this.closestCell(args);
        if (cell) {
            var index = cell.getAttribute('data-cell-index');
            if (this.currentCellIndex && this.currentCellIndex !== index) {
                this.emitCellLeave();
            }
            var value = this.cellByIndex(index).value;
            this.cellEnter.emit(value);
            this.currentCellIndex = index;
        }
        else if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    };
    ViewComponent.prototype.closestCell = function (eventArgs) {
        return dom_queries_1.closestInScope(eventArgs.target, function (node) { return node.hasAttribute('data-cell-index'); }, this.element.nativeElement);
    };
    ViewComponent.prototype.emitCellLeave = function () {
        var item = this.cellByIndex(this.currentCellIndex);
        if (item) {
            this.cellLeave.emit(item.value);
        }
        this.currentCellIndex = null;
    };
    ViewComponent.prototype.cellByIndex = function (index) {
        var _a = index.split(':'), rowIndex = _a[0], cellIndex = _a[1];
        return this.data[rowIndex][cellIndex];
    };
    ViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoCalendarView]',
                    template: "\n    <ng-template #emptyCell><td class=\"k-empty\">&nbsp;</td></ng-template>\n    <tr *ngIf=\"!isHorizontal()\" role=\"row\"><th scope=\"col\" [colSpan]=\"colSpan\">{{title}}</th></tr>\n    <tr role=\"row\" *ngIf=\"isMonthView() && isHorizontal()\">\n        <th *ngFor=\"let name of weekNames\">{{name}}</th>\n    </tr>\n    <tr *kFor=\"let row of data; let rowIndex = index\" role=\"row\">\n        <ng-template [ngIf]=\"weekNumber\">\n            <td class=\"k-alt\" *ngIf=\"firstDate(row); else emptyCell\">\n                <ng-template [ngIf]=\"!weekNumberTemplateRef\">\n                    {{getWeekNumber(firstDate(row))}}\n                </ng-template>\n                <ng-template\n                    [ngIf]=\"weekNumberTemplateRef\"\n                    [ngTemplateOutlet]=\"weekNumberTemplateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: firstDate(row),\n                        cellContext: getWeekNumberContext(row)\n                    }\"\n                ></ng-template>\n            </td>\n        </ng-template>\n        <ng-container *kFor=\"let cell of row; let cellIndex = index\">\n            <td\n                *ngIf=\"cell; else emptyCell\"\n                role=\"gridcell\"\n                [attr.id]=\"cell.id\"\n                [attr.data-cell-index]=\"tableCellIndex(rowIndex, cellIndex)\"\n                [attr.aria-selected]=\"cell.isSelected || cell.isRangeStart || cell.isRangeMid || cell.isRangeEnd\"\n                [attr.aria-disabled]=\"cell.isDisabled\"\n                [ngClass]=\"getStyles(cell)\"\n                [title]=\"cell.title\"\n            >\n                <span class=\"k-link\">\n                    <ng-template [ngIf]=\"!templateRef\">{{cell.formattedValue}}</ng-template>\n                    <ng-template\n                        *ngIf=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngTemplateOutletContext]=\"{ $implicit: cell.value, cellContext: cell }\"\n                    ></ng-template>\n                </span>\n            </td>\n        </ng-container>\n    </tr>\n  "
                },] },
    ];
    /** @nocollapse */
    ViewComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: kendo_angular_intl_1.IntlService },
        { type: core_1.ChangeDetectorRef },
        { type: weeknames_service_1.WeekNamesService },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: disabled_dates_service_1.DisabledDatesService }
    ]; };
    ViewComponent.propDecorators = {
        direction: [{ type: core_1.Input }],
        isActive: [{ type: core_1.Input }],
        activeView: [{ type: core_1.Input }],
        cellUID: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        selectedDate: [{ type: core_1.Input }],
        viewDate: [{ type: core_1.Input }],
        activeRangeEnd: [{ type: core_1.Input }],
        selectionRange: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        weekNumber: [{ type: core_1.Input }],
        viewIndex: [{ type: core_1.Input }],
        templateRef: [{ type: core_1.Input }],
        weekNumberTemplateRef: [{ type: core_1.Input }],
        change: [{ type: core_1.Output }],
        cellEnter: [{ type: core_1.Output }],
        cellLeave: [{ type: core_1.Output }]
    };
    return ViewComponent;
}());
exports.ViewComponent = ViewComponent;
