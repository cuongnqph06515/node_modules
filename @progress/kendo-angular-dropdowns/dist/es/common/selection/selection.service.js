/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from '../util';
/**
 * @hidden
 */
var SelectionService = /** @class */ (function () {
    function SelectionService() {
        this.onSelect = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.total = 0;
        this.selectedIndices = [];
    }
    SelectionService.prototype.getTotal = function () {
        return this.total;
    };
    SelectionService.prototype.isSelected = function (index) {
        return isPresent(this.selectedIndices.find(function (current) { return current === index; }));
    };
    SelectionService.prototype.isFocused = function (index) {
        return index === this.focused;
    };
    SelectionService.prototype.focus = function (index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    };
    SelectionService.prototype.select = function (index) {
        if (this.isSelected(index)) {
            return;
        }
        this.selectedIndices = [index];
        this.focused = index;
        this.onSelect.emit({
            indices: [index],
            newSelection: isPresent(index)
        });
    };
    SelectionService.prototype.add = function (index) {
        if (this.isSelected(index)) {
            return;
        }
        this.selectedIndices.push(index);
        this.focused = index;
        this.onChange.emit({
            added: index,
            indices: this.selectedIndices.slice()
        });
    };
    SelectionService.prototype.unselect = function (index) {
        if (!this.isSelected(index)) {
            return;
        }
        var position = this.selectedIndices.indexOf(index);
        this.selectedIndices.splice(position, 1);
        this.focused = index;
        this.onChange.emit({
            indices: this.selectedIndices.slice(),
            removed: index
        });
    };
    SelectionService.prototype.change = function (index) {
        var newSelection = isPresent(index) && !this.isSelected(index);
        this.selectedIndices = [index];
        this.focused = index;
        this.onChange.emit({
            indices: [index],
            newSelection: newSelection
        });
    };
    SelectionService.prototype.resetSelection = function (index) {
        this.selectedIndices = index instanceof Array ? index : [index];
        this.focused = this.selectedIndices[this.selectedIndices.length - 1];
    };
    Object.defineProperty(SelectionService.prototype, "selected", {
        get: function () {
            return this.selectedIndices.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "focused", {
        get: function () {
            return this.focusedIndex;
        },
        set: function (index) {
            if (this.focusedIndex !== index) {
                this.focusedIndex = index;
                this.onFocus.emit(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    SelectionService.decorators = [
        { type: Injectable },
    ];
    return SelectionService;
}());
export { SelectionService };
