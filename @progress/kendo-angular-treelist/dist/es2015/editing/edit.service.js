/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { isPresent, isColumnEditable } from '../utils';
import { CellCloseEvent } from './cell-close-event';
import { Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
const identity = item => item;
const ɵ0 = identity;
/**
 * @hidden
 */
export class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.idGetter = identity;
        this.edited = new Map(); // edited rows by id or referense
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))));
    }
    get newItemGroup() {
        return this.newItem ? this.newItem.group : null;
    }
    editRow(item, group = undefined) {
        this.edited.set(this.idGetter(item), {
            group,
            item
        });
        this.onChanged();
    }
    addRow(parent, group) {
        this.newItem = { parent, group, dataItem: group ? group.value : null };
        this.onChanged();
    }
    editCell(item, column, group) {
        if (!isColumnEditable(column, group)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(item, group);
            this.column = column;
            this.onChanged();
        }
    }
    isEditing() {
        return this.edited.size > 0;
    }
    isEdited(item) {
        return this.edited.has(this.idGetter(item));
    }
    isEditingCell() {
        return isPresent(this.column);
    }
    isEditingColumn(column) {
        return this.column === column;
    }
    isEditedColumn(column) {
        return !this.column || this.column === column;
    }
    hasNew(parent) {
        return Boolean(this.newItem && ((!this.newItem.parent && !parent) ||
            this.idGetter(this.newItem.parent) === this.idGetter(parent)));
    }
    get newDataItem() {
        if (this.newItem) {
            return this.newItem.group.value;
        }
    }
    close(item, isNew) {
        if (isNew) { // parent
            this.newItem = undefined;
            return;
        }
        this.edited.delete(this.idGetter(item));
        delete this.column;
        this.onChanged();
    }
    closeCell(originalEvent) {
        if (this.column && !this.closingCell) {
            return this.ngZone.run(() => {
                const { item, group } = this.first;
                const args = new CellCloseEvent({
                    column: this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    dataItem: item
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
            this.edited.clear();
            this.column = null;
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
    context(item) {
        return this.edited.get(this.idGetter(item));
    }
    beginEdit(item) {
        this.changes.emit({ action: 'edit', dataItem: item });
    }
    beginAdd(parent) {
        this.changes.emit({ action: 'add', parent });
    }
    endEdit(dataItem, isNew) {
        const formGroup = isNew ? this.newItemGroup : this.context(dataItem).group;
        this.changes.emit({ action: 'cancel', dataItem, formGroup, isNew });
    }
    save(item, isNew) {
        const args = { action: 'save', isNew: isNew };
        if (isNew) {
            args.parent = this.newItem.parent;
            args.formGroup = this.newItem.group;
            args.dataItem = item;
        }
        else {
            args.dataItem = item;
            args.formGroup = this.context(item).group;
        }
        this.changes.emit(args);
    }
    remove(dataItem, parent) {
        this.changes.emit({ action: 'remove', dataItem, parent });
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
    get first() {
        if (this.isEditing) {
            return this.edited.values().next().value;
        }
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];
export { ɵ0 };
