/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, TemplateRef, forwardRef, ViewChild, ContentChildren, QueryList, Input } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
import { ToolBarButtonComponent } from './toolbar-button.component';
import { ButtonGroupNavigationService } from '../navigation/buttongroup-navigation.service';
/**
 * Represents the Kendo UI Toolbar ButtonGroup for Angular.
 */
export class ToolBarButtonGroupComponent extends ToolBarToolComponent {
    constructor() {
        super();
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options.
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        this.navigationService = new ButtonGroupNavigationService();
    }
    selectedChangeHandler(state, button) {
        button.selected = state;
        button.selectedChange.emit(state);
    }
}
ToolBarButtonGroupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarButtonGroup',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarButtonGroupComponent) }],
                selector: 'kendo-toolbar-buttongroup',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-buttongroup [tabIndex]="tabIndex" [selection]="selection" [disabled]="disabled" [look]="look" [width]="width">
                <button
                    type="button"
                    kendoButton
                    *ngFor="let button of buttons"
                    [ngStyle]="button.style"
                    [ngClass]="button.className"
                    [attr.title]="button.title"
                    [disabled]="button.disabled"
                    [togglable]="button.togglable"
                    [primary]="button.primary"
                    [selected]="button.selected"
                    [icon]="button.toolbarOptions.icon"
                    [iconClass]="button.toolbarOptions.iconClass"
                    [imageUrl]="button.toolbarOptions.imageUrl"
                    (click)="button.click.emit($event)"
                    (selectedChange)="selectedChangeHandler($event, button)"
                >
                    {{ button.toolbarOptions.text }}
                </button>
            </kendo-buttongroup>
        </ng-template>
        <ng-template #popupTemplate>
            <kendo-buttongroup
                class="k-overflow-button"
                [tabIndex]="tabIndex"
                [selection]="selection"
                [disabled]="disabled"
                [look]="look"
                [width]="width"
            >
                <button
                    type="button"
                    kendoButton
                    class="k-overflow-button"
                    *ngFor="let button of buttons"
                    [ngStyle]="button.style"
                    [ngClass]="button.className"
                    [attr.title]="button.title"
                    [disabled]="button.disabled"
                    [togglable]="button.togglable"
                    [primary]="button.primary"
                    [selected]="button.selected"
                    [icon]="button.overflowOptions.icon"
                    [iconClass]="button.overflowOptions.iconClass"
                    [imageUrl]="button.overflowOptions.imageUrl"
                    (click)="button.click.emit($event)"
                    (selectedChange)="selectedChangeHandler($event, button)"
                >
                    {{ button.overflowOptions.text }}
                </button>
            </kendo-buttongroup>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarButtonGroupComponent.ctorParameters = () => [];
ToolBarButtonGroupComponent.propDecorators = {
    disabled: [{ type: Input }],
    selection: [{ type: Input }],
    width: [{ type: Input }],
    look: [{ type: Input }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    buttons: [{ type: ContentChildren, args: [forwardRef(() => ToolBarButtonComponent),] }]
};
