/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, NgZone } from '@angular/core';
import { Orientation } from '../common/orientation';
import { SplitterPaneComponent } from './splitter-pane.component';
/**
 * @hidden
 */
export declare type SplitterParameters = {
    containerSize: () => number;
    panes: Array<SplitterPaneComponent>;
    orientation: Orientation;
};
/**
 * @hidden
 */
export declare type SplitterDragState = {
    prev: {
        index: number;
        initialSize: number;
        min: number;
        max: number;
    };
    next: {
        index: number;
        initialSize: number;
        min: number;
        max: number;
    };
};
/**
 * @hidden
 */
export declare class SplitterService {
    private zone;
    panes: Array<SplitterPaneComponent>;
    layoutChange: EventEmitter<any>;
    constructor(zone: NgZone);
    tryToggle(paneIndex: number): boolean;
    toggleContentOverlay(index: number, show: boolean): void;
    dragState(splitbarIndex: number): SplitterDragState;
    setSize(state: SplitterDragState, delta: number): void;
    isDraggable(splitBarIndex: number): boolean;
    isStatic(splitBarIndex: number): boolean;
    pane(index: number): SplitterPaneComponent;
    configure({ panes, orientation, containerSize }: SplitterParameters): void;
    private containerSize;
    private isPercent;
    private toPixels;
    private emit;
}
