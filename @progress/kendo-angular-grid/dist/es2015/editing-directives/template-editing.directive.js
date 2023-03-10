/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { GridComponent } from '../grid.component';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * A directive which encapsulates the editing operations of the Grid when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_grid %}#toc-the-template-directive)).
 */
export class TemplateEditingDirective extends RowEditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    editHandler(args) {
        super.editHandler(args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    }
    closeEditor(rowIndex) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        super.closeEditor(rowIndex);
    }
    createModel(args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    }
    saveModel(args) {
        return args.dataItem;
    }
    clean() {
        super.clean();
        delete this.dataItem;
    }
}
TemplateEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridTemplateEditing]'
            },] },
];
/** @nocollapse */
TemplateEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
TemplateEditingDirective.propDecorators = {
    createNewItem: [{ type: Input, args: ['kendoGridTemplateEditing',] }]
};
