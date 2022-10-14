/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class ToolNavigationService {
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return false;
    }
    focus() { }
    defocus() { }
    hasFocus() {
        return false;
    }
}
ToolNavigationService.decorators = [
    { type: Injectable },
];
