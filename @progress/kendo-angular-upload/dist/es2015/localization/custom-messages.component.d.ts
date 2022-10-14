/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export declare class CustomMessagesComponent extends Messages {
    protected service: LocalizationService;
    constructor(service: LocalizationService);
    protected readonly override: boolean;
}
