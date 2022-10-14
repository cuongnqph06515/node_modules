/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { EditService } from '../editing/edit.service';
import { isSpanColumn } from '../columns/column-base';
import { isColumnComponent } from '../columns/column.component';
import { columnsToRender } from "../columns/column-common";
import { isNullOrEmptyString, extractFormat, isColumnEditable } from '../utils';
/**
 * @hidden
 */
export class CellComponent {
    constructor(editService) {
        this.editService = editService;
        this.isNew = false;
        this.level = 0;
        this.cellContext = {};
        this._templateContext = {};
        this._editTemplateContext = {};
        this.templateContext.cellContext = this.cellContext;
    }
    get commandCellClass() {
        return this.column.isCommand;
    }
    set viewItem(value) {
        this._viewItem = value;
        this.cellContext.viewItem = this.viewItem;
    }
    get viewItem() {
        return this._viewItem;
    }
    get formGroup() {
        return this.viewItem.editContext ? this.viewItem.editContext.group : null;
    }
    get isEdited() {
        return Boolean(this.viewItem.editContext && this.editService.isEditedColumn(this.column) && isColumnEditable(this.column, this.formGroup));
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
    get isSpanColumn() {
        return isSpanColumn(this.column) && !this.column.templateRef;
    }
    get childColumns() {
        return columnsToRender([this.column]);
    }
    ngDoCheck() {
        if (this.column.templateRef) {
            this.updateTemplateContext();
        }
    }
    updateTemplateContext() {
        const context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.columnIndex = this.columnIndex;
        context.rowIndex = this.viewItem.rowIndex;
        context.$implicit = this.dataItem;
    }
}
CellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListCell]',
                template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-container *ngIf="column.expandable">
                    <span class="k-icon k-i-none" *ngFor="let item of level | levelItems : hasChildren"></span>
                    <span class="k-icon" *ngIf="hasChildren" [ngClass]="{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded, 'k-i-loading': loading }"></span>
                </ng-container>
                <ng-container *ngIf="column.templateRef"
                    [ngTemplateOutlet]="column.templateRef"
                    [ngTemplateOutletContext]="templateContext">
                </ng-container>
                <ng-container *ngIf="isSpanColumn">
                    <ng-container *ngFor="let childColumn of childColumns">
                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-container
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-container>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
CellComponent.ctorParameters = () => [
    { type: EditService }
];
CellComponent.propDecorators = {
    commandCellClass: [{ type: HostBinding, args: ['class.k-command-cell',] }],
    column: [{ type: Input }],
    columnIndex: [{ type: Input }],
    isNew: [{ type: Input }],
    level: [{ type: Input }],
    hasChildren: [{ type: Input }],
    isExpanded: [{ type: Input }],
    loading: [{ type: Input }],
    dataItem: [{ type: Input }],
    viewItem: [{ type: Input }]
};
