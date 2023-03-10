/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var virtualization_component_1 = require("../virtualization/virtualization.component");
var defaults_1 = require("../defaults");
var time_part_default_1 = require("./models/time-part.default");
var dom_service_1 = require("./services/dom.service");
var hours_service_1 = require("./services/hours.service");
var minutes_service_1 = require("./services/minutes.service");
var seconds_service_1 = require("./services/seconds.service");
var dayperiod_service_1 = require("./services/dayperiod.service");
var dom_queries_1 = require("../common/dom-queries");
var SNAP_THRESHOLD = 0.05; //% of the item height
var SCROLL_THRESHOLD = 2; //< 2px threshold
var nil = function () { return (null); };
var ɵ0 = nil;
exports.ɵ0 = ɵ0;
var getters = {
    35: function (data, _) { return data[data.length - 1]; },
    36: function (data, _) { return data[0]; },
    38: function (data, index) { return data[index - 1]; },
    40: function (data, index) { return data[index + 1]; }
};
var services = (_a = {},
    _a[time_part_default_1.TIME_PART.dayperiod] = dayperiod_service_1.DayPeriodService,
    _a[time_part_default_1.TIME_PART.hour] = hours_service_1.HoursService,
    _a[time_part_default_1.TIME_PART.minute] = minutes_service_1.MinutesService,
    _a[time_part_default_1.TIME_PART.second] = seconds_service_1.SecondsService,
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
        this.min = kendo_date_math_1.cloneDate(defaults_1.MIDNIGHT_DATE);
        this.max = kendo_date_math_1.cloneDate(defaults_1.MAX_TIME);
        this.step = 1;
        this.disabled = false;
        this.valueChange = new core_1.EventEmitter();
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
        var item = dom_queries_1.closestInScope(args.target, function (node) { return node.hasAttribute('data-timelist-item-index'); }, this.element.nativeElement);
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
            .pipe(operators_1.debounceTime(100), operators_1.map(function (e) { return e.target.scrollTop; }), operators_1.map(function (top) { return _this.itemOffset(top); }), operators_1.map(function (itemOffset) { return _this.virtualization.itemIndex(itemOffset); }))
            .subscribe(function (index) {
            _this.virtualization.scrollToIndex(index);
            _this.handleChange(_this.data[index]);
        });
        var element = this.element.nativeElement;
        this.domEvents.push(this.renderer.listen(element, 'mouseover', function () { return !_this.isActive && _this.focus(); }), this.renderer.listen(element, 'click', function () { return _this.focus(); }), this.renderer.listen(element, 'blur', function () { return _this.isActive = false; }), this.renderer.listen(element, 'focus', function () { return _this.isActive = true; }), this.renderer.listen(element, 'keydown', this.handleKeyDown.bind(this)));
    };
    TimeListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-timelist',
                    template: "\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"total\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [maxScrollDifference]=\"listHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        class=\"k-time-container\"\n        role=\"presentation\"\n        tabindex=\"-1\"\n    >\n        <ul [ngStyle]=\"style\" class=\"k-reset\"\n            [kendoEventsOutsideAngular]=\"{\n                click: handleItemClick\n            }\"\n            [scope]=\"this\"\n        >\n            <li *ngFor=\"let item of data; let index = index;\" class=\"k-item\"\n                [attr.data-timelist-item-index]=\"index\">\n                <span>{{item.text}}</span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    TimeListComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Injector },
        { type: dom_service_1.TimePickerDOMService },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    TimeListComponent.propDecorators = {
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        part: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        virtualization: [{ type: core_1.ViewChild, args: [virtualization_component_1.VirtualizationComponent, { static: true },] }],
        tabIndex: [{ type: core_1.HostBinding, args: ["attr.tabindex",] }],
        componentClass: [{ type: core_1.HostBinding, args: ["class.k-time-list",] }]
    };
    return TimeListComponent;
}());
exports.TimeListComponent = TimeListComponent;
