/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input, HostBinding, ElementRef } from '@angular/core';
import { FocusService } from './focus.service';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
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
        if (!isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe(function (index) {
            if (_this.index === index) {
                _this.element.focus();
            }
        });
    };
    FocusableDirective.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    };
    FocusableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoButtonFocusable]'
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: FocusService },
        { type: ElementRef }
    ]; };
    FocusableDirective.propDecorators = {
        index: [{ type: Input }],
        focusedClassName: [{ type: HostBinding, args: ['class.k-state-focused',] }]
    };
    return FocusableDirective;
}());
export { FocusableDirective };
