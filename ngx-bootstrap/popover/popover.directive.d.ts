import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService, AvailbleBSPositions } from 'ngx-bootstrap/positioning';
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
import * as ɵngcc0 from '@angular/core';
export declare class PopoverDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _positionService;
    /** unique id popover - use for aria-describedby */
    popoverId: number;
    /** sets disable adaptive position */
    adaptivePosition: boolean;
    /**
     * Content to be displayed as popover.
     */
    popover?: string | TemplateRef<any>;
    /**
     * Context to be used if popover is a template.
     */
    popoverContext: any;
    /**
     * Title of a popover.
     */
    popoverTitle?: string;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     */
    placement: AvailbleBSPositions;
    /**
     * Close popover on outside click
     */
    outsideClick: boolean;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the popover should be appended to.
     */
    container?: string;
    /**
     * Css class for popover container
     */
    containerClass: string;
    /**
     * Returns whether or not the popover is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    /**
     * Delay before showing the tooltip
     */
    delay: number;
    /**
     * Emits an event when the popover is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the popover is hidden
     */
    onHidden: EventEmitter<unknown>;
    protected _popoverCancelShowFn?: () => void;
    protected _delayTimeoutId?: number;
    private _popover;
    private _isInited;
    private _ariaDescribedby?;
    constructor(_config: PopoverConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory, _positionService: PositioningService);
    /**
     * Set attribute aria-describedBy for element directive and
     * set id for the popover
     */
    setAriaDescribedBy(): void;
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show(): void;
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide(): void;
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PopoverDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PopoverDirective, "[popover]", ["bs-popover"], { "adaptivePosition": "adaptivePosition"; "placement": "placement"; "outsideClick": "outsideClick"; "triggers": "triggers"; "containerClass": "containerClass"; "delay": "delay"; "isOpen": "isOpen"; "popover": "popover"; "popoverContext": "popoverContext"; "popoverTitle": "popoverTitle"; "container": "container"; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never>;
}

//# sourceMappingURL=popover.directive.d.ts.map