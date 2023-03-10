/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { HostListener, HostBinding, ElementRef, Renderer2, NgZone, Directive } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
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
        { type: Directive, args: [{
                    selector: '[kendoTreeListBaseCommand]'
                },] },
    ];
    /** @nocollapse */
    BaseCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    BaseCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        clickHandler: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return BaseCommandDirective;
}(Button));
export { BaseCommandDirective };
