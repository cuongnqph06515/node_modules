/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { TreeListComponent } from '../treelist.component';
/**
 * A directive which encapsulates the editing operations of the TreeList when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_treelist %}#toc-the-template-directive)).
 */
export class TemplateEditingDirective extends RowEditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
    }
    editHandler(args) {
        super.editHandler(args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    }
    closeEditor(args) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        super.closeEditor(args);
    }
    createModel(args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    }
    saveModel(args) {
        return args.dataItem;
    }
}
TemplateEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListTemplateEditing]'
            },] },
];
/** @nocollapse */
TemplateEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
TemplateEditingDirective.propDecorators = {
    createNewItem: [{ type: Input, args: ['kendoTreeListTemplateEditing',] }]
};
