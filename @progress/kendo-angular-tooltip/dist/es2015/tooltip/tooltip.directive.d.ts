import { TemplateRef, OnDestroy, ElementRef, NgZone, OnChanges, Renderer2, AfterViewChecked } from '@angular/core';
import { PopupService, PopupRef, Collision } from '@progress/kendo-angular-popup';
import { TooltipSettings } from './tooltip.settings';
import { Position } from '../models/position.type';
import { ShowOption } from '../models/show.option.type';
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
export declare class TooltipDirective implements OnDestroy, OnChanges, AfterViewChecked {
    tooltipWrapper: ElementRef;
    ngZone: NgZone;
    private renderer;
    private popupService;
    /**
     * Specifies a selector for elements within a container which will display a tooltip
     * ([see example]({% slug anchorelements_tooltip %})). The possible values include any
     * DOM `selector`. The default value is `[title]`.
     */
    filter: string;
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
    position: Position;
    /**
     * Renders the passed template as a header title of the Tooltip
     * ([see example]({% slug anchorelements_tooltip %})).
     */
    titleTemplate?: TemplateRef<any>;
    /**
     * Specifies when the Тooltip will be rendered
     * ([see example]({% slug programmaticopening_tooltip %})).
     *
     * The possible values are:
     * * `hover` (default)
     * * `click`
     * * `none`
     */
    showOn: ShowOption;
    /**
     * Specifies the delay in milliseconds before the Tooltip is shown.
     * * `100` (default) milliseconds.
     */
    showAfter: number;
    /**
     * Specifies if the Тooltip will display a callout arrow.
     *
     * The possible values are:
     * * `true` (default)
     * * `false`
     */
    callout: boolean;
    /**
     * Specifies if the Тooltip will display a **Close** button
     * ([see example]({% slug closable_tooltip %})).
     *
     * The possible values are:
     * * `true`
     * * `false`
     */
    closable: boolean;
    /**
     * Specifies the offset in pixels between the Tooltip and the anchor. Defaults to `6` pixels.
     * If the `callout` property is set to `true`, the offset is rendered from the callout arrow.
     * If the `callout` property is set to `false`, the offset is rendered from the content of the Tooltip.
     */
    offset: number;
    /**
     * Specifies the width of the Тooltip ([see example]({% slug anchorelements_tooltip %})).
     */
    tooltipWidth: number;
    /**
     * Specifies the height of the Тooltip.
     */
    tooltipHeight: number;
    /**
     * Specifies a CSS class that will be added to the Tooltip.
     */
    tooltipClass: string;
    /**
     * Provides screen boundary detection when the Тooltip is shown.
     */
    collision: Collision;
    /**
     * Sets the content of the Tooltip as a template reference
     * ([see example]({% slug templates_tooltip %})).
     */
    tooltipTemplate: TemplateRef<any>;
    popupRef: PopupRef;
    template: TemplateRef<any>;
    private showTimeout;
    private anchor;
    private mouseOverSubscription;
    private mouseOutSubscription;
    private mouseClickSubscription;
    private anchorTitleSubscription;
    private popupPositionChangeSubscription;
    private popupMouseOutSubscription;
    private closeClickSubscription;
    private validPositions;
    private validShowOptions;
    constructor(tooltipWrapper: ElementRef, ngZone: NgZone, renderer: Renderer2, popupService: PopupService, settings: TooltipSettings, legacySettings: TooltipSettings);
    /**
     * Shows the Tooltip.
     * @param anchor&mdash; ElementRef|Element.
     * Specifies the element that will be used as an anchor. The Tooltip opens relative to that element.
     */
    show(anchor: ElementRef | Element): void;
    /**
     * Hides the Tooltip.
     */
    hide(): void;
    /**
     * Toggle visibility of the Tooltip.
     *
     * @param anchor&mdash; ElementRef|Element. Specifies the element that will be used as an anchor.
     * @param show&mdash; Optional. Boolean. Specifies if the Tooltip will be rendered.
     */
    toggle(anchor: ElementRef | Element, show?: boolean): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private showContent;
    private bindContent;
    private hideElementTitle;
    private openPopup;
    private closePopup;
    private subscribeClick;
    private onMouseClick;
    private onMouseOver;
    private onMouseOut;
    private verifyProperties;
}
