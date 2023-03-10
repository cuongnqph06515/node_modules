/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentFactoryResolver, Injectable, Renderer2, TemplateRef, Inject } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { WindowCloseResult, WindowRef } from './window-settings';
import { WindowComponent } from './window.component';
import { isPresent } from '../common/util';
import { WindowContainerService } from '../window/window-container.service';
var WindowInjector = /** @class */ (function () {
    function WindowInjector(getWindowRef, parentInjector) {
        this.getWindowRef = getWindowRef;
        this.parentInjector = parentInjector;
    }
    WindowInjector.prototype.get = function (token, notFoundValue) {
        if (token === WindowRef) {
            return this.getWindowRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    };
    return WindowInjector;
}());
/**
 * A service for opening Windows dynamically
 * ([see example]({% slug service_window %})).
 */
var WindowService = /** @class */ (function () {
    function WindowService(
    /**
     * @hidden
     */
    resolver, containerService) {
        this.resolver = resolver;
        this.containerService = containerService;
    }
    /**
     * Opens a Window component.
     *
     * @param {WindowSettings} settings - The settings that define the Window.
     * @returns {WindowRef} - A reference to the Window object.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <button kendoButton (click)="open()">Open window</button>
     *     <div kendoWindowContainer></div>
     *   `
     * })
     * export class AppComponent {
     *     constructor( private windowService: WindowService ) {}
     *
     *     public open() {
     *         var window = this.windowService.open({
     *           title: "My window",
     *           content: "My content!"
     *         });
     *
     *         window.result.subscribe((result) => {
     *           if (result instanceof WindowCloseResult) {
     *             console.log("Window was closed");
     *           }
     *         });
     *     }
     * }
     * ```
     *
     */
    WindowService.prototype.open = function (settings) {
        var factory = this.resolver.resolveComponentFactory(WindowComponent);
        var container = settings.appendTo || this.containerService.container;
        if (!container) {
            throw new Error("Cannot attach window to the page.\n                Add an element that uses the kendoWindowContainer directive, or set the 'appendTo' property.\n                See https://www.telerik.com/kendo-angular-ui/components/dialogs/window/service/\n            ");
        }
        var windowRef = {
            close: function () { },
            content: null,
            result: null,
            window: null
        };
        var content = this.contentFrom(settings.content, container, windowRef);
        var window = container.createComponent(factory, undefined, undefined, content.nodes);
        windowRef.window = window;
        this.applyOptions(window.instance, settings);
        var apiClose = new Subject();
        var close = function (e) {
            apiClose.next(e || new WindowCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            window.destroy();
        };
        var result = merge(apiClose, window.instance.close).pipe(take(1));
        result.subscribe(close);
        windowRef.close = close;
        windowRef.result = result;
        window.changeDetectorRef.markForCheck();
        return windowRef;
    };
    WindowService.prototype.applyOptions = function (instance, options) {
        if (isPresent(options.title)) {
            instance.title = options.title;
        }
        if (isPresent(options.keepContent)) {
            instance.keepContent = options.keepContent;
        }
        if (isPresent(options.width)) {
            instance.width = options.width;
        }
        if (isPresent(options.minWidth)) {
            instance.minWidth = options.minWidth;
        }
        if (isPresent(options.height)) {
            instance.height = options.height;
        }
        if (isPresent(options.minHeight)) {
            instance.minHeight = options.minHeight;
        }
        if (isPresent(options.left)) {
            instance.left = options.left;
        }
        if (isPresent(options.top)) {
            instance.top = options.top;
        }
        if (isPresent(options.draggable)) {
            instance.draggable = options.draggable;
        }
        if (isPresent(options.resizable)) {
            instance.resizable = options.resizable;
        }
        if (isPresent(options.messages && options.messages.closeTitle)) {
            instance.messages.closeTitle = options.messages.closeTitle;
        }
        if (isPresent(options.messages && options.messages.restoreTitle)) {
            instance.messages.restoreTitle = options.messages.restoreTitle;
        }
        if (isPresent(options.messages && options.messages.maximizeTitle)) {
            instance.messages.maximizeTitle = options.messages.maximizeTitle;
        }
        if (isPresent(options.messages && options.messages.minimizeTitle)) {
            instance.messages.minimizeTitle = options.messages.minimizeTitle;
        }
        if (isPresent(options.autoFocusedElement)) {
            instance.autoFocusedElement = options.autoFocusedElement;
        }
        if (isPresent(options.state)) {
            instance.state = options.state;
            if (options.state === 'minimized') {
                instance.keepContent = true;
            }
        }
        if (options.content instanceof TemplateRef) {
            instance.contentTemplate = options.content;
        }
        if (options.titleBarContent instanceof TemplateRef) {
            instance.titleBarTemplate = options.titleBarContent;
        }
    };
    WindowService.prototype.contentFrom = function (content, container, windowRef) {
        var renderer = container.injector.get(Renderer2);
        var nodes = [];
        var componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            var injector = new WindowInjector(function () { return windowRef; }, container.injector);
            var factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            nodes = [componentRef.location.nativeElement];
            windowRef.content = componentRef;
        }
        return {
            componentRef: componentRef,
            nodes: [
                [],
                nodes // Content
            ]
        };
    };
    WindowService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WindowService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: WindowContainerService, decorators: [{ type: Inject, args: [WindowContainerService,] }] }
    ]; };
    return WindowService;
}());
export { WindowService };
