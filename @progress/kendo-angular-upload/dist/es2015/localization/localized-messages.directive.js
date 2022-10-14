/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, forwardRef } from '@angular/core';
import { Messages } from './messages';
import { LocalizationService } from '@progress/kendo-angular-l10n';
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
                        useExisting: forwardRef(() => LocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: `
    [kendoUploadLocalizedMessages],
    [kendoFileSelectLocalizedMessages],
    [kendoUploadDropZoneLocalizedMessages]
  `
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
