/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { EditingDirectiveBase } from './editing-directive-base';
import { TreeListComponent } from '../treelist.component';
import { markAllAsTouched } from './utils';
/**
 * A directive which encapsulates the editing operations of the TreeList when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-incell-directive)).
 */
export class InCellEditingDirective extends EditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
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
        this.subscriptions.add(this.treelist.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.treelist.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }
    removeHandler(args) {
        super.removeHandler(args);
        this.treelist.cancelCell();
    }
    cellClickHandler(args) {
        if (!args.isEdited && args.type === 'click') {
            this.treelist.editCell(args.dataItem, args.columnIndex, this.createFormGroup(args));
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
                selector: '[kendoTreeListInCellEditing]'
            },] },
];
/** @nocollapse */
InCellEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
InCellEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoTreeListInCellEditing',] }]
};
