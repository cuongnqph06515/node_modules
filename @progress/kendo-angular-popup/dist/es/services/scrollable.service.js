/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { DOMService } from './dom.service';
import { FRAME_DURATION } from '../util';
/**
 * @hidden
 */
export var THRESHOLD_DIFF = 1;
/**
 * @hidden
 */
var ScrollableService = /** @class */ (function () {
    function ScrollableService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ScrollableService.prototype.forElement = function (element) {
        this.unsubscribe();
        this.element = element;
        return this;
    };
    ScrollableService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!callback || !isDocumentAvailable() || !this.element) {
            return;
        }
        var nativeElement = this._dom.nativeElement(this.element);
        var parents = this._dom.scrollableParents(this.element);
        this._zone.runOutsideAngular(function () {
            var observables = parents.map(function (p) { return fromEvent(p, "scroll").pipe(auditTime(FRAME_DURATION)); });
            var subscriber = function (e) {
                var target = e.target;
                var isParent = parents.filter(function (p) { return p === target; }).length > 0;
                var isDocument = target === document;
                var isWindow = target === window;
                if (isParent || isDocument || isWindow) {
                    callback(_this.isVisible(nativeElement, target));
                }
            };
            _this.subscription = merge.apply(void 0, observables).subscribe(subscriber);
        });
    };
    ScrollableService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ScrollableService.prototype.isVisible = function (elem, container) {
        var elemRect = this._dom.boundingOffset(elem);
        var containerRect = this._dom.boundingOffset(container);
        if (THRESHOLD_DIFF < (containerRect.top - elemRect.bottom)) {
            return false;
        }
        if (THRESHOLD_DIFF < (elemRect.top - containerRect.bottom)) {
            return false;
        }
        if (THRESHOLD_DIFF < (elemRect.left - containerRect.right)) {
            return false;
        }
        if (THRESHOLD_DIFF < (containerRect.left - elemRect.right)) {
            return false;
        }
        return true;
    };
    ScrollableService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollableService.ctorParameters = function () { return [
        { type: DOMService },
        { type: NgZone }
    ]; };
    return ScrollableService;
}());
export { ScrollableService };
