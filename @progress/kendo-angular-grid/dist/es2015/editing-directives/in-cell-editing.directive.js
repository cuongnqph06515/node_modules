/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { EditingDirectiveBase } from './editing-directive-base';
import { GridComponent } from '../grid.component';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { markAllAsTouched } from './utils';
/**
 * A directive which encapsulates the editing operations of the Grid when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-incell-directive)).
 */
export class InCellEditingDirective extends EditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    // Need mixin
    createModel(args) {
        return this.createFormGroup(args);
    }
    saveModel({ dataItem, formGroup, isNew }) {
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    }
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.grid.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.grid.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }
    removeHandler(args) {
        super.removeHandler(args);
        this.grid.cancelCell();
    }
    cellClickHandler(args) {
        if (!args.isEdited && args.type !== 'contextmenu') {
            this.grid.editCell(args.rowIndex, args.columnIndex, this.createFormGroup(args));
        }
    }
    cellCloseHandler(args) {
        const { formGroup, dataItem } = args;
        if (!formGroup.valid) {
            args.preventDefault();
        }
        else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    }
}
InCellEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridInCellEditing]'
            },] },
];
/** @nocollapse */
InCellEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
InCellEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoGridInCellEditing',] }]
};
