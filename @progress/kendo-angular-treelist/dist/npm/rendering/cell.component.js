/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var edit_service_1 = require("../editing/edit.service");
var column_base_1 = require("../columns/column-base");
var column_component_1 = require("../columns/column.component");
var column_common_1 = require("../columns/column-common");
var utils_1 = require("../utils");
/**
 * @hidden
 */
var CellComponent = /** @class */ (function () {
    function CellComponent(editService) {
        this.editService = editService;
        this.isNew = false;
        this.level = 0;
        this.cellContext = {};
        this._templateContext = {};
        this._editTemplateContext = {};
        this.templateContext.cellContext = this.cellContext;
    }
    Object.defineProperty(CellComponent.prototype, "commandCellClass", {
        get: function () {
            return this.column.isCommand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "viewItem", {
        get: function () {
            return this._viewItem;
        },
        set: function (value) {
            this._viewItem = value;
            this.cellContext.viewItem = this.viewItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "formGroup", {
        get: function () {
            return this.viewItem.editContext ? this.viewItem.editContext.group : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isEdited", {
        get: function () {
            return Boolean(this.viewItem.editContext && this.editService.isEditedColumn(this.column) && utils_1.isColumnEditable(this.column, this.formGroup));
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
    CellComponent.prototype.ngDoCheck = function () {
        if (this.column.templateRef) {
            this.updateTemplateContext();
        }
    };
    CellComponent.prototype.updateTemplateContext = function () {
        var context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.columnIndex = this.columnIndex;
        context.rowIndex = this.viewItem.rowIndex;
        context.$implicit = this.dataItem;
    };
    CellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoTreeListCell]',
                    template: "\n        <ng-container [ngSwitch]=\"isEdited\">\n            <ng-container *ngSwitchCase=\"false\">\n                <ng-container *ngIf=\"column.expandable\">\n                    <span class=\"k-icon k-i-none\" *ngFor=\"let item of level | levelItems : hasChildren\"></span>\n                    <span class=\"k-icon\" *ngIf=\"hasChildren\" [ngClass]=\"{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded, 'k-i-loading': loading }\"></span>\n                </ng-container>\n                <ng-container *ngIf=\"column.templateRef\"\n                    [ngTemplateOutlet]=\"column.templateRef\"\n                    [ngTemplateOutletContext]=\"templateContext\">\n                </ng-container>\n                <ng-container *ngIf=\"isSpanColumn\">\n                    <ng-container *ngFor=\"let childColumn of childColumns\">\n                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}\n                    </ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"isBoundColumn\">{{ dataItem | valueOf: column.field: column.format}}</ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"true\">\n                <ng-container\n                    *ngIf=\"column.editTemplateRef\"\n                    [ngTemplateOutlet]=\"column.editTemplateRef\"\n                    [ngTemplateOutletContext]=\"editTemplateContext\">\n                </ng-container>\n                <ng-container [ngSwitch]=\"column.editor\" *ngIf=\"!column.editTemplateRef\">\n                    <kendo-numerictextbox\n                        *ngSwitchCase=\"'numeric'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoTreeListFocusable\n                    ></kendo-numerictextbox>\n\n                    <kendo-datepicker\n                        *ngSwitchCase=\"'date'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoTreeListFocusable\n                    ></kendo-datepicker>\n\n                    <input\n                        *ngSwitchCase=\"'boolean'\"\n                        type=\"checkbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoTreeListFocusable\n                    />\n\n                    <input\n                        *ngSwitchDefault\n                        type=\"text\"\n                        class=\"k-textbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoTreeListFocusable\n                    />\n                </ng-container>\n            </ng-container>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    CellComponent.ctorParameters = function () { return [
        { type: edit_service_1.EditService }
    ]; };
    CellComponent.propDecorators = {
        commandCellClass: [{ type: core_1.HostBinding, args: ['class.k-command-cell',] }],
        column: [{ type: core_1.Input }],
        columnIndex: [{ type: core_1.Input }],
        isNew: [{ type: core_1.Input }],
        level: [{ type: core_1.Input }],
        hasChildren: [{ type: core_1.Input }],
        isExpanded: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        dataItem: [{ type: core_1.Input }],
        viewItem: [{ type: core_1.Input }]
    };
    return CellComponent;
}());
exports.CellComponent = CellComponent;
