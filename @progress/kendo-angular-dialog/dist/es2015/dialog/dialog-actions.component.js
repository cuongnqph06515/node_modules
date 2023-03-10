/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, TemplateRef, Input, Output, ElementRef } from '@angular/core';
/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
export class DialogActionsComponent {
    constructor(el) {
        this.el = el;
        /**
         * Specifies the possible layout of the action buttons.
         */
        this.layout = 'stretched';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new EventEmitter();
        this.buttonGroupClassName = true;
    }
    get className() {
        return this.layout === 'stretched';
    }
    /**
     * @hidden
     */
    actionTemplate() {
        return this.actions instanceof TemplateRef;
    }
    /**
     * @hidden
     */
    onButtonClick(action, _e) {
        this.action.emit(action);
    }
    /**
     * @hidden
     */
    buttonClass(action) {
        const classes = ['k-button'];
        if (action.primary) {
            classes.push('k-primary');
        }
        return classes.join(' ');
    }
}
DialogActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-dialog-actions',
                template: `
        <ng-content *ngIf="!actions"></ng-content>
        <ng-container *ngIf="!actionTemplate()">
            <button
                type="button"
                [ngClass]="buttonClass(action)"
                (click)="onButtonClick(action, $event)"
                *ngFor="let action of actions"
                [attr.aria-label]="action.text"
            >
                {{ action.text }}
            </button>
        </ng-container>
        <ng-template [ngTemplateOutlet]="actions" *ngIf="actionTemplate()"></ng-template>
    `
            },] },
];
/** @nocollapse */
DialogActionsComponent.ctorParameters = () => [
    { type: ElementRef }
];
DialogActionsComponent.propDecorators = {
    actions: [{ type: Input }],
    layout: [{ type: Input }],
    action: [{ type: Output }],
    buttonGroupClassName: [{ type: HostBinding, args: ['class.k-dialog-buttongroup',] }],
    className: [{ type: HostBinding, args: ['class.k-dialog-button-layout-stretched',] }]
};
