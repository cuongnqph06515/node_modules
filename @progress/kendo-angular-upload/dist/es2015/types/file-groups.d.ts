/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export interface FileGroupMap {
    audio: Array<string>;
    video: Array<string>;
    image: Array<string>;
    txt: Array<string>;
    presentation: Array<string>;
    data: Array<string>;
    programming: Array<string>;
    pdf: Array<string>;
    config: Array<string>;
    zip: Array<string>;
    discImage: Array<string>;
}
/**
 * @hidden
 */
export declare const fileGroupMap: FileGroupMap;
