/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
/**
 * @hidden
 */
export declare class NavigationService {
    keydown: EventEmitter<any>;
    overflowButton: ElementRef;
    isPopupFocused: boolean;
    focused: ToolBarToolComponent;
    private tools;
    private isFocusLocked;
    private isOverflowButtonFocused;
    register(t: ToolBarToolComponent): void;
    unregister(t: ToolBarToolComponent): void;
    moveFocusToToolBar(): void;
    moveFocusToPopup(): void;
    focus(tool: ToolBarToolComponent, focusLast?: boolean): void;
    focusOverflowButton(): void;
    focusFirst(): void;
    focusPrev(index?: number): void;
    focusNext(index?: number): void;
    lock(): void;
    unlock(): void;
    focusEnter(): void;
    focusLeave(): void;
    defocus(t: ToolBarToolComponent): void;
}
