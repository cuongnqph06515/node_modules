/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Configures the restrictions for the files that can be uploaded.
 */
export interface FileRestrictions {
    /**
     * The list of the allowed file extensions
     * ([see example]({% slug filerestrictions_upload %}#toc-file-extension)).
     * Recognizes entries of both `.type` (for example, `.docx`, `.png`, `.svg`, `.xls`, and others)
     * and `type` (for example, `docx`, `png`, `svg`, `xls`, and others) values.
     */
    allowedExtensions?: Array<string>;
    /**
     * Defines the maximum file size in bytes
     * ([see example]({% slug filerestrictions_upload %}#toc-maximum-file-size)).
     */
    maxFileSize?: number;
    /**
     * Defines the minimum file size in bytes
     * ([see example]({% slug filerestrictions_upload %}#toc-minimum-file-size)).
     */
    minFileSize?: number;
}
