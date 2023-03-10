import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @hidden
 */
var ItemChange = /** @class */ (function () {
    function ItemChange(sender, options) {
        this.sender = sender;
        this.options = options;
    }
    return ItemChange;
}());
export { ItemChange };
/**
 * @hidden
 */
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        this.source = new Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    CollectionService.prototype.notify = function (change) {
        this.source.next(change);
    };
    CollectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = function () { return []; };
    return CollectionService;
}());
export { CollectionService };
