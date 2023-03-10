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
export class ResizeBatchService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.scheduled = [];
        this.resolvedPromise = Promise.resolve(null);
        this.flush = this.flush.bind(this);
    }
    schedule(instance, method) {
        this.scheduled.push({ instance, method });
        if (!this.subscription) {
            this.ngZone.runOutsideAngular(() => {
                this.subscription = fromPromise(this.resolvedPromise)
                    .subscribe(this.flush);
            });
        }
    }
    isScheduled(instance) {
        return Boolean(this.scheduled.find(item => item.instance === instance));
    }
    cancel(instance) {
        const scheduled = this.scheduled;
        const count = scheduled.length;
        for (let idx = 0; idx < count; idx++) {
            if (scheduled[idx].instance === instance) {
                scheduled.splice(idx, 1);
                if (!scheduled.length) {
                    this.unsubscribe();
                }
                return;
            }
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
    flush() {
        this.scheduled.forEach(item => {
            item.method.call(item.instance);
        });
        this.scheduled = [];
        this.unsubscribe();
    }
}
ResizeBatchService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResizeBatchService.ctorParameters = () => [
    { type: NgZone }
];
