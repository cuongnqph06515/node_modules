/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_container_service_1 = require("./dialog-container.service");
/**
 * Provides an insertion point for the Dialogs which are created through the
 * Dialog service ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 * Created Dialogs will be mounted after that element.
 *
 * @example
 * ```html-no-run
 * <div kendoDialogContainer></div>
 * ```
 */
var DialogContainerDirective = /** @class */ (function () {
    function DialogContainerDirective(container, service) {
        service.container = container;
    }
    DialogContainerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDialogContainer]'
                },] },
    ];
    /** @nocollapse */
    DialogContainerDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef },
        { type: dialog_container_service_1.DialogContainerService }
    ]; };
    return DialogContainerDirective;
}());
exports.DialogContainerDirective = DialogContainerDirective;
