/**
 * @fileoverview added by tsickle
 * Generated from: packages/common/src/directives/ng_component_outlet.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactoryResolver, Directive, Injector, Input, NgModuleFactory, NgModuleRef, Type, ViewContainerRef } from '@angular/core';
/**
 * Instantiates a single {\@link Component} type and inserts its Host View into current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will get destroyed.
 *
 * \@usageNotes
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInjector`: Optional custom {\@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if exists.
 *
 * * `ngComponentOutletNgModuleFactory`: Optional module factory to allow dynamically loading other
 * module, then load a component from that module.
 *
 * ### Syntax
 *
 * Simple
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * Customized injector/content
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized ngModuleFactory
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModuleFactory: moduleFactory;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * {\@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {\@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}
 *
 * \@publicApi
 * \@ngModule CommonModule
 */
export class NgComponentOutlet {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        this._componentRef = null;
        this._moduleRef = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._viewContainerRef.clear();
        this._componentRef = null;
        if (this.ngComponentOutlet) {
            /** @type {?} */
            const elInjector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
            if (changes['ngComponentOutletNgModuleFactory']) {
                if (this._moduleRef)
                    this._moduleRef.destroy();
                if (this.ngComponentOutletNgModuleFactory) {
                    /** @type {?} */
                    const parentModule = elInjector.get(NgModuleRef);
                    this._moduleRef = this.ngComponentOutletNgModuleFactory.create(parentModule.injector);
                }
                else {
                    this._moduleRef = null;
                }
            }
            /** @type {?} */
            const componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver :
                elInjector.get(ComponentFactoryResolver);
            /** @type {?} */
            const componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponentOutlet);
            this._componentRef = this._viewContainerRef.createComponent(componentFactory, this._viewContainerRef.length, elInjector, this.ngComponentOutletContent);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._moduleRef)
            this._moduleRef.destroy();
    }
}
NgComponentOutlet.decorators = [
    { type: Directive, args: [{ selector: '[ngComponentOutlet]' },] }
];
/** @nocollapse */
NgComponentOutlet.ctorParameters = () => [
    { type: ViewContainerRef }
];
NgComponentOutlet.propDecorators = {
    ngComponentOutlet: [{ type: Input }],
    ngComponentOutletInjector: [{ type: Input }],
    ngComponentOutletContent: [{ type: Input }],
    ngComponentOutletNgModuleFactory: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgComponentOutlet.prototype.ngComponentOutlet;
    /** @type {?} */
    NgComponentOutlet.prototype.ngComponentOutletInjector;
    /** @type {?} */
    NgComponentOutlet.prototype.ngComponentOutletContent;
    /** @type {?} */
    NgComponentOutlet.prototype.ngComponentOutletNgModuleFactory;
    /**
     * @type {?}
     * @private
     */
    NgComponentOutlet.prototype._componentRef;
    /**
     * @type {?}
     * @private
     */
    NgComponentOutlet.prototype._moduleRef;
    /**
     * @type {?}
     * @private
     */
    NgComponentOutlet.prototype._viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29tcG9uZW50X291dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uZ19jb21wb25lbnRfb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyx3QkFBd0IsRUFBZ0IsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBdUQsSUFBSSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJENU0sTUFBTSxPQUFPLGlCQUFpQjs7OztJQWE1QixZQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgvQyxrQkFBYSxHQUEyQixJQUFJLENBQUM7UUFDN0MsZUFBVSxHQUEwQixJQUFJLENBQUM7SUFFUyxDQUFDOzs7OztJQUUzRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFOztrQkFDcEIsVUFBVSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYztZQUUxRixJQUFJLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVO29CQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRS9DLElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFOzswQkFDbkMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN2RjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDeEI7YUFDRjs7a0JBRUssd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDOztrQkFFckYsZ0JBQWdCLEdBQ2xCLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUU1RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQ3ZELGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUMzRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakQsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQzs7OztZQTFEeUgsZ0JBQWdCOzs7Z0NBNkRsTCxLQUFLO3dDQUVMLEtBQUs7dUNBRUwsS0FBSzsrQ0FFTCxLQUFLOzs7O0lBTk4sOENBQXVDOztJQUV2QyxzREFBOEM7O0lBRTlDLHFEQUE0Qzs7SUFFNUMsNkRBQWlFOzs7OztJQUVqRSwwQ0FBcUQ7Ozs7O0lBQ3JELHVDQUFpRDs7Ozs7SUFFckMsOENBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIEluamVjdG9yLCBJbnB1dCwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIEluc3RhbnRpYXRlcyBhIHNpbmdsZSB7QGxpbmsgQ29tcG9uZW50fSB0eXBlIGFuZCBpbnNlcnRzIGl0cyBIb3N0IFZpZXcgaW50byBjdXJyZW50IFZpZXcuXG4gKiBgTmdDb21wb25lbnRPdXRsZXRgIHByb3ZpZGVzIGEgZGVjbGFyYXRpdmUgYXBwcm9hY2ggZm9yIGR5bmFtaWMgY29tcG9uZW50IGNyZWF0aW9uLlxuICpcbiAqIGBOZ0NvbXBvbmVudE91dGxldGAgcmVxdWlyZXMgYSBjb21wb25lbnQgdHlwZSwgaWYgYSBmYWxzeSB2YWx1ZSBpcyBzZXQgdGhlIHZpZXcgd2lsbCBjbGVhciBhbmRcbiAqIGFueSBleGlzdGluZyBjb21wb25lbnQgd2lsbCBnZXQgZGVzdHJveWVkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEZpbmUgdHVuZSBjb250cm9sXG4gKlxuICogWW91IGNhbiBjb250cm9sIHRoZSBjb21wb25lbnQgY3JlYXRpb24gcHJvY2VzcyBieSB1c2luZyB0aGUgZm9sbG93aW5nIG9wdGlvbmFsIGF0dHJpYnV0ZXM6XG4gKlxuICogKiBgbmdDb21wb25lbnRPdXRsZXRJbmplY3RvcmA6IE9wdGlvbmFsIGN1c3RvbSB7QGxpbmsgSW5qZWN0b3J9IHRoYXQgd2lsbCBiZSB1c2VkIGFzIHBhcmVudCBmb3JcbiAqIHRoZSBDb21wb25lbnQuIERlZmF1bHRzIHRvIHRoZSBpbmplY3RvciBvZiB0aGUgY3VycmVudCB2aWV3IGNvbnRhaW5lci5cbiAqXG4gKiAqIGBuZ0NvbXBvbmVudE91dGxldENvbnRlbnRgOiBPcHRpb25hbCBsaXN0IG9mIHByb2plY3RhYmxlIG5vZGVzIHRvIGluc2VydCBpbnRvIHRoZSBjb250ZW50XG4gKiBzZWN0aW9uIG9mIHRoZSBjb21wb25lbnQsIGlmIGV4aXN0cy5cbiAqXG4gKiAqIGBuZ0NvbXBvbmVudE91dGxldE5nTW9kdWxlRmFjdG9yeWA6IE9wdGlvbmFsIG1vZHVsZSBmYWN0b3J5IHRvIGFsbG93IGR5bmFtaWNhbGx5IGxvYWRpbmcgb3RoZXJcbiAqIG1vZHVsZSwgdGhlbiBsb2FkIGEgY29tcG9uZW50IGZyb20gdGhhdCBtb2R1bGUuXG4gKlxuICogIyMjIFN5bnRheFxuICpcbiAqIFNpbXBsZVxuICogYGBgXG4gKiA8bmctY29udGFpbmVyICpuZ0NvbXBvbmVudE91dGxldD1cImNvbXBvbmVudFR5cGVFeHByZXNzaW9uXCI+PC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBDdXN0b21pemVkIGluamVjdG9yL2NvbnRlbnRcbiAqIGBgYFxuICogPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJjb21wb25lbnRUeXBlRXhwcmVzc2lvbjtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RvcjogaW5qZWN0b3JFeHByZXNzaW9uO1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnROb2Rlc0V4cHJlc3Npb247XCI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEN1c3RvbWl6ZWQgbmdNb2R1bGVGYWN0b3J5XG4gKiBgYGBcbiAqIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiY29tcG9uZW50VHlwZUV4cHJlc3Npb247XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmdNb2R1bGVGYWN0b3J5OiBtb2R1bGVGYWN0b3J5O1wiPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiAjIyMgQSBzaW1wbGUgZXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vbmdDb21wb25lbnRPdXRsZXQvdHMvbW9kdWxlLnRzIHJlZ2lvbj0nU2ltcGxlRXhhbXBsZSd9XG4gKlxuICogQSBtb3JlIGNvbXBsZXRlIGV4YW1wbGUgd2l0aCBhZGRpdGlvbmFsIG9wdGlvbnM6XG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9uZ0NvbXBvbmVudE91dGxldC90cy9tb2R1bGUudHMgcmVnaW9uPSdDb21wbGV0ZUV4YW1wbGUnfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdDb21wb25lbnRPdXRsZXRdJ30pXG5leHBvcnQgY2xhc3MgTmdDb21wb25lbnRPdXRsZXQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBuZ0NvbXBvbmVudE91dGxldCE6IFR5cGU8YW55PjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIG5nQ29tcG9uZW50T3V0bGV0SW5qZWN0b3IhOiBJbmplY3RvcjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIG5nQ29tcG9uZW50T3V0bGV0Q29udGVudCE6IGFueVtdW107XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBuZ0NvbXBvbmVudE91dGxldE5nTW9kdWxlRmFjdG9yeSE6IE5nTW9kdWxlRmFjdG9yeTxhbnk+O1xuXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX21vZHVsZVJlZjogTmdNb2R1bGVSZWY8YW55PnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcblxuICAgIGlmICh0aGlzLm5nQ29tcG9uZW50T3V0bGV0KSB7XG4gICAgICBjb25zdCBlbEluamVjdG9yID0gdGhpcy5uZ0NvbXBvbmVudE91dGxldEluamVjdG9yIHx8IHRoaXMuX3ZpZXdDb250YWluZXJSZWYucGFyZW50SW5qZWN0b3I7XG5cbiAgICAgIGlmIChjaGFuZ2VzWyduZ0NvbXBvbmVudE91dGxldE5nTW9kdWxlRmFjdG9yeSddKSB7XG4gICAgICAgIGlmICh0aGlzLl9tb2R1bGVSZWYpIHRoaXMuX21vZHVsZVJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmdDb21wb25lbnRPdXRsZXROZ01vZHVsZUZhY3RvcnkpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRNb2R1bGUgPSBlbEluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG4gICAgICAgICAgdGhpcy5fbW9kdWxlUmVmID0gdGhpcy5uZ0NvbXBvbmVudE91dGxldE5nTW9kdWxlRmFjdG9yeS5jcmVhdGUocGFyZW50TW9kdWxlLmluamVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tb2R1bGVSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA9IHRoaXMuX21vZHVsZVJlZiA/IHRoaXMuX21vZHVsZVJlZi5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxJbmplY3Rvci5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcblxuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9XG4gICAgICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubmdDb21wb25lbnRPdXRsZXQpO1xuXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBjb21wb25lbnRGYWN0b3J5LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmxlbmd0aCwgZWxJbmplY3RvcixcbiAgICAgICAgICB0aGlzLm5nQ29tcG9uZW50T3V0bGV0Q29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX21vZHVsZVJlZikgdGhpcy5fbW9kdWxlUmVmLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19