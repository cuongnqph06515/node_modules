/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, Input, Renderer2 as Renderer, HostListener } from '@angular/core';
import { outerWidth } from './util';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
import { RefreshService } from './refresh.service';
import { NavigationService } from './navigation.service';
import { RendererService } from './renderer.service';
/**
 * @hidden
 */
var ToolBarRendererComponent = /** @class */ (function () {
    function ToolBarRendererComponent(element, renderer, rendererService, refreshService, navigationService) {
        var _this = this;
        this.element = element;
        this.renderer = renderer;
        this.rendererService = rendererService;
        this.refreshService = refreshService;
        this.navigationService = navigationService;
        this.rendererService.element = element;
        this.rendererService.renderer = this;
        this.refreshSubscription = this.refreshService.onRefresh.subscribe(function (tool) {
            if (_this.tool === tool) {
                _this.refresh();
            }
        });
    }
    ToolBarRendererComponent.prototype.onFocus = function () {
        this.navigationService.focused = this.tool;
    };
    ToolBarRendererComponent.prototype.ngOnInit = function () {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.template = this.tool.toolbarTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'visibility', 'hidden');
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
            else {
                this.template = this.tool.popupTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
        }
        else {
            this.tool.overflows = false;
            this.template = this.tool.toolbarTemplate;
            this.renderer.setStyle(this.element.nativeElement, 'visibility', 'display');
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inline-block');
        }
        this.navigationService.register(this.tool);
        this.tool.navigationService.register(this.rendererService, this.location);
        this.tool.navigationService.toolbarNavigation = this.navigationService;
    };
    ToolBarRendererComponent.prototype.ngOnDestroy = function () {
        this.navigationService.unregister(this.tool);
        this.refreshSubscription.unsubscribe();
    };
    ToolBarRendererComponent.prototype.ngAfterViewInit = function () {
        // this.focusableElement = this.rendererService.findFocusable();
        if (this.resizable) {
            this.refresh();
        }
    };
    Object.defineProperty(ToolBarRendererComponent.prototype, "width", {
        /**
         * @hidden
         */
        get: function () {
            return this.tool.overflows ? 0 : outerWidth(this.element.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.isDisplayed = function () {
        return this.element.nativeElement.style.display !== 'none';
    };
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.refresh = function () {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.renderer.setStyle(this.element.nativeElement, 'visibility', this.tool.visibility);
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.toolbarDisplay);
            }
            else {
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.overflowDisplay);
            }
        }
    };
    /**
     * @hidden
     */
    ToolBarRendererComponent.prototype.setAttribute = function (element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    };
    ToolBarRendererComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoToolBarRenderer',
                    providers: [RendererService],
                    selector: 'kendo-toolbar-renderer',
                    template: "\n        <ng-container *ngIf=\"location === 'toolbar'\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"location === 'overflow' && tool.responsive\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarRendererComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer },
        { type: RendererService },
        { type: RefreshService },
        { type: NavigationService }
    ]; };
    ToolBarRendererComponent.propDecorators = {
        tool: [{ type: Input }],
        location: [{ type: Input }],
        resizable: [{ type: Input }],
        onFocus: [{ type: HostListener, args: ['focusin',] }]
    };
    return ToolBarRendererComponent;
}());
export { ToolBarRendererComponent };
