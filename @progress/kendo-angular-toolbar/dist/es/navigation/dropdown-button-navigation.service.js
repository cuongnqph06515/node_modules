/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var DropdownButtonNavigationService = /** @class */ (function () {
    function DropdownButtonNavigationService(component) {
        this.component = component;
    }
    DropdownButtonNavigationService.prototype.register = function (rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    };
    DropdownButtonNavigationService.prototype.canFocus = function () {
        return !this.component.disabled;
    };
    DropdownButtonNavigationService.prototype.hasFocus = function () {
        return this.component.focused;
    };
    DropdownButtonNavigationService.prototype.focus = function () {
        if (this.canFocus()) {
            this.component.focus();
        }
    };
    DropdownButtonNavigationService.prototype.defocus = function () {
        this.component.blur();
    };
    return DropdownButtonNavigationService;
}());
export { DropdownButtonNavigationService };
