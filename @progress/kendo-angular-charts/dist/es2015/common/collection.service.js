import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @hidden
 */
export class ItemChange {
    constructor(sender, options) {
        this.sender = sender;
        this.options = options;
    }
}
/**
 * @hidden
 */
export class CollectionService {
    constructor() {
        this.source = new Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    notify(change) {
        this.source.next(change);
    }
}
CollectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CollectionService.ctorParameters = () => [];
