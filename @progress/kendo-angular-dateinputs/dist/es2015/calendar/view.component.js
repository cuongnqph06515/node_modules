/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, EventEmitter, Input, Output, TemplateRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarViewEnum } from './models/view.enum';
import { BusViewService } from './services/bus-view.service';
import { WeekNamesService } from './services/weeknames.service';
import { DisabledDatesService } from './services/disabled-dates.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { cloneDate, weekInYear } from '@progress/kendo-date-math';
import { getToday, setTime, stringifyClassObject } from '../util';
import { closestInScope } from '../common/dom-queries';
/**
 * @hidden
 */
export class ViewComponent {
    constructor(bus, intl, cdr, weekService, element, zone, renderer, disabledDatesService) {
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
        this.change = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.weekNames = [];
        this.colSpan = 0;
        this.subscriptions = new Subscription();
        this.domEvents = [];
        this.subscriptions
            .add(this.intl.changes.subscribe(this.intlChange.bind(this)))
            .add(this.disabledDatesService.changes.subscribe(this.disabledDatesChange.bind(this)));
    }
    get weekNumber() {
        return this.showWeekNumbers && this.activeView === CalendarViewEnum.month;
    }
    set weekNumber(showWeekNumbers) {
        this.showWeekNumbers = showWeekNumbers;
    }
    ngOnInit() {
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnChanges(changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        const generateWeekNames = this.isHorizontal() && this.weekNames.length === 0;
        if (generateWeekNames && (changes.weekNumber || changes.direction)) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.colSpan = this.service.rowLength(this.weekNumber);
        this.title = this.service.title(this.viewDate);
        this.updateData();
        if (changes.activeView) {
            this.currentCellIndex = null;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.domEvents.forEach(unsubscribeCallback => unsubscribeCallback());
    }
    isHorizontal() {
        return this.direction === 'horizontal';
    }
    isMonthView() {
        return this.activeView === CalendarViewEnum.month;
    }
    firstDate(rowCtx) {
        const ctx = this.firstWeekDateContext(rowCtx);
        return ctx ? ctx.value : null;
    }
    getWeekNumber(date) {
        if (!this.weekNumber) {
            return null;
        }
        return weekInYear(date, this.intl.firstDay());
    }
    getWeekNumberContext(rowCtx) {
        const ctx = this.firstWeekDateContext(rowCtx);
        if (!this.weekNumber || !ctx) {
            return null;
        }
        const weekNumber = weekInYear(ctx.value, this.intl.firstDay()).toString();
        return {
            formattedValue: weekNumber,
            id: null,
            isFocused: false,
            isSelected: false,
            isWeekend: false,
            title: weekNumber,
            value: cloneDate(ctx.value)
        };
    }
    getStyles(context) {
        const { isRangeEnd, isRangeStart } = context;
        const isEndActive = this.activeRangeEnd === 'end' && isRangeEnd;
        const isStartActive = this.activeRangeEnd === 'start' && isRangeStart;
        return stringifyClassObject({
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
    }
    tableCellIndex(rowIndex, cellIndex) {
        return `${rowIndex}:${cellIndex}`;
    }
    firstWeekDateContext(rowCtx) {
        if (!this.weekNumber) {
            return null;
        }
        let idx = 0;
        let ctx = rowCtx[idx];
        while (!ctx && idx < rowCtx.length) {
            ctx = rowCtx[++idx];
        }
        return ctx;
    }
    updateData() {
        const time = this.selectedDate || getToday();
        const viewDate = setTime(this.viewDate, time);
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
    }
    intlChange() {
        this.updateData();
        if (this.isHorizontal()) {
            this.weekNames = this.weekService.getWeekNames(this.weekNumber);
        }
        this.cdr.markForCheck();
    }
    disabledDatesChange() {
        this.updateData();
        this.cdr.markForCheck();
    }
    bindEvents() {
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', this.cellMouseoverHandler.bind(this)), this.renderer.listen(element, 'mouseleave', this.mouseLeaveHandler.bind(this)), this.renderer.listen(element, 'click', this.clickHandler.bind(this)));
    }
    clickHandler(args) {
        const cell = this.closestCell(args);
        if (cell) {
            const index = cell.getAttribute('data-cell-index');
            const cellContext = this.cellByIndex(index);
            if (!cellContext.isDisabled) {
                this.change.emit(cellContext.value);
            }
        }
    }
    mouseLeaveHandler() {
        if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    }
    cellMouseoverHandler(args) {
        const cell = this.closestCell(args);
        if (cell) {
            const index = cell.getAttribute('data-cell-index');
            if (this.currentCellIndex && this.currentCellIndex !== index) {
                this.emitCellLeave();
            }
            const value = this.cellByIndex(index).value;
            this.cellEnter.emit(value);
            this.currentCellIndex = index;
        }
        else if (this.currentCellIndex) {
            this.emitCellLeave();
        }
    }
    closestCell(eventArgs) {
        return closestInScope(eventArgs.target, node => node.hasAttribute('data-cell-index'), this.element.nativeElement);
    }
    emitCellLeave() {
        const item = this.cellByIndex(this.currentCellIndex);
        if (item) {
            this.cellLeave.emit(item.value);
        }
        this.currentCellIndex = null;
    }
    cellByIndex(index) {
        const [rowIndex, cellIndex] = index.split(':');
        return this.data[rowIndex][cellIndex];
    }
}
ViewComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoCalendarView]',
                template: `
    <ng-template #emptyCell><td class="k-empty">&nbsp;</td></ng-template>
    <tr *ngIf="!isHorizontal()" role="row"><th scope="col" [colSpan]="colSpan">{{title}}</th></tr>
    <tr role="row" *ngIf="isMonthView() && isHorizontal()">
        <th *ngFor="let name of weekNames">{{name}}</th>
    </tr>
    <tr *kFor="let row of data; let rowIndex = index" role="row">
        <ng-template [ngIf]="weekNumber">
            <td class="k-alt" *ngIf="firstDate(row); else emptyCell">
                <ng-template [ngIf]="!weekNumberTemplateRef">
                    {{getWeekNumber(firstDate(row))}}
                </ng-template>
                <ng-template
                    [ngIf]="weekNumberTemplateRef"
                    [ngTemplateOutlet]="weekNumberTemplateRef"
                    [ngTemplateOutletContext]="{
                        $implicit: firstDate(row),
                        cellContext: getWeekNumberContext(row)
                    }"
                ></ng-template>
            </td>
        </ng-template>
        <ng-container *kFor="let cell of row; let cellIndex = index">
            <td
                *ngIf="cell; else emptyCell"
                role="gridcell"
                [attr.id]="cell.id"
                [attr.data-cell-index]="tableCellIndex(rowIndex, cellIndex)"
                [attr.aria-selected]="cell.isSelected || cell.isRangeStart || cell.isRangeMid || cell.isRangeEnd"
                [attr.aria-disabled]="cell.isDisabled"
                [ngClass]="getStyles(cell)"
                [title]="cell.title"
            >
                <span class="k-link">
                    <ng-template [ngIf]="!templateRef">{{cell.formattedValue}}</ng-template>
                    <ng-template
                        *ngIf="templateRef"
                        [ngTemplateOutlet]="templateRef"
                        [ngTemplateOutletContext]="{ $implicit: cell.value, cellContext: cell }"
                    ></ng-template>
                </span>
            </td>
        </ng-container>
    </tr>
  `
            },] },
];
/** @nocollapse */
ViewComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: IntlService },
    { type: ChangeDetectorRef },
    { type: WeekNamesService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: DisabledDatesService }
];
ViewComponent.propDecorators = {
    direction: [{ type: Input }],
    isActive: [{ type: Input }],
    activeView: [{ type: Input }],
    cellUID: [{ type: Input }],
    focusedDate: [{ type: Input }],
    selectedDate: [{ type: Input }],
    viewDate: [{ type: Input }],
    activeRangeEnd: [{ type: Input }],
    selectionRange: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    weekNumber: [{ type: Input }],
    viewIndex: [{ type: Input }],
    templateRef: [{ type: Input }],
    weekNumberTemplateRef: [{ type: Input }],
    change: [{ type: Output }],
    cellEnter: [{ type: Output }],
    cellLeave: [{ type: Output }]
};
