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
 * Represents the command for adding a new item to the TreeList. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_treelist_treelistcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *    <ng-template kendoTreeListToolbarTemplate>
 *       <button kendoTreeListAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-treelist>
 * ```
 */
var AddCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(AddCommandDirective, _super);
    function AddCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, editService, element, renderer, localization, ngZone) || this;
        _this.commandClass = true;
        _this.readVisible = true;
        return _this;
    }
    AddCommandDirective.prototype.onClick = function () {
        this.editService.beginAdd(this.dataItem);
    };
    AddCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListAddCommand]'
                },] },
    ];
    /** @nocollapse */
    AddCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    AddCommandDirective.propDecorators = {
        cellContext: [{ type: core_1.Input, args: ['kendoTreeListAddCommand',] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-add-command',] }]
    };
    return AddCommandDirective;
}(base_command_directive_1.BaseCommandDirective));
exports.AddCommandDirective = AddCommandDirective;
