/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
/**
 * @hidden
 */
export class GroupIndicatorComponent {
    constructor() {
        this.directionChange = new EventEmitter();
        this.remove = new EventEmitter();
    }
    get groupIndicatorClass() {
        return true;
    }
    get dir() {
        return this.group.dir ? this.group.dir : "asc";
    }
    toggleDirection() {
        this.directionChange.emit({
            dir: this.dir === "asc" ? "desc" : "asc",
            field: this.group.field
        });
        return false;
    }
    removeDescriptor() {
        this.remove.emit({
            dir: this.group.dir,
            field: this.group.field
        });
        return false;
    }
}
GroupIndicatorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: '[kendoGroupIndicator]',
                template: `
        <a href="#" class="k-link" tabindex="-1" (click)="toggleDirection()">
            <span class="k-icon"
                [class.k-i-sort-asc-sm]="dir === 'asc'"
                [class.k-i-sort-desc-sm]="dir === 'desc'"></span>
            {{groupTitle}}</a>
        <a class="k-button k-button-icon k-bare" tabindex="-1" (click)="removeDescriptor()">
            <span class="k-icon k-i-group-delete"></span>
        </a>
    `
            },] },
];
GroupIndicatorComponent.propDecorators = {
    directionChange: [{ type: Output }],
    remove: [{ type: Output }],
    group: [{ type: Input }],
    groupTitle: [{ type: Input }],
    groupIndicatorClass: [{ type: HostBinding, args: ["class.k-group-indicator",] }]
};
