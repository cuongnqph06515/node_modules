/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, EventEmitter, HostBinding, Input, Output, NgZone, ViewChild, ViewChildren, QueryList, Optional, Renderer2 } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { cloneDate, getDate } from '@progress/kendo-date-math';
import { Keys } from '@progress/kendo-angular-common';
import { MIDNIGHT_DATE, MIN_TIME, MAX_TIME } from '../defaults';
import { TimeListComponent } from './timelist.component';
import { TimePickerDOMService } from './services/dom.service';
import { getNow, hasChange, isInTimeRange, timeInRange } from '../util';
import { generateGetters, generateSnappers, snapTime, valueMerger } from './util';
import { PickerService } from '../common/picker.service';
import { closest } from '../common/dom-queries';
import { currentFocusTarget, isPresent } from '../common/utils';
const listReducer = (state, list, idx, all) => {
    if (state.length || !list.isActive) {
        return state;
    }
    return [{
            next: all[idx + 1] || list,
            prev: all[idx - 1] || list
        }];
};
const ɵ0 = listReducer;
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
})(Direction || (Direction = {}));
/**
 * @hidden
 *
 * Represents the Kendo UI TimeSelector component for Angular.
 */
export class TimeSelectorComponent {
    constructor(localization, cdr, element, intl, dom, zone, renderer, pickerService) {
        this.localization = localization;
        this.cdr = cdr;
        this.element = element;
        this.intl = intl;
        this.dom = dom;
        this.zone = zone;
        this.renderer = renderer;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.componentClass = true;
        /**
         * Specifies the time format used to display the time list columns.
         */
        this.format = 't';
        /**
         * Specifies the smallest valid time value.
         */
        this.min = cloneDate(MIN_TIME);
        /**
         * Specifies the biggest valid time value.
         */
        this.max = cloneDate(MAX_TIME);
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Set** button in the popup.
         */
        this.setButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `disabled` property of the TimeSelector and determines whether the component is active.
         */
        this.disabled = false;
        /**
         * Specifies the value of the TimeSelector component.
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user cancels the selected value.
         */
        this.valueReject = new EventEmitter();
        this.isActive = false;
        this.showNowButton = true;
        this._activeListIndex = -1;
        this._steps = {};
        this.domEvents = [];
        if (this.pickerService) {
            this.pickerService.timeSelector = this;
        }
    }
    /**
     * @hidden
     */
    get disabledClass() {
        return this.disabled;
    }
    /**
     * Configures the incremental steps of the TimeSelector.
     *
     * The available options are:
     * - `hour: Number`&mdash;Controls the incremental step of the hour value.
     * - `minute: Number`&mdash;Controls the incremental step of the minute value.
     * - `second: Number`&mdash;Controls the incremental step of the second value.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-timeselector format="HH:mm:ss" [steps]="steps"></kendo-timeselector>
     * `
     * })
     * export class AppComponent {
     *   public steps = { hour: 2, minute: 15, second: 15 };
     * }
     * ```
     *
     * > If the incremental step is greater than `1`, the **Now** button will be hidden.
     */
    set steps(steps) {
        this._steps = steps || {};
    }
    get steps() {
        return this._steps;
    }
    set current(value) {
        this._current = timeInRange(this.snapTime(cloneDate(value || MIDNIGHT_DATE), this.min), this.min, this.max);
        if (!NgZone.isInAngularZone()) {
            this.cdr.detectChanges();
        }
    }
    get current() {
        return this._current;
    }
    get activeListIndex() {
        return this._activeListIndex;
    }
    set activeListIndex(value) {
        this._activeListIndex = value;
        if (!this.timeListWrappers || !this.timeListWrappers.length) {
            return;
        }
        this.timeListWrappers.forEach(listWrapper => {
            this.renderer.removeClass(listWrapper.nativeElement, 'k-state-focused');
        });
        if (value >= 0) {
            const listIndex = this.listIndex(value);
            const focusedWrapper = this.timeListWrappers.toArray()[listIndex];
            if (focusedWrapper) {
                this.renderer.addClass(focusedWrapper.nativeElement, 'k-state-focused');
            }
        }
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        if (this.localization) {
            this.subscriptions.add(this.localization
                .changes
                .subscribe(() => this.cdr.markForCheck()));
        }
        this.dom.calculateHeights(this.element.nativeElement);
        this.init();
        this.bindEvents();
    }
    /**
     * @hidden
     */
    ngOnChanges(_) {
        this.init();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.timeSelector = null;
        }
        this.domEvents.forEach(unbindCallback => unbindCallback());
    }
    /**
     * Focuses the TimeSelector component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timeselector.focus()">Focus time picker</button>
     *  <kendo-timeselector #timeselector></kendo-timeselector>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        const list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.focus();
    }
    /**
     * Blurs the TimeSelector component.
     */
    blur() {
        const list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.blur();
    }
    /**
     * @hidden
     */
    handleAccept() {
        this.handleChange(this.mergeValue(cloneDate(this.value || getDate(getNow())), this.current));
    }
    /**
     * @hidden
     */
    handleNow() {
        this.current = getNow();
        this.handleChange(this.current);
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    handleReject() {
        this.current = this.value;
        this.valueReject.emit();
    }
    /**
     * @hidden
     */
    handleFocus(args) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.emitFocus(args);
    }
    /**
     * @hidden
     */
    handleListFocus(args) {
        const index = parseInt(args.target.getAttribute('data-timelist-index'), 10);
        this.activeListIndex = index;
        this.handleFocus(args);
    }
    /**
     * @hidden
     */
    handleBlur(args) {
        const currentTarget = currentFocusTarget(args);
        if (currentTarget && this.containsElement(currentTarget)) {
            return;
        }
        this.activeListIndex = -1;
        this.isActive = false;
        this.emitBlur(args);
    }
    /**
     * @hidden
     */
    containsElement(element) {
        return Boolean(closest(element, node => node === this.element.nativeElement));
    }
    partStep(part) {
        return this.steps[part.type] || 1;
    }
    init(changes) {
        if (!changes || hasChange(changes, 'format')) {
            this.dateFormatParts = this.intl.splitDateFormat(this.format);
            this.mergeValue = valueMerger(generateGetters(this.dateFormatParts));
        }
        if (!changes || hasChange(changes, 'steps')) {
            this.snapTime = snapTime(generateSnappers(this.steps));
        }
        if (!changes || hasChange(changes, 'value')) {
            this.current = this.value;
        }
        this.showNowButton = !this.hasSteps() && this.nowButton && isInTimeRange(getNow(), this.min, this.max);
    }
    focusList(dir) {
        if (!this.timeLists.length) {
            return;
        }
        this.timeLists.reduce(listReducer, [])
            .map(state => dir === Direction.Right ? state.next : state.prev)
            .map(list => list && list.focus());
    }
    handleChange(value) {
        this.value = value;
        this.valueChange.emit(cloneDate(value));
    }
    hasActiveButton() {
        if (!this.accept) {
            return false;
        }
        return [this.accept, this.cancel, this.now].reduce((isActive, el) => isActive || this.dom.isActive(el), false);
    }
    hasSteps() {
        const keys = Object.keys(this.steps);
        return keys.length !== keys.reduce((acc, k) => acc + this.steps[k], 0);
    }
    intlChange() {
        this.dateFormatParts = this.intl.splitDateFormat(this.format);
        this.mergeValue = valueMerger(generateGetters(this.dateFormatParts));
        this.cdr.markForCheck();
    }
    bindEvents() {
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.domEvents.push(this.renderer.listen(this.element.nativeElement, 'keydown', this.handleKeydown.bind(this)));
            });
        }
    }
    handleKeydown(args) {
        const { keyCode, altKey } = args;
        // reserve the alt + arrow key commands for the picker
        const arrowKeyPressed = [Keys.ArrowLeft, Keys.ArrowRight].indexOf(keyCode) !== -1;
        if (isPresent(this.pickerService) && arrowKeyPressed && altKey) {
            return;
        }
        if (keyCode === Keys.Enter && !this.hasActiveButton()) {
            this.handleAccept();
        }
        else if (keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight) {
            this.focusList(keyCode === Keys.ArrowLeft ? Direction.Left : Direction.Right);
        }
    }
    emitBlur(args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    }
    emitFocus(args) {
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    }
    listIndex(partIndex) {
        let listIdx = 0;
        let partIdx = 0;
        while (partIdx < partIndex) {
            if (this.dateFormatParts[partIdx].type !== 'literal') {
                listIdx++;
            }
            partIdx++;
        }
        return listIdx;
    }
}
TimeSelectorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendo-timeselector',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.timeselector'
                    }
                ],
                selector: 'kendo-timeselector',
                template: `
        <ng-container kendoTimeSelectorLocalizedMessages
            i18n-accept="kendo.timeselector.accept|The Accept button text in the timeselector component"
            accept="Set"

            i18n-acceptLabel="kendo.timeselector.acceptLabel|The label for the Accept button in the timeselector component"
            acceptLabel="Set time"

            i18n-cancel="kendo.timeselector.cancel|The Cancel button text in the timeselector component"
            cancel="Cancel"

            i18n-cancelLabel="kendo.timeselector.cancelLabel|The label for the Cancel button in the timeselector component"
            cancelLabel="Cancel changes"

            i18n-now="kendo.timeselector.now|The Now button text in the timeselector component"
            now="Now"

            i18n-nowLabel="kendo.timeselector.nowLabel|The label for the Now button in the timeselector component"
            nowLabel="Select now"
        >
        </ng-container>
        <div class="k-time-header">
            <span class="k-title">
                {{ intl.formatDate(current, format) }}
            </span>
            <button
                #now
                *ngIf="showNowButton"
                class="k-button k-bare k-time-now" type="button"
                [attr.title]="localization.get('nowLabel')"
                [attr.aria-label]="localization.get('nowLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleNow,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('now')}}</button>
        </div>
        <div class="k-time-list-container">
            <span class="k-time-highlight"></span>
            <ng-template ngFor [ngForOf]="dateFormatParts" let-part let-idx="index">
                <div
                    #listWrapper
                    class="k-time-list-wrapper"
                    role="presentation" tabindex="-1"
                    *ngIf="part.type !== 'literal'"
                >
                    <span class="k-title">{{intl.dateFieldName(part)}}</span>
                    <kendo-timelist
                        [min]="min"
                        [max]="max"
                        [part]="part"
                        [step]="partStep(part)"
                        [disabled]="disabled"
                        [(value)]="current"
                        [kendoEventsOutsideAngular]="{
                            focus: handleListFocus,
                            blur: handleBlur
                        }"
                        [scope]="this"
                        [attr.data-timelist-index]="idx"
                    ></kendo-timelist>
                </div>
                <div class="k-time-separator" *ngIf="part.type === 'literal'">
                    {{part.pattern}}
                </div>
            </ng-template>
        </div>
        <div class="k-time-footer k-action-buttons" *ngIf="setButton || cancelButton">
            <button
                #cancel
                *ngIf="cancelButton"
                class="k-button k-time-cancel" type="button"
                [attr.title]="localization.get('cancelLabel')"
                [attr.aria-label]="localization.get('cancelLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleReject,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('cancel')}}</button>
            <button
                #accept
                *ngIf="setButton"
                type="button"
                class="k-time-accept k-button k-primary"
                [attr.title]="localization.get('acceptLabel')"
                [attr.aria-label]="localization.get('acceptLabel')"
                [kendoEventsOutsideAngular]="{
                    click: handleAccept,
                    focus: handleFocus,
                    blur: handleBlur
                }"
                [scope]="this"
                [disabled]="disabled"
            >{{localization.get('accept')}}</button>
        </div>
    `
            },] },
];
/** @nocollapse */
TimeSelectorComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: IntlService },
    { type: TimePickerDOMService },
    { type: NgZone },
    { type: Renderer2 },
    { type: PickerService, decorators: [{ type: Optional }] }
];
TimeSelectorComponent.propDecorators = {
    accept: [{ type: ViewChild, args: ['accept',] }],
    cancel: [{ type: ViewChild, args: ['cancel',] }],
    now: [{ type: ViewChild, args: ['now',] }],
    timeLists: [{ type: ViewChildren, args: [TimeListComponent,] }],
    timeListWrappers: [{ type: ViewChildren, args: ['listWrapper',] }],
    componentClass: [{ type: HostBinding, args: ['class.k-timeselector',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    cancelButton: [{ type: Input }],
    setButton: [{ type: Input }],
    nowButton: [{ type: Input }],
    disabled: [{ type: Input }],
    steps: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    valueReject: [{ type: Output }]
};
export { ɵ0 };
