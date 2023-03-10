/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ToolNavigation } from './tool-navigation.interface';
import { RendererService } from '../renderer.service';
import { RenderLocation } from '../render-location';
import { NavigationService } from '../navigation.service';
/**
 * @hidden
 */
export declare class ButtonGroupNavigationService implements ToolNavigation {
    toolbarRenderer: RendererService;
    overflowRenderer: RendererService;
    toolbarNavigation: NavigationService;
    private _navigationService;
    private isActive;
    private current;
    private keydownSubscription;
    ngOnDestroy(): void;
    register(rendererService: RendererService, location: RenderLocation): void;
    canFocus(): boolean;
    focus(focusPrev: boolean): void;
    defocus(): void;
    hasFocus(element: HTMLElement): boolean;
    private buttons;
    private renderer;
    private onKeydown;
}
