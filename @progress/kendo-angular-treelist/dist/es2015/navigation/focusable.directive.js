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
export class FocusableDirective {
    constructor(hostElement, renderer) {
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
    ngAfterViewInit() {
        if (!this.element) {
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            const isActive = this.group.isActive;
            this.toggle(isActive);
        }
    }
    ngOnDestroy() {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    }
    /**
     * @hidden
     */
    toggle(active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    }
    /**
     * @hidden
     */
    canFocus() {
        return this.element && this.element.canFocus();
    }
    /**
     * @hidden
     */
    isNavigable() {
        return this.element && this.element.isNavigable();
    }
    /**
     * @hidden
     */
    focus() {
        if (this.element) {
            this.element.focus();
        }
    }
    /**
     * @hidden
     */
    hasFocus() {
        return this.element && this.element.hasFocus();
    }
    /**
     * @hidden
     */
    registerElement(element) {
        this.element = element;
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFocusable]' + `,
        [kendoTreeListEditCommand],
        [kendoTreeListRemoveCommand],
        [kendoTreeListSaveCommand],
        [kendoTreeListCancelCommand]
    `
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
