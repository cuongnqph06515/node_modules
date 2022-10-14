/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var default_focusable_element_1 = require("./default-focusable-element");
/**
 * A directive that controls the way focusable elements receive
 * [focus in a navigable TreeList]({% slug keyboard_navigation_treelist %}).
 *
 * @hidden Not functional yet.
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(hostElement, renderer) {
        // if (this.cellContext) {
        // this.group = this.cellContext.focusGroup;
        // }
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.active = true;
        if (this.group) {
            this.group.registerElement(this);
        }
    }
    FocusableDirective.prototype.ngAfterViewInit = function () {
        if (!this.element) {
            this.element = new default_focusable_element_1.DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            var isActive = this.group.isActive;
            this.toggle(isActive);
        }
    };
    FocusableDirective.prototype.ngOnDestroy = function () {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.toggle = function (active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.canFocus = function () {
        return this.element && this.element.canFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.isNavigable = function () {
        return this.element && this.element.isNavigable();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.focus = function () {
        if (this.element) {
            this.element.focus();
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.hasFocus = function () {
        return this.element && this.element.hasFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.registerElement = function (element) {
        this.element = element;
    };
    FocusableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListFocusable]' + ",\n        [kendoTreeListEditCommand],\n        [kendoTreeListRemoveCommand],\n        [kendoTreeListSaveCommand],\n        [kendoTreeListCancelCommand]\n    "
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    return FocusableDirective;
}());
exports.FocusableDirective = FocusableDirective;
