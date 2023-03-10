/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, InjectionToken, Inject, Optional, NgZone, isDevMode, EventEmitter, Component, ElementRef, Renderer2, Input, Output, ViewChild, TemplateRef, ApplicationRef, ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { siblingContainer, parents, addScroll, align, boundingOffset, offset, positionWithScroll, removeScroll, restrictToView, scrollPosition, getWindowViewPort } from '@progress/kendo-popup-common';
import { isDocumentAvailable, hasObservers, ResizeSensorComponent, ResizeSensorModule } from '@progress/kendo-angular-common';
import { fromEvent, merge, from } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
var eitherRect = function (rect, offset$$1) {
    if (!rect) {
        return { height: 0, left: offset$$1.left, top: offset$$1.top, width: 0 };
    }
    return rect;
};
/**
 * @hidden
 */
var removeStackingOffset = function (rect, stackingOffset) {
    if (!stackingOffset) {
        return rect;
    }
    var result = {
        height: rect.height,
        left: rect.left - stackingOffset.left,
        top: rect.top - stackingOffset.top,
        width: rect.width
    };
    return result;
};
/**
 * @hidden
 */
var isDifferentOffset = function (oldOffset, newOffset) {
    var oldLeft = oldOffset.left, oldTop = oldOffset.top;
    var newLeft = newOffset.left, newTop = newOffset.top;
    return Math.abs(oldLeft - newLeft) >= 1 || Math.abs(oldTop - newTop) >= 1;
};
/**
 * @hidden
 */
var isWindowAvailable = function () {
    return typeof window !== 'undefined';
};
/**
 * @hidden
 */
var OVERFLOW_REGEXP = /auto|scroll/;
var overflowElementStyle = function (element) {
    return "" + element.style.overflow + element.style.overflowX + element.style.overflowY;
};
var overflowComputedStyle = function (element) {
    var styles = window.getComputedStyle(element);
    return "" + styles.overflow + styles.overflowX + styles.overflowY;
};
var overflowStyle = function (element) {
    return overflowElementStyle(element) || overflowComputedStyle(element);
};
/**
 * @hidden
 */
var scrollableParents = function (element) {
    var parentElements = [];
    if (!isDocumentAvailable() || !isWindowAvailable()) {
        return parentElements;
    }
    var parent = element.parentElement;
    while (parent) {
        if (OVERFLOW_REGEXP.test(overflowStyle(parent)) || parent.hasAttribute('data-scrollable')) {
            parentElements.push(parent);
        }
        parent = parent.parentElement;
    }
    parentElements.push(window);
    return parentElements;
};
/**
 * @hidden
 */
var FRAME_DURATION = 1000 / 60; //1000ms divided by 60fps
function memoize(fun) {
    var result;
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called) {
            return result;
        }
        result = fun.apply(void 0, args);
        called = true;
        return result;
    };
}
/**
 * @hidden
 */
var hasRelativeStackingContext = memoize(function () {
    if (!isDocumentAvailable() && document.body !== null) {
        return false;
    }
    var top = 10;
    var parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = "<div style=\"position: fixed; top: " + top + "px;\">child</div>";
    document.body.appendChild(parent);
    var isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
});
/**
 * @hidden
 */
var zIndex = function (anchor, container) {
    if (!anchor || !isDocumentAvailable() || !isWindowAvailable()) {
        return null;
    }
    var sibling = siblingContainer(anchor, container);
    if (!sibling) {
        return null;
    }
    var result = [anchor].concat(parents(anchor, sibling)).reduce(function (index, p) {
        var zIndexStyle = p.style.zIndex || window.getComputedStyle(p).zIndex;
        var current = parseInt(zIndexStyle, 10);
        return current > index ? current : index;
    }, 0);
    return result ? (result + 1) : null;
};
/**
 * @hidden
 */
var scaleRect = function (rect, scale) {
    if (!rect || scale === 1) {
        return rect;
    }
    return {
        height: rect.height / scale,
        left: rect.left / scale,
        top: rect.top / scale,
        width: rect.width / scale
    };
};

var STYLES = [
    'font-size',
    'font-family',
    'font-stretch',
    'font-style',
    'font-weight',
    'line-height'
];
/**
 * @hidden
 */
