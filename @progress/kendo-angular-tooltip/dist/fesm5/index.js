import { Component, Directive, ElementRef, EventEmitter, HostBinding, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Optional, Output, Renderer2, isDevMode } from '@angular/core';
import { debounceTime, filter, take } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';

/**
 * Obsolete. Provide the TooltipSettings class instead.
 *
 * @hidden
 */
var TOOLTIP_SETTINGS = new InjectionToken('kendo-ui-tooltip-settings');
/**
 * Provides a global configuration for the Kendo UI Tooltip. Once injected through
 * the `AppComponent` constructor, the configuration properties can be overridden.
 *
 * @example
 * ```ts-no-run
 * import { TooltipSettings } from '@progress/kendo-angular-tooltip';
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *      <div kendoTooltip>
 *          <button title="Saves the current document">Save</button>
 *      </div>`,
 *    providers: [{
 *        provide: TooltipSettings,
 *        useFactory: (): TooltipSettings => ({
 *          // Override default values of tooltips if wanted
 *          position: 'right'
 *        })
 *    }]
 * })
 * export class AppComponent { }
 * ```
 */
var TooltipSettings = /** @class */ (function () {
    function TooltipSettings() {
    }
    TooltipSettings.decorators = [
        { type: Injectable },
    ];
    return TooltipSettings;
}());

/**
 * @hidden
 */
function align(position, offset) {
    var anchorAlign = {};
    var popupAlign = {};
    var popupMargin = {};
    switch (position) {
        case 'top':
            anchorAlign = { horizontal: 'center', vertical: 'top' };
            popupAlign = { horizontal: 'center', vertical: 'bottom' };
            popupMargin = { horizontal: 0, vertical: offset };
            break;
        case 'bottom':
            anchorAlign = { horizontal: 'center', vertical: 'bottom' };
            popupAlign = { horizontal: 'center', vertical: 'top' };
            popupMargin = { horizontal: 0, vertical: offset };
            break;
        case 'right':
            anchorAlign = { horizontal: 'right', vertical: 'center' };
            popupAlign = { horizontal: 'left', vertical: 'center' };
            popupMargin = { horizontal: offset, vertical: 0 };
            break;
        case 'left':
            anchorAlign = { horizontal: 'left', vertical: 'center' };
            popupAlign = { horizontal: 'right', vertical: 'center' };
            popupMargin = { horizontal: offset, vertical: 0 };
            break;
        default: break;
    }
    return {
        anchorAlign: anchorAlign,
        popupAlign: popupAlign,
        popupMargin: popupMargin
    };
}
/**
 * @hidden
 */
function collision(inputcollision, position) {
    if (inputcollision) {
        return inputcollision;
    }
    if (position === 'top' || position === 'bottom') {
        return { horizontal: 'fit', vertical: 'flip' };
    }
    return { horizontal: 'flip', vertical: 'fit' };
}
function isDocumentNode(container) {
    return container.nodeType === 9;
}
/**
 * @hidden
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    var matches = Element.prototype.matches ?
        function (el, sel) { return el.matches(sel); }
        : function (el, sel) { return el.msMatchesSelector(sel); };
    var node = element;
    while (node && !isDocumentNode(node)) {
        if (matches(node, selector)) {
            return node;
        }
        node = node.parentNode;
    }
}
/**
 * @hidden
 */
