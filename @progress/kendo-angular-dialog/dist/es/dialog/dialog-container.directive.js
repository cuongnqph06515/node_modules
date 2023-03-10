/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ViewContainerRef } from '@angular/core';
import { DialogContainerService } from './dialog-container.service';
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
        { type: Directive, args: [{
                    selector: '[kendoDialogContainer]'
                },] },
    ];
    /** @nocollapse */
    DialogContainerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: DialogContainerService }
    ]; };
    return DialogContainerDirective;
}());
export { DialogContainerDirective };
