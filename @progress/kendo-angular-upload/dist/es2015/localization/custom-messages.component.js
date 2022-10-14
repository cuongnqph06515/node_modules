/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { Messages } from './messages';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Custom component messages override default component messages ([more information and example]({% slug globalization_upload %})).
 *
 * @example
 * ```html-no-run
 * <kendo-fileselect>
 *     <kendo-fileselect-messages
 *         [dropFilesHere]="'Drop your file here'"
 *         [select]="'Upload file'">
 *     </kendo-fileselect-messages>
 * </kendo-fileselect>
 * ```
 */
export class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-upload-messages, kendo-fileselect-messages, kendo-uploaddropzone-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];
