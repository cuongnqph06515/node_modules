/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TileSize } from './tile-size';
/**
 * Configures the color palette that opens in the popup.
 */
export interface PaletteSettings {
    /**
     * Specifies the set of colors.
     * Provides a set of predefined palette presets (for example, `office`, `basic`, and `apex`)
     * and enables you to implement a custom color palette.
     *
     * The supported values are:
     * * The name of the predefined palette preset (for example, `office`, `basic`, and `apex`).
     * * A string with comma-separated colors.
     * * A string array.
     */
    palette?: string | Array<string>;
    /**
     * Specifies the number of columns that will be displayed.
     * Defaults to `10`.
     */
    columns?: number;
    /**
     * Specifies the size of a color cell.
     *
     * The possible values are:
     * * (Default) `24`
     * * `{ width: number, height: number }`
     */
    tileSize?: number | TileSize;
}
