/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ToolNavigation } from './tool-navigation.interface';
import { NavigationService } from '../navigation.service';
import { RendererService } from '../renderer.service';
import { RenderLocation } from '../render-location';
import { DropDownButtonComponent } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
export declare class DropdownButtonNavigationService implements ToolNavigation {
    component: DropDownButtonComponent;
    toolbarRenderer: RendererService;
    overflowRenderer: RendererService;
    toolbarNavigation: NavigationService;
    constructor(component: DropDownButtonComponent);
    register(rendererService: RendererService, location: RenderLocation): void;
    canFocus(): boolean;
    hasFocus(): boolean;
    focus(): void;
    defocus(): void;
}
