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
var UploadActionButtonsComponent = /** @class */ (function () {
    function UploadActionButtonsComponent(uploadService, localization, navigation) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.hostDefaultClass = true;
        this.onAction();
        this.onFocus();
    }
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsEndClassName", {
        get: function () {
            return this.actionsLayout === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsStretchedClassName", {
        get: function () {
            return this.actionsLayout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsStartClassName", {
        get: function () {
            return this.actionsLayout === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsCenterClassName", {
        get: function () {
            return this.actionsLayout === 'center';
        },
        enumerable: true,
        configurable: true
    });
    UploadActionButtonsComponent.prototype.onAction = function () {
        var _this = this;
        this.actionSubscription = this.navigation.onActionButtonAction.subscribe(function (button) {
            if (button === "clear") {
                _this.clearFiles();
            }
            else {
                _this.performUpload();
            }
            _this.navigation.focusSelectButton();
        });
    };
    UploadActionButtonsComponent.prototype.onFocus = function () {
        var _this = this;
        this.focusSubscription = this.navigation.onActionButtonFocus.subscribe(function (button) {
            _this.focusButton(button);
        });
    };
    UploadActionButtonsComponent.prototype.focusButton = function (button) {
        var el = (button === "clear") ? this.clearButton : this.uploadButton;
        el.nativeElement.focus();
    };
    UploadActionButtonsComponent.prototype.ngOnDestroy = function () {
        this.actionSubscription.unsubscribe();
        this.focusSubscription.unsubscribe();
    };
    UploadActionButtonsComponent.prototype.performUpload = function (_event) {
        if (!this.disabled) {
            this.uploadService.uploadFiles();
        }
    };
    UploadActionButtonsComponent.prototype.clearFiles = function (_event) {
        if (!this.disabled) {
            this.uploadService.clearFiles();
        }
    };
    UploadActionButtonsComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    UploadActionButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-upload-action-buttons',
                    template: "\n        <button #clearButton type=\"button\" class=\"k-button k-clear-selected\"\n            [attr.tabIndex]=\"-1\"\n            (click)=\"clearFiles($event)\">\n                {{textFor('clearSelectedFiles')}}\n        </button>\n        <button #uploadButton type=\"button\" class=\"k-button k-primary k-upload-selected\"\n            [attr.tabIndex]=\"-1\"\n            (click)=\"performUpload($event)\">\n                {{textFor('uploadSelectedFiles')}}\n        </button>\n    "
                },] },
    ];
    /** @nocollapse */
    UploadActionButtonsComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService },
        { type: NavigationService }
    ]; };
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
    return UploadActionButtonsComponent;
}());
export { UploadActionButtonsComponent };
