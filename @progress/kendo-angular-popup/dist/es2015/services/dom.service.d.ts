/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { AlignSettings, BoundingRect, ElementRect, OffsetPosition, PositionSettings, ScrollInfo, ViewPort } from '@progress/kendo-popup-common';
import { Position } from '../models/position.interface';
/**
 * @hidden
 */
export declare class DOMService {
    addOffset(current: OffsetPosition, addition: OffsetPosition): OffsetPosition;
    addScroll(rect: ElementRect, scroll: ScrollInfo): ElementRect;
    align(settings: AlignSettings): OffsetPosition;
    boundingOffset(el: ElementRef): BoundingRect;
    getFontStyles(el: ElementRef): any;
    getWindow(): Window;
    hasOffsetParent(el: ElementRef): boolean;
    offset(el: ElementRef): ElementRect;
    offsetAtPoint(el: ElementRef, currentLocation: OffsetPosition): ElementRect;
    nativeElement(el: ElementRef): HTMLElement;
    position(element: ElementRef, popup: ElementRef, scale?: number): ElementRect;
    removeScroll(rect: ElementRect, scroll: ScrollInfo): ElementRect;
    restrictToView(settings: PositionSettings): Position;
    scrollPosition(el: ElementRef): ScrollInfo;
    scrollableParents(el: ElementRef): Array<HTMLElement>;
    stackingElementOffset(el: ElementRef): ElementRect;
    stackingElementScroll(el: ElementRef): ScrollInfo;
    getRelativeContextElement(el: ElementRef): HTMLElement;
    useRelativePosition(el: ElementRef): boolean;
    windowViewPort(el: ElementRef): ViewPort;
    zIndex(anchor: ElementRef, container: ElementRef): number;
    zoomLevel(): number;
    isZoomed(): boolean;
}
