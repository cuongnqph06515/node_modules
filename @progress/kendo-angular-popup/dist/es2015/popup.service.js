/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ApplicationRef, ComponentFactoryResolver, ElementRef, InjectionToken, Injectable, Injector, Inject, Optional, TemplateRef } from '@angular/core';
import { PopupComponent } from './popup.component';
const removeElement = (element) => {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
const ɵ0 = removeElement;
/**
 * Used to inject the Popup container. If not provided, the first root component of
 * the application is used.
 *
 * > The `POPUP_CONTAINER` can be used only with the [`PopupService`]({% slug service_popup %}) class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Popup module
 * import { PopupModule, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { ElementRef, NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, PopupModule], // import Popup module
 *     bootstrap:    [AppComponent],
 *     providers: [{
 *       provide: POPUP_CONTAINER,
 *       useFactory: () => {
 *          //return the container ElementRef, where the popup will be injected
 *          return { nativeElement: document.body } as ElementRef;
 *       }
 *     }]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
export const POPUP_CONTAINER = new InjectionToken('Popup Container');
/**
 * A service for opening Popup components dynamically
 * ([see example]({% slug service_popup %})).
 *
 * @export
 * @class PopupService
 */
export class PopupService {
    constructor(applicationRef, componentFactoryResolver, injector, container) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.container = container;
    }
    /**
     * Gets the root view container into which the component will be injected.
     *
     * @returns {ComponentRef<any>}
     */
    get rootViewContainer() {
        // https://github.com/angular/angular/blob/4.0.x/packages/core/src/application_ref.ts#L571
        const rootComponents = this.applicationRef.components || [];
        if (rootComponents[0]) {
            return rootComponents[0];
        }
        throw new Error(`
            View Container not found! Inject the POPUP_CONTAINER or define a specific ViewContainerRef via the appendTo option.
            See http://www.telerik.com/kendo-angular-ui/components/popup/api/POPUP_CONTAINER/ for more details.
        `);
    }
    /**
     * Sets or gets the HTML element of the root component container.
     *
     * @returns {HTMLElement}
     */
    get rootViewContainerNode() {
        return this.container ? this.container.nativeElement : this.getComponentRootNode(this.rootViewContainer);
    }
    /**
     * Opens a Popup component. Created Popups are mounted
     * in the DOM directly in the root application component.
     *
     * @param {PopupSettings} options - The options which define the Popup.
     * @returns {ComponentRef<PopupComponent>} - A reference to the Popup object.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <ng-template #template>
     *      Popup content
     *     </ng-template>
     *     <button #anchor kendoButton (click)="open(anchor, template)">Open</button>
     *   `
     * })
     * export class AppComponent {
     *     public popupRef: PopupRef;
     *
     *     constructor( private popupService: PopupService ) {}
     *
     *     public open(anchor: ElementRef, template: TemplateRef<any>): void {
     *         if (this.popupRef) {
     *              this.popupRef.close();
     *              this.popupRef = null;
     *              return;
     *         }
     *
     *         this.popupRef = this.popupService.open({
     *           anchor: anchor,
     *           content: template
     *         });
     *     }
     * }
     * ```
     */
    open(options = {}) {
        const { component, nodes } = this.contentFrom(options.content);
        const popupComponentRef = this.appendPopup(nodes, options.appendTo);
        const popupInstance = popupComponentRef.instance;
        this.projectComponentInputs(popupComponentRef, options);
        popupComponentRef.changeDetectorRef.detectChanges();
        if (component) {
            component.changeDetectorRef.detectChanges();
        }
        const popupElement = this.getComponentRootNode(popupComponentRef);
        return {
            close: () => {
                if (component) {
                    component.destroy();
                }
                popupComponentRef.destroy();
                // Angular will not remove the element unless the change detection is triggered
                removeElement(popupElement);
            },
            content: component,
            popup: popupComponentRef,
            popupAnchorViewportLeave: popupInstance.anchorViewportLeave,
            popupClose: popupInstance.close,
            popupElement: popupElement,
            popupOpen: popupInstance.open,
            popupPositionChange: popupInstance.positionChange
        };
    }
    appendPopup(nodes, container) {
        const popupComponentRef = this.createComponent(PopupComponent, nodes, container);
        if (!container) {
            this.rootViewContainerNode.appendChild(this.getComponentRootNode(popupComponentRef));
        }
        return popupComponentRef;
    }
    /**
     * Gets the HTML element for a component reference.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     */
    getComponentRootNode(componentRef) {
        return componentRef.location.nativeElement;
    }
    /**
     * Gets the `ComponentFactory` instance by its type.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    getComponentFactory(componentClass) {
        return this.componentFactoryResolver.resolveComponentFactory(componentClass);
    }
    /**
     * Creates a component reference from a `Component` type class.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    createComponent(componentClass, nodes, container) {
        const factory = this.getComponentFactory(componentClass);
        if (container) {
            return container.createComponent(factory, undefined, this.injector, nodes);
        }
        else {
            const component = factory.create(this.injector, nodes);
            this.applicationRef.attachView(component.hostView);
            return component;
        }
    }
    /**
     * Projects the inputs on the component.
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     */
    projectComponentInputs(component, options) {
        Object.getOwnPropertyNames(options)
            .filter(prop => prop !== 'content' || options.content instanceof TemplateRef)
            .map((prop) => {
            component.instance[prop] = options[prop];
        });
        return component;
    }
    /**
     * Gets the component and the nodes to append from the `content` option.
     *
     * @param {*} content
     * @returns {any}
     */
    contentFrom(content) {
        if (!content || content instanceof TemplateRef) {
            return { component: null, nodes: [[]] };
        }
        const component = this.createComponent(content);
        const nodes = component ? [component.location.nativeElement] : [];
        return {
            component: component,
            nodes: [
                nodes // <ng-content>
            ]
        };
    }
}
PopupService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PopupService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ElementRef, decorators: [{ type: Inject, args: [POPUP_CONTAINER,] }, { type: Optional }] }
];
export { ɵ0 };
