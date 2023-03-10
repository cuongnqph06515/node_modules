/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { WindowComponent } from './window.component';
import { Observable } from 'rxjs';
/**
 * @hidden
 */
export interface WindowOptions {
    width?: number;
    height?: number;
    minWidth: number;
    minHeight: number;
    top?: number;
    left?: number;
    position: WindowPosition;
    state: WindowState;
    draggable: boolean;
    resizable: boolean;
}
/**
 * Defines the text of the labels that are shown within the Window.
 * Used primarily for localization.
 */
export interface WindowMessages {
    /**
     * Specifies the title of the close button.
     */
    closeTitle?: string;
    /**
     * Specifies the title of the restore button.
     */
    restoreTitle?: string;
    /**
     * Specifies the title of the maximize button.
     */
    maximizeTitle?: string;
    /**
     * Specifies the title of the minimize button.
     */
    minimizeTitle?: string;
}
/**
 * @hidden
 */
export declare type WindowPosition = 'absolute' | 'fixed';
export declare type WindowState = 'minimized' | 'maximized' | 'default';
export declare type WindowDimensionSetting = 'width' | 'height';
export declare type WindowOffsetSetting = 'top' | 'left';
/**
 * The settings for the Window actions when the Window is opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
export declare class WindowSettings {
    /**
     * Sets the title of the Window.
     */
    title?: string;
    /**
     * Defines the content of the Window.
     */
    content?: string | TemplateRef<any> | Function;
    /**
     * Defines the content of the title bar.
     */
    titleBarContent?: TemplateRef<any>;
    /**
     * Defines the text of the labels that are shown within the Window.
     * Used primarily for localization.
     */
    messages?: WindowMessages;
    /**
     * Specifies if the content of the Window is persisted in the DOM
     * when the Window is minimized.
     */
    keepContent?: boolean;
    /**
     * Specifies the width of the Window.
     */
    width?: number;
    /**
     * Specifies the minimum width of the Window.
     */
    minWidth?: number;
    /**
     * Specifies the height of the Window.
     */
    height?: number;
    /**
     * Specifies the minimum height of the Window.
     */
    minHeight?: number;
    /**
     * Specifies the left offset of the Window.
     */
    left?: number;
    /**
     * Specifies the top offset of the Window.
     */
    top?: number;
    /**
     * Specifies is the Window is draggable.
     */
    draggable?: boolean;
    /**
     * Specifies if the Window is resizable.
     */
    resizable?: boolean;
    /**
     * Specifies the initial state of the Window.
     */
    state?: WindowState;
    /**
     * Defines the container in which the Window will be inserted.
     * Specifying this option changes the place in the page hierarchy where the Window will be inserted.
     */
    appendTo?: ViewContainerRef;
    /**
     * Sets the focused element query selector.
     */
    autoFocusedElement?: string;
}
/**
 * Indicates that the **Close** button of a Window that is opened through `WindowService` is clicked.
 */
export declare class WindowCloseResult {
}
/**
 * Holds references to the object instance of the Window.
 * Controls the Windows that were opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
export declare class WindowRef {
    /**
     * A reference to the Window instance.
     */
    window: ComponentRef<WindowComponent>;
    /**
     * A reference to the child component of the Window.
     * Available when the Window is opened with
     * [component content]({% slug service_window %}#toc-using-components).
     */
    content: ComponentRef<any>;
    /**
     * Allows you to close the Window by using code.
     * When called with no arguments,
     * the `result` Observable will be of type WindowCloseResult.
     * When called with an argument, the `result` Observable will hold the provided value.
     */
    close: Function;
    /**
     * Emits events when the Window is closed through the **Close** button of the title bar or
     * by calling the `close` method.
     * When the Window is closed with the title bar button or by calling `close` with no arguments,
     * the result is of type WindowCloseResult.
     * When `close` is called with an argument, the result is the passed argument.
     */
    result: Observable<WindowCloseResult>;
}
