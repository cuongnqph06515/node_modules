/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var edit_service_1 = require("../editing/edit.service");
var column_base_1 = require("../columns/column-base");
var command_column_component_1 = require("../columns/command-column.component");
var column_component_1 = require("../columns/column.component");
var column_common_1 = require("../columns/column-common");
var utils_1 = require("../utils");
var cell_context_1 = require("./common/cell-context");
var id_service_1 = require("../common/id.service");
/**
 * @hidden
 */
var CellComponent = /** @class */ (function () {
    function CellComponent(editService, idService, cellContext) {
        this.editService = editService;
        this.idService = idService;
        this.cellContext = cellContext;
        this.isNew = false;
        this._templateContext = {};
        this._editTemplateContext = {};
    }
    Object.defineProperty(CellComponent.prototype, "commandCellClass", {
        get: function () {
            return this.isCommand(this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (index) {
            this._rowIndex = index;
            this.updateCellContext();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isEdited", {
        get: function () {
            if (!(this.editService.isEditing() || this.isNew) || !this.isColumnEditable) {
                return false;
            }
            var editContext = this.editService.columnContext(this.rowIndex, this.column);
            return this.isFieldEditable(editContext, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "formGroup", {
        get: function () {
            return this.editService.context(this.rowIndex).group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "templateContext", {
        get: function () {
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "editTemplateContext", {
        get: function () {
            this._editTemplateContext.$implicit = this.formGroup;
            this._editTemplateContext.isNew = this.isNew;
            this._editTemplateContext.column = this.column;
            this._editTemplateContext.dataItem = this.dataItem;
            this._editTemplateContext.formGroup = this.formGroup;
            this._editTemplateContext.rowIndex = this.rowIndex;
            return this._editTemplateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "format", {
        get: function () {
            if (column_component_1.isColumnComponent(this.column) && !utils_1.isNullOrEmptyString(this.column.format)) {
                return utils_1.extractFormat(this.column.format);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isBoundColumn", {
        get: function () {
            return this.column.field && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isCheckboxColumn", {
        get: function () {
            return column_base_1.isCheckboxColumn(this.column) && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "selectionCheckboxId", {
        get: function () {
            return this.idService.selectionCheckboxId(this.rowIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isSpanColumn", {
        get: function () {
            return column_base_1.isSpanColumn(this.column) && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "childColumns", {
        get: function () {
            return column_common_1.columnsToRender([this.column]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isColumnEditable", {
        get: function () {
            if (!this.column || this.isCommand(this.column)) {
                return false;
            }
            return this.column.editable !== false;
        },
        enumerable: true,
        configurable: true
    });
    CellComponent.prototype.ngDoCheck = function () {
        this.updateCellContext();
    };
    CellComponent.prototype.ngOnChanges = function (_changes) {
        this.updateTemplateContext();
    };
    CellComponent.prototype.isCommand = function (column) {
        return column instanceof command_column_component_1.CommandColumnComponent;
    };
    CellComponent.prototype.isFieldEditable = function (editContext, column) {
        if (!utils_1.isPresent(editContext)) {
            return false;
        }
        if (utils_1.isPresent(column.editTemplate)) {
            return true;
        }
        return utils_1.isPresent(editContext.group) && utils_1.isPresent(editContext.group.get(column.field));
    };
    CellComponent.prototype.updateCellContext = function () {
        if (this.cellContext) {
            this.cellContext.rowIndex = this._rowIndex;
        }
    };
    CellComponent.prototype.updateTemplateContext = function () {
        if (!this.column.templateRef) {
            return;
        }
        var context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.rowIndex = this.rowIndex;
        context.columnIndex = this.columnIndex;
        context.$implicit = this.dataItem;
    };
    CellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoGridCell]',
                    template: "\n        <ng-container [ngSwitch]=\"isEdited\">\n            <ng-container *ngSwitchCase=\"false\">\n                <ng-template [ngIf]=\"column.templateRef\"\n                    [ngTemplateOutlet]=\"column.templateRef\"\n                    [ngTemplateOutletContext]=\"templateContext\">\n                </ng-template>\n                <ng-template [ngIf]=\"isSpanColumn\">\n                    <ng-template ngFor let-childColumn [ngForOf]=\"childColumns\">\n                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}\n                    </ng-template>\n                </ng-template>\n                <ng-template [ngIf]=\"isBoundColumn\">{{ dataItem | valueOf: column.field: column.format}}</ng-template>\n                <ng-template [ngIf]=\"isCheckboxColumn && !isNew\">\n                    <input class=\"k-checkbox\" [kendoGridSelectionCheckbox]=\"rowIndex\" [attr.id]=\"selectionCheckboxId\"><label class=\"k-checkbox-label\" [attr.for]=\"selectionCheckboxId\"></label>\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"true\">\n                <ng-template\n                    *ngIf=\"column.editTemplateRef\"\n                    [ngTemplateOutlet]=\"column.editTemplateRef\"\n                    [ngTemplateOutletContext]=\"editTemplateContext\">\n                </ng-template>\n                <ng-container [ngSwitch]=\"column.editor\" *ngIf=\"!column.editTemplateRef\">\n                    <kendo-numerictextbox\n                        *ngSwitchCase=\"'numeric'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    ></kendo-numerictextbox>\n\n                    <kendo-datepicker\n                        *ngSwitchCase=\"'date'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    ></kendo-datepicker>\n\n                    <input\n                        *ngSwitchCase=\"'boolean'\"\n                        type=\"checkbox\"\n                        class=\"k-checkbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    />\n\n                    <input\n                        *ngSwitchDefault\n                        type=\"text\"\n                        class=\"k-textbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    />\n                </ng-container>\n            </ng-container>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    CellComponent.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: id_service_1.IdService },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }] }
    ]; };
    CellComponent.propDecorators = {
        commandCellClass: [{ type: core_1.HostBinding, args: ['class.k-command-cell',] }],
        column: [{ type: core_1.Input }],
        columnIndex: [{ type: core_1.Input }],
        isNew: [{ type: core_1.Input }],
        rowIndex: [{ type: core_1.Input }],
        dataItem: [{ type: core_1.Input }]
    };
    return CellComponent;
}());
exports.CellComponent = CellComponent;
