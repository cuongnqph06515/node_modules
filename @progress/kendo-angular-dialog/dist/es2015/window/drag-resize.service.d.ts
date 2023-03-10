/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, EventEmitter, ElementRef, OnDestroy } from "@angular/core";
import { DraggableDirective } from '@progress/kendo-angular-common';
import { Subscription } from 'rxjs';
import { WindowOptions, WindowState } from './window-settings';
import { ChangeEvent } from './window-events';
/**
 * @hidden
 */
export declare class DragResizeService implements OnDestroy {
    private ngZone;
    close: EventEmitter<any>;
    focus: EventEmitter<any>;
    change: EventEmitter<ChangeEvent>;
    stateChange: EventEmitter<WindowState>;
    dragStart: EventEmitter<any>;
    dragEnd: EventEmitter<any>;
    resizeStart: EventEmitter<string>;
    resizeEnd: EventEmitter<any>;
    options: WindowOptions;
    restoreOptions: WindowOptions;
    window: ElementRef;
    lastAction: string;
    subscriptions: Subscription;
    dragSubscription: Subscription;
    constructor(ngZone: NgZone);
    ngOnDestroy(): void;
    init(el: ElementRef): void;
    onDrag(el: DraggableDirective): void;
    handleDrag({ originalX, originalY, pageX, pageY, startPosition }: {
        originalX: any;
        originalY: any;
        pageX: any;
        pageY: any;
        startPosition: any;
    }): void;
    onResize(handle: DraggableDirective, direction: string): void;
    handleResize(initial: any, dir: string, deltaX: number, deltaY: number): void;
    restoreAction(): void;
    defaultState(): void;
    storeOptions(): void;
    maximizeAction(): void;
    maximizeState(): void;
    minimizeAction(): void;
    minimizeState(): void;
    /**
     * Handles manual changes of the 'state' property.
     * Required to distinguish them from action clicks.
     */
    applyManualState(): void;
    closeAction(): void;
    ensureWidth(): void;
    clearHeight(): void;
    center(): void;
    currentOffsetAndPosition(): any;
    currentPosition(): any;
    setPosition(): void;
    setRestoreOption(style: string, value: number): void;
    readonly nextPossibleZIndex: number;
    readonly nextZIndex: number;
    readonly windowViewPort: any;
}
