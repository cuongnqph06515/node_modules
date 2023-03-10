/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var _a, _b, _c;
/* tslint:disable:component-selector-name  component-selector-type */
import { Component, EventEmitter, ElementRef, HostBinding, Input, Inject, Output, InjectionToken, Renderer2, NgZone } from '@angular/core';
import { RowHeightService } from './services/row-height.service';
import { ScrollerService, PageAction } from './services/scroller.service';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { Subject, fromEvent, interval, EMPTY, of, combineLatest, animationFrameScheduler as animationFrame } from 'rxjs';
import { map, scan, takeWhile } from 'rxjs/operators';
/**
 * @hidden
 */
export var SCROLLER_FACTORY_TOKEN = new InjectionToken('dateinputs-scroll-service-factory');
/**
 * @hidden
 */
export function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
/**
 * @hidden
 */
export var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Backward"] = 0] = "Backward";
    ScrollDirection[ScrollDirection["Forward"] = 1] = "Forward";
})(ScrollDirection || (ScrollDirection = {}));
var FRAME_DURATION = 17;
var scrollModifiers = (_a = {},
    _a[ScrollDirection.Forward] = function (step) { return function (value) { return value + step; }; },
    _a[ScrollDirection.Backward] = function (step) { return function (value) { return value - step; }; },
    _a);
var scrollNormalizers = (_b = {},
    _b[ScrollDirection.Forward] = function (end) { return function (value) { return Math.min(value, end); }; },
    _b[ScrollDirection.Backward] = function (end) { return function (value) { return Math.max(value, end); }; },
    _b);
var scrollValidators = (_c = {},
    _c[ScrollDirection.Forward] = function (end) { return function (start) { return start < end; }; },
    _c[ScrollDirection.Backward] = function (end) { return function (start) { return start > end; }; },
    _c);
var differenceToScroll = function (scrollTop, staticOffset, maxScrollDifference) {
    return Math.min(Math.abs(staticOffset - scrollTop), maxScrollDifference);
};
var ɵ0 = differenceToScroll;
/**
 * @hidden
 */
