/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
var DialogActionsComponent = /** @class */ (function () {
    function DialogActionsComponent(el) {
        this.el = el;
        /**
         * Specifies the possible layout of the action buttons.
         */
        this.layout = 'stretched';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new core_1.EventEmitter();
        this.buttonGroupClassName = true;
    }
    Object.defineProperty(DialogActionsComponent.prototype, "className", {
        get: function () {
            return this.layout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.actionTemplate = function () {
        return this.actions instanceof core_1.TemplateRef;
    };
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.onButtonClick = function (action, _e) {
        this.action.emit(action);
    };
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.buttonClass = function (action) {
        var classes = ['k-button'];
        if (action.primary) {
            classes.push('k-primary');
        }
        return classes.join(' ');
    };
    DialogActionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-dialog-actions',
                    template: "\n        <ng-content *ngIf=\"!actions\"></ng-content>\n        <ng-container *ngIf=\"!actionTemplate()\">\n            <button\n                type=\"button\"\n                [ngClass]=\"buttonClass(action)\"\n                (click)=\"onButtonClick(action, $event)\"\n                *ngFor=\"let action of actions\"\n                [attr.aria-label]=\"action.text\"\n            >\n                {{ action.text }}\n            </button>\n        </ng-container>\n        <ng-template [ngTemplateOutlet]=\"actions\" *ngIf=\"actionTemplate()\"></ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogActionsComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef }
    ]; };
    DialogActionsComponent.propDecorators = {
        actions: [{ type: core_1.Input }],
        layout: [{ type: core_1.Input }],
        action: [{ type: core_1.Output }],
        buttonGroupClassName: [{ type: core_1.HostBinding, args: ['class.k-dialog-buttongroup',] }],
        className: [{ type: core_1.HostBinding, args: ['class.k-dialog-button-layout-stretched',] }]
    };
    return DialogActionsComponent;
}());
exports.DialogActionsComponent = DialogActionsComponent;
