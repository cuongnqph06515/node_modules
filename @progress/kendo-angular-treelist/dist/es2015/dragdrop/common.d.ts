/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export declare const append: (element: any) => () => any;
/**
 * @hidden
 */
export declare const offset: (element: any) => {
    top: number;
    left: number;
};
/**
 * @hidden
 * If the target is before the draggable element, returns `true`.
 *
 * DOCUMENT_POSITION_FOLLOWING = 4
 */
export declare const isTargetBefore: (draggable: any, target: any) => boolean;
/**
 * @hidden
 * If the container and the element are the same
 * or if the container holds (contains) the element, returns `true`.
 *
 * DOCUMENT_POSITION_CONTAINED_BY = 16
 */
export declare const contains: (element: any, container: any) => boolean;
/**
 * @hidden
 */
export declare const position: (target: any, before: any) => {
    left: any;
    top: number;
    height: any;
};
