/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { isPresent } from '../utils';
import { CellCloseEvent } from './cell-close-event';
import { Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
/**
 * @hidden
 */
var isEqual = function (index) { return function (item) { return item.index === index; }; };
var ɵ0 = isEqual;
/**
 * @hidden
 */
var isNotEqual = function (index) { return function (item) { return item.index !== index; }; };
var ɵ1 = isNotEqual;
/**
 * @hidden
 */
var isNewRow = function (index) { return index === -1 || index === undefined; };
var ɵ2 = isNewRow;
/**
 * @hidden
 */
var EditService = /** @class */ (function () {
    function EditService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.editedIndices = [];
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); }));
    }
    EditService.prototype.editRow = function (index, group) {
        if (group === void 0) { group = undefined; }
        this.editedIndices.push({ index: index, group: group });
        this.onChanged();
    };
    EditService.prototype.addRow = function (group) {
        this.newItemGroup = { group: group };
        this.onChanged();
    };
    EditService.prototype.editCell = function (rowIndex, column, group) {
        if (isNewRow(rowIndex) || column.editable === false || !(column.editTemplate || column.field)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(rowIndex, group);
            this.column = column;
            this.onChanged();
        }
    };
    EditService.prototype.isEditing = function () {
        return this.editedIndices.length > 0;
    };
    EditService.prototype.isEditingCell = function () {
        return this.isEditing() && this.column !== undefined;
    };
    Object.defineProperty(EditService.prototype, "hasNewItem", {
        get: function () {
            return isPresent(this.newItemGroup);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "newDataItem", {
        get: function () {
            if (this.hasNewItem) {
                return this.newItemGroup.group.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.close = function (index) {
        if (isNewRow(index)) {
            this.newItemGroup = undefined;
            return;
        }
        this.editedIndices = this.editedIndices.filter(isNotEqual(index));
        delete this.column;
        this.onChanged();
    };
    EditService.prototype.closeCell = function (originalEvent) {
        var _this = this;
        if (this.column && !this.closingCell) {
            return this.ngZone.run(function () {
                var _a = _this.editedIndices[0], index = _a.index, group = _a.group;
                var args = new CellCloseEvent({
                    column: _this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    rowIndex: index
                });
                _this.closingCell = true;
                _this.changes.emit(args);
                _this.closingCell = false;
                if (!args.isDefaultPrevented()) {
                    _this.cancelCell();
                }
                return args.isDefaultPrevented();
            });
        }
    };
    EditService.prototype.cancelCell = function () {
        if (this.column) {
            this.editedIndices = [];
            delete this.column;
            this.onChanged();
        }
    };
    EditService.prototype.shouldCloseCell = function () {
        return this.column && !this.keepEditCell;
    };
    EditService.prototype.preventCellClose = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            window.clearTimeout(_this.keepCellTimeout);
            _this.keepEditCell = true;
            _this.keepCellTimeout = window.setTimeout(function () {
                _this.keepEditCell = false;
            }, 0); // tslint:disable-line:align
        });
    };
    EditService.prototype.context = function (index) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        return this.findByIndex(index);
    };
    EditService.prototype.columnContext = function (index, column) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        if (!this.column || column === this.column) {
            return this.findByIndex(index);
        }
    };
    EditService.prototype.isEdited = function (index) {
        if (isNewRow(index) && isPresent(this.newItemGroup)) {
            return true;
        }
        return !this.column && isPresent(this.findByIndex(index));
    };
    EditService.prototype.hasEdited = function (index) {
        return isPresent(this.context(index));
    };
    EditService.prototype.isEditedColumn = function (index, column) {
        if (this.column && this.column === column) {
            return isPresent(this.findByIndex(index));
        }
        return false;
    };
    EditService.prototype.beginEdit = function (rowIndex) {
        this.changes.emit({ action: 'edit', rowIndex: rowIndex });
    };
    EditService.prototype.beginAdd = function () {
        this.changes.emit({ action: 'add' });
    };
    EditService.prototype.endEdit = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'cancel', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.save = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'save', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.remove = function (rowIndex) {
        this.changes.emit({ action: 'remove', rowIndex: rowIndex });
    };
    EditService.prototype.findByIndex = function (index) {
        return this.editedIndices.find(isEqual(index));
    };
    EditService.prototype.onChanged = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.changedSource.next();
        });
    };
    EditService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return EditService;
}());
export { EditService };
export { ɵ0, ɵ1, ɵ2 };
