import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, NgZone, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as ɵngcc0 from '@angular/core';
export declare class ComponentLoaderFactory {
    private _componentFactoryResolver;
    private _ngZone;
    private _injector;
    private _posService;
    private _applicationRef;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _ngZone: NgZone, _injector: Injector, _posService: PositioningService, _applicationRef: ApplicationRef);
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader<T>(_elementRef?: ElementRef, _viewContainerRef?: ViewContainerRef, _renderer?: Renderer2): ComponentLoader<T>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ComponentLoaderFactory, never>;
}

//# sourceMappingURL=component-loader.factory.d.ts.map