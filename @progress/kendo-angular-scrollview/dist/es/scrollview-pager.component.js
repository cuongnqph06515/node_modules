import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var ScrollViewPagerComponent = /** @class */ (function () {
    function ScrollViewPagerComponent() {
        this.pagerIndexChange = new EventEmitter();
    }
    ScrollViewPagerComponent.prototype.itemClass = function (idx) {
        return {
            'k-primary': idx === this.activeIndex
        };
    };
    ScrollViewPagerComponent.prototype.indexChange = function (selectedIndex) {
        this.pagerIndexChange.emit(selectedIndex);
    };
    ScrollViewPagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scrollview-pager',
                    template: "\n      <ul class=\"k-scrollview-pageable\">\n        <li class=\"k-button\" *ngFor=\"let item of data; let i = index\"\n            [ngClass]=\"itemClass(i)\"\n            (click)=\"indexChange(i)\">\n        </li>\n      </ul>\n    "
                },] },
    ];
    ScrollViewPagerComponent.propDecorators = {
        activeIndex: [{ type: Input }],
        data: [{ type: Input }],
        pagerIndexChange: [{ type: Output }]
    };
    return ScrollViewPagerComponent;
}());
export { ScrollViewPagerComponent };
