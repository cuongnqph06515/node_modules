/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var editing_directive_base_1 = require("./editing-directive-base");
var treelist_component_1 = require("../treelist.component");
var utils_1 = require("./utils");
/**
 * A directive which encapsulates the editing operations of the TreeList when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-incell-directive)).
 */
var InCellEditingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(InCellEditingDirective, _super);
    function InCellEditingDirective(treelist) {
        var _this = _super.call(this, treelist) || this;
        _this.treelist = treelist;
        return _this;
    }
    // Need mixin
    InCellEditingDirective.prototype.createModel = function (args) {
        return this.createFormGroup(args);
    };
    InCellEditingDirective.prototype.saveModel = function (_a) {
        var dataItem = _a.dataItem, formGroup = _a.formGroup, isNew = _a.isNew;
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        utils_1.markAllAsTouched(formGroup);
    };
    /**
     * @hidden
     */
    InCellEditingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions.add(this.treelist.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.treelist.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    };
    InCellEditingDirective.prototype.removeHandler = function (args) {
        _super.prototype.removeHandler.call(this, args);
        this.treelist.cancelCell();
    };
    InCellEditingDirective.prototype.cellClickHandler = function (args) {
        if (!args.isEdited && args.type === 'click') {
            this.treelist.editCell(args.dataItem, args.columnIndex, this.createFormGroup(args));
        }
    };
    InCellEditingDirective.prototype.cellCloseHandler = function (args) {
        var formGroup = args.formGroup, dataItem = args.dataItem;
        if (!formGroup.valid) {
            args.preventDefault();
        }
        else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    };
    InCellEditingDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListInCellEditing]'
                },] },
    ];
    /** @nocollapse */
    InCellEditingDirective.ctorParameters = function () { return [
        { type: treelist_component_1.TreeListComponent }
    ]; };
    InCellEditingDirective.propDecorators = {
        createFormGroup: [{ type: core_1.Input, args: ['kendoTreeListInCellEditing',] }]
    };
    return InCellEditingDirective;
}(editing_directive_base_1.EditingDirectiveBase));
exports.InCellEditingDirective = InCellEditingDirective;