var DOMService = /** @class */ (function () {
    function DOMService() {
    }
    DOMService.prototype.addOffset = function (current, addition) {
        return {
            left: current.left + addition.left,
            top: current.top + addition.top
        };
    };
    DOMService.prototype.addScroll = function (rect, scroll) {
        return addScroll(rect, scroll);
    };
    DOMService.prototype.align = function (settings) {
        return align(settings);
    };
    DOMService.prototype.boundingOffset = function (el) {
        return boundingOffset(this.nativeElement(el));
    };
    DOMService.prototype.getFontStyles = function (el) {
        var window = this.getWindow();
        if (!window || !el) {
            return [];
        }
        var computedStyles = window.getComputedStyle(this.nativeElement(el));
        return STYLES.map(function (font) { return ({ key: font, value: computedStyles[font] }); });
    };
    DOMService.prototype.getWindow = function () {
        return isWindowAvailable() ? window : null;
    };
    DOMService.prototype.hasOffsetParent = function (el) {
        if (!el) {
            return false;
        }
        return !!this.nativeElement(el).offsetParent;
    };
    DOMService.prototype.offset = function (el) {
        if (!el) {
            return null;
        }
        return offset(this.nativeElement(el));
    };
    DOMService.prototype.offsetAtPoint = function (el, currentLocation) {
        if (!el) {
            return null;
        }
        var element = this.nativeElement(el);
        var _a = element.style, left = _a.left, top = _a.top, transition = _a.transition;
        element.style.transition = 'none';
        element.style.left = currentLocation.left + "px";
        element.style.top = currentLocation.top + "px";
        var currentOffset = offset(element);
        element.style.left = left;
        element.style.top = top;
        // prevents elements with transition to be animated because of the change
        // tslint:disable-next-line:no-unused-expression
        element.offsetHeight;
        element.style.transition = transition;
        return currentOffset;
    };
    DOMService.prototype.nativeElement = function (el) {
        if (!el) {
            return null;
        }
        return el.nativeElement || el;
    };
    DOMService.prototype.position = function (element, popup, scale) {
        if (scale === void 0) { scale = 1; }
        if (!element || !popup) {
            return null;
        }
        return positionWithScroll(this.nativeElement(element), this.nativeElement(popup), scale);
    };
    DOMService.prototype.removeScroll = function (rect, scroll) {
        return removeScroll(rect, scroll);
    };
    DOMService.prototype.restrictToView = function (settings) {
        return restrictToView(settings);
    };
    DOMService.prototype.scrollPosition = function (el) {
        return scrollPosition(this.nativeElement(el));
    };
    DOMService.prototype.scrollableParents = function (el) {
        return scrollableParents(this.nativeElement(el));
    };
    DOMService.prototype.stackingElementOffset = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        if (!relativeContextElement) {
            return null;
        }
        return offset(relativeContextElement);
    };
    DOMService.prototype.stackingElementScroll = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        if (!relativeContextElement) {
            return { x: 0, y: 0 };
        }
        return {
            x: relativeContextElement.scrollLeft,
            y: relativeContextElement.scrollTop
        };
    };
    DOMService.prototype.getRelativeContextElement = function (el) {
        if (!el || !hasRelativeStackingContext()) {
            return null;
        }
        var parent = this.nativeElement(el).parentElement;
        while (parent) {
            if (window.getComputedStyle(parent).transform !== 'none') {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null;
    };
    DOMService.prototype.useRelativePosition = function (el) {
        return !!this.getRelativeContextElement(el);
    };
    DOMService.prototype.windowViewPort = function (el) {
        return getWindowViewPort(this.nativeElement(el));
    };
    DOMService.prototype.zIndex = function (anchor, container) {
        return zIndex(this.nativeElement(anchor), this.nativeElement(container));
    };
    DOMService.prototype.zoomLevel = function () {
        if (!isDocumentAvailable() || !isWindowAvailable()) {
            return 1;
        }
        return parseFloat((document.documentElement.clientWidth / window.innerWidth).toFixed(2)) || 1;
    };
    DOMService.prototype.isZoomed = function () {
        return this.zoomLevel() > 1;
    };
    DOMService.decorators = [
        { type: Injectable },
    ];
    return DOMService;
}());

