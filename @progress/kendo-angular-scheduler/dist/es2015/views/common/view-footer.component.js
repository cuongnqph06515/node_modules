import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class ViewFooterComponent {
    constructor() {
        this.hostClasses = true;
        this.itemClick = new EventEmitter();
    }
    onItemClick(e, item) {
        e.preventDefault();
        this.itemClick.emit(item);
    }
}
ViewFooterComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[viewFooter]',
                template: `
        <ul class="k-reset k-header">
            <li class="k-state-default" *ngFor="let item of items" [ngClass]="item.cssClass" (click)="onItemClick($event, item)">
                <a href="#" class="k-link" tabindex="-1">
                    <span class="k-icon" [ngClass]="item.iconClass"></span>
                    {{ item.text }}
                </a>
            </li>
        </ul>
    `
            },] },
];
ViewFooterComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-scheduler-footer',] }],
    itemClick: [{ type: Output }],
    items: [{ type: Input }]
};
