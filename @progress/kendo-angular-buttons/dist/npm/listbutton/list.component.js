/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var button_item_template_directive_1 = require("./button-item-template.directive");
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.onItemClick = new core_1.EventEmitter();
        this.onItemBlur = new core_1.EventEmitter();
    }
    ListComponent.prototype.getText = function (dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    };
    ListComponent.prototype.getIconClasses = function (dataItem) {
        var icon = dataItem.icon ? 'k-icon k-i-' + dataItem.icon : undefined;
        var classes = {};
        classes[icon || dataItem.iconClass] = true;
        return classes;
    };
    ListComponent.prototype.onClick = function (index) {
        this.onItemClick.emit(index);
    };
    ListComponent.prototype.onBlur = function () {
        this.onItemBlur.emit();
    };
    ListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-button-list',
                    template: "\n        <ul class=\"k-list k-reset\" unselectable=\"on\">\n            <li role=\"menuItem\" unselectable=\"on\" tabindex=\"-1\"\n                kendoButtonFocusable\n                *ngFor=\"let dataItem of data; let index = index;\"\n                [index]=\"index\"\n                [ngClass]=\"{'k-item': true, 'k-state-disabled': dataItem.disabled}\"\n                (click)=\"onClick(index)\"\n                (blur)=\"onBlur()\"\n                [attr.aria-disabled]=\"dataItem.disabled ? true : false\">\n                <ng-template *ngIf=\"itemTemplate?.templateRef\"\n                    [templateContext]=\"{\n                        templateRef: itemTemplate?.templateRef,\n                        $implicit: dataItem\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!itemTemplate?.templateRef\">\n                    <span\n                        *ngIf=\"dataItem.icon || dataItem.iconClass\"\n                        [ngClass]=\"getIconClasses(dataItem)\"\n                    ></span>\n                    <img\n                        *ngIf=\"dataItem.imageUrl\"\n                        class=\"k-image\"\n                        [src]=\"dataItem.imageUrl\"\n                        alt=\"\"\n                    >\n                    {{ getText(dataItem) }}\n                </ng-template>\n            </li>\n        </ul>\n      "
                },] },
    ];
    ListComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.Input }],
        onItemClick: [{ type: core_1.Output }],
        onItemBlur: [{ type: core_1.Output }]
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
