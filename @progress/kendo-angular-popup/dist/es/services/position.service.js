/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Inject, Injectable, Optional } from '@angular/core';
import { DOMService } from './dom.service';
import { eitherRect, scaleRect } from '../util';
import { SCALE } from '../scale';
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
        var elementRect = scaleRect(elementOffset, scale);
        var anchorOffset = scaleRect(dom.offset(anchor), scale);
        var anchorRect = eitherRect(anchorOffset, currentLocation);
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
        { type: Injectable },
    ];
    /** @nocollapse */
    PositionService.ctorParameters = function () { return [
        { type: DOMService },
        { type: Number, decorators: [{ type: Inject, args: [SCALE,] }, { type: Optional }] }
    ]; };
    return PositionService;
}());
export { PositionService };
