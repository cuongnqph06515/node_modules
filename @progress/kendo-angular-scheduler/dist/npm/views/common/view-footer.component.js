"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var ViewFooterComponent = /** @class */ (function () {
    function ViewFooterComponent() {
        this.hostClasses = true;
        this.itemClick = new core_1.EventEmitter();
    }
    ViewFooterComponent.prototype.onItemClick = function (e, item) {
        e.preventDefault();
        this.itemClick.emit(item);
    };
    ViewFooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[viewFooter]',
                    template: "\n        <ul class=\"k-reset k-header\">\n            <li class=\"k-state-default\" *ngFor=\"let item of items\" [ngClass]=\"item.cssClass\" (click)=\"onItemClick($event, item)\">\n                <a href=\"#\" class=\"k-link\" tabindex=\"-1\">\n                    <span class=\"k-icon\" [ngClass]=\"item.iconClass\"></span>\n                    {{ item.text }}\n                </a>\n            </li>\n        </ul>\n    "
                },] },
    ];
    ViewFooterComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-header',] }, { type: core_1.HostBinding, args: ['class.k-scheduler-footer',] }],
        itemClick: [{ type: core_1.Output }],
        items: [{ type: core_1.Input }]
    };
    return ViewFooterComponent;
}());
exports.ViewFooterComponent = ViewFooterComponent;
