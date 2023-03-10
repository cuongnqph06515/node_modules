/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var edit_service_1 = require("./edit.service");
var base_command_directive_1 = require("./base-command.directive");
/**
 * Represents the `cancel` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_treelist_treelistcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoTreeListCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate let-isNew="isNew">
 *       <button kendoTreeListCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
var CancelCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(CancelCommandDirective, _super);
    function CancelCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, editService, element, renderer, localization, ngZone) || this;
        _this.commandClass = true;
        _this.readVisible = false;
        return _this;
    }
    CancelCommandDirective.prototype.onClick = function () {
        if (this.cellContext) {
            var viewItem = this.cellContext.viewItem;
            this.editService.endEdit(viewItem.data, viewItem.isNew);
        }
    };
    CancelCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListCancelCommand]'
                },] },
    ];
    /** @nocollapse */
    CancelCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    CancelCommandDirective.propDecorators = {
        cellContext: [{ type: core_1.Input, args: ['kendoTreeListCancelCommand',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-cancel-command',] }]
    };
    return CancelCommandDirective;
}(base_command_directive_1.BaseCommandDirective));
exports.CancelCommandDirective = CancelCommandDirective;
