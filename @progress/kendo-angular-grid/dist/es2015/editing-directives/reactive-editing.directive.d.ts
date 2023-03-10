/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FormGroup } from '@angular/forms';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { GridComponent } from '../grid.component';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { CreateFormGroupArgs } from './create-form-group-args.interface';
/**
 * A directive which encapsulates the editing operations of the Grid when using the
 * Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-reactive-directive)).
 */
export declare class ReactiveEditingDirective extends RowEditingDirectiveBase {
    protected grid: GridComponent;
    protected localDataChangesService: LocalDataChangesService;
    /**
     * The function that creates the `FormGroup` for the edited model.
     */
    createFormGroup: (args: CreateFormGroupArgs) => FormGroup;
    constructor(grid: GridComponent, localDataChangesService: LocalDataChangesService);
    protected createModel(args: any): any;
    protected saveModel({ dataItem, formGroup, isNew }: any): any;
}
