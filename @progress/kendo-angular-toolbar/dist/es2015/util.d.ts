/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DisplayMode } from './display-mode';
/**
 * @hidden
 */
export declare function outerWidth(element: HTMLElement): number;
/**
 * @hidden
 */
export declare function innerWidth(element: HTMLElement): number;
/**
 * @hidden
 */
export declare function outerHeight(element: any): number;
/**
 * @hidden
 */
export declare const closest: (node: any, predicate: any) => any;
/**
 * @hidden
 */
export declare const isVisible: (element: any) => boolean;
/**
 * @hidden
 */
export declare const findElement: (node: any, predicate: (element: any) => boolean, matchSelf?: boolean) => any;
/**
 * @hidden
 */
export declare const isFocusable: (element: any, checkVisibility?: boolean) => boolean;
/**
 * @hidden
 */
export declare const findFocusable: (element: any, checkVisibility?: boolean) => any;
/**
 * @hidden
 */
export declare const findFocusableChild: (element: any, checkVisibility?: boolean) => any;
/**
 * @hidden
 */
export declare const findFocusableSibling: (element: any, checkVisibility?: boolean, reverse?: boolean) => any;
/**
 * @hidden
 */
export declare const isPresent: Function;
/**
 * @hidden
 */
export declare const getValueForLocation: (property: string, displayMode: DisplayMode, overflows: boolean) => string;
