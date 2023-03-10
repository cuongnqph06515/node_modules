/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, EventEmitter, Input, Output, NgZone, Renderer2, ViewChild } from '@angular/core';
import { AlignService } from './services/align.service';
import { DOMService } from './services/dom.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
import { AnimationService } from './services/animation.service';
import { isDifferentOffset } from './util';
import { hasObservers, isDocumentAvailable, ResizeSensorComponent } from '@progress/kendo-angular-common';
import { from } from 'rxjs';
const DEFAULT_OFFSET = { left: -10000, top: 0 };
const ANIMATION_CONTAINER = 'k-animation-container';
const ANIMATION_CONTAINER_FIXED = 'k-animation-container-fixed';
/**
 * Represents the [Kendo UI Popup component for Angular]({% slug overview_popup %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="show=!show">Toggle</button>
 *  <kendo-popup *ngIf="show" [anchor]="anchor">
 *      <strong>Popup content!</strong>
 *  </kendo-popup>
 * `
 * })
 * class AppComponent {
 *   public show: boolean = false;
 * }
 * ```
 */
export class PopupComponent {
    constructor(container, _alignService, domService, _positionService, _resizeService, _scrollableService, animationService, _renderer, _zone) {
        this.container = container;
        this._alignService = _alignService;
        this.domService = domService;
        this._positionService = _positionService;
        this._resizeService = _resizeService;
        this._scrollableService = _scrollableService;
        this.animationService = animationService;
        this._renderer = _renderer;
        this._zone = _zone;
        /**
         * Controls the Popup animation. By default, the opening and closing animations
         * are enabled ([see example]({% slug animations_popup %})).
         */
        this.animate = true;
        /**
         * Specifies the anchor pivot point
         * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
         */
        this.anchorAlign = { horizontal: 'left', vertical: 'bottom' };
        /**
         * Configures the collision behavior of the Popup
         * ([see example]({% slug viewportboundarydetection_popup %})).
         */
        this.collision = { horizontal: 'fit', vertical: 'flip' };
        /**
         * Specifies the pivot point of the Popup
         * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
         */
        this.popupAlign = { horizontal: 'left', vertical: 'top' };
        /**
         * Controls whether the component will copy the `anchor` font styles.
         */
        this.copyAnchorStyles = false;
        /**
         * Specifies the position mode of the component. By default, the Popup uses fixed positioning.
         * To make the Popup acquire absolute positioning, set this option to `absolute`.
         *
         * > If you need to support mobile browsers with the zoom option,
         * use the `absolute` positioning of the Popup.
         *
         * @example
         * ```html
         * <style>
         *  .parent-content {
         *     position: relative;
         *     width: 200px;
         *     height: 200px;
         *     overflow: auto;
         *     margin: 200px auto;
         *     border: 1px solid red;
         *  }
         *  .content {
         *     position: relative;
         *     width: 100px;
         *     height: 100px;
         *     overflow: auto;
         *     margin: 300px;
         *     border: 1px solid blue;
         *  }
         *  .anchor {
         *     position: absolute;
         *     top: 200px;
         *     left: 200px;
         *  }
         * </style>
         * ```
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *   <div class="example-config">
         *      Position mode:
         *      <label><input type="radio" value="fixed" [(ngModel)]="mode" /> Fixed</label>
         *      <label><input type="radio" value="absolute" [(ngModel)]="mode" /> Absolute</label>
         *   </div>
         *   <div class="example-config">
         *       Append to
         *       <label>
         *           <input type="radio" name="place" [value]="1" [(ngModel)]="checked" />
         *           Root component
         *       </label>
         *       <label>
         *           <input type="radio" name="place" [value]="2" [(ngModel)]="checked" />
         *           <span style="color: red">Red Container</span>
         *       </label>
         *       <label>
         *           <input type="radio" name="place" [value]="3" [(ngModel)]="checked" />
         *           <span style="color: blue">Blue Container</span>
         *       </label>
         *   </div>
         *   <div class="example">
         *     <div class="parent-content" [scrollLeft]="250" [scrollTop]="230">
         *         <div class="content" [scrollLeft]="170" [scrollTop]="165">
         *           <button #anchor class="anchor" (click)="show = !show">Toggle</button>
         *           <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 3">
         *             <ul>
         *                 <li>Item1</li>
         *                 <li>Item2</li>
         *                 <li>Item3</li>
         *             </ul>
         *           </kendo-popup>
         *           <span style="position: absolute; top: 400px; left: 400px">Bottom/Right</span>
         *         </div>
         *         <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 2">
         *           <ul>
         *               <li>Item1</li>
         *               <li>Item2</li>
         *               <li>Item3</li>
         *           </ul>
         *         </kendo-popup>
         *         <span style="position: absolute; top: 600px; left: 600px">Bottom/Right</span>
         *     </div>
         *     <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 1">
         *       <ul>
         *           <li>Item1</li>
         *           <li>Item2</li>
         *           <li>Item3</li>
         *       </ul>
         *     </kendo-popup>
         *   </div>
         * `
         * })
         * class AppComponent {
         *   public checked: number = 3;
         *   public mode: string = 'absolute';
         *   public show: boolean = true;
         * }
         * ```
         */
        this.positionMode = 'fixed';
        /**
         * Specifies the absolute position of the element
         * ([see example]({% slug alignmentpositioning_popup %}#toc-aligning-to-absolute-points)).
         * The Popup opens next to that point. The Popup pivot point is defined by the `popupAlign` configuration option.
         * The boundary detection is applied by using the window viewport.
         */
        this.offset = DEFAULT_OFFSET;
        /**
         * Fires when the anchor is scrolled outside the screen boundaries.
         * ([see example]({% slug closing_popup %}#toc-after-leaving-the-viewport)).
         */
        this.anchorViewportLeave = new EventEmitter();
        /**
         * Fires after the component is closed.
         */
        this.close = new EventEmitter();
        /**
         * Fires after the component is opened and the opening animation ends.
         */
        this.open = new EventEmitter();
        /**
         * Fires after the component is opened and the Popup is positioned.
         */
        this.positionChange = new EventEmitter();
        this.resolvedPromise = Promise.resolve(null);
        this.initialCheck = true;
        this._renderer.addClass(container.nativeElement, ANIMATION_CONTAINER);
        this.updateFixedClass();
    }
    ngOnInit() {
        this.reposition = this.reposition.bind(this);
        this._resizeService.subscribe(this.reposition);
        this.animationSubscriptions = this.animationService.start.subscribe(this.onAnimationStart.bind(this));
        this.animationSubscriptions.add(this.animationService.end.subscribe(this.onAnimationEnd.bind(this)));
        this._scrollableService.forElement(this.anchor || this.container).subscribe(this.onScroll.bind(this));
        this.currentOffset = DEFAULT_OFFSET;
        this.setZIndex();
        this.copyFontStyles();
        this.updateFixedClass();
    }
    ngOnChanges(changes) {
        if (changes.copyAnchorStyles) {
            this.copyFontStyles();
        }
        if (changes.positionMode) {
            this.updateFixedClass();
        }
    }
    ngAfterViewInit() {
        this.reposition();
        if (!this.animate) {
            this.resolvedPromise.then(() => {
                this.onAnimationEnd();
            });
        }
    }
    ngAfterViewChecked() {
        if (this.initialCheck) {
            this.initialCheck = false;
            return;
        }
        this._zone.runOutsideAngular(() => {
            // workarounds https://github.com/angular/angular/issues/19094
            // uses promise because it is executed synchronously after the content is updated
            // does not use onStable in case the current zone is not the angular one.
            this.unsubscribeReposition();
            this.repositionSubscription = from(this.resolvedPromise)
                .subscribe(this.reposition);
        });
    }
    ngOnDestroy() {
        this.anchorViewportLeave.complete();
        this.positionChange.complete();
        this.close.emit();
        this.close.complete();
        this._resizeService.unsubscribe();
        this._scrollableService.unsubscribe();
        this.animationSubscriptions.unsubscribe();
        this.unsubscribeReposition();
    }
    /**
     * @hidden
     */
    onResize() {
        this.reposition();
    }
    onAnimationStart() {
        this._renderer.removeClass(this.container.nativeElement, 'k-animation-container-shown');
    }
    onAnimationEnd() {
        this._renderer.addClass(this.container.nativeElement, 'k-animation-container-shown');
        this.open.emit();
        this.open.complete();
    }
    get currentOffset() {
        return this._currentOffset;
    }
    set currentOffset(offset) {
        this.setContainerStyle('left', `${offset.left}px`);
        this.setContainerStyle('top', `${offset.top}px`);
        this._currentOffset = offset;
    }
    setZIndex() {
        if (this.anchor) {
            this.setContainerStyle('z-index', String(this.domService.zIndex(this.anchor, this.container)));
        }
    }
    reposition() {
        if (!isDocumentAvailable()) {
            return;
        }
        const { flip, offset } = this.position();
        if (!this.currentOffset || isDifferentOffset(this.currentOffset, offset)) {
            this.currentOffset = offset;
            if (hasObservers(this.positionChange)) {
                this._zone.run(() => this.positionChange.emit({ offset, flip }));
            }
        }
        if (this.animate) {
            this.animationService.play(this.contentContainer.nativeElement, this.animate, flip);
        }
        this.resizeSensor.acceptSize();
    }
    position() {
        const alignedOffset = this._alignService.alignElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            element: this.container,
            elementAlign: this.popupAlign,
            margin: this.margin,
            offset: this.offset,
            positionMode: this.positionMode
        });
        return this._positionService.positionElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            collisions: this.collision,
            currentLocation: alignedOffset,
            element: this.container,
            elementAlign: this.popupAlign,
            margin: this.margin
        });
    }
    onScroll(isInViewPort) {
        const hasLeaveObservers = hasObservers(this.anchorViewportLeave);
        if (isInViewPort || !hasLeaveObservers) {
            this.reposition();
        }
        else if (hasLeaveObservers) {
            this._zone.run(() => {
                this.anchorViewportLeave.emit();
            });
        }
    }
    copyFontStyles() {
        if (!this.anchor || !this.copyAnchorStyles) {
            return;
        }
        this.domService.getFontStyles(this.anchor)
            .forEach(s => this.setContainerStyle(s.key, s.value));
    }
    updateFixedClass() {
        const action = this.positionMode === 'fixed' ? 'addClass' : 'removeClass';
        this._renderer[action](this.container.nativeElement, ANIMATION_CONTAINER_FIXED);
    }
    setContainerStyle(name, value) {
        this._renderer.setStyle(this.container.nativeElement, name, value);
    }
    unsubscribeReposition() {
        if (this.repositionSubscription) {
            this.repositionSubscription.unsubscribe();
        }
    }
}
PopupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendo-popup',
                providers: [AlignService, AnimationService, DOMService, PositionService, ResizeService, ScrollableService],
                selector: 'kendo-popup',
                template: `
        <div class="k-popup" [ngClass]="popupClass" #container>
            <ng-content></ng-content>
            <ng-template [ngTemplateOutlet]="content" [ngIf]="content"></ng-template>
            <kendo-resize-sensor [rateLimit]="100" (resize)="onResize()">
            </kendo-resize-sensor>
        </div>
     `
            },] },
];
/** @nocollapse */
PopupComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: AlignService },
    { type: DOMService },
    { type: PositionService },
    { type: ResizeService },
    { type: ScrollableService },
    { type: AnimationService },
    { type: Renderer2 },
    { type: NgZone }
];
PopupComponent.propDecorators = {
    animate: [{ type: Input }],
    anchor: [{ type: Input }],
    anchorAlign: [{ type: Input }],
    collision: [{ type: Input }],
    popupAlign: [{ type: Input }],
    copyAnchorStyles: [{ type: Input }],
    popupClass: [{ type: Input }],
    positionMode: [{ type: Input }],
    offset: [{ type: Input }],
    margin: [{ type: Input }],
    anchorViewportLeave: [{ type: Output }],
    close: [{ type: Output }],
    open: [{ type: Output }],
    positionChange: [{ type: Output }],
    contentContainer: [{ type: ViewChild, args: ['container',] }],
    resizeSensor: [{ type: ViewChild, args: [ResizeSensorComponent,] }]
};