function contains(container, child) {
    if (!container) {
        return false;
    }
    if (isDocumentNode(container)) {
        return false;
    }
    if (container.contains) {
        return container.contains(child);
    }
    if (container.compareDocumentPosition) {
        // tslint:disable-next-line
        return !!(container.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }
}
/**
 * @hidden
 */
var hasParent = function (node, parent) {
    while (node && node !== parent) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
function getCenterOffset(item, dir, size) {
    var rect = item.getBoundingClientRect();
    return rect[dir] + (rect[size] / 2);
}
/**
 * @hidden
 */
function containsItem(collection, item) {
    return collection.indexOf(item) !== -1;
}

/**
 * @hidden
 */
var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(content, localizationService) {
        this.content = content;
        this.localizationService = localizationService;
        this.close = new EventEmitter();
        this.tooltipWidth = null;
        this.tooltipHeight = null;
        this.callout = true;
        this.calloutStyles = function (position, calloutSize, isFlip) {
            var styles = {};
            var isVertical = position === 'top' || position === 'bottom';
            var flipDeg = '180deg';
            var zeroDeg = '0deg';
            if (!isFlip) {
                styles.transform = isVertical ? "rotateX(" + zeroDeg + ")" : "rotateY(" + zeroDeg + ")";
                return styles;
            }
            if (position === 'top') {
                styles.bottom = 'unset';
            }
            else if (position === 'bottom') {
                styles.top = 'unset';
            }
            else if (position === 'left') {
                styles.right = 'unset';
            }
            else if (position === 'right') {
                styles.left = 'unset';
            }
            styles[position] = -calloutSize + "px";
            styles.transform = isVertical ? "rotateX(" + flipDeg + ")" : "rotateY(" + flipDeg + ")";
            return styles;
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            return 'k-widget k-tooltip';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContentComponent.prototype, "className", {
        get: function () {
            return this.closable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContentComponent.prototype, "cssPosition", {
        get: function () {
            return 'relative';
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicRTLSubscription = this.localizationService.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
    };
    TooltipContentComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    TooltipContentComponent.prototype.calloutPositionClass = function () {
        return {
            'top': 'k-callout-s',
            'left': 'k-callout-e',
            'bottom': 'k-callout-n',
            'right': 'k-callout-w'
        }[this.position];
    };
    TooltipContentComponent.prototype.onCloseClick = function (event) {
        event.preventDefault();
        this.close.emit();
    };
    TooltipContentComponent.prototype.updateCalloutPosition = function (position, isFlip) {
        if (!this.callout) {
            return;
        }
        var callout = this.content.nativeElement.querySelector('.k-callout');
        var isVertical = position === 'top' || position === 'bottom';
        var size = isVertical ? 'width' : 'height';
        var dir = isVertical ? 'left' : 'top';
        var offsetProperty = isVertical ? 'marginLeft' : 'marginTop';
        var calloutSize = callout.getBoundingClientRect()[size];
        var anchorCenter = getCenterOffset(this.anchor.nativeElement, dir, size);
        var contentCenter = getCenterOffset(this.content.nativeElement, dir, size);
        var diff = Math.abs(contentCenter - anchorCenter);
        if (diff > 1 || diff === 0 || Math.round(diff) === 0) {
            var newMargin = contentCenter - anchorCenter + (calloutSize / 2);
            callout.style[offsetProperty] = -newMargin + "px";
        }
        var calloutStyles = this.calloutStyles(position, calloutSize, isFlip);
        Object.keys(calloutStyles).forEach(function (style) {
            callout.style[style] = calloutStyles[style];
        });
    };
    TooltipContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-tooltip',
                    template: "\n        <div class=\"k-tooltip-title\" *ngIf=\"titleTemplate\">\n            <ng-template\n                [ngIf]=\"titleTemplate\"\n                [ngTemplateOutlet]=\"titleTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: anchor, anchor: anchor }\">\n            </ng-template>\n        </div>\n        <div *ngIf=\"closable\" class=\"k-tooltip-button\" (click)=\"onCloseClick($event)\">\n            <a href=\"#\" class=\"k-icon k-i-close\" title=\"Close\"></a>\n        </div>\n\n        <div class=\"k-tooltip-content\">\n            <ng-template\n                [ngIf]=\"templateRef\"\n                [ngTemplateOutlet]=\"templateRef\"\n                [ngTemplateOutletContext]=\"{ $implicit: anchor, anchor: anchor }\">\n            </ng-template>\n            <ng-template\n                [ngIf]=\"templateString\">\n                {{ templateString }}\n            </ng-template>\n        </div>\n        <div class=\"k-callout\" *ngIf=\"callout\" [ngClass]=\"calloutPositionClass()\"></div>\n    ",
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.tooltip'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TooltipContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: LocalizationService }
    ]; };
    TooltipContentComponent.propDecorators = {
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        close: [{ type: Output }],
        cssClasses: [{ type: HostBinding, args: ['class',] }],
        className: [{ type: HostBinding, args: ['class.k-tooltip-closable',] }],
        cssPosition: [{ type: HostBinding, args: ['style.position',] }],
        tooltipWidth: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
        tooltipHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
        titleTemplate: [{ type: Input }],
        anchor: [{ type: Input }],
        closable: [{ type: Input }],
        templateRef: [{ type: Input }],
        templateString: [{ type: Input }]
    };
    return TooltipContentComponent;
}());

/**
 * Represents the [Kendo UI Tooltip directive for Angular]({% slug overview_tooltip %}).
 * Used to display additional information that is related to an element.
 *
 * @example
 * ```ts-no-run
 * <div kendoTooltip>
 *    <a title="Tooltip title" href="foo">foo</a>
 * </div>
 * ```
 */
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(tooltipWrapper, ngZone, renderer, popupService, settings, legacySettings) {
        var _this = this;
        this.tooltipWrapper = tooltipWrapper;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.popupService = popupService;
        /**
         * Specifies a selector for elements within a container which will display a tooltip
         * ([see example]({% slug anchorelements_tooltip %})). The possible values include any
         * DOM `selector`. The default value is `[title]`.
         */
        this.filter = '[title]';
        /**
         * Specifies the position of the Tooltip that is relative to the
         * anchor element ([see example]({% slug positioning_tooltip %})).
         *
         * The possible values are:
         * * `top` (default)
         * * `bottom`
         * * `left`
         * * `right`
         */
        this.position = 'top';
        /**
         * Specifies the delay in milliseconds before the Tooltip is shown.
         * * `100` (default) milliseconds.
         */
        this.showAfter = 100;
        /**
         * Specifies if the ??ooltip will display a callout arrow.
         *
         * The possible values are:
         * * `true` (default)
         * * `false`
         */
        this.callout = true;
        /**
         * Specifies if the ??ooltip will display a **Close** button
         * ([see example]({% slug closable_tooltip %})).
         *
         * The possible values are:
         * * `true`
         * * `false`
         */
        this.closable = false;
        /**
         * Specifies the offset in pixels between the Tooltip and the anchor. Defaults to `6` pixels.
         * If the `callout` property is set to `true`, the offset is rendered from the callout arrow.
         * If the `callout` property is set to `false`, the offset is rendered from the content of the Tooltip.
         */
        this.offset = 6;
        this.anchor = null;
        this.validPositions = ['top', 'bottom', 'right', 'left'];
        this.validShowOptions = ['hover', 'click', 'none'];
        Object.assign(this, settings, legacySettings);
        this.ngZone.runOutsideAngular(function () {
            var wrapper = _this.tooltipWrapper.nativeElement;
            _this.anchorTitleSubscription = fromEvent(wrapper, 'mouseover')
                .pipe(filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) {
                var filterElement = closest(e.target, _this.filter);
                if (filterElement) {
                    _this.hideElementTitle({ nativeElement: filterElement });
                }
            });
            _this.mouseOverSubscription = fromEvent(wrapper, 'mouseover')
                .pipe(debounceTime(100), filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) { return _this.onMouseOver(e); });
            _this.mouseOutSubscription = fromEvent(wrapper, 'mouseout')
                .pipe(debounceTime(100))
                .subscribe(function (e) { return _this.onMouseOut(e); });
        });
    }
    Object.defineProperty(TooltipDirective.prototype, "tooltipTemplate", {
        get: function () { return this.template; },
        /**
         * Sets the content of the Tooltip as a template reference
         * ([see example]({% slug templates_tooltip %})).
         */
        set: function (value) {
            this.template = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows the Tooltip.
     * @param anchor&mdash; ElementRef|Element.
     * Specifies the element that will be used as an anchor. The Tooltip opens relative to that element.
     */
    TooltipDirective.prototype.show = function (anchor) {
        var _this = this;
        if (this.popupRef) {
            return;
        }
        if (anchor instanceof Element) {
            anchor = { nativeElement: anchor };
        }
        this.anchor = anchor;
        if (this.showOn === 'hover') {
            if (this.popupRef) {
                return;
            }
            clearTimeout(this.showTimeout);
            this.showTimeout = window.setTimeout(function () { return _this.showContent(_this.anchor); }, this.showAfter);
        }
        else {
            this.hideElementTitle(this.anchor);
            this.showContent(this.anchor);
        }
    };
    /**
     * Hides the Tooltip.
     */
    TooltipDirective.prototype.hide = function () {
        clearTimeout(this.showTimeout);
        var anchor = this.anchor && this.anchor.nativeElement;
        if (anchor && anchor.getAttribute('data-title')) {
            if (!anchor.getAttribute('title')) {
                anchor.setAttribute('title', anchor.getAttribute('data-title'));
            }
            anchor.setAttribute('data-title', '');
        }
        if (this.popupMouseOutSubscription) {
            this.popupMouseOutSubscription.unsubscribe();
        }
        if (this.closeClickSubscription) {
            this.closeClickSubscription.unsubscribe();
        }
        this.closePopup();
    };
    /**
     * Toggle visibility of the Tooltip.
     *
     * @param anchor&mdash; ElementRef|Element. Specifies the element that will be used as an anchor.
     * @param show&mdash; Optional. Boolean. Specifies if the Tooltip will be rendered.
     */
    TooltipDirective.prototype.toggle = function (anchor, show) {
        var previousAnchor = this.anchor && this.anchor.nativeElement;
        if (anchor instanceof Element) {
            anchor = { nativeElement: anchor };
        }
        if (previousAnchor !== anchor.nativeElement) {
            this.hide();
        }
        if (previousAnchor === anchor.nativeElement && this.showOn === 'click') {
            this.hide();
        }
        if (typeof show === 'undefined') {
            show = !this.popupRef;
        }
        if (show) {
            this.show(anchor);
        }
        else {
            this.hide();
        }
    };
    TooltipDirective.prototype.ngOnInit = function () {
        if (this.showOn === undefined) {
            this.showOn = 'hover';
        }
        this.verifyProperties();
    };
    TooltipDirective.prototype.ngOnChanges = function (changes) {
        if (changes.showOn) {
            this.subscribeClick();
        }
    };
    TooltipDirective.prototype.ngAfterViewChecked = function () {
        if (!this.popupRef) {
            return;
        }
        if (this.anchor &&
            !hasParent(this.anchor.nativeElement || this.anchor, this.tooltipWrapper.nativeElement)) {
            this.anchor = null;
            this.hide();
        }
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hide();
        this.template = null;
        this.anchorTitleSubscription.unsubscribe();
        this.mouseOverSubscription.unsubscribe();
        this.mouseOutSubscription.unsubscribe();
        if (this.mouseClickSubscription) {
            this.mouseClickSubscription.unsubscribe();
        }
        if (this.popupPositionChangeSubscription) {
            this.popupPositionChangeSubscription.unsubscribe();
        }
        if (this.popupMouseOutSubscription) {
            this.popupMouseOutSubscription.unsubscribe();
        }
    };
    TooltipDirective.prototype.showContent = function (anchorRef) {
        var _this = this;
        if (!anchorRef.nativeElement.getAttribute('data-title') && !this.template) {
            return;
        }
        this.ngZone.run(function () {
            _this.openPopup(anchorRef);
            _this.bindContent(_this.popupRef.content, anchorRef);
        });
        this.popupRef.popupAnchorViewportLeave
            .pipe(take(1))
            .subscribe(function () { return _this.hide(); });
    };
    TooltipDirective.prototype.bindContent = function (contentComponent, anchorRef) {
        var _this = this;
        var content = contentComponent.instance;
        this.closeClickSubscription = content.close
            .subscribe(function () { _this.hide(); });
        if (!this.template) {
            content.templateString = this.anchor.nativeElement.getAttribute('data-title');
        }
        else {
            content.templateRef = this.template;
        }
        if (this.titleTemplate) {
            content.titleTemplate = this.titleTemplate;
        }
        content.anchor = anchorRef;
        content.callout = this.callout;
        content.closable = this.closable;
        content.position = this.position;
        content.tooltipWidth = this.tooltipWidth;
        content.tooltipHeight = this.tooltipHeight;
        this.popupRef.content.changeDetectorRef.detectChanges();
    };
    TooltipDirective.prototype.hideElementTitle = function (elementRef) {
        var element = elementRef.nativeElement;
        if (element.getAttribute('title')) {
            element.setAttribute('data-title', element.getAttribute('title'));
            element.setAttribute('title', '');
        }
    };
    TooltipDirective.prototype.openPopup = function (anchorRef) {
        var _this = this;
        var alignSettings = align(this.position, this.offset);
        var anchorAlign = alignSettings.anchorAlign;
        var popupAlign = alignSettings.popupAlign;
        var popupMargin = alignSettings.popupMargin;
        this.popupRef = this.popupService.open({
            anchor: anchorRef,
            anchorAlign: anchorAlign,
            animate: false,
            content: TooltipContentComponent,
            collision: collision(this.collision, this.position),
            margin: popupMargin,
            popupAlign: popupAlign,
            popupClass: 'k-popup-transparent'
        });
        this.renderer.addClass(this.popupRef.popupElement, 'k-tooltip-wrapper');
        if (this.tooltipClass) {
            this.renderer.addClass(this.popupRef.popupElement, this.tooltipClass);
        }
        var popupInstance = this.popupRef.content.instance;
        if (popupInstance.callout) {
            this.popupPositionChangeSubscription = this.popupRef.popupPositionChange
                .subscribe(function (_a) {
                var flip = _a.flip;
                var isFlip = flip.horizontal === true || flip.vertical === true;
                popupInstance.updateCalloutPosition(_this.position, isFlip);
            });
        }
        if (this.showOn === 'hover') {
            this.ngZone.runOutsideAngular(function () {
                var popup = _this.popupRef.popupElement;
                _this.popupMouseOutSubscription = fromEvent(popup, 'mouseout')
                    .subscribe(function (e) { return _this.onMouseOut(e); });
            });
        }
    };
    TooltipDirective.prototype.closePopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this.popupPositionChangeSubscription) {
            this.popupPositionChangeSubscription.unsubscribe();
        }
    };
    TooltipDirective.prototype.subscribeClick = function () {
        var _this = this;
        if (this.mouseClickSubscription) {
            this.mouseClickSubscription.unsubscribe();
        }
        if (this.showOn === 'click') {
            this.mouseClickSubscription = fromEvent(document, 'click')
                .pipe(filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) { return _this.onMouseClick(e, _this.tooltipWrapper.nativeElement); });
        }
    };
    TooltipDirective.prototype.onMouseClick = function (e, wrapper) {
        var target = e.target;
        var filterElement = closest(target, this.filter);
        var popup = this.popupRef && this.popupRef.popupElement;
        if (popup) {
            if (popup.contains(target)) {
                return;
            }
            if (this.closable) {
                return;
            }
        }
        if (wrapper.contains(target) && filterElement) {
            this.toggle(filterElement, true);
        }
        else if (popup) {
            this.hide();
        }
    };
    TooltipDirective.prototype.onMouseOver = function (e) {
        var filterElement = closest(e.target, this.filter);
        if (this.showOn !== 'hover') {
            return;
        }
        if (filterElement) {
            this.toggle(filterElement, true);
        }
    };
    TooltipDirective.prototype.onMouseOut = function (e) {
        if (this.showOn !== 'hover') {
            return;
        }
        if (this.closable) {
            return;
        }
        var popup = this.popupRef && this.popupRef.popupElement;
        var relatedTarget = e.relatedTarget;
        if (relatedTarget && this.anchor && contains(this.anchor.nativeElement, relatedTarget)) {
            return;
        }
        if (relatedTarget && contains(popup, relatedTarget)) {
            return;
        }
        this.hide();
    };
    TooltipDirective.prototype.verifyProperties = function () {
        if (!isDevMode()) {
            return;
        }
        if (!containsItem(this.validPositions, this.position)) {
            throw new Error("Invalid value provided for position property.The available options are 'top', 'bottom', 'left', or 'right'.");
        }
        if (!containsItem(this.validShowOptions, this.showOn)) {
            throw new Error("Invalid value provided for showOn property.The available options are 'hover' or 'none'.");
        }
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTooltip]',
                    exportAs: 'kendoTooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: PopupService },
        { type: TooltipSettings, decorators: [{ type: Optional }] },
        { type: TooltipSettings, decorators: [{ type: Optional }, { type: Inject, args: [TOOLTIP_SETTINGS,] }] }
    ]; };
    TooltipDirective.propDecorators = {
        filter: [{ type: Input }],
        position: [{ type: Input }],
        titleTemplate: [{ type: Input }],
        showOn: [{ type: Input }],
        showAfter: [{ type: Input }],
        callout: [{ type: Input }],
        closable: [{ type: Input }],
        offset: [{ type: Input }],
        tooltipWidth: [{ type: Input }],
        tooltipHeight: [{ type: Input }],
        tooltipClass: [{ type: Input }],
        collision: [{ type: Input }],
        tooltipTemplate: [{ type: Input }]
    };
    return TooltipDirective;
}());

var COMPONENT_DIRECTIVES = [TooltipDirective, TooltipContentComponent];
var COMPONENT_MODULES = [PopupModule];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Tooltip component.
 *
 * The package exports:
 * - `KendoTooltipDirective`&mdash;The Tooltip directive class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Tooltip module
 * import { TooltipModule } from '@progress/kendo-angular-tooltip';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * _@NgModule{{
 *    declarations: [AppComponent], // declare app component
 *    imports:      [BrowserModule, TooltipModule], // import TooltipModule module
 *    bootstrap:    [AppComponent]
 * }}
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    entryComponents: [TooltipContentComponent],
                    imports: [CommonModule].concat(COMPONENT_MODULES),
                    exports: [COMPONENT_DIRECTIVES]
                },] },
    ];
    return TooltipModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipContentComponent, TooltipDirective, TooltipModule, TooltipSettings, TOOLTIP_SETTINGS };
