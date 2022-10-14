/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export class DropdownButtonNavigationService {
    constructor(component) {
        this.component = component;
    }
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return !this.component.disabled;
    }
    hasFocus() {
        return this.component.focused;
    }
    focus() {
        if (this.canFocus()) {
            this.component.focus();
        }
    }
    defocus() {
        this.component.blur();
    }
}
