/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var window_settings_1 = require("./window-settings");
var window_component_1 = require("./window.component");
var util_1 = require("../common/util");
var window_container_service_1 = require("../window/window-container.service");
var WindowInjector = /** @class */ (function () {
    function WindowInjector(getWindowRef, parentInjector) {
        this.getWindowRef = getWindowRef;
        this.parentInjector = parentInjector;
    }
    WindowInjector.prototype.get = function (token, notFoundValue) {
        if (token === window_settings_1.WindowRef) {
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
        var factory = this.resolver.resolveComponentFactory(window_component_1.WindowComponent);
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
        var apiClose = new rxjs_1.Subject();
        var close = function (e) {
            apiClose.next(e || new window_settings_1.WindowCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            window.destroy();
        };
        var result = rxjs_1.merge(apiClose, window.instance.close).pipe(operators_1.take(1));
        result.subscribe(close);
        windowRef.close = close;
        windowRef.result = result;
        window.changeDetectorRef.markForCheck();
        return windowRef;
    };
    WindowService.prototype.applyOptions = function (instance, options) {
        if (util_1.isPresent(options.title)) {
            instance.title = options.title;
        }
        if (util_1.isPresent(options.keepContent)) {
            instance.keepContent = options.keepContent;
        }
        if (util_1.isPresent(options.width)) {
            instance.width = options.width;
        }
        if (util_1.isPresent(options.minWidth)) {
            instance.minWidth = options.minWidth;
        }
        if (util_1.isPresent(options.height)) {
            instance.height = options.height;
        }
        if (util_1.isPresent(options.minHeight)) {
            instance.minHeight = options.minHeight;
        }
        if (util_1.isPresent(options.left)) {
            instance.left = options.left;
        }
        if (util_1.isPresent(options.top)) {
            instance.top = options.top;
        }
        if (util_1.isPresent(options.draggable)) {
            instance.draggable = options.draggable;
        }
        if (util_1.isPresent(options.resizable)) {
            instance.resizable = options.resizable;
        }
        if (util_1.isPresent(options.messages && options.messages.closeTitle)) {
            instance.messages.closeTitle = options.messages.closeTitle;
        }
        if (util_1.isPresent(options.messages && options.messages.restoreTitle)) {
            instance.messages.restoreTitle = options.messages.restoreTitle;
        }
        if (util_1.isPresent(options.messages && options.messages.maximizeTitle)) {
            instance.messages.maximizeTitle = options.messages.maximizeTitle;
        }
        if (util_1.isPresent(options.messages && options.messages.minimizeTitle)) {
            instance.messages.minimizeTitle = options.messages.minimizeTitle;
        }
        if (util_1.isPresent(options.autoFocusedElement)) {
            instance.autoFocusedElement = options.autoFocusedElement;
        }
        if (util_1.isPresent(options.state)) {
            instance.state = options.state;
            if (options.state === 'minimized') {
                instance.keepContent = true;
            }
        }
        if (options.content instanceof core_1.TemplateRef) {
            instance.contentTemplate = options.content;
        }
        if (options.titleBarContent instanceof core_1.TemplateRef) {
            instance.titleBarTemplate = options.titleBarContent;
        }
    };
    WindowService.prototype.contentFrom = function (content, container, windowRef) {
        var renderer = container.injector.get(core_1.Renderer2);
        var nodes = [];
        var componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof core_1.TemplateRef)) {
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    WindowService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver },
        { type: window_container_service_1.WindowContainerService, decorators: [{ type: core_1.Inject, args: [window_container_service_1.WindowContainerService,] }] }
    ]; };
    return WindowService;
}());
exports.WindowService = WindowService;
