/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DefaultFocusableElement } from './default-focusable-element';
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
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
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
        { type: Directive, args: [{
                    selector: '[kendoTreeListFocusable]' + ",\n        [kendoTreeListEditCommand],\n        [kendoTreeListRemoveCommand],\n        [kendoTreeListSaveCommand],\n        [kendoTreeListCancelCommand]\n    "
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return FocusableDirective;
}());
export { FocusableDirective };
