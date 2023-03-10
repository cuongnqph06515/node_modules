/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FocusableElement } from "./focusable-element.interface";
import { FocusRoot } from './focus-root';
/**
 * @hidden
 */
export declare class FocusGroup {
    private root;
    private active;
    private children;
    private readonly focusableChildren;
    readonly isActive: boolean;
    constructor(root: FocusRoot);
    ngOnDestroy(): void;
    registerElement(element: FocusableElement): void;
    unregisterElement(element: FocusableElement): void;
    /**
     * Returns a Boolean value which indicates if the group will receive focus when the cell is focused.
     * Requires a single "simple" focusable element such as a button or a checkbox.
     */
    isNavigable(): boolean;
    canFocus(): boolean;
    focus(): void;
    activate(): void;
    deactivate(): void;
    private hasFocus;
    private toggleState;
}