/**
 * Used to set the document scale when using a [scale transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale).
 *
 * The document or container scale is required to compute the popup position correctly. Detecting the scale is not reliable and must be set by providing a value for SCALE. See [Support for Document Scale]({% slug documentscale_popup %}).
 *
 * > Using this token is not necessary for user-applied browser zoom.
 *
 * {% meta height:300 %}
 * {% embed_file scale/app.component.ts preview %}
 * {% embed_file scale/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 *
 *
 */
var SCALE = new InjectionToken('Popup Document Scale');

/**
 * @hidden
 */
var AlignService = /** @class */ (function () {
    function AlignService(_dom, scale) {
        if (scale === void 0) { scale = 1; }
        this._dom = _dom;
        this.scale = scale;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, margin = settings.margin, offset$$1 = settings.offset, positionMode = settings.positionMode;
        var scale = this.scale || 1;
        var fixedMode = positionMode === 'fixed' || !this._dom.hasOffsetParent(element);
        var anchorRect = fixedMode ? this.absoluteRect(anchor, element, offset$$1, scale) : this.relativeRect(anchor, element, offset$$1, scale);
        var elementRect = scaleRect(this._dom.offset(element), scale);
        var result = this._dom.align({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            elementAlign: elementAlign,
            elementRect: elementRect,
            margin: margin
        });
        return result;
    };
    AlignService.prototype.absoluteRect = function (anchor, element, offset$$1, scale) {
        var scrollPos = this.elementScrollPosition(anchor, element);
        var rect = eitherRect(this._dom.offset(anchor), offset$$1);
        var stackScale = 2 * scale;
        var stackScroll = this._dom.stackingElementScroll(element);
        if (scale !== 1 && stackScroll) {
            stackScroll.x /= stackScale;
            stackScroll.y /= stackScale;
        }
        var stackOffset = this._dom.stackingElementOffset(element);
        if (scale !== 1 && stackOffset) {
            stackOffset.left /= stackScale;
            stackOffset.top /= stackScale;
        }
        return this._dom.removeScroll(this._dom.addScroll(removeStackingOffset(scaleRect(rect, scale), stackOffset), stackScroll), scrollPos);
    };
    AlignService.prototype.elementScrollPosition = function (anchor, element) {
        return anchor ? { x: 0, y: 0 } : this._dom.scrollPosition(element);
    };
    AlignService.prototype.relativeRect = function (anchor, element, offset$$1, scale) {
        var rect = eitherRect(this._dom.position(anchor, element, scale), offset$$1);
        return scaleRect(rect, scale);
    };
    AlignService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AlignService.ctorParameters = function () { return [
        { type: DOMService },
        { type: Number, decorators: [{ type: Inject, args: [SCALE,] }, { type: Optional }] }
    ]; };
    return AlignService;
}());

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
        var offset$$1 = dom.addOffset(currentLocation, result.offset);
        return {
            flip: result.flip,
            flipped: result.flipped,
            offset: offset$$1
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

/**
 * @hidden
 */
var ResizeService = /** @class */ (function () {
    function ResizeService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ResizeService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this._zone.runOutsideAngular(function () {
            _this.subscription = fromEvent(_this._dom.getWindow(), "resize")
                .pipe(auditTime(FRAME_DURATION))
                .subscribe(function () { return callback(); });
        });
    };
    ResizeService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ResizeService.prototype.isUnsubscribed = function () {
        return this.subscription && this.subscription.closed;
    };
    ResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: DOMService },
        { type: NgZone }
    ]; };
    return ResizeService;
}());

/**
 * @hidden
 */
var THRESHOLD_DIFF = 1;
/**
 * @hidden
 */
