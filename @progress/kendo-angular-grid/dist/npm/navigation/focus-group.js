/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var focus_root_1 = require("./focus-root");
/**
 * @hidden
 */
var FocusGroup = /** @class */ (function () {
    function FocusGroup(root) {
        this.root = root;
        this.active = true;
        this.children = [];
        this.root.registerGroup(this);
    }
    Object.defineProperty(FocusGroup.prototype, "focusableChildren", {
        get: function () {
            return this.children.filter(function (el) { return el.canFocus(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusGroup.prototype, "isActive", {
        get: function () {
            return this.active;
        },
        enumerable: true,
        configurable: true
    });
    FocusGroup.prototype.ngOnDestroy = function () {
        this.root.unregisterGroup(this);
    };
    FocusGroup.prototype.registerElement = function (element) {
        this.unregisterElement(element);
        this.children.push(element);
    };
    FocusGroup.prototype.unregisterElement = function (element) {
        this.children = this.children.filter(function (f) { return f !== element; });
    };
    /**
     * Returns a Boolean value which indicates if the group will receive focus when the cell is focused.
     * Requires a single "simple" focusable element such as a button or a checkbox.
     */
    FocusGroup.prototype.isNavigable = function () {
        var focusable = this.focusableChildren;
        return focusable.length === 1 && focusable[0].isNavigable();
    };
    FocusGroup.prototype.canFocus = function () {
        return this.focusableChildren.length > 0;
    };
    FocusGroup.prototype.focus = function () {
        if (this.canFocus() && !this.hasFocus()) {
            this.focusableChildren[0].focus();
        }
    };
    FocusGroup.prototype.activate = function () {
        this.toggleState(true);
    };
    FocusGroup.prototype.deactivate = function () {
        this.toggleState(false);
    };
    FocusGroup.prototype.hasFocus = function () {
        return this.children.reduce(function (focused, element) { return focused || element.hasFocus(); }, false);
    };
    FocusGroup.prototype.toggleState = function (active) {
        if (this.active !== active) {
            this.active = active;
            this.children.forEach(function (f) { return f.toggle(active); });
        }
    };
    FocusGroup.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    FocusGroup.ctorParameters = function () { return [
        { type: focus_root_1.FocusRoot }
    ]; };
    return FocusGroup;
}());
exports.FocusGroup = FocusGroup;
