/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("./util");
/**
 * @hidden
 */
var RendererService = /** @class */ (function () {
    function RendererService() {
    }
    RendererService.prototype.getElement = function () {
        return this.element.nativeElement;
    };
    RendererService.prototype.querySelector = function (selector) {
        return this.element.nativeElement.querySelector(selector);
    };
    RendererService.prototype.querySelectorAll = function (selector) {
        return this.element.nativeElement.querySelectorAll(selector);
    };
    RendererService.prototype.findFocusable = function () {
        return util_1.findFocusable(this.element.nativeElement, false);
    };
    RendererService.prototype.findFocusableChild = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return util_1.findFocusableChild(element, false);
    };
    RendererService.prototype.findNextFocusableSibling = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return util_1.findFocusableSibling(element, false);
    };
    RendererService.prototype.findPrevFocusableSibling = function (element) {
        if (!element) {
            element = this.findFocusable();
        }
        return util_1.findFocusableSibling(element, false, true);
    };
    RendererService.prototype.setAttribute = function (element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    };
    RendererService.decorators = [
        { type: core_1.Injectable },
    ];
    return RendererService;
}());
exports.RendererService = RendererService;
