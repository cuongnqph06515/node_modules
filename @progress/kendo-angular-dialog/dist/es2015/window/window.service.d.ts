/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentFactoryResolver } from '@angular/core';
import { WindowRef, WindowSettings } from './window-settings';
import { WindowContainerService } from '../window/window-container.service';
/**
 * A service for opening Windows dynamically
 * ([see example]({% slug service_window %})).
 */
export declare class WindowService {
    /**
     * @hidden
     */
    private resolver;
    private containerService;
    constructor(
    /**
     * @hidden
     */
    resolver: ComponentFactoryResolver, containerService: WindowContainerService);
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
    open(settings: WindowSettings): WindowRef;
    private applyOptions;
    private contentFrom;
}
