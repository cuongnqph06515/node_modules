/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a;
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
var SNAP_THRESHOLD = 0.05; //% of the item height
var SCROLL_THRESHOLD = 2; //< 2px threshold
var nil = function () { return (null); };
var ɵ0 = nil;
var getters = {
    35: function (data, _) { return data[data.length - 1]; },
    36: function (data, _) { return data[0]; },
    38: function (data, index) { return data[index - 1]; },
    40: function (data, index) { return data[index + 1]; }
};
var services = (_a = {},
    _a[TIME_PART.dayperiod] = DayPeriodService,
    _a[TIME_PART.hour] = HoursService,
    _a[TIME_PART.minute] = MinutesService,
    _a[TIME_PART.second] = SecondsService,
    _a);
/**
 * @hidden
 */
var TimeListComponent = /** @class */ (function () {
    function TimeListComponent(element, injector, dom, renderer, zone) {
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
    Object.defineProperty(TimeListComponent.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? undefined : 0;
        },
        enumerable: true,
        configurable: true
    });
    TimeListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.part) {
            this.service = this.injector.get(services[this.part.type]);
            this.service.configure(this.serviceSettings());
        }
        var value = this.value;
        var valueChanges = changes.value || {};
        var _a = this.service.limitRange(this.min, this.max, value), min = _a[0], max = _a[1];
        if (this.service.isRangeChanged(min, max) || changes.min || changes.max || changes.step) {
            this.data = [];
            this.service.configure(this.serviceSettings({ min: min, max: max }));
        }
        // Skip the rendering of the list whenever possible
        if (!this.data.length || this.hasMissingValue(valueChanges)) {
            this.animateToIndex = false;
            this.data = this.service.data(value);
        }
        this.animateToIndex = this.animateToIndex && this.textHasChanged(valueChanges);
        this.total = this.service.total(value);
        this.indexToScroll = this.selectedIndex(value);
    };
    TimeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.animateToIndex = true;
        this.dom.ensureHeights();
        this.itemHeight = this.dom.itemHeight;
        this.listHeight = this.dom.timeListHeight;
        this.topOffset = (this.listHeight - this.itemHeight) / 2;
        this.bottomOffset = this.listHeight - this.itemHeight;
        this.topThreshold = this.itemHeight * SNAP_THRESHOLD;
        this.bottomThreshold = this.itemHeight * (1 - SNAP_THRESHOLD);
        var translate = "translateY(" + this.topOffset + "px)";
        this.style = { transform: translate, '-ms-transform': translate };
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.bindEvents();
            });
        }
    };
    TimeListComponent.prototype.ngOnDestroy = function () {
        this.scrollSubscription.unsubscribe();
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
    TimeListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollOnce(function (index) { return _this.virtualization.scrollToIndex(index); });
    };
    TimeListComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this.scrollOnce(function (index) {
            var action = _this.animateToIndex ? 'animateToIndex' : 'scrollToIndex';
            _this.virtualization[action](index);
            _this.animateToIndex = true;
        });
    };
    TimeListComponent.prototype.handleChange = function (dataItem) {
        var candidate = this.service.apply(this.value, dataItem.value);
        if (this.value.getTime() === candidate.getTime()) {
            return;
        }
        this.indexToScroll = this.data.indexOf(dataItem);
        this.value = candidate;
        this.valueChange.emit(candidate);
    };
    TimeListComponent.prototype.handleItemClick = function (args) {
        var item = closestInScope(args.target, function (node) { return node.hasAttribute('data-timelist-item-index'); }, this.element.nativeElement);
        if (item) {
            var index = item.getAttribute('data-timelist-item-index');
            this.handleChange(this.data[index]);
        }
    };
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
    TimeListComponent.prototype.focus = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.focus();
    };
    /**
     * Blurs the TimeList component.
     */
    TimeListComponent.prototype.blur = function () {
        if (!this.element) {
            return;
        }
        this.element.nativeElement.blur();
    };
    TimeListComponent.prototype.itemOffset = function (scrollTop) {
        var valueIndex = this.selectedIndex(this.value);
        var activeIndex = this.virtualization.activeIndex();
        var offset = this.virtualization.itemOffset(activeIndex);
        var distance = Math.abs(Math.ceil(scrollTop) - offset);
        if (valueIndex === activeIndex && distance < SCROLL_THRESHOLD) {
            return offset;
        }
        var scrollUp = valueIndex > activeIndex;
        var moveToNext = scrollUp && distance >= this.bottomThreshold || !scrollUp && distance > this.topThreshold;
        return moveToNext ? this.virtualization.itemOffset(activeIndex + 1) : offset;
    };
    TimeListComponent.prototype.hasMissingValue = function (_a) {
        var previousValue = _a.previousValue, currentValue = _a.currentValue;
        var isPreviousMissing = previousValue && !this.service.valueInList(previousValue);
        var isCurrentMissing = currentValue && !this.service.valueInList(currentValue);
        return isPreviousMissing || isCurrentMissing;
    };
    TimeListComponent.prototype.scrollOnce = function (action) {
        if (this.indexToScroll !== -1) {
            action(this.indexToScroll);
            this.indexToScroll = -1;
        }
    };
    TimeListComponent.prototype.serviceSettings = function (settings) {
        var defaults = {
            boundRange: false,
            insertUndividedMax: false,
            max: this.max,
            min: this.min,
            part: this.part,
            step: this.step
        };
        var result = Object.assign({}, defaults, settings);
        result.boundRange = result.part.type !== 'hour';
        return result;
    };
    TimeListComponent.prototype.selectedIndex = function (value) {
        if (!value) {
            return -1;
        }
        return this.service.selectedIndex(value);
    };
    TimeListComponent.prototype.textHasChanged = function (_a) {
        var previousValue = _a.previousValue, currentValue = _a.currentValue;
        if (!previousValue || !currentValue) {
            return false;
        }
        var oldData = this.data[this.selectedIndex(previousValue)];
        var newData = this.data[this.selectedIndex(currentValue)];
        return oldData && newData && oldData.text !== newData.text;
    };
    TimeListComponent.prototype.handleKeyDown = function (e) {
        var getter = getters[e.keyCode] || nil;
        var dataItem = getter(this.data, this.service.selectedIndex(this.value));
        if (dataItem) {
            this.handleChange(dataItem);
            e.preventDefault();
        }
    };
    TimeListComponent.prototype.bindEvents = function () {
        var _this = this;
        this.scrollSubscription = this.virtualization
            .scroll$()
            .pipe(debounceTime(100), map(function (e) { return e.target.scrollTop; }), map(function (top) { return _this.itemOffset(top); }), map(function (itemOffset) { return _this.virtualization.itemIndex(itemOffset); }))
            .subscribe(function (index) {
            _this.virtualization.scrollToIndex(index);
            _this.handleChange(_this.data[index]);
        });
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', function () { return !_this.isActive && _this.focus(); }), this.renderer.listen(element, 'click', function () { return _this.focus(); }), this.renderer.listen(element, 'blur', function () { return _this.isActive = false; }), this.renderer.listen(element, 'focus', function () { return _this.isActive = true; }), this.renderer.listen(element, 'keydown', this.handleKeyDown.bind(this)));
    };
    TimeListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-timelist',
                    template: "\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"total\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [maxScrollDifference]=\"listHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        class=\"k-time-container\"\n        role=\"presentation\"\n        tabindex=\"-1\"\n    >\n        <ul [ngStyle]=\"style\" class=\"k-reset\"\n            [kendoEventsOutsideAngular]=\"{\n                click: handleItemClick\n            }\"\n            [scope]=\"this\"\n        >\n            <li *ngFor=\"let item of data; let index = index;\" class=\"k-item\"\n                [attr.data-timelist-item-index]=\"index\">\n                <span>{{item.text}}</span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    TimeListComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: TimePickerDOMService },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return TimeListComponent;
}());
export { TimeListComponent };
export { ɵ0 };
