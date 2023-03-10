/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Renderer2, Input, Output } from '@angular/core';
/**
 * Represents the pane component of the Splitter.
 */
export class SplitterPaneComponent {
    constructor(element, renderer, cdr) {
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * Specifies if the user is allowed to resize the pane and provide space for other panes.
         */
        this.resizable = true;
        /**
         * Specifies if the user is allowed to hide the pane and provide space for other panes.
         */
        this.collapsible = false;
        /**
         * Specifies if overflowing content is scrollable or hidden.
         */
        this.scrollable = true;
        /**
         * Specifies if the pane is initially collapsed.
         */
        this.collapsed = false;
        /**
         * @hidden
         */
        this.orientation = 'horizontal';
        /**
         * @hidden
         */
        this.containsSplitter = false;
        /**
         * @hidden
         */
        this.overlayContent = false;
        /**
         * Fires each time the user resizes the Splitter pane.
         * The event data contains the new pane size.
         * Allows a two-way binding of the pane `size` property.
         */
        this.sizeChange = new EventEmitter();
        /**
         * Fires each time the `collapsed` property changes.
         * The event data contains the new property state.
         * Allows a two-way binding of the `collapsed` pane property.
         */
        this.collapsedChange = new EventEmitter();
        this.hostClass = true;
        /**
         * @hidden
         */
        this.forceExpand = false;
    }
    /**
     * @hidden
     */
    set order(paneOrder) {
        this._order = paneOrder;
        this.setOrderStyles();
    }
    get order() {
        return this._order;
    }
    /**
     * Sets the initial size of the pane.
     * Has to be between the `min` and `max` properties.
     */
    set size(newSize) {
        this._size = newSize;
        const element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-preferred-size', newSize);
        this.renderer.setStyle(element, 'flex-basis', newSize);
        if (this.staticPaneClass) {
            this.renderer.addClass(element, 'k-pane-static');
        }
        else {
            this.renderer.removeClass(element, 'k-pane-static');
        }
    }
    get size() {
        return this._size;
    }
    get isHidden() {
        return this.collapsed;
    }
    get styleDisplayFlex() {
        return this.containsSplitter;
    }
    get staticPaneClass() {
        if (this.forceExpand) {
            return false;
        }
        return !this.resizable && !this.collapsible || this.fixedSize;
    }
    get scrollablePaneClass() {
        return this.scrollable;
    }
    get fixedSize() {
        return this.size && this.size.length > 0;
    }
    ngAfterViewChecked() {
        const element = this.element.nativeElement;
        if (this.isHidden) {
            this.renderer.addClass(element, 'k-state-hidden');
            this.renderer.addClass(element, 'hidden');
        }
        else {
            this.renderer.removeClass(element, 'k-state-hidden');
            this.renderer.removeClass(element, 'hidden');
        }
    }
    /**
     * @hidden
     */
    get computedSize() {
        if (this.orientation === 'vertical') {
            return this.element.nativeElement.offsetHeight;
        }
        else {
            return this.element.nativeElement.offsetWidth;
        }
    }
    /**
     * @hidden
     */
    toggleOverlay(show) {
        this.overlayContent = show;
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    detectChanges() {
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    setOrderStyles() {
        const element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-order', this.order);
        this.renderer.setStyle(element, 'order', this.order);
    }
}
SplitterPaneComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSplitterPane',
                selector: 'kendo-splitter-pane',
                template: `
        <ng-container *ngIf="!collapsed"><ng-content></ng-content></ng-container>
        <div *ngIf="overlayContent" class="k-splitter-overlay k-overlay"></div>
    `
            },] },
];
/** @nocollapse */
SplitterPaneComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
SplitterPaneComponent.propDecorators = {
    order: [{ type: Input }],
    size: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    resizable: [{ type: Input }],
    collapsible: [{ type: Input }],
    scrollable: [{ type: Input }],
    collapsed: [{ type: Input }],
    orientation: [{ type: Input }],
    containsSplitter: [{ type: Input }],
    overlayContent: [{ type: Input }],
    sizeChange: [{ type: Output }],
    collapsedChange: [{ type: Output }],
    styleDisplayFlex: [{ type: HostBinding, args: ['class.k-pane-flex',] }],
    hostClass: [{ type: HostBinding, args: ['class.k-pane',] }],
    staticPaneClass: [{ type: HostBinding, args: ['class.k-pane-static',] }],
    scrollablePaneClass: [{ type: HostBinding, args: ['class.k-scrollable',] }]
};
