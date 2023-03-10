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
export class PositionService {
    constructor(_dom, scale = 1) {
        this._dom = _dom;
        this.scale = scale;
    }
    positionElement(settings) {
        const { anchor, currentLocation, element, anchorAlign, elementAlign, collisions, margin } = settings;
        const dom = this._dom;
        const scale = this.scale || 1;
        const elementOffset = dom.offsetAtPoint(element, currentLocation);
        const elementRect = scaleRect(elementOffset, scale);
        const anchorOffset = scaleRect(dom.offset(anchor), scale);
        const anchorRect = eitherRect(anchorOffset, currentLocation);
        const viewPort = settings.viewPort || dom.windowViewPort(element);
        viewPort.width = viewPort.width / scale;
        viewPort.height = viewPort.height / scale;
        const result = dom.restrictToView({
            anchorAlign,
            anchorRect,
            collisions,
            elementAlign,
            elementRect,
            margin,
            viewPort
        });
        const offset = dom.addOffset(currentLocation, result.offset);
        return {
            flip: result.flip,
            flipped: result.flipped,
            offset: offset
        };
    }
}
PositionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PositionService.ctorParameters = () => [
    { type: DOMService },
    { type: Number, decorators: [{ type: Inject, args: [SCALE,] }, { type: Optional }] }
];
