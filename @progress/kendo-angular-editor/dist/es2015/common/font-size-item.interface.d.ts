/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents data about a single item in the drop-down list for the font size.
 */
export interface FontSizeItem {
    /**
     * The value of the [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) CSS property.
     * @example
     * ```ts-no-run
     * '4'
     * ```
     */
    size: number;
    /**
     * The text for the font size that will be displayed in the drop-down list.
     * @example
     * ```ts-no-run
     * 'Small'
     * ```
     */
    text: string;
}
