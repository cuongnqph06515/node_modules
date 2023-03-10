/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, EventEmitter, Renderer2, AfterViewChecked } from '@angular/core';
import { Orientation } from '../common/orientation';
/**
 * Represents the pane component of the Splitter.
 */
export declare class SplitterPaneComponent implements AfterViewChecked {
    private element;
    private renderer;
    private cdr;
    /**
     * @hidden
     */
    order: number;
    /**
     * Sets the initial size of the pane.
     * Has to be between the `min` and `max` properties.
     */
    size: string;
    /**
     * Sets the minimum possible size of the pane.
     */
    min: string;
    /**
     * Sets the maximum possible size of the pane.
     */
    max: string;
    /**
     * Specifies if the user is allowed to resize the pane and provide space for other panes.
     */
    resizable: boolean;
    /**
     * Specifies if the user is allowed to hide the pane and provide space for other panes.
     */
    collapsible: boolean;
    /**
     * Specifies if overflowing content is scrollable or hidden.
     */
    scrollable: boolean;
    /**
     * Specifies if the pane is initially collapsed.
     */
    collapsed: boolean;
    /**
     * @hidden
     */
    orientation: Orientation;
    /**
     * @hidden
     */
    containsSplitter: boolean;
    /**
     * @hidden
     */
    overlayContent: boolean;
    /**
     * Fires each time the user resizes the Splitter pane.
     * The event data contains the new pane size.
     * Allows a two-way binding of the pane `size` property.
     */
    sizeChange: EventEmitter<string>;
    /**
     * Fires each time the `collapsed` property changes.
     * The event data contains the new property state.
     * Allows a two-way binding of the `collapsed` pane property.
     */
    collapsedChange: EventEmitter<boolean>;
    readonly isHidden: boolean;
    readonly styleDisplayFlex: boolean;
    hostClass: boolean;
    readonly staticPaneClass: boolean;
    readonly scrollablePaneClass: boolean;
    readonly fixedSize: boolean;
    /**
     * @hidden
     */
    forceExpand: boolean;
    private _size;
    private _order;
    constructor(element: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    /**
     * @hidden
     */
    readonly computedSize: number;
    /**
     * @hidden
     */
    toggleOverlay(show: boolean): void;
    /**
     * @hidden
     */
    detectChanges(): void;
    /**
     * @hidden
     */
    private setOrderStyles;
}
