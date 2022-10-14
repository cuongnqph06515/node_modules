/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../upload.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NavigationService } from '../navigation.service';
/**
 * @hidden
 */
export class UploadActionButtonsComponent {
    constructor(uploadService, localization, navigation) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.hostDefaultClass = true;
        this.onAction();
        this.onFocus();
    }
    get actionButtonsEndClassName() {
        return this.actionsLayout === 'end';
    }
    get actionButtonsStretchedClassName() {
        return this.actionsLayout === 'stretched';
    }
    get actionButtonsStartClassName() {
        return this.actionsLayout === 'start';
    }
    get actionButtonsCenterClassName() {
        return this.actionsLayout === 'center';
    }
    onAction() {
        this.actionSubscription = this.navigation.onActionButtonAction.subscribe((button) => {
            if (button === "clear") {
                this.clearFiles();
            }
            else {
                this.performUpload();
            }
            this.navigation.focusSelectButton();
        });
    }
    onFocus() {
        this.focusSubscription = this.navigation.onActionButtonFocus.subscribe((button) => {
            this.focusButton(button);
        });
    }
    focusButton(button) {
        const el = (button === "clear") ? this.clearButton : this.uploadButton;
        el.nativeElement.focus();
    }
    ngOnDestroy() {
        this.actionSubscription.unsubscribe();
        this.focusSubscription.unsubscribe();
    }
    performUpload(_event) {
        if (!this.disabled) {
            this.uploadService.uploadFiles();
        }
    }
    clearFiles(_event) {
        if (!this.disabled) {
            this.uploadService.clearFiles();
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
UploadActionButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-action-buttons',
                template: `
        <button #clearButton type="button" class="k-button k-clear-selected"
            [attr.tabIndex]="-1"
            (click)="clearFiles($event)">
                {{textFor('clearSelectedFiles')}}
        </button>
        <button #uploadButton type="button" class="k-button k-primary k-upload-selected"
            [attr.tabIndex]="-1"
            (click)="performUpload($event)">
                {{textFor('uploadSelectedFiles')}}
        </button>
    `
            },] },
];
/** @nocollapse */
UploadActionButtonsComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService },
    { type: NavigationService }
];
UploadActionButtonsComponent.propDecorators = {
    disabled: [{ type: Input }],
    actionsLayout: [{ type: Input }],
    clearButton: [{ type: ViewChild, args: ['clearButton',] }],
    uploadButton: [{ type: ViewChild, args: ['uploadButton',] }],
    hostDefaultClass: [{ type: HostBinding, args: ['class.k-actions',] }],
    actionButtonsEndClassName: [{ type: HostBinding, args: ['class.k-actions-end',] }],
    actionButtonsStretchedClassName: [{ type: HostBinding, args: ['class.k-actions-stretched',] }],
    actionButtonsStartClassName: [{ type: HostBinding, args: ['class.k-actions-start',] }],
    actionButtonsCenterClassName: [{ type: HostBinding, args: ['class.k-actions-center',] }]
};
