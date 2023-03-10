/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("./util");
var toolbar_tool_component_1 = require("./tools/toolbar-tool.component");
var refresh_service_1 = require("./refresh.service");
var navigation_service_1 = require("./navigation.service");
var renderer_service_1 = require("./renderer.service");
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
            return this.tool.overflows ? 0 : util_1.outerWidth(this.element.nativeElement);
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
        { type: core_1.Component, args: [{
                    exportAs: 'kendoToolBarRenderer',
                    providers: [renderer_service_1.RendererService],
                    selector: 'kendo-toolbar-renderer',
                    template: "\n        <ng-container *ngIf=\"location === 'toolbar'\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"location === 'overflow' && tool.responsive\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolBarRendererComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: renderer_service_1.RendererService },
        { type: refresh_service_1.RefreshService },
        { type: navigation_service_1.NavigationService }
    ]; };
    ToolBarRendererComponent.propDecorators = {
        tool: [{ type: core_1.Input }],
        location: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        onFocus: [{ type: core_1.HostListener, args: ['focusin',] }]
    };
    return ToolBarRendererComponent;
}());
exports.ToolBarRendererComponent = ToolBarRendererComponent;
