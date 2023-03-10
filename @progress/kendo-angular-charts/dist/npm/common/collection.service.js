"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
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
exports.ItemChange = ItemChange;
/**
 * @hidden
 */
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        this.source = new rxjs_1.Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    CollectionService.prototype.notify = function (change) {
        this.source.next(change);
    };
    CollectionService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = function () { return []; };
    return CollectionService;
}());
exports.CollectionService = CollectionService;
