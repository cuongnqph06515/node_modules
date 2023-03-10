/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
/**
 * @hidden
 */
var FilterInputDirective = /** @class */ (function () {
    function FilterInputDirective(element, zone) {
        this.element = element;
        this.zone = zone;
    }
    FilterInputDirective.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.focused) {
            this.nextTick(function () { return _this.element.nativeElement.focus(); });
        }
    };
    FilterInputDirective.prototype.nextTick = function (fn) {
        this.zone.runOutsideAngular(function () { return setTimeout(fn); });
    };
    FilterInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[filterInput]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    FilterInputDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    FilterInputDirective.propDecorators = {
        focused: [{ type: Input, args: ['filterInput',] }]
    };
    return FilterInputDirective;
}());
export { FilterInputDirective };
