/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, NgZone } from '@angular/core';
/**
 * @hidden
 */
var FocusOnDomReadyDirective = /** @class */ (function () {
    function FocusOnDomReadyDirective(host, ngZone) {
        this.host = host;
        this.ngZone = ngZone;
    }
    FocusOnDomReadyDirective.prototype.ngAfterContentInit = function () {
        this.focusOnNextTick();
    };
    FocusOnDomReadyDirective.prototype.focusOnNextTick = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () { return setTimeout(function () { return _this.host.nativeElement.focus(); }); });
    };
    FocusOnDomReadyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFocusOnDomReady]'
                },] },
    ];
    /** @nocollapse */
    FocusOnDomReadyDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    return FocusOnDomReadyDirective;
}());
export { FocusOnDomReadyDirective };
