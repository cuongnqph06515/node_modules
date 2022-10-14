/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ToolNavigation } from './tool-navigation.interface';
import { RenderLocation } from '../render-location';
import { RendererService } from '../renderer.service';
import { NavigationService } from '../navigation.service';
/**
 * @hidden
 */
export declare class SingleFocusableNavigationService implements ToolNavigation {
    toolbarRenderer: RendererService;
    overflowRenderer: RendererService;
    toolbarNavigation: NavigationService;
    register(rendererService: RendererService, location: RenderLocation): void;
    canFocus(): boolean;
    focus(): void;
    defocus(): void;
    hasFocus(element: HTMLElement): boolean;
    private findFocusable;
    private setAttribute;
}
