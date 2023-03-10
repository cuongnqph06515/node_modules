/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Inject, Optional } from '@angular/core';
import { EditService } from '../editing/edit.service';
import { isSpanColumn, isCheckboxColumn } from '../columns/column-base';
import { CommandColumnComponent } from '../columns/command-column.component';
import { isColumnComponent } from '../columns/column.component';
import { columnsToRender } from "../columns/column-common";
import { isPresent, isNullOrEmptyString, extractFormat } from '../utils';
import { CELL_CONTEXT } from './common/cell-context';
import { IdService } from '../common/id.service';
/**
 * @hidden
 */
export class CellComponent {
    constructor(editService, idService, cellContext) {
        this.editService = editService;
        this.idService = idService;
        this.cellContext = cellContext;
        this.isNew = false;
        this._templateContext = {};
        this._editTemplateContext = {};
    }
    get commandCellClass() {
        return this.isCommand(this.column);
    }
    set rowIndex(index) {
        this._rowIndex = index;
        this.updateCellContext();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    get isEdited() {
        if (!(this.editService.isEditing() || this.isNew) || !this.isColumnEditable) {
            return false;
        }
        const editContext = this.editService.columnContext(this.rowIndex, this.column);
        return this.isFieldEditable(editContext, this.column);
    }
    get formGroup() {
        return this.editService.context(this.rowIndex).group;
    }
    get templateContext() {
        return this._templateContext;
    }
    get editTemplateContext() {
        this._editTemplateContext.$implicit = this.formGroup;
        this._editTemplateContext.isNew = this.isNew;
        this._editTemplateContext.column = this.column;
        this._editTemplateContext.dataItem = this.dataItem;
        this._editTemplateContext.formGroup = this.formGroup;
        this._editTemplateContext.rowIndex = this.rowIndex;
        return this._editTemplateContext;
    }
    get format() {
        if (isColumnComponent(this.column) && !isNullOrEmptyString(this.column.format)) {
            return extractFormat(this.column.format);
        }
        return undefined;
    }
    get isBoundColumn() {
        return this.column.field && !this.column.templateRef;
    }
    get isCheckboxColumn() {
        return isCheckboxColumn(this.column) && !this.column.templateRef;
    }
    get selectionCheckboxId() {
        return this.idService.selectionCheckboxId(this.rowIndex);
    }
    get isSpanColumn() {
        return isSpanColumn(this.column) && !this.column.templateRef;
    }
    get childColumns() {
        return columnsToRender([this.column]);
    }
    get isColumnEditable() {
        if (!this.column || this.isCommand(this.column)) {
            return false;
        }
        return this.column.editable !== false;
    }
    ngDoCheck() {
        this.updateCellContext();
    }
    ngOnChanges(_changes) {
        this.updateTemplateContext();
    }
    isCommand(column) {
        return column instanceof CommandColumnComponent;
    }
    isFieldEditable(editContext, column) {
        if (!isPresent(editContext)) {
            return false;
        }
        if (isPresent(column.editTemplate)) {
            return true;
        }
        return isPresent(editContext.group) && isPresent(editContext.group.get(column.field));
    }
    updateCellContext() {
        if (this.cellContext) {
            this.cellContext.rowIndex = this._rowIndex;
        }
    }
    updateTemplateContext() {
        if (!this.column.templateRef) {
            return;
        }
        const context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.rowIndex = this.rowIndex;
        context.columnIndex = this.columnIndex;
        context.$implicit = this.dataItem;
    }
}
CellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridCell]',
                template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-template [ngIf]="column.templateRef"
                    [ngTemplateOutlet]="column.templateRef"
                    [ngTemplateOutletContext]="templateContext">
                </ng-template>
                <ng-template [ngIf]="isSpanColumn">
                    <ng-template ngFor let-childColumn [ngForOf]="childColumns">
                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                    </ng-template>
                </ng-template>
                <ng-template [ngIf]="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-template>
                <ng-template [ngIf]="isCheckboxColumn && !isNew">
                    <input class="k-checkbox" [kendoGridSelectionCheckbox]="rowIndex" [attr.id]="selectionCheckboxId"><label class="k-checkbox-label" [attr.for]="selectionCheckboxId"></label>
                </ng-template>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-template
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-template>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        class="k-checkbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
CellComponent.ctorParameters = () => [
    { type: EditService },
    { type: IdService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
];
CellComponent.propDecorators = {
    commandCellClass: [{ type: HostBinding, args: ['class.k-command-cell',] }],
    column: [{ type: Input }],
    columnIndex: [{ type: Input }],
    isNew: [{ type: Input }],
    rowIndex: [{ type: Input }],
    dataItem: [{ type: Input }]
};
