import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class ScrollViewPagerComponent {
    constructor() {
        this.pagerIndexChange = new EventEmitter();
    }
    itemClass(idx) {
        return {
            'k-primary': idx === this.activeIndex
        };
    }
    indexChange(selectedIndex) {
        this.pagerIndexChange.emit(selectedIndex);
    }
}
ScrollViewPagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scrollview-pager',
                template: `
      <ul class="k-scrollview-pageable">
        <li class="k-button" *ngFor="let item of data; let i = index"
            [ngClass]="itemClass(i)"
            (click)="indexChange(i)">
        </li>
      </ul>
    `
            },] },
];
ScrollViewPagerComponent.propDecorators = {
    activeIndex: [{ type: Input }],
    data: [{ type: Input }],
    pagerIndexChange: [{ type: Output }]
};
