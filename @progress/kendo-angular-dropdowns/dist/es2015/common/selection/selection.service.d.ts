/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export interface SelectionEvent {
    indices: number[];
    added?: number;
    removed?: number;
    newSelection?: boolean;
}
/**
 * @hidden
 */
export declare class SelectionService {
    onSelect: EventEmitter<SelectionEvent>;
    onChange: EventEmitter<SelectionEvent>;
    onFocus: EventEmitter<number>;
    total: number;
    private selectedIndices;
    private focusedIndex;
    getTotal(): number;
    isSelected(index: number): boolean;
    isFocused(index: number): boolean;
    focus(index: number): void;
    select(index: number): void;
    add(index: number): void;
    unselect(index: number): void;
    change(index: number): void;
    resetSelection(index: number | number[]): void;
    readonly selected: number[];
    focused: number;
}
