/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class ButtonGroupNavigationService {
    set toolbarNavigation(service) {
        this._navigationService = service;
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
        this.keydownSubscription = this._navigationService.keydown.subscribe(this.onKeydown.bind(this));
    }
    get toolbarNavigation() {
        return this._navigationService;
    }
    ngOnDestroy() {
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
    }
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return true;
    }
    focus(focusPrev) {
        const buttons = this.buttons();
        const button = focusPrev ? buttons[buttons.length - 1] : buttons[0];
        this.toolbarNavigation.lock();
        this.renderer().setAttribute(button, 'tabindex', '0');
        button.focus();
        this.current = button;
        this.isActive = true;
    }
    defocus() {
        const buttons = this.buttons();
        buttons.forEach((button) => {
            this.renderer().setAttribute(button, 'tabindex', '-1');
            if (this.hasFocus(button)) {
                button.blur();
            }
        });
        this.current = undefined;
        this.isActive = false;
    }
    hasFocus(element) {
        return document.activeElement !== element;
    }
    buttons() {
        return Array.prototype.slice.call(this.renderer().querySelectorAll('.k-button'));
    }
    renderer() {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer : this.toolbarRenderer;
    }
    onKeydown(event) {
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
        this.current = this.buttons().find((button) => {
            return button.tabIndex === 0;
        });
    }
}
ButtonGroupNavigationService.decorators = [
    { type: Injectable },
];
