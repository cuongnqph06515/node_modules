import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var ViewFooterComponent = /** @class */ (function () {
    function ViewFooterComponent() {
        this.hostClasses = true;
        this.itemClick = new EventEmitter();
    }
    ViewFooterComponent.prototype.onItemClick = function (e, item) {
        e.preventDefault();
        this.itemClick.emit(item);
    };
    ViewFooterComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[viewFooter]',
                    template: "\n        <ul class=\"k-reset k-header\">\n            <li class=\"k-state-default\" *ngFor=\"let item of items\" [ngClass]=\"item.cssClass\" (click)=\"onItemClick($event, item)\">\n                <a href=\"#\" class=\"k-link\" tabindex=\"-1\">\n                    <span class=\"k-icon\" [ngClass]=\"item.iconClass\"></span>\n                    {{ item.text }}\n                </a>\n            </li>\n        </ul>\n    "
                },] },
    ];
    ViewFooterComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-scheduler-footer',] }],
        itemClick: [{ type: Output }],
        items: [{ type: Input }]
    };
    return ViewFooterComponent;
}());
export { ViewFooterComponent };
