/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Configuration options for the Paste Cleanup ([see example]({% slug paste_cleanup %})).
 */
export interface PasteCleanupSettings {
    /**
     * If set to `true`, MS Word lists will be converted into HTML lists.
     */
    convertMsLists?: boolean;
    /**
     * If set to `true`, comments will be removed from the HTML.
     *
     * For example `<!-- comment --> <p> content </p>` will result in `<p> content </p>`
     */
    removeHtmlComments?: boolean;
    /**
     * Specifies a list of tags to be removed from the HTML.
     * > Child nodes of removed tags will be kept in place.
     *
     * For example when `stripTags: ['span']`, `<p><span lang=EN-US>content</span></p>` will result in `<p>content</p>`
     */
    stripTags?: string[];
    /**
     * Specifies the DOM attributes that should be removed from the HTML.
     * When set to `'all'`, every HTML attribute will be removed.
     * To customize the list of attributes, set `removeAttributes` to an array of the desired values.
     *
     * > If set to `'all'`, this option takes precedence over `removeMsClasses` and `removeMsStyles`.
     *
     * For example when `removeAttributes: ['lang']`, `<p><span lang=EN-US>content</span></p>`
     * will result in `<p><span>content</span></p>`
     */
    removeAttributes?: string[] | 'all';
    /**
     * If set to `true`, class attributes starting with 'Mso' will be removed from the HTML.
     *
     * For example `<p class="MsoNormal">pasted from MS Word</p>` will result in `<p>pasted from MS Word</p>`
     */
    removeMsClasses?: boolean;
    /**
     * If set to `true`, style attributes starting with 'Mso' will be removed from the HTML.
     *
     * For example `<p><span style="color:#7C7C7C; mso-themecolor:accent3; mso-themeshade:191;">content</span></p>`
     * will result in `<p><span style="color: #7C7C7C; background: silver;">content</span></p>`
     */
    removeMsStyles?: boolean;
    /**
     * Determines whether invalid HTML should be removed.
     *
     * For example `<p>content <o:p>, <w:sdtPr></p>` will result in `<p>content </p>`
     */
    removeInvalidHTML?: boolean;
}
