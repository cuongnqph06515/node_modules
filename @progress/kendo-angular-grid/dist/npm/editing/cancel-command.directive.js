/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var edit_service_1 = require("./edit.service");
var cell_context_1 = require("../rendering/common/cell-context");
/**
 * Represents the `cancel` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_grid_gridcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoGridCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var CancelCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(CancelCommandDirective, _super);
    function CancelCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(CancelCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    CancelCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.endEdit(this.rowIndex);
        }
    };
    CancelCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    CancelCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridCancelCommand]'
                },] },
    ];
    /** @nocollapse */
    CancelCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }] },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    CancelCommandDirective.propDecorators = {
        visible: [{ type: core_1.HostBinding, args: ['style.display',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-cancel-command',] }],
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return CancelCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.CancelCommandDirective = CancelCommandDirective;
