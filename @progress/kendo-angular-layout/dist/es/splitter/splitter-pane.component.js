/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Renderer2, Input, Output } from '@angular/core';
/**
 * Represents the pane component of the Splitter.
 */
var SplitterPaneComponent = /** @class */ (function () {
    function SplitterPaneComponent(element, renderer, cdr) {
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
    Object.defineProperty(SplitterPaneComponent.prototype, "order", {
        get: function () {
            return this._order;
        },
        /**
         * @hidden
         */
        set: function (paneOrder) {
            this._order = paneOrder;
            this.setOrderStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        /**
         * Sets the initial size of the pane.
         * Has to be between the `min` and `max` properties.
         */
        set: function (newSize) {
            this._size = newSize;
            var element = this.element.nativeElement;
            this.renderer.setStyle(element, '-ms-flex-preferred-size', newSize);
            this.renderer.setStyle(element, 'flex-basis', newSize);
            if (this.staticPaneClass) {
                this.renderer.addClass(element, 'k-pane-static');
            }
            else {
                this.renderer.removeClass(element, 'k-pane-static');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "isHidden", {
        get: function () {
            return this.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "styleDisplayFlex", {
        get: function () {
            return this.containsSplitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "staticPaneClass", {
        get: function () {
            if (this.forceExpand) {
                return false;
            }
            return !this.resizable && !this.collapsible || this.fixedSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "scrollablePaneClass", {
        get: function () {
            return this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "fixedSize", {
        get: function () {
            return this.size && this.size.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    SplitterPaneComponent.prototype.ngAfterViewChecked = function () {
        var element = this.element.nativeElement;
        if (this.isHidden) {
            this.renderer.addClass(element, 'k-state-hidden');
            this.renderer.addClass(element, 'hidden');
        }
        else {
            this.renderer.removeClass(element, 'k-state-hidden');
            this.renderer.removeClass(element, 'hidden');
        }
    };
    Object.defineProperty(SplitterPaneComponent.prototype, "computedSize", {
        /**
         * @hidden
         */
        get: function () {
            if (this.orientation === 'vertical') {
                return this.element.nativeElement.offsetHeight;
            }
            else {
                return this.element.nativeElement.offsetWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.toggleOverlay = function (show) {
        this.overlayContent = show;
        this.cdr.detectChanges();
    };
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.detectChanges = function () {
        this.cdr.detectChanges();
    };
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.setOrderStyles = function () {
        var element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-order', this.order);
        this.renderer.setStyle(element, 'order', this.order);
    };
    SplitterPaneComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSplitterPane',
                    selector: 'kendo-splitter-pane',
                    template: "\n        <ng-container *ngIf=\"!collapsed\"><ng-content></ng-content></ng-container>\n        <div *ngIf=\"overlayContent\" class=\"k-splitter-overlay k-overlay\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterPaneComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return SplitterPaneComponent;
}());
export { SplitterPaneComponent };
