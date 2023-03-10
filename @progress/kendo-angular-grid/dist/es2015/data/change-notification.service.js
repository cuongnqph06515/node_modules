/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, NgZone, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
export class ChangeNotificationService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
    }
    notify() {
        if (!this.subscription || this.subscription.closed) {
            this.subscription = this.ngZone.onStable
                .asObservable().pipe(take(1))
                .subscribe(() => this.changes.emit());
        }
    }
}
ChangeNotificationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChangeNotificationService.ctorParameters = () => [
    { type: NgZone }
];
