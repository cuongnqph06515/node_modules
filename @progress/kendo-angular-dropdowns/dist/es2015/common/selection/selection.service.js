/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from '../util';
/**
 * @hidden
 */
export class SelectionService {
    constructor() {
        this.onSelect = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.total = 0;
        this.selectedIndices = [];
    }
    getTotal() {
        return this.total;
    }
    isSelected(index) {
        return isPresent(this.selectedIndices.find(current => current === index));
    }
    isFocused(index) {
        return index === this.focused;
    }
    focus(index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    }
    select(index) {
        if (this.isSelected(index)) {
            return;
        }
        this.selectedIndices = [index];
        this.focused = index;
        this.onSelect.emit({
            indices: [index],
            newSelection: isPresent(index)
        });
    }
    add(index) {
        if (this.isSelected(index)) {
            return;
        }
        this.selectedIndices.push(index);
        this.focused = index;
        this.onChange.emit({
            added: index,
            indices: this.selectedIndices.slice()
        });
    }
    unselect(index) {
        if (!this.isSelected(index)) {
            return;
        }
        const position = this.selectedIndices.indexOf(index);
        this.selectedIndices.splice(position, 1);
        this.focused = index;
        this.onChange.emit({
            indices: this.selectedIndices.slice(),
            removed: index
        });
    }
    change(index) {
        const newSelection = isPresent(index) && !this.isSelected(index);
        this.selectedIndices = [index];
        this.focused = index;
        this.onChange.emit({
            indices: [index],
            newSelection: newSelection
        });
    }
    resetSelection(index) {
        this.selectedIndices = index instanceof Array ? index : [index];
        this.focused = this.selectedIndices[this.selectedIndices.length - 1];
    }
    get selected() {
        return this.selectedIndices.slice();
    }
    get focused() {
        return this.focusedIndex;
    }
    set focused(index) {
        if (this.focusedIndex !== index) {
            this.focusedIndex = index;
            this.onFocus.emit(index);
        }
    }
}
SelectionService.decorators = [
    { type: Injectable },
];
