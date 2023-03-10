import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
/**
 * @hidden
 */
var SelectionService = /** @class */ (function () {
    function SelectionService() {
        this.changes = new Subject();
    }
    SelectionService.prototype.isFirstSelected = function (index) {
        return this.firstIndex === index;
    };
    SelectionService.prototype.setFirstSelected = function (index, selected) {
        if (this.firstIndex === index && selected === false) {
            this.firstIndex = null;
        }
        else if (!this.firstIndex && selected) {
            this.firstIndex = index;
        }
    };
    SelectionService.prototype.select = function (index, dataItem) {
        this.changes.next({ dataItem: dataItem, index: index });
    };
    SelectionService.decorators = [
        { type: Injectable },
    ];
    return SelectionService;
}());
export { SelectionService };
