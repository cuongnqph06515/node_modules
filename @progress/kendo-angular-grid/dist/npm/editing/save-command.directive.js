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
 * Represents the `save` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_grid_gridcomponent %}#toc-save) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with `kendoGridSaveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridSaveCommand>Save changes</button>
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
 *       <button kendoGridSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var SaveCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SaveCommandDirective, _super);
    function SaveCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(SaveCommandDirective.prototype, "visible", {
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
    SaveCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.save(this.rowIndex);
        }
    };
    SaveCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    SaveCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridSaveCommand]'
                },] },
    ];
    /** @nocollapse */
    SaveCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }] },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    SaveCommandDirective.propDecorators = {
        visible: [{ type: core_1.HostBinding, args: ['style.display',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-save-command',] }],
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return SaveCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.SaveCommandDirective = SaveCommandDirective;
