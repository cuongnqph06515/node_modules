import { Directive, Input, TemplateRef, Optional, ElementRef, NgZone, Inject, isDevMode, Renderer2 } from '@angular/core';
import { take, debounceTime, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { PopupService } from '@progress/kendo-angular-popup';
import { TooltipSettings, TOOLTIP_SETTINGS } from './tooltip.settings';
import { TooltipContentComponent } from '../tooltip/tooltip.content.component';
import { align, closest, contains, containsItem, collision, hasParent } from '../utils';
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
export class TooltipDirective {
    constructor(tooltipWrapper, ngZone, renderer, popupService, settings, legacySettings) {
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
        this.ngZone.runOutsideAngular(() => {
            const wrapper = this.tooltipWrapper.nativeElement;
            this.anchorTitleSubscription = fromEvent(wrapper, 'mouseover')
                .pipe(filter(() => this.filter !== ''))
                .subscribe((e) => {
                const filterElement = closest(e.target, this.filter);
                if (filterElement) {
                    this.hideElementTitle({ nativeElement: filterElement });
                }
            });
            this.mouseOverSubscription = fromEvent(wrapper, 'mouseover')
                .pipe(debounceTime(100), filter(() => this.filter !== ''))
                .subscribe(e => this.onMouseOver(e));
            this.mouseOutSubscription = fromEvent(wrapper, 'mouseout')
                .pipe(debounceTime(100))
                .subscribe(e => this.onMouseOut(e));
        });
    }
    /**
     * Sets the content of the Tooltip as a template reference
     * ([see example]({% slug templates_tooltip %})).
     */
    set tooltipTemplate(value) {
        this.template = value;
    }
    get tooltipTemplate() { return this.template; }
    /**
     * Shows the Tooltip.
     * @param anchor&mdash; ElementRef|Element.
     * Specifies the element that will be used as an anchor. The Tooltip opens relative to that element.
     */
    show(anchor) {
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
            this.showTimeout = window.setTimeout(() => this.showContent(this.anchor), this.showAfter);
        }
        else {
            this.hideElementTitle(this.anchor);
            this.showContent(this.anchor);
        }
    }
    /**
     * Hides the Tooltip.
     */
    hide() {
        clearTimeout(this.showTimeout);
        const anchor = this.anchor && this.anchor.nativeElement;
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
    }
    /**
     * Toggle visibility of the Tooltip.
     *
     * @param anchor&mdash; ElementRef|Element. Specifies the element that will be used as an anchor.
     * @param show&mdash; Optional. Boolean. Specifies if the Tooltip will be rendered.
     */
    toggle(anchor, show) {
        const previousAnchor = this.anchor && this.anchor.nativeElement;
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
    }
    ngOnInit() {
        if (this.showOn === undefined) {
            this.showOn = 'hover';
        }
        this.verifyProperties();
    }
    ngOnChanges(changes) {
        if (changes.showOn) {
            this.subscribeClick();
        }
    }
    ngAfterViewChecked() {
        if (!this.popupRef) {
            return;
        }
        if (this.anchor &&
            !hasParent(this.anchor.nativeElement || this.anchor, this.tooltipWrapper.nativeElement)) {
            this.anchor = null;
            this.hide();
        }
    }
    ngOnDestroy() {
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
    }
    showContent(anchorRef) {
        if (!anchorRef.nativeElement.getAttribute('data-title') && !this.template) {
            return;
        }
        this.ngZone.run(() => {
            this.openPopup(anchorRef);
            this.bindContent(this.popupRef.content, anchorRef);
        });
        this.popupRef.popupAnchorViewportLeave
            .pipe(take(1))
            .subscribe(() => this.hide());
    }
    bindContent(contentComponent, anchorRef) {
        const content = contentComponent.instance;
        this.closeClickSubscription = content.close
            .subscribe(() => { this.hide(); });
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
    }
    hideElementTitle(elementRef) {
        const element = elementRef.nativeElement;
        if (element.getAttribute('title')) {
            element.setAttribute('data-title', element.getAttribute('title'));
            element.setAttribute('title', '');
        }
    }
    openPopup(anchorRef) {
        const alignSettings = align(this.position, this.offset);
        const anchorAlign = alignSettings.anchorAlign;
        const popupAlign = alignSettings.popupAlign;
        const popupMargin = alignSettings.popupMargin;
        this.popupRef = this.popupService.open({
            anchor: anchorRef,
            anchorAlign,
            animate: false,
            content: TooltipContentComponent,
            collision: collision(this.collision, this.position),
            margin: popupMargin,
            popupAlign,
            popupClass: 'k-popup-transparent'
        });
        this.renderer.addClass(this.popupRef.popupElement, 'k-tooltip-wrapper');
        if (this.tooltipClass) {
            this.renderer.addClass(this.popupRef.popupElement, this.tooltipClass);
        }
        const popupInstance = this.popupRef.content.instance;
        if (popupInstance.callout) {
            this.popupPositionChangeSubscription = this.popupRef.popupPositionChange
                .subscribe(({ flip }) => {
                const isFlip = flip.horizontal === true || flip.vertical === true;
                popupInstance.updateCalloutPosition(this.position, isFlip);
            });
        }
        if (this.showOn === 'hover') {
            this.ngZone.runOutsideAngular(() => {
                const popup = this.popupRef.popupElement;
                this.popupMouseOutSubscription = fromEvent(popup, 'mouseout')
                    .subscribe((e) => this.onMouseOut(e));
            });
        }
    }
    closePopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this.popupPositionChangeSubscription) {
            this.popupPositionChangeSubscription.unsubscribe();
        }
    }
    subscribeClick() {
        if (this.mouseClickSubscription) {
            this.mouseClickSubscription.unsubscribe();
        }
        if (this.showOn === 'click') {
            this.mouseClickSubscription = fromEvent(document, 'click')
                .pipe(filter(() => this.filter !== ''))
                .subscribe(e => this.onMouseClick(e, this.tooltipWrapper.nativeElement));
        }
    }
    onMouseClick(e, wrapper) {
        const target = e.target;
        const filterElement = closest(target, this.filter);
        const popup = this.popupRef && this.popupRef.popupElement;
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
    }
    onMouseOver(e) {
        const filterElement = closest(e.target, this.filter);
        if (this.showOn !== 'hover') {
            return;
        }
        if (filterElement) {
            this.toggle(filterElement, true);
        }
    }
    onMouseOut(e) {
        if (this.showOn !== 'hover') {
            return;
        }
        if (this.closable) {
            return;
        }
        const popup = this.popupRef && this.popupRef.popupElement;
        const relatedTarget = e.relatedTarget;
        if (relatedTarget && this.anchor && contains(this.anchor.nativeElement, relatedTarget)) {
            return;
        }
        if (relatedTarget && contains(popup, relatedTarget)) {
            return;
        }
        this.hide();
    }
    verifyProperties() {
        if (!isDevMode()) {
            return;
        }
        if (!containsItem(this.validPositions, this.position)) {
            throw new Error(`Invalid value provided for position property.The available options are 'top', 'bottom', 'left', or 'right'.`);
        }
        if (!containsItem(this.validShowOptions, this.showOn)) {
            throw new Error(`Invalid value provided for showOn property.The available options are 'hover' or 'none'.`);
        }
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTooltip]',
                exportAs: 'kendoTooltip'
            },] },
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: PopupService },
    { type: TooltipSettings, decorators: [{ type: Optional }] },
    { type: TooltipSettings, decorators: [{ type: Optional }, { type: Inject, args: [TOOLTIP_SETTINGS,] }] }
];
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
