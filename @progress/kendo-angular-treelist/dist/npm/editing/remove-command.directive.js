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
 * Represents the `remove` command of the TreeList. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_treelist_treelistcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_treelist %})).
 *
 * > When the row is in the edit mode, the button with the `kendoTreeListRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
var RemoveCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveCommandDirective, _super);
    function RemoveCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, editService, element, renderer, localization, ngZone) || this;
        _this.commandClass = true;
        _this.readVisible = true;
        return _this;
    }
    RemoveCommandDirective.prototype.onClick = function () {
        if (this.cellContext) {
            this.editService.remove(this.dataItem, (this.cellContext.viewItem.parent || {}).data);
        }
    };
    RemoveCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListRemoveCommand]'
                },] },
    ];
    /** @nocollapse */
    RemoveCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    RemoveCommandDirective.propDecorators = {
        cellContext: [{ type: core_1.Input, args: ['kendoTreeListRemoveCommand',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-remove-command',] }]
    };
    return RemoveCommandDirective;
}(base_command_directive_1.BaseCommandDirective));
exports.RemoveCommandDirective = RemoveCommandDirective;
