import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { auditTime } from 'rxjs/operators';
/**
 * @hidden
 */
export const THROTTLE_MS = 1000 / 60;
/**
 * @hidden
 */
export class Change {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
/**
 * @hidden
 */
export class ConfigurationService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.store = {};
        this.source = new BehaviorSubject({});
        this.initSource();
    }
    initSource() {
        this.onFastChange$ = this.source.asObservable();
        this.onChange$ = this.onFastChange$.pipe(auditTime(THROTTLE_MS));
    }
    push(store) {
        this.store = store;
        this.next();
    }
    notify(change) {
        this.set(change.key, change.value);
        this.next();
    }
    set(field, value) {
        let store = this.store;
        const parts = field.split('.');
        let key = parts.shift();
        while (parts.length > 0) {
            store = store[key] = store[key] || {};
            key = parts.shift();
        }
        store[key] = value;
    }
    next() {
        this.ngZone.runOutsideAngular(() => {
            this.source.next(this.store);
        });
    }
}
ConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfigurationService.ctorParameters = () => [
    { type: NgZone }
];
