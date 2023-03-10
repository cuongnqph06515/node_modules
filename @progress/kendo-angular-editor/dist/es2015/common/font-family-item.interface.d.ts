/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents data about a single font in the drop-down list for the font family.
 */
export interface FontFamilyItem {
    /**
     * The value of the [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) CSS property.
     * @example
     * ```ts-no-run
     * 'Arial,"Helvetica Neue",Helvetica,sans-serif'
     * ```
     */
    fontName: string;
    /**
     * The text for the font name that will be displayed in the drop-down list.
     * @example
     * ```ts-no-run
     * 'Arial'
     * ```
     */
    text: string;
}
