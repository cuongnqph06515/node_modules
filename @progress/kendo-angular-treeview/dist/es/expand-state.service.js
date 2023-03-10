import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
/**
 * @hidden
 */
var ExpandStateService = /** @class */ (function () {
    function ExpandStateService() {
        this.changes = new Subject();
    }
    ExpandStateService.prototype.expand = function (index, dataItem) {
        this.changes.next({ dataItem: dataItem, index: index, expand: true });
    };
    ExpandStateService.prototype.collapse = function (index, dataItem) {
        this.changes.next({ dataItem: dataItem, index: index, expand: false });
    };
    ExpandStateService.decorators = [
        { type: Injectable },
    ];
    return ExpandStateService;
}());
export { ExpandStateService };
