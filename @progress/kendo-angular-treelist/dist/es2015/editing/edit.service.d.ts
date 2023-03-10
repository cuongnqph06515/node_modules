/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditState } from '../data/data.collection';
/**
 * @hidden
 */
export declare type Entity = {
    index: number;
    group: any;
};
/**
 * @hidden
 */
export declare type CommandAction = 'edit' | 'remove' | 'cancel' | 'save' | 'add';
/**
 * @hidden
 */
export declare type CommandEvent = {
    action: CommandAction;
    formGroup?: FormGroup;
    isNew?: boolean;
    dataItem?: number;
    parent?: any;
};
/**
 * @hidden
 */
export declare class EditService implements EditState {
    ngZone: NgZone;
    changes: EventEmitter<CommandEvent>;
    changed: Observable<any>;
    readonly newItemGroup: any;
    newItem: any;
    idGetter: any;
    private edited;
    private keepEditCell;
    private keepCellTimeout;
    private column;
    private closingCell;
    private changedSource;
    constructor(ngZone: NgZone);
    editRow(item: any, group?: any): void;
    addRow(parent: any, group?: any): void;
    editCell(item: any, column: any, group?: any): void;
    isEditing(): boolean;
    isEdited(item: any): boolean;
    isEditingCell(): boolean;
    isEditingColumn(column: any): boolean;
    isEditedColumn(column: any): boolean;
    hasNew(parent?: any): boolean;
    readonly newDataItem: any;
    close(item: any, isNew?: boolean): void;
    closeCell(originalEvent?: any): boolean;
    cancelCell(): void;
    shouldCloseCell(): boolean;
    preventCellClose(): void;
    context(item: any): any;
    beginEdit(item: any): void;
    beginAdd(parent?: any): void;
    endEdit(dataItem: any, isNew: boolean): void;
    save(item: any, isNew: boolean): void;
    remove(dataItem: any, parent?: any): void;
    private onChanged;
    private readonly first;
}
