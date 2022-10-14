/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { ToolBarRendererComponent } from './renderer.component';
/**
 * @hidden
 */
export declare class RendererService {
    element: ElementRef;
    renderer: ToolBarRendererComponent;
    getElement(): HTMLElement;
    querySelector(selector: string): HTMLElement;
    querySelectorAll(selector: string): NodeList;
    findFocusable(): HTMLElement;
    findFocusableChild(element?: HTMLElement): HTMLElement;
    findNextFocusableSibling(element?: HTMLElement): HTMLElement;
    findPrevFocusableSibling(element?: HTMLElement): HTMLElement;
    setAttribute(element: HTMLElement, attr: string, value: string): void;
}
