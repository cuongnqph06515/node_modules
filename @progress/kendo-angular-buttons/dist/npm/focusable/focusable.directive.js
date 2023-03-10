/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var focus_service_1 = require("./focus.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(focusService, elementRef) {
        this.focusService = focusService;
        this.element = elementRef.nativeElement;
        this.subscribeEvents();
    }
    Object.defineProperty(FocusableDirective.prototype, "focusedClassName", {
        get: function () {
            return this.focusService.isFocused(this.index);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FocusableDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    FocusableDirective.prototype.subscribeEvents = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe(function (index) {
            if (_this.index === index) {
                _this.element.focus();
            }
        });
    };
    FocusableDirective.prototype.unsubscribeEvents = function () {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    };
    FocusableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoButtonFocusable]'
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: focus_service_1.FocusService },
        { type: core_1.ElementRef }
    ]; };
    FocusableDirective.propDecorators = {
        index: [{ type: core_1.Input }],
        focusedClassName: [{ type: core_1.HostBinding, args: ['class.k-state-focused',] }]
    };
    return FocusableDirective;
}());
exports.FocusableDirective = FocusableDirective;
