/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { RowEditingDirectiveBase } from './row-editing-directive-base';
import { TreeListComponent } from '../treelist.component';
/**
 * A directive which encapsulates the editing operations of the TreeList when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_treelist %}#toc-the-template-directive)).
 */
var TemplateEditingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateEditingDirective, _super);
    function TemplateEditingDirective(treelist) {
        var _this = _super.call(this, treelist) || this;
        _this.treelist = treelist;
        return _this;
    }
    TemplateEditingDirective.prototype.editHandler = function (args) {
        _super.prototype.editHandler.call(this, args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    };
    TemplateEditingDirective.prototype.closeEditor = function (args) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        _super.prototype.closeEditor.call(this, args);
    };
    TemplateEditingDirective.prototype.createModel = function (args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    };
    TemplateEditingDirective.prototype.saveModel = function (args) {
        return args.dataItem;
    };
    TemplateEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListTemplateEditing]'
                },] },
    ];
    /** @nocollapse */
    TemplateEditingDirective.ctorParameters = function () { return [
        { type: TreeListComponent }
    ]; };
    TemplateEditingDirective.propDecorators = {
        createNewItem: [{ type: Input, args: ['kendoTreeListTemplateEditing',] }]
    };
    return TemplateEditingDirective;
}(RowEditingDirectiveBase));
export { TemplateEditingDirective };
