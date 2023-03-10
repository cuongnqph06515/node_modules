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
var PositionService = /** @class */ (function () {
    function PositionService(_dom, scale) {
        if (scale === void 0) { scale = 1; }
        this._dom = _dom;
        this.scale = scale;
    }
    PositionService.prototype.positionElement = function (settings) {
        var anchor = settings.anchor, currentLocation = settings.currentLocation, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, collisions = settings.collisions, margin = settings.margin;
        var dom = this._dom;
        var scale = this.scale || 1;
        var elementOffset = dom.offsetAtPoint(element, currentLocation);
        var elementRect = util_1.scaleRect(elementOffset, scale);
        var anchorOffset = util_1.scaleRect(dom.offset(anchor), scale);
        var anchorRect = util_1.eitherRect(anchorOffset, currentLocation);
        var viewPort = settings.viewPort || dom.windowViewPort(element);
        viewPort.width = viewPort.width / scale;
        viewPort.height = viewPort.height / scale;
        var result = dom.restrictToView({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            collisions: collisions,
            elementAlign: elementAlign,
            elementRect: elementRect,
            margin: margin,
            viewPort: viewPort
        });
        var offset = dom.addOffset(currentLocation, result.offset);
        return {
            flip: result.flip,
            flipped: result.flipped,
            offset: offset
        };
    };
    PositionService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PositionService.ctorParameters = function () { return [
        { type: dom_service_1.DOMService },
        { type: Number, decorators: [{ type: core_1.Inject, args: [scale_1.SCALE,] }, { type: core_1.Optional }] }
    ]; };
    return PositionService;
}());
exports.PositionService = PositionService;
