/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
/**
 * @hidden
 */
var GroupIndicatorComponent = /** @class */ (function () {
    function GroupIndicatorComponent() {
        this.directionChange = new EventEmitter();
        this.remove = new EventEmitter();
    }
    Object.defineProperty(GroupIndicatorComponent.prototype, "groupIndicatorClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupIndicatorComponent.prototype, "dir", {
        get: function () {
            return this.group.dir ? this.group.dir : "asc";
        },
        enumerable: true,
        configurable: true
    });
    GroupIndicatorComponent.prototype.toggleDirection = function () {
        this.directionChange.emit({
            dir: this.dir === "asc" ? "desc" : "asc",
            field: this.group.field
        });
        return false;
    };
    GroupIndicatorComponent.prototype.removeDescriptor = function () {
        this.remove.emit({
            dir: this.group.dir,
            field: this.group.field
        });
        return false;
    };
    GroupIndicatorComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: '[kendoGroupIndicator]',
                    template: "\n        <a href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"toggleDirection()\">\n            <span class=\"k-icon\"\n                [class.k-i-sort-asc-sm]=\"dir === 'asc'\"\n                [class.k-i-sort-desc-sm]=\"dir === 'desc'\"></span>\n            {{groupTitle}}</a>\n        <a class=\"k-button k-button-icon k-bare\" tabindex=\"-1\" (click)=\"removeDescriptor()\">\n            <span class=\"k-icon k-i-group-delete\"></span>\n        </a>\n    "
                },] },
    ];
    GroupIndicatorComponent.propDecorators = {
        directionChange: [{ type: Output }],
        remove: [{ type: Output }],
        group: [{ type: Input }],
        groupTitle: [{ type: Input }],
        groupIndicatorClass: [{ type: HostBinding, args: ["class.k-group-indicator",] }]
    };
    return GroupIndicatorComponent;
}());
export { GroupIndicatorComponent };
