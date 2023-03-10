/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, TemplateRef, Renderer2 as Renderer, OnInit, OnDestroy } from '@angular/core';
import { RenderLocation } from './render-location';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
import { RefreshService } from './refresh.service';
import { NavigationService } from './navigation.service';
import { RendererService } from './renderer.service';
/**
 * @hidden
 */
export declare class ToolBarRendererComponent implements OnInit, OnDestroy {
    private element;
    private renderer;
    private rendererService;
    private refreshService;
    private navigationService;
    /**
     * @hidden
     */
    tool: ToolBarToolComponent;
    /**
     * @hidden
     */
    location: RenderLocation;
    /**
     * @hidden
     */
    resizable: boolean;
    template: TemplateRef<any>;
    private refreshSubscription;
    onFocus(): void;
    constructor(element: ElementRef, renderer: Renderer, rendererService: RendererService, refreshService: RefreshService, navigationService: NavigationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    readonly width: number;
    /**
     * @hidden
     */
    isDisplayed(): boolean;
    /**
     * @hidden
     */
    refresh(): void;
    /**
     * @hidden
     */
    setAttribute(element: HTMLElement, attr: string, value: string): void;
}
