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
 * @hidden
 */
var BaseCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(BaseCommandDirective, _super);
    function BaseCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        return _this;
    }
    Object.defineProperty(BaseCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            if (this.cellContext) {
                return this.isEdited !== this.readVisible ? '' : 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCommandDirective.prototype, "isEdited", {
        get: function () {
            return Boolean(this.cellContext && this.cellContext.viewItem.editContext && !this.editService.isEditingCell());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCommandDirective.prototype, "dataItem", {
        get: function () {
            if (this.cellContext) {
                return this.cellContext.viewItem.data;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BaseCommandDirective.prototype.clickHandler = function (e) {
        e.preventDefault();
        this.onClick();
    };
    BaseCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListBaseCommand]'
                },] },
    ];
    /** @nocollapse */
    BaseCommandDirective.ctorParameters = function () { return [
        { type: edit_service_1.EditService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    BaseCommandDirective.propDecorators = {
        visible: [{ type: core_1.HostBinding, args: ['style.display',] }],
        clickHandler: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return BaseCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.BaseCommandDirective = BaseCommandDirective;
