/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { from as fromPromise } from 'rxjs';
/* tslint:disable:align */
/**
 * @hidden
 */
var ResizeBatchService = /** @class */ (function () {
    function ResizeBatchService(ngZone) {
        this.ngZone = ngZone;
        this.scheduled = [];
        this.resolvedPromise = Promise.resolve(null);
        this.flush = this.flush.bind(this);
    }
    ResizeBatchService.prototype.schedule = function (instance, method) {
        var _this = this;
        this.scheduled.push({ instance: instance, method: method });
        if (!this.subscription) {
            this.ngZone.runOutsideAngular(function () {
                _this.subscription = fromPromise(_this.resolvedPromise)
                    .subscribe(_this.flush);
            });
        }
    };
    ResizeBatchService.prototype.isScheduled = function (instance) {
        return Boolean(this.scheduled.find(function (item) { return item.instance === instance; }));
    };
    ResizeBatchService.prototype.cancel = function (instance) {
        var scheduled = this.scheduled;
        var count = scheduled.length;
        for (var idx = 0; idx < count; idx++) {
            if (scheduled[idx].instance === instance) {
                scheduled.splice(idx, 1);
                if (!scheduled.length) {
                    this.unsubscribe();
                }
                return;
            }
        }
    };
    ResizeBatchService.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    ResizeBatchService.prototype.unsubscribe = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    ResizeBatchService.prototype.flush = function () {
        this.scheduled.forEach(function (item) {
            item.method.call(item.instance);
        });
        this.scheduled = [];
        this.unsubscribe();
    };
    ResizeBatchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeBatchService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ResizeBatchService;
}());
export { ResizeBatchService };
