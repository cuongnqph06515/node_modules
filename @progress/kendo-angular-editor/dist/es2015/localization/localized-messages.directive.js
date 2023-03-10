/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 */
export class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoEditorLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
