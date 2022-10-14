/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, QueryList, ChangeDetectorRef, EventEmitter, ViewContainerRef, NgZone } from '@angular/core';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RefreshService } from './refresh.service';
import { NavigationService } from './navigation.service';
import { PopupSettings } from './popup-settings';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
import { PreventableEvent } from './common/preventable-event';
import { ToolBarRendererComponent } from './renderer.component';
import { Direction } from './direction';
/**
 * Represents the [Kendo UI ToolBar component for Angular]({% slug overview_toolbar %}).
 */
export declare class ToolBarComponent {
    private localization;
    private popupService;
    private refreshService;
    private navigationService;
    private element;
    private cdr;
    private zone;
    /**
     * Hides the overflowing tools in a popup.
     */
    overflow: boolean;
    /**
     * @hidden
     */
    resizable: boolean;
    /**
     * Configures the popup of the ToolBar drop-down list.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the ToolBar.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Fires when the overflow popup of the ToolBar is opened.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires when the overflow popup of the ToolBar is closed.
     */
    close: EventEmitter<PreventableEvent>;
    allTools: QueryList<ToolBarToolComponent>;
    overflowButton: ElementRef;
    popupTemplate: TemplateRef<any>;
    resizeSensor: ResizeSensorComponent;
    container: ViewContainerRef;
    renderedTools: QueryList<ToolBarRendererComponent>;
    popupRef: PopupRef;
    direction: Direction;
    readonly appendTo: ViewContainerRef;
    popupOpen: boolean;
    hostClasses: boolean;
    private _popupSettings;
    private resizeSubscription;
    private cachedOverflowAnchorWidth;
    private _open;
    private localizationChangesSubscription;
    private closeOverflowSubscription;
    /**
     * @hidden
     */
    onFocus(): void;
    /**
     * @hidden
     */
    onKeyDown(event: any): void;
    readonly getTabIndex: number;
    readonly getRole: string;
    readonly getDir: string;
    readonly resizableClass: boolean;
    constructor(localization: LocalizationService, popupService: PopupService, refreshService: RefreshService, navigationService: NavigationService, element: ElementRef, cdr: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    showPopup(): void;
    /**
     * Toggles the visibility of the overflow popup.
     */
    toggle(popupOpen?: boolean): void;
    /**
     * @hidden
     */
    onResize(): void;
    /**
     * @hidden
     */
    onPopupOpen(): void;
    /**
     * @hidden
     */
    onPopupClose(): void;
    readonly displayAnchor: string;
    private readonly overflowAnchorWidth;
    private readonly childrenWidth;
    private readonly visibleTools;
    private readonly overflowTools;
    private shrink;
    private stretch;
    private hideLastVisibleTool;
    private showFirstHiddenTool;
}
