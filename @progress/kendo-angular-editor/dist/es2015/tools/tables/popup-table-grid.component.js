/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Output, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export class PopupTableGridComponent {
    constructor() {
        this.cellClick = new EventEmitter();
        this.tableWizardClick = new EventEmitter();
        this.state = { rows: -1, cols: -1 };
        this.rows = 6;
        this.cols = 8;
    }
    get message() {
        const { rows, cols } = this.state;
        return `Create a ${rows > -1 ? rows + 1 : ''} ${cols > -1 ? 'x' : ''} ${cols > -1 ? cols + 1 : ''} table`;
    }
    get cells() {
        return Array.from(Array(this.rows * this.cols).keys());
    }
    selected(index) {
        const { rows, cols } = this.state;
        const cellRow = Math.floor(index / this.cols);
        const cellCol = index % this.cols;
        return cellRow <= rows && cellCol <= cols;
    }
    setState(index) {
        const rows = Math.floor(index / this.cols);
        const cols = index % this.cols;
        this.state = { rows: rows, cols: cols };
    }
    resetState() {
        this.state = { rows: -1, cols: -1 };
    }
    insertTable() {
        this.cellClick.emit(this.state);
    }
    openTableWizard() {
        this.tableWizardClick.emit();
    }
}
PopupTableGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-popup-table-grid',
                template: `
        <div style="border-color: inherit;" (mouseleave)="resetState()" (click)="insertTable()">
            <span *ngFor="let i of cells"
                class="k-ct-cell"
                [class.k-state-selected]="selected(i)"
                [class.k-state-disabled]="!selected(i)"
                (mouseenter)="setState(i)">
            </span>
        </div>
        <div class="k-status" unselectable="on">{{ message }}</div>
        <!-- uncomment when TableWizard is completed
        <div class="k-editor-toolbar" unselectable="on">
            <button type="button" kendoButton class="k-tool" [icon]="'table-wizard'" (click)="openTableWizard()" title="Table Wizard">Table Wizard</button>
        </div>
        -->
    `
            },] },
];
PopupTableGridComponent.propDecorators = {
    cellClick: [{ type: Output }],
    tableWizardClick: [{ type: Output }]
};
