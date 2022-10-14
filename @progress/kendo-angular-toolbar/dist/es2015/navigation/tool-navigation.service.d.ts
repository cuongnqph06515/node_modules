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
export declare class ToolNavigationService implements ToolNavigation {
    toolbarRenderer: RendererService;
    overflowRenderer: RendererService;
    toolbarNavigation: NavigationService;
    register(rendererService: RendererService, location: RenderLocation): void;
    canFocus(): boolean;
    focus(): void;
    defocus(): void;
    hasFocus(): boolean;
}
