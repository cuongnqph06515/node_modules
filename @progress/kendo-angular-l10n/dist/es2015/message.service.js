/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/* tslint:disable:max-line-length */
/**
 * A base class for a service that returns localized messages.
 *
 * For more information, refer to the section on [using the message service]({% slug messages_l10n %}#toc-using-the-message-service).
 */
export class MessageService {
    constructor() {
        /**
         * @hidden
         */
        this.changes = new Subject();
    }
    /**
     * Notifies the components that the messages were changed.
     *
     * @param rtl - (Optional) A new value for the [text direction token]({% slug api_l10n_rtl %}).
     */
    notify(rtl) {
        this.changes.next({ rtl });
    }
    /**
     * Returns a localized message for the supplied key.
     *
     * @param key - The message key. For example, `"kendo.grid.noRecords"`.
     * @return - The localized message for this key or `undefined` if not found.
     */
    get(key) {
        return undefined;
    }
}
MessageService.decorators = [
    { type: Injectable },
];
