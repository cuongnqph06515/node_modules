/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dom_service_1 = require("./dom.service");
var util_1 = require("../util");
var scale_1 = require("../scale");
/**
 * @hidden
 */
var AlignService = /** @class */ (function () {
    function AlignService(_dom, scale) {
        if (scale === void 0) { scale = 1; }
        this._dom = _dom;
        this.scale = scale;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, margin = settings.margin, offset = settings.offset, positionMode = settings.positionMode;
        var scale = this.scale || 1;
        var fixedMode = positionMode === 'fixed' || !this._dom.hasOffsetParent(element);
        var anchorRect = fixedMode ? this.absoluteRect(anchor, element, offset, scale) : this.relativeRect(anchor, element, offset, scale);
        var elementRect = util_1.scaleRect(this._dom.offset(element), scale);
        var result = this._dom.align({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            elementAlign: elementAlign,
            elementRect: elementRect,
            margin: margin
        });
        return result;
    };
    AlignService.prototype.absoluteRect = function (anchor, element, offset, scale) {
        var scrollPos = this.elementScrollPosition(anchor, element);
        var rect = util_1.eitherRect(this._dom.offset(anchor), offset);
        var stackScale = 2 * scale;
        var stackScroll = this._dom.stackingElementScroll(element);
        if (scale !== 1 && stackScroll) {
            stackScroll.x /= stackScale;
            stackScroll.y /= stackScale;
        }
        var stackOffset = this._dom.stackingElementOffset(element);
        if (scale !== 1 && stackOffset) {
            stackOffset.left /= stackScale;
            stackOffset.top /= stackScale;
        }
        return this._dom.removeScroll(this._dom.addScroll(util_1.removeStackingOffset(util_1.scaleRect(rect, scale), stackOffset), stackScroll), scrollPos);
    };
    AlignService.prototype.elementScrollPosition = function (anchor, element) {
        return anchor ? { x: 0, y: 0 } : this._dom.scrollPosition(element);
    };
    AlignService.prototype.relativeRect = function (anchor, element, offset, scale) {
        var rect = util_1.eitherRect(this._dom.position(anchor, element, scale), offset);
        return util_1.scaleRect(rect, scale);
    };
    AlignService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AlignService.ctorParameters = function () { return [
        { type: dom_service_1.DOMService },
        { type: Number, decorators: [{ type: core_1.Inject, args: [scale_1.SCALE,] }, { type: core_1.Optional }] }
    ]; };
    return AlignService;
}());
exports.AlignService = AlignService;
