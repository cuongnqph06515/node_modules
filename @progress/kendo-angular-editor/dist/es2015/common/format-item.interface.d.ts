/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents data about a single item in the drop-down list for formatting.
 */
export interface FormatItem {
    /**
     * The tag which will be applied.
     * @example
     * ```ts-no-run
     * 'h1'
     * ```
     */
    tag: 'p' | 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /**
     * The text for the defined tag that will be displayed in the drop-down list.
     * @example
     * ```ts-no-run
     * 'Heading 1'
     * ```
     */
    text: string;
}