var ScrollableService = /** @class */ (function () {
    function ScrollableService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ScrollableService.prototype.forElement = function (element) {
        this.unsubscribe();
        this.element = element;
        return this;
    };
    ScrollableService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!callback || !isDocumentAvailable() || !this.element) {
            return;
        }
        var nativeElement = this._dom.nativeElement(this.element);
        var parents$$1 = this._dom.scrollableParents(this.element);
        this._zone.runOutsideAngular(function () {
            var observables = parents$$1.map(function (p) { return fromEvent(p, "scroll").pipe(auditTime(FRAME_DURATION)); });
            var subscriber = function (e) {
                var target = e.target;
                var isParent = parents$$1.filter(function (p) { return p === target; }).length > 0;
                var isDocument = target === document;
                var isWindow = target === window;
                if (isParent || isDocument || isWindow) {
                    callback(_this.isVisible(nativeElement, target));
                }
            };
            _this.subscription = merge.apply(void 0, observables).subscribe(subscriber);
        });
    };
    ScrollableService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ScrollableService.prototype.isVisible = function (elem, container) {
        var elemRect = this._dom.boundingOffset(elem);
        var containerRect = this._dom.boundingOffset(container);
        if (THRESHOLD_DIFF < (containerRect.top - elemRect.bottom)) {
            return false;
        }
        if (THRESHOLD_DIFF < (elemRect.top - containerRect.bottom)) {
            return false;
        }
        if (THRESHOLD_DIFF < (elemRect.left - containerRect.right)) {
            return false;
        }
        if (THRESHOLD_DIFF < (containerRect.left - elemRect.right)) {
            return false;
        }
        return true;
    };
    ScrollableService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollableService.ctorParameters = function () { return [
        { type: DOMService },
        { type: NgZone }
    ]; };
    return ScrollableService;
}());

var LEFT = 'left';
var RIGHT = 'right';
var DOWN = 'down';
var UP = 'up';
var DEFAULT_TYPE = 'slide';
var DEFAULT_DURATION = 100;
var animationTypes = {};
/* tslint:disable:object-literal-sort-keys */
animationTypes.expand = function (direction) {
    var scale = direction === UP || direction === DOWN ? 'scaleY' : 'scaleX';
    var startScale = 0;
    var endScale = 1;
    var origin;
    if (direction === DOWN) {
        origin = 'top';
    }
    else if (direction === LEFT) {
        origin = RIGHT;
    }
    else if (direction === RIGHT) {
        origin = LEFT;
    }
    else {
        origin = 'bottom';
    }
    return {
        start: { transform: scale + "(" + startScale + ")", transformOrigin: origin },
        end: { transform: scale + "(" + endScale + ")" }
    };
};
animationTypes.slide = function (direction) {
    var translate = direction === LEFT || direction === RIGHT ? 'translateX' : 'translateY';
    var start = direction === RIGHT || direction === DOWN ? -100 : 100;
    var end = 0;
    return {
        start: { transform: translate + "(" + start + "%)" },
        end: { transform: translate + "(" + end + "%)" }
    };
};
animationTypes.fade = function () {
    return {
        start: { opacity: 0 },
        end: { opacity: 1 }
    };
};
animationTypes.zoom = function () {
    var start = 0;
    var end = 1;
    return {
        start: { transform: "scale(" + start + ")" },
        end: { transform: "scale(" + end + ")" }
    };
};
/**
 * @hidden
 */
var AnimationService = /** @class */ (function () {
    function AnimationService(animationBuilder) {
        this.animationBuilder = animationBuilder;
        this.start = new EventEmitter();
        this.end = new EventEmitter();
    }
    AnimationService.prototype.play = function (element, options, flip) {
        if (!this.flip || this.flip.horizontal !== flip.horizontal ||
            this.flip.vertical !== flip.vertical) {
            this.flip = flip;
            var type = options.type || DEFAULT_TYPE;
            var statesFn = animationTypes[type];
            if (statesFn) {
                var direction = this.getDirection(flip, options);
                var states = statesFn(direction);
                this.playStates(element, states, options);
            }
            else if (isDevMode()) {
                throw new Error("Unsupported animation type: \"" + type + "\". The supported types are slide, expand, fade and zoom.");
            }
        }
    };
    AnimationService.prototype.ngOnDestroy = function () {
        this.stopPlayer();
    };
    AnimationService.prototype.playStates = function (element, states, options) {
        var _this = this;
        this.stopPlayer();
        var duration = options.duration || DEFAULT_DURATION;
        var factory = this.animationBuilder.build([
            style(states.start),
            animate(duration + "ms ease-in", style(states.end))
        ]);
        var player = this.player = factory.create(element);
        player.onDone(function () {
            _this.end.emit();
            _this.stopPlayer();
        });
        this.start.emit();
        player.play();
    };
    AnimationService.prototype.getDirection = function (flip, options) {
        var direction = options.direction || DOWN;
        if (flip.horizontal) {
            if (direction === LEFT) {
                direction = RIGHT;
            }
            else if (direction === RIGHT) {
                direction = LEFT;
            }
        }
        if (flip.vertical) {
            if (direction === DOWN) {
                direction = UP;
            }
            else if (direction === UP) {
                direction = DOWN;
            }
        }
        return direction;
    };
    AnimationService.prototype.stopPlayer = function () {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    };
    AnimationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AnimationService.ctorParameters = function () { return [
        { type: AnimationBuilder }
    ]; };
    return AnimationService;
}());

