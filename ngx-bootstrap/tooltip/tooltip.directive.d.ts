import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { AvailbleBSPositions } from 'ngx-bootstrap/positioning';
import * as ɵngcc0 from '@angular/core';
export declare class TooltipDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _positionService;
    tooltipId: number;
    /** sets disable adaptive position */
    adaptivePosition: boolean;
    /**
     * Content to be displayed as tooltip.
     */
    tooltip?: string | TemplateRef<unknown>;
    /** Fired when tooltip content changes */
    tooltipChange: EventEmitter<string | TemplateRef<unknown>>;
    /**
     * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
     */
    placement: AvailbleBSPositions;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the tooltip should be appended to.
     */
    container?: string;
    /**
     * Css class for tooltip container
     */
    containerClass: string;
    boundariesElement?: ('viewport' | 'scrollParent' | 'window');
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    /**
     * Allows to disable tooltip
     */
    isDisabled: boolean;
    /**
     * Delay before showing the tooltip
     */
    delay: number;
    /**
     * Emits an event when the tooltip is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the tooltip is hidden
     */
    onHidden: EventEmitter<unknown>;
    /** @deprecated - please use `tooltip` instead */
    set htmlContent(value: string | TemplateRef<unknown>);
    /** @deprecated - please use `placement` instead */
    set _placement(value: AvailbleBSPositions);
    /** @deprecated - please use `isOpen` instead */
    set _isOpen(value: boolean);
    get _isOpen(): boolean;
    /** @deprecated - please use `isDisabled` instead */
    set _enable(value: boolean);
    get _enable(): boolean;
    /** @deprecated - please use `container="body"` instead */
    set _appendToBody(value: boolean);
    get _appendToBody(): boolean;
    /** @deprecated - removed, will be added to configuration */
    tooltipAnimation: boolean;
    /** @deprecated - will replaced with customClass */
    set _popupClass(value: string);
    /** @deprecated - removed */
    set _tooltipContext(value: undefined);
    /** @deprecated */
    set _tooltipPopupDelay(value: number);
    /** @deprecated */
    tooltipFadeDuration: number;
    /** @deprecated -  please use `triggers` instead */
    get _tooltipTrigger(): string | string[];
    set _tooltipTrigger(value: string | string[]);
    /** @deprecated */
    tooltipStateChanged: EventEmitter<boolean>;
    protected _delayTimeoutId?: number;
    protected _tooltipCancelShowFn?: () => void;
    private _tooltip;
    private _delaySubscription?;
    private _ariaDescribedby?;
    constructor(_viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory, config: TooltipConfig, _elementRef: ElementRef, _renderer: Renderer2, _positionService: PositioningService);
    ngOnInit(): void;
    setAriaDescribedBy(): void;
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    toggle(): void;
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    show(): void;
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    hide(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TooltipDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<TooltipDirective, "[tooltip], [tooltipHtml]", ["bs-tooltip"], { "adaptivePosition": "adaptivePosition"; "placement": "placement"; "triggers": "triggers"; "containerClass": "containerClass"; "isDisabled": "isDisabled"; "delay": "delay"; "tooltipAnimation": "tooltipAnimation"; "tooltipFadeDuration": "tooltipFadeDuration"; "isOpen": "isOpen"; "htmlContent": "tooltipHtml"; "tooltip": "tooltip"; "_placement": "tooltipPlacement"; "_isOpen": "tooltipIsOpen"; "_enable": "tooltipEnable"; "_appendToBody": "tooltipAppendToBody"; "container": "container"; "_popupClass": "tooltipClass"; "_tooltipContext": "tooltipContext"; "_tooltipPopupDelay": "tooltipPopupDelay"; "_tooltipTrigger": "tooltipTrigger"; "boundariesElement": "boundariesElement"; }, { "tooltipChange": "tooltipChange"; "tooltipStateChanged": "tooltipStateChanged"; "onShown": "onShown"; "onHidden": "onHidden"; }, never>;
}

//# sourceMappingURL=tooltip.directive.d.ts.map