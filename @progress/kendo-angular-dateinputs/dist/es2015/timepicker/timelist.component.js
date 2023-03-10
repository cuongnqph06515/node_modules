/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:component-selector-name  component-selector-type */
import { Component, EventEmitter, ElementRef, HostBinding, ViewChild, Renderer2, NgZone, Injector, Input, Output } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { cloneDate } from '@progress/kendo-date-math';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
import { MAX_TIME, MIDNIGHT_DATE } from '../defaults';
import { TIME_PART } from './models/time-part.default';
import { TimePickerDOMService } from './services/dom.service';
import { HoursService } from './services/hours.service';
import { MinutesService } from './services/minutes.service';
import { SecondsService } from './services/seconds.service';
import { DayPeriodService } from './services/dayperiod.service';
import { closestInScope } from '../common/dom-queries';
const SNAP_THRESHOLD = 0.05; //% of the item height
const SCROLL_THRESHOLD = 2; //< 2px threshold
const nil = () => (null);
const ɵ0 = nil;
const getters = {
    35: (data, _) => data[data.length - 1],
    36: (data, _) => data[0],
    38: (data, index) => data[index - 1],
    40: (data, index) => data[index + 1]
};
const services = {
    [TIME_PART.dayperiod]: DayPeriodService,
    [TIME_PART.hour]: HoursService,
    [TIME_PART.minute]: MinutesService,
    [TIME_PART.second]: SecondsService
};
/**
 * @hidden
 */
