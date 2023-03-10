/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { GridComponent } from '../grid.component';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { markAllAsTouched } from './utils';
/**
 * A directive which encapsulates the editing operations of the Grid when using the
 * Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-reactive-directive)).
 */
export class ReactiveEditingDirective extends RowEditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
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
}
ReactiveEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoGridReactiveEditing',] }]
};
