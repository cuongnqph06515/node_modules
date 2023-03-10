/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var row_editing_directive_base_1 = require("./row-editing-directive-base");
var treelist_component_1 = require("../treelist.component");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListTemplateEditing]'
                },] },
    ];
    /** @nocollapse */
    TemplateEditingDirective.ctorParameters = function () { return [
        { type: treelist_component_1.TreeListComponent }
    ]; };
    TemplateEditingDirective.propDecorators = {
        createNewItem: [{ type: core_1.Input, args: ['kendoTreeListTemplateEditing',] }]
    };
    return TemplateEditingDirective;
}(row_editing_directive_base_1.RowEditingDirectiveBase));
exports.TemplateEditingDirective = TemplateEditingDirective;
