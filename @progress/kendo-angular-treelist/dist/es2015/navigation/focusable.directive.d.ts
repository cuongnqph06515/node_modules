/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FocusableElement } from './focusable-element.interface';
/**
 * A directive that controls the way focusable elements receive
 * [focus in a navigable TreeList]({% slug keyboard_navigation_treelist %}).
 *
 * @hidden Not functional yet.
 */
export declare class FocusableDirective implements FocusableElement, AfterViewInit, OnDestroy {
    private hostElement;
    private renderer;
    private active;
    private group;
    private element;
    constructor(hostElement: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(active: boolean): void;
    /**
     * @hidden
     */
    canFocus(): boolean;
    /**
     * @hidden
     */
    isNavigable(): boolean;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    hasFocus(): boolean;
    /**
     * @hidden
     */
    registerElement(element: FocusableElement): void;
}