var VirtualizationComponent = /** @class */ (function () {
    function VirtualizationComponent(scrollerFactory, container, renderer, zone) {
        this.container = container;
        this.renderer = renderer;
        this.zone = zone;
        this.direction = 'vertical';
        this.itemHeight = 1;
        this.itemWidth = 1;
        this.topOffset = 0;
        this.bottomOffset = 0;
        this.maxScrollDifference = 100;
        this.scrollOffsetSize = 0;
        this.scrollDuration = 150;
        this.activeIndexChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.scrollChange = new EventEmitter();
        this.resolvedPromise = Promise.resolve(null);
        this.dispatcher = new Subject();
        this.scroller = scrollerFactory(this.dispatcher);
    }
    Object.defineProperty(VirtualizationComponent.prototype, "totalVertexLength", {
        get: function () {
            var value = this.totalSize + "px";
            return this.direction === 'vertical' ? { height: value } : { width: value };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerOffsetSize", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerScrollSize", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "containerScrollPosition", {
        get: function () {
            return this.getContainerProperty(this.direction === 'vertical' ? 'scrollTop' : 'scrollLeft');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "wrapperClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualizationComponent.prototype, "horizontalClass", {
        get: function () {
            return this.direction === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    VirtualizationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.direction || changes.take || changes.total) {
            this.initServices();
            this.totalSize = this.rowHeightService.totalHeight() + this.bottomOffset;
        }
    };
    VirtualizationComponent.prototype.ngOnInit = function () {
        if (!this.rowHeightService) {
            this.rowHeightService = this.createRowHeightService();
        }
    };
    VirtualizationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.containerScrollSubscription = _this.scroll$()
                .pipe(map(function (event) { return event.target; }))
                .subscribe(function (t) {
                _this.dispatcher.next(t);
                _this.emitActiveIndex();
            });
        });
    };
    VirtualizationComponent.prototype.ngOnDestroy = function () {
        if (this.containerScrollSubscription) {
            this.containerScrollSubscription.unsubscribe();
        }
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
    };
    VirtualizationComponent.prototype.getContainerProperty = function (propertyName) {
        return this.container.nativeElement[propertyName];
    };
    VirtualizationComponent.prototype.activeIndex = function () {
        return this.itemIndex(Math.ceil(this.containerScrollPosition)); //handle subpixeling
    };
    VirtualizationComponent.prototype.itemIndex = function (offset) {
        return this.rowHeightService.index(offset);
    };
    VirtualizationComponent.prototype.itemOffset = function (index) {
        return this.rowHeightService.offset(index);
    };
    VirtualizationComponent.prototype.isIndexVisible = function (index) {
        if (!this.rowHeightService) {
            return false;
        }
        var containerTop = this.containerScrollPosition;
        var containerBottom = containerTop + this.containerOffsetSize;
        var top = this.rowHeightService.offset(index);
        var bottom = top + this.rowHeightService.height(index);
        return top >= containerTop && bottom <= containerBottom;
    };
    VirtualizationComponent.prototype.isListScrolled = function (index) {
        return this.containerScrollPosition !== this.rowHeightService.offset(index);
    };
    VirtualizationComponent.prototype.scrollTo = function (value) {
        var scrollProperty = this.direction === "vertical" ? 'scrollTop' : 'scrollLeft';
        this.renderer.setProperty(this.container.nativeElement, scrollProperty, value);
    };
    VirtualizationComponent.prototype.scrollToIndex = function (index) {
        //XXX: scrolling with tick is required to prevent list jump in Chrome.
        //Original issue: focus first day in the month and press LEFT arrow.
        //Notice how the view jumps on every day change.
        //
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.resolvedPromise.then(function () {
                _this.scrollTo(_this.rowHeightService.offset(index));
            });
        });
    };
    VirtualizationComponent.prototype.scrollToBottom = function () {
        this.scrollTo(this.totalSize);
    };
    VirtualizationComponent.prototype.animateToIndex = function (index) {
        var _this = this;
        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
        }
        var indexOffset = this.rowHeightService.offset(index);
        var direction = this.getContainerScrollDirection(indexOffset);
        var _a = this.scrollRange(indexOffset, direction), start = _a.start, end = _a.end;
        if (start === end) {
            return;
        }
        var step = this.scrollStep(start, end);
        var modifyScroll = scrollModifiers[direction](step);
        var normalizeScroll = scrollNormalizers[direction](end);
        var isScrollValid = scrollValidators[direction](modifyScroll(end));
        this.zone.runOutsideAngular(function () {
            _this.animationSubscription =
                combineLatest(of(start), interval(0, animationFrame)).pipe(map(function (stream) { return stream[0]; }), scan(modifyScroll), takeWhile(isScrollValid), map(normalizeScroll)).subscribe(function (x) { return _this.scrollTo(x); });
        });
    };
    VirtualizationComponent.prototype.scrollRange = function (indexOffset, direction) {
        var containerScroll = this.containerScrollPosition;
        if (parseInt(indexOffset, 10) === parseInt(containerScroll, 10)) {
            return { start: indexOffset, end: indexOffset };
        }
        var maxScroll = this.containerMaxScroll();
        var sign = direction === ScrollDirection.Backward ? 1 : -1;
        var difference = differenceToScroll(containerScroll, indexOffset, this.maxScrollDifference);
        var end = Math.min(indexOffset, maxScroll);
        var start = Math.min(Math.max(end + (sign * difference), 0), maxScroll);
        return { start: start, end: end };
    };
    VirtualizationComponent.prototype.scrollStep = function (start, end) {
        return Math.abs(end - start) / (this.scrollDuration / FRAME_DURATION);
    };
    VirtualizationComponent.prototype.scroll$ = function () {
        return isDocumentAvailable() ? fromEvent(this.container.nativeElement, 'scroll') : EMPTY;
    };
    VirtualizationComponent.prototype.initServices = function () {
        var _this = this;
        this.rowHeightService = this.createRowHeightService();
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        this.scrollSubscription = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total, this.topOffset, this.scrollOffsetSize, this.direction)
            .subscribe(function (x) {
            if (x instanceof PageAction) {
                _this.pageChange.emit(x);
            }
            else {
                _this.scrollChange.emit(x);
            }
        });
    };
    VirtualizationComponent.prototype.createRowHeightService = function () {
        var dimension = this.direction === 'vertical' ? this.itemHeight : this.itemWidth;
        return new RowHeightService(this.total, dimension, 0);
    };
    VirtualizationComponent.prototype.emitActiveIndex = function () {
        var index = this.rowHeightService.index(this.containerScrollPosition - this.topOffset);
        if (this.lastActiveIndex !== index) {
            this.lastActiveIndex = index;
            this.activeIndexChange.emit(index);
        }
    };
    VirtualizationComponent.prototype.containerMaxScroll = function () {
        return this.containerScrollSize - this.containerOffsetSize;
    };
    VirtualizationComponent.prototype.getContainerScrollDirection = function (indexOffset) {
        return indexOffset < this.containerScrollPosition ? ScrollDirection.Backward : ScrollDirection.Forward;
    };
    VirtualizationComponent.decorators = [
        { type: Component, args: [{
                    providers: [{
                            provide: SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }],
                    selector: 'kendo-virtualization',
                    template: "\n    <ng-content></ng-content>\n    <div\n        class=\"k-scrollable-placeholder\"\n        [class.k-scrollable-horizontal-placeholder]=\"direction === 'horizontal'\"\n        [ngStyle]=\"totalVertexLength\"\n    ></div>\n  "
                },] },
    ];
    /** @nocollapse */
    VirtualizationComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    VirtualizationComponent.propDecorators = {
        direction: [{ type: Input }],
        itemHeight: [{ type: Input }],
        itemWidth: [{ type: Input }],
        topOffset: [{ type: Input }],
        bottomOffset: [{ type: Input }],
        maxScrollDifference: [{ type: Input }],
        scrollOffsetSize: [{ type: Input }],
        scrollDuration: [{ type: Input }],
        skip: [{ type: Input }],
        take: [{ type: Input }],
        total: [{ type: Input }],
        activeIndexChange: [{ type: Output }],
        pageChange: [{ type: Output }],
        scrollChange: [{ type: Output }],
        wrapperClasses: [{ type: HostBinding, args: ['class.k-content',] }, { type: HostBinding, args: ['class.k-scrollable',] }],
        horizontalClass: [{ type: HostBinding, args: ['class.k-scrollable-horizontal',] }]
    };
    return VirtualizationComponent;
}());
export { VirtualizationComponent };
export { ɵ0 };
