/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { zip } from 'rxjs';
import { leafColumns } from '../columns/column-common';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
const isLocked = column => column.parent ? isLocked(column.parent) : !!column.locked;
const ɵ0 = isLocked;
/**
 * @hidden
 */
const resizeArgs = (column, extra) => Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); // tslint:disable-line:align
const ɵ1 = resizeArgs;
/**
 * @hidden
 */
export class ColumnResizingService {
    constructor() {
        this.changes = new EventEmitter();
        this.tables = new Array();
        this.batch = null;
    }
    start(column) {
        this.trackColumns(column);
        const columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    }
    resizeColumns(deltaPercent) {
        const action = resizeArgs(this.column, {
            deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    }
    resizeTable(column, delta) {
        const action = resizeArgs(column, {
            delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    }
    resizedColumn(state) {
        this.resizedColumns.push(state);
    }
    end() {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    }
    registerTable(fn) {
        this.tables.push(fn);
        return () => {
            this.tables.splice(this.tables.indexOf(fn), 1);
        };
    }
    measureColumns(info) {
        if (this.batch !== null) {
            this.batch.push(...info);
        }
        else {
            this.autoFitBatch(info, () => this.end());
        }
    }
    autoFit(...columns) {
        this.batch = [];
        this.resizedColumns = [];
        this.changes.emit({
            columns: columns,
            type: 'start'
        });
        this.changes.emit({
            columns,
            type: 'triggerAutoFit'
        });
        this.autoFitBatch(this.batch);
    }
    trackColumns(column) {
        this.resizedColumns = [];
        this.column = column;
    }
    autoFitBatch(info, onComplete) {
        const observables = this.tables.map(fn => fn(info));
        zip(...observables)
            .pipe(take(1))
            .subscribe(widths => {
            this.changes.emit({
                columns: info.map(i => i.column),
                type: 'autoFitComplete',
                widths
            });
            if (onComplete) {
                onComplete();
            }
        });
        this.batch = null;
    }
}
ColumnResizingService.decorators = [
    { type: Injectable },
];
export { ɵ0, ɵ1 };
