import { PasteCleanupSettings } from './types/paste-cleanup-settings';
/**
 * @hidden
 */
export declare const sanitize: (html: string) => string;
/**
 * @hidden
 */
export declare const removeComments: (html: string) => string;
/**
 * @hidden
 */
export declare const removeTag: (html: string, tagPattern: string) => string;
/**
 * @hidden
 */
export declare const removeAttribute: (attr: Attr) => void;
/**
 * @hidden
 */
export declare const sanitizeClassAttr: (attr: Attr) => void;
/**
 * @hidden
 */
export declare const sanitizeStyleAttr: (attr: Attr) => void;
/**
 * @hidden
 */
export declare const pasteCleanup: (html: string, settings: PasteCleanupSettings) => string;
