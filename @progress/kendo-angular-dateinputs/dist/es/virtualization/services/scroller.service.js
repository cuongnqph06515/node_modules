/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable, ReplaySubject } from 'rxjs';
var normalize = function (x) { return Math.max(x, 0); };
var ɵ0 = normalize;
/**
 * @hidden
 */
var ScrollAction = /** @class */ (function () {
    function ScrollAction(offset) {
        this.offset = offset;
    }
    return ScrollAction;
}());
export { ScrollAction };
/**
 * @hidden
 */
var PageAction = /** @class */ (function () {
    function PageAction(skip) {
        this.skip = skip;
    }
    return PageAction;
}());
export { PageAction };
/**
 * @hidden
 */
var ScrollerService = /** @class */ (function () {
    function ScrollerService(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
        this.bottomOffset = 0;
        this.topOffset = 0;
    }
    ScrollerService.prototype.create = function (rowHeightService, skip, take, total, topOffset, bottomOffset, direction) {
        var _this = this;
        if (topOffset === void 0) { topOffset = 0; }
        if (bottomOffset === void 0) { bottomOffset = 0; }
        if (direction === void 0) { direction = 'vertical'; }
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take;
        this.take = take;
        this.total = total;
        this.lastScroll = 0;
        this.topOffset = topOffset;
        this.bottomOffset = bottomOffset;
        this.direction = direction;
        var subject = new ReplaySubject(2);
        var offsetBufferRows = this.rowsForHeight(topOffset);
        var skipWithOffset = normalize(skip - offsetBufferRows);
        subject.next(new ScrollAction(this.rowOffset(skipWithOffset)));
        if (offsetBufferRows) {
            subject.next(new PageAction(skipWithOffset));
        }
        this.subscription = Observable.create(function (observer) {
            _this.unsubscribe();
            _this.scrollSubscription = _this.scrollObservable.subscribe(function (x) { return _this.onScroll(x, observer); });
        }).subscribe(function (x) { return subject.next(x); });
        return subject;
    };
    ScrollerService.prototype.destroy = function () {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ScrollerService.prototype.onScroll = function (_a, observer) {
        var scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
        var scrollPosition = this.direction === 'vertical' ? scrollTop : scrollLeft;
        var offsetSize = this.direction === 'vertical' ? offsetHeight : offsetWidth;
        if (this.lastScroll === scrollPosition) {
            return;
        }
        var up = this.lastScroll >= scrollPosition;
        this.lastScroll = scrollPosition;
        var firstItemIndex = this.rowHeightService.index(normalize(scrollPosition - this.topOffset));
        var lastItemIndex = this.rowHeightService.index(normalize(scrollPosition + offsetSize - this.bottomOffset));
        if (!up && lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
            this.firstLoaded = firstItemIndex;
            observer.next(new ScrollAction(this.rowOffset(firstItemIndex)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
        if (up && firstItemIndex <= this.firstLoaded) {
            var nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = normalize(firstItemIndex - nonVisibleBuffer);
            observer.next(new ScrollAction(this.rowOffset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded));
        }
    };
    ScrollerService.prototype.rowOffset = function (index) {
        return this.rowHeightService.offset(index) + this.topOffset;
    };
    ScrollerService.prototype.rowsForHeight = function (height) {
        return Math.ceil(height / this.rowHeightService.height(0));
    };
    ScrollerService.prototype.unsubscribe = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = null;
        }
    };
    return ScrollerService;
}());
export { ScrollerService };
export { ɵ0 };
