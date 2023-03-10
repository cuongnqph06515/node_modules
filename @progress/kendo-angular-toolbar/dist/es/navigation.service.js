/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from './util';
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService() {
        this.keydown = new EventEmitter();
        this.isPopupFocused = false;
        this.tools = [];
        this.isFocusLocked = false;
        this.isOverflowButtonFocused = false;
    }
    NavigationService.prototype.register = function (t) {
        this.tools.push(t);
    };
    NavigationService.prototype.unregister = function (t) {
        this.tools.splice(this.tools.indexOf(t), 1);
    };
    NavigationService.prototype.moveFocusToToolBar = function () {
        this.isPopupFocused = false;
        this.focusOverflowButton();
    };
    NavigationService.prototype.moveFocusToPopup = function () {
        this.isPopupFocused = true;
    };
    NavigationService.prototype.focus = function (tool, focusLast) {
        var _this = this;
        this.focused = tool;
        this.tools.filter(function (t) { return t !== _this.focused; }).forEach(function (t) { return t.navigationService.defocus(); });
        this.isOverflowButtonFocused = false;
        tool.navigationService.focus(focusLast);
    };
    NavigationService.prototype.focusOverflowButton = function () {
        this.isOverflowButtonFocused = true;
        this.overflowButton.nativeElement.focus();
    };
    NavigationService.prototype.focusFirst = function () {
        if (this.isFocusLocked) {
            return;
        }
        var tool = this.tools.find(function (t) {
            if (t.navigationService.canFocus()) {
                return true;
            }
            else {
                return false;
            }
        });
        if (tool) {
            this.focus(tool);
        }
    };
    NavigationService.prototype.focusPrev = function (index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusPrevSibling();
        //     return;
        // }
        if (!isPresent(index)) {
            if (this.isOverflowButtonFocused) {
                index = this.tools.length - 1;
            }
            else {
                index = this.tools.indexOf(this.focused) - 1;
            }
        }
        if (this.isFocusLocked || !this.tools.length || index < 0) {
            return;
        }
        var tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool, true);
        }
        else {
            this.focusPrev(index - 1);
        }
    };
    NavigationService.prototype.focusNext = function (index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusNextSibling();
        //     return;
        // }
        var overflowButtonIsVisible = this.overflowButton && this.overflowButton.nativeElement.style.visibility === 'visible';
        if (!isPresent(index)) {
            index = this.tools.indexOf(this.focused) + 1;
        }
        if (index >= this.tools.length && overflowButtonIsVisible && !this.isOverflowButtonFocused) {
            this.focusOverflowButton();
        }
        if (this.isFocusLocked || !this.tools.length || index >= this.tools.length) {
            return;
        }
        var tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool);
        }
        else {
            this.focusNext(index + 1);
        }
    };
    NavigationService.prototype.lock = function () {
        this.isFocusLocked = true;
    };
    NavigationService.prototype.unlock = function () {
        this.isFocusLocked = false;
    };
    NavigationService.prototype.focusEnter = function () {
        //TODO
        // if (this.focused.hasFocusableChild()) {
        //     this.isFocusLocked = true;
        //     this.focused.focusInside();
        // }
    };
    NavigationService.prototype.focusLeave = function () {
        //TODO
        // if (this.isFocusLocked) {
        //     this.isFocusLocked = false;
        //     this.focus(this.focused);
        // }
    };
    NavigationService.prototype.defocus = function (t) {
        t.navigationService.defocus();
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    return NavigationService;
}());
export { NavigationService };
