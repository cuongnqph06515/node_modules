/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnDestroy, AfterViewInit, EventEmitter, ElementRef, Renderer2, QueryList, NgZone, OnChanges, SimpleChange, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DragResizeService } from './drag-resize.service';
import { WindowState, WindowDimensionSetting, WindowOffsetSetting, WindowMessages } from './window-settings';
import { ResizeHandleDirective } from './window-resize-handle.directive';
import { WindowTitleBarComponent } from './window-titlebar.component';
import { NavigationService } from './navigation.service';
/**
 * Represents the [Kendo UI Window component for Angular]({% slug overview_window_dialogs %}).
 */
export declare class WindowComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private el;
    private renderer;
    private service;
    private navigation;
    private ngZone;
    private localization;
    /**
     * Specifies the query selector used to set the initial focus.
     */
    autoFocusedElement: string;
    /**
     * Specifies the text that is rendered in the title bar.
     */
    title: string;
    /**
     * Specifies whether the user will be able to drag the component.
     * @default true
     */
    draggable: boolean;
    /**
     * Specifies whether the user will be able to resize the component.
     * @default true
     */
    resizable: boolean;
    /**
     * Specifies if the content of the component is persisted in the DOM when minimized.
     * @default false
     */
    keepContent: boolean;
    /**
     * Specifies the initial state of the component.
     * If not specified, the value is set to `default`.
     *
     * The possible values are:
     * * `minimized`
     * * `maximized`
     * * `default`
     */
    state: WindowState;
    /**
     * Specifies the minimum width of the component.
     * The `minWidth` property has to be set in pixels.
     * @default 120
     */
    minWidth: number;
    /**
     * Specifies the minimum height of the Window.
     * The `minHeight` property has to be set in pixels.
     * @default 100
     */
    minHeight: number;
    /**
     * Specifies the width of the Window.
     * The `width` property has to be set in pixels.
     */
    width: number;
    /**
     * Specifies the height of the Window.
     * The `height` property has to be set in pixels.
     */
    height: number;
    /**
     * Specifies the initial top offset of the Window.
     * The `top` property has to be set in pixels.
     */
    top: number;
    /**
     * Specifies the initial left offset of the Window.
     * Numeric values are treated as pixels.
     */
    left: number;
    readonly closeButtonTitle: string;
    readonly restoreButtonTitle: string;
    readonly maximizeButtonTitle: string;
    readonly minimizeButtonTitle: string;
    /**
     * Fires when the user starts to move the Window.
     */
    dragStart: EventEmitter<any>;
    /**
     * Fires when the Window was moved by the user.
     */
    dragEnd: EventEmitter<any>;
    /**
     * Fires when the user starts to resize the Window.
     */
    resizeStart: EventEmitter<any>;
    /**
     * Fires when the Window was resized by the user.
     */
    resizeEnd: EventEmitter<any>;
    /**
     * Fires when the user closes the Window.
     */
    close: EventEmitter<any>;
    /**
     * Fires when the `width` property of the component was updated. The event is triggered only after the resizing
     * has ended. The event data contains the new width. Allows a two-way binding of the `width` property.
     */
    widthChange: EventEmitter<number>;
    /**
     * Fires when the `height` property of the component was updated. The event is triggered only after the resizing
     * has ended. The event data contains the new height. Allows a two-way binding of the `height` property.
     */
    heightChange: EventEmitter<number>;
    /**
     * Fires when the `top` property of the component was updated. The event is triggered only after the dragging
     * and resizing have ended. The event data contains the new top offset. Allows a two-way binding of the `top` property.
     */
    topChange: EventEmitter<number>;
    /**
     * Fires when the `left` property of the component was updated. The event is triggered only after the dragging
     * and resizing have ended. The event data contains the new left offset. Allows a two-way binding of the `left` property.
     */
    leftChange: EventEmitter<number>;
    /**
     * Fires when the `state` property of the component was updated. The event data contains the new state. Allows a
     * two-way binding of the `state` property.
     */
    stateChange: EventEmitter<WindowState>;
    /**
     * @hidden
     */
    contentTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    titleBarTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    messages: WindowMessages;
    tabIndex: number;
    readonly hostClasses: boolean;
    readonly dir: string;
    titleBarView: WindowTitleBarComponent;
    titleBarContent: WindowTitleBarComponent;
    resizeHandles: QueryList<ResizeHandleDirective>;
    resizeDirections: Array<string>;
    private direction;
    private draged;
    private resized;
    private windowSubscription;
    private localizationChangeSubscription;
    constructor(el: ElementRef, renderer: Renderer2, service: DragResizeService, navigation: NavigationService, ngZone: NgZone, localization: LocalizationService);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    /**
     * Focuses the wrapper of the Window component.
     */
    focus(): void;
    /**
     * Brings the current Window component on top of other Window components on the page.
     */
    bringToFront(): void;
    /**
     * Manually updates the `width` or `height` option of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for sizing dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowDimensionSetting} dimension - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    setDimension(dimension: WindowDimensionSetting, value: number): void;
    /**
     * Manually updates the `top` or `left` offset of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for positioning dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowOffsetSetting} offset - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    setOffset(offset: WindowOffsetSetting, value: number): void;
    readonly showDefaultTitleBar: boolean;
    readonly styleMinWidth: string;
    readonly styleMinHeight: string;
    readonly stylePosition: string;
    readonly wrapperMaximizedClass: boolean;
    readonly wrapperMinimizedClass: boolean;
    /**
     * @hidden
     */
    onComponentKeydown(event: KeyboardEvent): void;
    /**
     * @hidden
     */
    onComponentFocus(): void;
    /**
     * @hidden
     */
    onComponentBlur(): void;
    private subscribeEvents;
    private setNextZIndex;
    private setInitialOffset;
    private updateAllOffset;
    private setStyle;
    private removeStyle;
    private readonly options;
    private setOption;
    private handleInitialFocus;
}