var DEFAULT_OFFSET = { left: -10000, top: 0 };
var ANIMATION_CONTAINER = 'k-animation-container';
var ANIMATION_CONTAINER_FIXED = 'k-animation-container-fixed';
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
var PopupComponent = /** @class */ (function () {
    function PopupComponent(container, _alignService, domService, _positionService, _resizeService, _scrollableService, animationService, _renderer, _zone) {
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
    PopupComponent.prototype.ngOnInit = function () {
        this.reposition = this.reposition.bind(this);
        this._resizeService.subscribe(this.reposition);
        this.animationSubscriptions = this.animationService.start.subscribe(this.onAnimationStart.bind(this));
        this.animationSubscriptions.add(this.animationService.end.subscribe(this.onAnimationEnd.bind(this)));
        this._scrollableService.forElement(this.anchor || this.container).subscribe(this.onScroll.bind(this));
        this.currentOffset = DEFAULT_OFFSET;
        this.setZIndex();
        this.copyFontStyles();
        this.updateFixedClass();
    };
    PopupComponent.prototype.ngOnChanges = function (changes) {
        if (changes.copyAnchorStyles) {
            this.copyFontStyles();
        }
        if (changes.positionMode) {
            this.updateFixedClass();
        }
    };
    PopupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.reposition();
        if (!this.animate) {
            this.resolvedPromise.then(function () {
                _this.onAnimationEnd();
            });
        }
    };
    PopupComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.initialCheck) {
            this.initialCheck = false;
            return;
        }
        this._zone.runOutsideAngular(function () {
            // workarounds https://github.com/angular/angular/issues/19094
            // uses promise because it is executed synchronously after the content is updated
            // does not use onStable in case the current zone is not the angular one.
            _this.unsubscribeReposition();
            _this.repositionSubscription = from(_this.resolvedPromise)
                .subscribe(_this.reposition);
        });
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this.anchorViewportLeave.complete();
        this.positionChange.complete();
        this.close.emit();
        this.close.complete();
        this._resizeService.unsubscribe();
        this._scrollableService.unsubscribe();
        this.animationSubscriptions.unsubscribe();
        this.unsubscribeReposition();
    };
    /**
     * @hidden
     */
    PopupComponent.prototype.onResize = function () {
        this.reposition();
    };
    PopupComponent.prototype.onAnimationStart = function () {
        this._renderer.removeClass(this.container.nativeElement, 'k-animation-container-shown');
    };
    PopupComponent.prototype.onAnimationEnd = function () {
        this._renderer.addClass(this.container.nativeElement, 'k-animation-container-shown');
        this.open.emit();
        this.open.complete();
    };
    Object.defineProperty(PopupComponent.prototype, "currentOffset", {
        get: function () {
            return this._currentOffset;
        },
        set: function (offset$$1) {
            this.setContainerStyle('left', offset$$1.left + "px");
            this.setContainerStyle('top', offset$$1.top + "px");
            this._currentOffset = offset$$1;
        },
        enumerable: true,
        configurable: true
    });
    PopupComponent.prototype.setZIndex = function () {
        if (this.anchor) {
            this.setContainerStyle('z-index', String(this.domService.zIndex(this.anchor, this.container)));
        }
    };
    PopupComponent.prototype.reposition = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flip = _a.flip, offset$$1 = _a.offset;
        if (!this.currentOffset || isDifferentOffset(this.currentOffset, offset$$1)) {
            this.currentOffset = offset$$1;
            if (hasObservers(this.positionChange)) {
                this._zone.run(function () { return _this.positionChange.emit({ offset: offset$$1, flip: flip }); });
            }
        }
        if (this.animate) {
            this.animationService.play(this.contentContainer.nativeElement, this.animate, flip);
        }
        this.resizeSensor.acceptSize();
    };
    PopupComponent.prototype.position = function () {
        var alignedOffset = this._alignService.alignElement({
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
    };
    PopupComponent.prototype.onScroll = function (isInViewPort) {
        var _this = this;
        var hasLeaveObservers = hasObservers(this.anchorViewportLeave);
        if (isInViewPort || !hasLeaveObservers) {
            this.reposition();
        }
        else if (hasLeaveObservers) {
            this._zone.run(function () {
                _this.anchorViewportLeave.emit();
            });
        }
    };
    PopupComponent.prototype.copyFontStyles = function () {
        var _this = this;
        if (!this.anchor || !this.copyAnchorStyles) {
            return;
        }
        this.domService.getFontStyles(this.anchor)
            .forEach(function (s) { return _this.setContainerStyle(s.key, s.value); });
    };
    PopupComponent.prototype.updateFixedClass = function () {
        var action = this.positionMode === 'fixed' ? 'addClass' : 'removeClass';
        this._renderer[action](this.container.nativeElement, ANIMATION_CONTAINER_FIXED);
    };
    PopupComponent.prototype.setContainerStyle = function (name, value) {
        this._renderer.setStyle(this.container.nativeElement, name, value);
    };
    PopupComponent.prototype.unsubscribeReposition = function () {
        if (this.repositionSubscription) {
            this.repositionSubscription.unsubscribe();
        }
    };
    PopupComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendo-popup',
                    providers: [AlignService, AnimationService, DOMService, PositionService, ResizeService, ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" #container>\n            <ng-content></ng-content>\n            <ng-template [ngTemplateOutlet]=\"content\" [ngIf]=\"content\"></ng-template>\n            <kendo-resize-sensor [rateLimit]=\"100\" (resize)=\"onResize()\">\n            </kendo-resize-sensor>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: AlignService },
        { type: DOMService },
        { type: PositionService },
        { type: ResizeService },
        { type: ScrollableService },
        { type: AnimationService },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return PopupComponent;
}());

var removeElement = function (element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
/**
 * Used to inject the Popup container. If not provided, the first root component of
 * the application is used.
 *
 * > The `POPUP_CONTAINER` can be used only with the [`PopupService`]({% slug service_popup %}) class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Popup module
 * import { PopupModule, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { ElementRef, NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, PopupModule], // import Popup module
 *     bootstrap:    [AppComponent],
 *     providers: [{
 *       provide: POPUP_CONTAINER,
 *       useFactory: () => {
 *          //return the container ElementRef, where the popup will be injected
 *          return { nativeElement: document.body } as ElementRef;
 *       }
 *     }]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
var POPUP_CONTAINER = new InjectionToken('Popup Container');
/**
 * A service for opening Popup components dynamically
 * ([see example]({% slug service_popup %})).
 *
 * @export
 * @class PopupService
 */
var PopupService = /** @class */ (function () {
    function PopupService(applicationRef, componentFactoryResolver, injector, container) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.container = container;
    }
    Object.defineProperty(PopupService.prototype, "rootViewContainer", {
        /**
         * Gets the root view container into which the component will be injected.
         *
         * @returns {ComponentRef<any>}
         */
        get: function () {
            // https://github.com/angular/angular/blob/4.0.x/packages/core/src/application_ref.ts#L571
            var rootComponents = this.applicationRef.components || [];
            if (rootComponents[0]) {
                return rootComponents[0];
            }
            throw new Error("\n            View Container not found! Inject the POPUP_CONTAINER or define a specific ViewContainerRef via the appendTo option.\n            See http://www.telerik.com/kendo-angular-ui/components/popup/api/POPUP_CONTAINER/ for more details.\n        ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupService.prototype, "rootViewContainerNode", {
        /**
         * Sets or gets the HTML element of the root component container.
         *
         * @returns {HTMLElement}
         */
        get: function () {
            return this.container ? this.container.nativeElement : this.getComponentRootNode(this.rootViewContainer);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a Popup component. Created Popups are mounted
     * in the DOM directly in the root application component.
     *
     * @param {PopupSettings} options - The options which define the Popup.
     * @returns {ComponentRef<PopupComponent>} - A reference to the Popup object.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <ng-template #template>
     *      Popup content
     *     </ng-template>
     *     <button #anchor kendoButton (click)="open(anchor, template)">Open</button>
     *   `
     * })
     * export class AppComponent {
     *     public popupRef: PopupRef;
     *
     *     constructor( private popupService: PopupService ) {}
     *
     *     public open(anchor: ElementRef, template: TemplateRef<any>): void {
     *         if (this.popupRef) {
     *              this.popupRef.close();
     *              this.popupRef = null;
     *              return;
     *         }
     *
     *         this.popupRef = this.popupService.open({
     *           anchor: anchor,
     *           content: template
     *         });
     *     }
     * }
     * ```
     */
    PopupService.prototype.open = function (options) {
        if (options === void 0) { options = {}; }
        var _a = this.contentFrom(options.content), component = _a.component, nodes = _a.nodes;
        var popupComponentRef = this.appendPopup(nodes, options.appendTo);
        var popupInstance = popupComponentRef.instance;
        this.projectComponentInputs(popupComponentRef, options);
        popupComponentRef.changeDetectorRef.detectChanges();
        if (component) {
            component.changeDetectorRef.detectChanges();
        }
        var popupElement = this.getComponentRootNode(popupComponentRef);
        return {
            close: function () {
                if (component) {
                    component.destroy();
                }
                popupComponentRef.destroy();
                // Angular will not remove the element unless the change detection is triggered
                removeElement(popupElement);
            },
            content: component,
            popup: popupComponentRef,
            popupAnchorViewportLeave: popupInstance.anchorViewportLeave,
            popupClose: popupInstance.close,
            popupElement: popupElement,
            popupOpen: popupInstance.open,
            popupPositionChange: popupInstance.positionChange
        };
    };
    PopupService.prototype.appendPopup = function (nodes, container) {
        var popupComponentRef = this.createComponent(PopupComponent, nodes, container);
        if (!container) {
            this.rootViewContainerNode.appendChild(this.getComponentRootNode(popupComponentRef));
        }
        return popupComponentRef;
    };
    /**
     * Gets the HTML element for a component reference.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     */
    PopupService.prototype.getComponentRootNode = function (componentRef) {
        return componentRef.location.nativeElement;
    };
    /**
     * Gets the `ComponentFactory` instance by its type.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.getComponentFactory = function (componentClass) {
        return this.componentFactoryResolver.resolveComponentFactory(componentClass);
    };
    /**
     * Creates a component reference from a `Component` type class.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.createComponent = function (componentClass, nodes, container) {
        var factory = this.getComponentFactory(componentClass);
        if (container) {
            return container.createComponent(factory, undefined, this.injector, nodes);
        }
        else {
            var component = factory.create(this.injector, nodes);
            this.applicationRef.attachView(component.hostView);
            return component;
        }
    };
    /**
     * Projects the inputs on the component.
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.projectComponentInputs = function (component, options) {
        Object.getOwnPropertyNames(options)
            .filter(function (prop) { return prop !== 'content' || options.content instanceof TemplateRef; })
            .map(function (prop) {
            component.instance[prop] = options[prop];
        });
        return component;
    };
    /**
     * Gets the component and the nodes to append from the `content` option.
     *
     * @param {*} content
     * @returns {any}
     */
    PopupService.prototype.contentFrom = function (content) {
        if (!content || content instanceof TemplateRef) {
            return { component: null, nodes: [[]] };
        }
        var component = this.createComponent(content);
        var nodes = component ? [component.location.nativeElement] : [];
        return {
            component: component,
            nodes: [
                nodes // <ng-content>
            ]
        };
    };
    PopupService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PopupService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Inject, args: [POPUP_CONTAINER,] }, { type: Optional }] }
    ]; };
    return PopupService;
}());

var POPUP_DIRECTIVES = [PopupComponent];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Popup component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Popup module
 * import { PopupModule } from '@progress/kendo-angular-popup';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, PopupModule], // import Popup module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var PopupModule = /** @class */ (function () {
    function PopupModule() {
    }
    PopupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [POPUP_DIRECTIVES],
                    entryComponents: [POPUP_DIRECTIVES],
                    exports: [POPUP_DIRECTIVES],
                    imports: [CommonModule, ResizeSensorModule],
                    providers: [PopupService]
                },] },
    ];
    return PopupModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { AlignService, AnimationService, DOMService, PositionService, ResizeService, ScrollableService, PopupService, POPUP_CONTAINER, PopupComponent, PopupModule, SCALE };
