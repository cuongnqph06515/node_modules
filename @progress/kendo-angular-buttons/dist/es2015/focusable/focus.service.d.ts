/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare class FocusService {
    onFocus: EventEmitter<number>;
    focusedIndex: number;
    isFocused(index: number): boolean;
    focus(index: number): void;
    resetFocus(): void;
    focused: number;
}
