"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
/**
 * @hidden
 */
var ScrollViewPagerComponent = /** @class */ (function () {
    function ScrollViewPagerComponent() {
        this.pagerIndexChange = new core_2.EventEmitter();
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-scrollview-pager',
                    template: "\n      <ul class=\"k-scrollview-pageable\">\n        <li class=\"k-button\" *ngFor=\"let item of data; let i = index\"\n            [ngClass]=\"itemClass(i)\"\n            (click)=\"indexChange(i)\">\n        </li>\n      </ul>\n    "
                },] },
    ];
    ScrollViewPagerComponent.propDecorators = {
        activeIndex: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        pagerIndexChange: [{ type: core_1.Output }]
    };
    return ScrollViewPagerComponent;
}());
exports.ScrollViewPagerComponent = ScrollViewPagerComponent;
