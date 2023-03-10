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
 * Represents the `edit` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_grid_gridcomponent %}#toc-edit) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is in the edit mode, the button with `kendoGridEditCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 */
var EditCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditCommandDirective, _super);
    function EditCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(EditCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.beginEdit(this.rowIndex);
    };
    EditCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    EditCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridEditCommand]'
                },] },
    ];
    /** @nocollapse */
    EditCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }] },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    EditCommandDirective.propDecorators = {
        visible: [{ type: core_1.HostBinding, args: ['style.display',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-edit-command',] }],
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return EditCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.EditCommandDirective = EditCommandDirective;
