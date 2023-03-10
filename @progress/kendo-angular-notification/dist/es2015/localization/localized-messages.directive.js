/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, forwardRef, Input } from '@angular/core';
import { ComponentMessages, LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class LocalizedMessagesDirective extends ComponentMessages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: ComponentMessages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: `[kendoNotificationLocalizedMessages]`
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
LocalizedMessagesDirective.propDecorators = {
    closeTitle: [{ type: Input }]
};
