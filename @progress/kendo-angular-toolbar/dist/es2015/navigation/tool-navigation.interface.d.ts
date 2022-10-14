/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { RenderLocation } from '../render-location';
import { RendererService } from '../renderer.service';
import { NavigationService } from '../navigation.service';
/**
 * @hidden
 */
export interface ToolNavigation {
    toolbarNavigation: NavigationService;
    register(renderer: RendererService, location: RenderLocation): void;
    canFocus(): boolean;
    hasFocus(element?: HTMLElement): boolean;
    focus(focusLast?: boolean): void;
    defocus(): void;
}
