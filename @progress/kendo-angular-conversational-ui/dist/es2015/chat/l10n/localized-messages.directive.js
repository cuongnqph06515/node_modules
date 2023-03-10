import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
// tslint:disable:no-forward-ref
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
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoChatLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
