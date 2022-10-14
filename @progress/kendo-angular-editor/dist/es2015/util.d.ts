/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ActiveMarks } from './common/active-marks';
import { Predicate } from './common/predicate';
/**
 * @hidden
 */
export declare function outerWidth(element: HTMLElement): number;
/**
 * @hidden
 */
export declare const serializeDOMAttrs: (el: HTMLElement) => Record<string, string>;
/**
 * @hidden
 */
export declare const removeEntries: <T>(obj: T, predicate: Predicate<string>) => Partial<T>;
/**
 * @hidden
 */
export declare const removeEmptyEntries: <T>(obj: T) => Partial<T>;
/**
 * @hidden
 */
export declare const isEmpty: (obj: Object) => boolean;
/**
 * @hidden
 */
export declare const isNullOrUndefined: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 */
export declare const detectIE: () => boolean;
/**
 * @hidden
 */
export declare const safeString: (value: any) => string;
/**
 * @hidden
 */
export declare const first: (arr: any[]) => any;
/**
 * @hidden
 */
export declare const last: (arr: any[]) => any;
/**
 * @hidden
 */
export declare const unique: (arr: any[]) => any[];
/**
 * @hidden
 */
export declare const split: (splitter: string) => (value: string) => string[];
/**
 * @hidden
 */
export declare const trim: (value: string) => string;
/**
 * @hidden
 */
export declare const filter: (predicate: (value: any) => boolean) => (arr: any[]) => any[];
/**
 * @hidden
 */
export declare const toArray: <T = any>(x: T | T[]) => T[];
/**
 * @hidden
 */
export declare const getUniqueStyleValues: (style: ActiveMarks, cssStyle: string) => string;
/**
 * @hidden
 */
export declare const conditionallyExecute: <T, R>(fn: (x: T) => R) => (condition: boolean) => (param: T) => T | R;
/**
 * @hidden
 */
export declare const pipe: (...fns: any[]) => (x: any) => any;
