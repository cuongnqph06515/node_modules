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
const isEqual = (index) => (item) => item.index === index;
const ɵ0 = isEqual;
/**
 * @hidden
 */
const isNotEqual = (index) => (item) => item.index !== index;
const ɵ1 = isNotEqual;
/**
 * @hidden
 */
const isNewRow = (index) => index === -1 || index === undefined;
const ɵ2 = isNewRow;
/**
 * @hidden
 */
export class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.editedIndices = [];
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))));
    }
    editRow(index, group = undefined) {
        this.editedIndices.push({ index, group });
        this.onChanged();
    }
    addRow(group) {
        this.newItemGroup = { group };
        this.onChanged();
    }
    editCell(rowIndex, column, group) {
        if (isNewRow(rowIndex) || column.editable === false || !(column.editTemplate || column.field)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(rowIndex, group);
            this.column = column;
            this.onChanged();
        }
    }
    isEditing() {
        return this.editedIndices.length > 0;
    }
    isEditingCell() {
        return this.isEditing() && this.column !== undefined;
    }
    get hasNewItem() {
        return isPresent(this.newItemGroup);
    }
    get newDataItem() {
        if (this.hasNewItem) {
            return this.newItemGroup.group.value;
        }
        return {};
    }
    close(index) {
        if (isNewRow(index)) {
            this.newItemGroup = undefined;
            return;
        }
        this.editedIndices = this.editedIndices.filter(isNotEqual(index));
        delete this.column;
        this.onChanged();
    }
    closeCell(originalEvent) {
        if (this.column && !this.closingCell) {
            return this.ngZone.run(() => {
                const { index, group } = this.editedIndices[0];
                const args = new CellCloseEvent({
                    column: this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    rowIndex: index
                });
                this.closingCell = true;
                this.changes.emit(args);
                this.closingCell = false;
                if (!args.isDefaultPrevented()) {
                    this.cancelCell();
                }
                return args.isDefaultPrevented();
            });
        }
    }
    cancelCell() {
        if (this.column) {
            this.editedIndices = [];
            delete this.column;
            this.onChanged();
        }
    }
    shouldCloseCell() {
        return this.column && !this.keepEditCell;
    }
    preventCellClose() {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.keepCellTimeout);
            this.keepEditCell = true;
            this.keepCellTimeout = window.setTimeout(() => {
                this.keepEditCell = false;
            }, 0); // tslint:disable-line:align
        });
    }
    context(index) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        return this.findByIndex(index);
    }
    columnContext(index, column) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        if (!this.column || column === this.column) {
            return this.findByIndex(index);
        }
    }
    isEdited(index) {
        if (isNewRow(index) && isPresent(this.newItemGroup)) {
            return true;
        }
        return !this.column && isPresent(this.findByIndex(index));
    }
    hasEdited(index) {
        return isPresent(this.context(index));
    }
    isEditedColumn(index, column) {
        if (this.column && this.column === column) {
            return isPresent(this.findByIndex(index));
        }
        return false;
    }
    beginEdit(rowIndex) {
        this.changes.emit({ action: 'edit', rowIndex });
    }
    beginAdd() {
        this.changes.emit({ action: 'add' });
    }
    endEdit(rowIndex) {
        const { group: formGroup } = this.context(rowIndex);
        this.changes.emit({ action: 'cancel', rowIndex, formGroup, isNew: isNewRow(rowIndex) });
    }
    save(rowIndex) {
        const { group: formGroup } = this.context(rowIndex);
        this.changes.emit({ action: 'save', rowIndex, formGroup, isNew: isNewRow(rowIndex) });
    }
    remove(rowIndex) {
        this.changes.emit({ action: 'remove', rowIndex });
    }
    findByIndex(index) {
        return this.editedIndices.find(isEqual(index));
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];
export { ɵ0, ɵ1, ɵ2 };