export class TimeListComponent {
    constructor(element, injector, dom, renderer, zone) {
        this.element = element;
        this.injector = injector;
        this.dom = dom;
        this.renderer = renderer;
        this.zone = zone;
        this.min = cloneDate(MIDNIGHT_DATE);
        this.max = cloneDate(MAX_TIME);
        this.step = 1;
        this.disabled = false;
        this.valueChange = new EventEmitter();
        this.componentClass = true;
        this.animateToIndex = true;
        this.isActive = false;
        this.skip = 0;
        this.total = 60;
        this.data = [];
        this.indexToScroll = -1;
        this.domEvents = [];
    }
    get tabIndex() {
        return this.disabled ? undefined : 0;
    }
    ngOnChanges(changes) {
        if (changes.part) {
            this.service = this.injector.get(services[this.part.type]);
            this.service.configure(this.serviceSettings());
        }
        const value = this.value;
        const valueChanges = changes.value || {};
        const [min, max] = this.service.limitRange(this.min, this.max, value);
        if (this.service.isRangeChanged(min, max) || changes.min || changes.max || changes.step) {
            this.data = [];
            this.service.configure(this.serviceSettings({ min, max }));
        }
        // Skip the rendering of the list whenever possible
        if (!this.data.length || this.hasMissingValue(valueChanges)) {
            this.animateToIndex = false;
            this.data = this.service.data(value);
        }
        this.animateToIndex = this.animateToIndex && this.textHasChanged(valueChanges);
        this.total = this.service.total(value);
        this.indexToScroll = this.selectedIndex(value);
    }
    ngOnInit() {
        this.animateToIndex = true;
        this.dom.ensureHeights();
        this.itemHeight = this.dom.itemHeight;
        this.listHeight = this.dom.timeListHeight;
        this.topOffset = (this.listHeight - this.itemHeight) / 2;
        this.bottomOffset = this.listHeight - this.itemHeight;
        this.topThreshold = this.itemHeight * SNAP_THRESHOLD;
        this.bottomThreshold = this.itemHeight * (1 - SNAP_THRESHOLD);
        const translate = `translateY(${this.topOffset}px)`;
        this.style = { transform: translate, '-ms-transform': translate };
        if (this.element) {
            this.zone.runOutsideAngular(() => {
                this.bindEvents();
            });
        }
    }
    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
        this.domEvents.forEach(unbindCallback => unbindCallback());
    }
    ngAfterViewInit() {
        this.scrollOnce((index) => this.virtualization.scrollToIndex(index));
    }
    ngAfterViewChecked() {
        this.scrollOnce((index) => {
            const action = this.animateToIndex ? 'animateToIndex' : 'scrollToIndex';
            this.virtualization[action](index);
            this.animateToIndex = true;
        });
    }
    handleChange(dataItem) {
        const candidate = this.service.apply(this.value, dataItem.value);
        if (this.value.getTime() === candidate.getTime()) {
            return;
        }
        this.indexToScroll = this.data.indexOf(dataItem);
        this.value = candidate;
        this.valueChange.emit(candidate);
    }
    handleItemClick(args) {
        const item = closestInScope(args.target, node => node.hasAttribute('data-timelist-item-index'), this.element.nativeElement);
        if (item) {
            const index = item.getAttribute('data-timelist-item-index');
            this.handleChange(this.data[index]);
        }
    }
    /**
     * Focuses the host element of the TimeList.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timelist.focus()">Focus TimeList</button>
     *  <kendo-timelist #timelist></kendo-timelist>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    focus() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    }
    /**
     * Blurs the TimeList component.
     */
    blur() {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    }
    itemOffset(scrollTop) {
        const valueIndex = this.selectedIndex(this.value);
        const activeIndex = this.virtualization.activeIndex();
        const offset = this.virtualization.itemOffset(activeIndex);
        const distance = Math.abs(Math.ceil(scrollTop) - offset);
        if (valueIndex === activeIndex && distance < SCROLL_THRESHOLD) {
            return offset;
        }
        const scrollUp = valueIndex > activeIndex;
        const moveToNext = scrollUp && distance >= this.bottomThreshold || !scrollUp && distance > this.topThreshold;
        return moveToNext ? this.virtualization.itemOffset(activeIndex + 1) : offset;
    }
    hasMissingValue({ previousValue, currentValue }) {
        const isPreviousMissing = previousValue && !this.service.valueInList(previousValue);
        const isCurrentMissing = currentValue && !this.service.valueInList(currentValue);
        return isPreviousMissing || isCurrentMissing;
    }
    scrollOnce(action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    }
    serviceSettings(settings) {
        const defaults = {
            boundRange: false,
            insertUndividedMax: false,
            max: this.max,
            min: this.min,
            part: this.part,
            step: this.step
        };
        const result = Object.assign({}, defaults, settings);
        result.boundRange = result.part.type !== 'hour';
        return result;
    }
    selectedIndex(value) {
        if (!value) {
            return -1;
        }
        return this.service.selectedIndex(value);
    }
    textHasChanged({ previousValue, currentValue }) {
        if (!previousValue || !currentValue) {
            return false;
        }
        const oldData = this.data[this.selectedIndex(previousValue)];
        const newData = this.data[this.selectedIndex(currentValue)];
        return oldData && newData && oldData.text !== newData.text;
    }
    handleKeyDown(e) {
        const getter = getters[e.keyCode] || nil;
        const dataItem = getter(this.data, this.service.selectedIndex(this.value));
        if (dataItem) {
            this.handleChange(dataItem);
            e.preventDefault();
        }
    }
    bindEvents() {
        this.scrollSubscription = this.virtualization
            .scroll$()
            .pipe(debounceTime(100), map((e) => e.target.scrollTop), map((top) => this.itemOffset(top)), map((itemOffset) => this.virtualization.itemIndex(itemOffset)))
            .subscribe(index => {
            this.virtualization.scrollToIndex(index);
            this.handleChange(this.data[index]);
        });
        const element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', () => !this.isActive && this.focus()), this.renderer.listen(element, 'click', () => this.focus()), this.renderer.listen(element, 'blur', () => this.isActive = false), this.renderer.listen(element, 'focus', () => this.isActive = true), this.renderer.listen(element, 'keydown', this.handleKeyDown.bind(this)));
    }
}
TimeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-timelist',
                template: `
    <kendo-virtualization
        [skip]="skip"
        [take]="total"
        [total]="total"
        [itemHeight]="itemHeight"
        [maxScrollDifference]="listHeight"
        [topOffset]="topOffset"
        [bottomOffset]="bottomOffset"
        class="k-time-container"
        role="presentation"
        tabindex="-1"
    >
        <ul [ngStyle]="style" class="k-reset"
            [kendoEventsOutsideAngular]="{
                click: handleItemClick
            }"
            [scope]="this"
        >
            <li *ngFor="let item of data; let index = index;" class="k-item"
                [attr.data-timelist-item-index]="index">
                <span>{{item.text}}</span>
            </li>
        </ul>
    </kendo-virtualization>
  `
            },] },
];
/** @nocollapse */
TimeListComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: TimePickerDOMService },
    { type: Renderer2 },
    { type: NgZone }
];
TimeListComponent.propDecorators = {
    min: [{ type: Input }],
    max: [{ type: Input }],
    part: [{ type: Input }],
    step: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    virtualization: [{ type: ViewChild, args: [VirtualizationComponent, { static: true },] }],
    tabIndex: [{ type: HostBinding, args: ["attr.tabindex",] }],
    componentClass: [{ type: HostBinding, args: ["class.k-time-list",] }]
};
export { ɵ0 };
