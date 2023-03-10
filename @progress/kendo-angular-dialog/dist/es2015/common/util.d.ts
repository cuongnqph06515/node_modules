/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable } from 'rxjs';
/**
 * @hidden
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isTruthy: (value: any) => boolean;
/**
 * @hidden
 */
export declare enum Keys {
    'esc' = 27,
    'tab' = 9,
    'enter' = 13,
    'space' = 32,
    'ctrl' = 17,
    'shift' = 16,
    'left' = 37,
    'up' = 38,
    'right' = 39,
    'down' = 40
}
/**
 * @hidden
 */
export declare const DIALOG_ELEMENTS_HANDLING_ESC_KEY = "k-dialog-wrapper k-dialog-buttongroup k-dialog-action";
/**
 * @hidden
 */
export declare const DIALOG_ELEMENTS_HANDLING_ARROWS = "k-dialog-buttongroup";
/**
 * @hidden
 */
export declare const WINDOW_CLASSES = "k-window";
/**
 * @hidden
 */
export declare const hasClasses: (element: HTMLElement, classNames: string) => boolean;
/**
 * @hidden
 */
export declare const isVisible: (element: any) => boolean;
/**
 * @hidden
 */
export declare const isFocusable: (element: any, checkVisibility?: boolean) => boolean;
/**
 * @hidden
 */
export declare const focusableSelector: string;
/**
 * @hidden
 */
export declare const preventDefault: ({ originalEvent: event }: {
    originalEvent: any;
}) => void;
/**
 * @hidden
 */
export declare const isWindowAvailable: () => boolean;
/**
 * @hidden
 */
export declare const preventOnDblClick: (release: any) => (mouseDown: Event) => Observable<any>;
/**
 * @hidden
 */
export declare const RESIZE_DIRECTIONS: Array<string>;
/**
 * @hidden
 */
export declare const OFFSET_STYLES: Array<string>;
/**
 * @hidden
 */
export declare const isString: (value: any) => value is string;
/**
 * @hidden
 */
export declare const isNumber: (value: string | number) => boolean;
/**
 * @hidden
 */
export declare const createValueWithUnit: (value: string | number) => string;
