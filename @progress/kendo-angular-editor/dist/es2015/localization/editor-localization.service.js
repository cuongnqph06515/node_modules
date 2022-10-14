/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Inject, Optional } from '@angular/core';
import { LocalizationService, L10N_PREFIX, MessageService, RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class EditorLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl) {
        super(prefix, messageService, _rtl);
    }
}
/** @nocollapse */
EditorLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
