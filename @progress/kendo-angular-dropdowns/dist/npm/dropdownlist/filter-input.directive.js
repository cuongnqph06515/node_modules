/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[filterInput]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    FilterInputDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    FilterInputDirective.propDecorators = {
        focused: [{ type: core_1.Input, args: ['filterInput',] }]
    };
    return FilterInputDirective;
}());
exports.FilterInputDirective = FilterInputDirective;
