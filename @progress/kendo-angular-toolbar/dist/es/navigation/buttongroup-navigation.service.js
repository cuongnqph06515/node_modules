/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
var ButtonGroupNavigationService = /** @class */ (function () {
    function ButtonGroupNavigationService() {
    }
    Object.defineProperty(ButtonGroupNavigationService.prototype, "toolbarNavigation", {
        get: function () {
            return this._navigationService;
        },
        set: function (service) {
            this._navigationService = service;
            if (this.keydownSubscription) {
                this.keydownSubscription.unsubscribe();
            }
            this.keydownSubscription = this._navigationService.keydown.subscribe(this.onKeydown.bind(this));
        },
        enumerable: true,
        configurable: true
    });
    ButtonGroupNavigationService.prototype.ngOnDestroy = function () {
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
    };
    ButtonGroupNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    ButtonGroupNavigationService.prototype.canFocus = function () {
        return true;
    };
    ButtonGroupNavigationService.prototype.focus = function (focusPrev) {
        var buttons = this.buttons();
        var button = focusPrev ? buttons[buttons.length - 1] : buttons[0];
        this.toolbarNavigation.lock();
        this.renderer().setAttribute(button, 'tabindex', '0');
        button.focus();
        this.current = button;
        this.isActive = true;
    };
    ButtonGroupNavigationService.prototype.defocus = function () {
        var _this = this;
        var buttons = this.buttons();
        buttons.forEach(function (button) {
            _this.renderer().setAttribute(button, 'tabindex', '-1');
            if (_this.hasFocus(button)) {
                button.blur();
            }
        });
        this.current = undefined;
        this.isActive = false;
    };
    ButtonGroupNavigationService.prototype.hasFocus = function (element) {
        return document.activeElement !== element;
    };
    ButtonGroupNavigationService.prototype.buttons = function () {
        return Array.prototype.slice.call(this.renderer().querySelectorAll('.k-button'));
    };
    ButtonGroupNavigationService.prototype.renderer = function () {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer : this.toolbarRenderer;
    };
    ButtonGroupNavigationService.prototype.onKeydown = function (event) {
        if (!this.isActive) {
            return;
        }
        if (event.keyCode === Keys.ArrowLeft) {
            if (this.buttons().indexOf(this.current) === 0) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusPrev();
            }
        }
        if (event.keyCode === Keys.ArrowRight) {
            if (this.buttons().indexOf(this.current) === this.buttons().length - 1) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusNext();
            }
        }
        this.current = this.buttons().find(function (button) {
            return button.tabIndex === 0;
        });
    };
    ButtonGroupNavigationService.decorators = [
        { type: Injectable },
    ];
    return ButtonGroupNavigationService;
}());
export { ButtonGroupNavigationService };
