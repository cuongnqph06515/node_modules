/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { TreeListComponent } from '../treelist.component';
import { markAllAsTouched } from './utils';
/**
 * A directive which encapsulates the editing operations of the TreeList when using the
 * Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-reactive-directive)).
 */
export class ReactiveEditingDirective extends RowEditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
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
                selector: '[kendoTreeListReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoTreeListReactiveEditing',] }]
};
