"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var tooltip_settings_1 = require("./tooltip.settings");
var tooltip_content_component_1 = require("../tooltip/tooltip.content.component");
var utils_1 = require("../utils");
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
         * Specifies if the Тooltip will display a callout arrow.
         *
         * The possible values are:
         * * `true` (default)
         * * `false`
         */
        this.callout = true;
        /**
         * Specifies if the Тooltip will display a **Close** button
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
            _this.anchorTitleSubscription = rxjs_1.fromEvent(wrapper, 'mouseover')
                .pipe(operators_1.filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) {
                var filterElement = utils_1.closest(e.target, _this.filter);
                if (filterElement) {
                    _this.hideElementTitle({ nativeElement: filterElement });
                }
            });
            _this.mouseOverSubscription = rxjs_1.fromEvent(wrapper, 'mouseover')
                .pipe(operators_1.debounceTime(100), operators_1.filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) { return _this.onMouseOver(e); });
            _this.mouseOutSubscription = rxjs_1.fromEvent(wrapper, 'mouseout')
                .pipe(operators_1.debounceTime(100))
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
            !utils_1.hasParent(this.anchor.nativeElement || this.anchor, this.tooltipWrapper.nativeElement)) {
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
            .pipe(operators_1.take(1))
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
        var alignSettings = utils_1.align(this.position, this.offset);
        var anchorAlign = alignSettings.anchorAlign;
        var popupAlign = alignSettings.popupAlign;
        var popupMargin = alignSettings.popupMargin;
        this.popupRef = this.popupService.open({
            anchor: anchorRef,
            anchorAlign: anchorAlign,
            animate: false,
            content: tooltip_content_component_1.TooltipContentComponent,
            collision: utils_1.collision(this.collision, this.position),
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
                _this.popupMouseOutSubscription = rxjs_1.fromEvent(popup, 'mouseout')
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
            this.mouseClickSubscription = rxjs_1.fromEvent(document, 'click')
                .pipe(operators_1.filter(function () { return _this.filter !== ''; }))
                .subscribe(function (e) { return _this.onMouseClick(e, _this.tooltipWrapper.nativeElement); });
        }
    };
    TooltipDirective.prototype.onMouseClick = function (e, wrapper) {
        var target = e.target;
        var filterElement = utils_1.closest(target, this.filter);
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
        var filterElement = utils_1.closest(e.target, this.filter);
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
        if (relatedTarget && this.anchor && utils_1.contains(this.anchor.nativeElement, relatedTarget)) {
            return;
        }
        if (relatedTarget && utils_1.contains(popup, relatedTarget)) {
            return;
        }
        this.hide();
    };
    TooltipDirective.prototype.verifyProperties = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (!utils_1.containsItem(this.validPositions, this.position)) {
            throw new Error("Invalid value provided for position property.The available options are 'top', 'bottom', 'left', or 'right'.");
        }
        if (!utils_1.containsItem(this.validShowOptions, this.showOn)) {
            throw new Error("Invalid value provided for showOn property.The available options are 'hover' or 'none'.");
        }
    };
    TooltipDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTooltip]',
                    exportAs: 'kendoTooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: kendo_angular_popup_1.PopupService },
        { type: tooltip_settings_1.TooltipSettings, decorators: [{ type: core_1.Optional }] },
        { type: tooltip_settings_1.TooltipSettings, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [tooltip_settings_1.TOOLTIP_SETTINGS,] }] }
    ]; };
    TooltipDirective.propDecorators = {
        filter: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        titleTemplate: [{ type: core_1.Input }],
        showOn: [{ type: core_1.Input }],
        showAfter: [{ type: core_1.Input }],
        callout: [{ type: core_1.Input }],
        closable: [{ type: core_1.Input }],
        offset: [{ type: core_1.Input }],
        tooltipWidth: [{ type: core_1.Input }],
        tooltipHeight: [{ type: core_1.Input }],
        tooltipClass: [{ type: core_1.Input }],
        collision: [{ type: core_1.Input }],
        tooltipTemplate: [{ type: core_1.Input }]
    };
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;
