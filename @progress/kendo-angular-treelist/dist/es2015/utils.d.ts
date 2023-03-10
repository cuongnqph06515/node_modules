/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export { isChanged, anyChanged, hasObservers } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isBlank: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isArray: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isTruthy: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isNullOrEmptyString: (value: string) => boolean;
/**
 * @hidden
 */
export declare const observe: <T>(list: QueryList<T>) => Observable<QueryList<T>>;
/**
 * @hidden
 */
export declare const isUniversal: () => boolean;
/**
 * @hidden
 */
export declare const isString: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isNumber: (value: any) => boolean;
/**
 * @hidden
 */
export declare const extractFormat: (format: string) => string;
/**
 * @hidden
 */
export declare const not: (fn: (...x: any[]) => boolean) => (...args: any[]) => boolean;
/**
 * @hidden
 * Represents a condition&mdash;a unary function which takes an argument and returns a Boolean.
 */
export declare type Condition<T> = (x: T) => boolean;
/**
 * @hidden
 */
export declare const or: <T>(...conditions: Condition<T>[]) => (value: T) => boolean;
/**
 * @hidden
 */
export declare const and: <T>(...conditions: Condition<T>[]) => (value: T) => boolean;
/**
 * @hidden
 */
export declare const Skip: InjectionToken<{}>;
/**
 * @hidden
 */
export declare const createPromise: () => Promise<any>;
/** @hidden */
export declare const iterator: any;
/** @hidden */
export declare const requestAnimationFrame: any;
/** @hidden */
export declare const cancelAnimationFrame: any;
/** @hidden */
export declare const isColumnEditable: (column: any, formGroup: any) => boolean;
