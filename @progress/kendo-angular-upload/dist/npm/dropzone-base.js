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
var DropZoneBase = /** @class */ (function () {
    function DropZoneBase(element, renderer, hoverClass) {
        this.element = element;
        this.renderer = renderer;
        this.hideIntervalElement = null;
        this.hoverClass = hoverClass;
    }
    /**
     * @hidden
     */
    DropZoneBase.prototype.onElementDragEnterListener = function () {
        var _this = this;
        this.addClass(this.hoverClass);
        this.lastDragElement = new Date();
        if (!this.hideIntervalElement) {
            this.hideIntervalElement = setInterval(function () {
                if (_this.calculateTimeDiff(_this.lastDragElement) < 100) {
                    return;
                }
                _this.removeClass(_this.hoverClass);
                clearInterval(_this.hideIntervalElement);
                _this.hideIntervalElement = null;
            }, 100);
        }
        return false;
    };
    /**
     * @hidden
     */
    DropZoneBase.prototype.onElementDragOverListener = function () {
        this.lastDragElement = new Date();
        return false;
    };
    DropZoneBase.prototype.calculateTimeDiff = function (prevEvent) {
        return new Date().getTime() - prevEvent.getTime();
    };
    DropZoneBase.prototype.addClass = function (className) {
        this.renderer.addClass(this.element.nativeElement, className);
    };
    DropZoneBase.prototype.removeClass = function (className) {
        this.renderer.removeClass(this.element.nativeElement, className);
    };
    DropZoneBase.propDecorators = {
        onElementDragEnterListener: [{ type: core_1.HostListener, args: ['dragenter',] }],
        onElementDragOverListener: [{ type: core_1.HostListener, args: ['dragover',] }]
    };
    return DropZoneBase;
}());
exports.DropZoneBase = DropZoneBase;
