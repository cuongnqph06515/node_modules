/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ViewContainerRef } from '@angular/core';
import { WindowContainerService } from './window-container.service';
/**
 * Provides an insertion point for the Windows which are created through the
 * Window service ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 * Created Windows will be mounted after that element.
 *
 * @example
 * ```html-no-run
 * <div kendoWindowContainer></div>
 * ```
 */
export declare class WindowContainerDirective {
    constructor(container: ViewContainerRef, service: WindowContainerService);
}
