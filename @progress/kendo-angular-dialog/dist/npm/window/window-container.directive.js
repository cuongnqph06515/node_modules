/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var window_container_service_1 = require("./window-container.service");
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
var WindowContainerDirective = /** @class */ (function () {
    function WindowContainerDirective(container, service) {
        service.container = container;
    }
    WindowContainerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoWindowContainer]'
                },] },
    ];
    /** @nocollapse */
    WindowContainerDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef },
        { type: window_container_service_1.WindowContainerService }
    ]; };
    return WindowContainerDirective;
}());
exports.WindowContainerDirective = WindowContainerDirective;
