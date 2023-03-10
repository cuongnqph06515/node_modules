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
/**
 * Represents the command for adding a new item to the Grid. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_grid_gridcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *    <ng-template kendoGridToolbarTemplate>
 *       <button kendoGridAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-grid>
 * ```
 */
var AddCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(AddCommandDirective, _super);
    function AddCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        return _this;
    }
    /**
     * @hidden
     */
    AddCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.beginAdd();
    };
    Object.defineProperty(AddCommandDirective.prototype, "commandClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AddCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridAddCommand]'
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
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }],
        commandClass: [{ type: core_1.HostBinding, args: ['class.k-grid-add-command',] }]
    };
    return AddCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.AddCommandDirective = AddCommandDirective;
